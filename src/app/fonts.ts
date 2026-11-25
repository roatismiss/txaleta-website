import { Playfair_Display, Lato } from "next/font/google";

// Brand typography (txaleta_branding.pdf — Visual Identity):
//   Playfair Display — elegant heritage serif for titles/headers
//   Lato            — clean modern sans for body + digital UI
// Playfair Display is a variable font (400–900); Lato ships fixed weights.
// Shared by the [lang] root layout and global-not-found, which has no layout.
export const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const sans = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});
