import { NextResponse } from 'next/server';
import { z } from 'zod';
import { searchContent } from '@/lib/search';
import { answerFromSources, localExtractiveProvider, type PassageSource } from '@/lib/retrieval-qa';
import { huggingFaceProvider } from '@/lib/hf-provider';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * "Ask Kunwar" — retrieval-backed Q&A with HuggingFace LLM (Pillar B1).
 *
 * When HUGGINGFACE_API_KEY is set: uses Mistral-7B on HF Inference API for
 * real generative answers with inline citations.
 * When the key is absent or the call fails: falls back to the local extractive
 * provider (no API key, no cost).
 *
 * Every answer carries citations pointing at real pages on this site.
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

        const { getPlatformPassages, synthesizeLocalPlatformAnswer } = await import('@/lib/kunwar-knowledge');
        const platformSources = getPlatformPassages(question);

        // Merge sources: platform sources + research search sources
        const combinedSources: PassageSource[] = [
            ...platformSources,
            ...sources,
        ].slice(0, 6);

        // Try HuggingFace first; fall back to local platform or extractive synthesizer
        const hasHFKey = !!process.env.HUGGINGFACE_API_KEY;
        let answer;

        if (hasHFKey) {
            try {
                answer = await answerFromSources(question, combinedSources, {
                    provider: huggingFaceProvider,
                });
            } catch (hfError) {
                logger.warn('Ask Kunwar: HuggingFace failed, falling back to local synthesizer', {
                    error: hfError instanceof Error ? hfError.message : String(hfError),
                });

                // Check if this is a platform query we can answer locally with full authority
                const localPlatformText = synthesizeLocalPlatformAnswer(
                    question,
                    combinedSources.map((s, idx) => ({ ...s, index: idx + 1 }))
                );

                if (localPlatformText) {
                    answer = {
                        question,
                        answer: localPlatformText,
                        citations: combinedSources.map((s, idx) => ({
                            index: idx + 1,
                            title: s.title,
                            url: s.url,
                            kind: s.kind,
                            snippet: s.description.slice(0, 160),
                            score: s.score,
                        })),
                        provider: 'kunwar-knowledge-engine',
                        noAnswer: false,
                    };
                } else {
                    answer = await answerFromSources(question, combinedSources, {
                        provider: localExtractiveProvider,
                    });
                }
            }
        } else {
            const localPlatformText = synthesizeLocalPlatformAnswer(
                question,
                combinedSources.map((s, idx) => ({ ...s, index: idx + 1 }))
            );

            if (localPlatformText) {
                answer = {
                    question,
                    answer: localPlatformText,
                    citations: combinedSources.map((s, idx) => ({
                        index: idx + 1,
                        title: s.title,
                        url: s.url,
                        kind: s.kind,
                        snippet: s.description.slice(0, 160),
                        score: s.score,
                    })),
                    provider: 'kunwar-knowledge-engine',
                    noAnswer: false,
                };
            } else {
                answer = await answerFromSources(question, combinedSources, {
                    provider: localExtractiveProvider,
                });
            }
        }

        return NextResponse.json(
            { ...answer, sourceCount: combinedSources.length },
            { status: 200 },
        );
    } catch (error) {
        logger.error('Ask Kunwar failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Unable to answer right now.' }, { status: 500 });
    }
}
