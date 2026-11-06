"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { OFFER_ENDS_AT } from "@/lib/data/novemberOffers";
import styles from "./November.module.css";

/** Adds `.in` to every [data-reveal] element as it scrolls into view. Without JS, content stays visible. */
export function RevealObserver() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-landing-root]");
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    root.dataset.motion = "on";
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.in);
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    root.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}

const noSubscription = () => () => {};
const daysLeft = () => Math.max(0, Math.ceil((Date.parse(OFFER_ENDS_AT) - Date.now()) / 86_400_000));

/** "Offer ends Nov 30", plus the days left once mounted. The number slot is reserved, so nothing shifts. */
export function CountdownPill({ label = "Offer ends Nov 30" }: { label?: string }) {
  // Server render has no clock reading, so the client fills the reserved slot after hydration.
  const days = useSyncExternalStore(noSubscription, daysLeft, () => null);
  return (
    <span className={styles.countdown}>
      <span className={styles.countdownDot} aria-hidden="true" />
      {label}
      <span className={styles.countdownDays} aria-live="polite">
        {days === null ? "" : days === 0 ? " · ends today" : ` · ${days} day${days === 1 ? "" : "s"} left`}
      </span>
    </span>
  );
}

/** A tel: link that records a call click through the shared analytics helper. */
export function TrackedCall({ href, className, children, placement, ariaLabel }: {
  href: string; className?: string; children: ReactNode; placement: string; ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={() => trackEvent("click", { link_type: "phone", link_url: href, placement, page_path: window.location.pathname })}
    >
      {children}
    </a>
  );
}

/** Mobile-only bottom bar; hides while the lead form is on screen. */
export function StickyMobileCTA({ formId, phoneHref, bookLabel }: { formId: string; phoneHref: string; bookLabel: string }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const form = document.getElementById(formId);
    if (!form || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(form);
    return () => observer.disconnect();
  }, [formId]);
  return (
    <div className={`${styles.stickyCta} ${hidden ? styles.stickyHidden : ""}`} aria-hidden={hidden}>
      <TrackedCall href={phoneHref} className={styles.stickyCall} placement="sticky_mobile">Call</TrackedCall>
      <a href={`#${formId}`} className={styles.stickyBook} tabIndex={hidden ? -1 : 0}>{bookLabel}</a>
    </div>
  );
}

/** Counts a whole-dollar price up from 70% when it first scrolls into view. Server HTML shows the final value. */
export function CountUp({ value, prefix = "$" }: { value: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const from = Math.round(value * 0.7);
      const step = (now: number) => {
        const t = Math.min((now - start) / 700, 1);
        setShown(Math.round(from + (value - from) * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={ref} aria-label={`${prefix}${value}`}><span aria-hidden="true">{prefix}{shown}</span></span>;
}
