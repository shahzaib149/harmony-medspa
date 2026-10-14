// Single source of truth for published treatment pricing shown on /pricing, on individual
// service pages and on /membership. Prices are plain text so Google can index them; never
// ship a price here that the clinic has not approved. Values below are from the 2026 Harmony
// Med Spa Price Menu and 2026 Clinical IV Therapy Menu.
//
// `needsConfirmation: true` marks a figure the clinic flagged as differing between source
// materials. It is never shown to patients and is left out of structured data; get sign-off
// before publishing, then remove the flag.

export const PRICING_PATH = "/pricing";

export type PriceItem = {
  name: string;
  /** Display price exactly as it should read, e.g. "$714" or "$12 per unit". */
  price: string;
  /** Short qualifier shown under the price, e.g. "typically every 3–4 months". */
  note?: string;
  /** Service page for this specific item, when it differs from the category's page. */
  href?: string;
  needsConfirmation?: boolean;
};

export type PriceCategory = {
  id: string;
  title: string;
  blurb?: string;
  /** Internal link to the related service page and its descriptive link text. */
  serviceHref?: string;
  serviceLinkText?: string;
  items: PriceItem[];
  footnote?: string;
};

export const PRICING_CATEGORIES: PriceCategory[] = [
  {
    id: "injectables",
    title: "Injectables",
    blurb:
      "Wrinkle-relaxing and volumizing injectable treatments at our Gulf Gate medical spa in Sarasota, FL.",
    serviceHref: "/injectables",
    serviceLinkText: "Explore our injectable treatments in Sarasota",
    items: [
      { name: "Daxxify", price: "$12 per unit", href: "/daxxify" },
      { name: "Dermal Filler – Full Syringe", price: "$714", href: "/dermal-fillers" },
      { name: "Dermal Filler – Half Syringe", price: "$382.50", href: "/dermal-fillers" },
      { name: "Sculptra – 1 Vial", price: "$867", href: "/sculptra" },
      { name: "Sculptra – 2 Vials", price: "$1,632", href: "/sculptra" },
    ],
    footnote: "Complimentary injectable consultations available.",
  },
  {
    id: "medical-weight-loss",
    title: "Medical Weight Loss",
    blurb:
      "Medically supervised weight loss programs with ongoing support and wellness coaching in Sarasota, FL.",
    serviceHref: "/medical-weight-loss",
    serviceLinkText: "Learn about medical weight loss in Sarasota",
    items: [
      { name: "Initial Medical Exam", price: "$163.20" },
      { name: "Semaglutide – 1 Month", price: "$367.20", href: "/semaglutide" },
      { name: "Semaglutide – 3 Months", price: "$985", href: "/semaglutide" },
      { name: "Tirzepatide – 1 Month", price: "$612", href: "/tirzepatide" },
      { name: "Tirzepatide – 3 Months", price: "$1,500", href: "/tirzepatide" },
    ],
    footnote: "Medically supervised programs with ongoing support and wellness coaching.",
  },
  {
    id: "hormone-optimization",
    title: "Hormone Optimization / BHRT",
    blurb:
      "Bioidentical hormone replacement therapy and pellet therapy tailored to your labs and goals.",
    serviceHref: "/hormone-replacement-therapy",
    serviceLinkText: "Learn about hormone optimization in Sarasota",
    items: [
      { name: "HRT Exam", price: "$306" },
      { name: "Female Hormone Pellet", price: "$408", note: "Typically every 3–4 months" },
      { name: "Male Hormone Pellet", price: "$765", note: "Typically every 5–6 months" },
      { name: "Pre-Treatment Labs", price: "$265.20", note: "Or use insurance" },
      { name: "Post-Treatment Labs", price: "$163.20", note: "Or use insurance" },
    ],
  },
  {
    id: "rf-microneedling",
    title: "RF Microneedling",
    blurb: "Radiofrequency microneedling for skin tightening and texture in Sarasota, FL.",
    serviceHref: "/rf-microneedling",
    serviceLinkText: "Learn about RF microneedling in Sarasota",
    items: [
      { name: "Face – Single Treatment", price: "$765" },
      { name: "Face – Package of 3", price: "$2,040" },
      { name: "Face + Neck – Package of 3", price: "$2,550" },
    ],
  },
  {
    id: "fractional-co2-laser",
    title: "Fractional CO2 Laser",
    blurb: "Fractional CO2 laser resurfacing for tone, texture, and scarring in Sarasota, FL.",
    serviceHref: "/fractional-co2-laser-treatments",
    serviceLinkText: "Learn about fractional CO2 laser treatments in Sarasota",
    items: [
      { name: "Face – Single Treatment", price: "$663" },
      { name: "Face – Package of 3", price: "$1,836" },
      { name: "Face + Neck – Package of 3", price: "$2,346" },
    ],
  },
  {
    id: "rf-microneedling-co2-combination",
    title: "RF Microneedling + CO2 Laser Combination",
    blurb: "A combined resurfacing protocol pairing RF microneedling with fractional CO2 laser.",
    serviceHref: "/fractional-co2-laser-treatments",
    serviceLinkText: "Learn about fractional CO2 laser resurfacing in Sarasota",
    items: [
      { name: "Face – Single Treatment", price: "$1,326" },
      { name: "Face – Package of 3", price: "$3,468" },
      { name: "Face + Neck – Package of 3", price: "$3,978" },
    ],
    footnote:
      "Additional treatment areas and customized packages are available. Contact us for pricing.",
  },
  {
    id: "facials",
    title: "Facials & Skin Treatments",
    blurb: "Customized facials and advanced skin treatments for every skin type in Sarasota, FL.",
    serviceHref: "/facials",
    serviceLinkText: "Explore our facials in Sarasota",
    items: [
      { name: "Signature Facial", price: "$96.90" },
      { name: "Essential Facial", price: "$66.30" },
      { name: "Gentleman's Facial", price: "$76.50" },
      { name: "Teen Facial", price: "$56.10" },
      { name: "Purifying Back Facial", price: "$86.70" },
      { name: "Glo2Facial", price: "$204", href: "/glo2facials" },
      { name: "Glo2Facial + Dermaplane", price: "$229.50", href: "/glo2facials" },
    ],
  },
  {
    id: "facial-enhancements",
    title: "Facial Enhancements",
    blurb: "Add-on enhancements to personalize any facial treatment.",
    serviceHref: "/facials",
    serviceLinkText: "Explore our facials in Sarasota",
    items: [
      { name: "Hydro-Facial Add-On", price: "$30.60" },
      { name: "Dermaplane Add-On", price: "$25.50" },
      { name: "Microdermabrasion Add-On", price: "$10.20" },
    ],
  },
  {
    id: "facial-memberships",
    title: "Facial Memberships",
    blurb: "Save on routine facials with a Harmony facial membership.",
    serviceHref: "/membership",
    serviceLinkText: "See full facial membership benefits",
    items: [
      { name: "Monthly", price: "$149" },
      { name: "6 Months", price: "$714", needsConfirmation: true },
      { name: "12 Months", price: "$1,400" },
    ],
  },
  {
    id: "glo2facial-memberships",
    title: "Glo2Facial Memberships",
    blurb: "A dedicated membership for the signature Glo2Facial.",
    serviceHref: "/membership",
    serviceLinkText: "See full Glo2Facial membership benefits",
    items: [
      { name: "Monthly", price: "$199" },
      { name: "6 Months", price: "$1,020", needsConfirmation: true },
      { name: "12 Months", price: "$2,000" },
    ],
  },
  {
    id: "vip-beauty-bank-memberships",
    title: "VIP Beauty Bank Memberships",
    blurb:
      "Our VIP Beauty Bank tiers bank monthly value toward treatments. Full descriptions and benefits are on our Memberships page.",
    serviceHref: "/membership",
    serviceLinkText: "See full VIP Beauty Bank membership benefits",
    items: [
      { name: "VIP Membership", price: "$159 / month" },
      { name: "VIP Elite Membership", price: "$259 / month" },
      { name: "VIP Ultimate Membership", price: "$349 / month" },
    ],
  },
];

function category(id: string) {
  const found = PRICING_CATEGORIES.find((entry) => entry.id === id);
  if (!found) throw new Error(`Unknown pricing category: ${id}`);
  return found;
}

/** Display price of one item, so other pages (e.g. /membership) never restate a figure. */
export function priceOf(categoryId: string, itemName: string) {
  const item = category(categoryId).items.find((entry) => entry.name === itemName);
  if (!item) throw new Error(`Unknown price item: ${categoryId} / ${itemName}`);
  return item.price;
}

export type IvInfusion = {
  name: string;
  price: string;
  summary: string;
  delivery: string;
  ingredients: { name: string; benefit: string }[];
  addOn?: string;
};

// Clinical IV Therapy — the Radiance formula below reflects the clinic's revised ingredient
// list and is pending final clinical and pharmacy-compatibility approval before publishing.
// No prices are assigned to optional provider-ordered add-ons; the clinic will supply those.
export const IV_INFUSIONS: IvInfusion[] = [
  {
    name: "Athlete's Edge IV",
    price: "$168.30",
    summary: "Performance and metabolic recovery support.",
    delivery: "Delivered in 500 mL normal saline.",
    ingredients: [
      {
        name: "Vita-Complex (B-Complex Vitamins)",
        benefit: "Supports cellular energy metabolism and nervous system function.",
      },
      {
        name: "Methylcobalamin (Vitamin B12)",
        benefit: "Supports red blood cell formation and neurological health.",
      },
      { name: "Taurine", benefit: "Supports muscle recovery, endurance, and antioxidant defense." },
    ],
  },
  {
    name: "Immunity IV",
    price: "$147.90",
    summary: "Immune function and antioxidant support.",
    delivery: "Delivered in 500 mL normal saline.",
    ingredients: [
      {
        name: "Vita-Complex (B-Complex Vitamins)",
        benefit: "Supports energy metabolism and immune cell function.",
      },
      {
        name: "Vitamin C (Ascorbic Acid)",
        benefit: "Supports normal immune function and collagen production.",
      },
      {
        name: "Zinc Sulfate",
        benefit: "Supports immune cell development and antioxidant defense.",
      },
    ],
    addOn: "Optional provider-ordered add-on: Glutathione.",
  },
  {
    name: "Radiance IV",
    price: "$188.70",
    summary: "Antioxidant and skin wellness support.",
    delivery: "Delivered in 500 mL normal saline.",
    ingredients: [
      {
        name: "N-Acetylcysteine (NAC)",
        benefit: "Precursor to glutathione and supports antioxidant defense.",
      },
      {
        name: "Methylcobalamin (Vitamin B12)",
        benefit:
          "Supports normal nerve function, red blood cell formation, and cellular metabolism.",
      },
      {
        name: "Vita-Complex (B-Complex Vitamins)",
        benefit: "Supports metabolic and nervous system function.",
      },
      { name: "Magnesium Chloride", benefit: "Supports muscle and nerve function." },
    ],
    addOn: "Optional provider-ordered add-on: Glutathione.",
  },
];

export const IV_CLINICAL_DISCLAIMER =
  "All IV therapies are administered following a clinical assessment and an active provider order. Individual eligibility, ingredients, and dosing are determined by the supervising provider based on patient history and current health status. These statements have not been evaluated by the FDA. This therapy is not intended to diagnose, treat, cure, or prevent any disease.";

export const PRICING_GENERAL_DISCLAIMER =
  "Pricing is subject to change. Final treatment costs depend on individual needs, provider recommendations, and treatment eligibility. Consultation may be required.";

/**
 * Menu graphics supplied by the clinic. A graphic renders only once its file exists under
 * public/, so drop the approved files at these exact paths to publish them. The IV menu
 * must be the revised version with the updated Radiance IV ingredients.
 */
export type MenuImage = { src: string; alt: string; width: number; height: number };

export const PRICE_MENU_IMAGES: MenuImage[] = [
  {
    src: "/images/pricing/harmony-price-menu-2026-page-1.jpg",
    alt: "Harmony Med Spa 2026 price menu, page 1, with injectable, medical weight loss, and hormone optimization prices",
    width: 1275,
    height: 1650,
  },
  {
    src: "/images/pricing/harmony-price-menu-2026-page-2.jpg",
    alt: "Harmony Med Spa 2026 price menu, page 2, with skin resurfacing, facial, and membership prices",
    width: 1275,
    height: 1650,
  },
];

export const IV_MENU_IMAGE: MenuImage = {
  src: "/images/pricing/harmony-iv-therapy-menu-2026.jpg",
  alt: "Harmony Med Spa 2026 Clinical IV Therapy menu with Athlete's Edge, Immunity, and Radiance IV prices and ingredients",
  width: 1275,
  height: 1650,
};

/** Contact page link that tells the form, and the lead, which treatment the patient asked about. */
export function requestPricingHref(service?: string) {
  return service ? `/contact-us?service=${encodeURIComponent(service)}` : "/contact-us";
}

export type ServicePricing = {
  /** Treatment name shown in headings and sent as the lead's Treatment Interest. */
  service: string;
  /** Section of /pricing to link to. */
  pricingAnchor?: string;
  /** Published prices for this page. Empty means pricing is set at consultation. */
  groups: { title: string; items: PriceItem[]; footnote?: string }[];
  /** The page lists its own published prices elsewhere, so lead with booking, not a quote. */
  pricesOnPage?: boolean;
};

function pick(categoryId: string, itemNames?: string[], title?: string) {
  const source = category(categoryId);
  const items = itemNames
    ? itemNames.map((name) => {
        const item = source.items.find((entry) => entry.name === name);
        if (!item) throw new Error(`Unknown price item: ${categoryId} / ${name}`);
        return item;
      })
    : source.items;
  return { title: title ?? source.title, items, footnote: itemNames ? undefined : source.footnote };
}

/** Pricing block for every service page, keyed by the page's path. */
export const SERVICE_PRICING: Record<string, ServicePricing> = {
  "/injectables": { service: "Injectables", pricingAnchor: "injectables", groups: [pick("injectables")] },
  "/daxxify": {
    service: "Daxxify",
    pricingAnchor: "injectables",
    groups: [{ ...pick("injectables", ["Daxxify"], "Daxxify"), footnote: "Complimentary injectable consultations available." }],
  },
  "/dermal-fillers": {
    service: "Dermal Fillers",
    pricingAnchor: "injectables",
    groups: [
      {
        ...pick("injectables", ["Dermal Filler – Full Syringe", "Dermal Filler – Half Syringe"], "Dermal Fillers"),
        footnote: "Complimentary injectable consultations available.",
      },
    ],
  },
  "/sculptra": {
    service: "Sculptra",
    pricingAnchor: "injectables",
    groups: [{ ...pick("injectables", ["Sculptra – 1 Vial", "Sculptra – 2 Vials"], "Sculptra"), footnote: "Complimentary injectable consultations available." }],
  },
  "/rf-microneedling": {
    service: "RF Microneedling",
    pricingAnchor: "rf-microneedling",
    groups: [pick("rf-microneedling"), pick("rf-microneedling-co2-combination")],
  },
  "/fractional-co2-laser-treatments": {
    service: "Fractional CO2 Laser",
    pricingAnchor: "fractional-co2-laser",
    groups: [pick("fractional-co2-laser"), pick("rf-microneedling-co2-combination")],
  },
  "/facials": {
    service: "Facials",
    pricingAnchor: "facials",
    groups: [pick("facials"), pick("facial-enhancements"), pick("facial-memberships")],
  },
  "/glo2facials": {
    service: "Glo2Facial",
    pricingAnchor: "facials",
    groups: [pick("facials", ["Glo2Facial", "Glo2Facial + Dermaplane"], "Glo2Facial"), pick("glo2facial-memberships")],
  },
  "/facials-and-peels": { service: "Facials and Peels", pricingAnchor: "facials", groups: [pick("facials"), pick("facial-enhancements")] },
  "/chemical-peels": { service: "Chemical Peels", groups: [] },
  "/medical-weight-loss": { service: "Medical Weight Loss", pricingAnchor: "medical-weight-loss", groups: [pick("medical-weight-loss")] },
  "/semaglutide": {
    service: "Semaglutide",
    pricingAnchor: "medical-weight-loss",
    groups: [pick("medical-weight-loss", ["Initial Medical Exam", "Semaglutide – 1 Month", "Semaglutide – 3 Months"], "Semaglutide Weight Loss")],
  },
  "/tirzepatide": {
    service: "Tirzepatide",
    pricingAnchor: "medical-weight-loss",
    groups: [pick("medical-weight-loss", ["Initial Medical Exam", "Tirzepatide – 1 Month", "Tirzepatide – 3 Months"], "Tirzepatide Weight Loss")],
  },
  "/hormone-replacement-therapy": { service: "Hormone Optimization", pricingAnchor: "hormone-optimization", groups: [pick("hormone-optimization")] },
  // The IV page renders the full IV menu itself, so its block only adds the buttons.
  "/iv-therapy": { service: "IV Therapy", pricingAnchor: "iv-therapy", groups: [], pricesOnPage: true },
  "/lasers-and-lights": {
    service: "Laser and Light Treatments",
    pricingAnchor: "fractional-co2-laser",
    groups: [pick("fractional-co2-laser")],
  },
  "/laser-hair-removal": { service: "Laser Hair Removal", groups: [] },
  "/peptide-therapy": { service: "Peptide Therapy", groups: [] },
  "/hair-restoration": { service: "Hair Restoration", groups: [] },
  "/body": { service: "Body Treatments", groups: [] },
  "/skincare": { service: "Skincare Treatments", pricingAnchor: "facials", groups: [] },
  "/wellness": { service: "Wellness", pricingAnchor: "medical-weight-loss", groups: [] },
};

/** Options for the contact form's treatment-of-interest field. */
export const TREATMENT_INTEREST_OPTIONS = [
  ...new Set(Object.values(SERVICE_PRICING).map((entry) => entry.service)),
  "Memberships",
  "Other / Not sure",
];
