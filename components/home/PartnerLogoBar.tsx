"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const PARTNER_LOGOS = [
  // The Fabric asset is icon-only, so it is paired with a wordmark label.
  { name: "Microsoft Fabric", src: "/Partners/Microsoft Fabric.png", label: "Microsoft Fabric" },
  { name: "UiPath", src: "/Partners/UiPath.png" },
  { name: "Quantexa", src: "/Partners/Quantexa.png" },
  { name: "SmartStream", src: "/Partners/Smartstream.svg" },
  { name: "QBricks", src: "/Partners/QBricks.png" },
  { name: "Nextwave Infinium", src: "/Partners/Nextwave Infinium.png" },
];

export default function PartnerLogoBar() {
  return (
    <section aria-label="Technology partners" className="relative px-6 pt-20 pb-4">
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <p className="text-center text-[12px] tracking-[0.32em] uppercase text-zinc-500 font-medium mb-10">
          Delivered with a best-in-class partner ecosystem
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center gap-x-10 gap-y-8">
          {PARTNER_LOGOS.map((partner) => (
            <li key={partner.name} className="flex justify-center">
              <Link
                href="/partners"
                aria-label={`${partner.name} — view our partners`}
                className="flex h-9 items-center gap-2.5 opacity-50 transition-opacity duration-300 hover:opacity-100"
              >
                <span className={`relative block h-9 ${partner.label ? "w-8" : "w-32"}`}>
                  <Image
                    src={partner.src}
                    alt={partner.label ? "" : partner.name}
                    fill
                    sizes="128px"
                    className="object-contain brightness-0 invert"
                  />
                </span>
                {partner.label ? (
                  <span className="text-[13px] font-bold leading-tight text-white whitespace-nowrap">{partner.label}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
