"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import Image from "next/image";
import { ArrowRight, BadgePercent, CheckCircle2, CreditCard, Link2, ReceiptText, School, WalletCards } from "lucide-react";

const HERO_STATS = [
    {
        value: "50%",
        label: "Lower transaction fees with the On-Us Wallet",
        icon: WalletCards,
    },
    {
        value: "30%",
        label: "Less in fees when parents tap VaultsPay cards",
        icon: BadgePercent,
    },
    {
        value: "100%",
        label: "Automatic real-time reconciliation to school systems",
        icon: ReceiptText,
    },
];

const FLOW_INPUTS = [
    {
        label: "Parent wallet",
        amount: "AED 18.5k",
        detail: "On-Us transfer",
        icon: WalletCards,
        accent: "text-[#5bd36a]",
    },
    {
        label: "Card tap",
        amount: "AED 1.2k",
        detail: "Campus POS",
        icon: CreditCard,
        accent: "text-[#74caff]",
    },
    {
        label: "Any card",
        amount: "AED 360",
        detail: "Link / QR",
        icon: Link2,
        accent: "text-[#9fd8ff]",
    },
];

const FLOW_OUTPUTS = [
    {
        label: "School ledger",
        value: "Posted",
        icon: School,
    },
    {
        label: "Reconciliation",
        value: "100% match",
        icon: CheckCircle2,
    },
    {
        label: "Receipt queue",
        value: "0 open",
        icon: ReceiptText,
    },
];

function PaymentFlowGraphic() {
    return (
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#070b0f]/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-6 lg:p-8">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-35"
                style={{
                    backgroundImage: "linear-gradient(rgba(116,202,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(116,202,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "34px 34px",
                }}
            />
            <div className="relative z-10">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-[#74caff]">Payment flow engine</h2>
                    <div className="w-fit rounded-full border border-[#5bd36a]/25 bg-[#5bd36a]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#7ef18e]">
                        Live
                    </div>
                </div>

                <div className="relative mt-7 overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-3 sm:p-4">
                    <div className="pointer-events-none absolute left-6 right-6 top-1/2 hidden h-px bg-[#74caff]/25 lg:block" />
                    <div className="pointer-events-none absolute bottom-8 left-[48%] top-8 hidden w-px bg-[#5bd36a]/18 lg:block" />
                    <div className="pointer-events-none absolute inset-x-10 top-[35%] hidden h-px bg-[#5bd36a]/18 lg:block" />
                    <div className="pointer-events-none absolute inset-x-10 top-[65%] hidden h-px bg-[#74caff]/18 lg:block" />

                    {[0, 1, 2].map((dot) => (
                        <motion.span
                            key={dot}
                            aria-hidden
                            className="pointer-events-none absolute top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#74caff] shadow-[0_0_18px_rgba(116,202,255,0.8)] lg:block"
                            animate={{ left: ["4%", "48%", "96%"], opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 4.4, delay: dot * 0.7, repeat: Infinity, ease: "easeInOut" }}
                        />
                    ))}

                    <motion.span
                        aria-hidden
                        className="pointer-events-none absolute bottom-8 top-8 hidden w-px bg-[#5bd36a] lg:block"
                        animate={{ left: ["32%", "48%", "64%"], opacity: [0.12, 0.55, 0.12] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <div className="relative z-10 grid gap-3 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.18fr_1fr_1fr_1fr]">
                        {FLOW_INPUTS.map((input, index) => (
                            <motion.div
                                key={input.label}
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 4.2, delay: index * 0.35, repeat: Infinity, ease: "easeInOut" }}
                                className="rounded-2xl border border-white/10 bg-[#101418]/95 p-4 lg:min-h-40"
                            >
                                <input.icon className={`mb-4 h-5 w-5 ${input.accent}`} />
                                <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">{input.label}</p>
                                <p className="mt-2 text-lg font-black text-white">{input.amount}</p>
                                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500">{input.detail}</p>
                            </motion.div>
                        ))}
                        <div className="flex min-h-40 items-center justify-center rounded-2xl border border-[#74caff]/35 bg-[#081722]/95 px-5 text-center shadow-[0_18px_50px_rgba(20,139,230,0.16)] md:col-span-2 lg:col-span-1">
                            <Image
                                src="/eduflow-partners/VaultsPay Logo.png"
                                alt="VaultsPay"
                                width={150}
                                height={32}
                                className="h-8 w-auto object-contain"
                            />
                        </div>

                        {FLOW_OUTPUTS.map((output) => (
                            <div key={output.label} className="rounded-2xl border border-[#74caff]/20 bg-[#08131c]/95 p-4 lg:min-h-40">
                                <output.icon className="mb-4 h-5 w-5 text-[#74caff]" />
                                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-500">{output.label}</p>
                                <p className="mt-2 text-base font-black uppercase tracking-normal text-white">{output.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function VaultsPayHero() {
    return (
        <section className="relative overflow-hidden bg-[#050505] px-6 pb-16 pt-32 md:pb-20">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />

            <div className="relative z-10 mx-auto w-full max-w-7xl">
                <div className="flex min-h-[640px] items-center py-14">
                    <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="w-full max-w-[320px] sm:max-w-4xl">
                        <div className="mb-8 inline-flex w-fit max-w-full flex-col items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:rounded-full sm:px-5 md:gap-5 md:px-6">
                            <Image
                                src="/eduflow-partners/VaultsPay Logo.png"
                                alt="VaultsPay"
                                width={190}
                                height={41}
                                className="h-8 w-auto max-w-[170px] object-contain sm:h-9 sm:max-w-[200px]"
                                priority
                            />
                            <div className="hidden h-8 w-px bg-white/10 sm:block" />
                            <span className="min-w-0 text-[10px] font-bold uppercase leading-relaxed tracking-[0.16em] text-[#74caff] sm:text-[11px] sm:tracking-[0.2em] md:tracking-[0.22em]">
                                School payments infrastructure
                            </span>
                        </div>

                        <h1 className="text-4xl font-black uppercase leading-none tracking-normal text-white sm:text-5xl md:text-7xl">
                            <span className="block sm:inline">Three ways</span>
                            <span className="block sm:inline sm:ml-4">to pay.</span>
                            <span className="mt-3 block text-[#74caff]">
                                <span className="block sm:inline">One</span>
                                <span className="block sm:inline sm:ml-4">reconciled</span>
                                <span className="block">flow.</span>
                            </span>
                        </h1>

                        <p className="mt-8 max-w-3xl text-lg font-medium leading-relaxed text-zinc-300 md:text-xl">
                            VaultsPay replaces fragmented school payment channels with one low-cost digital infrastructure connecting parents, students and finance teams in real time.
                        </p>

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                            <a
                                href="#payment-rails"
                                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#148be6] px-5 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#0f76c4] sm:w-auto sm:px-7"
                            >
                                See payment options
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <a
                                href="#school-finance"
                                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-5 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#74caff]/60 hover:bg-white/[0.04] sm:w-auto sm:px-7"
                            >
                                View school impact
                            </a>
                        </div>
                    </motion.div>
                </div>

                <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="grid w-full max-w-[320px] gap-4 sm:max-w-none md:grid-cols-3">
                    {HERO_STATS.map((stat) => (
                        <div key={stat.value} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur">
                            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[#74caff]/25 bg-[#148be6]/10 text-[#74caff]">
                                <stat.icon className="h-5 w-5" />
                            </div>
                            <div className="text-4xl font-black text-white md:text-5xl">{stat.value}</div>
                            <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-400">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="mt-6">
                    <PaymentFlowGraphic />
                </motion.div>
            </div>
        </section>
    );
}
