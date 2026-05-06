"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  DotsThreeVertical, 
  PencilSimple, 
  Trash, 
  MagnifyingGlass,
  Briefcase,
  Link as LinkIcon,
  Clock,
  CheckCircle,
  Eye
} from "@phosphor-icons/react";
import { projectService, Project } from "@/lib/services/projects";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function RealisationsAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalClicks, setTotalClicks] = useState(0);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAll();
      setDbProjects(data);
      
      // Fetch total clicks (from site_stats if available)
      const { count } = await supabase.from('site_stats').select('*', { count: 'exact', head: true }).eq('target_type', 'project');
      setTotalClicks(count || 0);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    try {
      await projectService.delete(projectToDelete);
      setDbProjects(prev => prev.filter(p => p.id !== projectToDelete));
      setProjectToDelete(null);
    } catch (err) {
      console.error("Erreur suppression:", err);
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Custom Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-meb-dark/80 backdrop-blur-md" onClick={() => setProjectToDelete(null)} />
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full relative z-10 shadow-2xl border border-white/10 text-center">
            <div className="w-20 h-20 bg-meb-red/10 rounded-full flex items-center justify-center mx-auto mb-6 text-meb-red">
              <Trash size={40} weight="bold" />
            </div>
            <h3 className="text-[#111c2f] font-heading font-black text-2xl uppercase tracking-tighter mb-4">Supprimer ce projet ?</h3>
            <p className="text-[#111c2f]/60 text-sm font-medium leading-relaxed mb-8">
              Êtes-vous sûr de vouloir supprimer cette réalisation ? Cette action est irréversible.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setProjectToDelete(null)}
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
            Gestion des <span className="text-meb-accent">Réalisations</span>
          </h1>
          <p className="text-white/50 text-sm font-medium">
            Mettez en avant vos projets et réussites clients.
          </p>
        </div>
        <Link href="/dashboard/realisations/nouveau">
          <button className="bg-meb-accent text-white px-8 py-4 rounded-2xl font-heading font-bold uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-meb-dark transition-all duration-500 flex items-center gap-3 shadow-xl shadow-meb-accent/20">
            <Plus size={20} weight="bold" />
            <span>Nouvelle réalisation</span>
          </button>
        </Link>
      </div>

      {/* Stats Cards for Projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Total Projets</p>
            <h3 className="text-3xl font-black text-white">{dbProjects.length.toString().padStart(2, '0')}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-meb-accent/20 text-meb-accent flex items-center justify-center">
            <Briefcase size={24} weight="bold" />
          </div>
        </div>
        <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">En vedette</p>
            <h3 className="text-3xl font-black text-white">{dbProjects.filter(p => p.is_featured).length.toString().padStart(2, '0')}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 text-yellow-500 flex items-center justify-center">
            <CheckCircle size={24} weight="bold" />
          </div>
        </div>
        <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Clics totaux</p>
            <h3 className="text-3xl font-black text-white">{totalClicks.toString().padStart(2, '0')}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-500 flex items-center justify-center">
            <LinkIcon size={24} weight="bold" />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
           <div className="col-span-full py-20 text-center text-white/20 uppercase tracking-widest font-bold text-xs">Chargement des réalisations...</div>
        ) : dbProjects.length === 0 ? (
          <div className="col-span-full bg-white/5 border border-white/5 rounded-[2.5rem] p-20 text-center">
            <Briefcase size={48} className="text-white/10 mx-auto mb-4" />
            <p className="text-white/30 uppercase tracking-widest font-bold text-xs">Aucune réalisation pour le moment.</p>
          </div>
        ) : (
          dbProjects.map((project, idx) => (
            <div key={idx} className="bg-white/5 border border-white/5 rounded-[2.5rem] p-6 group hover:bg-white/10 transition-all">
              <div className="flex gap-6">
                <div className="w-24 h-24 rounded-2xl bg-white/10 overflow-hidden flex-shrink-0 relative">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-meb-accent/10 flex items-center justify-center">
                      <Briefcase size={32} className="text-meb-accent/40" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-bold text-meb-accent uppercase tracking-widest">{project.category}</span>
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/realisations/modifier/${project.id}`}>
                        <button className="text-white/30 hover:text-white transition-colors"><PencilSimple size={18} /></button>
                      </Link>
                      <button 
                        onClick={() => project.id && setProjectToDelete(project.id)}
                        className="text-white/30 hover:text-meb-red transition-colors"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2 truncate">{project.title}</h4>
                  <p className="text-white/40 text-[10px] font-medium line-clamp-2 mb-4">
                    {project.description_fr}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[9px] font-bold text-white/20 uppercase tracking-widest">
                      <Clock size={12} />
                      <span>{mounted ? project.date_string : '---'}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${project.is_featured ? 'bg-meb-accent text-white' : 'bg-white/5 text-white/30'}`}>
                      {project.is_featured ? 'Featured' : 'Standard'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Add New Project Card */}
        <Link href="/dashboard/realisations/nouveau" className="contents">
          <button className="border-2 border-dashed border-white/10 rounded-[2.5rem] p-6 flex flex-col items-center justify-center gap-4 hover:border-meb-accent hover:bg-meb-accent/5 transition-all group min-h-[160px]">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-meb-accent group-hover:text-white transition-all">
              <Plus size={24} weight="bold" />
            </div>
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest group-hover:text-white transition-colors">Ajouter un projet</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
