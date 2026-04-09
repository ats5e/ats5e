"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { CopyCheck, HandCoins, GraduationCap, Bus, LogOut } from "lucide-react";

const STAGES = [
    {
        icon: CopyCheck,
        title: "Stage 1: Admission",
        action: "Auto-invoice generation + CRM status update",
        description: "The moment an offer is accepted, the financial record is created without manual intervention."
    },
    {
        icon: HandCoins,
        title: "Stage 2: Deposit",
        action: "Real-time seat confirmation + LMS access",
        description: "When payment lands, the student's journey begins immediately — no waiting for batch processing or manual allocation."
    },
    {
        icon: GraduationCap,
        title: "Stage 3: Term Start",
        action: "Split-settlement execution + welcome comms",
        description: "Tuition payments are allocated, split, and settled according to pre-configured rules. Parents receive confirmation. Finance receives reconciled data."
    },
    {
        icon: Bus,
        title: "Stage 4: Services",
        action: "Unified payment + tracking for ancillary",
        description: "Transport, meals, extracurricular activities, and supplementary programmes — all managed through a single payment and tracking layer."
    },
    {
        icon: LogOut,
        title: "Stage 5: Exit",
        action: "Smart dunning + alumni operations",
        description: "Outstanding balances are managed through intelligent escalation. Departing student records are closed cleanly across all systems."
    }
];

export default function JourneySection() {
    return (
        <section id="journey" className="relative py-32 px-6">
            <div className="section-divider absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px]" />

            <div className="max-w-4xl mx-auto">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-24"
                >
                    <span className="text-[12px] tracking-[0.32em] uppercase text-zinc-600 font-medium block mb-4">The Journey</span>
                    <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] mb-6">
                        Orchestration in Action:<br />
                        <span className="text-[#148be6]">The Student Lifecycle</span>
                    </h2>
                    <p className="text-base text-zinc-400 max-w-2xl mx-auto font-medium">
                        Every stage of the student journey involves multiple systems, teams, and financial events. EduFlow360™ ensures they act in concert — automatically, accurately, and in real time.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Vertical flow line connecting the stages */}
                    <div className="hidden md:block absolute left-[31px] top-6 bottom-6 w-[2px] rounded-full overflow-hidden bg-white/[0.05]">
                        <motion.div
                            className="absolute top-0 left-0 w-full"
                            style={{ background: "linear-gradient(180deg, transparent, #148be6, transparent)", height: "20%" }}
                            animate={{ y: ["-100%", "500%"] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        />
                    </div>

                    <div className="space-y-12">
                        {STAGES.map((stage, i) => {
                            const Icon = stage.icon;
                            return (
                                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                                    className="relative flex flex-col md:flex-row gap-6 md:gap-10"
                                >
                                    <div className="flex items-center md:items-start shrink-0">
                                        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0a0a0a] border-metallic-blue text-[#74caff] shadow-glow-blue-sm md:shadow-none">
                                            <Icon className="w-7 h-7" />
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <h3 className="text-2xl font-black tracking-[-0.02em] uppercase text-white mb-1">
                                            {stage.title}
                                        </h3>
                                        <p className="text-[13px] font-bold tracking-[0.15em] uppercase text-[#148be6] mb-3">
                                            {stage.action}
                                        </p>
                                        <p className="text-zinc-400 leading-relaxed font-medium">
                                            {stage.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="mt-20 p-6 rounded-2xl text-center border border-white/[0.05] bg-white/[0.02]"
                >
                    <p className="text-lg font-bold tracking-widest uppercase text-white">
                        No CSV uploads. No manual reconciliation. No intake-period panic.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
