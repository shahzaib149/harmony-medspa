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
  title: "November Specials at Harmony",
  startsAt: "2026-11-01T00:00:00-04:00",
  endsAt: "2026-12-01T00:00:00-05:00",
  dates: "November 1–30, 2026",
  offers: [
    { name: "Hormone Optimization Exam", deal: "50% off, now $150 (regularly $300)", detail: "Includes a physical exam by our Nurse Practitioner, a personalized treatment plan, and 12 months of in-office and virtual follow-up visits. Labs, medications, and procedures are additional." },
    { name: "New Membership", deal: "$100 off an eligible dermal filler treatment", detail: "When you enroll in a qualifying new membership." },
    { name: "Skincare Gift", deal: "Free travel-size Revision Brightening Cleanser", detail: "With a $299+ skincare purchase. One gift per qualifying purchase, while supplies last." },
    { name: "IV Therapy", deal: "25% off", detail: "Eligible IV treatments." },
    { name: "Vitamin Injections", deal: "Buy 2, get 1 free", detail: "B12, MICC, Glutathione, Vitamin D, and Bio-Boost. Selection and timing are subject to provider approval." },
  ],
  terms: "Offers valid through November 30, 2026. Treatment eligibility is determined by the provider.",
} as const;

export function novemberSpecialsActive(now = new Date()) {
  return now.getTime() >= Date.parse(novemberSpecials.startsAt) && now.getTime() < Date.parse(novemberSpecials.endsAt);
}

export function promotionStatus(now = new Date()): "upcoming" | "active" | "ended" {
  if (now.getTime() < Date.parse(estheticianSale.startsAt)) return "upcoming";
  return now.getTime() < Date.parse(estheticianSale.endsAt) ? "active" : "ended";
}
