"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import type { LucideIcon } from "lucide-react";
import { Building2, CheckCircle2, Smartphone, UserSquare2, Users } from "lucide-react";

type Stakeholder = {
    title: string;
    label: string;
    icon: LucideIcon;
    points: string[];
};

const STAKEHOLDERS: Stakeholder[] = [
    {
        title: "School finance",
        label: "The receiver",
        icon: Building2,
        points: [
            "Lower payment costs across wallet and card-present flows",
            "Automatic matching into school management and ERP systems",
            "Less time counting receipts, checking bank statements and chasing references",
        ],
    },
    {
        title: "Families",
        label: "The payer",
        icon: Users,
        points: [
            "One app for tuition, books, trips, transport and top-ups",
            "Choice of wallet, card tap, secure link, QR or any bank card",
            "Individual IBANs, multi-currency wallets and prepaid card access",
        ],
    },
    {
        title: "Students",
        label: "The user",
        icon: UserSquare2,
        points: [
            "A controlled card and wallet for campus and everyday spending",
            "Parent-managed balances and safer spending controls",
            "Top up in the UAE and tap globally when travelling or studying abroad",
        ],
    },
];

export default function VaultsPayEcosystem() {
    return (
        <section className="relative z-10 px-4 py-24 md:px-8">
            <div className="mx-auto max-w-7xl">
                <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14 text-center">
                    <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-[#74caff]">Connected around school finance</span>
                    <h2 className="mx-auto max-w-4xl text-4xl font-black uppercase leading-none tracking-normal text-white md:text-6xl">
                        One payment world for schools, parents and students.
                    </h2>
                    <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-zinc-400">
                        The school gets clean collections and reconciliation. Parents get convenient payment choice. Students get a safer first money experience.
                    </p>
                </motion.div>

                <div className="grid gap-5 lg:grid-cols-3">
                    {STAKEHOLDERS.map((item, index) => (
                        <motion.article
                            key={item.title}
                            custom={index + 2}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-7"
                        >
                            <div className="mb-7 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-[#74caff] ring-1 ring-white/10">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">{item.label}</span>
                                    <h3 className="mt-1 text-2xl font-black uppercase tracking-normal text-white">{item.title}</h3>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                {item.points.map((point) => (
                                    <li key={point} className="flex gap-3 text-sm font-medium leading-relaxed text-zinc-300">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#74caff]" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.article>
                    ))}
                </div>

                <motion.div
                    custom={5}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-6 grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:grid-cols-[1.1fr_0.9fr]"
                >
                    <div className="p-7 md:p-10">
                        <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#74caff]">
                            <Smartphone className="h-4 w-4" />
                            Built for adoption
                        </span>
                        <h3 className="text-3xl font-black uppercase leading-tight tracking-normal text-white md:text-4xl">
                            Families get options. Finance gets consistency.
                        </h3>
                        <p className="mt-5 max-w-2xl text-sm font-medium leading-relaxed text-zinc-400">
                            The user experience can flex by family preference, but the school&apos;s back office still receives structured, matched transaction data instead of a patchwork of manual receipts.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 border-t border-white/10 md:border-l md:border-t-0">
                        {["Wallet", "Card tap", "Payment link", "Any bank card"].map((method) => (
                            <div key={method} className="flex min-h-28 items-center justify-center border-b border-r border-white/10 p-5 text-center text-sm font-bold uppercase tracking-[0.14em] text-zinc-300 even:border-r-0">
                                {method}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
