// lib/auth-guards.ts — centralised authentication & authorization helpers
//
// Single source of truth for "who is allowed to do what". Every route
// handler, server action and admin layout should go through these helpers
// instead of comparing `session.user.role` ad hoc. That comparison is exactly
// how authorization drifts between routes.
//
// Uses NextAuth v5's `auth()`; safe to import from server components, route
// handlers and server actions (never from client components).

import { auth } from '@/auth';
import type { Session } from 'next-auth';
import type { UserRole } from '@prisma/client';
import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

/** Roles allowed into the staff back-office (/admin). */
export const STAFF_ROLES: readonly UserRole[] = ['ADMIN', 'ANALYST'];
/** Roles with destructive / settings privileges. */
export const ADMIN_ROLES: readonly UserRole[] = ['ADMIN'];

export type AuthedUser = Session['user'];

/** Return the signed-in user, or null when unauthenticated. */
export async function getCurrentUser(): Promise<AuthedUser | null> {
    // `auth()` can reject while verifying a session cookie whose token was
    // signed with a different/rotated secret (stale browser cookie, another
    // environment's AUTH_SECRET). Treat any such failure as "not signed in"
    // rather than letting the exception bubble up and 500 the whole page.
    let session: Session | null;
    try {
        session = await auth();
    } catch (error) {
        logger.warn('auth() failed while resolving the current user (treating as anonymous)', {
            error: error instanceof Error ? error.message : String(error),
        });
        return null;
    }
    // `session.user.id` is guaranteed by the next-auth module augmentation in
    // types/next-auth.d.ts, but guard anyway for safety at the boundary.
    return session?.user?.id ? session.user : null;
}

/** True when `user` holds one of `roles`. */
export function hasAnyRole(
    user: AuthedUser | null | undefined,
    roles: readonly UserRole[],
): boolean {
    if (!user) return false;
    return roles.includes(user.role);
}

/** True when the user is staff (ADMIN or ANALYST). */
export function isStaff(user: AuthedUser | null | undefined): boolean {
    return hasAnyRole(user, STAFF_ROLES);
}

/** True when the user is a full ADMIN. */
export function isAdmin(user: AuthedUser | null | undefined): boolean {
    return hasAnyRole(user, ADMIN_ROLES);
}

/** Thrown by the `require*` helpers so callers can map to a status code. */
export class AuthError extends Error {
    readonly status: 401 | 403;
    constructor(status: 401 | 403, message: string) {
        super(message);
        this.name = 'AuthError';
        this.status = status;
    }
}

/** Require any authenticated user; throws {@link AuthError} otherwise. */
export async function requireUser(): Promise<AuthedUser> {
    const user = await getCurrentUser();
    if (!user) throw new AuthError(401, 'Authentication required');
    return user;
}

/** Require the user to hold one of `roles`; throws {@link AuthError}. */
export async function requireRole(roles: UserRole | readonly UserRole[]): Promise<AuthedUser> {
    const user = await requireUser();
    const list = Array.isArray(roles) ? roles : [roles];
    if (!list.includes(user.role)) {
        throw new AuthError(403, 'Insufficient permissions');
    }
    return user;
}

/** Require staff (ADMIN or ANALYST). */
export function requireStaff(): Promise<AuthedUser> {
    return requireRole(STAFF_ROLES);
}

/** Require a full ADMIN. */
export function requireAdmin(): Promise<AuthedUser> {
    return requireRole(ADMIN_ROLES);
}

// ─── Route-handler ergonomics ────────────────────────────────────────────────

export type ApiAuthorization =
    | { ok: true; user: AuthedUser }
    | { ok: false; response: NextResponse };

/**
 * Route-handler friendly authorization. Returns a discriminated union so the
 * caller can early-return the ready-made error response:
 *
 * ```ts
 * const auth = await authorizeApi(ADMIN_ROLES);
 * if (!auth.ok) return auth.response;
 * // auth.user is now typed
 * ```
 */
export async function authorizeApi(
    roles?: UserRole | readonly UserRole[],
): Promise<ApiAuthorization> {
    const user = await getCurrentUser();
    if (!user) {
        return {
            ok: false,
            response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
        };
    }
    if (roles) {
        const list = Array.isArray(roles) ? roles : [roles];
        if (!list.includes(user.role)) {
            return {
                ok: false,
                response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
            };
        }
    }
    return { ok: true, user };
}

/** Map a thrown {@link AuthError} (or anything else) to a JSON response. */
export function authErrorResponse(error: unknown): NextResponse | null {
    if (error instanceof AuthError) {
        return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return null;
}

// ─── Cron / machine-to-machine ───────────────────────────────────────────────

/**
 * Validate the shared `CRON_SECRET` bearer token. In non-production without a
 * configured secret, machine endpoints stay open so local dev / preview is
 * friction-free. In production a secret is mandatory.
 */
export function verifyCronSecret(request: Request): boolean {
    const secret = process.env.CRON_SECRET;
    if (!secret) {
        return process.env.NODE_ENV !== 'production';
    }
    const header = request.headers.get('authorization');
    return header === `Bearer ${secret}`;
}

/** Return a 401 response when the cron secret is missing/invalid, else null. */
export function requireCron(request: Request): NextResponse | null {
    return verifyCronSecret(request)
        ? null
        : NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
