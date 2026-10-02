// lib/status.ts — product surface status (what's live vs. configured)
//
// Small, shared helper so the UI and public status endpoint describe actual
// feature availability. Intentionally disabled capabilities stay disabled even
// if a legacy provider key is present.

export interface FeatureStatus {
    /** Stable key, e.g. `stripe`. */
    id: string;
    label: string;
    /** True when the feature is available in the current application. */
    enabled: boolean;
    /** Distinguish configuration gaps from features intentionally disabled by policy. */
    state: 'available' | 'not-configured' | 'disabled';
    /** Current availability note or what would be needed to unlock it. */
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
            state: 'available',
            requires: 'Local grounded answers work without a provider; Hugging Face is separately opt-in.',
            pillar: 'B1',
        },
        {
            id: 'hybrid-search',
            label: 'Site search (lexical retrieval)',
            enabled: true,
            state: 'available',
            requires: 'Lexical retrieval is available; vector/embedding search is not enabled.',
            pillar: 'B2',
        },
        {
            id: 'live-metrics',
            label: 'Live metrics (FX + World Bank)',
            enabled: true,
            state: 'available',
            requires: 'Daily reference FX and World Bank data; not intraday market quotes.',
            pillar: 'C1',
        },
        {
            id: 'freshness-sla',
            label: 'Freshness SLAs + worklist',
            enabled: true,
            state: 'available',
            requires: 'Freshness checks and the existing worklist are available.',
            pillar: 'C4',
        },
        {
            id: 'progress',
            label: 'Persisted learning progress',
            enabled: env('DATABASE_URL'),
            state: env('DATABASE_URL') ? 'available' : 'not-configured',
            requires: 'Database-backed progress features depend on DATABASE_URL and the available schema.',
            pillar: 'E1/E3',
        },
        {
            id: 'pwa',
            label: 'Installable PWA',
            enabled: true,
            state: 'available',
            requires: '—',
            pillar: 'F3',
        },
        {
            id: 'error-reporting',
            label: 'Application error logging',
            enabled: true,
            state: 'available',
            requires: 'Server logs are available; no external monitoring service is configured by this feature.',
            pillar: 'G1',
        },
        {
            id: 'stripe',
            label: 'Stripe checkout and billing',
            enabled: false,
            state: 'disabled',
            requires: 'Intentionally disabled; paid self-service checkout uses manual UPI with administrator review.',
            pillar: 'A1',
        },
        {
            id: 'email',
            label: 'Transactional email delivery',
            enabled: false,
            state: 'disabled',
            requires: 'Email delivery is not implemented; no provider key activates certificate or payment emails.',
            pillar: 'D3/G3',
        },
    ];
}

/** Only the features that are currently disabled, for a "what to enable" panel. */
export function pendingFeatures(): FeatureStatus[] {
    return featureStatus().filter((feature) => !feature.enabled);
}
