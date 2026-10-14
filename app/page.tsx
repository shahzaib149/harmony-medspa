export const metadata = { title: { absolute: `Home | ${SITE_NAME}` }, alternates: { canonical: "/" }, openGraph: openGraphFor("/", { title: `${SITE_NAME} | Sarasota, FL` }) };

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
import { displayFont } from "@/lib/fonts";
import { openGraphFor } from "@/lib/seo/metadata";

export default function Home() {
  return (
    <main className={`${displayFont.variable} ${styles.home}`}>
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
