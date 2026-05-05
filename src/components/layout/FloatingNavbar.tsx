"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, User, List } from "@phosphor-icons/react";
import { MobileMenuOverlay } from "./MobileMenuOverlay";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

export const FloatingNavbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { label: t("accueil"), href: "/" },
    { label: t("apropos"), href: "/a-propos" },
    { label: t("services"), href: "/services" },
    { label: t("realisations"), href: "/realisations" },
    { label: t("actualites"), href: "/actualites" },
    { label: t("contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On home page, we only show it when scrolled (since Hero has its own)
  // On other pages, we show it always
  const isHome = pathname === "/";
  const shouldShow = !isHome || scrolled;

  return (
    <>
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 24, x: "-50%", opacity: 1 }}
            exit={{ y: -100, x: "-50%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 z-[100] w-auto max-w-[95vw]"
          >
            <nav className="bg-[#050A18]/90 backdrop-blur-xl border border-white/10 px-4 py-2 md:px-8 md:py-4 rounded-full flex items-center gap-4 md:gap-8 shadow-2xl">
              {/* Nav Links - Desktop Only */}
              <div className="hidden xl:flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`font-heading text-[11px] font-bold uppercase tracking-widest transition-all relative group/link whitespace-nowrap ${
                        isActive ? "text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {link.label}
                      <span className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover/link:w-full"
                      }`} />
                    </Link>
                  );
                })}
              </div>

              {/* Separator - Desktop Only */}
              <div className="hidden xl:block w-px h-4 bg-white/20" />

              {/* Icons / Actions */}
              <div className="flex items-center gap-2 md:gap-4">
                <button 
                  onClick={toggleLanguage}
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2 px-2 md:px-0"
                >
                  <Globe size={18} weight="bold" />
                  <span className="text-[10px] font-bold">{language}</span>
                </button>
                
                <Link href="/connexion" className="bg-white text-[#050A18] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-[#4471c4] hover:text-white transition-all flex items-center gap-2">
                  <User size={14} weight="bold" />
                  <span className="hidden sm:inline">{t("connexion")}</span>
                </Link>

                {/* Mobile Menu Toggle */}
                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="xl:hidden w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <List size={20} weight="bold" />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileMenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        navLinks={navLinks} 
      />
    </>
  );
};
