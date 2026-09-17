import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { fetchCmsCollectionServer, type CmsHomePage, type CmsInsight, type CmsSolution } from "@/lib/cms";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [homePage, insights, solutions] = await Promise.all([
    fetchCmsCollectionServer<CmsHomePage>("home-page"),
    fetchCmsCollectionServer<CmsInsight>("insights"),
    fetchCmsCollectionServer<CmsSolution>("solutions"),
  ]);

  return (
    <HomeClient
      initialHomePage={homePage?.[0] ?? null}
      initialInsights={insights}
      initialSolutions={solutions}
    />
  );
}
