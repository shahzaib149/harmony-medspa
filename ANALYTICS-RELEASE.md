# Analytics production release — 2026-09-25

Status: 69 analytics-only files staged and locally validated; no commit, push, or production deployment. Deployment held pending pre-deploy account verification.

Checkout: D:/HarmonyDashboard/harmony-medspa-analytics-release. Branch: codex/analytics-hardening-release. Base: a9d27ba. Original marketing checkout and its index are preserved. No CRM app changes.

## Release gates

- GA4 measurement/property mapping: BLOCKED. Read-only Admin API request for properties/433407977/dataStreams returns 403 because the Admin API is disabled for Google project 1064212201339. Cannot assert that G-HRPTWTFKNB belongs to 433407977 until Admin API or GA UI verifies it.
- GA4 history-based page views: verification pending; must be disabled for manual ownership.
- Vercel Production environment: BLOCKED. Vercel CLI 60.0.1 whoami reports Logged out. No Production scope claim is made for either ID or the lead destination.
- Signed-in browser: reset and retry failed; trusted Node process exits unexpectedly. No working authenticated browser or real-phone connection.
- Real-device Phase 5 and post-deploy timing: NOT RUN. No emulation substituted.
- Conversion contract: HTTP 200–299 only; no response body validation. See ANALYTICS.md for exact semantics and Make requirements. Contract unchanged.

## Isolation

Excluded app/globals.css, icon.png, public/images/blogs/harmony-editorial/daxxify-upper-face-sarasota.png, raw audit scripts/artifacts, and all CRM files. Local .env.local and the dependency junction are ignored and not staged. Page file diffs are metadata changes only. Redirect cloning preserves the entire query for /Landing/Medical-Weight-Loss and future document routes.

## Exact release file manifest

- `.github/workflows/analytics.yml`
- `.gitignore`
- `ANALYTICS-RELEASE.md`
- `ANALYTICS.md`
- `app/about-us/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/blog/page.tsx`
- `app/body/page.tsx`
- `app/book-now/page.tsx`
- `app/chemical-peels/page.tsx`
- `app/contact-us/page.tsx`
- `app/daxxify/page.tsx`
- `app/dermal-fillers/page.tsx`
- `app/events/page.tsx`
- `app/facials-and-peels/page.tsx`
- `app/facials/page.tsx`
- `app/fractional-co2-laser-treatments/page.tsx`
- `app/glo2facials/page.tsx`
- `app/hair-restoration/page.tsx`
- `app/hormone-replacement-therapy/page.tsx`
- `app/injectables/page.tsx`
- `app/iv-therapy/page.tsx`
- `app/jeuveau/page.tsx`
- `app/landing-v1/page.tsx`
- `app/landing/advanced-skin-and-wellness-treatments/page.tsx`
- `app/landing/injectables/page.tsx`
- `app/landing/medical-weight-loss/page.tsx`
- `app/landing/page.tsx`
- `app/laser-hair-removal/page.tsx`
- `app/lasers-and-lights/page.tsx`
- `app/layout.tsx`
- `app/learn-more/page.tsx`
- `app/medical-weight-loss/page.tsx`
- `app/membership/page.tsx`
- `app/our-team/page.tsx`
- `app/patient-forms/page.tsx`
- `app/payment-plans/page.tsx`
- `app/peptide-therapy/page.tsx`
- `app/rf-microneedling/page.tsx`
- `app/sculptra/page.tsx`
- `app/services/page.tsx`
- `app/shop/page.tsx`
- `app/skincare-products/page.tsx`
- `app/skincare/page.tsx`
- `app/specials/page.tsx`
- `app/testimonials/page.tsx`
- `app/wellness/page.tsx`
- `components/AnalyticsNavigation.tsx`
- `components/GoogleAnalytics.tsx`
- `components/forms/ContactForm.tsx`
- `components/forms/MembershipForm.tsx`
- `components/forms/NewsletterForm.tsx`
- `components/forms/SpecialsForm.tsx`
- `components/landing/WeightLossForm.tsx`
- `eslint.config.mjs`
- `lib/analytics.ts`
- `lib/analytics/attribution.ts`
- `lib/analytics/gtag.ts`
- `lib/submitLead.ts`
- `next.config.ts`
- `package-lock.json`
- `package.json`
- `playwright.config.ts`
- `proxy.ts`
- `scripts/check-analytics.mjs`
- `scripts/test-analytics-production.mjs`
- `scripts/test-analytics-unit.mjs`
- `scripts/test-analytics.mjs`
- `tests/analytics/site.spec.ts`

## Validation

- PASS: `npx tsc --noEmit`.
- PASS: `npm run lint` and analytics ownership guard (five pre-existing unrelated warnings). The subsequently extended production-smoke script also passed ESLint.
- PASS: `npm run build` with `VERCEL_ENV=production`, using ignored local environment values; this is not evidence of Vercel Production scope.
- PASS: 21 browser regression tests plus lead unit guards.
- PASS: minified production smoke across nine routes; one bootstrap, loader, and queued page view per route; initial attribution and view still work when Next JavaScript is blocked.
- PASS: `/Landing/Medical-Weight-Loss` returns 308 to lowercase with the complete GCLID/GBRAID/WBRAID/UTM query retained; following the redirect returns 200.
- All browser tests here are local automated checks with Google/Make interception, not real-device Phase 5. No production timing number is claimed.
- Temporary test route removed; original marketing worktree/index preserved; unrelated files excluded.

## To resume

Confirm G-HRPTWTFKNB is the web stream under 433407977, confirm history-based page views are off, and confirm the three public tracking variables are scoped to Vercel Production. Authenticate Vercel for the marketing project or use its authorized Git deployment after those checks. Deployment is already authorized by the user; the remaining gates are factual verification/access, not a new permission request. After deployment, perform real-phone Tag Assistant/DebugView, successful Make/Airtable attribution, intercepted failure, and actual deployed collection timing checks.
