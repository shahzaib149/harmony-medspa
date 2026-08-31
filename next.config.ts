import type { NextConfig } from "next";

const crmOrigin = "https://crm.harmonymedspafl.com";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  reactStrictMode: true,
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