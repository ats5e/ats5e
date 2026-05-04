"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import Image from "next/image";

export default function VaultsPayHero() {
    return (
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-[600px] h-[600px] rounded-full"
                    style={{ background: "radial-gradient(circle,rgba(88,101,242,0.8) 0%,rgba(20,139,230,0.3) 45%,transparent 70%)", filter: "blur(80px)" }}
                />
            </div>

            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 opacity-50"
                style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto w-full pt-12">
                <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="flex justify-center items-center mb-8">
                    <Image
                        src="/eduflow-partners/VaultsPay Logo.png"
                        alt="VaultsPay"
                        width={180}
                        height={50}
                        className="h-10 md:h-12 w-auto object-contain scale-125"
                    />
                </motion.div>



                <motion.h1 custom={2} variants={fadeUp} initial="hidden" animate="visible"
                    className="text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase leading-[1.1] tracking-[-0.04em]"
                >
                    <span className="block text-white">Education payments,</span>
                    <span className="block mt-2" style={{
                        background: "linear-gradient(125deg,#148be6 0%,#74caff 55%,#5865F2 100%)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>
                        orchestrated
                    </span>
                    <span className="block text-white text-[clamp(1.5rem,3vw,2.5rem)] mt-4 opacity-90">
                        delivered on one platform.
                    </span>
                </motion.h1>

                <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
                    className="mt-8 max-w-3xl mx-auto space-y-3 text-center"
                >
                    <p className="text-lg md:text-xl font-medium text-zinc-300 leading-relaxed text-balance">
                        EduFlow360 is the orchestration approach that aligns Institutions, Parents and Students around a single financial flow. Built on two breakthroughs no other acquirer can match.
                    </p>
                </motion.div>

                <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
                    className="mt-12 inline-block p-[1px] rounded-2xl bg-gradient-to-r from-[#148be6]/50 to-[#5865F2]/50 shadow-[0_0_30px_rgba(20,139,230,0.3)]"
                >
                    <div className="bg-black/80 backdrop-blur-xl rounded-[15px] px-8 py-6 flex items-center gap-6">
                        <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">
                            30%
                        </span>
                        <div className="w-px h-12 bg-white/10" />
                        <p className="text-sm font-medium text-zinc-300 text-left max-w-[200px]">
                            Reduction in credit card transaction fees via closed-loop wallet.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
