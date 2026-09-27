import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],

  // Pin the workspace root. Without this, Turbopack walks up looking for
  // lockfiles and (when a parent directory also has one) can pick a root far
  // above the app — which makes it scan unrelated files and can exhaust memory
  // during static generation.
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },

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

    // Static generation spawns one Node worker per CPU (7 here). Each worker
    // owns its own V8 heap, so a large page set can exhaust memory across the
    // pool ("Committing semi space failed"). Cap the fan-out to keep the total
    // footprint well under the default heap limit on CI and local machines.
    cpus: 2,

    // Trade a little build time for a lower Webpack peak memory ceiling.
    webpackMemoryOptimizations: true,
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
