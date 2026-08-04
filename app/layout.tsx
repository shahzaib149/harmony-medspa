import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harmony Med Spa | Sarasota, FL",
  description: "Medical spa and wellness center in Sarasota, Florida."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;

  return (
    <html lang="en">
      <body>
        {conversionId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${conversionId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${conversionId}');
              `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}

