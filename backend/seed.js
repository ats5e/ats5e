require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const models = require('./models');

const SOLUTIONS = [
  { slug: "Data-Infrastructure-Governance", title: "Data Infrastructure & Governance", description: "You can't control what you can't see. We make control visible.", icon: "Database", displayOrder: 1 },
  { slug: "AI-intelligence", title: "AI-Powered Decision Intelligence", description: "Turn complexity into clarity.", icon: "Brain", displayOrder: 2 },
  { slug: "Legacy-Modernisation", title: "Legacy Modernisation & Cloud Evolution", description: "Modernise without breaking.", icon: "Cloud", displayOrder: 3 },
  { slug: "Intelligent-Automation", title: "Intelligent Automation & Agentic AI", description: "From automation to autonomy.", icon: "Bot", displayOrder: 4 },
  { slug: "ConversationalAI", title: "Conversational AI & Digital Assistants", description: "Service that feels human — at machine speed.", icon: "MessageSquare", displayOrder: 5 },
  { slug: "compliance-risk", title: "Compliance, Risk & Fraud Intelligence", description: "The strongest control is the one you never notice.", icon: "Shield", displayOrder: 6 },
  { slug: "Credit-Risk", title: "Credit Risk & Underwriting Intelligence", description: "Credit excellence is a discipline. We make it repeatable.", icon: "LineChart", displayOrder: 7 },
  { slug: "Treasury-Liquidity", title: "Treasury & Liquidity Intelligence", description: "When conditions shift, your liquidity posture should shift with them.", icon: "Landmark", displayOrder: 8 },
  { slug: "Human-Centred-Digital-Experience", title: "Human-Centred Digital Experience", description: "Experience turns a system into a habit.", icon: "Target", displayOrder: 9 },
  { slug: "transformation-execution", title: "End-to-End Transformation Execution", description: "We don't advise and walk away — we land the outcome.", icon: "Workflow", displayOrder: 10 },
  { slug: "Enterprise-Integration", title: "Enterprise Integration & Workflow", description: "Unify the disconnected.", icon: "Network", displayOrder: 11 },
  { slug: "education", title: "Tailored Education Solutions", description: "Systems that make academic delivery, operations and finance work as one — delivered quietly, at speed.", icon: "GraduationCap", displayOrder: 12 },
];

const CASE_STUDIES = [
  { slug: "tier-1-bank-ai-transformation", title: "AI-Enabled Transformation", clientName: "Tier 1 UAE Bank", challenge: "Scaling compliance", solution: "AI Intervention", outcome: "70% faster fraud intervention", industry: "Banking" },
  { slug: "saudi-bank-enterprise-pmo", title: "Enterprise PMO", clientName: "Leading Saudi Bank", challenge: "Capability gaps", solution: "Bank-wide EPMO", outcome: "230+ branches served", industry: "Banking" },
  { slug: "ksa-stack-card-acquirer", title: "Cloud-Native KSA Stack", clientName: "Regional Card Acquirer", challenge: "Legacy infrastructure", solution: "Cloud-native platform", outcome: "3 environments delivered", industry: "Payments" },
  { slug: "abu-dhabi-bank-offshoring", title: "IT & Operations Offshoring", clientName: "Abu Dhabi Bank", challenge: "High operational costs", solution: "Offshoring model", outcome: "60 days to regulatory approval", industry: "Banking" },
  { slug: "gcc-bank-contact-centre", title: "Contact Centre Modernisation", clientName: "Leading GCC Retail Bank", challenge: "High call volume", solution: "Modernized contact centre", outcome: "60–70% reduction in call volume", industry: "Banking" },
];

const PARTNERS = [
  { name: "QBricks", logoUrl: "/Partners/QBricks.png", category: "AI Metadata Management", description: "A native Databricks integration that revolutionizes metadata management using agentic AI to dramatically improve data quality, apply transformation rules, and accelerate AI strategy from record to report.", displayOrder: 1 },
  { name: "Nextwave Infinium", logoUrl: "/Partners/Nextwave Infinium.png", category: "Enterprise Consulting & Delivery", description: "A specialist consulting firm delivering complex transformation, data, and technology initiatives for global financial institutions by bridging high-level strategy with modern agile delivery.", displayOrder: 2 },
  { name: "Microsoft Fabric", logoUrl: "/Partners/Microsoft Fabric.png", category: "Enterprise Data Platform", description: "An end-to-end analytics and data platform providing a unified foundation for enterprise data, integrating seamlessly with existing ecosystems to power intelligent decision making at scale.", displayOrder: 3 },
  { name: "Quantexa", logoUrl: "/Partners/Quantexa.png", category: "Decision Intelligence", description: "A leading decision intelligence platform that connects billions of data points across internal and external sources to provide a single view of data, empowering organizations to manage risk and combat fraud.", displayOrder: 4 },
  { name: "Smartstream", logoUrl: "/Partners/Smartstream.svg", category: "Transaction Lifecycle Management", description: "Delivering innovative software solutions for transaction lifecycle management, enabling financial institutions to automate post-trade processing, reduce risk, and optimize operational efficiency.", displayOrder: 5 },
  { name: "UiPath", logoUrl: "/Partners/UiPath.png", category: "Enterprise Automation", description: "The industry-leading enterprise automation platform combining Robotic Process Automation (RPA) with advanced AI to streamline complex business processes and eliminate manual effort.", displayOrder: 6 },
  { name: "VaultsPay", logoUrl: "/eduflow-partners/VaultsPay Logo.png", category: "Payment Solutions", description: "Strategic payment partner delivering secure and seamless transaction capabilities across the ecosystem.", displayOrder: 7 },
];

function createInsightBodyContent({ intro, sections }) {
  return [
    intro,
    ...sections.map((section) => `## ${section.heading}\n${section.body}`),
  ].join('\n\n');
}

const INSIGHT_DETAILS = {
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
  },
};

const INSIGHTS = Object.entries(INSIGHT_DETAILS).map(([slug, insight]) => ({
  slug,
  title: insight.title,
  category: insight.tag,
  summary: insight.subtitle,
  bodyContent: createInsightBodyContent(insight),
  published: true,
}));

const TEAM_MEMBERS = [
  { name: "William Higgins", role: "Chairman", bio: "William has spent the last decade deeply embedded in the GCC financial sector...", photoUrl: "/William.png", displayOrder: 1 },
  { name: "Kumar Jaisingh", role: "Chief Product & Delivery Officer", bio: "Kumar leads product strategy and execution, bringing 28 years of experience...", photoUrl: "/Kumar.png", displayOrder: 2 },
  { name: "Gaurav Diwan", role: "Chief Technology Officer", bio: "Gaurav leads the design and execution of enterprise-scale transformation...", photoUrl: "/Gaurav.png", displayOrder: 3 },
  { name: "Jack Donaldson", role: "Head of Marketing & Communications", bio: "A dynamic marketing and communications leader with a proven record of driving brand growth...", photoUrl: "/Jack.png", displayOrder: 4 },
  { name: "Tchengiz Siddiqi", role: "Head of Sales", bio: "Leads commercial strategy across the GCC and South Pacific...", photoUrl: "/Tchengiz.png", displayOrder: 5 },
  { name: "Ayesha Azhar", role: "Head of Operations", bio: "Brings over four years of experience establishing and managing best-in-class Project Management Offices...", photoUrl: "/Ayesha.png", displayOrder: 6 },
];

async function seedData() {
  console.log('Starting DB Seeding...');
  // Clear existing
  await models.Solution.deleteMany({});
  await models.CaseStudy.deleteMany({});
  await models.Partner.deleteMany({});
  await models.Insight.deleteMany({});
  await models.TeamMember.deleteMany({});
  await models.HomePage.deleteMany({});
  await models.User.deleteMany({});
  console.log('Cleared existing collections!');

  // Reset admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Google99@', 10);
  await models.User.create({
    email: process.env.ADMIN_EMAIL || 'jack@ats5e.com',
    password: hashedPassword,
    role: 'admin'
  });
  console.log('Admin user created/reset!');

  // Seed
  await models.Solution.insertMany(SOLUTIONS);
  await models.CaseStudy.insertMany(CASE_STUDIES);
  await models.Partner.insertMany(PARTNERS);
  await models.Insight.insertMany(INSIGHTS);
  await models.TeamMember.insertMany(TEAM_MEMBERS);
  
  // Default Site Settings
  await models.HomePage.create({});

  console.log('Database Seeding Completed Successfully!');
}

if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
      console.log('Connected to MongoDB for Seeding...');
      await seedData();
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seeding Error:', err);
      process.exit(1);
    });
}

module.exports = { seedData, SOLUTIONS, CASE_STUDIES, PARTNERS, INSIGHTS, TEAM_MEMBERS };
