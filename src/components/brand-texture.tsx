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
   Calachuchi florals — corner blossom clusters + drifting petals, ported 1:1
   from the /floral-texture-styles.html tuner ("Combo recomandat"). Woody stems
   with leaf whorls, blossom bunches and buds at the tips; petals scatter down
   the side margins with a slow CSS drift (`petal-drift` in globals.css,
   disabled under prefers-reduced-motion). Seeded PRNG → deterministic markup,
   safe for SSR. Decorative: aria-hidden + pointer-events-none.
   ========================================================================== */
function _mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// All cluster markup is string-built (rendered via dangerouslySetInnerHTML on
// the svg) so blossoms/leaves can carry scale transforms while
// non-scaling-stroke keeps every line at the same weight.
const _VE = " vector-effect='non-scaling-stroke'";

// Same five pinwheel petals as <Calachuchi/> above, 64×64 box centred (32,32).
const _CALACHUCHI_M =
  [
    "M34.2 28.2 Q41.8 18.8 38.2 10.2 A10.2 10.2 0 0 1 27 11 Q26.4 21 30.3 28.4",
    "M36.29 32.92 Q47.58 37.24 54.65 31.16 A10.2 10.2 0 0 1 50.43 20.76 Q40.73 23.27 34.9 29.27",
    "M32.45 36.37 Q31.83 48.44 39.8 53.28 A10.2 10.2 0 0 1 48.39 46.05 Q43 37.61 35.49 33.91",
    "M27.99 33.78 Q16.31 36.92 14.17 45.99 A10.2 10.2 0 0 1 23.7 51.93 Q30.06 44.19 31.26 35.91",
    "M29.07 28.73 Q22.47 18.6 13.18 19.37 A10.2 10.2 0 0 1 10.48 30.27 Q19.81 33.93 28.05 32.5",
  ]
    .map((d) => `<path d='${d}'${_VE}/>`)
    .join("") + `<circle cx='32' cy='32' r='3'${_VE}/>`;

const _blossomM = (x: number, y: number, size: number, rot: number, fillOp: number) =>
  `<g transform='translate(${_ff(x)} ${_ff(y)}) rotate(${_ff(rot)}) scale(${(size / 64).toFixed(2)}) translate(-32 -32)' fill='currentColor' fill-opacity='${fillOp}'>${_CALACHUCHI_M}</g>`;

// Plumeria leaf, points up (−y) at rotation 0; aim along angle θ° with rotate(θ+90).
function _leafM(x: number, y: number, ang: number, len: number, fillOp: number) {
  const w = len * 0.17;
  return (
    `<g transform='translate(${_ff(x)} ${_ff(y)}) rotate(${_ff(ang)})'>` +
    `<path d='M0 0 C${_ff(-w)} ${_ff(-len * 0.3)} ${_ff(-w)} ${_ff(-len * 0.72)} 0 ${_ff(-len)} C${_ff(w)} ${_ff(-len * 0.72)} ${_ff(w)} ${_ff(-len * 0.3)} 0 0 Z' fill='currentColor' fill-opacity='${fillOp}'${_VE}/>` +
    `<path d='M0 ${_ff(-len * 0.08)} L0 ${_ff(-len * 0.92)}' fill='none'${_VE}/></g>`
  );
}

function _budM(x: number, y: number, ang: number, len: number) {
  return (
    `<g transform='translate(${_ff(x)} ${_ff(y)}) rotate(${_ff(ang)})' fill='none'>` +
    `<path d='M0 0 C-1.6 ${_ff(-len * 0.4)} -1 ${_ff(-len * 0.75)} 1 ${_ff(-len)}'${_VE}/>` +
    `<path d='M0 0 C1.8 ${_ff(-len * 0.35)} 2.4 ${_ff(-len * 0.7)} 1 ${_ff(-len)}'${_VE}/>` +
    `<path d='M-0.4 ${_ff(-len * 0.3)} Q1 ${_ff(-len * 0.42)} 1.6 ${_ff(-len * 0.58)}'${_VE}/></g>`
  );
}

// Three woody stems fanning out of the corner; leaf whorl behind each tip,
// blossom bunch covering it, two buds poking outward. TL orientation —
// flipped per corner like PalmCorner. RNG call order matches the tuner, so a
// given seed reproduces the previewed cluster exactly.
function _clusterMarkup(S: number, seed: number, density: number, fillOp: number) {
  const rnd = _mulberry32(seed);
  const R = (a: number, b: number) => a + (b - a) * rnd();
  let stems = "",
    leaves = "",
    buds = "",
    blooms = "";
  const baseAngles = [16, 40, 64];
  for (let i = 0; i < 3; i++) {
    const angDeg = baseAngles[i] + R(-7, 7);
    const a = (angDeg * Math.PI) / 180;
    const L = S * R(0.34, 0.5) * (i === 1 ? 1.2 : 1);
    const p0 = { x: 6, y: 6 };
    const dir = { x: Math.cos(a), y: Math.sin(a) };
    const nrm = { x: -dir.y, y: dir.x };
    const bow = L * R(-0.12, 0.12);
    const c1 = { x: p0.x + dir.x * L * 0.33 + nrm.x * bow * 0.6, y: p0.y + dir.y * L * 0.33 + nrm.y * bow * 0.6 };
    const c2 = { x: p0.x + dir.x * L * 0.66 + nrm.x * bow, y: p0.y + dir.y * L * 0.66 + nrm.y * bow };
    const tip = { x: p0.x + dir.x * L + nrm.x * bow * 0.7, y: p0.y + dir.y * L + nrm.y * bow * 0.7 };
    stems += `M${_ff(p0.x)} ${_ff(p0.y)} C${_ff(c1.x)} ${_ff(c1.y)} ${_ff(c2.x)} ${_ff(c2.y)} ${_ff(tip.x)} ${_ff(tip.y)}`;
    const nLeaf = Math.round(R(3, 5) * density);
    for (let k = 0; k < nLeaf; k++) {
      const pt = _bez(p0, c1, c2, tip, R(0.6, 0.86));
      leaves += _leafM(pt.x, pt.y, angDeg + 90 + R(-70, 70), S * R(0.15, 0.23), fillOp);
    }
    const nB = Math.round(R(3, 4.4) * density);
    for (let k = 0; k < nB; k++) {
      const rr = S * 0.05 * R(0.2, 1.5);
      const aa = R(0, Math.PI * 2);
      blooms += _blossomM(tip.x + Math.cos(aa) * rr, tip.y + Math.sin(aa) * rr, S * R(0.13, 0.2), R(0, 360), fillOp);
    }
    for (let k = 0; k < 2; k++) {
      buds += _budM(tip.x + R(-5, 5), tip.y + R(-5, 5), angDeg + 90 + R(-35, 35), S * R(0.07, 0.1));
    }
  }
  return `<g fill='none'><path d='${stems}'${_VE}/></g>${leaves}${buds}${blooms}`;
}

/** Calachuchi (plumeria) blossom-cluster corner accent — the floral answer to
 *  PalmCorner; pair it on the corners the palms don't occupy. Set colour with
 *  a text-* class and intensity with opacity-*. Seeds 20 (tr) / 33 (bl) match
 *  the approved tuner preview. e.g.
 *    <CalachuchiCorner corner="tr" seed={20} className="text-brand opacity-[0.2]" /> */
export function CalachuchiCorner({
  corner = "tr",
  size = 320,
  density = 1,
  fillOpacity = 0.05,
  seed = 20,
  className = "",
}: {
  corner?: Corner;
  size?: number;
  density?: number;
  fillOpacity?: number;
  seed?: number;
  className?: string;
}) {
  return (
    <span aria-hidden className={`pointer-events-none absolute ${CORNER_POS[corner]} ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: CORNER_FLIP[corner], overflow: "visible" }}
        dangerouslySetInnerHTML={{ __html: _clusterMarkup(size, seed, density, fillOpacity) }}
      />
    </span>
  );
}

/** Fallen calachuchi petals drifting down both side margins of a section.
 *  Drop into a `relative overflow-hidden` section (content above with
 *  `relative z-10`); set colour with text-blush and intensity with opacity-*.
 *  Petals float on a slow alternate loop (disabled for reduced motion). */
export function DriftingPetals({
  count = 22,
  seed = 108,
  fillOpacity = 0.06,
  animate = true,
  className = "",
}: {
  count?: number;
  seed?: number;
  fillOpacity?: number;
  animate?: boolean;
  className?: string;
}) {
  const rnd = _mulberry32(seed);
  const petals = Array.from({ length: count }, () => {
    const left = rnd() < 0.5;
    return {
      x: left ? 1 + rnd() * 12 : 87 + rnd() * 12,
      y: 4 + rnd() * 92,
      rot: rnd() * 360,
      size: 15 + rnd() * 12,
      dur: 5 + rnd() * 5,
      delay: -(rnd() * 8),
    };
  });
  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {petals.map((p, i) => (
        <span
          key={i}
          className={`absolute ${animate ? "petal-drift" : ""}`}
          style={{
            left: `${p.x.toFixed(1)}%`,
            top: `${p.y.toFixed(1)}%`,
            animationDuration: `${p.dur.toFixed(2)}s`,
            animationDelay: `${p.delay.toFixed(2)}s`,
          }}
        >
          <svg
            viewBox="-8 -22.5 13 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              width: p.size * 0.56,
              height: p.size,
              transform: `rotate(${p.rot.toFixed(0)}deg)`,
            }}
          >
            <path
              d="M0 0 C-5 -6 -6.5 -15 -1.5 -21 C2.5 -15.5 3.5 -6.5 0 0 Z"
              fill="currentColor"
              fillOpacity={fillOpacity}
              vectorEffect="non-scaling-stroke"
            />
            <path d="M-0.6 -3.5 Q-1.8 -10.5 -1.2 -17.5" vectorEffect="non-scaling-stroke" />
          </svg>
        </span>
      ))}
    </span>
  );
}

/* ==========================================================================
   Banana grove — lush banana/heliconia foliage, ported from the
   /banana-foliage-styles.html tuner ("Margini laterale" / "Colțuri jos").
   Each plant: a leaning pseudostem (two converging lines + inner sheath) with
   a crown of 4–6 broad leaves — curved midrib, blade edges on a sine width
   profile, parallel veins slanted toward the tip, and the signature wind-torn
   notches where the blade splits between veins. Anchored to a bottom corner
   like PalmCorner; leaves spill past the svg box (overflow visible) and the
   section's overflow-hidden crops the outer edge. Decorative.
   ========================================================================== */
function _bananaLeafM(len: number, droop: number, tear: number, fillOp: number, rnd: () => number) {
  const p0 = { x: 0, y: 0 };
  const p1 = { x: len * 0.04, y: -len * 0.42 };
  const p2 = { x: len * 0.26, y: -len * 0.85 };
  const p3 = { x: len * (0.45 + 0.3 * droop), y: -len * (1.02 - 0.42 * droop) };
  const N = 16;
  const pts: Pt[] = [], nrms: Pt[] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const T = _bezT(p0, p1, p2, p3, t);
    pts.push(_bez(p0, p1, p2, p3, t));
    nrms.push({ x: -T.y, y: T.x });
  }
  const wMax = len * 0.17;
  const prof = (t: number) => Math.pow(Math.sin(Math.PI * Math.min(1, 0.06 + 0.92 * t)), 0.65);
  const tearsL = new Set<number>(), tearsR = new Set<number>();
  const nT = Math.round(tear * 3.5);
  for (let k = 0; k < nT; k++) {
    tearsL.add(3 + Math.floor(rnd() * (N - 5)));
    tearsR.add(3 + Math.floor(rnd() * (N - 5)));
  }
  const edgePts = (side: number) => {
    const tearSet = side > 0 ? tearsL : tearsR;
    const arr: Pt[] = [];
    for (let i = 0; i <= N; i++) {
      let w = wMax * prof(i / N);
      if (tearSet.has(i)) w *= 0.12;
      arr.push({ x: pts[i].x + nrms[i].x * w * side, y: pts[i].y + nrms[i].y * w * side });
    }
    return arr;
  };
  const eL = edgePts(1), eR = edgePts(-1);
  const poly = (a: Pt[]) => a.map((p, i) => (i ? "L" : "M") + _ff(p.x) + " " + _ff(p.y)).join("");
  let out = "";
  if (fillOp > 0) {
    out += `<path d='${poly(eL)} L${[...eR].reverse().map((p) => _ff(p.x) + " " + _ff(p.y)).join(" L")} Z' fill='currentColor' fill-opacity='${fillOp}' stroke='none'/>`;
  }
  out += `<path d='M${_ff(p0.x)} ${_ff(p0.y)} C${_ff(p1.x)} ${_ff(p1.y)} ${_ff(p2.x)} ${_ff(p2.y)} ${_ff(p3.x)} ${_ff(p3.y)}'${_VE}/>`;
  out += `<path d='${poly(eL)}'${_VE}/><path d='${poly(eR)}'${_VE}/>`;
  if (fillOp < 0.95) {
    // veins are invisible against a solid blade — only draw them in line mode
    let veins = "";
    for (let i = 2; i < N - 1; i++) {
      if (rnd() < 0.25) continue;
      const j = Math.min(N, i + 1); // slant toward the tip, like real banana venation
      veins += `M${_ff(pts[i].x)} ${_ff(pts[i].y)} L${_ff(eL[j].x)} ${_ff(eL[j].y)}`;
      veins += `M${_ff(pts[i].x)} ${_ff(pts[i].y)} L${_ff(eR[j].x)} ${_ff(eR[j].y)}`;
    }
    out += `<path d='${veins}' stroke-opacity='0.5'${_VE}/>`;
  }
  return out;
}

// rot in deg (0 = vertical, positive leans right); mirror flips the arc to −x
function _bananaLeafAt(x: number, y: number, rot: number, len: number, mirror: boolean, droop: number, tear: number, fillOp: number, rnd: () => number) {
  return `<g transform='translate(${_ff(x)} ${_ff(y)}) rotate(${_ff(rot)})${mirror ? " scale(-1 1)" : ""}'>${_bananaLeafM(len, droop, tear, fillOp, rnd)}</g>`;
}

// One plant rooted at (0,0), growing up. fillOp >= 0.95 renders as a solid
// silhouette: blades fully filled (veins skipped), stem a closed filled shape.
function _bananaPlantM(h: number, seed: number, droop: number, tear: number, fillOp: number) {
  const rnd = _mulberry32(seed);
  const R = (a: number, b: number) => a + (b - a) * rnd();
  const lean = R(-0.09, 0.09);
  const topX = lean * h, topY = -h * 0.96;
  const sw = Math.max(2.5, h * 0.04);
  let out = "";
  if (fillOp >= 0.95) {
    out += `<path d='M${_ff(-sw)} 0 C${_ff(-sw * 0.8)} ${_ff(-h * 0.4)} ${_ff(topX - sw * 0.45)} ${_ff(-h * 0.72)} ${_ff(topX - sw * 0.3)} ${_ff(topY)} L${_ff(topX + sw * 0.3)} ${_ff(topY)} C${_ff(topX + sw * 0.45)} ${_ff(-h * 0.72)} ${_ff(sw * 0.8)} ${_ff(-h * 0.4)} ${_ff(sw)} 0 Z' fill='currentColor'${_VE}/>`;
  } else {
    out += `<path d='M${_ff(-sw)} 0 C${_ff(-sw * 0.8)} ${_ff(-h * 0.4)} ${_ff(topX - sw * 0.45)} ${_ff(-h * 0.72)} ${_ff(topX - sw * 0.3)} ${_ff(topY)}'${_VE}/>`;
    out += `<path d='M${_ff(sw)} 0 C${_ff(sw * 0.8)} ${_ff(-h * 0.4)} ${_ff(topX + sw * 0.45)} ${_ff(-h * 0.72)} ${_ff(topX + sw * 0.3)} ${_ff(topY)}'${_VE}/>`;
    out += `<path d='M${_ff(-sw * 0.25)} ${_ff(-h * 0.08)} C${_ff(-sw * 0.15)} ${_ff(-h * 0.4)} ${_ff(topX * 0.8)} ${_ff(-h * 0.58)} ${_ff(topX)} ${_ff(-h * 0.82)}' stroke-opacity='0.45'${_VE}/>`;
  }
  const slots = [-80, -48, -16, 14, 46, 78];
  const nL = 4 + Math.floor(rnd() * 3);
  const start = Math.floor(rnd() * 2);
  for (let k = 0; k < nL; k++) {
    const a = slots[(start + k) % slots.length] + R(-8, 8);
    const mag = Math.abs(a);
    const len = h * (0.74 - 0.36 * (mag / 80)) * R(0.85, 1.15);
    const d = Math.min(1, droop * R(0.7, 1.3) * (0.35 + 0.65 * (mag / 80)));
    out += _bananaLeafAt(topX, topY + h * 0.03, a, len, a < 0, d, tear, fillOp, rnd);
  }
  return out;
}

// Cluster of plants rooted along the bottom of a w×h box, tallest near x=0
// (the outer edge once the box is corner-anchored). depth adds a fainter,
// shorter back row at 45% opacity — the "thicket" feel from the photo.
function _bananaGroveM(w: number, h: number, plants: number, seed: number, droop: number, tear: number, fillOp: number, depth: boolean) {
  const rnd = _mulberry32(seed);
  const R = (a: number, b: number) => a + (b - a) * rnd();
  const seeds = () => 1 + Math.floor(rnd() * 999999);
  let back = "", front = "";
  for (let i = 0; i < plants; i++) {
    const x = R(8, w * 0.6);
    front += `<g transform='translate(${_ff(x)} ${_ff(h + 4)})'>${_bananaPlantM(h * R(0.5, 0.95), seeds(), droop, tear, fillOp)}</g>`;
    if (depth) {
      back += `<g transform='translate(${_ff(x + R(-30, 30))} ${_ff(h + 4)})'>${_bananaPlantM(h * R(0.32, 0.6), seeds(), droop, tear, fillOp)}</g>`;
    }
  }
  return back ? `<g opacity='0.45'>${back}</g>${front}` : front;
}

/** Banana-foliage corner grove — tall pseudostems with broad, wind-torn
 *  leaves, anchored to a bottom corner of a `relative overflow-hidden`
 *  section (content above with `relative z10`). Set colour with a text-*
 *  class (text-sea reads most like foliage) and intensity with opacity-*.
 *  `size` is the plant-box height; bump it for full-margin "jungle" strips,
 *  keep it low for discreet corner clumps. fillOpacity={1} switches to solid
 *  silhouettes — pair with text-ink so the grove reads as sprouting out of an
 *  adjacent bg-ink section. */
export function BananaGrove({
  corner = "bl",
  width = 300,
  size = 720,
  plants = 4,
  seed = 11,
  droop = 0.55,
  tear = 0.45,
  fillOpacity = 0.07,
  depth = true,
  className = "",
}: {
  corner?: Corner;
  width?: number;
  size?: number;
  plants?: number;
  seed?: number;
  droop?: number;
  tear?: number;
  fillOpacity?: number;
  depth?: boolean;
  className?: string;
}) {
  return (
    <span aria-hidden className={`pointer-events-none absolute ${CORNER_POS[corner]} ${className}`}>
      <svg
        width={width}
        height={size}
        viewBox={`0 0 ${width} ${size}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: corner === "br" || corner === "tr" ? "scaleX(-1)" : "none",
          overflow: "visible",
        }}
        dangerouslySetInnerHTML={{
          __html: _bananaGroveM(width, size, plants, seed, droop, tear, fillOpacity, depth),
        }}
      />
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
