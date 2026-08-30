'use client';

import { useState } from 'react';

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export default function Quiz({ questions, subjectName }: { questions: QuizQuestion[]; subjectName: string }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const answered = Object.keys(picked).length;
  const score = questions.reduce((n, q, i) => n + (picked[i] === q.answer ? 1 : 0), 0);
  const done = answered === questions.length;

  const optCls = (qi: number, oi: number) => {
    const p = picked[qi];
    if (p === undefined) return 'border-white/10 bg-white/5 hover:border-teal-500/40 hover:bg-teal-500/[0.06] text-gray-300';
    if (oi === questions[qi].answer) return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200';
    if (p === oi) return 'border-rose-500/40 bg-rose-500/10 text-rose-200';
    return 'border-white/5 bg-white/[0.02] text-gray-500';
  };

  return (
    <section id="quiz" className="rounded-2xl border border-white/8 bg-cinema-charcoal/60 p-5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-violet-300 mb-1">
            {subjectName} · Quick Test
          </p>
          <h2 className="text-xl font-extrabold text-white">10-question MCQ bank</h2>
          <p className="text-xs text-gray-500 mt-1">
            Pick an option — instant feedback with the reasoning. No login, no marks saved.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-2xl font-mono font-extrabold text-white">
              {score}<span className="text-gray-500 text-lg">/{questions.length}</span>
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              {done ? (score >= 8 ? 'Distinction' : score >= 6 ? 'Pass' : 'Revise') : `${answered} answered`}
            </p>
          </div>
          {answered > 0 && (
            <button
              onClick={() => setPicked({})}
              className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-white/10 rounded-full px-3 py-1.5 hover:border-violet-500/40 hover:text-violet-300 transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {questions.map((q, qi) => (
          <div key={qi} className="rounded-xl border border-white/8 bg-cinema-graphite/60 p-4">
            <p className="text-sm font-semibold text-white mb-3">
              <span className="text-violet-300 font-mono mr-2">Q{qi + 1}.</span>
              {q.q}
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {q.options.map((o, oi) => (
                <button
                  key={oi}
                  disabled={picked[qi] !== undefined}
                  onClick={() => setPicked((s) => ({ ...s, [qi]: oi }))}
                  className={`text-left text-[13px] rounded-lg border px-3 py-2 transition-colors ${optCls(qi, oi)}`}
                >
                  <span className="font-mono text-[10px] text-gray-500 mr-2">{String.fromCharCode(65 + oi)}</span>
                  {o}
                </button>
              ))}
            </div>
            {picked[qi] !== undefined && (
              <p className={`mt-3 text-[12px] leading-relaxed rounded-lg px-3 py-2 border ${
                picked[qi] === q.answer
                  ? 'bg-emerald-500/[0.07] border-emerald-500/20 text-emerald-200/90'
                  : 'bg-amber-500/[0.07] border-amber-500/20 text-amber-200/90'
              }`}>
                {picked[qi] === q.answer ? 'Correct — ' : 'Not quite — '}
                {q.explain}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
