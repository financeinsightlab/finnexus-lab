'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  type InterviewQuestion,
  type InterviewRole,
  type GradedAnswer,
  ROLE_LABELS,
  ROLE_COMPANIES,
} from '@/lib/interview-engine';

import CandidateCommandCentre from './components/CandidateCommandCentre';
import CareerCoachView from './components/CareerCoachView';
import DiagnosticCentreView from './components/DiagnosticCentreView';
import InterviewSimulatorView from './components/InterviewSimulatorView';
import PlacementSimulator from './components/PlacementSimulator';
import FinanceLabView from './components/FinanceLabView';
import StudyPlanView from './components/StudyPlanView';
import QuestionBankView from './components/QuestionBankView';
import PerformanceAnalyticsView from './components/PerformanceAnalyticsView';

interface Props {
  initialQuestions: InterviewQuestion[];
  userPlan: string;
  isAdmin: boolean;
  userName?: string | null;
}

export type WarRoomTab =
  | 'command-centre'
  | 'coach'
  | 'diagnostic'
  | 'simulator'
  | 'six-round'
  | 'finance-lab'
  | 'study-plan'
  | 'question-bank'
  | 'analytics'
  | 'history';

interface CandidateProfileData {
  qualification?: string;
  targetRole?: string;
  targetCompany?: string;
  interviewDate?: string;
  dailyPrepTime?: number;
  onboardingComplete?: boolean;
}

export default function PlacementWarRoomClient({
  initialQuestions,
  userPlan,
  isAdmin,
  userName,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Tab state
  const tabParam = searchParams.get('tab') as WarRoomTab | null;
  const validTabs: WarRoomTab[] = [
    'command-centre',
    'coach',
    'diagnostic',
    'simulator',
    'six-round',
    'finance-lab',
    'study-plan',
    'question-bank',
    'analytics',
    'history',
  ];
  const initialTab = tabParam && validTabs.includes(tabParam) ? tabParam : 'command-centre';
  const [activeTab, setActiveTab] = useState<WarRoomTab>(initialTab);

  // Candidate Profile State
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfileData | null>(null);

  // Practice & Simulation State
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

  // Performance metrics
  const [diagnosticAvg, setDiagnosticAvg] = useState(78);
  const [labMasteryPct, setLabMasteryPct] = useState(70);
  const [studyPlanTasksCompleted, setStudyPlanTasksCompleted] = useState(14);
  const totalTasks = 60;
  const streakDays = 4;

  // Sync tab with URL if user deep links
  useEffect(() => {
    if (tabParam && validTabs.includes(tabParam) && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Load profile from API and task count from localStorage
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/api/placement-war-room/profile');
        if (res.ok) {
          const data = await res.json();
          if (data.profile) {
            setCandidateProfile(data.profile);
            if (data.profile.targetRole) {
              const matchedRole = Object.keys(ROLE_LABELS).find(
                (r) => r === data.profile.targetRole
              ) as InterviewRole | undefined;
              if (matchedRole) setSelectedRole(matchedRole);
            }
            if (data.profile.targetCompany) {
              setSelectedCompany(data.profile.targetCompany);
            }
          }
        }
      } catch {
        // Fallback to local default profile
        setCandidateProfile({
          qualification: 'PGDM / MBA Finance',
          targetRole: 'INVESTMENT_BANKING',
          targetCompany: 'Goldman Sachs India',
          interviewDate: '2025-01-15',
          dailyPrepTime: 60,
          onboardingComplete: true,
        });
      }
    }
    loadProfile();

    try {
      const stored = localStorage.getItem('placement_study_plan_completed_tasks');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setStudyPlanTasksCompleted(parsed.length);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleUpdateProfile = async (newProfile: CandidateProfileData) => {
    setCandidateProfile(newProfile);
    if (newProfile.targetRole) {
      const matched = Object.keys(ROLE_LABELS).find(
        (r) => r === newProfile.targetRole
      ) as InterviewRole | undefined;
      if (matched) setSelectedRole(matched);
    }
    if (newProfile.targetCompany) {
      setSelectedCompany(newProfile.targetCompany);
    }

    try {
      await fetch('/api/placement-war-room/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfile),
      });
    } catch {
      // ignore error
    }
  };

  const handleNavigateToTab = useCallback((tab: string) => {
    if (validTabs.includes(tab as WarRoomTab)) {
      setActiveTab(tab as WarRoomTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [validTabs]);

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
    if (timerActive && activeTab === 'simulator') {
      interval = setInterval(() => setTimerSeconds((prev) => prev + 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
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

  // Strictly deterministic evaluation fallback without length bias
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

      if (!res.ok) throw new Error('Grading API error');
      const data = await res.json();
      if (data.graded) {
        setGradedResult(data.graded);
        setSessionGradedHistory((p) => [...p, { q: currentQuestion, g: data.graded }]);
        return;
      }
    } catch {
      // Deterministic rule-based evaluation fallback (zero length-bias)
      const answerLower = userAnswer.toLowerCase();
      const coveredKeyPoints = currentQuestion.keyPoints.filter((kp) => {
        const words = kp.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
        return words.some((w) => answerLower.includes(w));
      });
      const missedKeyPoints = currentQuestion.keyPoints.filter((kp) => !coveredKeyPoints.includes(kp));
      const coverageRatio = currentQuestion.keyPoints.length > 0
        ? coveredKeyPoints.length / currentQuestion.keyPoints.length
        : 0.5;

      const baseScore = Math.round((4.0 + coverageRatio * 5.0) * 10) / 10;
      const score = Math.min(9.5, Math.max(3.5, baseScore));
      const grade = score >= 8 ? 'EXCELLENT' : score >= 6 ? 'GOOD' : 'AVERAGE';

      const fb: GradedAnswer = {
        questionId: currentQuestion.id,
        score,
        grade,
        feedback: `[Rule-Based Evaluation - Offline] Addressed ${coveredKeyPoints.length} of ${currentQuestion.keyPoints.length} key institutional concepts. Anchor explanations to Indian benchmarks (Ind AS, 10Y G-Sec).`,
        betterAnswer: currentQuestion.keyPoints.slice(0, 4).join('. ') + '.',
        missedPoints: missedKeyPoints.length > 0 ? missedKeyPoints.slice(0, 2) : currentQuestion.commonMistakes.slice(0, 2),
        strengths: coveredKeyPoints.length > 0
          ? coveredKeyPoints.slice(0, 2).map((kp) => `Covered: ${kp}`)
          : ['Structured communication demonstrated'],
      };
      setGradedResult(fb);
      setSessionGradedHistory((p) => [...p, { q: currentQuestion, g: fb }]);
    } finally {
      setIsGrading(false);
    }
  };

  const avgInterviewScore = () => {
    if (!sessionGradedHistory.length) return 8.2;
    return (
      Math.round(
        (sessionGradedHistory.reduce((a, c) => a + c.g.score, 0) / sessionGradedHistory.length) * 10
      ) / 10
    );
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
    setActiveTab('simulator');
  };

  const handleSelectTopicFromPlan = (topicName: string) => {
    const matched = initialQuestions.find(
      (q) =>
        q.question.toLowerCase().includes(topicName.toLowerCase()) ||
        q.tags.some((t) => topicName.toLowerCase().includes(t))
    );
    if (matched) {
      handleSelectQuestionFromBank(matched);
    } else {
      setActiveTab('simulator');
    }
  };

  const navTabs = [
    { id: 'command-centre', label: 'Command Centre', icon: '🎯' },
    { id: 'coach', label: 'AI Career Coach', icon: '🤖' },
    { id: 'diagnostic', label: 'Diagnostic Centre', icon: '🔬' },
    { id: 'simulator', label: 'Mock Interview Simulator', icon: '⚡' },
    { id: 'six-round', label: '6-Round Placement Day', icon: '🏆' },
    { id: 'finance-lab', label: 'Finance Technical Lab (10)', icon: '🧪' },
    { id: 'study-plan', label: 'Adaptive Study Plan', icon: '📅' },
    { id: 'question-bank', label: `Question Bank (${initialQuestions.length})`, icon: '📚' },
    { id: 'analytics', label: 'Performance Intelligence', icon: '📊' },
    { id: 'history', label: 'Session History', icon: '⏱' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* ── TOP NAV HEADER ── */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
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
            <span className="font-semibold text-xs sm:text-sm text-amber-400">
              Placement Day War Room 2.0
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium hidden md:inline">Institutional OS · Unlimited Access</span>
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

      {/* ── INSTITUTIONAL TERMINAL RIBBON HEADER ── */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full mb-2">
                <span>🎓 AI Finance Placement Operating System — Powered by Central AI Gateway & Institutional Evaluation</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Finance Placement Operating System
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-1">
                Full-funnel campus placement preparation for IIM, Goldman Sachs India, Avendus Capital, Kotak IB, and Big 4 TAS.
                Integrated diagnostics, AI career coaching, 6-round placement day simulation, and 10 technical finance workstations.
              </p>
            </div>

            {/* Quick Readiness Widget */}
            <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-3 self-start md:self-auto shadow-inner">
              <div className="text-center px-3 border-r border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Practiced</div>
                <div className="text-lg font-bold text-white font-mono">{sessionGradedHistory.length}</div>
              </div>
              <div className="text-center px-3 border-r border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Mock Avg</div>
                <div className="text-lg font-bold text-amber-400 font-mono">
                  {avgInterviewScore()}/10
                </div>
              </div>
              <div className="text-center px-3">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Bank Size</div>
                <div className="text-lg font-bold text-emerald-400 font-mono">{initialQuestions.length}</div>
              </div>
            </div>
          </div>

          {/* ── TERMINAL TABS NAVIGATION ── */}
          <div className="flex items-center gap-2 overflow-x-auto mt-6 pt-2 border-t border-slate-800/80 no-scrollbar">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleNavigateToTab(tab.id)}
                className={`text-xs font-semibold px-3.5 py-2.5 rounded-xl transition whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN TAB WORKSPACE ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
        {/* TAB 1: CANDIDATE COMMAND CENTRE */}
        {activeTab === 'command-centre' && (
          <CandidateCommandCentre
            profile={candidateProfile}
            onUpdateProfile={handleUpdateProfile}
            onNavigateToTab={handleNavigateToTab}
            recentScores={{
              diagnosticAvg,
              interviewAvg: avgInterviewScore(),
              labMasteryPct,
              studyPlanTasksCompleted,
              totalTasks,
              streakDays,
            }}
          />
        )}

        {/* TAB 2: AI CAREER COACH */}
        {activeTab === 'coach' && (
          <CareerCoachView
            candidateProfile={candidateProfile}
            onNavigateToTab={handleNavigateToTab}
          />
        )}

        {/* TAB 3: DIAGNOSTIC CENTRE */}
        {activeTab === 'diagnostic' && (
          <DiagnosticCentreView />
        )}

        {/* TAB 4: AI MOCK INTERVIEW SIMULATOR */}
        {activeTab === 'simulator' && (
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

            {/* Main Practice Split */}
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
                        <h4 className="text-sm font-bold text-white">Institutional AI Grader</h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Submit your answer on the left. The engine evaluates technical precision, financial logic, and Indian market context.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-1.5 text-slate-400">
                        <div className="font-semibold text-slate-300 mb-1">Scoring Criteria:</div>
                        <div>• Technical Accuracy (35%)</div>
                        <div>• Conceptual Depth & Multi-Statement Links (25%)</div>
                        <div>• Financial Reasoning & Calculation Logic (20%)</div>
                        <div>• Indian Regulatory Nuances: Ind AS, RBI, SEBI (10%)</div>
                        <div>• Communication & Executive Structure (10%)</div>
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

        {/* TAB 5: 6-ROUND PLACEMENT SIMULATOR */}
        {activeTab === 'six-round' && (
          <PlacementSimulator
            questions={initialQuestions}
            selectedRole={selectedRole}
            selectedCompany={selectedCompany}
            onSwitchToWarRoom={(idx) => {
              if (typeof idx === 'number') setActiveQuestionIndex(idx);
              setActiveTab('simulator');
            }}
          />
        )}

        {/* TAB 6: FINANCE TECHNICAL LAB */}
        {activeTab === 'finance-lab' && (
          <FinanceLabView />
        )}

        {/* TAB 7: ADAPTIVE STUDY PLAN */}
        {activeTab === 'study-plan' && (
          <StudyPlanView onSelectTopicForWarRoom={handleSelectTopicFromPlan} />
        )}

        {/* TAB 8: QUESTION BANK */}
        {activeTab === 'question-bank' && (
          <QuestionBankView
            questions={initialQuestions}
            onSelectQuestionForWarRoom={handleSelectQuestionFromBank}
          />
        )}

        {/* TAB 9: PERFORMANCE ANALYTICS */}
        {activeTab === 'analytics' && (
          <PerformanceAnalyticsView
            stats={{
              diagnosticAvg,
              interviewAvg: avgInterviewScore(),
              labMasteryPct,
              streakDays,
              totalAttempts: sessionGradedHistory.length + 8,
              studyTasksCompleted: studyPlanTasksCompleted,
              totalStudyTasks: totalTasks,
            }}
          />
        )}

        {/* TAB 10: SESSION HISTORY */}
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
                  Answers evaluated in the AI Mock Interview Simulator or 6-Round Placement Day will appear here with feedback.
                </p>
                <button
                  onClick={() => setActiveTab('simulator')}
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
