import type { StaticImageData } from "next/image";

import waitingRoom from "@/public/images/blogs/october-2026/membership-harmony-waiting-room.jpg";
import co2Room from "@/public/images/blogs/october-2026/ipl-co2-treatment-planning-room.jpg";
import facialRoom from "@/public/images/blogs/october-2026/glo2facial-holiday-treatment-room.jpg";
import treatmentSuite from "@/public/images/blogs/october-2026/rf-aftercare-harmony-treatment-room.jpg";
import laserSuite from "@/public/images/blogs/october-2026/laser-hair-removal-office-suite.jpg";
import teamAtDesk from "@/public/images/blogs/harmony-editorial/combine-med-spa-treatments-sarasota.jpg";
import glo2Facial from "@/public/images/blogs/harmony-editorial/glo2facial-vs-traditional-facial-sarasota.png";
import consultLounge from "@/public/images/blogs/harmony-editorial/harmony-medspa-sarasota-consultation-room.png";
import consultConversation from "@/public/images/blogs/harmony-editorial/med-spa-consultation-conversation-sarasota.png";
import membershipTablet from "@/public/images/blogs/harmony-editorial/med-spa-membership-vs-pay-per-visit-sarasota.jpg";
import treatmentRoom from "@/public/images/blogs/harmony-editorial/med-spa-vs-day-spa-vs-dermatologist.png";
import skincareRoutine from "@/public/images/blogs/harmony-editorial/medical-grade-skincare-routine-sarasota.png";
import revivamask from "@/public/images/blogs/harmony-editorial/revivamask-recovery-mask-sarasota.png";
import rfMicroneedling from "@/public/images/blogs/harmony-editorial/rf-microneedling-vs-co2-laser-sarasota.webp";
import fillerConsult from "@/public/images/blogs/harmony-editorial/sculptra-vs-dermal-fillers-sarasota.webp";
import treatmentPlan from "@/public/images/blogs/harmony-editorial/med-spa-treatment-timeline-before-event-sarasota.webp";
import vipProducts from "@/public/images/blogs/harmony-editorial/vip-ultimate-membership-sarasota.png";
import peptideVirtual from "@/public/images/blogs/harmony-editorial/virtual-peptide-therapy-sarasota.png";
import weightLossProgram from "@/public/images/blogs/harmony-editorial/weight-loss-program-costs-explained.png";
import readingByWindow from "@/public/images/blogs/harmony-editorial/choosing-skin-care-provider-sarasota.png";
// Harmony's own October 2026 office shoot.
import daxxifyTreatment from "@/public/images/office/october-2026/daxxify-treatment-sarasota.jpg";
import injectableTreatment from "@/public/images/office/october-2026/injectable-treatment-provider.jpg";
import ivVials from "@/public/images/office/october-2026/iv-therapy-infusion-vials.jpg";
import ivLounge from "@/public/images/office/october-2026/iv-lounge-recliners.jpg";
import laserRoom from "@/public/images/office/october-2026/laser-treatment-room.jpg";
import laserHairRoom from "@/public/images/office/october-2026/laser-hair-removal-room.jpg";
import skinAnalysis from "@/public/images/office/october-2026/skin-analysis-imaging.jpg";
import storefront from "@/public/images/office/october-2026/harmony-storefront-sunny.jpg";
import hairScalpTreatment from "@/public/images/office/october-2026/hair-restoration-scalp-treatment.jpg";
import weightLossVisit from "@/public/images/office/october-2026/medical-weight-loss-consultation.jpg";
import weightLossInjection from "@/public/images/office/october-2026/weight-loss-injection-visit.jpg";
import bloodPressureCheck from "@/public/images/office/october-2026/wellness-blood-pressure-check.jpg";
import logoWall from "@/public/images/office/october-2026/harmony-lounge-logo-wall.jpg";
import financingDisplay from "@/public/images/office/october-2026/carecredit-financing-display.jpg";
import frontDesk from "@/public/images/office/october-2026/front-desk-reception.jpg";
import retailWall from "@/public/images/office/october-2026/skincare-retail-wall.jpg";
import iplRoom2 from "@/public/images/office/october-2026/ipl-photofacial-treatment-room.jpg";

export type HeroImage = {
  image: StaticImageData;
  /** Short category line shown above the page title. */
  eyebrow: string;
  /** CSS object-position, used when the subject sits off-centre. */
  position?: string;
};

/** Photography behind each page's title band, keyed by route. */
export const HERO_IMAGES: Record<string, HeroImage> = {
  "/about-us": { image: logoWall, eyebrow: "Harmony Med Spa · Sarasota", position: "center 40%" },
  "/before-and-afters": { image: skinAnalysis, eyebrow: "Real patient results", position: "center 45%" },
  "/blog": { image: readingByWindow, eyebrow: "The Harmony journal", position: "center 40%" },
  "/body": { image: laserSuite, eyebrow: "Body treatments", position: "center 42%" },
  "/chemical-peels": { image: treatmentSuite, eyebrow: "Facials + Peels" },
  "/contact-us": { image: storefront, eyebrow: "Gulf Gate · Sarasota, FL", position: "center 45%" },
  "/daxxify": { image: daxxifyTreatment, eyebrow: "Injectables", position: "center 30%" },
  "/dermal-fillers": { image: fillerConsult, eyebrow: "Injectables" },
  "/events": { image: membershipTablet, eyebrow: "Patient center" },
  "/facials": { image: revivamask, eyebrow: "Facials + Peels" },
  "/facials-and-peels": { image: facialRoom, eyebrow: "Facials + Peels" },
  "/fractional-co2-laser-treatments": { image: co2Room, eyebrow: "Lasers + Lights" },
  "/glo2facials": { image: glo2Facial, eyebrow: "Facials + Peels" },
  "/hair-restoration": { image: hairScalpTreatment, eyebrow: "Hair restoration", position: "center 40%" },
  "/hormone-replacement-therapy": { image: bloodPressureCheck, eyebrow: "Wellness", position: "center 45%" },
  "/injectables": { image: injectableTreatment, eyebrow: "Injectables", position: "center 30%" },
  "/ipl-photofacial": { image: iplRoom2, eyebrow: "Lasers + Lights", position: "center 50%" },
  "/iv-therapy": { image: ivVials, eyebrow: "Wellness", position: "center 62%" },
  "/laser-hair-removal": { image: laserHairRoom, eyebrow: "Lasers + Lights", position: "center 55%" },
  "/lasers-and-lights": { image: laserRoom, eyebrow: "Lasers + Lights", position: "center 50%" },
  "/medical-weight-loss": { image: weightLossVisit, eyebrow: "Medical weight loss", position: "center 40%" },
  "/membership": { image: waitingRoom, eyebrow: "Memberships" },
  "/our-team": { image: teamAtDesk, eyebrow: "About Harmony" },
  "/patient-forms": { image: frontDesk, eyebrow: "Patient center", position: "center 60%" },
  "/payment-plans": { image: financingDisplay, eyebrow: "Patient center", position: "center 45%" },
  "/peptide-therapy": { image: peptideVirtual, eyebrow: "Wellness" },
  "/pricing": { image: consultLounge, eyebrow: "2026 treatment pricing" },
  "/rf-microneedling": { image: rfMicroneedling, eyebrow: "Skin resurfacing" },
  "/sculptra": { image: treatmentPlan, eyebrow: "Injectables" },
  "/semaglutide": { image: weightLossInjection, eyebrow: "Medical weight loss", position: "center 45%" },
  "/services": { image: treatmentRoom, eyebrow: "Aesthetic + Wellness" },
  "/shop": { image: vipProducts, eyebrow: "Shop Harmony" },
  "/skincare": { image: skincareRoutine, eyebrow: "Skincare" },
  "/skincare-products": { image: retailWall, eyebrow: "Skincare", position: "center 40%" },
  "/testimonials": { image: consultConversation, eyebrow: "Patient center" },
  "/tirzepatide": { image: weightLossProgram, eyebrow: "Medical weight loss" },
  "/wellness": { image: ivLounge, eyebrow: "Wellness", position: "center 55%" },
};
