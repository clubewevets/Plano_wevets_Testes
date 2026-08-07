import { useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import * as AmplitudeExperiment from "@amplitude/experiment-js-client";

const AMPLITUDE_API_KEY = import.meta.env.VITE_AMPLITUDE_API_KEY;
const AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY = import.meta.env
  .VITE_AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY;

// Detectar categoria do dispositivo (mobile ou desktop)
const getDeviceCategory = (): string => {
  if (typeof window === "undefined") return "unknown";

  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);

  return isMobile ? "mobile" : "desktop";
};

// Detectar sistema operacional
const getOperatingSystem = (): string => {
  if (typeof window === "undefined") return "unknown";

  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("win")) return "Windows";
  if (userAgent.includes("mac")) return "macOS";
  if (userAgent.includes("iphone") || userAgent.includes("ipad")) return "iOS";
  if (userAgent.includes("android")) return "Android";
  if (userAgent.includes("linux")) return "Linux";

  return "Unknown";
};

// Gerar ou recuperar Device ID local
const generateDeviceId = (): string => {
  const storageKey = "amp_device_id";

  // Tentar recuperar do localStorage
  let deviceId = localStorage.getItem(storageKey);

  if (!deviceId) {
    // Gerar novo Device ID se não existir
    deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(storageKey, deviceId);
    if (process.env.NODE_ENV !== "production") console.log("✨ Novo Device ID gerado:", deviceId);
  } else {
    if (process.env.NODE_ENV !== "production") console.log("♻️ Device ID recuperado do localStorage:", deviceId);
  }

  return deviceId;
};

let storedDeviceId: string | null = null;
let experimentClient: any = null;
let initializationPromise: Promise<void> | null = null;

/**
 * Singleton que inicializa Amplitude e Feature Flags de forma idempotente e segura.
 * Pode ser chamado de qualquer lugar e sempre retorna a mesma promessa.
 */
export const ensureAmplitudeInitialized = async (): Promise<void> => {
  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = (async () => {
    try {
      if (process.env.NODE_ENV !== "production") console.log("🚀 [Amplitude] Iniciando sequência de inicialização global...");

      if (!AMPLITUDE_API_KEY) {
        if (process.env.NODE_ENV !== "production") console.warn("❌ AMPLITUDE_API_KEY não configurada");
        return;
      }

      // Gerar ou recuperar Device ID
      storedDeviceId = generateDeviceId();

      // 1. Inicializar Amplitude Analytics com timeout de segurança
      if (process.env.NODE_ENV !== "production") console.log("🔄 [Amplitude] Inicializando Analytics...");
      const initPromise = amplitude.init(AMPLITUDE_API_KEY, {
        deviceId: storedDeviceId,
        defaultTracking: {
          pageViews: false,
          formInteractions: true,
          fileDownloads: true,
        },
      });

      // Timeout de 3 segundos para inicialização do analytics
      await Promise.race([
        initPromise,
        new Promise((resolve) => setTimeout(resolve, 3000))
      ]);

      // Configurar custom path
      amplitude.track("user_properties", {
        custom_path: "/landing-page/plano",
      });
      if (process.env.NODE_ENV !== "production") console.log("✅ [Amplitude] Analytics pronto!");

      // 2. Inicializar Feature Flags (Experiment)
      if (!AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY) {
        if (process.env.NODE_ENV !== "production") console.warn("❌ AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY não configurada");
        return;
      }

      if (process.env.NODE_ENV !== "production") console.log("🔄 [Amplitude] Inicializando Experiment Client...");
      try {
        // initializeWithAmplitudeAnalytics pode ser síncrono ou assíncrono dependendo da versão
        const client = AmplitudeExperiment.Experiment.initializeWithAmplitudeAnalytics(
          AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY,
        );
        experimentClient = client instanceof Promise ? await client : client;
      } catch (err) {
        if (process.env.NODE_ENV !== "production") console.error("❌ [Amplitude] Erro ao criar experimentClient:", err);
        return;
      }

      if (!experimentClient) {
        if (process.env.NODE_ENV !== "production") console.error("❌ [Amplitude] Falha ao obter experimentClient");
        return;
      }

      // Capturar UTMs
      const urlParams = new URLSearchParams(window.location.search);
      const utm_term = urlParams.get("utm_term") || undefined;
      const utm_source = urlParams.get("utm_source") || undefined;
      const utm_medium = urlParams.get("utm_medium") || undefined;
      const utm_campaign = urlParams.get("utm_campaign") || undefined;

      if (utm_term || utm_source || utm_medium || utm_campaign) {
        amplitude.track("user_properties", {
          utm_term,
          utm_source,
          utm_medium,
          utm_campaign,
        });
      }

      // Sincronizar variantes
      if (typeof experimentClient.fetch === "function") {
        if (process.env.NODE_ENV !== "production") console.log("🚀 [Amplitude] Sincronizando variantes com o servidor...");

        const userProperties: Record<string, any> = {
          utm_term,
          utm_source,
          utm_medium,
          utm_campaign,
          device_category: getDeviceCategory(),
          operating_system: getOperatingSystem(),
        };

        // Limpar undefined
        Object.keys(userProperties).forEach(key =>
          userProperties[key] === undefined && delete userProperties[key]
        );

        const analyticsDeviceId = amplitude.getDeviceId();
        const deviceId = analyticsDeviceId || storedDeviceId || localStorage.getItem("amp_device_id");

        if (process.env.NODE_ENV !== "production") console.log(`📡 [Amplitude] Contexto de sincronização: device_id=${deviceId}, UTMs=${!!utm_term}`);

        // Adicionar timeout à sincronização para não travar o carregamento da página
        const fetchWithTimeout = Promise.race([
          experimentClient.fetch({
            user_id: undefined,
            device_id: deviceId || undefined,
            user_properties: userProperties
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout sincronizando variantes")), 2500))
        ]);

        try {
          await fetchWithTimeout;
          if (process.env.NODE_ENV !== "production") console.log("✅ [Amplitude] Variantes sincronizadas!");
        } catch (fetchError) {
          if (process.env.NODE_ENV !== "production") console.error("❌ [Amplitude] Erro ou timeout na sincronização:", fetchError);
          // Prosseguimos mesmo com erro, o SDK usará fallbacks configurados
        }
      }

      if (process.env.NODE_ENV !== "production") console.log("✅ [Amplitude] Inicialização completa!");
    } catch (error) {
      if (process.env.NODE_ENV !== "production") console.error("❌ [Amplitude] Erro fatal durante a inicialização:", error);
      throw error;
    }
  })();

  return initializationPromise;
};

export const useAmplitude = () => {
  useEffect(() => {
    ensureAmplitudeInitialized().catch(() => {
      // Erro já logado no ensureAmplitudeInitialized
    });
  }, []);
};

export const trackEvent = (
  eventName: string,
  eventProperties?: Record<string, any>,
) => {
  // Construir propriedades do evento com parâmetros automáticos
  const enrichedProperties = {
    // Parâmetros obrigatórios
    custom_path: "/landing-page/plano",
    device_category: getDeviceCategory(),
    event: eventName,
    event_timestamp: new Date().toISOString(),
    event_type: eventName,
    operating_system: getOperatingSystem(),

    // Adicionar propriedades customizadas passadas
    ...eventProperties,
  };

  if (process.env.NODE_ENV !== "production") {
    console.log(`📊 trackEvent: ${eventName}`, enrichedProperties);
  }

  if (!AMPLITUDE_API_KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("❌ Sem API key para rastrear evento");
    }
    return;
  }

  try {
    amplitude.track(eventName, enrichedProperties);
    // Removed immediate flush - events are batched and sent automatically
    // Flushing on every trackEvent call causes significant performance issues (TBT ~500ms)
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`❌ Erro ao rastrear ${eventName}:`, error);
    }
  }
};

export const setUserId = (userId: string) => {
  if (!AMPLITUDE_API_KEY) {
    return;
  }

  amplitude.setUserId(userId);

  // Atualizar Experiment Client com novo userId
  if (experimentClient) {
    experimentClient.setUserId(userId);
    if (process.env.NODE_ENV !== "production") console.log("✅ User ID definido em Amplitude e Experiment:", userId);
  }
};

export const setUserProperties = (properties: Record<string, any>) => {
  if (!AMPLITUDE_API_KEY) {
    return;
  }

  // Enviar como um evento de propriedades do usuário
  amplitude.track("user_properties", properties);
};

/**
 * Obter variante do A/B Test usando Amplitude Feature Flags
 * Retorna a variante atribuída ao usuário
 * @param experimentKey - Chave do experimento (padrão: "005-card-planoiniciante")
 * @returns Variante atribuída ("control_50off" ou "treatment_100off")
 */
export const getHeroBannerVariant = async (
  experimentKey: string = "005-card-planoiniciante",
): Promise<string> => {
  try {
    // 1. Garantir que a inicialização global (incluindo analytics e fetch de variantes) esteja concluída
    await ensureAmplitudeInitialized();

    if (!experimentClient) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "⚠️ Experiment Client não disponível após inicialização, usando variante padrão",
        );
      }
      return "control";
    }

    // Obter variante do Amplitude - removed console.logs for production perf

    let userVariant = null;
    let variantError: any = null;

    // variant é uma função que recebe a chave do experimento
    if (typeof experimentClient.variant === "function") {
      try {
        const variantResult = experimentClient.variant(experimentKey);

        // O resultado pode ser um objeto com propriedades como: key, value, name, etc.
        if (typeof variantResult === "object" && variantResult !== null) {
          // No SDK moderno, .key costuma ser o ID/nome da variante ("variant_a", "control")
          userVariant =
            variantResult.key ||
            variantResult.value ||
            variantResult.name ||
            variantResult.variant;
        } else {
          userVariant = variantResult;
        }
      } catch (err) {
        variantError = err;
      }
    } else if (typeof experimentClient.getVariant === "function") {
      try {
        userVariant = experimentClient.getVariant(experimentKey);
      } catch (err) {
        variantError = err;
      }
    }

    // Se há variante e ela é uma string válida, usar ela; caso contrário, usar default
    let finalVariant = "control"; // Default fallback (novo nome de variante)

    if (typeof userVariant === "string" && userVariant.trim()) {
      finalVariant = userVariant;
    }
    // Removed verbose logging for production performance

    // Removed flush - events are batched automatically by Amplitude SDK

    return finalVariant;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`❌ Erro ao obter variante para ${experimentKey}:`, error);
    }
    return "control"; // Fallback
  }
};

export const getDeviceId = (): string | null => {
  try {
    // Se Amplitude já foi inicializado, usar o Device ID armazenado
    if (storedDeviceId) {
      return storedDeviceId;
    }

    // Tentar gerar se ainda não foi
    const deviceId = generateDeviceId();
    return deviceId;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("❌ Erro ao capturar Device ID:", error);
    }
    return null;
  }
};

export const addDeviceIdToUrl = (baseUrl: string): string => {
  const deviceId = getDeviceId();
  const params = new URLSearchParams();

  // Adicionar Device ID
  if (deviceId) {
    params.append("amp_device_id", deviceId);
  }

  // Capturar e adicionar gclid se existir na URL atual
  if (typeof window !== "undefined") {
    const currentParams = new URLSearchParams(window.location.search);
    const gclid = currentParams.get("gclid");

    if (gclid) {
      params.append("gclid", gclid);
    }

    // Capturar outros parâmetros UTM e rastreamento importantes
    const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_id", "utm_term", "utm_content", "fbclid", "_gl"];
    utmParams.forEach((param) => {
      const value = currentParams.get(param);
      if (value) {
        params.append(param, value);
      }
    });
  }

  // Construir URL final com todos os parâmetros
  const separator = baseUrl.includes("?") ? "&" : "?";
  const queryString = params.toString();
  const finalUrl = queryString ? `${baseUrl}${separator}${queryString}` : baseUrl;

  return finalUrl;
};

/**
 * Adiciona parâmetros de plano (plan_name e billing_option) à URL
 * Utilizado quando um usuário clica em "Contratar" de um plano específico
 */
export const addPlanParamsToUrl = (
  baseUrl: string,
  planName: string,
  billingOption: "mensal" | "anual",
): string => {
  const params = new URLSearchParams();

  // Adicionar plano e período de cobrança
  params.append("plan_name", planName.toLowerCase());
  params.append("billing_option", billingOption);

  // Construir URL final com os parâmetros de plano
  const separator = baseUrl.includes("?") ? "&" : "?";
  const queryString = params.toString();
  const finalUrl = queryString ? `${baseUrl}${separator}${queryString}` : baseUrl;

  return finalUrl;
};

/**
 * Obter informações de diagnóstico do experimento
 * Útil para validar se o experimento está configurado corretamente
 */
export const getExperimentDiagnostics = () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("🔍 DIAGNÓSTICO DE EXPERIMENTO");
    console.log("================================");

    console.log("📍 Configuração:");
    console.log(
      `   - API Key: ${AMPLITUDE_API_KEY ? "✅ Configurada" : "❌ Não configurada"}`,
    );
    console.log(
      `   - Deployment Key: ${AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY ? "✅ Configurada" : "❌ Não configurada"}`,
    );

    console.log("📍 Cliente Amplitude:");
    console.log(
      `   - Analytics Client: ${amplitude ? "✅ Inicializado" : "❌ Não inicializado"}`,
    );
    console.log(
      `   - Experiment Client: ${experimentClient ? "✅ Inicializado" : "❌ Não inicializado"}`,
    );
    console.log(`   - Device ID: ${storedDeviceId || "❌ Não disponível"}`);

    if (experimentClient) {
      console.log("📍 Métodos disponíveis no Experiment Client:");
      const methods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(experimentClient),
      );
      methods.forEach((method) => {
        console.log(`   - ${method}: ${typeof experimentClient[method]}`);
      });
    }

    console.log("================================");
  }
};

export const trackScreenView = (
  screenName?: string,
  additionalProps?: Record<string, any>,
) => {
  if (typeof window === "undefined") {
    if (process.env.NODE_ENV !== "production") {
      console.warn("⚠️ trackScreenView chamado em ambiente SSR");
    }
    return;
  }

  // Coletar informações comprehensive da página e do navegador
  const screenViewProps = {
    // Informações de página
    screen_name: screenName || document.title || "landing-page",
    page_title: document.title,
    page_url: window.location.href,
    page_pathname: window.location.pathname,
    page_hostname: window.location.hostname,
    page_referrer: document.referrer || "direct",

    // Informações de viewport e tela
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    device_pixel_ratio: window.devicePixelRatio,

    // Informações de dispositivo
    device_category: getDeviceCategory(),
    operating_system: getOperatingSystem(),
    user_agent: navigator.userAgent,

    // Informações de navegador
    language: navigator.language,
    languages: navigator.languages?.join(",") || navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezone_offset: new Date().getTimezoneOffset(),

    // Informações de memória e performance (se disponível)
    ...(navigator.deviceMemory && { device_memory_gb: navigator.deviceMemory }),
    ...(navigator.hardwareConcurrency && {
      cpu_cores: navigator.hardwareConcurrency,
    }),

    // Informações de conexão (se disponível)
    ...((navigator as any).connection && {
      connection_type: (navigator as any).connection.effectiveType,
      connection_downlink: (navigator as any).connection.downlink,
      connection_rtt: (navigator as any).connection.rtt,
      connection_save_data: (navigator as any).connection.saveData,
    }),

    // Timestamp do evento
    event_timestamp: new Date().toISOString(),
    timestamp_unix: Date.now(),

    // Informações customizadas adicionais
    ...additionalProps,
  };

  if (process.env.NODE_ENV !== "production") {
    console.log("📊 trackScreenView - Informações Coletadas:", screenViewProps);
  }

  trackEvent("screen_view", screenViewProps);
}
