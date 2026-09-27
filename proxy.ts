// proxy.ts — Next.js 16 network boundary (formerly `middleware.ts`)
//
// In Next.js 16 the `middleware` file convention was deprecated and renamed to
// `proxy` (see node_modules/next/dist/docs/.../file-conventions/proxy.md). The
// `runtime` config is NOT allowed here; Proxy defaults to the Node.js runtime.
//
// IMPORTANT: Proxy is an *optimistic* gate only — it runs before render and must
// not be treated as the sole authorization layer. Every route handler / server
// action still calls `lib/auth-guards.ts`. Proxy here exists to (a) stop
// unauthenticated users early with a clean redirect/401 and (b) inject security
// headers on the dynamic (non-asset) surface. Assets keep the long-lived cache
// headers defined in `next.config.ts`.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { UserRole } from '@prisma/client';

const STAFF_ROLES: readonly UserRole[] = ['ADMIN', 'ANALYST'];

function isStaff(role: UserRole | undefined): boolean {
    return role !== undefined && STAFF_ROLES.includes(role);
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ─── Machine-to-machine: cron ──────────────────────────────────────────────
    if (pathname.startsWith('/api/cron/')) {
        const secret = process.env.CRON_SECRET;
        const header = request.headers.get('authorization');
        const allowed = secret ? header === `Bearer ${secret}` : process.env.NODE_ENV !== 'production';
        if (!allowed) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.next();
    }

    // ─── Protected surfaces: /admin (pages) and /api/admin (data) ──────────────
    const isAdminPage = pathname === '/admin' || pathname.startsWith('/admin/');
    const isAdminApi = pathname.startsWith('/api/admin/');

    if (isAdminPage || isAdminApi) {
        const token = await getToken({
            req: request,
            secret: process.env.AUTH_SECRET,
            secureCookie: process.env.NODE_ENV === 'production',
        });

        if (!token) {
            if (isAdminApi) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            const signIn = new URL('/auth/signin', request.url);
            signIn.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(signIn);
        }

        if (!isStaff(token.role)) {
            if (isAdminApi) {
                return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
            }
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // ─── Security headers for the dynamic surface ──────────────────────────────
    const response = NextResponse.next();
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    if (process.env.NODE_ENV === 'production') {
        response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    }
    return response;
}

export const config = {
    // Skip static assets and image optimisation so their long-lived cache headers
    // (next.config.ts) win; the matcher still covers _next/data (Next.js runs
    // Proxy for those regardless of negative matchers, by design).
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|mp4|webm|woff2?|txt|xml)$).*)'],
};
