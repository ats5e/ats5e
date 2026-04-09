require('dotenv').config();
const mongoose = require('mongoose');
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
  { name: "QBricks", logoUrl: "/Partners/QBricks.png", category: "AI Metadata Management", description: "A native Databricks integration that revolutionizes metadata management...", displayOrder: 1 },
  { name: "Nextwave Infinium", logoUrl: "/Partners/Nextwave Infinium.png", category: "Enterprise Consulting & Delivery", description: "A specialist consulting firm delivering complex transformation...", displayOrder: 2 },
  { name: "Microsoft Fabric", logoUrl: "/Partners/Microsoft Fabric.jpeg", category: "Enterprise Data Platform", description: "An end-to-end analytics and data platform...", displayOrder: 3 },
  { name: "Quantexa", logoUrl: "/Partners/Quantexa.png", category: "Decision Intelligence", description: "A leading decision intelligence platform that connects billions of data points...", displayOrder: 4 },
  { name: "Smartstream", logoUrl: "/Partners/Smartstream.svg", category: "Transaction Lifecycle Management", description: "Delivering innovative software solutions for transaction lifecycle management...", displayOrder: 5 },
  { name: "UiPath", logoUrl: "/Partners/UiPath.png", category: "Enterprise Automation", description: "The industry-leading enterprise automation platform combining RPA with advanced AI...", displayOrder: 6 },
];

const INSIGHTS = [
  { slug: "a2a-instant-payments-gcc", title: "A2A & Instant Payments in the GCC", category: "Payments", summary: "From Launches to Full-Funnel Value", published: true },
  { slug: "agentic-ai-task-to-outcome", title: "From Doing Tasks to Achieving Outcomes", category: "AI & Automation", summary: "The Next Evolution: Agentic AI", published: true },
  { slug: "iso-20022-data-dividend", title: "ISO 20022: The Data Dividend", category: "Regulation", summary: "A 2025 Deadline You Can't Miss", published: true },
  { slug: "agentic-ai-tco-efficiency", title: "Redefining Operational Efficiency and TCO", category: "AI & Automation", summary: "Targeting the Cognitive Work RPA Can't Touch", published: true },
  { slug: "agentic-ai-risk-compliance", title: "The Control Imperative for a Real-Time World", category: "Risk & Compliance", summary: "Moving Beyond the 90% False Positive Problem", published: true },
  { slug: "whitepaper-bots-to-business", title: "From Bots to Business Value", category: "Whitepaper", summary: "The Executive Blueprint for Agentic AI at Scale", published: true },
];

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
  console.log('Cleared existing collections!');

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

module.exports = { seedData };
