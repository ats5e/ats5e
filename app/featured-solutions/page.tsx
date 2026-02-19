"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "@/lib/motion";
import { SOLUTIONS } from "@/lib/solutions";

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
            <span className="text-[12px] tracking-[0.35em] uppercase text-zinc-600 font-medium block mb-6">What We Do</span>
          </motion.div>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] mb-8"
          >
            OUR <span style={{ color: "#148be6" }}>SOLUTIONS.</span>
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-sm font-medium text-zinc-500 max-w-2xl leading-relaxed tracking-[0.02em]"
          >
            We don&apos;t just advise; we embed, execute, and guarantee the outcome — ensuring your strategic investment
            translates into a strategic advantage and better experiences for your customers, delivered seamlessly,
            securely, and at scale.
          </motion.p>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="py-8 px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOLUTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.num} custom={i} variants={fadeUp} initial="hidden"
                whileInView="visible" viewport={{ once: true, margin: "-40px" }}
              >
                <Link href={`/featured-solutions/${s.slug}`}
                  className="group flex flex-col rounded-2xl p-7 h-full transition-all duration-300 hover:border-[#148be6]/30"
                  style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#148be6]/25 bg-[#148be6]/10 text-[#148be6] transition-colors duration-300 group-hover:bg-[#148be6]/20">
                        <Icon className="w-[18px] h-[18px]" />
                      </span>
                      <span className="text-[12px] tracking-[0.25em] uppercase font-medium text-zinc-700 group-hover:text-[#148be6] transition-colors">{s.num}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-800 group-hover:text-[#148be6] transition-colors" />
                  </div>
                  <h2 className="text-base font-black uppercase leading-tight tracking-[-0.02em] mb-3 flex-1">{s.title}</h2>
                  <p className="text-sm font-medium text-zinc-400 leading-relaxed tracking-[0.02em] group-hover:text-zinc-200 transition-colors">{s.tagline}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
