"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import { BookingBar } from "./booking-bar";

export function Hero() {
  const { videos, slides } = site.hero;
  const videoRef = useRef<HTMLVideoElement>(null);

  // Image slideshow state (runs before video kicks in)
  const [slideIdx, setSlideIdx] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [videoIdx, setVideoIdx] = useState(0);

  // Cycle slides every 4 s; after all slides shown once, switch to video
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIdx((i) => {
        const next = i + 1;
        if (next >= slides.length) {
          clearInterval(interval);
          setShowVideo(true);
          return i;
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Play the active video — on the slideshow hand-off AND every time videoIdx
  // changes. Swapping a <video>'s src in React does NOT auto-resume playback,
  // so without this the 2nd/3rd video in the cycle just froze on its first
  // frame. load() picks up the new src, then play() starts it (this order does
  // not trigger the "play() interrupted by load()" abort).
  useEffect(() => {
    if (!showVideo) return;
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
  }, [videoIdx, showVideo]);

  const handleEnded = () => {
    if (videos.length > 1) setVideoIdx((i) => (i + 1) % videos.length);
    else videoRef.current?.play().catch(() => {});
  };

  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden">
      {/* ── Static image slideshow ── */}
      <AnimatePresence>
        {!showVideo && (
          <motion.div
            key="slides"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[slideIdx]}
                  alt=""
                  fill
                  priority={slideIdx === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Video (fades in after slideshow) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showVideo ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0"
      >
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
      </motion.div>

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
          Your Coastal Escape<br className="hidden sm:block" /> in Mambajao
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

      {/* Slide dots */}
      {!showVideo && (
        <div className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 gap-2 lg:flex">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIdx(i)}
              className={`h-1 rounded-full transition-all duration-500 ${i === slideIdx ? "w-6 bg-white" : "w-2 bg-white/40"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

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
