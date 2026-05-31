import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

// Asset variants. "full" is the original 1024² canvas (lots of transparent padding);
// "mark" is the tightly-trimmed artwork (638×547) so a CSS height renders a mark of
// nearly that same visible height — used where the logo needs to read large in a
// compact bar. Intrinsic width/height MUST match the file so next/image keeps the
// right aspect ratio under `width:"auto"`.
const LOGO_VARIANTS = {
  full: { src: "/logo-txaleta.png", width: 1024, height: 1024 },
  mark: { src: "/logo-txaleta-mark.png", width: 638, height: 547 },
} as const;

/** Brand logo image (transparent PNG, dark glyph + red accent) — for light surfaces. */
export function Logo({
  className = "",
  height = 60,
  variant = "full",
}: {
  className?: string;
  height?: number;
  variant?: keyof typeof LOGO_VARIANTS;
}) {
  const asset = LOGO_VARIANTS[variant];
  return (
    <Link href="/" aria-label={site.name} className={`inline-flex w-max items-center ${className}`}>
      <Image
        src={asset.src}
        alt={site.name}
        width={asset.width}
        height={asset.height}
        priority
        sizes="160px"
        style={{ height, width: "auto" }}
        className="max-w-none shrink-0 select-none"
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
