"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { Layers, Eye, Zap } from "lucide-react";

const LAYERS = [
    {
        icon: Zap,
        title: "Event Intelligence Layer",
        description: "Business events trigger financial and operational actions automatically. When a student is admitted, an invoice is generated. When a deposit lands, a seat is confirmed and LMS access is provisioned. When a programme change occurs, the financial record adjusts in real time. No manual handoff. No reconciliation lag.",
        tags: ["admissions", "enrolments", "service activations", "programme changes", "exits", "refunds", "settlements"]
    },
    {
        icon: Layers,
        title: "Orchestration & Control Layer",
        description: "This layer coordinates decisions — not systems. It manages the rules, sequencing, approvals, and settlement logic that determine how events flow across your technology stack. Split-settlement, dunning automation, approval workflows, and audit trails are managed from a single control plane. Your platforms remain the systems of record.",
        tags: ["coordination", "rules", "sequencing", "approvals", "logic"]
    },
    {
        icon: Eye,
        title: "Treasury & Flow Visibility Layer",
        description: "Real-time visibility into money, obligations, and risk. Inflows, outflows, float, and leakage — all visible in one consolidated view. This layer provides the foundation for acquiring and payout optimisation, cash predictability, and proactive financial management. Finance teams move from reactive reconciliation to forward-looking control.",
        tags: ["visibility", "obligations", "risk", "inflows", "outflows", "float", "leakage"]
    }
];

export default function SolutionSection() {
    return (
        <section id="solution" className="relative py-32 px-6 bg-black/[0.3]">
            <div className="section-divider absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px]" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                        <span className="text-[12px] tracking-[0.32em] uppercase text-zinc-600 font-medium block mb-4">The Solution</span>
                        <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] mb-8">
                            Orchestrate. <span className="text-[#148be6]">Don&apos;t Replace.</span>
                        </h2>
                        <p className="text-lg font-medium text-zinc-300 leading-relaxed">
                            EduFlow360™ is a verticalized intelligence and flow orchestration framework built specifically for education.
                            <strong> It does not replace your platforms. It makes them work as one.</strong><br /><br />
                            It sits above your existing SIS, LMS, ERP, and CRM — connecting them through an event-driven architecture that coordinates operational and financial flows in real time. The result: every system acts in concert at the right moment, triggered by the business events that actually matter.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {LAYERS.map((layer, idx) => {
                        const Icon = layer.icon;
                        return (
                            <motion.div key={idx} custom={idx} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                className="group relative rounded-3xl p-8 border-metallic-blue flex flex-col transition-all duration-300 hover:shadow-glow-blue-sm"
                            >
                                <div className="absolute inset-0 bg-[#0a0a0a] rounded-3xl z-[-1]" />
                                <div className="absolute inset-0 topo-pattern opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none z-[-1]" />

                                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#148be6]/10 border border-[#148be6]/20 text-[#148be6]">
                                    <Icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4">
                                    {layer.title}
                                </h3>

                                <p className="text-zinc-400 leading-relaxed font-medium mb-8 flex-grow">
                                    {layer.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {layer.tags.map(tag => (
                                        <span key={tag} className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] uppercase tracking-widest text-[#74caff]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* What we are not */}
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden p-[1px]"
                    style={{ background: "linear-gradient(135deg, rgba(20,139,230,0.5), rgba(20,139,230,0.1) 50%, rgba(20,139,230,0.2))" }}
                >
                    <div className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 text-center h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#148be6]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <h4 className="text-[13px] font-bold tracking-[0.2em] uppercase text-[#74caff] mb-4">
                            What we are — and what we are not
                        </h4>
                        <p className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-6">
                            EduFlow360™ is a business intelligence and orchestration layer. It optimises financial flows and creates value for merchants, banks, and platform vendors.
                        </p>
                        <p className="text-lg text-zinc-400 font-medium">
                            It is <strong className="text-zinc-200">not an ERP</strong>. Not a SIS. Not a LMS. Not a system replacement. Not a competing integrator. <strong className="text-white">Your platforms stay.</strong> Your vendors stay. Your data stays where it belongs. We make it all work together.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
