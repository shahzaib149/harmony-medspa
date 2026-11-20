

export const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim() || "";
export const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID?.trim() || "";
const leadSendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_SEND_TO?.trim() || "";
export const validMeasurementId = /^G-[A-Z0-9]+$/.test(measurementId) ? measurementId : "";
export const validConversionId = /^AW-\d+$/.test(conversionId) ? conversionId : "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __harmonyTracking?: TrackingRuntime;
  }
}

export type EventParameters = Record<string, string | number | boolean>;
type TrackingConfig = { measurement: string; conversion: string };

// All references inside this function are local. It is serialized into the head,
// so it must remain self-contained even after production minification.
type TrackingRuntime = { capture: () => Record<string, string>; read: () => Record<string, string>; referrer: () => string; event: (name: string, parameters: EventParameters) => void; pageView: () => void };
export function initializeAnalytics(config: TrackingConfig): TrackingRuntime {
  if (window.__harmonyTracking) return window.__harmonyTracking;
  const key = "harmony_attribution_v1";
  const ttl = 90 * 24 * 60 * 60 * 1000;
  let memory: { values: Record<string, string>; expires: number } | undefined;
  let lastPage = "";
  const read = (): Record<string, string> => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) memory = JSON.parse(raw);
    } catch { /* Storage denial must not prevent a lead. */ }
    if (!memory || !Number.isFinite(memory.expires) || memory.expires <= Date.now() || !memory.values) return {};
    return { ...memory.values };
  };
  const capture = () => {
    const incoming: Record<string, string> = {};
    new URLSearchParams(window.location.search).forEach((value, name) => {
      if (value && (/^utm_/i.test(name) || ["gclid", "gbraid", "wbraid", "matchtype", "device", "network"].includes(name))) incoming[name.toLowerCase()] = value;
    });
    const stored = read();
    const paid = ["gclid", "gbraid", "wbraid"];
    const newPaid = paid.some(name => incoming[name] && incoming[name] !== stored[name]);
    const hasPaid = paid.some(name => stored[name]);
    // Last paid click replaces the entire campaign. Browsing/organic visits do
    // not extend its lifetime or mix their UTMs into that paid campaign.
    const values = newPaid ? incoming : hasPaid ? stored : { ...stored, ...incoming };
    if (Object.keys(incoming).length && (newPaid || !hasPaid)) {
      memory = { values, expires: Date.now() + ttl };
      try { window.localStorage.setItem(key, JSON.stringify(memory)); } catch { /* memory fallback */ }
    }
    return values;
  };
  // First external referrer, kept separately from campaign attribution so its
  // rules never interact. Recorded at landing (a later internal page load would
  // report this site as the referrer). Raw string; classification happens in
  // the dashboard. Empty means no external referrer has been seen.
  const referrerKey = "harmony_referrer_v1";
  let referrerMemory: { value: string; expires: number } | undefined;
  const referrer = (): string => {
    try {
      const raw = window.localStorage.getItem(referrerKey);
      if (raw) referrerMemory = JSON.parse(raw);
    } catch { /* Storage denial must not prevent a lead. */ }
    if (!referrerMemory || !Number.isFinite(referrerMemory.expires) || referrerMemory.expires <= Date.now() || typeof referrerMemory.value !== "string") return "";
    return referrerMemory.value;
  };
  const captureReferrer = () => {
    if (referrer()) return;
    let host = "";
    try { host = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, "") : ""; } catch { host = ""; }
    if (!host || host === window.location.hostname.replace(/^www\./, "")) return;
    referrerMemory = { value: document.referrer, expires: Date.now() + ttl };
    try { window.localStorage.setItem(referrerKey, JSON.stringify(referrerMemory)); } catch { /* memory fallback */ }
  };
  window.dataLayer = window.dataLayer || [];
  // Google's documented command queue uses Arguments objects, not event arrays.
  // eslint-disable-next-line prefer-rest-params
  window.gtag = window.gtag || function () { window.dataLayer!.push(arguments); };
  const event = (name: string, parameters: EventParameters) => window.gtag!("event", name, parameters);
  const pageView = () => {
    const location = window.location.href.split("#")[0];
    if (!config.measurement || lastPage === location || !document.title) return;
    const referrer = lastPage || document.referrer;
    lastPage = location;
    event("page_view", { send_to: config.measurement, page_title: document.title,
      page_location: location, page_referrer: referrer });
  };
  const runtime = { capture, read, referrer, event, pageView };
  window.__harmonyTracking = runtime;
  capture();
  captureReferrer();
  window.gtag("js", new Date());
  // Manual page views own BOTH initial and client navigations. GA4 Admin >
  // Web stream > Enhanced measurement > Page views > history MUST be OFF.
  // send_page_view:false alone DOES NOT disable Enhanced Measurement history.
  for (const id of [config.conversion, config.measurement].filter(Boolean)) {
    window.gtag("config", id, { send_page_view: false });
  }
  // Create the async loader only AFTER the stub/config queue exists. React 19
  // hoists JSX async scripts ahead of inline siblings, so do not use one here.
  const loaderId = config.measurement || config.conversion;
  if (loaderId && !document.getElementById("google-gtag-loader")) {
    const loader = document.createElement("script");
    loader.id = "google-gtag-loader";
    loader.async = true;
    loader.src = "https://www.googletagmanager.com/gtag/js?id=" + loaderId;
    document.head.appendChild(loader);
  }
  if (document.title) pageView();
  else {
    const observer = new MutationObserver(() => {
      if (document.title) { pageView(); observer.disconnect(); }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
  return runtime;
}

export function trackingRuntime() {
  if (typeof window === "undefined") return undefined;
  return window.__harmonyTracking || initializeAnalytics({ measurement: validMeasurementId, conversion: validConversionId });
}
export function trackEvent(name: "select_content" | "click" | "file_download", parameters: EventParameters) {
  trackingRuntime()?.event(name, parameters);
}
export function trackPageView() { trackingRuntime()?.pageView(); }

// Google Ads "Phone Click - Landing". A public conversion id/label, not a secret;
// NEXT_PUBLIC_GOOGLE_ADS_PHONE_SEND_TO can override it without a code change.
const phoneSendToSetting = process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_SEND_TO?.trim() || "AW-11396978687/MnC1CIGTiLodEP-vwLoq";
export const phoneSendTo = /^AW-\d+\/[A-Za-z0-9_-]+$/.test(phoneSendToSetting) ? phoneSendToSetting : "";
let phoneConversionPage = "";

/**
 * A tap on any tel: link. Fires the Google Ads phone conversion at most once per page
 * view, and a GA4 phone_click with the page and the stored campaign / ad group. Uses
 * beacon transport and never touches the click event, so the dialer opens immediately.
 */
export function trackPhoneClick(href: string) {
  const runtime = trackingRuntime();
  if (!runtime) return;
  const attribution = runtime.read();
  if (validMeasurementId) {
    runtime.event("phone_click", {
      send_to: validMeasurementId,
      page_path: window.location.pathname,
      link_url: href,
      utm_campaign: attribution.utm_campaign ?? "",
      utm_adgroup: attribution.utm_adgroup || attribution.utm_ad_group || "",
      transport_type: "beacon",
    });
  }
  const page = window.location.pathname + window.location.search;
  if (phoneSendTo && phoneConversionPage !== page) {
    phoneConversionPage = page;
    runtime.event("conversion", { send_to: phoneSendTo, transport_type: "beacon" });
  }
}

const confirmed = new WeakSet<Response>();
const tracked = new WeakSet<Response>();
const successBrand: unique symbol = Symbol("successful-lead-response");
export type SuccessfulLeadResponse = Response & { readonly [successBrand]: true };

// Called ONLY by the shared transport after Make has acknowledged the request.
export function confirmLeadResponse(response: Response): SuccessfulLeadResponse {
  if (!response.ok) throw new Error("Lead submission failed");
  confirmed.add(response);
  return response as SuccessfulLeadResponse;
}

export function trackLead(response: SuccessfulLeadResponse) {
  if (!response || !response.ok || !confirmed.has(response) || tracked.has(response)) return;
  tracked.add(response);
  if (/^AW-\d+\/[A-Za-z0-9_-]+$/.test(leadSendTo)) {
    trackingRuntime()?.event("conversion", { send_to: leadSendTo, value: 100, currency: "USD" });
  }
  if (validMeasurementId) trackingRuntime()?.event("generate_lead", {
    send_to: validMeasurementId, value: 100, currency: "USD",
  });
}

// Black Friday 2026. Both Google Ads labels are optional: unset or malformed means GA4 only.
// Secondary conversions created Nov 20 (BF2026 Text or Book Click / Gift Card Request); env vars override.
const purchaseSendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_SEND_TO?.trim() || "AW-11396978687/qyPbCJb1p7wdEP-vwLoq";
const giftCardSendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_GIFTCARD_SEND_TO?.trim() || "AW-11396978687/ueAUCJP1p7wdEP-vwLoq";
const isSendTo = (value: string) => /^AW-\d+\/[A-Za-z0-9_-]+$/.test(value);

/** A click on a Black Friday "Purchase" / "Request This Offer" button. Beacon transport, never blocks navigation. */
export function trackPurchaseLinkClick(offerId: string, url: string) {
  const runtime = trackingRuntime();
  if (!runtime) return;
  if (validMeasurementId) {
    runtime.event("select_content", {
      send_to: validMeasurementId, content_type: "black_friday_offer", item_id: offerId,
      link_url: url, page_path: window.location.pathname, transport_type: "beacon",
    });
  }
  if (isSendTo(purchaseSendTo)) runtime.event("conversion", { send_to: purchaseSendTo, transport_type: "beacon" });
}

/**
 * A gift card request Make has acknowledged. Fires its own Ads conversion (value = amount)
 * and GA4 generate_lead with lead_type "gift_card". Deliberately not the main lead conversion.
 */
export function trackGiftCardRequest(response: SuccessfulLeadResponse, amount: number) {
  if (!response || !response.ok || !confirmed.has(response) || tracked.has(response)) return;
  tracked.add(response);
  const value = Math.round(amount * 100) / 100;
  if (isSendTo(giftCardSendTo)) trackingRuntime()?.event("conversion", { send_to: giftCardSendTo, value, currency: "USD" });
  if (validMeasurementId) trackingRuntime()?.event("generate_lead", { send_to: validMeasurementId, value, currency: "USD", lead_type: "gift_card" });
}

export function googleTagBootstrap() {
  return '(' + initializeAnalytics.toString() + ')(' + JSON.stringify({
    measurement: validMeasurementId, conversion: validConversionId,
  }) + ');';
}
