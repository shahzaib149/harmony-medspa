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
    default: `${siteName} | Sarasota, FL`,
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
  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID?.trim();
  const ga4MeasurementId = "G-HRPTWTFKNB";
  const validConversionId = conversionId?.match(/^AW-\d+$/) ? conversionId : null;
  const validGa4MeasurementId = ga4MeasurementId?.match(/^G-[A-Z0-9]+$/)
    ? ga4MeasurementId
    : null;

  return (
    <html lang="en">
      <body>
        <GoogleAnalytics measurementId={validGa4MeasurementId} conversionId={validConversionId} />
        {children}
      </body>
    </html>
  );
}

