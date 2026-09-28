// lib/credentials.ts — verifiable credential (Open Badges / W3C VC) helpers
//
// Turns a certificate definition into a portable, machine-verifiable
// credential document. A verification URL lands on the public certificate page,
// which emits the same JSON-LD, so a verifier (or an AI agent) can confirm the
// claim without trusting a screenshot.
//
// This is an "unsigned assertion" profile: the credential is discoverable and
// self-describing, but cryptographic proof issuance (Ed25519 signed VCs) is a
// deliberate follow-up once learner records are persisted (see Pillar E1).

import { CERTIFICATE_VERIFY_BASE, type Certificate } from './certificates';

const ISSUER = {
    id: 'https://kunwaranalytics.in',
    name: 'Kunwar Analytics',
} as const;

/** URN carrying the credential id, e.g. `urn:kunwar:credential:valuation-and-dcf`. */
export function credentialUrn(slug: string): string {
    return `urn:kunwar:credential:${slug}`;
}

/** Human-facing verification URL for a credential. */
export function verificationUrl(slug: string): string {
    return `${CERTIFICATE_VERIFY_BASE}/${slug}`;
}

/**
 * Deterministic verification code (CRED-XXXX-YYYY) derived from the slug.
 * Stable across renders so it can be printed on an issued certificate.
 */
export function verificationCode(slug: string): string {
    let hash = 0x811c9dc5;
    for (let i = 0; i < slug.length; i += 1) {
        hash ^= slug.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    const hex = hash.toString(16).toUpperCase().padStart(8, '0');
    return `CRED-${hex.slice(0, 4)}-${hex.slice(4, 8)}`;
}

/** W3C Verifiable Credential / Open Badge 3.0 assertion for a certificate. */
export function buildCredential(
    certificate: Certificate,
    options: { issuedOn?: Date } = {},
) {
    const post = options.issuedOn ?? new Date();
    const url = verificationUrl(certificate.slug);

    return {
        '@context': [
            'https://www.w3.org/ns/credentials/v2',
            'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json',
        ],
        id: credentialUrn(certificate.slug),
        type: ['VerifiableCredential', 'OpenBadgeCredential'],
        name: certificate.title,
        description: certificate.summary,
        issuer: {
            id: ISSUER.id,
            type: ['Profile'],
            name: ISSUER.name,
            url: ISSUER.id,
        },
        validFrom: post.toISOString(),
        credentialSubject: {
            id: url,
            type: ['AchievementSubject'],
            achievement: {
                id: url,
                type: ['Achievement'],
                name: certificate.title,
                description: certificate.summary,
                achievementType: 'Certificate',
                criteria: {
                    narrative: `${certificate.assessment}. Estimated study time: ${certificate.hours} hours.`,
                },
                alignment: certificate.skills.map((skill) => ({
                    type: ['Alignment'],
                    targetName: skill,
                    targetUrl: certificate.track.href,
                })),
                tag: [certificate.category, certificate.level, ...certificate.skills],
            },
        },
        credentialStatus: {
            id: `${url}#status`,
            type: 'StatusList',
            statusPurpose: 'revocation',
            statusListIndex: verificationCode(certificate.slug),
            statusListCredential: url,
        },
        evidence: [
            {
                type: ['Evidence'],
                id: certificate.track.href,
                name: certificate.track.label,
                description: `Learning track for ${certificate.title}`,
            },
        ],
        // Portable verification hints consumed by the public certificate page.
        verification: {
            code: verificationCode(certificate.slug),
            url,
            free: certificate.free,
        },
    };
}
