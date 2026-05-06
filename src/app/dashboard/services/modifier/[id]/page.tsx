"use client";

import React, { useState, useEffect, use } from "react";
import { 
  ArrowLeft, 
  CheckCircle,
  Gear,
  Trash
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { serviceService, Service } from "@/lib/services/services";

export default function ModifierServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<Service>>({
    title: "",
    description_fr: "",
    description_en: "",
    icon: "Gear",
    category: "Audit",
    order_index: 0
  });

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const data = await serviceService.getAll();
      const service = data.find(s => s.id === id);
      if (service) {
        setFormData(service);
      }
    } catch (err) {
      console.error("Error fetching service:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await serviceService.update(id, formData);
      alert("Service mis à jour avec succès !");
      router.push("/dashboard/services");
    } catch (err) {
      console.error("Error updating service:", err);
      alert("Erreur lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-20 text-center text-white/30 uppercase tracking-widest font-bold text-xs">Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/dashboard/services" className="flex items-center gap-2 text-white/30 hover:text-meb-accent transition-colors text-[10px] font-black uppercase tracking-widest mb-4">
            <ArrowLeft size={16} />
            Retour aux services
          </Link>
          <h1 className="text-white font-heading font-black text-3xl md:text-5xl uppercase tracking-tighter leading-none">
            Modifier <span className="text-meb-accent">le Service</span>
          </h1>
        </div>
        
        <button 
          form="service-form"
          type="submit"
          disabled={saving}
          className="px-8 py-4 rounded-2xl bg-meb-accent text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-meb-dark transition-all flex items-center gap-3 shadow-xl shadow-meb-accent/20 disabled:opacity-50"
        >
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle size={18} />}
          {saving ? "Mise à jour..." : "Enregistrer les modifications"}
        </button>
      </div>

      <form id="service-form" onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-8 rounded-lg bg-meb-accent/20 flex items-center justify-center text-meb-accent font-black text-xs">
              <Gear size={18} />
            </div>
            <h2 className="text-white font-bold text-lg">Détails du Service</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Titre du service</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 h-16 text-sm font-medium text-white focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Catégorie</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 h-16 text-[11px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-meb-accent transition-all cursor-pointer"
              >
                <option value="Audit">Audit</option>
                <option value="Certification">Certification</option>
                <option value="Conseil">Conseil</option>
                <option value="Formation">Formation</option>
                <option value="Digital">Digital</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Description (Français)</label>
            <textarea 
              value={formData.description_fr}
              onChange={(e) => setFormData({...formData, description_fr: e.target.value})}
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 min-h-[120px] text-sm font-medium text-white focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all resize-none"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Description (Anglais)</label>
            <textarea 
              value={formData.description_en}
              onChange={(e) => setFormData({...formData, description_en: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 min-h-[120px] text-sm font-medium text-white focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all resize-none"
            />
          </div>

          <button 
            type="button"
            onClick={() => {
              if(window.confirm("Supprimer ce service ?")) {
                router.push("/dashboard/services");
              }
            }}
            className="w-full flex items-center justify-center gap-3 text-meb-red/50 hover:text-meb-red transition-colors text-[10px] font-black uppercase tracking-widest py-4 border border-meb-red/20 rounded-2xl mt-4"
          >
            <Trash size={18} />
            Supprimer définitivement
          </button>
        </div>
      </form>
    </div>
  );
}
