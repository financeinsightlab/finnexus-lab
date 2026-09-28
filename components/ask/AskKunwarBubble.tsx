'use client';

// components/ask/AskKunwarBubble.tsx
//
// Floating "Ask Kunwar" AI assistant bubble — fixed to the bottom-right of
// every page. Finance + BA themed. Opens as a compact chat sheet.

import { useState, useRef, useEffect } from 'react';
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
    sourceCount: number;
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    text: string;
    citations?: Citation[];
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
    'huggingface-mistral': '🤖 AI · Mistral-7B',
    'kunwar-knowledge-engine': '⚡ Kunwar Intelligence',
    'local-extractive': '🔍 Search-based',
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

    // Auto-scroll to latest message
    useEffect(() => {
        if (open) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, open]);

    // Focus input when opened
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
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
            const url = match[2];
            tokens.push(
                <Link
                    key={tokens.length}
                    href={url}
                    onClick={() => setOpen(false)}
                    className="text-teal-400 font-semibold underline underline-offset-2 hover:text-teal-300"
                >
                    {label}
                </Link>
            );
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
                        return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
                    }
                    if (part.startsWith('`') && part.endsWith('`')) {
                        return (
                            <code key={i} className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-teal-300 text-xs">
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
                        <div className="flex items-center gap-2 rounded-2xl bg-[#0f1c2d] border border-teal-500/30 px-4 py-2.5 shadow-xl shadow-black/40">
                            <span className="text-sm font-semibold text-white">Ask Kunwar AI</span>
                            <span className="text-base">📊</span>
                        </div>
                        <div className="w-3 h-3 bg-[#0f1c2d] border-b border-r border-teal-500/30 rotate-45 ml-auto mr-5 -mt-1.5" />
                    </div>
                )}

                <button
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

                    <span className="text-2xl transition-transform duration-300" style={{ transform: open ? 'rotate(90deg)' : 'none' }}>
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

            {/* Chat panel */}
            <div
                className={`fixed bottom-24 right-6 z-[199] w-[360px] max-w-[calc(100vw-1.5rem)] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b1520] shadow-2xl shadow-black/60 transition-all duration-300 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                style={{ maxHeight: 'min(520px, calc(100dvh - 8rem))' }}
            >
                {/* Header */}
                <div className="shrink-0 flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3"
                    style={{ background: 'linear-gradient(135deg, #0a1f30 0%, #0d2040 100%)' }}>
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl text-xl"
                            style={{ background: 'linear-gradient(135deg, #0d9488, #7c3aed)' }}>
                            🤖
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">Ask Kunwar</p>
                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <p className="text-[10px] text-emerald-400 font-medium">AI Research Assistant</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/ask"
                            className="rounded-lg px-2 py-1 text-[10px] font-semibold text-teal-400 border border-teal-500/30 hover:bg-teal-500/10 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Full page →
                        </Link>
                        <button
                            onClick={() => setOpen(false)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
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
                                ? 'bg-teal-600 text-white rounded-br-sm'
                                : 'bg-white/8 border border-white/10 text-slate-200 rounded-bl-sm'
                                }`}>
                                {msg.isLoading ? (
                                    <TypingDots />
                                ) : (
                                    <>
                                        <p className="whitespace-pre-line">{renderText(msg.text)}</p>
                                        {msg.citations && msg.citations.length > 0 && (
                                            <div className="mt-3 space-y-1.5 border-t border-white/10 pt-2">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sources</p>
                                                {msg.citations.slice(0, 3).map((c) => (
                                                    <Link
                                                        key={c.index}
                                                        href={c.url}
                                                        onClick={() => setOpen(false)}
                                                        className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/5 p-2 text-xs text-slate-300 transition hover:border-teal-500/30 hover:text-teal-300"
                                                    >
                                                        <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-900/60 text-[9px] font-bold text-teal-400">
                                                            {c.index}
                                                        </span>
                                                        <span className="line-clamp-1">{c.title}</span>
                                                    </Link>
                                                ))}
                                            </div>
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
                                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-slate-300 transition hover:border-teal-500/40 hover:bg-teal-900/20 hover:text-teal-300 text-left"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="shrink-0 border-t border-white/10 p-3">
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 pr-2 transition-colors focus-within:border-teal-500/50">
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about features, pricing, tools, research…"
                            disabled={loading}
                            className="flex-1 bg-transparent py-3 pl-3.5 text-sm text-white placeholder:text-slate-600 outline-none disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-teal-400 transition hover:bg-teal-500/20 disabled:opacity-40"
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
                    <p className="mt-1.5 text-center text-[10px] text-slate-600">
                        Answers sourced from Kunwar Analytics research · {PROVIDER_LABELS['huggingface-mistral']}
                    </p>
                </form>
            </div>
        </>
    );
}
