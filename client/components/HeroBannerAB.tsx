import { useEffect, useState } from "react";
import { Hospital, Clock, Shield } from "lucide-react";
import {
  useAmplitude,
  getHeroBannerVariant,
  getExperimentDiagnostics,
} from "@/hooks/useAmplitude";
import { useExperimentVariant } from "@/hooks/ExperimentContext";
import { analyticsEvents } from "@/utils/analyticsEvents";

/**
 * HeroBannerAB - Componente que renderiza variantes diferentes
 * baseado em um experimento A/B no Amplitude
 *
 * Variantes:
 * - variant_a: Exibe 4 planos (Rotina, Conforto, Super, Ultra)
 * - control: Exibe 3 planos (Conforto, Super, Ultra)
 */
export function HeroBannerAB() {
  useAmplitude(); // Inicializar Amplitude
  const { setVariant: setGlobalVariant } = useExperimentVariant();
  const [variant, setVariant] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadVariant = async () => {
      try {
        if (process.env.NODE_ENV !== "production") {
          console.log("🔄 HeroBannerAB: Solicitando variante...");
        }

        const assignedVariant = await getHeroBannerVariant(
          "005-card-planoiniciante",
        );

        if (process.env.NODE_ENV !== "production") {
          console.log("✅ HeroBannerAB: Variante recebida:", assignedVariant);
          console.log("📍 Tipo da variante:", typeof assignedVariant);
        }

        // Mostrar diagnóstico após carregar a variante
        getExperimentDiagnostics();

        if (
          assignedVariant === "variant_a" ||
          assignedVariant === "control"
        ) {
          setVariant(assignedVariant);
          setGlobalVariant(assignedVariant);
          setError(null);
        } else {
          if (process.env.NODE_ENV !== "production") {
            console.warn(
              "⚠️ Variante inválida retornada:",
              assignedVariant,
              "usando fallback control",
            );
          }
          setVariant("control");
          setGlobalVariant("control");
          setError(null);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        if (process.env.NODE_ENV !== "production") {
          console.error("❌ Erro ao carregar variante:", error);
          console.error("📍 Stack:", error.stack);
        }
        setError(error);
        setVariant("control"); // Fallback
        setGlobalVariant("control");

        // Mostrar diagnóstico também em caso de erro
        getExperimentDiagnostics();
      } finally {
        setIsLoading(false);
      }
    };

    loadVariant();
  }, []);

  if (isLoading) {
    return (
      <section id="inicio" className="relative overflow-hidden bg-[#FBF7EF]">
        <div className="h-[400px] md:h-[636px] flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Carregando...</div>
        </div>
      </section>
    );
  }

  // VARIANTE A: 4 PLANOS (ROTINA + 3)
  if (variant === "variant_a") {
    return (
      <section id="inicio" className="relative overflow-hidden">
        {/* Mobile Hero */}
        <div className="md:hidden flex flex-col bg-[#06295B]">
          <div className="px-2 py-8 flex flex-col items-center gap-2 max-w-[375px] mx-auto w-full">
            {/* Badge */}
            <div className="inline-flex items-center justify-center px-3 py-1 border rounded-lg hero-badge">
              <span
                className="text-center font-bold uppercase tracking-wider hero-badge-text"
                style={{
                  fontFamily: "Peridot PE Variable, sans-serif",
                  fontSize: "14px",
                  lineHeight: "14px",
                  letterSpacing: "1px",
                }}
              >
                PLANO DE SAÚDE PET
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center gap-2 w-full antialiased">
              {/* Title */}
              <h1
                className="text-white text-center font-bold w-full"
                style={{
                  fontFamily: "Fields, sans-serif",
                  fontSize: "34px",
                  lineHeight: "37.4px",
                  letterSpacing: "0.2px",
                }}
              >
                <span data-teams="true" className="hero-title-first" style={{ color: "white" }}>
                  {"\u00A0"}Plano de saúde pet
                </span>
                <br />
                <span className="hero-title-second" style={{ color: "white" }}>
                  <span className="font-normal">pela</span> metade do preço
                </span>
              </h1>

              {/* Hero Image - Below subtitle on Mobile */}
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fad3b24e0eebc41a888274aae2381ca13%2F28a84ac6adb5454990150589c6a85192?format=webp&width=720&height=900"
                alt="Promoção WeVets"
                className="w-full h-auto"
                fetchPriority="high"
                width={720}
                height={900}
              />

              {/* Mobile Benefits Card */}
              <div className="bg-white p-6 rounded-[32px] shadow-lg shadow-black/5 w-full mt-2 flex flex-col gap-5 antialiased">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-wevets-cyan/10 rounded-xl flex items-center justify-center text-wevets-cyan shrink-0">
                      <Hospital className="w-5 h-5" />
                    </div>
                    <span className="text-[#055391] font-bold text-[15px] leading-tight text-left">
                      Hospitais 24h e rede credenciada
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-wevets-cyan/10 rounded-xl flex items-center justify-center text-wevets-cyan shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-[#055391] font-bold text-[15px] leading-tight text-left">
                      Use ainda hoje, plano ativo em 1h
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-wevets-cyan/10 rounded-xl flex items-center justify-center text-wevets-cyan shrink-0">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="text-[#055391] font-bold text-[15px] leading-tight text-left">
                      Carência zero em consultas e vacinas
                    </span>
                  </div>
                </div>

                <button
                  id="btn-hero-contratar-mobile-ab"
                  onClick={() => {
                    analyticsEvents.clickBannerContratar();
                    const planosSection = document.getElementById("planos");
                    if (planosSection) {
                      planosSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full py-4 bg-[#1AA4FF] text-white font-bold text-lg rounded-2xl hover:bg-opacity-90 transition-all shadow-md shadow-[#1AA4FF]/20"
                  style={{ fontFamily: "Peridot PE Variable, sans-serif" }}
                >
                  Contratar plano
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Hero - CONTROL: 50% OFF */}
        <div
          className="hidden md:block md:relative md:w-screen md:overflow-hidden"
          style={{
            backgroundColor: "#06295B",
            height: "636px",
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2Fad3b24e0eebc41a888274aae2381ca13%2F4ef48102ffb14739bb3dd603b44d4cf7?format=webp&width=1440&height=800)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center antialiased">
            <div
              className="flex flex-col items-start gap-8"
              style={{
                padding: "100px 0 100px 144px",
                maxWidth: "800px",
              }}
            >
              <div className="flex flex-col items-start gap-6">
                {/* Badge */}
                <div
                  className="inline-flex justify-center items-center gap-2.5 px-3 py-1.5 rounded-lg"
                  style={{
                    border: "1px solid #1AA4FF",
                  }}
                >
                  <span
                    className="text-center font-bold uppercase"
                    style={{
                      fontFamily: "Peridot PE Variable, sans-serif",
                      fontSize: "18px",
                      lineHeight: "18px",
                      letterSpacing: "1px",
                      color: "#1AA4FF",
                    }}
                  >
                    PLANO DE SAÚDE PET
                  </span>
                </div>

                {/* Title */}
                <h1
                  className="font-bold"
                  style={{
                    fontFamily: "Fields, sans-serif",
                    fontSize: "52px",
                    lineHeight: "64px",
                    letterSpacing: "0.5px",
                    color: "white",
                  }}
                >
                  <span data-teams="true" className="whitespace-nowrap" style={{ color: "#06295B" }}>Plano de saúde pet</span>
                  <br />
                  <span className="whitespace-nowrap" style={{ color: "#06295B" }}>
                    <span className="font-normal">pela</span> metade do preço
                  </span>
                </h1>
              </div>

              {/* Coupon Section */}
              <div className="flex flex-col items-start gap-2">
                {/* Subtitle */}
                <p
                  style={{
                    fontFamily: "Peridot PE Variable, sans-serif",
                    fontSize: "31px",
                    lineHeight: "120%",
                    letterSpacing: "0.5px",
                    opacity: 0.9,
                    color: "white",
                  }}
                >
                  <span><strong style={{ color: "#06295B" }}>Use o cupom:</strong></span>
                </p>

                {/* Coupon Image */}
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fad3b24e0eebc41a888274aae2381ca13%2F28284a31d0ee47c8bac943ec7ebc2eed"
                  alt="Cupom ECONOMIZE50"
                  style={{ width: "300px", height: "auto", marginBottom: "12px" }}
                  loading="lazy"
                  width={300}
                  height={150}
                />
              </div>

              {/* CTA Button */}
              <button
                id="btn-hero-contratar-desktop-ab"
                onClick={() => {
                  analyticsEvents.clickBannerContratar();
                  const planosSection = document.getElementById("planos");
                  if (planosSection) {
                    planosSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center inline-flex"
                style={{
                  width: "345px",
                  height: "60px",
                  fontFamily: "Peridot PE Variable, sans-serif",
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  backgroundColor: "#1AA4FF",
                  color: "#FFFFFF",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1AA4FF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#1AA4FF";
                }}
              >
                Contratar Agora
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // VARIANTE CONTROLE: 3 PLANOS (SEM ROTINA)
  if (variant === "control") {
    return (
      <section id="inicio" className="relative overflow-hidden">
        {/* Mobile Hero */}
        <div className="md:hidden flex flex-col bg-[#06295B]">
          <div className="px-2 py-8 flex flex-col items-center gap-2 max-w-[375px] mx-auto w-full">
            {/* Badge */}
            <div className="inline-flex items-center justify-center px-3 py-1 border rounded-lg hero-badge">
              <span
                className="text-center font-bold uppercase tracking-wider hero-badge-text"
                style={{
                  fontFamily: "Peridot PE Variable, sans-serif",
                  fontSize: "14px",
                  lineHeight: "14px",
                  letterSpacing: "1px",
                }}
              >
                PLANO DE SAÚDE PET
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center gap-2 w-full antialiased">
              {/* Title */}
              <h1
                className="text-white text-center font-bold w-full"
                style={{
                  fontFamily: "Fields, sans-serif",
                  fontSize: "34px",
                  lineHeight: "37.4px",
                  letterSpacing: "0.2px",
                }}
              >
                <span data-teams="true" className="hero-title-first" style={{ color: "white" }}>
                  {"\u00A0"}Plano de saúde pet
                </span>
                <br />
                <span className="hero-title-second" style={{ color: "white" }}>
                  <span className="font-normal">pela</span> metade do preço
                </span>
              </h1>

              {/* Hero Image - Below subtitle on Mobile */}
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fad3b24e0eebc41a888274aae2381ca13%2F28a84ac6adb5454990150589c6a85192?format=webp&width=720&height=900"
                alt="Promoção WeVets"
                className="w-full h-auto"
                fetchPriority="high"
                width={720}
                height={900}
              />

              {/* Mobile Benefits Card */}
              <div className="bg-white p-6 rounded-[32px] shadow-lg shadow-black/5 w-full mt-2 flex flex-col gap-5 antialiased">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-wevets-cyan/10 rounded-xl flex items-center justify-center text-wevets-cyan shrink-0">
                      <Hospital className="w-5 h-5" />
                    </div>
                    <span className="text-[#055391] font-bold text-[15px] leading-tight text-left">
                      Hospitais 24h e rede credenciada
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-wevets-cyan/10 rounded-xl flex items-center justify-center text-wevets-cyan shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-[#055391] font-bold text-[15px] leading-tight text-left">
                      Use ainda hoje, plano ativo em 1h
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-wevets-cyan/10 rounded-xl flex items-center justify-center text-wevets-cyan shrink-0">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="text-[#055391] font-bold text-[15px] leading-tight text-left">
                      Carência zero em consultas e vacinas
                    </span>
                  </div>
                </div>

                <button
                  id="btn-hero-contratar-mobile-ab-treatment"
                  onClick={() => {
                    analyticsEvents.clickBannerContratar();
                    const planosSection = document.getElementById("planos");
                    if (planosSection) {
                      planosSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full py-4 bg-[#1AA4FF] text-white font-bold text-lg rounded-2xl hover:bg-opacity-90 transition-all shadow-md shadow-[#1AA4FF]/20"
                  style={{ fontFamily: "Peridot PE Variable, sans-serif" }}
                >
                  Contratar plano
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Hero - TREATMENT: MESMO TEXTO, BACKGROUND DIFERENTE */}
        <div
          className="hidden md:block md:relative md:w-screen md:overflow-hidden"
          style={{
            backgroundColor: "#06295B",
            height: "636px",
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2Fad3b24e0eebc41a888274aae2381ca13%2F4ef48102ffb14739bb3dd603b44d4cf7?format=webp&width=1440&height=800)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center antialiased">
            <div
              className="flex flex-col items-start gap-8"
              style={{
                padding: "100px 0 100px 144px",
                maxWidth: "800px",
              }}
            >
              <div className="flex flex-col items-start gap-6">
                {/* Badge */}
                <div
                  className="inline-flex justify-center items-center gap-2.5 px-3 py-1.5 rounded-lg"
                  style={{
                    border: "1px solid #1AA4FF",
                  }}
                >
                  <span
                    className="text-center font-bold uppercase"
                    style={{
                      fontFamily: "Peridot PE Variable, sans-serif",
                      fontSize: "18px",
                      lineHeight: "18px",
                      letterSpacing: "1px",
                      color: "#1AA4FF",
                    }}
                  >
                    PLANO DE SAÚDE PET
                  </span>
                </div>

                {/* Title */}
                <h1
                  className="font-bold"
                  style={{
                    fontFamily: "Fields, sans-serif",
                    fontSize: "52px",
                    lineHeight: "64px",
                    letterSpacing: "0.5px",
                    color: "white",
                  }}
                >
                  <span data-teams="true" className="whitespace-nowrap" style={{ color: "white" }}>Plano de saúde pet</span>
                  <br />
                  <span className="whitespace-nowrap" style={{ color: "white" }}>
                    <span className="font-normal">pela</span> metade do preço
                  </span>
                </h1>
              </div>

              {/* Coupon Section */}
              <div className="flex flex-col items-start gap-2">
                {/* Subtitle */}
                <p
                  style={{
                    fontFamily: "Peridot PE Variable, sans-serif",
                    fontSize: "31px",
                    lineHeight: "120%",
                    letterSpacing: "0.5px",
                    opacity: 0.9,
                    color: "white",
                  }}
                >
                  <span><strong style={{ color: "white" }}>Use o cupom:</strong></span>
                </p>

                {/* Coupon Image */}
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fad3b24e0eebc41a888274aae2381ca13%2F28284a31d0ee47c8bac943ec7ebc2eed"
                  alt="Cupom ECONOMIZE50"
                  style={{ width: "300px", height: "auto", marginBottom: "12px" }}
                  loading="lazy"
                  width={300}
                  height={150}
                />
              </div>

              {/* CTA Button */}
              <button
                id="btn-hero-contratar-desktop-ab-treatment"
                onClick={() => {
                  analyticsEvents.clickBannerContratar();
                  const planosSection = document.getElementById("planos");
                  if (planosSection) {
                    planosSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center inline-flex"
                style={{
                  width: "345px",
                  height: "60px",
                  fontFamily: "Peridot PE Variable, sans-serif",
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  backgroundColor: "#1AA4FF",
                  color: "#FFFFFF",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1AA4FF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#1AA4FF";
                }}
              >
                Contratar Agora
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback padrão (não deve acontecer em condições normais)
  console.error(
    `❌ HeroBannerAB: Nenhuma variante corresponde. variant=${variant}, error=${error?.message}`,
  );
  return (
    <section id="inicio" className="relative overflow-hidden bg-[#FBF7EF]">
      <div className="h-[400px] md:h-[636px] flex items-center justify-center">
        <div className="flex flex-col gap-2 text-center">
          <div className="text-gray-600 font-semibold">
            Erro ao carregar variante
          </div>
          {error && (
            <div className="text-gray-500 text-sm max-w-md">
              {error.message}
            </div>
          )}
          <div className="text-gray-400 text-xs mt-2">
            variant={variant}, isLoading={isLoading}
          </div>
        </div>
      </div>
    </section>
  );
}
