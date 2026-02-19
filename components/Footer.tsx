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
        <div className="md:col-span-2">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="ATS5E"
              height={30}
              width={105}
              className="h-7 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity mb-6"
            />
          </Link>
          <p className="text-[11px] font-medium leading-relaxed tracking-[0.03em] text-zinc-700 max-w-sm">
            We are a specialist execution partner for forward-thinking
            enterprises operating at the intersection of strategy, technology,
            and transformation. We work quietly behind the scenes to help
            organisations evolve, accelerate, and outperform.
          </p>
          <div className="mt-6 flex flex-col gap-1.5">
            <a
              href="mailto:info@ats5e.com"
              className="text-[11px] text-zinc-700 hover:text-zinc-300 transition-colors tracking-[0.04em]"
            >
              info@ats5e.com
            </a>
            <a
              href="tel:+971585223191"
              className="text-[11px] text-zinc-700 hover:text-zinc-300 transition-colors tracking-[0.04em]"
            >
              +971 58 522 3191
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-[10px] font-bold tracking-[0.28em] uppercase text-zinc-700 mb-5">
            Company
          </h4>
          <nav className="flex flex-col gap-3">
            {COMPANY_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors font-medium"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* 5E Framework */}
        <div>
          <h4 className="text-[10px] font-bold tracking-[0.28em] uppercase text-zinc-700 mb-5">
            The 5E Framework
          </h4>
          <nav className="flex flex-col gap-3">
            {FRAMEWORK_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors font-medium"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <p className="text-[10px] tracking-[0.22em] uppercase text-zinc-800 font-medium">
          © {new Date().getFullYear()} ATS5E. All Rights Reserved.
        </p>
        <p className="text-[10px] tracking-[0.12em] uppercase text-zinc-800 font-medium">
          Dubai, UAE · Meydan Grandstand, 6th Floor
        </p>
      </div>
    </footer>
  );
}
