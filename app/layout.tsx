import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://harmony-medspa.vercel.app";
const siteName = "Harmony Med Spa";
const siteDescription =
  "Harmony Med Spa is a full-service medical spa and wellness center in Sarasota, Florida, offering injectables, laser treatments, facials, weight loss, and hormone therapy.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
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
  const ga4MeasurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim();
  const validConversionId = conversionId?.match(/^AW-\d+$/) ? conversionId : null;
  const validGa4MeasurementId = ga4MeasurementId?.match(/^G-[A-Z0-9]+$/)
    ? ga4MeasurementId
    : null;
  const googleTagId = validGa4MeasurementId ?? validConversionId;
  const configCommands = [validConversionId, validGa4MeasurementId]
    .filter((id): id is string => Boolean(id))
    .map((id) => `gtag('config', '${id}');`)
    .join("\n                ");

  return (
    <html lang="en">
      <body>
        {googleTagId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
              strategy="afterInteractive"
            />
            <Script id="google-gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${configCommands}
              `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}

