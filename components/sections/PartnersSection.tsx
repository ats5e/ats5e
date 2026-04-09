"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import Image from "next/image";

const PARTNERS = [
    { name: "Checkout.com", logo: "Checkout.png", description: "Global payment orchestration, enabling seamless cross-border acquiring and rapid settlement for international student cohorts." },
    { name: "UiPath", logo: "UiPath.png", description: "Enterprise robotic process automation (RPA) engine, driving the intelligent bots that execute high-volume data entry and reconciliation across legacy SIS/ERP boundaries." },
    { name: "DARA", logo: "DARA.png", description: "Specialist deployment and integration partner, ensuring rapid time-to-value for complex enterprise architecture implementations." },
    { name: "DCNetra", logo: "DCNetra.png", description: "Advanced data governance and reporting compliance partner, securing institutional data flows." },
    { name: "Navvia", logo: "Navvia.webp", description: "Business process management and mapping platform, used to design and enforce the operational control layers we deploy." },
];

export default function PartnersSection() {
    return (
        <section id="partners" className="relative py-32 px-6 bg-black/[0.4]">
            <div className="section-divider absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px]" />

            <div className="max-w-7xl mx-auto">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="text-[12px] tracking-[0.32em] uppercase text-zinc-600 font-medium block mb-4">Partners</span>
                    <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] mb-8">
                        The Strategic <span className="text-[#148be6]">Ecosystem.</span>
                    </h2>
                    <p className="text-lg font-medium text-zinc-300 leading-relaxed">
                        EduFlow360™ does not operate in isolation. We work alongside global leaders in banking, payments, and automation to orchestrate a seamless financial ecosystem for your institution.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PARTNERS.map((partner, i) => (
                        <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="group relative rounded-3xl p-8 border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300 flex flex-col items-center text-center"
                        >
                            <div className="h-20 w-full mb-6 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                                <Image
                                    src={`/eduflow-partners/${partner.logo}`}
                                    alt={partner.name}
                                    fill
                                    className={`object-contain ${partner.name === 'Checkout.com' ? 'scale-125' : ''}`}
                                />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{partner.name}</h3>
                            <p className="text-xs font-medium text-zinc-400 leading-relaxed">
                                {partner.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
