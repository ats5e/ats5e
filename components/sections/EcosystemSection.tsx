"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { GraduationCap, Landmark, HardDrive } from "lucide-react";

export default function EcosystemSection() {
    return (
        <section id="ecosystem" className="relative py-32 px-6">
            <div className="section-divider absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px]" />

            <div className="max-w-7xl mx-auto">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="text-[12px] tracking-[0.32em] uppercase text-zinc-600 font-medium block mb-4">The Ecosystem</span>
                    <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] mb-6">
                        Built for the Ecosystem.<br />
                        <span className="text-[#148be6]">Not Against It.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="p-8 rounded-3xl border border-white/[0.05] bg-white/[0.02] transition-colors hover:bg-white/[0.04]"
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#148be6]/10 text-[#148be6] mb-6">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4">For Education Merchants</h3>
                        <p className="text-zinc-400 font-medium leading-relaxed">
                            An overarching intelligent layer that reduces friction, improves financial efficiency, and delivers coherent student and parent journeys. Launch new services in weeks. Respond to regulatory change at pace. Scale across campuses without scaling complexity.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
                        className="p-8 rounded-3xl border border-white/[0.05] bg-white/[0.02] transition-colors hover:bg-white/[0.04]"
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#148be6]/10 text-[#148be6] mb-6">
                            <Landmark className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4">For Banks & PSPs</h3>
                        <p className="text-zinc-400 font-medium leading-relaxed">
                            Embedded financial relationships across core merchant flows — from collections to payroll to supplier payments. Supplier flow data feeds SME banking acquisition. Parent payment behaviour informs retail lending and card product positioning. EduFlow360™ creates structured access to transaction-rich, lifecycle-driven education merchants.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
                        className="p-8 rounded-3xl border border-white/[0.05] bg-white/[0.02] transition-colors hover:bg-white/[0.04]"
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#148be6]/10 text-[#148be6] mb-6">
                            <HardDrive className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4">For IT & Platform Vendors</h3>
                        <p className="text-zinc-400 font-medium leading-relaxed">
                            Higher platform stickiness. Fewer churn conversations. You remain the system of record — and EduFlow360™ makes your platform more valuable to the institution, not less. Our orchestration layer enhances your position by extending the value your system delivers across the full student lifecycle.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
