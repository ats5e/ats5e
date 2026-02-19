"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "@/lib/motion";

const SOLUTIONS = [
  { num: "01", slug: "Data-Infrastructure-Governance",    title: "Data Infrastructure & Governance",        tagline: "You can't control what you can't see. We make control visible." },
  { num: "02", slug: "AI-intelligence",                   title: "AI-Powered Decision Intelligence",        tagline: "Turn complexity into clarity." },
  { num: "03", slug: "Legacy-Modernisation",              title: "Legacy Modernisation & Cloud Evolution",  tagline: "Modernise without breaking." },
  { num: "04", slug: "Intelligent-Automation",            title: "Intelligent Automation & Agentic AI",    tagline: "From automation to autonomy." },
  { num: "05", slug: "ConversationalAI",                  title: "Conversational AI & Digital Assistants", tagline: "Service that feels human — at machine speed." },
  { num: "06", slug: "compliance-risk",                   title: "Compliance, Risk & Fraud Intelligence",  tagline: "The strongest control is the one you never notice." },
  { num: "07", slug: "Credit-Risk",                       title: "Credit Risk & Underwriting Intelligence", tagline: "Credit excellence is a discipline. We make it repeatable." },
  { num: "08", slug: "Treasury-Liquidity",                title: "Treasury & Liquidity Intelligence",      tagline: "When conditions shift, your liquidity posture should shift with them." },
  { num: "09", slug: "Human-Centred-Digital-Experience",  title: "Human-Centred Digital Experience",       tagline: "Experience turns a system into a habit." },
  { num: "10", slug: "transformation-execution",          title: "End-to-End Transformation Execution",   tagline: "We don't advise and walk away — we land the outcome." },
  { num: "11", slug: "Enterprise-Integration",            title: "Enterprise Integration & Workflow",      tagline: "Unify the disconnected." },
  { num: "12", slug: "education",                         title: "Tailored Education Solutions",           tagline: "Systems that make academic delivery, operations and finance work as one — delivered quietly, at speed." },
];

export default function SolutionsPage() {
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
            <span className="text-[10px] tracking-[0.35em] uppercase text-zinc-600 font-medium block mb-6">What We Do</span>
          </motion.div>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] mb-8"
          >
            OUR <span style={{ color: "#148be6" }}>SOLUTIONS.</span>
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-sm font-medium text-zinc-500 max-w-2xl leading-relaxed tracking-[0.02em]"
          >
            We don't just advise; we embed, execute, and guarantee the outcome — ensuring your strategic investment
            translates into a strategic advantage and better experiences for your customers, delivered seamlessly,
            securely, and at scale.
          </motion.p>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="py-8 px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOLUTIONS.map((s, i) => (
            <motion.div key={s.num} custom={i} variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            >
              <Link href={`/featured-solutions/${s.slug}`}
                className="group flex flex-col rounded-2xl p-7 h-full transition-all duration-300 hover:border-[#148be6]/30"
                style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-medium text-zinc-700 group-hover:text-[#148be6] transition-colors">{s.num}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-800 group-hover:text-[#148be6] transition-colors" />
                </div>
                <h2 className="text-base font-black uppercase leading-tight tracking-[-0.02em] mb-3 flex-1">{s.title}</h2>
                <p className="text-xs font-medium text-zinc-400 leading-relaxed tracking-[0.02em] group-hover:text-zinc-200 transition-colors">{s.tagline}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
