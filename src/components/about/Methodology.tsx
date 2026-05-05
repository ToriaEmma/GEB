"use client";

import React from "react";
import { motion } from "framer-motion";
import { MagnifyingGlass, Strategy, Cube, ChartLineUp } from "@phosphor-icons/react";

const steps = [
  {
    icon: MagnifyingGlass,
    title: "Diagnostic & Analyse",
    desc: "Nous commençons par une immersion totale pour comprendre vos défis, vos processus et vos objectifs spécifiques."
  },
  {
    icon: Strategy,
    title: "Stratégie & Solutions",
    desc: "Élaboration d'une feuille de route personnalisée, alignée sur les standards internationaux (ISO) et vos ressources."
  },
  {
    icon: Cube,
    title: "Mise en œuvre",
    desc: "Accompagnement opérationnel, formation des équipes et déploiement des outils nécessaires à la transformation."
  },
  {
    icon: ChartLineUp,
    title: "Suivi & Optimisation",
    desc: "Audit de performance et ajustements continus pour garantir des résultats mesurables et pérennes."
  }
];

export const Methodology = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4471c4] mb-4 block">Notre Méthodologie</span>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-[#050A18] uppercase tracking-tight mb-4">
            Comment nous travaillons
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Une approche structurée et itérative pour garantir le succès de chaque projet de transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line for Desktop */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 hidden lg:block z-0" />
          
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-[#4471c4] group-hover:text-white transition-all">
                <step.icon size={32} weight="duotone" />
              </div>
              <div className="absolute top-6 right-8 text-4xl font-heading font-black text-gray-100 group-hover:text-[#4471c4]/10 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-heading font-black text-[#050A18] uppercase mb-4 tracking-tight">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
