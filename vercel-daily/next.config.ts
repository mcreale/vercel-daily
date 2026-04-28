import { subscribe } from "diagnostics_channel";
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
      stale: 30, // 30 seconds
      revalidate: 3600, // 1 hour
      expire: 3600 * 24, // 1 day
    },
    subscriberStatus:{
      stale: 60, // no staleness, always check with server
      revalidate: 60, // 1 minute
      expire: 3600, // 1 hour
    }
  }
};

export default nextConfig;
