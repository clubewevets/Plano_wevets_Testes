import { trackEvent, addDeviceIdToUrl, addPlanParamsToUrl } from "@/hooks/useAmplitude";

export const analyticsEvents = {
  // Navigation events
  navigateToSection: (sectionName: string) => {
    trackEvent("navigate_to_section", { section: sectionName });
  },

  // Mobile menu events
  clickMobileMenu: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "menu-sanduiche",
    });
  },

  // Menu navigation events
  clickMenuInicio: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "menu",
      detail: "inicio",
    });
  },

  clickMenuPlanos: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "menu",
      detail: "planos",
    });
  },

  clickMenuBeneficio: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "menu",
      detail: "beneficio",
    });
  },

  clickMenuComparePlanos: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "menu",
      detail: "compare-planos",
    });
  },

  clickMenuRedeCredenciada: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "menu",
      detail: "rede-credenciada",
    });
  },

  clickMenuDuvidas: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "menu",
      detail: "duvidas",
    });
  },

  clickMenuAreaTutor: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "menu",
      detail: "area-tutor",
    });
  },

  clickMenuEspecialista: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "menu",
      detail: "falar-especialista",
    });

    if (window.dataLayer) {
      window.dataLayer.push({
        event: "cta_wpp_planos",
        dataLayer_event_name: "cta_wpp_planos",
        timestamp: new Date().toISOString(),
      });
    }
  },

  // Banner events
  clickBannerContratar: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "banner",
      detail: "contratar-plano",
    });
  },

  clickConsulteRegulamento: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "consulte-regulamento",
    });
  },

  // Billing period toggle events
  clickBillingPeriodMensal: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "opcao-faturamento",
      detail: "mensal",
    });
  },

  clickBillingPeriodAnual: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "opcao-faturamento",
      detail: "anual",
    });
  },

  // Plan carousel hire events
  clickContrataRotinaMensal: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "contratar",
      detail: "rotina-mensal",
    });
  },

  clickContrataConfortoMensal: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "contratar",
      detail: "conforto-mensal",
    });
  },

  clickContrataSuperMensal: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "contratar",
      detail: "super-mensal",
    });
  },

  clickContrataUltraMensal: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "contratar",
      detail: "ultra-mensal",
    });
  },

  clickContrataRotinaAnual: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "contratar",
      detail: "rotina-anual",
    });
  },

  clickContrataConfortoAnual: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "contratar",
      detail: "conforto-anual",
    });
  },

  clickContrataSuperAnual: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "contratar",
      detail: "super-anual",
    });
  },

  clickContrataUltraAnual: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "contratar",
      detail: "ultra-anual",
    });
  },

  // Coverage table link events
  clickTabelaRotinaMensal: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "tabela",
      detail: "rotina-mensal",
    });
  },

  clickTabelaConfortoMensal: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "tabela",
      detail: "conforto-mensal",
    });
  },

  clickTabelaSuperMensal: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "tabela",
      detail: "super-mensal",
    });
  },

  clickTabelaUltraMensal: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "tabela",
      detail: "ultra-mensal",
    });
  },

  clickTabelaRotinaAnual: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "tabela",
      detail: "rotina-anual",
    });
  },

  clickTabelaConfortoAnual: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "tabela",
      detail: "conforto-anual",
    });
  },

  clickTabelaSuperAnual: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "tabela",
      detail: "super-anual",
    });
  },

  clickTabelaUltraAnual: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "tabela",
      detail: "ultra-anual",
    });
  },

  // Network (Rede Credenciada) events
  clickRedeCredenciada: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "rede-credenciada",
    });
  },

  clickRedeCredenciadaImagem: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "rede-credenciada-imagem",
    });
  },

  // Testimonials carousel events
  clickHistoriasQueInspiramLeft: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "historias-que-inspiram",
      detail: "left",
    });
  },

  clickHistoriasQueInspiramRight: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "historias-que-inspiram",
      detail: "right",
    });
  },

  // FAQ category events
  clickDuvidasContratacao: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "duvidas",
      detail: "contratacao",
    });
  },

  clickDuvidasCoberturas: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "duvidas",
      detail: "coberturas",
    });
  },

  clickDuvidasCarencias: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "duvidas",
      detail: "carencias",
    });
  },

  clickDuvidasPagamentos: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "duvidas",
      detail: "pagamentos",
    });
  },

  clickDuvidasGestao: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "duvidas",
      detail: "gestao",
    });
  },

  clickDuvidasUso: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "duvidas",
      detail: "uso",
    });
  },

  // Proteja seu pet block events
  clickProtejaContrataAgora: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "proteja-seu-pet",
      detail: "contratar-plano-agora",
    });

    if (window.dataLayer) {
      window.dataLayer.push({
        event: "cta_contratar_plano",
        dataLayer_event_name: "cta_contratar_plano",
        timestamp: new Date().toISOString(),
      });
    }
  },

  clickDuvidasFalarWhatsapp: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "duvidas",
      detail: "falar-whatsapp",
    });

    if (window.dataLayer) {
      window.dataLayer.push({
        event: "cta_wpp_planos",
        dataLayer_event_name: "cta_wpp_planos",
        timestamp: new Date().toISOString(),
      });
    }
  },

  // Footer events
  clickFooterAppIos: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "footer",
      detail: "app-ios",
    });
  },

  clickFooterAppAndroid: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "footer",
      detail: "app-android",
    });
  },

  clickFooterInstagram: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "footer",
      detail: "instagram",
    });
  },

  clickFooterYoutube: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "footer",
      detail: "youtube",
    });
  },

  clickFooterCentralAjuda: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "footer",
      detail: "central-ajuda",
    });
  },

  clickFooterSobreNos: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "footer",
      detail: "sobre-nos",
    });
  },

  clickFooterBlog: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "footer",
      detail: "blog",
    });
  },

  clickFooterTelefone: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "footer",
      detail: "telefone",
    });
  },

  // Floating button events
  clickBotaoFlutanteWhatsappDesktop: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "botao-flutuante",
      detail: "whatsapp-desktop",
    });

    if (window.dataLayer) {
      window.dataLayer.push({
        event: "cta_wpp_planos",
        dataLayer_event_name: "cta_wpp_planos",
        timestamp: new Date().toISOString(),
      });
    }
  },

  clickBotaoFlutanteWhatsappMobile: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "botao-flutuante",
      detail: "whatsapp",
    });

    if (window.dataLayer) {
      window.dataLayer.push({
        event: "cta_wpp_planos",
        dataLayer_event_name: "cta_wpp_planos",
        timestamp: new Date().toISOString(),
      });
    }
  },

  clickBotaoFlutanteContratar: () => {
    trackEvent("button_click", {
      event_type: "click",
      description: "botao-flutuante",
      detail: "contratar-plano",
    });

    if (window.dataLayer) {
      window.dataLayer.push({
        event: "cta_contratar_plano",
        dataLayer_event_name: "cta_contratar_plano",
        timestamp: new Date().toISOString(),
      });
    }
  },

  // Plan interaction events
  viewPlan: (planName: string) => {
    trackEvent("view_plan", { plan_name: planName });
  },

  clickHirePlan: (planName: string, description?: string, variant?: string) => {
    trackEvent("button_click", {
      button_type: "hire_plan",
      plan_name: planName,
      ...(description && { description }),
      ...(variant && { variant }),
    });
  },

  // Conforto Plan
  clickHirePlanConforto: (
    billingPeriod?: string,
    description?: string,
    detail?: string,
    destinationUrl?: string,
  ) => {
    trackEvent("button_click", {
      button_type: "plan_conforto",
      ...(billingPeriod && { billing_period: billingPeriod }),
      ...(description && { description }),
      ...(detail && { detail }),
    });

    if (detail && (detail.includes("conforto-mensal") || detail.includes("conforto-anual"))) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "cta_contratar_plano",
          dataLayer_event_name: "cta_contratar_plano",
          timestamp: new Date().toISOString(),
        });
      }
    }

    // Redirect with Device ID and Plan Params
    setTimeout(() => {
      const baseUrl = destinationUrl || "https://planowevets.com.br/login";
      // Adicionar parâmetros de plano (plan_name e billing_option)
      const urlWithPlanParams = billingPeriod
        ? addPlanParamsToUrl(baseUrl, "Conforto", billingPeriod as "mensal" | "anual")
        : baseUrl;
      const urlWithDeviceId = addDeviceIdToUrl(urlWithPlanParams);
      if (process.env.NODE_ENV !== "production") {
        console.log("🚀 Redirecionando para:", urlWithDeviceId);
      }
      window.location.href = urlWithDeviceId;
    }, 500);
  },

  clickHirePlanConfortoMensal: (
    billingPeriod?: string,
    description?: string,
    variant?: string,
  ) => {
    trackEvent("button_click", {
      button_type: "plan_conforto_mensal",
      ...(billingPeriod && { billing_period: billingPeriod }),
      ...(description && { description }),
      ...(variant && { variant }),
    });
  },

  // Super Plan
  clickHirePlanSuper: (
    billingPeriod?: string,
    description?: string,
    detail?: string,
    destinationUrl?: string,
  ) => {
    trackEvent("button_click", {
      button_type: "plan_super",
      ...(billingPeriod && { billing_period: billingPeriod }),
      ...(description && { description }),
      ...(detail && { detail }),
    });

    if (detail && (detail.includes("super-mensal") || detail.includes("super-anual"))) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "cta_contratar_plano",
          dataLayer_event_name: "cta_contratar_plano",
          timestamp: new Date().toISOString(),
        });
      }
    }

    // Redirect with Device ID and Plan Params
    setTimeout(() => {
      const baseUrl = destinationUrl || "https://planowevets.com.br/login";
      // Adicionar parâmetros de plano (plan_name e billing_option)
      const urlWithPlanParams = billingPeriod
        ? addPlanParamsToUrl(baseUrl, "Super", billingPeriod as "mensal" | "anual")
        : baseUrl;
      const urlWithDeviceId = addDeviceIdToUrl(urlWithPlanParams);
      if (process.env.NODE_ENV !== "production") {
        console.log("🚀 Redirecionando para:", urlWithDeviceId);
      }
      window.location.href = urlWithDeviceId;
    }, 500);
  },

  // Ultra Plan
  clickHirePlanUltra: (
    billingPeriod?: string,
    description?: string,
    detail?: string,
    destinationUrl?: string,
  ) => {
    trackEvent("button_click", {
      button_type: "plan_ultra",
      ...(billingPeriod && { billing_period: billingPeriod }),
      ...(description && { description }),
      ...(detail && { detail }),
    });

    if (detail && (detail.includes("ultra-mensal") || detail.includes("ultra-anual"))) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "cta_contratar_plano",
          dataLayer_event_name: "cta_contratar_plano",
          timestamp: new Date().toISOString(),
        });
      }
    }

    // Redirect with Device ID and Plan Params
    setTimeout(() => {
      const baseUrl = destinationUrl || "https://planowevets.com.br/login";
      // Adicionar parâmetros de plano (plan_name e billing_option)
      const urlWithPlanParams = billingPeriod
        ? addPlanParamsToUrl(baseUrl, "Ultra", billingPeriod as "mensal" | "anual")
        : baseUrl;
      const urlWithDeviceId = addDeviceIdToUrl(urlWithPlanParams);
      if (process.env.NODE_ENV !== "production") {
        console.log("🚀 Redirecionando para:", urlWithDeviceId);
      }
      window.location.href = urlWithDeviceId;
    }, 500);
  },

  clickHirePlanRotina: (
    billingPeriod?: string,
    description?: string,
    variant?: string,
  ) => {
    trackEvent("button_click", {
      button_type: "plan_rotina",
      ...(billingPeriod && { billing_period: billingPeriod }),
      ...(description && { description }),
      ...(variant && { variant }),
    });
  },

  clickHirePlanRotinaWithRedirect: (
    billingPeriod?: string,
    description?: string,
    detail?: string,
    destinationUrl?: string,
  ) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "🟢 clickHirePlanRotinaWithRedirect chamado com billingPeriod:",
        billingPeriod,
      );
    }
    trackEvent("button_click", {
      button_type: "plan_rotina",
      ...(billingPeriod && { billing_period: billingPeriod }),
      ...(description && { description }),
      ...(detail && { detail }),
    });

    if (detail && detail === "basico-mensal") {
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "cta_contratar_plano",
          dataLayer_event_name: "cta_contratar_plano",
          custom_path: "/landing-page/plano",
          event_type: "button_click",
          description: description || "",
          detail: detail,
        });
      }
    }

    // Aguarda mais tempo para garantir que o evento foi enviado ao Amplitude
    setTimeout(() => {
      const baseUrl = destinationUrl || "https://planowevets.com.br/login";
      // Adicionar parâmetros de plano (plan_name e billing_option)
      const urlWithPlanParams = billingPeriod
        ? addPlanParamsToUrl(baseUrl, "Rotina", billingPeriod as "mensal" | "anual")
        : baseUrl;
      const urlWithDeviceId = addDeviceIdToUrl(urlWithPlanParams);
      console.log("🚀 Redirecionando para:", urlWithDeviceId);
      window.location.href = urlWithDeviceId;
    }, 500);
  },

  // CTA events
  clickCTA: (
    ctaName: string,
    ctaLocation: string,
    description?: string,
    variant?: string,
  ) => {
    trackEvent("button_click", {
      button_type: "cta",
      cta_name: ctaName,
      cta_location: ctaLocation,
      ...(description && { description }),
      ...(variant && { variant }),
    });
  },

  // Hero section events
  clickHeroButton: (
    buttonText: string,
    description?: string,
    variant?: string,
  ) => {
    trackEvent("button_click", {
      button_type: "hero_button",
      button_text: buttonText,
      ...(description && { description }),
      ...(variant && { variant }),
    });
  },

  // Engagement events
  viewBenefits: () => {
    trackEvent("view_benefits");
  },

  viewTestimonials: () => {
    trackEvent("view_testimonials");
  },

  viewFAQ: () => {
    trackEvent("view_faq");
  },

  expandFAQItem: (question: string) => {
    trackEvent("expand_faq_item", { question });
  },

  // Link events
  clickExternalLink: (linkName: string, linkUrl: string) => {
    trackEvent("click_external_link", {
      link_name: linkName,
      link_url: linkUrl,
    });
  },

  clickTutorArea: () => {
    trackEvent("button_click", {
      button_type: "tutor_area",
    });
  },

  // Promo events
  viewPromo: (promoName: string) => {
    trackEvent("view_promo", { promo_name: promoName });
  },

  clickPromoLink: (promoName: string) => {
    trackEvent("button_click", {
      button_type: "promo_link",
      promo_name: promoName,
    });
  },

  clickDiscountPlanCTA: () => {
    trackEvent("button_click", {
      button_type: "discount_plan_cta",
      description: "plano-de-descontos-wevets",
    });
  },

  // Custom events for A/B testing
  trackVariantExposure: (experimentName: string, variantName: string) => {
    trackEvent("variant_exposure", {
      experiment_name: experimentName,
      variant_name: variantName,
    });
  },
};
