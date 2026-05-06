"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  DotsThreeVertical, 
  PencilSimple, 
  Trash, 
  List,
  Gear,
  Eye,
  EyeSlash,
  ArrowUp,
  ArrowDown
} from "@phosphor-icons/react";
import { serviceService, Service } from "@/lib/services/services";
import Link from "next/link";

export default function ServicesAdminPage() {
  const [dbServices, setDbServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await serviceService.getAll();
      setDbServices(data);
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!serviceToDelete) return;
    try {
      await serviceService.delete(serviceToDelete);
      setDbServices(prev => prev.filter(s => s.id !== serviceToDelete));
      setServiceToDelete(null);
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Custom Confirmation Modal */}
      {serviceToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-meb-dark/80 backdrop-blur-md" onClick={() => setServiceToDelete(null)} />
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full relative z-10 shadow-2xl border border-white/10 text-center">
            <div className="w-20 h-20 bg-meb-red/10 rounded-full flex items-center justify-center mx-auto mb-6 text-meb-red">
              <Trash size={40} weight="bold" />
            </div>
            <h3 className="text-[#111c2f] font-heading font-black text-2xl uppercase tracking-tighter mb-4">Supprimer ce service ?</h3>
            <p className="text-[#111c2f]/60 text-sm font-medium leading-relaxed mb-8">
              Toutes les données associées à ce service seront effacées. Continuer ?
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setServiceToDelete(null)}
                className="flex-1 px-6 py-4 rounded-2xl bg-[#111c2f]/5 text-[#111c2f] text-[10px] font-black uppercase tracking-widest hover:bg-[#111c2f]/10 transition-all"
              >
                Annuler
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 px-6 py-4 rounded-2xl bg-meb-red text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all"
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
            Gestion des <span className="text-meb-accent">Services</span>
          </h1>
          <p className="text-white/50 text-sm font-medium">
            Organisez et modifiez les services affichés sur le site.
          </p>
        </div>
        <Link href="/dashboard/services/nouveau">
          <button className="bg-meb-accent text-white px-8 py-4 rounded-2xl font-heading font-bold uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-meb-dark transition-all duration-500 flex items-center gap-3 shadow-xl shadow-meb-accent/20">
            <Plus size={20} weight="bold" />
            <span>Ajouter un service</span>
          </button>
        </Link>
      </div>

      {/* Services List */}
      <div className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-white font-heading font-black text-sm uppercase tracking-widest flex items-center gap-2">
            <List size={20} className="text-meb-accent" />
            Liste des Services
          </h3>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">En direct de la base de données</p>
        </div>

        <div className="divide-y divide-white/5">
          {loading ? (
            <div className="p-20 text-center text-white/20 uppercase tracking-widest font-bold text-xs">Synchronisation...</div>
          ) : dbServices.length === 0 ? (
            <div className="p-20 text-center text-white/20 uppercase tracking-widest font-bold text-xs">Aucun service enregistré</div>
          ) : (
            dbServices.map((service, idx) => (
              <div key={service.id} className="p-6 md:px-10 flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-meb-accent/20 text-meb-accent`}>
                    <Gear size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{service.title}</h4>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">{service.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <Eye size={16} className="text-meb-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Visible</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/services/modifier/${service.id}`}>
                      <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-meb-accent hover:text-white transition-all">
                        <PencilSimple size={18} />
                      </button>
                    </Link>
                    <button 
                      onClick={() => service.id && setServiceToDelete(service.id)}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-meb-red hover:text-white transition-all"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Extra Info */}
      <div className="bg-meb-accent/10 border border-meb-accent/20 rounded-[2rem] p-8 flex items-start gap-6">
        <div className="w-12 h-12 rounded-2xl bg-meb-accent text-white flex items-center justify-center flex-shrink-0">
          <Gear size={24} weight="bold" />
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Gestion Centralisée</h4>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
            Toute modification apportée à un service ici sera répercutée instantanément sur la page d'accueil et dans les menus de navigation du site public.
          </p>
        </div>
      </div>
    </div>
  );
}
