"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  CheckCircle,
  Gear,
  Info
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { serviceService, Service } from "@/lib/services/services";

export default function NouveauServicePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<Service>>({
    title: "",
    description_fr: "",
    description_en: "",
    icon: "Gear",
    category: "Audit",
    order_index: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await serviceService.create(formData as any);
      alert("Service ajouté avec succès !");
      router.push("/dashboard/services");
    } catch (err) {
      console.error("Error creating service:", err);
      alert("Erreur lors de la création");
    } finally {
      setSaving(false);
    }
  };

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
            Nouveau <span className="text-meb-accent">Service</span>
          </h1>
        </div>
        
        <button 
          form="service-form"
          type="submit"
          disabled={saving}
          className="px-8 py-4 rounded-2xl bg-meb-accent text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-meb-dark transition-all flex items-center gap-3 shadow-xl shadow-meb-accent/20 disabled:opacity-50"
        >
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle size={18} />}
          {saving ? "Création..." : "Publier le service"}
        </button>
      </div>

      <form id="service-form" onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-8 rounded-lg bg-meb-accent/20 flex items-center justify-center text-meb-accent font-black text-xs">
              <Gear size={18} />
            </div>
            <h2 className="text-white font-bold text-lg">Informations Générales</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Titre du service</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                placeholder="Ex: Audit & Certification"
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
              placeholder="Décrivez ce service..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 min-h-[120px] text-sm font-medium text-white focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all resize-none"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Description (Anglais)</label>
            <textarea 
              value={formData.description_en}
              onChange={(e) => setFormData({...formData, description_en: e.target.value})}
              placeholder="English description..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 min-h-[120px] text-sm font-medium text-white focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all resize-none"
            />
          </div>
        </div>

        <div className="bg-meb-accent/10 border border-meb-accent/20 rounded-3xl p-6 flex items-start gap-4">
          <Info size={24} className="text-meb-accent flex-shrink-0" />
          <p className="text-[11px] text-white/70 leading-relaxed uppercase tracking-wider">
            L'ordre d'affichage sur le site est déterminé par la date de création. Vous pourrez bientôt réorganiser les services manuellement.
          </p>
        </div>
      </form>
    </div>
  );
}
