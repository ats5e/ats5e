"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const PHASES = [
    {
        num: "01",
        title: "Discover & Design",
        description: "We map your systems landscape, identify coordination gaps, and design the orchestration blueprint. Every engagement begins with a rapid diagnostic — not a six-month discovery phase. We assess your technology stack, map your lifecycles, quantify your Coordination Tax, and design a target architecture aligned to your regulatory frameworks.",
        deliverables: "Systems landscape map, friction analysis, target orchestration architecture, phased implementation roadmap.",
        outcome: "High clarity. Aligned stakeholders. A clear, costed path forward."
    },
    {
        num: "02",
        title: "Orchestrate & Prove",
        description: "One workflow. One measurable outcome. We deploy a targeted proof of concept — typically in the highest-friction process area — that demonstrates coordination value within weeks, not months. This is a live, production-grade deployment, not a slide deck or sandbox exercise.",
        deliverables: "Working orchestration of a priority workflow, measurable KPIs, integration with live systems, validation report.",
        outcome: "Proof of value. Stakeholder confidence. A foundation to scale from."
    },
    {
        num: "03",
        title: "Scale & Optimise",
        description: "Value proven. Now we expand. Orchestration is extended across additional workflows, campuses, and financial flows. Financial intelligence capabilities are layered in — payment behaviour analytics, cash flow forecasting, ancillary revenue optimisation. Continuous enhancement becomes the operating rhythm.",
        deliverables: "Full orchestration deployment, financial intelligence dashboards, operational playbooks, ongoing optimisation cadence.",
        outcome: "Coordinated operations. Real-time financial visibility. A scalable, future-ready architecture."
    }
];

export default function RoadmapSection() {
    return (
        <section id="roadmap" className="relative pb-32 px-6">

            <div className="max-w-5xl mx-auto">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="text-[12px] tracking-[0.32em] uppercase text-zinc-600 font-medium block mb-4">The Roadmap</span>
                    <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] mb-6">
                        From Clarity to Scale.<br />
                        <span className="text-[#148be6]">In Three Phases.</span>
                    </h2>
                    <p className="text-base font-medium text-zinc-400">
                        Once coordination and visibility are established, financial efficiencies and value-added services become possible — without changing core systems.
                    </p>
                </motion.div>

                <div className="space-y-8 relative">
                    {/* Vertical connecting line */}
                    <div className="hidden md:block absolute left-8 top-16 bottom-16 w-px bg-white/[0.05]" />

                    {PHASES.map((phase, i) => (
                        <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                            className="relative flex flex-col md:flex-row gap-8 md:gap-12 group"
                        >
                            <div className="flex shrink-0">
                                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-metallic-blue bg-[#0a0a0a] text-2xl font-black text-[#148be6] shadow-glow-blue-sm md:shadow-none group-hover:shadow-glow-blue-sm transition-all duration-300">
                                    {phase.num}
                                </div>
                            </div>

                            <div className="flex-1 p-8 rounded-3xl border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-300">
                                <h3 className="text-2xl font-black uppercase text-white mb-6 tracking-tight">
                                    {phase.title}
                                </h3>
                                <p className="text-zinc-400 leading-relaxed font-medium mb-8">
                                    {phase.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/[0.05]">
                                    <div>
                                        <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#74caff] mb-2">Deliverables</h4>
                                        <p className="text-sm font-medium text-zinc-300 leading-relaxed">{phase.deliverables}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#74caff] mb-2">Outcome</h4>
                                        <p className="text-sm font-medium text-zinc-300 leading-relaxed">{phase.outcome}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
