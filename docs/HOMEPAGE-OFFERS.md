# Homepage offers — release checklist

The homepage imports an offer band below the hero and two editorial panels below the providers section. Newsletter and paid landing pages are unchanged. Styling uses Harmony's existing Georgia display / Segoe body pairing with ink #171714, ivory #faf8f3, muted gold #c8af72, secondary text #615c51 and rules #d9d0bb. No packages or photography assets were added.

## Publication gate

Both September 2026 offers in `lib/home-offers.ts` deliberately have `approved: false`. Do not enable them until Hayden confirms the free add-on, exclusions, stacking rules and dates, and the workflow checks below pass. September terms are not approval for October. Replace terms before setting approved true. Expiry is inclusive through the specified end date in America/New_York. The browser refreshes eligibility every 15 seconds and on focus; submission checks eligibility again. No public preview bypass is provided.

## Workflow verification required before enabling

The form reuses submitLead. Offer title, identifier and expiry are stored in Message; treatment is stored in Treatment Interest; Source is Website Offer Enquiry. Existing attribution is preserved. Make must map this source into its supported Airtable Source choices and route these enquiries without enrolling them in promotional sequences. The existing shared transport sets SMS/Email Sent Status to Pending; therefore do NOT assume its existing automation is safe for offer enquiries. No automation was changed by this feature.

Run a controlled test with outbound messaging disabled and an authorized test contact. Confirm the exact offer and click attribution reach Airtable and no marketing enrollment is created. HTTP success currently means Make acknowledged the request, not independent proof of an Airtable write. Configure the workflow to return success only after persistence, then verify it. Until this is done, keep offers unapproved.

## QA

- Run `node scripts/test-home-offers.mjs`, TypeScript and targeted lint.
- `/offer-test-fixture` supplies simulated dates and approval only in development; production returns not found. It is noindex and not linked from the website. Run `npx playwright test tests/analytics/home-offers.spec.ts` for mocked browser coverage.
- Verify 375px and desktop layouts, keyboard focus, form open/close, invalid/whitespace inputs, failed requests retaining input, retry, rapid repeated submission, and expired offers.
- Mock Make and Google endpoints for browser tests. Verify a click is select_content, a successful submission produces the existing lead event once, and failed submissions produce no lead conversion. No patient input is passed to analytics.
- Confirm success-state call and PatientNow links. Booking-link clicks are not completed bookings.
- Do not stage or deploy the unrelated existing analytics changes as part of this feature without reconciling their separate release.

## Verification completed

TypeScript passed. Date/approval unit tests passed. Both isolated Playwright tests passed: mobile overflow, focus, invalid phone, failed submission retaining input, retry, double-submit guard, offer payload, attribution, success links, and hidden production-catalog offers on the homepage. Mobile and desktop screenshots were visually inspected. No live Make/Airtable submission was made; end-to-end persistence and campaign suppression remain release gates, not verified claims.
