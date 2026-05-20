"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import {
    BadgeCheck,
    BookOpen,
    Bus,
    CheckCircle2,
    Globe2,
    Plane,
    Plus,
    ShieldCheck,
    SlidersHorizontal,
    Smartphone,
    WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const PARENT_BENEFITS = [
    "Pay tuition, books, transport and school trips from one app.",
    "Top up in minutes and issue cards for children without handing over cash.",
    "Control every card with parent-managed spend limits and safer daily allowances.",
    "Use one wallet and card for school life, travel and overseas spending.",
];

const WALLET_MODES = [
    {
        id: "school",
        label: "School payments",
        title: "Pay school fees without switching apps",
        balance: "AED 12,640",
        primaryAction: "Pay tuition",
        helper: "Tuition, books, trips and transport are visible in one parent wallet.",
        icon: BookOpen,
        activity: [
            ["Tuition invoice", "-AED 7,500", "Matched"],
            ["School trip", "-AED 360", "Paid"],
            ["Books", "-AED 420", "Paid"],
        ],
        controls: ["Secure payment link", "Wallet transfer", "Any card fallback"],
    },
    {
        id: "allowance",
        label: "Student spend",
        title: "Control daily money without cash",
        balance: "AED 1,180",
        primaryAction: "Top up allowance",
        helper: "Parents manage the primary account and control each student card.",
        icon: SlidersHorizontal,
        activity: [
            ["Canteen", "-AED 28", "Allowed"],
            ["Campus store", "-AED 65", "Allowed"],
            ["Weekly top-up", "+AED 250", "Added"],
        ],
        controls: ["Daily limit AED 75", "Card lock enabled", "Instant top-up"],
    },
    {
        id: "travel",
        label: "Global card",
        title: "Top up in the UAE. Use anywhere.",
        balance: "AED 4,920",
        primaryAction: "Add travel funds",
        helper: "Multi-currency wallet and prepaid card access reduce cash handling when families travel.",
        icon: Plane,
        activity: [
            ["Coffee in London", "-AED 32", "Approved"],
            ["Shopping in New York", "-AED 310", "Approved"],
            ["College cafeteria", "-AED 45", "Approved"],
        ],
        controls: ["Multi-currency wallet", "Prepaid card access", "Spend globally"],
    },
];

const FAMILY_FEATURES = [
    {
        title: "Parent command center",
        description: "One place to see school payments, balances, cards, top-ups and student activity.",
        icon: Smartphone,
    },
    {
        title: "Safer student spending",
        description: "Replace loose cash with controlled cards, instant top-ups and spend visibility.",
        icon: ShieldCheck,
    },
    {
        title: "Ready for movement",
        description: "Individual IBANs, multi-currency wallets and prepaid card access support families at home and abroad.",
        icon: Globe2,
    },
];

const PAYMENT_MOMENTS: Array<{ label: string; icon: LucideIcon }> = [
    { label: "Tuition", icon: BookOpen },
    { label: "Transport", icon: Bus },
    { label: "Top-up", icon: Smartphone },
    { label: "Global use", icon: Globe2 },
];

export default function VaultsPayLifecycle() {
    const [activeMode, setActiveMode] = useState(WALLET_MODES[0]);
    const ActiveIcon = activeMode.icon;

    return (
        <section id="parent-benefits" className="relative z-10 border-t border-white/10 px-4 py-24 md:px-8">
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
                            Benefits for parents
                        </span>
                        <h2 className="text-[2rem] font-black uppercase leading-none tracking-normal text-white md:text-6xl">
                            One wallet for school, student spend and travel.
                        </h2>
                    </div>
                    <p className="text-lg font-medium leading-relaxed text-zinc-400">
                        For parents, the value is convenience and control: fewer payment hoops, cleaner visibility, safer student allowances and a card that can travel with the family.
                    </p>
                </motion.div>

                <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <motion.div
                        custom={2}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="min-w-0 rounded-2xl border border-[#74caff]/20 bg-[#08111a] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
                    >
                        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#74caff]">Parent wallet dashboard</span>
                                <h3 className="mt-2 text-2xl font-black uppercase tracking-normal text-white">{activeMode.title}</h3>
                            </div>
                            <div className="rounded-full border border-[#74caff]/20 bg-[#74caff]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#74caff]">
                                Family managed
                            </div>
                        </div>

                        <div className="mb-5 grid gap-2 sm:grid-cols-3">
                            {WALLET_MODES.map((mode) => (
                                <button
                                    key={mode.id}
                                    type="button"
                                    onClick={() => setActiveMode(mode)}
                                    className={`min-w-0 break-words rounded-xl border px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] transition ${
                                        activeMode.id === mode.id
                                            ? "border-[#74caff]/60 bg-[#148be6]/[0.18] text-white"
                                            : "border-white/10 bg-white/[0.03] text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                                    }`}
                                >
                                    {mode.label}
                                </button>
                            ))}
                        </div>

                        <div className="grid gap-4 md:grid-cols-[0.75fr_1.25fr]">
                            <div className="rounded-2xl border border-[#74caff]/20 bg-black/20 p-5">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#74caff]/10 text-[#74caff] ring-1 ring-[#74caff]/20">
                                    <ActiveIcon className="h-6 w-6" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Available balance</span>
                                <p className="mt-2 break-words text-4xl font-black text-white">{activeMode.balance}</p>
                                <button
                                    type="button"
                                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#148be6] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#0f76c4]"
                                >
                                    <Plus className="h-4 w-4" />
                                    {activeMode.primaryAction}
                                </button>
                                <p className="mt-5 text-sm font-medium leading-relaxed text-zinc-400">{activeMode.helper}</p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Recent activity</span>
                                    <WalletCards className="h-4 w-4 text-[#74caff]" />
                                </div>
                                <div className="space-y-3">
                                    {activeMode.activity.map(([label, amount, status]) => (
                                        <div key={label} className="grid min-w-0 grid-cols-[1fr_auto] gap-4 rounded-xl border border-white/10 bg-black/20 p-4">
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-white">{label}</p>
                                                <p className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-[#74caff]">
                                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                                    {status}
                                                </p>
                                            </div>
                                            <p className="min-w-0 text-right text-sm font-black text-white">{amount}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                                    {activeMode.controls.map((control) => (
                                        <div key={control} className="rounded-xl border border-[#74caff]/[0.15] bg-[#74caff]/[0.07] p-3">
                                            <BadgeCheck className="mb-3 h-4 w-4 text-[#74caff]" />
                                            <p className="break-words text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-200">{control}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        custom={3}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-5"
                    >
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                            <h3 className="text-2xl font-black uppercase tracking-normal text-white">What parents get</h3>
                            <ul className="mt-6 space-y-4">
                                {PARENT_BENEFITS.map((benefit) => (
                                    <li key={benefit} className="flex gap-3 text-sm font-medium leading-relaxed text-zinc-300">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#74caff]" />
                                        <span className="min-w-0">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid gap-4">
                            {FAMILY_FEATURES.map((feature) => (
                                <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#148be6]/[0.12] text-[#74caff] ring-1 ring-[#74caff]/20">
                                        <feature.icon className="h-5 w-5" />
                                    </div>
                                    <h4 className="text-lg font-black uppercase tracking-normal text-white">{feature.title}</h4>
                                    <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    custom={4}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:grid-cols-4"
                >
                    {PAYMENT_MOMENTS.map(({ label, icon: DisplayIcon }) => {
                        return (
                            <div key={label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
                                <DisplayIcon className="h-5 w-5 text-[#74caff]" />
                                <span className="min-w-0 break-words text-xs font-bold uppercase tracking-[0.14em] text-zinc-300">{label}</span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
