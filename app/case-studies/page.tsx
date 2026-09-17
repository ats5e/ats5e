import CaseStudiesClient from "./CaseStudiesClient";
import { fetchCmsCollectionServer, type CmsCaseStudy } from "@/lib/cms";

export default async function Page() {
  const data = await fetchCmsCollectionServer<CmsCaseStudy>("case-studies");
  return <CaseStudiesClient initialCaseStudies={data} />;
}
