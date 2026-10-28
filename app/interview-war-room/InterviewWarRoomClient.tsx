'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  type InterviewQuestion,
  type InterviewRole,
  type QuestionType,
  type GradedAnswer,
  ROLE_LABELS,
  ROLE_COMPANIES,
} from '@/lib/interview-engine';

interface Props {
  initialQuestions: InterviewQuestion[];
  userPlan: string;
  isPaid: boolean;
}

export default function InterviewWarRoomClient({ initialQuestions, userPlan, isPaid }: Props) {
  const [selectedRole, setSelectedRole] = useState<InterviewRole>('INVESTMENT_BANKING');
  const [selectedCompany, setSelectedCompany] = useState<string>('Goldman Sachs India');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [gradedResult, setGradedResult] = useState<GradedAnswer | null>(null);
  const [sessionGradedHistory, setSessionGradedHistory] = useState<Array<{ q: InterviewQuestion; g: GradedAnswer }>>([]);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [stressMode, setStressMode] = useState(false);
  const [evaluationCount, setEvaluationCount] = useState(0);
  const [showPaywallModal, setShowPaywallModal] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Filter questions according to current selections
  const filteredQuestions = initialQuestions.filter((q) => {
    const roleMatch = q.role.includes(selectedRole);
    const typeMatch = selectedType === 'ALL' || q.type === selectedType;
    return roleMatch && typeMatch;
  });

  const currentQuestion: InterviewQuestion | undefined =
    filteredQuestions[activeQuestionIndex] ?? filteredQuestions[0];

  // Update company options when role changes
  useEffect(() => {
    const companies = ROLE_COMPANIES[selectedRole] || [];
    if (companies.length > 0 && !companies.includes(selectedCompany)) {
      setSelectedCompany(companies[0]);
    }
    setActiveQuestionIndex(0);
    setUserAnswer('');
    setGradedResult(null);
    setShowHint(false);
    setTimerSeconds(0);
    setTimerActive(true);
  }, [selectedRole]);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    if (activeQuestionIndex < filteredQuestions.length - 1) {
      setActiveQuestionIndex((prev) => prev + 1);
    } else {
      setActiveQuestionIndex(0);
    }
    setUserAnswer('');
    setGradedResult(null);
    setShowHint(false);
    setTimerSeconds(0);
    setTimerActive(true);
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || userAnswer.trim().length < 5) return;

    // Check free tier limit (2 questions max per session)
    if (!isPaid && evaluationCount >= 2) {
      setShowPaywallModal(true);
      return;
    }

    setIsGrading(true);
    setTimerActive(false);

    try {
      const res = await fetch('/api/interview/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          userAnswer,
          timeSpentSeconds: timerSeconds,
          role: selectedRole,
        }),
      });

      if (!res.ok) {
        throw new Error('Grading request failed');
      }

      const data = await res.json();
      if (data.graded) {
        setGradedResult(data.graded);
        setSessionGradedHistory((prev) => [...prev, { q: currentQuestion, g: data.graded }]);
        setEvaluationCount((c) => c + 1);
      }
    } catch (err) {
      console.error(err);
      // Fallback local grade
      const fallback: GradedAnswer = {
        questionId: currentQuestion.id,
        score: Math.min(10, Math.max(4, Math.round(userAnswer.length / 50))),
        grade: 'GOOD',
        feedback: 'Good attempt. Consider adding more Indian regulatory nuances like 10Y G-Sec yield and Ind AS disclosures.',
        betterAnswer: currentQuestion.keyPoints.slice(0, 4).join('. ') + '.',
        missedPoints: currentQuestion.commonMistakes.slice(0, 2),
        strengths: ['Addressed the main question prompt', 'Structured thinking demonstrated'],
      };
      setGradedResult(fallback);
      setSessionGradedHistory((prev) => [...prev, { q: currentQuestion, g: fallback }]);
      setEvaluationCount((c) => c + 1);
    } finally {
      setIsGrading(false);
    }
  };

  const calculateAverageScore = () => {
    if (sessionGradedHistory.length === 0) return 0;
    const total = sessionGradedHistory.reduce((acc, curr) => acc + curr.g.score, 0);
    return Math.round((total / sessionGradedHistory.length) * 10) / 10;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-brand/30 pb-24">
      {/* Top Banner & Breadcrumb */}
      <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              War Room Active
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-slate-300">
              India Regulatory & BFSI Interview Engine (Ind AS · SEBI · RBI)
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-xs text-slate-400">
              Your Plan:{' '}
              <span
                className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                  isPaid ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {userPlan}
              </span>
            </div>
            {!isPaid && (
              <Link
                href="/checkout/pro"
                className="text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 px-3 py-1.5 rounded-lg shadow-sm transition"
              >
                Upgrade to Pro (₹999/mo)
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header Hero */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-medium mb-3">
              <span>⚡ India’s First AI Finance Interview Simulator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Finance Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">War Room</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Get grilled on real questions asked at Goldman Sachs India, Avendus, Kotak IB, KKR India, and Big 4 TAS.
              Get instantaneous AI scoring, missed nuance detection, and VP-level model answers.
            </p>
          </div>

          {/* Performance Summary Pill */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-6 shrink-0 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-black text-amber-400">
                {calculateAverageScore() > 0 ? `${calculateAverageScore()}/10` : '—'}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Avg Score</div>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div className="text-center">
              <div className="text-2xl font-black text-white">{sessionGradedHistory.length}</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Answered</div>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-400">
                {!isPaid ? `${Math.max(0, 2 - evaluationCount)} left` : '∞ Unltd'}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Free Runs</div>
            </div>
          </div>
        </div>

        {/* Control Bar: Role, Company & Category Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {/* Role Dropdown */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
            <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
              Target Finance Track
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as InterviewRole)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition font-medium"
            >
              {Object.entries(ROLE_LABELS).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Company Context */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
            <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
              Target Firm Simulation
            </label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition font-medium"
            >
              {(ROLE_COMPANIES[selectedRole] || []).map((firm) => (
                <option key={firm} value={firm}>
                  {firm}
                </option>
              ))}
            </select>
          </div>

          {/* Question Type Filter */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
            <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
              Question Category
            </label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setActiveQuestionIndex(0);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition font-medium"
            >
              <option value="ALL">All Categories ({initialQuestions.filter(q => q.role.includes(selectedRole)).length})</option>
              <option value="TECHNICAL">Technical & DCF Valuation</option>
              <option value="CASE">M&A & LBO Deal Cases</option>
              <option value="CURRENT_AFFAIRS">RBI, SEBI & Macro Policy</option>
              <option value="GUESSTIMATE">Market Sizing & Guesstimates</option>
              <option value="BEHAVIORAL">IIM Placement Behavioral</option>
            </select>
          </div>
        </div>

        {/* Main Split Layout: Question & Answer Workspace vs Instant Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 Cols): Question Prompt + User Response */}
          <div className="lg:col-span-7 space-y-6">
            {currentQuestion ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                {/* Background decorative glow */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Question Metadata Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                      Q {activeQuestionIndex + 1} of {filteredQuestions.length}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                        currentQuestion.difficulty === 'KILLER'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : currentQuestion.difficulty === 'HARD'
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {currentQuestion.difficulty}
                    </span>
                    <span className="text-xs text-slate-400">
                      Target: <strong className="text-slate-200">{selectedCompany}</strong>
                    </span>
                  </div>

                  {/* Timer & Controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                      <svg className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="currentColor" strokeDasharray="30 60" />
                      </svg>
                      <span>{formatTimer(timerSeconds)}</span>
                    </div>

                    <button
                      onClick={() => setStressMode(!stressMode)}
                      title="Stress Mode simulates rapid-fire interruption"
                      className={`text-xs px-2.5 py-1 rounded-lg border transition flex items-center gap-1 font-semibold ${
                        stressMode
                          ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>🔥</span> {stressMode ? 'Stress On' : 'Stress Mode'}
                    </button>
                  </div>
                </div>

                {/* The Question Prompt */}
                <div className="py-5">
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    {currentQuestion.question}
                  </h2>

                  {/* Indian Regulatory Context Pill */}
                  {currentQuestion.indianContext && (
                    <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-amber-500/20 flex items-start gap-3">
                      <span className="text-lg">🇮🇳</span>
                      <div className="text-xs text-amber-200/90 leading-relaxed">
                        <strong className="text-amber-400 font-semibold">India Context:</strong>{' '}
                        {currentQuestion.indianContext}
                      </div>
                    </div>
                  )}

                  {/* Hint Toggle */}
                  {currentQuestion.hint && (
                    <div className="mt-3">
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1.5 transition"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{showHint ? 'Hide Interviewer Hint' : 'Show Interviewer Hint'}</span>
                      </button>
                      {showHint && (
                        <p className="mt-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 italic">
                          💡 {currentQuestion.hint}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* User Answer Textarea */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Deliver your response (type your structured answer):</span>
                    <span>{userAnswer.trim().split(/\s+/).filter(Boolean).length} words</span>
                  </div>

                  <textarea
                    ref={textareaRef}
                    rows={7}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Walk the interviewer through your logic step by step... (e.g., 'First, I would project Unlevered Free Cash Flow for 5 years using EBITDA minus Capex, changes in Working Capital, and taxes...')"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition font-mono leading-relaxed"
                  />

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setUserAnswer('')}
                        disabled={!userAnswer}
                        className="text-xs text-slate-500 hover:text-slate-300 px-3 py-1.5 transition disabled:opacity-40"
                      >
                        Clear
                      </button>
                      <button
                        onClick={handleNextQuestion}
                        className="text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-1.5 rounded-lg transition"
                      >
                        Skip / Next Q →
                      </button>
                    </div>

                    <button
                      onClick={handleSubmitAnswer}
                      disabled={isGrading || userAnswer.trim().length < 5}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-slate-950 font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-amber-500/10 transition transform active:scale-95 text-sm"
                    >
                      {isGrading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          <span>Grading with AI...</span>
                        </>
                      ) : (
                        <>
                          <span>⚡ Submit to AI MD</span>
                          <span className="text-[11px] font-mono opacity-70">(Ctrl+Enter)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
                <p className="text-slate-400">No questions match the current filter.</p>
                <button
                  onClick={() => setSelectedType('ALL')}
                  className="mt-4 px-4 py-2 bg-amber-500 text-slate-950 font-semibold rounded-lg text-xs"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>

          {/* Right Column (5 Cols): AI Grading & Feedback Card */}
          <div className="lg:col-span-5 space-y-6">
            {gradedResult ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative animate-fadeIn">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-300">AI MD Evaluation</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                      Completed in {formatTimer(timerSeconds)}
                    </span>
                  </div>
                  <div
                    className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                      gradedResult.grade === 'EXCELLENT'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : gradedResult.grade === 'GOOD'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {gradedResult.grade}
                  </div>
                </div>

                {/* Score Big Meter */}
                <div className="my-5 flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                  <div>
                    <div className="text-3xl font-black text-white">
                      {gradedResult.score} <span className="text-lg text-slate-500 font-normal">/ 10</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Placement Readiness Score
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-slate-300">
                      {gradedResult.score >= 8
                        ? '🟢 Offer Recommended'
                        : gradedResult.score >= 6
                        ? '🟡 Next Round Candidate'
                        : '🔴 Needs Serious Polish'}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Graded vs IIM / Bulge Bracket standard
                    </div>
                  </div>
                </div>

                {/* Feedback Text */}
                <div className="space-y-4 text-xs">
                  <div>
                    <h4 className="font-semibold text-slate-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <span>🎯</span> Interviewer Verdict
                    </h4>
                    <p className="text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                      {gradedResult.feedback}
                    </p>
                  </div>

                  {/* Strengths */}
                  {gradedResult.strengths.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span>✅</span> What You Got Right
                      </h4>
                      <ul className="space-y-1.5">
                        {gradedResult.strengths.map((str, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-300">
                            <span className="text-emerald-400 mt-0.5">•</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Missed Nuances */}
                  {gradedResult.missedPoints.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-rose-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span>⚠️</span> Points You Omitted
                      </h4>
                      <ul className="space-y-1.5">
                        {gradedResult.missedPoints.map((mp, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-300">
                            <span className="text-rose-400 mt-0.5">•</span>
                            <span>{mp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Ideal VP-Grade Model Answer */}
                  <div>
                    <h4 className="font-semibold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <span>🏆</span> Benchmark Model Answer
                    </h4>
                    <div className="bg-amber-950/20 border border-amber-500/20 p-3.5 rounded-xl text-amber-100/90 leading-relaxed font-mono text-[11px]">
                      {gradedResult.betterAnswer}
                    </div>
                  </div>
                </div>

                {/* CTA to next */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      setGradedResult(null);
                      setUserAnswer('');
                      setTimerSeconds(0);
                      setTimerActive(true);
                    }}
                    className="text-xs text-slate-400 hover:text-white transition"
                  >
                    ↺ Re-answer this Q
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition"
                  >
                    Proceed to Next Question →
                  </button>
                </div>
              </div>
            ) : (
              /* Idle state card */
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-xl text-amber-400">
                  🎯
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Live AI Grading Panel</h3>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    Type your answer in the workspace and click <strong>Submit to AI MD</strong>.
                    Our AI parses technical accuracy, Indian regulatory compliance, and interview conciseness.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-left space-y-2 text-xs text-slate-400">
                  <div className="font-semibold text-slate-300">How you will be evaluated:</div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">1.</span>
                    <span>WACC, DCF & 3-Statement financial rigor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">2.</span>
                    <span>Indian standards (Ind AS 116, RBI repo rate, SEBI LODR)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">3.</span>
                    <span>Executive poise & structured communication</span>
                  </div>
                </div>

                {!isPaid && (
                  <div className="pt-2">
                    <Link
                      href="/pricing"
                      className="block w-full py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold transition"
                    >
                      Compare Pro vs Free Features
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Questions Bank Quick Nav */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 mb-2 border-b border-slate-800">
                <span className="font-semibold text-slate-300 uppercase tracking-wider">
                  Session Queue ({filteredQuestions.length})
                </span>
                <span>Role: {ROLE_LABELS[selectedRole]}</span>
              </div>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {filteredQuestions.map((q, idx) => {
                  const isCurrent = idx === activeQuestionIndex;
                  const isAnswered = sessionGradedHistory.some((item) => item.q.id === q.id);
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setActiveQuestionIndex(idx);
                        setUserAnswer('');
                        setGradedResult(null);
                        setTimerSeconds(0);
                        setTimerActive(true);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between gap-2 transition ${
                        isCurrent
                          ? 'bg-amber-500/15 border border-amber-500/40 text-amber-200'
                          : 'bg-slate-950/60 hover:bg-slate-800 text-slate-400'
                      }`}
                    >
                      <span className="truncate">
                        {idx + 1}. {q.question}
                      </span>
                      {isAnswered && (
                        <span className="text-emerald-400 shrink-0 text-[10px] font-bold">✓ DONE</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Paywall Modal for Free Users after 2 questions */}
      {showPaywallModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center mx-auto text-2xl shadow-lg shadow-amber-500/20 text-slate-950 font-black mb-4">
              👑
            </div>

            <h3 className="text-2xl font-bold text-white">Unlock Unlimited War Room Access</h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              You’ve used your 2 free AI mock interview evaluations for this session. Upgrade to{' '}
              <strong className="text-amber-400">Kunwar Analytics Pro (₹999/month)</strong> to unlock:
            </p>

            <div className="my-6 text-left space-y-2.5 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Unlimited AI Interview evaluations across all 7 Indian finance tracks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Company-specific question sets (Goldman Sachs India, Avendus, Kotak IB)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Full access to Indian Company Intelligence & AI DCF Studio (Product 1)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>IIM / B-school Mock Placement Day 6-round simulation</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/checkout/pro"
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg transition text-center"
              >
                Upgrade to Pro — ₹999/mo (Instant UPI)
              </Link>
              <button
                onClick={() => setShowPaywallModal(false)}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              >
                Close & Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
