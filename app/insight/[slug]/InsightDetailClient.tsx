"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchCmsItem, type CmsInsight } from "@/lib/cms";

type StaticInsight = {
  tag: string;
  title: string;
  subtitle: string;
  intro: string;
  sections: { heading: string; body: string }[];
  keyTakeaways: string[];
};

type InsightDetailClientProps = {
  fallbackInsight: StaticInsight | null;
  slug: string;
};

function splitBodyContent(bodyContent?: string): string[] {
  return bodyContent
    ? bodyContent.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean)
    : [];
}

function buildCmsSections(bodyContent?: string) {
  const blocks = splitBodyContent(bodyContent);
  const [, ...remainingBlocks] = blocks;

  return remainingBlocks.map((block, index) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);

    if (lines[0]?.startsWith("## ")) {
      return {
        heading: lines[0].replace(/^##\s*/, ""),
        body: lines.slice(1).join(" "),
      };
    }

    return {
      heading: `Section ${index + 1}`,
      body: block.replace(/\n/g, " "),
    };
  });
}

export default function InsightDetailClient({ fallbackInsight, slug }: InsightDetailClientProps) {
  const [cmsInsight, setCmsInsight] = useState<CmsInsight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    fetchCmsItem<CmsInsight>("insights", slug)
      .then((item) => {
        if (!isCancelled && item?.published !== false) {
          setCmsInsight(item);
        }
      })
      .catch((error) => {
        console.log("Insight CMS fetch failed, using fallback content.", error);
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  const cmsSections = useMemo(() => buildCmsSections(cmsInsight?.bodyContent), [cmsInsight?.bodyContent]);
  const cmsIntro = useMemo(() => splitBodyContent(cmsInsight?.bodyContent)[0] || cmsInsight?.summary || "", [cmsInsight?.bodyContent, cmsInsight?.summary]);

  const insight = cmsInsight
    ? {
        tag: cmsInsight.category || "Insight",
        title: cmsInsight.title,
        subtitle: cmsInsight.summary || "",
        intro: cmsIntro,
        sections: cmsSections,
        keyTakeaways: [] as string[],
        downloadFileUrl: cmsInsight.downloadFileUrl,
      }
    : fallbackInsight;

  if (!loading && !insight) {
    return (
      <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
        <Navbar />
        <section className="px-6 py-40 text-center">
          <div className="mx-auto max-w-2xl">
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.28em] text-zinc-600">Insight Not Found</p>
            <h1 className="mb-6 text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-[-0.05em]">This insight is unavailable.</h1>
            <Link href="/insight" className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.14em] text-zinc-300 hover:text-white hover:border-white/[0.2]">
              Back to Insights <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
        <Navbar />
        <section className="px-6 py-40 text-center text-zinc-500">Loading insight...</section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-44 pb-20 px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 h-[500px] w-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#148be6,transparent 70%)", filter: "blur(100px)" }}
        />
        <div className="max-w-7xl mx-auto">
          <Link
            href="/insight"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-zinc-600 hover:text-zinc-300 transition-colors mb-10 font-medium"
          >
            <span className="text-base leading-none">←</span> Insights
          </Link>
          <span className="text-[12px] tracking-[0.28em] uppercase font-bold block mb-4" style={{ color: "#148be6" }}>
            {insight.tag}
          </span>
          <h1 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] mb-6">
            {insight.title.toUpperCase()}
          </h1>
          <p className="text-lg font-medium text-zinc-400 max-w-2xl leading-relaxed">{insight.subtitle}</p>
        </div>
      </section>

      <section className="py-16 px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            {insight.intro ? <p className="text-base text-zinc-300 leading-relaxed font-medium mb-12">{insight.intro}</p> : null}

            <div className="space-y-10">
              {insight.sections.map((section, index) => (
                <div key={`${section.heading}-${index}`}>
                  <h2 className="text-lg font-black uppercase tracking-[-0.03em] mb-4">{section.heading}</h2>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">{section.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {cmsInsight?.downloadFileUrl ? (
              <a
                href={cmsInsight.downloadFileUrl}
                download
                className="flex items-center justify-between rounded-2xl border border-[#148be6]/25 bg-[#148be6]/10 px-6 py-5 text-sm font-bold uppercase tracking-[0.16em] text-white hover:bg-[#148be6]/20 transition-colors"
              >
                Download Insight <ArrowDownToLine className="h-4 w-4" />
              </a>
            ) : null}

            {insight.keyTakeaways.length > 0 ? (
              <div
                className="rounded-2xl p-8"
                style={{ background: "linear-gradient(135deg,rgba(20,139,230,0.08),rgba(20,139,230,0.02))", border: "1px solid rgba(20,139,230,0.2)" }}
              >
                <p className="text-[12px] tracking-[0.28em] uppercase font-bold mb-4" style={{ color: "#148be6" }}>
                  Key Takeaways
                </p>
                <ul className="space-y-3">
                  {insight.keyTakeaways.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#148be6] shrink-0 mt-1.5" />
                      <p className="text-[13px] text-zinc-400 leading-relaxed font-medium">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-sm tracking-[0.28em] uppercase font-bold text-zinc-400 mb-4">Talk to Our Team</p>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium mb-5">
                Ready to apply these insights to your organisation? Start the conversation with our specialists.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold tracking-[0.12em] uppercase text-white transition-all duration-300 hover:shadow-glow-blue-sm"
                style={{ background: "#148be6" }}
              >
                Contact Us <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
