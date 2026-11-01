import { describe, it, expect, vi } from 'vitest';

vi.mock('@/auth', () => ({
    auth: vi.fn(),
}));

vi.mock('next/server', () => ({
    NextResponse: {
        json: vi.fn(),
    },
}));

import { isPlatformAdminEmail } from '@/lib/admin-constants';
import { isStaff, isAdmin, type AuthedUser } from '@/lib/auth-guards';

describe('Admin Authentication & Authority Guards', () => {
    it('recognizes sumitsingh7445@gmail.com as a platform administrator', () => {
        expect(isPlatformAdminEmail('sumitsingh7445@gmail.com')).toBe(true);
        expect(isPlatformAdminEmail('SumitSingh7445@Gmail.Com')).toBe(true);
        expect(isPlatformAdminEmail('  sumitsingh7445@gmail.com  ')).toBe(true);
    });

    it('denies non-admin emails by default', () => {
        expect(isPlatformAdminEmail('stranger@example.com')).toBe(false);
        expect(isPlatformAdminEmail(null)).toBe(false);
        expect(isPlatformAdminEmail(undefined)).toBe(false);
    });

    it('grants staff and admin privileges to platform administrator', () => {
        const user = {
            id: 'cmvy9ig0r000308labm3v3xaq',
            email: 'sumitsingh7445@gmail.com',
            name: 'Sumit Singh',
            role: 'MEMBER' as const, // Even if raw role token was MEMBER
            subscriptionStatus: 'ACTIVE' as const,
        } as unknown as AuthedUser;

        expect(isStaff(user)).toBe(true);
        expect(isAdmin(user)).toBe(true);
    });

    it('preserves standard staff role evaluation for regular accounts', () => {
        const adminUser = { id: '1', role: 'ADMIN' as const, subscriptionStatus: 'ACTIVE' as const } as unknown as AuthedUser;
        const analystUser = { id: '2', role: 'ANALYST' as const, subscriptionStatus: 'ACTIVE' as const } as unknown as AuthedUser;
        const memberUser = { id: '3', role: 'MEMBER' as const, subscriptionStatus: 'INACTIVE' as const } as unknown as AuthedUser;

        expect(isStaff(adminUser)).toBe(true);
        expect(isStaff(analystUser)).toBe(true);
        expect(isStaff(memberUser)).toBe(false);
        expect(isAdmin(analystUser)).toBe(false);
        expect(isAdmin(memberUser)).toBe(false);
    });
});
