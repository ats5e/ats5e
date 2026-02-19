import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SOLUTIONS, SOLUTIONS_BY_SLUG } from "@/lib/solutions";

const SOLUTION_DETAILS: Record<string, {
  detailsTitle: string; detailsDescription: string; delivers: string[];
}> = {
  "Data-Infrastructure-Governance": {
    detailsTitle: "Build on data you can trust.",
    detailsDescription: "We modernize data foundations so every metric, model, and decision sits on reliable ground. Our data fabric approach unifies sources across ERP/CRM/HR/Finance, standardizes lineage and quality, and embeds policy controls. The result: a single governed truth that accelerates analytics, reduces risk, and shrinks time to insight.",
    delivers: ["Data fabric & warehousing; metadata/lineage, data quality SLAs, and stewardship workflows", "Policy-as-code and consent controls; encryption, masking, retention rules", "Self-serve governed data products for BI, AI/ML, and regulatory reporting"],
  },
  "AI-intelligence": {
    detailsTitle: "Turn sprawling data into executive control.",
    detailsDescription: "Most enterprises collect more data than they can operationalize. We turn that data into real-time intelligence with secure analytics layers, role-specific dashboards, and embedded governance — so leaders see the signal, not the noise. You get a live read on performance, risk, liquidity, and compliance, plus drill-downs that turn questions into action in seconds. We build 'confidence tools' for the C-suite and operations alike, designed for clarity, speed, and auditability.",
    delivers: ["Executive and line-of-business dashboards with KPI trees, variance explanations, and early-warning indicators", "Embedded governance (policy checks, maker-checker, audit trails) baked into analytics flows", "Secure analytics layers that plug into legacy estates without re-architecting core systems"],
  },
  "Legacy-Modernisation": {
    detailsTitle: "You don't need a revolution — you need intelligent evolution.",
    detailsDescription: "Rip-and-replace is risky and unnecessary. We phase change through modular components, open APIs, and cloud-native services that integrate with — not bulldoze — your core. Compliance and resilience are baked in. You get speed and agility without downtime, plus a runway for continuous innovation.",
    delivers: ["Modular core replacements and cloud migrations with rollback safety", "Interoperable microservices and API gateways; resilience patterns and DR", "Regulatory & ESG controls embedded into new layers from day one"],
  },
  "Intelligent-Automation": {
    detailsTitle: "Automation removes repetition. Autonomy removes limitation.",
    detailsDescription: "We go beyond task bots. Our agentic systems interpret documents, make routine decisions, trigger next steps, and learn from outcomes. We design the guardrails — controls, auditability — so digital labor scales safely across operations.",
    delivers: ["RPA at scale, NLP-powered document understanding, reconciliation bots", "Agentic AI for triage, exceptions, and straight-through processing", "ROI-led blueprints with quick-win modules and scale-out roadmap"],
  },
  "ConversationalAI": {
    detailsTitle: "AI should be invisible. The experience should feel human.",
    detailsDescription: "We deploy omni-channel assistants for customers and employees: guided service, status checks, onboarding, knowledge retrieval, and more. Integrated with core systems, they resolve the majority of routine interactions instantly and escalate the rest with full context.",
    delivers: ["Contact-center copilots, 24/7 virtual assistants, internal IT/HR helpdesk agents", "Secure integration to CRM/core systems; guardrails and compliance logging", "Design for containment, CSAT, and AHT — not just chat volume"],
  },
  "compliance-risk": {
    detailsTitle: "Predict, prevent, prove.",
    detailsDescription: "We fuse behavioral analytics, cognitive AI, and rule engines to detect anomalies early and act decisively — across AML/KYC, fraud, and operational risk. Controls are embedded into workflows so compliance is built-in, not bolted on.",
    delivers: ["Real-time monitoring and alerts; entity resolution; network analysis", "KYC onboarding checks with document intelligence and biometrics", "End-to-end case management with audit-grade evidence and explainability"],
  },
  "Credit-Risk": {
    detailsTitle: "Sharper decisions, fewer losses.",
    detailsDescription: "We apply feature-rich models and explainable AI to credit origination and line management: application scoring, affordability, early-warning signals, and proactive limit changes. Workflows integrate with policy so approvals are fast, fair, and defensible.",
    delivers: ["Application and behavioral scoring; income verification and anomaly checks", "Early-warning & collections prioritization; affordability and limit strategies", "Model monitoring, drift detection, challenger models, and governance"],
  },
  "Treasury-Liquidity": {
    detailsTitle: "Know your cash — now, not tomorrow.",
    detailsDescription: "We deliver real-time views of positions, inflows/outflows, and regulatory ratios with scenario modeling, funding cost analysis, and automated triggers. Liquidity becomes a managed asset, not a reporting chore.",
    delivers: ["Live dashboards for intraday liquidity, cash ladders, and stress scenarios", "Alerts for thresholds and covenants; automated sweeps and recommendations", "Integration with core banking, payments, and market data"],
  },
  "Human-Centred-Digital-Experience": {
    detailsTitle: "Technology people choose to use.",
    detailsDescription: "Adoption is the real ROI. We design portals, journeys, and UX layers that reduce cognitive load and make complex services feel simple. The focus: fast paths for power users, guided flows for everyone else, and consistent design that earns trust.",
    delivers: ["Unified employee and customer portals; role-based UX layers and cross-device journeys", "Personalization and accessibility; knowledge & guided help", "Continuous UX analytics with A/B testing and adoption telemetry"],
  },
  "transformation-execution": {
    detailsTitle: "Quiet delivery. Visible results.",
    detailsDescription: "We embed delivery teams to de-risk execution across design, build, rollout, and value realization. We operate with operator DNA: program visibility, change management baked in, and post-go-live iteration to lock in results.",
    delivers: ["Outcome-based governance; PMO dashboards; change & training frameworks", "Embedded rollout squads, QA, and hypercare; outcome realization tracking", "Playbooks for regulated launches; cross-vendor orchestration"],
  },
  "Enterprise-Integration": {
    detailsTitle: "Orchestration is where automation meets intelligence.",
    detailsDescription: "We connect the systems you already rely on and orchestrate the work between them. Think: rules that route the right task to the right person at the right time, API-level handshakes across platforms, and exception paths that self-heal. Result: faster cycle times, fewer errors, and less swivel-chair work.",
    delivers: ["API integration across ERP/CRM/HR/Finance; event buses and service catalogs", "Intelligent routing, approval workflows, and exception handling agents", "Cost-to-serve visibility and auto-remediation triggers"],
  },
  "education": {
    detailsTitle: "Education: Modernise Without Breaking.",
    detailsDescription: "Whether you're a multi-campus university, a growing higher-ed group, or a K-12 operator, we integrate what matters: student-life, academic delivery, institutional operations and cashflow — without disruption.",
    delivers: ["ERP roll-outs built for education: student records, finance, HR, facilities on a unified platform", "Legacy modernisation: modular upgrades and interoperability that protect BAU while you evolve", "Payment-platform integrations: unified fee collection, automated reconciliation, leadership dashboards"],
  },
};

export function generateStaticParams() {
  return SOLUTIONS.map((solution) => ({ slug: solution.slug }));
}

export default function SolutionDetailPage({ params }: { params: { slug: string } }) {
  const solution = SOLUTIONS_BY_SLUG[params.slug];
  const details = SOLUTION_DETAILS[params.slug];
  if (!solution || !details) notFound();
  const Icon = solution.icon;

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-20 px-6">
        <div aria-hidden className="pointer-events-none absolute top-0 right-0 w-[600px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#148be6,transparent 70%)", filter: "blur(100px)" }}
        />
        <div className="max-w-7xl mx-auto">
          <Link href="/featured-solutions"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-zinc-600 hover:text-zinc-300 transition-colors mb-10 font-medium"
          >
            <ArrowLeft className="w-3 h-3" /> Solutions
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#148be6]/25 bg-[#148be6]/10 text-[#148be6]">
              <Icon className="w-[18px] h-[18px]" />
            </span>
            <span className="text-[12px] tracking-[0.28em] uppercase font-medium text-zinc-700">{solution.num}</span>
          </div>
          <h1 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] mb-6">
            {solution.title.toUpperCase()}
          </h1>
          <p className="text-lg font-medium text-zinc-400 max-w-2xl leading-relaxed">{solution.tagline}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-black uppercase tracking-[-0.03em] mb-8">{details.detailsTitle}</h2>
            <p className="text-sm text-zinc-400 leading-relaxed font-medium mb-12">{details.detailsDescription}</p>

            <div>
              <h3 className="text-[12px] tracking-[0.3em] uppercase font-bold mb-6" style={{ color: "#148be6" }}>What We Deliver</h3>
              <ul className="space-y-4">
                {details.delivers.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#148be6] shrink-0 mt-1.5" />
                    <p className="text-sm text-zinc-400 leading-relaxed font-medium">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl p-8"
              style={{ background: "linear-gradient(135deg,rgba(20,139,230,0.08),rgba(20,139,230,0.02))", border: "1px solid rgba(20,139,230,0.2)" }}
            >
              <p className="text-[12px] tracking-[0.28em] uppercase font-bold mb-4" style={{ color: "#148be6" }}>Ready to Deploy</p>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium mb-6">
                Transformation begins with a single conversation. Let&apos;s translate your ambition into a pragmatic, deliverable plan.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-bold tracking-[0.12em] uppercase text-white hover:shadow-glow-blue-sm transition-all duration-300"
                style={{ background: "#148be6" }}
              >
                Contact Us <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-[12px] tracking-[0.28em] uppercase font-bold text-zinc-700 mb-4">All Solutions</p>
              {SOLUTIONS.map((item) => {
                const ListIcon = item.icon;
                const isCurrent = item.slug === params.slug;
                return (
                <Link key={item.slug} href={`/featured-solutions/${item.slug}`}
                  className={`flex items-center justify-between py-2.5 text-[13px] font-medium transition-colors border-b border-white/[0.04] last:border-0 ${isCurrent ? "text-white" : "text-zinc-700 hover:text-zinc-400"}`}
                >
                  <span className="flex items-center gap-2.5">
                    <ListIcon className={`w-3.5 h-3.5 ${isCurrent ? "text-[#148be6]" : "text-zinc-700"}`} />
                    {item.num} — {item.title}
                  </span>
                  {isCurrent && <ArrowUpRight className="w-3 h-3 shrink-0" style={{ color: "#148be6" }} />}
                </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
