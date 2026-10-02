import type { Metadata } from 'next';
import { featureStatus } from '@/lib/status';

export const metadata: Metadata = {
    title: 'Platform status',
    description: 'A configuration-aware status board for available and intentionally disabled Kunwar Analytics capabilities.',
    alternates: { canonical: '/status' },
};

export const dynamic = 'force-dynamic';

/** Build a grouped map of pillar → features for a tidy status board. */
function groupByPillar(features: ReturnType<typeof featureStatus>) {
    const groups = new Map<string, ReturnType<typeof featureStatus>>();
    for (const feature of features) {
        const pillar = feature.pillar.charAt(0).toUpperCase();
        const bucket = groups.get(pillar) ?? [];
        bucket.push(feature);
        groups.set(pillar, bucket);
    }
    return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

export default function StatusPage() {
    const features = featureStatus();

    return (
        <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <header className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-content-primary">
                    Platform status
                </h1>
                <p className="mt-3 text-sm text-content-secondary">
                    This page distinguishes available local features, integrations needing
                    configuration, and capabilities intentionally disabled by product policy.
                </p>
            </header>

            <div className="space-y-8">
                {groupByPillar(features).map(([pillar, items]) => (
                    <section key={pillar}>
                        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-content-muted">
                            Pillar {pillar}
                        </h2>
                        <ul className="space-y-2">
                            {items.map((feature) => (
                                <li
                                    key={feature.id}
                                    className="flex items-start justify-between gap-4 rounded-xl border border-border bg-surface p-4"
                                >
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-content-primary">
                                            {feature.label}
                                        </p>
                                        <p className="mt-0.5 text-xs text-content-muted">{feature.requires}</p>
                                    </div>
                                    <span
                                        className={
                                            feature.state === 'available'
                                                ? 'flex-none rounded-full bg-success-muted px-3 py-1 text-xs font-semibold text-success'
                                                : 'flex-none rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-content-muted'
                                        }
                                    >
                                        {feature.state === 'disabled'
                                            ? 'Disabled by design'
                                            : feature.enabled
                                                ? 'Available'
                                                : 'Needs configuration'}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </main>
    );
}
