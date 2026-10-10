'use client';

// components/learning/SpacedRepetitionCard.tsx — Spaced Repetition Active Recall (Pillar E3)
//
// Interactive daily active-recall quiz widget for PGDM and financial analyst concepts.

import React, { useState } from 'react';
import { Brain, CheckCircle2, XCircle, ArrowRight, Award } from 'lucide-react';
import Link from 'next/link';

interface FlashConcept {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  courseHref: string;
}

const CONCEPTS: FlashConcept[] = [
  {
    id: 'fcf-1',
    topic: 'Valuation & Modeling',
    question: 'How does an increase in working capital affect Free Cash Flow to Firm (FCFF)?',
    options: [
      'It increases FCFF because current assets grew.',
      'It decreases FCFF because cash was tied up in operational assets.',
      'It has no impact since working capital is on the balance sheet.',
      'It only affects financing cash flow, not FCFF.',
    ],
    correctIndex: 1,
    explanation:
      'Investment in Working Capital represents cash tied up in receivables/inventory rather than generated for capital providers, reducing FCFF.',
    courseHref: '/study/course/financial-modeling-valuation',
  },
  {
    id: 'dupont-1',
    topic: 'Financial Statement Analysis',
    question: 'Under 3-step DuPont Analysis, Return on Equity (ROE) is decomposed into:',
    options: [
      'Net Margin × Asset Turnover × Financial Leverage',
      'Operating Margin × Inventory Turnover × Debt Ratio',
      'Gross Margin × Asset Turnover × Equity Multiplier',
      'EBITDA Margin × Return on Capital × Interest Coverage',
    ],
    correctIndex: 0,
    explanation:
      'ROE = (Net Income / Revenue) × (Revenue / Assets) × (Assets / Equity) = Net Profit Margin × Asset Turnover × Financial Leverage (Equity Multiplier).',
    courseHref: '/pgdm/financial-management',
  },
  {
    id: 'beta-1',
    topic: 'Risk & Portfolio Theory',
    question: 'If a stock has an un-levered beta of 1.2 and the firm takes on significant debt, what happens to its equity beta?',
    options: [
      'Equity beta remains constant at 1.2.',
      'Equity beta decreases because debt is cheaper than equity.',
      'Equity beta increases because debt magnifies financial risk to equity holders.',
      'Equity beta drops to zero due to tax shields.',
    ],
    correctIndex: 2,
    explanation:
      'Levered (Equity) Beta = Unlevered Beta × [1 + (1 - Tax Rate) × (Debt / Equity)]. Debt introduces financial risk, increasing volatility for equity holders.',
    courseHref: '/finance-terms/beta',
  },
  {
    id: 'wacc-1',
    topic: 'Corporate Finance',
    question: 'Why is the Cost of Debt typically adjusted by (1 - Tax Rate) in the WACC formula?',
    options: [
      'Because lenders pay interest taxes on our behalf.',
      'Because interest expense is tax-deductible, creating an interest tax shield.',
      'Because corporate tax rates reduce market interest rates.',
      'Because dividends are tax-exempt at the corporate level.',
    ],
    correctIndex: 1,
    explanation:
      'Interest payments on debt are tax-deductible expenses in India and globally, providing an effective cash tax savings (interest tax shield) that lowers the effective cost of debt.',
    courseHref: '/study/course/corporate-finance',
  },
];

export default function SpacedRepetitionCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const concept = CONCEPTS[currentIndex];
  const isCorrect = selectedOption === concept.correctIndex;

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelectedOption(idx);
    setAnswered(true);
    if (idx === concept.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setAnswered(false);
    setCurrentIndex((prev) => (prev + 1) % CONCEPTS.length);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-all sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Brain className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Spaced Repetition &middot; Daily Active Recall
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Review high-yield concepts to reinforce long-term mastery
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Award className="h-3 w-3" />
            {score} mastered
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            {currentIndex + 1}/{CONCEPTS.length}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <span className="inline-block rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {concept.topic}
        </span>
        <h4 className="mt-2 text-sm font-semibold text-foreground leading-relaxed">
          {concept.question}
        </h4>

        {/* Options */}
        <div className="mt-3.5 space-y-2">
          {concept.options.map((opt, i) => {
            let btnStyle =
              'border-border/80 bg-background/50 hover:bg-accent/40 text-foreground';
            if (answered) {
              if (i === concept.correctIndex) {
                btnStyle =
                  'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium';
              } else if (i === selectedOption) {
                btnStyle =
                  'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300';
              } else {
                btnStyle = 'opacity-50 border-border/40';
              }
            }

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`w-full rounded-xl border p-3 text-left text-xs transition-all flex items-start justify-between gap-3 ${btnStyle}`}
              >
                <span>{opt}</span>
                {answered && i === concept.correctIndex && (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                )}
                {answered && i === selectedOption && i !== concept.correctIndex && (
                  <XCircle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div
            className={`mt-4 rounded-xl border p-3 text-xs leading-relaxed ${
              isCorrect
                ? 'border-emerald-500/30 bg-emerald-500/5 text-foreground'
                : 'border-rose-500/30 bg-rose-500/5 text-foreground'
            }`}
          >
            <p className="font-semibold mb-1">
              {isCorrect ? '✅ Correct insight!' : '❌ Not quite.'}
            </p>
            <p className="text-muted-foreground">{concept.explanation}</p>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-2.5">
              <Link
                href={concept.courseHref}
                className="text-[11px] font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                Review related lecture &rarr;
              </Link>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
              >
                <span>Next concept</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
