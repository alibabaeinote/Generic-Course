import { Vazirmatn, Bricolage_Grotesque, Space_Grotesk, Space_Mono } from "next/font/google";

/**
 * next/font self-hosts these at build time (no runtime request to Google, no layout shift).
 * Kalameh (style-guide.md's stated choice) isn't available as actual font files yet — this
 * matches what prototype/*.html already ships today. Swap in Kalameh here once the files exist;
 * nothing else needs to change since every component reads the --fa/--lat/--num/--mono vars.
 */
export const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--fa",
  display: "swap",
});

export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--lat",
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "500"],
  variable: "--num",
  display: "swap",
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--mono",
  display: "swap",
});
