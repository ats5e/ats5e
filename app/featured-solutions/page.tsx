import SolutionsClient from "./SolutionsClient";
import { fetchCmsCollectionServer, type CmsSolution } from "@/lib/cms";

export default async function Page() {
  const data = await fetchCmsCollectionServer<CmsSolution>("solutions");
  return <SolutionsClient initialSolutions={data} />;
}
