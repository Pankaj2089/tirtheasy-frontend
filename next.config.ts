import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 typescript: {
    // ⚠️ WARNING: This allows production builds to succeed
    // even if your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // (optional) also ignore ESLint errors
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/about-us',
        destination: '/about',
      },
      {
        source: '/sign-up',
        destination: '/',
      },
    ];
  },
};

export default nextConfig;
