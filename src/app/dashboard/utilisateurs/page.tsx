"use client";

import React, { useState, useEffect } from "react";
import { Users, Plus, ShieldCheck, Envelope, Lock, WarningCircle, CheckCircle } from "@phosphor-icons/react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function UtilisateursPage() {
  const { profile } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (profile && profile.role !== 'DG_CEO') {
      router.push('/dashboard');
    } else if (profile?.role === 'DG_CEO') {
      fetchUsers();
    }
  }, [profile, router]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    can_validate: false,
    can_read_messages: false,
    can_moderate_comments: false,
  });



  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la création");
      }

      setSuccess("Utilisateur créé avec succès !");
      setFormData({
        email: "",
        password: "",
        full_name: "",
        can_validate: false,
        can_read_messages: false,
        can_moderate_comments: false,
      });
      setShowAddForm(false);
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-white font-heading font-black text-3xl md:text-4xl uppercase tracking-tighter mb-2">
            Gestion des <span className="text-meb-accent">Utilisateurs</span>
          </h1>
          <p className="text-white/50 text-sm font-medium">
            Ajoutez de nouveaux membres et gérez leurs accès.
          </p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-meb-accent text-white px-6 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-meb-dark transition-all"
        >
          {showAddForm ? "Annuler" : <><Plus size={18} weight="bold" /> Ajouter un utilisateur</>}
        </button>
      </div>

      {error && (
        <div className="bg-meb-red/10 border border-meb-red/20 p-4 rounded-2xl flex items-center gap-3 text-meb-red">
          <WarningCircle size={24} />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-3 text-emerald-500">
          <CheckCircle size={24} />
          <p className="text-sm font-bold">{success}</p>
        </div>
      )}

      {showAddForm && (
        <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
          <h3 className="text-white font-heading font-black text-xl uppercase tracking-widest mb-6">Nouvel Utilisateur</h3>
          <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-2">Nom complet</label>
                <input 
                  type="text" 
                  required
                  value={formData.full_name}
                  onChange={e => setFormData({...formData, full_name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 h-14 text-sm text-white focus:outline-none focus:border-meb-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-2">Email</label>
                <div className="relative">
                  <Envelope size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 h-14 text-sm text-white focus:outline-none focus:border-meb-accent"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-2">Mot de passe</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input 
                    type="password" 
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 h-14 text-sm text-white focus:outline-none focus:border-meb-accent"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-2 block mb-4">Autorisations (Accès)</label>
              
              <label className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                <input 
                  type="checkbox" 
                  checked={formData.can_validate}
                  onChange={e => setFormData({...formData, can_validate: e.target.checked})}
                  className="w-5 h-5 rounded border-white/20 text-meb-accent focus:ring-meb-accent bg-transparent"
                />
                <div>
                  <p className="text-white text-sm font-bold">Validations</p>
                  <p className="text-white/40 text-[10px]">Approuver ou rejeter les articles publiés</p>
                </div>
              </label>

              <label className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                <input 
                  type="checkbox" 
                  checked={formData.can_read_messages}
                  onChange={e => setFormData({...formData, can_read_messages: e.target.checked})}
                  className="w-5 h-5 rounded border-white/20 text-meb-accent focus:ring-meb-accent bg-transparent"
                />
                <div>
                  <p className="text-white text-sm font-bold">Messages de Contact</p>
                  <p className="text-white/40 text-[10px]">Lire et répondre aux demandes de clients</p>
                </div>
              </label>

              <label className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                <input 
                  type="checkbox" 
                  checked={formData.can_moderate_comments}
                  onChange={e => setFormData({...formData, can_moderate_comments: e.target.checked})}
                  className="w-5 h-5 rounded border-white/20 text-meb-accent focus:ring-meb-accent bg-transparent"
                />
                <div>
                  <p className="text-white text-sm font-bold">Commentaires</p>
                  <p className="text-white/40 text-[10px]">Modérer les commentaires sur les articles</p>
                </div>
              </label>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full mt-6 bg-meb-accent text-white h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-meb-dark transition-all disabled:opacity-50"
              >
                {submitting ? "Création..." : "Créer l'utilisateur"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-white/10">
          <h3 className="text-white font-heading font-black text-xl uppercase tracking-widest">Membres de l'équipe</h3>
        </div>
        
        {loading ? (
          <div className="p-20 text-center text-white/30 text-xs font-bold uppercase tracking-widest">Chargement...</div>
        ) : users.length === 0 ? (
          <div className="p-20 text-center text-white/30 text-xs font-bold uppercase tracking-widest">Aucun utilisateur trouvé</div>
        ) : (
          <div className="divide-y divide-white/5">
            {users.map(user => (
              <div key={user.id} className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white font-black text-xl">
                    {user.full_name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{user.full_name || 'Utilisateur Anonyme'}</h4>
                    <p className="text-white/40 text-xs">{user.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {user.can_validate && <span className="bg-meb-accent/20 text-meb-accent px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest">Validations</span>}
                  {user.can_read_messages && <span className="bg-purple-500/20 text-purple-500 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest">Messages</span>}
                  {user.can_moderate_comments && <span className="bg-emerald-500/20 text-emerald-500 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest">Commentaires</span>}
                  
                  {(!user.can_validate && !user.can_read_messages && !user.can_moderate_comments) && (
                     <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Accès Basique</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
