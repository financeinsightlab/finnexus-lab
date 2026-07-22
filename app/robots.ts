// FILE: app/robots.ts
import { MetadataRoute } from 'next';

const BASE = 'https://kunwaranalytics.in';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all standard search engine crawlers
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/auth/', '/dashboard'],
      },
      {
        // Allow AI/LLM crawlers for GEO (Generative Engine Optimization)
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/auth/', '/dashboard'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/auth/', '/dashboard'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/auth/', '/dashboard'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/auth/', '/dashboard'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/auth/', '/dashboard'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/auth/', '/dashboard'],
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/auth/', '/dashboard'],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/auth/', '/dashboard'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
