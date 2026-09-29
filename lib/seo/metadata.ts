import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const SITE_DESCRIPTION =
  "Harmony Med Spa is a full-service medical spa and wellness center in Sarasota, Florida, offering injectables, laser treatments, facials, weight loss, and hormone therapy.";

// Next.js replaces (does not merge) the layout's openGraph when a page sets its own,
// so pages spread these shared fields and add their own url.
export const sharedOpenGraph = {
  type: "website",
  siteName: SITE_NAME,
  title: `${SITE_NAME} | Sarasota, FL`,
  description: SITE_DESCRIPTION,
  locale: "en_US",
} satisfies Metadata["openGraph"];

/** OpenGraph for an indexable page: shared fields plus its own og:url (resolved against metadataBase). */
export function openGraphFor(path: string): Metadata["openGraph"] {
  return { ...sharedOpenGraph, url: path };
}
