/** Confirmed flyer. End is midnight after October 16 in Sarasota (EDT). */
export const estheticianSale = {
  slug: "national-esthetician-day-flash-sale-sarasota-2026",
  title: "National Esthetician’s Day Flash Sale",
  startsAt: "2026-10-15T00:00:00-04:00",
  endsAt: "2026-10-17T00:00:00-04:00",
  dates: "October 15–16, 2026",
  packages: [
    { treatments: 3, savings: "$400", price: "$2,100", vip: "$1,890", elite: "$1,785", facials: "1 complimentary Signature Facial" },
    { treatments: 6, savings: "$1,000", price: "$4,000", vip: "$3,600", elite: "$3,400", facials: "2 complimentary Signature Facials" },
  ],
} as const;

/** Confirmed by the clinic. End is midnight after November 30 in Sarasota (EST). */
export const novemberSpecials = {
  startsAt: "2026-11-01T00:00:00-04:00",
  endsAt: "2026-12-01T00:00:00-05:00",
  featured: {
    name: "Hormone Optimization Exam",
    price: "$150",
    regular: "Regularly $306",
    detail: "Establishes care in our hormone program, with your personalized treatment plan and a full year of follow-up visits.",
  },
  offers: [
    { name: "Memberships", deal: "$100 off dermal filler for new and current members" },
    { name: "Skincare", deal: "Free travel-size Revision Brightening Cleanser with $299+" },
    { name: "IV Therapy", deal: "25% off IV drips" },
    { name: "Vitamin Shots", deal: "Buy 2, get 1 free" },
    { name: "RF Microneedling + CO2", deal: "Ask about November pricing" },
  ],
  terms: "Offers valid November 1–30, 2026. Hormone exam $150 (regular $306). IV discount excludes add-ons. Vitamin shot purchases valid for one year; mix and match and use on different days. Skincare gift: one per qualifying purchase, while supplies last. Treatment eligibility is determined at your consultation.",
} as const;

export function novemberSpecialsActive(now = new Date()) {
  return now.getTime() >= Date.parse(novemberSpecials.startsAt) && now.getTime() < Date.parse(novemberSpecials.endsAt);
}

export function promotionStatus(now = new Date()): "upcoming" | "active" | "ended" {
  if (now.getTime() < Date.parse(estheticianSale.startsAt)) return "upcoming";
  return now.getTime() < Date.parse(estheticianSale.endsAt) ? "active" : "ended";
}
