'use client';

import { useState, useEffect } from 'react';
import { type InterviewQuestion, type InterviewRole, type GradedAnswer, ROLE_COMPANIES } from '@/lib/interview-engine';

export interface PlacementRound {
  id: string;
  roundNumber: number;
  icon: string;
  title: string;
  desc: string;
  durationMinutes: number;
  color: string;
  focus: string;
}

export const PLACEMENT_ROUNDS: PlacementRound[] = [
  { id: 'pre-placement', roundNumber: 1, icon: '📋', title: 'Pre-Placement Talk (PPT) & Culture', desc: 'Company intro, business model comprehension, culture fit & motivation', durationMinutes: 15, color: 'from-blue-500 to-cyan-500', focus: 'Firm Knowledge & Fit' },
  { id: 'aptitude', roundNumber: 2, icon: '🧮', title: 'Quantitative & Analytical Aptitude', desc: 'Fast numerical reasoning, mental math, and financial problem solving', durationMinutes: 30, color: 'from-violet-500 to-purple-500', focus: 'Speed & Numerical Accuracy' },
  { id: 'technical-r1', roundNumber: 3, icon: '⚡', title: 'Technical Round 1 — Core Finance', desc: 'DCF valuation, WACC, financial statement flows, and Ind AS nuances', durationMinutes: 45, color: 'from-amber-500 to-orange-500', focus: 'Valuation & Accounting' },
  { id: 'technical-r2', roundNumber: 4, icon: '🔬', title: 'Technical Round 2 — Complex Case', desc: 'M&A deal structuring, LBO mechanics, sector deep-dive, and sensitivity', durationMinutes: 60, color: 'from-rose-500 to-pink-500', focus: 'Case Structuring & Modeling' },
  { id: 'hr-round', roundNumber: 5, icon: '🤝', title: 'HR & Behavioral Fit Round', desc: 'STAR technique, ethical dilemmas, conflict resolution & compensation fit', durationMinutes: 30, color: 'from-emerald-500 to-teal-500', focus: 'Behavioral & Leadership' },
  { id: 'final', roundNumber: 6, icon: '🏆', title: 'Final Partner / MD Round', desc: 'High-pressure grilling by Managing Director on macro views and thesis defense', durationMinutes: 45, color: 'from-amber-400 to-yellow-300', focus: 'Executive Presence & Macro' },
];

interface Props {
  questions: InterviewQuestion[];
  selectedRole: InterviewRole;
  selectedCompany: string;
  onSwitchToWarRoom?: (questionIndex?: number) => void;
}

export default function PlacementSimulator({ questions, selectedRole, selectedCompany }: Props) {
  const [activeRound, setActiveRound] = useState<PlacementRound | null>(null);
  const [roundQuestionIndex, setRoundQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gradedResult, setGradedResult] = useState<GradedAnswer | null>(null);
  const [roundHistory, setRoundHistory] = useState<Array<{ roundId: string; q: InterviewQuestion; g: GradedAnswer }>>([]);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Filter questions suited for the current round
  const getRoundQuestions = (round: PlacementRound): InterviewQuestion[] => {
    if (round.id === 'pre-placement') {
      return questions.filter((q) => q.type === 'BEHAVIORAL' || q.tags.includes('hr') || q.tags.includes('company')).slice(0, 5);
    }
    if (round.id === 'aptitude') {
      return questions.filter((q) => q.type === 'GUESSTIMATE' || q.tags.includes('aptitude') || q.tags.includes('numerical')).slice(0, 5);
    }
    if (round.id === 'technical-r1') {
      return questions.filter((q) => q.type === 'TECHNICAL' && (q.tags.includes('valuation') || q.tags.includes('accounting') || q.tags.includes('finance'))).slice(0, 5);
    }
    if (round.id === 'technical-r2') {
      return questions.filter((q) => q.type === 'CASE' || q.difficulty === 'HARD' || q.difficulty === 'KILLER').slice(0, 5);
    }
    if (round.id === 'hr-round') {
      return questions.filter((q) => q.type === 'BEHAVIORAL' || q.tags.includes('hr') || q.tags.includes('behavioral')).slice(0, 5);
    }
    // final MD round
    return questions.filter((q) => q.difficulty === 'KILLER' || q.type === 'CURRENT_AFFAIRS' || q.difficulty === 'HARD').slice(0, 5);
  };

  const activeQuestions = activeRound ? getRoundQuestions(activeRound) : [];
  const currentQuestion: InterviewQuestion | undefined = activeQuestions[roundQuestionIndex] || activeQuestions[0];

  const handleStartRound = (round: PlacementRound) => {
    setActiveRound(round);
    setRoundQuestionIndex(0);
    setUserAnswer('');
    setGradedResult(null);
    setSecondsRemaining(round.durationMinutes * 60);
    setTimerRunning(true);
  };

  const handleExitRound = () => {
    setActiveRound(null);
    setTimerRunning(false);
    setUserAnswer('');
    setGradedResult(null);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((s) => Math.max(0, s - 1));
      }, 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [timerRunning, secondsRemaining]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || userAnswer.trim().length < 5) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/interview/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          userAnswer,
          timeSpentSeconds: activeRound ? activeRound.durationMinutes * 60 - secondsRemaining : 60,
          role: selectedRole,
        }),
      });
      if (!res.ok) throw new Error('Grading failed');
      const data = await res.json();
      if (data.graded) {
        setGradedResult(data.graded);
        if (activeRound) {
          setRoundHistory((prev) => [...prev, { roundId: activeRound.id, q: currentQuestion, g: data.graded }]);
        }
      }
    } catch (err) {
      console.error(err);
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

      const fallback: GradedAnswer = {
        questionId: currentQuestion.id,
        score,
        grade,
        feedback: `[Rule-Based Evaluation - Offline] Addressed ${coveredKeyPoints.length} of ${currentQuestion.keyPoints.length} core financial concepts. Ensure you anchor calculations to Indian benchmarks (Ind AS, 10Y G-Sec).`,
        betterAnswer: currentQuestion.keyPoints.join('. ') + '.',
        missedPoints: missedKeyPoints.length > 0 ? missedKeyPoints.slice(0, 2) : currentQuestion.commonMistakes.slice(0, 2),
        strengths: coveredKeyPoints.length > 0
          ? coveredKeyPoints.slice(0, 2).map((kp) => `Covered: ${kp}`)
          : ['Demonstrated basic financial vocabulary'],
      };
      setGradedResult(fallback);
      if (activeRound) {
        setRoundHistory((prev) => [...prev, { roundId: activeRound.id, q: currentQuestion, g: fallback }]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    if (roundQuestionIndex < activeQuestions.length - 1) {
      setRoundQuestionIndex((idx) => idx + 1);
      setUserAnswer('');
      setGradedResult(null);
    }
  };

  const currentRoundScore = () => {
    if (!activeRound) return 0;
    const history = roundHistory.filter((h) => h.roundId === activeRound.id);
    if (history.length === 0) return 0;
    const sum = history.reduce((acc, curr) => acc + curr.g.score, 0);
    return Math.round((sum / history.length) * 10) / 10;
  };

  return (
    <div className="space-y-6 pt-2">
      {/* ── ACTIVE SIMULATION VIEW ── */}
      {activeRound && currentQuestion ? (
        <div className="space-y-6">
          {/* Top Bar for Round Simulation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl p-2.5 rounded-xl bg-slate-800">{activeRound.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    ROUND {activeRound.roundNumber} OF 6
                  </span>
                  <span className="text-xs text-slate-400">· {selectedCompany}</span>
                </div>
                <h2 className="text-lg font-bold text-white mt-0.5">{activeRound.title}</h2>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl">
                <span className="text-xs text-slate-400 font-medium">⏱ Time Left:</span>
                <span className={`font-mono font-bold text-sm ${secondsRemaining < 120 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
                  {formatTimer(secondsRemaining)}
                </span>
              </div>
              <button
                onClick={handleExitRound}
                className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
              >
                Exit Round ✕
              </button>
            </div>
          </div>

          {/* Question Card & Panel Grilling */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 cols: Question & Answer Editor */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span>Question {roundQuestionIndex + 1} of {activeQuestions.length}</span>
                  <span className="uppercase font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                    {currentQuestion.type} · {currentQuestion.difficulty}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed mb-4">
                  {currentQuestion.question}
                </h3>

                {currentQuestion.hint && (
                  <div className="text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 mb-4">
                    💡 <span className="font-semibold">Interviewer Prompt:</span> {currentQuestion.hint}
                  </div>
                )}

                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Your Response to the Interview Panel:
                  </label>
                  <textarea
                    rows={7}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Structure your answer clearly: state core thesis, quantify metrics (in ₹ Cr, %, basis points), and cite Indian regulatory standards where applicable..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition resize-none font-sans leading-relaxed"
                  />

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500 font-mono">
                      {userAnswer.trim().split(/\s+/).filter(Boolean).length} words
                    </span>
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={isSubmitting || userAnswer.trim().length < 5}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 disabled:opacity-40 transition shadow-lg shadow-amber-500/10"
                    >
                      {isSubmitting ? 'Panel Evaluating...' : 'Submit to Panel →'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: AI Feedback & Round Progress */}
            <div className="lg:col-span-5 space-y-4">
              {gradedResult ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400 uppercase font-semibold">Panel Score</span>
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
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Panel Assessment</h4>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                      {gradedResult.feedback}
                    </p>
                  </div>

                  {gradedResult.strengths.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5">Key Strengths</h4>
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
                      <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1.5">Points to Cover</h4>
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
                      <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1.5">Goldman / Kotak Model Answer</h4>
                      <p className="text-xs text-slate-300 leading-relaxed bg-cyan-950/20 border border-cyan-800/30 p-3 rounded-xl font-mono text-[11px]">
                        {gradedResult.betterAnswer}
                      </p>
                    </div>
                  )}

                  <div className="pt-2">
                    {roundQuestionIndex < activeQuestions.length - 1 ? (
                      <button
                        onClick={handleNextQuestion}
                        className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs uppercase tracking-wider transition"
                      >
                        Next Question in Round ({roundQuestionIndex + 2}/{activeQuestions.length}) →
                      </button>
                    ) : (
                      <button
                        onClick={handleExitRound}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
                      >
                        Complete Round · View Placement Hub →
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl mx-auto">
                    ⚖️
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Live Interview Panel</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Type your response on the left and submit. The AI evaluator tests technical precision, Indian market metrics, and structure.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-1 text-slate-400">
                    <div className="font-semibold text-slate-300 mb-1">Panel Evaluation Criteria:</div>
                    <div>• Technical accuracy & calculation logic</div>
                    <div>• Indian context: Ind AS, RBI rates, 10Y G-Sec</div>
                    <div>• Communication structure & clarity</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ── ROUND SELECTION GRID (SIMULATOR DASHBOARD) ── */
        <div className="space-y-8">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">6-Round Placement Day Simulator</h2>
                <p className="text-sm text-slate-400">
                  Simulate a full IIM / premier campus placement day for {selectedCompany} from PPT to final MD offer round.
                </p>
              </div>
              <button
                onClick={() => handleStartRound(PLACEMENT_ROUNDS[0])}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition shadow-lg shadow-amber-500/10 flex items-center gap-2"
              >
                <span>▶ Start Full 6-Round Day</span>
              </button>
            </div>
          </div>

          {/* 6 Rounds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLACEMENT_ROUNDS.map((round) => {
              const historyForRound = roundHistory.filter((h) => h.roundId === round.id);
              const isCompleted = historyForRound.length > 0;
              const roundAvg = isCompleted
                ? Math.round((historyForRound.reduce((a, c) => a + c.g.score, 0) / historyForRound.length) * 10) / 10
                : null;

              return (
                <div
                  key={round.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-2xl p-6 group transition relative overflow-hidden flex flex-col justify-between"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${round.color} opacity-0 group-hover:opacity-5 transition pointer-events-none`} />

                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${round.color} flex items-center justify-center text-2xl shadow-lg`}>
                        {round.icon}
                      </div>
                      <div className="flex items-center gap-2">
                        {roundAvg !== null && (
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            {roundAvg}/10
                          </span>
                        )}
                        <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded">
                          Round {round.roundNumber}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-amber-400 transition">
                      {round.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {round.desc}
                    </p>

                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-4">
                      Focus: <span className="text-slate-300">{round.focus}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <span className="text-xs text-slate-500">⏱ {round.durationMinutes} min</span>
                    <button
                      onClick={() => handleStartRound(round)}
                      className={`text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r ${round.color} text-white hover:opacity-90 transition shadow-md`}
                    >
                      {isCompleted ? 'Retry Round →' : 'Start Round →'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Placement Day Survival Guide */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">
              💡 Premier B-School Placement Day Protocol
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-slate-300">
              {[
                { tip: '1. Know your numbers cold', detail: 'WACC (11–13% India), 10Y G-Sec (7.1%), EV/EBITDA multiples for your target sector.' },
                { tip: '2. Structure before speaking', detail: 'Pause 5-10 seconds. Lay out a 3-pillar framework before diving into calculations.' },
                { tip: '3. Master Ind AS 115 & 116', detail: 'Know how operating leases became balance sheet liabilities and increased reported EBITDA.' },
                { tip: '4. Quantify in ₹ Crore', detail: 'Always ground your valuations in Indian currency benchmarks rather than vague percentages.' },
                { tip: '5. Prepare 2 live deals', detail: 'Be ready to discuss two recent Indian M&A or IPO transactions in your target industry.' },
                { tip: '6. Stand your ground politely', detail: 'Partners test your conviction. Defend your assumptions with logic when pushed.' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="font-semibold text-slate-200 mb-1">{item.tip}</div>
                  <div className="text-slate-400 leading-relaxed">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
