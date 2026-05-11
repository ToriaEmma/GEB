"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Eye, 
  ChatCircleText, 
  EnvelopeOpen,
  ArrowUpRight,
  Clock,
  CheckCircle,
  FileText,
  ChartBar,
  ShieldCheck
} from "@phosphor-icons/react";
import { articleService } from "@/lib/services/articles";
import { commentService } from "@/lib/services/comments";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { profile } = useAuth();
  const isDirector = profile?.role === 'DG_CEO';

  const [stats, setStats] = useState([
    { label: "Visiteurs", value: "0", trend: "Pages vues", icon: Eye, color: "bg-emerald-500" },
    { label: "Articles Publiés", value: "0", trend: "Actuel", icon: FileText, color: "bg-meb-accent" },
    { label: "Commentaires", value: "0", trend: "À valider", icon: ChatCircleText, color: "bg-yellow-500" },
    { label: "Messages", value: "0", trend: "Nouveaux", icon: EnvelopeOpen, color: "bg-red-500" },
  ]);

  const [pendingItems, setPendingItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // 1. Fetch Stats
      const { count: visitorsCount } = await supabase.from('site_stats').select('*', { count: 'exact', head: true }).eq('event_type', 'page_view');
      const { count: articlesCount } = await supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'approved');
      const { count: commentsCount } = await supabase.from('comments').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      const { count: messagesCount } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false);

      setStats([
        { label: "Visiteurs", value: (visitorsCount || 0).toString(), trend: "Pages vues", icon: Eye, color: "bg-emerald-500" },
        { label: "Articles Publiés", value: (articlesCount || 0).toString(), trend: "En ligne", icon: FileText, color: "bg-meb-accent" },
        { label: "Commentaires", value: (commentsCount || 0).toString(), trend: "En attente", icon: ChatCircleText, color: "bg-yellow-500" },
        { label: "Messages", value: (messagesCount || 0).toString(), trend: "Non lus", icon: EnvelopeOpen, color: "bg-red-500" },
      ]);

      // 2. Fetch Pending Items (Articles + Comments)
      const pendingArticles = await articleService.getByStatus('pending_validation');
      const pendingComments = await commentService.getAllPending();
      
      const combined = [
        ...pendingArticles.map(a => ({ id: a.id, type: 'article', title: a.title_fr, user: 'Business Dev', time: a.created_at, status: 'pending' })),
        ...pendingComments.map((c: any) => ({ id: c.id, type: 'comment', title: `Commentaire de ${c.name}`, user: c.articles?.title_fr, time: c.created_at, status: 'unread' }))
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);

      setPendingItems(combined);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <section>
        <h1 className="text-white font-heading font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">
          Bonjour, <span className="text-meb-accent">{isDirector ? "Directeur" : "membre du staff"}</span>
        </h1>
        <p className="text-white/50 text-sm max-w-2xl font-medium">
          Bienvenue sur votre espace d'administration. Vérifiez vos notifications et validations.
        </p>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] relative overflow-hidden group"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/20`}>
              <stat.icon size={24} weight="bold" className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-3">
                <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                <span className="text-[10px] font-bold text-meb-accent">{stat.trend}</span>
              </div>
            </div>
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={18} className="text-white/20" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity / Validation Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-white font-heading font-black text-xl uppercase tracking-widest">Contenus en attente</h2>
            <Link href="/dashboard/validation">
              <button className="text-[10px] font-bold text-meb-accent uppercase tracking-widest hover:text-white transition-colors">Tout voir</button>
            </Link>
          </div>
          
          <div className="space-y-3">
            {loading ? (
              <div className="p-10 text-center text-white/20 text-[10px] font-bold uppercase tracking-widest">Chargement...</div>
            ) : pendingItems.length === 0 ? (
              <div className="bg-white/5 border border-white/5 p-12 rounded-[2rem] text-center">
                <ShieldCheck size={40} className="text-meb-accent mx-auto mb-4 opacity-20" />
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Tout est à jour ! Aucun contenu en attente.</p>
              </div>
            ) : (
              pendingItems.map((action, idx) => (
                <div key={idx} className="bg-white/5 border border-white/5 p-6 rounded-[2rem] flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      action.type === 'article' ? 'bg-meb-accent/20 text-meb-accent' : 
                      action.type === 'comment' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-purple-500/20 text-purple-500'
                    }`}>
                      {action.type === 'article' ? <FileText size={28} /> : 
                       action.type === 'comment' ? <ChatCircleText size={28} /> : <CheckCircle size={28} />}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{action.title}</h4>
                      <div className="flex items-center gap-3 text-[10px] text-white/40 uppercase tracking-widest font-bold">
                        <span>{action.user}</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{new Date(action.time).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={action.type === 'article' ? "/dashboard/validation" : "/dashboard/commentaires"}>
                      <button className="bg-meb-accent text-white px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform">Gérer</button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Tips / System Status */}
        <div className="space-y-6">
          <h2 className="text-white font-heading font-black text-xl uppercase tracking-widest px-2">État du système</h2>
          <div className="bg-meb-accent rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-heading font-black text-2xl uppercase tracking-tighter mb-4">Statut</h4>
              <p className="text-white/80 text-xs leading-relaxed mb-6 font-medium">
                Votre site est connecté à <span className="font-bold text-white">Supabase</span>. Les données sont synchronisées en temps réel.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/20 w-max px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Base de données active
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-20 rotate-12">
              <ChartBar size={200} weight="fill" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
