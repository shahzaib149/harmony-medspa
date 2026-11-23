import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, MessageSquare, Phone } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import MobileCallBar from "@/components/ui/MobileCallBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { PhaseScope, noir } from "@/components/promotions/noir/NoirParts";
import { BlackFridayLeadForm, ContactActions, DeviceExplorer, PhaseCountdown, TrackedLink } from "@/components/black-friday/client";
import {
  BF_FORM_ID, EARLY_ACCESS_URL, TEXT_HREF, blackFridayFaq, checkoutTerms, deviceTerms, formatUsd, images, memberSavings,
  membershipUrl, offerById, signatureEnhancements, termsClosing, type ImageSlotId, type Offer,
} from "@/lib/data/blackFriday2026";
import { ONLINE_BOOKING_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import { displayFont } from "@/lib/fonts";
import { buildFaqPageSchema } from "@/lib/schema";
import { openGraphFor } from "@/lib/seo/metadata";
import styles from "@/components/black-friday/BlackFriday.module.css";
import p from "@/components/black-friday/PricingLayout.module.css";

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
const JUMP = [
  { id: "injectables", label: "Injectables" },
  { id: "facials", label: "Facials" },
  { id: "devices", label: "Laser & Devices" },
  { id: "skincare", label: "Skincare" },
  { id: "gift-cards", label: "Gift Cards" },
  { id: "wellness", label: "Hormone Optimization" },
] as const;

const daxxify = offerById("daxxify");
const rha = offerById("rha");
const sculptra = [offerById("sculptra-2"), offerById("sculptra-4"), offerById("sculptra-6")];
const glo2 = offerById("glo2facial");
const signature = offerById("signature-facial");
const skincare = offerById("skincare");
const skincareGift = offerById("skincare-gift");
const giftBonus = offerById("gift-card-bonus");
const bhrt = offerById("bhrt-exam");

/* ---------- Small server pieces ---------- */

function CardImage({ slot, contain = false, top = false, priority = false }: { slot: ImageSlotId; contain?: boolean; top?: boolean; priority?: boolean }) {
  const image = images[slot];
  if (!image.src) return null;
  return (
    <div className={`${p.cardImage} ${contain ? `${p.cardImageContain} ${p.cardImageLight}` : ""} ${top ? p.cardImageTop : ""}`}>
      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 580px" quality={80} priority={priority} />
    </div>
  );
}

function priceCell(offer: Offer, side: "nonmember" | "member") {
  const value = offer[side];
  if (value === null) return side === "nonmember" ? offer.nonmemberLabel ?? "" : offer.memberLabel ?? "";
  return formatUsd(value);
}

/** Treatment | Nonmember | Member, like the /pricing lists but with both columns. */
function PriceTable({ rows, caption }: { rows: { label: string; note?: string; offer: Offer }[]; caption: string }) {
  return (
    <table className={p.table}>
      <caption className={styles.srOnly}>{caption}</caption>
      <thead><tr><th scope="col">Treatment</th><th scope="col">Nonmember</th><th scope="col">Member</th></tr></thead>
      <tbody>
        {rows.map(({ label, note, offer }) => (
          <tr key={offer.id}>
            <th scope="row">{label}{note ? <small>{note}</small> : null}</th>
            <td data-label="Nonmember" className={p.nonmember}>
              {offer.regular ? <span className={p.regular}>Reg. {formatUsd(offer.regular)}</span> : null}
              {priceCell(offer, "nonmember")}
            </td>
            <td data-label="Member" className={p.member}>{priceCell(offer, "member")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SaveChip({ offer }: { offer: Offer }) {
  const save = memberSavings(offer);
  return save > 0 ? <span className={p.save}>Members save {formatUsd(save)}</span> : null;
}

function Bullets({ items }: { items: readonly string[] }) {
  return <ul className={p.bullets}>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function FullTerms({ text }: { text: string }) {
  return <details className={p.terms}><summary>Full terms</summary><p>{text}</p></details>;
}

function GroupTitle({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return (
    <header id={id} className={p.groupTitle}>
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </header>
  );
}

/** Before Nov 23 the main action is Hayden's Mailchimp early-access signup; from Nov 23, Call / Text / Book. */
function HeroCtas() {
  return (
    <>
      <div className={p.ctaRow} data-bf-show="pre">
        <TrackedLink id="early_access" href={EARLY_ACCESS_URL} className={noir.btnPrimary}>Request Early Access <ArrowRight size={17} aria-hidden="true" /></TrackedLink>
        <a href={TEL} className={noir.btnSecondary}><Phone size={16} aria-hidden="true" /> Call {PHONE_DISPLAY}</a>
      </div>
      <div className={p.ctaRow} data-bf-show="early public">
        <a href={TEL} className={noir.btnPrimary}><Phone size={16} aria-hidden="true" /> Call {PHONE_DISPLAY}</a>
        <a href={TEXT_HREF} className={noir.btnSecondary}><MessageSquare size={16} aria-hidden="true" /> Text Us</a>
        <a href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer" className={noir.btnSecondary}><CalendarDays size={16} aria-hidden="true" /> Book Online</a>
      </div>
      <div className={p.ctaRow} data-bf-show="ended">
        <Link href="/pricing" className={noir.btnPrimary}>View Current Pricing <ArrowRight size={17} aria-hidden="true" /></Link>
        <Link href={membershipUrl} className={noir.btnSecondary}>Explore Memberships</Link>
      </div>
    </>
  );
}

export default function BlackFridayPage() {
  const faqSchema = buildFaqPageSchema(blackFridayFaq);
  const hero = images.hero;
  return (
    <main className={`${displayFont.variable} ${noir.noir} ${styles.page}`}>
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
      <SiteHeader className="site-header" />
      <PhaseScope>
        {/* Phase bar */}
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

        {/* Hero: the pricing page's dark hero, black and gold */}
        <section className={`${p.hero} ${noir.grain}`} aria-labelledby="bf-title" data-no-reveal>
          {hero.src ? <div className={p.heroPhoto}><Image src={hero.src} alt="" fill priority sizes="100vw" quality={70} /></div> : null}
          <div className={p.heroShade} aria-hidden="true" />
          <div className={p.heroInner}>
            <p className={noir.eyebrow}>Harmony Med Spa · Sarasota</p>
            <h1 id="bf-title" className={`${noir.display} ${p.heroTitle}`}>
              <span className={noir.foil}>Black Friday</span>{" "}<em className={noir.foil}>Beauty Event</em>
            </h1>
            <p className={p.heroSub}>
              <span data-bf-show="pre">Member early access begins November 23. Request early access and be first to receive our biggest savings of the year.</span>
              <span data-bf-show="early">Member early access is open through November 26. Not a member yet? Join today and unlock member pricing after your first payment.</span>
              <span data-bf-show="public">Our biggest savings of the year, now through November 30. Call, text or book to claim your offer.</span>
              <span data-bf-show="ended">Black Friday 2026 has ended. Explore our current pricing and memberships.</span>
            </p>
            <ul className={p.dates} data-bf-show="pre early public" aria-label="Sale dates">
              <li>Member early access <b>Nov 23–26</b></li>
              <li>Public sale <b>Nov 27–30</b></li>
            </ul>
            <HeroCtas />
          </div>
        </section>

        <div className={p.light}>
          <div data-bf-show="pre early public">
            {/* Intro, like the pricing page */}
            <section className={`${p.wrap} ${p.intro}`}>
              <h2 className={p.introTitle}>Harmony Med Spa Black Friday Pricing in Sarasota, FL</h2>
              <div className={p.introText}>
                <p>Save on injectables, four-treatment facial packages, laser and device packages, selected skincare, gift cards and hormone optimization at our Gulf Gate med spa.</p>
                <p>Prepay during the sale and schedule your treatments within 365 days, with your provider&apos;s approval. Members save more, and new patients receive member pricing as soon as their first membership payment has cleared.</p>
                <p>To claim an offer, call or text us at {PHONE_DISPLAY} or book online.</p>
              </div>
              <ContactActions id="intro" className={p.actions} />

              <nav className={p.jump} aria-label="Black Friday categories">
                <p className={p.jumpLabel}>Jump to a category</p>
                <ul className={p.jumpList}>
                  {JUMP.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}
                </ul>
              </nav>

              <div className={p.members}>
                <div className={p.membersHead}>
                  <h2 className={`${noir.display} ${p.membersTitle}`}>Members Save More</h2>
                  <span className={p.badge} data-bf-show="early">Member early access is open</span>
                </div>
                <p className={p.membersText}>
                  Members shop first, November 23–26, and get the lower member price on injectables and laser packages. New patients can request a membership today and receive member pricing once their first membership payment has cleared.
                </p>
                <div className={`${p.ctaRow} ${p.ctaRowStart}`} style={{ marginTop: 18 }}>
                  <Link href={membershipUrl} className={`${p.btnLight} ${p.btnInk}`}>Request a Membership <ArrowRight size={16} aria-hidden="true" /></Link>
                </div>
              </div>
            </section>

            {/* Category cards */}
            <section className={`${p.wrap} ${p.grid}`} aria-label="Black Friday offers">
              <GroupTitle id="injectables" title="Injectables" intro="Members' 10% injectable discount is applied first, then the Black Friday offer. Dosing and eligibility are determined by your provider." />

              <article className={p.card}>
                <CardImage slot="daxxify" contain />
                <div className={p.cardBody}>
                  <p className={p.cardEyebrow}>Buy 100 units, get 40 free</p>
                  <h3 className={p.cardTitle}>Daxxify</h3>
                  <PriceTable caption="Daxxify Black Friday pricing" rows={[{ label: "140 prepaid units", offer: daxxify }]} />
                  <SaveChip offer={daxxify} />
                  <Bullets items={["Use over multiple visits within 365 days", "One bundle per patient unless your provider approves more", "Dosing by your provider"]} />
                  <FullTerms text={daxxify.terms} />
                  <ContactActions id={daxxify.id} className={p.actions} />
                </div>
              </article>

              <article className={p.card}>
                <CardImage slot="rha" contain />
                <div className={p.cardBody}>
                  <p className={p.cardEyebrow}>Buy one syringe, second 50% off</p>
                  <h3 className={p.cardTitle}>RHA Dermal Fillers</h3>
                  <PriceTable caption="RHA filler Black Friday pricing" rows={[{ label: "Two syringes", note: "Example based on two $714 syringes", offer: rha }]} />
                  <SaveChip offer={rha} />
                  <Bullets items={["Mix and match RHA 2, 3, 4 and Redensity", "50% off the lower-priced syringe", "Multiple pairs with provider approval"]} />
                  <FullTerms text={rha.terms} />
                  <ContactActions id={rha.id} className={p.actions} />
                </div>
              </article>

              <article className={`${p.card} ${p.cardWide}`}>
                <CardImage slot="sculptra" contain />
                <div className={p.cardBody}>
                  <p className={p.cardEyebrow}>Save up to $1,000</p>
                  <h3 className={p.cardTitle}>Sculptra</h3>
                  <PriceTable caption="Sculptra Black Friday pricing" rows={[
                    { label: "2 vials, $250 off", offer: sculptra[0] },
                    { label: "4 vials, $600 off", offer: sculptra[1] },
                    { label: "6 vials, $1,000 off", offer: sculptra[2] },
                  ]} />
                  <SaveChip offer={sculptra[0]} />
                  <Bullets items={["Members' 10% applied first, then the dollar savings", "Use over multiple visits within 365 days", "Provider approval required"]} />
                  <FullTerms text={sculptra[0].terms} />
                  <ContactActions id="sculptra" className={p.actions} />
                </div>
              </article>

              <GroupTitle id="facials" title="Facials" intro="Four-treatment packages, the same price for members and nonmembers. One 4-pack per patient." />

              <article className={p.card}>
                <CardImage slot="glo2facial" />
                <div className={p.cardBody}>
                  <p className={p.cardEyebrow}>4 treatments</p>
                  <h3 className={p.cardTitle}>Glo2Facial</h3>
                  <PriceTable caption="Glo2Facial Black Friday pricing" rows={[{ label: "4-treatment package", offer: glo2 }]} />
                  <Bullets items={["Full prepayment; 365-day redemption", "No further discounts"]} />
                  <FullTerms text={glo2.terms} />
                  <ContactActions id={glo2.id} className={p.actions} />
                </div>
              </article>

              <article className={p.card}>
                <CardImage slot="signatureFacial" />
                <div className={p.cardBody}>
                  <p className={p.cardEyebrow}>4 treatments + enhancements</p>
                  <h3 className={p.cardTitle}>Signature Facial</h3>
                  <PriceTable caption="Signature Facial Black Friday pricing" rows={[{ label: "4-treatment package", offer: signature }]} />
                  <p className={p.cardBlurb}>One free enhancement each visit (up to $100 added value):</p>
                  <Bullets items={signatureEnhancements} />
                  <FullTerms text={signature.terms} />
                  <ContactActions id={signature.id} className={p.actions} />
                </div>
              </article>
            </section>
          </div>

          {/* Laser & devices: a dark feature band with the full package matrix */}
          <section id="devices" className={`${p.band} ${noir.noir} ${noir.glow}`} aria-labelledby="devices-title" data-bf-show="pre early public">
            <div className={p.wrap}>
              <header className={p.bandHead}>
                <p className={noir.eyebrow}>Laser &amp; Devices</p>
                <h2 id="devices-title" className={`${noir.display} ${p.bandTitle}`}>20% off for nonmembers · <em className={noir.foil}>30% off for members</em></h2>
                <p className={noir.lead}>Secret PRO RF microneedling, fractional CO2, IPL and laser hair removal packages. Prices below are package totals, already discounted.</p>
              </header>
              <div className={p.deviceShots}>
                {(["secretPro", "ipl"] as const).map((slot) => images[slot].src ? (
                  <figure key={slot} className={p.deviceShot} style={{ margin: 0 }}>
                    <Image src={images[slot].src as string} alt={images[slot].alt} fill sizes="(max-width: 900px) 50vw, 560px" quality={80} />
                    <figcaption>{images[slot].label}</figcaption>
                  </figure>
                ) : null)}
              </div>
              <DeviceExplorer />
              <ul className={styles.deviceTerms}>{deviceTerms.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </section>

          <div data-bf-show="pre early public">
            <section className={`${p.wrap} ${p.grid}`} aria-label="Skincare and wellness offers">
              <GroupTitle id="skincare" title="Skincare" intro="Selected products only. The 25% replaces members' usual 10% skincare discount." />
              <article className={p.card}>
                <CardImage slot="skincare" contain />
                <div className={p.cardBody}>
                  <p className={p.cardEyebrow}>25% off + a free gift</p>
                  <h3 className={p.cardTitle}>Selected Skincare</h3>
                  <PriceTable caption="Skincare Black Friday offers" rows={[
                    { label: "Selected skincare products", offer: skincare },
                    { label: "Free gift with $399+", note: "After discount, before tax", offer: skincareGift },
                  ]} />
                  <p className={p.cardBlurb}>Choose one gift from approved options, including a Revision Brightening Facial Wash travel size, while supplies last.</p>
                  <FullTerms text={`${skincare.terms} ${skincareGift.terms}`} />
                  <ContactActions id={skincare.id} className={p.actions} />
                </div>
              </article>

              <article id="wellness" className={p.card}>
                <CardImage slot="provider" top />
                <div className={p.cardBody}>
                  <p className={p.cardEyebrow}>Hormone optimization</p>
                  <h3 className={p.cardTitle}>BHRT Initial Examination</h3>
                  <PriceTable caption="BHRT exam Black Friday pricing" rows={[{ label: "Initial exam + 1 year of follow-ups", offer: bhrt }]} />
                  <Bullets items={["NP assessment and a customized plan", "Follow-up consultations for one year", "Enroll and pay by November 30", "Labs, medications and procedures are extra"]} />
                  <FullTerms text={bhrt.terms} />
                  <ContactActions id={bhrt.id} className={p.actions} />
                </div>
              </article>
            </section>
          </div>

          {/* Gift cards */}
          <section id="gift-cards" className={`${p.band} ${noir.noir} ${noir.grain}`} aria-labelledby="gift-title" data-bf-show="pre early public">
            <div className={`${p.wrap} ${p.giftGrid}`}>
              <div className={p.bandHead}>
                <p className={noir.eyebrow}>Gift Cards</p>
                <h2 id="gift-title" className={`${noir.display} ${p.bandTitle}`}>
                  <span data-bf-show="pre early">From Nov 27: buy a gift card, <em className={noir.foil}>get 10% back</em></span>
                  <span data-bf-show="public">Buy a $100+ gift card, <em className={noir.foil}>get 10% back</em></span>
                </h2>
                <p className={noir.lead}>
                  <span data-bf-show="pre early">The gift card bonus starts November 27 and runs through November 30. Gift cards bought before then don&apos;t earn the bonus. </span>
                  $100+ gift cards paid with new funds earn a separate 10% promotional credit for you, usable from December 1, 2026. Purchased gift cards never expire.
                </p>
                <FullTerms text={giftBonus.terms} />
                <div className={`${p.ctaRow} ${p.ctaRowStart}`}>
                  <Link href="/gift-cards#request" className={noir.btnPrimary}>Request a Gift Card <ArrowRight size={17} aria-hidden="true" /></Link>
                  <a href={TEL} className={noir.btnSecondary}><Phone size={16} aria-hidden="true" /> Call {PHONE_DISPLAY}</a>
                </div>
              </div>
              {images.giftCard.src ? (
                <div className={p.giftPhoto}><Image src={images.giftCard.src} alt={images.giftCard.alt} fill sizes="(max-width: 900px) 100vw, 520px" quality={85} /></div>
              ) : null}
            </div>
          </section>

          <div data-bf-show="pre early public" className={p.wrap}>
            {/* How it works */}
            <ol className={p.steps} aria-label="How to claim a Black Friday offer">
              {[
                { t: "Call, text or book", b: `Reach us at ${PHONE_DISPLAY} or book online. We'll confirm your offer and eligibility.` },
                { t: "Prepay during the sale", b: "Black Friday offers require full prepayment during the sale dates. No deposits or price holds." },
                { t: "Schedule within 365 days", b: "Book your treatments when it suits you. Provider approval is required." },
              ].map((step, i) => (
                <li key={step.t}>
                  <span className={p.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{step.t}</h3>
                  <p>{step.b}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Early access (before Nov 23) or the claim form (Nov 23–30) */}
          <section id={BF_FORM_ID} className={`${p.band} ${noir.noir} ${noir.glow}`} aria-labelledby="request-title" data-bf-show="pre early public">
            <div className={`${p.wrap} ${p.formWrap}`}>
              <div className={p.bandHead}>
                <p className={noir.eyebrow} data-bf-show="pre">Be first to know</p>
                <p className={noir.eyebrow} data-bf-show="early public">Claim an offer</p>
                <h2 id="request-title" className={`${noir.display} ${p.bandTitle}`}>
                  <span data-bf-show="pre">Request <em className={noir.foil}>Early Access</em></span>
                  <span data-bf-show="early public">Request a <em className={noir.foil}>Call Back</em></span>
                </h2>
                <p className={noir.lead} data-bf-show="pre">Sign up to receive the Black Friday specials as soon as early access opens on November 23.</p>
                <p className={noir.lead} data-bf-show="early public">Tell us what you&apos;re interested in and our team will contact you to help you claim your offer. Prefer to talk now? Call or text {PHONE_DISPLAY}.</p>
              </div>
              <div className={p.earlyCard} data-bf-show="pre">
                <p className={noir.lead} style={{ margin: 0 }}>Early access sign-up takes less than a minute. You can choose email and text updates.</p>
                <div className={`${p.ctaRow} ${p.ctaRowStart}`}>
                  <TrackedLink id="early_access_form" href={EARLY_ACCESS_URL} className={noir.btnPrimary}>Request Early Access <ArrowRight size={17} aria-hidden="true" /></TrackedLink>
                  <a href={TEL} className={noir.btnSecondary}><Phone size={16} aria-hidden="true" /> Call {PHONE_DISPLAY}</a>
                </div>
              </div>
              <div className={styles.glassPanel} data-bf-show="early public">
                <BlackFridayLeadForm />
              </div>
            </div>
          </section>

          {/* Ended state */}
          <section className={`${p.wrap} ${p.intro}`} data-bf-show="ended" aria-label="Black Friday 2026 has ended">
            <h2 className={p.introTitle}>Black Friday 2026 has ended</h2>
            <p className={p.introText}>Thank you for celebrating with us. See our current pricing or learn about memberships.</p>
            <div className={`${p.ctaRow} ${p.ctaRowStart}`}>
              <Link href="/pricing" className={`${p.btnLight} ${p.btnInk}`}>View Pricing</Link>
              <Link href="/membership" className={`${p.btnLight} ${p.btnOutline}`}>Memberships</Link>
            </div>
          </section>

          {/* FAQ and terms */}
          <section className={`${p.wrap} ${p.faqSection}`} aria-labelledby="faq-title">
            <h2 id="faq-title" className={p.faqTitle}>Black Friday FAQ</h2>
            <div className={p.faq}>
              {blackFridayFaq.map((item) => (
                <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>
              ))}
            </div>
            <div className={p.termsBlock}>
              <h2>Terms</h2>
              <dl>
                {checkoutTerms.map((t) => <div key={t.label}><dt>{t.label}:</dt> <dd>{t.text}</dd></div>)}
                <div><dt>Devices &amp; laser:</dt> <dd>{deviceTerms.join(" ")}</dd></div>
                <div><dt>Gift cards:</dt> <dd>{giftBonus.terms}</dd></div>
              </dl>
              <p>{termsClosing}</p>
              <p>Results vary. No results are guaranteed. Product images are manufacturer photography; they do not show Harmony patients.</p>
            </div>
          </section>

          {/* Closing CTA, like the pricing page */}
          <section className={`${p.wrap} ${p.bottomSpace}`} data-bf-show="pre early public">
            <div className={p.closing}>
              <h2 className={noir.display}><span className={noir.foil}>Your Most Beautiful Season Starts Here</span></h2>
              <p>Call, text or book online to claim your Black Friday offer with our Sarasota team.</p>
              <div className={p.ctaRow}>
                <a href={TEL} className={noir.btnPrimary}><Phone size={16} aria-hidden="true" /> Call {PHONE_DISPLAY}</a>
                <a href={TEXT_HREF} className={noir.btnSecondary}><MessageSquare size={16} aria-hidden="true" /> Text Us</a>
                <a href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer" className={noir.btnSecondary}><Check size={16} aria-hidden="true" /> Book Online</a>
              </div>
            </div>
          </section>
          <div className={p.bottomSpace} data-bf-show="ended" />
        </div>

        <div data-bf-show="pre"><MobileCallBar tone="noir" promo={false} /></div>
        <div data-bf-show="early public"><MobileCallBar formId={BF_FORM_ID} tone="noir" bookLabel="Claim an Offer" promo={false} /></div>
      </PhaseScope>
      <SiteFooter />
    </main>
  );
}
