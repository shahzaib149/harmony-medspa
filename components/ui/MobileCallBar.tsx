"use client";

import { useEffect, useLayoutEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { CalendarDays, Gift, Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { ONLINE_BOOKING_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import { BF_RESERVE_ID } from "@/lib/data/blackFriday2026";
import { useBlackFridayPhase } from "@/lib/promotions/useBlackFridayPhase";
import { useIsAdVisitor } from "@/lib/promotions/useIsAdVisitor";
import styles from "./MobileCallBar.module.css";

/* Page-level bars register here, so the global bar in the root layout only shows when the
   page has none of its own (exactly one bar per page). */
let pageBars = 0;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());
const subscribeBars = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
const pageBarCount = () => pageBars;
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Paths whose bar switches to the Black Friday offer while the sale runs. */
function bfPath(pathname: string) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return path === "/" || path === "/glo2facials" || path === "/black-friday" || path.startsWith("/landing/");
}

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Sticky call bar for phones (under 768px). "Call" is a plain tel: link, so the sitewide
 * PhoneClickTracker records the Google Ads phone conversion and the dialer opens at once.
 * "Book online" scrolls to the page's form when there is one, otherwise opens PatientNow.
 * While Black Friday runs (Nov 19–30) on ad landing paths, or for any Google Ads visitor,
 * the right button becomes "Get Black Friday Offer" (the page's #bf-reserve form, else
 * /black-friday#request). The bar hides while a form's submit button is on screen so it
 * never covers it, and the page gets bottom padding so nothing sits behind it.
 */
export default function MobileCallBar({ formId, tone = "default", bookLabel = "Book online", promo = true, global = false }: {
  formId?: string;
  /** "noir" = the Black Friday black-and-gold styling. */
  tone?: "default" | "noir";
  /** Label of the right-hand button. */
  bookLabel?: string;
  /** false keeps this bar exactly as configured (the /black-friday page's own bars). */
  promo?: boolean;
  /** The root-layout instance; it does not count as a page bar. */
  global?: boolean;
}) {
  const pathname = usePathname() ?? "";
  const phase = useBlackFridayPhase();
  const adVisitor = useIsAdVisitor();
  const bfMode = promo && phase !== "ended" && (bfPath(pathname) || adVisitor);
  const [reserveOnPage, setReserveOnPage] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useIsoLayoutEffect(() => {
    if (global) return;
    pageBars += 1; notify();
    return () => { pageBars -= 1; notify(); };
  }, [global]);

  useEffect(() => {
    document.documentElement.classList.add(styles.withBar);
    return () => document.documentElement.classList.remove(styles.withBar);
  }, []);

  useEffect(() => { setReserveOnPage(Boolean(document.getElementById(BF_RESERVE_ID))); }, [pathname]);

  // The form whose submit button the bar must never cover.
  const watchId = bfMode && reserveOnPage ? BF_RESERVE_ID : formId;

  // Hide only while the form's submit button is on screen, so the bar never covers it but
  // stays available while the visitor reads the rest of the page. Re-checks when the form
  // swaps to its success message (the button disappears).
  useEffect(() => {
    const form = watchId ? document.getElementById(watchId) : null;
    if (!form || !("IntersectionObserver" in window)) { setFormVisible(false); return; }
    let observer: IntersectionObserver | null = null;
    let watched: Element | null = null;
    const watch = () => {
      const button = form.querySelector('button[type="submit"], input[type="submit"]');
      if (button === watched) return;
      observer?.disconnect();
      watched = button;
      if (!button) { setFormVisible(false); return; }
      observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { rootMargin: "0px 0px 90px 0px" });
      observer.observe(button);
    };
    watch();
    const mutations = new MutationObserver(watch);
    mutations.observe(form, { childList: true, subtree: true });
    return () => { observer?.disconnect(); mutations.disconnect(); };
  }, [watchId]);

  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, id?: string) => {
    const form = id ? document.getElementById(id) : null;
    if (!form) return false; // no such form on this page: follow the link
    event.preventDefault();
    form.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
    return true;
  };
  const book = (event: React.MouseEvent<HTMLAnchorElement>) => { scrollTo(event, formId); };
  const offer = (event: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent("select_content", { content_type: "bf_callbar_offer", item_id: pathname });
    scrollTo(event, BF_RESERVE_ID);
  };

  const hiddenProps = { tabIndex: formVisible ? -1 : undefined };
  return (
    <nav className={`${styles.bar} ${tone === "noir" || bfMode ? styles.noir : ""} ${formVisible ? styles.hidden : ""}`} aria-label="Call or book" aria-hidden={formVisible || undefined} data-callbar={bfMode ? "bf" : "default"}>
      <a className={styles.call} href={`tel:+1${PHONE_TEL}`} {...hiddenProps}>
        <Phone size={17} aria-hidden="true" /> {bfMode ? "Call Now" : `Call ${PHONE_DISPLAY}`}
      </a>
      {bfMode ? (
        <a className={styles.book} href={reserveOnPage ? `#${BF_RESERVE_ID}` : "/black-friday#request"} onClick={offer} {...hiddenProps}>
          <Gift size={17} aria-hidden="true" /> Get Black Friday Offer
        </a>
      ) : (
        <a className={styles.book} href={formId ? `#${formId}` : ONLINE_BOOKING_URL} onClick={book} {...hiddenProps}
          {...(formId ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
          <CalendarDays size={17} aria-hidden="true" /> {bookLabel}
        </a>
      )}
    </nav>
  );
}

/**
 * Root-layout bar: on the homepage and for Google Ads visitors on any page, while Black
 * Friday runs, when the page has no bar of its own. After Nov 30 it renders nothing.
 */
export function GlobalMobileCallBar() {
  const pathname = usePathname() ?? "";
  const phase = useBlackFridayPhase();
  const adVisitor = useIsAdVisitor();
  const others = useSyncExternalStore(subscribeBars, pageBarCount, () => 0);
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (phase === "ended" || others > 0 || !(path === "/" || adVisitor)) return null;
  return <MobileCallBar global />;
}
