'use client';

// components/ask/AskKunwarBubble.tsx
//
// Floating "Ask Kunwar" AI assistant bubble — fixed to the bottom-right of
// every page. Finance + BA themed. Opens as a compact chat sheet.

import { useState, useRef, useEffect } from 'react';
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
    sourceCount: number;
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    text: string;
    citations?: Citation[];
    provider?: string;
    isLoading?: boolean;
}

const QUICK_QUESTIONS = [
    '⚡ What features does Kunwar Analytics have?',
    '💳 What are the pricing plans & how to pay?',
    '💹 How does DCF valuation work?',
    '📈 Quick commerce unit economics?',
    '🏦 What drives Fintech credit in India?',
    '📧 How do I contact the research desk?',
];

const PROVIDER_LABELS: Record<string, string> = {
    'huggingface-mistral': 'Hugging Face inference',
    'kunwar-knowledge-engine': 'Platform knowledge',
    'local-extractive': 'Local source extraction',
};

function TypingDots() {
    return (
        <span className="inline-flex items-center gap-1 px-1">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:300ms]" />
        </span>
    );
}

export default function AskKunwarBubble() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const openerRef = useRef<HTMLButtonElement>(null);
    const wasOpenRef = useRef(false);

    // Auto-scroll to latest message
    useEffect(() => {
        if (open) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, open]);

    // Focus the chat input when opened, keep keyboard navigation inside the modal,
    // and restore focus to its trigger when it closes.
    useEffect(() => {
        if (!open) {
            if (wasOpenRef.current) {
                wasOpenRef.current = false;
                requestAnimationFrame(() => openerRef.current?.focus());
            }
            return;
        }

        wasOpenRef.current = true;
        const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 100);
        const panel = panelRef.current;
        if (!panel) return () => window.clearTimeout(focusTimer);

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                setOpen(false);
                return;
            }
            if (event.key !== 'Tab') return;

            const focusable = Array.from(panel.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )).filter((element) => element.offsetParent !== null);
            if (focusable.length === 0) {
                event.preventDefault();
                panel.focus();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => {
            window.clearTimeout(focusTimer);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    const handleOpen = () => {
        setOpen(true);
        setHasOpened(true);
        if (messages.length === 0) {
            setMessages([{
                id: 'welcome',
                role: 'assistant',
                text: "Hi! I'm **Kunwar**, your AI research and platform assistant 📊\n\nI can answer anything about our **features, pricing plans, DCF valuation tools, UPI payment (`sumitsingh7445@ptyes`)**, and institutional research library. What would you like to know?",
            }]);
        }
    };

    const sendMessage = async (question: string) => {
        const trimmed = question.trim();
        if (!trimmed || loading) return;

        const userMsg: Message = {
            id: `u-${Date.now()}`,
            role: 'user',
            text: trimmed,
        };
        const loadingMsg: Message = {
            id: `a-${Date.now()}`,
            role: 'assistant',
            text: '',
            isLoading: true,
        };

        setMessages((prev) => [...prev, userMsg, loadingMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/ask', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ question: trimmed }),
            });

            if (!res.ok) {
                const data = (await res.json().catch(() => ({}))) as { error?: string };
                throw new Error(data.error ?? 'Something went wrong');
            }

            const data = (await res.json()) as AskResponse;

            setMessages((prev) =>
                prev.map((m) =>
                    m.id === loadingMsg.id
                        ? {
                            ...m,
                            text: data.answer,
                            citations: data.citations,
                            provider: data.provider,
                            isLoading: false,
                        }
                        : m
                )
            );
        } catch (err) {
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === loadingMsg.id
                        ? {
                            ...m,
                            text: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
                            isLoading: false,
                        }
                        : m
                )
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        void sendMessage(input);
    };

    // Render message text with basic markdown (bold, links, code)
    const renderText = (text: string) => {
        // First match markdown links [label](url)
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
                    onClick={() => setOpen(false)}
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
        <>
            {/* Floating bubble button */}
            <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
                {/* Tooltip label when not yet opened */}
                {!hasOpened && !open && (
                    <div className="pointer-events-none animate-bounce-gentle">
                        <div className="flex items-center gap-2 rounded-2xl bg-surface-raised border border-border-strong px-4 py-2.5 shadow-xl shadow-black/40">
                            <span className="text-sm font-semibold text-content-primary">Ask Kunwar AI</span>
                            <span className="text-base">📊</span>
                        </div>
                        <div className="w-3 h-3 bg-surface-raised border-b border-r border-border-strong rotate-45 ml-auto mr-5 -mt-1.5" />
                    </div>
                )}

                <button
                    ref={openerRef}
                    type="button"
                    onClick={() => open ? setOpen(false) : handleOpen()}
                    className="group relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl shadow-teal-500/30 transition-all duration-300 hover:scale-110 active:scale-95"
                    style={{
                        background: 'linear-gradient(135deg, #0d9488 0%, #0891b2 50%, #7c3aed 100%)',
                    }}
                    aria-label={open ? 'Close Ask Kunwar' : 'Ask Kunwar AI'}
                >
                    {/* Ping ring */}
                    {!open && !hasOpened && (
                        <span className="absolute inset-0 rounded-full animate-ping opacity-30"
                            style={{ background: 'linear-gradient(135deg, #0d9488, #0891b2)' }}
                        />
                    )}

                    <span className="text-2xl text-white transition-transform duration-300" style={{ transform: open ? 'rotate(90deg)' : 'none' }}>
                        {open ? '✕' : '🤖'}
                    </span>

                    {/* Live dot */}
                    {!open && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
                        </span>
                    )}
                </button>
            </div>

            {/* Modal backdrop */}
            {open && (
                <button
                    type="button"
                    aria-label="Close Ask Kunwar dialog"
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-[198] bg-black/40 backdrop-blur-[2px]"
                />
            )}

            {/* Chat panel */}
            <div
                ref={panelRef}
                className={`fixed bottom-24 right-6 z-[199] w-[360px] max-w-[calc(100vw-1.5rem)] flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-overlay shadow-2xl shadow-black/60 transition-all duration-300 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                style={{ maxHeight: 'min(520px, calc(100dvh - 8rem))' }}
                role="dialog"
                aria-modal="true"
                aria-hidden={!open}
                aria-label="Ask Kunwar assistant"
                inert={!open}
                tabIndex={-1}
            >
                {/* Header */}
                <div className="shrink-0 flex items-center justify-between gap-3 border-b border-border bg-surface-muted px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl text-xl"
                            style={{ background: 'linear-gradient(135deg, #0d9488, #7c3aed)' }}>
                            🤖
                        </div>
                        <div>
                            <p className="text-sm font-bold text-content-primary">Ask Kunwar</p>
                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <p className="text-[10px] text-success font-medium">AI Research Assistant</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/ask"
                            className="rounded-lg px-2 py-1 text-[10px] font-semibold text-brand border border-brand/30 hover:bg-brand-muted transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Full page →
                        </Link>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-content-muted hover:bg-accent hover:text-content-primary transition-colors"
                            aria-label="Close Ask Kunwar dialog"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 min-h-0">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'assistant' && (
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm mt-0.5"
                                    style={{ background: 'linear-gradient(135deg, #0d9488, #7c3aed)' }}>
                                    📊
                                </div>
                            )}
                            <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-primary text-primary-foreground rounded-br-sm'
                                : 'bg-surface-muted border border-border text-content-secondary rounded-bl-sm'
                                }`}>
                                {msg.isLoading ? (
                                    <TypingDots />
                                ) : (
                                    <>
                                        <p className="whitespace-pre-line">{renderText(msg.text)}</p>
                                        {msg.citations && msg.citations.length > 0 && (
                                            <div className="mt-3 space-y-1.5 border-t border-border pt-2">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted">Sources</p>
                                                {msg.citations.slice(0, 3).map((c) => {
                                                    const href = safeAskHref(c.url);
                                                    const content = (
                                                        <>
                                                            <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-muted text-[9px] font-bold text-brand">
                                                                {c.index}
                                                            </span>
                                                            <span className="line-clamp-1">{c.title}</span>
                                                        </>
                                                    );
                                                    return href ? (
                                                        <Link
                                                            key={c.index}
                                                            href={href}
                                                            onClick={() => setOpen(false)}
                                                            className="flex items-start gap-2 rounded-lg border border-border-subtle bg-surface-muted p-2 text-xs text-content-secondary transition hover:border-brand/40 hover:text-brand-hover"
                                                        >
                                                            {content}
                                                        </Link>
                                                    ) : (
                                                        <div key={c.index} className="flex items-start gap-2 rounded-lg border border-border-subtle bg-surface-muted p-2 text-xs text-content-secondary">
                                                            {content}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                        {msg.provider && (
                                            <p className="mt-2 text-[10px] text-content-muted">Method: {PROVIDER_LABELS[msg.provider] ?? 'Source-grounded answer'}</p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Quick question chips — only shown after welcome & no other messages */}
                    {messages.length === 1 && !loading && (
                        <div className="flex flex-wrap gap-2 pt-1">
                            {QUICK_QUESTIONS.map((q) => (
                                <button
                                    key={q}
                                    type="button"
                                    onClick={() => void sendMessage(q.replace(/^[^\w]+/, '').trim())}
                                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-content-secondary transition hover:border-brand/50 hover:bg-brand-muted hover:text-brand-hover text-left"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="shrink-0 border-t border-border p-3">
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-muted pr-2 transition-colors focus-within:border-brand">
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about features, pricing, tools, research…"
                            disabled={loading}
                            className="flex-1 bg-transparent py-3 pl-3.5 text-sm text-content-primary placeholder:text-content-muted outline-none disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-brand transition hover:bg-brand-muted disabled:opacity-40"
                            aria-label="Send"
                        >
                            {loading ? (
                                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                            ) : (
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <p className="mt-1.5 text-center text-[10px] text-content-muted">
                        Answers are grounded in available Kunwar Analytics site sources; provider availability may vary.
                    </p>
                </form>
            </div>
        </>
    );
}
