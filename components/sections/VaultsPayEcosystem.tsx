"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { Building2, Users, UserSquare2 } from "lucide-react";

export default function VaultsPayEcosystem() {
    return (
        <section className="relative z-10 py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
                    The 360° Connected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#148be6] to-[#74caff]">Ecosystem</span>
                </h2>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                    Moving from fragmented payments to an orchestrated financial world. Compounding wins for every stakeholder.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Institutions */}
                <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:bg-white/[0.07] transition-all duration-300"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#148be6]/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-[#148be6]/20" />
                    
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#148be6] to-[#0d5d99] flex items-center justify-center mb-6 shadow-lg shadow-[#148be6]/20 relative z-10">
                        <Building2 className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 relative z-10">1. The Receiver</h3>
                    <h4 className="text-sm font-semibold tracking-widest uppercase text-[#74caff] mb-4 relative z-10">Institutions</h4>
                    
                    <ul className="space-y-3 relative z-10 text-zinc-300 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="text-[#148be6] mt-0.5">•</span>
                            <span><strong>100% Reconciliation Accuracy:</strong> Integrated POS posts every transaction directly to ERP subledgers.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#148be6] mt-0.5">•</span>
                            <span><strong>Upfront Liquidity:</strong> T+1 settlements directly into the school account next business day.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#148be6] mt-0.5">•</span>
                            <span><strong>New Revenue:</strong> Earn on every alumni transaction. A perpetual profit center.</span>
                        </li>
                    </ul>
                </motion.div>

                {/* Parents */}
                <motion.div custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:bg-white/[0.07] transition-all duration-300"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#74caff]/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-[#74caff]/20" />
                    
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#74caff] to-[#148be6] flex items-center justify-center mb-6 shadow-lg shadow-[#74caff]/20 relative z-10">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 relative z-10">2. The Payer</h3>
                    <h4 className="text-sm font-semibold tracking-widest uppercase text-[#74caff] mb-4 relative z-10">Parents</h4>
                    
                    <ul className="space-y-3 relative z-10 text-zinc-300 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="text-[#74caff] mt-0.5">•</span>
                            <span><strong>Command Center:</strong> Real-time oversight of tuition and daily student allowance spending.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#74caff] mt-0.5">•</span>
                            <span><strong>Visa Installments:</strong> Unprecedented flexibility to pay tuition in monthly installments, easing cash flow.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#74caff] mt-0.5">•</span>
                            <span><strong>Seamless Funding:</strong> Cloud Gateway, Onsite POS, or Pay-by-Link options.</span>
                        </li>
                    </ul>
                </motion.div>

                {/* Students */}
                <motion.div custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:bg-white/[0.07] transition-all duration-300"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#5865F2]/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-[#5865F2]/20" />
                    
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5865F2] to-[#3a44a6] flex items-center justify-center mb-6 shadow-lg shadow-[#5865F2]/20 relative z-10">
                        <UserSquare2 className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 relative z-10">3. The User</h3>
                    <h4 className="text-sm font-semibold tracking-widest uppercase text-[#74caff] mb-4 relative z-10">Students</h4>
                    
                    <ul className="space-y-3 relative z-10 text-zinc-300 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="text-[#5865F2] mt-0.5">•</span>
                            <span><strong>Branded Identity:</strong> A school-branded card and wallet building lifetime affinity from day one.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#5865F2] mt-0.5">•</span>
                            <span><strong>Zero-Balance Credit:</strong> Financial freedom without the risk of defaults and debt traps.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#5865F2] mt-0.5">•</span>
                            <span><strong>Global Lifestyle:</strong> Careem discounts, Talabat offers, campus integrations, and 8+ airport lounges.</span>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}
