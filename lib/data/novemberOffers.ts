// November 2026 landing-page offers: the single source of truth for every price, term and date
// on /landing/hormone-optimization and the other November pages. Values marked `confirmed: false`
// still need Hayden's sign-off; production builds list them as a warning (see the bottom of the file).

export const OFFER_START = "2026-11-01T00:00:00-04:00";
export const OFFER_END = "2026-11-30";
/** Midnight after November 30 in Sarasota (EST). */
export const OFFER_ENDS_AT = "2026-12-01T00:00:00-05:00";
export const OFFER_END_LABEL = "November 30, 2026";

export const COMPLIANCE_LINE =
  "Treatment eligibility is determined at your consultation. Results vary by individual. Offers valid through November 30, 2026 and cannot be combined unless stated.";

export const hormoneOffer = {
  examPrice: 150,
  // Hayden's brief says regularly $300; the website price menu shows $306.
  regularPrice: 300, // TODO: confirm with Hayden
  regularPriceConfirmed: false,
  includes: [
    "Comprehensive hormone consultation and evaluation",
    "Physical exam by our Nurse Practitioner",
    "Personalized treatment plan built around your symptoms and goals",
    "12 months of follow-up visits, in office and virtual",
  ],
  labsNote: "Lab work, medications, and pellet procedures are billed separately.",
  newPatientsOnly: null as boolean | null, // TODO: confirm with Hayden
  treatmentInterest: "Hormone Optimization",
  offerCode: "HRT150",
  confirmed: false,
};

export const memberships = [
  { name: "Facial Membership", monthly: 149, semiAnnual: 700, annual: 1400 },
  { name: "Glo2Facial Membership", monthly: 199, semiAnnual: 1000, annual: 2000 },
  { name: "VIP Beauty Bank", monthly: 159 },
  { name: "VIP Elite Beauty Bank", monthly: 259 },
  { name: "VIP Ultimate Beauty Bank", monthly: 349 }, // TODO: confirm (from Hayden's brief, not on website)
];

export const fillerOffer = {
  discount: 100,
  eligibility: "New members who join in November", // TODO: confirm with Hayden: current members too?
  offerCode: "MEMBER100",
  confirmed: false,
};

export const ivOffer = {
  percentOff: 25,
  drips: [
    { name: "Immunity", regular: 147.9 },
    { name: "Athlete's Edge", regular: 168.3 },
    { name: "Radiance", regular: 188.7 },
  ],
  addOns: ["Glutathione"], // TODO: confirm the add-on is included in 25% off
  offerCode: "IV25",
  confirmed: false,
};

export const shotsOffer = {
  deal: "Buy 2, get 1 free",
  shots: ["B12", "MICC", "Glutathione", "Vitamin D", "Bio-Boost"],
  terms: null as string | null, // TODO: confirm mix-and-match / different days
  offerCode: "SHOTS3",
  confirmed: false,
};

export const laserOffer = null; // TODO: Hayden to choose a device/laser offer (may stay null)
export const skincareGift = { value: 299, confirmed: false }; // TODO: confirm details; specials hub only

/** Before-and-after images stay hidden until written patient consent is confirmed. */
export const beforeAfterConsentConfirmed = false;

/** Sale price rounded to cents, never typed by hand. */
export function salePrice(regular: number, percentOff: number) {
  return Math.round(regular * (100 - percentOff)) / 100;
}

export function formatPrice(value: number) {
  return Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;
}

export function offerActive(now = new Date()) {
  return now.getTime() >= Date.parse(OFFER_START) && now.getTime() < Date.parse(OFFER_ENDS_AT);
}

const unconfirmed = [
  ["hormoneOffer", hormoneOffer.confirmed],
  ["hormoneOffer.regularPrice", hormoneOffer.regularPriceConfirmed],
  ["fillerOffer", fillerOffer.confirmed],
  ["ivOffer", ivOffer.confirmed],
  ["shotsOffer", shotsOffer.confirmed],
  ["skincareGift", skincareGift.confirmed],
].filter(([, ok]) => !ok).map(([name]) => name);

// Launch guard: a production build lists every offer still waiting on the clinic.
if (typeof window === "undefined" && process.env.NODE_ENV === "production" && unconfirmed.length) {
  console.warn(`[november offers] Unconfirmed values: ${unconfirmed.join(", ")}`);
}
