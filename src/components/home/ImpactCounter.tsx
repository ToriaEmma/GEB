"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export const ImpactCounter = () => {
  const { t } = useLanguage();

  const impacts = [
    { value: "50", suffix: "+", label: t("entreprises_accompagnees"), theme: "dark", badgeContent: "01" },
    { value: t("experts_value"), suffix: "", label: t("experts_certifies_inter"), theme: "abstract", badgeContent: "02" },
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
                staggerChildren: 0.15,
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
              bgClass = "bg-white/10 border border-white/5";
              textClass = "text-white";
              descClass = "text-white/50";
              badgeClass = "text-white/30";
            } else if (isYellow) {
              bgClass = "bg-[#2D3047]";
              textClass = "text-white";
              descClass = "text-white/80";
              badgeClass = "text-white/30";
            } else if (isAbstract) {
              bgClass = "bg-white/5 border border-white/10 relative overflow-hidden";
              textClass = "text-white";
              descClass = "text-white/50";
              badgeClass = "text-white/30";
            }

            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 100 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                  },
                }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`lg:col-span-1 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between relative min-h-[300px] transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#2D3047]/10 ${bgClass}`}
              >

                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Badge Number */}
                  <span className={`text-xs font-bold tracking-widest uppercase mb-8 ${badgeClass}`}>
                    ({impact.badgeContent})
                  </span>

                  {/* Stat Display */}
                  <div className="mt-auto">
                    <div className={`flex items-baseline gap-1 mb-4 ${textClass}`}>
                      <span className={`font-heading font-black leading-[0.8] tracking-tighter ${impact.value.length > 3 ? 'text-[40px] md:text-[48px]' : 'text-[56px] md:text-[64px] lg:text-[72px]'}`}>
                        {impact.value}
                      </span>
                      <span className="font-heading font-bold text-3xl">
                        {impact.suffix}
                      </span>
                    </div>
                    <p className={`text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed max-w-[150px] ${descClass}`}>
                      {impact.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Bottom Row - Heading & Paragraph */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
