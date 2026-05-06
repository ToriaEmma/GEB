"use client";

import { usePathname } from "next/navigation";
import { BentoHeader } from "@/components/layout/BentoHeader";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { LanguageProvider } from "@/context/LanguageContext";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const isConnexion = pathname === '/connexion';
  
  const hideLayout = isDashboard || isConnexion;

  return (
    <LanguageProvider>
      {!hideLayout && <BentoHeader />}
      <main className="flex-1 flex flex-col">{children}</main>
      {!hideLayout && <Footer />}
      {!hideLayout && <WhatsAppButton />}
    </LanguageProvider>
  );
}
