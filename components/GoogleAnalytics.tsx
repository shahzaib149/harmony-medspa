"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export default function GoogleAnalytics({
  measurementId,
  conversionId,
}: {
  measurementId: string | null;
  conversionId: string | null;
}) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const lastPage = useRef<string | null>(null);
  const googleTagId = measurementId ?? conversionId;

  useEffect(() => {
    if (!ready || !measurementId || typeof window.gtag !== "function") return;

    const timer = window.setTimeout(() => {
      const pageLocation = window.location.href;
      if (lastPage.current === pageLocation) return;
      lastPage.current = pageLocation;

      const routeName =
        pathname === "/"
          ? "Home"
          : pathname
              .split("/")
              .filter(Boolean)
              .map((part) =>
                part
                  .replace(/[-_]+/g, " ")
                  .replace(/w/g, (letter) => letter.toUpperCase()),
              )
              .join(" — ");
      const genericTitle = document.title === "Harmony Med Spa | Sarasota, FL";
      const pageTitle = genericTitle
        ? `${routeName} | Harmony Med Spa`
        : document.title;

      window.gtag?.("event", "page_view", {
        send_to: measurementId,
        page_title: pageTitle,
        page_location: pageLocation,
        page_path: `${window.location.pathname}${window.location.search}`,
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [measurementId, pathname, ready]);

  if (!googleTagId) return null;

  const commands = [
    conversionId ? `gtag('config', '${conversionId}');` : "",
    measurementId
      ? `gtag('config', '${measurementId}', { send_page_view: false });`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <>
      <Script
        id="google-gtag-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-gtag-init"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          ${commands}
        `}
      </Script>
    </>
  );
}