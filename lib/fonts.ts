import { Playfair_Display } from "next/font/google";

/** Display serif for headings on the redesigned pages (home, our team). Exposes --font-home-display. */
export const displayFont = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-home-display"
});
