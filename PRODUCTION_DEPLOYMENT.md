# Harmony Medspa production deployment

The public website and private dashboard are separate Next.js applications in one GitHub repository. Deploy them as two Vercel projects so dashboard authentication and APIs stay isolated while customers use one public domain.

## Vercel projects

1. Website project
   - Repository: `shahzaib149/harmony-medspa`
   - Root Directory: repository root (`/`)
   - Attach the purchased domain here only.
2. Dashboard project
   - Repository: `shahzaib149/harmony-medspa`
   - Root Directory: `dashboard`
   - Keep its generated `*.vercel.app` URL as the private service origin.

Set these website project variables for Production and Preview:

```text
DASHBOARD_ORIGIN=https://<dashboard-project>.vercel.app
NEXT_PUBLIC_SITE_URL=https://<public-domain>
BLOG_REVALIDATE_SECRET=<same value as dashboard>
```

`DASHBOARD_ORIGIN` must use HTTPS and have no trailing slash.

## Dashboard environment

Copy the existing private values from `dashboard/.env.local` into the dashboard Vercel project. Do not commit real secrets. The custom-domain values must be:

```text
NEXT_PUBLIC_APP_URL=https://<public-domain>
NEXT_PUBLIC_SITE_URL=https://<public-domain>
```

The dashboard also requires its existing Supabase, Airtable, Google Ads, Google Analytics, Google Business, Make, booking, blog-revalidation, audit-salt, and Anthropic variables.

## Domain and authentication

After attaching the domain to the website project:

1. Set the dashboard project's `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain.
2. In Supabase Authentication URL Configuration, set Site URL to the public domain and add the public login/dashboard redirect URLs.
3. In the Google Cloud OAuth client, add these exact authorized redirect URIs:
   - `https://<public-domain>/api/auth/google/callback`
   - `https://<public-domain>/api/google-business/auth/callback`
4. Update Google Ads landing URLs, GA4 web-stream domains, and external webhook allowlists from the temporary Vercel hostname to the final domain.
5. Redeploy both Vercel projects after changing environment variables.

## DNS cutover

1. Add the domain in the website Vercel project's Domains screen.
2. Apply Vercel's DNS records at the registrar.
3. Wait for Vercel to issue the TLS certificate.
4. Choose one canonical hostname and redirect either `www` to apex or apex to `www`.
5. Update sitemap, canonical, OAuth, Supabase, analytics, and advertising settings before paid traffic starts.

## Verification gate

Run `npm run build:all` locally, then verify on the final domain:

- `/` returns the website.
- `/dashboard` redirects signed-out users to same-domain `/login`.
- Login background, logo, favicon, CSS, JavaScript, fonts, and image optimization return `200`.
- `/api/auth/session` returns `401` when signed out and session data when signed in.
- `/dashboard-static/*` returns dashboard build assets.
- Google Ads and Google Business OAuth return to the public domain.
- Supabase login cookies persist through navigation and logout.
- Website lead submission reaches Airtable with attribution and fires one conversion.

Do not launch paid traffic until every final-domain check passes.
