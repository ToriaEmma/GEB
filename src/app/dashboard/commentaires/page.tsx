"use client";

import React, { useEffect, useState } from "react";
import { 
  ChatCircle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User,
  ArrowUpRight,
  ShieldCheck,
  FileText
} from "@phosphor-icons/react";
import { commentService } from "@/lib/services/comments";

export default function CommentModerationPage() {
  const [pendingComments, setPendingComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const data = await commentService.getAllPending();
      setPendingComments(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await commentService.updateStatus(id, status);
      setPendingComments(pendingComments.filter(c => c.id !== id));
    } catch (err) {
      alert("Erreur lors de l'action");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-white font-heading font-black text-3xl md:text-4xl uppercase tracking-tighter mb-2">
            Modération <span className="text-meb-accent">Commentaires</span>
          </h1>
          <p className="text-white/50 text-sm font-medium">
            Gérez les interactions de vos lecteurs et validez les commentaires.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-meb-accent/10 border border-meb-accent/20 px-6 py-4 rounded-2xl flex items-center gap-3">
            <ShieldCheck size={24} className="text-meb-accent" />
            <div>
              <p className="text-[10px] font-bold text-meb-accent uppercase tracking-widest leading-none">En attente</p>
              <p className="text-lg font-black text-white leading-none mt-1">{pendingComments.length.toString().padStart(2, '0')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-2xl w-max">
        <button className="px-6 py-2.5 rounded-xl bg-white text-[#111c2f] text-[10px] font-black uppercase tracking-widest shadow-xl">
          En attente
        </button>
        <button className="px-6 py-2.5 rounded-xl text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
          Approuvés
        </button>
        <button className="px-6 py-2.5 rounded-xl text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
          Tous
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-20 text-center text-white/30 uppercase tracking-[0.2em] font-bold text-[10px]">
            Chargement des commentaires...
          </div>
        ) : pendingComments.length === 0 ? (
          <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-20 text-center">
            <ChatCircle size={48} className="text-meb-accent mx-auto mb-4 opacity-20" />
            <p className="text-white/30 uppercase tracking-[0.2em] font-bold text-[10px]">Aucun commentaire en attente !</p>
          </div>
        ) : (
          pendingComments.map((comment) => (
            <div key={comment.id} className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-6 group hover:bg-white/10 transition-all">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 text-white/30 shrink-0">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{comment.name}</h4>
                    <div className="flex items-center gap-3 mt-1 mb-4">
                      <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-bold uppercase tracking-widest">
                        <Clock size={14} />
                        <span>{new Date(comment.created_at).toLocaleString()}</span>
                      </div>
                      <span className="w-1 h-1 bg-white/10 rounded-full" />
                      <div className="flex items-center gap-1.5 text-[10px] text-meb-accent font-bold uppercase tracking-widest">
                        <FileText size={14} />
                        <span>{comment.articles?.title_fr || 'Article inconnu'}</span>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed max-w-3xl">
                      "{comment.content}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button 
                    onClick={() => handleAction(comment.id, 'approved')}
                    className="flex-1 lg:flex-none bg-meb-accent text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} weight="bold" />
                    Approuver
                  </button>
                  <button 
                    onClick={() => handleAction(comment.id, 'rejected')}
                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-meb-red hover:text-white transition-all"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
