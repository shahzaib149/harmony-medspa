import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { displayFont } from "@/lib/fonts";
import { GiftCardArt, PhaseScope, noir } from "@/components/promotions/noir/NoirParts";
import styles from "./GiftCardBonusBanner.module.css";

/**
 * Black Friday gift card bonus band. Preview in member early access, active during the
 * public sale, and absent before Nov 23 and after Nov 30 (both phases render nothing visible).
 */
export default function GiftCardBonusBanner({ id }: { id?: string }) {
  return (
    <PhaseScope as="box" className={styles.scope}>
      <section id={id} className={`${noir.noir} ${noir.grain} ${displayFont.variable} ${styles.band}`} data-bf-show="early public" data-no-reveal aria-label="Black Friday gift card bonus">
        <div className={styles.inner}>
          <div className={styles.copy}>
            <p className={noir.eyebrow}>
              <span data-bf-show="early">Coming November 27</span>
              <span data-bf-show="public">Black Friday · November 27–30</span>
            </p>
            <h2 className={`${noir.display} ${styles.title}`}>
              <span data-bf-show="early">Black Friday: buy a gift card, <em className={noir.foil}>get 10% back</em>, starting November 27.</span>
              <span data-bf-show="public">Black Friday — buy a gift card, <em className={noir.foil}>get 10% back!</em></span>
            </h2>
            <p className={styles.sub} data-bf-show="public">$100+ gift cards earn 10% back in bonus credit for you. November 27–30 only.</p>
            <p className={styles.sub} data-bf-show="early">$100+ gift cards purchased November 27–30 earn 10% back in bonus credit for you.</p>
            <div className={styles.actions}>
              <Link href="/gift-cards#request" className={noir.btnPrimary} data-bf-show="public">Request a Gift Card <ArrowRight size={17} aria-hidden="true" /></Link>
              <Link href="/gift-cards#request" className={noir.btnSecondary} data-bf-show="early">Preview the Offer <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className={styles.art}>
            <GiftCardArt amount="$250" className={styles.card} />
          </div>
        </div>
      </section>
    </PhaseScope>
  );
}
