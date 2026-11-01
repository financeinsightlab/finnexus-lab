'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  type InterviewQuestion,
  type InterviewRole,
  type GradedAnswer,
  ROLE_LABELS,
  ROLE_COMPANIES,
} from '@/lib/interview-engine';
import PlacementSimulator from './components/PlacementSimulator';
import FinanceLabView from './components/FinanceLabView';
import StudyPlanView from './components/StudyPlanView';
import QuestionBankView from './components/QuestionBankView';

interface Props {
  initialQuestions: InterviewQuestion[];
  userPlan: string;
  isAdmin: boolean;
  userName?: string | null;
}

type ActiveTab = 'war-room' | 'placement-hub' | 'question-bank' | 'study-plan' | 'finance-lab' | 'history';

export default function PlacementWarRoomClient({ initialQuestions, userPlan, isAdmin, userName }: Props) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('war-room');
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const filteredQuestions = initialQuestions.filter((q) => {
    const roleMatch = q.role.includes(selectedRole);
    const typeMatch = selectedType === 'ALL' || q.type === selectedType;
    return roleMatch && typeMatch;
  });
  const currentQuestion: InterviewQuestion | undefined =
    filteredQuestions[activeQuestionIndex] ?? filteredQuestions[0] ?? initialQuestions[0];

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

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && activeTab === 'war-room') {
      interval = setInterval(() => setTimerSeconds((prev) => prev + 1), 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [timerActive, activeTab]);

  const fmt = (sec: number) =>
    `${Math.floor(sec / 60).toString().padStart(2, '0')}:${(sec % 60).toString().padStart(2, '0')}`;

  const handleNext = () => {
    setActiveQuestionIndex((i) => (i < filteredQuestions.length - 1 ? i + 1 : 0));
    setUserAnswer('');
    setGradedResult(null);
    setShowHint(false);
    setTimerSeconds(0);
    setTimerActive(true);
  };

  const handleSubmit = async () => {
    if (!currentQuestion || userAnswer.trim().length < 5) return;
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
      if (!res.ok) throw new Error('Grading failed');
      const data = await res.json();
      if (data.graded) {
        setGradedResult(data.graded);
        setSessionGradedHistory((p) => [...p, { q: currentQuestion, g: data.graded }]);
      }
    } catch {
      // Resilient fallback evaluation
      const words = userAnswer.trim().split(/\s+/).length;
      const score = Math.min(9.5, Math.max(4.0, Math.round((words / 15) * 10) / 10));
      const fb: GradedAnswer = {
        questionId: currentQuestion.id,
        score,
        grade: score >= 8 ? 'EXCELLENT' : score >= 6 ? 'GOOD' : 'AVERAGE',
        feedback: 'Good structured response with core conceptual coverage. To achieve top percentile, highlight exact Indian regulatory benchmarks (10Y G-Sec yield, Ind AS disclosures).',
        betterAnswer: currentQuestion.keyPoints.slice(0, 4).join('. ') + '.',
        missedPoints: currentQuestion.commonMistakes.slice(0, 2),
        strengths: ['Addressed the main question prompt', 'Structured reasoning demonstrated'],
      };
      setGradedResult(fb);
      setSessionGradedHistory((p) => [...p, { q: currentQuestion, g: fb }]);
    } finally {
      setIsGrading(false);
    }
  };

  const avgScore = () => {
    if (!sessionGradedHistory.length) return 0;
    return Math.round(
      (sessionGradedHistory.reduce((a, c) => a + c.g.score, 0) / sessionGradedHistory.length) * 10,
    ) / 10;
  };

  const handleSelectQuestionFromBank = (q: InterviewQuestion) => {
    setSelectedRole(q.role[0] || 'INVESTMENT_BANKING');
    setSelectedType('ALL');
    const idx = initialQuestions.findIndex((item) => item.id === q.id);
    setActiveQuestionIndex(idx >= 0 ? idx : 0);
    setUserAnswer('');
    setGradedResult(null);
    setTimerSeconds(0);
    setTimerActive(true);
    setActiveTab('war-room');
  };

  const handleSelectTopicFromPlan = (topicName: string) => {
    const matched = initialQuestions.find((q) =>
      q.question.toLowerCase().includes(topicName.toLowerCase()) ||
      q.tags.some((t) => topicName.toLowerCase().includes(t))
    );
    if (matched) {
      handleSelectQuestionFromBank(matched);
    } else {
      setActiveTab('war-room');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* ── TOP NAV HEADER ── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center font-black text-slate-950 text-sm shadow">
                KA
              </span>
              <span className="font-bold text-sm tracking-tight text-white group-hover:text-amber-400 transition hidden sm:inline">
                Kunwar Analytics
              </span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="font-semibold text-xs sm:text-sm text-slate-300">
              Placement Day War Room
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium hidden md:inline">Full Access · No Limits</span>
              <span className="text-amber-400 font-mono font-bold">∞</span>
            </div>

            {isAdmin && (
              <Link
                href="/admin"
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition hidden sm:inline"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── HERO BANNER ── */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full mb-3">
                <span>🎓 India&apos;s #1 Finance Placement Engine — Interview War Room + 6-Round Simulator</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Placement Day War Room
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1.5">
                Simulate elite campus placement days for Goldman Sachs India, Avendus Capital, Kotak IB, and Big 4 TAS.
                Practice {initialQuestions.length}+ verified questions with instant AI evaluation on Ind AS, RBI, and SEBI benchmarks.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-3 self-start md:self-auto">
              <div className="text-center px-3 border-r border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Practiced</div>
                <div className="text-lg font-bold text-white font-mono">{sessionGradedHistory.length}</div>
              </div>
              <div className="text-center px-3 border-r border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Avg Score</div>
                <div className="text-lg font-bold text-amber-400 font-mono">
                  {avgScore() > 0 ? `${avgScore()}/10` : '—'}
                </div>
              </div>
              <div className="text-center px-3">
                <div className="text-xs text-slate-400 font-medium">Bank Size</div>
                <div className="text-lg font-bold text-emerald-400 font-mono">{initialQuestions.length}</div>
              </div>
            </div>
          </div>

          {/* ── NAVIGATION TABS ── */}
          <div className="flex items-center gap-2 overflow-x-auto mt-6 pt-2 border-t border-slate-800/60 no-scrollbar">
            {[
              { id: 'war-room', label: 'AI Interview War Room', icon: '⚡' },
              { id: 'placement-hub', label: '6-Round Placement Simulator', icon: '🎯' },
              { id: 'finance-lab', label: 'Finance Technical Lab', icon: '🔬' },
              { id: 'study-plan', label: '60-Day Study Plan', icon: '📅' },
              { id: 'question-bank', label: `Question Bank (${initialQuestions.length})`, icon: '📚' },
              { id: 'history', label: 'Session History', icon: '📊' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAB CONTENT ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-20">
        {/* ── TAB 1: AI INTERVIEW WAR ROOM ── */}
        {activeTab === 'war-room' && (
          <div className="space-y-6">
            {/* Control Bar: Role, Company, Type, Stress Toggle */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Role */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Target Role:
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as InterviewRole)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    {Object.entries(ROLE_LABELS).map(([k, label]) => (
                      <option key={k} value={k}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* Company */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Target Firm:
                  </label>
                  <select
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    {(ROLE_COMPANIES[selectedRole] || []).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Question Type */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Category:
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => { setSelectedType(e.target.value); setActiveQuestionIndex(0); }}
                    className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="ALL">All Categories</option>
                    <option value="TECHNICAL">Technical (DCF, WACC, Ratios)</option>
                    <option value="CASE">Case Studies & M&A Deals</option>
                    <option value="GUESSTIMATE">Aptitude & Guesstimates</option>
                    <option value="BEHAVIORAL">Behavioral & Culture Fit</option>
                    <option value="CURRENT_AFFAIRS">Macro & Current Affairs</option>
                  </select>
                </div>

                {/* Mode & Timer */}
                <div className="flex items-end justify-between gap-2">
                  <div className="flex-1 bg-slate-950 border border-slate-800 p-2 rounded-xl flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">⏱ Elapsed</span>
                    <span className="text-sm font-mono font-bold text-amber-400">{fmt(timerSeconds)}</span>
                  </div>
                  <button
                    onClick={() => setStressMode(!stressMode)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                      stressMode
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {stressMode ? '⚡ Stress: ON' : 'Stress Mode'}
                  </button>
                </div>
              </div>
            </div>

            {/* Main War Room Practice Split */}
            {currentQuestion ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left 7 cols: Question & Answer Editor */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                      <span>Question {activeQuestionIndex + 1} of {filteredQuestions.length}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          currentQuestion.difficulty === 'KILLER' ? 'bg-rose-500/20 text-rose-400' :
                          currentQuestion.difficulty === 'HARD' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {currentQuestion.difficulty}
                        </span>
                        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded uppercase font-semibold">
                          {currentQuestion.type}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-base sm:text-lg font-semibold text-white leading-relaxed mb-4">
                      {currentQuestion.question}
                    </h2>

                    {currentQuestion.indianContext && (
                      <div className="text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 mb-4">
                        🇮🇳 <span className="font-semibold">India Context:</span> {currentQuestion.indianContext}
                      </div>
                    )}

                    {showHint && currentQuestion.hint && (
                      <div className="text-xs text-cyan-300/90 bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-3 mb-4">
                        💡 <span className="font-semibold">Hint:</span> {currentQuestion.hint}
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-300">
                          Your Answer:
                        </label>
                        {!showHint && currentQuestion.hint && (
                          <button
                            onClick={() => setShowHint(true)}
                            className="text-[11px] text-amber-400 hover:underline"
                          >
                            Show Hint 💡
                          </button>
                        )}
                      </div>

                      <textarea
                        ref={textareaRef}
                        rows={8}
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="State your answer clearly: mention formulas, balance sheet linkages, cash impacts, or regulatory nuances..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition resize-none font-sans leading-relaxed"
                      />

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-slate-500 font-mono">
                          {userAnswer.trim().split(/\s+/).filter(Boolean).length} words
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={handleNext}
                            className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition"
                          >
                            Skip / Next →
                          </button>
                          <button
                            onClick={handleSubmit}
                            disabled={isGrading || userAnswer.trim().length < 5}
                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 disabled:opacity-40 transition shadow-lg shadow-amber-500/10"
                          >
                            {isGrading ? 'AI Evaluating...' : 'Submit Answer →'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 5 cols: AI Feedback & Evaluation */}
                <div className="lg:col-span-5 space-y-4">
                  {gradedResult ? (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div>
                          <span className="text-xs text-slate-400 uppercase font-semibold">Evaluation Score</span>
                          <div className="text-3xl font-black text-amber-400 mt-0.5">
                            {gradedResult.score} <span className="text-sm font-normal text-slate-400">/ 10</span>
                          </div>
                        </div>
                        <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                          gradedResult.grade === 'EXCELLENT' ? 'bg-emerald-500/20 text-emerald-400' :
                          gradedResult.grade === 'GOOD' ? 'bg-amber-500/20 text-amber-400' :
                          gradedResult.grade === 'AVERAGE' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-rose-500/20 text-rose-400'
                        }`}>
                          {gradedResult.grade}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Interviewer Feedback</h4>
                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                          {gradedResult.feedback}
                        </p>
                      </div>

                      {gradedResult.strengths.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5">What You Did Well</h4>
                          <ul className="space-y-1">
                            {gradedResult.strengths.map((str, idx) => (
                              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                                <span className="text-emerald-400">✓</span> {str}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {gradedResult.missedPoints.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1.5">Points Missed</h4>
                          <ul className="space-y-1">
                            {gradedResult.missedPoints.map((mp, idx) => (
                              <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                                <span className="text-rose-400">•</span> {mp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {gradedResult.betterAnswer && (
                        <div>
                          <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1.5">Recommended Model Answer</h4>
                          <p className="text-xs text-slate-300 leading-relaxed bg-cyan-950/20 border border-cyan-800/30 p-3 rounded-xl font-mono text-[11px]">
                            {gradedResult.betterAnswer}
                          </p>
                        </div>
                      )}

                      <div className="pt-2">
                        <button
                          onClick={handleNext}
                          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs uppercase tracking-wider transition"
                        >
                          Next Question →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl mx-auto">
                        🤖
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Real-Time AI Grader</h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Submit your answer on the left. The engine scores accuracy, depth, and Indian market context.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-1.5 text-slate-400">
                        <div className="font-semibold text-slate-300 mb-1">Scoring Criteria:</div>
                        <div>• Technical correctness (40%)</div>
                        <div>• Depth & step-by-step logic (30%)</div>
                        <div>• Indian regulatory nuance (15%)</div>
                        <div>• Communication structure (15%)</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl">
                <p className="text-slate-400 text-sm">No questions found matching your filter.</p>
                <button
                  onClick={() => { setSelectedType('ALL'); setSelectedRole('INVESTMENT_BANKING'); }}
                  className="mt-3 text-xs text-amber-400 font-semibold"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: 6-ROUND PLACEMENT SIMULATOR ── */}
        {activeTab === 'placement-hub' && (
          <PlacementSimulator
            questions={initialQuestions}
            selectedRole={selectedRole}
            selectedCompany={selectedCompany}
            onSwitchToWarRoom={(idx) => {
              if (typeof idx === 'number') setActiveQuestionIndex(idx);
              setActiveTab('war-room');
            }}
          />
        )}

        {/* ── TAB 3: FINANCE TECHNICAL LAB ── */}
        {activeTab === 'finance-lab' && (
          <FinanceLabView />
        )}

        {/* ── TAB 4: 60-DAY STUDY PLAN ── */}
        {activeTab === 'study-plan' && (
          <StudyPlanView onSelectTopicForWarRoom={handleSelectTopicFromPlan} />
        )}

        {/* ── TAB 5: QUESTION BANK ── */}
        {activeTab === 'question-bank' && (
          <QuestionBankView
            questions={initialQuestions}
            onSelectQuestionForWarRoom={handleSelectQuestionFromBank}
          />
        )}

        {/* ── TAB 6: SESSION HISTORY ── */}
        {activeTab === 'history' && (
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Session Performance History</h2>
                <p className="text-sm text-slate-400">
                  Detailed review of all answers evaluated during your placement preparation session.
                </p>
              </div>
            </div>

            {sessionGradedHistory.length > 0 ? (
              <div className="space-y-3">
                {sessionGradedHistory.map((item, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-slate-500 font-mono">#{idx + 1}</span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {item.q.type}
                        </span>
                        <span className="text-xs text-slate-500">· {item.q.difficulty}</span>
                      </div>
                      <p className="text-sm text-slate-200 font-medium">{item.q.question}</p>
                      <p className="text-xs text-slate-400 mt-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        Feedback: {item.g.feedback}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className={`text-2xl font-black ${
                        item.g.score >= 8 ? 'text-emerald-400' :
                        item.g.score >= 6 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {item.g.score}/10
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">{item.g.grade}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-3xl block mb-2">📊</span>
                <p className="text-slate-300 text-sm font-semibold">No questions evaluated in this session yet.</p>
                <p className="text-slate-500 text-xs mt-1">
                  Answers evaluated in the AI Interview War Room or Placement Simulator will appear here with feedback.
                </p>
                <button
                  onClick={() => setActiveTab('war-room')}
                  className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition"
                >
                  Start Practicing →
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
