import HomeOffers, { HomeOfferBand } from "@/components/home/HomeOffers";
import { homeOffers } from "@/lib/home-offers";
import { notFound } from "next/navigation";
export const metadata = { title: "Offer Test Fixture", robots: { index: false, follow: false } };
export default function Fixture() {
  if (process.env.NODE_ENV !== "development") notFound();
  const catalog = homeOffers.map(offer => ({ ...offer, approved: true, startsOn: "2020-01-01", endsOn: "2099-12-31" }));
  return <main><p role="note">Development test fixture — simulated approval and dates. Not a live promotion.</p><HomeOfferBand catalog={catalog} /><HomeOffers catalog={catalog} /></main>;
}
