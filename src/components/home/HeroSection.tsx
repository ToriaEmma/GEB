"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MagnifyingGlass, Play, ShoppingBag, CaretLeft, CaretRight, Globe, List } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenuOverlay } from "../layout/MobileMenuOverlay";

const InvertedCorner = ({ className, rotate = 0 }: { className?: string, rotate?: number }) => (
  <svg 
    width="40" 
    height="40" 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <path d="M40 0V40H0C22.0914 40 40 22.0914 40 0Z" fill="white"/>
  </svg>
);

export const HeroSection = () => {
  const [activeCard, setActiveCard] = React.useState(0);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Transform values for the expansion effect
  const containerScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.05]);
  const innerScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.2]);
  const containerRadius = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const containerPadding = useTransform(scrollYProgress, [0, 0.3], [12, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, 50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Actualités", href: "/actualites" },
    { label: "Contact", href: "/contact" },
  ];
  
  const cards = [
    {
      title: "AUDIT & CONFORMITÉ",
      desc: "Anticipez les risques et assurez la conformité de votre organisation avec nos experts certifiés ISO.",
      image: "/images/home/hero-vr.png"
    },
    {
      title: "FORMATION CERTIFIANTE",
      desc: "Développez les compétences de vos équipes avec nos programmes aux standards internationaux.",
      image: "/images/home/team-hero.jpg"
    },
    {
      title: "CONSEIL STRATÉGIQUE",
      desc: "Optimisez votre gouvernance et vos processus pour une performance durable et mesurable.",
      image: "/images/hero/Image collée.png"
    }
  ];

  const nextCard = () => setActiveCard((prev) => (prev + 1) % cards.length);
  const prevCard = () => setActiveCard((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[150vh] bg-white pt-2 sm:pt-4 px-2 sm:px-4 md:px-6 lg:px-8 pb-2 sm:pb-4 md:pb-6 lg:pb-8"
    >
      <div className="sticky top-2 sm:top-4 md:top-6 lg:top-8 h-[85vh] sm:h-[80vh] md:h-[90vh]">
        <motion.div 
          style={{ 
            borderRadius: containerRadius,
            padding: containerPadding,
            scale: containerScale
          }}
          className="max-w-[1440px] mx-auto relative h-full bg-white shadow-2xl overflow-hidden border border-gray-100"
        >
          
          {/* Floating Integrated Menu */}
          <motion.div 
            style={{ opacity: headerOpacity }}
            className="absolute top-8 left-1/2 -translate-x-1/2 z-30 hidden xl:block"
          >
            <nav className="bg-white/90 backdrop-blur-[50px] border border-white/20 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl">
                {navLinks.map((link) => (
                    <Link 
                        key={link.href} 
                        href={link.href}
                        className="font-heading text-[11px] font-bold uppercase tracking-widest text-[#050A18] hover:text-[#4471c4] transition-all relative group/link"
                    >
                        {link.label}
                        <span className={`absolute -bottom-1 left-0 h-[1px] bg-[#4471c4] transition-all duration-300 ${pathname === link.href ? 'w-full' : 'w-0 group-hover/link:w-full'}`} />
                    </Link>
                ))}
            </nav>
          </motion.div>
        
          <div className="absolute inset-0 z-0">
              <motion.div 
                style={{ borderRadius: containerRadius }}
                className="w-full h-full bg-[#050A18] overflow-hidden relative"
              >
                <div className="absolute inset-0 z-0">
                    <motion.div
                        key={activeCard}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.9 }}
                        style={{ scale: innerScale }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <Image 
                            src={cards[activeCard].image} 
                            alt={cards[activeCard].title} 
                            fill 
                            className="object-cover object-center scale-100"
                            priority
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050A18] via-[#050A18]/20 to-transparent opacity-70" />
                </div>

                <motion.div 
                    style={{ y: contentY, opacity: contentOpacity }}
                    className="absolute inset-0 z-10 flex flex-col justify-center xl:justify-end p-6 pb-24 md:p-20"
                >
                    <div className="max-w-3xl mb-8 md:mb-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h1 className="font-heading font-black text-[22px] xs:text-[26px] sm:text-4xl md:text-6xl lg:text-[80px] text-white leading-[1.1] mb-4 sm:mb-6 md:mb-10 tracking-tighter uppercase break-words">
                                VOTRE PARTENAIRE <br className="hidden xs:block sm:block" />
                                <span className="text-white">EN EXCELLENCE</span>
                            </h1>
                            
                            <Link href="/services">
                                <button className="bg-[#4471c4] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold uppercase text-[8px] sm:text-[10px] tracking-[0.15em] hover:scale-105 transition-all shadow-xl shadow-[#4471c4]/20 flex items-center gap-2 sm:gap-3 group">
                                    Découvrir l'Excellence
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform">
                                        <ArrowUpRight size={10} weight="bold" />
                                    </div>
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
              </motion.div>
          </div>
 
          <motion.div 
              style={{ opacity: headerOpacity }}
              className="absolute top-0 left-0 w-[180px] sm:w-[240px] md:w-[300px] h-16 sm:h-20 md:h-24 bg-white rounded-br-[32px] sm:rounded-br-[40px] z-20"
          >
              <div className="absolute top-0 -right-[40px] w-10 h-10 hidden sm:block">
                  <InvertedCorner rotate={180} />
              </div>
              <div className="absolute -bottom-[40px] left-0 w-10 h-10 hidden sm:block">
                  <InvertedCorner rotate={180} />
              </div>
              <div className="flex items-center h-full pl-2 sm:pl-0 pr-4 sm:pr-8">
                  <Link href="/" className="flex items-center">
                      <Image 
                          src="/images/logo-offici.png" 
                          alt="Logo" 
                          width={230} 
                          height={90} 
                          className="object-contain"
                          priority
                      />
                  </Link>
              </div>
          </motion.div>

          <motion.div 
              style={{ opacity: headerOpacity }}
              className="absolute top-0 right-0 h-16 sm:h-20 md:h-24 bg-white rounded-bl-[32px] sm:rounded-bl-[40px] z-20 p-1.5 sm:p-2 md:p-3"
          >
              <div className="absolute top-0 -left-[40px] w-10 h-10 hidden sm:block">
                  <InvertedCorner rotate={270} />
              </div>
              <div className="absolute -bottom-[40px] right-0 w-10 h-10 hidden sm:block">
                  <InvertedCorner rotate={270} />
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 h-full px-2">
                  <button className="w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full border border-gray-100 flex flex-col items-center justify-center text-[#050A18] hover:bg-gray-50 transition-colors shadow-sm group">
                      <Globe size={18} weight="bold" className="group-hover:rotate-12 transition-transform md:hidden" />
                      <Globe size={20} weight="bold" className="group-hover:rotate-12 transition-transform hidden md:block" />
                      <span className="text-[6px] md:text-[7px] font-black mt-0.5">FR</span>
                  </button>
                  <Link href="/connexion" className="flex items-center gap-2 sm:gap-3 bg-[#050A18] text-white px-4 sm:pl-6 md:pl-8 sm:pr-4 h-9 sm:h-10 md:h-14 rounded-full hover:scale-105 transition-transform group">
                      <span className="font-heading text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest hidden sm:inline">Connexion</span>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#4471c4]">
                          <ArrowUpRight size={10} weight="bold" className="md:hidden" />
                          <ArrowUpRight size={12} weight="bold" className="hidden md:block" />
                      </div>
                  </Link>
                  <button 
                      onClick={() => setIsMenuOpen(true)}
                      className="xl:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#4471c4] text-white flex items-center justify-center shadow-lg shadow-[#4471c4]/20 hover:scale-105 transition-all"
                  >
                      <List size={20} weight="bold" />
                  </button>
              </div>
          </motion.div>

          <motion.div 
              style={{ opacity: contentOpacity }}
              className="absolute bottom-0 right-0 w-full max-w-[240px] xs:max-w-[280px] sm:max-w-[320px] md:max-w-[420px] bg-white rounded-tl-[32px] sm:rounded-tl-[40px] z-20 p-5 xs:p-6 sm:p-8 md:p-12 shadow-[-20px_-20px_60px_rgba(0,0,0,0.1)]"
          >
              <div className="absolute bottom-0 -left-[40px] w-10 h-10">
                  <InvertedCorner rotate={0} />
              </div>
              <div className="absolute -top-[40px] right-0 w-10 h-10">
                  <InvertedCorner rotate={0} />
              </div>
              
              <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
              >
                  <h3 className="font-heading font-black text-lg sm:text-xl md:text-2xl text-[#050A18] mb-2 sm:mb-4 uppercase tracking-tighter">
                      {cards[activeCard].title}
                  </h3>
                  <p className="text-gray-500 text-[10px] xs:text-[11px] sm:text-sm leading-relaxed mb-4 sm:mb-8 font-medium">
                      {cards[activeCard].desc}
                  </p>
              </motion.div>

              <div className="flex gap-2 sm:gap-3">
                  <button 
                      onClick={prevCard}
                      className="w-10 h-10 xs:w-12 xs:h-12 md:w-16 md:h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#050A18] hover:bg-[#050A18] hover:text-white transition-all shadow-sm active:scale-95"
                  >
                      <CaretLeft size={20} weight="bold" className="xs:hidden" />
                      <CaretLeft size={24} weight="bold" className="hidden xs:block" />
                  </button>
                  <button 
                      onClick={nextCard}
                      className="w-10 h-10 xs:w-12 xs:h-12 md:w-16 md:h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#050A18] hover:bg-[#050A18] hover:text-white transition-all shadow-sm active:scale-95"
                  >
                      <CaretRight size={20} weight="bold" className="xs:hidden" />
                      <CaretRight size={24} weight="bold" className="hidden xs:block" />
                  </button>
              </div>
          </motion.div>
        </motion.div>
      </div>
      
      <MobileMenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        navLinks={navLinks} 
      />
    </section>
  );
};
