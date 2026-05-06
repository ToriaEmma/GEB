"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  FloppyDisk, 
  PaperPlaneTilt, 
  Image as ImageIcon, 
  Globe, 
  Eye,
  Plus
} from "@phosphor-icons/react";
import { articleService } from "@/lib/services/articles";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useRef } from "react";

export default function NewArticlePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title_fr: "",
    title_en: "",
    excerpt_fr: "",
    excerpt_en: "",
    content_fr: "",
    content_en: "",
    category: "Normes ISO",
    status: "draft" as const,
    is_featured: false,
    image_url: "",
    slug: ""
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      setImagePreview(URL.createObjectURL(file));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erreur lors du téléchargement de l\'image.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (status: 'draft' | 'pending_validation') => {
    setLoading(true);
    try {
      const slug = formData.title_fr.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      await articleService.create({
        ...formData,
        slug,
        status,
        title_en: formData.title_fr, // Defaulting for now
        excerpt_en: formData.excerpt_fr,
        content_en: formData.content_fr
      });
      router.push("/dashboard/actualites");
    } catch (err: any) {
      console.error("Error saving article:", err);
      alert(`Erreur lors de l'enregistrement : ${err.message || "Problème de connexion"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/actualites" 
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
          >
            <ArrowLeft size={18} weight="bold" />
          </Link>
          <div>
            <h1 className="text-white font-heading font-black text-3xl uppercase tracking-tighter">
              Nouvel <span className="text-meb-accent">Article</span>
            </h1>
            <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1">
              Statut actuel : <span className={formData.status === 'draft' ? 'text-yellow-500' : 'text-meb-accent'}>{formData.status}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
            <button 
              onClick={() => handleSave('draft')}
              disabled={loading}
              className="bg-white/5 text-white/70 px-6 py-4 rounded-2xl font-heading font-bold uppercase text-[10px] tracking-[0.2em] border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <FloppyDisk size={18} />
              Enregistrer brouillon
            </button>
            <button 
              onClick={() => handleSave('pending_validation')}
              disabled={loading}
              className="bg-meb-accent text-white px-8 py-4 rounded-2xl font-heading font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-meb-dark transition-all duration-500 flex items-center gap-2 shadow-xl shadow-meb-accent/20 disabled:opacity-50"
            >
              <PaperPlaneTilt size={18} weight="bold" />
              Soumettre pour validation
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Excerpt */}
          <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-2">Titre de l'article (Français)</label>
              <input 
                type="text" 
                value={formData.title_fr}
                onChange={(e) => setFormData({ ...formData, title_fr: e.target.value })}
                placeholder="Ex: Les nouvelles normes ISO 9001 en 2024"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-meb-accent transition-all"
              />
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-2">Résumé court (Excerpt)</label>
              <textarea 
                value={formData.excerpt_fr}
                onChange={(e) => setFormData({ ...formData, excerpt_fr: e.target.value })}
                placeholder="Une brève description pour l'aperçu..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-white/70 placeholder:text-white/10 focus:outline-none focus:border-meb-accent transition-all resize-none"
              />
            </div>

            <div className="space-y-4 pt-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-2">Contenu de l'article</label>
              <textarea 
                value={formData.content_fr}
                onChange={(e) => setFormData({ ...formData, content_fr: e.target.value })}
                placeholder="Écrivez le contenu de votre article ici..."
                className="w-full min-h-[400px] bg-white/5 border border-white/10 rounded-2xl p-6 text-white/70 focus:outline-none focus:border-meb-accent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings Area */}
        <div className="space-y-6">
          {/* Media Section */}
          <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
            <h3 className="text-white font-heading font-black text-sm uppercase tracking-widest flex items-center gap-2">
              <ImageIcon size={20} className="text-meb-accent" />
              Image de couverture
            </h3>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-video w-full bg-white/5 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-meb-accent transition-all overflow-hidden relative"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-meb-accent border-t-transparent rounded-full animate-spin" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Upload en cours...</p>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/30 group-hover:scale-110 group-hover:bg-meb-accent group-hover:text-white transition-all">
                    <Plus size={24} weight="bold" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Cliquer pour uploader</p>
                </>
              )}
            </div>
          </div>

          {/* Categorization Section */}
          <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
            <h3 className="text-white font-heading font-black text-sm uppercase tracking-widest flex items-center gap-2">
              <Globe size={20} className="text-meb-accent" />
              Paramètres
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 ml-2">Catégorie</label>
                <select className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-[11px] font-bold uppercase tracking-widest text-white/70 focus:outline-none focus:border-meb-accent transition-all cursor-pointer">
                  <option>Normes ISO</option>
                  <option>Audit</option>
                  <option>Certification</option>
                  <option>Conseil</option>
                  <option>Digital</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Article à la une</span>
                <div className="w-10 h-6 bg-white/10 rounded-full relative p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white/20 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* SEO Preview */}
          <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-6 opacity-50 grayscale">
            <h3 className="text-white font-heading font-black text-sm uppercase tracking-widest flex items-center gap-2">
              <Eye size={20} className="text-meb-accent" />
              Aperçu SEO
            </h3>
            <div className="space-y-1">
              <p className="text-[#8ab4f8] text-sm font-medium hover:underline cursor-pointer">Titre de l'article - BEG</p>
              <p className="text-[#006621] text-xs">www.beg.com › actualites › ...</p>
              <p className="text-white/40 text-[10px] leading-relaxed">Aperçu de la description qui apparaîtra dans les moteurs de recherche...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
