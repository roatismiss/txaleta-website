"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * Thin black grid that draws itself as the section scrolls into view:
 * vertical lines grow top→bottom (staggered left→right), horizontal lines
 * grow left→right (staggered top→bottom). Scroll-linked via framer-motion,
 * so it literally "builds" with the scroll. Decorative + non-interactive.
 *
 * Honours prefers-reduced-motion by rendering the finished grid statically.
 */
const V_LINES = 9; // vertical lines (revealed left→right)
const H_LINES = 5; // horizontal lines (revealed top→bottom)
const LINE = "rgba(11,28,34,0.12)"; // faint ink — reads as a delicate black grid on cream

/** Each line draws within a staggered sub-window of the [0,1] scroll progress. */
function drawWindow(index: number, total: number) {
  const stagger = 0.5 / total;
  const start = index * stagger;
  return [start, Math.min(1, start + 0.5)] as const;
}

function VLine({
  progress,
  index,
  total,
  reduce,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  reduce: boolean;
}) {
  const [s, e] = drawWindow(index, total);
  const scaleY = useTransform(progress, [s, e], [0, 1]);
  return (
    <motion.span
      className="absolute top-0 h-full w-px"
      style={{
        left: `${((index + 1) / (total + 1)) * 100}%`,
        backgroundColor: LINE,
        transformOrigin: "top",
        scaleY: reduce ? 1 : scaleY,
      }}
    />
  );
}

function HLine({
  progress,
  index,
  total,
  reduce,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  reduce: boolean;
}) {
  const [s, e] = drawWindow(index, total);
  const scaleX = useTransform(progress, [s, e], [0, 1]);
  return (
    <motion.span
      className="absolute left-0 h-px w-full"
      style={{
        top: `${((index + 1) / (total + 1)) * 100}%`,
        backgroundColor: LINE,
        transformOrigin: "left",
        scaleX: reduce ? 1 : scaleX,
      }}
    />
  );
}

export function GridBackdrop({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {Array.from({ length: V_LINES }).map((_, i) => (
        <VLine key={`v${i}`} progress={scrollYProgress} index={i} total={V_LINES} reduce={!!reduce} />
      ))}
      {Array.from({ length: H_LINES }).map((_, i) => (
        <HLine key={`h${i}`} progress={scrollYProgress} index={i} total={H_LINES} reduce={!!reduce} />
      ))}
    </div>
  );
}
