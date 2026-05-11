"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ArrowRight, Globe, User } from "@phosphor-icons/react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ label: string; href: string }>;
}

export const MobileMenuOverlay = ({ isOpen, onClose, navLinks }: MobileMenuOverlayProps) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#111c2f]/60 backdrop-blur-md z-[110]"
          />

          {/* Menu Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[120] shadow-2xl flex flex-col p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
              <Link href="/" onClick={onClose} className="block">
                <Image 
                  src="/images/favicon-trimmed.png" 
                  alt="BEG Favicon" 
                  width={52} 
                  height={52} 
                  className="object-contain hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#111c2f]"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-6 mb-auto">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-center justify-between text-2xl font-heading font-black text-[#111c2f] uppercase tracking-tighter"
                  >
                    {link.label}
                    <ArrowRight 
                      size={20} 
                      className="text-[#4471c4] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" 
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer Actions */}
            <div className="mt-12 flex flex-col gap-4">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 w-full text-left"
              >
                <Globe size={24} weight="bold" className="text-[#4471c4]" />
                <span className="text-sm font-bold text-[#111c2f]">
                  {t('langue_label')}: {language === "FR" ? `${t('francais')} (FR)` : `${t('anglais')} (EN)`}
                </span>
              </button>
              
              <Link 
                href="/connexion" 
                onClick={onClose}
                className="flex items-center justify-center gap-3 bg-[#111c2f] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[#4471c4] transition-colors"
              >
                <User size={18} weight="bold" />
                {t('connexion')}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
