"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "@/lib/motion";

const INSIGHTS = [
  {
    slug: "a2a-instant-payments-gcc",
    tag: "Payments",
    title: "A2A & Instant Payments in the GCC",
    subtitle: "From Launches to Full-Funnel Value",
    excerpt: "Account-to-account and instant-payment rails are moving from pilot to scale across the GCC, reshaping how consumers pay and how banks monetize. By 2028, real-time payments are forecast to add $285.8B to global GDP.",
  },
  {
    slug: "agentic-ai-task-to-outcome",
    tag: "AI & Automation",
    title: "From Doing Tasks to Achieving Outcomes",
    subtitle: "The Next Evolution: Agentic AI",
    excerpt: "Agentic AI represents a paradigm shift from doing to achieving. Instead of following a rigid script, an AI Agent is given a goal and empowered to reason, plan, and execute across multiple systems.",
  },
  {
    slug: "iso-20022-data-dividend",
    tag: "Regulation",
    title: "ISO 20022: The Data Dividend",
    subtitle: "A 2025 Deadline You Can't Miss",
    excerpt: "The SWIFT CBPR+ coexistence period ends in November 2025. Institutions that treat ISO 20022 as a compliance project miss material value in fraud reduction and customer analytics.",
  },
  {
    slug: "agentic-ai-tco-efficiency",
    tag: "AI & Automation",
    title: "Redefining Operational Efficiency and TCO",
    subtitle: "Targeting the Cognitive Work RPA Can't Touch",
    excerpt: "The business case for Agentic AI goes far beyond incremental cost savings — it fundamentally resets the cost curve for complex operations and redefines Total Cost of Ownership.",
  },
  {
    slug: "agentic-ai-risk-compliance",
    tag: "Risk & Compliance",
    title: "The Control Imperative for a Real-Time World",
    subtitle: "Moving Beyond the 90% False Positive Problem",
    excerpt: "Financial institutions faced $4.6 billion in AML-related penalties in 2024. Traditional monitoring produces ~90% false positives. Agentic AI provides continuous, proactive guardianship.",
  },
  {
    slug: "whitepaper-bots-to-business",
    tag: "Whitepaper",
    title: "From Bots to Business Value",
    subtitle: "The Executive Blueprint for Agentic AI at Scale",
    excerpt: "Despite significant investment, only 3% of organizations have successfully scaled automation. This whitepaper provides the executive blueprint to move beyond tactical RPA and scale true Agentic AI.",
  },
];

export default function InsightsPage() {
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
            <span className="text-[10px] tracking-[0.35em] uppercase text-zinc-600 font-medium block mb-6">Thinking & Analysis</span>
          </motion.div>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] mb-8"
          >
            LATEST <span style={{ color: "#148be6" }}>INSIGHTS.</span>
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-sm font-medium text-zinc-500 max-w-2xl leading-relaxed"
          >
            We cut through the noise to provide actionable analysis on the technology and regulatory trends
            that matter most in the GCC — helping you navigate complexity and turn industry shifts into
            strategic advantages.
          </motion.p>
        </div>
      </section>

      {/* Insights grid */}
      <section className="py-8 px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INSIGHTS.map((insight, i) => (
            <motion.div key={insight.slug} custom={i} variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            >
              <Link href={`/insight/${insight.slug}`}
                className="group flex flex-col rounded-2xl p-8 h-full transition-all duration-300 hover:border-[#148be6]/30"
                style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[10px] tracking-[0.22em] uppercase font-bold" style={{ color: "#148be6" }}>{insight.tag}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-800 group-hover:text-[#148be6] transition-colors" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-black uppercase tracking-[-0.03em] leading-tight mb-2">{insight.title}</h2>
                  <p className="text-xs tracking-[0.08em] text-zinc-400 font-medium mb-4">{insight.subtitle}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium group-hover:text-white transition-colors">{insight.excerpt}</p>
                </div>
                <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="text-xs tracking-[0.2em] uppercase font-bold text-zinc-500 group-hover:text-[#148be6] transition-colors">
                    Read More
                  </span>
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
