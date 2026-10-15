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

export function promotionStatus(now = new Date()): "upcoming" | "active" | "ended" {
  if (now.getTime() < Date.parse(estheticianSale.startsAt)) return "upcoming";
  return now.getTime() < Date.parse(estheticianSale.endsAt) ? "active" : "ended";
}
