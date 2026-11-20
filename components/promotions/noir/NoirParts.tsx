import Image from "next/image";
import type { ReactNode } from "react";
import { images, type ImageSlotId, type BlackFridayPhase } from "@/lib/data/blackFriday2026";
import { getBlackFridayPhase, phaseScopeScript } from "@/lib/promotions/blackFriday";
import PhaseSync from "./PhaseSync";
import styles from "./Noir.module.css";

export { styles as noir };

/**
 * Wraps phase-dependent content. Children marked data-bf-show="early public" only
 * render in those phases. The inline script sets the phase before first paint (cached
 * pages included); PhaseSync keeps it right after client-side navigation.
 * `as="box"` keeps a real box (for layout); the default uses display: contents.
 */
export function PhaseScope({ children, as = "contents", className = "" }: { children: ReactNode; as?: "contents" | "box"; className?: string }) {
  const phase: BlackFridayPhase = getBlackFridayPhase();
  return (
    <div className={`${as === "box" ? styles.phaseBox : styles.scope} ${className}`} data-bf-phase={phase} data-bf-scope suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: phaseScopeScript() }} />
      <PhaseSync />
      {children}
    </div>
  );
}

export function GoldRule() {
  return <div className={styles.rule} role="presentation"><span /></div>;
}

/** A named image slot: the real image once supplied, else the designed Noir placeholder. Never a broken image. */
export function OfferImage({ slot, sizes, className = "", priority = false, label }: {
  slot: ImageSlotId; sizes: string; className?: string; priority?: boolean; label?: string;
}) {
  const image = images[slot];
  return (
    <div className={`${styles.media} ${className}`}>
      {image.src ? (
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} quality={85} />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={image.alt}>
          <div className={styles.placeholderInner}>
            <span className={styles.placeholderMark}>Harmony · Black Friday</span>
            <span className={styles.placeholderDiamond} aria-hidden="true" />
            <span className={styles.placeholderName} aria-hidden="true">{label ?? image.label}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/** The black-and-gold gift card. `amount` and `ribbon` are optional overlays. */
export function GiftCardArt({ amount, ribbon, className = "" }: { amount?: ReactNode; ribbon?: ReactNode; className?: string }) {
  return (
    <div className={`${styles.giftCard} ${className}`} aria-hidden="true">
      {ribbon}
      <div className={styles.giftCardTop}>
        <span className={styles.giftWordmark}><b>HARMONY</b><small>MED SPA · SARASOTA</small></span>
        <span className={styles.giftChip} />
      </div>
      <div className={styles.giftCardBottom}>
        <span className={styles.giftLabel}>Gift Card</span>
        {amount ? <span className={styles.giftAmount}>{amount}</span> : null}
      </div>
    </div>
  );
}
