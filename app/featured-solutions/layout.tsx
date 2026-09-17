import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Twelve execution-led solutions spanning data governance, decision intelligence, agentic AI, automation, risk, treasury and legacy modernisation for enterprises in the GCC and South Pacific.",
  alternates: { canonical: "/featured-solutions" },
  openGraph: {
    title: "Solutions | ATS5E",
    description:
      "Twelve execution-led solutions spanning data governance, decision intelligence, agentic AI, automation, risk, treasury and legacy modernisation for enterprises in the GCC and South Pacific.",
    url: "/featured-solutions",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
