"use client";

import EduFlowNavbar from "@/components/EduFlowNavbar";
import EduFlowFooter from "@/components/EduFlowFooter";
import VaultsPayHero from "@/components/sections/VaultsPayHero";
import VaultsPayEcosystem from "@/components/sections/VaultsPayEcosystem";
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
                <VaultsPayEcosystem />
                <VaultsPayBreakthroughs />
                <VaultsPayComparison />
                <VaultsPayLifecycle />

                <section className="py-20 px-6 flex justify-center border-t border-white/5 relative z-10 bg-[#050505]">
                    <a 
                        href="/VaultsPay/VaultsPay EduFlow360 - One Pager.pdf" 
                        download
                        className="group inline-flex items-center gap-3 px-10 py-5 bg-[#148be6]/10 hover:bg-[#148be6]/20 border border-[#148be6]/30 hover:border-[#148be6]/50 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(20,139,230,0.1)] hover:shadow-[0_0_30px_rgba(20,139,230,0.2)]"
                    >
                        <Download className="w-5 h-5 text-[#74caff] transition-transform duration-300 group-hover:-translate-y-1" />
                        <span className="text-sm font-bold tracking-[0.15em] uppercase text-white">Download More Information</span>
                    </a>
                </section>

                <CTASection />
            </main>

            <EduFlowFooter />
        </div>
    );
}
