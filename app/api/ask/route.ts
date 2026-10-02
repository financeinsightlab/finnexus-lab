import { NextResponse } from 'next/server';
import { z } from 'zod';
import { searchContent } from '@/lib/search';
import { answerFromSources, localExtractiveProvider, type AnswerProvider, type PassageSource } from '@/lib/retrieval-qa';
import { huggingFaceProvider } from '@/lib/hf-provider';
import { getPlatformPassages, synthesizeLocalPlatformAnswer } from '@/lib/kunwar-knowledge';
import { consumeRateLimit } from '@/lib/rate-limit';
import { requestRateLimitSubject } from '@/lib/request-rate-limit';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const AskSchema = z.object({
    question: z.string().trim().min(3).max(300),
}).strict();

async function localAnswer(question: string, sources: PassageSource[]) {
    const localPlatformText = synthesizeLocalPlatformAnswer(
        question,
        sources.map((source, index) => ({ ...source, index: index + 1 })),
    );

    if (localPlatformText) {
        const platformProvider: AnswerProvider = {
            name: 'kunwar-knowledge-engine',
            async synthesize() { return localPlatformText; },
        };
        return answerFromSources(question, sources, { provider: platformProvider });
    }

    return answerFromSources(question, sources, { provider: localExtractiveProvider });
}

export async function POST(request: Request) {
    const declaredLength = Number(request.headers.get('content-length') ?? 0);
    if (declaredLength > 16_384) {
        return NextResponse.json({ error: 'Question request is too large.' }, { status: 413 });
    }

    try {
        const subject = requestRateLimitSubject(request);
        const minuteLimit = await consumeRateLimit('ask-kunwar-minute', subject, {
            limit: 5,
            windowSeconds: 60,
        });
        if (!minuteLimit.allowed) {
            return NextResponse.json(
                { error: 'Please wait a minute before asking another question.' },
                { status: 429, headers: { 'Retry-After': String(minuteLimit.retryAfterSeconds) } },
            );
        }
        const hourlyLimit = await consumeRateLimit('ask-kunwar-hourly', subject, {
            limit: 30,
            windowSeconds: 60 * 60,
        });
        if (!hourlyLimit.allowed) {
            return NextResponse.json(
                { error: 'Ask Kunwar request limit reached. Please try again later.' },
                { status: 429, headers: { 'Retry-After': String(hourlyLimit.retryAfterSeconds) } },
            );
        }
    } catch (error) {
        logger.error('Ask Kunwar rate-limit check failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Ask Kunwar is temporarily unavailable.' }, { status: 503 });
    }

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
        let searchSources: PassageSource[] = [];
        try {
            const results = await searchContent(question, { perKind: 3 });
            searchSources = results.groups
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
        } catch {
            // Platform knowledge can still answer common product questions if
            // the database-backed site search is temporarily unavailable.
            logger.warn('Ask Kunwar site search unavailable; using platform knowledge passages');
        }

        const platformSources = getPlatformPassages(question);
        const uniqueByUrl = new Map<string, PassageSource>();
        for (const source of [...platformSources, ...searchSources]) {
            if (!uniqueByUrl.has(source.url)) uniqueByUrl.set(source.url, source);
        }
        const sources = [...uniqueByUrl.values()].slice(0, 6);

        // Do not send prompts to a potentially billable provider automatically.
        // An operator must explicitly opt in, and the existing HF key is the
        // only credential used. Without both, the local grounded fallback runs.
        const huggingFaceEnabled =
            process.env.HUGGINGFACE_INFERENCE_ENABLED === 'true' &&
            Boolean(process.env.HUGGINGFACE_API_KEY) &&
            sources.length > 0;

        let answer;
        if (huggingFaceEnabled) {
            try {
                answer = await answerFromSources(question, sources, {
                    provider: huggingFaceProvider,
                });
                if (answer.noAnswer) {
                    logger.warn('Ask Kunwar external answer lacked a valid source citation; using local fallback');
                    answer = await localAnswer(question, sources);
                }
            } catch {
                // Provider errors are deliberately logged without request text,
                // response bodies, or environment values.
                logger.warn('Ask Kunwar Hugging Face request failed; using local fallback');
                answer = await localAnswer(question, sources);
            }
        } else {
            answer = await localAnswer(question, sources);
        }

        return NextResponse.json(
            { ...answer, sourceCount: answer.citations.length },
            { status: 200, headers: { 'Cache-Control': 'no-store, private, max-age=0' } },
        );
    } catch (error) {
        logger.error('Ask Kunwar retrieval failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Unable to answer right now.' }, { status: 500 });
    }
}
