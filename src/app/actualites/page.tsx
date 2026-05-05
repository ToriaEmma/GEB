"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Heart, ShareNetwork, Tag } from '@phosphor-icons/react';
import { articles, formatDate, type Category } from './data';
import { useLanguage } from '@/context/LanguageContext';

const ALL_CATEGORIES: (Category | 'Tous')[] = ['Tous', 'Normes ISO', 'Audit', 'Certification', 'Conseil', 'Digital'];

const categoryColors: Record<string, string> = {
    'Normes ISO': 'bg-blue-100 text-blue-700',
    'Audit': 'bg-purple-100 text-purple-700',
    'Certification': 'bg-emerald-100 text-emerald-700',
    'Conseil': 'bg-orange-100 text-orange-700',
    'Digital': 'bg-pink-100 text-pink-700',
};

export default function ActualitesPage() {
    const { t, language } = useLanguage();
    const containerRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState<Category | 'Tous'>('Tous');
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
    const xMove = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

    const ALL_CATEGORIES_LOCALIZED = [
        { id: 'Tous', label: language === 'FR' ? 'Tous' : 'All' },
        { id: 'Normes ISO', label: t('management_qualite') },
        { id: 'Audit', label: t('cat_audit') },
        { id: 'Certification', label: t('cat_certification') },
        { id: 'Conseil', label: t('cat_conseil') },
        { id: 'Digital', label: t('cat_digital') },
    ];

    const getCategoryLabel = (cat: string) => {
        const found = ALL_CATEGORIES_LOCALIZED.find(c => c.id === cat);
        return found ? found.label : cat;
    };

    const filtered = activeCategory === 'Tous' ? articles : articles.filter(a => a.category === activeCategory);
    const featured = filtered.find(a => a.featured) || filtered[0];
    const rest = filtered.filter(a => a.slug !== featured?.slug);

    return (
        <main ref={containerRef} className="min-h-screen bg-[#111c2f] text-white pt-32 pb-32 overflow-hidden">
            {/* Monumental Header */}
            <section className="relative w-full py-20 flex justify-center items-center overflow-hidden pointer-events-none">
                <motion.h1
                    style={{ x: xMove }}
                    className="text-[22vw] font-heading font-black leading-none tracking-tighter text-[#4471c4] uppercase opacity-90 select-none whitespace-nowrap"
                >
                    {t('actualites_monumental')}
                </motion.h1>
            </section>

            {/* Content Section */}
            <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-20">
                    {/* Top Left: Title & Avatars */}
                    <motion.div 
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-5"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase leading-[1.1] tracking-tight mb-12">
                            {language === 'FR' ? "NOS DERNIÈRES PUBLICATIONS & EXPERTISES" : "OUR LATEST PUBLICATIONS & EXPERTISE"}
                        </h2>
                        
                        {/* Avatars */}
                        <div className="flex items-center mb-8 lg:mb-0">
                            <div className="flex -space-x-4">
                                <div className="w-12 h-12 rounded-full border-2 border-[#111c2f] overflow-hidden relative bg-white">
                                    <Image src="/images/home/hero-team.png" alt="Team" fill className="object-cover" />
                                </div>
                                <div className="w-12 h-12 rounded-full border-2 border-[#111c2f] overflow-hidden relative bg-[#4471c4]">
                                    <Image src="/images/home/hero-team.png" alt="Team" fill className="object-cover opacity-80" />
                                </div>
                                <div className="w-12 h-12 rounded-full border-2 border-[#111c2f] overflow-hidden relative bg-[#E63946]">
                                    <Image src="/images/home/hero-team.png" alt="Team" fill className="object-cover opacity-80" />
                                </div>
                            </div>
                            <span className="ml-4 text-sm font-heading font-black uppercase tracking-tight">{language === 'FR' ? "L'ÉQUIPE BEG" : "BEG TEAM"}</span>
                        </div>
                    </motion.div>

                    {/* Top Right: Featured Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 120 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="lg:col-span-7"
                    >
                        {featured && (
                            <Link href={`/actualites/${featured.slug}`} className="block group w-full">
                                <motion.div 
                                    className="relative bg-[#4471c4] rounded-[40px] p-8 md:p-10 h-[400px] flex flex-col justify-between overflow-hidden inverted-radius-tr"
                                    whileHover={{ scale: 0.98 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="relative z-20 flex justify-between items-start">
                                        <div className="max-w-[350px]">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/80 mb-3">{getCategoryLabel(featured.category)}</p>
                                            <h3 className="text-2xl md:text-3xl font-heading font-black uppercase leading-tight text-white">{language === 'FR' ? featured.title : featured.titleEn}</h3>
                                        </div>
                                    </div>

                                    <div className="absolute inset-x-0 bottom-0 top-32 overflow-hidden flex items-end justify-center">
                                        <div className="relative w-[120%] h-[120%] -ml-[10%]">
                                          <Image 
                                              src={featured.image} 
                                              alt={featured.title} 
                                              fill 
                                              className="object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-700 mix-blend-multiply opacity-80" 
                                          />
                                        </div>
                                    </div>

                                    <div className="relative z-20 flex items-center justify-between bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-3 pl-8 mt-auto w-max gap-6">
                                        <span className="text-xs font-black uppercase tracking-widest text-white">{t('lire_plus')}</span>
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-[#111c2f] transition-colors">
                                            <ArrowUpRight size={20} weight="bold" className="text-[#4471c4] group-hover:text-white" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        )}
                    </motion.div>

                    {/* Bottom Left: Filters */}
                    <motion.div 
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="lg:col-span-4 lg:col-start-1 flex flex-col justify-end"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                                <ArrowUpRight size={20} className="text-[#111c2f]" weight="bold" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 max-w-[200px]">
                                {language === 'FR' ? "EXPLOREZ NOS ARTICLES ET ÉTUDES DE CAS" : "EXPLORE OUR ARTICLES AND CASE STUDIES"}
                            </p>
                        </div>
                        
                        {/* Category Filter - Outline Pills */}
                        <div className="flex flex-col gap-4 w-full">
                            {ALL_CATEGORIES_LOCALIZED.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id as Category | 'Tous')}
                                    className={`px-8 py-4 rounded-full border text-xs font-black uppercase tracking-widest transition-all text-left w-full max-w-sm ${
                                        activeCategory === cat.id
                                            ? 'border-white text-white bg-white/10'
                                            : 'border-white/20 text-white/60 hover:border-white/50 hover:bg-white/5'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Bottom Right: 3 Small Cards */}
                    <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="lg:col-span-8 lg:col-start-5 flex flex-col justify-end"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {rest.slice(0, 3).map((article, idx) => {
                                const colors = [
                                    { bg: 'bg-[#ffb7d5]', text: 'text-[#d63384]' }, // Pink from A Propos
                                    { bg: 'bg-white', text: 'text-[#111c2f]' }, // White
                                    { bg: 'bg-[#4471c4]', text: 'text-white' }, // Blue
                                ];
                                const color = colors[idx % 3];

                                return (
                                    <Link href={`/actualites/${article.slug}`} key={article.slug} className="block group">
                                        <motion.div 
                                            className={`relative ${color.bg} p-8 h-[360px] flex flex-col justify-between overflow-hidden inverted-radius-tr-sm`}
                                            whileHover={{ scale: 0.96 }}
                                            transition={{ duration: 0.4 }}
                                        >

                                            <div className="relative z-20 sm:mr-20">
                                                <p className={`text-[10px] font-black uppercase tracking-widest ${color.text} mb-2 opacity-60`}>{getCategoryLabel(article.category)}</p>
                                            </div>
                                            
                                            <div className="absolute inset-0 top-12 opacity-10 mix-blend-overlay pointer-events-none grayscale">
                                                <Image src={article.image} alt="" fill className="object-cover" />
                                            </div>

                                            <div className="relative z-20 mt-auto">
                                                <h3 className={`text-xl font-heading font-black uppercase leading-[1.2] ${color.text} mb-6 line-clamp-3`}>{language === 'FR' ? article.title : article.titleEn}</h3>
                                                
                                                <div className="flex items-end justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Heart size={18} weight="fill" className={`${color.text} opacity-40`} />
                                                        <span className={`text-[11px] font-black uppercase ${color.text} opacity-60`}>{article.likes}</span>
                                                    </div>
                                                    <ArrowUpRight size={32} weight="light" className={`${color.text} group-hover:scale-125 transition-transform origin-bottom-right`} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>

                {filtered.length === 0 && (
                    <div className="py-32 text-center mt-12 border border-white/10 rounded-3xl">
                        <Tag size={48} className="text-white/20 mx-auto mb-4" />
                        <p className="text-white/40 font-black uppercase tracking-widest text-sm">{language === 'FR' ? "Aucun article dans cette catégorie" : "No articles in this category"}</p>
                    </div>
                )}
            </section>
        </main>
    );
}
