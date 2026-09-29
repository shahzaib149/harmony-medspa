"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";
import { captureAttribution } from "@/lib/analytics/attribution";

export default function AnalyticsNavigation() {
  const pathname = usePathname();
  const query = useSearchParams().toString();
  useEffect(() => {
    captureAttribution();
    // Next can briefly remove <title> during a navigation commit, even when
    // metadata streaming is disabled. Do not lose that view after one timer.
    let frame = 0;
    const record = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!document.title) return;
        trackPageView();
        observer.disconnect();
      });
    };
    const observer = new MutationObserver(record);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    record();
    // Shared runtime dedup covers bootstrap/Strict Mode/remounts, counts A→B→A,
    // and excludes hashes. Cleanup cancels a navigation that never committed.
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [pathname, query]);
  return null;
}
