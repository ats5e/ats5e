"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import {
    Banknote,
    BadgePercent,
    CheckCircle2,
    Link2,
    ReceiptText,
    RefreshCcw,
    School,
    Terminal,
} from "lucide-react";

const SCHOOL_BENEFITS = [
    "Reduce transaction fees across wallet and card-present payments.",
    "End manual receipt matching with real-time reconciliation to school systems.",
    "Accept every parent preference without creating a back-office clean-up problem.",
    "Collect smoothly at reception, canteen, events, trips, transport and online.",
];

const SCHOOL_FLOWS = [
    {
        id: "wallet",
        label: "On-Us Wallet",
        headline: "Parent wallet to school wallet",
        metric: "Up to 50%",
        metricLabel: "lower transaction fees",
        settlement: "Instant wallet-to-wallet settlement",
        reconciliation: "Tuition, books, transport and trips auto-match to student records.",
        icon: Banknote,
        rows: [
            ["Tuition term fee", "On-Us Wallet", "AED 18,500"],
            ["Transport fee", "On-Us Wallet", "AED 2,200"],
            ["School trip", "On-Us Wallet", "AED 360"],
        ],
    },
    {
        id: "card",
        label: "Card Tap",
        headline: "VaultsPay card at checkout",
        metric: "30%",
        metricLabel: "less in card-present fees",
        settlement: "Smart POS acceptance for school counters and campus moments",
        reconciliation: "Physical and virtual VaultsPay cards post directly to the right payment category.",
        icon: Terminal,
        rows: [
            ["Reception payment", "VaultsPay Card Tap", "AED 1,240"],
            ["Canteen top-up", "Smart POS", "AED 85"],
            ["Bookstore", "NFC card tap", "AED 420"],
        ],
    },
    {
        id: "any-card",
        label: "Any Card",
        headline: "Any bank card welcome",
        metric: "100%",
        metricLabel: "automatic reconciliation",
        settlement: "Secure links, handheld POS, QR and native wallets",
        reconciliation: "Any bank card payment is accepted while school finance still receives matched data.",
        icon: Link2,
        rows: [
            ["Tuition balance", "Payment Link", "AED 7,750"],
            ["Admissions fee", "Any bank card", "AED 1,000"],
            ["Uniform sale", "QR / Apple Pay", "AED 610"],
        ],
    },
];

export default function VaultsPayComparison() {
    const [activeFlow, setActiveFlow] = useState(SCHOOL_FLOWS[0]);
    const ActiveIcon = activeFlow.icon;

    return (
        <section id="school-finance" className="relative z-10 border-t border-white/10 px-4 py-24 md:px-8">
            <div className="mx-0 w-full max-w-[340px] sm:mx-auto sm:max-w-7xl">
                <motion.div
                    custom={1}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-14 grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-end"
                >
                    <div>
                        <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-[#74caff]">
                            Benefits for schools
                        </span>
                        <h2 className="text-[2rem] font-black uppercase leading-none tracking-normal text-white md:text-6xl">
                            Lower cost. Cleaner books. Fewer payment exceptions.
                        </h2>
                    </div>
                    <p className="text-lg font-medium leading-relaxed text-zinc-400">
                        For schools, VaultsPay is not just another way to collect money. It is a payment operating layer that reduces fee leakage and turns every parent payment into structured, reconciled finance data.
                    </p>
                </motion.div>

                <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
                    <motion.div
                        custom={2}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-5"
                    >
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                            <h3 className="text-2xl font-black uppercase tracking-normal text-white">What changes for finance</h3>
                            <ul className="mt-6 space-y-4">
                                {SCHOOL_BENEFITS.map((benefit) => (
                                    <li key={benefit} className="flex gap-3 text-sm font-medium leading-relaxed text-zinc-300">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#74caff]" />
                                        <span className="min-w-0">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                            <div className="rounded-2xl border border-[#74caff]/20 bg-[#148be6]/10 p-6">
                                <BadgePercent className="mb-5 h-6 w-6 text-[#74caff]" />
                                <p className="text-3xl font-black text-white">50% / 30%</p>
                                <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-400">
                                    Wallet and card-present savings are separated clearly, so the school can see which rail drives which efficiency.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                                <ReceiptText className="mb-5 h-6 w-6 text-[#74caff]" />
                                <p className="text-3xl font-black text-white">0</p>
                                <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-400">
                                    Manual receipts left to chase once transactions are routed into school systems.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        custom={3}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="min-w-0 rounded-2xl border border-white/10 bg-[#0a0d10] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
                    >
                        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#74caff]">School finance dashboard</span>
                                <h3 className="mt-2 text-2xl font-black uppercase tracking-normal text-white">{activeFlow.headline}</h3>
                            </div>
                            <div className="rounded-full border border-[#74caff]/20 bg-[#74caff]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#74caff]">
                                Live matched
                            </div>
                        </div>

                        <div className="mb-5 grid gap-2 sm:grid-cols-3">
                            {SCHOOL_FLOWS.map((flow) => (
                                <button
                                    key={flow.id}
                                    type="button"
                                    onClick={() => setActiveFlow(flow)}
                                    className={`min-w-0 break-words rounded-xl border px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] transition ${
                                        activeFlow.id === flow.id
                                            ? "border-[#74caff]/60 bg-[#148be6]/[0.18] text-white"
                                            : "border-white/10 bg-white/[0.03] text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                                    }`}
                                >
                                    {flow.label}
                                </button>
                            ))}
                        </div>

                        <div className="grid gap-4 md:grid-cols-[0.82fr_1.18fr]">
                            <div className="rounded-2xl border border-[#148be6]/25 bg-[#148be6]/10 p-5">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#74caff]/10 text-[#74caff] ring-1 ring-[#74caff]/25">
                                    <ActiveIcon className="h-6 w-6" />
                                </div>
                                <p className="break-words text-5xl font-black text-white">{activeFlow.metric}</p>
                                <p className="mt-2 break-words text-sm font-bold uppercase tracking-[0.14em] text-[#74caff]">{activeFlow.metricLabel}</p>
                                <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Settlement</span>
                                        <p className="mt-1 text-sm font-medium leading-relaxed text-zinc-300">{activeFlow.settlement}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Reconciliation</span>
                                        <p className="mt-1 text-sm font-medium leading-relaxed text-zinc-300">{activeFlow.reconciliation}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Matched transactions</span>
                                    <RefreshCcw className="h-4 w-4 text-[#74caff]" />
                                </div>
                                <div className="space-y-3">
                                    {activeFlow.rows.map(([label, channel, amount]) => (
                                        <div key={label} className="grid min-w-0 grid-cols-[1fr_auto] gap-4 rounded-xl border border-white/10 bg-black/20 p-4">
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-white">{label}</p>
                                                <p className="mt-1 break-words text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">{channel}</p>
                                            </div>
                                            <div className="min-w-0 text-right">
                                                <p className="text-sm font-black text-white">{amount}</p>
                                                <p className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-[#74caff]">
                                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                                    Posted
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 grid gap-3 md:grid-cols-4">
                            {["Parent pays", "VaultsPay accepts", "EduFlow360 routes", "School reconciles"].map((step) => (
                                <div key={step} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                                    <School className="mb-3 h-4 w-4 text-[#74caff]" />
                                    <p className="break-words text-xs font-bold uppercase tracking-[0.14em] text-zinc-300">{step}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
