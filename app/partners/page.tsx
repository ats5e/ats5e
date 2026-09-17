import PartnersClient from "./PartnersClient";
import { fetchCmsCollectionServer, type CmsPartner } from "@/lib/cms";

export default async function Page() {
  const data = await fetchCmsCollectionServer<CmsPartner>("partners");
  return <PartnersClient initialPartners={data} />;
}
