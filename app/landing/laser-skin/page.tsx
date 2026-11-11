import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Images, Info, Stethoscope } from "lucide-react";
import {
  FAQ, FinalCta, Hero, LandingShell, LeadForm, Providers, SectionHead, StepTimeline,
} from "@/components/landing/november/blocks";
import { CountdownPill } from "@/components/landing/november/client";
import SkinPlan from "@/components/landing/november/SkinPlan";
import styles from "@/components/landing/november/November.module.css";
import laser from "@/components/landing/november/Laser.module.css";
import { formatPrice, LASER_COMPLIANCE_LINE, laserOffer } from "@/lib/data/novemberOffers";

const pageUrl = "/landing/laser-skin";
const socialImage = "https://www.harmonymedspafl.com/images/office/october-2026/laser-treatment-room.jpg";

export const metadata: Metadata = {
  title: "RF Microneedling + CO2 Laser in Sarasota",
  description: "RF microneedling and fractional CO2 in one plan for wrinkles, texture and dark spots. MD & NP-led care in Sarasota. Ask about November combo pricing.",
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: true },
  openGraph: {
    title: "RF Microneedling + Fractional CO2 | Harmony Med Spa Sarasota",
    description: "Our most advanced skin combination for wrinkles, texture and hyperpigmentation, matched to your skin.",
    url: pageUrl,
    images: [{ url: socialImage, width: 1920, height: 1440, alt: "A laser treatment room at Harmony Med Spa in Sarasota" }],
  },
};

const why = [
  {
    title: "One plan for surface and depth",
    body: "CO2 works on the outer layers while RF microneedling works deeper, so texture, tone and firmness are planned together instead of one at a time.",
    icon: (
      <svg viewBox="0 0 44 44" className={laser.whyIcon} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 12c6-2 12 2 18 0s12-2 18 0" /><path d="M4 22c6-2 12 2 18 0s12-2 18 0" opacity=".6" /><path d="M4 32c6-2 12 2 18 0s12-2 18 0" opacity=".35" />
        <path d="M14 8v8M22 8v8M30 8v8" /><path d="M18 14v18M26 14v18" /><circle cx="18" cy="33" r="2" /><circle cx="26" cy="33" r="2" />
      </svg>
    ),
  },
  {
    title: "Fewer guesses",
    body: "Your plan is personalized at your consultation, after a skin assessment with our team, not picked from a menu.",
    icon: (
      <svg viewBox="0 0 44 44" className={laser.whyIcon} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="20" cy="20" r="12" /><path d="M29 29l9 9" /><path d="M14 20c2-4 10-4 12 0" /><circle cx="20" cy="22" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Built around your downtime",
    body: "We plan the timing with you, so your treatment fits your calendar, your events and how much recovery time you have.",
    icon: (
      <svg viewBox="0 0 44 44" className={laser.whyIcon} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="9" width="32" height="28" rx="4" /><path d="M6 17h32M14 5v8M30 5v8" /><path d="M15 26l4 4 9-9" />
      </svg>
    ),
  },
];

const steps = [
  { title: "Consultation & skin assessment", body: "We look at your skin, talk through your goals, and check the combination is right for you." },
  { title: "Your personalized plan", body: "Which treatments, in what order, and how many. We'll go over timing and downtime at your consultation." },
  { title: "Treatment day", body: "Your provider walks you through each step and how to care for your skin afterward." },
  { title: "Recovery & follow-up", body: "We check in on your progress and adjust the plan if needed." },
];

const alsoOffered = [
  { label: "IPL Photofacial", href: "/ipl-photofacial" },
  { label: "Laser Hair Removal", href: "/laser-hair-removal" },
  { label: "Glo2Facial", href: "/glo2facials" },
  { label: "Chemical Peels", href: "/chemical-peels" },
];

const CONSULT = "We'll go over this at your consultation.";
const faqs = [
  { q: "Is the combination right for my skin?", a: `It depends on your skin and your goals. ${CONSULT} Treatment eligibility is determined by your provider.` },
  { q: "How much downtime should I plan for?", a: `Downtime varies with your plan and your skin. ${CONSULT}` },
  { q: "How many sessions will I need?", a: `It depends on your goals and how your skin responds. ${CONSULT}` },
  { q: "Does it hurt?", a: `Comfort varies from person to person. ${CONSULT}` },
  { q: "What does it cost?", a: "Packages are available, including a 3-treatment Fractional CO2 face package. November combo pricing is still being finalized, so ask our team for current pricing." },
  { q: "Can I combine it with other treatments?", a: `Often, yes. ${CONSULT}` },
];

export default function LaserSkinLandingPage() {
  const packagePrice = laserOffer.co2PackageConfirmed && laserOffer.co2PackagePrice ? formatPrice(laserOffer.co2PackagePrice) : null;
  return (
    <LandingShell tint="porcelain" bookLabel="Book a skin consult" complianceLine={LASER_COMPLIANCE_LINE}>
      <Hero
        eyebrow="RF Microneedling + Fractional CO2 · Sarasota"
        title="Turn Back Signs of Aging With RF Microneedling + CO2"
        sub="Our most advanced combination for wrinkles, texture and hyperpigmentation, matched to your skin."
        badge={<><span className={styles.badge}>November: ask about combo pricing</span><CountdownPill label="November offers" /></>}
        primaryLabel="Book a Skin Consultation"
        image="/images/office/october-2026/laser-treatment-room.jpg"
        imageAlt="A Harmony Med Spa laser treatment room with a treatment chair and laser devices"
        aside={(
          <ul className={laser.trustLinks} aria-label="Why patients choose Harmony">
            <li><BadgeCheck size={16} aria-hidden="true" /> BBB A+ Accredited</li>
            <li><BadgeCheck size={16} aria-hidden="true" /> 2024 Best in Business</li>
            <li><Stethoscope size={16} aria-hidden="true" /> MD &amp; NP-led</li>
            <li><Images size={16} aria-hidden="true" /> <Link href="/before-and-afters">See real before &amp; afters</Link></li>
          </ul>
        )}
        form={(
          <LeadForm
            source={laserOffer.source}
            treatmentInterest={laserOffer.treatmentInterest}
            landingUrl={pageUrl}
            offerCode={laserOffer.offerCode}
            kicker="Skin consultation · November"
            heading="Ask about November pricing."
            subheading="Share the best way to reach you. Our Sarasota team will call to book your skin consultation."
            submitLabel="Book my skin consultation"
            options={[laserOffer.treatmentInterest, "RF Microneedling", "Fractional CO2 Laser", "Not sure — I’d like guidance"]}
          />
        )}
      />

      <div className={styles.tinted}>
        <SkinPlan />
      </div>

      <section className={styles.section} aria-labelledby="why-title">
        <SectionHead eyebrow="Why the combination" title="Two treatments, planned as one" id="why-title" />
        <div className={laser.whyGrid}>
          {why.map((item, index) => (
            <article key={item.title} className={laser.whyCard} data-reveal style={{ transitionDelay: `${index * 90}ms` }}>
              {item.icon}
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <div className={styles.band}>
        <section className={styles.section} aria-labelledby="steps-title">
          <SectionHead eyebrow="What to expect" title="From consultation to follow-up" id="steps-title" />
          <StepTimeline steps={steps} />
        </section>
      </div>

      <section className={styles.section} aria-labelledby="results-title">
        <SectionHead eyebrow="Results" title="See real Harmony results" id="results-title" />
        <div className={laser.galleryCard} data-reveal>
          <div>
            <h3>See real results in our gallery</h3>
            <p>Browse before-and-after photos from our patients.</p>
            <p className={laser.galleryCaption}>Real Harmony patients. Results vary.</p>
          </div>
          <Link className={styles.primaryBtn} href="/before-and-afters">View the gallery <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>

        <div className={laser.pricingNote} data-reveal>
          <Info size={20} aria-hidden="true" style={{ color: "var(--gold)", marginTop: 3 }} />
          <p>
            <strong>Packages available</strong>, including a 3-treatment Fractional CO2 face package
            {packagePrice ? ` (${packagePrice})` : ""}. November combo pricing: ask our team.
          </p>
        </div>

        <div style={{ marginTop: "2.4rem" }} data-reveal>
          <p className={laser.alsoLabel}>Also offered</p>
          <ul className={laser.alsoRow}>
            {alsoOffered.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label} <ArrowUpRight size={14} aria-hidden="true" /></Link></li>
            ))}
          </ul>
        </div>
      </section>

      <div className={styles.band}>
        <Providers intro="Dr. Victoria Andarcia, MD and Jessica Simone, AGNP-C lead care at Harmony. Your consultation and plan are provider-guided." />
      </div>

      <FAQ items={faqs} title="Before your consultation" />

      <FinalCta
        title="Plan your skin, surface and depth"
        body="Start with a skin consultation. We'll match the plan to your skin and ask about November combo pricing with you."
        primaryLabel="Book a Skin Consultation"
        image="/images/office/october-2026/harmony-storefront-sunny.jpg"
        imageAlt="The Harmony Med Spa storefront in Gulf Gate, Sarasota"
      />
    </LandingShell>
  );
}
