"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { NavLink } from "./NavLink";
import { NavButton } from "./NavButton";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Hide global navbar on homepage since it has an integrated one in the Hero
  const isHome = pathname === "/";

  return (
    <>
      {!isHome && (
        <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-8 pointer-events-none transition-all duration-700 ${scrolled ? "pt-4" : "pt-6"}`}>
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: scrolled ? 0 : -100, 
            opacity: scrolled ? 1 : 0 
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between w-full max-w-[1240px] pl-2 sm:pl-4 pr-8 sm:pr-10 transition-all duration-700 rounded-full border ${scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-white/20 py-3"
            : "bg-white/10 backdrop-blur-md border-white/10 py-4 mt-2"
            }`}
        >
          {/* Logo - Left */}
          <div className="flex-shrink-0 flex items-center justify-start flex-1 lg:flex-none lg:w-[300px]">
            <Link href="/" className="flex items-center group">
              <div className={`relative transition-all duration-700 ${scrolled ? "w-60 h-20" : "w-72 h-32"}`}>
                <Image
                  src="/images/logo-offici.png"
                  alt="MEB Logo"
                  fill
                  className="object-contain object-left transition-all duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Navigation - Center */}
          <nav className="hidden lg:flex items-center justify-center gap-10 flex-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[11px] font-bold uppercase tracking-widest transition-all duration-300 relative group/link ${scrolled ? "text-gray-700" : "text-gray-900"
                  }`}
              >
                <span className="relative z-10 transition-colors duration-300 group-hover/link:text-[#4471c4]">
                  {l.label}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#4471c4] transition-all duration-300 group-hover/link:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center justify-end gap-6 flex-1 lg:flex-none lg:w-[300px]">
            <Link
              href="/connexion"
              className={`px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all duration-500 ${scrolled
                ? "bg-[#4471c4] text-white shadow-lg shadow-[#4471c4]/20 hover:scale-105"
                : "bg-white text-gray-900 shadow-md hover:bg-gray-50 hover:scale-105"
                }`}
            >
              Se connecter
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <NavButton onClick={() => setOpen(true)} scrolled={scrolled} icon="menu" ariaLabel="Menu" />
          </div>
        </motion.header>
      </div>
      )}

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#060D03] lg:hidden"
          >
            <div className="relative flex flex-col h-full px-6 py-6 overflow-hidden">
              {/* Accents */}
              <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#4471c4]/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 -left-20 w-80 h-80 bg-[#4471c4]/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="flex items-center justify-between mb-16 relative z-10">
                <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                  <div className="relative w-44 h-44 drop-shadow-[0_0_12px_rgba(68,113,196,0.3)]">
                    <Image
                      src="/images/logo-offici.png"
                      alt="Best Experts Group Logo"
                      width={176}
                      height={176}
                      className="w-full h-full"
                    />
                  </div>

                </Link>
                <NavButton onClick={() => setOpen(false)} scrolled={scrolled} icon="close" ariaLabel="Fermer" />
              </div>
              <nav className="flex flex-col gap-2 flex-1 relative z-10">
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, ease: "easeOut" }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-5 border-b border-white/[0.05] group overflow-hidden relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4471c4]/0 via-[#4471c4]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <span className="relative z-10 font-heading font-bold text-[36px] tracking-tight text-white group-hover:text-[#4471c4] transition-colors duration-500">
                        {l.label}
                      </span>
                      <ArrowRightIcon size={24} className="relative z-10 text-white/20 group-hover:text-[#4471c4] group-hover:-rotate-45 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto pt-10 flex flex-col gap-4 relative z-10">
                {/* <Link
                  href="/espace-membre"
                  onClick={() => setOpen(false)}
                  className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-white/50 text-center py-4 hover:text-white transition-colors"
                >
                  Accès Espace Membre
                </Link> */}
                <Link
                  href="/prendre-rdv"
                  onClick={() => setOpen(false)}
                  className="relative overflow-hidden group bg-[#4471c4] text-white font-heading font-bold uppercase tracking-widest text-[11px] text-center py-5 rounded-full shadow-lg shadow-[#4471c4]/20"
                >
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                  <span className="relative z-10 group-hover:text-[#4471c4] transition-colors duration-500">Prendre rendez-vous</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
