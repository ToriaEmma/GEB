"use client";

import { motion } from "framer-motion";

export const SolutionsIntro = () => {
    return (
        <section className="py-20 md:py-28 bg-[#4471c4] w-full overflow-hidden">
            <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {/* Abstract Visual Card */}
                    <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[40px] p-10 overflow-hidden relative min-h-[300px] flex items-center justify-center">
                        <div className="relative flex items-center justify-center">
                            {[...Array(12)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute border-[6px] border-white/20 bg-white/5 rounded-full"
                                    style={{
                                        width: `${240 - i * 15}px`,
                                        height: `${240 - i * 15}px`,
                                        left: `${i * 18}px`,
                                        zIndex: 12 - i,
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Card 01: Grow Revenue */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-1 bg-white/10 border border-white/5 rounded-[40px] p-10 flex flex-col justify-between"
                    >
                        <span className="text-xs font-bold tracking-widest text-white/30 uppercase">(01)</span>
                        <div>
                            <h3 className="text-2xl font-bold leading-tight tracking-tight text-white mt-8">
                                Démarche<br />Qualité
                            </h3>
                            <p className="text-sm text-white/50 mt-6 leading-relaxed">
                                Management stratégique pour un impact et des compétences à l'échelle internationale.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 02: Work Smarter (Yellow) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-1 bg-[#4471c4] rounded-[40px] p-10 flex flex-col justify-between"
                    >
                        <span className="text-xs font-bold tracking-widest text-black/30 uppercase">(02)</span>
                        <div>
                            <h3 className="text-2xl font-bold leading-tight tracking-tight text-black mt-8">
                                Stratégie<br />ISO 9001
                            </h3>
                            <p className="text-sm text-black/60 mt-6 leading-relaxed font-medium">
                                Optimisation continue orientée vers l'efficacité de vos équipes.
                            </p>
                        </div>
                    </motion.div>

                    {/* Bottom Row - Heading */}
                    <div className="lg:col-span-3 pt-6 pb-2">
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.85] text-white">
                            Un accompagnement<br />vers l'excellence
                        </h2>
                    </div>

                    {/* Bottom Row - Badge */}
                    <div className="lg:col-span-1 flex items-end justify-end pb-4 pr-4">
                        <motion.div
                            initial={{ rotate: -10, scale: 0.8 }}
                            whileInView={{ rotate: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="w-24 h-24 bg-white/10 border border-white/5 backdrop-blur-md rounded-[40px] flex items-center justify-center shadow-2xl"
                        >
                            <div className="text-[#4471c4] text-6xl font-black leading-none transform translate-y-1">
                                *
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
