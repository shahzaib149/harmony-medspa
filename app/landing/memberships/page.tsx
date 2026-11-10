import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, Clock3, Sparkles } from "lucide-react";
import {
  FAQ, FinalCta, FORM_ID, Hero, LandingShell, LeadForm, Providers, SectionHead, StepTimeline, TrustStrip,
} from "@/components/landing/november/blocks";
import { CountdownPill, CountUp } from "@/components/landing/november/client";
import styles from "@/components/landing/november/November.module.css";
import { fillerBeforeAfters, fillerOffer, memberships, OFFER_END_LABEL } from "@/lib/data/novemberOffers";

const pageUrl = "/landing/memberships";
const socialImage = "https://www.harmonymedspafl.com/images/office/october-2026/injectable-treatment-provider.jpg";
const lowestMonthly = Math.min(...memberships.map((plan) => plan.monthly));
const offerLine = `$${fillerOffer.discount} off dermal filler for new and current members in November.`;

export const metadata: Metadata = {
  title: "Harmony Memberships in Sarasota, $100 Off Dermal Filler in November",
  description: `Join a Harmony Med Spa membership from $${lowestMonthly}/month and get $${fillerOffer.discount} off dermal filler this November. For new and current members in Sarasota.`,
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Harmony Memberships | $100 Off Dermal Filler in November",
    description: `Memberships from $${lowestMonthly}/month, with $${fillerOffer.discount} off dermal filler for new and current members in November.`,
    url: pageUrl,
    images: [{ url: socialImage, width: 1920, height: 1440, alt: "A provider with a patient in a Harmony Med Spa treatment room" }],
  },
};

const money = (value: number) => `$${value.toLocaleString("en-US")}`;

/** Benefits mirror the main /membership page; prices come from the offers config. */
const PLAN_DETAILS: Record<string, { blurb: string; benefits: string[] }> = {
  "Facial Membership": {
    blurb: "Your Signature Facial every month, with an enhancement each visit.",
    benefits: ["1 monthly facial (60 minutes)", "1 enhancement with every facial", "$10/unit tox while a member", "10% off skincare while a member"],
  },
  "Glo2Facial Membership": {
    blurb: "The advanced Glo2Facial every month, finished with lymphatic massage.",
    benefits: ["1 monthly Glo2Facial (45 minutes)", "Red-light lymphatic massage", "$10/unit tox while a member", "10% off skincare while a member"],
  },
  "VIP Beauty Bank": {
    blurb: "Bank your monthly contribution and save across the menu.",
    benefits: ["1 free vitamin shot every month", "10% off injectables and facials", "10% off medical-grade skincare", "10% off device and laser treatments"],
  },
  "VIP Elite Beauty Bank": {
    blurb: "More banked each month, with deeper device and laser savings.",
    benefits: ["1 free vitamin shot every month", "1 free device or laser treatment per year", "10% off injectables, facials, and skincare", "15% off device and laser treatments"],
  },
  "VIP Ultimate Beauty Bank": {
    blurb: "Our most complete membership, with monthly wellness built in.",
    benefits: ["All VIP Elite benefits", "1 IV and 1 nutraceutical every month", "10% off nutraceuticals", "Quarterly Spectra Scan"],
  },
};

type Plan = { name: string; monthly: number; semiAnnual?: number; annual?: number; blurb: string; benefits: string[] };
const plans: Plan[] = memberships.map((plan) => ({ ...plan, ...PLAN_DETAILS[plan.name] }));
const planGroups = [
  {
    title: "Facial memberships",
    note: "A monthly facial, with member pricing on tox and skincare. Pay monthly, or choose 6 or 12 months.",
    grid: styles.planGrid2,
    plans: plans.filter((plan) => !plan.name.startsWith("VIP")),
  },
  {
    title: "VIP Beauty Bank",
    note: "Your monthly contribution builds up in your Beauty Bank and can be used toward any service or product.",
    grid: styles.planGrid3,
    plans: plans.filter((plan) => plan.name.startsWith("VIP")),
  },
];

const steps = [
  { title: "Join, or use your membership", body: "Pick the membership that fits you. Already a member? You're already eligible this November." },
  { title: "Book your filler consultation", body: "Meet with your provider, talk through your goals, and get a plan that suits your features." },
  { title: `Take $${fillerOffer.discount} off`, body: `Your $${fillerOffer.discount} member savings is applied to your dermal filler treatment in November.` },
];

const areas = [
  { name: "Lips", body: "Soft shape and definition, in proportion with the rest of your face." },
  { name: "Cheeks", body: "Gentle contour through the mid-face for a rested, balanced look." },
  { name: "Chin", body: "Subtle refinement to bring your profile into balance." },
  { name: "Jawline", body: "A cleaner, more defined line that still looks like you." },
];

/** Pixel heights of the 1600px-wide before-and-after files, so each image keeps its own shape. */
const BA_HEIGHTS = [1275, 1578, 995, 1321, 1443, 1354];

const faqs = [
  { q: "Can I cancel?", a: "Ask our team. They will walk you through how cancellation works for the membership you choose before you join." },
  { q: `When can I use the $${fillerOffer.discount}?`, a: `In November. The $${fillerOffer.discount} off dermal filler is for new and current members and is valid through ${OFFER_END_LABEL}. Your provider confirms filler is right for you at your consultation.` },
  { q: "Can I upgrade?", a: "Ask our team. They can go over your options if you'd like to move to a different membership." },
  { q: "Is there a contract?", a: "Facial and Glo2Facial memberships can be paid monthly or as 6 or 12 month options. Ask our team about the terms for the membership you're considering." },
];

export default function MembershipsLandingPage() {
  return (
    <LandingShell tint="champagne" bookLabel="Choose my membership">
      <Hero
        eyebrow="Harmony Memberships"
        title={`Join This Month, Get $${fillerOffer.discount} Off Dermal Filler`}
        sub={`Memberships from $${lowestMonthly}/month, with member savings on treatments all year.`}
        badge={<><span className={styles.badge}>${fillerOffer.discount} Off Filler · Members · Ends Nov 30</span><CountdownPill label="November offer" /></>}
        primaryLabel="Choose My Membership"
        image="/images/office/october-2026/injectable-treatment-provider.jpg"
        imageAlt="A Harmony Med Spa provider with a patient in a treatment room"
        aside={<p className={styles.tagline}>{fillerOffer.tagline}</p>}
        form={(
          <LeadForm
            source="Memberships Landing Page"
            treatmentInterest="Memberships"
            landingUrl={pageUrl}
            offerCode={fillerOffer.offerCode}
            heading="Choose your membership."
            subheading="Share the best way to reach you. Our Sarasota team will call to help you pick a membership and book your filler consultation."
            submitLabel="Request my membership call"
            options={["Memberships", "Not sure — I’d like guidance"]}
          />
        )}
      />

      <TrustStrip />

      <section className={styles.section} aria-labelledby="plans-title">
        <SectionHead
          eyebrow="Compare memberships"
          title="Find the membership that fits you"
          intro={`Every membership comes with member savings all year. This November, each one also comes with $${fillerOffer.discount} off dermal filler.`}
          id="plans-title"
        />
        {planGroups.map((group) => (
          <div key={group.title} className={styles.planGroup}>
            <div className={styles.planGroupHead} data-reveal>
              <h3>{group.title}</h3>
              <p>{group.note}</p>
            </div>
            <ul className={`${styles.planGrid} ${group.grid}`}>
              {group.plans.map((plan, index) => (
                <li key={plan.name} data-reveal style={{ transitionDelay: `${index * 110}ms` }}>
                  <article className={styles.plan}>
                    <h4 className={styles.cardKicker}>{plan.name}</h4>
                    <p className={styles.planPrice}><CountUp value={plan.monthly} /><span className={styles.planPer}>/ month</span></p>
                    {plan.semiAnnual && plan.annual ? (
                      <ul className={styles.planTerms} aria-label="Prepaid options">
                        <li>6 months {money(plan.semiAnnual)}</li>
                        <li>12 months {money(plan.annual)}</li>
                      </ul>
                    ) : null}
                    <p className={styles.planBlurb}>{plan.blurb}</p>
                    <ul className={styles.checkList}>
                      {plan.benefits.map((benefit) => <li key={benefit}><BadgeCheck size={18} aria-hidden="true" />{benefit}</li>)}
                      <li><BadgeCheck size={18} aria-hidden="true" /><strong>${fillerOffer.discount} off dermal filler in November</strong></li>
                    </ul>
                    <a className={`${styles.ghostBtn} ${styles.planCta}`} href={`#${FORM_ID}`} aria-label={`Choose the ${plan.name}`}>Choose this membership <ArrowRight size={16} aria-hidden="true" /></a>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className={styles.plansFoot} data-reveal>
          <p className={styles.note}>Not sure which one fits? Our team will help you choose.</p>
          <Link className={styles.textLink} href="/membership">See full membership details <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>

      <div className={styles.tinted}>
        <section className={styles.section} aria-labelledby="savings-title">
          <div className={styles.savingsLayout}>
            <div className={styles.offerCopy} data-reveal>
              <p className={styles.eyebrow}>November member offer</p>
              <h2 id="savings-title">How your ${fillerOffer.discount} filler savings works</h2>
              <p>{offerLine}</p>
              <p className={styles.tagline}>{fillerOffer.tagline}</p>
            </div>
            <article className={styles.offerCard} data-reveal style={{ transitionDelay: "120ms" }}>
              <div className={styles.offerTop}>
                <p className={styles.offerLabel}>Member filler savings</p>
                <span className={styles.endPill}><Clock3 size={13} aria-hidden="true" /> Ends Nov 30</span>
              </div>
              <p className={styles.offerPrice}><CountUp value={fillerOffer.discount} /><span className={styles.savingsOff}>off dermal filler</span></p>
              <ul className={styles.checkList}>
                <li><BadgeCheck size={18} aria-hidden="true" />For new members who join this month</li>
                <li><BadgeCheck size={18} aria-hidden="true" />For current Harmony members too</li>
                <li><BadgeCheck size={18} aria-hidden="true" />Starts with a filler consultation</li>
              </ul>
              <p className={styles.terms}>{fillerOffer.eligibility}. Treatment eligibility is determined at your consultation. Results vary. Offer valid through {OFFER_END_LABEL}.</p>
              <a className={styles.primaryBtn} href={`#${FORM_ID}`}>Choose My Membership <ArrowRight size={17} aria-hidden="true" /></a>
            </article>
          </div>
          <StepTimeline steps={steps} />
        </section>
      </div>

      <section className={styles.section} aria-labelledby="areas-title">
        <SectionHead
          eyebrow="Dermal filler"
          title="Natural, balanced results"
          intro="Filler at Harmony is about proportion, not a different face. Your provider plans each treatment around your features and your goals."
          id="areas-title"
        />
        <ul className={styles.areaGrid}>
          {areas.map((area, index) => (
            <li key={area.name} data-reveal style={{ transitionDelay: `${index * 90}ms` }}>
              <article className={styles.area}>
                <span className={styles.areaIndex} aria-hidden="true">0{index + 1}</span>
                <h3>{area.name}</h3>
                <p>{area.body}</p>
              </article>
            </li>
          ))}
        </ul>
        <div className={styles.brandRow} data-reveal>
          <span className={styles.brandPill}><Sparkles size={16} aria-hidden="true" /> We use {fillerOffer.brand}</span>
          <Link className={styles.textLink} href="/dermal-fillers">Learn about dermal fillers at Harmony <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>

      {fillerBeforeAfters.consentConfirmed ? (
        <div className={styles.band}>
          <section className={styles.section} aria-labelledby="results-title">
            <SectionHead eyebrow="Before and after" title="Real patients, real results" id="results-title" />
            <div className={styles.baGrid} data-reveal>
              {fillerBeforeAfters.images.map((src, index) => (
                <figure key={src} className={styles.baCard}>
                  <span className={styles.baLabel} aria-hidden="true">Before</span>
                  <span className={`${styles.baLabel} ${styles.baLabelAfter}`} aria-hidden="true">After</span>
                  <Image
                    src={src}
                    alt="Before (left) and after (right) dermal filler, Harmony Med Spa patient"
                    width={1600}
                    height={BA_HEIGHTS[index] ?? 1300}
                    sizes="(max-width: 700px) 88vw, (max-width: 960px) 46vw, 380px"
                  />
                </figure>
              ))}
            </div>
            <p className={styles.baHint} aria-hidden="true">Swipe for more</p>
            <p className={styles.baCaption}>{fillerBeforeAfters.caption}</p>
          </section>
        </div>
      ) : null}

      <Providers intro="Your filler consultation and treatment are with our medical team, led by Dr. Victoria Andarcia and Jessica Simone, AGNP-C." />

      <div className={styles.band}>
        <FAQ items={faqs} title="Before you join" />
      </div>

      <FinalCta
        title={`Join this month and take $${fillerOffer.discount} off filler`}
        body={`${fillerOffer.tagline} Offer ends November 30.`}
        primaryLabel="Choose My Membership"
        image="/images/office/october-2026/harmony-lounge-logo-wall.jpg"
        imageAlt="The Harmony Med Spa lounge in Gulf Gate, Sarasota"
      />
    </LandingShell>
  );
}
