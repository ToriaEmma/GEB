"use client";

import React, { useState, useEffect, use } from "react";
import { 
  ArrowLeft, 
  CloudArrowUp, 
  CheckCircle,
  Briefcase,
  Image as ImageIcon,
  Link as LinkIcon,
  Trash
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { projectService, Project } from "@/lib/services/projects";
import { supabase } from "@/lib/supabase";

export default function ModifierProjetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    slug: "",
    description_fr: "",
    description_en: "",
    client: "",
    category: "Audit",
    is_featured: false,
    status: "approved",
    date_string: "",
    link: ""
  });

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const data = await projectService.getAll();
      const project = data.find(p => p.id === id);
      if (project) {
        setFormData(project);
        if (project.image_url) setPreviewImage(project.image_url);
      }
    } catch (err) {
      console.error("Error fetching project:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalImageUrl = formData.image_url;

      if (imageFile) {
        const fileName = `${Math.random()}.${imageFile.name.split('.').pop()}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('article-images')
          .upload(`projects/${fileName}`, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('article-images')
          .getPublicUrl(`projects/${fileName}`);
        
        finalImageUrl = publicUrl;
      }

      await projectService.update(id, {
        ...formData,
        image_url: finalImageUrl,
      });

      alert("Projet mis à jour avec succès !");
      router.push("/dashboard/realisations");
    } catch (err) {
      console.error("Error updating project:", err);
      alert("Erreur lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-20 text-center text-white/30 uppercase tracking-widest font-bold text-xs">Chargement...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/dashboard/realisations" className="flex items-center gap-2 text-white/30 hover:text-meb-accent transition-colors text-[10px] font-black uppercase tracking-widest mb-4">
            <ArrowLeft size={16} />
            Retour aux réalisations
          </Link>
          <h1 className="text-white font-heading font-black text-3xl md:text-5xl uppercase tracking-tighter leading-none">
            Modifier <span className="text-meb-accent">le Projet</span>
          </h1>
        </div>
        
        <button 
          form="project-form"
          type="submit"
          disabled={saving}
          className="px-8 py-4 rounded-2xl bg-meb-accent text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-meb-dark transition-all flex items-center gap-3 shadow-xl shadow-meb-accent/20 disabled:opacity-50"
        >
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle size={18} />}
          {saving ? "Mise à jour..." : "Enregistrer les modifications"}
        </button>
      </div>

      <form id="project-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 rounded-lg bg-meb-accent/20 flex items-center justify-center text-meb-accent font-black text-xs">
                <Briefcase size={18} />
              </div>
              <h2 className="text-white font-bold text-lg">Informations du Projet</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Nom du projet</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 h-16 text-sm font-medium text-white focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Client</label>
                <input 
                  type="text" 
                  value={formData.client}
                  onChange={(e) => setFormData({...formData, client: e.target.value})}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 h-16 text-sm font-medium text-white focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Description (FR)</label>
              <textarea 
                value={formData.description_fr}
                onChange={(e) => setFormData({...formData, description_fr: e.target.value})}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 min-h-[120px] text-sm font-medium text-white focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Description (EN)</label>
              <textarea 
                value={formData.description_en}
                onChange={(e) => setFormData({...formData, description_en: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 min-h-[120px] text-sm font-medium text-white focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all resize-none"
              />
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-8">
             <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 rounded-lg bg-meb-accent/20 flex items-center justify-center text-meb-accent font-black text-xs">
                <LinkIcon size={18} />
              </div>
              <h2 className="text-white font-bold text-lg">Liens</h2>
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Lien du projet</label>
                <input 
                  type="url" 
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 h-16 text-sm font-medium text-white focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all"
                />
              </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
            <h3 className="text-white font-bold text-base flex items-center gap-3">
              <ImageIcon size={20} className="text-meb-accent" />
              Image actuelle
            </h3>
            
            <div 
              onClick={() => document.getElementById('image-upload')?.click()}
              className="relative aspect-[4/3] rounded-[2rem] border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/10 hover:border-meb-accent/50 transition-all group overflow-hidden"
            >
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <CloudArrowUp size={32} className="text-white/20" />
              )}
              <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Catégorie</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 h-14 text-[11px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-meb-accent transition-all cursor-pointer"
              >
                <option value="Audit">Audit</option>
                <option value="Certification">Certification</option>
                <option value="Conseil">Conseil</option>
                <option value="Digital">Digital</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Année</label>
              <input 
                type="text" 
                value={formData.date_string}
                onChange={(e) => setFormData({...formData, date_string: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 h-14 text-sm font-medium text-white focus:outline-none focus:border-meb-accent transition-all"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <span className="text-[11px] font-black text-white uppercase tracking-wider">En vedette</span>
              <button 
                type="button"
                onClick={() => setFormData({...formData, is_featured: !formData.is_featured})}
                className={`w-12 h-6 rounded-full transition-all relative ${formData.is_featured ? 'bg-meb-accent' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.is_featured ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <button 
              type="button"
              onClick={() => {
                if(window.confirm("Supprimer ce projet ?")) {
                  router.push("/dashboard/realisations");
                }
              }}
              className="w-full flex items-center justify-center gap-3 text-meb-red/50 hover:text-meb-red transition-colors text-[10px] font-black uppercase tracking-widest py-4 border border-meb-red/20 rounded-2xl"
            >
              <Trash size={18} />
              Supprimer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
