// lib/credentials.ts — structured data for certificate pathway catalogue pages.
//
// This module describes public certificate-pathway catalogue pages only. It
// intentionally does not mint signed/W3C credentials or provide public
// verification. Separate course-completion records are private, unsigned learner
// records and must not be represented as cryptographically verifiable credentials.

import { CERTIFICATE_CATALOG_BASE, type Certificate } from './certificates';

/** Schema.org description of a public learning-pathway catalogue entry. */
export function buildCertificatePathwayJsonLd(
    certificate: Certificate,
    baseUrl = CERTIFICATE_CATALOG_BASE,
) {
    const url = `${baseUrl}/${certificate.slug}`;

    return {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: certificate.title,
        description: `${certificate.summary} This is a pathway catalogue entry, not evidence of completion or an issued certificate.`,
        url,
        learningResourceType: 'Certificate pathway catalogue entry',
        educationalLevel: certificate.level,
        about: certificate.skills,
        keywords: [certificate.category, ...certificate.skills],
        publisher: {
            '@type': 'Organization',
            name: 'Kunwar Analytics',
            url: 'https://kunwaranalytics.in',
        },
    };
}
