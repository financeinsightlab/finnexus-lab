// lib/hf-provider.ts — Hugging Face Inference API provider for Ask Kunwar
//
// Uses `HUGGINGFACE_API_KEY` to call the HF Inference API with a capable
// text-generation model. If the key is absent or the call fails, it returns
// null so the caller can fall back to localExtractiveProvider.

import type { AnswerProvider, Passage } from './retrieval-qa';

// A small, fast instruction-following model on HF Inference API (free tier).
const HF_MODEL = 'mistralai/Mistral-7B-Instruct-v0.3';
const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

function buildPrompt(question: string, passages: readonly Passage[]): string {
    const context = passages
        .slice(0, 5)
        .map((p) => `[${p.index}] ${p.title}: ${p.snippet}`)
        .join('\n\n');

    return `<s>[INST] You are "Ask Kunwar", a financial research assistant for Kunwar Analytics.
Answer the user's question ONLY using the sources below. Cite each source used with [number] inline.
If the sources don't contain enough information, say so honestly. Be concise and factual.

Sources:
${context}

Question: ${question} [/INST]`;
}

export const huggingFaceProvider: AnswerProvider = {
    name: 'huggingface-mistral',

    async synthesize(question: string, passages: readonly Passage[]): Promise<string> {
        const apiKey = process.env.HUGGINGFACE_API_KEY;
        if (!apiKey) throw new Error('HUGGINGFACE_API_KEY not set');

        const prompt = buildPrompt(question, passages);

        const response = await fetch(HF_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_new_tokens: 350,
                    temperature: 0.3,
                    top_p: 0.9,
                    return_full_text: false,
                    stop: ['</s>', '[INST]'],
                },
            }),
            signal: AbortSignal.timeout(25_000),
        });

        if (!response.ok) {
            const text = await response.text().catch(() => '');
            throw new Error(`HF API error ${response.status}: ${text.slice(0, 200)}`);
        }

        // HF Inference API returns: [{ generated_text: "..." }]
        type HFResponse = { generated_text?: string }[];
        const data = (await response.json()) as HFResponse;
        const raw = (data?.[0]?.generated_text ?? '').trim();

        if (!raw) throw new Error('Empty response from HF API');
        return raw;
    },
};
