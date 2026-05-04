"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const impacts = [
  { value: "50", suffix: "+", label: "ENTREPRISES ACCOMPAGNÉES", theme: "dark", badgeContent: "01" },
  { value: "Experts", suffix: "", label: "CERTIFIÉS INTERNATIONAUX", theme: "abstract", badgeContent: "02" },
  { value: "Afrique", suffix: "", label: "PRÉSENCE CONTINENTALE", theme: "yellow", badgeContent: "03" },
  { value: "ISO", suffix: "", label: "APPROCHE RÉSULTATS", theme: "dark", badgeContent: "04" },
];

export const ImpactCounter = () => {
  return (
    <section className="py-20 md:py-28 bg-[#4471c4] w-full overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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
                  hidden: { opacity: 0, scale: 0.8, y: 30 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
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
          <div className="lg:col-span-3 pt-6 pb-2 pr-0 lg:pr-10">
            <h2 className="text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter leading-[0.85] text-white uppercase">
              Excellence <br />
              <span className="text-[#2D3047]">Opérationnelle.</span>
            </h2>
            <p className="text-sm md:text-base text-white/50 mt-6 leading-relaxed max-w-md">
              Nous aidons les organisations à atteindre des standards internationaux et améliorer durablement leurs performances.
            </p>
          </div>

          {/* Bottom Row - Badge */}
          <div className="lg:col-span-1 flex items-end justify-end pb-4 pr-4">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              whileInView={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="w-24 h-24 sm:w-28 sm:h-28 bg-white/10 border border-white/5 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center shadow-2xl overflow-hidden p-0"
            >
              <Image 
                src="/images/favicon.png" 
                alt="GEB Logo" 
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
