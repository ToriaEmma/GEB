"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white pt-24 pb-8 overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-[1400px] px-6 sm:px-12 flex flex-col">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between mb-24">
          <div className="mb-12 lg:mb-0 ml-4 sm:ml-6 lg:ml-10 xl:ml-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-[#2D3047] tracking-tight">
              {t("votre_competitivite")}
              <br />{t("notre_priorite")}
            </h2>
          </div>
          <div className="mr-4 sm:mr-6 lg:mr-10 xl:mr-12">
            <ul className="grid grid-cols-2 gap-x-12 sm:gap-x-24 gap-y-4">
              {[
                { label: t("accueil"), href: "/" },
                { label: t("apropos"), href: "/a-propos" },
                { label: t("nos_services"), href: "/services" },
                { label: t("nos_realisations"), href: "/realisations" },
                { label: t("actualites"), href: "/actualites" },
                { label: t("contact"), href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[13px] text-[#2D3047] hover:opacity-70 transition-opacity font-medium whitespace-nowrap">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Huge Middle Text */}
        <div className="w-full flex justify-center mb-16 lg:mb-24 pointer-events-none select-none overflow-hidden">
          <span className="uppercase font-[900] text-[#4471C4] text-[8.5vw] xl:text-[120px] leading-[0.9] tracking-[-0.04em] text-center whitespace-nowrap">
            BEST EXPERTS GROUP
          </span>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-6 pt-4">
          <div className="flex items-center gap-6">
            <Link href="/a-propos" className="text-[14px] font-medium text-[#2D3047]/80 hover:text-[#2D3047] transition-colors">
              {t("a_propos_beg")}
            </Link>
            <Link href="/services" className="text-[14px] font-medium text-[#2D3047]/80 hover:text-[#2D3047] transition-colors">
              {t("nos_services")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
