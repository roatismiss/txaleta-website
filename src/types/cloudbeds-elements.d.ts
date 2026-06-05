// TypeScript JSX typings for the Cloudbeds Booking Engine "Immersive Experience
// 2.0" custom elements (web components). The loader script
// (static1.cloudbeds.com/.../cb-immersive-experience.js) defines these elements
// at runtime; these declarations just let us render them in JSX/TSX type-safely.
//
// `property-code` binds the engine to a specific Cloudbeds property
// (Txaleta = "4lfwvW"). React 19 augments JSX via the "react" module namespace.
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type CbImmersiveAttrs = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  "property-code"?: string;
  mode?: string;
  lang?: string;
  currency?: string;
};

type CbBookNowButtonAttrs = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  "property-code"?: string;
  label?: string;
  "class-name"?: string;
  width?: string;
  height?: string;
  lang?: string;
  currency?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "cb-immersive-experience": CbImmersiveAttrs;
      "cb-book-now-button": CbBookNowButtonAttrs;
    }
  }
}
