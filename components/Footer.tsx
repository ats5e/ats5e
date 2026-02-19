import Image from "next/image";
import Link from "next/link";

const COMPANY_LINKS = [
  { label: "About Us",           href: "/about"               },
  { label: "Featured Solutions", href: "/featured-solutions"  },
  { label: "Case Studies",       href: "/case-studies"        },
  { label: "Insights",           href: "/insight"             },
];

const FRAMEWORK_LINKS = [
  { label: "Experience",  href: "/5e-framework/experience"  },
  { label: "Empowerment", href: "/5e-framework/empowerment" },
  { label: "Efficiency",  href: "/5e-framework/efficiency"  },
  { label: "Execution",   href: "/5e-framework/execution"   },
  { label: "Evolution",   href: "/5e-framework/evolution"   },
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
          <Link href="/" className="inline-flex -ml-[28px]">
            <Image
              src="/logo.png"
              alt="ATS5E"
              height={60}
              width={210}
              className="h-14 w-auto object-contain opacity-100 mb-6"
            />
          </Link>
          <p className="text-sm font-medium leading-relaxed text-zinc-300 max-w-sm">
            We are a specialist execution partner for forward-thinking
            enterprises operating at the intersection of strategy, technology,
            and transformation. We work quietly behind the scenes to help
            organisations evolve, accelerate, and outperform.
          </p>
          <div className="mt-6 flex flex-col gap-2">
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

        {/* Company */}
        <div>
          <h4 className="text-sm font-bold tracking-[0.28em] uppercase text-zinc-500 mb-6">
            Company
          </h4>
          <nav className="flex flex-col gap-4">
            {COMPANY_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm text-zinc-300 hover:text-white transition-colors font-medium"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* 5E Framework */}
        <div>
          <h4 className="text-sm font-bold tracking-[0.28em] uppercase text-zinc-500 mb-6">
            The 5E Framework
          </h4>
          <nav className="flex flex-col gap-4">
            {FRAMEWORK_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm text-zinc-300 hover:text-white transition-colors font-medium"
              >
                {l.label}
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
          © {new Date().getFullYear()} ATS5E. All Rights Reserved.
        </p>
        <p className="text-sm tracking-[0.1em] uppercase text-zinc-500 font-medium">
          Dubai, UAE · Meydan Grandstand, 6th Floor
        </p>
      </div>
    </footer>
  );
}
