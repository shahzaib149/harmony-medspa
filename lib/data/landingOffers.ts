// Single source for the offers and consultation pricing shown on paid landing pages.
// Regulated advertising: plain offer text only. No outcome claims, weight or timeframe
// figures, or prescription drug names.

// Consultation offer and price come from the environment so they can be changed in Vercel
// without a code change (the page is static, so the change goes live on the next deploy).
// Until the clinic confirms them, the fallback commits to nothing: no offer, no price.
const CONSULTATION_OFFER_FALLBACK = "Speak with a provider about your options";

const configuredOffer = process.env.CONSULTATION_OFFER?.trim() ?? "";
export const HAS_CONSULTATION_OFFER = configuredOffer !== "";
export const CONSULTATION_OFFER = configuredOffer || CONSULTATION_OFFER_FALLBACK;
export const CONSULTATION_PRICE = process.env.CONSULTATION_PRICE?.trim() ?? "";

export const consultationPriceLabel = CONSULTATION_PRICE ? `Initial consultation: ${CONSULTATION_PRICE}` : "";

export const consultationPricingAnswer = [
  consultationPriceLabel
    ? `${consultationPriceLabel}.`
    : "The team will confirm consultation pricing when you call or request a consultation.",
  "The cost of any ongoing care depends on the options included in your individualized plan. The team will explain applicable pricing before you commit to treatment.",
].join(" ");

// Monthly specials. Offers must be updated at the start of each month: replace the
// heading, the cards and the end date below, then set OFFERS_ACTIVE to true.
// While OFFERS_ACTIVE is false the specials section is not rendered at all, so an
// expired month never shows on this regulated page.
export const OFFERS_ACTIVE = false;

type Special = { title: string; detail?: string };

// September 2026 offers (expired September 30, 2026). Replace with the current month's.
export const MONTHLY_SPECIALS: { heading: string; validThrough: string; offers: Special[] } = {
  heading: "September specials at Harmony",
  validThrough: "All offers available through September 30.",
  offers: [
    { title: "25% off any facial", detail: "Plus a complimentary enhancement: Dermaplane, Microdermabrasion, or Hydrofacial." },
    { title: "Complimentary IPL Photofacial", detail: "When you join a new Facial or Glo2Facial Membership." },
    { title: "Buy 2 Perfect Derma Chemical Peels", detail: "Receive your 3rd complimentary." },
    { title: "30% off Vitamin D injections" },
  ],
};
