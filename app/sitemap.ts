// FILE: app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllResearch, getAllInsights } from '@/lib/content';

const BASE = 'https://finnexuslab.com'; // ⚠ REPLACE with your real domain

export default function sitemap(): MetadataRoute.Sitemap {
  const safeDate = (value: unknown) => {
    const d = value instanceof Date ? value : new Date(typeof value === 'string' || typeof value === 'number' ? value : '');
    return Number.isFinite(d.getTime()) ? d : new Date();
  };

  const research = getAllResearch().map((post) => ({
    url: `${BASE}/research/${post.slug}`,
    lastModified: safeDate(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const insights = getAllInsights().map((post) => ({
    url: `${BASE}/insights/${post.slug}`,
    lastModified: safeDate(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const statics: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${BASE}/research`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE}/tools`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${BASE}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${BASE}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  return [...statics, ...research, ...insights];
}