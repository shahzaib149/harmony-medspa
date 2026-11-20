/**
 * Black Friday 2026: the single source of truth for /black-friday, the gift card bonus,
 * the promotion popup and the Black Friday lead form.
 *
 * Prices here come from the staff menu only. Do not copy them into lib/data/pricing.ts
 * (that feeds the pricing schema, the service pages and /membership).
 *
 * When Hayden's images and links arrive, only this file changes:
 * - `images.<slot>.src`: a /public path (e.g. "/images/black-friday/daxxify.jpg") or an allowed remote URL
 * - `offers[].purchaseUrl`: the approved online checkout link for that offer
 * - `membershipUrl`: the membership enrollment link
 */

export type BlackFridayPhase = "pre" | "early" | "public" | "ended";

/** Boundaries in America/New_York (UTC−5 after Nov 1). Ends are exclusive. */
export const BF_PHASE_BOUNDARIES = {
  early: "2026-11-23T00:00:00-05:00",
  public: "2026-11-27T00:00:00-05:00",
  ended: "2026-12-01T00:00:00-05:00",
} as const;

export const BF_OFFER_CODE = "BF2026";
export const BF_SOURCE = "Black Friday Landing Page";
export const BF_FORM_ID = "request";
export const GIFT_CARD_BONUS_RATE = 0.1;
export const GIFT_CARD_BONUS_MINIMUM = 100;

/** Membership enrollment link. Falls back to the membership page until Hayden sends the enrollment URL. */
export const membershipUrl: string = "/membership";

export type ImageSlot = { src: string | null; alt: string; label: string };
export type ImageSlotId =
  | "hero" | "daxxify" | "rha" | "sculptra" | "glo2facial" | "signatureFacial" | "secretPro" | "skincare" | "giftCard" | "provider";

/** null = render the designed Noir placeholder. Swapping in a real image is a data-only change. */
export const images: Record<ImageSlotId, ImageSlot> = {
  hero: { src: null, alt: "Harmony Med Spa Black Friday Beauty Event", label: "Black Friday Beauty Event" },
  daxxify: { src: null, alt: "Daxxify", label: "Daxxify" },
  rha: { src: null, alt: "RHA Collection fillers", label: "RHA Fillers" },
  sculptra: { src: null, alt: "Sculptra", label: "Sculptra" },
  glo2facial: { src: null, alt: "Glo2Facial", label: "Glo2Facial" },
  signatureFacial: { src: null, alt: "Signature Facial at Harmony Med Spa", label: "Signature Facial" },
  secretPro: { src: null, alt: "Secret PRO RF microneedling and CO2", label: "Secret PRO" },
  skincare: { src: null, alt: "Selected medical-grade skincare", label: "Skincare" },
  giftCard: { src: null, alt: "Harmony Med Spa gift card", label: "Gift Cards" },
  provider: { src: null, alt: "Harmony Med Spa provider", label: "Harmony Med Spa" },
};

export type OfferCategory = "Injectables" | "Facials" | "Devices" | "Skincare" | "Gift Cards" | "Wellness";

export type Offer = {
  id: string;
  category: OfferCategory;
  name: string;
  /** Whole-dollar or exact amount; null when the price is a percentage or a gift. */
  nonmember: number | null;
  member: number | null;
  /** Display text when the offer is not a dollar amount (e.g. "20% off"). */
  nonmemberLabel?: string;
  memberLabel?: string;
  terms: string;
  /** Treatment chip pre-selected on the lead form by "Request This Offer". */
  interest: string;
  /** Approved online checkout link. null = "Request This Offer" + "Call to Purchase". */
  purchaseUrl: string | null;
};

export const offers: Offer[] = [
  { id: "daxxify", category: "Injectables", name: "Daxxify: Buy 100 Units, Get 40 Free", nonmember: 1200, member: 1080, interest: "Daxxify", purchaseUrl: null,
    terms: "140 prepaid units total; use over multiple visits within 365 days. 1 bundle per patient unless provider approves more; dosing by provider." },
  { id: "rha", category: "Injectables", name: "RHA Fillers: Buy 1 Syringe, 2nd 50% Off", nonmember: 1071, member: 963.9, interest: "RHA Fillers", purchaseUrl: null,
    terms: "RHA 2, 3, 4 and Redensity; mix and match. 50% off lower-priced syringe; prices shown assume two $714 syringes. Multiple pairs with approval; 365 days. Members' 10% injectable discount is applied before the Black Friday offer." },
  { id: "sculptra-2", category: "Injectables", name: "Sculptra: 2 Vials, $250 Off", nonmember: 1382, member: 1218.8, interest: "Sculptra", purchaseUrl: null,
    terms: "Member 10% applied first, then $250 off. Use over multiple visits; provider approval; 365 days." },
  { id: "sculptra-4", category: "Injectables", name: "Sculptra: 4 Vials, $600 Off", nonmember: 2664, member: 2337.6, interest: "Sculptra", purchaseUrl: null,
    terms: "Member 10% first, then $600 off. Priced from two $1,632 2-vial packages; provider approval; 365 days." },
  { id: "sculptra-6", category: "Injectables", name: "Sculptra: 6 Vials, $1,000 Off", nonmember: 3896, member: 3406.4, interest: "Sculptra", purchaseUrl: null,
    terms: "Member 10% first, then $1,000 off. Priced from three $1,632 2-vial packages; provider approval; 365 days." },
  { id: "glo2facial", category: "Facials", name: "Glo2Facial: 4 Treatments", nonmember: 499, member: 499, interest: "Glo2Facial", purchaseUrl: null,
    terms: "One 4-pack per patient. Full prepayment; 365-day redemption; no further discounts." },
  { id: "signature-facial", category: "Facials", name: "Signature Facial: 4 Treatments + Enhancements", nonmember: 399, member: 399, interest: "Signature Facial", purchaseUrl: null,
    terms: "One free enhancement per visit: Diamond Microdermabrasion, Hydrofacial or Dermaplaning (up to $100 added value). One 4-pack per patient; 365 days." },
  { id: "devices", category: "Devices", name: "RF Microneedling, Fractional CO2, IPL & Laser Hair Removal Packages", nonmember: null, member: null, nonmemberLabel: "20% off", memberLabel: "30% off", interest: "RF Microneedling / CO2", purchaseUrl: null,
    terms: "Eligible 3+ session packages; same treatment, except existing RF+CO2 combos. Multiple purchases with provider approval." },
  { id: "skincare", category: "Skincare", name: "Selected Skincare Products", nonmember: null, member: null, nonmemberLabel: "25% off", memberLabel: "25% off", interest: "Skincare", purchaseUrl: null,
    terms: "Only individually approved products qualify. Replaces members' normal 10% skincare discount; no stacking." },
  { id: "skincare-gift", category: "Skincare", name: "Free Gift With $399+ Skincare Spend", nonmember: null, member: null, nonmemberLabel: "1 gift", memberLabel: "1 gift", interest: "Skincare", purchaseUrl: null,
    terms: "Spend $399 after discount, before tax. One gift from approved options (including Revision Brightening Facial Wash travel size), while supplies last." },
  { id: "gift-card-bonus", category: "Gift Cards", name: "Buy a $100+ Gift Card, Get 10% Back", nonmember: null, member: null, nonmemberLabel: "10% bonus", memberLabel: "10% bonus", interest: "Gift Cards", purchaseUrl: null,
    terms: "Nov 27–30 only. New-money purchases; no cap. Separate bonus to purchaser, usable Dec 1 on regular-price services/skincare only; expires after 365 days. Purchased gift cards never expire." },
  { id: "bhrt-exam", category: "Wellness", name: "Hormone Optimization: BHRT Initial Examination", nonmember: 150, member: 150, interest: "Hormone Optimization", purchaseUrl: null,
    terms: "Enroll and prepay by Nov 30; prepaid exam has no expiration. Includes NP exam, plan and 1 year of follow-ups from exam. Labs/therapy separate." },
];

export function offerById(id: string): Offer {
  const offer = offers.find((item) => item.id === id);
  if (!offer) throw new Error(`Unknown Black Friday offer: ${id}`);
  return offer;
}

/** Members save = nonmember − member, rounded to cents. Computed, never hard-coded. */
export function memberSavings(offer: Offer): number {
  if (offer.nonmember === null || offer.member === null) return 0;
  return Math.round((offer.nonmember - offer.member) * 100) / 100;
}

export function formatUsd(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export const signatureEnhancements = ["Diamond Microdermabrasion", "Hydrofacial", "Dermaplaning"] as const;

/** Lead form treatment chips, in display order. */
export const treatmentChips = [
  "Daxxify", "RHA Fillers", "Sculptra", "Glo2Facial", "Signature Facial", "RF Microneedling / CO2", "IPL",
  "Laser Hair Removal", "Skincare", "Gift Cards", "Hormone Optimization",
] as const;
export type TreatmentChip = (typeof treatmentChips)[number];

export const memberStatusOptions = ["Yes", "Not yet", "Interested in joining"] as const;

export type DeviceRow = { area: string; nonmember: number; member: number };
export type DeviceGroup = { id: string; label: string; sessions: number; interest: TreatmentChip; rows: DeviceRow[] };

const row = (area: string, nonmember: number, member: number): DeviceRow => ({ area, nonmember, member });

/** Package totals, nonmember / member (page 2 of the staff menu). */
export const deviceGroups: DeviceGroup[] = [
  { id: "secret-pro", label: "Secret PRO / RF + CO2", sessions: 3, interest: "RF Microneedling / CO2", rows: [
    row("FCO2 Decolletage", 640, 560), row("RFMN Decolletage", 800, 700), row("FCO2 Neck", 734.4, 642.6),
    row("RFMN Neck", 979.2, 856.8), row("RFMN+FCO2 Neck", 1224, 1071), row("FCO2 Face/Neck", 1876.8, 1642.2),
    row("FCO2 Face", 1468.8, 1285.2), row("FCO2 Hands", 652.8, 571.2), row("RFMN+FCO2 Face/Neck", 3182.4, 2784.6),
    row("RFMN+FCO2 Face", 2774.4, 2427.6), row("RFMN Arms", 1224, 1071), row("RFMN Elbows", 816, 714),
    row("RFMN Face/Neck", 2000, 1750), row("RFMN Face", 1632, 1428), row("RFMN Hands", 816, 714),
    row("RFMN Knees", 816, 714), row("RFMN Legs", 2448, 2142), row("RFMN Stomach", 2040, 1785),
  ] },
  { id: "ipl", label: "IPL / Photofacial", sessions: 3, interest: "IPL", rows: [
    row("Forearms", 652.8, 571.2), row("Full Arms", 1101.6, 963.9), row("Full Back", 1224, 1071), row("Full Chest", 938.4, 821.1),
    row("Full Face", 1060.8, 928.2), row("Full Legs", 1632, 1428), row("Hands", 489.6, 428.4), row("Individual Spot", 326.4, 285.6),
    row("Neck", 652.8, 571.2), row("Partial Face", 816, 714),
  ] },
  { id: "laser-hair", label: "Laser Hair Removal", sessions: 6, interest: "Laser Hair Removal", rows: [
    row("Abdomen", 816, 714), row("Back", 2040, 1785), row("Bikini", 714, 624.75), row("Breast", 408, 357), row("Buttocks", 816, 714),
    row("Cheeks", 816, 714), row("Chest", 2000, 1750), row("Chin", 408, 357), row("Entire Arm + Hand", 1632, 1428),
    row("Entire Leg + Feet", 2040, 1785), row("Feet", 408, 357), row("Fingers/Toes", 816, 714), row("Forearms", 1224, 1071),
    row("Hands", 408, 357), row("Lip", 408, 357), row("Lower Leg", 1200, 1050), row("Thighs", 1200, 1050),
    row("Underarms", 600, 525), row("Upper Arm", 1224, 1071),
  ] },
];

/** Verbatim from the staff menu. */
export const checkoutTerms = [
  { label: "Checkout", text: "Full prepayment during sale dates; in-office, phone or approved online checkout. No deposits or price holds." },
  { label: "Membership", text: "Member pricing requires active membership/first payment. VIP Beauty Bank may pay toward treatments after discount." },
  { label: "Redemption", text: "Treatments 365 days unless listed otherwise; provider approval required. No extra stacking except stated injectable benefits." },
] as const;

export const deviceTerms = [
  "Packages must have 3+ visits of the same treatment, except existing RF+CO2 combination packages. Standalone add-ons excluded.",
  "Multiple package purchases allowed with provider approval. Full payment during Black Friday; treatments may be scheduled later.",
  "Redeem within 365 days of purchase, subject to law and clinical eligibility. No other discounts may be stacked.",
] as const;

export const termsClosing =
  "Offers valid November 23–30, 2026 as described. Eligibility determined at consultation. Provider approval required.";

export const giftCardBonusSmallPrint =
  "Offer available November 27–30 only. Bonus issued separately to the purchaser after payment, redeemable starting December 1, 2026, valid for 365 days on regular-priced services and skincare; cannot be combined with other promotions. Purchased gift cards do not expire.";

export type FaqItem = { question: string; answer: string };

/** Answers come only from the terms above. */
export const blackFridayFaq: FaqItem[] = [
  { question: "When is member early access?",
    answer: "Member early access runs November 23–26, 2026. The public Black Friday sale runs November 27–30, 2026." },
  { question: "Can I get member pricing if I'm new?",
    answer: "Yes. New patients who enroll in an eligible membership receive member pricing as soon as their first membership payment is completed." },
  { question: "How do I purchase?",
    answer: "Black Friday offers require full prepayment during the sale dates, in office, by phone at (941) 923-8990 or through approved online checkout. There are no deposits or price holds." },
  { question: "Do I have to be treated during Black Friday?",
    answer: "No. You prepay during the sale and can schedule your treatments later. Treatments are redeemable within 365 days unless listed otherwise, and provider approval is required." },
  { question: "Can I combine offers?",
    answer: "Offers can't be stacked beyond the stated injectable benefits: members' 10% injectable discount is applied before the Black Friday injectable offer. Device packages and selected skincare can't be combined with other discounts." },
  { question: "How does the gift card bonus work?",
    answer: "Buy a $100+ gift card November 27–30, 2026 and receive 10% back in bonus credit for you. The bonus is issued separately to the purchaser after payment, can be used starting December 1, 2026 on regular-priced services and skincare, and expires after 365 days. Purchased gift cards never expire." },
  { question: "Who decides dosing and eligibility?",
    answer: "Your provider. Dosing and eligibility are determined at your consultation, and provider approval is required for every treatment." },
  { question: "Where are you located?",
    answer: "Harmony Med Spa is at 2184 Gulf Gate Dr., Unit B, Sarasota, FL 34231. Call us at (941) 923-8990." },
];

export const giftCardFaq: FaqItem[] = [
  { question: "Is this an instant purchase?", answer: "No. This is a request. A member of our team will contact you to finalize your gift card and arrange secure payment." },
  { question: "Will the recipient be contacted?", answer: "No. We only ever contact the person who submits the request, never the gift card recipient, so your surprise stays a surprise." },
  { question: "Do gift cards expire?", answer: "Purchased gift cards do not expire." },
  { question: "How does the Black Friday bonus work?",
    answer: "Gift cards of $100 or more purchased November 27–30, 2026 receive 10% back in promotional credit for the purchaser. The bonus is issued separately after payment, can be used starting December 1, 2026, and is valid for 365 days on regular-priced services and skincare. It can't be combined with other promotions." },
  { question: "Can I choose a specific service?", answer: "Gift cards are issued for a dollar amount. See our services and pricing to choose an amount that fits the treatment you have in mind." },
];

export const highlights = [
  { value: 40, prefix: "", suffix: "", label: "Free Daxxify Units" },
  { value: 50, prefix: "", suffix: "%", label: "Off the 2nd RHA Syringe" },
  { value: 30, prefix: "Up to ", suffix: "%", label: "Off Laser & Devices" },
  { value: 10, prefix: "", suffix: "%", label: "Back on Gift Cards" },
] as const;
