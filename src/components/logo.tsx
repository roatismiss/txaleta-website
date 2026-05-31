import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

/** Brand logo image (transparent PNG, dark glyph + red accent) — for light surfaces. */
export function Logo({
  className = "",
  height = 60,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <Link href="/" aria-label={site.name} className={`inline-flex items-center ${className}`}>
      <Image
        src="/logo-txaleta.png"
        alt={site.name}
        width={1024}
        height={1024}
        priority
        sizes="160px"
        style={{ height, width: "auto" }}
        className="select-none"
      />
    </Link>
  );
}

/** Typographic wordmark — for dark surfaces (footer) where the dark logo wouldn't read. */
export function LogoWordmark({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const wordmark = size === "lg" ? "text-4xl" : size === "sm" ? "text-xl" : "text-2xl";
  const sub = size === "lg" ? "text-[11px]" : "text-[9px]";
  return (
    <Link
      href="/"
      aria-label={site.name}
      className={`inline-flex flex-col items-start leading-none select-none ${className}`}
    >
      <span className={`font-display ${wordmark} tracking-[0.04em] uppercase`} style={{ fontWeight: 400 }}>
        Txaleta
      </span>
      <span className={`label ${sub} mt-1.5 text-brand`}>de Camiguin</span>
    </Link>
  );
}
