"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, type CSSProperties } from "react";
import { Waves } from "@/components/Waves";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Database, Brain, Cloud, Bot, MessageSquare, Shield, LineChart, Landmark, Target, Workflow, Network, GraduationCap, FileDown, type LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchCmsCollection, logCmsFallback, sortByDisplayOrder, type CmsHomePage, type CmsInsight, type CmsSolution } from "@/lib/cms";
import { fadeUp } from "@/lib/motion";
import { SOLUTIONS, type SolutionSummary } from "@/lib/solutions";

const ICON_MAP: Record<string, LucideIcon> = {
  Database, Brain, Cloud, Bot, MessageSquare, Shield, LineChart, Landmark, Target, Workflow, Network, GraduationCap
};

type HomePageContent = {
  heroHeadline: string;
  heroSubheadline: string;
  heroPrimaryCtaLabel: string;
  heroSecondaryCtaLabel: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  fiveESectionEyebrow: string;
  fiveEHeadline: string;
  fiveESubheadline: string;
  fiveESectionCtaLabel: string;
  fiveECard1Tag: string;
  fiveECard1Headline: string;
  fiveECard1Tagline: string;
  fiveECard2Tag: string;
  fiveECard2Headline: string;
  fiveECard2Tagline: string;
  fiveECard3Tag: string;
  fiveECard3Headline: string;
  fiveECard3Tagline: string;
  fiveECard4Tag: string;
  fiveECard4Headline: string;
  fiveECard4Tagline: string;
  fiveECard5Tag: string;
  fiveECard5Headline: string;
  fiveECard5Tagline: string;
  solutionsEyebrow: string;
  solutionsHeadline: string;
  solutionsSubheadline: string;
  solutionsCtaLabel: string;
  testimonialQuote: string;
  testimonialAuthor: string;
  testimonialCtaLabel: string;
  eduflowEyebrow: string;
  eduflowHeadline: string;
  eduflowSubheadline: string;
  eduflowCtaLabel: string;
  ctaEyebrow: string;
  ctaHeadline: string;
  ctaSubheadline: string;
  ctaButtonLabel: string;
};

type HomeInsightPreview = {
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  excerpt: string;
  image: string;
  dateLabel: string;
  timestamp: number;
  hasDownload: boolean;
};

// ─── Content ─────────────────────────────────────────────────────────────────
const DEFAULT_HOME_PAGE_CONTENT: HomePageContent = {
  heroHeadline: "INTELLIGENCE.\nAPPLIED.",
  heroSubheadline: "We are a specialist execution partner for forward-thinking\nenterprises in the GCC & South Pacific.",
  heroPrimaryCtaLabel: "Explore The 5Es",
  heroSecondaryCtaLabel: "Contact Us",
  stat1Value: "25–50%",
  stat1Label: "Lower Operating Costs",
  stat2Value: "248%",
  stat2Label: "ROI on Enterprise Automation",
  stat3Value: "+30%",
  stat3Label: "Increase in Productivity",
  fiveESectionEyebrow: "Core Framework",
  fiveEHeadline: "THE 5E FRAMEWORK.",
  fiveESubheadline: "Our 5E Framework is our commitment to holistic, de-risked transformation. It ensures that technology, process, and people evolve together — turning ambition into a sustainable reality of improved operations and better customer experiences.",
  fiveESectionCtaLabel: "View Full Framework",
  fiveECard1Tag: "Experience",
  fiveECard1Headline: "HUMAN.\nCENTERED.",
  fiveECard1Tagline: "Human-centered digital experiences that are intuitive and engaging for both employees and customers.",
  fiveECard2Tag: "Empowerment",
  fiveECard2Headline: "DECIDE.\nSMARTER.",
  fiveECard2Tagline: "AI-driven solutions providing actionable intelligence at every level for smarter decisions and higher customer satisfaction.",
  fiveECard3Tag: "Efficiency",
  fiveECard3Headline: "AUTOMATE.\nEVERYTHING.",
  fiveECard3Tagline: "Intelligent automation to do more, faster and smarter, with less wasted effort—so you can focus on what matters most: your customer.",
  fiveECard4Tag: "Execution",
  fiveECard4Headline: "VISION.\nDELIVERED.",
  fiveECard4Tagline: "From strategy to delivery, flawlessly executed, ensuring the vision turns into real results that your customers will feel.",
  fiveECard5Tag: "Evolution",
  fiveECard5Headline: "MODERNISE.\nFEARLESSLY.",
  fiveECard5Tagline: "Legacy modernization without the downtime, so you can scale up without disruption to your business or your customers.",
  solutionsEyebrow: "What We Do",
  solutionsHeadline: "OUR SOLUTIONS.",
  solutionsSubheadline: "We don't just advise; we embed, execute, and guarantee the outcome — ensuring your strategic investment translates into a strategic advantage and better experiences for your customers, delivered seamlessly, securely, and at scale.",
  solutionsCtaLabel: "View All Solutions",
  testimonialQuote: "In a sector where large-scale transformation is synonymous with disruption, ATS5E delivered the opposite. Their deep banking DNA meant they understood our risks from day one, and their team provided flawless execution from start to finish. They turned a complex roadmap into a stable, scalable reality — without the usual headaches. They are the execution partner you can trust.",
  testimonialAuthor: "CIO, Leading UAE Bank",
  testimonialCtaLabel: "View Our Work",
  eduflowEyebrow: "Our Education Intelligence Layer",
  eduflowHeadline: "EDUCATION.\nORCHESTRATED.",
  eduflowSubheadline: "EduFlow360 turns disconnected SIS, LMS, and ERP platforms into one coordinated operating layer, giving institutions sharper financial visibility, smoother student journeys, and modern automation without replacing the systems they already trust.",
  eduflowCtaLabel: "Explore",
  ctaEyebrow: "Partner With Us",
  ctaHeadline: "LET'S BUILD.",
  ctaSubheadline: "Partner with us to unlock new possibilities with our exclusive solutions. Transformation begins with a single conversation.",
  ctaButtonLabel: "Start the Conversation",
};

const insightDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const INSIGHT_FALLBACK_IMAGES = [
  "/imagery/20251001_1703_Digital Stock Analysis_remix_01k6fxtje2fjsrk542r142yqve.png",
  "/imagery/20251001_1702_Futuristic Silhouettes_remix_01k6fxqywmem39yvvw3h4hp4j1.png",
  "/imagery/enhanced_20251001_1648_High-Resolution Visualization_remix_01k6fwzvn7ecxbrvkbsxtbcgca.png",
  "/imagery/20251001_1706_Colorful Light Corridor_remix_01k6fy0c5pfv0vtqgpj7tw7nhn.png",
];

const DEFAULT_HOME_INSIGHTS: HomeInsightPreview[] = [
  {
    slug: "whitepaper-bots-to-business",
    tag: "Whitepaper",
    title: "From Bots to Business Value",
    subtitle: "The Executive Blueprint for Agentic AI at Scale",
    excerpt: "Despite significant investment, only 3% of organizations have successfully scaled automation. This executive blueprint focuses on how to move beyond tactical bots and build outcome-led agentic operating models.",
    image: INSIGHT_FALLBACK_IMAGES[0],
    dateLabel: "Apr 7, 2026",
    timestamp: Date.parse("2026-04-07"),
    hasDownload: true,
  },
  {
    slug: "agentic-ai-risk-compliance",
    tag: "Risk & Compliance",
    title: "The Control Imperative for a Real-Time World",
    subtitle: "Moving Beyond the 90% False Positive Problem",
    excerpt: "As monitoring obligations intensify, institutions need controls that move at the speed of the events they are policing. This piece looks at how agentic supervision changes the economics of compliance.",
    image: INSIGHT_FALLBACK_IMAGES[1],
    dateLabel: "Mar 30, 2026",
    timestamp: Date.parse("2026-03-30"),
    hasDownload: false,
  },
  {
    slug: "agentic-ai-tco-efficiency",
    tag: "AI & Automation",
    title: "Redefining Operational Efficiency and TCO",
    subtitle: "Targeting the Cognitive Work RPA Can't Touch",
    excerpt: "The value case for agentic systems is bigger than labor reduction. We unpack where the true TCO reset happens when complex exception-heavy work is designed for autonomous execution.",
    image: INSIGHT_FALLBACK_IMAGES[2],
    dateLabel: "Mar 18, 2026",
    timestamp: Date.parse("2026-03-18"),
    hasDownload: false,
  },
  {
    slug: "iso-20022-data-dividend",
    tag: "Regulation",
    title: "ISO 20022: The Data Dividend",
    subtitle: "A 2025 Deadline You Can't Miss",
    excerpt: "ISO 20022 is not just a compliance event. Institutions that treat richer messaging as a strategic data layer unlock far more than standardization.",
    image: INSIGHT_FALLBACK_IMAGES[3],
    dateLabel: "Mar 5, 2026",
    timestamp: Date.parse("2026-03-05"),
    hasDownload: false,
  },
  {
    slug: "agentic-ai-task-to-outcome",
    tag: "AI & Automation",
    title: "From Doing Tasks to Achieving Outcomes",
    subtitle: "The Next Evolution: Agentic AI",
    excerpt: "Agentic systems introduce a new operating model: one where the machine is measured on outcomes, not simply on whether a scripted step was executed correctly.",
    image: INSIGHT_FALLBACK_IMAGES[0],
    dateLabel: "Feb 20, 2026",
    timestamp: Date.parse("2026-02-20"),
    hasDownload: false,
  },
  {
    slug: "a2a-instant-payments-gcc",
    tag: "Payments",
    title: "A2A & Instant Payments in the GCC",
    subtitle: "From Launches to Full-Funnel Value",
    excerpt: "Instant rails are moving beyond novelty. The institutions that win are the ones treating payment events as intelligence that can drive liquidity, risk, and customer value in real time.",
    image: INSIGHT_FALLBACK_IMAGES[1],
    dateLabel: "Feb 12, 2026",
    timestamp: Date.parse("2026-02-12"),
    hasDownload: false,
  },
];

function getHomePageStats(content: HomePageContent) {
  return [
    { value: content.stat1Value, label: content.stat1Label },
    { value: content.stat2Value, label: content.stat2Label },
    { value: content.stat3Value, label: content.stat3Label },
  ];
}

function splitMultilineText(value: string): string[] {
  return normalizeEscapedNewlines(value).split("\n").filter(Boolean);
}

function normalizeEscapedNewlines(value: string): string {
  return value.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n");
}

function createInsightExcerpt(bodyContent?: string, summary?: string): string {
  if (!bodyContent) return summary?.trim() || "";

  const normalized = normalizeEscapedNewlines(bodyContent).replace(/\s+/g, " ").trim();
  if (normalized.length <= 180) return normalized;
  return `${normalized.slice(0, 177).trimEnd()}...`;
}

function getInsightTimestamp(insight: Pick<CmsInsight, "date" | "createdAt" | "updatedAt">): number {
  for (const candidate of [insight.date, insight.updatedAt, insight.createdAt]) {
    const timestamp = Date.parse(candidate ?? "");
    if (!Number.isNaN(timestamp)) {
      return timestamp;
    }
  }

  return 0;
}

function formatInsightDate(candidate?: string): string {
  const timestamp = Date.parse(candidate ?? "");

  if (Number.isNaN(timestamp)) {
    return "Latest Signal";
  }

  return insightDateFormatter.format(new Date(timestamp));
}

function mapCmsInsightToPreview(insight: CmsInsight, index: number): HomeInsightPreview {
  const image = typeof insight.image === "string" && insight.image.trim()
    ? insight.image
    : INSIGHT_FALLBACK_IMAGES[index % INSIGHT_FALLBACK_IMAGES.length];
  const dateSource = [insight.date, insight.updatedAt, insight.createdAt].find(
    (value) => !Number.isNaN(Date.parse(value ?? "")),
  );

  return {
    slug: insight.slug,
    tag: insight.category?.trim() || "Insight",
    title: insight.title,
    subtitle: insight.summary?.trim() || "",
    excerpt: createInsightExcerpt(insight.bodyContent, insight.summary),
    image,
    dateLabel: formatInsightDate(dateSource),
    timestamp: getInsightTimestamp(insight),
    hasDownload: Boolean(typeof insight.downloadFileUrl === "string" && insight.downloadFileUrl.trim()),
  };
}

function getLatestInsightPreviews(items: CmsInsight[]): HomeInsightPreview[] {
  const publishedInsights = items.filter((item) => item.published !== false);
  const showcasedInsights = publishedInsights
    .filter((item) => item.showcaseOnHome)
    .sort((left, right) => {
      const showcaseOrderDelta = (left.showcaseOrder ?? 0) - (right.showcaseOrder ?? 0);

      if (showcaseOrderDelta !== 0) {
        return showcaseOrderDelta;
      }

      return getInsightTimestamp(right) - getInsightTimestamp(left);
    })
    .map((item, index) => mapCmsInsightToPreview(item, index));

  const latestInsights = publishedInsights
    .filter((item) => item.published !== false)
    .sort((left, right) => getInsightTimestamp(right) - getInsightTimestamp(left))
    .map((item, index) => mapCmsInsightToPreview(item, index));

  const mergedInsights = [...showcasedInsights];

  for (const latestInsight of latestInsights) {
    if (mergedInsights.length >= 3) {
      break;
    }

    if (mergedInsights.some((item) => item.slug === latestInsight.slug)) {
      continue;
    }

    mergedInsights.push(latestInsight);
  }

  for (const fallbackInsight of DEFAULT_HOME_INSIGHTS) {
    if (mergedInsights.length >= 3) {
      break;
    }

    if (mergedInsights.some((item) => item.slug === fallbackInsight.slug)) {
      continue;
    }

    mergedInsights.push(fallbackInsight);
  }

  return mergedInsights.slice(0, 3);
}

function normalizeCmsHomePageContent(incoming: CmsHomePage): CmsHomePage {
  return Object.fromEntries(
    Object.entries(incoming).map(([key, value]) => [
      key,
      typeof value === "string" ? normalizeEscapedNewlines(value) : value,
    ]),
  ) as CmsHomePage;
}

function getFiveEs(content: HomePageContent) {
  return [
    {
      id: "experience",
      number: "01",
      tag: content.fiveECard1Tag,
      headline: content.fiveECard1Headline,
      tagline: content.fiveECard1Tagline,
    },
    {
      id: "empowerment",
      number: "02",
      tag: content.fiveECard2Tag,
      headline: content.fiveECard2Headline,
      tagline: content.fiveECard2Tagline,
    },
    {
      id: "efficiency",
      number: "03",
      tag: content.fiveECard3Tag,
      headline: content.fiveECard3Headline,
      tagline: content.fiveECard3Tagline,
    },
    {
      id: "execution",
      number: "04",
      tag: content.fiveECard4Tag,
      headline: content.fiveECard4Headline,
      tagline: content.fiveECard4Tagline,
    },
    {
      id: "evolution",
      number: "05",
      tag: content.fiveECard5Tag,
      headline: content.fiveECard5Headline,
      tagline: content.fiveECard5Tagline,
    },
  ];
}

function renderHighlightedText(text: string, highlight: string, highlightStyle: CSSProperties) {
  const startIndex = text.toLowerCase().indexOf(highlight.toLowerCase());

  if (startIndex === -1) {
    return text;
  }

  const endIndex = startIndex + highlight.length;

  return (
    <>
      {text.slice(0, startIndex)}
      <span style={highlightStyle}>{text.slice(startIndex, endIndex)}</span>
      {text.slice(endIndex)}
    </>
  );
}

function mergeHomePageContent(current: HomePageContent, incoming?: CmsHomePage): HomePageContent {
  if (!incoming) {
    return current;
  }

  const normalizedIncoming = normalizeCmsHomePageContent(incoming);

  return {
    heroHeadline: normalizedIncoming.heroHeadline ?? current.heroHeadline,
    heroSubheadline: normalizedIncoming.heroSubheadline ?? current.heroSubheadline,
    heroPrimaryCtaLabel: normalizedIncoming.heroPrimaryCtaLabel ?? current.heroPrimaryCtaLabel,
    heroSecondaryCtaLabel: normalizedIncoming.heroSecondaryCtaLabel ?? current.heroSecondaryCtaLabel,
    stat1Value: normalizedIncoming.stat1Value ?? current.stat1Value,
    stat1Label: normalizedIncoming.stat1Label ?? current.stat1Label,
    stat2Value: normalizedIncoming.stat2Value ?? current.stat2Value,
    stat2Label: normalizedIncoming.stat2Label ?? current.stat2Label,
    stat3Value: normalizedIncoming.stat3Value ?? current.stat3Value,
    stat3Label: normalizedIncoming.stat3Label ?? current.stat3Label,
    fiveESectionEyebrow: normalizedIncoming.fiveESectionEyebrow ?? current.fiveESectionEyebrow,
    fiveEHeadline: normalizedIncoming.fiveEHeadline ?? current.fiveEHeadline,
    fiveESubheadline: normalizedIncoming.fiveESubheadline ?? current.fiveESubheadline,
    fiveESectionCtaLabel: normalizedIncoming.fiveESectionCtaLabel ?? current.fiveESectionCtaLabel,
    fiveECard1Tag: normalizedIncoming.fiveECard1Tag ?? current.fiveECard1Tag,
    fiveECard1Headline: normalizedIncoming.fiveECard1Headline ?? current.fiveECard1Headline,
    fiveECard1Tagline: normalizedIncoming.fiveECard1Tagline ?? current.fiveECard1Tagline,
    fiveECard2Tag: normalizedIncoming.fiveECard2Tag ?? current.fiveECard2Tag,
    fiveECard2Headline: normalizedIncoming.fiveECard2Headline ?? current.fiveECard2Headline,
    fiveECard2Tagline: normalizedIncoming.fiveECard2Tagline ?? current.fiveECard2Tagline,
    fiveECard3Tag: normalizedIncoming.fiveECard3Tag ?? current.fiveECard3Tag,
    fiveECard3Headline: normalizedIncoming.fiveECard3Headline ?? current.fiveECard3Headline,
    fiveECard3Tagline: normalizedIncoming.fiveECard3Tagline ?? current.fiveECard3Tagline,
    fiveECard4Tag: normalizedIncoming.fiveECard4Tag ?? current.fiveECard4Tag,
    fiveECard4Headline: normalizedIncoming.fiveECard4Headline ?? current.fiveECard4Headline,
    fiveECard4Tagline: normalizedIncoming.fiveECard4Tagline ?? current.fiveECard4Tagline,
    fiveECard5Tag: normalizedIncoming.fiveECard5Tag ?? current.fiveECard5Tag,
    fiveECard5Headline: normalizedIncoming.fiveECard5Headline ?? current.fiveECard5Headline,
    fiveECard5Tagline: normalizedIncoming.fiveECard5Tagline ?? current.fiveECard5Tagline,
    solutionsEyebrow: normalizedIncoming.solutionsEyebrow ?? current.solutionsEyebrow,
    solutionsHeadline: normalizedIncoming.solutionsHeadline ?? current.solutionsHeadline,
    solutionsSubheadline: normalizedIncoming.solutionsSubheadline ?? current.solutionsSubheadline,
    solutionsCtaLabel: normalizedIncoming.solutionsCtaLabel ?? current.solutionsCtaLabel,
    testimonialQuote: normalizedIncoming.testimonialQuote ?? current.testimonialQuote,
    testimonialAuthor: normalizedIncoming.testimonialAuthor ?? current.testimonialAuthor,
    testimonialCtaLabel: normalizedIncoming.testimonialCtaLabel ?? current.testimonialCtaLabel,
    eduflowEyebrow: normalizedIncoming.eduflowEyebrow ?? current.eduflowEyebrow,
    eduflowHeadline: normalizedIncoming.eduflowHeadline ?? current.eduflowHeadline,
    eduflowSubheadline: normalizedIncoming.eduflowSubheadline ?? current.eduflowSubheadline,
    eduflowCtaLabel: normalizedIncoming.eduflowCtaLabel ?? current.eduflowCtaLabel,
    ctaEyebrow: normalizedIncoming.ctaEyebrow ?? current.ctaEyebrow,
    ctaHeadline: normalizedIncoming.ctaHeadline ?? current.ctaHeadline,
    ctaSubheadline: normalizedIncoming.ctaSubheadline ?? current.ctaSubheadline,
    ctaButtonLabel: normalizedIncoming.ctaButtonLabel ?? current.ctaButtonLabel,
  };
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [homePageContent, setHomePageContent] = useState<HomePageContent>(DEFAULT_HOME_PAGE_CONTENT);
  const [latestInsights, setLatestInsights] = useState<HomeInsightPreview[]>(DEFAULT_HOME_INSIGHTS.slice(0, 3));

  useEffect(() => {
    fetchCmsCollection<CmsHomePage>("home-page")
      .then((data) => {
        if (data.length > 0) {
          setHomePageContent((current) => mergeHomePageContent(current, data[0]));
        }
      })
      .catch((err) => logCmsFallback("Home page CMS fetch failed, using fallback static data.", err));
  }, []);

  useEffect(() => {
    fetchCmsCollection<CmsInsight>("insights")
      .then((data) => {
        const latest = getLatestInsightPreviews(data);

        if (latest.length > 0) {
          setLatestInsights(latest);
        }
      })
      .catch((err) => logCmsFallback("Insights CMS fetch failed, using fallback static data.", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      <Hero content={homePageContent} />
      <FiveESection content={homePageContent} />
      <SolutionsSection content={homePageContent} />
      <EduFlowCallout content={homePageContent} />
      <Testimonial content={homePageContent} />
      <InsightsShowcase insights={latestInsights} />
      <LetsBuildCTA content={homePageContent} />
      <Footer />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ content }: { content: HomePageContent }) {
  const [primaryHeadline, ...secondaryHeadlineLines] = splitMultilineText(content.heroHeadline);

  return (
    <div className="relative overflow-hidden w-full">
      <BreathingGlow />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-0">
        <Waves className="pointer-events-auto" />
      </div>

      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <motion.h1 custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="text-[clamp(3rem,8.5vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.05em]"
          >
            {primaryHeadline ? <span className="block whitespace-pre-line text-white">{primaryHeadline}</span> : null}
            {secondaryHeadlineLines.length > 0 ? (
              <span className="block whitespace-pre-line" style={{ color: "#148be6" }}>
                {secondaryHeadlineLines.join("\n")}
              </span>
            ) : null}
          </motion.h1>

          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-10 max-w-3xl mx-auto space-y-3 text-center"
          >
            <p className="whitespace-pre-line text-lg md:text-xl font-black tracking-[-0.02em] text-white leading-tight">
              {content.heroSubheadline}
            </p>
          </motion.div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/5e-framework"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase text-white transition-all duration-300 hover:shadow-glow-blue-sm"
              style={{ background: "#148be6" }}
            >
              {content.heroPrimaryCtaLabel}
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase text-white bg-white/[0.05] border border-white/[0.15] hover:bg-white/[0.1] hover:border-white/[0.3] transition-all duration-300"
            >
              {content.heroSecondaryCtaLabel}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-16 flex justify-center pb-8"
          >
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown className="w-4 h-4 text-zinc-800" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 pb-20 -mt-10">
        <StatsBar stats={getHomePageStats(content)} />
      </div>
    </div>
  );
}

function BreathingGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.13, 0.26, 0.13] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(20,139,230,0.9) 0%,rgba(20,139,230,0.3) 45%,transparent 70%)", filter: "blur(70px)" }}
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.07, 0.15, 0.07], x: [0, 60, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute w-[450px] h-[450px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(100,190,255,0.7) 0%,transparent 70%)", filter: "blur(90px)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.6, 1], opacity: [0.05, 0.1, 0.05], x: [-40, 20, -40], y: [30, -30, 30] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute w-[320px] h-[320px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(20,139,230,0.5) 0%,transparent 70%)", filter: "blur(110px)" }}
      />
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className="px-6 py-0">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="rounded-2xl grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.1]"
          style={{
            background: "linear-gradient(135deg, rgba(5,5,5,0.85), rgba(20,139,230,0.05))",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6), inset 0 0 32px rgba(255,255,255,0.02)",
            backdropFilter: "blur(12px)"
          }}
        >
          {stats.map((s, i) => (
            <motion.div key={s.label} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-col items-center justify-center px-10 py-10 text-center gap-2"
            >
              <span className="text-[clamp(2rem,4vw,3rem)] font-black leading-none tracking-[-0.04em]" style={{
                background: "linear-gradient(125deg,#3daeff 0%,#9fdbff 58%,#32a2f7 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: "drop-shadow(0 0 12px rgba(61,174,255,0.35))",
              }}>
                {s.value}
              </span>
              <span className="text-base font-semibold tracking-[0.14em] uppercase text-zinc-200">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 5E Section ───────────────────────────────────────────────────────────────
function FiveESection({ content }: { content: HomePageContent }) {
  const fiveEs = getFiveEs(content);

  return (
    <section id="five-es" className="relative py-32 px-6">
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(20,139,230,0.3),transparent)" }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl"
          >
            <span className="text-[12px] tracking-[0.32em] uppercase text-zinc-700 font-medium block mb-4">{content.fiveESectionEyebrow}</span>
            <h2 className="whitespace-pre-line text-[clamp(2.4rem,6vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] mb-8">
              {renderHighlightedText(content.fiveEHeadline, "5E", { color: "#148be6" })}
            </h2>
            <p className="whitespace-pre-line text-base font-medium text-zinc-300 leading-relaxed">
              {content.fiveESubheadline}
            </p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="relative aspect-video rounded-3xl overflow-hidden hidden md:block"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <Image src="/imagery/20251001_1656_Neon Light Tunnel_remix_01k6fxcaa3edtbwv5wvp0g0sdg (1).png" alt="Neon Light Tunnel" fill className="object-cover" />
            <div className="absolute inset-0 bg-[#050505] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[rgba(5,5,5,0.2)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fiveEs.slice(0, 3).map((e, i) => <TiltCard key={e.id} card={e} index={i} />)}
          <TiltCard card={fiveEs[3]} index={3} className="md:col-span-2" />
          <TiltCard card={fiveEs[4]} index={4} />
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <Link href="/5e-framework"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase border border-white/[0.1] text-zinc-500 hover:text-white hover:border-white/[0.2] transition-all duration-300"
          >
            {content.fiveESectionCtaLabel} <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Tilt Card ────────────────────────────────────────────────────────────────
interface CardData { id: string; number: string; tag: string; headline: string; tagline: string; }

function TiltCard({ card, index, className = "" }: { card: CardData; index: number; className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - ny) * 16, y: (nx - 0.5) * 22 });
    setGlowPos({ x: nx * 100, y: ny * 100 });
  };

  const transform = hovered
    ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.03,1.03,1.03)`
    : `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
  const transition = !hovered ? "transform 0.65s cubic-bezier(0.22,1,0.36,1)" : "transform 0.09s linear";

  return (
    <motion.div custom={index} variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: "-60px" }} className={className}
    >
      <Link href={`/5e-framework/${card.id}`} className="block h-full">
        <div ref={wrapperRef} onMouseMove={onMouseMove}
          onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
          onMouseEnter={() => setHovered(true)}
          style={{
            transform, transition,
            background: hovered
              ? "linear-gradient(135deg,rgba(20,139,230,0.55),rgba(20,139,230,0.06) 50%,rgba(20,139,230,0.35))"
              : "linear-gradient(135deg,rgba(255,255,255,0.13),rgba(255,255,255,0.02) 50%,rgba(255,255,255,0.07))",
            padding: "1px", borderRadius: "20px", willChange: "transform", height: "100%",
          }}
        >
          <div className="relative rounded-[19px] overflow-hidden flex flex-col" style={{ background: "#0a0a0a", minHeight: "290px", height: "100%" }}>
            <div className="absolute inset-0 topo-pattern transition-opacity duration-700" style={{ opacity: hovered ? 1 : 0 }} />
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[19px]" style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%,rgba(20,139,230,0.13) 0%,transparent 60%)`,
            }} />
            <div className="relative z-10 p-8 flex flex-col h-full" style={{ minHeight: "290px" }}>
              <div className="flex items-center justify-between mb-auto">
                <span className="text-[12px] tracking-[0.28em] uppercase font-medium transition-colors duration-300"
                  style={{ color: hovered ? "#148be6" : "rgba(255,255,255,0.18)" }}>{card.number}</span>
                <span className="text-[12px] tracking-[0.22em] uppercase font-bold transition-colors duration-300"
                  style={{ color: hovered ? "rgba(20,139,230,0.65)" : "rgba(255,255,255,0.05)" }}>{card.tag}</span>
              </div>
              <div className="flex-1 flex items-center py-6">
                <h3 className="text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] whitespace-pre-line">
                  {card.headline}
                </h3>
              </div>
              <div className="pt-5 mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <p className="text-[12px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: "#148be6" }}>{card.tag}</p>
                <p className="text-sm font-medium leading-relaxed tracking-[0.04em] transition-colors duration-300"
                  style={{ color: hovered ? "rgb(228 228 231)" : "rgb(113 113 122)" }}>{card.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Solutions Section ────────────────────────────────────────────────────────
function SolutionsSection({ content }: { content: HomePageContent }) {
  const [solutions, setSolutions] = useState<SolutionSummary[]>(SOLUTIONS);

  useEffect(() => {
    fetchCmsCollection<CmsSolution>("solutions")
      .then((data) => {
        if (data.length > 0) {
          const formatted: SolutionSummary[] = sortByDisplayOrder(data).map((solution, i) => ({
            num: `${(i + 1).toString().padStart(2, '0')}`,
            slug: solution.slug,
            title: solution.title,
            tagline: solution.description,
            icon: ICON_MAP[solution.icon || ""] || Database,
          }));

          setSolutions(formatted);
        }
      })
      .catch((err) => logCmsFallback("Database fetch failed, using fallback static data.", err));
  }, []);

  return (
    <section id="solutions" className="relative py-32 px-6">
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(20,139,230,0.2),transparent)" }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl"
          >
            <span className="text-[12px] tracking-[0.32em] uppercase text-zinc-700 font-medium block mb-4">{content.solutionsEyebrow}</span>
            <h2 className="whitespace-pre-line text-[clamp(2.4rem,6vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] mb-8">
              {renderHighlightedText(content.solutionsHeadline, "SOLUTIONS", { color: "#148be6" })}
            </h2>
            <p className="whitespace-pre-line text-base font-medium text-zinc-300 leading-relaxed">
              {content.solutionsSubheadline}
            </p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="relative aspect-video rounded-3xl overflow-hidden hidden md:block"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <Image src="/imagery/20251001_1706_Colorful Light Corridor_remix_01k6fy0c5pfv0vtqgpj7tw7nhn.png" alt="Colorful Light Corridor" fill className="object-cover" />
            <div className="absolute inset-0 bg-[#050505] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-[rgba(5,5,5,0.2)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.num} custom={i} variants={fadeUp} initial="hidden"
                whileInView="visible" viewport={{ once: true, margin: "-40px" }}
              >
                <Link href={`/featured-solutions/${s.slug}`}
                  className="group block rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#148be6]/25 bg-[#148be6]/10 text-[#148be6] transition-colors duration-300 group-hover:bg-[#148be6]/20">
                        <Icon className="w-[18px] h-[18px]" />
                      </span>
                      <span className="text-[12px] tracking-[0.25em] uppercase font-medium text-zinc-600 group-hover:text-[#148be6] transition-colors duration-300">
                        {s.num}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-800 group-hover:text-[#148be6] transition-colors duration-300" />
                  </div>
                  <h3 className="text-base font-black uppercase leading-tight tracking-[-0.02em] mb-3 group-hover:text-white transition-colors duration-300" style={{ fontWeight: 900 }}>
                    {s.title}
                  </h3>
                  <p className="text-sm font-medium text-zinc-400 leading-relaxed tracking-[0.02em] group-hover:text-zinc-200 transition-colors duration-300">
                    {s.tagline}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <Link href="/featured-solutions"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase border border-white/[0.1] text-zinc-500 hover:text-white hover:border-white/[0.2] transition-all duration-300"
          >
            {content.solutionsCtaLabel} <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonial ──────────────────────────────────────────────────────────────
function Testimonial({ content }: { content: HomePageContent }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <div className="mb-8">
            <span className="h-px w-20 bg-gradient-to-r from-transparent via-[#148be6]/50 to-transparent inline-block" />
          </div>
          <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-300 tracking-[-0.01em] mb-8">
            &ldquo;{content.testimonialQuote}&rdquo;
          </blockquote>
          <p className="text-[13px] tracking-[0.22em] uppercase text-zinc-600 font-medium">
            {content.testimonialAuthor}
          </p>
          <div className="mt-8">
            <span className="h-px w-20 bg-gradient-to-r from-transparent via-[#148be6]/50 to-transparent inline-block" />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          custom={1} className="mt-12"
        >
          <Link href="/case-studies"
            className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.18em] uppercase text-zinc-600 hover:text-white transition-colors duration-300"
          >
            {content.testimonialCtaLabel} <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Insights Showcase ───────────────────────────────────────────────────────
function InsightsShowcase({ insights }: { insights: HomeInsightPreview[] }) {
  const [featuredInsight, ...supportingInsights] = insights;

  if (!featuredInsight) {
    return null;
  }

  return (
    <section className="relative overflow-hidden py-32 px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: ["-10%", "110%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-24 h-px w-[32%]"
          style={{ background: "linear-gradient(90deg,transparent,rgba(116,202,255,0.62),transparent)" }}
        />
        <motion.div
          animate={{ opacity: [0.16, 0.34, 0.16], scale: [1, 1.08, 1] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 bottom-0 h-[360px] w-[360px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(20,139,230,0.22),transparent 70%)", filter: "blur(55px)" }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "68px 68px",
            maskImage: "radial-gradient(circle at center, black 34%, transparent 92%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 34%, transparent 92%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-3xl"
          >
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]">
              Latest{" "}
              <span
                style={{
                  background: "linear-gradient(125deg,#dff4ff 0%,#74caff 48%,#148be6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 22px rgba(20,139,230,0.2))",
                }}
              >
                Insights.
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-zinc-300">
              Three signals worth reading now. Thought leadership, executive briefings, and downloadable insight pieces designed to help leadership teams move with more clarity.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <Link
              href="/insight"
              className="group inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.16em] text-zinc-200 transition-all duration-300 hover:border-[#148be6]/30 hover:bg-[#148be6]/10 hover:text-white"
            >
              Explore All Insights
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <FeaturedInsightCard insight={featuredInsight} />
          <div className="grid gap-5">
            {supportingInsights.map((insight, index) => (
              <SupportingInsightCard key={insight.slug} insight={insight} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedInsightCard({ insight }: { insight: HomeInsightPreview }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <Link href={`/insight/${insight.slug}`} className="group block h-full">
        <article
          className="relative isolate flex min-h-[540px] flex-col justify-between overflow-hidden rounded-[34px] border border-white/[0.08] p-8 md:p-10"
          style={{
            background: "linear-gradient(135deg,rgba(10,15,22,0.96),rgba(7,9,14,0.9) 55%,rgba(20,139,230,0.1))",
            boxShadow: "0 30px 80px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <div className="absolute inset-0">
            <Image
              src={insight.image}
              alt={insight.title}
              fill
              className="object-cover opacity-38 transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,139,230,0.3),transparent_34%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#04070b]/30 via-[#04070b]/68 to-[#04070b]/96" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#04070b]/92 via-[#04070b]/48 to-transparent" />
          </div>

          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute right-8 top-8 h-24 w-24 rounded-full border border-white/[0.08]"
          />
          <motion.div
            aria-hidden
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute right-14 top-14 h-12 w-12 rounded-full border border-dashed border-[#74caff]/35"
          />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#148be6]/25 bg-[#148be6]/12 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-[#9fd8ff]">
                {insight.tag}
              </span>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                {insight.dateLabel}
              </span>
            </div>
            <span className="rounded-full border border-white/[0.08] bg-black/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
              Featured Signal
            </span>
          </div>

          <div className="relative z-10 mt-auto max-w-2xl">
            {insight.subtitle ? (
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#74caff]">
                {insight.subtitle}
              </p>
            ) : null}
            <h3 className="mt-4 text-[clamp(2.2rem,4.5vw,4.25rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-white">
              {insight.title}
            </h3>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-zinc-200">
              {insight.excerpt}
            </p>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.2em] text-white">
                Read Insight
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>

              {insight.hasDownload ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-[#148be6]/20 bg-[#148be6]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#9fd8ff]">
                  <FileDown className="h-3 w-3" />
                  Download Included
                </span>
              ) : null}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

function SupportingInsightCard({ insight, index }: { insight: HomeInsightPreview; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <Link href={`/insight/${insight.slug}`} className="group block h-full">
        <article
          className="relative isolate h-full overflow-hidden rounded-[30px] border border-white/[0.08] p-6 sm:p-7"
          style={{
            background: "linear-gradient(135deg,rgba(10,14,21,0.94),rgba(8,10,15,0.9) 55%,rgba(20,139,230,0.07))",
            boxShadow: "0 20px 60px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <div className="absolute inset-0">
            <Image
              src={insight.image}
              alt={insight.title}
              fill
              className="object-cover opacity-16 transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#05080d]/90 via-[#05080d]/82 to-[#05080d]/96" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#74caff]/30 to-transparent" />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#74caff]">{insight.tag}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{insight.dateLabel}</p>
            </div>
            {insight.hasDownload ? (
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#148be6]/20 bg-[#148be6]/10 text-[#9fd8ff]">
                <FileDown className="h-4 w-4" />
              </span>
            ) : (
              <ArrowUpRight className="h-4 w-4 text-zinc-600 transition-colors duration-300 group-hover:text-white" />
            )}
          </div>

          <div className="relative z-10 mt-14">
            <h3 className="text-[1.55rem] font-black uppercase leading-[1] tracking-[-0.04em] text-white">
              {insight.title}
            </h3>
            {insight.subtitle ? (
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                {insight.subtitle}
              </p>
            ) : null}
            <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-300">
              {insight.excerpt}
            </p>

            <div className="mt-6 border-t border-white/[0.06] pt-5">
              <span className="inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.2em] text-zinc-200">
                Read More
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

// ─── Let's Build CTA ──────────────────────────────────────────────────────────
function LetsBuildCTA({ content }: { content: HomePageContent }) {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="relative rounded-3xl overflow-hidden text-center px-8 py-24"
          style={{
            background: "linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div aria-hidden className="absolute inset-0">
            <Image src="/imagery/20250616_2107_Colorful Pixel Gradient_remix_01jxwv8e7wfwgvqfb3bav79sye.png" alt="Colorful Pixel Gradient" fill className="object-cover opacity-50 mix-blend-overlay" />
          </div>
          <div aria-hidden className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%,rgba(20,139,230,0.12),transparent)" }}
          />
          <div className="relative z-10">
            <span className="text-[12px] tracking-[0.35em] uppercase text-zinc-600 font-medium block mb-6">
              {content.ctaEyebrow}
            </span>
            <h2 className="whitespace-pre-line text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] mb-8">
              {renderHighlightedText(content.ctaHeadline, "BUILD", {
                background: "linear-gradient(125deg,#148be6 0%,#74caff 55%,#148be6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              })}
            </h2>
            <p className="whitespace-pre-line text-sm font-medium text-zinc-500 max-w-md mx-auto leading-relaxed tracking-[0.03em] mb-10">
              {content.ctaSubheadline}
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-[13px] font-bold tracking-[0.14em] uppercase text-white transition-all duration-300 hover:shadow-glow-blue-sm"
              style={{ background: "#148be6" }}
            >
              {content.ctaButtonLabel} <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── EduFlow Callout ──────────────────────────────────────────────────────────
function EduFlowCallout({ content }: { content: HomePageContent }) {
  const headlineLines = splitMultilineText(content.eduflowHeadline);
  const eduflowCtaLabel = normalizeEscapedNewlines(content.eduflowCtaLabel).trim();
  const longestHeadlineLine = Math.max(...headlineLines.map((line) => line.length), 0);
  const headlineSizeClass = longestHeadlineLine > 11
    ? "text-[clamp(2.35rem,4.1vw,4.35rem)]"
    : "text-[clamp(3rem,7vw,6.4rem)]";
  const orchestrationSignals: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Database, label: "Connected Estate", value: "SIS, LMS, ERP, and finance systems finally move in sync." },
    { icon: Workflow, label: "Operational Flow", value: "Admissions, billing, support, and reporting become one joined-up motion." },
    { icon: GraduationCap, label: "Student Journey", value: "Every handoff feels faster, cleaner, and more intentional." },
  ];

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#050505] py-28 px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ opacity: [0.18, 0.32, 0.18], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-12 h-[360px] w-[360px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(20,139,230,0.24),transparent 68%)", filter: "blur(40px)" }}
        />
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-80px] top-1/2 h-[420px] w-[420px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(116,202,255,0.18),transparent 72%)", filter: "blur(70px)" }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(circle at center, black 38%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 38%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] gap-8 items-stretch">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative overflow-hidden rounded-[32px] border border-white/[0.08] p-8 md:p-10 lg:p-12"
            style={{
              background: "linear-gradient(135deg,rgba(11,15,22,0.94),rgba(6,8,13,0.86) 55%,rgba(20,139,230,0.08))",
              boxShadow: "0 32px 90px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(120deg,transparent,rgba(20,139,230,0.08),transparent 72%)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-px w-full"
              style={{ background: "linear-gradient(90deg,transparent,rgba(116,202,255,0.4),transparent)" }}
            />

            <div className="relative z-10 text-center xl:text-left">
              <span
                className="inline-flex items-center gap-3 rounded-full border border-[#148be6]/20 bg-[#148be6]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#9fd8ff]"
              >
                <span className="h-2 w-2 rounded-full bg-[#74caff] shadow-[0_0_14px_rgba(116,202,255,0.85)]" />
                {content.eduflowEyebrow}
              </span>

              <div className="mt-6 space-y-1.5">
                {headlineLines.map((line, index) => (
                  <motion.span
                    key={`${line}-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className={`block font-black uppercase leading-[0.9] tracking-[-0.055em] ${headlineSizeClass}`}
                    style={index === headlineLines.length - 1 ? {
                      background: "linear-gradient(125deg,#dff4ff 0%,#74caff 48%,#148be6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 22px rgba(20,139,230,0.2))",
                    } : undefined}
                  >
                    {line}
                  </motion.span>
                ))}
              </div>

              <p className="mt-6 max-w-2xl text-base md:text-[1.05rem] font-medium text-zinc-300 leading-relaxed xl:mx-0 mx-auto">
                {content.eduflowSubheadline}
              </p>

              <div className="mt-8 grid gap-3 md:grid-cols-3 text-left">
                {orchestrationSignals.map((signal) => {
                  const Icon = signal.icon;

                  return (
                    <motion.div
                      key={signal.label}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55 }}
                      className="rounded-[22px] border border-white/[0.06] bg-white/[0.03] p-4"
                    >
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#148be6]/20 bg-[#148be6]/10 text-[#74caff]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">{signal.label}</p>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-200">{signal.value}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col items-center gap-4 xl:flex-row xl:items-center">
                <Link
                  href="/eduflow360"
                  className="group inline-flex min-w-[180px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 py-4 text-[13px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    background: "linear-gradient(135deg,#148be6 0%,#0e6dbf 100%)",
                    boxShadow: "0 0 28px rgba(20,139,230,0.28), inset 0 1px 0 rgba(255,255,255,0.18)",
                  }}
                >
                  {eduflowCtaLabel}
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative min-h-[760px] overflow-hidden rounded-[32px] border border-[#148be6]/18 p-6 sm:p-8"
            style={{
              background: "radial-gradient(circle at top,rgba(20,139,230,0.2),transparent 42%), linear-gradient(180deg,rgba(10,14,20,0.96),rgba(4,6,9,0.98))",
              boxShadow: "0 32px 90px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-24"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
                maskImage: "radial-gradient(circle at center, black 44%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(circle at center, black 44%, transparent 100%)",
              }}
            />

            <div className="relative flex h-full min-h-[640px] items-center justify-center lg:min-h-[760px]">
              <div className="flex w-full flex-col gap-4 lg:hidden">
                <EduFlowLayerCard />
                <EduFlowOrbitCard
                  title="Finance Visibility"
                  body="Live collections, reconciliation, and controls."
                />
                <EduFlowOrbitCard
                  title="Student Experience"
                  body="Smoother journeys across every handoff."
                />
                <EduFlowOrbitCard
                  title="Operational Agility"
                  body="Less coordination drag. Faster decisions."
                  centered
                />
              </div>

              <div className="absolute inset-0 hidden lg:block">
                <motion.div
                  aria-hidden
                  animate={{ opacity: [0.28, 0.5, 0.28], scale: [1, 1.04, 1] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-1/2 top-[47.5%] h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: "radial-gradient(circle,rgba(20,139,230,0.3),transparent 72%)", filter: "blur(22px)" }}
                />
                <svg
                  aria-hidden
                  viewBox="0 0 1000 760"
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <motion.ellipse
                    cx="500"
                    cy="360"
                    rx="246"
                    ry="212"
                    fill="none"
                    stroke="#74caff"
                    strokeOpacity="0.28"
                    strokeWidth="1.8"
                    strokeDasharray="6 8"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "500px 360px" }}
                  />
                  <motion.ellipse
                    cx="500"
                    cy="360"
                    rx="176"
                    ry="148"
                    fill="none"
                    stroke="#ffffff"
                    strokeOpacity="0.1"
                    strokeWidth="1.5"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "500px 360px" }}
                  />
                  <path
                    d="M 303 235 A 246 212 0 0 1 697 235"
                    fill="none"
                    stroke="#eef8ff"
                    strokeOpacity="0.72"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 271 218 C 330 235 370 250 405 272"
                    fill="none"
                    stroke="#74caff"
                    strokeOpacity="0.34"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 729 218 C 670 235 630 250 595 272"
                    fill="none"
                    stroke="#74caff"
                    strokeOpacity="0.34"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 500 508 C 500 542 500 573 500 606"
                    fill="none"
                    stroke="#74caff"
                    strokeOpacity="0.38"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <circle cx="418" cy="286" r="6" fill="#74caff" opacity="0.88" />
                  <circle cx="582" cy="286" r="6" fill="#74caff" opacity="0.88" />
                  <circle cx="500" cy="606" r="6" fill="#74caff" opacity="0.88" />
                </svg>

                <div className="relative z-10 h-full min-h-[760px]">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-[6.5%] top-[8%] w-[36%] max-w-[248px] min-w-[190px]"
                  >
                    <EduFlowOrbitCard
                      title="Finance Visibility"
                      body="Live collections, reconciliation, and controls."
                    />
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    className="absolute right-[6.5%] top-[10%] w-[36%] max-w-[248px] min-w-[190px]"
                  >
                    <EduFlowOrbitCard
                      title="Student Experience"
                      body="Smoother journeys across every handoff."
                    />
                  </motion.div>

                  <div
                    className="absolute left-1/2 top-[47.5%] w-[62%] max-w-[390px] min-w-[300px] -translate-x-1/2 -translate-y-1/2"
                  >
                    <EduFlowLayerCard />
                  </div>

                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                    className="absolute bottom-[8%] left-1/2 w-[56%] max-w-[360px] min-w-[250px] -translate-x-1/2"
                  >
                    <EduFlowOrbitCard
                      title="Operational Agility"
                      body="Less coordination drag. Faster decisions."
                      centered
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function EduFlowOrbitCard({
  title,
  body,
  centered = false,
}: {
  title: string;
  body: string;
  centered?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0a0e14]/82 px-5 py-4 backdrop-blur ${centered ? "text-center" : ""}`}
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(116,202,255,0.28),transparent)" }}
      />
      <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#74caff]">{title}</p>
      <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-200">{body}</p>
    </div>
  );
}

function EduFlowLayerCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[30px] border border-white/[0.08] px-6 py-8 text-center"
      style={{
        background: "linear-gradient(180deg,rgba(12,18,27,0.94),rgba(6,9,14,0.9))",
        boxShadow: "0 22px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(116,202,255,0.45),transparent)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-10 top-10 h-20 rounded-full"
        style={{ background: "radial-gradient(circle,rgba(20,139,230,0.14),transparent 72%)", filter: "blur(18px)" }}
      />
      <p className="relative text-[10px] font-bold uppercase tracking-[0.32em] text-zinc-500">One Intelligence Layer</p>
      <div className="relative mx-auto mt-5 w-[min(100%,230px)]">
        <Image
          src="/eduflow-partners/EduFlow 360 Logo PNG TM2.png"
          alt="EduFlow 360 Logo"
          width={400}
          height={120}
          className="w-full h-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
        />
      </div>
      <p className="relative mt-4 text-sm font-medium leading-relaxed text-zinc-300">
        The orchestration layer that connects institutional systems, unlocks visibility, and modernizes motion.
      </p>
    </div>
  );
}
