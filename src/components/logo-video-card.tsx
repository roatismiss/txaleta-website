"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * The animated logo reveal (dark, vignetted MP4) presented as a self-contained
 * dark card so its solid background reads as intentional on any surface.
 *
 * trigger:
 *  - "mount" — play once as soon as it mounts (used in the mobile drawer, so the
 *    logo draws itself each time the menu opens).
 *  - "view"  — play whenever it scrolls into view (used as a homepage brand beat).
 *
 * Honours prefers-reduced-motion by staying on the poster (the finished logo).
 */
export function LogoVideoCard({
  trigger = "view",
  href,
  onClick,
  className = "",
}: {
  trigger?: "mount" | "view";
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const play = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    if (trigger === "mount") {
      play();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) play();
      },
      { threshold: 0.5 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [trigger]);

  const card =
    "block aspect-[1440/1352] overflow-hidden rounded-2xl bg-black shadow-[0_24px_60px_-24px_rgba(11,28,34,0.55)] ring-1 ring-ink/10";

  const video = (
    <video
      ref={videoRef}
      src="/txaleta-logo-reveal.mp4"
      poster="/images/brand/logo-reveal-2.webp"
      muted
      playsInline
      preload="metadata"
      aria-label={`${site.name} logo`}
      className="h-full w-full object-cover"
    />
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} aria-label={site.name} className={`${card} ${className}`}>
        {video}
      </Link>
    );
  }

  return <div className={`${card} ${className}`}>{video}</div>;
}
