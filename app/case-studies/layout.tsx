import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Case studies from banks, acquirers and enterprises across the GCC: AI-enabled transformation, enterprise PMO, cloud-native stacks and measurable operational outcomes.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Our Work | ATS5E",
    description:
      "Case studies from banks, acquirers and enterprises across the GCC: AI-enabled transformation, enterprise PMO, cloud-native stacks and measurable operational outcomes.",
    url: "/case-studies",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
