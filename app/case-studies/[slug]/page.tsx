import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CASE_STUDIES } from "@/lib/case-studies-data";

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = CASE_STUDIES[params.slug];
  if (!cs) return { title: "Case Study Not Found", robots: { index: false } };
  const url = `/case-studies/${params.slug}`;
  return {
    title: cs.title,
    description: cs.description,
    alternates: { canonical: url },
    openGraph: { type: "article", title: cs.title, description: cs.description, url },
  };
}

export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const cs = CASE_STUDIES[params.slug];
  if (!cs) notFound();

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-20 px-6">
        <div aria-hidden className="pointer-events-none absolute top-0 right-0 w-[600px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#148be6,transparent 70%)", filter: "blur(100px)" }}
        />
        <div className="max-w-7xl mx-auto">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-zinc-600 hover:text-zinc-300 transition-colors mb-10 font-medium">
            <ArrowLeft className="w-3 h-3" /> Our Work
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[12px] tracking-[0.28em] uppercase font-medium text-zinc-700">{cs.num}</span>
            <span className="h-px w-8" style={{ background: "rgba(255,255,255,0.1)" }} />
            <span className="text-[12px] tracking-[0.22em] uppercase font-bold" style={{ color: "#148be6" }}>{cs.sector}</span>
          </div>
          <h1 className="text-[clamp(2rem,5vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] mb-6">{cs.title.toUpperCase()}</h1>
          <p className="text-base font-medium text-zinc-400 max-w-2xl">{cs.heroDescription}</p>
        </div>
      </section>

      {/* Metrics bar */}
      <section className="px-6 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]"
            style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {cs.metrics.map((m, i) => (
              <div key={i} className="px-8 py-8 text-center">
                <p className="text-lg font-black uppercase tracking-[-0.03em] mb-1" style={{ color: "#148be6" }}>{m.split(" ")[0]}</p>
                <p className="text-sm tracking-[0.12em] uppercase text-zinc-300 font-medium">{m.split(" ").slice(1).join(" ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            <div>
              <h2 className="text-[12px] tracking-[0.3em] uppercase font-bold mb-4" style={{ color: "#148be6" }}>The Challenge</h2>
              <h3 className="text-xl font-black uppercase tracking-[-0.03em] mb-4">{cs.challengeTitle}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">{cs.challenge}</p>
            </div>
            <div>
              <h2 className="text-[12px] tracking-[0.3em] uppercase font-bold mb-4" style={{ color: "#148be6" }}>What We Did</h2>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">{cs.whatWeDid}</p>
            </div>
            <div>
              <h2 className="text-[12px] tracking-[0.3em] uppercase font-bold mb-4" style={{ color: "#148be6" }}>The Results</h2>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">{cs.results}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl p-8"
              style={{ background: "linear-gradient(135deg,rgba(20,139,230,0.08),rgba(20,139,230,0.02))", border: "1px solid rgba(20,139,230,0.2)" }}
            >
              <p className="text-[12px] tracking-[0.28em] uppercase font-bold mb-2" style={{ color: "#148be6" }}>Client</p>
              <p className="text-sm font-black uppercase tracking-[-0.02em] mb-4">{cs.client}</p>
              <p className="text-[12px] tracking-[0.28em] uppercase font-bold mb-2" style={{ color: "#148be6" }}>Sector</p>
              <p className="text-sm font-medium text-zinc-400">{cs.sector}</p>
            </div>

            <div className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-sm tracking-[0.28em] uppercase font-bold text-zinc-400 mb-4">Ready to Achieve Similar Results?</p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-bold tracking-[0.12em] uppercase text-white hover:shadow-glow-blue-sm transition-all duration-300"
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
