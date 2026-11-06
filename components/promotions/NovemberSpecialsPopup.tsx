"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { ONLINE_BOOKING_URL } from "@/lib/constants";
import { displayFont } from "@/lib/fonts";
import { novemberSpecials, novemberSpecialsActive } from "@/lib/promotions";
import styles from "./NovemberSpecialsPopup.module.css";

const DISMISSED_KEY = "harmony_november_popup_dismissed";
// Regulated ad landing pages and task pages stay free of promotions.
const EXCLUDED_PATHS = ["/landing", "/offer-test-fixture", "/unsubscribe", "/patient-forms"];

function alreadyDismissed() {
  try { return sessionStorage.getItem(DISMISSED_KEY) === "1"; } catch { return false; }
}

function rememberDismissed() {
  try { sessionStorage.setItem(DISMISSED_KEY, "1"); } catch { /* The popup can simply show again. */ }
}

function track(action: string) {
  trackEvent("select_content", { content_type: "november_specials_popup", item_id: "november_2026", action });
}

export default function NovemberSpecialsPopup() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (EXCLUDED_PATHS.some(path => pathname.startsWith(path))) return;
    if (!novemberSpecialsActive() || alreadyDismissed()) return;
    const timer = window.setTimeout(() => setShow(true), 700);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!show) return;
    dialog.current?.showModal();
    track("open");
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => { root.style.overflow = previous; };
  }, [show]);

  if (!show) return null;

  // Closing unmounts the dialog, which also takes it out of the top layer.
  const close = () => { rememberDismissed(); setShow(false); };
  const { featured, offers, terms } = novemberSpecials;

  return (
    <dialog
      ref={dialog}
      className={`${styles.dialog} ${displayFont.variable}`}
      aria-labelledby="november-specials-title"
      data-no-reveal
      onClose={() => { rememberDismissed(); setShow(false); }}
      onClick={event => { if (event.target === dialog.current) close(); }}
    >
      <div className={styles.layout}>
        <div className={styles.photo}>
          <Image
            src="/images/office/october-2026/harmony-lounge-logo-wall.jpg"
            alt="The Harmony Med Spa lounge in Sarasota"
            fill
            sizes="(max-width: 760px) 1px, 320px"
          />
        </div>
        <div className={styles.body}>
          <button type="button" className={styles.close} onClick={close} aria-label="Close November specials">
            <span aria-hidden="true">×</span>
          </button>
          <p className={styles.eyebrow}>This month at Harmony</p>
          <h2 id="november-specials-title" className={styles.title}>November Specials</h2>

          <div className={styles.featured}>
            <div>
              <h3>{featured.name}</h3>
              <p>{featured.detail}</p>
            </div>
            <div className={styles.price}>
              <strong>{featured.price}</strong>
              <span>{featured.regular}</span>
            </div>
          </div>

          <ul className={styles.offers}>
            {offers.map(offer => <li key={offer.name}><b>{offer.name}</b><span>{offer.deal}</span></li>)}
          </ul>

          <div className={styles.actions}>
            <a href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer" className={styles.primary} onClick={() => { track("book_hormone_consultation"); close(); }}>
              Book Your 50% off Hormone Consultation
            </a>
            <Link href="/membership" className={styles.secondary} onClick={() => { track("join_membership"); close(); }}>
              Join Harmony This November &amp; Save $100 on Dermal Filler
            </Link>
          </div>

          <p className={styles.terms}>{terms}</p>
        </div>
      </div>
    </dialog>
  );
}
