"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { BentoHeader } from "@/components/layout/BentoHeader";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const isConnexion = pathname === '/connexion';
  
  const hideLayout = isDashboard || isConnexion;

  // Track page views for public pages (once per page per session)
  useEffect(() => {
    if (!isDashboard && !isConnexion && pathname) {
      const sessionKey = `tracked_${pathname}`;
      if (!sessionStorage.getItem(sessionKey)) {
        sessionStorage.setItem(sessionKey, '1');
        supabase.from('site_stats').insert({
          event_type: 'page_view',
          target_type: 'page',
          target_id: pathname,
        }).then(() => {});
      }
    }
  }, [pathname, isDashboard, isConnexion]);

  return (
    <AuthProvider>
      <LanguageProvider>
        {!hideLayout && <BentoHeader />}
        <main className="flex-1 flex flex-col">{children}</main>
        {!hideLayout && <Footer />}
        {!hideLayout && <WhatsAppButton />}
      </LanguageProvider>
    </AuthProvider>
  );
}
