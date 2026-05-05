'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
    WhatsappLogo, 
    EnvelopeSimple, 
    Phone, 
    LinkedinLogo, 
    TiktokLogo,
    ArrowUpRight
} from '@phosphor-icons/react';

import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
    const { t, language } = useLanguage();
    const [selectedService, setSelectedService] = useState('website');
    const [selectedBudget, setSelectedBudget] = useState('3-5');
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xMove = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

    const services = [
        { id: 'website', label: t('cat_audit') },
        { id: 'uiux', label: t('cat_certification') },
        { id: 'ecommerce', label: t('cat_conseil') },
        { id: 'digital', label: t('cat_digital') },
    ];

    const budgets = [
        { id: '<3', label: '< 1M FCFA' },
        { id: '3-5', label: '1-5M FCFA' },
        { id: '5-10', label: '5-10M FCFA' },
        { id: '>10', label: '> 10M FCFA' },
    ];

    return (
        <main ref={containerRef} className="min-h-screen bg-[#111c2f] text-white pt-32 overflow-hidden selection:bg-[#4471c4]">
            {/* Monumental Header */}
            <section className="relative w-full py-20 flex justify-center items-center overflow-hidden pointer-events-none">
                <motion.h1 
                    style={{ x: xMove }}
                    className="text-[22vw] font-heading font-black leading-none tracking-tighter text-[#4471c4] uppercase opacity-90 select-none whitespace-nowrap"
                >
                    CONTACT
                </motion.h1>
            </section>

            {/* Content Section */}
            {/* Transition towards white section */}
            <section className="bg-white text-[#111c2f] py-24 px-6 md:px-12 lg:px-20 overflow-hidden rounded-t-[60px]">
                <div className="max-w-[1600px] mx-auto">
                    {/* Matrix-Style Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
                        
                        {/* Left Column Area (Image & Tag) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="md:col-span-3 flex flex-col gap-6"
                        >
                            <div className="border border-[#111c2f]/10 rounded-full px-6 py-3 self-start">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">BEG CONTACT</span>
                            </div>
                            <div className="relative aspect-[3/4] rounded-[30px] overflow-hidden">
                                <Image 
                                    src="/images/home/hero-team.png" 
                                    alt="Contact Team" 
                                    fill 
                                    className="object-cover"
                                />
    
                            </div>
                        </motion.div>

                        {/* Middle Column Area (Card 01 & 03) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 150 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="md:col-span-5 flex flex-col gap-4 lg:gap-6"
                        >
                            {/* Card 01 */}
                            <div className="bg-[#4471c4] text-white border-none rounded-[30px] p-8 flex flex-col justify-between min-h-[300px] shadow-lg shadow-[#4471c4]/20">
                                <span className="text-xl font-heading font-black opacity-40">01</span>
                                <div>
                                    <h2 className="text-2xl lg:text-3xl font-heading font-black uppercase leading-tight mb-6">
                                        {t('curieux_projets')}
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { icon: <WhatsappLogo size={18} />, color: "white" },
                                            { icon: <LinkedinLogo size={18} />, color: "white" },
                                            { icon: <EnvelopeSimple size={18} />, color: "white" }
                                        ].map((social, i) => (
                                            <div 
                                                key={i} 
                                                className="w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-white"
                                            >
                                                {social.icon}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Card 03 (Navy) */}
                            <div className="bg-[#111c2f] text-white border-none rounded-[30px] p-8 flex flex-col min-h-[350px] shadow-sm">
                                <span className="text-xl font-heading font-black opacity-30 mb-8">03</span>
                                <div className="space-y-6">
                                    <p className="text-[9px] font-black uppercase tracking-widest opacity-80">{t('type_de_service')}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {services.map((service) => (
                                            <button
                                                key={service.id}
                                                onClick={() => setSelectedService(service.id)}
                                                className={`px-4 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all ${
                                                    selectedService === service.id 
                                                    ? 'bg-[#4471c4] border-[#4471c4] text-white' 
                                                    : 'bg-transparent border-white/20 text-white/60 hover:border-[#4471c4] hover:text-[#4471c4]'
                                                }`}
                                            >
                                                {service.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="pt-4 space-y-4">
                                        <p className="text-[9px] font-black uppercase tracking-widest opacity-80">{t('budget')}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {budgets.map((budget) => (
                                                <button
                                                    key={budget.id}
                                                    onClick={() => setSelectedBudget(budget.id)}
                                                    className={`px-3 py-1.5 rounded-md border text-[8px] font-black uppercase tracking-widest transition-all ${
                                                        selectedBudget === budget.id 
                                                        ? 'bg-white text-[#111c2f] border-white' 
                                                        : 'bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                                                    }`}
                                                >
                                                    {budget.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column Area (Card 02 & 04) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 200 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="md:col-span-4 flex flex-col gap-4 lg:gap-6"
                        >
                            {/* Card 02 Area with Floating Arrow */}
                            <div className="relative group">
                                {/* The Card itself with Inverted Radius */}
                                <div className="inverted-radius-tr bg-[#ffb7d5] text-[#d63384] p-8 flex flex-col justify-between min-h-[250px] shadow-xl">
                                    <span className="text-xl font-heading font-black opacity-30">02</span>
                                    <div className="max-w-[200px] mt-auto">
                                        <p className="text-xs font-medium leading-relaxed font-bold uppercase tracking-tight">
                                            "{t('excellence_citation')}"
                                        </p>
                                    </div>
                                </div>
                                {/* Detached Arrow (Floating in the inverted radius area) */}
                                <div className="absolute top-[2px] right-[2px] w-16 h-16 flex items-center justify-center z-30">
                                    <div className="w-14 h-14 rounded-full bg-[#d63384] text-white shadow-2xl border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <ArrowUpRight size={24} weight="bold" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 04 (Form) */}
                            <div className="bg-white border border-gray-100 rounded-[30px] p-8 flex-1 flex flex-col shadow-sm">
                                <span className="text-xl font-heading font-black opacity-30 mb-10 text-[#111c2f]">04</span>
                                <div className="space-y-8 flex-1">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest opacity-80 text-[#111c2f]">{t('nom_complet')}</label>
                                        <input 
                                            type="text"
                                            placeholder={t('nom_complet').toUpperCase()}
                                            className="w-full bg-transparent border-b border-gray-100 py-4 text-xl font-heading font-black uppercase tracking-tighter focus:outline-none focus:border-[#4471c4] transition-colors placeholder:text-gray-400 text-[#111c2f]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest opacity-80 text-[#111c2f]">{t('votre_email_pro')}</label>
                                        <input 
                                            type="email"
                                            placeholder="VOTRE@EMAIL.COM"
                                            className="w-full bg-transparent border-b border-gray-100 py-4 text-xl font-heading font-black uppercase tracking-tighter focus:outline-none focus:border-[#4471c4] transition-colors placeholder:text-gray-400 text-[#111c2f]"
                                        />
                                    </div>
                                </div>
                                <button className="mt-12 w-full bg-[#4471c4] text-white py-6 rounded-2xl font-heading font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#111c2f] transition-all shadow-xl shadow-[#4471c4]/20 flex items-center justify-center gap-4 group">
                                    {t('envoyer_message')}
                                    <div className="w-2 h-2 rounded-full bg-white group-hover:scale-150 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Simplified Matrix Sub-Footer */}
                    <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-end gap-12 text-[#111c2f]">
                        <div className="max-w-md">
                            <h2 className="text-4xl font-heading font-black uppercase leading-none tracking-tighter mb-4">
                                BEG <span className="text-[#4471c4]">GROUP</span>
                            </h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                                {t('cabinet_panafricaen')}
                            </p>
                        </div>
                        <div className="flex gap-12">
                            <div className="flex flex-col gap-2">
                                <span className="text-[8px] font-black opacity-30 uppercase tracking-widest">{t('suivez_nous')}</span>
                                <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest">
                                    <a href="#" className="text-[#4471c4] hover:opacity-70 transition-colors">LinkedIn</a>
                                    <a href="#" className="hover:text-[#4471c4] transition-colors opacity-60">TikTok</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
