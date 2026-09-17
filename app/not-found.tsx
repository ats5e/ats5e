import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      <section className="relative px-6 pt-52 pb-40 text-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#148be6,transparent 70%)", filter: "blur(120px)" }}
        />
        <div className="relative mx-auto max-w-2xl">
          <p className="mb-6 text-[12px] font-medium uppercase tracking-[0.35em] text-zinc-500">Error 404</p>
          <h1 className="mb-8 text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-[0.88] tracking-[-0.05em]">
            PAGE NOT <span style={{ color: "#148be6" }}>FOUND.</span>
          </h1>
          <p className="mb-10 text-sm font-medium leading-relaxed tracking-[0.02em] text-zinc-400">
            The page you are looking for has moved or no longer exists.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#148be6] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#1a9af5]"
            >
              Back to Home <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.14em] text-zinc-300 transition-colors hover:border-white/[0.2] hover:text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
