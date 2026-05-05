"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, ShieldCheck, Lightbulb, Users, Handshake, Trophy } from "@phosphor-icons/react";

export const MissionVisionValues = () => {
  return (
    <section className="py-24 bg-[#050A18] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Mission */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Target size={180} weight="duotone" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#4471c4] flex items-center justify-center mb-6 shadow-lg shadow-[#4471c4]/20">
                <Target size={24} weight="bold" />
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight mb-6">Notre Mission</h2>
              <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
                Accompagner les organisations dans leur quête d'excellence opérationnelle par des solutions d'audit, 
                de formation et de conseil sur-mesure, fondées sur les standards internationaux les plus exigeants.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 bg-[#4471c4] rounded-[40px] p-8 md:p-12 relative overflow-hidden group"
          >
            <div className="absolute -bottom-10 -right-10 opacity-20 group-hover:scale-110 transition-transform duration-700">
              <Eye size={200} weight="duotone" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
                <Eye size={24} weight="bold" />
              </div>
              <h2 className="text-3xl font-heading font-black uppercase tracking-tight mb-6">Notre Vision</h2>
              <p className="text-white/90 leading-relaxed">
                Devenir le partenaire de référence panafricain pour le développement d'une culture de la qualité et de la performance durable.
              </p>
            </div>
          </motion.div>

          {/* Values Header */}
          <div className="md:col-span-12 mt-12 mb-8">
            <h2 className="text-2xl md:text-4xl font-heading font-black uppercase tracking-tight text-center">Nos Valeurs Fondamentales</h2>
          </div>

          {/* Values Grid */}
          {[
            { icon: ShieldCheck, title: "Rigueur", desc: "La précision technique au service de la conformité." },
            { icon: Lightbulb, title: "Innovation", desc: "Des méthodologies modernes adaptées aux réalités locales." },
            { icon: Users, title: "Accompagnement", desc: "Une proximité constante avec nos partenaires." },
            { icon: Handshake, title: "Confiance", desc: "La transparence et l'intégrité au cœur de nos échanges." },
            { icon: Trophy, title: "Excellence", desc: "L'exigence du résultat comme unique standard." }
          ].map((val, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="md:col-span-4 lg:col-span-2.4 bg-white/5 border border-white/5 p-6 rounded-[32px] hover:bg-white/10 transition-colors text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <val.icon size={20} className="text-[#4471c4]" />
              </div>
              <h3 className="font-heading font-bold uppercase text-xs tracking-widest mb-2">{val.title}</h3>
              <p className="text-[10px] text-white/40 leading-tight">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
