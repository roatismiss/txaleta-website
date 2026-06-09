import type { CSSProperties } from "react";

/**
 * Brand textures & patterns (txaleta_branding.pdf — Textures & Patterns):
 *   • Filipino-Spanish tilework (azulejo) — TilePattern / TileBand
 *   • Banig / rattan over-under basket weave — RattanWeave
 *   • T'nalak handloom selvage band — FabricBand
 *   • Subtle botanical line art (palm, sampaguita, calachuchi) — BotanicalAccent
 *   • Soft paper / abaca grain — PaperGrain
 *
 * All decorative: aria-hidden + pointer-events-none. Tiling motifs ship as
 * recoloured SVG data-URIs (no id collisions, retina-crisp, tiny); line art is
 * inline SVG using `currentColor`, so colour comes from a text-* class and
 * intensity from an opacity-* class on the element. Keep them faint — these are
 * accents, not backgrounds. Each motif is masked so it dissolves at the edges
 * instead of showing a hard tile seam.
 */

// Azulejo tile: corner arcs (form circles at tile junctions) + a central
// quatrefoil. Two tones so it reads on both light and dark surfaces.
const azulejo = (stroke: string) =>
  `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><g fill='none' stroke='${stroke}' stroke-width='1.1'><path d='M0 16A16 16 0 0 1 16 0'/><path d='M48 0A16 16 0 0 1 64 16'/><path d='M64 48A16 16 0 0 1 48 64'/><path d='M16 64A16 16 0 0 1 0 48'/><circle cx='32' cy='24' r='8'/><circle cx='40' cy='32' r='8'/><circle cx='32' cy='40' r='8'/><circle cx='24' cy='32' r='8'/><circle cx='32' cy='32' r='2.4'/></g></svg>`;

const AZULEJO_CLAY = azulejo("%239c6b66"); // Heritage Clay — for light surfaces
const AZULEJO_CREAM = azulejo("%23e7dcc4"); // warm cream — for dark surfaces

// Banig / rattan weave: flat slats crossing in a checkerboard of over/under
// plaiting — the under-strand is gapped behind the over-strand at each junction.
// 40px tile, seamless on both axes (slats sit on interior lanes 5/15/25/35).
const rattan = (stroke: string) =>
  `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><g fill='none' stroke='${stroke}' stroke-width='1' stroke-linecap='round'><path d='M0 1H11M19 1H31M39 1H40M0 9H11M19 9H31M39 9H40M0 11H1M9 11H21M29 11H40M0 19H1M9 19H21M29 19H40M0 21H11M19 21H31M39 21H40M0 29H11M19 29H31M39 29H40M0 31H1M9 31H21M29 31H40M0 39H1M9 39H21M29 39H40'/><path d='M1 0V1M1 9V21M1 29V40M9 0V1M9 9V21M9 29V40M11 0V11M11 19V31M11 39V40M19 0V11M19 19V31M19 39V40M21 0V1M21 9V21M21 29V40M29 0V1M29 9V21M29 29V40M31 0V11M31 19V31M31 39V40M39 0V11M39 19V31M39 39V40'/></g></svg>`;

const RATTAN_CLAY = rattan("%239c6b66");
const RATTAN_CREAM = rattan("%23e7dcc4");

// T'nalak ikat (Tboli handloom): concentric diamonds with a centre "eye"
// alternating with apex-to-apex triangle pairs, caged between two warp rails.
// 48×24 tile, repeats along X; the edge diamond splits across the seam and the
// two halves rejoin into one symmetric diamond on the next tile.
const tnalak = (stroke: string) =>
  `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='24' viewBox='0 0 48 24'><g fill='none' stroke='${stroke}' stroke-width='1' stroke-linejoin='round' stroke-linecap='round'><path d='M0 2H48M0 22H48'/><path d='M24 5L31 12L24 19L17 12Z'/><path d='M24 8.5L27.5 12L24 15.5L20.5 12Z'/><circle cx='24' cy='12' r='1.2'/><path d='M0 5L7 12L0 19'/><path d='M48 5L41 12L48 19'/><path d='M0 8.5L3.5 12L0 15.5'/><path d='M48 8.5L44.5 12L48 15.5'/><path d='M9 5L12 11L15 5Z'/><path d='M33 5L36 11L39 5Z'/><path d='M9 19L12 13L15 19Z'/><path d='M33 19L36 13L39 19Z'/></g></svg>`;

const TNALAK_CLAY = tnalak("%239c6b66");
const TNALAK_CREAM = tnalak("%23e7dcc4");

type Tone = "clay" | "cream";

/** Full-bleed faint azulejo fill. Drop into a `relative overflow-hidden`
 *  section as the first child; keep the section's content above it with
 *  `relative z-10`. Tune visibility with an opacity-* class. */
export function TilePattern({
  tone = "clay",
  size = 60,
  fade = "top",
  className = "",
}: {
  tone?: Tone;
  size?: number;
  fade?: "top" | "center" | "none";
  className?: string;
}) {
  const mask =
    fade === "center"
      ? "radial-gradient(80% 80% at 50% 50%, black 0%, transparent 75%)"
      : fade === "top"
        ? "radial-gradient(120% 120% at 50% 0%, black 30%, transparent 80%)"
        : undefined;
  const style: CSSProperties = {
    backgroundImage: `url("${tone === "cream" ? AZULEJO_CREAM : AZULEJO_CLAY}")`,
    backgroundRepeat: "repeat",
    backgroundSize: `${size}px ${size}px`,
    ...(mask ? { maskImage: mask, WebkitMaskImage: mask } : {}),
  };
  return (
    <div aria-hidden style={style} className={`pointer-events-none absolute inset-0 ${className}`} />
  );
}

/** Slim horizontal azulejo divider band, faded at both ends. In-flow — place
 *  it between sections. Set visibility with an opacity-* class. */
export function TileBand({
  tone = "clay",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  const mask = "linear-gradient(90deg, transparent, black 18%, black 82%, transparent)";
  const style: CSSProperties = {
    backgroundImage: `url("${tone === "cream" ? AZULEJO_CREAM : AZULEJO_CLAY}")`,
    backgroundRepeat: "repeat",
    backgroundSize: "48px 48px",
    maskImage: mask,
    WebkitMaskImage: mask,
  };
  return <div aria-hidden style={style} className={`pointer-events-none h-12 w-full ${className}`} />;
}

/** Full-bleed banig/rattan weave fill. Drop into a `relative overflow-hidden`
 *  section as the first child; keep the section's content above it with
 *  `relative z-10`. Keep it faint (opacity ~0.05) — it's a tactile ground, not
 *  a pattern. Tune visibility with an opacity-* class. */
export function RattanWeave({
  tone = "clay",
  size = 40,
  fade = "none",
  className = "",
}: {
  tone?: Tone;
  size?: number;
  fade?: "top" | "center" | "none";
  className?: string;
}) {
  const mask =
    fade === "center"
      ? "radial-gradient(80% 80% at 50% 50%, black 0%, transparent 75%)"
      : fade === "top"
        ? "radial-gradient(120% 120% at 50% 0%, black 30%, transparent 80%)"
        : undefined;
  const style: CSSProperties = {
    backgroundImage: `url("${tone === "cream" ? RATTAN_CREAM : RATTAN_CLAY}")`,
    backgroundRepeat: "repeat",
    backgroundSize: `${size}px ${size}px`,
    ...(mask ? { maskImage: mask, WebkitMaskImage: mask } : {}),
  };
  return (
    <div aria-hidden style={style} className={`pointer-events-none absolute inset-0 ${className}`} />
  );
}

/** Slim horizontal t'nalak textile divider band, faded at both ends. In-flow —
 *  place it between sections. The 48×24 motif repeats along X. Set visibility
 *  with an opacity-* class. */
export function FabricBand({
  tone = "clay",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  const mask = "linear-gradient(90deg, transparent, black 18%, black 82%, transparent)";
  const style: CSSProperties = {
    backgroundImage: `url("${tone === "cream" ? TNALAK_CREAM : TNALAK_CLAY}")`,
    backgroundRepeat: "repeat-x",
    backgroundPosition: "center",
    backgroundSize: "48px 24px",
    maskImage: mask,
    WebkitMaskImage: mask,
  };
  return <div aria-hidden style={style} className={`pointer-events-none h-6 w-full ${className}`} />;
}

/** Botanical line art (palm frond / sampaguita). Absolutely positioned accent —
 *  set colour with a text-* class and intensity with opacity-*; position/size
 *  via className (e.g. "right-0 top-10 w-72 text-palm opacity-[0.08]"). */
export function BotanicalAccent({
  variant = "palm",
  className = "",
}: {
  variant?: "palm" | "sampaguita" | "calachuchi";
  className?: string;
}) {
  return (
    <span aria-hidden className={`pointer-events-none absolute ${className}`}>
      {variant === "palm" ? (
        <PalmFrond />
      ) : variant === "calachuchi" ? (
        <Calachuchi />
      ) : (
        <Sampaguita />
      )}
    </span>
  );
}

function PalmFrond() {
  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
    >
      {/* central rib */}
      <path d="M14 150 C 78 122 150 72 230 14" />
      {/* upper leaflets */}
      <path d="M44 130 C 40 116 44 106 56 100" />
      <path d="M70 112 C 66 97 70 87 84 82" />
      <path d="M98 92 C 95 77 100 66 114 62" />
      <path d="M126 72 C 124 57 130 47 144 44" />
      <path d="M154 53 C 153 39 160 30 174 28" />
      <path d="M182 35 C 182 23 189 15 202 14" />
      {/* lower leaflets */}
      <path d="M44 130 C 56 136 66 140 74 150" />
      <path d="M70 112 C 82 118 92 122 100 132" />
      <path d="M98 92 C 110 98 120 102 128 112" />
      <path d="M126 72 C 138 78 148 82 156 92" />
      <path d="M154 53 C 166 59 176 62 184 72" />
      <path d="M182 35 C 193 40 202 44 210 53" />
    </svg>
  );
}

function Sampaguita() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      className="h-full w-full"
    >
      <circle cx="32" cy="20" r="8" />
      <circle cx="43.4" cy="28.3" r="8" />
      <circle cx="39" cy="41.7" r="8" />
      <circle cx="25" cy="41.7" r="8" />
      <circle cx="20.6" cy="28.3" r="8" />
      <circle cx="32" cy="32" r="3.6" />
    </svg>
  );
}

// Calachuchi (frangipani / plumeria): five broad spatulate petals canting in a
// gentle pinwheel around a small open throat — architectural single-stroke
// outlines (Q–A–Q per petal), distinct from the five plain circles of the
// sampaguita. Drawn on a 64×64 box, exact 5-fold rotation about (32,32).
function Calachuchi() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
    >
      <path d="M34.2 28.2 Q41.8 18.8 38.2 10.2 A10.2 10.2 0 0 1 27 11 Q26.4 21 30.3 28.4" />
      <path d="M36.29 32.92 Q47.58 37.24 54.65 31.16 A10.2 10.2 0 0 1 50.43 20.76 Q40.73 23.27 34.9 29.27" />
      <path d="M32.45 36.37 Q31.83 48.44 39.8 53.28 A10.2 10.2 0 0 1 48.39 46.05 Q43 37.61 35.49 33.91" />
      <path d="M27.99 33.78 Q16.31 36.92 14.17 45.99 A10.2 10.2 0 0 1 23.7 51.93 Q30.06 44.19 31.26 35.91" />
      <path d="M29.07 28.73 Q22.47 18.6 13.18 19.37 A10.2 10.2 0 0 1 10.48 30.27 Q19.81 33.93 28.05 32.5" />
      <circle cx="32" cy="32" r="3" />
    </svg>
  );
}

/** Soft greyscale paper/abaca grain. Drop into a `relative overflow-hidden`
 *  light section as the first child; multiply-blends into the surface. Tune with
 *  an opacity-* class (keep it very low, ~0.04). */
export function PaperGrain({ className = "" }: { className?: string }) {
  const style: CSSProperties = {
    backgroundImage:
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23g)'/></svg>\")",
  };
  return (
    <div
      aria-hidden
      style={style}
      className={`pointer-events-none absolute inset-0 mix-blend-multiply ${className}`}
    />
  );
}

/* ==========================================================================
   PalmCorner — lush coconut-frond corner accent, generated parametrically
   (curved rachis + leaflets sampled along it with a length profile), so it
   reads like an illustration, not a thin single frond. Ported 1:1 from the
   /palm-corner-styles.html tuner. Editorial line style: stroke = currentColor
   (set colour with a text-* class, intensity with opacity-*). Decorative.
   ========================================================================== */
type Pt = { x: number; y: number };
const _rotV = (v: Pt, a: number): Pt => ({
  x: v.x * Math.cos(a) - v.y * Math.sin(a),
  y: v.x * Math.sin(a) + v.y * Math.cos(a),
});
const _nrm = (v: Pt): Pt => {
  const l = Math.hypot(v.x, v.y) || 1;
  return { x: v.x / l, y: v.y / l };
};
const _add = (a: Pt, b: Pt): Pt => ({ x: a.x + b.x, y: a.y + b.y });
const _mul = (v: Pt, s: number): Pt => ({ x: v.x * s, y: v.y * s });
const _ff = (n: number) => n.toFixed(1);
const _PP = (p: Pt) => `${_ff(p.x)} ${_ff(p.y)}`;

function _bez(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}
function _bezT(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  return _nrm({
    x: 3 * u * u * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x),
    y: 3 * u * u * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y),
  });
}

/** One frond rooted at (0,0), arcing into +x / down. Returns the rachis path
 *  and a single concatenated leaflet path (line style). */
function _frond(L: number, dens: number) {
  const p0 = { x: 0, y: 0 },
    p1 = { x: L * 0.34, y: -L * 0.2 },
    p2 = { x: L * 0.72, y: -L * 0.06 },
    p3 = { x: L * 1.0, y: L * 0.26 };
  const rib = `M${_PP(p0)} C${_PP(p1)} ${_PP(p2)} ${_PP(p3)}`;
  let leaves = "";
  const Lmax = L * 0.46;
  for (const side of [1, -1]) {
    for (let i = 0; i < dens; i++) {
      const t = (i + 0.5) / dens;
      const O = _bez(p0, p1, p2, p3, t);
      const tan = _bezT(p0, p1, p2, p3, t);
      const prof = Math.pow(Math.sin(Math.PI * Math.min(Math.max(0.06 + 0.88 * t, 0), 1)), 0.72);
      const len = Lmax * prof;
      if (len < 3) continue;
      const ang = ((58 - 38 * t) * Math.PI) / 180;
      const dir = _rotV(tan, side * ang);
      const curl = len * 0.16;
      const tip = _add(_add(O, _mul(dir, len)), _mul(tan, curl));
      const cFwd = _add(_add(O, _mul(dir, len * 0.55)), _mul(tan, curl * 0.5));
      leaves += `M${_PP(O)} Q${_PP(cFwd)} ${_PP(tip)}`;
    }
  }
  return { rib, leaves };
}

type Corner = "tl" | "tr" | "bl" | "br";
const CORNER_POS: Record<Corner, string> = {
  tl: "left-0 top-0",
  tr: "right-0 top-0",
  bl: "bottom-0 left-0",
  br: "bottom-0 right-0",
};
const CORNER_FLIP: Record<Corner, string> = {
  tl: "none",
  tr: "scaleX(-1)",
  bl: "scaleY(-1)",
  br: "scale(-1,-1)",
};

/** Lush palm-frond corner cluster. Drop into a `relative overflow-hidden`
 *  section (content above with `relative z-10`). Set colour with a text-*
 *  class and intensity with opacity-* on the element; hide on mobile with
 *  `hidden lg:block`. e.g.
 *    <PalmCorner corner="tl" className="hidden text-palm opacity-[0.2] lg:block" /> */
export function PalmCorner({
  corner = "tl",
  size = 440,
  density = 20,
  fronds = 3,
  className = "",
}: {
  corner?: Corner;
  size?: number;
  density?: number;
  fronds?: number;
  className?: string;
}) {
  const layouts =
    fronds === 1
      ? [{ rot: 6, sc: 1, op: 1 }]
      : [
          { rot: -26, sc: 0.78, op: 0.55 },
          { rot: -3, sc: 1.0, op: 1.0 },
          { rot: 19, sc: 0.66, op: 0.72 },
        ].slice(0, fronds);
  const g = _frond(size * 0.92, density);
  const sw = size * 0.92 * 0.012;
  return (
    <span aria-hidden className={`pointer-events-none absolute ${CORNER_POS[corner]} ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: CORNER_FLIP[corner], overflow: "visible" }}
      >
        {layouts.map((ly, i) => (
          <g
            key={i}
            transform={`translate(10,10) rotate(${ly.rot}) scale(${ly.sc})`}
            opacity={ly.op}
            strokeWidth={sw}
          >
            <path d={g.rib} />
            <path d={g.leaves} />
          </g>
        ))}
      </svg>
    </span>
  );
}

/* ==========================================================================
   Azulejo — Spanish/Portuguese ceramic tilework for the heritage footer.
   Framed mandala tiles (parametric N-fold symmetry), ported 1:1 from the
   /footer-preview.html tuner (Transition + Ink navy): a cobalt-on-cream tile
   BAND as the threshold above the navy footer, plus a faint mandala backdrop.
   ========================================================================== */
function _azuWedge(kind: string): string {
  switch (kind) {
    case "lance":
      return "<path d='M50 40 L50 9'/><path d='M50 16 L45 25 M50 16 L55 25'/>";
    case "petal":
      return "<path d='M50 43 C43 32 43 18 50 9 C57 18 57 32 50 43 Z'/>";
    case "leafdot":
      return "<path d='M50 42 C45 34 45 22 50 14 C55 22 55 34 50 42 Z'/><circle cx='50' cy='7' r='2.4'/>";
    case "trefoil":
      return "<path d='M50 40 C46 33 46 25 50 20 C54 25 54 33 50 40 Z'/><circle cx='50' cy='14' r='4'/>";
    case "hook":
      return "<path d='M50 41 L50 18 C50 12 55 12 56 17'/>";
    default:
      return "<circle cx='50' cy='15' r='3'/>";
  }
}

type AzuLayer = { kind: string; w: number; accent?: boolean };
type AzuRecipe = { fold: number; layers: AzuLayer[] };

const AZU_RECIPES: AzuRecipe[] = [
  { fold: 8, layers: [{ kind: "lance", w: 1.5 }, { kind: "petal", w: 1.3, accent: true }, { kind: "dot", w: 1.2 }] },
  { fold: 8, layers: [{ kind: "petal", w: 1.5 }, { kind: "leafdot", w: 1.2, accent: true }] },
  { fold: 6, layers: [{ kind: "trefoil", w: 1.4 }, { kind: "lance", w: 1.2, accent: true }] },
  { fold: 8, layers: [{ kind: "hook", w: 1.5 }, { kind: "dot", w: 1.2, accent: true }] },
  { fold: 12, layers: [{ kind: "lance", w: 1.2 }, { kind: "dot", w: 1.1, accent: true }] },
  { fold: 6, layers: [{ kind: "petal", w: 1.5 }, { kind: "trefoil", w: 1.2, accent: true }] },
];

const AZU_CORNERS: [number, number][] = [
  [6.5, 6.5],
  [93.5, 6.5],
  [6.5, 93.5],
  [93.5, 93.5],
];

function _azuTile(r: AzuRecipe, ground: string, line: string, accent: string, withGround: boolean): string {
  let s = withGround ? `<rect x='0' y='0' width='100' height='100' fill='${ground}'/>` : "";
  s += `<rect x='2.5' y='2.5' width='95' height='95' fill='none' stroke='${line}' stroke-width='2.4'/>`;
  s += `<rect x='6.5' y='6.5' width='87' height='87' fill='none' stroke='${accent}' stroke-width='0.8'/>`;
  for (const [cx, cy] of AZU_CORNERS) {
    s += `<g fill='none' stroke='${accent}' stroke-width='1.1'><circle cx='${cx}' cy='${cy}' r='7'/><circle cx='${cx}' cy='${cy}' r='3'/></g>`;
  }
  for (const ly of r.layers) {
    const col = ly.accent ? accent : line;
    let ring = "";
    for (let k = 0; k < r.fold; k++) ring += `<g transform='rotate(${(k * 360) / r.fold} 50 50)'>${_azuWedge(ly.kind)}</g>`;
    s += `<g fill='none' stroke='${col}' stroke-width='${ly.w}' stroke-linecap='round' stroke-linejoin='round'>${ring}</g>`;
  }
  s += `<circle cx='50' cy='50' r='6.5' fill='none' stroke='${line}' stroke-width='1.4'/>`;
  s += `<circle cx='50' cy='50' r='2.4' fill='${line}'/>`;
  return s;
}

const _enc = (svg: string) => svg.replace(/#/g, "%23");

// Cobalt-on-cream band: the six recipes laid side by side, repeats along X.
const AZULEJO_BAND = `data:image/svg+xml;utf8,${_enc(
  `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='100' viewBox='0 0 600 100'>${AZU_RECIPES.map(
    (r, i) => `<g transform='translate(${i * 100} 0)'>${_azuTile(r, "#f5f2e8", "#21458f", "#21458f", true)}</g>`,
  ).join("")}</svg>`,
)}`;

// Faint light-cobalt mandala on transparent, for the navy footer body.
const AZULEJO_BACKDROP = `data:image/svg+xml;utf8,${_enc(
  `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>${_azuTile(
    AZU_RECIPES[1],
    "transparent",
    "#9db8ef",
    "#9db8ef",
    false,
  )}</svg>`,
)}`;

/** Cobalt-on-cream azulejo tile band — the ceramic "threshold" strip at the very
 *  top of the footer, between the preceding section and the navy body. In-flow;
 *  place it as the first child of the footer. */
export function AzulejoBand({ className = "" }: { className?: string }) {
  const style: CSSProperties = {
    backgroundImage: `url("${AZULEJO_BAND}")`,
    backgroundRepeat: "repeat-x",
    backgroundSize: "auto 100%",
  };
  return <div aria-hidden style={style} className={`pointer-events-none h-[78px] w-full ${className}`} />;
}

/** Faint azulejo mandala backdrop for the navy footer body. Drop into a
 *  `relative overflow-hidden` footer; keep content above with `relative z-10`.
 *  Tune with an opacity-* class (~0.07). */
export function AzulejoBackdrop({ className = "" }: { className?: string }) {
  const style: CSSProperties = {
    backgroundImage: `url("${AZULEJO_BACKDROP}")`,
    backgroundRepeat: "repeat",
    backgroundSize: "130px 130px",
  };
  return <div aria-hidden style={style} className={`pointer-events-none absolute inset-0 ${className}`} />;
}
