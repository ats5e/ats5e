import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const INSIGHTS: Record<string, {
  tag: string; title: string; subtitle: string;
  intro: string;
  sections: { heading: string; body: string }[];
  keyTakeaways: string[];
}> = {
  "a2a-instant-payments-gcc": {
    tag: "Payments",
    title: "A2A & Instant Payments in the GCC",
    subtitle: "From Launches to Full-Funnel Value",
    intro: "Account-to-account and instant-payment rails are moving from pilot to scale across the GCC, reshaping how consumers pay and how banks monetize. By 2028, real-time payments are forecast to add $285.8B to global GDP. The question for financial institutions is no longer whether to participate — it is how to extract full-funnel value from infrastructure they are already building.",
    sections: [
      {
        heading: "The Regional Landscape",
        body: "Saudi Arabia's SARIE system, the UAE's IPP, Bahrain's Fawri+, and emerging schemes across Kuwait, Oman, and Qatar have each reached operational status within the past three years. Interoperability frameworks — anchored by the Arab Monetary Fund's Buna platform — are beginning to stitch these networks together. For regional banks, this creates both urgency and opportunity: urgency to connect, and opportunity to own the customer relationship around a fast, cheap, and increasingly ubiquitous payment method.",
      },
      {
        heading: "Beyond Infrastructure: The Revenue Question",
        body: "The commoditization risk is real. A2A rails lower the unit economics of every payment, putting pressure on interchange-dependent revenue models. The institutions that win will be those that layer value-added services on top of the rail: real-time treasury visibility, embedded lending at the point of payment, merchant analytics, and loyalty mechanics. Each of these requires data — specifically, the structured, enriched data that ISO 20022 message formats now make available at scale.",
      },
      {
        heading: "Fraud in a Faster World",
        body: "Instant is irreversible. The same speed that delights customers creates a wider attack surface for authorized push payment (APP) fraud and social-engineering scams. GCC institutions deploying instant rails without a corresponding uplift in real-time fraud detection are accepting a risk they cannot easily walk back. Behavioral analytics, device fingerprinting, and AI-driven anomaly detection must be co-deployed with the payment infrastructure itself — not bolted on afterwards.",
      },
      {
        heading: "What Good Looks Like",
        body: "Leading institutions are treating instant payments as a data asset, not just a cost centre. They are using the payment event stream to update customer risk profiles in real time, trigger contextual offers, and feed treasury dashboards with intraday liquidity signals. The technology is available; the gap is the organizational will to connect it end-to-end.",
      },
    ],
    keyTakeaways: [
      "Real-time rails are live across the GCC — the competitive battle is now at the value-added services layer",
      "ISO 20022 structured data unlocks analytics, fraud, and personalization capabilities that MT-format messages cannot",
      "Fraud controls must be co-deployed with instant payment infrastructure, not added post-launch",
      "Interoperability via Buna creates a regional opportunity that favors banks with cross-border capability",
    ],
  },

  "agentic-ai-task-to-outcome": {
    tag: "AI & Automation",
    title: "From Doing Tasks to Achieving Outcomes",
    subtitle: "The Next Evolution: Agentic AI",
    intro: "Agentic AI represents a paradigm shift from doing to achieving. Instead of following a rigid script, an AI Agent is given a goal and empowered to reason, plan, and execute across multiple systems — adapting to new information in real time, without human hand-holding at every step.",
    sections: [
      {
        heading: "What Makes AI 'Agentic'",
        body: "Traditional automation — including most RPA deployments — is deterministic. A bot follows a defined path; any deviation triggers an exception that lands in a human queue. Agentic AI is different. It combines large language model reasoning with tool use: the ability to call APIs, read documents, query databases, and trigger workflows based on its own assessment of what the goal requires. The agent doesn't just execute; it plans, checks its progress, and adjusts.",
      },
      {
        heading: "The Architecture of an Agent",
        body: "A well-designed agentic system has four components working in concert: a reasoning engine (typically a foundation model), a tool library (APIs, data sources, communication channels), a memory layer (short-term context and long-term knowledge retrieval), and a governance framework (audit trails, escalation rules, human-in-the-loop checkpoints). The last component is not optional — it is what distinguishes responsible deployment from a liability.",
      },
      {
        heading: "Enterprise Use Cases That Are Live Today",
        body: "Financial institutions in the GCC are already deploying agentic systems for credit memo drafting (agent reads application, pulls bureau data, writes structured assessment), trade finance document checking (agent validates LC terms against shipping documents across multiple formats), and AML case management (agent gathers evidence, scores risk, drafts disposition with full audit trail). In each case, the agent completes work that previously required multiple human handoffs.",
      },
      {
        heading: "The Governance Imperative",
        body: "Speed without control is a regulatory risk. Regulators in the UAE, KSA, and across the GCC are beginning to scrutinize AI decision-making in financial services. Institutions need to be able to demonstrate that every agent action was logged, every material decision was explainable, and every escalation path was tested. Building governance in from the start — not retrofitting it — is the only sustainable path.",
      },
    ],
    keyTakeaways: [
      "Agentic AI is goal-directed, not script-driven — it reasons and adapts rather than executing fixed sequences",
      "The four pillars of a production-grade agent: reasoning, tools, memory, and governance",
      "Enterprise use cases are live today in credit, trade finance, and compliance",
      "Governance architecture is not optional — it is the feature that makes agentic AI deployable at scale",
    ],
  },

  "iso-20022-data-dividend": {
    tag: "Regulation",
    title: "ISO 20022: The Data Dividend",
    subtitle: "A 2025 Deadline You Can't Miss",
    intro: "The SWIFT CBPR+ coexistence period ends in November 2025. Institutions that treat ISO 20022 as a compliance project miss material value in fraud reduction, customer analytics, and operational efficiency. The structured, rich data that ISO 20022 carries is the raw material for a generation of intelligent financial services — if institutions build the pipes to use it.",
    sections: [
      {
        heading: "What Changes at the Message Layer",
        body: "ISO 20022 replaces the legacy MT message format with XML-based MX messages that carry far more structured data. A payment instruction no longer just carries amount, account numbers, and a freetext reference — it carries structured remittance information, purpose codes, creditor and debtor identifiers, and enriched party data. For compliance teams, this is the end of parsing freetext for sanctions screening. For treasury teams, it is real-time visibility into the purpose and destination of every payment.",
      },
      {
        heading: "The Compliance Dividend",
        body: "Sanctions screening on MT messages has long been a false-positive factory. Freetext fields, inconsistent name formats, and truncated data cause screening engines to fire on legitimate payments, generating manual review queues that cost banks millions annually. ISO 20022's structured party data — standardized names, LEIs, structured addresses — dramatically reduces false positives when screening engines are configured to use it. Early movers in the GCC are already reporting material drops in investigation volumes.",
      },
      {
        heading: "The Analytics Dividend",
        body: "Purpose codes and structured remittance data turn the payment stream into an analytics asset. Banks can now understand, at the transaction level, whether a payment is a salary, a supplier invoice, a rent payment, or a trade settlement. This granularity enables product personalization, proactive liquidity advisory, and early identification of customers experiencing financial stress — all from data that was always present in the transaction but never accessible.",
      },
      {
        heading: "What Institutions Need to Do Now",
        body: "The technical migration — connecting to CBPR+ rails and generating compliant MX messages — is necessary but not sufficient. Institutions also need to update their downstream systems to consume and store the richer data, retrain their screening and analytics models to exploit the new fields, and build the data governance frameworks to manage the expanded data set. Those that treat November 2025 as the end state rather than the starting line will find themselves owning a compliance checkbox but missing the commercial prize.",
      },
    ],
    keyTakeaways: [
      "November 2025 marks the end of SWIFT MT — ISO 20022 MX becomes the mandatory standard for cross-border payments",
      "Structured remittance data cuts false positives in sanctions screening when screening engines are updated to use it",
      "Purpose codes and party identifiers turn the payment stream into a customer analytics asset",
      "The data dividend requires downstream system investment — migration alone does not unlock the value",
    ],
  },

  "agentic-ai-tco-efficiency": {
    tag: "AI & Automation",
    title: "Redefining Operational Efficiency and TCO",
    subtitle: "Targeting the Cognitive Work RPA Can't Touch",
    intro: "The business case for Agentic AI goes far beyond incremental cost savings — it fundamentally resets the cost curve for complex operations and redefines Total Cost of Ownership. Where RPA automates the routine, Agentic AI targets the cognitive: the judgment calls, the exception handling, the cross-system orchestration that has always required an experienced human.",
    sections: [
      {
        heading: "The Limits of the RPA Model",
        body: "RPA delivered real value in its first wave: screen scraping, data entry, rule-based routing. But the model has a structural ceiling. Every bot requires maintenance when the underlying system changes. Exception rates — the work that falls outside the defined script — typically run at 15–30% of total volume and still land on human desks. The 'attended automation' workaround (a human supervising a bot) often costs nearly as much as the original manual process. The productivity gains plateau.",
      },
      {
        heading: "Where Agentic AI Changes the Math",
        body: "An agentic system can handle exceptions because it reasons rather than pattern-matches. When a supplier invoice arrives in an unexpected format, or a credit application contains a field that doesn't map to a standard form, the agent reads context, makes an inference, and proceeds — or escalates with a structured recommendation rather than a blank handoff. This collapses the exception queue that has always been the hidden cost center of automation programs.",
      },
      {
        heading: "TCO Across the Full Stack",
        body: "Measuring TCO correctly requires looking beyond the technology license. RPA programs accumulate technical debt: bot maintenance, exception management, test environment upkeep, and the change management overhead of updating hundreds of individual bots when a core system changes. Agentic architectures, built on foundation models with tool libraries, are more resilient to system changes because the reasoning layer adapts — the agent figures out the new interface rather than breaking.",
      },
      {
        heading: "The 248% ROI Case",
        body: "Across our GCC engagements, institutions that have deployed agentic AI at scale — not just in pilot — consistently report ROI figures in the 200–300% range within 24 months. The key drivers are not the automation rate (which sounds impressive in a deck) but the reduction in exception-handling headcount, the acceleration of cycle times that improve customer experience metrics, and the elimination of error-driven rework that compounds across complex processes.",
      },
    ],
    keyTakeaways: [
      "RPA has a structural ceiling — exception rates of 15–30% mean significant residual manual cost",
      "Agentic AI handles exceptions through reasoning, not pattern-matching, collapsing the exception queue",
      "True TCO must include bot maintenance, exception management, and system-change overhead",
      "248% ROI at scale is driven by exception handling, cycle time, and rework elimination — not automation rate alone",
    ],
  },

  "agentic-ai-risk-compliance": {
    tag: "Risk & Compliance",
    title: "The Control Imperative for a Real-Time World",
    subtitle: "Moving Beyond the 90% False Positive Problem",
    intro: "Financial institutions faced $4.6 billion in AML-related penalties in 2024. Traditional monitoring produces ~90% false positives. Agentic AI provides continuous, proactive guardianship — not just alerts, but evidence-ready case files, real-time network analysis, and explainable decisions that regulators can audit.",
    sections: [
      {
        heading: "The False Positive Crisis",
        body: "The 90% false positive rate in traditional transaction monitoring is not a technology failure — it is an architecture failure. Rule-based systems set thresholds to minimize false negatives (missed suspicious activity), which inevitably inflates false positives. The result is compliance teams buried in low-quality alerts, unable to focus on the genuine risk signals hidden in the noise. Skilled investigators spend most of their time closing false positives rather than investigating real threats.",
      },
      {
        heading: "How Agentic AI Changes the Investigation Model",
        body: "An agentic compliance system doesn't just flag a transaction — it investigates it. When an alert fires, the agent automatically gathers corroborating context: account history, counterparty network, geographic risk indicators, news and adverse media, and prior case outcomes for similar patterns. It then drafts a structured disposition recommendation with evidence, reducing the investigator's role from researcher to reviewer. Alert-to-decision cycle times drop from days to hours.",
      },
      {
        heading: "Network Analysis at Scale",
        body: "Money laundering is rarely a single suspicious transaction — it is a pattern across a network of accounts, often spanning multiple institutions and jurisdictions. Traditional monitoring looks at individual accounts in isolation. Agentic systems with graph analytics capabilities map the network in real time: identifying shell structures, round-trip flows, and layering patterns that only become visible when you look across entities rather than within them.",
      },
      {
        heading: "Explainability as a Regulatory Requirement",
        body: "GCC regulators — CBUAE, SAMA, CBB — increasingly require institutions to demonstrate not just that they detected suspicious activity, but how they detected it and what evidence underpins the filing. Black-box AI models that produce a risk score without an explanation trail are not compliant by design. The agentic approach — where every step of the agent's reasoning is logged — produces an audit-ready evidence trail as a byproduct of the investigation process.",
      },
    ],
    keyTakeaways: [
      "$4.6B in AML penalties in 2024 reflects systemic failure of traditional monitoring architectures",
      "Agentic AI investigates alerts automatically, reducing cycle times from days to hours",
      "Graph-based network analysis identifies laundering patterns invisible to single-account monitoring",
      "Explainability logging produces regulator-ready audit trails as a byproduct — not an afterthought",
    ],
  },

  "whitepaper-bots-to-business": {
    tag: "Whitepaper",
    title: "From Bots to Business Value",
    subtitle: "The Executive Blueprint for Agentic AI at Scale",
    intro: "Despite significant investment, only 3% of organizations have successfully scaled automation beyond isolated pilots. This whitepaper provides the executive blueprint to move beyond tactical RPA and scale true Agentic AI — from the boardroom mandate to the operating model to the governance framework that makes it sustainable.",
    sections: [
      {
        heading: "Why Scaling Fails: The Three Structural Barriers",
        body: "The 97% failure-to-scale rate is not random. Three structural barriers appear consistently across failed programs. First, technology without an operating model: bots are deployed but no one owns the exception management, maintenance, or continuous improvement cycle. Second, use-case proliferation without prioritization: hundreds of small automations are built but none generates enterprise-level impact. Third, governance as an afterthought: controls are not designed in, so the first compliance question or audit freezes the program.",
      },
      {
        heading: "The Blueprint: Five Phases to Enterprise Scale",
        body: "Phase 1 is strategic alignment — connecting the automation program to 2–3 enterprise outcomes that the board cares about, with quantified ROI targets and executive sponsorship. Phase 2 is foundational architecture — shared data infrastructure, a Centre of Excellence, and governance frameworks built before use-case development begins. Phase 3 is controlled pilots — 2–3 high-value use cases taken from concept to production with full measurement frameworks in place. Phase 4 is accelerated rollout — scaling proven patterns using the CoE as the delivery engine. Phase 5 is continuous evolution — monitoring, retraining, and expansion governed by the outcome metrics established in Phase 1.",
      },
      {
        heading: "The Operating Model: Making it Stick",
        body: "The Centre of Excellence is the organizational mechanism that prevents the program from fragmenting into isolated departmental experiments. It houses shared capabilities — the agent platform, the data infrastructure, the governance tooling — and provides the standards that individual business units build against. Done well, the CoE acts as an internal product team, not a central bottleneck. Business units retain delivery ownership; the CoE provides the platform and the guardrails.",
      },
      {
        heading: "Governance That Enables Rather Than Blocks",
        body: "The instinct in regulated industries is to treat AI governance as a risk management function — a gate that approves or blocks. The more effective model treats governance as an enablement function — a set of standards, tooling, and processes that make it safe to move faster. When every agent produces a logged, explainable decision trail by design, the compliance review becomes a check rather than a reconstruction. Speed and control are not in tension; they are aligned.",
      },
    ],
    keyTakeaways: [
      "97% of automation programs fail to scale due to operating model gaps, not technology limitations",
      "The five-phase blueprint connects technology investment to board-level outcomes from day one",
      "The Centre of Excellence is the organizational mechanism — not the technology — that makes scale sustainable",
      "Governance designed as an enablement function accelerates deployment; governance as a gate slows it",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(INSIGHTS).map((slug) => ({ slug }));
}

export default function InsightDetailPage({ params }: { params: { slug: string } }) {
  const insight = INSIGHTS[params.slug];
  if (!insight) notFound();

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-20 px-6">
        <div aria-hidden className="pointer-events-none absolute top-0 right-0 w-[600px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#148be6,transparent 70%)", filter: "blur(100px)" }}
        />
        <div className="max-w-7xl mx-auto">
          <Link href="/insight"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-zinc-600 hover:text-zinc-300 transition-colors mb-10 font-medium"
          >
            <span className="text-base leading-none">←</span> Insights
          </Link>
          <span className="text-[10px] tracking-[0.28em] uppercase font-bold block mb-4" style={{ color: "#148be6" }}>{insight.tag}</span>
          <h1 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] mb-6">
            {insight.title.toUpperCase()}
          </h1>
          <p className="text-lg font-medium text-zinc-400 max-w-2xl leading-relaxed">{insight.subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Main content */}
          <div className="md:col-span-2">
            <p className="text-base text-zinc-300 leading-relaxed font-medium mb-12">{insight.intro}</p>

            <div className="space-y-10">
              {insight.sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-lg font-black uppercase tracking-[-0.03em] mb-4">{section.heading}</h2>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">{section.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="rounded-2xl p-8"
              style={{ background: "linear-gradient(135deg,rgba(20,139,230,0.08),rgba(20,139,230,0.02))", border: "1px solid rgba(20,139,230,0.2)" }}
            >
              <p className="text-[10px] tracking-[0.28em] uppercase font-bold mb-4" style={{ color: "#148be6" }}>Key Takeaways</p>
              <ul className="space-y-3">
                {insight.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#148be6] shrink-0 mt-1.5" />
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-[10px] tracking-[0.28em] uppercase font-bold text-zinc-700 mb-4">Talk to Our Team</p>
              <p className="text-[11px] text-zinc-600 leading-relaxed font-medium mb-5">
                Ready to apply these insights to your organisation? Start the conversation with our specialists.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase text-white transition-all duration-300 hover:shadow-glow-blue-sm"
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
