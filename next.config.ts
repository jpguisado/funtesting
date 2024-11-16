import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'img.clerk.com',
      // pathname: '/account123/**',
    }]
  }
};

export default nextConfig;
