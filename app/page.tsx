"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "@/lib/motion";
import { SOLUTIONS } from "@/lib/solutions";

// ─── Content ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: "25–50%", label: "Lower Operating Costs"        },
  { value: "248%",   label: "ROI on Enterprise Automation" },
  { value: "+30%",   label: "Increase in Productivity"     },
];

const FIVE_ES = [
  {
    id: "experience", number: "01", tag: "Experience",
    headline: "HUMAN.\nCENTERED.",
    tagline: "Human-centered digital experiences that are intuitive and engaging for both employees and customers.",
  },
  {
    id: "empowerment", number: "02", tag: "Empowerment",
    headline: "DECIDE.\nSMARTER.",
    tagline: "AI-driven solutions providing actionable intelligence at every level for smarter decisions and higher customer satisfaction.",
  },
  {
    id: "efficiency", number: "03", tag: "Efficiency",
    headline: "AUTOMATE.\nEVERYTHING.",
    tagline: "Intelligent automation to do more, faster and smarter, with less wasted effort—so you can focus on what matters most: your customer.",
  },
  {
    id: "execution", number: "04", tag: "Execution",
    headline: "VISION.\nDELIVERED.",
    tagline: "From strategy to delivery, flawlessly executed, ensuring the vision turns into real results that your customers will feel.",
  },
  {
    id: "evolution", number: "05", tag: "Evolution",
    headline: "MODERNISE.\nFEARLESSLY.",
    tagline: "Legacy modernization without the downtime, so you can scale up without disruption to your business or your customers.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <StatsBar />
      <FiveESection />
      <SolutionsSection />
      <Testimonial />
      <LetsBuildCTA />
      <Footer />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
      <BreathingGlow />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="inline-flex items-center gap-4 mb-10"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#148be6]/70" />
          <span className="text-[12px] tracking-[0.35em] uppercase text-zinc-600 font-medium">
            The 5E Framework
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#148be6]/70" />
        </motion.div>

        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-[clamp(3rem,8.5vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.05em]"
        >
          <span className="block text-white">INTELLIGENCE.</span>
          <span className="block" style={{
            background: "linear-gradient(125deg,#148be6 0%,#74caff 55%,#148be6 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            APPLIED.
          </span>
        </motion.h1>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-10 max-w-3xl mx-auto space-y-3 text-center"
        >
          <p className="text-lg md:text-xl font-black uppercase tracking-[-0.02em] text-white leading-tight">
            We are a specialist execution partner for forward-thinking enterprises in the GCC &amp; South Pacific.
          </p>
        </motion.div>

        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/5e-framework"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase text-white transition-all duration-300 hover:shadow-glow-blue-sm"
            style={{ background: "#148be6" }}
          >
            Explore The 5 Es
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase text-zinc-600 border border-white/[0.08] hover:text-white hover:border-white/[0.18] transition-all duration-300"
          >
            Contact Us
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-24 flex justify-center"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-4 h-4 text-zinc-800" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function BreathingGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.13, 0.26, 0.13] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(20,139,230,0.9) 0%,rgba(20,139,230,0.3) 45%,transparent 70%)", filter: "blur(70px)" }}
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.07, 0.15, 0.07], x: [0, 60, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute w-[450px] h-[450px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(100,190,255,0.7) 0%,transparent 70%)", filter: "blur(90px)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.6, 1], opacity: [0.05, 0.1, 0.05], x: [-40, 20, -40], y: [30, -30, 30] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute w-[320px] h-[320px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(20,139,230,0.5) 0%,transparent 70%)", filter: "blur(110px)" }}
      />
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section className="px-6 py-0">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="rounded-2xl grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]"
          style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {STATS.map((s, i) => (
            <motion.div key={s.label} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-col items-center justify-center px-10 py-10 text-center gap-2"
            >
              <span className="text-[clamp(2rem,4vw,3rem)] font-black leading-none tracking-[-0.04em]" style={{
                background: "linear-gradient(125deg,#148be6 0%,#74caff 60%,#148be6 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                {s.value}
              </span>
              <span className="text-sm font-medium tracking-[0.18em] uppercase text-zinc-400">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 5E Section ───────────────────────────────────────────────────────────────
function FiveESection() {
  return (
    <section id="five-es" className="relative py-32 px-6">
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(20,139,230,0.3),transparent)" }}
      />
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          className="mb-20 max-w-3xl"
        >
          <span className="text-[12px] tracking-[0.32em] uppercase text-zinc-700 font-medium block mb-4">Core Framework</span>
          <h2 className="text-[clamp(2.4rem,6vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] mb-8">
            THE <span style={{ color: "#148be6" }}>5E</span> FRAMEWORK.
          </h2>
          <p className="text-base font-medium text-zinc-300 leading-relaxed">
            Our 5E Framework is our commitment to holistic, de-risked transformation. It ensures that technology,
            process, and people evolve together — turning ambition into a sustainable reality of improved operations
            and better customer experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FIVE_ES.slice(0, 3).map((e, i) => <TiltCard key={e.id} card={e} index={i} />)}
          <TiltCard card={FIVE_ES[3]} index={3} className="md:col-span-2" />
          <TiltCard card={FIVE_ES[4]} index={4} />
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <Link href="/5e-framework"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase border border-white/[0.1] text-zinc-500 hover:text-white hover:border-white/[0.2] transition-all duration-300"
          >
            View Full Framework <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Tilt Card ────────────────────────────────────────────────────────────────
interface CardData { id: string; number: string; tag: string; headline: string; tagline: string; }

function TiltCard({ card, index, className = "" }: { card: CardData; index: number; className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tilt,    setTilt]    = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top)  / rect.height;
    setTilt({ x: (0.5 - ny) * 16, y: (nx - 0.5) * 22 });
    setGlowPos({ x: nx * 100, y: ny * 100 });
  };

  const transform = hovered
    ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.03,1.03,1.03)`
    : `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
  const transition = !hovered ? "transform 0.65s cubic-bezier(0.22,1,0.36,1)" : "transform 0.09s linear";

  return (
    <motion.div custom={index} variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: "-60px" }} className={className}
    >
      <Link href={`/5e-framework/${card.id}`} className="block h-full">
        <div ref={wrapperRef} onMouseMove={onMouseMove}
          onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
          onMouseEnter={() => setHovered(true)}
          style={{
            transform, transition,
            background: hovered
              ? "linear-gradient(135deg,rgba(20,139,230,0.55),rgba(20,139,230,0.06) 50%,rgba(20,139,230,0.35))"
              : "linear-gradient(135deg,rgba(255,255,255,0.13),rgba(255,255,255,0.02) 50%,rgba(255,255,255,0.07))",
            padding: "1px", borderRadius: "20px", willChange: "transform", height: "100%",
          }}
        >
          <div className="relative rounded-[19px] overflow-hidden flex flex-col" style={{ background: "#0a0a0a", minHeight: "290px", height: "100%" }}>
            <div className="absolute inset-0 topo-pattern transition-opacity duration-700" style={{ opacity: hovered ? 1 : 0 }} />
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[19px]" style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%,rgba(20,139,230,0.13) 0%,transparent 60%)`,
            }} />
            <div className="relative z-10 p-8 flex flex-col h-full" style={{ minHeight: "290px" }}>
              <div className="flex items-center justify-between mb-auto">
                <span className="text-[12px] tracking-[0.28em] uppercase font-medium transition-colors duration-300"
                  style={{ color: hovered ? "#148be6" : "rgba(255,255,255,0.18)" }}>{card.number}</span>
                <span className="text-[12px] tracking-[0.22em] uppercase font-bold transition-colors duration-300"
                  style={{ color: hovered ? "rgba(20,139,230,0.65)" : "rgba(255,255,255,0.05)" }}>{card.tag}</span>
              </div>
              <div className="flex-1 flex items-center py-6">
                <h3 className="text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] whitespace-pre-line">
                  {card.headline}
                </h3>
              </div>
              <div className="pt-5 mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <p className="text-[12px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: "#148be6" }}>{card.tag}</p>
                <p className="text-sm font-medium leading-relaxed tracking-[0.04em] transition-colors duration-300"
                  style={{ color: hovered ? "rgb(228 228 231)" : "rgb(113 113 122)" }}>{card.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Solutions Section ────────────────────────────────────────────────────────
function SolutionsSection() {
  return (
    <section id="solutions" className="relative py-32 px-6">
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(20,139,230,0.2),transparent)" }}
      />
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          className="mb-20 max-w-3xl"
        >
          <span className="text-[12px] tracking-[0.32em] uppercase text-zinc-700 font-medium block mb-4">What We Do</span>
          <h2 className="text-[clamp(2.4rem,6vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] mb-8">
            OUR <span style={{ color: "#148be6" }}>SOLUTIONS.</span>
          </h2>
          <p className="text-base font-medium text-zinc-300 leading-relaxed">
            We don&apos;t just advise; we embed, execute, and guarantee the outcome — ensuring your strategic
            investment translates into a strategic advantage and better experiences for your customers,
            delivered seamlessly, securely, and at scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOLUTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.num} custom={i} variants={fadeUp} initial="hidden"
                whileInView="visible" viewport={{ once: true, margin: "-40px" }}
              >
                <Link href={`/featured-solutions/${s.slug}`}
                  className="group block rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#148be6]/25 bg-[#148be6]/10 text-[#148be6] transition-colors duration-300 group-hover:bg-[#148be6]/20">
                        <Icon className="w-[18px] h-[18px]" />
                      </span>
                      <span className="text-[12px] tracking-[0.25em] uppercase font-medium text-zinc-600 group-hover:text-[#148be6] transition-colors duration-300">
                        {s.num}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-800 group-hover:text-[#148be6] transition-colors duration-300" />
                  </div>
                  <h3 className="text-base font-black uppercase leading-tight tracking-[-0.02em] mb-3 group-hover:text-white transition-colors duration-300" style={{ fontWeight: 900 }}>
                    {s.title}
                  </h3>
                  <p className="text-sm font-medium text-zinc-400 leading-relaxed tracking-[0.02em] group-hover:text-zinc-200 transition-colors duration-300">
                    {s.tagline}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <Link href="/featured-solutions"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase border border-white/[0.1] text-zinc-500 hover:text-white hover:border-white/[0.2] transition-all duration-300"
          >
            View All Solutions <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonial ──────────────────────────────────────────────────────────────
function Testimonial() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <div className="mb-8">
            <span className="h-px w-20 bg-gradient-to-r from-transparent via-[#148be6]/50 to-transparent inline-block" />
          </div>
          <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-300 tracking-[-0.01em] mb-8">
            &ldquo;In a sector where large-scale transformation is synonymous with disruption, ATS5E delivered
            the opposite. Their deep banking DNA meant they understood our risks from day one, and their team
            provided flawless execution from start to finish. They turned a complex roadmap into a stable,
            scalable reality — without the usual headaches. They are the execution partner you can trust.&rdquo;
          </blockquote>
          <p className="text-[13px] tracking-[0.22em] uppercase text-zinc-600 font-medium">
            CIO, Leading UAE Bank
          </p>
          <div className="mt-8">
            <span className="h-px w-20 bg-gradient-to-r from-transparent via-[#148be6]/50 to-transparent inline-block" />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          custom={1} className="mt-12"
        >
          <Link href="/case-studies"
            className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.18em] uppercase text-zinc-600 hover:text-white transition-colors duration-300"
          >
            View Case Studies <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Let's Build CTA ──────────────────────────────────────────────────────────
function LetsBuildCTA() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="relative rounded-3xl overflow-hidden text-center px-8 py-24"
          style={{
            background: "linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div aria-hidden className="absolute inset-0 topo-pattern opacity-40" />
          <div aria-hidden className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%,rgba(20,139,230,0.12),transparent)" }}
          />
          <div className="relative z-10">
            <span className="text-[12px] tracking-[0.35em] uppercase text-zinc-600 font-medium block mb-6">
              Partner With Us
            </span>
            <h2 className="text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] mb-8">
              LET&rsquo;S{" "}
              <span style={{
                background: "linear-gradient(125deg,#148be6 0%,#74caff 55%,#148be6 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>BUILD.</span>
            </h2>
            <p className="text-sm font-medium text-zinc-500 max-w-md mx-auto leading-relaxed tracking-[0.03em] mb-10">
              Partner with us to unlock new possibilities with our exclusive solutions.
              Transformation begins with a single conversation.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase text-white transition-all duration-300 hover:shadow-glow-blue-sm"
              style={{ background: "#148be6" }}
            >
              Start the Conversation <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
