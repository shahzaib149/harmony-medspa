@AGENTS.md

# Harmony Med Spa public website

Repo `shahzaib149/harmony-medspa`. Live at https://www.harmonymedspafl.com (Vercel; a push to `main` deploys in about 1 minute). Workspace-wide context, rules and restore steps are in `D:\HarmonyDashboard\CLAUDE.md`. Updated 2026-11-19.

Other docs:
- `PRODUCTION_DEPLOYMENT.md`
- `ANALYTICS.md`
- `ANALYTICS-RELEASE.md`
- `docs/` (homepage offers, specials discovery, CI checks, landing design briefs)

## What it is
The marketing site:
- service pages
- paid landing pages under `/landing/*`, all noindex
- the blog: legacy static posts plus Airtable CMS posts published from the CRM
- lead forms that post to the Make webhook, which writes to Airtable Leads
- GA4 and Google Ads conversion tags

`/dashboard/*` redirects to the CRM.

## Stack
Next.js 16 App Router (read `node_modules/next/dist/docs/`, since APIs differ from older versions), React 19, TypeScript, Tailwind 4 plus project CSS, lucide-react, Playwright for analytics regression tests.

## Commands
```bash
npm install
npm run build                 # next build --webpack
npm run lint                  # eslint + check:analytics
npm run test:analytics        # browser regression tests; never run raw `npx playwright test`
npx next typegen && npx tsc --noEmit   # fresh worktree needs typegen first
```
- Local production build: needs `VERCEL_ENV=production` plus the three `NEXT_PUBLIC_*` analytics vars.
- Preview: launch config `website-november` (`npm start` on :3002) after a build.
- **Deploy:** from this worktree, `git fetch`, confirm a fast-forward, then `git push origin HEAD:main`. Ask the user first and never create remote branches.

## Folder map
- `app/`: routes
  - `landing/`: `november-specials`, `laser-skin`, `hormone-optimization`, `memberships`, `injectables`, `medical-weight-loss`, `advanced-skin-and-wellness-treatments`
  - `blog/[slug]`, `pricing`, `glo2facials`, `membership`
  - `sitemap.ts` (rendered per request), `robots.ts`, `api/` (blog revalidate, etc.)
- `components/`: `forms/`, `landing/` (shared landing system), `promotions/` (November specials popup), `ui/MobileCallBar.tsx`, `PhoneClickTracker.tsx`, `layout/`, `seo/`
- `lib/submitLead.ts`: shared lead submit to Make. Sends UTM, GCLID, Source, Offer Code and `referrerSource`; the first-touch referrer is stored in localStorage key `harmony_referrer_v1`.
- `lib/analytics.ts`: lead conversion, `trackPhoneClick` (Ads "Phone Click - Landing" plus GA4 `phone_click`)
- `lib/data/`:
  - `novemberOffers.ts` (`laserOffer`, `novemberSpecials`, compliance lines)
  - `landingOffers.ts` (`OFFERS_ACTIVE`)
  - `pricing.ts`, `providers.ts`
- `lib/promotions.ts`: popup window and excluded paths
- `lib/seo/routes.ts`: route registry for the sitemap and schema. `lib/schema.ts`: JSON-LD.
- `lib/blogs/`: Airtable blog reader; `redirects.ts` holds the slug redirects (not in next.config)
- `proxy.ts`: request proxy/middleware. `scripts/`: analytics checks/tests. `tests/`.

## Rules and decisions
- All `/landing*` pages are noindex. Excluded pages use a noindex tag, not a robots.txt Disallow.
- Treatment Interest on the MWL landing page is the fixed value "Medical Weight Loss".
- Use the credential "AGNP-C", not "APRN".
- Don't put these in schema until the client confirms them: X link, medicalSpecialty, geo, hours, priceRange.
- Ads policy: write "vitamin injections", never "shots".
- Never submit real forms in production: it fires a real Google Ads conversion and a real lead.
- New lead Sources must also be added to the Make Speed-to-Lead module 10 allow-list and to the Airtable options. Otherwise they save as "Landing Pages".

## Gotchas
- Vercel previews are behind Vercel SSO. Don't change Deployment Protection.
- Popup text lives in JS chunks, not HTML. Check the `/_next/static/...js` files when verifying live copy.
- For Playwright scripts, use `channel: "msedge"`, stub the Make webhook with `context.route`, and abort Google tracking hosts.
- The `D:\HarmonyDashboard\harmony-medspa` main checkout is stale and holds someone's WIP. Work here, or in a fresh worktree from origin/main.

## Env vars (names only)
`AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_BLOGS_BASE_ID`, `AIRTABLE_BLOGS_TABLE_ID`, `AIRTABLE_BLOGS_TABLE_NAME`, `BLOG_REVALIDATE_SECRET`, `CONSULTATION_OFFER`, `CONSULTATION_PRICE`, `NEXT_PUBLIC_GA4_MEASUREMENT_ID`, `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID`, `NEXT_PUBLIC_GOOGLE_ADS_LEAD_SEND_TO`, `NEXT_PUBLIC_SITE_URL`
