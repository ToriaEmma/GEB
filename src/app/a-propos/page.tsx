"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-[#4471c4] mb-4 block">Notre Histoire</span>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8">À Propos de GEB</h1>
                <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
                    Best Experts Group (GEB) est un cabinet d'audit et de conseil stratégique dédié à l'excellence opérationnelle.
                    Nous accompagnons nos partenaires à travers le monde pour transformer leurs ambitions en succès durables.
                </p>
            </motion.div>
        </main>
    );
}
