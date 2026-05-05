"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import { useLanguage } from "@/context/LanguageContext";

export const SolutionPillars = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 bg-[#F4F4F2] w-full overflow-hidden relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

          {/* Left: Text Content & Accompagnement Card */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-[480px] xl:w-[520px] flex flex-col pt-4 shrink-0"
          >
            <div className="mb-10">
              <span className="font-heading text-xs font-bold tracking-widest uppercase text-[#4471c4] mb-6 block w-full text-left">
                {t("nos_expertises_label")}
              </span>
              <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-[100px] leading-[0.85] tracking-tighter text-meb-dark uppercase mb-8 w-full text-left">
                {t("nos_title")} <br />
                <span className="text-[#4471c4]">{t("expertises_title")}</span>
              </h2>
              <p className="font-body text-base lg:text-lg text-gray-700 mb-8 leading-relaxed font-medium">
                {t("accompagnement_strategique")}
              </p>
            </div>

            {/* Accompagnement Card (Moved here for exact alignment) */}
            <div className="relative group w-full">
                <motion.div
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="bg-[#4471c4] inverted-radius p-8 flex flex-col justify-end min-h-[260px] lg:min-h-[300px] text-white overflow-hidden relative group cursor-pointer hover:shadow-xl transition-shadow duration-500 shadow-md w-full"
                style={{ "--r": "40px", "--s": "35px" } as any}
                >
                <h4 className="font-heading font-bold text-base lg:text-xl group-hover:-translate-y-2 transition-all duration-500 relative z-10 leading-tight">
                    {t("accompagnement_certification")}
                </h4>
                <p className="font-body text-[13px] text-white/80 mt-4 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-justify">
                    {t("accompagnement_desc_short")}
                </p>
                </motion.div>
            </div>
          </motion.div>

          {/* Right: Bento Grid for Remaining 3 Pillars */}
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
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5"
          >
            {/* Card 1: Formation */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 80 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="col-span-1 bg-white rounded-[40px] p-8 flex flex-col justify-end min-h-[260px] lg:min-h-[300px] border border-meb-dark/5 hover:border-[#4471c4]/20 hover:shadow-xl transition-all duration-500 group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-6 right-6 w-12 h-12 bg-meb-gray-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ArrowRight size={20} className="text-[#4471c4]" weight="bold" />
              </div>
              <h4 className="font-heading font-bold text-base lg:text-xl text-meb-dark group-hover:text-[#4471c4] transition-colors duration-500 leading-tight">
                {t("formation_pro_certifiante")}
              </h4>
              <p className="font-body text-[13px] text-gray-500 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-justify">
                {t("formation_pro_desc")}
              </p>
            </motion.div>

            {/* Card 2: Audit */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 120 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="col-span-1 bg-meb-dark rounded-[40px] p-8 flex flex-col justify-end min-h-[260px] lg:min-h-[300px] group relative overflow-hidden text-white cursor-pointer hover:shadow-2xl transition-shadow duration-500"
            >
              <Image
                src="/images/problems/Image coll.png"
                alt="Audit"
                fill
                className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105"
                style={{ objectPosition: 'center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-meb-dark to-transparent opacity-80" />
              <h4 className="font-heading font-bold text-base lg:text-xl relative z-10 group-hover:-translate-y-2 transition-transform duration-500 leading-tight">
                {t("audit_conformite_iso")}
              </h4>
              <p className="font-body text-[13px] text-white/70 mt-2 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-justify">
                {t("audit_conformite_desc")}
              </p>
            </motion.div>

            {/* Card 4: Conseil */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 150 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="col-span-1 sm:col-span-2 bg-white rounded-[40px] p-8 flex flex-col justify-end min-h-[260px] lg:min-h-[300px] border border-meb-dark/5 hover:border-meb-gray-300 hover:shadow-xl transition-all duration-500 group relative overflow-hidden cursor-pointer"
            >
              <h4 className="font-heading font-bold text-base lg:text-xl text-meb-dark group-hover:text-[#4471c4] transition-colors duration-500 relative z-10 leading-tight">
                {t("conseil_structuration")}
              </h4>
              <p className="font-body text-[13px] text-gray-500 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 relative z-10 text-justify">
                {t("conseil_structuration_desc")}
              </p>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};
