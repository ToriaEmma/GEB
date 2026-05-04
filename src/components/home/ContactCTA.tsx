"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, EnvelopeSimple, Phone, MapPin } from "@phosphor-icons/react";

export const ContactCTA = () => {
    return (
        <section className="py-16 md:py-20 bg-[#4471c4] w-full">
            <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Compact Headline */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5"
                    >
                        <span className="font-heading text-[10px] font-bold tracking-[0.3em] uppercase text-[#2D3047] mb-4 block">
                            Prêt à accélérer ?
                        </span>
              <h2 className="font-heading font-black text-3xl md:text-5xl text-white leading-[1.1] tracking-tighter mb-6">
                Votre Partenaire en <br />
                <span className="text-[#2D3047]">Croissance Normative.</span>
              </h2>
                        <button className="bg-[#2D3047] text-white px-8 py-4 rounded-2xl flex items-center gap-6 group hover:bg-white hover:text-[#4471c4] transition-all duration-500">
                            <span className="font-heading font-bold uppercase text-xs tracking-widest">Prendre un RDV</span>
                            <ArrowUpRight size={18} weight="bold" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </motion.div>

                    {/* Compact Contact Info */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        
                        {/* Email Card */}
                        <motion.a 
                            href="mailto:hello@meb.bj"
                            whileHover={{ y: -3 }}
                            className="bg-white/5 p-6 rounded-[40px] flex flex-col gap-4 border border-white/5 hover:border-[#2D3047]/50 transition-all"
                        >
                            <div className="w-10 h-10 bg-white/10 shadow-sm rounded-2xl flex items-center justify-center text-[#2D3047]">
                                <EnvelopeSimple size={20} weight="bold" />
                            </div>
                            <div>
                                <p className="font-heading font-bold text-sm text-white">Email</p>
                                <p className="font-body text-xs text-white/60">hello@meb.bj</p>
                            </div>
                        </motion.a>

                        {/* Phone Card */}
                        <motion.a 
                            href="tel:+22900000000"
                            whileHover={{ y: -3 }}
                            className="bg-white/5 p-6 rounded-[40px] flex flex-col gap-4 border border-white/5 hover:border-[#2D3047]/50 transition-all"
                        >
                            <div className="w-10 h-10 bg-white/10 shadow-sm rounded-2xl flex items-center justify-center text-[#2D3047]">
                                <Phone size={20} weight="bold" />
                            </div>
                            <div>
                                <p className="font-heading font-bold text-sm text-white">Téléphone</p>
                                <p className="font-body text-xs text-white/60">+229 00 00 00 00</p>
                            </div>
                        </motion.a>

                        {/* Location Card */}
                        <div className="bg-[#2D3047] p-6 rounded-[40px] flex flex-col gap-4 text-white">
                            <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-[#2D3047]">
                                <MapPin size={20} weight="fill" />
                            </div>
                            <div>
                                <p className="font-heading font-bold text-sm">Cotonou</p>
                                <p className="font-body text-[10px] text-white/50 leading-tight">Quartier Jack, Bénin</p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};
