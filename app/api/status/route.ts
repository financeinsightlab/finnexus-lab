import { NextResponse } from 'next/server';
import { featureStatus } from '@/lib/status';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Capability/status endpoint. Reports which optional integrations are active so
 * the UI (and docs) can show what's live and what a key would unlock. Never
 * exposes secret values — only a boolean per feature.
 */
export async function GET() {
    const features = featureStatus();
    return NextResponse.json(
        {
            generatedAt: new Date().toISOString(),
            enabled: features.filter((f) => f.enabled).map((f) => f.id),
            pending: features.filter((f) => !f.enabled).map((f) => ({ id: f.id, requires: f.requires })),
            features,
        },
        { status: 200 },
    );
}
