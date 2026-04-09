"use client";

import EduFlowNavbar from "@/components/EduFlowNavbar";
import EduFlowFooter from "@/components/EduFlowFooter";

// Sections
import HeroSection from "@/components/sections/HeroSection";
import ChallengeSection from "@/components/sections/ChallengeSection";
import SolutionSection from "@/components/sections/SolutionSection";
import JourneySection from "@/components/sections/JourneySection";
import BuyerPersonaSection from "@/components/sections/BuyerPersonaSection";
import PillarsSection from "@/components/sections/PillarsSection";
import ValueSection from "@/components/sections/ValueSection";
import DNASection from "@/components/sections/DNASection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import PartnersSection from "@/components/sections/PartnersSection";
import RoadmapSection from "@/components/sections/RoadmapSection";
import CTASection from "@/components/sections/CTASection";

export default function EduFlow360Page() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <EduFlowNavbar />

      <main>
        <HeroSection />
        <ChallengeSection />
        <SolutionSection />
        <JourneySection />
        <BuyerPersonaSection />
        <PillarsSection />
        <RoadmapSection />
        <ValueSection />
        <DNASection />
        <EcosystemSection />
        <PartnersSection />
        <CTASection />
      </main>

      <EduFlowFooter />
    </div>
  );
}
