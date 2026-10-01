import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { fetchCmsCollectionServer, type CmsHomePage, type CmsInsight, type CmsSolution } from "@/lib/cms";
import { getLibraryInsightsAsCms, mergeLiveInsights } from "@/lib/insights-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [homePage, insights, solutions] = await Promise.all([
    fetchCmsCollectionServer<CmsHomePage>("home-page"),
    fetchCmsCollectionServer<CmsInsight>("insights"),
    fetchCmsCollectionServer<CmsSolution>("solutions"),
  ]);

  // Without the CMS, still surface the newest repo-published pieces rather than the static defaults.
  const libraryInsights = getLibraryInsightsAsCms();
  const liveInsights = insights ? mergeLiveInsights(insights) : libraryInsights.length > 0 ? libraryInsights : null;

  return (
    <HomeClient
      initialHomePage={homePage?.[0] ?? null}
      initialInsights={liveInsights}
      initialSolutions={solutions}
    />
  );
}
