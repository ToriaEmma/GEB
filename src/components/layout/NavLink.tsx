"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface NavLinkProps {
  href: string;
  label: string;
  scrolled: boolean;
}

export const NavLink = ({ href, label, scrolled }: NavLinkProps) => (
  <Link
    href={href}
    className={`relative px-5 py-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase transition-colors duration-300 rounded-full group overflow-hidden ${
      scrolled 
        ? "text-white/60 hover:text-white" 
        : "text-black/80 hover:text-black"
    }`}
  >
    <span className="relative z-10">{label}</span>
    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
  </Link>
);

