"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Phone } from "lucide-react";
import { ONLINE_BOOKING_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import styles from "./MobileCallBar.module.css";

/**
 * Sticky call bar for phones (under 768px). "Call" is a plain tel: link, so the sitewide
 * PhoneClickTracker records the Google Ads phone conversion and the dialer opens at once.
 * "Book online" scrolls to the page's form when there is one, otherwise opens PatientNow.
 * The bar hides while the form is on screen so it never covers the submit button, and
 * the page gets bottom padding so nothing sits behind it.
 */
export default function MobileCallBar({ formId }: { formId?: string }) {
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add(styles.withBar);
    return () => document.documentElement.classList.remove(styles.withBar);
  }, []);

  // Hide only while the form's submit button is on screen, so the bar never covers it but
  // stays available while the visitor reads the rest of the page. Re-checks when the form
  // swaps to its success message (the button disappears).
  useEffect(() => {
    const form = formId ? document.getElementById(formId) : null;
    if (!form || !("IntersectionObserver" in window)) return;
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
  }, [formId]);

  const book = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const form = formId ? document.getElementById(formId) : null;
    if (!form) return; // no form on this page: follow the PatientNow link
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    form.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav className={`${styles.bar} ${formVisible ? styles.hidden : ""}`} aria-label="Call or book" aria-hidden={formVisible || undefined}>
      <a className={styles.call} href={`tel:+1${PHONE_TEL}`} tabIndex={formVisible ? -1 : undefined}>
        <Phone size={17} aria-hidden="true" /> Call {PHONE_DISPLAY}
      </a>
      <a className={styles.book} href={formId ? `#${formId}` : ONLINE_BOOKING_URL} onClick={book} tabIndex={formVisible ? -1 : undefined}
        {...(formId ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
        <CalendarDays size={17} aria-hidden="true" /> Book online
      </a>
    </nav>
  );
}
