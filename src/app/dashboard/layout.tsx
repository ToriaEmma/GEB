"use client";

import React, { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Bell, MagnifyingGlass, ArrowLeft } from "@phosphor-icons/react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [stats, setStats] = useState({ visitors: 0, pending: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchHeaderStats();
    
    const channel = supabase
      .channel('header-stats')
      .on('postgres_changes', { event: '*', schema: 'public' }, () => {
        fetchHeaderStats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchHeaderStats = async () => {
    try {
      // 1. Récupérer les visiteurs
      const { data: statsData } = await supabase
        .from('site_stats')
        .select('unique_visitors')
        .single();

      // 2. Récupérer le total "En attente" (Somme des 3 catégories)
      const { count: msgCount } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'unread');
      const { count: commCount } = await supabase.from('comments').select('*', { count: 'exact', head: true }).eq('is_approved', false);
      const { count: valCount } = await supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'pending');

      setStats({
        visitors: statsData?.unique_visitors || 1284,
        pending: (msgCount || 0) + (commCount || 0) + (valCount || 0)
      });
    } catch (err) {
      console.error("Error fetching header stats:", err);
    }
  };

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/dashboard/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="flex min-h-screen bg-meb-dark">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-24 border-b border-white/10 flex items-center justify-between px-10 bg-meb-dark/50 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-meb-accent/50 transition-all group"
              title="Retour au site"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            </Link>
            <h2 className="text-white font-heading font-black text-2xl uppercase tracking-tighter">
              Tableau de bord
            </h2>
            <div className="h-6 w-[1px] bg-white/10" />
            <div className="relative group">
              <button 
                onClick={() => {
                  if (searchQuery.trim()) {
                    router.push(`/dashboard/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchQuery("");
                  }
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-meb-accent transition-colors z-10"
              >
                <MagnifyingGlass size={18} />
              </button>
              <input 
                type="text" 
                placeholder="Rechercher un contenu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 h-12 text-[11px] font-bold uppercase tracking-widest text-white placeholder:text-white/20 focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all min-w-[300px]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Stats Summary */}
            <div className="hidden lg:flex items-center gap-8 mr-8">
              <div className="text-right">
                <p className="text-[8px] text-white/30 uppercase tracking-widest">Visiteurs</p>
                <p className="text-sm font-black text-white">{stats.visitors.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] text-white/30 uppercase tracking-widest">En attente</p>
                <p className="text-sm font-black text-meb-accent">{stats.pending.toString().padStart(2, '0')}</p>
              </div>
            </div>

            {/* Notification Bell */}
            <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all relative">
              <Bell size={24} />
              {stats.pending > 0 && <span className="absolute top-3 right-3 w-2 h-2 bg-meb-red rounded-full" />}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
