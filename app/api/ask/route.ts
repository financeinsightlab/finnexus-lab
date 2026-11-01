// app/api/ask/route.ts — Ask Kunwar Platform Assistant API (Central AI Gateway + Grounded RAG)

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { aiGateway } from '@/lib/ai/gateway';
import { knowledgeRetrieval } from '@/lib/knowledge/retrieval';
import { validateCitations } from '@/lib/knowledge/citation-validator';
import { searchContent } from '@/lib/search';
import { answerFromSources, localExtractiveProvider, type AnswerProvider, type PassageSource } from '@/lib/retrieval-qa';
import { getPlatformPassages, synthesizeLocalPlatformAnswer } from '@/lib/kunwar-knowledge';
import { consumeRateLimit } from '@/lib/rate-limit';
import { requestRateLimitSubject } from '@/lib/request-rate-limit';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const AskSchema = z.object({
  question: z.string().trim().min(3).max(500),
  pageUrl: z.string().max(300).optional(),
  pageTitle: z.string().max(300).optional(),
});

async function localFallbackAnswer(question: string) {
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
    logger.warn('Ask Kunwar searchContent fallback unavailable; using platform knowledge passages');
  }

  const platformSources = getPlatformPassages(question);
  const uniqueByUrl = new Map<string, PassageSource>();
  for (const s of [...platformSources, ...searchSources]) {
    if (!uniqueByUrl.has(s.url)) uniqueByUrl.set(s.url, s);
  }
  const sources = [...uniqueByUrl.values()].slice(0, 6);

  const localPlatformText = synthesizeLocalPlatformAnswer(
    question,
    sources.map((source, index) => ({ ...source, index: index + 1 }))
  );

  if (localPlatformText) {
    const platformProvider: AnswerProvider = {
      name: 'kunwar-knowledge-engine',
      async synthesize() {
        return localPlatformText;
      },
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
      limit: 10,
      windowSeconds: 60,
    });
    if (!minuteLimit.allowed) {
      return NextResponse.json(
        { error: 'Please wait a minute before asking another question.' },
        { status: 429, headers: { 'Retry-After': String(minuteLimit.retryAfterSeconds) } }
      );
    }
    const hourlyLimit = await consumeRateLimit('ask-kunwar-hourly', subject, {
      limit: 60,
      windowSeconds: 60 * 60,
    });
    if (!hourlyLimit.allowed) {
      return NextResponse.json(
        { error: 'Ask Kunwar request limit reached. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(hourlyLimit.retryAfterSeconds) } }
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
      { error: 'A question between 3 and 500 characters is required.' },
      { status: 422 }
    );
  }

  const { question, pageUrl, pageTitle } = parsed.data;

  try {
    // 1. Central Grounded Knowledge Retrieval (Site + Page Context + Live Connectors + External Web)
    const retrievalResult = await knowledgeRetrieval.retrieve(question, {
      pageUrl,
      pageContextTitle: pageTitle,
      limit: 6,
    });

    const passages = retrievalResult.passages;

    // Build context prompt
    const passagesText =
      passages.length > 0
        ? passages
            .map(
              (p) =>
                `[${p.index}] ${p.title} (${p.url}) [Source: ${p.sourceType}]\n${p.snippet}`
            )
            .join('\n\n')
        : 'No specific passages retrieved.';

    const systemPrompt = `You are "Ask Kunwar", the institutional AI assistant for Kunwar Analytics (https://kunwaranalytics.in).
Kunwar Analytics is an institutional-grade financial intelligence, research, and learning platform.
Guidelines:
1. Answer the user's question clearly and directly based on the verified evidence passages below.
2. Cite supported factual statements using bracketed citation numbers matching the passages (e.g. [1], [2]).
3. If live market data is provided, cite it accurately. Never hallucinate stock prices or corporate financial results.
4. If the retrieved evidence is insufficient, state what is known and clarify the limitation honestly.
5. If the user appears to be inquiring about financial modeling, institutional consulting, or placement coaching, mention that they can request a consultation or custom analysis.`;

    const userPrompt = `${retrievalResult.liveMarketContext ? `${retrievalResult.liveMarketContext}\n\n` : ''}<retrieved_context>
${passagesText}
</retrieved_context>

${pageUrl ? `<current_user_page>\nURL: ${pageUrl}\nTitle: ${pageTitle || 'N/A'}\n</current_user_page>\n\n` : ''}<user_question>
${question}
</user_question>`;

    // 2. Dispatch through Central AI Gateway with automatic failover
    try {
      const aiResponse = await aiGateway.chat(
        'ask-kunwar',
        [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        { temperature: 0.2, maxTokens: 800 }
      );

      // 3. Grounded Citation Validation
      const validated = validateCitations(aiResponse.text, passages);

      return NextResponse.json(
        {
          question,
          answer: validated.cleanAnswer,
          citations: validated.citations,
          provider: `${aiResponse.provider}-${aiResponse.model}`,
          model: aiResponse.model,
          fallbackUsed: aiResponse.fallbackUsed,
          noAnswer: validated.citations.length === 0 && !validated.cleanAnswer.trim(),
          sourceCount: validated.citations.length,
        },
        { status: 200, headers: { 'Cache-Control': 'no-store, private, max-age=0' } }
      );
    } catch (gatewayError) {
      logger.warn('AI Gateway call failed; executing local deterministic fallback', {
        error: gatewayError instanceof Error ? gatewayError.message : String(gatewayError),
      });

      // 4. Deterministic Local Extractive Fallback
      const fallback = await localFallbackAnswer(question);
      return NextResponse.json(
        {
          ...fallback,
          sourceCount: fallback.citations.length,
        },
        { status: 200, headers: { 'Cache-Control': 'no-store, private, max-age=0' } }
      );
    }
  } catch (error) {
    logger.error('Ask Kunwar retrieval failed', {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: 'Unable to answer right now.' }, { status: 500 });
  }
}
