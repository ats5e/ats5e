import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EduFlow360 — Education, Orchestrated",
  description:
    "EduFlow360 connects SIS, LMS, ERP and finance platforms into one intelligence layer, giving institutions financial visibility, smoother student journeys and modern automation.",
  alternates: { canonical: "/eduflow360" },
  openGraph: {
    title: "EduFlow360 — Education, Orchestrated | ATS5E",
    description:
      "EduFlow360 connects SIS, LMS, ERP and finance platforms into one intelligence layer, giving institutions financial visibility, smoother student journeys and modern automation.",
    url: "/eduflow360",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
