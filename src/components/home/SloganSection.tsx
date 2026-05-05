"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useLanguage } from "@/context/LanguageContext";

export const SloganSection = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 md:py-32 bg-[#F9F9F9] w-full overflow-hidden relative">
            {/* Subtle Dot Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#4471c4 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            
            <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
                
                {/* Top Header Row */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-32 mb-20 lg:mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-[55%] flex flex-col items-start text-left"
                    >
                        <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-[#4471c4] mb-6 block w-full text-left">
                            {t("valeur_ajoutee")}
                        </span>
                        <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-[100px] leading-[0.85] tracking-tighter text-meb-dark uppercase w-full text-left">
                            {t("pourquoi")} <br />
                            <span className="text-[#4471c4]">{t("choisir_nous")}</span>
                        </h2>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:w-[45%] flex flex-col gap-10 lg:pt-8"
                    >
                        <div>
                            <p className="font-body text-[#2D3047] text-xl md:text-2xl leading-tight mb-6 font-medium uppercase tracking-tighter">
                                {t("approche_impact")}
                            </p>
                            <p className="font-body text-[#2D3047]/70 text-base leading-relaxed text-justify">
                                {t("combinaison_expertise")}
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-6">
                            <button className="bg-[#4471c4] text-white px-8 py-5 flex items-center gap-4 hover:bg-[#4471c4] transition-all duration-500 rounded-full group shadow-xl">
                                <span className="font-heading font-bold uppercase text-[10px] tracking-widest">{t("decouvrir_vision")}</span>
                                <div className="bg-[#4471c4] text-white p-1 rounded-full group-hover:rotate-45 transition-transform duration-500">
                                    <ArrowUpRight size={14} weight="bold" />
                                </div>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Imagery & Stats Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Large Main Image (Left) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 relative"
                    >
                        <div className="relative aspect-[4/5] md:aspect-[16/10] rounded-[40px] overflow-hidden">
                            <Image 
                                src="/images/problems/expert-results.jpg" 
                                alt="Expertise" 
                                fill 
                                className="object-cover"
                            />
                        </div>
                        
                        {/* Floating Stats Badges */}
                        <div className="absolute bottom-0 left-0 flex flex-wrap md:flex-nowrap items-stretch">
                            <div className="bg-[#2D3047] p-6 md:p-10 text-white min-w-[180px]">
                                <div className="font-heading font-black text-4xl md:text-5xl mb-2">100%</div>
                                <div className="text-xs uppercase tracking-widest text-white/50">{t("engagement_resultats")}</div>
                            </div>
                            <div className="bg-[#4471c4] p-6 md:p-10 text-white flex items-center justify-center min-w-[80px] hover:bg-[#3558a0] transition-colors duration-500 cursor-pointer">
                                <ArrowUpRight size={32} weight="bold" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column Content */}
                    <div className="lg:col-span-5 flex flex-col gap-12">
                        
                        {/* Smaller Secondary Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative aspect-[4/3] w-full md:w-3/4 self-end inverted-radius-left shadow-2xl overflow-hidden"
                            style={{ "--r": "20px", "--s": "30px", "--x": "20px", "--y": "10px" } as any}
                        >
                            <Image 
                                src="/images/journey/Image-col-v2.png" 
                                alt="Collaboration" 
                                fill 
                                className="object-cover object-[center_30%]"
                            />
                        </motion.div>

                        {/* Large "Excellence" Display - Aligned under the frame */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-col items-start w-full md:w-3/4 self-end"
                        >
                            <ul className="space-y-4 w-full">
                                {[
                                    t("expert_certifies"), 
                                    t("methodologie_pratique"), 
                                    t("accompagnement_perso"),
                                    t("suivi_jusqua_resultat")
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-meb-dark font-heading font-bold uppercase text-[11px] tracking-widest leading-tight">
                                        <div className="w-2 h-2 bg-[#4471c4] rounded-full flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
};
