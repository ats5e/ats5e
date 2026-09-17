import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers";
import { CONTACT_EMAIL, CONTACT_PHONE, SITE_NAME, SITE_URL } from "@/lib/site";

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

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  slogan: "Intelligence Applied",
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Meydan Grandstand, 6th Floor",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  areaServed: ["GCC", "South Pacific"],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    locale: "en_AE",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
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
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
