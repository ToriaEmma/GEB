"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  DotsThreeVertical, 
  Eye, 
  PencilSimple, 
  Trash, 
  MagnifyingGlass,
  Funnel,
  Clock,
  CheckCircle,
  FileText
} from "@phosphor-icons/react";
import { articleService, Article } from "@/lib/services/articles";
import Link from "next/link";

export default function ActualitesAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dbArticles, setDbArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await articleService.getAll();
      setDbArticles(data);
    } catch (err) {
      console.error("Error fetching articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!articleToDelete) return;
    
    try {
      await articleService.delete(articleToDelete);
      setDbArticles(prev => prev.filter(a => a.id !== articleToDelete));
      setArticleToDelete(null);
    } catch (err) {
      console.error("Erreur suppression:", err);
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Custom Confirmation Modal */}
      {articleToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-meb-dark/80 backdrop-blur-md" onClick={() => setArticleToDelete(null)} />
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full relative z-10 shadow-2xl border border-white/10 text-center">
            <div className="w-20 h-20 bg-meb-red/10 rounded-full flex items-center justify-center mx-auto mb-6 text-meb-red">
              <Trash size={40} weight="bold" />
            </div>
            <h3 className="text-[#111c2f] font-heading font-black text-2xl uppercase tracking-tighter mb-4">Confirmer la suppression ?</h3>
            <p className="text-[#111c2f]/60 text-sm font-medium leading-relaxed mb-8">
              Êtes-vous sûr de vouloir supprimer cet article ? Cette action est définitive et l'article disparaîtra du site.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setArticleToDelete(null)}
                className="flex-1 px-6 py-4 rounded-2xl bg-[#111c2f]/5 text-[#111c2f] text-[10px] font-black uppercase tracking-widest hover:bg-[#111c2f]/10 transition-all"
              >
                Annuler
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 px-6 py-4 rounded-2xl bg-meb-red text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-meb-red/20"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-white font-heading font-black text-3xl md:text-4xl uppercase tracking-tighter mb-2">
            Gestion des <span className="text-meb-accent">Actualités</span>
          </h1>
          <p className="text-white/50 text-sm font-medium">
            Créez, modifiez et gérez les articles publiés sur le site.
          </p>
        </div>
        <Link href="/dashboard/actualites/nouveau">
          <button className="bg-meb-accent text-white px-8 py-4 rounded-2xl font-heading font-bold uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-meb-dark transition-all duration-500 flex items-center gap-3 shadow-xl shadow-meb-accent/20">
            <Plus size={20} weight="bold" />
            <span>Nouvel article</span>
          </button>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white/5 p-4 rounded-[2rem] border border-white/5">
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input 
            type="text" 
            placeholder="Rechercher par titre, auteur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 h-12 text-[11px] font-bold uppercase tracking-widest text-white placeholder:text-white/20 focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/5 rounded-xl border border-white/10 px-4 h-12 gap-3">
            <Funnel size={18} className="text-white/30" />
            <select className="bg-transparent text-[10px] font-bold uppercase tracking-widest text-white/70 focus:outline-none cursor-pointer">
              <option value="all">Tous les statuts</option>
              <option value="published">Publiés</option>
              <option value="pending">En attente</option>
              <option value="draft">Brouillons</option>
            </select>
          </div>
          <div className="flex items-center bg-white/5 rounded-xl border border-white/10 px-4 h-12 gap-3">
            <select className="bg-transparent text-[10px] font-bold uppercase tracking-widest text-white/70 focus:outline-none cursor-pointer">
              <option value="newest">Plus récents</option>
              <option value="oldest">Plus anciens</option>
              <option value="popular">Plus populaires</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles Table/List */}
      <div className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Article</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Catégorie</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Statut</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Date</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-8 h-8 border-2 border-meb-accent border-t-transparent rounded-full animate-spin" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 text-center">Chargement des articles...</p>
                    </div>
                  </td>
                </tr>
              ) : dbArticles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 text-center">Aucun article trouvé dans la base.</p>
                  </td>
                </tr>
              ) : (
                dbArticles.map((article, idx) => (
                  <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 overflow-hidden relative flex-shrink-0">
                          <div className="absolute inset-0 bg-meb-accent/20 flex items-center justify-center">
                            <FileText size={20} className="text-meb-accent" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm line-clamp-1">{article.title_fr}</h4>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Auteur #1</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-white/5 border border-white/10 text-white/50 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${article.status === 'approved' ? 'bg-meb-accent shadow-[0_0_8px_rgba(68,113,196,0.5)]' : 'bg-yellow-500'}`} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                          {article.status === 'approved' ? 'Publié' : 'En attente'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                        <Clock size={14} />
                        {mounted && article.created_at ? new Date(article.created_at).toLocaleDateString() : '---'}
                      </div>
                    </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/dashboard/actualites/modifier/${article.id}`}>
                        <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-meb-accent hover:text-white transition-all">
                          <PencilSimple size={18} />
                        </button>
                      </Link>
                      <a 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (article.id) setArticleToDelete(article.id);
                        }}
                        className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-meb-red hover:text-white transition-all cursor-pointer"
                      >
                        <Trash size={18} />
                      </a>
                      <Link href={`/actualites/${article.slug}`} target="_blank">
                        <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white hover:text-meb-dark transition-all">
                          <Eye size={18} weight="bold" />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
