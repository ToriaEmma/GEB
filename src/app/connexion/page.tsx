"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Envelope, 
  Lock, 
  Eye, 
  EyeSlash,
  ShieldCheck,
  Fingerprint,
  WarningCircle
} from "@phosphor-icons/react";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Success
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Erreur de connexion");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f18] flex flex-col relative overflow-hidden font-sans selection:bg-meb-accent/30 selection:text-white">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-meb-accent/10 blur-[150px] rounded-full"
        />
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -80, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[5%] w-[50%] h-[50%] bg-purple-500/5 blur-[120px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(68,113,196,0.05)_0%,transparent_70%)]" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-end flex-1 px-6 pb-20 pt-32">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-12 left-6 md:left-12 flex items-center gap-8"
        >
          <Link 
            href="/" 
            className="flex items-center gap-3 text-white/30 hover:text-white transition-all group"
          >
            <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-meb-accent/50 group-hover:bg-meb-accent/10 transition-all">
              <ArrowLeft size={16} weight="bold" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">{t("accueil")}</span>
          </Link>
        </motion.div>

        {/* Login Container */}
        <div className="w-full max-w-[900px] grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#111c2f]/40 backdrop-blur-3xl border border-white/5 rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          
          {/* Visual Side */}
          <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-meb-accent/20 to-transparent relative overflow-hidden border-r border-white/5">
             <div className="relative z-10">
                <Image 
                  src="/images/favicon-trimmed.png" 
                  alt="BEG" 
                  width={52} 
                  height={52} 
                  className="opacity-80 mb-8 hover:scale-105 transition-transform duration-500"
                />
                <h2 className="text-4xl font-heading font-black text-white leading-none tracking-tighter uppercase mb-4">
                  Le futur de <br/><span className="text-meb-accent underline decoration-white/10 underline-offset-8">l'expertise</span>.
                </h2>
                <p className="text-white/40 text-xs max-w-[260px] leading-relaxed font-medium">
                  Accédez à votre centre de contrôle sécurisé BEG.
                </p>
             </div>

             <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 backdrop-blur-md">
                   <div className="w-8 h-8 rounded-lg bg-meb-accent/20 flex items-center justify-center text-meb-accent">
                      <ShieldCheck size={20} weight="fill" />
                   </div>
                   <div>
                      <p className="text-white text-[9px] font-black uppercase tracking-widest">Sécurité Chiffrée</p>
                   </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 backdrop-blur-md">
                   <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-500">
                      <Fingerprint size={20} weight="fill" />
                   </div>
                   <div>
                      <p className="text-white text-[9px] font-black uppercase tracking-widest">Accès Restreint</p>
                   </div>
                </div>
             </div>

             {/* Abstract Background for Visual Side */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(68,113,196,0.2)_0%,transparent_70%)]" />
             </div>
          </div>

          {/* Form Side */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8 lg:hidden text-center">
              <Image 
                src="/images/favicon-trimmed.png" 
                alt="BEG" 
                width={52} 
                height={52} 
                className="opacity-80 mx-auto mb-6 hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="space-y-1 mb-10 text-center lg:text-left">
              <h1 className="text-2xl md:text-3xl font-heading font-black text-white uppercase tracking-tighter">
                {t("connexion")}
              </h1>
              <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em]">Portal Admin</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-meb-red/10 border border-meb-red/20 p-3 rounded-xl flex items-start gap-2 text-meb-red"
                  >
                    <WarningCircle size={18} weight="fill" className="flex-shrink-0" />
                    <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-5">
                <div className="space-y-2.5">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 ml-2">Identifiant</label>
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-meb-accent transition-all">
                      <Envelope size={18} weight="bold" />
                    </div>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="admin@beg.com"
                      className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-xl pl-14 pr-6 text-white text-xs font-medium placeholder:text-white/10 focus:outline-none focus:border-meb-accent/50 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between items-center px-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 ml-2">Code</label>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-meb-accent transition-all">
                      <Lock size={18} weight="bold" />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-xl pl-14 pr-14 text-white text-xs font-medium placeholder:text-white/10 focus:outline-none focus:border-meb-accent/50 focus:bg-white/[0.06] transition-all"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeSlash size={18} weight="bold" /> : <Eye size={18} weight="bold" />}
                    </button>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-meb-accent text-white rounded-xl font-heading font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-meb-dark transition-all duration-700 flex items-center justify-center gap-4 group disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Entrer</span>
                    <ArrowRight size={14} weight="bold" className="group-hover:translate-x-1 transition-all" />
                  </>
                )}
              </button>


            </form>
          </div>
        </div>

        <p className="text-center mt-12 text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} Best Experts Group &bull; System v2.0
        </p>
      </div>
    </div>
  );
}
