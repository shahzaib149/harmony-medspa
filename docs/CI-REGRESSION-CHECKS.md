# Analytics regression workflow

## October 15, 2026 correction

The React Hooks override in `eslint.config.mjs` was global, while Next registers
that plugin only for `js/jsx/mjs/ts/tsx/mts/cts`. Adding CommonJS regression
harnesses exposed the mismatch: ESLint exited before analytics tests ran.
The override now matches Next's file scope. No checks were disabled.

The sitemap deliberately requires a successful CMS read. CI has no production
CRM credentials, so its test/build steps preload `scripts/fixtures/airtable.cjs`
using Node's standard `NODE_OPTIONS`. The fixture requires both an explicit test
flag and synthetic credentials, intercepts only the test Airtable base, and
delegates every other request to normal fetch. Application code never imports it.
It creates no CRM records and is not enabled in Vercel production.

The preload is scoped to test/build steps, not checkout/setup steps where the
file may not yet exist. The workflow uses Node-24-compatible v5 setup actions,
Node 22 for the app, and an explicit Ubuntu 24.04 runner.

## Coverage

- Full ESLint and analytics ownership/metadata validation.
- Promotion date boundaries, draft filtering, pagination and cache invalidation.
- Lead transport unit tests and 25 browser regression cases.
- TypeScript, production build and compiled-bundle browser checks.
- All browser test Google/Make requests are intercepted; no test leads or
  conversion events are sent to live services.

`npm run lint` still reports existing advisory warnings for intentional state
synchronization and two raw image elements. These are warnings, not ignored
errors. Carousel optimizer qualities now explicitly allow its existing 85/100
requests as well as the default 75.

Run the workflow for full Linux validation. For local build/production checks,
use the synthetic environment declared in `.github/workflows/analytics.yml`,
including its NODE_OPTIONS preload, and never load real credentials into that
mocked run. Production deployment uses its own real environment unchanged.
