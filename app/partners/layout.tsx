import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The technology and delivery partners behind ATS5E, including Microsoft Fabric, UiPath, Quantexa, SmartStream, QBricks and Nextwave Infinium.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "Partners | ATS5E",
    description:
      "The technology and delivery partners behind ATS5E, including Microsoft Fabric, UiPath, Quantexa, SmartStream, QBricks and Nextwave Infinium.",
    url: "/partners",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
