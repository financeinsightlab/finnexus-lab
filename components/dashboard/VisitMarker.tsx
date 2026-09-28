'use client';

import { useEffect } from 'react';

/**
 * Advances the "last seen" cookie to now so the next visit can surface
 * "new since your last visit" (Pillar F4). Renders nothing.
 */
export default function VisitMarker() {
    useEffect(() => {
        let cancelled = false;
        const mark = async () => {
            try {
                if (cancelled) return;
                await fetch('/api/visits', { method: 'POST', cache: 'no-store' });
            } catch {
                // Non-critical: the marker simply advances on the next visit.
            }
        };
        void mark();
        return () => {
            cancelled = true;
        };
    }, []);

    return null;
}
