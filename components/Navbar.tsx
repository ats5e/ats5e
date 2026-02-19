"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1,  y: 0   }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-3 md:px-6 pt-3 md:pt-4 transition-all duration-500"
        style={
          scrolled || mobileOpen
            ? {
                background: "transparent",
              }
            : {
                background: "transparent",
              }
        }
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
          <Link href="/" className="shrink-0 relative rounded-lg overflow-hidden">
            <Image
              src="/logo.png"
              alt="ATS5E"
              height={60}
              width={200}
              className="h-[54px] md:h-[60px] w-auto object-contain relative"
              priority
            />
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-2 rounded-full px-2 py-1 border border-white/[0.06] bg-black/25">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative group px-4 py-2 rounded-full"
                >
                  <span
                    className="text-[12px] font-bold tracking-[0.2em] uppercase transition-all duration-200 group-hover:text-[#74caff]"
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
                </Link>
              );
            })}
          </nav>

          {/* Contact CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 px-7 py-3 rounded-full text-[13px] font-black tracking-[0.18em] uppercase text-white transition-all duration-300 hover:shadow-glow-blue-sm active:scale-95"
            style={{
              background: "linear-gradient(135deg, #1f96ee 0%, #1277c5 100%)",
              boxShadow: "0 0 24px rgba(20,139,230,0.3), inset 0 1px 0 rgba(255,255,255,0.18)",
            }}
          >
            Contact Us <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

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
            animate={{ opacity: 1,  y: 0   }}
            exit={{    opacity: 0,  y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[88px] left-0 right-0 z-40 px-4 md:px-6 py-3"
            style={{
              background: "transparent",
            }}
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
                  animate={{ opacity: 1,  x: 0   }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm font-bold tracking-[0.18em] uppercase text-zinc-300 hover:text-white transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1,  x: 0   }}
                transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[13px] font-black tracking-[0.18em] uppercase text-white"
                  style={{ background: "linear-gradient(135deg, #1f96ee, #1277c5)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Contact Us <ArrowUpRight className="w-3.5 h-3.5" />
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
