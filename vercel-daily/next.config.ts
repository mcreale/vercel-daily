import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  cacheComponents: true,
  cacheLife: {
    article:{
      stale: 3600, // 1 hour
      revalidate: 3600 * 6, // 6 hours
      expire: 3600 * 24, // 1 day
    },
    long:{
      stale: 3600 , // 1 hour
      revalidate: 3600 * 24, // 1 day
      expire: 3600 * 24 * 7, // 1 week
    },
    trending:{
      stale: 30, // 1 hour
      revalidate: 3600, // 1 hours
      expire: 3600 * 24, // 1 day
    }
  }
};

export default nextConfig;
