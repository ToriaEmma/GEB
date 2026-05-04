"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";

export const SolutionPillars = () => {
  return (
    <section className="py-24 md:py-32 bg-[#F4F4F2] w-full overflow-hidden relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

          {/* Left: Text Content & Accompagnement Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-[480px] xl:w-[520px] flex flex-col pt-4 shrink-0"
          >
            <div className="mb-10">
              <span className="font-heading text-xs font-bold tracking-widest uppercase text-[#4471c4] mb-6 block w-full text-left">
                NOS SERVICES
              </span>
              <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-[100px] leading-[0.85] tracking-tighter text-meb-dark uppercase mb-8 w-full text-left">
                Nos <br />
                <span className="text-[#4471c4]">expertises.</span>
              </h2>
              <p className="font-body text-base lg:text-lg text-gray-700 mb-8 leading-relaxed font-medium">
                Accompagnement stratégique et opérationnel pour transformer vos défis en leviers de performance durable.
              </p>
            </div>

            {/* Accompagnement Card (Moved here for exact alignment) */}
            <div className="relative group w-full">
                <motion.div
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
                }}
                className="bg-[#4471c4] inverted-radius p-8 flex flex-col justify-end min-h-[260px] lg:min-h-[300px] text-white overflow-hidden relative group cursor-pointer hover:shadow-xl transition-shadow duration-500 shadow-md w-full"
                style={{ "--r": "40px", "--s": "35px" } as any}
                >
                <h4 className="font-heading font-bold text-base lg:text-xl group-hover:-translate-y-2 transition-all duration-500 relative z-10 leading-tight">
                    Accompagnement <br />à la certification
                </h4>
                <p className="font-body text-[13px] text-white/80 mt-4 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-justify">
                    De l’audit initial à l’obtention de votre certification ISO. Nous vous guidons à chaque étape du processus.
                </p>
                </motion.div>
            </div>
          </motion.div>

          {/* Right: Bento Grid for Remaining 3 Pillars */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
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
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="col-span-1 bg-white rounded-[40px] p-8 flex flex-col justify-end min-h-[260px] lg:min-h-[300px] border border-meb-dark/5 hover:border-[#4471c4]/20 hover:shadow-xl transition-all duration-500 group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-6 right-6 w-12 h-12 bg-meb-gray-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ArrowRight size={20} className="text-[#4471c4]" weight="bold" />
              </div>
              <h4 className="font-heading font-bold text-base lg:text-xl text-meb-dark group-hover:text-[#4471c4] transition-colors duration-500 leading-tight">
                Formation <br />professionnelle <br />& certifiante
              </h4>
              <p className="font-body text-[13px] text-gray-500 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-justify">
                Programmes alignés aux standards internationaux (ISO, management, digital…). Développez les talents de demain.
              </p>
            </motion.div>

            {/* Card 2: Audit */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
                Audit & <br />conformité ISO
              </h4>
              <p className="font-body text-[13px] text-white/70 mt-2 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-justify">
                Identifiez vos écarts et assurez votre conformité aux normes mondiales avec nos experts dédiés.
              </p>
            </motion.div>

            {/* Card 4: Conseil */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="col-span-1 sm:col-span-2 bg-white rounded-[40px] p-8 flex flex-col justify-end min-h-[260px] lg:min-h-[300px] border border-meb-dark/5 hover:border-meb-gray-300 hover:shadow-xl transition-all duration-500 group relative overflow-hidden cursor-pointer"
            >
              <h4 className="font-heading font-bold text-base lg:text-xl text-meb-dark group-hover:text-[#4471c4] transition-colors duration-500 relative z-10 leading-tight">
                Conseil & <br />structuration <br />organisationnelle
              </h4>
              <p className="font-body text-[13px] text-gray-500 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 relative z-10 text-justify">
                Optimisez votre organisation et vos processus pour plus de performance. Une approche sur mesure pour votre structure.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};
