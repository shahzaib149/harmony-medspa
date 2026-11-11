import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, BadgeCheck, CalendarDays, Clock3, MapPin, Phone, Plus, Stethoscope } from "lucide-react";
import WeightLossForm from "@/components/landing/WeightLossForm";
import PoweredByCodeSquad from "@/components/layout/PoweredByCodeSquad";
import { ADDRESS_LINE_1, ADDRESS_LINE_2, ONLINE_BOOKING_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import { COMPLIANCE_LINE } from "@/lib/data/novemberOffers";
import { displayFont } from "@/lib/fonts";
import { CountUp, RevealObserver, StickyMobileCTA, TrackedCall } from "./client";
import styles from "./November.module.css";

export const PHONE_HREF = `tel:+1${PHONE_TEL}`;
export const FORM_ID = "consultation";
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=Harmony+Med+Spa+2184+Gulf+Gate+Dr+Sarasota+FL+34231";

export type Tint = "sand" | "blush" | "aqua" | "champagne" | "porcelain";

/** Page frame: slim header (logo, phone, book), footer with address, hours, map and the compliance line. */
export function LandingShell({ tint, children, bookLabel, complianceLine = COMPLIANCE_LINE }: {
  tint: Tint; children: ReactNode; bookLabel: string; complianceLine?: string;
}) {
  return (
    <div className={`${styles.root} ${styles[tint]} ${displayFont.variable}`} data-landing-root>
      <a className={styles.skip} href="#main">Skip to main content</a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.logo} aria-label="Harmony Med Spa, back to top">
            <Image src="/images/logo-transparent.png" alt="Harmony Med Spa" width={150} height={50} priority />
          </a>
          <div className={styles.headerActions}>
            <TrackedCall href={PHONE_HREF} className={styles.headerPhone} placement="header" ariaLabel={`Call ${PHONE_DISPLAY}`}>
              <Phone size={15} aria-hidden="true" /><span>{PHONE_DISPLAY}</span>
            </TrackedCall>
            <a className={styles.headerBook} href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <CalendarDays size={15} aria-hidden="true" /> Book
            </a>
          </div>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <p className={styles.footerLabel}>Visit</p>
            <p>Harmony Med Spa<br />{ADDRESS_LINE_1}<br />{ADDRESS_LINE_2}</p>
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
          </div>
          <div>
            <p className={styles.footerLabel}>Hours</p>
            <p>Monday–Friday<br />9:00am–5:00pm</p>
          </div>
          <div>
            <p className={styles.footerLabel}>Call</p>
            <TrackedCall href={PHONE_HREF} placement="footer">{PHONE_DISPLAY}</TrackedCall>
          </div>
        </div>
        <div className={styles.footerLegal}>
          <p>{complianceLine}</p>
          <p>© {new Date().getFullYear()} Harmony Med Spa. This page is general information, not medical advice.</p>
          <PoweredByCodeSquad className="mt-3" />
        </div>
      </footer>
      <StickyMobileCTA formId={FORM_ID} phoneHref={PHONE_HREF} bookLabel={bookLabel} />
      <RevealObserver />
    </div>
  );
}

export function Hero({ eyebrow, title, sub, badge, primaryLabel, image, imageAlt, form, aside, media, primaryHref }: {
  eyebrow: string; title: string; sub: string; badge: ReactNode; primaryLabel: string;
  image: string; imageAlt: string; form: ReactNode; aside?: ReactNode;
  /** Replaces the single hero photo (e.g. a collage). */
  media?: ReactNode;
  /** Primary button target; defaults to the form. */
  primaryHref?: string;
}) {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={styles.heroMesh} aria-hidden="true" />
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={`${styles.eyebrow} ${styles.rise}`} style={{ animationDelay: "40ms" }}>{eyebrow}</p>
          <h1 id="hero-title" className={styles.heroTitle}>
            {title.split(" ").map((word, index) => (
              <span key={`${word}-${index}`}>
                {index ? " " : null}
                <span className={styles.word} style={{ animationDelay: `${90 + index * 45}ms` }}>{word}</span>
              </span>
            ))}
          </h1>
          <p className={`${styles.heroSub} ${styles.rise}`} style={{ animationDelay: "320ms" }}>{sub}</p>
          <div className={`${styles.badgeRow} ${styles.pop}`} style={{ animationDelay: "480ms" }}>{badge}</div>
          <div className={`${styles.ctaRow} ${styles.rise}`} style={{ animationDelay: "420ms" }}>
            <a className={styles.primaryBtn} href={primaryHref ?? `#${FORM_ID}`}>{primaryLabel} <ArrowRight size={17} aria-hidden="true" /></a>
            <TrackedCall href={PHONE_HREF} className={styles.ghostBtn} placement="hero"><Phone size={16} aria-hidden="true" /> Call {PHONE_DISPLAY}</TrackedCall>
          </div>
          {aside}
        </div>
        <div className={styles.heroForm} id={FORM_ID}>{form}</div>
        <figure className={styles.heroMedia}>
          {media ?? <Image src={image} alt={imageAlt} fill priority sizes="(max-width: 960px) 100vw, 46vw" className={styles.heroImage} />}
        </figure>
      </div>
    </section>
  );
}

export function LeadForm({ source, treatmentInterest, landingUrl, offerCode, heading, subheading, submitLabel, options, acceptInterestEvents, kicker = "November offer · request your visit" }: {
  source: string; treatmentInterest: string; landingUrl: string; offerCode?: string;
  heading: string; subheading: string; submitLabel: string; options?: readonly string[];
  acceptInterestEvents?: boolean; kicker?: string;
}) {
  return (
    <WeightLossForm
      id={`${FORM_ID}-form`}
      variant="soft"
      source={source}
      treatmentInterest={treatmentInterest}
      landingUrl={landingUrl}
      offerCode={offerCode}
      ariaLabel={`${treatmentInterest} consultation request`}
      kicker={kicker}
      heading={heading}
      subheading={subheading}
      submitLabel={submitLabel}
      treatmentOptions={options}
      acceptInterestEvents={acceptInterestEvents}
    />
  );
}

export function TrustStrip() {
  const items = [
    { icon: <Image src="/images/footer/bbb.png" alt="" width={66} height={14} className={styles.bbb} />, title: "BBB A+ Accredited" },
    { icon: <Image src="/images/footer/main.png" alt="" width={30} height={30} />, title: "2024 Best in Business" },
    { icon: <Stethoscope size={20} aria-hidden="true" />, title: "MD & NP-led care" },
    { icon: <MapPin size={20} aria-hidden="true" />, title: "Gulf Gate, Sarasota" },
  ];
  return (
    <section className={styles.trust} aria-label="Why patients choose Harmony">
      <ul className={styles.trustList}>
        {items.map((item, index) => (
          <li key={item.title} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
            <span className={styles.trustIcon}>{item.icon}</span>{item.title}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SectionHead({ eyebrow, title, intro, id }: { eyebrow: string; title: string; intro?: ReactNode; id: string }) {
  return (
    <header className={styles.sectionHead} data-reveal>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </header>
  );
}

export function OfferCard({ label, price, regular, includes, terms, endLabel, ctaLabel }: {
  label: string; price: number; regular?: number; includes: readonly string[]; terms: string; endLabel: string; ctaLabel: string;
}) {
  return (
    <article className={styles.offerCard} data-reveal>
      <div className={styles.offerTop}>
        <p className={styles.offerLabel}>{label}</p>
        <span className={styles.endPill}><Clock3 size={13} aria-hidden="true" /> {endLabel}</span>
      </div>
      <p className={styles.offerPrice}>
        <CountUp value={price} />
        {regular ? <s className={styles.offerRegular}>${regular}</s> : null}
      </p>
      <ul className={styles.checkList}>
        {includes.map((item) => <li key={item}><BadgeCheck size={18} aria-hidden="true" />{item}</li>)}
      </ul>
      <p className={styles.terms}>{terms}</p>
      <a className={styles.primaryBtn} href={`#${FORM_ID}`}>{ctaLabel} <ArrowRight size={17} aria-hidden="true" /></a>
    </article>
  );
}

export function StepTimeline({ steps }: { steps: readonly { title: string; body: string }[] }) {
  return (
    <ol className={steps.length === 3 ? `${styles.timeline} ${styles.timeline3}` : styles.timeline} data-reveal>
      <span className={styles.timelineLine} aria-hidden="true" />
      {steps.map((step, index) => (
        <li key={step.title} className={styles.step} style={{ transitionDelay: `${150 + index * 140}ms` }}>
          <span className={styles.stepNumber}>{index + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

const PROVIDERS = [
  { name: "Dr. Victoria Andarcia, MD", role: "Board-certified internal medicine physician · integrative and hormonal health", image: "/images/providers/Dr._Andarcia_square.jpg" },
  { name: "Jessica Simone, AGNP-C", role: "Board-certified nurse practitioner · aesthetic and integrative medicine", image: "/images/providers/clear_team_1.jpg" },
];

export function Providers({ intro }: { intro: string }) {
  return (
    <section className={styles.section} aria-labelledby="providers-title">
      <SectionHead eyebrow="Your care team" title="Led by a physician and a nurse practitioner" intro={intro} id="providers-title" />
      <div className={styles.providerGrid}>
        {PROVIDERS.map((provider, index) => (
          <article key={provider.name} className={styles.providerCard} data-reveal style={{ transitionDelay: `${index * 90}ms` }}>
            <div className={styles.providerPhoto}>
              <Image src={provider.image} alt={`Portrait of ${provider.name}`} fill sizes="(max-width: 700px) 40vw, 180px" />
            </div>
            <div>
              <h3>{provider.name}</h3>
              <p>{provider.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FAQ({ items, title = "Before your exam" }: { items: readonly { q: string; a: string }[]; title?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <SectionHead eyebrow="Questions" title={title} id="faq-title" />
      <div className={styles.faqList} data-reveal>
        {items.map((item) => (
          <details key={item.q} className={styles.faqItem}>
            <summary>{item.q}<Plus size={18} aria-hidden="true" className={styles.faqIcon} /></summary>
            <div className={styles.faqAnswer}><p>{item.a}</p></div>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </section>
  );
}

export function FinalCta({ title, body, primaryLabel, image, imageAlt }: { title: string; body: string; primaryLabel: string; image: string; imageAlt: string }) {
  return (
    <section className={styles.finalCta} aria-labelledby="final-title">
      <div className={styles.finalInner} data-reveal>
        <div>
          <h2 id="final-title">{title}</h2>
          <p>{body}</p>
          <div className={styles.ctaRow}>
            <a className={styles.primaryBtnLight} href={`#${FORM_ID}`}>{primaryLabel} <ArrowRight size={17} aria-hidden="true" /></a>
            <TrackedCall href={PHONE_HREF} className={styles.ghostBtnLight} placement="final"><Phone size={16} aria-hidden="true" /> {PHONE_DISPLAY}</TrackedCall>
          </div>
          <p className={styles.finalMeta}><MapPin size={14} aria-hidden="true" /> {ADDRESS_LINE_1}, {ADDRESS_LINE_2} · Mon–Fri 9am–5pm</p>
        </div>
        <div className={styles.finalImage}>
          <Image src={image} alt={imageAlt} fill sizes="(max-width: 860px) 100vw, 420px" />
        </div>
      </div>
    </section>
  );
}
