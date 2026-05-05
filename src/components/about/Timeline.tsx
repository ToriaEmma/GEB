"use client";

import React from "react";
import { motion } from "framer-motion";

const events = [
  {
    year: "2012",
    title: "Fondations & Vision",
    desc: "Création du cabinet BEG à Cotonou par un collège d'experts passionnés par la qualité et l'excellence organisationnelle.",
  },
  {
    year: "2015",
    title: "Expansion Régionale",
    desc: "Ouverture des premiers bureaux internationaux et élargissement de notre offre aux services de conseil stratégique.",
  },
  {
    year: "2018",
    title: "Excellence Certifiée",
    desc: "Consécration comme leader régional dans l'accompagnement aux certifications ISO 9001, ISO 14001 et ISO 45001.",
  },
  {
    year: "2021",
    title: "Innovation Digitale",
    desc: "Lancement de nos programmes de formation hybrides et de solutions d'audit à distance pour une agilité accrue.",
  },
  {
    year: "Aujourd'hui",
    title: "Référent Panafricain",
    desc: "Plus de 500 organisations accompagnées avec succès, de la startup à la multinationale, partout en Afrique.",
  },
];

export const Timeline = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-[#050A18] uppercase tracking-tight mb-4">Notre Histoire</h2>
          <div className="w-20 h-1.5 bg-[#4471c4] mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-12 md:space-y-24">
            {events.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 top-0 md:top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#4471c4] rounded-full border-4 border-white shadow-lg z-10 hidden sm:block" />

                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"} pl-12 md:pl-0`}>
                  <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 hover:shadow-xl transition-all group">
                    <span className="text-4xl font-heading font-black text-[#4471c4]/20 group-hover:text-[#4471c4]/40 transition-colors mb-2 block">
                      {event.year}
                    </span>
                    <h3 className="text-xl md:text-2xl font-heading font-black text-[#050A18] uppercase mb-4 tracking-tight">
                      {event.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                      {event.desc}
                    </p>
                  </div>
                </div>

                {/* Empty space for the other side */}
                <div className="w-full md:w-1/2 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
