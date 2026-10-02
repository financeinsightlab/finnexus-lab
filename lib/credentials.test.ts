import { describe, expect, it } from 'vitest';
import { getCertificateBySlug } from './certificates';
import { buildCertificatePathwayJsonLd } from './credentials';

describe('buildCertificatePathwayJsonLd', () => {
    it('describes a catalogue listing without representing it as an issued credential', () => {
        const certificate = getCertificateBySlug('valuation-and-dcf');
        expect(certificate).toBeDefined();

        const data = buildCertificatePathwayJsonLd(certificate!);

        expect(data['@type']).toBe('LearningResource');
        expect(data.url).toBe('https://kunwaranalytics.in/certificates/valuation-and-dcf');
        expect(data.description).toContain('not evidence of completion or an issued certificate');
        expect(data).not.toHaveProperty('credentialSubject');
        expect(data).not.toHaveProperty('proof');
        expect(data).not.toHaveProperty('credentialStatus');
    });
});
