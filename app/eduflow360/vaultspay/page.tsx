"use client";

import EduFlowNavbar from "@/components/EduFlowNavbar";
import EduFlowFooter from "@/components/EduFlowFooter";
import VaultsPayHero from "@/components/sections/VaultsPayHero";
import VaultsPayBreakthroughs from "@/components/sections/VaultsPayBreakthroughs";
import VaultsPayComparison from "@/components/sections/VaultsPayComparison";
import VaultsPayLifecycle from "@/components/sections/VaultsPayLifecycle";
import CTASection from "@/components/sections/CTASection";
import { Download } from "lucide-react";

export default function VaultsPayPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
            <EduFlowNavbar />

            <main>
                <VaultsPayHero />
                <VaultsPayBreakthroughs />
                <VaultsPayComparison />
                <VaultsPayLifecycle />

                <section className="relative z-10 border-y border-white/10 bg-[#080808] px-6 py-12">
                    <div className="mx-auto flex max-w-5xl justify-center">
                        <a
                            href="/VaultsPay/ATS5E-VaultsPay-School-Payments-Brochure.pdf"
                            download
                            className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#148be6]/[0.35] bg-[#148be6]/[0.12] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#74caff]/60 hover:bg-[#148be6]/20"
                        >
                            <Download className="h-5 w-5 text-[#74caff] transition-transform duration-300 group-hover:-translate-y-1" />
                            Download brochure
                        </a>
                    </div>
                </section>

                <CTASection />
            </main>

            <EduFlowFooter />
        </div>
    );
}
