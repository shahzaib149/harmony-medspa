import { trackingRuntime } from "../analytics";

export function readAttribution() { return trackingRuntime()?.read() ?? {}; }
export function captureAttribution() { return trackingRuntime()?.capture() ?? {}; }

/** Raw first external referrer for the lead, or "direct" when none was seen (or during SSR). */
export function referrerSource() {
  if (typeof window === "undefined") return "direct";
  return trackingRuntime()?.referrer() || "direct";
}

export function attributionFields() {
  const p = readAttribution();
  return {
    ...p,
    "UTM Source": p.utm_source ?? "", "UTM Medium": p.utm_medium ?? "",
    "UTM Campaign": p.utm_campaign ?? "", "UTM Ad Group": p.utm_ad_group || p.utm_adgroup || "",
    "UTM Content": p.utm_content ?? "", "UTM Term": p.utm_term ?? "",
    GCLID: p.gclid ?? "", GBRAID: p.gbraid ?? "", WBRAID: p.wbraid ?? "",
    "Match Type": p.matchtype ?? "", Device: p.device ?? "", Network: p.network ?? "",
  };
}
