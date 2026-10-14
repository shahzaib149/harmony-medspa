/**
 * Harmony Med Spa before-and-after cases, copied from the clinic's RxPhoto gallery
 * (https://harmonymedfl.wpenginepowered.com/before-and-after/) on 2026-10-14.
 * Each case is one photo pair, split into public/images/before-and-afters/cases/<category>/<id>-before.jpg
 * and -after.jpg at the same size, so the two can be stacked under a comparison slider.
 */

export type BeforeAfterCategoryId =
  | "neuromodulators"
  | "dermal-filler"
  | "rf-microneedling"
  | "fractional-co2"
  | "photofacial-ipl-for-face"
  | "vein-treatment-ipl-for-veins";

export type BeforeAfterCategory = {
  id: BeforeAfterCategoryId;
  label: string;
  description: string;
  /** The service page that explains the treatment. */
  href: string;
};

export type BeforeAfterCase = {
  id: string;
  category: BeforeAfterCategoryId;
  width: number;
  height: number;
};

export const BEFORE_AFTER_CATEGORIES: BeforeAfterCategory[] = [
  { id: "neuromodulators", label: "Neuromodulators", description: "Softer frown lines, crow's feet and forehead lines with tox.", href: "/injectables" },
  { id: "dermal-filler", label: "Dermal Filler", description: "Restored volume and smoother folds around the mouth, cheeks and jaw.", href: "/dermal-fillers" },
  { id: "rf-microneedling", label: "RF Microneedling", description: "Firmer, smoother skin texture on the face and neck.", href: "/rf-microneedling" },
  { id: "fractional-co2", label: "Fractional CO2", description: "Resurfaced tone and texture with fractional CO2 laser.", href: "/fractional-co2-laser-treatments" },
  { id: "photofacial-ipl-for-face", label: "PhotoFacial IPL", description: "Clearer, more even tone after IPL photofacials.", href: "/lasers-and-lights" },
  { id: "vein-treatment-ipl-for-veins", label: "IPL for Veins", description: "Faded spider veins with IPL vein treatment.", href: "/lasers-and-lights" },
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  { id: "117987", category: "neuromodulators", width: 506, height: 683 },
  { id: "117955", category: "neuromodulators", width: 490, height: 640 },
  { id: "118002", category: "neuromodulators", width: 506, height: 640 },
  { id: "118001", category: "neuromodulators", width: 506, height: 640 },
  { id: "117998", category: "neuromodulators", width: 506, height: 640 },
  { id: "117999", category: "neuromodulators", width: 506, height: 640 },
  { id: "124896", category: "neuromodulators", width: 506, height: 640 },
  { id: "117996", category: "neuromodulators", width: 506, height: 640 },
  { id: "117995", category: "neuromodulators", width: 490, height: 640 },
  { id: "117990", category: "neuromodulators", width: 499, height: 768 },
  { id: "117989", category: "neuromodulators", width: 506, height: 699 },
  { id: "117985", category: "neuromodulators", width: 506, height: 647 },
  { id: "117980", category: "neuromodulators", width: 493, height: 647 },
  { id: "117978", category: "neuromodulators", width: 506, height: 647 },
  { id: "117984", category: "neuromodulators", width: 493, height: 647 },
  { id: "117977", category: "neuromodulators", width: 506, height: 647 },
  { id: "117983", category: "neuromodulators", width: 506, height: 647 },
  { id: "117976", category: "neuromodulators", width: 493, height: 647 },
  { id: "117973", category: "neuromodulators", width: 506, height: 647 },
  { id: "117972", category: "neuromodulators", width: 493, height: 644 },
  { id: "117971", category: "neuromodulators", width: 493, height: 647 },
  { id: "117975", category: "neuromodulators", width: 493, height: 647 },
  { id: "117970", category: "neuromodulators", width: 506, height: 640 },
  { id: "117967", category: "neuromodulators", width: 506, height: 647 },
  { id: "118006", category: "neuromodulators", width: 506, height: 640 },
  { id: "117956", category: "neuromodulators", width: 506, height: 640 },
  { id: "117957", category: "neuromodulators", width: 506, height: 640 },
  { id: "117988", category: "neuromodulators", width: 506, height: 683 },
  { id: "117954", category: "neuromodulators", width: 490, height: 630 },
  { id: "118000", category: "neuromodulators", width: 506, height: 758 },
  { id: "118003", category: "neuromodulators", width: 451, height: 768 },
  { id: "118023", category: "dermal-filler", width: 459, height: 768 },
  { id: "118024", category: "dermal-filler", width: 420, height: 768 },
  { id: "118022", category: "dermal-filler", width: 448, height: 768 },
  { id: "118021", category: "dermal-filler", width: 384, height: 768 },
  { id: "118026", category: "dermal-filler", width: 506, height: 647 },
  { id: "118017", category: "dermal-filler", width: 506, height: 647 },
  { id: "118028", category: "dermal-filler", width: 506, height: 647 },
  { id: "118027", category: "dermal-filler", width: 506, height: 647 },
  { id: "118016", category: "dermal-filler", width: 506, height: 647 },
  { id: "117959", category: "rf-microneedling", width: 506, height: 580 },
  { id: "117966", category: "rf-microneedling", width: 469, height: 768 },
  { id: "117958", category: "rf-microneedling", width: 408, height: 768 },
  { id: "117960", category: "rf-microneedling", width: 506, height: 699 },
  { id: "117961", category: "rf-microneedling", width: 506, height: 640 },
  { id: "125174", category: "rf-microneedling", width: 506, height: 637 },
  { id: "125175", category: "rf-microneedling", width: 500, height: 637 },
  { id: "117992", category: "fractional-co2", width: 506, height: 640 },
  { id: "118011", category: "fractional-co2", width: 506, height: 640 },
  { id: "117991", category: "fractional-co2", width: 506, height: 640 },
  { id: "118012", category: "fractional-co2", width: 506, height: 640 },
  { id: "118010", category: "fractional-co2", width: 506, height: 640 },
  { id: "117994", category: "fractional-co2", width: 506, height: 647 },
  { id: "118004", category: "fractional-co2", width: 506, height: 647 },
  { id: "117993", category: "fractional-co2", width: 506, height: 647 },
  { id: "118005", category: "fractional-co2", width: 506, height: 647 },
  { id: "118009", category: "photofacial-ipl-for-face", width: 493, height: 647 },
  { id: "118018", category: "photofacial-ipl-for-face", width: 281, height: 380 },
  { id: "118020", category: "photofacial-ipl-for-face", width: 281, height: 571 },
  { id: "118014", category: "photofacial-ipl-for-face", width: 281, height: 538 },
  { id: "118008", category: "photofacial-ipl-for-face", width: 493, height: 647 },
  { id: "118019", category: "photofacial-ipl-for-face", width: 281, height: 380 },
  { id: "118013", category: "photofacial-ipl-for-face", width: 281, height: 537 },
  { id: "118025", category: "vein-treatment-ipl-for-veins", width: 505, height: 640 },
];

export function beforeAfterImages(item: BeforeAfterCase) {
  const base = `/images/before-and-afters/cases/${item.category}/${item.id}`;
  return { before: `${base}-before.jpg`, after: `${base}-after.jpg` };
}

export function casesFor(category: BeforeAfterCategoryId): BeforeAfterCase[] {
  return BEFORE_AFTER_CASES.filter((item) => item.category === category);
}
