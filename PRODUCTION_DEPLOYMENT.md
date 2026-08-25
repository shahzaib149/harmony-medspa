# Harmony Medspa production deployment

The public website and CRM dashboard are independent applications and repositories.

## Public website

- Repository: `shahzaib149/harmony-medspa`
- Vercel domain: `https://www.harmonymedspafl.com`
- Contains only the marketing website.
- `/dashboard` and `/dashboard/*` redirect to `https://crm.harmonymedspafl.com`.

## CRM dashboard

- Repository: `shahzaib149/harmony-medspa-dashboard`
- Vercel domain: `https://crm.harmonymedspafl.com`
- Set `NEXT_PUBLIC_APP_URL=https://crm.harmonymedspafl.com`.
- Set `NEXT_PUBLIC_SITE_URL=https://www.harmonymedspafl.com`.
- Keep the existing Supabase, Airtable, Google Ads, GA4, Google Business, Make,
  booking, blog-revalidation, audit, and AI environment variables.

## Authentication configuration

Add the CRM origin and callbacks to external providers:

- Supabase Site URL: `https://crm.harmonymedspafl.com`
- Supabase allowed redirect URL: `https://crm.harmonymedspafl.com/**`
- Google OAuth callback: `https://crm.harmonymedspafl.com/api/auth/google/callback`
- Google Business callback: `https://crm.harmonymedspafl.com/api/google-business/auth/callback`

## DNS and Vercel

Attach `www.harmonymedspafl.com` to the website Vercel project and
`crm.harmonymedspafl.com` to the dashboard Vercel project. Apply the exact DNS
record Vercel provides for each project, then redeploy after environment changes.

## Verification

- Website `/` returns `200`.
- Website `/dashboard` redirects to the CRM subdomain.
- CRM `/` redirects to its dashboard overview or login flow.
- CRM login, logout, API session, assets, Supabase, Google OAuth, and Google
  Business OAuth work entirely on the CRM subdomain.
- Website lead submission and conversion tracking remain unchanged.