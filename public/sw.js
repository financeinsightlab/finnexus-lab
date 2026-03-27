/**
 * FinNexus Lab — Service Worker
 * Minimal service worker that caches static assets for PWA installability.
 * Extend with background sync / offline pages as needed.
 */

const CACHE_NAME = 'finnexus-v1';

// Assets to pre-cache on install
const PRE_CACHE = ['/', '/manifest.json', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRE_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Remove stale caches from previous versions
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network-first strategy — fall back to cache for navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/'))
    );
    return;
  }

  // Cache-first for everything else (static assets)
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
