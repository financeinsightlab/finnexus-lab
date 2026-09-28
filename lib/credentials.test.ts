import { describe, expect, it } from 'vitest';
import { buildCredential, credentialUrn, verificationCode, verificationUrl } from './credentials';
import { getCertificateBySlug } from './certificates';

describe('credential identifiers', () => {
    it('builds a stable URN and verification URL', () => {
        expect(credentialUrn('valuation-and-dcf')).toBe('urn:kunwar:credential:valuation-and-dcf');
        expect(verificationUrl('valuation-and-dcf')).toBe(
            'https://kunwaranalytics.in/certificates/valuation-and-dcf',
        );
    });

    it('derives a deterministic CRED code', () => {
        const code = verificationCode('valuation-and-dcf');
        expect(code).toMatch(/^CRED-[0-9A-F]{4}-[0-9A-F]{4}$/);
        expect(verificationCode('valuation-and-dcf')).toBe(code);
        expect(verificationCode('sql-for-analysts')).not.toBe(code);
    });
});

describe('buildCredential', () => {
    it('emits a W3C VC / Open Badge assertion for a real certificate', () => {
        const certificate = getCertificateBySlug('valuation-and-dcf');
        expect(certificate).toBeDefined();

        const credential = buildCredential(certificate!, { issuedOn: new Date('2026-06-01T00:00:00.000Z') });

        expect(credential.id).toBe('urn:kunwar:credential:valuation-and-dcf');
        expect(credential.type).toContain('OpenBadgeCredential');
        expect(credential.validFrom).toBe('2026-06-01T00:00:00.000Z');
        expect(credential.issuer.name).toBe('Kunwar Analytics');
        expect(credential.credentialSubject.achievement.name).toBe(certificate!.title);
        expect(credential.verification.url).toBe(verificationUrl(certificate!.slug));
        expect(credential.credentialSubject.achievement.alignment).toHaveLength(
            certificate!.skills.length,
        );
    });
});
