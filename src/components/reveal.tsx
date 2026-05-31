"use client";

import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Small uppercase signature-red kicker used above section headings. */
export function Kicker({
  children,
  className = "text-brand",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`label text-[11px] ${className}`}>{children}</p>;
}
