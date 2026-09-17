import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SOLUTIONS } from "@/lib/solutions";
import { CASE_STUDIES } from "@/lib/case-studies-data";
import { FIVE_ES } from "@/lib/five-es-data";
import { INSIGHTS } from "@/lib/insights-data";
import { fetchCmsCollectionServer, type CmsInsight } from "@/lib/cms";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/featured-solutions", priority: 0.9 },
    { path: "/5e-framework", priority: 0.8 },
    { path: "/case-studies", priority: 0.9 },
    { path: "/insight", priority: 0.8 },
    { path: "/eduflow360", priority: 0.9 },
    { path: "/eduflow360/vaultspay", priority: 0.7 },
    { path: "/partners", priority: 0.6 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
  ];

  const cmsInsights = (await fetchCmsCollectionServer<CmsInsight>("insights")) ?? [];
  const insightSlugs = new Map<string, Date>();
  Object.keys(INSIGHTS).forEach((slug) => insightSlugs.set(slug, now));
  cmsInsights
    .filter((insight) => insight.published !== false && insight.slug)
    .forEach((insight) => {
      const stamp = new Date(insight.updatedAt ?? insight.date ?? now);
      insightSlugs.set(insight.slug, Number.isNaN(stamp.getTime()) ? now : stamp);
    });

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...SOLUTIONS.map((solution) => ({
      url: `${SITE_URL}/featured-solutions/${solution.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...Object.keys(FIVE_ES).map((slug) => ({
      url: `${SITE_URL}/5e-framework/${slug}`,
      lastModified: now,
      priority: 0.6,
    })),
    ...Object.keys(CASE_STUDIES).map((slug) => ({
      url: `${SITE_URL}/case-studies/${slug}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...Array.from(insightSlugs, ([slug, lastModified]) => ({
      url: `${SITE_URL}/insight/${slug}`,
      lastModified,
      priority: 0.6,
    })),
  ];
}
