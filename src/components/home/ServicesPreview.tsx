"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export const ServicesPreview = () => {
    const { t } = useLanguage();

    const formations = [
        { 
            id: "01", 
            title: "ISO 9001", 
            subtitle: t("management_qualite"), 
            image: "/images/problems/Image coll.png",
            cols: "md:col-span-8",
            isDark: true
        },
        { 
            id: "02", 
            title: "ISO 27001", 
            subtitle: t("securite_information"), 
            bg: "bg-meb-dark",
            cols: "md:col-span-4",
            isDark: true
        },
        { 
            id: "03", 
            title: t("gestion_projet"), 
            subtitle: t("performance_agilite"), 
            bg: "bg-[#4471c4]",
            cols: "md:col-span-4",
            isDark: true
        },
        { 
            id: "04", 
            title: t("leadership_management"), 
            subtitle: t("excellence_dirigeante"), 
            image: "/images/problems/Image collée (2).png",
            cols: "md:col-span-4",
            isDark: true,
            invertedRadius: true
        },
        { 
            id: "05", 
            title: t("marketing_digital"), 
            subtitle: t("croissance_visibilite"), 
            bg: "bg-meb-dark",
            cols: "md:col-span-4",
            isDark: true
        },
    ];

    return (
        <section className="py-24 md:py-32 bg-[#F9F9F9] w-full overflow-hidden relative">
            <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
                
                {/* Section Header */}
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-start text-left"
                    >
                        <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-[#4471c4] mb-6 block w-full text-left">
                            {t("formations_phares_label")}
                        </span>
                        <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-[100px] text-meb-dark leading-[0.85] tracking-tighter uppercase w-full text-left">
                            Formations <br />
                            <span className="text-[#4471c4]">{t("phares")}</span>
                        </h2>
                    </motion.div>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="max-w-sm font-body text-[#2D3047]/80 text-lg leading-relaxed"
                    >
                        {t("programmes_certifiants")}
                    </motion.p>
                </div>

                {/* Bento Showroom Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
                    {formations.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`${item.cols} group relative rounded-[40px] overflow-hidden min-h-[350px] md:min-h-[400px] cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 ${item.bg || 'bg-gray-200'} ${item.invertedRadius ? 'inverted-radius' : ''}`}
                        >
                            {/* Background Image */}
                            {item.image && (
                                <Image 
                                    src={item.image} 
                                    alt={item.title} 
                                    fill 
                                    className="object-cover group-hover:scale-105 transition-all duration-1000"
                                />
                            )}
                            
                            {/* Overlays - Only if image exists */}
                            {item.image && (
                                <div className={`absolute inset-0 bg-gradient-to-t ${item.isDark ? 'from-meb-dark/80 via-meb-dark/20 to-transparent' : 'from-white/80 via-white/20 to-transparent'}`} />
                            )}
                            
                            {/* Content */}
                            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
                                <div className="flex justify-between items-start">
                                    <span className={`font-heading font-black text-6xl md:text-7xl opacity-10 ${item.isDark ? 'text-white' : 'text-meb-dark'}`}>
                                        {item.id}
                                    </span>
                                    {!item.invertedRadius && (
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md border ${item.isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-meb-dark/5 border-meb-dark/10 text-meb-dark'} group-hover:bg-[#4471c4] group-hover:text-white group-hover:border-transparent transition-all duration-500`}>
                                            <ArrowUpRight size={24} weight="bold" />
                                        </div>
                                    )}
                                </div>
                                
                                <div>
                                    <h3 className={`font-heading font-bold text-3xl md:text-4xl mb-2 tracking-tight ${item.isDark ? 'text-white' : 'text-meb-dark'}`}>
                                        {item.title}
                                    </h3>
                                    <p className={`font-body text-base md:text-lg opacity-70 ${item.isDark ? 'text-white' : 'text-meb-dark'}`}>
                                        {item.subtitle}
                                    </p>
                                </div>
                            </div>

                            {/* Hover accent line */}
                            <div className="absolute bottom-0 left-0 w-0 h-2 bg-[#4471c4] group-hover:w-full transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mt-16 flex justify-center"
                >
                    <button className="bg-meb-dark text-white px-10 py-5 rounded-2xl font-heading font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#4471c4] transition-all duration-500 shadow-xl">
                        {t("voir_catalogue")}
                    </button>
                </motion.div>
            </div>
        </section>
    );
};
