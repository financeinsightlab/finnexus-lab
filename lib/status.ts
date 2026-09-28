// lib/status.ts — product surface status (what's live vs. configured)
//
// Small, shared helper so the UI and the docs agree on which optional
// integrations are active. Everything here is derived from env at runtime, so
// adding a key "lights up" the corresponding feature with no code change.

export interface FeatureStatus {
    /** Stable key, e.g. `stripe`. */
    id: string;
    label: string;
    /** True when the feature is fully usable right now. */
    enabled: boolean;
    /** What unlocks it when disabled. */
    requires: string;
    pillar: string;
}

function env(...names: string[]): boolean {
    return names.every((name) => Boolean(process.env[name] && process.env[name]!.trim().length > 0));
}

/** The full capability map, evaluated against the current process env. */
export function featureStatus(): FeatureStatus[] {
    return [
        {
            id: 'ask-kunwar',
            label: 'Ask Kunwar (retrieval Q&A)',
            enabled: true,
            requires: '—',
            pillar: 'B1',
        },
        {
            id: 'hybrid-search',
            label: 'Hybrid search (lexical + optional vectors)',
            enabled: true,
            requires: 'Lexical works now; vectors need EMBEDDING_API_KEY',
            pillar: 'B2',
        },
        {
            id: 'live-metrics',
            label: 'Live metrics (FX + World Bank)',
            enabled: true,
            requires: '—',
            pillar: 'C1',
        },
        {
            id: 'freshness-sla',
            label: 'Freshness SLAs + worklist',
            enabled: true,
            requires: '—',
            pillar: 'C4',
        },
        {
            id: 'progress',
            label: 'Persisted learning progress',
            enabled: env('DATABASE_URL'),
            requires: 'DATABASE_URL + Enrollment migration',
            pillar: 'E1/E3',
        },
        {
            id: 'pwa',
            label: 'Installable PWA',
            enabled: true,
            requires: '—',
            pillar: 'F3',
        },
        {
            id: 'error-reporting',
            label: 'Error reporting sink',
            enabled: true,
            requires: 'Logs now; set SENTRY_DSN for Sentry/any sink',
            pillar: 'G1',
        },
        {
            id: 'stripe',
            label: 'Stripe billing (checkout + portal + webhooks)',
            enabled: env('STRIPE_SECRET_KEY'),
            requires: 'STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET (free test mode)',
            pillar: 'A1',
        },
        {
            id: 'email',
            label: 'Transactional email (digests, alerts)',
            enabled: env('RESEND_API_KEY'),
            requires: 'RESEND_API_KEY (free tier)',
            pillar: 'D3/G3',
        },
    ];
}

/** Only the features that are currently disabled, for a "what to enable" panel. */
export function pendingFeatures(): FeatureStatus[] {
    return featureStatus().filter((feature) => !feature.enabled);
}
