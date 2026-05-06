"use client";

import React, { useState, useEffect, use } from "react";
import { 
  ArrowLeft, 
  CloudArrowUp, 
  Eye, 
  Trash,
  CheckCircle,
  FileText,
  Image as ImageIcon
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { articleService, Article } from "@/lib/services/articles";
import { supabase } from "@/lib/supabase";

export default function ModifierArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<Partial<Article>>({
    title_fr: "",
    title_en: "",
    excerpt_fr: "",
    excerpt_en: "",
    content_fr: "",
    content_en: "",
    category: "Audit & Conseil",
    is_featured: false,
    status: "draft"
  });

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const data = await articleService.getAll();
      const article = data.find(a => a.id === id);
      if (article) {
        setFormData(article);
        if (article.image_url) setPreviewImage(article.image_url);
      }
    } catch (err) {
      console.error("Error fetching article:", err);
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
          .upload(`articles/${fileName}`, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('article-images')
          .getPublicUrl(`articles/${fileName}`);
        
        finalImageUrl = publicUrl;
      }

      await articleService.update(id, {
        ...formData,
        image_url: finalImageUrl,
        updated_at: new Date().toISOString()
      });

      alert("Article mis à jour avec succès !");
      router.push("/dashboard/actualites");
    } catch (err) {
      console.error("Error updating article:", err);
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
          <Link href="/dashboard/actualites" className="flex items-center gap-2 text-white/30 hover:text-meb-accent transition-colors text-[10px] font-black uppercase tracking-widest mb-4">
            <ArrowLeft size={16} />
            Retour à la liste
          </Link>
          <h1 className="text-white font-heading font-black text-3xl md:text-5xl uppercase tracking-tighter leading-none">
            Modifier <span className="text-meb-accent">l'Article</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            type="button"
            className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/50 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3"
          >
            <Eye size={18} />
            Aperçu
          </button>
          <button 
            form="article-form"
            type="submit"
            disabled={saving}
            className="px-8 py-4 rounded-2xl bg-meb-accent text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-meb-dark transition-all flex items-center gap-3 shadow-xl shadow-meb-accent/20 disabled:opacity-50"
          >
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle size={18} />}
            {saving ? "Mise à jour..." : "Enregistrer les modifications"}
          </button>
        </div>
      </div>

      <form id="article-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* French Content */}
          <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 rounded-lg bg-meb-accent/20 flex items-center justify-center text-meb-accent font-black text-xs">FR</div>
              <h2 className="text-white font-bold text-lg">Contenu en Français</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Titre de l'article</label>
                <input 
                  type="text" 
                  value={formData.title_fr}
                  onChange={(e) => setFormData({...formData, title_fr: e.target.value})}
                  required
                  placeholder="Ex: BEG remporte le prix de l'excellence..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 h-16 text-sm font-medium text-white focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Extrait (Excerpt)</label>
                <textarea 
                  value={formData.excerpt_fr}
                  onChange={(e) => setFormData({...formData, excerpt_fr: e.target.value})}
                  required
                  placeholder="Bref résumé qui apparaîtra sur la page d'accueil..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 min-h-[100px] text-sm font-medium text-white focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Corps de l'article (Markdown supporté)</label>
                <textarea 
                  value={formData.content_fr}
                  onChange={(e) => setFormData({...formData, content_fr: e.target.value})}
                  required
                  placeholder="Écrivez votre article ici..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 min-h-[400px] text-sm font-medium text-white focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all resize-y"
                />
              </div>
            </div>
          </div>

          {/* English Content */}
          <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-8 opacity-60 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/50 font-black text-xs">EN</div>
              <h2 className="text-white font-bold text-lg">English Content</h2>
            </div>
            
            <div className="space-y-6">
              <input 
                type="text" 
                value={formData.title_en}
                onChange={(e) => setFormData({...formData, title_en: e.target.value})}
                placeholder="Article Title in English"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 h-16 text-sm font-medium text-white focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all"
              />
              <textarea 
                value={formData.excerpt_en}
                onChange={(e) => setFormData({...formData, excerpt_en: e.target.value})}
                placeholder="English excerpt..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 min-h-[100px] text-sm font-medium text-white focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all resize-none"
              />
              <textarea 
                value={formData.content_en}
                onChange={(e) => setFormData({...formData, content_en: e.target.value})}
                placeholder="English content..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 min-h-[300px] text-sm font-medium text-white focus:outline-none focus:border-meb-accent focus:bg-white/10 transition-all resize-y"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-4 space-y-8">
          {/* Image Upload */}
          <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
            <h3 className="text-white font-bold text-base flex items-center gap-3">
              <ImageIcon size={20} className="text-meb-accent" />
              Image de couverture
            </h3>
            
            <div 
              onClick={() => document.getElementById('image-upload')?.click()}
              className="relative aspect-square rounded-[2rem] border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/10 hover:border-meb-accent/50 transition-all group overflow-hidden"
            >
              {previewImage ? (
                <>
                  <img src={previewImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
                    <CloudArrowUp size={32} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Changer l'image</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-meb-accent transition-colors">
                    <CloudArrowUp size={32} />
                  </div>
                  <div className="text-center">
                    <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">Cliquez pour uploader</p>
                    <p className="text-white/20 text-[9px] mt-1 font-medium">PNG, JPG ou WebP (Max. 2Mo)</p>
                  </div>
                </>
              )}
              <input 
                id="image-upload"
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Catégorie</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 h-14 text-[11px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-meb-accent transition-all cursor-pointer"
              >
                <option value="Audit & Conseil">Audit & Conseil</option>
                <option value="Expertise Comptable">Expertise Comptable</option>
                <option value="Juridique & Fiscal">Juridique & Fiscal</option>
                <option value="Social & RH">Social & RH</option>
                <option value="Actualités BEG">Actualités BEG</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="space-y-1">
                <p className="text-[11px] font-black text-white uppercase tracking-wider">Mettre à la une</p>
                <p className="text-[9px] text-white/30 font-medium italic">Afficher en haut de page</p>
              </div>
              <button 
                type="button"
                onClick={() => setFormData({...formData, is_featured: !formData.is_featured})}
                className={`w-12 h-6 rounded-full transition-all relative ${formData.is_featured ? 'bg-meb-accent' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.is_featured ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="pt-4">
              <button 
                type="button"
                onClick={() => {
                  if(window.confirm("Supprimer cet article ?")) {
                    router.push("/dashboard/actualites");
                  }
                }}
                className="w-full flex items-center justify-center gap-3 text-meb-red/50 hover:text-meb-red transition-colors text-[10px] font-black uppercase tracking-[0.2em] py-4 border border-meb-red/20 rounded-2xl hover:bg-meb-red/5"
              >
                <Trash size={18} />
                Supprimer l'article
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
