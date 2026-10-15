import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { estheticianSale, promotionStatus } from "@/lib/promotions";
import { openGraphFor } from "@/lib/seo/metadata";
import styles from "@/components/promotions/Promotions.module.css";

export const metadata: Metadata = {
  title: "Specials & Offers in Sarasota",
  description: "Explore Harmony Med Spa’s Sarasota specials, offer dates, package prices and member savings. Review eligibility and contact the clinic for availability.",
  alternates: { canonical: "/specials" },
  openGraph: openGraphFor("/specials"),
};

export default async function SpecialsPage() {
  await connection();
  const status = promotionStatus();
  const active = status === "active";
  return <main className={styles.page}>
    <SiteHeader className="contact-page-header" />
    <header className={styles.hero}>
      <span className={styles.eyebrow}>Harmony Med Spa · Sarasota</span>
      <h1>Specials, with every detail.</h1>
      <p>Explore limited-time offers, understand what is included, and talk with our team about the care that fits you.</p>
    </header>
    <div className={styles.content}>
      {!active && <p className={styles.bonus}>{status === "ended" ? "The flash sale below has ended. Contact Harmony for current offers and availability." : "The flash sale below is upcoming and is not yet available."}</p>}
      <section aria-labelledby="sale-title" data-no-reveal>
        <div className={styles.heading}>
          <div><h2 id="sale-title">{estheticianSale.title}</h2><p>{estheticianSale.dates} · Sarasota local time</p></div>
          <span className={styles.badge}>{active ? "Available October 15–16" : status === "ended" ? "Offer ended" : "Upcoming offer"}</span>
        </div>
        <p>RF microneedling packages for the face and neck, Signature Facial offers, and savings for members. {active ? "The following promotional prices apply during the sale." : "The following prices describe the dated promotion, not an offer available outside its stated dates."}</p>
        <div className={styles.grid}>
          {estheticianSale.packages.map(pkg => <article className={styles.card} key={pkg.treatments}>
            <h3>{pkg.treatments} RF microneedling treatments</h3>
            <p>Face + neck · Advertised savings {pkg.savings}</p>
            <span className={styles.price}>{pkg.price}</span>
            <dl><div><dt>VIP Member price</dt><dd>{pkg.vip}</dd></div><div><dt>VIP Elite price</dt><dd>{pkg.elite}</dd></div></dl>
            <p className={styles.bonus}>Includes {pkg.facials}</p>
          </article>)}
        </div>
        <div className={`${styles.grid} ${styles.secondary}`}>
          <article className={styles.card}><h3>$99 Signature Facial</h3><p>For new guests and non-members. Includes one add-on enhancement:</p><ul><li>Dermaplane</li><li>Hydrofacial enhancement</li><li>Diamond microdermabrasion</li></ul></article>
          <article className={styles.card}><h3>Members: 15% total savings</h3><p>Qualifying facial services, Glo2Facials, add-on enhancements, and skincare products. The usual 10% member discount plus five additional percentage points.</p><Link href="/membership">Explore Harmony memberships →</Link></article>
        </div>
        <div className={styles.terms}>
          <h3>What to know before booking</h3>
          <p>Valid October 15–16, 2026. Treatment suitability is subject to provider assessment and scheduling availability. Listed RF package member prices already include their applicable discounts; do not subtract an additional 15%. Member pricing may be combined with this promotion where applicable—confirm eligibility and combinations with Harmony.</p>
          <p>The sale dates are not a requirement to complete all treatments by October 16. Ask the team about package scheduling and any applicable redemption terms before purchasing.</p>
          <Link href={`/blog/${estheticianSale.slug}`}>Read the full National Esthetician’s Day announcement and FAQs →</Link>
        </div>
        <div className={styles.actions}><Link href="/contact-us">{active ? "Ask about the flash sale" : "Ask about current offers"}</Link><a href="tel:9419238990">Call (941) 923-8990</a></div>
        <p className={styles.secondary}>More from Harmony: <a href="https://mailchi.mp/harmonymedspafl/monthly-specials">monthly specials newsletter</a>. Confirm current availability with our team.</p>
      </section>
    </div>
    <SiteFooter />
  </main>;
}
