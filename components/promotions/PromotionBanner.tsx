import Link from "next/link";
import { connection } from "next/server";
import { estheticianSale, promotionStatus } from "@/lib/promotions";
import styles from "./Promotions.module.css";

/** Request-time HTML prevents cached active-sale banners surviving the deadline. */
export default async function PromotionBanner({ article = false }: { article?: boolean }) {
  await connection();
  const status = promotionStatus();
  if (status !== "active" && !article) return null;
  return <aside className={styles.banner} aria-label="National Esthetician’s Day promotion" data-no-reveal>
    <div>
      <span className={styles.eyebrow}>{estheticianSale.dates} · Sarasota, Florida</span>
      <strong>{estheticianSale.title}{status === "ended" ? " — ended" : status === "upcoming" ? " — upcoming" : ""}</strong>
      <p>{status === "ended"
        ? "This promotion ended October 16, 2026. The article below is a historical announcement; contact Harmony for current offers."
        : "Save $400 on 3 RF microneedling face-and-neck treatments or $1,000 on 6. Explore the $99 Signature Facial offer and member savings."}</p>
      {status === "active" && <>
        {estheticianSale.packages.map(pack => <p key={pack.treatments}>
          {pack.treatments} face-and-neck RF microneedling treatments: {pack.price}; VIP Member {pack.vip}; VIP Elite {pack.elite}. Includes {pack.facials}.
        </p>)}
        <p>New guests and non-members: $99 Signature Facial with one enhancement—dermaplane, hydrofacial enhancement, or diamond microdermabrasion.</p>
        <p>Members receive 15% total savings on qualifying facial services, Glo2Facials, add-on enhancements, and skincare products. This is not an additional discount on the RF package prices above.</p>
        <p>Offer ends October 16, 2026. Treatment suitability requires provider assessment; confirm purchase, redemption, and scheduling terms with Harmony at (941) 923-8990.</p>
      </>}
    </div>
    <Link href={article ? "/specials" : `/blog/${estheticianSale.slug}`}>{article ? "View Specials" : "View offers and terms"} <span aria-hidden="true">→</span></Link>
  </aside>;
}
