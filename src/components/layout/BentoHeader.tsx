"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Globe, List } from "@phosphor-icons/react";
import { MobileMenuOverlay } from "./MobileMenuOverlay";

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

export const BentoHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) return null;

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Actualités", href: "/actualites" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 md:h-24 pointer-events-none transition-colors duration-300 ${!isHome ? 'bg-[#050A18] shadow-lg' : ''}`}>
        <div className="relative h-full">
          
          {/* Top Left Notch (Logo) */}
          <div className="absolute top-0 left-0 w-[180px] sm:w-[240px] md:w-[300px] h-16 sm:h-20 md:h-24 bg-white rounded-br-[32px] sm:rounded-br-[40px] pointer-events-auto shadow-sm">
            <div className="absolute top-0 -right-[40px] w-10 h-10 hidden sm:block">
              <InvertedCorner rotate={180} />
            </div>
            <div className="absolute -bottom-[40px] left-0 w-10 h-10 hidden sm:block">
              <InvertedCorner rotate={180} />
            </div>
            <div className="flex items-center h-full pl-4 sm:pl-6">
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
          </div>

          {/* Floating Pill Menu - Desktop Only */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 hidden xl:block pointer-events-auto">
            <nav className="bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="font-heading text-[11px] font-bold uppercase tracking-widest text-white/80 hover:text-white transition-all relative group/link"
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-300 ${pathname === link.href ? 'w-full' : 'w-0 group-hover/link:w-full'}`} />
                </Link>
              ))}
            </nav>
          </div>

          {/* Top Right Notch (Icons/Menu) */}
          <div className="absolute top-0 right-0 h-16 sm:h-20 md:h-24 bg-white rounded-bl-[32px] sm:rounded-bl-[40px] pointer-events-auto p-1.5 sm:p-2 md:p-3 shadow-sm">
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
              {/* Hamburger Menu Toggle */}
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="xl:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#4471c4] text-white flex items-center justify-center shadow-lg shadow-[#4471c4]/20 hover:scale-105 transition-all"
              >
                <List size={20} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        navLinks={navLinks} 
      />
    </>
  );
};
