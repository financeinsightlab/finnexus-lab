import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],

  // Allow the live-preview origin (e2b.app) to access dev resources.
  allowedDevOrigins: ['*.e2b.app'],

  // Remove console.* calls in production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  experimental: {
    // Inline CSS in <head> to eliminate render-blocking stylesheet requests.
    // Great for Tailwind (atomic CSS) — keeps pages painting instantly.
    inlineCss: true,

    // Tree-shake barrel exports for heavy packages — massive bundle reduction
    optimizePackageImports: [
      'framer-motion',
      'gsap',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'katex',
    ],
  },

  images: {
    // Serve modern image formats where supported
    formats: ['image/webp', 'image/avif'],
    // Allowed next/image quality values
    qualities: [75, 80, 85, 90],
    // Cache optimized images for 1 year (Vercel CDN purges on redeploy)
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'jkpnjvznnysbxbxw.public.blob.vercel-storage.com',
      },
    ],
  },

  // Aggressive caching headers for static assets — serve from edge/browser cache
  async headers() {
    return [
      {
        // Public images, videos, fonts — 1 year with revalidation
        source: '/:path*.(png|jpg|jpeg|webp|avif|svg|ico|mp4|webm|woff2|woff)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // HTML pages — short cache with stale-while-revalidate for instant navigations
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
