"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "@/lib/motion";

const CASE_STUDIES = [
  { slug: "tier-1-bank-ai-transformation",      num: "01", title: "AI-Enabled Transformation",        client: "Tier 1 UAE Bank",          metrics: ["70% faster fraud intervention", "50% reduction in compliance costs", "25% faster issue resolution"] },
  { slug: "saudi-bank-enterprise-pmo",           num: "02", title: "Enterprise PMO",                   client: "Leading Saudi Bank",        metrics: ["230+ branches served", "4 capability gaps addressed", "1 bank-wide EPMO established"] },
  { slug: "ksa-stack-card-acquirer",             num: "03", title: "Cloud-Native KSA Stack",           client: "Regional Card Acquirer",     metrics: ["3 environments delivered", "5 product domains enabled", "2 certifications achieved"] },
  { slug: "abu-dhabi-bank-offshoring",           num: "04", title: "IT & Operations Offshoring",       client: "Abu Dhabi Bank",            metrics: ["60 days to regulatory approval", "0 re-submissions", "In-year savings realized"] },
  { slug: "gcc-bank-contact-centre",             num: "05", title: "Contact Centre Modernisation",     client: "Leading GCC Retail Bank",   metrics: ["60–70% reduction in call volume", "40% faster handling time", "24% CSAT improvement"] },
  { slug: "gcc-bank-treasury",                   num: "06", title: "Treasury Operations Modernisation", client: "Leading Regional Bank",    metrics: ["80% faster reconciliation", "20% lower operational risk", "100% real-time reporting"] },
  { slug: "retail-bank-fraud-detection",         num: "07", title: "Fraud Detection Automation",       client: "Leading Retail Bank",       metrics: ["30% reduction in fraud losses", "40% fewer false positives", "2x faster case resolution"] },
  { slug: "islamic-bank-digital-onboarding",     num: "08", title: "Digital Onboarding",               client: "Leading Islamic Bank",      metrics: ["85% faster onboarding", "50% increase in digital sign-ups", "100% automated compliance"] },
  { slug: "abu-dhabi-government-shared-services",num: "09", title: "Shared Services Transformation",   client: "Abu Dhabi Government",      metrics: ["40% faster service delivery", "25 services automated", "25% higher satisfaction"] },
  { slug: "investment-bank-credit-risk",         num: "10", title: "AI Credit Risk Management",        client: "Leading Investment Bank",   metrics: ["60% faster credit approvals", "25% reduction in exposure variance", "100% unified visibility"] },
  { slug: "islamic-bank-trade-surveillance",     num: "11", title: "Trade Surveillance Automation",    client: "Leading Islamic Bank",      metrics: ["95% surveillance coverage", "100% compliance alignment", "<30s alert triage"] },
  { slug: "regional-fi-regulatory-reporting",    num: "12", title: "Regulatory Reporting Automation",  client: "Regional Financial Institution", metrics: ["90% reduction in prep time", "100% compliance accuracy", "50% faster submissions"] },
  { slug: "gcc-investment-group-data",           num: "13", title: "Cloud Data Infrastructure",        client: "Leading Investment Group",  metrics: ["40% faster analytics", "20% data accuracy improvement", "100% governance compliance"] },
  { slug: "uae-bank-digital-collections",        num: "14", title: "Digital Collections & Recovery",   client: "Leading UAE Bank",          metrics: ["20% reduction in NPL ratio", "30% faster case resolution", "15% recovery efficiency gain"] },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-20 px-6">
        <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#148be6,transparent 70%)", filter: "blur(120px)" }}
        />
        <div className="max-w-7xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-[10px] tracking-[0.35em] uppercase text-zinc-600 font-medium block mb-6">Proof of Work</span>
          </motion.div>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] mb-8"
          >
            CASE <span style={{ color: "#148be6" }}>STUDIES.</span>
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-sm font-medium text-zinc-500 max-w-2xl leading-relaxed"
          >
            Real transformations. Real results. Every engagement below represents a complex challenge
            solved with precision, speed, and lasting impact.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-8 px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {CASE_STUDIES.map((cs, i) => (
            <motion.div key={cs.slug} custom={i} variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            >
              <Link href={`/case-studies/${cs.slug}`}
                className="group flex flex-col rounded-2xl p-8 h-full transition-all duration-300 hover:border-[#148be6]/30"
                style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-medium text-zinc-700 group-hover:text-[#148be6] transition-colors">{cs.num}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-800 group-hover:text-[#148be6] transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-2" style={{ color: "#148be6" }}>{cs.client}</p>
                  <h2 className="text-xl font-black uppercase tracking-[-0.03em] leading-tight mb-6">{cs.title}</h2>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {cs.metrics.map((m, mi) => (
                    <div key={mi}>
                      <p className="text-[10px] text-zinc-600 leading-relaxed font-medium group-hover:text-zinc-500 transition-colors">{m}</p>
                    </div>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
