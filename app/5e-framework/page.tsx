"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "@/lib/motion";

const FIVE_ES = [
  {
    slug: "experience", number: "01", tag: "Experience",
    headline: "HUMAN.\nCENTERED.",
    detailsTitle: "Systems People Want to Use",
    tagline: "Human-centered digital experiences that are intuitive and engaging for both employees and customers.",
    stat: "$100 return per $1 invested in UX",
    image: "/imagery/20250611_1248_Digital Face Fragmentation_remix_01jxf2pkzge3kvndx2fe71bc6h.png"
  },
  {
    slug: "empowerment", number: "02", tag: "Empowerment",
    headline: "DECIDE.\nSMARTER.",
    detailsTitle: "Turn Data into Control",
    tagline: "AI-driven solutions providing actionable intelligence at every level for smarter decisions and higher customer satisfaction.",
    stat: "GCC AI finance market → $1.7B by 2035",
    image: "/imagery/20251001_1708_High-Resolution Light Trails_remix_01k6fy2teaf8jrf1krgs91zpns.png"
  },
  {
    slug: "efficiency", number: "03", tag: "Efficiency",
    headline: "AUTOMATE.\nEVERYTHING.",
    detailsTitle: "From Automation to Autonomy",
    tagline: "Intelligent automation to do more, faster and smarter, with less wasted effort — so you can focus on what matters most.",
    stat: "25–50% cost reduction",
    image: "/imagery/20251001_1704_Digital Silhouette_remix_01k6fxwevhfpytbf4bx4s4gfza.png"
  },
  {
    slug: "execution", number: "04", tag: "Execution",
    headline: "VISION.\nDELIVERED.",
    detailsTitle: "Make the Outcome Real",
    tagline: "From strategy to delivery, flawlessly executed, ensuring the vision turns into real results that your customers will feel.",
    stat: "Outcome-based KPIs, not just milestones",
    image: "/imagery/enhanced_20251001_1650_Futuristic Digital Silhouette_remix_01k6fx1sj8ee5rjeed3pt4mdsh.png"
  },
  {
    slug: "evolution", number: "05", tag: "Evolution",
    headline: "MODERNISE.\nFEARLESSLY.",
    detailsTitle: "Modernise Without Breaking",
    tagline: "Legacy modernization without the downtime, so you can scale up without disruption to your business or your customers.",
    stat: "64% of IT budgets lost to legacy maintenance",
    image: "/imagery/20251001_1710_High-Resolution Regeneration_remix_01k6fy6mzfemqtbq24ya38djw1.png"
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
                className="group relative flex flex-col md:flex-row md:items-center gap-8 rounded-[32px] overflow-hidden transition-all duration-300 hover:border-[#148be6]/50 min-h-[300px]"
                style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(5,5,5,0.4)" }}
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-y-0 right-0 w-full md:w-[65%]">
                    <Image src={e.image} alt={e.headline} fill className="object-cover opacity-60 md:opacity-100 transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 md:via-[#050505]/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80" />
                  </div>
                </div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center p-8 md:p-12 gap-8 w-full">
                  <div className="shrink-0 flex items-center gap-6 md:w-[35%]">
                    <span className="text-[12px] tracking-[0.28em] uppercase font-medium text-zinc-500 group-hover:text-[#148be6] transition-colors w-6">{e.number}</span>
                    <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] whitespace-pre-line group-hover:text-white transition-colors">
                      {e.headline}
                    </h2>
                  </div>
                  <div className="flex-1 md:pl-10 max-w-xl" style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
                    <p className="text-[12px] tracking-[0.2em] uppercase font-bold mb-3 text-[#148be6]">{e.tag} — {e.detailsTitle}</p>
                    <p className="text-[15px] text-zinc-300 leading-relaxed font-medium mb-5">{e.tagline}</p>
                    <p className="text-[13px] tracking-[0.15em] uppercase text-zinc-400 font-bold">{e.stat}</p>
                  </div>
                  <div className="hidden md:flex ml-auto items-center justify-center w-14 h-14 rounded-full border border-white/10 group-hover:border-[#148be6]/50 transition-colors backdrop-blur-md bg-[#050505]/40 shadow-xl shrink-0">
                    <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-[#148be6] transition-colors" />
                  </div>
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
