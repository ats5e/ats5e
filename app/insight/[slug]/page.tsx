import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InsightDetailClient from "./InsightDetailClient";
import { INSIGHTS } from "@/lib/insights-data";
import { fetchCmsItemResultServer, isInsightLive, type CmsInsight } from "@/lib/cms";

export function generateStaticParams() {
  return Object.entries(INSIGHTS)
    .filter(([, insight]) => isInsightLive(insight))
    .map(([slug]) => ({ slug }));
}

export const dynamicParams = true;

// hidden: the CMS has this slug but an editor has unpublished it.
// missing: the CMS answered and has no such slug (distinct from the CMS being unreachable).
async function getCmsInsight(slug: string): Promise<{ cms: CmsInsight | null; hidden: boolean; missing: boolean }> {
  const { item, missing } = await fetchCmsItemResultServer<CmsInsight>("insights", slug);
  if (!item) return { cms: null, hidden: false, missing };
  return item.published === false ? { cms: null, hidden: true, missing: false } : { cms: item, hidden: false, missing: false };
}

// Scheduled (future-dated) repo pieces stay hidden until their publish date.
function getFallbackInsight(slug: string) {
  const insight = INSIGHTS[slug];
  return insight && isInsightLive(insight) ? insight : null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { cms, hidden } = await getCmsInsight(params.slug);
  const fallback = getFallbackInsight(params.slug);
  const title = hidden ? undefined : cms?.title ?? fallback?.title;
  if (!title) return { title: "Insight Not Found", robots: { index: false } };
  const description = (cms?.summary || fallback?.intro || "").slice(0, 200);
  const url = `/insight/${params.slug}`;
  const author = cms?.author ?? fallback?.author;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: cms?.date ?? fallback?.date,
      authors: author ? [author] : undefined,
    },
  };
}

export default async function InsightDetailPage({ params }: { params: { slug: string } }) {
  const { cms, hidden, missing } = await getCmsInsight(params.slug);
  const scheduled = INSIGHTS[params.slug] && !isInsightLive(INSIGHTS[params.slug]);
  // Real 404 when an editor unpublished it, it is scheduled, or neither the CMS nor the repo has it.
  // If the CMS is merely unreachable, fall through so the browser can retry the fetch.
  if (hidden || (scheduled && !cms) || (missing && !INSIGHTS[params.slug])) notFound();
  return <InsightDetailClient slug={params.slug} fallbackInsight={getFallbackInsight(params.slug)} initialCmsInsight={cms} />;
}
