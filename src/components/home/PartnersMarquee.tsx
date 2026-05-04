"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const PartnersMarquee = () => {
    return (
        <section className="py-20 bg-white w-full overflow-hidden">
            <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
                <p className="font-heading text-[#4471c4] text-xl md:text-2xl uppercase tracking-widest font-bold mb-12 text-center">
                    Notre réseau de confiance
                </p>
                <div className="relative w-full overflow-hidden mask-image-fade">
                    <motion.div
                        className="flex items-center space-x-12 md:space-x-20 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                    >
                        {[
                            "alphabenin.png", "baguidi.png", "biolynx.png", "building_business.png", "cepepe.png",
                            "colead.png", "comtel.png", "gapob.png", "la_moisson.png", "lcs.png",
                            "leadd.png", "ong.png", "pharmacie.png", "triumphus.png", "wakapou.png",
                            "alphabenin.png", "baguidi.png", "biolynx.png", "building_business.png", "cepepe.png",
                            "colead.png", "comtel.png", "gapob.png", "la_moisson.png", "lcs.png",
                            "leadd.png", "ong.png", "pharmacie.png", "triumphus.png", "wakapou.png"
                        ].map((partner, i) => (
                            <div key={i} className="relative h-12 md:h-16 w-28 md:w-36 shrink-0 transition-all duration-300 hover:scale-105">
                                <Image
                                    src={`/images/partners/${partner}`}
                                    alt={`Partner ${i}`}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
