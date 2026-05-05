"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Warning, TrendDown, ShieldWarning, ArrowRight, Stethoscope, GraduationCap, Scales, Bank } from "@phosphor-icons/react";
import { useLanguage } from "@/context/LanguageContext";

export const ChallengesSection = () => {
    const { t } = useLanguage();

    const challenges = [
        {
            title: t("impasse_normative"),
            description: t("impasse_desc"),
            icon: <Warning size={32} weight="duotone" className="text-[#4471c4]" />,
            accent: "bg-[#4471c4]/5",
            border: "border-[#4471c4]/10"
        },
        {
            title: t("instabilite_op"),
            description: t("instabilite_desc"),
            icon: <TrendDown size={32} weight="duotone" className="text-[#4471c4]" />,
            accent: "bg-[#4471c4]/5",
            border: "border-[#4471c4]/10"
        },
        {
            title: t("plafond_verre"),
            description: t("plafond_desc"),
            icon: <ShieldWarning size={32} weight="duotone" className="text-red-500" />,
            accent: "bg-red-500/5",
            border: "border-red-500/10"
        },
    ];

    return (
        <section className="py-24 md:py-32 bg-[#4471c4] w-full overflow-hidden relative" id="enjeux">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4471c4]/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
                
                {/* Section Header */}
                <div className="mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-start text-left"
                    >
                        <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-[#2D3047] mb-6 block w-full text-left">
                            {t("cibles_strategiques")}
                        </span>
                        <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-[100px] leading-[0.85] tracking-tighter text-white uppercase w-full text-left">
                            {t("a_qui_adressent")} <br className="hidden md:block" />
                            <span className="text-[#2D3047]">{t("nos_services_label")}</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Asymmetric Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-stretch">
                    
                    {/* Card 1: Entreprises (Left Design) */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="md:col-span-4 bg-white/10 border border-white/20 backdrop-blur-xl rounded-[40px] p-10 flex flex-col justify-between overflow-hidden relative group min-h-[450px]"
                    >
                        <div className="relative w-full h-64 mb-8 rounded-[40px] overflow-hidden shadow-lg group-hover:scale-[1.02] transition-transform duration-700">
                            <Image 
                                src="/images/home/dirigeante-excellence.jpg" 
                                alt="Entreprises Excellence" 
                                fill 
                                className="object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-[#4471c4]/20 to-transparent z-10" />
                            <div className="absolute top-4 right-4 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-lg font-bold z-20">+</div>
                        </div>
                        <div>
                            <div className="font-heading font-black text-7xl mb-2 text-white tracking-tighter">100%</div>
                            <h3 className="font-heading font-bold text-2xl text-white mb-2">{t("entreprises_title")}</h3>
                            <p className="font-body text-white/50 text-base leading-tight">
                                {t("precision_accompagnement")}
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 2: Institutions (Refined Dark Design) - WITH CSS MASK FIX */}
                    <div className="md:col-span-4 relative group">
                        <motion.div
                            initial={{ opacity: 0, y: 150 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-[#2D3047] inverted-radius p-10 flex flex-col justify-between relative min-h-[480px] w-full"
                            style={{ "--s": "35px", "--r": "40px" } as any}
                        >
                             {/* Avatars Row */}
                             <div className="flex -space-x-4 mt-6">
                                {[
                                    { icon: <Stethoscope size={24} weight="duotone" className="text-white" />, label: t("sante") },
                                    { icon: <GraduationCap size={24} weight="duotone" className="text-white" />, label: t("education") },
                                    { icon: <Scales size={24} weight="duotone" className="text-white" />, label: t("justice") },
                                    { icon: <Bank size={24} weight="duotone" className="text-white" />, label: t("finance") },
                                ].map((item, i) => (
                                    <div key={i} className="w-14 h-14 rounded-full border-[4px] border-[#2D3047] bg-[#4471c4] flex items-center justify-center relative shadow-md group/icon">
                                        <div className="relative z-10 transition-transform group-hover/icon:scale-110">
                                            {item.icon}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full" />
                                    </div>
                                ))}
                             </div>
                            
                            <div className="text-white mb-4">
                                <div className="font-heading font-black text-[120px] leading-[0.8] mb-4 tracking-tighter text-white">70%</div>
                                <div className="mt-2">
                                    <h3 className="font-heading font-bold text-2xl leading-tight text-white">{t("institutions_publiques")}</h3>
                                    <p className="font-body text-white/50 text-base font-medium mt-1">
                                        {t("fluidification_processus")}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Integrated Corner Button (The Notch) - Outside the Masked Div so it's visible */}
                        <div className="absolute top-0 right-0 w-28 h-28 flex items-center justify-center pointer-events-none z-10 -translate-y-4 translate-x-4">
                            <div className="w-12 h-12 bg-[#4471c4] border border-white/20 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 shadow-xl pointer-events-auto cursor-pointer">
                                <ArrowRight size={18} weight="bold" className="text-white -rotate-45" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Two small cards) */}
                    <div className="md:col-span-4 flex flex-col gap-5 lg:gap-6">
                        
                        {/* Card 3: Managers (Right Top) */}
                        <motion.div
                            initial={{ opacity: 0, y: 200 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-[40px] p-8 flex-1 flex flex-col justify-between relative overflow-hidden group min-h-[220px]"
                        >
                            {/* Blurry Blob Decoration - Blue/White instead of Lime */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />
                            
                            <div className="relative z-10">
                                <div className="font-heading font-black text-6xl text-white tracking-tighter mb-2">80%+</div>
                                <h3 className="font-heading font-bold text-xl text-white">{t("responsables")}</h3>
                                <p className="font-body text-white/40 text-sm leading-tight mt-1">
                                    {t("processus_automatises")}
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 4: Entrepreneurs (Right Bottom - Dark) */}
                        <motion.div
                            initial={{ opacity: 0, y: 250 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-[#2D3047] rounded-[40px] p-8 h-48 flex flex-col justify-between relative overflow-hidden group shadow-xl"
                        >
                             {/* Dark Wave Background Decoration */}
                             <div className="absolute inset-0 opacity-20 pointer-events-none">
                                <div className="w-full h-full bg-gradient-to-tr from-black via-transparent to-white/10" />
                             </div>

                             <div className="flex items-center gap-4 relative z-10">
                                <div className="font-heading font-black text-6xl text-white tracking-tighter">04</div>
                                <div className="text-white/60 text-xs uppercase tracking-widest leading-tight">
                                    {t("semaines")} <br /> {t("moyenne_deploiement")}
                                </div>
                            </div>
                            
                            <div className="relative z-10">
                                <h3 className="font-heading font-bold text-xl text-white">{t("entrepreneurs")}</h3>
                                <p className="font-body text-white/40 text-xs">{t("visionnaires_changement")}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom decorative line */}
                <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full mt-24"
                />
            </div>
        </section>
    );
};
