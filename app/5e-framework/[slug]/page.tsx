import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FIVE_ES: Record<string, {
  number: string; tag: string; headline: string;
  detailsTitle: string; detailsDescription: string;
  keyServiceTitle: string; keyServiceDescription: string;
}> = {
  experience: {
    number: "01", tag: "Experience",
    headline: "HUMAN.\nCENTERED.",
    detailsTitle: "Systems People Want to Use",
    detailsDescription: `The most sophisticated enterprise system is worthless if people — whether employees or customers — find ways to avoid using it. Poor user experience isn't just an annoyance; it's a direct drain on your bottom line.

Companies that invest in employee experience are four times more profitable than those that do not. Furthermore, every $1 invested in UX design results in a return of $100 — a 9,900% ROI.

Our Experience pillar is a business-critical discipline that ensures your technology investment translates into value for the people who use it. Even the most advanced systems fail if people don't want to use them. Complex interfaces, clunky workflows, and poor usability quietly erode value, adoption, and morale. The result? Manual workarounds, missed insights, and frustrated teams.

We believe human-centricity is the blueprint, not an afterthought. Because when systems are built for people, transformation sticks.`,
    keyServiceTitle: "Experience Solutions",
    keyServiceDescription: "Ensure that every digital interaction — from employee dashboards to customer portals — is intuitive, engaging, and trusted.",
  },
  empowerment: {
    number: "02", tag: "Empowerment",
    headline: "DECIDE.\nSMARTER.",
    detailsTitle: "Turn Data into Control",
    detailsDescription: `Empowerment is about equipping your organization with AI-driven tools and insights that cut through complexity. The appetite for this in the region is clear: 71% of GCC investors now expect wealth managers to incorporate AI into their offerings.

This demand is fueling explosive market growth, with the GCC applied AI in finance market projected to expand from $141 million in 2024 to $1.7 billion by 2035.

Our solutions embed analytics and governance across every layer of your enterprise, enabling proactive decisions and measurable performance improvement. Empowerment is more than technology. It's an organizational mindset built around transparency, accountability, and intelligent control.`,
    keyServiceTitle: "Empowerment Solutions",
    keyServiceDescription: "Our solutions embed analytics and governance across every layer of your enterprise, enabling proactive decisions and measurable performance improvement.",
  },
  efficiency: {
    number: "03", tag: "Efficiency",
    headline: "AUTOMATE.\nEVERYTHING.",
    detailsTitle: "From Automation to Autonomy",
    detailsDescription: `In today's competitive landscape, operational efficiency is no longer optional — it's essential for survival and growth. Traditional approaches to efficiency often fall short, delivering incremental improvements that fail to transform the business.

Our solutions go beyond traditional RPA to deliver AI agents that adapt, learn, and improve outcomes across customer service, finance, compliance, and operations. We help you move from simple automation to true autonomy.

What sets us apart is our ability to deliver AI at scale. While others stop at proof-of-concepts or pilot bots, we design solutions to embed across functions, not just departments. This ensures meaningful ROI, not stalled pilots.

The result? Higher automation coverage, lower cost-to-serve, better user experience, and a foundation for continuous improvement through machine learning.`,
    keyServiceTitle: "Efficiency Solutions",
    keyServiceDescription: "Efficiency means your organization serves more, spends less, and operates with precision.",
  },
  execution: {
    number: "04", tag: "Execution",
    headline: "VISION.\nDELIVERED.",
    detailsTitle: "Make the Outcome Real",
    detailsDescription: `Execution is where strategy turns into reality. Our approach is hands-on and persistent, built on the "operator DNA" of a leadership team with decades of experience running mission-critical infrastructure for global banks.

We don't just deliver a platform and disappear; we embed with your teams and stay until the envisioned outcome is fully achieved and sustained. This ensures your organization — and your customers — see the full value of your investment.

Our Execution model is engineered for results, providing certainty in complex environments. We deploy teams that work alongside yours, governed by outcome-based KPIs, not just project milestones. We build adoption and training frameworks directly into the platform delivery to ensure new systems are used effectively from day one.

We provide custom dashboards for real-time visibility and reporting, giving leadership full control and insight throughout the project lifecycle. Our engagement includes post-launch analytics and iteration workflows to ensure the solution continues to deliver value and adapt to new challenges.`,
    keyServiceTitle: "Execution Solutions",
    keyServiceDescription: "Through precision, discipline, and deep operational DNA, we turn transformation blueprints into measurable business outcomes.",
  },
  evolution: {
    number: "05", tag: "Evolution",
    headline: "MODERNISE.\nFEARLESSLY.",
    detailsTitle: "Modernise Without Breaking",
    detailsDescription: `Your legacy systems are costing you more than you think. They are a hidden tax on your innovation budget and a direct anchor on your competitiveness. Global banks, on average, spend 64% of their IT budgets simply maintaining outdated technology — capital that should be funding growth.

And the impact isn't just internal — outdated systems also slow down your ability to serve customers with agility. Worse, this technical debt creates significant risk, with legacy systems being linked to $10.4 billion in annual compliance fines and a 42% revenue gap compared to more agile competitors.

Our Evolution pillar is designed to cut this anchor loose — without sinking the ship. We don't believe in high-risk, "big bang" replacements. Instead, our Evolution approach uses an intelligent, modular modernization strategy to preserve business continuity while unlocking immediate value.`,
    keyServiceTitle: "Evolution Solutions",
    keyServiceDescription: "Upgrade, integrate, and evolve your core systems to deliver the agility of tomorrow while maintaining the reliability of today.",
  },
};

export function generateStaticParams() {
  return Object.keys(FIVE_ES).map((slug) => ({ slug }));
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
