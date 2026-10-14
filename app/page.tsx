export const metadata = { title: { absolute: `Home | ${SITE_NAME}` }, alternates: { canonical: "/" }, openGraph: openGraphFor("/", { title: `${SITE_NAME} | Sarasota, FL` }) };

import { Playfair_Display } from "next/font/google";
import HomeHero from "@/components/home/HomeHero";
import HomeOffers, { HomeOfferBand } from "@/components/home/HomeOffers";
import {
  HomeAbout,
  HomeContact,
  HomeCta,
  HomePricing,
  HomeResults,
  HomeReviews,
  HomeServices,
  HomeTeam,
  HomeWhy
} from "@/components/home/HomeSections";
import styles from "@/components/home/Home.module.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { SITE_NAME } from "@/lib/constants";
import { openGraphFor } from "@/lib/seo/metadata";

// Display serif for the home page headings.
const display = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-home-display"
});

export default function Home() {
  return (
    <main className={`${display.variable} ${styles.home}`}>
      <SiteHeader className="site-header" homeHref="#home" />

      <HomeHero />
      <HomeOfferBand />
      <HomeAbout />
      <HomeServices />
      <HomeResults />
      <HomeWhy />
      <HomePricing />
      <HomeOffers />
      <HomeTeam />
      <HomeReviews />
      <HomeCta />

      <HomeContact />

      <SiteFooter />
    </main>
  );
}
