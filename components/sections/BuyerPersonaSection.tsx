"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { Building2, Code2, Users2, CheckCircle2 } from "lucide-react";

type Persona = "CFO" | "CIO" | "OPERATIONS";

const PERSONA_DATA = {
    CFO: {
        title: "Chief Financial Officer",
        icon: Building2,
        subtitle: "Margin Control & Real-Time Reconciliation",
        benefits: [
            "Eliminate 50-70% of manual reconciliation effort",
            "Accelerate cash recognition from days to minutes",
            "Consolidate fragmented revenue streams into a single ledger view",
            "Drive an immediate 15-20% uplift in ancillary service yield"
        ]
    },
    CIO: {
        title: "Chief Information Officer",
        icon: Code2,
        subtitle: "Orchestration Without Disruption",
        benefits: [
            "Zero rip-and-replace: retain your existing SIS and ERP",
            "API-first architecture linking discrete systems securely",
            "Eliminate point-to-point integration fragility",
            "Ensure data sovereignty and institutional-grade security compliance"
        ]
    },
    OPERATIONS: {
        title: "Registrar & Admissions",
        icon: Users2,
        subtitle: "Frictionless Family Experience",
        benefits: [
            "Provide parents a single, unified payment portal for all fees",
            "Eliminate the Coordination Tax between admissions and finance",
            "Accelerate enrollment cycles with real-time financial clearance",
            "Reduce support tickets related to fee queries and missing payments"
        ]
    }
};

export default function BuyerPersonaSection() {
    const [activeTab, setActiveTab] = useState<Persona>("CFO");

    return (
        <section className="relative py-32 px-6">
            <div className="section-divider absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px]" />

            <div className="max-w-7xl mx-auto">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#148be6]" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-300">
                            Who We Serve
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[-0.02em] text-white">
                        Designed for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#148be6] to-[#74caff]">Entire Institution</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Tabs */}
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0"
                    >
                        {(Object.keys(PERSONA_DATA) as Persona[]).map((key) => {
                            const isActive = activeTab === key;
                            const Icon = PERSONA_DATA[key].icon;

                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`relative flex items-center gap-4 text-left p-6 rounded-2xl transition-all duration-300 border shrink-0 lg:shrink whitespace-nowrap lg:whitespace-normal
                                        ${isActive
                                            ? "border-[#148be6]/30 bg-[#148be6]/10 text-white"
                                            : "border-white/5 bg-white/[0.02] text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                                        }`}
                                >
                                    <div className={`p-3 rounded-full transition-colors duration-300 ${isActive ? "bg-[#148be6]/20 text-[#74caff]" : "bg-white/5 text-zinc-500"}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold tracking-wider uppercase">{key}</div>
                                        <div className="text-xs opacity-70 hidden lg:block uppercase tracking-widest mt-1">{PERSONA_DATA[key].title}</div>
                                    </div>

                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 rounded-2xl border border-[#148be6]/50 shadow-[0_0_20px_rgba(20,139,230,0.2)] pointer-events-none"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* Content Area */}
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="lg:col-span-8"
                    >
                        <div className="relative p-10 md:p-14 rounded-3xl border border-white/[0.05] bg-white/[0.02] overflow-hidden min-h-[400px] flex items-center">
                            {/* Background Glows based on active tab to make it dynamic */}
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#148be6]/5 rounded-full blur-[100px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#148be6]/10 rounded-full blur-[100px] pointer-events-none" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative z-10 w-full"
                                >
                                    <div className="mb-8">
                                        <h3 className="text-2xl md:text-4xl font-black tracking-[-0.02em] text-white mb-3">
                                            {PERSONA_DATA[activeTab].title}
                                        </h3>
                                        <p className="text-[#74caff] font-mono tracking-wider uppercase text-sm md:text-base">
                                            {PERSONA_DATA[activeTab].subtitle}
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        {PERSONA_DATA[activeTab].benefits.map((benefit, idx) => (
                                            <div key={idx} className="flex items-start gap-4">
                                                <div className="mt-1 shrink-0">
                                                    <CheckCircle2 className="w-5 h-5 text-[#148be6]" />
                                                </div>
                                                <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed">
                                                    {benefit}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-white/[0.05]">
                                        <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-white hover:text-[#74caff] transition-colors">
                                            Discuss Your Infrastructure
                                            <span className="text-[#148be6]">→</span>
                                        </a>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
