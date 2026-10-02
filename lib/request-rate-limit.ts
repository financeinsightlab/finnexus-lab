import { createHmac } from 'node:crypto';

/** Return a stable, non-reversible bucket subject without persisting raw IPs. */
export function requestRateLimitSubject(request: Request): string {
    const rawIp = (
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip')?.trim() ||
        request.headers.get('cf-connecting-ip')?.trim() ||
        'unknown'
    ).slice(0, 128);
    const hmacKey = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
    if (!hmacKey) {
        throw new Error('A server authentication secret is required for privacy-preserving rate limiting');
    }
    return createHmac('sha256', hmacKey).update(rawIp).digest('hex');
}
