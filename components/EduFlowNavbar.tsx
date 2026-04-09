"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "The Problem", href: "#challenge" },
  { label: "The Solution", href: "#solution" },
  { label: "Our Impact", href: "#value" },
  { label: "About Us", href: "#about-us" },
  { label: "Partners", href: "#partners" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Determine active section
      const sections = NAV_LINKS.map(l => l.href.replace("#", ""));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-3 md:px-6 pt-3 md:pt-4 transition-all duration-500"
      >
        <div
          className="max-w-7xl mx-auto h-[74px] md:h-[82px] rounded-2xl md:rounded-[22px] px-4 md:px-6 flex items-center justify-between border"
          style={{
            background: scrolled || mobileOpen
              ? "linear-gradient(135deg, rgba(9,12,18,0.86), rgba(6,7,10,0.8))"
              : "linear-gradient(135deg, rgba(9,12,18,0.66), rgba(6,7,10,0.5))",
            backdropFilter: "blur(22px) saturate(165%)",
            WebkitBackdropFilter: "blur(22px) saturate(165%)",
            borderColor: scrolled || mobileOpen ? "rgba(116,202,255,0.22)" : "rgba(255,255,255,0.1)",
            boxShadow: scrolled || mobileOpen
              ? "0 14px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(20,139,230,0.08)"
              : "0 8px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Logo */}
          <Link href="/" title="Back to Main Site" className="shrink-0 relative rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02]">
            <Image
              src="/eduflow-partners/EduFlow 360 Logo PNG TM2.png"
              alt="EduFlow360™"
              height={70}
              width={250}
              className="h-[48px] md:h-[56px] lg:h-[60px] w-auto object-contain relative drop-shadow-md"
              priority
            />
          </Link>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full px-2 py-1 border border-white/[0.06] bg-black/25">
            {NAV_LINKS.map((link) => {
              const active = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative group px-2 lg:px-3 py-2 rounded-full"
                >
                  <span
                    className="whitespace-nowrap text-[13px] font-bold tracking-[0.14em] uppercase transition-all duration-200 group-hover:text-[#74caff]"
                    style={{
                      color: active ? "#ffffff" : "rgba(161,161,170,0.95)",
                      textShadow: active ? "0 0 12px rgba(116,202,255,0.35)" : "none",
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="absolute inset-0 rounded-full border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      borderColor: "rgba(116,202,255,0.28)",
                      boxShadow: "0 0 20px rgba(20,139,230,0.2)",
                    }}
                  />
                  <span
                    className="absolute left-1/2 -translate-x-1/2 bottom-0.5 h-1 w-1 rounded-full transition-all duration-300"
                    style={{
                      background: "#74caff",
                      opacity: active ? 1 : 0,
                      boxShadow: active ? "0 0 12px rgba(116,202,255,0.8)" : "none",
                    }}
                  />
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* ATS5E return link */}
            <Link
              href="/"
              aria-label="Back to ATS5E"
              title="Back to ATS5E"
              className="group inline-flex items-center justify-center gap-2 px-1 py-2 text-white transition-all duration-300 hover:opacity-100 active:scale-95"
            >
              <span className="sr-only">Back to ATS5E</span>
              <Image
                src="/logo.png"
                alt="ATS5E"
                width={138}
                height={34}
                className="h-5 lg:h-6 w-auto object-contain"
              />
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 transition-colors duration-300 group-hover:text-white" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-zinc-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[88px] left-0 right-0 z-40 px-4 md:px-6 py-3"
          >
            <div
              className="max-w-7xl mx-auto rounded-2xl px-6 py-8 border"
              style={{
                background: "rgba(5,5,5,0.95)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                borderColor: "rgba(116,202,255,0.18)",
              }}
            >
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      className="text-sm font-bold tracking-[0.18em] uppercase text-zinc-300 hover:text-white transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.3 }}
                  className="flex flex-col gap-3"
                >
                  <Link
                    href="/"
                    aria-label="Back to ATS5E"
                    className="inline-flex items-center gap-3 text-zinc-300 transition-colors hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="sr-only">Back to ATS5E</span>
                    <Image
                      src="/logo.png"
                      alt="ATS5E"
                      width={132}
                      height={32}
                      className="h-5 w-auto object-contain"
                    />
                    <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-colors duration-300 group-hover:text-white" />
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
