import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VaultsPay × EduFlow360 — School Payments",
  description:
    "VaultsPay and EduFlow360 bring school fee collection, reconciliation and payment orchestration into one connected lifecycle for institutions and parents.",
  alternates: { canonical: "/eduflow360/vaultspay" },
  openGraph: {
    title: "VaultsPay × EduFlow360 | ATS5E",
    description:
      "School fee collection, reconciliation and payment orchestration in one connected lifecycle.",
    url: "/eduflow360/vaultspay",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
