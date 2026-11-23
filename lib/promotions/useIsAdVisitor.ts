import { useSyncExternalStore } from "react";

const PAID_KEYS = ["gclid", "gbraid", "wbraid"] as const;
const ATTRIBUTION_KEY = "harmony_attribution_v1";

/**
 * True when this visit came from a Google Ads click: a gclid / gbraid / wbraid or
 * utm_medium=cpc in the URL, or an unexpired paid click in the stored attribution
 * (the same localStorage record lib/analytics.ts writes). Never throws.
 */
export function isAdVisitorNow(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const query = new URLSearchParams(window.location.search);
    if (PAID_KEYS.some((key) => query.get(key)) || (query.get("utm_medium") ?? "").toLowerCase() === "cpc") return true;
  } catch { /* fall through to the stored attribution */ }
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY);
    if (!raw) return false;
    const stored = JSON.parse(raw) as { values?: Record<string, string>; expires?: number };
    if (!stored?.values || !Number.isFinite(stored.expires) || (stored.expires as number) <= Date.now()) return false;
    return PAID_KEYS.some((key) => Boolean(stored.values?.[key]));
  } catch {
    return false;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener("storage", onChange);
  return () => { window.removeEventListener("popstate", onChange); window.removeEventListener("storage", onChange); };
}

/** Client-only: false during server render and hydration, then the real value. */
export function useIsAdVisitor(): boolean {
  return useSyncExternalStore(subscribe, isAdVisitorNow, () => false);
}
