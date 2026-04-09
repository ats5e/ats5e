"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";

const TEAM = [
    { name: "Kumar Jaisingh", role: "Engineering & Orchestration", image: "/Kumar.png", bio: "Kumar leads product strategy and execution, bringing 28 years of experience bridging high-level strategy with on-the-ground delivery." },
    { name: "William Higgins", role: "Financial Operations", image: "/William.png", bio: "William has spent the last decade deeply embedded in the GCC financial sector, partnering with all of the major banks in the region." },
    { name: "Jack Donaldson", role: "Strategy & Architecture", image: "/Jack.png", bio: "A dynamic marketing and communications leader with a proven record of driving brand growth, elevating storytelling, and delivering measurable results." },
    { name: "Ayesha Azhar", role: "Transformation Delivery", image: "/Ayesha.png", bio: "Brings over four years of experience establishing and managing best-in-class Project Management Offices, with a focus on quality assurance." }
];

export default function DNASection() {
    return (
        <section id="about-us" className="relative py-32 px-6 bg-black/[0.4]">
            <div id="dna" className="absolute -top-24 h-px w-px" aria-hidden />
            <div className="section-divider absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px]" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                        <span className="text-[12px] tracking-[0.32em] uppercase text-zinc-600 font-medium block mb-4">About Us</span>
                        <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] mb-8">
                            Powered By ATS<span className="text-[#148be6]">5E</span>.<br />
                            <span className="text-[#148be6]">Applied to Education.</span>
                        </h2>
                        <div className="space-y-6 text-base text-zinc-300 leading-relaxed font-medium">
                            <p>
                                EduFlow360™ is built and powered by <strong>ATS<span className="text-[#148be6]">5E</span></strong>. We are a specialized team whose DNA is rooted in institutional-grade finance, risk, and highly regulated operating environments. We&apos;ve spent careers building and orchestrating complex digital systems, high-volume payment flows, and customer-centric architectures for Tier-1 banks, sovereign wealth funds, and enterprise technology groups.
                            </p>
                            <p className="text-white font-bold">
                                We apply that same rigour to education.
                            </p>
                            <p>
                                Education institutions are, at their core, complex financial and operational ecosystems. They manage lifecycle-driven operations, event-linked student journeys, and financially coherent flows — across multiple stakeholders, currencies, and regulatory frameworks.
                            </p>
                            <p>
                                The disciplines that govern institutional finance — orchestration, control, auditability, real-time visibility — are precisely the disciplines that education needs but rarely receives from its technology partners.
                            </p>
                            <p className="text-[#74caff] font-bold text-lg uppercase tracking-widest pt-4">
                                That&apos;s the gap we close.
                            </p>
                            <div className="pt-6">
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] font-bold tracking-[0.14em] uppercase text-white bg-[#148be6]/10 border border-[#148be6]/30 hover:bg-[#148be6]/20 transition-all duration-300"
                                >
                                    <span className="inline-flex items-baseline gap-[0.45em]">
                                        <span>Explore</span>
                                        <span className="inline-flex items-baseline tracking-[0.08em]">
                                            <span>ATS</span>
                                            <span className="-ml-[0.08em] text-[#148be6]">5E</span>
                                        </span>
                                    </span>
                                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        {TEAM.map((member, i) => (
                            <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-900 border border-white/[0.05]"
                            >
                                <Image src={member.image} alt={member.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-end">
                                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                        <p className="text-white font-bold tracking-widest uppercase mb-1">{member.name}</p>
                                        <p className="text-[10px] text-[#74caff] font-bold uppercase tracking-widest">
                                            {member.role}
                                        </p>
                                    </div>
                                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                                        <div className="overflow-hidden">
                                            <p className="text-xs text-zinc-300 font-medium leading-relaxed pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                {member.bio}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
