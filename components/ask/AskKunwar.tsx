'use client';

import { useState } from 'react';
import Link from 'next/link';
import { safeAskHref } from './safe-ask-link';

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

const PROVIDER_LABELS: Record<string, string> = {
    'huggingface-mistral': 'Hugging Face inference',
    'kunwar-knowledge-engine': 'Platform knowledge',
    'local-extractive': 'Local source extraction',
};

const SUGGESTIONS = [
    'What features and tools does Kunwar Analytics have?',
    'What are the pricing plans and how to pay via UPI?',
    'What does the DCF valuation approach cover?',
    'How do quick-commerce unit economics work?',
    'How do I contact the research desk or enterprise team?',
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

    const renderMarkdown = (text: string) => {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const tokens: React.ReactNode[] = [];
        let lastIndex = 0;
        let match;

        while ((match = linkRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                tokens.push(renderFormatting(text.slice(lastIndex, match.index), tokens.length));
            }
            const label = match[1];
            const url = safeAskHref(match[2]);
            tokens.push(url ? (
                <Link
                    key={tokens.length}
                    href={url}
                    className="text-amber-600 dark:text-amber-400 font-semibold underline underline-offset-2 hover:opacity-80"
                >
                    {label}
                </Link>
            ) : <span key={tokens.length}>{label}</span>);
            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < text.length) {
            tokens.push(renderFormatting(text.slice(lastIndex), tokens.length));
        }

        return tokens;
    };

    const renderFormatting = (chunk: string, baseKey: number) => {
        const parts = chunk.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
        return (
            <span key={baseKey}>
                {parts.map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="font-bold text-neutral-900 dark:text-white">{part.slice(2, -2)}</strong>;
                    }
                    if (part.startsWith('`') && part.endsWith('`')) {
                        return (
                            <code key={i} className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-amber-600 dark:text-amber-400 text-xs">
                                {part.slice(1, -1)}
                            </code>
                        );
                    }
                    return <span key={i}>{part}</span>;
                })}
            </span>
        );
    };

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
                    placeholder="Ask about features, pricing, valuation, research, or study courses…"
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
                            {result.citations.length === 1 ? '' : 's'} · {PROVIDER_LABELS[result.provider] ?? 'Source-grounded answer'}
                        </p>
                        <div className="mt-3 text-sm leading-relaxed text-neutral-800 dark:text-neutral-100 whitespace-pre-line space-y-2">
                            {renderMarkdown(result.answer)}
                        </div>
                    </div>

                    {result.citations.length > 0 && (
                        <ol className="space-y-2">
                            {result.citations.map((citation) => {
                                const href = safeAskHref(citation.url);
                                const citationContent = (
                                    <>
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
                                    </>
                                );
                                return (
                                    <li key={citation.index}>
                                        {href ? (
                                            <Link href={href} className="flex gap-3 rounded-lg border border-neutral-200 p-3 transition hover:border-amber-400 hover:bg-amber-50/50 dark:border-neutral-800 dark:hover:bg-neutral-800/50">
                                                {citationContent}
                                            </Link>
                                        ) : (
                                            <div className="flex gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
                                                {citationContent}
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ol>
                    )}
                </div>
            )}
        </div>
    );
}
