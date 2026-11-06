import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  FAQ, FinalCta, Hero, LandingShell, LeadForm, OfferCard, Providers, SectionHead, StepTimeline, TrustStrip,
} from "@/components/landing/november/blocks";
import { CountdownPill } from "@/components/landing/november/client";
import styles from "@/components/landing/november/November.module.css";
import { hormoneOffer, OFFER_END_LABEL } from "@/lib/data/novemberOffers";

const pageUrl = "/landing/hormone-optimization";
const socialImage = "https://www.harmonymedspafl.com/images/office/october-2026/wellness-blood-pressure-check.jpg";

export const metadata: Metadata = {
  title: "Hormone Optimization Exam in Sarasota, $150 This November",
  description: "Start hormone optimization at Harmony Med Spa in Sarasota with a $150 exam this November, including a personalized plan and 12 months of follow-up visits.",
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Hormone Optimization Exam in Sarasota | Harmony Med Spa",
    description: "A $150 hormone exam this November, with a personalized plan and 12 months of follow-up visits.",
    url: pageUrl,
    images: [{ url: socialImage, width: 1920, height: 1440, alt: "A patient's wellness check at Harmony Med Spa in Sarasota" }],
  },
};

const HEROES = {
  default: {
    title: "Feel Like Yourself Again",
    sub: `Your hormone exam is now $${hormoneOffer.examPrice}, 50% off, with 12 months of follow-ups included.`,
  },
  menopause: {
    title: "Menopause & Perimenopause Support in Sarasota",
    sub: `Hot flashes, poor sleep, low energy or mood changes? Start with a $${hormoneOffer.examPrice} hormone exam and a plan built around your labs.`,
  },
} as const;

const symptoms = ["Low energy", "Poor sleep", "Mood swings", "Hot flashes & night sweats", "Brain fog", "Low drive", "Weight that won't shift"];

const steps = [
  { title: "Exam with our provider", body: "A full hormone consultation and a physical exam with our Nurse Practitioner." },
  { title: "Lab work", body: "Labs show what is actually happening with your hormones. Lab fees are billed separately." },
  { title: "Your personalized plan", body: "A plan built around your symptoms, your results, and your goals." },
  { title: "Follow-ups for 12 months", body: "In-office and virtual visits all year, so your plan can be adjusted as you go." },
];

const faqs = [
  { q: `Are labs included in the $${hormoneOffer.examPrice}?`, a: "No. Lab work, medications, and pellet procedures are billed separately. Our team will go over lab pricing before anything is ordered." },
  { q: "Is hormone therapy covered by insurance?", a: "Coverage depends on your plan. Ask our team and we will tell you what to expect before your exam." },
  { q: "How soon might I notice a difference?", a: "It varies from person to person. Your provider will talk you through what to expect for your plan at your exam." },
  { q: "Pellets, creams or injections: what's the difference?", a: "They are different ways of delivering hormones. Pellets are placed under the skin and release hormones gradually over several months; creams are applied regularly; injections are given on a schedule. Your provider will explain which options fit you." },
  { q: "Do you offer virtual follow-ups?", a: "Yes. The 12 months of follow-up visits included with your exam can be in office or virtual." },
  { q: "Who is a good candidate?", a: "Adults with symptoms such as low energy, poor sleep, mood changes, hot flashes, or low drive. Hormone therapy isn't right for everyone; your exam determines whether it is appropriate for you." },
];

export default async function HormoneOptimizationLandingPage({ searchParams }: { searchParams: Promise<{ focus?: string | string[] }> }) {
  const { focus } = await searchParams;
  const hero = focus === "menopause" ? HEROES.menopause : HEROES.default;
  const regular = hormoneOffer.regularPriceConfirmed ? hormoneOffer.regularPrice : undefined;

  return (
    <LandingShell tint="sand" bookLabel={`Book my $${hormoneOffer.examPrice} exam`}>
      <Hero
        eyebrow="Hormone Optimization · Sarasota"
        title={hero.title}
        sub={hero.sub}
        badge={<><span className={styles.badge}>November offer · 50% off</span><CountdownPill /></>}
        primaryLabel={`Book My $${hormoneOffer.examPrice} Exam`}
        image="/images/office/october-2026/wellness-blood-pressure-check.jpg"
        imageAlt="A patient relaxing during a wellness check in a Harmony Med Spa treatment room"
        form={(
          <LeadForm
            source="Hormone Optimization Landing Page"
            treatmentInterest={hormoneOffer.treatmentInterest}
            landingUrl={pageUrl}
            offerCode={hormoneOffer.offerCode}
            heading={`Request your $${hormoneOffer.examPrice} exam.`}
            subheading="Share the best way to reach you. Our Sarasota team will call to schedule your visit."
            submitLabel={`Request my $${hormoneOffer.examPrice} exam`}
            options={[hormoneOffer.treatmentInterest, "Not sure — I’d like guidance"]}
          />
        )}
      />

      <TrustStrip />

      <section className={styles.section} aria-labelledby="symptoms-title">
        <SectionHead eyebrow="Does this sound familiar?" title="Symptoms worth a closer look" id="symptoms-title" />
        <ul className={styles.chips} data-reveal>
          {symptoms.map((symptom) => <li key={symptom}>{symptom}</li>)}
        </ul>
        <p className={styles.note}>These can have many causes. Your exam helps find yours.</p>
      </section>

      <div className={styles.tinted}>
        <section className={styles.section} aria-labelledby="offer-title">
          <div className={styles.offerLayout}>
            <div className={styles.offerCopy} data-reveal>
              <p className={styles.eyebrow}>November offer</p>
              <h2 id="offer-title">Your ${hormoneOffer.examPrice} exam includes a full year of care</h2>
              <p>This is more than a discounted consultation. Your exam starts a year of provider-guided care, with follow-up visits included so your plan can change as you do.</p>
            </div>
            <OfferCard
              label="Hormone Optimization Exam"
              price={hormoneOffer.examPrice}
              regular={regular}
              includes={hormoneOffer.includes}
              terms={`${hormoneOffer.labsNote} Treatment eligibility is determined by your provider. Offer valid through ${OFFER_END_LABEL}.`}
              endLabel="Ends Nov 30"
              ctaLabel={`Book My $${hormoneOffer.examPrice} Exam`}
            />
          </div>
        </section>
      </div>

      <section className={styles.section} aria-labelledby="steps-title">
        <SectionHead eyebrow="How it works" title="Four steps, one provider-guided plan" id="steps-title" />
        <StepTimeline steps={steps} />
      </section>

      <div className={styles.band}>
        <section className={styles.section} aria-labelledby="who-title">
          <SectionHead eyebrow="Care for women and men" title="Hormone care at every stage" id="who-title" />
          <div className={styles.twoUp}>
            <article className={styles.card} data-reveal>
              <p className={styles.cardKicker}>For women</p>
              <h3>Perimenopause, menopause, and balance</h3>
              <ul>
                <li>Perimenopause and menopause symptoms</li>
                <li>Sleep, mood, and energy changes</li>
                <li>Overall hormone balance</li>
              </ul>
            </article>
            <article className={styles.card} data-reveal style={{ transitionDelay: "90ms" }}>
              <p className={styles.cardKicker}>For men</p>
              <h3>Energy, drive, and age-related change</h3>
              <ul>
                <li>Low energy and motivation</li>
                <li>Low drive</li>
                <li>Age-related hormone changes</li>
              </ul>
            </article>
          </div>
        </section>
      </div>

      <section className={styles.section} aria-labelledby="bio-title">
        <div className={styles.split}>
          <div data-reveal>
            <p className={styles.eyebrow}>Bioidentical options</p>
            <h2 id="bio-title">Bioidentical hormone therapy, tailored to your labs</h2>
            <p className={styles.intro}>Bioidentical hormones are designed to match the structure of the hormones your body makes. Harmony is a certified EvexiPEL provider, offering hormone pellet therapy for patients whose exam shows it may be a fit.</p>
            <Link className={styles.textLink} href="/hormone-replacement-therapy">Learn about hormone therapy at Harmony <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className={styles.splitImage} data-reveal>
            <Image src="/images/office/october-2026/harmony-lounge-logo-wall.jpg" alt="The Harmony Med Spa lounge in Gulf Gate, Sarasota" fill sizes="(max-width: 960px) 100vw, 560px" />
          </div>
        </div>
      </section>

      <div className={styles.band}>
        <Providers intro="Dr. Victoria Andarcia brings integrative and hormonal health expertise; Jessica Simone, AGNP-C, leads your exam and follow-up care." />
      </div>

      <FAQ items={faqs} />

      <FinalCta
        title="Start feeling like yourself again"
        body={`Your $${hormoneOffer.examPrice} exam includes a personalized plan and 12 months of follow-up visits. Offer ends November 30.`}
        primaryLabel={`Book My $${hormoneOffer.examPrice} Exam`}
        image="/images/office/october-2026/harmony-storefront-sunny.jpg"
        imageAlt="The Harmony Med Spa storefront in Gulf Gate, Sarasota"
      />
    </LandingShell>
  );
}
