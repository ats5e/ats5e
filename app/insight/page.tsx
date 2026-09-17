import InsightsClient from "./InsightsClient";
import { fetchCmsCollectionServer, type CmsInsight } from "@/lib/cms";

export default async function Page() {
  const data = await fetchCmsCollectionServer<CmsInsight>("insights");
  return <InsightsClient initialInsights={data} />;
}
