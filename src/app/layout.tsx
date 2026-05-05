import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { BentoHeader } from "@/components/layout/BentoHeader";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Best Experts Group – Premier Prix Qualité",
  description:
    "Cabinet d'expertise certifié ISO 9001. Formations, audits et certifications ISO au Bénin.",
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${poppins.variable}`}>
      <body className={`${poppins.className} min-h-screen flex flex-col antialiased`}>
        <LanguageProvider>
          <BentoHeader />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
