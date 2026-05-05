"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
    CheckCircle, 
    ArrowUpRight, 
    ShieldCheck, 
    ChartLineUp, 
    GraduationCap, 
    Files,
    TrendUp,
    UsersThree,
    Cube
} from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";

const services = [
    {
        id: "audit",
        title: "Audit & Diagnostic",
        icon: <ShieldCheck size={32} weight="duotone" />,
        color: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
        description: "Évaluation rigoureuse de vos systèmes pour garantir la conformité et identifier les leviers d'amélioration.",
        features: ["Audit de conformité ISO", "Diagnostic de performance", "Audit RSE & Gouvernance"],
        image: "/images/home/accompagnement.png",
        details: {
            objectifs: "Garantir la conformité aux normes internationales et identifier les opportunités de croissance.",
            clientele: "PME, Grandes Entreprises, Secteur Public.",
            processus: "Diagnostic initial -> Audit terrain -> Rapport détaillé -> Plan de remédiation.",
            benefices: "Sécurisation des opérations, crédibilité accrue, réduction des risques.",
            resultats: "Rapport de conformité, tableau de bord des performances, plan d'action priorisé."
        }
    },
    {
        id: "certification",
        title: "Accompagnement Certification",
        icon: <CheckCircle size={32} weight="duotone" />,
        color: "bg-[#4471c4]/10",
        borderColor: "border-[#4471c4]/20",
        description: "Un parcours structuré de l'audit initial jusqu'à l'obtention de votre certification internationale.",
        features: ["Systèmes de management", "Préparation aux audits", "Externalisation Qualité"],
        image: "/images/hero/expertise.jpg",
        details: {
            objectifs: "Accompagner l'entreprise jusqu'à l'obtention de la certification officielle.",
            clientele: "Entreprises en quête de reconnaissance internationale.",
            processus: "Gap Analysis -> Mise en place du SMQ -> Audit à blanc -> Accompagnement audit final.",
            benefices: "Accès à de nouveaux marchés, amélioration de l'image de marque, efficacité opérationnelle.",
            resultats: "Certification obtenue, processus documentés, culture de la qualité ancrée."
        }
    },
    {
        id: "conseil",
        title: "Conseil & Stratégie",
        icon: <ChartLineUp size={32} weight="duotone" />,
        color: "bg-purple-500/10",
        borderColor: "border-purple-500/20",
        description: "Optimisation de vos processus et déploiement de stratégies pour une croissance durable.",
        features: ["Planification stratégique", "Lean Management", "Restructuration"],
        image: "/images/home/conseil.png",
        details: {
            objectifs: "Définir une vision claire et optimiser l'organisation pour une performance durable.",
            clientele: "Dirigeants, Comités de direction, Startups en croissance.",
            processus: "Analyse stratégique -> Modélisation -> Accompagnement au changement -> Suivi KPI.",
            benefices: "Vision stratégique claire, organisation agile, rentabilité optimisée.",
            resultats: "Plan stratégique à 3-5 ans, restructuration réussie, croissance mesurable."
        }
    },
    {
        id: "formation",
        title: "Solutions Digitales",
        icon: <Cube size={32} weight="duotone" />,
        color: "bg-emerald-500/10",
        borderColor: "border-emerald-500/20",
        description: "Transformation numérique et outils intelligents pour piloter votre performance en temps réel.",
        features: ["Audit digital", "Choix technologique", "Formation"],
        image: "/images/home/formation-hero.png",
        details: {
            objectifs: "Digitaliser les processus métier pour plus de réactivité et d'intelligence.",
            clientele: "Entreprises souhaitant entamer ou accélérer leur transformation numérique.",
            processus: "Audit digital -> Choix technologique -> Développement/Intégration -> Formation.",
            benefices: "Gain de temps, données fiables en temps réel, automatisation des tâches.",
            resultats: "Outils digitaux opérationnels, équipes formées, pilotage par la donnée."
        }
    }
];

import { X, Target, Users, ListChecks, Heart, Trophy } from "@phosphor-icons/react";

import { useLanguage } from '@/context/LanguageContext';

export default function ServicesPage() {
    const { t, language } = useLanguage();
    const [selectedService, setSelectedService] = React.useState<any>(null);
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xMove = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    const services = [
        {
            id: "audit",
            title: t('audit_diag'),
            icon: <ShieldCheck size={32} weight="duotone" />,
            color: "bg-blue-500/10",
            borderColor: "border-blue-500/20",
            description: t('audit_diag_desc'),
            features: language === 'FR' ? ["Audit de conformité ISO", "Diagnostic de performance", "Audit RSE & Gouvernance"] : ["ISO compliance audit", "Performance diagnostic", "CSR & Governance audit"],
            image: "/images/home/accompagnement.png",
            details: {
                objectifs: language === 'FR' ? "Garantir la conformité aux normes internationales et identifier les opportunités de croissance." : "Ensure compliance with international standards and identify growth opportunities.",
                clientele: "PME, Grandes Entreprises, Secteur Public.",
                processus: language === 'FR' ? "Diagnostic initial -> Audit terrain -> Rapport détaillé -> Plan de remédiation." : "Initial diagnosis -> Field audit -> Detailed report -> Remediation plan.",
                benefices: language === 'FR' ? "Sécurisation des opérations, crédibilité accrue, réduction des risques." : "Securing operations, increased credibility, risk reduction.",
                resultats: language === 'FR' ? "Rapport de conformité, tableau de bord des performances, plan d'action priorisé." : "Compliance report, performance dashboard, prioritized action plan."
            }
        },
        {
            id: "certification",
            title: t('acc_certification'),
            icon: <CheckCircle size={32} weight="duotone" />,
            color: "bg-[#4471c4]/10",
            borderColor: "border-[#4471c4]/20",
            description: t('acc_certification_desc'),
            features: language === 'FR' ? ["Systèmes de management", "Préparation aux audits", "Externalisation Qualité"] : ["Management systems", "Audit preparation", "Quality outsourcing"],
            image: "/images/hero/expertise.jpg",
            details: {
                objectifs: language === 'FR' ? "Accompagner l'entreprise jusqu'à l'obtention de la certification officielle." : "Support the company until obtaining official certification.",
                clientele: language === 'FR' ? "Entreprises en quête de reconnaissance internationale." : "Companies seeking international recognition.",
                processus: language === 'FR' ? "Gap Analysis -> Mise en place du SMQ -> Audit à blanc -> Accompagnement audit final." : "Gap Analysis -> QMS implementation -> Mock audit -> Final audit support.",
                benefices: language === 'FR' ? "Accès à de nouveaux marchés, amélioration de l'image de marque, efficacité opérationnelle." : "Access to new markets, improved brand image, operational efficiency.",
                resultats: language === 'FR' ? "Certification obtenue, processus documentés, culture de la qualité ancrée." : "Certification obtained, documented processes, quality culture anchored."
            }
        },
        {
            id: "conseil",
            title: t('conseil_strat'),
            icon: <ChartLineUp size={32} weight="duotone" />,
            color: "bg-purple-500/10",
            borderColor: "border-purple-500/20",
            description: t('conseil_strat_desc'),
            features: language === 'FR' ? ["Planification stratégique", "Lean Management", "Restructuration"] : ["Strategic planning", "Lean Management", "Restructuring"],
            image: "/images/home/conseil.png",
            details: {
                objectifs: language === 'FR' ? "Définir une vision claire et optimiser l'organisation pour une performance durable." : "Define a clear vision and optimize the organization for sustainable performance.",
                clientele: language === 'FR' ? "Dirigeants, Comités de direction, Startups en croissance." : "Executives, Steering Committees, Growing Startups.",
                processus: language === 'FR' ? "Analyse stratégique -> Modélisation -> Accompagnement au changement -> Suivi KPI." : "Strategic analysis -> Modeling -> Change management -> KPI monitoring.",
                benefices: language === 'FR' ? "Vision stratégique claire, organisation agile, rentabilité optimisée." : "Clear strategic vision, agile organization, optimized profitability.",
                resultats: language === 'FR' ? "Plan stratégique à 3-5 ans, restructuration réussie, croissance mesurable." : "3-5 year strategic plan, successful restructuring, measurable growth."
            }
        },
        {
            id: "formation",
            title: t('solutions_digitales_title'),
            icon: <Cube size={32} weight="duotone" />,
            color: "bg-emerald-500/10",
            borderColor: "border-emerald-500/20",
            description: t('solutions_digitales_desc'),
            features: language === 'FR' ? ["Audit digital", "Choix technologique", "Formation"] : ["Digital audit", "Technology choice", "Training"],
            image: "/images/home/formation-hero.png",
            details: {
                objectifs: language === 'FR' ? "Digitaliser les processus métier pour plus de réactivité et d'intelligence." : "Digitalize business processes for more responsiveness and intelligence.",
                clientele: language === 'FR' ? "Entreprises souhaitant entamer ou accélérer leur transformation numérique." : "Companies wishing to start or accelerate their digital transformation.",
                processus: language === 'FR' ? "Audit digital -> Choix technologique -> Développement/Intégration -> Formation." : "Digital audit -> Technology choice -> Development/Integration -> Training.",
                benefices: language === 'FR' ? "Gain de temps, données fiables en temps réel, automatisation des tâches." : "Time saving, reliable real-time data, task automation.",
                resultats: language === 'FR' ? "Outils digitaux opérationnels, équipes formées, pilotage par la donnée." : "Operational digital tools, trained teams, data-driven management."
            }
        }
    ];

    return (
        <main ref={containerRef} className="min-h-screen bg-[#4471c4] text-white pt-32 overflow-hidden">
            {/* Monumental Header */}
            <section className="relative w-full py-20 flex justify-center items-center overflow-hidden pointer-events-none">
                <motion.h1 
                    style={{ x: xMove }}
                    className="text-[22vw] font-heading font-black leading-none tracking-tighter text-[#111c2f] uppercase opacity-40 whitespace-nowrap select-none"
                >
                    SERVICES
                </motion.h1>
            </section>

            {/* Vibrant Services Grid Section */}
            <section className="bg-white text-[#111c2f] py-24 px-6 md:px-12 lg:px-20 overflow-hidden rounded-t-[60px]">
                <div className="max-w-[1440px] mx-auto">
                    <div className="flex justify-between items-end mb-16">
                        <motion.h2 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-5xl md:text-7xl font-heading font-black tracking-tight leading-none uppercase"
                        >
                            {language === 'FR' ? "Nos" : "Our"} <br />Services
                        </motion.h2>
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="hidden lg:flex flex-wrap gap-3 max-w-xs justify-end translate-y-32 -translate-x-20"
                        >
                            <span className="bg-[#e0e7ff] text-[#4338ca] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest rotate-6">{t('expertise_iso')}</span>
                            <span className="bg-[#fce7f3] text-[#9d174d] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest -rotate-12">{t('audit_pme')}</span>
                            <span className="bg-[#f3f4f6] text-[#374151] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest rotate-3">{t('formation_2024')}</span>
                        </motion.div>
                    </div>

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } },
                            hidden: {}
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32 items-start"
                    >
                        {/* Service 1: Audit */}
                        <motion.div 
                            variants={{
                                hidden: { opacity: 0, y: 100 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
                            onClick={() => setSelectedService(services[0])}
                            className="bg-[#111c2f] p-8 rounded-[40px] min-h-[300px] flex flex-col justify-between group relative self-end shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        >
                            <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-[#4471c4] group-hover:text-white transition-all">
                                <ArrowUpRight size={20} weight="bold" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-heading font-black uppercase tracking-tight mb-4 text-white">
                                    {services[0].title.split(' & ').map((part, i) => (
                                        <React.Fragment key={i}>
                                            {part} {i === 0 && <br />}
                                        </React.Fragment>
                                    ))}
                                </h3>
                                <p className="text-white/60 text-sm font-medium leading-relaxed">
                                    {services[0].description}
                                </p>
                            </div>
                            <div className="flex justify-start pt-6">
                                <ShieldCheck size={80} weight="duotone" className="text-white opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 -ml-2" />
                            </div>
                        </motion.div>

                        {/* Service 2: Certification */}
                        <motion.div 
                            variants={{
                                hidden: { opacity: 0, y: 100 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
                            onClick={() => setSelectedService(services[1])}
                            className="bg-[#4471c4] p-8 rounded-[40px] min-h-[440px] flex flex-col justify-between group relative inverted-radius text-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        >
                            {/* Inverted radius notch at top-right - arrow moved to top-left */}
                            <div className="absolute top-6 left-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#4471c4] transition-all">
                                <ArrowUpRight size={20} weight="bold" />
                            </div>
                            <div className="pt-12">
                                <h3 className="text-2xl font-heading font-black uppercase tracking-tight mb-4 text-white">
                                    Certification <br /> ISO
                                </h3>
                                <p className="text-white/80 text-sm font-medium leading-relaxed">
                                    {services[1].description}
                                </p>
                            </div>
                            <div className="flex justify-start pt-6">
                                <CheckCircle size={80} weight="duotone" className="text-white opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 -ml-2" />
                            </div>
                        </motion.div>

                        {/* Service 3: Conseil */}
                        <motion.div 
                            variants={{
                                hidden: { opacity: 0, y: 100 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
                            onClick={() => setSelectedService(services[2])}
                            className="bg-[#111c2f] p-8 rounded-[40px] min-h-[440px] flex flex-col justify-between group relative text-white shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        >
                            <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-[#4471c4] group-hover:text-white transition-all">
                                <ArrowUpRight size={20} weight="bold" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-heading font-black uppercase tracking-tight mb-4 text-white">
                                    {services[2].title.split(' & ').map((part, i) => (
                                        <React.Fragment key={i}>
                                            {part} {i === 0 && <br />}
                                        </React.Fragment>
                                    ))}
                                </h3>
                                <p className="text-white/60 text-sm font-medium leading-relaxed">
                                    {services[2].description}
                                </p>
                            </div>
                            <div className="flex justify-start pt-6">
                                <ChartLineUp size={80} weight="duotone" className="text-white opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 -ml-2" />
                            </div>
                        </motion.div>

                        {/* Service 4: Solutions Digitales */}
                        <motion.div 
                            variants={{
                                hidden: { opacity: 0, y: 100 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
                            onClick={() => setSelectedService(services[3])}
                            className="bg-[#4471c4] p-8 rounded-[40px] min-h-[300px] flex flex-col justify-between group relative self-end inverted-radius shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        >
                            <div className="absolute top-6 left-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#4471c4] transition-all">
                                <ArrowUpRight size={20} weight="bold" />
                            </div>
                            <div className="pt-12">
                                <h3 className="text-2xl font-heading font-black uppercase tracking-tight mb-4 text-white">
                                    {services[3].title.split(' ').map((part, i) => (
                                        <React.Fragment key={i}>
                                            {part} {i === 0 && <br />}
                                        </React.Fragment>
                                    ))}
                                </h3>
                                <p className="text-white/80 text-sm font-medium leading-relaxed">
                                    {services[3].description}
                                </p>
                            </div>
                            <div className="flex justify-start pt-6">
                                <Cube size={80} weight="duotone" className="text-white opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 -ml-2" />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Modern Newsletter / CTA Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-[#4471C4] rounded-[40px] p-8 lg:p-10 flex flex-col lg:flex-row gap-8 items-center relative overflow-hidden border border-white/10"
                    >
                        <motion.div 
                            style={{ scale: useTransform(scrollYProgress, [0.7, 1], [1, 1.2]) }}
                            className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none"
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[80px] border-white rounded-full scale-150" />
                        </motion.div>
                        
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                            className="w-full lg:w-1/5 aspect-square relative rounded-2xl overflow-hidden shadow-xl"
                        >
                            <Image src="/images/home/hero-team.png" alt="BEG Team" fill className="object-cover" />
                        </motion.div>

                        <div className="w-full lg:w-4/5 space-y-6 relative z-10">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black tracking-tight leading-tight text-white">
                                {t('restez_informe')}
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                                <div className="flex-1 relative">
                                    <input 
                                        type="email" 
                                        placeholder={t('votre_adresse_email')} 
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                                    />
                                </div>
                                <button className="bg-white text-[#4471C4] px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-100 transition-colors">
                                    {t('sinscrire')}
                                </button>
                            </div>
                            <p className="text-[9px] text-white/50 font-bold uppercase tracking-widest">
                                {t('accept_terms')}
                            </p>
                            
                            <div className="pt-6 flex flex-wrap gap-6 border-t border-white/10 mt-8">
                                <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">{t('accueil')}</Link>
                                <Link href="/contact" className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">{t('contact')}</Link>
                                <Link href="/a-propos" className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">{t('apropos')}</Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* Service Detail Modal */}
            <motion.div 
                initial={false}
                animate={selectedService ? "open" : "closed"}
                className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 pointer-events-none`}
            >
                {/* Backdrop */}
                <motion.div 
                    variants={{
                        open: { opacity: 1, pointerEvents: "auto" },
                        closed: { opacity: 0, pointerEvents: "none" }
                    }}
                    onClick={() => setSelectedService(null)}
                    className="absolute inset-0 bg-[#111c2f]/90 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div 
                    variants={{
                        open: { opacity: 1, scale: 1, y: 0, pointerEvents: "auto" },
                        closed: { opacity: 0, scale: 0.9, y: 20, pointerEvents: "none" }
                    }}
                    className="relative w-full max-w-5xl bg-white rounded-[48px] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
                >
                    {/* Left: Visual & Summary */}
                    <div className="w-full lg:w-1/3 bg-[#111c2f] p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <button 
                                onClick={() => setSelectedService(null)}
                                className="mb-12 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#111c2f] transition-all"
                            >
                                <X size={24} />
                            </button>
                            <div className="mb-6 opacity-40">
                                {selectedService?.icon}
                            </div>
                            <h2 className="text-2xl md:text-4xl font-heading font-black uppercase tracking-tight leading-[0.9] mb-6 break-words">
                                {selectedService?.title}
                            </h2>
                            <p className="text-white/60 text-xs font-medium leading-relaxed">
                                {selectedService?.description}
                            </p>
                        </div>
                        
                        <div className="relative z-10 pt-12">
                            <Link 
                                href="/contact" 
                                className="inline-flex items-center gap-3 bg-[#4471c4] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                            >
                                {t('demander_devis')}
                                <ArrowUpRight size={16} weight="bold" />
                            </Link>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#4471c4] opacity-20 rounded-full blur-[100px]" />
                    </div>

                    {/* Right: Detailed Sheets */}
                    <div className="w-full lg:w-2/3 p-8 lg:p-16 overflow-y-auto bg-gray-50/50">
                        <motion.div 
                            initial="hidden"
                            animate={selectedService ? "visible" : "hidden"}
                            variants={{
                                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                                hidden: {}
                            }}
                            className="space-y-12"
                        >
                            {/* Objectifs & Clientèle Section */}
                            <motion.div 
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            >
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 text-[#4471c4] mb-4">
                                        <div className="p-2 bg-[#4471c4]/10 rounded-lg">
                                            <Target size={24} weight="duotone" />
                                        </div>
                                        <h4 className="font-heading font-bold uppercase tracking-[0.2em] text-[9px]">{t('objectifs')}</h4>
                                    </div>
                                    <p className="text-[#111c2f] text-xs leading-relaxed font-medium">
                                        {selectedService?.details?.objectifs}
                                    </p>
                                </div>

                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 text-[#4471c4] mb-4">
                                        <div className="p-2 bg-[#4471c4]/10 rounded-lg">
                                            <Users size={24} weight="duotone" />
                                        </div>
                                        <h4 className="font-heading font-bold uppercase tracking-[0.2em] text-[9px]">{t('clientele')}</h4>
                                    </div>
                                    <p className="text-[#111c2f] text-xs leading-relaxed font-medium">
                                        {selectedService?.details?.clientele}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Processus Section - Visual Flow */}
                            <motion.div 
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                className="bg-white p-8 lg:p-10 rounded-[40px] shadow-sm border border-gray-100 relative overflow-hidden"
                            >
                                <div className="flex items-center gap-3 text-[#4471c4] mb-8 relative z-10">
                                    <div className="p-2 bg-[#4471c4]/10 rounded-lg">
                                        <ListChecks size={24} weight="duotone" />
                                    </div>
                                    <h4 className="font-heading font-bold uppercase tracking-[0.2em] text-[9px]">{t('processus_travail')}</h4>
                                </div>
                                <div className="relative z-10">
                                    <div className="flex flex-wrap items-center gap-4">
                                        {selectedService?.details?.processus.split(' -> ').map((step: string, index: number) => (
                                            <React.Fragment key={index}>
                                                <div className="bg-gray-50 px-5 py-3 rounded-2xl border border-gray-200 text-[#111c2f] text-[10px] font-bold uppercase tracking-wide shadow-sm">
                                                    {step}
                                                </div>
                                                {index < selectedService?.details?.processus.split(' -> ').length - 1 && (
                                                    <div className="text-[#4471c4] opacity-30">
                                                        <ArrowUpRight size={16} weight="bold" className="rotate-90" />
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                                {/* Subtle background icon */}
                                <ListChecks size={120} weight="duotone" className="absolute -bottom-6 -right-6 text-gray-100 -rotate-12 pointer-events-none" />
                            </motion.div>

                            {/* Bénéfices & Résultats Section */}
                            <motion.div 
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            >
                                <div className="bg-[#f0f9ff] p-8 rounded-3xl border border-blue-100">
                                    <div className="flex items-center gap-3 text-[#4471c4] mb-4">
                                        <div className="p-2 bg-white rounded-lg shadow-sm">
                                            <Heart size={24} weight="duotone" />
                                        </div>
                                        <h4 className="font-heading font-bold uppercase tracking-[0.2em] text-[9px]">{t('benefices')}</h4>
                                    </div>
                                    <p className="text-[#111c2f] text-xs leading-relaxed font-medium">
                                        {selectedService?.details?.benefices}
                                    </p>
                                </div>

                                <div className="bg-[#fefce8] p-8 rounded-3xl border border-yellow-100">
                                    <div className="flex items-center gap-3 text-[#a16207] mb-4">
                                        <div className="p-2 bg-white rounded-lg shadow-sm">
                                            <Trophy size={24} weight="duotone" />
                                        </div>
                                        <h4 className="font-heading font-bold uppercase tracking-[0.2em] text-[9px]">{t('resultats')}</h4>
                                    </div>
                                    <p className="text-[#111c2f] text-xs leading-relaxed font-medium">
                                        {selectedService?.details?.resultats}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
}
