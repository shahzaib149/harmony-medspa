export type HomeOffer = {
  id: string; title: string; treatment: string; description: string;
  eligibility: string; terms: string; startsOn: string; endsOn: string;
  featured: boolean; approved: boolean;
};

// Publish only after Hayden approves all terms AND the offer enquiry workflow
// has been verified not to subscribe visitors to marketing automatically.
export const homeOffers: HomeOffer[] = [
  {
    id: "september-2026-facial", title: "25% off any facial + a free add-on",
    treatment: "Facial", description: "Make time for your skin. Let the Harmony team help you choose a facial for your needs.",
    eligibility: "For new and existing patients",
    terms: "Ends September 30, 2026. The included add-on, exclusions and combination rules must be confirmed before publication.",
    startsOn: "2026-09-01", endsOn: "2026-09-30", featured: true, approved: false,
  },
  {
    id: "september-2026-perfect-derma", title: "Buy two peels. Your third is on us.",
    treatment: "Perfect Derma Peel", description: "Explore a Perfect Derma Peel series with a consultation tailored to your skin.",
    eligibility: "Consultation and eligibility required",
    terms: "Purchase by September 30, 2026. Redemption dates, exclusions and combination rules must be confirmed before publication.",
    startsOn: "2026-09-01", endsOn: "2026-09-30", featured: false, approved: false,
  },
];

export function clinicDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const value = (type: string) => parts.find(part => part.type === type)?.value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function activeHomeOffers(offers = homeOffers, now = new Date()) {
  const today = clinicDate(now);
  return offers.filter(offer => offer.approved && offer.startsOn <= today && today <= offer.endsOn);
}
