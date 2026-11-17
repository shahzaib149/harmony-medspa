"use client";

import { useEffect } from "react";
import { FAX_TEL } from "@/lib/constants";
import { trackPhoneClick } from "@/lib/analytics";

/**
 * One listener for the whole site: any tap on a tel: link (header, footer, landing pages,
 * service pages, CMS content) records a phone conversion. The fax number is skipped.
 * Capture phase, passive, and no preventDefault, so the dialer is never delayed.
 */
export default function PhoneClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.replace(/\D/g, "").endsWith(FAX_TEL)) return;
      trackPhoneClick(href);
    };
    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
