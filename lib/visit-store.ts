// lib/visit-store.ts — "last seen" cookie for the personalised dashboard (Pillar F4)
//
// We persist the marker in a cookie rather than a database column so the
// feature ships with zero migration risk and stays fully free. Cookies are
// readable in Server Components and writable in Route Handlers.

import { cookies } from 'next/headers';

export const LAST_VISIT_COOKIE = 'ka_last_visit';

/** How long we remember a visit marker (30 days, in seconds). */
export const LAST_VISIT_MAX_AGE = 60 * 60 * 24 * 30;

export interface VisitMarker {
    /** ISO timestamp recorded on the previous visit, or null on a first visit. */
    since: string | null;
    /** Whether a prior visit was recorded. */
    hasPriorVisit: boolean;
}

/** Read the previous-visit marker from incoming cookies (Server Components). */
export async function readLastVisit(): Promise<VisitMarker> {
    const store = await cookies();
    const raw = store.get(LAST_VISIT_COOKIE)?.value ?? null;
    if (!raw) return { since: null, hasPriorVisit: false };
    const time = Date.parse(raw);
    if (!Number.isFinite(time)) return { since: null, hasPriorVisit: false };
    return { since: raw, hasPriorVisit: true };
}

/** Write a new visit marker (Route Handlers / Server Functions only). */
export async function writeLastVisit(value: string): Promise<void> {
    const store = await cookies();
    store.set(LAST_VISIT_COOKIE, value, {
        path: '/',
        maxAge: LAST_VISIT_MAX_AGE,
        sameSite: 'lax',
        httpOnly: true,
    });
}
