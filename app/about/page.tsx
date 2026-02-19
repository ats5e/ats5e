"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "@/lib/motion";

const LEADERSHIP = [
  {
    name: "William Higgins",
    photo: "/William.png",
    objectPos: "object-top",
    role: "Founder & CEO",
    bio: "William has spent the last decade deeply embedded in the GCC financial sector, partnering with all of the major banks in the region on their most critical transformation journeys. Built on a distinguished global career in senior C-suite roles at Natwest and ABN AMRO, where he managed multi-billion dollar P&Ls and teams of over 15,000 people.",
  },
  {
    name: "Gaurav Diwan",
    photo: "/Gaurav.png",
    objectPos: "object-[50%_38%]",
    role: "Founder & CTO",
    bio: "Gaurav leads the design and execution of enterprise-scale transformation for the financial services sector. With over 28 years of experience at global institutions like Barclays, Oracle, and ADCB, he specializes in applying Cloud, AI, and ML to de-risk transformation and build superior customer experiences.",
  },
  {
    name: "Jack Donaldson",
    photo: "/Jack.png",
    objectPos: "object-[50%_38%]",
    role: "Head of Marketing & Communications",
    bio: "A dynamic marketing and communications leader with a proven record of driving brand growth, elevating storytelling, and delivering measurable results across global markets. Experience spanning London, New York, and Sydney — blending creative vision with commercial precision for the world's leading banks and fintechs.",
  },
  {
    name: "Tchengiz Siddiqi",
    photo: "/Tchengiz.png",
    objectPos: "object-top",
    role: "Head of Sales",
    bio: "Leads commercial strategy across the GCC and South Pacific, forging partnerships with leading banks, enterprises, and government institutions. Bringing experience from Revolut in London, he combines deep fintech innovation expertise with a strategic approach to enterprise sales and digital transformation.",
  },
  {
    name: "Ayesha Azhar",
    photo: "/Ayesha.png",
    objectPos: "object-top",
    role: "Head of Operations",
    bio: "Brings over four years of experience establishing and managing best-in-class Project Management Offices, with a focus on quality assurance, governance, and stakeholder reporting. Her portfolio spans a global real estate firm, a government entity, and a MENA fintech start-up.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-44 pb-20 px-6">
        <div
          aria-hidden className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#148be6,transparent 70%)", filter: "blur(100px)" }}
        />
        <div className="max-w-7xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-[12px] tracking-[0.35em] uppercase text-zinc-600 font-medium block mb-6">
              About ATS5E
            </span>
          </motion.div>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.05em]"
          >
            LOW-PROFILE.<br />
            <span style={{ color: "#148be6" }}>HIGH-IMPACT.</span>
          </motion.h1>
        </div>
      </section>

      {/* ── Main Description ── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-xl font-medium text-zinc-300 leading-relaxed"
          >
            We are an exclusive technology partner for select financial institutions, government entities, and large enterprises in the UAE, GCC &amp; South Pacific who demand flawless execution.
          </motion.p>
          <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-sm text-zinc-500 leading-relaxed mb-5">
              We operate with quiet confidence behind the scenes, engineering the intelligent solutions that help leaders evolve, accelerate, and outperform in a high-stakes world.
            </p>
            <p className="text-sm text-zinc-500 leading-relaxed">
              We don&apos;t just advise; we embed with your teams to deliver tangible, lasting outcomes. Our reward is seeing your strategic vision realized and your customers benefit from the results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Approach + Commitment ── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              tag: "Our Approach",
              headline: "OPERATOR\nDNA.",
              body: "Our approach is shaped by decades of experience running mission-critical infrastructure for global banks. Our leadership team aren't just technologists; they are operators who understand the realities of risk, regulation, and enterprise-scale operations from the inside out.",
            },
            {
              tag: "Our Commitment",
              headline: "TRUST.\nBUILT IN.",
              body: "Discretion, integrity, and impact are the pillars of our culture. We deliberately maintain a low profile and let our results speak for themselves. By working with a select group of clients, we ensure every engagement receives senior-level attention and an unwavering commitment to success.",
            },
          ].map((block, i) => (
            <motion.div key={block.tag} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="rounded-2xl p-10"
              style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <span className="text-[12px] tracking-[0.3em] uppercase font-bold block mb-4" style={{ color: "#148be6" }}>{block.tag}</span>
              <h2 className="text-3xl font-black uppercase tracking-[-0.04em] leading-[0.88] whitespace-pre-line mb-6">{block.headline}</h2>
              <p className="text-sm text-white leading-relaxed">{block.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
            <span className="text-[12px] tracking-[0.32em] uppercase text-zinc-700 font-medium block mb-4">Leadership</span>
            <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black uppercase tracking-[-0.04em] leading-[0.92]">THE TEAM.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LEADERSHIP.map((person, i) => (
              <motion.div key={person.name} custom={i} variants={fadeUp} initial="hidden"
                whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                className="group rounded-2xl overflow-hidden transition-all duration-300"
                style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Headshot */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    className={`object-cover ${person.objectPos} transition-transform duration-500 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(5,5,5,0.8) 100%)" }} />
                </div>

                {/* Info */}
                <div className="p-8">
                  <div className="mb-5 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <p className="text-[12px] tracking-[0.24em] uppercase font-bold mb-2" style={{ color: "#148be6" }}>{person.role}</p>
                    <h3 className="text-lg font-black uppercase tracking-[-0.03em]">{person.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">{person.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="text-[12px] tracking-[0.35em] uppercase text-zinc-700 font-medium block mb-6">Partner With Us</span>
          <h2 className="text-[clamp(3rem,8vw,7rem)] font-black uppercase tracking-[-0.05em] leading-[0.88] mb-10">
            LET&rsquo;S{" "}
            <span style={{ background: "linear-gradient(125deg,#148be6,#74caff 55%,#148be6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              BUILD.
            </span>
          </h2>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase text-white transition-all duration-300 hover:shadow-glow-blue-sm"
            style={{ background: "#148be6" }}
          >
            Start the Conversation <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
