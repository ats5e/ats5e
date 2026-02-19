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
  title: "ATS5E | Atlas",
  description:
    "Experience. Empowerment. Efficiency. Execution. Evolution. The 5E Framework.",
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
