import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const SITE_DESCRIPTION =
  "Harmony Med Spa is a full-service medical spa and wellness center in Sarasota, Florida, offering injectables, laser treatments, facials, weight loss, and hormone therapy.";

// Next.js replaces (does not merge) the layout's openGraph when a page sets its own,
// so pages spread these shared fields and add their own url. Title and description are
// deliberately absent: Next fills og:title and og:description from the page's own
// resolved title and description, so every page shares its own text, not the homepage's.
export const sharedOpenGraph = {
  type: "website",
  siteName: SITE_NAME,
  locale: "en_US",
} satisfies Metadata["openGraph"];

/** OpenGraph for an indexable page: shared fields plus its own og:url (resolved against metadataBase). */
export function openGraphFor(path: string, overrides: { title?: string } = {}): Metadata["openGraph"] {
  return { ...sharedOpenGraph, url: path, ...overrides };
}
