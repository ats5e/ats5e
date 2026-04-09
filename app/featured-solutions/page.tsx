"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Database, Brain, Cloud, Bot, MessageSquare, Shield, LineChart, Landmark, Target, Workflow, Network, GraduationCap, type LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchCmsCollection, sortByDisplayOrder, type CmsSolution } from "@/lib/cms";
import { fadeUp } from "@/lib/motion";
import { SOLUTIONS, type SolutionSummary } from "@/lib/solutions";

const ICON_MAP: Record<string, LucideIcon> = {
  Database, Brain, Cloud, Bot, MessageSquare, Shield, LineChart, Landmark, Target, Workflow, Network, GraduationCap
};

export default function SolutionsPage() {
  const [solutions, setSolutions] = React.useState<SolutionSummary[]>(SOLUTIONS);

  React.useEffect(() => {
    fetchCmsCollection<CmsSolution>("solutions")
      .then((data) => {
        if (data.length > 0) {
          const formatted: SolutionSummary[] = sortByDisplayOrder(data).map((solution, i) => ({
            num: `${(i + 1).toString().padStart(2, '0')}`,
            slug: solution.slug,
            title: solution.title,
            tagline: solution.description,
            icon: ICON_MAP[solution.icon || ""] || Database,
          }));

          setSolutions(formatted);
        }
      })
      .catch((err) => console.log("Database fetch failed, using fallback static data.", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-20 px-6 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#148be6,transparent 70%)", filter: "blur(120px)" }}
        />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
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
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="relative w-full aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden hidden md:block" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <Image src="/imagery/enhanced_20250611_1315_Colorful Abstract Silhouette_remix_01jxf49bvafphv8c44nrefj7gm.png" alt="Colorful Abstract Silhouette" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-[#050505] opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[rgba(5,5,5,0.2)] to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* EduFlow360 Standalone Callout */}
      <section className="px-6 pb-20 mt-4">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            className="relative rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-center p-8 md:p-12 lg:p-16 gap-10"
            style={{
              background: "linear-gradient(135deg, rgba(20,139,230,0.08) 0%, rgba(5,5,5,0.4) 100%)",
              border: "1px solid rgba(20,139,230,0.15)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
            }}
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 80% at 0% 0%,rgba(20,139,230,0.12),transparent)" }}
            />
            
            <div className="flex-1 relative z-10 text-center md:text-left">
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#74caff] font-bold block mb-4">
                Specialized Vertical
              </span>
              <Image 
                src="/eduflow-partners/EduFlow 360 Logo PNG TM2.png" 
                alt="EduFlow360" 
                width={200} 
                height={50} 
                className="h-[32px] w-auto mx-auto md:mx-0 md:-ml-3 mb-6 drop-shadow-md opacity-90" 
              />
              <p className="text-[15px] font-medium text-zinc-300 leading-relaxed max-w-lg mb-8 mx-auto md:mx-0">
                Revolutionising the education sector. From student acquisition to alumni engagement, we empower institutions with comprehensive, AI-driven automation and human-centered design tailored exclusively for modern education.
              </p>
              <Link href="/eduflow360"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase text-white transition-all duration-300 hover:shadow-glow-blue-sm hover:-translate-y-0.5"
                style={{ background: "#148be6" }}
              >
                Discover EduFlow360 <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            
            <div className="flex-shrink-0 w-full md:w-[40%] xl:w-[45%] relative z-10 hidden md:block">
               <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Image src="/imagery/20251001_1701_Digital Maze Exploration_remix_01k6fxnxwte7h9y1rm338xmb37.png" alt="EduFlow Innovation" fill className="object-cover" />
                  <div className="absolute inset-0 bg-[#050505] opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-transparent to-[rgba(20,139,230,0.2)] opacity-80" />
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="py-8 px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((s, i) => {
            const Icon = s.icon;
            return (
              <React.Fragment key={s.num}>
                {i === 2 && (
                  <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                    className="relative rounded-2xl overflow-hidden hidden md:block w-full h-full min-h-[350px] lg:col-span-1"
                    style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <Image src="/imagery/enhanced_20251001_1651_Vibrant Silhouettes_remix_01k6fx3j62fwmt9sqk2sd41thx.png" alt="Vibrant Silhouettes" fill className="object-cover" />
                    <div className="absolute inset-0 bg-[#050505] opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60" />
                  </motion.div>
                )}
                <motion.div custom={i} variants={fadeUp} initial="hidden"
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
              </React.Fragment>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
