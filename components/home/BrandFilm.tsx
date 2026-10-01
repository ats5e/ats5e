"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const VIDEO_TITLE = "ATS5E - Intelligence. Applied.";
const MUX_PLAYBACK_ID = "FXjtLv3omY9ysYhhx9AdKiUrKiRCb900Df92yyFqfuBE";
const MUX_PLAYER_SRC =
  `https://player.mux.com/${MUX_PLAYBACK_ID}` +
  `?metadata-video-title=${encodeURIComponent(VIDEO_TITLE)}` +
  `&video-title=${encodeURIComponent(VIDEO_TITLE)}` +
  "&autoplay=true";

// The Mux iframe is only mounted after the poster is clicked, so the homepage
// doesn't pay for the player on load.
export default function BrandFilm() {
  const [playing, setPlaying] = useState(false);

  return (
    <section aria-label="ATS5E brand film" className="relative px-6 pt-24 pb-8">
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <p className="text-center text-[13px] tracking-[0.28em] uppercase text-zinc-400 font-bold mb-10">
          Five disciplines. One partner.
        </p>

        <div
          className="relative w-full aspect-video overflow-hidden rounded-2xl bg-black"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 60px rgba(20,139,230,0.12)",
          }}
        >
          {playing ? (
            <iframe
              src={MUX_PLAYER_SRC}
              title={VIDEO_TITLE}
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${VIDEO_TITLE}`}
              className="group absolute inset-0 h-full w-full cursor-pointer text-left"
            >
              <Image
                src="/video-poster-intelligence-applied.jpg"
                alt=""
                fill
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <span
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.2) 35%, transparent 60%)" }}
              />
              <span className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 flex items-center gap-4">
                <span
                  className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-blue-sm"
                  style={{ background: "#148be6" }}
                >
                  <Play className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6 fill-current" />
                </span>
                <span className="flex flex-col">
                  <span className="text-[13px] sm:text-sm font-bold tracking-[0.14em] uppercase text-white">Watch the film</span>
                  <span className="text-[13px] tracking-[0.18em] uppercase text-zinc-300">Intelligence. Applied. · 0:34</span>
                </span>
              </span>
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
