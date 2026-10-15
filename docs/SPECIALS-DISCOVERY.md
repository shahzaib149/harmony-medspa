# Public promotion discovery

## Correction: preserve existing Specials destination

At the owner's request, restored the original `/specials` Mailchimp redirect,
navigation/home links, and original dormant route source. Removed `/specials`
from the sitemap because it redirects externally. The new on-site Specials page
is no longer served. Homepage/blog banners still link to the published article;
blog sitemap and cache improvements remain. The implementation notes below
describe the initial version, superseded by this correction for Specials.

Implemented from origin/main, October 15, 2026. CRM records are unchanged.

## Confirmed baseline

- Flash-sale article returns 200; its initial HTML includes prices and the correct canonical, without noindex.
- The production sitemap did not include the flash-sale slug.
- `/specials` redirected to Mailchimp and the navigation linked there directly.
- Existing robots rules allow public search crawlers. No crawler protections were changed.
- External tool retrieval failure is not explained by these checks. Provider/firewall logs are still needed to establish whether actual crawler traffic is blocked.

## Implementation

- Server-rendered banner on homepage and blog listing; status notice on the campaign article.
- On-site `/specials` with confirmed flyer prices, dates, membership tiers, terms and article/contact links. Mailchimp remains a secondary destination.
- Request-time date evaluation on only the affected routes. October 15–16, 2026 in Sarasota ends at `2026-10-17T04:00:00Z`. Afterwards homepage/listing banners disappear and article/Specials state that the promotion ended.
- Sitemap refresh interval: 300 seconds, plus explicit webhook invalidation. External publication webhook immediately expires the blog data tag instead of serving a stale first response.
- Sitemap uses strict CMS reads: failed regeneration retains the previous complete ISR result rather than replacing it with a successful partial sitemap. Missing production CMS configuration must be corrected, not silently ignored.
- Public CMS mapping excludes future-dated publication records. Existing published filter, pagination, legacy fallback and canonical behavior otherwise remain intact.

## Checks

`node scripts/test-promotion-discovery.cjs`

Tests date boundaries, draft/future exclusion, pagination, deduplication, redirect exclusion and authenticated webhook invalidation including old slugs.

Local verification: production build and TypeScript passed; initial HTML checks passed for all six target routes including the sitemap. Chrome desktop (1440px) and mobile (390px) had no horizontal overflow. Essential offer terms opt out of the site's scroll-reveal effect.

The repository-wide lint command fails on an existing `react-hooks` plugin registration issue. Scoped lint of the changed files passes when the installed plugin is explicitly registered through ESLint's programmatic override; no unrelated lint configuration was changed.

Check production initial HTML without scripts, `/specials` response without redirects, sitemap membership, canonical/noindex, mobile overflow, and contact/navigation links after deployment.

No guarantee of immediate indexing or AI citations. Search Console submission and verified crawler/firewall logs require the relevant account access. Do not disable bot protection globally or conflate search crawling with training permissions.
