"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import { BookingBar } from "./booking-bar";

export function Hero() {
  const { videos, poster } = site.hero;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [idx, setIdx] = useState(0);
  const [intro, setIntro] = useState(true);

  // Hold on the aerial still for ~1.6s, then fade to the playing video.
  useEffect(() => {
    const t = setTimeout(() => {
      setIntro(false);
      videoRef.current?.play().catch(() => {});
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  // Load & play whenever the source index changes (after the intro).
  useEffect(() => {
    if (intro) return;
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
  }, [idx, intro]);

  // Cycle to the next clip when one ends (loop back to the first).
  const handleEnded = () => {
    if (videos.length > 1) setIdx((i) => (i + 1) % videos.length);
    else videoRef.current?.play().catch(() => {});
  };

  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden">
      {/* Background video (Cloudflare R2) — clips cycle in sequence */}
      <video
        ref={videoRef}
        src={videos[idx]}
        onEnded={handleEnded}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="auto"
      />

      {/* Aerial still — shown first, then fades to reveal the video */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: intro ? 1 : 0 }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src={poster}
          alt="Aerial view of Txaleta de Camiguin"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/55" />

      {/* Centered headline */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="label text-[11px] text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]"
        >
          Camiguin Island · Philippines
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-display mt-5 max-w-4xl text-balance text-5xl font-light leading-[1.05] [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-6xl md:text-7xl"
        >
          Your Coastal Escape<br className="hidden sm:block" /> in Mambajao
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-6 max-w-xl text-base font-light text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] sm:text-lg"
        >
          Seaview suites, ocean-view glamping and an infinity pool —
          warm Filipino hospitality on Camiguin Island.
        </motion.p>
      </div>

      {/* Booking bar near the bottom edge (desktop only) — on mobile it lives below the hero so the island video stays fully visible */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7 }}
        className="relative z-20 hidden w-full px-4 pb-8 sm:px-6 sm:pb-12 lg:block"
      >
        <BookingBar />
      </motion.div>

      {/* Scroll cue (desktop only — on mobile the booking card sits at the seam) */}
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
