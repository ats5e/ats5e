import type { Metadata } from "next";
import InsightDetailClient from "./InsightDetailClient";
import { INSIGHTS } from "@/lib/insights-data";
import { fetchCmsItemServer, type CmsInsight } from "@/lib/cms";

export function generateStaticParams() {
  return Object.keys(INSIGHTS).map((slug) => ({ slug }));
}

export const dynamicParams = true;

async function getCmsInsight(slug: string): Promise<CmsInsight | null> {
  const item = await fetchCmsItemServer<CmsInsight>("insights", slug);
  return item && item.published !== false ? item : null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cms = await getCmsInsight(params.slug);
  const fallback = INSIGHTS[params.slug];
  const title = cms?.title ?? fallback?.title;
  if (!title) return { title: "Insight Not Found", robots: { index: false } };
  const description = (cms?.summary || fallback?.intro || "").slice(0, 200);
  const url = `/insight/${params.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", title, description, url, publishedTime: cms?.date },
  };
}

export default async function InsightDetailPage({ params }: { params: { slug: string } }) {
  const cms = await getCmsInsight(params.slug);
  return <InsightDetailClient slug={params.slug} fallbackInsight={INSIGHTS[params.slug] ?? null} initialCmsInsight={cms} />;
}
