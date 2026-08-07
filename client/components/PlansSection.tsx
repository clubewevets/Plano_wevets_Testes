import { useState } from "react";
import { Check } from "lucide-react";

/**
 * Plan type definition
 */
export interface Plan {
  name: string;
  priceMonthly: string;
  priceAnnual: string;
  description: string;
  note?: string;
  features: (
    | string
    | {
        type: "structured";
        title?: string;
        items: string[];
      }
  )[];
  popular?: boolean;
}

/**
 * Props for PlansSection component
 */
export interface PlansSectionProps {
  plans: Plan[];
  coverageLinks?: { [key: string]: string };
  onPlanSelect?: (planName: string, billingPeriod: "mensal" | "anual") => void;
  onCoverageClick?: (planName: string, billingPeriod: "mensal" | "anual") => void;
  contractUrl?: string;
  showComparisonTable?: boolean;
  variant?: "default" | "minimal";
  title?: string;
  sectionId?: string;
}

/**
 * Reusable Plans Section Component
 *
 * This component displays a list of plans with pricing, features, and CTA buttons.
 * It's fully responsive (mobile and desktop) and supports A/B testing variants.
 *
 * Usage:
 * ```tsx
 * <PlansSection
 *   plans={PLANS}
 *   coverageLinks={COVERAGE_LINKS}
 *   onPlanSelect={handlePlanSelect}
 *   contractUrl="https://planowevets.com.br/login"
 * />
 * ```
 */
export function PlansSection({
  plans,
  coverageLinks = {},
  onPlanSelect,
  onCoverageClick,
  contractUrl = "https://planowevets.com.br/login",
  showComparisonTable = false,
  variant = "default",
  title = "Encontre o plano ideal para o seu pet",
  sectionId = "planos",
}: PlansSectionProps) {
  const [billingPeriod, setBillingPeriod] = useState<"mensal" | "anual">(
    "mensal"
  );

  const handleBillingPeriodChange = (period: "mensal" | "anual") => {
    setBillingPeriod(period);
  };

  const handleContractClick = (planName: string) => {
    if (onPlanSelect) {
      onPlanSelect(planName, billingPeriod);
    }
    // Navigate to contract URL
    window.open(contractUrl, "_blank");
  };

  const handleCoverageLink = (planName: string) => {
    if (onCoverageClick) {
      onCoverageClick(planName, billingPeriod);
    }
    const link = coverageLinks[planName];
    if (link) {
      window.open(link, "_blank");
    }
  };

  const getCoverageLink = (planName: string): string => {
    return coverageLinks[planName] || "";
  };

  // Render feature with proper structure handling
  const renderFeature = (feature: Plan["features"][0], planName: string) => {
    if (typeof feature === "string") {
      return (
        <li className="flex items-start gap-2">
          <div className="mt-1.5 w-4 h-4 rounded-full bg-wevets-cyan flex items-center justify-center flex-shrink-0">
            <svg
              className="w-2.5 h-2.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 10 10"
              strokeWidth="0.778"
            >
              <path
                d="M7.777 2.333L3.499 6.611L1.555 4.666"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            className="text-wevets-institutional text-sm"
            style={{ lineHeight: "22.75px" }}
          >
            {feature}
          </div>
        </li>
      );
    }

    if (feature.type === "structured") {
      return (
        <ul className="space-y-0">
          {feature.items.map((item, idx) => (
            <div
              key={idx}
              style={{
                marginTop: idx === 0 ? "0px" : "8px",
              }}
            >
              <li className="flex items-start gap-2">
                <div className="mt-1.5 w-4 h-4 rounded-full bg-wevets-cyan flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 10 10"
                    strokeWidth="0.778"
                  >
                    <path
                      d="M7.777 2.333L3.499 6.611L1.555 4.666"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  className="text-wevets-institutional text-sm"
                  style={{ lineHeight: "22.75px" }}
                >
                  <p>{item}</p>
                </div>
              </li>
            </div>
          ))}
        </ul>
      );
    }

    return null;
  };

  const getDiscountBadge = (planName: string) => {
    if (planName === "Conforto") {
      return billingPeriod === "mensal" ? "50% OFF 4 meses" : "2 meses OFF";
    }
    if (planName === "Rotina" || planName === "Super" || planName === "Ultra") {
      return billingPeriod === "mensal" ? "50% OFF 4 meses" : "2 meses OFF";
    }
    return "Mais popular";
  };

  const getOldPrice = (planName: string) => {
    const priceMap: {
      [key: string]: { mensal: string; anual: string };
    } = {
      Rotina: { mensal: "De R$ 14,90", anual: "De R$ 178,80" },
      Conforto: { mensal: "De R$ 49,90", anual: "De R$ 598,80" },
      Super: { mensal: "De R$ 109,90", anual: "De R$ 1.318,80" },
      Ultra: { mensal: "De R$ 209,90", anual: "De R$ 2.518,80" },
    };

    return priceMap[planName]?.[billingPeriod] || null;
  };

  const getFeatureTitle = (planName: string) => {
    if (planName === "Rotina") {
      return "Benefícios do Plano Rotina:";
    }
    if (planName === "Conforto") {
      return "Benefícios do Plano Rotina e mais:";
    }
    if (planName === "Super") {
      return "Benefícios do Plano Conforto e mais:";
    }
    return "Todos os benefícios dos Planos anteriores e mais:";
  };

  return (
    <section
      id={sectionId}
      className="px-6 py-12 bg-[#F5F1E8]"
      data-testid="plans-section"
    >
      <div className="max-w-md md:max-w-7xl mx-auto">
        {/* Title */}
        <h2
          className="text-3xl md:text-[32px] font-bold text-wevets-blue text-center mb-4 md:mb-4"
          style={{
            fontFamily: "Fields, sans-serif",
            letterSpacing: "-1.2px",
            lineHeight: "120%",
          }}
        >
          {title}
        </h2>

        {/* Billing Toggle */}
        <div
          className="flex justify-center mb-8 sticky-mobile"
          style={{
            backgroundColor: "#F5F1E8",
            paddingTop: "8px",
            paddingBottom: "8px",
            zIndex: "10",
          }}
        >
          <div
            className="inline-flex items-center rounded-full border p-1"
            style={{
              width: "221px",
              height: "40px",
              borderColor: "#E5E7EB",
              backgroundColor: "#F5F5F5",
            }}
          >
            <button
              id="btn-plan-mensal"
              onClick={() => handleBillingPeriodChange("mensal")}
              className={`flex flex-col justify-center items-center flex-1 h-full rounded-full transition-all ${
                billingPeriod === "mensal"
                  ? "bg-wevets-pink text-white font-bold"
                  : "text-wevets-blue bg-white font-normal"
              }`}
              style={{
                fontFamily: "Peridot PE Variable, sans-serif",
                fontSize: "14px",
                lineHeight: "20px",
                ...(billingPeriod === "mensal" && {
                  boxShadow: "0 0 0 3px white",
                }),
              }}
            >
              Mensal
            </button>
            <button
              id="btn-plan-anual"
              onClick={() => handleBillingPeriodChange("anual")}
              className={`flex flex-col justify-center items-center flex-1 h-full rounded-full transition-all ${
                billingPeriod === "anual"
                  ? "bg-wevets-pink text-white font-bold"
                  : "text-wevets-blue bg-white font-normal"
              }`}
              style={{
                fontFamily: "Peridot PE Variable, sans-serif",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              Anual
            </button>
          </div>
        </div>

        {/* Mobile Plans */}
        <div className="md:hidden space-y-5">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col p-6 rounded-2xl bg-white justify-between ${
                plan.popular ? "border border-wevets-cyan" : ""
              }`}
              data-testid={`plan-card-mobile-${plan.name}`}
            >
              {/* Plan Header */}
              <div className="flex justify-between items-start mb-4 w-full">
                <h3
                  className="plan-heading text-2xl font-medium text-wevets-blue/60 uppercase tracking-wide"
                  style={{
                    fontFamily: "Font52602, sans-serif",
                    letterSpacing: "0.6px",
                  }}
                >
                  {plan.name}
                </h3>
                <div className="flex flex-col gap-1">
                  <div className="bg-[#D0E8FF] px-2 py-0.5 rounded">
                    <span
                      className="text-[#0066CC] text-[11px] font-bold uppercase tracking-tight whitespace-nowrap"
                      style={{ letterSpacing: "0.5px" }}
                    >
                      {getDiscountBadge(plan.name)}
                    </span>
                  </div>
                  {plan.name === "Ultra" && (
                    <div className="bg-[#BDE3CA] px-2 py-0.5 rounded flex items-center justify-center gap-1">
                      <Check className="w-3 h-3 text-[#0B5F3F]" />
                      <span
                        className="text-[#0B5F3F] text-[11px] font-bold uppercase tracking-tight whitespace-nowrap"
                        style={{ letterSpacing: "0.5px" }}
                      >
                        Mais limites
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Old Price */}
              {getOldPrice(plan.name) && (
                <div style={{ marginBottom: "0px" }}>
                  <s
                    style={{
                      display: "inline",
                      fontWeight: "400",
                      color: "rgb(6, 41, 91)",
                    }}
                  >
                    {getOldPrice(plan.name)}
                  </s>
                </div>
              )}

              {/* Price */}
              <div className="flex items-end gap-1 mb-3">
                <span
                  className="text-[40px] font-bold text-wevets-blue leading-9"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <span style={{ fontSize: "24px" }}>R$</span>{" "}
                  {billingPeriod === "mensal"
                    ? plan.priceMonthly
                    : plan.priceAnnual}
                </span>
                <span className="text-gray-500 text-xs leading-4 mb-0.5">
                  {billingPeriod === "mensal" ? "/mês" : "/ano"}
                </span>
              </div>

              {/* Description */}
              <p
                className="text-wevets-blue/70 text-base mb-4"
                style={{ lineHeight: "22.75px" }}
              >
                {plan.name === "Rotina" ? (
                  <>
                    <strong>Cuidados básicos:</strong> ideal para filhotes, pets saudáveis e manter a saúde em dia.
                  </>
                ) : plan.name === "Conforto" ? (
                  <>
                    <strong>Diagnóstico e prevenção:</strong> ideal para pets que precisam de exames de imagem e mais procedimentos.
                  </>
                ) : plan.name === "Super" ? (
                  <>
                    <strong>Tratamento contínuo:</strong> ideal para pets que precisam de especialistas, com cirurgia e internação.
                  </>
                ) : plan.name === "Ultra" ? (
                  <>
                    <strong>Cobertura máxima e com mais limites:</strong> ideal para pets idosos ou com doenças crônicas, da rotina à UTI.
                  </>
                ) : (
                  plan.description
                )}
              </p>

              {/* CTA Button */}
              <button
                onClick={() => handleContractClick(plan.name)}
                className="w-full bg-wevets-cyan text-white py-2.5 rounded-xl font-bold text-base hover:bg-opacity-90 transition-all mb-1 block text-center"
                style={{ pointerEvents: "auto" }}
              >
                Contratar
              </button>

              {/* Note */}
              {plan.note && (
                <p
                  className="text-wevets-institutional text-sm mb-4"
                  style={{ lineHeight: "22.75px" }}
                >
                  {plan.note}
                </p>
              )}

              {/* Features */}
              <div>
                <p
                  className="text-wevets-blue font-bold text-base mb-2"
                  style={{ lineHeight: "22.75px" }}
                >
                  {getFeatureTitle(plan.name)}
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <div key={i}>{renderFeature(feature, plan.name)}</div>
                  ))}
                </ul>
              </div>

              {/* Coverage Link */}
              {getCoverageLink(plan.name) && (
                <button
                  onClick={() => handleCoverageLink(plan.name)}
                  className="w-full text-center text-wevets-cyan hover:underline transition-all mt-4"
                  style={{
                    fontFamily: "Peridot PE Variable, sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    pointerEvents: "auto",
                    textDecoration: "underline",
                  }}
                >
                  Tabela de cobertura e coparticipação
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Plans Grid */}
        <div
          className={`hidden md:grid md:gap-6 md:justify-center md:w-full ${
            plans.length === 3
              ? "md:grid-cols-3 max-w-5xl mx-auto"
              : "md:grid-cols-4"
          }`}
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col items-start gap-6 p-6 rounded-2xl bg-white justify-between min-h-[600px] ${
                plan.popular ? "border border-wevets-cyan" : ""
              }`}
              data-testid={`plan-card-desktop-${plan.name}`}
            >
              {/* Plan Header */}
              <div className="flex justify-between items-start w-full gap-2">
                <h3
                  className="text-2xl font-medium text-wevets-blue/60"
                  style={{
                    fontFamily: "Font52602, sans-serif",
                    letterSpacing: "0.6px",
                    textTransform: "capitalize",
                  }}
                >
                  {plan.name}
                </h3>
                <div className="flex flex-col gap-1">
                  <div className="bg-[#D0E8FF] px-2 py-1 rounded text-[11px]">
                    <span
                      className="text-[#0066CC] font-bold uppercase whitespace-nowrap"
                      style={{
                        letterSpacing: "0.5px",
                        fontFamily: "Peridot PE Variable, sans-serif",
                      }}
                    >
                      {getDiscountBadge(plan.name)}
                    </span>
                  </div>
                  {plan.name === "Ultra" && (
                    <div className="bg-[#BDE3CA] px-2 py-1 rounded text-[11px] flex items-center justify-center gap-1">
                      <Check className="w-3.5 h-3.5 text-[#0B5F3F]" />
                      <span
                        className="text-[#0B5F3F] font-bold uppercase whitespace-nowrap"
                        style={{
                          letterSpacing: "0.5px",
                          fontFamily: "Peridot PE Variable, sans-serif",
                        }}
                      >
                        Mais limites
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Section */}
              <div className="flex flex-col gap-3 w-full md:min-h-[85px]">
                {getOldPrice(plan.name) && (
                  <div style={{ marginTop: "-15px" }}>
                    <s
                      style={{
                        color: "rgb(6, 41, 91)",
                        display: "inline",
                        fontWeight: "400",
                      }}
                    >
                      {getOldPrice(plan.name)}
                    </s>
                  </div>
                )}
                <div className="flex items-end gap-1">
                  <span
                    className="text-[32px] font-bold text-wevets-blue leading-9"
                    style={{ fontFamily: "Fields, sans-serif", marginTop: "-15px", marginBottom: "-15px" }}
                  >
                    <span style={{ fontSize: "20px" }}>R$</span>{" "}
                    {plan.name === "Conforto" && billingPeriod === "mensal"
                      ? "24,95"
                      : billingPeriod === "mensal"
                        ? plan.priceMonthly
                        : plan.priceAnnual}
                  </span>
                  <span
                    className="text-gray-500 text-xs leading-4"
                    style={{ fontFamily: "Peridot PE Variable, sans-serif" }}
                  >
                    {billingPeriod === "mensal" ? "/mês" : "/ano"}
                  </span>
                </div>
                <p
                  className="text-wevets-blue/70"
                  style={{
                    marginBottom: "16px",
                    font: '400 12px/23px "Peridot PE Variable", sans-serif',
                  }}
                >
                  {plan.name === "Rotina" ? (
                    <>
                      <strong>Cuidados básicos:</strong> ideal para filhotes, pets saudáveis e manter a saúde em dia.
                    </>
                  ) : plan.name === "Conforto" ? (
                    <>
                      <strong>Diagnóstico e prevenção:</strong> ideal para pets que precisam de exames de imagem e mais procedimentos.
                    </>
                  ) : plan.name === "Super" ? (
                    <>
                      <strong>Tratamento contínuo:</strong> ideal para pets que precisam de especialistas, com cirurgia e internação.
                    </>
                  ) : plan.name === "Ultra" ? (
                    <>
                      <strong>Cobertura máxima e com mais limites:</strong> ideal para pets idosos ou com doenças crônicas, da rotina à UTI.
                    </>
                  ) : (
                    plan.description
                  )}
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleContractClick(plan.name)}
                className="w-full bg-wevets-cyan text-white py-2.5 rounded-lg font-bold text-base hover:bg-opacity-90 transition-all inline-block text-center"
                style={{ fontFamily: "Peridot PE Variable, sans-serif" }}
              >
                Contratar {plan.name}
              </button>

              {/* Features */}
              <div className="w-full flex flex-col gap-2">
                {plan.name !== "Rotina" && (
                  <p
                    className="text-wevets-blue font-bold text-base"
                    style={{
                      font: '700 14px/23px "Peridot PE Variable", sans-serif',
                      marginTop: "-15px",
                    }}
                  >
                    {getFeatureTitle(plan.name)}
                  </p>
                )}
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div
                        className="text-wevets-institutional text-sm"
                        style={{
                          fontFamily: "Peridot PE Variable, sans-serif",
                          lineHeight: "22.75px",
                        }}
                      >
                        {typeof feature === "string" ? (
                          feature
                        ) : feature.type === "structured" ? (
                          <>
                            {feature.items.map((item, idx) => (
                              <div
                                key={idx}
                                style={{
                                  marginTop: idx === 0 ? "-15px" : "5px",
                                }}
                              >
                                <p>{item}</p>
                              </div>
                            ))}
                          </>
                        ) : (
                          feature
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coverage Link */}
              {getCoverageLink(plan.name) && (
                <button
                  onClick={() => handleCoverageLink(plan.name)}
                  className="w-full text-center text-wevets-cyan hover:underline transition-all"
                  style={{
                    fontFamily: "Peridot PE Variable, sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    marginTop: "auto",
                    cursor: "pointer",
                    pointerEvents: "auto",
                    textDecoration: "underline",
                  }}
                >
                  Tabela de cobertura e coparticipação
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Disclaimer Text */}
        <p
          className="text-center mt-6 text-wevets-blue/60"
          style={{
            fontFamily: "Peridot PE Variable, sans-serif",
            fontSize: "12px",
            lineHeight: "16px",
          }}
        >
          *Economia calculada em comparação à média nacional de preços de
          atendimentos veterinários particulares.
        </p>
      </div>
    </section>
  );
}

export default PlansSection;
