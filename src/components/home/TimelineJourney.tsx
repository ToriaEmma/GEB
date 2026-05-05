"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDownRight } from "@phosphor-icons/react";
import { useLanguage } from "@/context/LanguageContext";

export const TimelineJourney = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: t("perf_internes"),
      desc: t("perf_internes_desc"),
      theme: "yellow",
    },
    {
      number: "02",
      title: t("certifications_iso_title"),
      desc: t("certifications_iso_desc"),
      theme: "gray",
    },
    {
      number: "03",
      title: t("optimisation_processus_title"),
      desc: t("optimisation_processus_desc"),
      theme: "navy",
    },
    {
      number: "04",
      title: t("competences_title"),
      desc: t("competences_desc"),
      theme: "gray",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#4471c4] w-full overflow-hidden relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left"
          >
            <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-[#2D3047] mb-6 block w-full text-left">
              {t("resultats_impact")}
            </span>
            <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-[100px] leading-[0.85] tracking-tighter text-white uppercase w-full text-left">
              {t("resultats_title")} <br />
              <span className="text-[#2D3047]">{t("concrets_title")}</span>
            </h2>
          </motion.div>
        </div>

        {/* 4-Column Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {steps.map((step, index) => {
            const isYellow = step.theme === "yellow";
            const isNavy = step.theme === "navy";

            let bgClass = "";
            let textClass = "";
            let descClass = "";

            if (isYellow) {
              bgClass = "bg-[#2D3047]";
              textClass = "text-white";
              descClass = "text-white/80";
            } else if (isNavy) {
              bgClass = "bg-[#2D3047]";
              textClass = "text-white";
              descClass = "text-white/80";
            } else {
              bgClass = "bg-[#f4f4f4]";
              textClass = "text-black";
              descClass = "text-black/50";
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`${bgClass} rounded-[2.5rem] p-8 md:p-10 flex flex-col min-h-[450px] relative overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-[1.02]`}
              >

                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-8">
                    <h3 className={`text-2xl font-bold leading-tight ${textClass}`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm mt-4 leading-relaxed max-w-[200px] ${descClass}`}>
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className={`text-8xl md:text-9xl font-black tracking-tighter leading-none -ml-2 opacity-100 ${textClass}`}>
                      {step.number}
                      <div className={`h-1.5 w-16 mt-2 ${isYellow ? "bg-white" : step.theme === "gray" ? "bg-black" : "bg-white/20"}`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
