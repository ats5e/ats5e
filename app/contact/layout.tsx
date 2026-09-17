import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start the conversation with ATS5E. Talk to our team in Dubai about transformation, AI, automation, data and risk.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | ATS5E",
    description:
      "Start the conversation with ATS5E. Talk to our team in Dubai about transformation, AI, automation, data and risk.",
    url: "/contact",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
