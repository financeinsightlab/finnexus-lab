// FILE: app/robots.ts
import { MetadataRoute } from 'next';

const BASE = 'https://finnexuslab.com'; // ⚠ REPLACE with your real domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}