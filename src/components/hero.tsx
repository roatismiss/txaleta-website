"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import { BookingBar } from "./booking-bar";

export function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden">
      {/* Background video (Cloudflare R2) with image poster fallback */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={site.hero.poster}
      >
        <source src={site.hero.videoUrl} type="video/mp4" />
      </video>

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/55" />

      {/* Centered headline */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="label text-[11px] text-white/90"
        >
          Camiguin Island · Philippines
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-display mt-5 max-w-4xl text-balance text-5xl font-light leading-[1.05] sm:text-6xl md:text-7xl"
        >
          Your Coastal Escape<br className="hidden sm:block" /> in Mambajao
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-6 max-w-xl text-base font-light text-white/85 sm:text-lg"
        >
          Seaview suites, ocean-view glamping and an infinity pool —
          warm Filipino hospitality on Camiguin Island.
        </motion.p>
      </div>

      {/* Booking bar near the bottom edge */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7 }}
        className="relative z-20 w-full px-4 pb-8 sm:px-6 sm:pb-12"
      >
        <BookingBar />
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pointer-events-none absolute bottom-2 left-1/2 z-10 -translate-x-1/2 text-white/70"
      >
        <ChevronDown className="h-5 w-5 animate-bounce" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
