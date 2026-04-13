import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const september = localFont({
  src: [
    {
      path: "../public/fonts/September-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/September-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/September-Heavy.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-september",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ATS5E | Intelligence Applied",
    template: "%s | ATS5E",
  },
  description:
    "ATS5E is a specialist execution partner for enterprise transformation, AI, automation, data, risk, and EduFlow360 education orchestration across the GCC and South Pacific.",
  openGraph: {
    title: "ATS5E | Intelligence Applied",
    description:
      "Specialist execution partner for enterprise transformation, AI, automation, data, risk, and EduFlow360 education orchestration.",
    siteName: "ATS5E",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${september.variable} font-sans antialiased bg-[#050505] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
