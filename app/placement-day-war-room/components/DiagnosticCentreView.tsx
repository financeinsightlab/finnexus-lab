'use client';

import React, { useState } from 'react';

interface DiagnosticQuestion {
  id: string;
  subject: string;
  subtopic: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  formula?: string;
  indianContext?: string;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag-acc-1',
    subject: 'Accounting',
    subtopic: 'Ind AS 116 Leases',
    difficulty: 'MEDIUM',
    question: 'Under Ind AS 116, how does a lessee recognize an operating lease on its Balance Sheet?',
    options: [
      'As an off-balance sheet operating expense disclosed only in footnotes',
      'As a Right-of-Use (ROU) Asset and a corresponding Lease Liability',
      'As an Intangible Asset with an offset against Retained Earnings',
      'Only as a current liability for the upcoming 12 months payments',
    ],
    correctIndex: 1,
    explanation: 'Ind AS 116 eliminates the operating vs finance lease distinction for lessees, requiring recognition of a Right-of-Use (ROU) Asset and Lease Liability measured at the present value of lease payments discounted at the incremental borrowing rate.',
    formula: 'Lease Liability = PV(Future Lease Payments discounted at IBR)',
    indianContext: 'Mandatory in India from FY20, resulting in elevated reported EBITDA and gross leverage for retail/airline companies.',
  },
  {
    id: 'diag-corp-1',
    subject: 'Corporate Finance',
    subtopic: 'WACC & Cost of Capital',
    difficulty: 'MEDIUM',
    question: 'When computing Cost of Equity for an Indian listed company via CAPM, what benchmark should be used as the Risk-Free Rate (Rf)?',
    options: [
      'US 10-Year Treasury Yield (~4.28%)',
      'RBI 91-Day Treasury Bill Yield (~6.50%)',
      'Indian 10-Year Benchmark Government Securities (G-Sec) Yield (~6.84%)',
      'State Development Loan (SDL) 5-Year Yield',
    ],
    correctIndex: 2,
    explanation: 'The risk-free rate must match the currency and investment horizon of the cash flows. For Indian rupee cash flows over a 5-10 year projection, the 10-Year Indian Benchmark G-Sec yield is the standard institutional benchmark.',
    formula: 'Ke = Rf + Beta × (Rm - Rf) + Country Risk Premium',
    indianContext: 'Indian 10Y G-Sec currently trades near 6.84%, reflecting stable domestic inflation expectations.',
  },
  {
    id: 'diag-val-1',
    subject: 'Valuation',
    subtopic: 'DCF Terminal Value',
    difficulty: 'HARD',
    question: 'In a DCF Gordon Growth Terminal Value calculation for an Indian firm, why can the perpetual growth rate (g) NOT exceed the long-term nominal GDP growth rate of India (~6-7%)?',
    options: [
      'SEBI regulations impose a statutory ceiling of 5% on DCF models',
      'A perpetual growth rate exceeding GDP implies the company would eventually become larger than the entire national economy',
      'Beta becomes negative when growth exceeds long-term inflation',
      'Ind AS prohibits perpetual growth models when discounting cash flows',
    ],
    correctIndex: 1,
    explanation: 'Mathematically, if a firm grows faster than the overall economy forever, it would asymptotically become larger than the economy itself. Institutional valuation standards typically anchor Indian terminal growth rates between 4.0% and 5.5%.',
    formula: 'Terminal Value = UFCF_{n+1} / (WACC - g)',
  },
  {
    id: 'diag-mod-1',
    subject: 'Financial Modelling',
    subtopic: 'Three-Statement Flow',
    difficulty: 'MEDIUM',
    question: 'A company records ₹20 Cr of additional Depreciation expense. Assuming a corporate tax rate of 25%, what is the net effect on the end-of-year Cash balance?',
    options: [
      'Cash decreases by ₹20 Cr',
      'Cash decreases by ₹15 Cr',
      'Cash increases by ₹5 Cr (tax shield effect)',
      'Cash remains unchanged because Depreciation is a non-cash expense',
    ],
    correctIndex: 2,
    explanation: 'Operating profit falls by ₹20 Cr, reducing taxes by ₹5 Cr (25% × ₹20 Cr). Net Income falls by ₹15 Cr. On the Cash Flow Statement, Depreciation is added back (+₹20 Cr). Net Cash Flow from Operations increases by +₹5 Cr (the tax shield).',
    formula: 'Cash Impact = Depreciation × Tax Rate = ₹20 Cr × 25% = +₹5 Cr',
  },
  {
    id: 'diag-cred-1',
    subject: 'Banking & Credit',
    subtopic: 'Debt Service Coverage (DSCR)',
    difficulty: 'HARD',
    question: 'What is the standard formula for Debt Service Coverage Ratio (DSCR) evaluated by Indian commercial banks for project financing loans?',
    options: [
      'Total Debt / EBITDA',
      '(PAT + Depreciation + Interest on Term Debt) / (Principal Repayment + Interest on Term Debt)',
      'Operating Cash Flow / Current Liabilities',
      'EBIT / Annual Interest Expense',
    ],
    correctIndex: 1,
    explanation: 'DSCR measures cash availability to service annual debt commitments. Indian lenders typically mandate an average DSCR of 1.50x - 1.75x across the loan tenure for infrastructure and capex debt.',
    formula: 'DSCR = (PAT + Depr + Int) / (Principal Due + Int Due)',
  },
  {
    id: 'diag-anl-1',
    subject: 'Business Analytics',
    subtopic: 'DuPont Analysis',
    difficulty: 'EASY',
    question: 'Which of the following correctly breaks down Return on Equity (ROE) under the 3-stage DuPont model?',
    options: [
      'Gross Margin × Operating Margin × Asset Turnover',
      'Net Profit Margin × Asset Turnover × Financial Leverage Multiplier (Assets / Equity)',
      'EBITDA Margin × Debt-to-Equity × ROCE',
      'P/E Ratio × P/B Ratio × Dividend Yield',
    ],
    correctIndex: 1,
    explanation: 'ROE = (Net Income / Revenue) × (Revenue / Total Assets) × (Total Assets / Shareholders Equity). This separates profitability, asset efficiency, and financial leverage.',
    formula: 'ROE = Net Margin × Asset Turnover × Equity Multiplier',
  },
];

export default function DiagnosticCentreView() {
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [timedMode, setTimedMode] = useState(true);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const filteredQuestions = selectedSubject === 'ALL'
    ? DIAGNOSTIC_QUESTIONS
    : DIAGNOSTIC_QUESTIONS.filter((q) => q.subject.toLowerCase() === selectedSubject.toLowerCase());

  const currentQ = filteredQuestions[activeQuestionIdx] || filteredQuestions[0];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [activeQuestionIdx]: optIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    filteredQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / filteredQuestions.length) * 100);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setActiveQuestionIdx(0);
    setShowExplanation(false);
  };

  return (
    <div className="space-y-6 font-sans text-neutral-200">
      {/* Header Bar */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Institutional Finance Diagnostic Centre
            </h2>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Evaluate technical finance depth across Accounting, Valuation, Models, Credit, and Analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              handleReset();
            }}
            className="bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="ALL">All 7 Disciplines</option>
            <option value="Accounting">Accounting & Ind AS</option>
            <option value="Corporate Finance">Corporate Finance & WACC</option>
            <option value="Valuation">Valuation & DCF</option>
            <option value="Financial Modelling">Financial Modelling</option>
            <option value="Banking & Credit">Banking & Credit (DSCR)</option>
            <option value="Business Analytics">Business Analytics & DuPont</option>
          </select>

          <button
            onClick={() => setTimedMode(!timedMode)}
            className={`px-2.5 py-1.5 rounded text-xs font-mono border transition-colors ${
              timedMode ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' : 'bg-neutral-900 text-neutral-400 border-neutral-800'
            }`}
          >
            {timedMode ? '⏱️ Timed (3m/q)' : 'Untimed Practice'}
          </button>
        </div>
      </div>

      {/* Main Diagnostic Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Active Question Card (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-cyan-400 rounded font-semibold">
                  {currentQ.subject}
                </span>
                <span className="text-neutral-400">&gt; {currentQ.subtopic}</span>
              </div>
              <div className="text-xs font-mono text-neutral-400">
                Question <strong className="text-white">{activeQuestionIdx + 1}</strong> of {filteredQuestions.length}
              </div>
            </div>

            {/* Prompt */}
            <h3 className="text-base font-bold text-white leading-relaxed font-sans">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((option, optIdx) => {
                const isChosen = selectedAnswers[activeQuestionIdx] === optIdx;
                const isCorrect = currentQ.correctIndex === optIdx;

                let btnClass = 'bg-[#080d1a] border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/40';
                if (isChosen) {
                  btnClass = 'bg-cyan-950/60 border-cyan-500 text-cyan-200 font-semibold';
                }
                if (isSubmitted) {
                  if (isCorrect) {
                    btnClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isChosen && !isCorrect) {
                    btnClass = 'bg-rose-950/60 border-rose-500 text-rose-200 font-bold';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start gap-3 ${btnClass}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0 font-mono text-[11px] font-bold">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 font-sans">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Step-by-Step Explanation if submitted */}
            {isSubmitted && (
              <div className="bg-[#091122] border border-cyan-500/40 rounded-lg p-4 space-y-2 text-xs font-sans">
                <div className="flex items-center gap-2 font-mono font-bold text-cyan-400">
                  <span>💡 Institutional Explanation & Formula Derivation</span>
                </div>
                <p className="text-neutral-300 leading-relaxed">{currentQ.explanation}</p>
                {currentQ.formula && (
                  <div className="p-2 bg-neutral-900 border border-neutral-800 rounded font-mono text-cyan-300 text-[11px]">
                    Formula: {currentQ.formula}
                  </div>
                )}
                {currentQ.indianContext && (
                  <div className="text-[11px] text-amber-300 font-mono">
                    Indian Context: {currentQ.indianContext}
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-800 text-xs font-mono">
              <button
                onClick={() => setActiveQuestionIdx((p) => Math.max(0, p - 1))}
                disabled={activeQuestionIdx === 0}
                className="px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white disabled:opacity-40"
              >
                &larr; Previous
              </button>

              <div className="flex items-center gap-2">
                {!isSubmitted ? (
                  <button
                    onClick={() => setIsSubmitted(true)}
                    disabled={Object.keys(selectedAnswers).length === 0}
                    className="px-4 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-colors disabled:opacity-50"
                  >
                    Submit Assessment
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="px-4 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-white font-bold transition-colors"
                  >
                    Retake Test
                  </button>
                )}

                <button
                  onClick={() => setActiveQuestionIdx((p) => Math.min(filteredQuestions.length - 1, p + 1))}
                  disabled={activeQuestionIdx === filteredQuestions.length - 1}
                  className="px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white disabled:opacity-40"
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Scorecard & Subject Radar (1 Col) */}
        <div className="space-y-4">
          <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-cyan-300 font-mono border-b border-neutral-800 pb-2">
              Diagnostic Assessment Scorecard
            </h4>

            {isSubmitted ? (
              <div className="text-center py-2 space-y-2">
                <div className="text-4xl font-extrabold text-white font-mono">
                  {calculateScore()}%
                </div>
                <div className="text-xs text-emerald-400 font-mono font-bold">
                  {calculateScore() >= 80 ? 'EXCEPTIONAL MASTERY' : calculateScore() >= 60 ? 'SOLID FOUNDATION' : 'NEEDS REVISION'}
                </div>
                <p className="text-[11px] text-neutral-400 font-sans">
                  Answered {Object.values(selectedAnswers).filter((ans, idx) => ans === filteredQuestions[idx]?.correctIndex).length} of {filteredQuestions.length} correctly.
                </p>
              </div>
            ) : (
              <div className="text-center py-4 text-xs text-neutral-400 font-mono">
                Select answers and click &quot;Submit Assessment&quot; to calculate your technical finance score.
              </div>
            )}

            {/* Question Quick Jump Map */}
            <div className="pt-2 border-t border-neutral-800">
              <div className="text-[11px] font-mono text-neutral-400 mb-2">Question Navigator</div>
              <div className="grid grid-cols-6 gap-1.5">
                {filteredQuestions.map((_, idx) => {
                  const isAnswered = selectedAnswers[idx] !== undefined;
                  const isCurrent = activeQuestionIdx === idx;
                  const isCorrect = isSubmitted && selectedAnswers[idx] === filteredQuestions[idx].correctIndex;
                  const isWrong = isSubmitted && selectedAnswers[idx] !== undefined && !isCorrect;

                  let badgeColor = 'bg-neutral-900 border-neutral-800 text-neutral-400';
                  if (isCurrent) badgeColor = 'border-cyan-400 text-cyan-300 bg-cyan-950/60 font-bold';
                  else if (isCorrect) badgeColor = 'bg-emerald-950 border-emerald-500 text-emerald-300';
                  else if (isWrong) badgeColor = 'bg-rose-950 border-rose-500 text-rose-300';
                  else if (isAnswered) badgeColor = 'bg-neutral-800 text-neutral-200';

                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveQuestionIdx(idx)}
                      className={`h-7 rounded border font-mono text-xs flex items-center justify-center transition-all ${badgeColor}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

