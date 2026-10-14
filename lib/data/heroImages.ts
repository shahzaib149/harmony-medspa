import type { StaticImageData } from "next/image";

import reception from "@/public/images/blogs/october-2026/hormone-follow-up-reception.jpg";
import waitingRoom from "@/public/images/blogs/october-2026/membership-harmony-waiting-room.jpg";
import logoLounge from "@/public/images/blogs/october-2026/hormone-options-harmony-consultation.jpg";
import co2Room from "@/public/images/blogs/october-2026/ipl-co2-treatment-planning-room.jpg";
import iplRoom from "@/public/images/blogs/october-2026/ipl-skin-assessment-harmony.jpg";
import facialRoom from "@/public/images/blogs/october-2026/glo2facial-holiday-treatment-room.jpg";
import retailDisplay from "@/public/images/blogs/october-2026/october-lip-care-skincare-display.jpg";
import treatmentSuite from "@/public/images/blogs/october-2026/rf-aftercare-harmony-treatment-room.jpg";
import laserSuite from "@/public/images/blogs/october-2026/laser-hair-removal-office-suite.jpg";
import teamAtDesk from "@/public/images/blogs/harmony-editorial/combine-med-spa-treatments-sarasota.jpg";
import daxxifyConsult from "@/public/images/blogs/harmony-editorial/daxxify-vs-jeuveau-sarasota.webp";
import firstVisit from "@/public/images/blogs/harmony-editorial/first-visit-med-spa-sarasota.png";
import glo2Facial from "@/public/images/blogs/harmony-editorial/glo2facial-vs-traditional-facial-sarasota.png";
import glp1Plateau from "@/public/images/blogs/harmony-editorial/glp1-weight-loss-plateau-sarasota.jpg";
import consultLounge from "@/public/images/blogs/harmony-editorial/harmony-medspa-sarasota-consultation-room.png";
import ivHydration from "@/public/images/blogs/harmony-editorial/iv-hydration-vs-oral-electrolytes-sarasota.jpg";
import ivOptions from "@/public/images/blogs/harmony-editorial/iv-therapy-options-sarasota.png";
import kerafactor from "@/public/images/blogs/harmony-editorial/kerafactor-hair-restoration-sarasota.png";
import laserHair from "@/public/images/blogs/harmony-editorial/laser-hair-removal-sarasota-guide.png";
import lowT from "@/public/images/blogs/harmony-editorial/low-testosterone-testing-sarasota.jpg";
import consultConversation from "@/public/images/blogs/harmony-editorial/med-spa-consultation-conversation-sarasota.png";
import membershipTablet from "@/public/images/blogs/harmony-editorial/med-spa-membership-vs-pay-per-visit-sarasota.jpg";
import treatmentRoom from "@/public/images/blogs/harmony-editorial/med-spa-vs-day-spa-vs-dermatologist.png";
import spectraAnalysis from "@/public/images/blogs/harmony-editorial/medical-facial-spectra-skin-analysis-sarasota.png";
import skincareRoutine from "@/public/images/blogs/harmony-editorial/medical-grade-skincare-routine-sarasota.png";
import weightLossCost from "@/public/images/blogs/harmony-editorial/medical-weight-loss-cost-sarasota.png";
import facialBalancing from "@/public/images/blogs/harmony-editorial/natural-looking-facial-balancing-sarasota.png";
import revivamask from "@/public/images/blogs/harmony-editorial/revivamask-recovery-mask-sarasota.png";
import rfMicroneedling from "@/public/images/blogs/harmony-editorial/rf-microneedling-vs-co2-laser-sarasota.webp";
import fillerConsult from "@/public/images/blogs/harmony-editorial/sculptra-vs-dermal-fillers-sarasota.webp";
import treatmentPlan from "@/public/images/blogs/harmony-editorial/med-spa-treatment-timeline-before-event-sarasota.webp";
import vipProducts from "@/public/images/blogs/harmony-editorial/vip-ultimate-membership-sarasota.png";
import peptideVirtual from "@/public/images/blogs/harmony-editorial/virtual-peptide-therapy-sarasota.png";
import weightLossProgram from "@/public/images/blogs/harmony-editorial/weight-loss-program-costs-explained.png";
import weightLossConsult from "@/public/images/blogs/harmony-editorial/weight-loss-without-medication-sarasota.png";
import readingByWindow from "@/public/images/blogs/harmony-editorial/choosing-skin-care-provider-sarasota.png";

export type HeroImage = {
  image: StaticImageData;
  /** Short category line shown above the page title. */
  eyebrow: string;
  /** CSS object-position, used when the subject sits off-centre. */
  position?: string;
};

/** Photography behind each page's title band, keyed by route. */
export const HERO_IMAGES: Record<string, HeroImage> = {
  "/about-us": { image: reception, eyebrow: "Harmony Med Spa · Sarasota" },
  "/before-and-afters": { image: spectraAnalysis, eyebrow: "Real patient results" },
  "/blog": { image: readingByWindow, eyebrow: "The Harmony journal", position: "center 40%" },
  "/body": { image: laserSuite, eyebrow: "Body treatments", position: "center 42%" },
  "/chemical-peels": { image: treatmentSuite, eyebrow: "Facials + Peels" },
  "/contact-us": { image: logoLounge, eyebrow: "Gulf Gate · Sarasota, FL" },
  "/daxxify": { image: daxxifyConsult, eyebrow: "Injectables" },
  "/dermal-fillers": { image: fillerConsult, eyebrow: "Injectables" },
  "/events": { image: membershipTablet, eyebrow: "Patient center" },
  "/facials": { image: revivamask, eyebrow: "Facials + Peels" },
  "/facials-and-peels": { image: facialRoom, eyebrow: "Facials + Peels" },
  "/fractional-co2-laser-treatments": { image: co2Room, eyebrow: "Lasers + Lights" },
  "/glo2facials": { image: glo2Facial, eyebrow: "Facials + Peels" },
  "/hair-restoration": { image: kerafactor, eyebrow: "Hair restoration" },
  "/hormone-replacement-therapy": { image: lowT, eyebrow: "Wellness" },
  "/injectables": { image: facialBalancing, eyebrow: "Injectables" },
  "/iv-therapy": { image: ivOptions, eyebrow: "Wellness" },
  "/laser-hair-removal": { image: laserHair, eyebrow: "Lasers + Lights" },
  "/lasers-and-lights": { image: iplRoom, eyebrow: "Lasers + Lights" },
  "/medical-weight-loss": { image: weightLossConsult, eyebrow: "Medical weight loss" },
  "/membership": { image: waitingRoom, eyebrow: "Memberships" },
  "/our-team": { image: teamAtDesk, eyebrow: "About Harmony" },
  "/patient-forms": { image: firstVisit, eyebrow: "Patient center" },
  "/payment-plans": { image: weightLossCost, eyebrow: "Patient center" },
  "/peptide-therapy": { image: peptideVirtual, eyebrow: "Wellness" },
  "/pricing": { image: consultLounge, eyebrow: "2026 treatment pricing" },
  "/rf-microneedling": { image: rfMicroneedling, eyebrow: "Skin resurfacing" },
  "/sculptra": { image: treatmentPlan, eyebrow: "Injectables" },
  "/semaglutide": { image: glp1Plateau, eyebrow: "Medical weight loss" },
  "/services": { image: treatmentRoom, eyebrow: "Aesthetic + Wellness" },
  "/shop": { image: vipProducts, eyebrow: "Shop Harmony" },
  "/skincare": { image: skincareRoutine, eyebrow: "Skincare" },
  "/skincare-products": { image: retailDisplay, eyebrow: "Skincare" },
  "/testimonials": { image: consultConversation, eyebrow: "Patient center" },
  "/tirzepatide": { image: weightLossProgram, eyebrow: "Medical weight loss" },
  "/wellness": { image: ivHydration, eyebrow: "Wellness" },
};
