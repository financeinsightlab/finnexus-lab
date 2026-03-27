import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FinNexus Lab',
    short_name: 'FinNexus',
    description:
      'Financial Intelligence Platform — Data-Driven Insights on Markets, Strategy & Capital',
    start_url: '/',
    display: 'standalone',
    background_color: '#1A2B3C',
    theme_color: '#0D6E6E',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
