'use client';

// components/ai/ExplainThisWidget.tsx — Grounded AI Concept Tutor (Pillar B4)
//
// Allows readers on research, insights, and study pages to ask grounded questions
// about the content, valuation, or concepts. Consumes /api/ask.

import React, { useState } from 'react';
import { Sparkles, Send, BookOpen, AlertCircle, RefreshCw, ChevronRight } from 'lucide-react';

interface SourceCitation {
  title?: string;
  url?: string;
  quote?: string;
}

interface AskResponse {
  answer?: string;
  sources?: SourceCitation[];
  error?: string;
}

interface Props {
  contextTitle?: string;
  defaultQuestions?: string[];
  className?: string;
}

export default function ExplainThisWidget({
  contextTitle,
  defaultQuestions = [
    'Explain the valuation methodology',
    'What are the key risk factors?',
    'Summarize this analysis in simple terms',
  ],
  className = '',
}: Props) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AskResponse | null>(null);
  const [open, setOpen] = useState(false);

  const handleAsk = async (q: string) => {
    if (!q.trim() || loading) return;
    setLoading(true);
    setResponse(null);
    setOpen(true);
    try {
      const prompt = contextTitle ? `Regarding "${contextTitle}": ${q}` : q;
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: prompt }),
      });
      const data = await res.json();
      setResponse(data);
    } catch {
      setResponse({ error: 'Unable to reach Ask Kunwar. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 via-surface to-surface p-4 text-card-foreground shadow-sm transition-all sm:p-5 ${className}`}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Ask Kunwar · AI Concept Tutor
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Grounded, cited explanations across our platform
            </p>
          </div>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {defaultQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setQuestion(q);
              handleAsk(q);
            }}
            disabled={loading}
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-background/80 px-2.5 py-1 text-[11px] font-medium text-content-secondary transition-all hover:border-primary/40 hover:bg-accent hover:text-foreground disabled:opacity-50 text-left"
          >
            <span>💡</span>
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(question);
        }}
        className="mt-3 flex items-center gap-2"
      >
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about this research..."
          className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50 transition-all shrink-0"
          aria-label="Send question"
        >
          {loading ? (
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
        </button>
      </form>

      {/* Response Box */}
      {open && (
        <div className="mt-3.5 rounded-xl border border-border bg-background/90 p-3.5 text-xs text-foreground shadow-inner">
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground py-2">
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-primary" />
              <span>Analyzing grounded sources &amp; synthesizing explanation…</span>
            </div>
          )}

          {response?.error && (
            <div className="flex items-start gap-2 text-error py-1">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{response.error}</span>
            </div>
          )}

          {response?.answer && (
            <div className="space-y-2.5">
              <p className="leading-relaxed text-foreground whitespace-pre-wrap">
                {response.answer}
              </p>

              {response.sources && response.sources.length > 0 && (
                <div className="border-t border-border pt-2 mt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                    <BookOpen className="h-3 w-3" /> Cited Sources
                  </p>
                  <ul className="space-y-1">
                    {response.sources.map((src, i) => (
                      <li key={i} className="text-[11px] truncate">
                        {src.url ? (
                          <a
                            href={src.url}
                            className="text-primary hover:underline inline-flex items-center gap-0.5"
                          >
                            <ChevronRight className="h-2.5 w-2.5" />
                            {src.title || src.url}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">&bull; {src.title}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
