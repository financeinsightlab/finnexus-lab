import { afterEach, describe, expect, it } from 'vitest';
import { requestRateLimitSubject } from './request-rate-limit';

const originalAuthSecret = process.env.AUTH_SECRET;
const originalNextAuthSecret = process.env.NEXTAUTH_SECRET;

afterEach(() => {
    if (originalAuthSecret === undefined) delete process.env.AUTH_SECRET;
    else process.env.AUTH_SECRET = originalAuthSecret;
    if (originalNextAuthSecret === undefined) delete process.env.NEXTAUTH_SECRET;
    else process.env.NEXTAUTH_SECRET = originalNextAuthSecret;
});

describe('requestRateLimitSubject', () => {
    it('HMACs the client address and never returns the raw address', () => {
        process.env.AUTH_SECRET = 'unit-test-secret';
        delete process.env.NEXTAUTH_SECRET;
        const request = new Request('https://example.test/api/ask', {
            headers: { 'x-forwarded-for': '203.0.113.4, 10.0.0.2' },
        });

        const subject = requestRateLimitSubject(request);
        expect(subject).toMatch(/^[a-f0-9]{64}$/);
        expect(subject).not.toContain('203.0.113.4');
        expect(subject).toBe(requestRateLimitSubject(request));
    });

    it('fails closed when no server secret is configured instead of using a public HMAC key', () => {
        delete process.env.AUTH_SECRET;
        delete process.env.NEXTAUTH_SECRET;

        expect(() => requestRateLimitSubject(new Request('https://example.test/api/ask'))).toThrow(
            'server authentication secret is required',
        );
    });
});
