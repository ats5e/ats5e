"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { XCircle, CheckCircle2 } from "lucide-react";

const COMPARISON_DATA = [
    {
        category: "Reconciliation",
        legacy: "Manual, error-prone ledgers. POS siloed from core.",
        modern: "Automated POS/QR routing to ERP Subledgers."
    },
    {
        category: "Cash Flow",
        legacy: "Delayed settlements (3-5 days). Blind cash flow.",
        modern: "T+1 upfront liquidity via Visa Installments."
    },
    {
        category: "Cost Structure",
        legacy: "High transaction fees. Multiple intermediaries.",
        modern: "Bespoke education rates. Up to 30% reclaimed."
    },
    {
        category: "Student Experience",
        legacy: "Generic bank cards. Fragmented experience.",
        modern: "School-branded financial identity & zero-balance credit."
    },
    {
        category: "Parent Visibility",
        legacy: "Blind spending.",
        modern: "Real-time Wallet App oversight."
    }
];

export default function VaultsPayComparison() {
    return (
        <section className="relative z-10 py-24 px-4 md:px-8 max-w-5xl mx-auto w-full">
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
                    Legacy Friction vs. <span className="text-[#148be6]">Intelligent Flow</span>
                </h2>
                <p className="text-zinc-400 text-lg">
                    Moving from a fragmented cost-center to an orchestrated profit-center.
                </p>
            </motion.div>

            <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                    
                    {/* Legacy Column */}
                    <div className="p-8 md:p-10 bg-gradient-to-b from-red-500/5 to-transparent">
                        <div className="flex items-center gap-3 mb-8">
                            <XCircle className="w-8 h-8 text-red-500" />
                            <h3 className="text-xl font-bold text-white">Traditional Acquirer + Generic Card</h3>
                        </div>
                        
                        <ul className="space-y-6">
                            {COMPARISON_DATA.map((item, idx) => (
                                <li key={idx} className="space-y-1">
                                    <span className="text-[10px] font-black tracking-widest uppercase text-zinc-500">{item.category}</span>
                                    <p className="text-sm text-zinc-400">{item.legacy}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Modern Column */}
                    <div className="p-8 md:p-10 bg-gradient-to-b from-[#148be6]/10 to-transparent relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#148be6]/5 to-[#74caff]/5" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <CheckCircle2 className="w-8 h-8 text-[#74caff]" />
                                <h3 className="text-xl font-bold text-white">EduFlow360 on VaultsPay</h3>
                            </div>
                            
                            <ul className="space-y-6">
                                {COMPARISON_DATA.map((item, idx) => (
                                    <li key={idx} className="space-y-1">
                                        <span className="text-[10px] font-black tracking-widest uppercase text-[#148be6]">{item.category}</span>
                                        <p className="text-sm text-zinc-200 font-medium">{item.modern}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}
