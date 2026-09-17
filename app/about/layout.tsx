import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ATS5E is a specialist execution partner with deep banking DNA, helping forward-thinking enterprises evolve, accelerate and outperform.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | ATS5E",
    description:
      "ATS5E is a specialist execution partner with deep banking DNA, helping forward-thinking enterprises evolve, accelerate and outperform.",
    url: "/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
