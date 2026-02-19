"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "@/lib/motion";

const FIVE_ES = [
  {
    slug: "experience",  number: "01", tag: "Experience",
    headline: "HUMAN.\nCENTERED.",
    detailsTitle: "Systems People Want to Use",
    tagline: "Human-centered digital experiences that are intuitive and engaging for both employees and customers.",
    stat: "$100 return per $1 invested in UX",
  },
  {
    slug: "empowerment", number: "02", tag: "Empowerment",
    headline: "DECIDE.\nSMARTER.",
    detailsTitle: "Turn Data into Control",
    tagline: "AI-driven solutions providing actionable intelligence at every level for smarter decisions and higher customer satisfaction.",
    stat: "GCC AI finance market → $1.7B by 2035",
  },
  {
    slug: "efficiency",  number: "03", tag: "Efficiency",
    headline: "AUTOMATE.\nEVERYTHING.",
    detailsTitle: "From Automation to Autonomy",
    tagline: "Intelligent automation to do more, faster and smarter, with less wasted effort — so you can focus on what matters most.",
    stat: "25–50% cost reduction",
  },
  {
    slug: "execution",   number: "04", tag: "Execution",
    headline: "VISION.\nDELIVERED.",
    detailsTitle: "Make the Outcome Real",
    tagline: "From strategy to delivery, flawlessly executed, ensuring the vision turns into real results that your customers will feel.",
    stat: "Outcome-based KPIs, not just milestones",
  },
  {
    slug: "evolution",   number: "05", tag: "Evolution",
    headline: "MODERNISE.\nFEARLESSLY.",
    detailsTitle: "Modernise Without Breaking",
    tagline: "Legacy modernization without the downtime, so you can scale up without disruption to your business or your customers.",
    stat: "64% of IT budgets lost to legacy maintenance",
  },
];

export default function FrameworkPage() {
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
            <span className="text-[12px] tracking-[0.35em] uppercase text-zinc-600 font-medium block mb-6">Core Framework</span>
          </motion.div>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] mb-8"
          >
            THE <span style={{ color: "#148be6" }}>5E</span><br />FRAMEWORK.
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-sm font-medium text-zinc-500 max-w-2xl leading-relaxed tracking-[0.02em]"
          >
            Our 5E Framework is our commitment to holistic, de-risked transformation. It ensures that technology,
            process, and people evolve together — turning ambition into a sustainable reality of improved operations
            and better customer experiences.
          </motion.p>
        </div>
      </section>

      {/* 5E Cards */}
      <section className="py-16 px-6 pb-32">
        <div className="max-w-7xl mx-auto space-y-5">
          {FIVE_ES.map((e, i) => (
            <motion.div key={e.slug} custom={i} variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            >
              <Link href={`/5e-framework/${e.slug}`}
                className="group flex flex-col md:flex-row md:items-center gap-8 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-[#148be6]/30"
                style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="shrink-0 flex items-center gap-6">
                  <span className="text-[12px] tracking-[0.28em] uppercase font-medium text-zinc-700 group-hover:text-[#148be6] transition-colors w-6">{e.number}</span>
                  <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] whitespace-pre-line group-hover:text-white transition-colors">
                    {e.headline}
                  </h2>
                </div>
                <div className="flex-1 md:pl-8" style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[12px] tracking-[0.2em] uppercase font-bold mb-2" style={{ color: "#148be6" }}>{e.tag} — {e.detailsTitle}</p>
                  <p className="text-sm text-zinc-500 leading-relaxed font-medium mb-4">{e.tagline}</p>
                  <p className="text-sm tracking-[0.15em] uppercase text-zinc-400 font-medium">{e.stat}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-[#148be6] transition-colors shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
