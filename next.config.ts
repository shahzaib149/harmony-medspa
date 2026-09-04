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
