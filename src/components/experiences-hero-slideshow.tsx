"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Crossfading full-bleed banner for the Experiences hero. Cycles through the
// slides on a timer, fading each one over the next. The first slide loads with
// priority; the rest lazy-load. Respects prefers-reduced-motion by holding on
// the first frame.
export function ExperiencesHeroSlideshow({
  slides,
  interval = 6000,
}: {
  slides: { src: string; alt: string }[];
  interval?: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      interval
    );
    return () => clearInterval(id);
  }, [slides.length, interval]);

  return (
    <>
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-[1.5s] ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}
