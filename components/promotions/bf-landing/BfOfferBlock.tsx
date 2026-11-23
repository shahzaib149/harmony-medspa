import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import { BF_RESERVE_ID, GLO2_SINGLE_REGULAR, formatUsd, offerById } from "@/lib/data/blackFriday2026";
import { displayFont } from "@/lib/fonts";
import { PhaseScope, noir } from "@/components/promotions/noir/NoirParts";
import { BfCta, BfReserveSection } from "./client";
import styles from "./BfLanding.module.css";

export type BfVariant = "glo2facial" | "medspa" | "home";

const glo2 = offerById("glo2facial");
const glo2Price = glo2.nonmember ?? 499;
const glo2Regular = GLO2_SINGLE_REGULAR * 4;
const glo2Save = glo2Regular - glo2Price;
const usd = (n: number) => formatUsd(n).replace(/\.00$/, "");

// Every figure comes from lib/data/blackFriday2026.ts: devices 20% / 30% off, RHA 2nd syringe 50% off, Glo2Facial 4-pack.
const BROAD_SUB = `Up to 30% off laser & skin packages · 2nd filler syringe 50% off · 4 Glo2Facials ${usd(glo2Price)}`;

const COPY: Record<BfVariant, { eyebrow: string; title: string; sub: string; cta: string; href: string; fine: string }> = {
  glo2facial: {
    eyebrow: "Black Friday at Harmony",
    title: `4 Glo2Facials for ${usd(glo2Price)}`,
    sub: `Regularly ${usd(GLO2_SINGLE_REGULAR)} each (${usd(glo2Regular)}). Save ${usd(glo2Save)}.`,
    cta: "Reserve This Offer",
    href: `#${BF_RESERVE_ID}`,
    fine: "One 4-pack per patient · Full prepayment · Use within 365 days",
  },
  medspa: {
    eyebrow: "Black Friday Beauty Event",
    title: "Our Biggest Savings of the Year",
    sub: BROAD_SUB,
    cta: "See Black Friday Pricing",
    href: "/black-friday",
    fine: "Prepay during the sale · Treat within 365 days · Provider approval required",
  },
  home: {
    eyebrow: "Black Friday Beauty Event",
    title: "Black Friday at Harmony",
    sub: BROAD_SUB,
    cta: "See Black Friday Pricing",
    href: "/black-friday",
    fine: "Prepay during the sale · Treat within 365 days",
  },
};

/**
 * Compact Black Friday hero for ad landing pages. Server-rendered for every phase; the
 * PhaseScope script picks the phase before first paint, so nothing shifts or flashes.
 * In the "ended" phase the whole block is display:none and the page looks as before.
 */
export default function BfOfferBlock({ variant, callbackHref }: {
  variant: BfVariant;
  /** Adds a slim "Prefer a call back? Reserve below" line pointing at the page's own form. */
  callbackHref?: string;
}) {
  const copy = COPY[variant];
  return (
    <PhaseScope as="box">
      <section className={`${noir.noir} ${noir.grain} ${displayFont.variable} ${styles.block} ${variant === "home" ? styles.underFixedHeader : ""}`} data-bf-show="pre early public" aria-labelledby={`bf-offer-${variant}`}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 id={`bf-offer-${variant}`} className={`${noir.display} ${styles.title}`}><span className={noir.foil}>{copy.title}</span></h2>
          <p className={styles.sub}>{copy.sub}</p>
          <p className={styles.phase}>
            <span className={styles.dot} aria-hidden="true" />
            <span data-bf-show="pre">Member early access opens November 23 · Public sale November 27–30</span>
            <span data-bf-show="early">Members: available now · Everyone: November 27–30. <strong>Request now to reserve your price.</strong></span>
            <span data-bf-show="public">On sale now through November 30</span>
          </p>
          <div className={styles.actions}>
            <a className={`${noir.btnPrimary} ${styles.btn}`} href={`tel:+1${PHONE_TEL}`}>
              <Phone size={17} aria-hidden="true" /> Call {PHONE_DISPLAY}
            </a>
            <BfCta href={copy.href} variant={variant} className={`${noir.btnSecondary} ${styles.btn}`}>{copy.cta}</BfCta>
          </div>
          <p className={styles.fine}>{copy.fine}</p>
        </div>
        {callbackHref ? (
          <p className={styles.callback}>
            Prefer a call back? <BfCta href={callbackHref} variant={`${variant}_callback`} className={styles.callbackLink}>Reserve below <span aria-hidden="true">↓</span></BfCta>
          </p>
        ) : null}
      </section>
    </PhaseScope>
  );
}

/**
 * Offer block + Reserve form directly under a page header (/glo2facials). The wrapper
 * carries the phase, so after Nov 30 globals.css lets the header float over the old hero
 * again exactly as before (see "bf-lead" there).
 */
export function BfLead({ variant, treatment }: { variant: BfVariant; treatment: "Glo2Facial" | null }) {
  return (
    <PhaseScope as="box" className="bf-lead">
      <BfOfferBlock variant={variant} />
      <BfReserve treatment={treatment} />
    </PhaseScope>
  );
}

/** The Reserve form band (#bf-reserve), hidden after Nov 30 like the offer block. */
export function BfReserve({ treatment }: { treatment: "Glo2Facial" | null }) {
  return (
    <PhaseScope as="box">
      <div data-bf-show="pre early public"><BfReserveSection treatment={treatment} /></div>
    </PhaseScope>
  );
}

/** One gold line for an existing price list; hidden after Nov 30. */
export function BfPriceNote({ children, href = `#${BF_RESERVE_ID}` }: { children: React.ReactNode; href?: string }) {
  return (
    <PhaseScope>
      <p className={styles.priceNote} data-bf-show="pre early public"><a href={href}>{children}</a></p>
    </PhaseScope>
  );
}
