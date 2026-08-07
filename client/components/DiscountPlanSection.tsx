import { useEffect, useState } from "react";
import { Stethoscope, Syringe, Beaker, Hospital, CheckCircle, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile";
import { addDeviceIdToUrl } from "../hooks/useAmplitude";
import { analyticsEvents } from "../utils/analyticsEvents";

export function DiscountPlanSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleRedirect = () => {
    analyticsEvents.clickDiscountPlanCTA();
    const destinationUrl = "https://planowevets.com.br/login";
    const urlWithDeviceId = addDeviceIdToUrl(destinationUrl);
    window.location.href = urlWithDeviceId;
  };

  return (
    <section className="w-full bg-[#FBF7EF] py-10 md:py-12 px-6 md:px-16 overflow-hidden relative border-t border-wevets-blue/5">
      {/* Background Image (1:1) - Centered on mobile, right-aligned on desktop */}
      <div className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-0 top-0 h-full aspect-square pointer-events-none z-0 scale-100 md:scale-110 md:origin-right opacity-30 md:opacity-100 hidden md:block">
        {/* Mobile Image */}
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fad3b24e0eebc41a888274aae2381ca13%2Fa7cd8879180343b2b690be2a1c08c029?format=webp&width=800&height=1200"
          alt="Veterinária Mobile"
          className="w-full h-full object-cover brightness-110 block md:hidden"
          loading="lazy"
        />
        {/* Desktop Image */}
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fad3b24e0eebc41a888274aae2381ca13%2Fa7cd8879180343b2b690be2a1c08c029?format=webp&width=800&height=1200"
          alt="Veterinária Desktop"
          className="w-full h-full object-cover brightness-110 hidden md:block"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-white/40 md:bg-transparent bg-gradient-to-l from-transparent to-white/70 md:to-white/20"></div>
      </div>

      {/* Subtle decorative background elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-wevets-cyan opacity-5 rounded-full -mr-24 -mt-24 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-wevets-pink opacity-5 rounded-full -ml-32 -mb-32 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center">
          {/* Left Column: Title and Key Info */}
          <div className="w-full lg:w-[45%] flex flex-col gap-5 text-wevets-blue text-left">
            <div className="inline-flex items-center gap-2 text-wevets-cyan font-bold tracking-widest uppercase text-[10px] md:text-xs">
              <span className="h-[1px] w-6 bg-wevets-cyan"></span>
              NOVIDADE: Pacote DE DESCONTOS WEVETS
            </div>
            
            <h2
              className="text-3xl md:text-3xl lg:text-4xl font-bold leading-tight"
              style={{ fontFamily: "Fields, sans-serif" }}
            >
              Cuidado básico com até <span className="text-wevets-cyan">70% de desconto.</span>
            </h2>
            
            <div className="p-4 bg-gray-50/50 md:bg-gray-50/30 border border-wevets-blue/10 rounded-2xl backdrop-blur-md md:backdrop-blur-none">
              <p className="text-wevets-cyan font-bold text-base mb-1 leading-snug antialiased">
                Aqui, você não contrata coberturas que talvez nunca use.
              </p>
              <p className="text-xl md:text-xl font-bold text-wevets-blue antialiased leading-tight">
                Pague <span className="text-wevets-pink">R$ 149,00 por ano</span> e cuide da saúde com descontos exclusivos.
              </p>
            </div>
          </div>

          {/* Right Column: Benefits Grid and CTA */}
          <div className="w-full lg:w-[55%] relative flex justify-center lg:justify-start">
            <div className="relative z-10 flex flex-col gap-4 w-full md:w-[70%] lg:w-[60%]">
              <div className="grid grid-cols-2 gap-3 items-stretch">
                {/* Benefit Row 1 */}
                <motion.div
                  animate={{
                    scale: activeIndex === 0 ? 1.03 : 1,
                    backgroundColor: activeIndex === 0
                      ? (isMobile ? "rgba(249, 250, 251, 0.8)" : "rgba(249, 250, 251, 0.9)")
                      : (isMobile ? "rgba(249, 250, 251, 0.4)" : "rgba(249, 250, 251, 0.5)"),
                    borderColor: activeIndex === 0
                      ? (isMobile ? "rgba(11, 191, 198, 0.6)" : "rgba(6, 41, 91, 0.2)")
                      : (isMobile ? "rgba(6, 41, 91, 0.05)" : "rgba(6, 41, 91, 0.1)"),
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-full p-3.5 md:p-3 rounded-2xl border flex items-center gap-3 transition-colors hover:bg-gray-50/50 backdrop-blur-md md:backdrop-blur-none"
                >
                  <div className="w-9 h-9 md:w-9 md:h-9 bg-wevets-cyan/30 rounded-xl flex items-center justify-center text-wevets-cyan shrink-0">
                    <Stethoscope className="w-5 h-5 md:w-[18px] md:h-[18px]" />
                  </div>
                  <div className="flex flex-col antialiased">
                    <span className="text-wevets-cyan font-bold text-base md:text-base leading-none">63% OFF</span>
                    <span className="text-wevets-blue/80 text-xs md:text-xs font-bold md:font-normal">em consultas</span>
                  </div>
                </motion.div>

                {/* Benefit Row 2 */}
                <motion.div
                  animate={{
                    scale: activeIndex === 1 ? 1.03 : 1,
                    backgroundColor: activeIndex === 1
                      ? (isMobile ? "rgba(249, 250, 251, 0.8)" : "rgba(249, 250, 251, 0.9)")
                      : (isMobile ? "rgba(249, 250, 251, 0.4)" : "rgba(249, 250, 251, 0.5)"),
                    borderColor: activeIndex === 1
                      ? (isMobile ? "rgba(11, 191, 198, 0.6)" : "rgba(6, 41, 91, 0.2)")
                      : (isMobile ? "rgba(6, 41, 91, 0.05)" : "rgba(6, 41, 91, 0.1)"),
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-full p-3.5 md:p-3 rounded-2xl border flex items-center gap-3 transition-colors hover:bg-gray-50/50 backdrop-blur-md md:backdrop-blur-none"
                >
                  <div className="w-9 h-9 md:w-9 md:h-9 bg-wevets-cyan/30 rounded-xl flex items-center justify-center text-wevets-cyan shrink-0">
                    <Syringe className="w-5 h-5 md:w-[18px] md:h-[18px]" />
                  </div>
                  <div className="flex flex-col antialiased">
                    <span className="text-wevets-cyan font-bold text-base md:text-base leading-none">66% OFF</span>
                    <span className="text-wevets-blue/80 text-xs md:text-xs font-bold md:font-normal">em vacinas</span>
                  </div>
                </motion.div>

                {/* Benefit Row 3 */}
                <motion.div
                  animate={{
                    scale: activeIndex === 2 ? 1.03 : 1,
                    backgroundColor: activeIndex === 2
                      ? (isMobile ? "rgba(249, 250, 251, 0.8)" : "rgba(249, 250, 251, 0.9)")
                      : (isMobile ? "rgba(249, 250, 251, 0.4)" : "rgba(249, 250, 251, 0.5)"),
                    borderColor: activeIndex === 2
                      ? (isMobile ? "rgba(11, 191, 198, 0.6)" : "rgba(6, 41, 91, 0.2)")
                      : (isMobile ? "rgba(6, 41, 91, 0.05)" : "rgba(6, 41, 91, 0.1)"),
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-full p-3.5 md:p-3 rounded-2xl border flex items-center gap-3 transition-colors hover:bg-gray-50/50 backdrop-blur-md md:backdrop-blur-none"
                >
                  <div className="w-9 h-9 md:w-9 md:h-9 bg-wevets-cyan/30 rounded-xl flex items-center justify-center text-wevets-cyan shrink-0">
                    <Beaker className="w-5 h-5 md:w-[18px] md:h-[18px]" />
                  </div>
                  <div className="flex flex-col antialiased">
                    <span className="text-wevets-cyan font-bold text-base md:text-base leading-none">50% OFF</span>
                    <span className="text-wevets-blue/80 text-xs md:text-xs font-bold md:font-normal">em exames</span>
                  </div>
                </motion.div>

                {/* Benefit Row 4 */}
                <motion.div
                  animate={{
                    scale: activeIndex === 3 ? 1.03 : 1,
                    backgroundColor: activeIndex === 3
                      ? (isMobile ? "rgba(249, 250, 251, 0.8)" : "rgba(249, 250, 251, 0.9)")
                      : (isMobile ? "rgba(249, 250, 251, 0.4)" : "rgba(249, 250, 251, 0.5)"),
                    borderColor: activeIndex === 3
                      ? (isMobile ? "rgba(11, 191, 198, 0.6)" : "rgba(6, 41, 91, 0.2)")
                      : (isMobile ? "rgba(6, 41, 91, 0.05)" : "rgba(6, 41, 91, 0.1)"),
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-full p-3.5 md:p-3 rounded-2xl border flex items-center gap-3 transition-colors hover:bg-gray-50/50 backdrop-blur-md md:backdrop-blur-none"
                >
                  <div className="w-9 h-9 md:w-9 md:h-9 bg-wevets-cyan/30 rounded-xl flex items-center justify-center text-wevets-cyan shrink-0">
                    <Hospital className="w-5 h-5 md:w-[18px] md:h-[18px]" />
                  </div>
                  <div className="flex flex-col antialiased">
                    <span className="text-wevets-cyan font-bold text-base md:text-base leading-none whitespace-nowrap">Acesso 24h</span>
                    <span className="text-wevets-blue/80 text-xs md:text-xs font-bold md:font-normal">hospitais WeVets</span>
                  </div>
                </motion.div>
              </div>

              <div className="hidden md:flex flex-col gap-2 mt-1">
                <div className="flex items-center gap-2 text-wevets-blue/80 text-sm font-bold md:font-normal">
                  <CheckCircle className="w-3 h-3 text-wevets-cyan shrink-0" />
                  <span>Tudo no mesmo lugar. Com médicos de referência.</span>
                </div>
                <div className="flex items-center gap-2 text-wevets-blue/80 text-sm font-bold md:font-normal">
                  <CheckCircle className="w-3 h-3 text-wevets-cyan shrink-0" />
                  <span>E um cuidado que cabe no seu dia a dia.</span>
                </div>
              </div>

              <button
                onClick={handleRedirect}
                className="w-full px-8 py-3 bg-wevets-cyan text-white font-bold text-lg rounded-xl hover:bg-wevets-cyan/90 hover:scale-[1.02] transition-all shadow-lg shadow-wevets-cyan/10"
                style={{ fontFamily: "Peridot PE Variable, sans-serif" }}
              >
                <p>Quero contratar por R$ 149,00</p>
              </button>

              {/* Scroll Indicator - Mobile Only */}
              <a
                href="#planos"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="md:hidden flex flex-col items-center gap-1 mt-4 animate-pulse no-underline"
              >
                <span
                  className="text-wevets-blue font-bold text-[10px] uppercase tracking-wider"
                  style={{ fontFamily: "Peridot PE Variable, sans-serif" }}
                >
                  Planos de saúde
                </span>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    y: [0, 5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ChevronDown className="w-5 h-5 text-wevets-blue" strokeWidth={3} />
                </motion.div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
