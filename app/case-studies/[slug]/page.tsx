import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CASE_STUDIES: Record<string, {
  num: string; title: string; client: string; sector: string;
  heroDescription: string; description: string;
  challengeTitle: string; challenge: string;
  whatWeDid: string; results: string; metrics: string[];
}> = {
  "tier-1-bank-ai-transformation": {
    num: "01", title: "AI-Enabled Transformation for a Tier 1 Bank", client: "Leading UAE Bank", sector: "Banking",
    heroDescription: "Modernize operations while maintaining stability and compliance.",
    description: "We partnered with a leading UAE bank to overhaul its legacy systems with an AI-driven data architecture, resulting in significant gains in operational efficiency, fraud detection, and customer satisfaction.",
    challengeTitle: "A Unified Intelligence Infrastructure",
    challenge: "The bank's legacy systems and manual processes were hindering innovation, increasing operational costs, and limiting their ability to deliver exceptional customer experiences. We were engaged not to sell a product, but to enable an outcome.",
    whatWeDid: "Evolution: Phased modernization connecting legacy systems to a unified data lake on Microsoft Azure without disrupting business continuity. Empowerment: Microsoft Fabric unified intelligence layer; dynamic Power BI dashboards giving 10,000+ employees live operational visibility. Efficiency: Azure ML models automating high-friction processes; real-time AI fraud detection. Experience: Azure Cognitive Services for sentiment analysis in Arabic and English. Execution: Our team embedded with the bank to manage end-to-end delivery.",
    results: "A stable, scalable, AI-powered operational infrastructure delivered without disruption — exactly as committed.",
    metrics: ["70% faster fraud intervention", "50% reduction in compliance operations costs", "25% faster customer issue resolution"],
  },
  "saudi-bank-enterprise-pmo": {
    num: "02", title: "Enterprise PMO for a Leading Saudi Bank", client: "Major Riyadh Bank", sector: "Banking",
    heroDescription: "From blind spots to board-level clarity.",
    description: "A major Riyadh bank operating 230+ branches struggled to deliver large change programs consistently. Timelines slipped, methods varied by team, and leadership lacked a single source of truth on risks, dependencies, and progress.",
    challengeTitle: "Delivery Discipline, Embedded",
    challenge: "With no standardized methodology and no consolidated view of the portfolio, flagship programs were at risk. The bank needed a PMO capability that could be stood up fast and transferred to internal teams.",
    whatWeDid: "Designed and stood up an Enterprise PMO with a Build–Operate–Transfer model. Standardized artefacts, tooling, and delivery methodology. Equipped executives with MI dashboards and health-checks. Upskilled teams in structured project management and governance.",
    results: "At-risk flagship program brought back on track. PMO established to support the bank's largest transformation program with clear roles, reporting cadence, and execution maturity lifted across IT and business.",
    metrics: ["230+ retail branches served", "4 enterprise capability gaps addressed", "1 bank-wide EPMO established"],
  },
  "ksa-stack-card-acquirer": {
    num: "03", title: "Cloud-Native KSA Stack", client: "Regional Card Acquirer", sector: "Payments",
    heroDescription: "Regulator-ready from day one.",
    description: "A top regional acquirer needed to enter Saudi Arabia with a fully compliant cloud stack — fast. The solution had to meet SAMA requirements and support credit, debit, prepaid, POS and back-office services.",
    challengeTitle: "Modernise Without Breaking",
    challenge: "Speed to market in a heavily regulated environment, with full SAMA alignment and security certifications required before go-live.",
    whatWeDid: "Designed and delivered a full Oracle Cloud Infrastructure estate across Non-Prod, Prod, and DR. Conducted SAMA gap analysis, secured architectural approvals, and ran partner RFPs. Implemented PCI-DSS & PIN certification controls. Built the target operating model and programme management.",
    results: "KSA Stack launched seamlessly with regulatory alignment and security controls. Enabled rapid product rollout across issuing/processing and acquiring lines.",
    metrics: ["3 environments delivered", "5 product domains enabled", "2 certifications achieved"],
  },
  "abu-dhabi-bank-offshoring": {
    num: "04", title: "IT & Operations Offshoring", client: "Abu Dhabi Bank", sector: "Banking",
    heroDescription: "Efficiency without compromise.",
    description: "Leadership targeted material cost reduction and agility by offshoring select IT and Ops to India — but needed UAE Central Bank approval, vendor competition, and SLA-rigor without service risk.",
    challengeTitle: "Contracts That Drive Continuous Improvement",
    challenge: "Securing regulatory approval for offshoring while maintaining service quality and embedding performance improvement mechanisms into vendor contracts.",
    whatWeDid: "Secured Central Bank approval; ran a competitive RFP with market benchmarking; structured performance-based contracts. Designed the high-level implementation plan and governance to ensure control and continuous improvement.",
    results: "Approval in 60 days with zero re-submissions. Highly competitive pricing achieved; SLAs embedded with performance upticks. In-year savings realized.",
    metrics: ["60 days to regulatory approval", "0 re-submissions required", "In-year savings realized"],
  },
  "gcc-bank-contact-centre": {
    num: "05", title: "AI-Enabled Contact Centre Modernisation", client: "Leading GCC Retail Bank", sector: "Banking",
    heroDescription: "Legacy operations straining under high customer demand.",
    description: "A leading retail and commercial bank in the GCC faced mounting customer service inefficiencies due to high call volumes, manual ticketing processes, and limited visibility into call analytics.",
    challengeTitle: "Driving Digital Engagement Without Increasing Cost-to-Serve",
    challenge: "With digital banking adoption surging post-COVID, agents were constrained by outdated tools, leading to inconsistent customer experiences and long resolution times.",
    whatWeDid: "Implemented conversational AI and voice-based virtual assistants. Integrated omnichannel routing across phone, chat, and mobile banking. Introduced real-time speech analytics for issue identification and sentiment tracking. Automated post-call summarisation using NLP.",
    results: "Reduced call-handling time, improved first-contact resolution, and delivered consistent customer experiences across all service channels.",
    metrics: ["60–70% reduction in call volume", "40% faster average handling time", "24% improvement in CSAT scores"],
  },
  "gcc-bank-treasury": {
    num: "06", title: "Treasury Operations Modernisation", client: "Leading Regional Bank", sector: "Banking",
    heroDescription: "Manual processes limiting speed and control.",
    description: "A leading regional bank's treasury division was constrained by manual reconciliation, fragmented reporting systems, and time delays in liquidity visibility. Regulatory expectations for real-time oversight were increasing.",
    challengeTitle: "Building Resilience in a Volatile Regulatory Environment",
    challenge: "Critical decisions on cash positioning and FX exposures relied on static data, creating risk and inefficiency in a volatile market.",
    whatWeDid: "Implemented AI-powered reconciliation and exception management workflows. Built real-time liquidity dashboards integrated with trading and risk data. Automated reporting and forecasting. Connected treasury, finance, and risk systems under one unified data fabric.",
    results: "Achieved continuous liquidity monitoring, reduced manual workload, and strengthened governance and audit readiness.",
    metrics: ["80% faster reconciliation cycles", "20% lower operational risk exposure", "100% real-time reporting coverage"],
  },
  "retail-bank-fraud-detection": {
    num: "07", title: "Fraud Detection Automation", client: "Leading Retail Bank", sector: "Banking",
    heroDescription: "Scaling fraud controls to match digital transaction growth.",
    description: "A top-tier retail bank faced escalating costs in its fraud operations due to excessive false positives, lengthy investigations, and fragmented data systems.",
    challengeTitle: "False Positives Driving Inefficiency and Fatigue",
    challenge: "The legacy detection engine was unable to distinguish between normal customer behaviour and genuine threats, overwhelming investigation teams with noise.",
    whatWeDid: "Deployed a machine learning–based fraud surveillance system. Integrated predictive and cognitive AI to identify real anomalies. Automated alert triage and escalation. Introduced continuous learning models to refine thresholds over time.",
    results: "Reduced false positives significantly, improved detection precision, and enhanced compliance confidence and reporting reliability.",
    metrics: ["30% reduction in fraud losses", "40% fewer false positives", "2x faster case resolution"],
  },
  "islamic-bank-digital-onboarding": {
    num: "08", title: "Digital Onboarding Transformation", client: "Leading Islamic Bank", sector: "Islamic Finance",
    heroDescription: "Balancing speed, compliance, and customer experience.",
    description: "A leading Islamic financial institution faced long onboarding cycles due to paper-based verification, manual KYC checks, and disjointed systems.",
    challengeTitle: "Speed, Security, and Shariah Values",
    challenge: "Digital-first competitors were offering faster account openings while this institution's onboarding took days. The challenge: maintain trust, integrity, and innovation while eliminating friction.",
    whatWeDid: "Designed a mobile-first digital onboarding experience with biometric authentication. Integrated eKYC, ID validation, and AML screening into one seamless flow. Connected backend systems for straight-through account opening.",
    results: "Reduced onboarding from days to minutes, increased digital adoption, and achieved a fully compliant, frictionless journey.",
    metrics: ["85% faster customer onboarding", "50% increase in digital sign-ups", "100% automated compliance validation"],
  },
  "abu-dhabi-government-shared-services": {
    num: "09", title: "Shared Services Transformation", client: "Abu Dhabi Government Entity", sector: "Government",
    heroDescription: "Creating agility and efficiency in public service delivery.",
    description: "A large Abu Dhabi government department was operating HR, finance, procurement, and IT independently, resulting in duplication, inefficiency, and poor service delivery.",
    challengeTitle: "Fragmented Processes and Departmental Silos",
    challenge: "Leadership needed a single shared services framework that improved coordination, reduced cost-to-serve, and made it easier for employees to access support.",
    whatWeDid: "Mapped 25 cross-departmental processes and identified redundancy points. Redesigned workflows using low-code automation for rapid rollout. Integrated systems and created a centralised shared services portal. Trained teams to adopt new digital service models.",
    results: "25 services automated in less than three months, with improved transparency and satisfaction across employees and internal customers.",
    metrics: ["40% faster service delivery", "25 services automated", "25% higher employee satisfaction"],
  },
  "investment-bank-credit-risk": {
    num: "10", title: "AI Credit Risk Management", client: "Leading Investment Bank", sector: "Banking",
    heroDescription: "Building a transparent, data-driven credit risk framework.",
    description: "An investment bank's credit approval process relied on manual spreadsheets, siloed data sources, and inconsistent methodologies across departments.",
    challengeTitle: "Manual Risk Assessments Delaying Critical Approvals",
    challenge: "Decision-making was slow and reactive, increasing exposure to risk and lost revenue opportunities.",
    whatWeDid: "Designed a real-time AI-driven credit risk scoring system. Unified data from core lending, risk, and finance platforms. Built role-based dashboards for risk and finance leadership. Automated alerts for threshold breaches and trend anomalies.",
    results: "Accelerated credit approvals, improved data quality and portfolio oversight, and delivered governance-ready transparency.",
    metrics: ["60% faster credit approvals", "25% reduction in exposure variance", "100% unified portfolio visibility"],
  },
  "islamic-bank-trade-surveillance": {
    num: "11", title: "Trade Surveillance Automation", client: "Leading Islamic Bank", sector: "Islamic Finance",
    heroDescription: "Meeting SAMA compliance through intelligent automation.",
    description: "A leading Islamic bank faced growing compliance pressure to enhance post-trade monitoring amid rising transaction volumes. Its existing tools lacked integration between AML, sanctions, and surveillance data.",
    challengeTitle: "Legacy Monitoring Unable to Detect Complex Anomalies",
    challenge: "ATS5E was engaged to deploy a unified, AI-driven surveillance platform capable of improving accuracy, reducing false alerts, and ensuring full alignment with SAMA's latest compliance mandates.",
    whatWeDid: "Implemented a modular trade surveillance system powered by AI. Integrated data from AML, sanctions, and trading systems. Automated anomaly detection and case management workflows. Delivered compliance dashboards for audit and board oversight.",
    results: "Enhanced transparency, accelerated investigation turnaround times, and strengthened regulatory alignment.",
    metrics: ["95% surveillance coverage", "100% compliance alignment", "<30 second alert triage time"],
  },
  "regional-fi-regulatory-reporting": {
    num: "12", title: "Regulatory Reporting Automation", client: "Regional Financial Institution", sector: "Banking",
    heroDescription: "Achieving control and accuracy across jurisdictions.",
    description: "A regional bank operating across multiple GCC markets struggled with complex, manual regulatory reporting. Teams were spending hundreds of hours compiling data for each submission.",
    challengeTitle: "Manual Reporting Creating Compliance Bottlenecks",
    challenge: "Leadership needed to automate regulatory reporting end-to-end — from data collection to submission — while improving control and accuracy across jurisdictions.",
    whatWeDid: "Implemented AI-driven reporting workflows with built-in data validation. Integrated data from finance, compliance, and operations systems. Automated regulatory submission and audit logging. Created dashboards for compliance tracking.",
    results: "Reduced reporting effort significantly and improved accuracy, timeliness, and regulatory assurance.",
    metrics: ["90% reduction in manual report prep time", "100% compliance accuracy", "50% faster submission cycles"],
  },
  "gcc-investment-group-data": {
    num: "13", title: "Cloud Data Infrastructure", client: "Leading Investment Group", sector: "Investment",
    heroDescription: "Building a unified foundation for insight and governance.",
    description: "A diversified investment group with subsidiaries across the GCC was burdened by fragmented systems, inconsistent reporting, and siloed data.",
    challengeTitle: "Fragmented Systems Creating Data Blind Spots",
    challenge: "ATS5E was engaged to create a unified, cloud-native data architecture that would deliver consistency, transparency, and scalability across the enterprise.",
    whatWeDid: "Migrated siloed data into a governed, cloud-based data fabric. Integrated ERP, CRM, and finance systems into a single reporting layer. Built executive dashboards for financial and operational insight. Implemented robust access control and data governance protocols.",
    results: "Established a single source of truth across all subsidiaries with accelerated analytics and strengthened governance.",
    metrics: ["40% faster analytics delivery", "20% improvement in data accuracy", "100% governance compliance"],
  },
  "uae-bank-digital-collections": {
    num: "14", title: "Digital Collections & Recovery Optimisation", client: "Leading UAE Bank", sector: "Banking",
    heroDescription: "Leveraging AI to improve repayment outcomes.",
    description: "A leading UAE bank sought to improve its loan recovery rates and reduce non-performing loans. Its collections process was largely manual, reactive, and dependent on static repayment models.",
    challengeTitle: "Rising Delinquency Rates Straining Recovery Performance",
    challenge: "Manual, static approaches failed to adapt to changing customer behaviours, resulting in suboptimal recovery performance.",
    whatWeDid: "Implemented predictive AI models to detect early delinquency indicators. Automated customer engagement and repayment reminders. Integrated collection data into a centralised analytics dashboard. Created dynamic prioritisation logic to maximise recovery impact.",
    results: "Improved collection rates, reduced delinquency exposure, and delivered better outcomes without increasing operational cost.",
    metrics: ["20% reduction in NPL ratio", "30% faster case resolution", "15% increase in recovery efficiency"],
  },
};

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
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
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-zinc-600 hover:text-zinc-300 transition-colors mb-10 font-medium">
            <ArrowLeft className="w-3 h-3" /> Case Studies
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] tracking-[0.28em] uppercase font-medium text-zinc-700">{cs.num}</span>
            <span className="h-px w-8" style={{ background: "rgba(255,255,255,0.1)" }} />
            <span className="text-[10px] tracking-[0.22em] uppercase font-bold" style={{ color: "#148be6" }}>{cs.sector}</span>
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
                <p className="text-xs tracking-[0.12em] uppercase text-zinc-300 font-medium">{m.split(" ").slice(1).join(" ")}</p>
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
              <h2 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-4" style={{ color: "#148be6" }}>The Challenge</h2>
              <h3 className="text-xl font-black uppercase tracking-[-0.03em] mb-4">{cs.challengeTitle}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">{cs.challenge}</p>
            </div>
            <div>
              <h2 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-4" style={{ color: "#148be6" }}>What We Did</h2>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">{cs.whatWeDid}</p>
            </div>
            <div>
              <h2 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-4" style={{ color: "#148be6" }}>The Results</h2>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">{cs.results}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl p-8"
              style={{ background: "linear-gradient(135deg,rgba(20,139,230,0.08),rgba(20,139,230,0.02))", border: "1px solid rgba(20,139,230,0.2)" }}
            >
              <p className="text-[10px] tracking-[0.28em] uppercase font-bold mb-2" style={{ color: "#148be6" }}>Client</p>
              <p className="text-sm font-black uppercase tracking-[-0.02em] mb-4">{cs.client}</p>
              <p className="text-[10px] tracking-[0.28em] uppercase font-bold mb-2" style={{ color: "#148be6" }}>Sector</p>
              <p className="text-sm font-medium text-zinc-400">{cs.sector}</p>
            </div>

            <div className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-xs tracking-[0.28em] uppercase font-bold text-zinc-400 mb-4">Ready to Achieve Similar Results?</p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase text-white hover:shadow-glow-blue-sm transition-all duration-300"
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
