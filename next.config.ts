import type { NextConfig } from "next";

// A production deployment must never silently ship without tracking IDs.
if (process.env.VERCEL_ENV === "production") {
  const required = [
    ["NEXT_PUBLIC_GA4_MEASUREMENT_ID", /^G-[A-Z0-9]+$/],
    ["NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID", /^AW-\d+$/],
    ["NEXT_PUBLIC_GOOGLE_ADS_LEAD_SEND_TO", /^AW-\d+\/[A-Za-z0-9_-]+$/],
  ] as const;
  for (const [name, pattern] of required) {
    if (!pattern.test(process.env[name]?.trim() || "")) throw new Error(
      "Missing or invalid Production analytics environment variable: " + name,
    );
  }
}

const crmOrigin = "https://crm.harmonymedspafl.com";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  reactStrictMode: true,
  // Correct titles must arrive before initial/manual SPA page views.
  htmlLimitedBots: /.*/,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fcpqllxxplkmrbxayeuo.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "harmony-medspa.vercel.app" }],
        destination: "https://www.harmonymedspafl.com/:path*",
        permanent: true,
      },
      {
        source: "/blog/revivamask-recovery-mask-sarasota",
        destination: "/skincare",
        permanent: true,
      },
      {
        source: "/shop.html",
        destination: "/shop",
        statusCode: 301,
      },
      {
        source: "/blog/page-2",
        destination: "/blog?page=2",
        permanent: true,
      },
      {
        source: "/blog/page-3",
        destination: "/blog?page=3",
        permanent: true,
      },
      {
        source: "/blog/How-Jeuveau-Fits-Into-Your-Anti-Aging-Skincare-Routine",
        destination: "/blog/how-jeuveau-fits-into-your-anti-aging-skincare-routine",
        permanent: true,
      },
      {
        source: "/landing/advanced-skin-and-wellness-treatments.html",
        destination: "/landing/advanced-skin-and-wellness-treatments",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: crmOrigin,
        permanent: false,
      },
      {
        source: "/dashboard/:path*",
        destination: `${crmOrigin}/:path*`,
        permanent: false,
      },
      {
        source: "/specials",
        destination: "https://mailchi.mp/harmonymedspafl/monthly-specials",
        permanent: false,
      },
      {
        source: "/learn-more",
        destination: "https://mailchi.mp/harmonymedspafl/newsletter-opt-in",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
