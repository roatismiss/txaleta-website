"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import { BookingBar } from "./booking-bar";

export function Hero() {
  const { videos } = site.hero;
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoIdx, setVideoIdx] = useState(0);

  // Play the active video — on mount AND every time videoIdx changes.
  // Swapping a <video>'s src in React does NOT auto-resume playback,
  // so without this the 2nd/3rd video in the cycle just froze on its first
  // frame. load() picks up the new src, then play() starts it (this order does
  // not trigger the "play() interrupted by load()" abort).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
  }, [videoIdx]);

  const handleEnded = () => {
    if (videos.length > 1) setVideoIdx((i) => (i + 1) % videos.length);
    else videoRef.current?.play().catch(() => {});
  };

  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden">
      {/* ── Video (plays first thing) ── */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={videos[videoIdx]}
          onEnded={handleEnded}
          poster={site.hero.poster}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
        />
      </div>

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/55" />

      {/* Centered headline */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-28 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="label text-[11px] font-bold text-brand [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_16px_rgba(0,0,0,1),0_2px_4px_rgba(0,0,0,0.95),0_4px_24px_rgba(0,0,0,0.8)]"
          style={{ fontWeight: 700 }}
        >
          Camiguin Island · Philippines
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          style={{ fontWeight: 600 }}
          className="font-display mt-5 max-w-4xl text-balance text-5xl leading-[1.05] [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_3px_10px_rgba(0,0,0,0.85),0_6px_24px_rgba(0,0,0,0.7),0_10px_60px_rgba(0,0,0,0.55)] sm:text-6xl md:text-7xl"
        >
          Come Home<br className="hidden sm:block" /> to Camiguin
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-6 max-w-xl text-base font-medium text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.95),0_2px_10px_rgba(0,0,0,0.85),0_4px_26px_rgba(0,0,0,0.6)] sm:text-lg"
        >
          Seaview suites, ocean-view glamping and an infinity pool —
          warm Filipino hospitality on Camiguin Island.
        </motion.p>
      </div>

      {/* Booking bar */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7 }}
        className="relative z-20 hidden w-full px-4 pb-8 sm:px-6 sm:pb-12 lg:block"
      >
        <BookingBar />
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pointer-events-none absolute bottom-2 left-1/2 z-10 hidden -translate-x-1/2 text-white/70 lg:block"
      >
        <ChevronDown className="h-5 w-5 animate-bounce" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
