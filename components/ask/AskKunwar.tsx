'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Citation {
    index: number;
    title: string;
    url: string;
    kind: string;
    snippet: string;
    score: number;
}

interface AskResponse {
    question: string;
    answer: string;
    citations: Citation[];
    provider: string;
    noAnswer: boolean;
}

const SUGGESTIONS = [
    'What is driving India\'s inflation?',
    'How do quick-commerce unit economics work?',
    'What does the DCF valuation approach cover?',
];

/**
 * "Ask Kunwar" — retrieval-backed Q&A UI (Pillar B1).
 *
 * Every answer renders inline citation chips that link straight to the source
 * page. This is deliberately citation-first: the answer is only as trustworthy
 * as the sources shown beneath it.
 */
export default function AskKunwar() {
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AskResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function ask(q: string) {
        const trimmed = q.trim();
        if (trimmed.length < 3) {
            setError('Please enter a longer question.');
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await fetch('/api/ask', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ question: trimmed }),
            });
            if (!response.ok) {
                const data = (await response.json().catch(() => ({}))) as { error?: string };
                throw new Error(data.error ?? 'Something went wrong.');
            }
            setResult((await response.json()) as AskResponse);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto w-full max-w-3xl">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    void ask(question);
                }}
                className="flex flex-col gap-3 sm:flex-row"
            >
                <label htmlFor="ask-input" className="sr-only">
                    Ask a question
                </label>
                <input
                    id="ask-input"
                    type="text"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="Ask about markets, strategy, or the study library…"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? 'Searching…' : 'Ask'}
                </button>
            </form>

            {!result && !loading && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((suggestion) => (
                        <button
                            key={suggestion}
                            type="button"
                            onClick={() => {
                                setQuestion(suggestion);
                                void ask(suggestion);
                            }}
                            className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}

            {error && (
                <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
                    {error}
                </p>
            )}

            {result && (
                <div className="mt-6 space-y-4">
                    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                            Answer · sourced from {result.citations.length} page
                            {result.citations.length === 1 ? '' : 's'}
                        </p>
                        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-neutral-800 dark:text-neutral-100">
                            {result.answer}
                        </p>
                    </div>

                    {result.citations.length > 0 && (
                        <ol className="space-y-2">
                            {result.citations.map((citation) => (
                                <li key={citation.index}>
                                    <Link
                                        href={citation.url}
                                        className="flex gap-3 rounded-lg border border-neutral-200 p-3 transition hover:border-amber-400 hover:bg-amber-50/50 dark:border-neutral-800 dark:hover:bg-neutral-800/50"
                                    >
                                        <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                                            {citation.index}
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-sm font-medium text-neutral-900 dark:text-white">
                                                {citation.title}
                                            </span>
                                            <span className="mt-0.5 block truncate text-xs text-neutral-500">
                                                {citation.snippet}
                                            </span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            )}
        </div>
    );
}
