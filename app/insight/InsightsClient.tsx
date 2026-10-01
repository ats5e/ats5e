"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createInsightExcerpt, fetchCmsCollection, formatInsightDate, logCmsFallback, mergeInsightLists, type CmsInsight } from "@/lib/cms";
import { fadeUp } from "@/lib/motion";

type InsightCard = {
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  excerpt: string;
  dateLabel: string;
};


function formatInsights(data: CmsInsight[]): InsightCard[] {
  return data.map((item) => ({
      slug: item.slug,
      tag: item.category || "Insight",
      title: item.title,
      subtitle: item.summary || "",
      excerpt: createInsightExcerpt(item.bodyContent, item.summary),
      dateLabel: formatInsightDate(item.date),
    }));
}

type InsightsClientProps = {
  initialInsights: CmsInsight[] | null;
  fallbackInsights: CmsInsight[];
  libraryInsights: CmsInsight[];
};

export default function InsightsClient({ initialInsights, fallbackInsights, libraryInsights }: InsightsClientProps) {
  const [insights, setInsights] = React.useState<InsightCard[]>(() => {
    const formatted = initialInsights ? formatInsights(initialInsights) : [];
    return formatted.length > 0 ? formatted : formatInsights(fallbackInsights);
  });

  React.useEffect(() => {
    // Server already supplied CMS data; only fetch in the browser when it could not.
    if (initialInsights) return;
    fetchCmsCollection<CmsInsight>("insights")
      .then((data) => {
        const formatted = formatInsights(mergeInsightLists(data, libraryInsights));
        if (formatted.length > 0) setInsights(formatted);
      })
      .catch((err) => logCmsFallback("Database fetch failed, using fallback static data.", err));
  }, [initialInsights, libraryInsights]);

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
                <span className="text-[12px] tracking-[0.35em] uppercase text-zinc-600 font-medium block mb-6">Thinking & Analysis</span>
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
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="relative w-full aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden hidden md:block" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <Image src="/imagery/futuristic-silhouettes.webp" alt="Futuristic Silhouettes" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-[#050505] opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[rgba(5,5,5,0.2)] to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insights grid */}
      <section className="py-8 px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight, i) => (
            <React.Fragment key={insight.slug}>
              {i === 2 && (
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                  className="relative rounded-2xl overflow-hidden hidden md:block w-full h-full min-h-[350px] lg:col-span-1"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <Image src="/imagery/digital-stock-analysis.webp" alt="Digital Stock Analysis" fill className="object-cover" />
                  <div className="absolute inset-0 bg-[#050505] opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60" />
                </motion.div>
              )}
              <motion.div custom={i} variants={fadeUp} initial="hidden"
                whileInView="visible" viewport={{ once: true, margin: "-40px" }}
              >
                <Link href={`/insight/${insight.slug}`}
                  className="group flex flex-col rounded-2xl p-8 h-full transition-all duration-300 hover:border-[#148be6]/30"
                  style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="flex flex-col gap-1.5">
                      <span className="text-[12px] tracking-[0.22em] uppercase font-bold" style={{ color: "#148be6" }}>{insight.tag}</span>
                      {insight.dateLabel ? (
                        <time className="text-[12px] tracking-[0.14em] uppercase font-medium text-zinc-500">{insight.dateLabel}</time>
                      ) : null}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-800 group-hover:text-[#148be6] transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-black uppercase tracking-[-0.03em] leading-tight mb-2">{insight.title}</h2>
                    <p className="text-sm tracking-[0.08em] text-zinc-400 font-medium mb-4">{insight.subtitle}</p>
                    <p className="text-sm text-zinc-400 leading-relaxed font-medium group-hover:text-white transition-colors">{insight.excerpt}</p>
                  </div>
                  <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <span className="text-sm tracking-[0.2em] uppercase font-bold text-zinc-500 group-hover:text-[#148be6] transition-colors">
                      Read More
                    </span>
                  </div>
                </Link>
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
