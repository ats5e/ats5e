"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import Image from "next/image";

const FRICTION_POINTS = [
    {
        title: "Parallel Journeys",
        description: "Admissions, finance, and learning operate as separate silos. A single student event — an offer acceptance, a deposit payment, a programme change — triggers disconnected actions across disconnected systems."
    },
    {
        title: "Coordination Overhead",
        description: "Teams spend time aligning systems instead of focusing on mission. Manual reconciliation during high-volume intake periods creates operational strain and increases the risk of error."
    },
    {
        title: "Fragmented Experience",
        description: "Students and parents face multiple portals, inconsistent information, and delayed visibility of balances, payment plans, and financial status. This erodes confidence and increases support demand."
    }
];

export default function ChallengeSection() {
    return (
        <section id="challenge" className="relative py-32 px-6">
            <div className="section-divider absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px]" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                        className="lg:col-span-5"
                    >
                        <span className="text-[12px] tracking-[0.32em] uppercase text-zinc-600 font-medium block mb-4">The Problem</span>
                        <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] mb-8">
                            The Coordination Tax Is Quietly <span className="text-[#148be6]">Compounding.</span>
                        </h2>
                        <div className="space-y-6 text-base text-zinc-300 leading-relaxed font-medium">
                            <p>
                                Your institution runs on best-in-class platforms. Admissions in one system. Finance in another. Learning in a third. Each was chosen to solve an immediate challenge — and each works well on its own.
                            </p>
                            <p>
                                But when these systems operate in parallel, <strong className="text-white">friction emerges.</strong>
                            </p>
                            <p className="text-zinc-400">
                                Student lifecycle events — applications, offers, enrolments, programme changes — don&apos;t flow seamlessly into financial systems. Teams spend hours creating manual records, reconciling data across platforms, and chasing exceptions that should never have occurred.
                            </p>
                            <p className="text-zinc-400">
                                Parents navigate three or four separate portals for what should be a single relationship. Finance raises invoices manually during peak intake, then scrambles to allocate payments and reconcile deposits. Academic insights arrive too late to trigger the interventions that could have retained a student.
                            </p>
                        </div>

                    </motion.div>

                    <div className="lg:col-span-7">
                        <h3 className="text-lg font-bold tracking-widest uppercase text-white mb-8 border-b border-white/[0.1] pb-4">
                            Three Friction Points
                        </h3>
                        <div className="grid gap-6">
                            {FRICTION_POINTS.map((point, i) => (
                                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    className="group relative rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#148be6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                                        <span className="flex-shrink-0 text-[#148be6] font-black text-2xl leading-none">
                                            {(i + 1).toString().padStart(2, '0')}
                                        </span>
                                        <div>
                                            <h4 className="text-xl font-bold uppercase tracking-[-0.02em] text-white mb-3">
                                                {point.title}
                                            </h4>
                                            <p className="text-zinc-400 leading-relaxed font-medium">
                                                {point.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Coordination Tax Section */}
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                >
                    <div className="rounded-3xl overflow-hidden border border-white/[0.05] shadow-[0_0_40px_rgba(0,0,0,0.5)] relative aspect-[16/9] lg:aspect-auto lg:h-[400px] group">
                        <Image
                            src="/imagery/20251001_1704_Digital Silhouette_remix_01k6fxwevhfpytbf4bx4s4gfza.png"
                            alt="Digital Coordination Concept"
                            fill
                            className="object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                        <div className="absolute inset-0 bg-[#148be6]/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700" />
                    </div>

                    <div className="p-8 md:p-12 rounded-3xl border border-white/[0.05] bg-white/[0.02] relative overflow-hidden group h-full flex flex-col justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#148be6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#148be6]/20 rounded-full blur-[80px]" />

                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-[-0.02em] text-white mb-6 relative z-10">
                            The <span className="text-[#148be6]">Coordination Tax</span>
                        </h3>
                        <div className="space-y-6 text-base md:text-lg leading-relaxed text-zinc-300 relative z-10 font-medium">
                            <p>
                                This is the hidden operational cost of systems that work in isolation instead of concert. It compounds quietly across every intake cycle: in delayed cash, missed interventions, manual controls, and transformation initiatives that stall before they deliver.
                            </p>
                            <p>
                                For institutions managing thousands of students across multiple campuses, currencies, and regulatory frameworks, this tax is not a minor overhead. It is a structural drag on growth, governance, and student experience.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
