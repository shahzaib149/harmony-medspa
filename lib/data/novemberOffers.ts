// November 2026 landing-page offers: the single source of truth for every price, term and date
// on /landing/hormone-optimization and the other November pages. Values marked `confirmed: false`
// still need Hayden's sign-off; production builds list them as a warning (see the bottom of the file).

export const OFFER_START = "2026-11-01T00:00:00-04:00";
export const OFFER_END = "2026-11-30";
/** Midnight after November 30 in Sarasota (EST). */
export const OFFER_ENDS_AT = "2026-12-01T00:00:00-05:00";
export const OFFER_END_LABEL = "November 30, 2026";

export const COMPLIANCE_LINE =
  "Offers valid November 1–30, 2026. Hormone exam $150 (regular $306). IV discount excludes add-ons. Vitamin shot purchases valid for one year. Treatment eligibility is determined at your consultation. Results vary.";

export const hormoneOffer = {
  examPrice: 150,
  regularPrice: 306,
  regularPriceConfirmed: true,
  /** $150 is not exactly half of $306, so copy says "Save $156", never a percentage. */
  savings: 156,
  eligibility: "Available to new patients and existing Harmony patients starting the hormone program.",
  summary: "Establishes care in our hormone program, includes your personalized treatment plan, and covers follow-up visits for one year.",
  includes: [
    "Establishes care in our hormone program",
    "Your personalized treatment plan",
    "Follow-up visits for one year, in office and virtual",
  ],
  labsNote: "Lab work, medications, and pellet procedures are billed separately.",
  newPatientsOnly: false,
  treatmentInterest: "Hormone Optimization",
  offerCode: "HRT150",
  confirmed: true,
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
  eligibility: "New and current members, November only",
  tagline: "Join and save, or use your existing membership to treat yourself!",
  brand: "RHA® fillers",
  offerCode: "MEMBER100",
  confirmed: true,
};

export const ivOffer = {
  percentOff: 25,
  drips: [
    { name: "Immunity", regular: 147.9 },
    { name: "Athlete's Edge", regular: 168.3 },
    { name: "Radiance", regular: 188.7 },
  ],
  /** Add-ons are never discounted; show them at regular price only. */
  addOns: [{ name: "Glutathione IV push", note: "Add-on, not included in the 25% offer" }],
  terms: "25% off applies to IV drips only. Add-ons, such as a glutathione IV push, are not included.",
  offerCode: "IV25",
  confirmed: true,
};

export const shotsOffer = {
  deal: "Buy 2, get 1 free",
  shots: ["B12", "MICC", "Glutathione", "Vitamin D", "Bio-Boost"],
  terms: "Mix and match eligible vitamin shots and use them on different days. Purchases are valid for one year.",
  offerCode: "SHOTS3",
  confirmed: true,
};

export const laserOffer = {
  featured: "RF Microneedling + Fractional CO2",
  positioning: "Our highest-level combination treatment for signs of aging, wrinkles, and hyperpigmentation.",
  price: null as number | null, // TODO: November pricing not final; show no price or discount
  cta: "Ask about November pricing",
  confirmed: false,
  treatmentInterest: "RF Microneedling + CO2 Laser",
  offerCode: "RFCO2-NOV",
  source: "Laser Skin Landing Page",
  /** The CO2 3-treatment face package price shows only once the clinic confirms it for November. */
  co2PackagePrice: null as number | null,
  co2PackageConfirmed: false,
};

export const LASER_COMPLIANCE_LINE =
  "Treatment eligibility is determined at your consultation. Results vary by individual. November offers valid through November 30, 2026.";

/**
 * /landing/november-specials. Card prices and terms read from the offers above, so a later
 * Black Friday version can swap this object without layout edits.
 */
export const novemberSpecials = {
  source: "November Specials Landing Page",
  offerCode: "NOV",
  /** Site service names, used as Treatment Interest values (and by the offer finder). */
  interests: {
    hormone: "Hormone Optimization",
    filler: "Dermal Fillers",
    memberships: "Memberships",
    laser: "RF Microneedling + CO2 Laser",
    iv: "IV Therapy",
    shots: "Vitamin Shots",
    unsure: "Not sure — I’d like guidance",
  },
  links: {
    hormone: "/landing/hormone-optimization",
    memberships: "/landing/memberships",
    laser: "/landing/laser-skin",
    iv: "/iv-therapy",
  },
};

/** Real Harmony patients (filler, RHA), ordered to mix younger and older examples. Clinic confirmed consent. */
export const fillerBeforeAfters = {
  consentConfirmed: true,
  caption: "Real Harmony Med Spa patients. Results vary.",
  images: [1, 2, 3, 4, 5, 6].map((n) => `/images/before-after/filler/filler-ba-0${n}.jpg`),
};
export const skincareGift = { value: 299, confirmed: false }; // TODO: confirm details; specials hub only

export const SPECIALS_COMPLIANCE_LINE = `Offers valid November 1–30, 2026 and cannot be combined unless stated. Hormone exam $${hormoneOffer.examPrice} (regular $${hormoneOffer.regularPrice}). IV discount excludes add-ons. Vitamin shot purchases valid for one year. Treatment eligibility is determined at your consultation. Results vary.`;

/** Other before-and-after images stay hidden until written patient consent is confirmed. */
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
  ["laserOffer", laserOffer.confirmed],
  ["ivOffer", ivOffer.confirmed],
  ["shotsOffer", shotsOffer.confirmed],
  ["skincareGift", skincareGift.confirmed],
].filter(([, ok]) => !ok).map(([name]) => name);

// Launch guard: a production build lists every offer still waiting on the clinic.
if (typeof window === "undefined" && process.env.NODE_ENV === "production" && unconfirmed.length) {
  console.warn(`[november offers] Unconfirmed values: ${unconfirmed.join(", ")}`);
}
