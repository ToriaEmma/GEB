"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Briefcase } from "@phosphor-icons/react";
import { projectService, Project } from "@/lib/services/projects";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabase";

export default function RealisationsPage() {
    const { t, language } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
    const [dbProjects, setDbProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xMove = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await projectService.getAll();
            setDbProjects(data);
        } catch (err) {
            console.error("Error fetching projects:", err);
        } finally {
            setLoading(false);
        }
    };

    const trackClick = async (projectId: string) => {
        try {
            await supabase.from('site_stats').insert([
                { event_type: 'click', target_type: 'project', target_id: projectId }
            ]);
        } catch (err) {
            console.error("Error tracking click:", err);
        }
    };

    const categories = [
        { id: "Tous", label: language === "FR" ? "Tous" : "All" },
        { id: "Audit", label: t("cat_audit") },
        { id: "Certification", label: t("cat_certification") },
        { id: "Conseil", label: t("cat_conseil") },
        { id: "Digital", label: t("cat_digital") },
    ];

    const filteredProjects = dbProjects.filter(
        (project) => selectedCategory === "Tous" || project.category.includes(selectedCategory)
    );

    return (
        <main ref={containerRef} className="min-h-screen bg-[#4471c4] text-white pt-32 overflow-hidden">
            {/* Monumental Header */}
            <section className="relative w-full py-20 flex justify-center items-center overflow-hidden pointer-events-none">
                <motion.h1 
                    style={{ x: xMove }}
                    className="text-[20vw] md:text-[18vw] font-heading font-black leading-none tracking-tighter text-[#111c2f] uppercase opacity-40 whitespace-nowrap select-none"
                >
                    {t("nos_realisations_monumental")}
                </motion.h1>
            </section>

            {/* Grid & Filters Section */}
            <section className="bg-[#111c2f] text-white py-24 px-6 md:px-12 lg:px-20 overflow-hidden rounded-t-[60px] min-h-screen relative">
                {/* Background Grid */}
                <div className="absolute inset-0 pointer-events-none z-0 flex justify-center opacity-30">
                    <div className="w-full h-full" style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '25% 250px'
                    }}></div>
                </div>

                <div className="max-w-[1600px] mx-auto relative z-10">
                    
                    {/* Header */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16 border-b border-white/10 pb-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tight leading-none mb-4 uppercase">
                                {t("nos_realisations")}<span className="text-2xl md:text-3xl align-top">°</span>
                            </h2>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            className="flex flex-col items-start md:items-end"
                        >
                            <div className="flex flex-wrap gap-2 mb-8 justify-end">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`px-4 py-1.5 rounded-full text-[10px] md:text-xs font-heading font-black uppercase tracking-widest transition-all border ${
                                            selectedCategory === cat.id
                                                ? "bg-white text-[#111c2f] border-white"
                                                : "bg-transparent text-white border-white/30 hover:border-white"
                                        }`}
                                    >
                                        ({cat.label})
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Counter */}
                    <div className="flex justify-between items-center mb-8 text-[10px] md:text-[11px] font-heading font-black text-gray-500 uppercase tracking-widest border-b border-white/5 pb-4">
                        <span className="inline-block">Projets Archivés</span>
                        <span className="text-xl md:text-2xl text-white font-heading font-black">
                            {loading ? "--" : filteredProjects.length.toString().padStart(2, '0')}
                        </span>
                    </div>

                    {/* Bento Grid */}
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-32">
                        <AnimatePresence mode="popLayout">
                            {loading ? (
                                <div className="col-span-full py-20 text-center text-white/20 uppercase tracking-widest font-black text-sm animate-pulse">
                                    Synchronisation des réalisations...
                                </div>
                            ) : filteredProjects.length === 0 ? (
                                <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
                                    <Briefcase size={48} className="text-white/10 mx-auto mb-6" />
                                    <p className="text-xl font-heading font-black text-gray-500 uppercase tracking-tighter">
                                        {language === "FR" ? "Aucune réalisation à afficher" : "No projects to display"}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-2 uppercase tracking-[0.2em]">
                                        {language === "FR" ? "Ajoutez vos projets via le Dashboard" : "Add projects via the Dashboard"}
                                    </p>
                                </div>
                            ) : (
                                filteredProjects.map((project, index) => {
                                    const isBlue = index % 3 === 0;
                                    const isWhite = index % 3 === 1;

                                    const cardClasses = isBlue 
                                        ? "bg-[#4471c4] text-white border-none inverted-radius" 
                                        : isWhite 
                                        ? "bg-white text-[#111c2f] border-none" 
                                        : "bg-[#111c2f] text-white border border-white/10";

                                    const textColor = isWhite ? 'text-[#111c2f]' : 'text-white';
                                    const borderColor = isWhite ? 'border-[#111c2f]/20' : 'border-white/20';
                                    const borderSolid = isWhite ? 'border-[#111c2f]' : 'border-white';
                                    const mutedTextColor = isWhite ? 'text-[#111c2f]/70' : 'text-white/80';
                                    const decorationColor = isWhite ? 'decoration-[#111c2f]/20' : 'decoration-white/20';

                                    const title = language === "FR" ? project.title : (project.title || project.title);
                                    const desc = language === "FR" ? project.description_fr : project.description_en;

                                    const detailsView = (
                                        <div className="absolute inset-0 flex flex-col h-full z-10">
                                            <div className="p-6 md:p-8 flex-1">
                                                <div className="flex justify-between items-start mb-6">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-heading font-black uppercase tracking-widest border ${borderColor} ${textColor}`}>
                                                        ({project.category})
                                                    </span>
                                                    <div className={`w-3 h-3 rounded-full border ${borderSolid}`}></div>
                                                </div>
                                                
                                                <h3 className={`text-xl md:text-2xl font-heading font-black mb-3 leading-tight ${textColor}`}>
                                                    <span className={`underline ${decorationColor} underline-offset-4`}>{title}</span>
                                                </h3>
                                                <p className={`text-sm line-clamp-4 leading-relaxed font-medium ${mutedTextColor}`}>
                                                    {desc}
                                                </p>
                                            </div>
                                            
                                            <div className="relative h-1/2 w-full mt-auto rounded-t-[20px] overflow-hidden">
                                                 {project.image_url ? (
                                                     <img src={project.image_url} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                                 ) : (
                                                     <div className="absolute inset-0 bg-[#4471c4]/20 flex items-center justify-center">
                                                         <Briefcase size={40} className="text-white/20" />
                                                     </div>
                                                 )}
                                                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                                 
                                                 <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-20">
                                                    <span className="text-[10px] font-heading font-black uppercase text-white/90 drop-shadow-md tracking-widest">
                                                        Client: <br/><span className="text-white">{project.client}</span>
                                                    </span>
                                                    {project.link && (
                                                        <a 
                                                            href={project.link} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            onClick={() => project.id && trackClick(project.id)}
                                                            className="px-5 h-10 rounded-full bg-white text-[#111c2f] flex items-center justify-center hover:bg-[#4471c4] hover:text-white transition-colors text-[10px] font-heading font-black uppercase tracking-widest"
                                                        >
                                                            {t("voir_le_projet")}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );

                                    const numberView = (
                                        <div className="absolute inset-0 flex flex-col h-full z-20 p-6 md:p-8">
                                            <div className="flex justify-between items-start">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-heading font-black uppercase tracking-widest border ${borderColor} ${textColor}`}>
                                                    ({project.category})
                                                </span>
                                            </div>
                                            
                                            <div className="flex-1 flex justify-center items-center">
                                                <span className={`text-[12rem] md:text-[14rem] font-heading font-bold tracking-tighter leading-none ${textColor}`}>
                                                    {(index + 1).toString().padStart(2, '0')}
                                                </span>
                                            </div>
                                            
                                            <div className="flex justify-between items-end">
                                                <span className={`text-[10px] font-heading font-black uppercase tracking-widest max-w-[120px] ${mutedTextColor}`}>
                                                    {title}
                                                </span>
                                                {project.link && (
                                                    <a 
                                                        href={project.link} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        onClick={() => project.id && trackClick(project.id)}
                                                        className={`px-5 h-10 rounded-full flex items-center justify-center border transition-colors text-[10px] font-heading font-black uppercase tracking-widest ${isWhite ? 'border-[#111c2f]/30 text-[#111c2f] hover:bg-[#111c2f] hover:text-white' : 'border-white/30 text-white hover:bg-white hover:text-[#111c2f]'}`}
                                                    >
                                                        {t("voir_le_projet")}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    );

                                    const isFirst = index === 0;

                                    return (
                                        <motion.div
                                            key={project.id}
                                            layout
                                            initial={{ opacity: 0, y: 100 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                            className={`group relative rounded-[20px] md:rounded-[30px] overflow-hidden h-[450px] md:h-[550px] flex flex-col ${cardClasses}`}
                                        >
                                            {isFirst ? detailsView : (
                                                <>
                                                    <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 z-20">
                                                        {numberView}
                                                    </div>
                                                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10">
                                                        {detailsView}
                                                    </div>
                                                </>
                                            )}
                                        </motion.div>
                                    );
                                })
                            )}
                        </AnimatePresence>
                    </motion.div>

                </div>
            </section>
        </main>
    );
}
