export const CANONICAL_SITE_URL = "https://www.harmonymedspafl.com";

export function siteUrl(value = process.env.NEXT_PUBLIC_SITE_URL) {
  const candidate = value?.trim() || CANONICAL_SITE_URL;
  try {
    const url = new URL(candidate);
    if (url.hostname === "harmony-medspa.vercel.app" || url.hostname === "harmonymedspafl.com") {
      return CANONICAL_SITE_URL;
    }
    return url.origin;
  } catch {
    return CANONICAL_SITE_URL;
  }
}

export function canonicalPublicUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.hostname === "harmony-medspa.vercel.app" || url.hostname === "harmonymedspafl.com") {
      return `${CANONICAL_SITE_URL}${url.pathname}${url.search}${url.hash}`;
    }
    return url.toString();
  } catch {
    return value;
  }
}
