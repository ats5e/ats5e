"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { CASE_STUDIES } from "@/lib/case-studies-data";

const FEATURED_SLUGS = [
  "tier-1-bank-ai-transformation",
  "gcc-bank-contact-centre",
  "retail-bank-fraud-detection",
];

// "70% faster fraud intervention" -> ["70%", "faster fraud intervention"]
function splitMetric(metric: string): [string, string] {
  const match = metric.match(/^(\S*\d\S*)\s+(.*)$/);
  return match ? [match[1], match[2]] : ["", metric];
}

export default function FeaturedWork() {
  const featured = FEATURED_SLUGS.flatMap((slug) => (CASE_STUDIES[slug] ? [{ slug, ...CASE_STUDIES[slug] }] : []));

  if (featured.length === 0) return null;

  return (
    <section id="work" className="relative py-32 px-6">
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(20,139,230,0.2),transparent)" }}
      />
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
        >
          <div className="max-w-3xl">
            <span className="text-[12px] tracking-[0.32em] uppercase text-zinc-500 font-medium block mb-4">Proof, Not Promises</span>
            <h2 className="text-[clamp(2.4rem,6vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] mb-6">
              OUTCOMES WE&apos;VE <span style={{ color: "#148be6" }}>LANDED.</span>
            </h2>
            <p className="text-base font-medium text-zinc-300 leading-relaxed">
              Measurable results from banks and payment leaders across the GCC — delivered without disruption, exactly as committed.
            </p>
          </div>
          <Link href="/case-studies"
            className="inline-flex shrink-0 items-center gap-2 self-start lg:self-auto px-8 py-3 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase border border-white/[0.14] text-zinc-300 hover:text-white hover:border-white/[0.28] transition-all duration-300"
          >
            View All Case Studies <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {featured.map((cs, i) => (
            <motion.div key={cs.slug} custom={i} variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            >
              <Link href={`/case-studies/${cs.slug}`}
                className="group flex h-full flex-col rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "linear-gradient(160deg,rgba(20,139,230,0.08),rgba(255,255,255,0.015) 55%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[12px] tracking-[0.25em] uppercase font-bold text-[#74caff]">{cs.sector}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-[#148be6] transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-black uppercase leading-tight tracking-[-0.02em] mb-2">{cs.title}</h3>
                <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-zinc-500 mb-8">{cs.client}</p>

                <dl className="mt-auto space-y-5 border-t border-white/[0.08] pt-8">
                  {cs.metrics.map((metric) => {
                    const [value, label] = splitMetric(metric);
                    return (
                      <div key={metric} className="flex items-baseline gap-4">
                        {value ? (
                          <dt className="w-28 shrink-0 text-3xl font-black leading-none tracking-[-0.04em]" style={{
                            background: "linear-gradient(125deg,#3daeff 0%,#9fdbff 58%,#32a2f7 100%)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                          }}>
                            {value}
                          </dt>
                        ) : null}
                        <dd className="text-sm font-medium leading-snug text-zinc-300">{label}</dd>
                      </div>
                    );
                  })}
                </dl>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mid-page conversion point */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-3xl px-8 py-8"
          style={{ background: "rgba(20,139,230,0.07)", border: "1px solid rgba(20,139,230,0.22)" }}
        >
          <div>
            <p className="text-lg font-black uppercase tracking-[-0.02em] mb-1">Facing a similar challenge?</p>
            <p className="text-sm font-medium text-zinc-300">Talk to the team that delivered these outcomes. Thirty minutes, no obligation.</p>
          </div>
          <Link href="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 px-8 py-4 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase text-white transition-all duration-300 hover:shadow-glow-blue-sm"
            style={{ background: "#148be6" }}
          >
            Book a Conversation <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
