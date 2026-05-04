"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { GraduationCap, Briefcase, Building } from "lucide-react";

const PHASES = [
    {
        title: "Freshman Years",
        icon: GraduationCap,
        description: "Campus coffees, bookstore purchases, parent allowances.",
        color: "#148be6"
    },
    {
        title: "Graduation & Early Career",
        icon: Briefcase,
        description: "Salary deposits, travel, dining out.",
        color: "#74caff"
    },
    {
        title: "Alumni Years",
        icon: Building,
        description: "Mortgages, family expenses, premium global spends.",
        color: "#5865F2"
    }
];

export default function VaultsPayLifecycle() {
    return (
        <section className="relative z-10 py-24 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-white/10">
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5865F2] to-[#a2a8ff]">Revenue-Share</span> Engine
                </h2>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                    The wallet is carried through life. For every spend across the globe, the University earns a percentage. A lifelong branded relationship becomes a perpetual profit center.
                </p>
            </motion.div>

            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block -translate-y-1/2" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative z-10">
                    {PHASES.map((phase, idx) => (
                        <motion.div 
                            key={idx}
                            custom={idx + 2} 
                            variants={fadeUp} 
                            initial="hidden" 
                            whileInView="visible" 
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#050505] border border-white/10 flex items-center justify-center mb-6 relative transition-all duration-300 group-hover:scale-110"
                                style={{ boxShadow: `0 0 20px ${phase.color}20` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br opacity-20 rounded-2xl" style={{ backgroundImage: `linear-gradient(to bottom right, ${phase.color}, transparent)` }} />
                                <phase.icon className="w-8 h-8 relative z-10" style={{ color: phase.color }} />
                            </div>
                            
                            <h4 className="text-xs font-black tracking-[0.2em] uppercase text-zinc-500 mb-2">Phase {idx + 1}</h4>
                            <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                            <p className="text-sm text-zinc-400 max-w-[250px]">{phase.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
            
            {/* Trust Badges */}
            <motion.div custom={5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="mt-32 pt-16 border-t border-white/10 text-center"
            >
                <h4 className="text-xs font-black tracking-widest uppercase text-zinc-500 mb-8">The Bedrock of Trust</h4>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
                    <div className="flex flex-col items-center max-w-[150px]">
                        <span className="text-xl font-bold text-white mb-2">CBUAE</span>
                        <span className="text-[10px] uppercase tracking-wider text-zinc-400">Licensed Retail Payment Service</span>
                    </div>
                    <div className="flex flex-col items-center max-w-[150px]">
                        <span className="text-xl font-bold text-white mb-2">PCI-DSS L1</span>
                        <span className="text-[10px] uppercase tracking-wider text-zinc-400">Highest Payment Data Security</span>
                    </div>
                    <div className="flex flex-col items-center max-w-[150px]">
                        <span className="text-xl font-bold text-white mb-2">3DS 2.0</span>
                        <span className="text-[10px] uppercase tracking-wider text-zinc-400">Advanced Fraud Detection</span>
                    </div>
                </div>
            </motion.div>

        </section>
    );
}
