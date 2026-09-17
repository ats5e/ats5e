import AboutClient from "./AboutClient";
import { fetchCmsCollectionServer, type CmsTeamMember } from "@/lib/cms";

export default async function Page() {
  const data = await fetchCmsCollectionServer<CmsTeamMember>("team-members");
  return <AboutClient initialTeam={data} />;
}
