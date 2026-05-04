const fs = require('fs');
const path = require('path');

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
  { name: "QBricks", logoUrl: "/Partners/QBricks.png", category: "AI Metadata Management", description: "A native Databricks integration that revolutionizes metadata management...", displayOrder: 1 },
  { name: "Nextwave Infinium", logoUrl: "/Partners/Nextwave Infinium.png", category: "Enterprise Consulting & Delivery", description: "A specialist consulting firm delivering complex transformation...", displayOrder: 2 },
  { name: "Microsoft Fabric", logoUrl: "/Partners/Microsoft Fabric.jpeg", category: "Enterprise Data Platform", description: "An end-to-end analytics and data platform...", displayOrder: 3 },
  { name: "Quantexa", logoUrl: "/Partners/Quantexa.png", category: "Decision Intelligence", description: "A leading decision intelligence platform that connects billions of data points...", displayOrder: 4 },
  { name: "Smartstream", logoUrl: "/Partners/Smartstream.svg", category: "Transaction Lifecycle Management", description: "Delivering innovative software solutions for transaction lifecycle management...", displayOrder: 5 },
  { name: "UiPath", logoUrl: "/Partners/UiPath.png", category: "Enterprise Automation", description: "The industry-leading enterprise automation platform combining RPA with advanced AI...", displayOrder: 6 },
];

const exportsPath = './backend/database_export';
if (!fs.existsSync(exportsPath)) fs.mkdirSync(exportsPath, { recursive: true });

fs.writeFileSync(path.join(exportsPath, 'solutions.json'), JSON.stringify(SOLUTIONS, null, 2));
fs.writeFileSync(path.join(exportsPath, 'case_studies.json'), JSON.stringify(CASE_STUDIES, null, 2));
fs.writeFileSync(path.join(exportsPath, 'partners.json'), JSON.stringify(PARTNERS, null, 2));

console.log('JSON exports generated successfully in backend/database_export/');
