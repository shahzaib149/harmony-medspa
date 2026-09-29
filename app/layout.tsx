import { Suspense } from "react";
import AnalyticsNavigation from "@/components/AnalyticsNavigation";
import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";
import "./typography-polish.css";

const canonicalSiteUrl = siteUrl();
const siteName = "Harmony Med Spa";
const siteDescription =
  "Harmony Med Spa is a full-service medical spa and wellness center in Sarasota, Florida, offering injectables, laser treatments, facials, weight loss, and hormone therapy.";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalSiteUrl),
  title: {
    default: `Home | ${siteName}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName,
    title: `${siteName} | Sarasota, FL`,
    description: siteDescription,
    url: canonicalSiteUrl,
    locale: "en_US",
  },
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
        <Suspense fallback={null}><AnalyticsNavigation /></Suspense>
        {children}
      </body>
    </html>
  );
}

