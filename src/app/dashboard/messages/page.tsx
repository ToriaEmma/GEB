"use client";

import React, { useState, useEffect } from "react";
import { 
  Envelope, 
  Trash, 
  MagnifyingGlass,
  ArrowUpRight,
  CaretRight
} from "@phosphor-icons/react";
import { messageService, ContactMessage } from "@/lib/services/messages";

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await messageService.getAll();
      setMessages(data);
      if (data.length > 0) setSelectedId(data[0].id || null);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const selectedMsg = messages.find(m => m.id === selectedId);

  const handleMarkAsRead = async (id: string) => {
    try {
      await messageService.markAsRead(id);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce message ?")) return;
    try {
      await messageService.delete(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      setSelectedId(null);
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const msg = messages.find(m => m.id === id);
    if (msg && msg.status === 'unread') {
      handleMarkAsRead(id);
    }
  };

  // We only show non-archived messages (or all messages if we consider archiving obsolete)
  const filteredMessages = messages;

  return (
    <div className="space-y-8 h-[calc(100vh-160px)] flex flex-col">
      {/* Header Area */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white font-heading font-black text-3xl md:text-4xl uppercase tracking-tighter mb-2">
            Boîte de <span className="text-meb-accent">Messages</span>
          </h1>
          <p className="text-white/50 text-sm font-medium">
            Gérez vos demandes de contact et prospects.
          </p>
        </div>
      </div>

      {/* Inbox Split View */}
      <div className="flex-1 flex gap-8 min-h-0 overflow-hidden">
        {/* List Side */}
        <div className="w-[400px] flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          <div className="relative mb-2">
            <MagnifyingGlass size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              type="text" 
              placeholder="Rechercher un message..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 h-12 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-meb-accent transition-all"
            />
          </div>

          {loading ? (
            <div className="p-10 text-center text-white/20 font-black uppercase text-[10px] tracking-widest">Synchronisation...</div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-10 text-center text-white/20 font-black uppercase text-[10px] tracking-widest">Aucun message</div>
          ) : (
            filteredMessages.map((msg) => (
              <div 
                key={msg.id}
                onClick={() => msg.id && handleSelect(msg.id)}
                className={`p-6 rounded-[2rem] border transition-all cursor-pointer relative group ${
                  selectedId === msg.id 
                    ? "bg-meb-accent border-transparent text-white" 
                    : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {msg.status === 'unread' && (
                  <div className="absolute top-6 right-6 w-2 h-2 bg-meb-red rounded-full shadow-[0_0_8px_rgba(230,57,70,0.8)]" />
                )}
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedId === msg.id ? 'text-white/70' : 'text-white/30'}`}>
                    {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ''}
                  </span>
                  <CaretRight size={14} className={selectedId === msg.id ? "opacity-100" : "opacity-0 group-hover:opacity-50 transition-opacity"} />
                </div>
                <h4 className={`font-bold text-sm mb-1 text-white`}>{msg.full_name}</h4>
                <p className={`text-[11px] font-bold truncate mb-2 ${selectedId === msg.id ? 'text-white/80' : 'text-meb-accent'}`}>{msg.subject || 'Sans objet'}</p>
                <p className={`text-[10px] line-clamp-2 leading-relaxed ${selectedId === msg.id ? 'text-white/60' : 'text-white/40'}`}>{msg.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Reading Side */}
        <div className="flex-1 bg-white/5 border border-white/5 rounded-[3rem] p-10 flex flex-col overflow-hidden">
          {selectedMsg ? (
            <>
              {/* Message Toolbar */}
              <div className="flex items-center justify-between mb-10 pb-10 border-b border-white/10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-meb-accent flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-meb-accent/20">
                    {selectedMsg.full_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">{selectedMsg.full_name}</h3>
                    <p className="text-white/40 text-xs font-medium">{selectedMsg.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href={`mailto:${selectedMsg.email}`} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-meb-accent hover:text-white transition-all" title="Répondre">
                    <ArrowUpRight size={20} weight="bold" />
                  </a>
                  <button 
                    onClick={() => selectedMsg.id && handleDelete(selectedMsg.id)}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-meb-red hover:text-white transition-all" 
                    title="Supprimer"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-meb-accent mb-2 block">Objet du message</span>
                  <h2 className="text-white font-heading font-black text-2xl uppercase tracking-tighter">
                    {selectedMsg.subject || 'Sans objet'}
                  </h2>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] text-white/70 text-sm leading-loose font-medium">
                  {selectedMsg.message}
                  <br /><br />
                  Cordialement,
                  <br />
                  {selectedMsg.full_name}
                </div>
              </div>

              {/* Quick Reply Footer */}
              <div className="mt-10 pt-10 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <input 
                    type="text"
                    placeholder="Écrire une réponse par email..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 h-14 text-[11px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-meb-accent transition-all"
                  />
                  <a 
                    href={`mailto:${selectedMsg.email}?subject=${encodeURIComponent(`RE: ${selectedMsg.subject || 'Votre demande'}`)}&body=${encodeURIComponent(replyText)}`}
                    onClick={() => {
                      setTimeout(() => setReplyText(""), 100);
                    }}
                    className="bg-meb-accent text-white px-8 h-14 rounded-2xl font-heading font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-meb-dark transition-all flex items-center shadow-lg active:scale-95"
                  >
                    Envoyer
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 opacity-30">
              <Envelope size={100} weight="thin" className="text-white" />
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Sélectionnez un message pour le lire</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
