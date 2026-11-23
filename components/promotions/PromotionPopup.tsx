"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { displayFont } from "@/lib/fonts";
import { clientBlackFridayPhase, phaseOverride } from "@/lib/promotions/blackFriday";
import { popupExcluded, promotionPopupPhases, type PromotionPopupPhase } from "@/lib/promotions/popupConfig";
import { isAdVisitorNow } from "@/lib/promotions/useIsAdVisitor";
import { OfferImage, noir } from "@/components/promotions/noir/NoirParts";
import styles from "./PromotionPopup.module.css";

/** External links (e.g. Hayden's Mailchimp early-access page) open in a new tab; site paths use Link. */
function PopupLink({ cta, className, onClick }: { cta: PromotionPopupPhase["primaryCta"]; className: string; onClick: () => void }) {
  if (/^https?:/.test(cta.href)) {
    return <a href={cta.href} className={className} target="_blank" rel="noopener" onClick={onClick}>{cta.label}</a>;
  }
  return <Link href={cta.href} className={className} onClick={onClick}>{cta.label}</Link>;
}

const dismissKey = (id: string) => `harmony_popup_dismissed_${id}`;

function activePhase(): PromotionPopupPhase | null {
  // The ?bf_phase QA override selects a phase by name; otherwise the real date decides.
  if (phaseOverride()) {
    const phase = clientBlackFridayPhase();
    return promotionPopupPhases.find((p) => p.bfPhase === phase) ?? null;
  }
  const now = Date.now();
  return promotionPopupPhases.find((p) => now >= Date.parse(p.startsAt) && now < Date.parse(p.endsAt)) ?? null;
}
function dismissed(id: string) { try { return sessionStorage.getItem(dismissKey(id)) === "1"; } catch { return false; } }
function rememberDismissed(id: string) { try { sessionStorage.setItem(dismissKey(id), "1"); } catch { /* may show again */ } }

/** Config-driven promotion popup (Black Friday 2026). One dismissal per phase, per session. */
export default function PromotionPopup() {
  const pathname = usePathname() ?? "";
  if (popupExcluded(pathname)) return null;
  return <PromotionDialog key={pathname} pathname={pathname} />;
}

function PromotionDialog({ pathname }: { pathname: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [phase, setPhase] = useState<PromotionPopupPhase | null>(null);

  useEffect(() => {
    // Google Ads visitors land on a page that already shows the offer; never cover it.
    if (isAdVisitorNow()) return;
    const current = activePhase();
    if (!current || dismissed(current.id)) return;
    const timer = window.setTimeout(() => setPhase(current), 700);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!phase) return;
    dialog.current?.showModal();
    trackEvent("select_content", { content_type: "promotion_popup", item_id: phase.id, action: "open" });
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => { root.style.overflow = previous; };
  }, [phase]);

  if (!phase) return null;
  const close = () => { rememberDismissed(phase.id); setPhase(null); };
  const click = (action: string) => { trackEvent("select_content", { content_type: "promotion_popup", item_id: phase.id, action }); close(); };

  return (
    <dialog
      ref={dialog}
      className={`${styles.dialog} ${noir.noir} ${displayFont.variable}`}
      aria-labelledby="promotion-popup-title"
      data-no-reveal
      onClose={() => { rememberDismissed(phase.id); setPhase(null); }}
      onClick={(event) => { if (event.target === dialog.current) close(); }}
    >
      <div className={styles.layout}>
        <div className={styles.photo}>
          <OfferImage slot="provider" sizes="(max-width: 760px) 1px, 320px" label="Black Friday" className={styles.photoInner} />
        </div>
        <div className={`${styles.body} ${noir.grain}`}>
          <button type="button" className={styles.close} onClick={close} aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          <p className={noir.eyebrow}>{phase.eyebrow}</p>
          <h2 id="promotion-popup-title" className={`${noir.display} ${styles.title}`}><span className={noir.foil}>{phase.title}</span></h2>
          <p className={styles.text}>{phase.body}</p>
          <div className={styles.actions}>
            <PopupLink cta={phase.primaryCta} className={noir.btnPrimary} onClick={() => click(phase.primaryCta.action)} />
            <PopupLink cta={phase.secondaryCta} className={noir.btnSecondary} onClick={() => click(phase.secondaryCta.action)} />
          </div>
          {phase.note ? <p className={styles.note}>{phase.note}</p> : null}
        </div>
      </div>
    </dialog>
  );
}
