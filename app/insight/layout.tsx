import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Thought leadership, executive briefings and whitepapers on agentic AI, payments, ISO 20022, risk and compliance for leadership teams.",
  alternates: { canonical: "/insight" },
  openGraph: {
    title: "Insights | ATS5E",
    description:
      "Thought leadership, executive briefings and whitepapers on agentic AI, payments, ISO 20022, risk and compliance for leadership teams.",
    url: "/insight",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
