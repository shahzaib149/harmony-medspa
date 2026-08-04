export function trackLeadConversion() {
  if (typeof window === "undefined") return;
  const gtag = (window as any).gtag;
  if (typeof gtag !== "function") return;
  const sendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_SEND_TO;
  if (!sendTo) return;
  gtag("event", "conversion", { send_to: sendTo, value: 100, currency: "USD" });
  if (process.env.NODE_ENV !== "production") {
    console.log("[gtag] lead conversion fired");
  }
}
