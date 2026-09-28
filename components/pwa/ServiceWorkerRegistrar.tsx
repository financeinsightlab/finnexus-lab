'use client';

// Registers the PWA service worker (public/sw.js) once, after load, and only
// in production. Kept as a tiny client island so the root layout stays a
// server component and the offline/install layer costs nothing on first paint.

import { useEffect } from 'react';

export default function ServiceWorkerRegistrar() {
    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') return;
        if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;

        const register = () => {
            navigator.serviceWorker.register('/sw.js').catch(() => {
                /* registration is best-effort — never block the app */
            });
        };

        if (document.readyState === 'complete') register();
        else window.addEventListener('load', register, { once: true });

        return () => window.removeEventListener('load', register);
    }, []);

    return null;
}
