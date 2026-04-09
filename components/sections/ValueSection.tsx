"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { Network, Smartphone, ActivitySquare, ShieldCheck } from "lucide-react";
import Image from "next/image";

const IMPACT_METRICS = [
    {
        icon: Network,
        title: "Connected Student Lifecycle",
        metric: "~40%",
        label: "fewer process steps",
        description: "Automated coordination reduces process steps by approximately 40%. Events in one system trigger the right actions in every other system — without manual intervention or batch processing."
    },
    {
        icon: Smartphone,
        title: "Fewer Apps, Clearer Journeys",
        metric: "1",
        label: "coherent portal replaces 3-5",
        description: "One coherent portal replaces 3–5 separate logins for families. Parents see balances, payment plans, and academic information in a single, consistent interface."
    },
    {
        icon: ActivitySquare,
        title: "Lower Operational Load",
        metric: "50-70%",
        label: "reduction in manual time",
        description: "Manual coordination time reduced by 50–70%. No more CSV uploads, manual invoice creation, or post-facto reconciliation. Finance teams focus on analysis, not data entry."
    },
    {
        icon: ShieldCheck,
        title: "Controls Preserved",
        metric: "100%",
        label: "auditable governance",
        description: "Financial and academic controls remain fully intact and auditable. EduFlow360™ strengthens governance by making controls visible, automated, and traceable — not by bypassing them."
    }
];

const CASE_STUDIES = [
    {
        title: "Leading International University — GCC Campus",
        sector: "Higher Education",
        region: "United Arab Emirates",
        systems: "Banner (SIS), Oracle Fusion (ERP/GL), Standalone AR, Multiple Gateways",
        challenge: "Fragmented student finance architecture creating operational strain during intake. High manual reconciliation between SIS and legacy AR platform. Poor visibility of receivables.",
        approach: "ATS<span className=\"text-[#148be6]\">5E</span> engaged to consolidate receivables into Oracle Fusion using EduFlow360™ orchestration. OIC-based architecture connecting Banner, gateways, and Fusion.",
        results: [
            "Legacy AR platform fully decommissioned",
            "Manual reconciliation effort reduced by ~60%",
            "Real-time receivables visibility achieved",
            "Zero disruption cutover ahead of critical intake"
        ],
        quote: "This was not a technology refresh — it was a governance and control transformation.",
        quoteAuthor: "Director of Finance, International University GCC Campus",
        image: "/imagery/20251001_1701_Digital Maze Exploration_remix_01k6fxnxwte7h9y1rm338xmb37.png"
    },
    {
        title: "Premium Multi-Campus School Group",
        sector: "K–12 Education (8 campuses)",
        region: "South Pacific",
        systems: "ISAMS (SIS), Xero (Finance), Canvas (LMS), Standalone platforms",
        challenge: "Eight campuses with disconnected systems. 3.5 FTEs spent confirming fees across spreadsheets. Parents navigating multiple payment portals for tuition and ancillary services.",
        approach: "EduFlow360™ deployed as an orchestration layer above ISAMS, Xero, and Canvas. Automated invoicing, unified parent portal, and group-wide financial consolidation.",
        results: [
            "3.5 FTE equivalent of manual effort eliminated",
            "18% increase in ancillary service revenue",
            "35% reduction in overdue fee balances",
            "Monthly financial consolidation reduced from 4 days to real-time"
        ],
        quote: "EduFlow360™ connected what we already had — and within one term, our finance team was working on strategy instead of spreadsheets.",
        quoteAuthor: "Chief Operating Officer, Multi-Campus School Group",
        image: "/imagery/20251001_1710_High-Resolution Regeneration_remix_01k6fy6mzfemqtbq24ya38djw1.png"
    }
];

export default function ValueSection() {
    return (
        <section id="value" className="relative py-32 px-6">
            <div className="section-divider absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px]" />

            <div className="max-w-7xl mx-auto">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="text-[12px] tracking-[0.32em] uppercase text-zinc-600 font-medium block mb-4">Our Impact</span>
                    <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-[-0.04em]">
                        The Power of Architecture:<br />
                        <span className="text-[#148be6]">Measurable Impact</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {IMPACT_METRICS.map((metric, i) => {
                        const Icon = metric.icon;
                        return (
                            <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                className="group p-8 rounded-3xl border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-300"
                            >
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between mb-8 pb-8 border-b border-white/[0.05]">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#148be6]/10 text-[#74caff] group-hover:bg-[#148be6]/20 transition-colors">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold uppercase tracking-tight text-white">{metric.title}</h3>
                                    </div>
                                    <div className="text-left sm:text-right shrink-0">
                                        <span className="block text-4xl font-black text-[#148be6]">{metric.metric}</span>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">{metric.label}</span>
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-zinc-400 leading-relaxed">
                                    {metric.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Merged Case Studies Section */}
                <motion.div id="case-studies" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                    className="scroll-mt-32 text-center max-w-3xl mx-auto mt-32 mb-16"
                >
                    <span className="text-[12px] tracking-[0.32em] uppercase text-zinc-600 font-medium block mb-4">Our Work</span>
                    <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4">
                        Intelligence. <span className="text-[#148be6]">Applied.</span>
                    </h3>
                </motion.div>

                <div className="grid gap-12">
                    {CASE_STUDIES.map((study, idx) => (
                        <motion.div key={idx} custom={idx} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="group overflow-hidden rounded-3xl border border-white/[0.06] bg-black/[0.2] transition-colors hover:border-white/[0.1]"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative aspect-video lg:aspect-auto">
                                    <Image src={study.image} alt={study.title} fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 lg:bg-gradient-to-l lg:from-[#0a0a0a] lg:via-[#0a0a0a]/50 to-transparent" />
                                </div>

                                <div className="p-8 lg:p-12 flex flex-col justify-center relative bg-[#0a0a0a]">
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-6">
                                        {study.title}
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-[#74caff] font-bold">Sector</p>
                                            <p className="text-sm text-zinc-300 font-medium">{study.sector}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-[#74caff] font-bold">Region</p>
                                            <p className="text-sm text-zinc-300 font-medium">{study.region}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-[10px] uppercase tracking-widest text-[#74caff] font-bold">Systems Managed</p>
                                            <p className="text-sm text-zinc-300 font-medium">{study.systems}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6 mb-8">
                                        <div>
                                            <h4 className="text-sm font-bold uppercase text-white mb-2">The Challenge</h4>
                                            <p className="text-sm text-zinc-400 leading-relaxed font-medium">{study.challenge}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold uppercase text-white mb-2">The Approach</h4>
                                            <p className="text-sm text-zinc-400 leading-relaxed font-medium">{study.approach}</p>
                                        </div>
                                    </div>

                                    <h4 className="text-sm font-bold uppercase text-[#148be6] mb-4">Key Outcomes</h4>
                                    <ul className="space-y-2 mb-8">
                                        {study.results.map((res, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-zinc-300 font-medium">
                                                <span className="text-[#74caff] mt-0.5">✓</span> {res}
                                            </li>
                                        ))}
                                    </ul>

                                    <blockquote className="border-l-2 border-[#148be6] pl-4 italic text-zinc-400 text-sm font-medium">
                                        &ldquo;{study.quote}&rdquo;
                                        <footer className="mt-2 not-italic text-xs font-bold text-white uppercase tracking-wider">— {study.quoteAuthor}</footer>
                                    </blockquote>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
