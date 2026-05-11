"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export const ImpactCounter = () => {
  const { t } = useLanguage();

  const impacts = [
    { value: "50", suffix: "+", label: t("entreprises_accompagnees"), theme: "dark", badgeContent: "01" },
    { value: "", suffix: "", label: "LAURÉAT PRIX QUALITÉ CEDEAO (2019)", image: "/images/home/award.png", theme: "abstract", badgeContent: "02" },
    { value: t("afrique_value"), suffix: "", label: t("presence_continentale"), theme: "yellow", badgeContent: "03" },
    { value: "ISO", suffix: "", label: t("approche_resultats_label"), theme: "dark", badgeContent: "04" },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#4471c4] w-full overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {impacts.map((impact, idx) => {
            const isDark = impact.theme === "dark";
            const isYellow = impact.theme === "yellow";
            const isAbstract = impact.theme === "abstract";

            let bgClass = "";
            let textClass = "";
            let descClass = "";
            let badgeClass = "";

            if (isDark) {
              bgClass = "bg-white/10 border border-white/5 backdrop-blur-lg";
              textClass = "text-white";
              descClass = "text-white/50";
              badgeClass = "text-white/30";
            } else if (isYellow) {
              bgClass = "bg-[#2D3047] border border-white/5 shadow-2xl shadow-black/20";
              textClass = "text-white";
              descClass = "text-white/80";
              badgeClass = "text-white/30";
            } else if (isAbstract) {
              bgClass = "bg-white/5 border border-white/10 relative overflow-hidden backdrop-blur-md";
              textClass = "text-white";
              descClass = "text-white/60";
              badgeClass = "text-white/30";
            }

            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                  },
                }}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.4, ease: "easeOut" },
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                className={`lg:col-span-1 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between relative min-h-[320px] transition-all duration-500 ${bgClass}`}
              >
                {/* Background Decoration for Abstract Theme */}
                {isAbstract && (
                  <>
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#4471c4] blur-[100px] opacity-30 rounded-full" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white blur-[100px] opacity-10 rounded-full" />
                  </>
                )}

                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Badge Number */}
                  <span className={`text-[10px] font-black tracking-[0.3em] uppercase mb-4 ${badgeClass}`}>
                    ({impact.badgeContent})
                  </span>

                  {/* Stat Display */}
                  <div className="flex-1 flex flex-col justify-center">
                    {impact.image ? (
                      <div className="flex flex-col items-start gap-6">
                        <div className="relative w-full h-32 md:h-44 group">
                          {/* Glow effect behind trophy */}
                          <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: idx * 0.1 + 0.3 }}
                            className="relative w-full h-full"
                          >
                            <Image 
                              src={impact.image} 
                              alt="Award" 
                              fill 
                              className="object-contain object-left drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                            />
                          </motion.div>
                        </div>
                        {impact.label && (
                          <div className="space-y-1">
                            <p className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] leading-tight ${textClass}`}>
                              {impact.label}
                            </p>
                            <div className="w-10 h-[2px] bg-[#4471c4]" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mt-auto">
                        <div className={`flex items-baseline gap-1 mb-4 ${textClass}`}>
                          <span className={`font-heading font-black leading-[0.8] tracking-tighter ${impact.value.length > 3 ? 'text-[40px] md:text-[48px]' : 'text-[56px] md:text-[64px] lg:text-[80px]'}`}>
                            {impact.value}
                          </span>
                          <span className="font-heading font-bold text-3xl">
                            {impact.suffix}
                          </span>
                        </div>
                        <p className={`text-xs md:text-[13px] font-bold uppercase tracking-[0.15em] leading-relaxed max-w-[180px] ${descClass}`}>
                          {impact.label}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Bottom Row - Heading & Paragraph */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 pt-6 pb-2 pr-0 lg:pr-10"
          >
            <h2 className="text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter leading-[0.85] text-white uppercase">
              {t("excellence_operationnelle")} <br />
              <span className="text-[#2D3047]">{t("operationnelle")}</span>
            </h2>
            <p className="text-sm md:text-base text-white/50 mt-6 leading-relaxed max-w-md">
              {t("aide_organisations")}
            </p>
          </motion.div>

          {/* Bottom Row - Badge */}
          <div className="lg:col-span-1 flex items-end justify-end pb-4 pr-4">
            <motion.div
              initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
              whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
              className="w-24 h-24 sm:w-28 sm:h-28 bg-white/10 border border-white/5 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center shadow-2xl overflow-hidden p-0"
            >
              <Image 
                src="/images/favicon.png" 
                alt="BEG Logo" 
                width={120} 
                height={120} 
                className="w-full h-full object-contain opacity-80 scale-[2]"
              />
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
