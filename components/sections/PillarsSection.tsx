"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { Users, Coins } from "lucide-react";

export default function PillarsSection() {
    return (
        <section id="pillars" className="relative py-32 px-6 bg-black/[0.4]">
            <div className="section-divider absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px]" />

            <div className="max-w-7xl mx-auto">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="text-[12px] tracking-[0.32em] uppercase text-zinc-600 font-medium block mb-4">The Dimensions</span>
                    <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] mb-8">
                        Two Engagement Dimensions.<br />
                        <span className="text-[#148be6]">One Coordinated Outcome.</span>
                    </h2>
                    <p className="text-base text-zinc-400 font-medium">
                        EduFlow360™ can be deployed as a consulting lens, an execution layer, or both — together or independently, based on your institutional priorities.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Pillar 1 */}
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="group rounded-3xl p-10 border-metallic-light transition-all duration-300 hover:border-metallic-blue"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.1] text-zinc-300 group-hover:text-[#148be6] group-hover:bg-[#148be6]/10 group-hover:border-[#148be6]/30 transition-all duration-300">
                                <Users className="w-6 h-6" />
                            </div>
                            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#148be6]">People · Process · Systems</p>
                        </div>

                        <h3 className="text-2xl font-black uppercase text-white mb-6">
                            Pillar 1: Institutional<br />Optimisation
                        </h3>

                        <p className="text-sm font-medium text-zinc-400 mb-8 leading-relaxed">
                            Focused on how the institution operates — not on replacing technology. This dimension addresses the organisational and process-level friction that technology alone cannot solve.
                        </p>

                        <ul className="space-y-6">
                            {[
                                { title: "Operating model & role clarity", desc: "Who owns what, and where do handoffs break down? We map accountability to eliminate grey zones." },
                                { title: "Process simplification & governance", desc: "Streamlining workflows and establishing governance frameworks that scale across campuses." },
                                { title: "Optimising existing system use", desc: "Identifying underutilised features and workarounds that create unnecessary manual overhead." },
                                { title: "Change readiness", desc: "Assessing organisational readiness and establishing decision rights that prevent initiative stalls." }
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#74caff] shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-xs text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Pillar 2 */}
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
                        className="group rounded-3xl p-10 border-metallic-light transition-all duration-300 hover:border-metallic-blue"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.1] text-zinc-300 group-hover:text-[#148be6] group-hover:bg-[#148be6]/10 group-hover:border-[#148be6]/30 transition-all duration-300">
                                <Coins className="w-6 h-6" />
                            </div>
                            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#148be6]">Execution & Intelligence</p>
                        </div>

                        <h3 className="text-2xl font-black uppercase text-white mb-6">
                            Pillar 2: Financial Flow<br />Optimisation
                        </h3>

                        <p className="text-sm font-medium text-zinc-400 mb-8 leading-relaxed">
                            Focused on how money moves through the institution — transparently, efficiently, and in real time. This dimension transforms financial operations from reactive to proactive.
                        </p>

                        <ul className="space-y-6">
                            {[
                                { title: "Inflows — The Collections Engine", desc: "Smart invoicing, payment orchestration, automated dunning, and ancillary spend capture." },
                                { title: "Outflows — The Payables Engine", desc: "Vendor P2P workflows, automated payroll parsing, instant refund processing, and expense cards." },
                                { title: "Intelligence — Treasury Visibility", desc: "Consolidated view of cash position, obligations, float, and leakage. Feeding SME banking flows." }
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#74caff] shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-xs text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-sm font-bold tracking-widest uppercase text-zinc-500">
                        All engagements are delivered <strong className="text-white">without replacing</strong> ERP, SIS, LMS, or CRM platforms.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
