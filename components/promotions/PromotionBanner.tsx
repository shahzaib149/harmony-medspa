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
    </div>
    <Link href={article ? "/specials" : `/blog/${estheticianSale.slug}`}>{article ? "View Specials" : "View offers and terms"} <span aria-hidden="true">→</span></Link>
  </aside>;
}
