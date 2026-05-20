"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import type { LucideIcon } from "lucide-react";
import { BadgePercent, CreditCard, Link2, QrCode, WalletCards } from "lucide-react";

type PaymentRail = {
    name: string;
    eyebrow: string;
    metric: string;
    description: string;
    icon: LucideIcon;
    bullets: string[];
};

const PAYMENT_RAILS: PaymentRail[] = [
    {
        name: "On-Us Wallet",
        eyebrow: "Parent wallet to school wallet",
        metric: "Up to 50% lower transaction fees",
        description: "Families pay tuition, books, transport and trips from one app, with real-time movement between the parent wallet and the school wallet.",
        icon: WalletCards,
        bullets: [
            "No bank interchange on wallet-to-wallet transfers",
            "Instant settlement with no manual receipts",
            "Individual IBANs, multi-currency wallets and prepaid card access",
        ],
    },
    {
        name: "VaultsPay Card Tap",
        eyebrow: "School checkout and campus terminals",
        metric: "30% less in card-present fees",
        description: "Parents and students use physical or virtual VaultsPay cards on Smart POS terminals for reception, canteen, events and high-volume payment moments.",
        icon: CreditCard,
        bullets: [
            "NFC, chip and QR acceptance on VaultsPay terminals",
            "Specialised education pricing the school keeps",
            "Fast checkout during peak school payment windows",
        ],
    },
    {
        name: "Any Card Welcome",
        eyebrow: "No parent forced into one channel",
        metric: "100% automatic reconciliation",
        description: "Families can still use any bank debit or credit card, online payment link, QR code or native wallet - while the school still gets clean matching.",
        icon: QrCode,
        bullets: [
            "Apple Pay, Google Pay and Samsung Pay accepted natively",
            "Secure payment links for remote fee collection",
            "Every transaction is matched to school systems in real time",
        ],
    },
];

export default function VaultsPayBreakthroughs() {
    return (
        <section id="payment-rails" className="relative z-10 px-4 py-24 md:px-8">
            <div className="mx-0 w-full max-w-[340px] sm:mx-auto sm:max-w-7xl">
                <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14 max-w-3xl">
                    <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-[#74caff]">Three ways to pay</span>
                    <h2 className="text-[2rem] font-black uppercase leading-none tracking-normal text-white md:text-6xl">
                        Payment choice without finance chaos.
                    </h2>
                    <p className="mt-6 text-lg font-medium leading-relaxed text-zinc-400">
                        Schools do not need another disconnected payment option. They need every payment type to land in one reconciled operating flow.
                    </p>
                </motion.div>

                <div className="grid gap-5 lg:grid-cols-3">
                    {PAYMENT_RAILS.map((rail, index) => (
                        <motion.article
                            key={rail.name}
                            custom={index + 2}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="group flex h-full min-w-0 flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-7 transition hover:border-[#74caff]/40 hover:bg-white/[0.055]"
                        >
                            <div className="mb-8 flex items-start justify-between gap-5">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#148be6]/[0.12] text-[#74caff] ring-1 ring-[#74caff]/20">
                                    <rail.icon className="h-6 w-6" />
                                </div>
                                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
                                    0{index + 1}
                                </span>
                            </div>

                            <span className="break-words text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">{rail.eyebrow}</span>
                            <h3 className="mt-3 text-2xl font-black uppercase tracking-normal text-white">{rail.name}</h3>
                            <p className="mt-3 text-base font-bold text-[#74caff]">{rail.metric}</p>
                            <p className="mt-5 text-sm font-medium leading-relaxed text-zinc-400">{rail.description}</p>

                            <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
                                {rail.bullets.map((bullet) => (
                                    <li key={bullet} className="flex gap-3 text-sm font-medium leading-relaxed text-zinc-300">
                                        <BadgePercent className="mt-0.5 h-4 w-4 shrink-0 text-[#74caff]" />
                                <span className="min-w-0">{bullet}</span>
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
                    className="mt-8 rounded-2xl border border-[#148be6]/20 bg-[#148be6]/[0.08] p-6 md:flex md:items-center md:justify-between md:gap-8"
                >
                    <div>
                        <h3 className="text-xl font-bold text-white">The school keeps parent choice and gains one source of truth.</h3>
                        <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-zinc-400">
                            Wallet, card tap, online link and QR payments all feed the same reconciliation layer, so finance teams no longer chase receipts across separate channels.
                        </p>
                    </div>
                    <div className="mt-5 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-[#74caff] md:mt-0">
                        <Link2 className="h-4 w-4" />
                        Unified collection flow
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
