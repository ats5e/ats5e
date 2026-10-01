import InsightsClient from "./InsightsClient";
import { fetchCmsCollectionServer, type CmsInsight } from "@/lib/cms";
import { getFallbackInsights, getRepoInsightsAsCms, mergeLiveInsights } from "@/lib/insights-data";

export default async function Page() {
  const data = await fetchCmsCollectionServer<CmsInsight>("insights");
  return (
    <InsightsClient
      initialInsights={data ? mergeLiveInsights(data) : null}
      fallbackInsights={getFallbackInsights()}
      libraryInsights={getRepoInsightsAsCms()}
    />
  );
}
