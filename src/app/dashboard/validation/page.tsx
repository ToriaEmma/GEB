"use client";

import React from "react";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  User, 
  ArrowUpRight, 
  WarningCircle
} from "@phosphor-icons/react";
import { articleService, Article } from "@/lib/services/articles";
import { useEffect, useState } from "react";

export default function ValidationCenterPage() {
  const [pendingItems, setPendingItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const data = await articleService.getByStatus('pending_validation');
        setPendingItems(data);
      } catch (err) {
        console.error("Error fetching pending items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await articleService.update(id, { status: 'approved', published_at: new Date().toISOString() });
      setPendingItems(pendingItems.filter(item => item.id !== id));
    } catch (err) {
      alert("Erreur lors de la validation");
    }
  };
  return (
    <div className="space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-white font-heading font-black text-3xl md:text-4xl uppercase tracking-tighter mb-2">
            Centre de <span className="text-meb-accent">Validation</span>
          </h1>
          <p className="text-white/50 text-sm font-medium">
            Approuvez ou rejetez les contenus soumis par les Business Developers.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-meb-red/10 border border-meb-red/20 px-6 py-4 rounded-2xl flex items-center gap-3">
            <WarningCircle size={24} className="text-meb-red animate-pulse" />
            <div>
              <p className="text-[10px] font-bold text-meb-red uppercase tracking-widest leading-none">Urgents</p>
              <p className="text-lg font-black text-white leading-none mt-1">02</p>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Queue */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-20 text-center text-white/30 uppercase tracking-[0.2em] font-bold text-[10px]">
            Chargement de la file d'attente...
          </div>
        ) : pendingItems.length === 0 ? (
          <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-20 text-center">
            <CheckCircle size={48} className="text-meb-accent mx-auto mb-4 opacity-20" />
            <p className="text-white/30 uppercase tracking-[0.2em] font-bold text-[10px]">Tous les contenus ont été validés !</p>
          </div>
        ) : (
          pendingItems.map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 group hover:bg-white/10 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-meb-accent/20 text-meb-accent">
                  <FileText size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-meb-red">Haute priorité</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Article</span>
                  </div>
                  <h4 className="text-white font-bold text-xl mb-2">{item.title_fr}</h4>
                  <div className="flex items-center gap-4 text-[10px] text-white/40 uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-1.5">
                      <User size={14} />
                      <span>Business Dev #1</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>{item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex-1 lg:flex-none bg-white/5 text-white/70 border border-white/10 px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-meb-dark transition-all flex items-center justify-center gap-2">
                  <ArrowUpRight size={16} weight="bold" />
                  Examiner
                </button>
                <button 
                  onClick={() => item.id && handleApprove(item.id)}
                  className="flex-1 lg:flex-none bg-meb-accent text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} weight="bold" />
                  Approuver
                </button>
                <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-meb-red hover:text-white transition-all">
                  <XCircle size={24} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats / Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-10">
          <h3 className="text-white font-heading font-black text-sm uppercase tracking-widest mb-6">Workflow cette semaine</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Contenus approuvés</span>
              <span className="text-xl font-black text-white">12</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="w-[80%] h-full bg-meb-accent" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-10">
          <h3 className="text-white font-heading font-black text-sm uppercase tracking-widest mb-6">Temps moyen de réponse</h3>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-black text-meb-accent">4.2h</div>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-relaxed">
              Votre réactivité permet de garder le site vivant et à jour.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
