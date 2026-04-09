"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function CTASection() {
    return (
        <section id="contact" className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
                    className="relative rounded-3xl overflow-hidden text-center px-8 py-24 border-metallic-blue"
                    style={{
                        background: "linear-gradient(135deg, rgba(20,139,230,0.08) 0%, rgba(20,139,230,0.02) 100%)",
                    }}
                >
                    <div aria-hidden className="absolute inset-0">
                        <Image src="/imagery/enhanced_20251001_1648_High-Resolution Visualization_remix_01k6fwzvn7ecxbrvkbsxtbcgca.png" alt="High Resolution Visualization" fill className="object-cover opacity-30 mix-blend-overlay" />
                    </div>
                    <div aria-hidden className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 70% 80% at 50% 100%,rgba(20,139,230,0.2),transparent)" }}
                    />
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <span className="text-[12px] tracking-[0.35em] uppercase text-zinc-400 font-medium block mb-6">
                            Let&apos;s Build
                        </span>
                        <h2 className="text-[clamp(3rem,6vw,5.5rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] mb-8">
                            Intelligence. <br />
                            <span style={{
                                background: "linear-gradient(125deg,#148be6 0%,#74caff 55%,#148be6 100%)",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                            }}>Applied to Education.</span>
                        </h2>
                        <p className="text-lg font-medium text-zinc-300 leading-relaxed tracking-[0.02em] mb-12">
                            The gap between your current state and your potential is measurable. We call it the Coordination Tax — and we know how to eliminate it. Without disruption. Without replacing your platforms. At pace.
                            <br /><br />
                            <span className="text-white font-bold">Let&apos;s close that gap together.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a href="mailto:info@ats5e.com"
                                className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-10 py-4 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase text-white transition-all duration-300 hover:shadow-glow-blue-sm"
                                style={{ background: "#148be6" }}
                            >
                                Contact Us <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
