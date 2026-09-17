import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The 5E Framework",
  description:
    "Experience, Empowerment, Efficiency, Execution and Evolution — the ATS5E framework for holistic, de-risked enterprise transformation.",
  alternates: { canonical: "/5e-framework" },
  openGraph: {
    title: "The 5E Framework | ATS5E",
    description:
      "Experience, Empowerment, Efficiency, Execution and Evolution — the ATS5E framework for holistic, de-risked enterprise transformation.",
    url: "/5e-framework",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
