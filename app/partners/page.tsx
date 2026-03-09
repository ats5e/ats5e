"use client";


import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Blocks, Cpu, Network } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "@/lib/motion";

// ── Placeholder Data for User to Populate ──
const PARTNERS = [
    {
        name: "Partner Name",
        logo: "/placeholder-logo.png", // Replace with your logo path (e.g. /aws.png)
        category: "Cloud Infrastructure",
        description: "Brief description of the partnership or the technology's role in the ecosystem.",
    },
    {
        name: "Partner Name",
        logo: "/placeholder-logo.png",
        category: "AI & Data Analytics",
        description: "Brief description of the partnership or the technology's role in the ecosystem.",
    },
    {
        name: "Partner Name",
        logo: "/placeholder-logo.png",
        category: "Core Banking Systems",
        description: "Brief description of the partnership or the technology's role in the ecosystem.",
    },
    {
        name: "Partner Name",
        logo: "/placeholder-logo.png",
        category: "Enterprise Automation",
        description: "Brief description of the partnership or the technology's role in the ecosystem.",
    },
    {
        name: "Partner Name",
        logo: "/placeholder-logo.png",
        category: "Cybersecurity",
        description: "Brief description of the partnership or the technology's role in the ecosystem.",
    },
    {
        name: "Partner Name",
        logo: "/placeholder-logo.png",
        category: "Digital Experience",
        description: "Brief description of the partnership or the technology's role in the ecosystem.",
    },
];

const ECOSYSTEM_PILLARS = [
    {
        icon: <Cpu className="w-6 h-6 text-[#148be6]" />,
        title: "Intelligence First",
        description: "Integrating best-in-class AI and machine learning to drive smarter decisions.",
    },
    {
        icon: <Network className="w-6 h-6 text-[#148be6]" />,
        title: "Seamless Integration",
        description: "Orchestrating complex technologies into a unified, high-performance ecosystem.",
    },
    {
        icon: <Blocks className="w-6 h-6 text-[#148be6]" />,
        title: "Enterprise Scale",
        description: "Built on battle-tested platforms designed to handle massive volumes and complexity.",
    },
];

export default function PartnersPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
            <Navbar />

            {/* ── Hero ── */}
            <section className="relative pt-44 pb-20 px-6 overflow-hidden">
                <div
                    aria-hidden
                    className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-10"
                    style={{ background: "radial-gradient(circle,#148be6,transparent 70%)", filter: "blur(100px)" }}
                />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
                        <span className="text-[12px] tracking-[0.35em] uppercase text-[#148be6] font-bold block mb-6">
                            Our Technology Ecosystem
                        </span>
                    </motion.div>
                    <motion.h1
                        custom={1}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] mb-10"
                    >
                        CURATED.<br />
                        <span
                            style={{
                                background: "linear-gradient(125deg,#148be6,#74caff 55%,#148be6)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            POWER.
                        </span>
                    </motion.h1>
                    <motion.p
                        custom={2}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="text-lg md:text-xl font-medium text-zinc-300 leading-relaxed max-w-3xl mx-auto"
                    >
                        We don&apos;t build from scratch when world-class solutions already exist.
                        We partner with the undisputed leaders in their respective fields, combining
                        their raw technological power with our enterprise PMO rigour to turn vision into reality.
                    </motion.p>
                </div>
            </section>

            {/* ── Pillars ── */}
            <section className="py-16 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {ECOSYSTEM_PILLARS.map((pillar, i) => (
                            <motion.div
                                key={pillar.title}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl"
                                style={{
                                    background: "linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0))",
                                    border: "1px solid rgba(255,255,255,0.05)",
                                }}
                            >
                                <div className="mb-6 p-4 rounded-xl bg-white/[0.02] inline-block border border-white/[0.05]">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-[-0.03em] mb-3">
                                    {pillar.title}
                                </h3>
                                <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                                    {pillar.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Partner Grid ── */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 flex justify-between items-end border-b border-white/[0.06] pb-8">
                        <div>
                            <span className="text-[12px] tracking-[0.3em] uppercase text-zinc-500 font-bold block mb-4">
                                The Network
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-[-0.04em]">
                                Strategic Partners
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PARTNERS.map((partner, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                className="group relative p-8 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    background: "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                {/* Glow effect on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: "radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(20,139,230,0.06), transparent 40%)",
                                    }}
                                />

                                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#148be6] mb-8 block">
                                    {partner.category}
                                </span>

                                {/* Logo Container */}
                                <div className="h-20 flex items-center mb-8">
                                    {/* Provide a fallback empty block if the placeholder image isn't available */}
                                    <div className="relative w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen filter grayscale group-hover:grayscale-0">
                                        <div className="absolute inset-0 flex items-center text-zinc-600 font-bold tracking-widest uppercase text-sm border border-dashed border-zinc-800 rounded-lg justify-center bg-zinc-900/50">
                                            {partner.name} Logo
                                        </div>
                                        {/* 
                      When ready, uncomment this Image component and remove the placeholder div above!
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain object-left"
                      />
                    */}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3">{partner.name}</h3>
                                <p className="text-sm text-zinc-400 font-medium leading-relaxed">
                                    {partner.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 px-6 text-center">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <span className="text-[12px] tracking-[0.35em] uppercase text-zinc-700 font-medium block mb-6">
                        Join The Ecosystem
                    </span>
                    <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-black uppercase tracking-[-0.05em] leading-[0.88] mb-10">
                        STRONGER{" "}
                        <span
                            style={{
                                background: "linear-gradient(125deg,#148be6,#74caff 55%,#148be6)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            TOGETHER.
                        </span>
                    </h2>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase text-white transition-all duration-300 hover:shadow-glow-blue-sm"
                        style={{ background: "#148be6" }}
                    >
                        Contact Our Team <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
