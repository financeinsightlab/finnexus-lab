import { NextResponse } from 'next/server';
import { z } from 'zod';
import { searchContent } from '@/lib/search';
import { answerFromSources, type PassageSource } from '@/lib/retrieval-qa';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * "Ask Kunwar" — retrieval-backed Q&A with inline citations (Pillar B1).
 *
 * Free by default: retrieval uses the unified keyword search and answers are
 * synthesized by the local extractive provider, so this works with **no API
 * key**. When an external LLM provider is configured it can be plugged in
 * through `lib/retrieval-qa` without changing this route.
 *
 * The response always includes `citations` pointing at real pages on this site,
 * so an answer can never float free of its sources.
 */

const AskSchema = z.object({
    question: z.string().trim().min(3).max(300),
});

export async function POST(request: Request) {
    let payload: unknown;
    try {
        payload = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const parsed = AskSchema.safeParse(payload);
    if (!parsed.success) {
        return NextResponse.json(
            { error: 'A question between 3 and 300 characters is required.' },
            { status: 422 },
        );
    }

    const { question } = parsed.data;

    try {
        const results = await searchContent(question, { perKind: 4 });

        const sources: PassageSource[] = results.groups
            .flatMap((group) => group.items)
            .sort((a, b) => b.score - a.score)
            .slice(0, 6)
            .map((item) => ({
                title: item.title,
                url: item.url,
                kind: item.kind,
                description: item.description,
                score: item.score,
            }));

        const answer = await answerFromSources(question, sources);

        return NextResponse.json(
            {
                ...answer,
                sourceCount: sources.length,
            },
            { status: 200 },
        );
    } catch (error) {
        logger.error('Ask Kunwar failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Unable to answer right now.' }, { status: 500 });
    }
}
