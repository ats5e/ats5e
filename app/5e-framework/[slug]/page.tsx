import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FIVE_ES } from "@/lib/five-es-data";

export function generateStaticParams() {
  return Object.keys(FIVE_ES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const e = FIVE_ES[params.slug];
  if (!e) return { title: "Not Found", robots: { index: false } };
  const title = `${e.tag} — ${e.detailsTitle}`;
  const url = `/5e-framework/${params.slug}`;
  return {
    title,
    description: e.keyServiceDescription,
    alternates: { canonical: url },
    openGraph: { title, description: e.keyServiceDescription, url },
  };
}

export default function FrameworkDetailPage({ params }: { params: { slug: string } }) {
  const e = FIVE_ES[params.slug];
  if (!e) notFound();

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-20 px-6">
        <div aria-hidden className="pointer-events-none absolute top-0 right-0 w-[600px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#148be6,transparent 70%)", filter: "blur(100px)" }}
        />
        <div className="max-w-7xl mx-auto">
          <Link href="/5e-framework" className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-zinc-600 hover:text-zinc-300 transition-colors mb-10 font-medium">
            <ArrowLeft className="w-3 h-3" /> The 5E Framework
          </Link>
          <div className="flex items-start gap-4 mb-4">
            <span className="text-[12px] tracking-[0.28em] uppercase font-medium text-zinc-700">{e.number}</span>
          </div>
          <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] whitespace-pre-line mb-4">
            {e.headline}
          </h1>
          <p className="text-[12px] tracking-[0.3em] uppercase font-bold" style={{ color: "#148be6" }}>{e.tag}</p>
        </div>
      </section>

      {/* Detail content */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-black uppercase tracking-[-0.03em] mb-8">{e.detailsTitle}</h2>
            <div className="space-y-5">
              {e.detailsDescription.split("\n\n").map((para, i) => (
                <p key={i} className="text-sm text-zinc-400 leading-relaxed font-medium">{para}</p>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {/* Key service card */}
            <div className="rounded-2xl p-8"
              style={{ background: "linear-gradient(135deg,rgba(20,139,230,0.08),rgba(20,139,230,0.02))", border: "1px solid rgba(20,139,230,0.2)" }}
            >
              <p className="text-[12px] tracking-[0.28em] uppercase font-bold mb-3" style={{ color: "#148be6" }}>{e.keyServiceTitle}</p>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">{e.keyServiceDescription}</p>
            </div>

            {/* Framework nav */}
            <div className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-[12px] tracking-[0.28em] uppercase font-bold text-zinc-700 mb-4">The Framework</p>
              {Object.entries(FIVE_ES).map(([slug, item]) => (
                <Link key={slug} href={`/5e-framework/${slug}`}
                  className={`flex items-center justify-between py-2.5 text-[13px] font-medium tracking-[0.04em] transition-colors border-b border-white/[0.04] last:border-0 ${slug === params.slug ? "text-white" : "text-zinc-600 hover:text-zinc-300"}`}
                >
                  <span>{item.tag}</span>
                  {slug === params.slug && <span className="text-[12px] uppercase tracking-[0.2em] font-bold" style={{ color: "#148be6" }}>Current</span>}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-[-0.05em] leading-[0.88] mb-6">LET&rsquo;S <span style={{ color: "#148be6" }}>BUILD.</span></h2>
        <p className="text-sm text-zinc-500 font-medium max-w-md mx-auto mb-10">Transformation begins with a single conversation. Let&apos;s translate your ambition into a pragmatic, deliverable plan.</p>
        <Link href="/contact"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase text-white hover:shadow-glow-blue-sm transition-all duration-300"
          style={{ background: "#148be6" }}
        >
          Start the Conversation <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
