"use client";

import React from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
    const { t, language } = useLanguage();
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xMove = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

    const projects = [
      {
        title: t("expertise_iso_title"),
        category: t("expertise_iso_cat"),
        image: "/images/hero/expertise.jpg",
      },
      {
        title: t("conseil_strat_title"),
        category: t("conseil_strat_cat"),
        image: "/images/hero/collaboration.jpg",
      },
      {
        title: t("innovation_formation_title"),
        category: t("innovation_formation_cat"),
        image: "/images/hero/innovation.jpg",
      },
    ];

    return (
        <main ref={containerRef} className="min-h-screen bg-[#111c2f] text-white overflow-hidden pt-32 pb-20">
            {/* Top Narrative Section */}
            <section className="px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto mb-12">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
                    {/* Horizontal scroll/grid inspired by the image */}
                    <div className="w-full lg:w-2/3 order-2 lg:order-1">
                        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
                            {projects.map((p, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="min-w-[200px] md:min-w-[280px] aspect-[4/5] relative rounded-[16px] overflow-hidden snap-center group"
                                >
                                    <Image 
                                        src={p.image} 
                                        alt={p.title} 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                        <span className="text-[#4471c4] text-xs font-black uppercase tracking-widest mb-2">{p.category}</span>
                                        <h3 className="text-2xl font-heading font-black uppercase tracking-tight">{p.title}</h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Bold Title Section */}
                    <div className="w-full lg:w-1/3 order-1 lg:order-2 lg:mt-40">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl font-heading font-black uppercase leading-[0.9] tracking-tighter mb-4">
                                {t("qui_sommes_nous")}
                            </h2>
                            <div className="text-white/60 text-sm leading-relaxed mb-4">
                                <p>
                                    {t("beg_desc_long")}
                                </p>
                            </div>
                            <Link href="/contact" className="group inline-flex items-center gap-3 font-black uppercase tracking-widest text-[9px] hover:text-[#4471c4] transition-colors">
                                {t("discutons_projet")}
                                <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#4471c4] transition-colors">
                                    <ArrowUpRight size={12} weight="bold" />
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Monumental Typography Section */}
            <section className={`relative w-full py-2 flex items-center overflow-hidden ${language === 'EN' ? 'justify-end -mr-12' : 'justify-center'}`}>
                <motion.h1 
                    style={{ x: xMove }}
                    className={`text-[20vw] md:text-[21vw] font-heading font-extrabold leading-none tracking-tighter text-[#4471c4] uppercase opacity-90 select-none whitespace-nowrap ${language === 'EN' ? 'text-right' : 'text-center'}`}
                >
                    {t("a_propos_monumental")}
                </motion.h1>
            </section>

            {/* Clean White Section - Community / Team Vibes */}
            <section className="bg-white text-[#111c2f] py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
                <div className="max-w-[1440px] mx-auto">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight leading-none">
                            {t("decouvrez_equipe")}
                        </h2>
                        <div className="hidden sm:flex -space-x-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                                    <Image src={`/images/entrepreneur-${i === 3 ? 1 : i}.png`} alt="Team" width={48} height={48} className="object-cover" />
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-full border-4 border-white bg-[#4471c4] flex items-center justify-center text-white text-xs font-bold">
                                +15
                            </div>
                        </div>
                    </div>

                    {/* Grid inspired by the image */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } },
                            hidden: {}
                        }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24"
                    >
                        <motion.div 
                            variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="md:col-span-4 relative aspect-[4/3] rounded-[24px] overflow-hidden group"
                        >
                            <Image src="/images/home/hero-team.png" alt="Team" fill className="object-cover" />
                            <div className="absolute top-4 left-4">
                                <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{t("consultants")}</span>
                            </div>
                        </motion.div>
                        <motion.div 
                            variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="md:col-span-5 relative aspect-[4/3] rounded-[24px] overflow-hidden group"
                        >
                            <Image src="/images/home/accompagnement.png" alt="Team" fill className="object-cover" />
                            <div className="absolute bottom-4 left-4">
                                <span className="text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                    {t("voir_bureaux")} <ArrowUpRight size={14} />
                                </span>
                            </div>
                        </motion.div>
                        <motion.div 
                            variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="md:col-span-3 md:row-span-2 relative rounded-[24px] overflow-hidden group hidden md:block"
                        >
                            <Image src="/images/home/dirigeante-excellence.jpg" alt="Team" fill className="object-cover" />
                            <div className="absolute bottom-8 left-6 right-6">
                                <p className="text-white text-sm font-medium leading-relaxed">
                                    "{t("vision_experts")}"
                                </p>
                            </div>
                        </motion.div>
                        <motion.div 
                            variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="md:col-span-5 flex flex-col justify-center p-8 bg-gray-50 rounded-[24px]"
                        >
                            <p className="text-xl font-medium leading-relaxed text-gray-600">
                                {t("experts_collaborent")}
                            </p>
                            <button className="mt-8 self-start bg-[#ffb7d5] text-[#d63384] px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform">
                                {t("nous_rejoindre")}
                            </button>
                        </motion.div>
                        <motion.div 
                            variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="md:col-span-4 relative aspect-[4/3] overflow-hidden group inverted-radius-left shadow-xl" 
                            style={{ "--r": "24px", "--s": "30px", "--x": "0px", "--y": "0px" } as any}
                        >
                            <Image src="/images/home/formation-hero.png" alt="Team" fill className="object-cover" />
                            <div className="absolute top-4 right-4">
                                <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{t("fondateur")}</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Methodology / Workflow section inspired by bottom of image */}
                    <div className="text-center mb-20 pt-12 border-t border-gray-100">
                        <motion.h2 
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-3xl md:text-5xl font-heading font-black tracking-tight leading-none mb-4"
                        >
                            {t("pense_realite")}
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl"
                        >
                            <Image src="/images/home/conseil.png" alt="Workflow" fill className="object-cover" />
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-12"
                        >
                            <div>
                                <h3 className="text-xl font-heading font-black uppercase tracking-tight mb-4">{t("trouvez_point_depart")}</h3>
                                <p className="text-gray-500 mb-6">{t("identifiez_leviers")}</p>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1"><ArrowUpRight size={18} className="text-[#4471c4]" /></div>
                                        <div>
                                            <h4 className="font-bold text-sm">{t("filtres_strategiques_label")}</h4>
                                            <p className="text-xs text-gray-400">{t("triez_priorite")}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1"><ArrowUpRight size={18} className="text-[#4471c4]" /></div>
                                        <div>
                                            <h4 className="font-bold text-sm">{t("synchronisation_iso_label")}</h4>
                                            <p className="text-xs text-gray-400">{t("maj_automatique")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values / Mission Section (Remained from before but adjusted for contrast) */}
            <section className="px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto mt-20 pb-24">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } },
                        hidden: {}
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
                >
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4471c4] mb-4 block">01 / {t("notre_mission")}</span>
                        <p className="text-xl md:text-2xl font-medium leading-snug">
                            {t("mission_desc")}
                        </p>
                    </motion.div>
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4471c4] mb-4 block">02 / {t("notre_vision_title")}</span>
                        <p className="text-xl md:text-2xl font-medium leading-snug">
                            {t("vision_desc_about")}
                        </p>
                    </motion.div>
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4471c4] mb-6 block">03 / {t("nos_valeurs_title")}</span>
                        <div className="flex flex-wrap gap-2">
                            {[t("valeur_pro"), t("valeur_rigueur"), t("valeur_excellence"), t("valeur_innovation"), t("valeur_confiance"), t("valeur_accompagnement"), t("valeur_engagement")].map((val, idx) => (
                                <div 
                                    key={idx} 
                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-widest text-white/80 hover:border-[#4471c4]/50 hover:text-white transition-all cursor-default"
                                >
                                    {val}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </main>
    );
}
