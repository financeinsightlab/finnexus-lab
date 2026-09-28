// app/api/datasets/[slug]/route.ts — Data Lab dataset downloads (Pillar C3)
//
// Serves the first-party Data Lab datasets as machine-readable CSV or JSON so
// the figures can be cited, re-used and fed to other tools. Free and public:
// the data is CC BY 4.0.
//
//   GET /api/datasets/{slug}?format=csv   → text/csv  (attachment)
//   GET /api/datasets/{slug}?format=json  → application/json

import { NextResponse } from 'next/server';
import { getDataset, datasetToCsv } from '@/lib/datasets';

export const runtime = 'nodejs';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> },
) {
    const { slug } = await params;
    const dataset = getDataset(slug);

    if (!dataset) {
        return NextResponse.json({ error: 'Dataset not found' }, { status: 404 });
    }

    const format = new URL(request.url).searchParams.get('format') ?? 'json';

    if (format === 'csv') {
        const csv = datasetToCsv(dataset.rows, dataset.columns);
        return new NextResponse(csv, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="kunwar-datalab-${slug}.csv"`,
                // Static data — safe to cache aggressively at the edge.
                'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
            },
        });
    }

    return NextResponse.json(
        {
            slug: dataset.slug,
            columns: dataset.columns,
            rowCount: dataset.rowCount,
            license: 'CC BY 4.0',
            source: dataset.pageUrl,
            csvUrl: dataset.csvUrl,
            data: dataset.rows,
        },
        {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
            },
        },
    );
}
