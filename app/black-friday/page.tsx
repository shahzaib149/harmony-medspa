import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import MobileCallBar from "@/components/ui/MobileCallBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { CountUp } from "@/components/landing/november/client";
import { GiftCardArt, GoldRule, OfferImage, PhaseScope, noir } from "@/components/promotions/noir/NoirParts";
import {
  BlackFridayLeadForm, CategoryNav, DeviceExplorer, OfferActions, PhaseCountdown, PriceBlock, SculptraSelector,
} from "@/components/black-friday/client";
import {
  BF_FORM_ID, blackFridayFaq, checkoutTerms, deviceTerms, formatUsd, highlights, memberSavings, membershipUrl, offerById,
  signatureEnhancements, termsClosing,
} from "@/lib/data/blackFriday2026";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import { displayFont } from "@/lib/fonts";
import { buildFaqPageSchema } from "@/lib/schema";
import { openGraphFor } from "@/lib/seo/metadata";
import styles from "@/components/black-friday/BlackFriday.module.css";

// The phase is re-checked in the browser before first paint; this only keeps the
// server-rendered default fresh.
export const revalidate = 3600;

export const metadata: Metadata = {
  // The root layout template appends " | Harmony Med Spa".
  title: "Black Friday 2026 Med Spa Specials in Sarasota",
  description:
    "Harmony Med Spa Black Friday 2026 in Sarasota: Daxxify, RHA filler and Sculptra savings, facial packages, up to 30% off laser and device packages, and a $150 BHRT exam. Member early access Nov 23–26; public sale Nov 27–30.",
  alternates: { canonical: "/black-friday" },
  openGraph: openGraphFor("/black-friday", { title: "Black Friday Beauty Event | Harmony Med Spa" }),
};

const TEL = `tel:+1${PHONE_TEL}`;
const CATEGORIES = [
  { id: "injectables", label: "Injectables" },
  { id: "facials", label: "Facials" },
  { id: "devices", label: "Devices & Laser" },
  { id: "skincare", label: "Skincare" },
  { id: "gift-cards", label: "Gift Cards" },
  { id: "wellness", label: "Wellness" },
] as const;

const daxxify = offerById("daxxify");
const rha = offerById("rha");
const glo2 = offerById("glo2facial");
const signature = offerById("signature-facial");
const devices = offerById("devices");
const skincare = offerById("skincare");
const skincareGift = offerById("skincare-gift");
const bhrt = offerById("bhrt-exam");

function SectionHead({ eyebrow, title, intro, id }: { eyebrow: string; title: React.ReactNode; intro?: string; id?: string }) {
  return (
    <header className={styles.sectionHead}>
      <p className={noir.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={`${noir.display} ${styles.sectionTitle}`}>{title}</h2>
      {intro ? <p className={`${noir.lead} ${styles.sectionIntro}`}>{intro}</p> : null}
    </header>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return <ul className={styles.bullets}>{items.map((item) => <li key={item}><span aria-hidden="true" className={styles.bulletMark} />{item}</li>)}</ul>;
}

function FullTerms({ text }: { text: string }) {
  return (
    <details className={styles.fullTerms}>
      <summary>Full terms</summary>
      <p>{text}</p>
    </details>
  );
}

export default function BlackFridayPage() {
  const faqSchema = buildFaqPageSchema(blackFridayFaq);
  return (
    <main className={`${displayFont.variable} ${noir.noir} ${styles.page}`}>
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
      <SiteHeader className="site-header" />
      <PhaseScope>
        {/* 1. Phase bar */}
        <div className={styles.phaseBar} data-bf-show="pre early public" data-no-reveal>
          <div className={styles.phaseBarInner}>
            <p className={styles.phaseWindows}>
              <span className={styles.windowEarly}>Member Early Access · Nov 23–26</span>
              <span aria-hidden="true" className={styles.diamond}>◆</span>
              <span className={styles.windowPublic}>Public Sale · Nov 27–30</span>
            </p>
            <PhaseCountdown />
          </div>
        </div>

        {/* 2. Hero */}
        <section className={`${styles.hero} ${noir.grain}`} aria-labelledby="bf-title" data-no-reveal>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={noir.eyebrow}>Harmony Med Spa · Sarasota</p>
              <h1 id="bf-title" className={`${noir.display} ${styles.heroTitle}`}>
                <span className={noir.foil}>Black Friday</span>{" "}
                <em className={noir.foil}>Beauty Event</em>
              </h1>
              <p className={`${noir.lead} ${styles.heroSub}`}>
                <span data-bf-show="pre">Member early access begins November 23. Request the specials now and be first to know.</span>
                <span data-bf-show="early">Member early access is open through November 26. Join today and unlock member pricing instantly.</span>
                <span data-bf-show="public">Our biggest savings of the year, now through November 30.</span>
                <span data-bf-show="ended">Black Friday 2026 has ended. Explore our current pricing and memberships.</span>
              </p>
              <div className={styles.heroCtas} data-bf-show="pre early public">
                <a href={`#${BF_FORM_ID}`} className={noir.btnPrimary}>Request the Specials <ArrowRight size={17} aria-hidden="true" /></a>
                <a href={TEL} className={noir.btnSecondary}><Phone size={16} aria-hidden="true" /> Call {PHONE_DISPLAY}</a>
              </div>
              <div className={styles.heroCtas} data-bf-show="ended">
                <Link href="/pricing" className={noir.btnPrimary}>View Current Pricing <ArrowRight size={17} aria-hidden="true" /></Link>
                <Link href="/membership" className={noir.btnSecondary}>Explore Memberships</Link>
              </div>
              <p className={styles.trust} data-bf-show="pre early public">
                <span>Provider-led</span><span aria-hidden="true">·</span><span>Gulf Gate, Sarasota</span><span aria-hidden="true">·</span><span>Prepay now, treat within 365 days</span>
              </p>
            </div>
            <div className={styles.heroArt} data-bf-show="pre early public" aria-hidden="true">
              <div className={styles.heroPortrait}><OfferImage slot="hero" sizes="(max-width: 900px) 80vw, 420px" priority /></div>
              <div className={`${styles.floatCard} ${styles.floatCard1}`}><small>Daxxify</small><strong>Buy 100 · Get 40 Free</strong></div>
              <div className={`${styles.floatCard} ${styles.floatCard2}`}><small>RHA Fillers</small><strong>2nd Syringe 50% Off</strong></div>
              <div className={`${styles.floatCard} ${styles.floatCard3}`}><small>Laser &amp; Devices</small><strong>Up to 30% Off</strong></div>
            </div>
          </div>
        </section>

        <div data-bf-show="pre early public">
          {/* 3. Highlights */}
          <section className={styles.highlights} aria-label="Black Friday highlights">
            <ul className={styles.highlightList}>
              {highlights.map((item) => (
                <li key={item.label} className={styles.highlight}>
                  <span className={styles.highlightValue}>
                    {item.prefix ? <span className={styles.highlightPrefix}>{item.prefix}</span> : null}
                    <CountUp value={item.value} prefix="" />{item.suffix}
                  </span>
                  <span className={styles.highlightLabel}>{item.label}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Membership spotlight (ivory interlude) */}
          <section className={styles.ivory} aria-labelledby="members-title">
            <div className={styles.container}>
              <header className={styles.sectionHead}>
                <p className={styles.ivoryEyebrow}>Membership</p>
                <span className={styles.earlyBadge} data-bf-show="early">Early Access Now Open for Members</span>
                <h2 id="members-title" className={`${noir.display} ${styles.ivoryTitle}`}>Members <em>Save More</em></h2>
                <p className={styles.ivoryLead}>New patients who enroll in an eligible membership receive member pricing as soon as their first membership payment is completed.</p>
              </header>
              <div className={styles.compare} role="table" aria-label="Nonmember vs member pricing">
                <div className={styles.compareRow} role="row">
                  <span role="columnheader">Offer</span><span role="columnheader">Nonmember</span><span role="columnheader">Member</span><span role="columnheader">You save</span>
                </div>
                {[daxxify, rha].map((offer) => (
                  <div key={offer.id} className={styles.compareRow} role="row">
                    <span role="cell" className={styles.compareName}>{offer.name}</span>
                    <span role="cell" data-label="Nonmember">{formatUsd(offer.nonmember ?? 0)}</span>
                    <span role="cell" data-label="Member" className={styles.compareMember}>{formatUsd(offer.member ?? 0)}</span>
                    <span role="cell" data-label="You save" className={styles.compareSave}>{formatUsd(memberSavings(offer))}</span>
                  </div>
                ))}
                <div className={styles.compareRow} role="row">
                  <span role="cell" className={styles.compareName}>{devices.name}</span>
                  <span role="cell" data-label="Nonmember">{devices.nonmemberLabel}</span>
                  <span role="cell" data-label="Member" className={styles.compareMember}>{devices.memberLabel}</span>
                  <span role="cell" data-label="You save" className={styles.compareSave}>Extra 10% off</span>
                </div>
              </div>
              <div className={styles.ivoryCtas}>
                <Link href={membershipUrl} className={styles.ivoryBtn}>Explore Memberships <ArrowRight size={17} aria-hidden="true" /></Link>
              </div>
            </div>
          </section>

          {/* 5. Category navigator */}
          <CategoryNav items={CATEGORIES} />

          {/* 6. Injectables */}
          <section id="injectables" className={`${styles.section} ${noir.glow}`} aria-labelledby="injectables-title">
            <div className={styles.container}>
              <SectionHead id="injectables-title" eyebrow="Injectables" title={<>Refresh, <em>Refine</em>, Restore</>} />
              <div className={styles.featureGrid}>
                {[{ offer: daxxify, slot: "daxxify" as const, bullets: ["140 prepaid units total", "Use over multiple visits within 365 days", "Dosing by your provider"], interest: "Daxxify" as const },
                  { offer: rha, slot: "rha" as const, bullets: ["RHA 2, 3, 4 and Redensity, mix and match", "50% off the lower-priced syringe", "Prices assume two $714 syringes"], interest: "RHA Fillers" as const }].map(({ offer, slot, bullets, interest }) => (
                  <article key={offer.id} className={`${noir.card} ${styles.featureCard}`}>
                    <OfferImage slot={slot} sizes="(max-width: 900px) 100vw, 560px" className={styles.featureImage} />
                    <div className={styles.featureBody}>
                      <h3 className={`${noir.display} ${styles.offerTitle}`}>{offer.name}</h3>
                      <PriceBlock nonmember={offer.nonmember ?? 0} member={offer.member ?? 0} />
                      <Bullets items={bullets} />
                      <FullTerms text={offer.terms} />
                      <OfferActions offerId={offer.id} interest={interest} />
                    </div>
                  </article>
                ))}
              </div>
              <article className={`${noir.card} ${styles.sculptraCard}`}>
                <OfferImage slot="sculptra" sizes="(max-width: 900px) 100vw, 420px" className={styles.sculptraImage} />
                <div className={styles.featureBody}>
                  <h3 className={`${noir.display} ${styles.offerTitle}`}>Sculptra: <em>Build Your Package</em></h3>
                  <SculptraSelector />
                  <OfferActions offerId="sculptra-2" interest="Sculptra" />
                </div>
              </article>
              <p className={styles.note}>Members receive their additional 10% injectable discount before the Black Friday offer is applied. Dosing and eligibility determined by your provider.</p>
            </div>
          </section>

          <GoldRule />

          {/* 7. Facials */}
          <section id="facials" className={styles.section} aria-labelledby="facials-title">
            <div className={styles.container}>
              <SectionHead id="facials-title" eyebrow="Facials" title={<>Your Glow, <em>Four Times Over</em></>} />
              <div className={styles.featureGrid}>
                <article className={`${noir.card} ${styles.featureCard}`}>
                  <OfferImage slot="glo2facial" sizes="(max-width: 900px) 100vw, 560px" className={styles.featureImage} />
                  <div className={styles.featureBody}>
                    <h3 className={`${noir.display} ${styles.offerTitle}`}>{glo2.name}</h3>
                    <p className={styles.singlePrice}><span className={styles.priceMember}>{formatUsd(glo2.member ?? 0)}</span><span className={styles.priceLabel}>Members &amp; nonmembers</span></p>
                    <Bullets items={["One 4-pack per patient", "365-day redemption", "Full prepayment; no further discounts"]} />
                    <FullTerms text={glo2.terms} />
                    <OfferActions offerId={glo2.id} interest="Glo2Facial" />
                  </div>
                </article>
                <article className={`${noir.card} ${styles.featureCard}`}>
                  <OfferImage slot="signatureFacial" sizes="(max-width: 900px) 100vw, 560px" className={styles.featureImage} />
                  <div className={styles.featureBody}>
                    <h3 className={`${noir.display} ${styles.offerTitle}`}>{signature.name}</h3>
                    <p className={styles.singlePrice}><span className={styles.priceMember}>{formatUsd(signature.member ?? 0)}</span><span className={styles.priceLabel}>Members &amp; nonmembers</span></p>
                    <p className={styles.enhanceIntro}>One free enhancement per visit (up to $100 added value):</p>
                    <ul className={styles.goldChecks}>
                      {signatureEnhancements.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}
                    </ul>
                    <FullTerms text={signature.terms} />
                    <OfferActions offerId={signature.id} interest="Signature Facial" />
                  </div>
                </article>
              </div>
            </div>
          </section>

          <GoldRule />

          {/* 8. Devices & Laser */}
          <section id="devices" className={`${styles.section} ${noir.glow}`} aria-labelledby="devices-title">
            <div className={styles.container}>
              <SectionHead id="devices-title" eyebrow="Devices & Laser" title={<>Secret PRO, CO2, IPL <em>&amp; Laser Hair Removal</em></>} />
              <div className={styles.deviceBand}>
                <span><strong>20% Off</strong> for Nonmembers</span>
                <span aria-hidden="true" className={styles.diamond}>◆</span>
                <span><strong className={styles.gold}>30% Off</strong> for Members</span>
              </div>
              <DeviceExplorer />
              <ul className={styles.deviceTerms}>{deviceTerms.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </section>

          <GoldRule />

          {/* 9. Skincare */}
          <section id="skincare" className={styles.section} aria-labelledby="skincare-title">
            <div className={styles.container}>
              <SectionHead id="skincare-title" eyebrow="Skincare" title={<>Skincare <em>Savings</em></>} />
              <div className={styles.twoUp}>
                <article className={`${noir.card} ${styles.miniCard}`}>
                  <p className={styles.bigStat}>25% <small>off</small></p>
                  <h3 className={styles.miniTitle}>{skincare.name}</h3>
                  <p className={styles.miniText}>Only individually approved products qualify. Replaces members&apos; normal 10% skincare discount; no stacking.</p>
                  <OfferActions offerId={skincare.id} interest="Skincare" compact />
                </article>
                <article className={`${noir.card} ${styles.miniCard}`}>
                  <p className={styles.bigStat}>Free <small>gift</small></p>
                  <h3 className={styles.miniTitle}>{skincareGift.name}</h3>
                  <p className={styles.miniText}>Spend $399 after discount, before tax, and choose one gift from approved options, including a Revision Brightening Facial Wash travel size, while supplies last.</p>
                  <OfferActions offerId={skincareGift.id} interest="Skincare" compact />
                </article>
              </div>
              <p className={styles.note}>Selected products only.</p>
            </div>
          </section>

          {/* 10. Gift card band */}
          <section id="gift-cards" className={`${styles.giftBand} ${noir.grain}`} aria-labelledby="gift-title">
            <div className={`${styles.container} ${styles.giftInner}`}>
              <div className={styles.giftCopy}>
                <p className={noir.eyebrow}>Gift Cards</p>
                <h2 id="gift-title" className={`${noir.display} ${styles.sectionTitle}`}>
                  <span data-bf-show="pre early">Coming Nov 27: Buy a gift card, <em className={noir.foil}>get 10% back</em></span>
                  <span data-bf-show="public">Buy a $100+ gift card, <em className={noir.foil}>get 10% back</em></span>
                </h2>
                <p className={noir.lead} data-bf-show="public">November 27–30 only. Your bonus credit is issued to you after payment and can be used starting December 1 on regular-priced services and skincare. Purchased gift cards never expire.</p>
                <p className={noir.lead} data-bf-show="pre early">From November 27–30, $100+ gift cards earn 10% back in bonus credit for you. Purchased gift cards never expire.</p>
                <div className={styles.heroCtas}>
                  <Link href="/gift-cards#request" className={noir.btnPrimary} data-bf-show="public">Request a Gift Card <ArrowRight size={17} aria-hidden="true" /></Link>
                  <Link href="/gift-cards#request" className={noir.btnSecondary} data-bf-show="pre early">Preview the Gift Card Offer <ArrowRight size={17} aria-hidden="true" /></Link>
                </div>
              </div>
              <div className={styles.giftArt}><GiftCardArt amount="$500" /></div>
            </div>
          </section>

          {/* 11. Wellness */}
          <section id="wellness" className={`${styles.section} ${noir.glow}`} aria-labelledby="wellness-title">
            <div className={styles.container}>
              <SectionHead id="wellness-title" eyebrow="Wellness" title={<>Hormone <em>Optimization</em></>} />
              <article className={`${noir.card} ${styles.wellnessCard}`}>
                <div>
                  <h3 className={`${noir.display} ${styles.offerTitle}`}>{bhrt.name}</h3>
                  <p className={styles.singlePrice}><span className={styles.priceMember}>{formatUsd(bhrt.member ?? 0)}</span><span className={styles.priceLabel}>Prepay by November 30</span></p>
                  <p className={styles.miniText}>NP exam, personalized plan and 1 year of follow-ups. Labs and therapy separate.</p>
                  <FullTerms text={bhrt.terms} />
                </div>
                <OfferActions offerId={bhrt.id} interest="Hormone Optimization" />
              </article>
            </div>
          </section>

          <GoldRule />

          {/* 12. How it works */}
          <section className={styles.section} aria-labelledby="how-title">
            <div className={styles.container}>
              <SectionHead id="how-title" eyebrow="How It Works" title={<>Three Simple <em>Steps</em></>} />
              <ol className={styles.steps}>
                {[{ t: "Request or call", b: `Send the form below or call ${PHONE_DISPLAY}. We'll confirm your offers and eligibility.` },
                  { t: "Prepay during the sale", b: "Black Friday offers require full prepayment during the sale dates. No deposits or price holds." },
                  { t: "Schedule within 365 days", b: "Book your treatments when it suits you. Provider approval required." }].map((step, i) => (
                  <li key={step.t} className={styles.step}>
                    <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className={styles.stepTitle}>{step.t}</h3>
                    <p className={styles.miniText}>{step.b}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 13. Lead form */}
          <section id={BF_FORM_ID} className={`${styles.formSection} ${noir.glow}`} aria-labelledby="request-title">
            <div className={`${styles.container} ${styles.formGrid}`}>
              <div className={styles.formIntro}>
                <p className={noir.eyebrow}>Be First to Know</p>
                <h2 id="request-title" className={`${noir.display} ${styles.sectionTitle}`}>Request the <em className={noir.foil}>Black Friday</em> Specials</h2>
                <p className={noir.lead}>Tell us what you&apos;re interested in and we&apos;ll send every special, with member and nonmember pricing.</p>
                <p className={styles.formCall}>Prefer to talk? <a href={TEL}>{PHONE_DISPLAY}</a></p>
              </div>
              <div className={styles.glassPanel}>
                <BlackFridayLeadForm />
              </div>
            </div>
          </section>
        </div>

        {/* Ended state */}
        <section className={`${styles.section} ${styles.endedBlock}`} data-bf-show="ended" aria-label="Black Friday 2026 has ended">
          <div className={styles.container}>
            <p className={styles.endedText}>Black Friday 2026 has ended. Thank you for celebrating with us.</p>
            <div className={styles.heroCtas}>
              <Link href="/pricing" className={noir.btnPrimary}>View Pricing</Link>
              <Link href="/membership" className={noir.btnSecondary}>Memberships</Link>
            </div>
          </div>
        </section>

        {/* 14. FAQ */}
        <section className={styles.section} aria-labelledby="faq-title">
          <div className={`${styles.container} ${styles.narrow}`}>
            <SectionHead id="faq-title" eyebrow="Questions" title={<>Black Friday <em>FAQ</em></>} />
            <div className={styles.faq}>
              {blackFridayFaq.map((item) => (
                <details key={item.question} className={styles.faqItem}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 15. Terms */}
        <section className={styles.termsSection} aria-labelledby="terms-title">
          <div className={`${styles.container} ${styles.narrow}`}>
            <h2 id="terms-title" className={styles.termsTitle}>Terms</h2>
            <dl className={styles.termsList}>
              {checkoutTerms.map((t) => <div key={t.label}><dt>{t.label}:</dt> <dd>{t.text}</dd></div>)}
              <div><dt>Devices &amp; laser:</dt> <dd>{deviceTerms.join(" ")}</dd></div>
            </dl>
            <p className={styles.termsClose}>{termsClosing}</p>
            <p className={styles.termsClose}>Results vary. No results are guaranteed.</p>
          </div>
        </section>

        {/* 16. Final CTA */}
        <section className={`${styles.finalCta} ${noir.grain}`} aria-labelledby="final-title" data-bf-show="pre early public">
          <div className={styles.container}>
            <h2 id="final-title" className={`${noir.display} ${styles.finalTitle}`}><span className={noir.foil}>Your Most Beautiful</span> <em className={noir.foil}>Season Starts Here</em></h2>
            <div className={`${styles.heroCtas} ${styles.center}`}>
              <a href={`#${BF_FORM_ID}`} className={noir.btnPrimary}>Request the Specials</a>
              <a href={TEL} className={noir.btnSecondary}><Phone size={16} aria-hidden="true" /> Call {PHONE_DISPLAY}</a>
            </div>
          </div>
        </section>

        <div data-bf-show="pre early public"><MobileCallBar formId={BF_FORM_ID} tone="noir" bookLabel="Request Specials" /></div>
      </PhaseScope>
      <SiteFooter />
    </main>
  );
}
