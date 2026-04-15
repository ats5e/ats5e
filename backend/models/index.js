const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SolutionSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String }, // stores icon name or URL
  image: { type: String },
  category: { type: String },
  detailedContent: { type: String }, // rich text/markdown
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

exports.Solution = mongoose.model('Solution', SolutionSchema);

const CaseStudySchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  challenge: { type: String, required: true },
  solution: { type: String, required: true },
  outcome: { type: String, required: true },
  industry: { type: String },
  image: { type: String },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

exports.CaseStudy = mongoose.model('CaseStudy', CaseStudySchema);

const InsightSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: { type: String },
  date: { type: Date, default: Date.now },
  category: { type: String },
  summary: { type: String },
  bodyContent: { type: String }, // richtext/markdown
  image: { type: String },
  downloadFileUrl: { type: String },
  published: { type: Boolean, default: false },
  showcaseOnHome: { type: Boolean, default: false },
  showcaseOrder: { type: Number, default: 0 },
}, { timestamps: true });

exports.Insight = mongoose.model('Insight', InsightSchema);

const TeamMemberSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  photoUrl: { type: String },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

const TeamMember = mongoose.model('TeamMember', TeamMemberSchema);
exports.TeamMember = TeamMember;

const PartnerSchema = new Schema({
  name: { type: String, required: true },
  logoUrl: { type: String, required: true },
  website: { type: String },
  category: { type: String },
  description: { type: String },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

const Partner = mongoose.model('Partner', PartnerSchema);
exports.Partner = Partner;

const HomePageSchema = new Schema({
  heroHeadline: { type: String, default: "INTELLIGENCE.\nAPPLIED." },
  heroSubheadline: { type: String, default: "We are a specialist execution partner for forward-thinking\nenterprises in the GCC & South Pacific." },
  heroPrimaryCtaLabel: { type: String, default: "Explore The 5Es" },
  heroSecondaryCtaLabel: { type: String, default: "Contact Us" },
  stat1Value: { type: String, default: "25–50%" },
  stat1Label: { type: String, default: "Lower Operating Costs" },
  stat2Value: { type: String, default: "248%" },
  stat2Label: { type: String, default: "ROI on Enterprise Automation" },
  stat3Value: { type: String, default: "+30%" },
  stat3Label: { type: String, default: "Increase in Productivity" },
  fiveESectionEyebrow: { type: String, default: "Core Framework" },
  fiveEHeadline: { type: String, default: "THE 5E FRAMEWORK." },
  fiveESubheadline: { type: String, default: "Our 5E Framework is our commitment to holistic, de-risked transformation. It ensures that technology, process, and people evolve together — turning ambition into a sustainable reality of improved operations and better customer experiences." },
  fiveESectionCtaLabel: { type: String, default: "View Full Framework" },
  fiveECard1Tag: { type: String, default: "Experience" },
  fiveECard1Headline: { type: String, default: "HUMAN.\nCENTERED." },
  fiveECard1Tagline: { type: String, default: "Human-centered digital experiences that are intuitive and engaging for both employees and customers." },
  fiveECard2Tag: { type: String, default: "Empowerment" },
  fiveECard2Headline: { type: String, default: "DECIDE.\nSMARTER." },
  fiveECard2Tagline: { type: String, default: "AI-driven solutions providing actionable intelligence at every level for smarter decisions and higher customer satisfaction." },
  fiveECard3Tag: { type: String, default: "Efficiency" },
  fiveECard3Headline: { type: String, default: "AUTOMATE.\nEVERYTHING." },
  fiveECard3Tagline: { type: String, default: "Intelligent automation to do more, faster and smarter, with less wasted effort—so you can focus on what matters most: your customer." },
  fiveECard4Tag: { type: String, default: "Execution" },
  fiveECard4Headline: { type: String, default: "VISION.\nDELIVERED." },
  fiveECard4Tagline: { type: String, default: "From strategy to delivery, flawlessly executed, ensuring the vision turns into real results that your customers will feel." },
  fiveECard5Tag: { type: String, default: "Evolution" },
  fiveECard5Headline: { type: String, default: "MODERNISE.\nFEARLESSLY." },
  fiveECard5Tagline: { type: String, default: "Legacy modernization without the downtime, so you can scale up without disruption to your business or your customers." },
  solutionsEyebrow: { type: String, default: "What We Do" },
  solutionsHeadline: { type: String, default: "OUR SOLUTIONS." },
  solutionsSubheadline: { type: String, default: "We don't just advise; we embed, execute, and guarantee the outcome — ensuring your strategic investment translates into a strategic advantage and better experiences for your customers, delivered seamlessly, securely, and at scale." },
  solutionsCtaLabel: { type: String, default: "View All Solutions" },
  testimonialQuote: { type: String, default: "In a sector where large-scale transformation is synonymous with disruption, ATS5E delivered the opposite. Their deep banking DNA meant they understood our risks from day one, and their team provided flawless execution from start to finish. They turned a complex roadmap into a stable, scalable reality — without the usual headaches. They are the execution partner you can trust." },
  testimonialAuthor: { type: String, default: "CIO, Leading UAE Bank" },
  testimonialCtaLabel: { type: String, default: "View Our Work" },
  eduflowEyebrow: { type: String, default: "Our Education Intelligence Layer" },
  eduflowHeadline: { type: String, default: "EDUCATION.\nORCHESTRATED." },
  eduflowSubheadline: { type: String, default: "EduFlow360 turns disconnected SIS, LMS, and ERP platforms into one coordinated operating layer, giving institutions sharper financial visibility, smoother student journeys, and modern automation without replacing the systems they already trust." },
  eduflowCtaLabel: { type: String, default: "Explore" },
  ctaEyebrow: { type: String, default: "Partner With Us" },
  ctaHeadline: { type: String, default: "LET'S BUILD." },
  ctaSubheadline: { type: String, default: "Partner with us to unlock new possibilities with our exclusive solutions. Transformation begins with a single conversation." },
  ctaButtonLabel: { type: String, default: "Start the Conversation" },
}, { timestamps: true });

const HomePage = mongoose.model('HomePage', HomePageSchema);
exports.HomePage = HomePage;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // will store hashed password
  role: { type: String, default: 'admin' },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
exports.User = User;
