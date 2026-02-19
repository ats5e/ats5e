"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Solutions",    href: "/featured-solutions" },
  { label: "5E Framework", href: "/5e-framework"       },
  { label: "Case Studies", href: "/case-studies"       },
  { label: "Insights",     href: "/insight"            },
  { label: "About",        href: "/about"              },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1,  y: 0   }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? "glass-dark border-b border-white/[0.05]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="ATS5E"
              height={36}
              width={120}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] font-medium tracking-[0.18em] uppercase text-zinc-500 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-white/[0.1] text-[11px] font-bold tracking-[0.12em] uppercase text-zinc-400 hover:border-[#148be6]/50 hover:text-white hover:shadow-glow-blue-xs transition-all duration-300"
          >
            Contact Us <ArrowUpRight className="w-3 h-3" />
          </Link>

          <button
            className="md:hidden text-zinc-500 hover:text-white transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1,  y: 0  }}
            exit={{    opacity: 0,  y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[72px] left-0 right-0 z-40 glass-dark border-b border-white/[0.05] px-6 py-8"
          >
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[11px] font-medium tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase text-white"
                style={{ background: "#148be6" }}
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
