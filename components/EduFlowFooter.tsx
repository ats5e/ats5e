import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SECTION_LINKS = [
  { label: "The Challenge", href: "#challenge" },
  { label: "The Solution", href: "#solution" },
  { label: "Student Journey", href: "#journey" },
  { label: "Two Pillars", href: "#pillars" },
  { label: "Value Delivered", href: "#value" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Our DNA", href: "#dna" },
  { label: "Roadmap", href: "#roadmap" },
];

const ATS5E_LINKS = [
  { label: "ATS5E Home", href: "/" },
  { label: "5E Framework", href: "/5e-framework" },
  { label: "Solutions", href: "/featured-solutions" },
  { label: "Contact ATS5E", href: "/contact" },
];

export default function Footer() {
  return (
    <footer
      className="px-6 pt-16 pb-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="md:col-span-2 flex flex-col items-start">
          <a href="#" className="inline-flex -ml-2">
            <Image
              src="/eduflow-partners/EduFlow 360 Logo PNG TM2.png"
              alt="EduFlow360™"
              height={50}
              width={200}
              className="h-12 w-auto object-contain opacity-100 mb-6"
            />
          </a>
          <p className="text-sm font-medium leading-relaxed text-zinc-300 max-w-sm mb-3">
            EduFlow360™ is the intelligence layer that orchestrates your SIS, LMS, and ERP
            into one coordinated operation — delivering financial visibility, operational
            agility, and seamless student journeys.
          </p>
          <p className="text-xs font-medium text-zinc-500 mb-6">
            Powered by{" "}
            <Link
              href="/"
              className="text-[#148be6] hover:text-[#74caff] transition-colors inline-flex items-center gap-1"
            >
              ATS<span className="text-[#148be6]">5E</span> <ArrowUpRight className="w-3 h-3" />
            </Link>
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="mailto:info@ats5e.com"
              className="text-sm text-zinc-300 hover:text-white transition-colors font-medium"
            >
              info@ats5e.com
            </a>
            <a
              href="tel:+971585223191"
              className="text-sm text-zinc-300 hover:text-white transition-colors font-medium"
            >
              +971 58 522 3191
            </a>
          </div>
        </div>

        {/* Sections */}
        <div>
          <h4 className="text-sm font-bold tracking-[0.28em] uppercase text-zinc-500 mb-6">
            Sections
          </h4>
          <nav className="flex flex-col gap-4">
            {SECTION_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-zinc-300 hover:text-white transition-colors font-medium"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* ATS5E */}
        <div>
          <h4 className="text-sm font-bold tracking-[0.28em] uppercase text-zinc-500 mb-6">
            ATS<span className="text-[#148be6]">5E</span>
          </h4>
          <nav className="flex flex-col gap-4">
            {ATS5E_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm text-zinc-300 hover:text-white transition-colors font-medium inline-flex items-center gap-1.5"
              >
                {l.label} <ArrowUpRight className="w-3 h-3 text-zinc-600" />
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-medium">
          © {new Date().getFullYear()} EduFlow360™ by ATS<span className="text-[#148be6]">5E</span>. All Rights Reserved.
        </p>
        <p className="text-sm tracking-[0.1em] uppercase text-zinc-500 font-medium">
          Dubai, UAE · Meydan Grandstand, 6th Floor
        </p>
      </div>
    </footer>
  );
}
