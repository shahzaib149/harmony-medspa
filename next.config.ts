import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/specials",
        destination: "https://mailchi.mp/harmonymedspafl/monthly-specials",
        permanent: false
      },
      {
        source: "/learn-more",
        destination: "https://mailchi.mp/harmonymedspafl/newsletter-opt-in",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
