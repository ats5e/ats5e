"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import EduFlowHero from "../EduFlowHero";
import { fadeUp } from "@/lib/motion";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0">
                <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.13, 0.26, 0.13] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-[700px] h-[700px] rounded-full"
                    style={{ background: "radial-gradient(circle,rgba(20,139,230,0.9) 0%,rgba(20,139,230,0.3) 45%,transparent 70%)", filter: "blur(70px)" }}
                />
                <motion.div
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.07, 0.15, 0.07], x: [0, 60, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute w-[450px] h-[450px] rounded-full"
                    style={{ background: "radial-gradient(circle,rgba(116,202,255,0.7) 0%,transparent 70%)", filter: "blur(90px)" }}
                />
            </div>

            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                    maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
                }}
            />

            <div className="absolute inset-0 z-0">
                <EduFlowHero />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto w-full pt-16">

                <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
                    className="text-[clamp(3rem,7vw,6.5rem)] font-black uppercase leading-[0.9] tracking-[-0.04em]"
                >
                    <span className="block text-white">Your Systems Work.</span>
                    <span className="block mt-2" style={{
                        background: "linear-gradient(125deg,#148be6 0%,#74caff 55%,#148be6 100%)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>
                        They Just Don&apos;t Work Together.
                    </span>
                </motion.h1>

                <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible"
                    className="mt-8 max-w-3xl mx-auto space-y-3 text-center"
                >
                    <p className="text-lg md:text-xl font-medium text-zinc-300 leading-relaxed text-balance">
                        EduFlow360™ is the intelligence layer that orchestrates your SIS, LMS, and ERP into one coordinated operation — delivering financial visibility, operational agility, and seamless student journeys, without replacing a single platform.
                    </p>
                </motion.div>

                <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible"
                    className="mt-12 flex items-center justify-center"
                >
                    <a href="#challenge"
                        className="group inline-flex min-w-[240px] items-center justify-center gap-2 px-12 py-4 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase text-white transition-all duration-300 hover:shadow-glow-blue-sm whitespace-nowrap"
                        style={{ background: "#148be6" }}
                    >
                        Learn More
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </motion.div>

                {/* Stats Line */}
                <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
                    className="mt-16 pt-8 border-t border-white/[0.1] max-w-4xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/[0.1]">
                        <div className="px-4">
                            <span className="block text-[#74caff] text-2xl font-black mb-1">50-70%</span>
                            <span className="text-xs tracking-widest uppercase text-zinc-400">Reduction in manual coordination</span>
                        </div>
                        <div className="px-4 py-4 md:py-0">
                            <span className="block text-[#74caff] text-2xl font-black mb-1">15-20%</span>
                            <span className="text-xs tracking-widest uppercase text-zinc-400">Ancillary yield uplift</span>
                        </div>
                        <div className="px-4">
                            <span className="block text-[#74caff] text-2xl font-black mb-1">~40%</span>
                            <span className="text-xs tracking-widest uppercase text-zinc-400">Fewer process steps</span>
                        </div>
                    </div>
                </motion.div>

                {/* Elevated Case Study Quote */}
                <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
                    className="mt-24 mb-16 max-w-5xl mx-auto px-6 relative z-10 text-center"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[300px] leading-none text-white/[0.03] font-serif select-none pointer-events-none">
                        &quot;
                    </div>

                    <p className="relative z-10 text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-8 drop-shadow-2xl">
                        &quot;EduFlow360™ connected what we already had — and within one term, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#148be6] to-[#74caff]">our finance team was working on strategy instead of spreadsheets.</span>&quot;
                    </p>

                    <div className="relative z-10 flex flex-col items-center justify-center gap-2">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#148be6] to-transparent mb-2" />
                        <span className="text-sm md:text-base tracking-[0.2em] uppercase text-white font-bold">
                            Chief Operating Officer
                        </span>
                        <span className="text-xs tracking-[0.15em] uppercase text-zinc-400 font-medium">
                            Multi-Campus School Group
                        </span>
                    </div>
                </motion.div>

                {/* Trust Badges Marquee */}
                <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible"
                    className="mt-16 w-full overflow-hidden relative"
                >
                    {/* Gradient Fade Edges */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

                    <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                        {/* First Set */}
                        <div className="flex shrink-0 items-center justify-around gap-20 px-10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                            {[
                                "Checkout.png", "DARA.png", "DCNetra.png", "Navvia.webp",
                                "UiPath.png", "VaultsPay Logo.png"
                            ].map((logo, idx) => (
                                <div key={`set1-${idx}`} className="flex-shrink-0 flex items-center justify-center w-[140px]">
                                    <Image
                                        src={`/eduflow-partners/${logo}`}
                                        alt={logo.split('.')[0]}
                                        width={140}
                                        height={50}
                                        className={`object-contain ${logo.startsWith('Checkout') || logo.startsWith('VaultsPay') ? 'scale-125' : ''}`}
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Duplicate Set for Infinite Loop */}
                        <div className="flex shrink-0 items-center justify-around gap-20 px-10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500" aria-hidden="true">
                            {[
                                "Checkout.png", "DARA.png", "DCNetra.png", "Navvia.webp",
                                "UiPath.png", "VaultsPay Logo.png"
                            ].map((logo, idx) => (
                                <div key={`set2-${idx}`} className="flex-shrink-0 flex items-center justify-center w-[140px]">
                                    <Image
                                        src={`/eduflow-partners/${logo}`}
                                        alt={logo.split('.')[0]}
                                        width={140}
                                        height={50}
                                        className={`object-contain ${logo.startsWith('Checkout') || logo.startsWith('VaultsPay') ? 'scale-125' : ''}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}
                    className="mt-20 flex justify-center pb-8"
                >
                    <a href="#challenge" aria-label="Scroll down">
                        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
                            <ChevronDown className="w-5 h-5 text-zinc-500 hover:text-[#74caff] transition-colors" />
                        </motion.div>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
