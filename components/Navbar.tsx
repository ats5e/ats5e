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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={
          scrolled || mobileOpen
            ? {
                background: "rgba(5,5,5,0.82)",
                backdropFilter: "blur(28px) saturate(180%)",
                WebkitBackdropFilter: "blur(28px) saturate(180%)",
                borderBottom: "1px solid rgba(20,139,230,0.18)",
                boxShadow: "0 8px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(20,139,230,0.06) inset",
              }
            : {
                background: "linear-gradient(180deg, rgba(5,5,5,0.7) 0%, transparent 100%)",
                backdropFilter: "blur(0px)",
              }
        }
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #148be6 40%, #74caff 60%, transparent 100%)",
            opacity: scrolled ? 0.7 : 0.35,
            transition: "opacity 0.5s",
          }}
        />

        {/* Ambient blue glow behind nav on scroll */}
        {scrolled && (
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[80px] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(20,139,230,0.08), transparent 70%)",
            }}
          />
        )}

        <div className="max-w-7xl mx-auto px-6 h-[84px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="shrink-0 relative group">
            <div
              className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "radial-gradient(ellipse, rgba(20,139,230,0.1), transparent 70%)" }}
            />
            <Image
              src="/logo.png"
              alt="ATS5E"
              height={60}
              width={200}
              className="h-[60px] w-auto object-contain relative transition-opacity duration-300 group-hover:opacity-90"
              priority
            />
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative group flex flex-col items-center gap-1 py-1"
                >
                  <span
                    className="text-[11px] font-bold tracking-[0.22em] uppercase transition-colors duration-200"
                    style={{ color: active ? "#ffffff" : "rgba(161,161,170,0.9)" }}
                  >
                    {link.label}
                  </span>
                  {/* Active / hover underline */}
                  <span
                    className="h-px w-full transition-all duration-300"
                    style={{
                      background: "linear-gradient(90deg, transparent, #148be6, transparent)",
                      opacity: active ? 1 : 0,
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "center",
                    }}
                  />
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300 origin-center"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(20,139,230,0.6), transparent)" }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Contact CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 px-7 py-3 rounded-full text-[11px] font-black tracking-[0.18em] uppercase text-white transition-all duration-300 hover:shadow-glow-blue-sm active:scale-95"
            style={{
              background: "linear-gradient(135deg, #148be6 0%, #0d6eb5 100%)",
              boxShadow: "0 0 24px rgba(20,139,230,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
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
            className="fixed top-[84px] left-0 right-0 z-40 px-6 py-10"
            style={{
              background: "rgba(5,5,5,0.95)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              borderBottom: "1px solid rgba(20,139,230,0.15)",
            }}
          >
            <nav className="flex flex-col gap-7">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1,  x: 0   }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm font-bold tracking-[0.2em] uppercase text-zinc-300 hover:text-white transition-colors"
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
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[11px] font-black tracking-[0.18em] uppercase text-white"
                  style={{ background: "linear-gradient(135deg, #148be6, #0d6eb5)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Contact Us <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
