"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { ShieldCheck, CreditCard } from "lucide-react";

export default function VaultsPayBreakthroughs() {
    return (
        <section className="relative z-10 py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
                    Two <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#148be6] to-[#5865F2]">Breakthroughs</span>
                </h2>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                    VaultsPay operates as both Acquirer and Issuer under a single framework, eliminating intermediary friction and delivering unprecedented value.
                </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Pillar 01 - Acquirer */}
                <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="flex-1 rounded-3xl p-1 md:p-1.5 bg-gradient-to-b from-white/10 to-transparent relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#148be6]/20 to-transparent opacity-50" />
                    <div className="bg-[#0a0a0a] rounded-[1.35rem] h-full p-8 md:p-10 relative z-10 flex flex-col">
                        <div className="w-14 h-14 rounded-2xl bg-[#148be6]/10 border border-[#148be6]/30 flex items-center justify-center mb-8">
                            <ShieldCheck className="w-7 h-7 text-[#74caff]" />
                        </div>
                        
                        <h4 className="text-xs font-black tracking-[0.2em] uppercase text-zinc-500 mb-3">Pillar 01 • Acquirer Side</h4>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Fully Integrated POS</h3>
                        <p className="text-zinc-400 mb-8 leading-relaxed">
                            Acquirer-native — not bolted on. Other acquirer banks don&apos;t integrate POS with their core systems. POS sits in a silo, creating reconciliation gaps and manual rework.
                        </p>
                        
                        <div className="mt-auto space-y-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                <h5 className="text-sm font-bold text-[#74caff] mb-1">Zero Rework</h5>
                                <p className="text-xs text-zinc-400">Every SoftPOS, terminal, QR, and Pay-by-Link transaction auto-posts straight into the institution&apos;s ERP subledgers in real-time.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Pillar 02 - Issuer */}
                <motion.div custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="flex-1 rounded-3xl p-1 md:p-1.5 bg-gradient-to-b from-white/10 to-transparent relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2]/20 to-transparent opacity-50" />
                    <div className="bg-[#0a0a0a] rounded-[1.35rem] h-full p-8 md:p-10 relative z-10 flex flex-col">
                        <div className="w-14 h-14 rounded-2xl bg-[#5865F2]/10 border border-[#5865F2]/30 flex items-center justify-center mb-8">
                            <CreditCard className="w-7 h-7 text-[#a2a8ff]" />
                        </div>
                        
                        <h4 className="text-xs font-black tracking-[0.2em] uppercase text-zinc-500 mb-3">Pillar 02 • Issuer Side</h4>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Unique Wallet Proposition</h3>
                        <p className="text-zinc-400 mb-8 leading-relaxed">
                            Parents and students hold VaultsPay-issued, school-branded cards and wallets. Every payment processes &quot;On-Us&quot; within the same closed-loop network.
                        </p>
                        
                        <div className="mt-auto space-y-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                <h5 className="text-sm font-bold text-[#a2a8ff] mb-1">30% Cost Reclaim</h5>
                                <p className="text-xs text-zinc-400">Eliminates the middleman, third-party rails, and hidden interchange. Schools reclaim up to 30% of usual acquiring costs.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
