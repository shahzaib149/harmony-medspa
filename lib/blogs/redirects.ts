// Permanent redirects between blog slugs, handled by app/blog/[slug]/page.tsx.
// Keys and values are lowercase slugs, matched exactly, so a rule can never match its
// own destination (the case-insensitive next.config.ts matching that caused the
// Jeuveau loop does not apply here).
export const BLOG_REDIRECTS: Record<string, string> = {
  // Duplicate of the original WordPress URL. The Airtable CMS record now uses the
  // original slug, so the shortened slug points there.
  "feel-the-love-this-valentines-day-reignite-your-passion-with-hormone-replacement":
    "feel-the-love-this-valentines-day-reignite-your-passion-with-hormone-replacement-therapy",
};

// Blog slugs redirected by next.config.ts redirects(). Keep in sync with that list.
const CONFIG_REDIRECTED_BLOG_SLUGS = ["revivamask-recovery-mask-sarasota"];

/** Every blog slug that redirects elsewhere. The sitemap must never list these. */
export const REDIRECTED_BLOG_SLUGS = new Set([...CONFIG_REDIRECTED_BLOG_SLUGS, ...Object.keys(BLOG_REDIRECTS)]);

export function blogRedirectTarget(slug: string) {
  return BLOG_REDIRECTS[slug.toLowerCase()] ?? null;
}
