import { Suspense } from "react";
import AnalyticsNavigation from "@/components/AnalyticsNavigation";
import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMedicalClinicSchema, buildWebSiteSchema } from "@/lib/schema";
import { SITE_NAME } from "@/lib/constants";
import { SITE_DESCRIPTION, sharedOpenGraph } from "@/lib/seo/metadata";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";
import "./typography-polish.css";

const canonicalSiteUrl = siteUrl();
const siteName = SITE_NAME;
const siteDescription = SITE_DESCRIPTION;

export const metadata: Metadata = {
  metadataBase: new URL(canonicalSiteUrl),
  title: {
    default: `Home | ${siteName}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  // No sitewide canonical: each indexable page declares its own. A canonical here
  // would be inherited by every page and point them all at the homepage.
  // No sitewide og:url, for the same reason as the canonical. Pages use openGraphFor().
  openGraph: sharedOpenGraph,
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Sarasota, FL`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><GoogleAnalytics /></head>
      <body>
        <JsonLd data={[buildMedicalClinicSchema(), buildWebSiteSchema()]} />
        <Suspense fallback={null}><AnalyticsNavigation /></Suspense>
        {children}
      </body>
    </html>
  );
}

