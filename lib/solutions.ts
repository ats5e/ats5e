import {
  Brain,
  Bot,
  Cloud,
  Database,
  GraduationCap,
  Landmark,
  LineChart,
  MessageSquare,
  Network,
  Shield,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type SolutionSummary = {
  num: string;
  slug: string;
  title: string;
  tagline: string;
  icon: LucideIcon;
};

export const SOLUTIONS: SolutionSummary[] = [
  {
    num: "01",
    slug: "Data-Infrastructure-Governance",
    title: "Data Infrastructure & Governance",
    tagline: "You can't control what you can't see. We make control visible.",
    icon: Database,
  },
  {
    num: "02",
    slug: "AI-intelligence",
    title: "AI-Powered Decision Intelligence",
    tagline: "Turn complexity into clarity.",
    icon: Brain,
  },
  {
    num: "03",
    slug: "Legacy-Modernisation",
    title: "Legacy Modernisation & Cloud Evolution",
    tagline: "Modernise without breaking.",
    icon: Cloud,
  },
  {
    num: "04",
    slug: "Intelligent-Automation",
    title: "Intelligent Automation & Agentic AI",
    tagline: "From automation to autonomy.",
    icon: Bot,
  },
  {
    num: "05",
    slug: "ConversationalAI",
    title: "Conversational AI & Digital Assistants",
    tagline: "Service that feels human — at machine speed.",
    icon: MessageSquare,
  },
  {
    num: "06",
    slug: "compliance-risk",
    title: "Compliance, Risk & Fraud Intelligence",
    tagline: "The strongest control is the one you never notice.",
    icon: Shield,
  },
  {
    num: "07",
    slug: "Credit-Risk",
    title: "Credit Risk & Underwriting Intelligence",
    tagline: "Credit excellence is a discipline. We make it repeatable.",
    icon: LineChart,
  },
  {
    num: "08",
    slug: "Treasury-Liquidity",
    title: "Treasury & Liquidity Intelligence",
    tagline: "When conditions shift, your liquidity posture should shift with them.",
    icon: Landmark,
  },
  {
    num: "09",
    slug: "Human-Centred-Digital-Experience",
    title: "Human-Centred Digital Experience",
    tagline: "Experience turns a system into a habit.",
    icon: Target,
  },
  {
    num: "10",
    slug: "transformation-execution",
    title: "End-to-End Transformation Execution",
    tagline: "We don't advise and walk away — we land the outcome.",
    icon: Workflow,
  },
  {
    num: "11",
    slug: "Enterprise-Integration",
    title: "Enterprise Integration & Workflow",
    tagline: "Unify the disconnected.",
    icon: Network,
  },
  {
    num: "12",
    slug: "education",
    title: "Tailored Education Solutions",
    tagline: "Systems that make academic delivery, operations and finance work as one — delivered quietly, at speed.",
    icon: GraduationCap,
  },
];

export const SOLUTIONS_BY_SLUG: Record<string, SolutionSummary> = Object.fromEntries(
  SOLUTIONS.map((solution) => [solution.slug, solution]),
);
