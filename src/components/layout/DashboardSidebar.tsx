"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  ChartBar, 
  Newspaper, 
  Briefcase, 
  ChatTeardropDots, 
  Envelope, 
  CheckCircle, 
  SignOut,
  Users,
  Gear
} from "@phosphor-icons/react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, logout } = useAuth();
  const [counts, setCounts] = useState({
    messages: 0,
    comments: 0,
    validation: 0
  });

  useEffect(() => {
    fetchCounts();
    
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
      const { count: msgCount } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'unread');

      const { count: commCount } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      const { count: valCount } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending_validation');

      setCounts({
        messages: msgCount || 0,
        comments: commCount || 0,
        validation: valCount || 0
      });
    } catch (err) {
      console.error("Error fetching notification counts:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/connexion';
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isAdmin = profile?.role === 'DG_CEO';

  interface NavItem {
    label: string;
    icon: React.ElementType;
    href: string;
    badge?: number;
  }

  const baseNavItems: NavItem[] = [
    { label: "Vue d'ensemble", icon: ChartBar, href: "/dashboard" },
    { label: "Actualités", icon: Newspaper, href: "/dashboard/actualites" },
    { label: "Réalisations", icon: Briefcase, href: "/dashboard/realisations" },
    { label: "Paramètres", icon: Gear, href: "/dashboard/parametres" },
  ];

  if (profile?.can_moderate_comments || isAdmin) {
    baseNavItems.push({ label: "Commentaires", icon: ChatTeardropDots, href: "/dashboard/commentaires", badge: counts.comments });
  }

  if (profile?.can_read_messages || isAdmin) {
    baseNavItems.push({ label: "Messages", icon: Envelope, href: "/dashboard/messages", badge: counts.messages });
  }

  if (profile?.can_validate || isAdmin) {
    baseNavItems.push({ label: "Validation", icon: CheckCircle, href: "/dashboard/validation", badge: counts.validation });
  }

  if (isAdmin) {
    baseNavItems.push({ label: "Utilisateurs", icon: Users, href: "/dashboard/utilisateurs" });
  }

  return (
    <aside className="w-72 bg-meb-dark border-r border-white/10 flex flex-col h-screen sticky top-0 overflow-y-auto custom-scrollbar">
      {/* Logo Area */}
      <div className="shrink-0 flex justify-start items-center px-5 py-6 border-b border-white/10">
        <Link href="/" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/favicon-trimmed.png"
            alt="BEG Favicon"
            style={{ width: '52px', height: 'auto', display: 'block' }}
            className="hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 pt-2 pb-6 space-y-2">
        {baseNavItems.map((item) => {
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
      <div className="p-4 mt-auto shrink-0">
        <div className="bg-white/5 rounded-[2rem] p-5 border border-white/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-meb-accent flex items-center justify-center font-black text-white shrink-0">
              {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-bold text-white uppercase tracking-widest truncate">{profile?.full_name || 'Utilisateur'}</p>
              <p className="text-[8px] text-white/30 uppercase tracking-widest truncate">{profile?.role || 'Membre'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-white/50 hover:bg-meb-red/20 hover:text-meb-red hover:border-meb-red/20 transition-all group"
          >
            <SignOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Déconnexion</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
