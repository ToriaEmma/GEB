"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  MagnifyingGlass, 
  Newspaper, 
  Briefcase, 
  Envelope, 
  ArrowRight,
  Clock,
  ChatTeardropDots,
  CheckCircle
} from "@phosphor-icons/react";
import Link from "next/link";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [results, setResults] = useState<{
    articles: any[];
    projects: any[];
    messages: any[];
    categories: { label: string; href: string; icon: any }[];
  }>({ articles: [], projects: [], messages: [], categories: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const searchTerm = `%${query}%`;
      const qLower = query.toLowerCase();

      // Raccourcis intelligents vers les catégories
      const categories: any[] = [];
      const allCategories = [
        { label: "Actualités", href: "/dashboard/actualites", icon: Newspaper, keywords: ["actu", "nouvelle", "blog", "actualité"] },
        { label: "Réalisations", href: "/dashboard/realisations", icon: Briefcase, keywords: ["projet", "réali", "portfolio", "chantier"] },
        { label: "Messages", href: "/dashboard/messages", icon: Envelope, keywords: ["contact", "mail", "message", "inbox"] },
        { label: "Commentaires", href: "/dashboard/commentaires", icon: ChatTeardropDots, keywords: ["avis", "comment", "moderation"] },
        { label: "Validation", href: "/dashboard/validation", icon: CheckCircle, keywords: ["valid", "approuv", "attente"] },
      ];

      allCategories.forEach(cat => {
        if (cat.label.toLowerCase().includes(qLower) || cat.keywords.some(k => qLower.includes(k) || k.includes(qLower))) {
          categories.push(cat);
        }
      });

      // 1. Recherche dans les Actualités
      const { data: articles } = await supabase
        .from('articles')
        .select('*')
        .or(`title_fr.ilike.${searchTerm},content_fr.ilike.${searchTerm}`);

      // 2. Recherche dans les Réalisations
      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .or(`title_fr.ilike.${searchTerm},description_fr.ilike.${searchTerm}`);

      // 3. Recherche dans les Messages
      const { data: messages } = await supabase
        .from('contact_messages')
        .select('*')
        .or(`full_name.ilike.${searchTerm},subject.ilike.${searchTerm},message.ilike.${searchTerm}`);

      setResults({
        articles: articles || [],
        projects: projects || [],
        messages: messages || [],
        categories
      });
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalResults = results.articles.length + results.projects.length + results.messages.length + results.categories.length;

  return (
    <div className="space-y-10">
      {/* Search Stats */}
      <div className="flex items-end justify-between border-b border-white/10 pb-8">
        <div>
          <h1 className="text-white font-heading font-black text-4xl uppercase tracking-tighter mb-2">
            Résultats pour <span className="text-meb-accent">"{query}"</span>
          </h1>
          <p className="text-white/40 text-sm font-medium">
            {loading ? "Recherche en cours..." : `${totalResults} résultat(s) trouvé(s) dans le système.`}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6 opacity-20">
          <MagnifyingGlass size={80} className="animate-pulse" />
          <p className="font-black uppercase tracking-widest text-[10px]">Analyse de la base de données...</p>
        </div>
      ) : totalResults === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6 opacity-20">
          <MagnifyingGlass size={80} />
          <p className="font-black uppercase tracking-widest text-[10px]">Aucune correspondance trouvée</p>
        </div>
      ) : (
        <div className="space-y-16">
          
          {/* Section: Raccourcis de Navigation */}
          {results.categories.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-meb-accent/10 border border-meb-accent/20 flex items-center justify-center text-meb-accent">
                  <ArrowRight size={20} />
                </div>
                <h3 className="text-white font-black uppercase text-xs tracking-widest">Navigation Rapide</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {results.categories.map(cat => (
                  <Link key={cat.href} href={cat.href} className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-meb-accent hover:border-transparent transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-white/20 group-hover:text-white transition-all">
                      <cat.icon size={20} />
                    </div>
                    <span className="text-white font-bold text-sm">{cat.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Column: Actualités */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-meb-accent">
                <Newspaper size={20} />
              </div>
              <h3 className="text-white font-black uppercase text-xs tracking-widest">Actualités ({results.articles.length})</h3>
            </div>
            {results.articles.map(art => (
              <Link key={art.id} href={`/dashboard/actualites/modifier/${art.id}`} className="block bg-white/5 border border-white/5 p-6 rounded-[2rem] hover:border-meb-accent/30 transition-all group">
                <p className="text-white font-bold text-sm mb-2 group-hover:text-meb-accent transition-colors">{art.title_fr}</p>
                <div className="flex items-center gap-2 text-[9px] text-white/30 uppercase font-bold tracking-widest">
                  <Clock size={12} />
                  {new Date(art.created_at).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>

          {/* Column: Réalisations */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-500">
                <Briefcase size={20} />
              </div>
              <h3 className="text-white font-black uppercase text-xs tracking-widest">Réalisations ({results.projects.length})</h3>
            </div>
            {results.projects.map(proj => (
              <Link key={proj.id} href={`/dashboard/realisations/modifier/${proj.id}`} className="block bg-white/5 border border-white/5 p-6 rounded-[2rem] hover:border-purple-500/30 transition-all group">
                <p className="text-white font-bold text-sm mb-2 group-hover:text-purple-500 transition-colors">{proj.title_fr}</p>
                <div className="flex items-center gap-2 text-[9px] text-white/30 uppercase font-bold tracking-widest">
                  <Clock size={12} />
                  {new Date(proj.created_at).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>

          {/* Column: Messages */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500">
                <Envelope size={20} />
              </div>
              <h3 className="text-white font-black uppercase text-xs tracking-widest">Messages ({results.messages.length})</h3>
            </div>
            {results.messages.map(msg => (
              <Link key={msg.id} href={`/dashboard/messages`} className="block bg-white/5 border border-white/5 p-6 rounded-[2rem] hover:border-emerald-500/30 transition-all group">
                <p className="text-white font-bold text-sm mb-1 group-hover:text-emerald-500 transition-colors">{msg.full_name}</p>
                <p className="text-white/40 text-[10px] mb-3 line-clamp-1">{msg.subject}</p>
                <div className="flex items-center gap-2 text-[9px] text-white/30 uppercase font-bold tracking-widest">
                  <Clock size={12} />
                  {new Date(msg.created_at).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-32 space-y-6 opacity-20">
        <MagnifyingGlass size={80} className="animate-pulse" />
        <p className="font-black uppercase tracking-widest text-[10px]">Chargement de la recherche...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
