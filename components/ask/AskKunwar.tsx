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
                    className="text-brand font-semibold underline underline-offset-2 hover:text-brand-hover"
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
                        return <strong key={i} className="font-bold text-content-primary">{part.slice(2, -2)}</strong>;
                    }
                    if (part.startsWith('`') && part.endsWith('`')) {
                        return (
                            <code key={i} className="px-1.5 py-0.5 rounded bg-accent font-mono text-brand text-xs">
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
                    className="w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm text-content-primary shadow-sm outline-none transition placeholder:text-content-muted focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
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
                            className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-content-secondary transition hover:bg-surface-muted hover:text-content-primary"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}

            {error && (
                <p className="mt-4 rounded-lg border border-error/30 bg-error-muted px-4 py-3 text-sm text-error">
                    {error}
                </p>
            )}

            {result && (
                <div className="mt-6 space-y-4">
                    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-widest text-content-muted">
                            Answer · sourced from {result.citations.length} page
                            {result.citations.length === 1 ? '' : 's'} · {PROVIDER_LABELS[result.provider] ?? 'Source-grounded answer'}
                        </p>
                        <div className="mt-3 space-y-2 whitespace-pre-line text-sm leading-relaxed text-content-secondary">
                            {renderMarkdown(result.answer)}
                        </div>
                    </div>

                    {result.citations.length > 0 && (
                        <ol className="space-y-2">
                            {result.citations.map((citation) => {
                                const href = safeAskHref(citation.url);
                                const citationContent = (
                                    <>
                                        <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-muted text-xs font-bold text-brand">
                                            {citation.index}
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-sm font-medium text-content-primary">
                                                {citation.title}
                                            </span>
                                            <span className="mt-0.5 block truncate text-xs text-content-muted">
                                                {citation.snippet}
                                            </span>
                                        </span>
                                    </>
                                );
                                return (
                                    <li key={citation.index}>
                                        {href ? (
                                            <Link href={href} className="flex gap-3 rounded-lg border border-border bg-surface p-3 transition hover:border-brand/40 hover:bg-brand-muted">
                                                {citationContent}
                                            </Link>
                                        ) : (
                                            <div className="flex gap-3 rounded-lg border border-border p-3">
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
