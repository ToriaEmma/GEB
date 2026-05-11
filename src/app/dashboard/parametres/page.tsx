"use client";

import React, { useState } from "react";
import { LockKey, Envelope, WarningCircle, CheckCircle } from "@phosphor-icons/react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export default function ParametresPage() {
  const { user } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!email && !password) {
      setMessage({ type: 'error', text: 'Veuillez remplir au moins un champ à modifier.' });
      setLoading(false);
      return;
    }

    try {
      const updates: any = {};
      if (email) updates.email = email;
      if (password) updates.password = password;

      console.log("Tentative de mise à jour forcée via API:", updates);

      const response = await fetch('/api/users/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la mise à jour');
      }

      setMessage({ 
        type: 'success', 
        text: 'Mise à jour réussie ! Vos informations ont été modifiées avec succès.' 
      });
      
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.error("Erreur de mise à jour:", error);
      setMessage({ type: 'error', text: error.message || 'Une erreur est survenue lors de la mise à jour.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-white font-heading font-black text-3xl md:text-4xl uppercase tracking-tighter mb-2">
          Paramètres du <span className="text-meb-accent">Compte</span>
        </h1>
        <p className="text-white/50 text-sm font-medium">
          Modifiez vos informations de connexion personnelles.
        </p>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl flex items-start gap-3 ${
          message.type === 'error' 
            ? 'bg-meb-red/10 border border-meb-red/20 text-meb-red' 
            : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-500'
        }`}>
          {message.type === 'error' ? <WarningCircle size={24} className="shrink-0" /> : <CheckCircle size={24} className="shrink-0" />}
          <p className="text-sm font-bold mt-0.5">{message.text}</p>
        </div>
      )}

      <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
        <form onSubmit={handleUpdate} className="space-y-6">
          
          <div className="space-y-4 mb-8">
            <h3 className="text-white font-heading font-black text-xl uppercase tracking-widest border-b border-white/10 pb-4">
              Informations de Connexion
            </h3>
            <p className="text-white/40 text-xs">
              Laissez un champ vide si vous ne souhaitez pas le modifier. Email actuel : <strong className="text-white">{user?.email}</strong>
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-2">Nouvel Email</label>
            <div className="relative group">
              <Envelope size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-meb-accent transition-colors" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: nouvel@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 h-14 text-sm text-white focus:outline-none focus:border-meb-accent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-2">Nouveau Mot de passe</label>
            <div className="relative group">
              <LockKey size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-meb-accent transition-colors" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                placeholder="Nouveau mot de passe (min. 6 caractères)"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 h-14 text-sm text-white focus:outline-none focus:border-meb-accent"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full md:w-auto px-8 bg-meb-accent text-white h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-meb-dark transition-all disabled:opacity-50 mt-8"
          >
            {loading ? "Mise à jour..." : "Sauvegarder les modifications"}
          </button>
        </form>
      </div>
    </div>
  );
}
