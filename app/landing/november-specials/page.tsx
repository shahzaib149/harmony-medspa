import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Gift } from "lucide-react";
import {
  FAQ, FinalCta, FORM_ID, Hero, LandingShell, LeadForm, Providers, SectionHead, TrustStrip,
} from "@/components/landing/november/blocks";
import { CountdownPill, CountUp } from "@/components/landing/november/client";
import { OfferFinder, Parallax, type FinderGoal } from "@/components/landing/november/specials";
import styles from "@/components/landing/november/November.module.css";
import sp from "@/components/landing/november/Specials.module.css";
import {
  fillerBeforeAfters, fillerOffer, hormoneOffer, ivOffer, laserOffer, memberships, novemberSpecials,
  OFFER_END_LABEL, shotsOffer, skincareGift, SPECIALS_COMPLIANCE_LINE,
} from "@/lib/data/novemberOffers";

const pageUrl = "/landing/november-specials";
const socialImage = "https://www.harmonymedspafl.com/images/office/october-2026/harmony-lounge-logo-wall.jpg";
const lowestMonthly = Math.min(...memberships.filter((plan) => !plan.name.includes("Ultimate")).map((plan) => plan.monthly));
const { interests, links } = novemberSpecials;
/** "Facial $149, VIP Beauty Bank $159, …" from the config (the unconfirmed Ultimate tier is left out). */
const planList = memberships
  .filter((plan) => !plan.name.includes("Ultimate"))
  .sort((a, b) => a.monthly - b.monthly)
  .map((plan) => `${plan.name.replace(" Membership", "").replace("VIP Elite Beauty Bank", "VIP Elite")} $${plan.monthly}`)
  .join(", ");

export const metadata: Metadata = {
  title: "Sarasota Med Spa November Specials",
  description: `November at Harmony Med Spa: $${hormoneOffer.examPrice} hormone exam, $${fillerOffer.discount} off filler for members, ${ivOffer.percentOff}% off IV drips and more. Through Nov 30.`,
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: true },
  openGraph: {
    title: "November Specials | Harmony Med Spa Sarasota",
    description: "This month's offers on hormones, memberships, filler, IV therapy and skin, all through November 30.",
    url: pageUrl,
    images: [{ url: socialImage, width: 1920, height: 1440, alt: "The Harmony Med Spa lounge in Gulf Gate, Sarasota" }],
  },
};

const ICON = { className: sp.offerIcon, viewBox: "0 0 46 46", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": true } as const;
const icons = {
  hormone: <svg {...ICON}><path d="M23 6c6 8 11 13 11 20a11 11 0 0 1-22 0c0-7 5-12 11-20Z" /><path d="M18 27a5 5 0 0 0 5 5" /></svg>,
  filler: <svg {...ICON}><path d="M30 8l8 8M27 11l8 8M33 13L16 30l-5 1 1-5 17-17" /><path d="M11 35l-4 4" /><path d="M20 22l4 4" /></svg>,
  membership: <svg {...ICON}><rect x="6" y="12" width="34" height="22" rx="4" /><path d="M6 19h34" /><path d="M12 28h8" /><circle cx="33" cy="28" r="2.5" /></svg>,
  laser: <svg {...ICON}><path d="M5 16c6-2 12 2 18 0s12-2 18 0" /><path d="M5 26c6-2 12 2 18 0s12-2 18 0" opacity=".6" /><path d="M5 36c6-2 12 2 18 0s12-2 18 0" opacity=".35" /><path d="M14 9v9M23 9v9M32 9v9" /><path d="M19 15v18M28 15v18" /></svg>,
  iv: <svg {...ICON}><rect x="15" y="5" width="16" height="20" rx="3" /><path d="M23 25v6M23 31c0 6-6 6-6 10" /><path d="M19 12h8M19 17h8" /></svg>,
  injections: <svg {...ICON}><rect x="7" y="12" width="8" height="24" rx="2" /><rect x="19" y="12" width="8" height="24" rx="2" /><rect x="31" y="12" width="8" height="24" rx="2" strokeDasharray="3 3" /><path d="M9 8h4M21 8h4M33 8h4" /></svg>,
};

type OfferCardData = {
  key: string; name: string; icon: ReactNode; value: ReactNode; benefit: string; terms: string; href: string; cta: string;
};

const offers: OfferCardData[] = [
  {
    key: "hormone", name: "Hormone exam", icon: icons.hormone,
    value: <><CountUp value={hormoneOffer.examPrice} /><s aria-label={`regular $${hormoneOffer.regularPrice}`}>reg. ${hormoneOffer.regularPrice}</s></>,
    benefit: "Plan + 1 year of follow-ups · New & existing patients",
    terms: `${hormoneOffer.labsNote} Treatment eligibility is determined at your exam.`,
    href: links.hormone, cta: "See the hormone exam",
  },
  {
    key: "filler", name: "Dermal filler", icon: icons.filler,
    value: <><CountUp value={fillerOffer.discount} /><small>off</small></>,
    benefit: `For new and current members · ${fillerOffer.brand}`,
    terms: `${fillerOffer.eligibility}. Your provider confirms filler is right for you.`,
    href: links.memberships, cta: "See member savings",
  },
  {
    key: "memberships", name: "Memberships", icon: icons.membership,
    value: <><small>from</small><CountUp value={lowestMonthly} /><small>/mo</small></>,
    benefit: fillerOffer.tagline,
    terms: `${planList} per month.`,
    href: links.memberships, cta: "Compare memberships",
  },
  {
    key: "laser", name: "RF Microneedling + CO2", icon: icons.laser,
    value: <small style={{ fontFamily: "var(--display)", fontSize: "1.6rem", color: "var(--ink)" }}>{laserOffer.cta}</small>,
    benefit: "Our most advanced skin combo",
    terms: "November combo pricing is being finalized. Ask our team. Results vary.",
    href: links.laser, cta: "Explore the skin combo",
  },
  {
    key: "iv", name: "IV therapy", icon: icons.iv,
    value: <><CountUp value={ivOffer.percentOff} prefix="" /><small>% off IV drips</small></>,
    benefit: "Add-ons not included",
    terms: ivOffer.terms,
    href: links.iv, cta: "See IV drips",
  },
  {
    key: "injections", name: "Vitamin injections", icon: icons.injections,
    value: <span style={{ fontSize: ".8em" }}>{shotsOffer.deal}</span>,
    benefit: "Mix & match · Use on different days · Valid 1 year",
    terms: `Eligible vitamin injections: ${shotsOffer.shots.join(", ")}. ${shotsOffer.terms}`,
    href: links.iv, cta: "See vitamin injections",
  },
];

const goals: FinderGoal[] = [
  {
    id: "refreshed", label: "Look refreshed", interest: interests.filler,
    offer: { title: `$${fillerOffer.discount} off dermal filler`, detail: `For new and current members in November, with ${fillerOffer.brand}. ${fillerOffer.tagline}`, href: links.memberships, linkLabel: "See member savings" },
  },
  {
    id: "smoother", label: "Smoother skin", interest: interests.laser,
    offer: { title: laserOffer.featured, detail: `${laserOffer.positioning} ${laserOffer.cta}.`, href: links.laser, linkLabel: "Explore the skin combo" },
  },
  {
    id: "energized", label: "Feel more energized / balanced", interest: interests.hormone,
    offer: { title: `$${hormoneOffer.examPrice} hormone exam (reg. $${hormoneOffer.regularPrice})`, detail: `Includes your personalized plan and follow-up visits for one year. Prefer a quick boost? IV drips are ${ivOffer.percentOff}% off (add-ons not included).`, href: links.hormone, linkLabel: "See the hormone exam" },
  },
  {
    id: "lips", label: "Fuller lips or contour", interest: interests.filler,
    offer: { title: `$${fillerOffer.discount} off dermal filler`, detail: `For new and current members in November, with ${fillerOffer.brand}. Your provider will plan a natural-looking result with you.`, href: links.memberships, linkLabel: "See member savings" },
  },
];

const services = [
  { label: "Dermal Fillers (RHA®)", href: "/dermal-fillers" },
  { label: "Sculptra", href: "/sculptra" },
  { label: "RF Microneedling", href: "/rf-microneedling" },
  { label: "Fractional CO2", href: "/fractional-co2-laser-treatments" },
  { label: "IPL Photofacial", href: "/ipl-photofacial" },
  { label: "Laser Hair Removal", href: "/laser-hair-removal" },
  { label: "Glo2Facial", href: "/glo2facials" },
  { label: "Chemical Peels", href: "/chemical-peels" },
  { label: "IV Therapy", href: "/iv-therapy" },
  { label: "Vitamin Injections", href: "/iv-therapy" },
  { label: "Hormone Optimization", href: "/hormone-replacement-therapy" },
];

/** Real, named reviews from /testimonials, unedited (first name + last initial). */
const reviews = [
  { author: "Ariel F.", quote: "I've been to a few Med Spas in Sarasota, and Jessica is absolutely the best. She truly cares about providing exceptional service and I am thrilled to have finally found a practitioner I can trust. Her staff is fantastic and I couldn't be happier with my decision." },
  { author: "Wanda A.", quote: "I absolutely love Harmony Med Spa! The staff is friendly, kind, professional and attentive. The ambiance is welcoming and beautiful. Jessica is very knowledgeable and explains everything in detail and honestly. I highly recommend them." },
  { author: "Michael L.", quote: "Absolutely amazing services! The staff is always wonderful and so kind. I was very impressed with Jessica and her team's ability to get to the root cause of issues, which you'll find is a very rare thing these days! They are masters of their craft and show great integrity. For this reason, I would never go anywhere else!" },
];

const BA_HEIGHTS = [1275, 1578, 995, 1321, 1443, 1354];

const faqs = [
  { q: "Can I combine November offers?", a: "Offers cannot be combined unless stated. Ask our team which offer fits you best." },
  { q: `Who can get the $${hormoneOffer.examPrice} hormone exam?`, a: `New and existing patients. It includes your personalized treatment plan and follow-up visits for one year. ${hormoneOffer.labsNote}` },
  { q: `Who gets $${fillerOffer.discount} off filler?`, a: `New and current members, in November. ${fillerOffer.tagline}` },
  { q: "Does the IV discount include add-ons?", a: ivOffer.terms },
  { q: "When do the offers end?", a: `All November offers are valid through ${OFFER_END_LABEL}.` },
];

const formOptions = [
  interests.unsure, interests.hormone, interests.filler, interests.memberships, interests.laser, interests.iv, interests.shots,
];

export default function NovemberSpecialsLandingPage() {
  return (
    <LandingShell tint="champagne" bookLabel="Book a visit" complianceLine={SPECIALS_COMPLIANCE_LINE}>
      <Hero
        eyebrow="November at Harmony Med Spa"
        title="Sarasota's MD & NP-Led Med Spa"
        sub="This month's offers on hormones, memberships, filler, IV therapy and skin, all through November 30."
        badge={<CountdownPill label="November specials are live" />}
        primaryLabel="See This Month's Offers"
        primaryHref="#offers"
        image="/images/office/october-2026/harmony-lounge-logo-wall.jpg"
        imageAlt="The Harmony Med Spa lounge"
        media={(
          <div className={sp.collage}>
            <Parallax className={sp.collageMain} speed={0.03}>
              <Image src="/images/office/october-2026/harmony-lounge-logo-wall.jpg" alt="The Harmony Med Spa lounge with the clinic logo wall" fill priority sizes="(max-width: 960px) 78vw, 36vw" />
            </Parallax>
            <Parallax className={sp.collageSide} speed={0.06}>
              <Image src="/images/office/october-2026/iv-lounge-recliners.jpg" alt="Recliners in the Harmony IV lounge" fill sizes="(max-width: 960px) 38vw, 18vw" />
            </Parallax>
            <Parallax className={sp.collageSmall} speed={0.09}>
              <Image src="/images/office/october-2026/harmony-storefront-sunny.jpg" alt="The Harmony Med Spa storefront in Gulf Gate, Sarasota" fill sizes="(max-width: 960px) 36vw, 17vw" />
            </Parallax>
          </div>
        )}
        form={(
          <LeadForm
            source={novemberSpecials.source}
            treatmentInterest={interests.unsure}
            landingUrl={pageUrl}
            offerCode={novemberSpecials.offerCode}
            kicker="November specials · request your visit"
            heading="Claim a November offer."
            subheading="Tell us what you're interested in. Our Sarasota team will call to book your visit."
            submitLabel="Request my visit"
            options={formOptions}
            acceptInterestEvents
          />
        )}
      />

      <TrustStrip />

      <section className={styles.section} id="offers" aria-labelledby="offers-title" style={{ scrollMarginTop: 80 }}>
        <SectionHead eyebrow="The November edit" title="This month's offers" intro={`Six ways to save, all valid through ${OFFER_END_LABEL}. Terms are listed on each offer.`} id="offers-title" />
        <ul className={sp.offerGrid}>
          {offers.map((offer, index) => (
            <li key={offer.key} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
              <article className={sp.offer} aria-labelledby={`offer-${offer.key}`}>
                {offer.icon}
                <h3 id={`offer-${offer.key}`} className={sp.offerName}>{offer.name}</h3>
                <p className={sp.offerValue}>{offer.value}</p>
                <p className={sp.offerBenefit}>{offer.benefit}</p>
                <p className={sp.offerTerms}>{offer.terms}</p>
                <Link className={sp.offerCta} href={offer.href}>{offer.cta} <ArrowRight size={16} aria-hidden="true" /></Link>
              </article>
            </li>
          ))}
        </ul>
        <div className={sp.giftBand} data-reveal>
          <p><Gift size={18} aria-hidden="true" /><strong>${skincareGift.value} skincare gift</strong>: ask in clinic for details.</p>
          <a className={styles.textLink} style={{ marginTop: 0, minHeight: 44 }} href={`#${FORM_ID}`}>Ask our team <ArrowRight size={15} aria-hidden="true" /></a>
        </div>
      </section>

      <div className={styles.tinted}>
        <section className={styles.section} aria-labelledby="finder-title">
          <SectionHead eyebrow="Offer finder" title="Not sure where to start?" intro="Two quick questions. Nothing is saved; we just point you to the right offer." id="finder-title" />
          <OfferFinder
            goals={goals}
            formId={FORM_ID}
            consultTitle="A November consultation"
            consultDetail="Meet our team, talk through your goals, and hear which November offer fits you, with no pressure to decide on the day."
          />
        </section>
      </div>

      <section className={styles.section} aria-labelledby="services-title">
        <SectionHead eyebrow="Everything we offer" title="Our services" id="services-title" />
        <ul className={sp.serviceGrid} data-reveal>
          {services.map((service) => (
            <li key={service.label}><Link href={service.href}>{service.label} <ArrowUpRight size={15} aria-hidden="true" /></Link></li>
          ))}
        </ul>
      </section>

      {fillerBeforeAfters.consentConfirmed ? (
        <div className={styles.band}>
          <section className={styles.section} aria-labelledby="results-title">
            <SectionHead eyebrow="Before and after" title="Real RHA® filler results" id="results-title" />
            <div className={styles.baGrid} data-reveal>
              {fillerBeforeAfters.images.map((src, index) => (
                <figure key={src} className={styles.baCard}>
                  <span className={styles.baLabel} aria-hidden="true">Before</span>
                  <span className={`${styles.baLabel} ${styles.baLabelAfter}`} aria-hidden="true">After</span>
                  <Image src={src} alt="Before (left) and after (right) dermal filler, Harmony Med Spa patient" width={1600} height={BA_HEIGHTS[index] ?? 1300} sizes="(max-width: 700px) 88vw, (max-width: 960px) 46vw, 380px" />
                </figure>
              ))}
            </div>
            <p className={styles.baHint} aria-hidden="true">Swipe for more</p>
            <p className={styles.baCaption}>Real Harmony patients. Results vary.</p>
          </section>
        </div>
      ) : null}

      <section className={styles.section} aria-labelledby="reviews-title">
        <SectionHead eyebrow="Patient reviews" title="What patients say" id="reviews-title" />
        <ul className={sp.reviewGrid}>
          {reviews.map((review, index) => (
            <li key={review.author} data-reveal style={{ transitionDelay: `${index * 90}ms` }}>
              <figure className={sp.review}>
                <span className={sp.stars} aria-hidden="true">★★★★★</span>
                <blockquote>“{review.quote}”</blockquote>
                <figcaption>{review.author}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.band}>
        <Providers intro="Dr. Victoria Andarcia, MD brings integrative and hormonal health expertise; Jessica Simone, AGNP-C leads aesthetic and wellness care." />
      </div>

      <FAQ items={faqs} title="About November offers" />

      <FinalCta
        title="Visit us in Gulf Gate"
        body="Harmony Med Spa is open Monday–Friday, 9:00am–5:00pm. Book online, call, or request a visit and we'll call you."
        primaryLabel="Request my visit"
        image="/images/office/october-2026/harmony-storefront-sunny.jpg"
        imageAlt="The Harmony Med Spa storefront in Gulf Gate, Sarasota"
      />
    </LandingShell>
  );
}
