"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  ChartBar, 
  Newspaper, 
  Briefcase, 
  Gear, 
  ChatTeardropDots, 
  Envelope, 
  Bell, 
  CheckCircle, 
  SignOut 
} from "@phosphor-icons/react";
import { supabase } from "@/lib/supabase";

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const [counts, setCounts] = useState({
    messages: 0,
    comments: 0,
    validation: 0
  });

  useEffect(() => {
    fetchCounts();
    
    // Optionnel: Mettre en place un Realtime de Supabase pour les notifs en direct
    const channel = supabase
      .channel('db-changes')
      .on('postgres_changes', { event: '*', schema: 'public' }, () => {
        fetchCounts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCounts = async () => {
    try {
      // Compte des messages non lus
      const { count: msgCount } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'unread');

      // Compte des commentaires non approuvés (si la table existe)
      const { count: commCount } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('is_approved', false);

      // Compte des articles/projets en attente de validation
      const { count: valCount } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      setCounts({
        messages: msgCount || 0,
        comments: commCount || 0,
        validation: valCount || 0
      });
    } catch (err) {
      console.error("Error fetching notification counts:", err);
    }
  };

  const navItems = [
    { label: "Vue d'ensemble", icon: ChartBar, href: "/dashboard" },
    { label: "Actualités", icon: Newspaper, href: "/dashboard/actualites" },
    { label: "Réalisations", icon: Briefcase, href: "/dashboard/realisations" },
    { label: "Commentaires", icon: ChatTeardropDots, href: "/dashboard/commentaires", badge: counts.comments },
    { label: "Messages", icon: Envelope, href: "/dashboard/messages", badge: counts.messages },
    { label: "Validation", icon: CheckCircle, href: "/dashboard/validation", badge: counts.validation },
  ];

  return (
    <aside className="w-72 bg-meb-dark border-r border-white/10 flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Navigation - Added padding top since logo is removed */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? "bg-meb-accent text-white shadow-lg shadow-meb-accent/20" 
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon size={22} weight={isActive ? "bold" : "regular"} className={isActive ? "" : "group-hover:scale-110 transition-transform"} />
                <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
              </div>
              
              {(item.badge ?? 0) > 0 && (
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black animate-pulse ${
                  isActive ? "bg-white text-meb-accent" : "bg-meb-accent text-white"
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Area */}
      <div className="p-4 mt-auto">
        <div className="bg-white/5 rounded-[2rem] p-5 border border-white/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-meb-accent flex items-center justify-center font-black text-white">
              DG
            </div>
            <div>
              <p className="text-[10px] font-bold text-white uppercase tracking-widest">DG / CEO</p>
              <p className="text-[8px] text-white/30 uppercase tracking-widest">Connecté</p>
            </div>
          </div>
          <button className="w-full h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-white/50 hover:bg-meb-red/20 hover:text-meb-red hover:border-meb-red/20 transition-all group">
            <SignOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Déconnexion</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
