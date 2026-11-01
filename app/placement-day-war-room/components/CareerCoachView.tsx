'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  provider?: string;
}

interface CareerCoachProps {
  candidateProfile?: {
    targetRole?: string;
    targetCompany?: string;
    qualification?: string;
    interviewDate?: string;
  } | null;
  onNavigateToTab?: (tab: string) => void;
}

const PROMPT_SUGGESTIONS = [
  'Walk through a DCF model and WACC build-up for an Indian company',
  'Trace a ₹10 Cr Depreciation expense across all 3 statements under Ind AS',
  'Explain DSCR and debt service covenants for Indian corporate credit underwriting',
  'How do I answer "Walk me through your resume" for an Investment Banking interview?',
  'Test me on DuPont 3-stage ROE decomposition and what drives ROE',
  'What are the common mistakes when transitioning from Equity Value to Enterprise Value?',
];

export default function CareerCoachView({ candidateProfile, onNavigateToTab }: CareerCoachProps) {
  const role = candidateProfile?.targetRole || 'Investment Banking';
  const company = candidateProfile?.targetCompany || 'Top Institutional Firm';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am your **AI Placement Career Coach**. I specialize in front-office finance placements across Investment Banking, Equity Research, Corporate Finance, and Credit Analysis.\n\nI am configured for your target role in **${role}** targeting **${company}**. You can ask me to:\n- Explain complex financial formulas and multi-statement flows step-by-step.\n- Test your conceptual grasp with follow-up interview grilling.\n- Review your answers against Indian regulatory standards (Ind AS, RBI, 10Y G-Sec).\n\nWhat would you like to master today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      provider: 'central-ai-gateway',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInput('');
    setIsLoading(true);

    try {
      const historyForApi = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/placement-war-room/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          history: historyForApi,
          context: {
            targetRole: role,
            targetCompany: company,
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'I could not generate a response. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        provider: data.provider || 'central-ai-gateway',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content:
          '⚠️ The AI Coach service encountered a network timeout. Please verify your connection or re-send your message.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0b101d] border border-neutral-800 rounded-lg flex flex-col h-[750px] font-sans text-neutral-200 shadow-2xl">
      {/* Top Header */}
      <div className="bg-[#0e1626] border-b border-neutral-800 p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-sm">
            AI
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                AI Career Coach & Finance Mentor
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                ONLINE
              </span>
            </div>
            <div className="text-xs text-neutral-400 font-mono mt-0.5">
              Personalized for: <strong className="text-white">{role}</strong> ({company})
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[11px] text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">
            Engine: Central AI Gateway (Gemini/Groq)
          </span>
          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab('diagnostic')}
              className="text-cyan-400 hover:text-cyan-300 underline text-xs"
            >
              Take Diagnostic &rarr;
            </button>
          )}
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-800">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 font-mono font-bold ${
                  isUser
                    ? 'bg-cyan-500 text-black'
                    : 'bg-neutral-800 border border-neutral-700 text-cyan-400'
                }`}
              >
                {isUser ? 'YOU' : 'AI'}
              </div>

              <div
                className={`max-w-[85%] rounded-lg p-3.5 text-xs leading-relaxed space-y-2 ${
                  isUser
                    ? 'bg-cyan-950/60 border border-cyan-800/80 text-cyan-50 font-sans'
                    : 'bg-[#0f172a] border border-neutral-800 text-neutral-200'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans text-xs">{m.content}</div>
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-1 border-t border-white/5">
                  <span>{m.timestamp}</span>
                  {m.provider && (
                    <span className="text-[9px] opacity-75">Verified Finance Coach</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold">
              AI
            </div>
            <div className="bg-[#0f172a] border border-neutral-800 rounded-lg p-3 text-xs text-neutral-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              Synthesizing financial mechanics & regulatory benchmarks...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Ribbon */}
      <div className="bg-[#0a0e18] border-t border-neutral-800/80 px-4 py-2.5 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider shrink-0">
            Suggested Prompts:
          </span>
          {PROMPT_SUGGESTIONS.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(suggestion)}
              disabled={isLoading}
              className="shrink-0 px-2.5 py-1 rounded bg-[#0e1626] border border-neutral-800 text-neutral-300 hover:text-cyan-400 hover:border-cyan-500/40 text-[11px] font-sans transition-colors disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-[#0e1626] border-t border-neutral-800 p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about financial statement flows, DCF valuation, WACC, or interview strategy...`}
            disabled={isLoading}
            className="flex-1 bg-[#080d1a] border border-neutral-800 rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-mono transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <span>Send</span>
            <span>&rarr;</span>
          </button>
        </form>
        <div className="text-[10px] text-neutral-400 font-mono mt-1 text-center">
          Educational guidance only. Never replaces independent financial calculation or company-specific hiring criteria.
        </div>
      </div>
    </div>
  );
}

