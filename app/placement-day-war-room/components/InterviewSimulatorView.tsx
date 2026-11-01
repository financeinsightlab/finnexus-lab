'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  type InterviewQuestion,
  type InterviewRole,
  type GradedAnswer,
  ROLE_LABELS,
  ROLE_COMPANIES,
} from '@/lib/interview-engine';

interface SimulatorProps {
  questions: InterviewQuestion[];
  initialRole?: InterviewRole;
  initialCompany?: string;
  onNavigateToTab?: (tab: string) => void;
}

export default function InterviewSimulatorView({
  questions,
  initialRole = 'INVESTMENT_BANKING',
  initialCompany = 'Goldman Sachs India',
  onNavigateToTab,
}: SimulatorProps) {
  const [selectedRole, setSelectedRole] = useState<InterviewRole>(initialRole);
  const [selectedCompany, setSelectedCompany] = useState<string>(initialCompany);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [gradedResult, setGradedResult] = useState<GradedAnswer | null>(null);
  const [sessionHistory, setSessionHistory] = useState<Array<{ q: InterviewQuestion; g: GradedAnswer }>>([]);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [stressMode, setStressMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Filter questions for the selected role
  const roleQuestions = questions.filter((q) => {
    const roleMatch = q.role.includes(selectedRole);
    const diffMatch = selectedDifficulty === 'ALL' || q.difficulty === selectedDifficulty;
    return roleMatch && diffMatch;
  });

  const currentQ: InterviewQuestion | undefined =
    roleQuestions[activeQuestionIndex] || roleQuestions[0] || questions[0];

  useEffect(() => {
    const companies = ROLE_COMPANIES[selectedRole] || [];
    if (companies.length > 0 && !companies.includes(selectedCompany)) {
      setSelectedCompany(companies[0]);
    }
    setActiveQuestionIndex(0);
    setUserAnswer('');
    setGradedResult(null);
    setTimerSeconds(0);
    setTimerActive(true);
  }, [selectedRole]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => setTimerSeconds((prev) => prev + 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  const fmt = (sec: number) =>
    `${Math.floor(sec / 60).toString().padStart(2, '0')}:${(sec % 60).toString().padStart(2, '0')}`;

  const handleNextQuestion = () => {
    setActiveQuestionIndex((prev) => (prev < roleQuestions.length - 1 ? prev + 1 : 0));
    setUserAnswer('');
    setGradedResult(null);
    setTimerSeconds(0);
    setTimerActive(true);
    textareaRef.current?.focus();
  };

  const handleSubmitAnswer = async () => {
    if (!currentQ || userAnswer.trim().length < 5 || isGrading) return;
    setIsGrading(true);
    setTimerActive(false);

    try {
      const res = await fetch('/api/interview/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQ.id,
          userAnswer: userAnswer.trim(),
          timeSpentSeconds: timerSeconds,
          role: selectedRole,
        }),
      });

      if (!res.ok) throw new Error('Grading request failed');

      const data = await res.json();
      if (data.graded) {
        setGradedResult(data.graded);
        setSessionHistory((prev) => [...prev, { q: currentQ, g: data.graded }]);
      }
    } catch (err) {
      console.warn('AI grading request failed; falling back to local deterministic evaluation:', err);
      // Deterministic rule-based evaluation that NEVER awards points for length
      const ansLower = userAnswer.toLowerCase();
      let hits = 0;
      for (const point of currentQ.keyPoints) {
        const pointWords = point.toLowerCase().split(' ').filter((w) => w.length > 4);
        if (pointWords.some((pw) => ansLower.includes(pw))) hits++;
      }
      const score = Math.max(2.0, Math.min(9.5, Math.round((hits / (currentQ.keyPoints.length || 1)) * 10 * 10) / 10));
      const fallbackResult: GradedAnswer = {
        questionId: currentQ.id,
        score,
        grade: score >= 8.0 ? 'EXCELLENT' : score >= 6.0 ? 'GOOD' : score >= 4.0 ? 'AVERAGE' : 'POOR',
        feedback: 'Rule-based evaluation (AI service offline): Scored against canonical key points and formulas.',
        betterAnswer: currentQ.keyPoints.slice(0, 4).join('. ') + '.',
        missedPoints: currentQ.keyPoints.slice(hits, hits + 2),
        strengths: hits > 0 ? ['Identified core technical mechanisms'] : ['Direct attempt made'],
      };
      setGradedResult(fallbackResult);
      setSessionHistory((prev) => [...prev, { q: currentQ, g: fallbackResult }]);
    } finally {
      setIsGrading(false);
    }
  };

  const avgSessionScore = sessionHistory.length > 0
    ? (sessionHistory.reduce((acc, item) => acc + item.g.score, 0) / sessionHistory.length).toFixed(1)
    : '—';

  return (
    <div className="space-y-6 font-sans text-neutral-200">
      {/* Configuration Header */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Role selector */}
          <div>
            <label className="text-neutral-400 block mb-0.5 text-[11px]">Interview Track</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as InterviewRole)}
              className="bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-cyan-500 font-sans"
            >
              {Object.entries(ROLE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          {/* Company selector */}
          <div>
            <label className="text-neutral-400 block mb-0.5 text-[11px]">Firm Context</label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-cyan-500 font-sans"
            >
              {(ROLE_COMPANIES[selectedRole] || []).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty filter */}
          <div>
            <label className="text-neutral-400 block mb-0.5 text-[11px]">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Levels</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
              <option value="KILLER">Killer (Partner Round)</option>
            </select>
          </div>
        </div>

        {/* Right Timer & Stress Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStressMode(!stressMode)}
            className={`px-2.5 py-1.5 rounded border transition-colors flex items-center gap-1.5 ${
              stressMode
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 font-bold'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <span>⚡ Stress Mode {stressMode ? 'ON' : 'OFF'}</span>
          </button>

          <div className="bg-[#080d1a] border border-neutral-800 px-3 py-1.5 rounded font-bold text-white flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${timerActive ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-600'}`}></span>
            <span>{fmt(timerSeconds)}</span>
          </div>
        </div>
      </div>

      {/* Main Interview Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left (2 Cols): Active Interview Question & Response Box */}
        <div className="lg:col-span-2 space-y-4">
          <div className={`bg-[#0e1626] border rounded-lg p-5 shadow-xl transition-all ${
            stressMode ? 'border-rose-500/50 shadow-rose-950/20' : 'border-neutral-800'
          }`}>
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase font-semibold">
                  {currentQ?.type}
                </span>
                <span className="text-neutral-400">Difficulty: <strong className="text-white">{currentQ?.difficulty}</strong></span>
              </div>
              <div className="text-neutral-400">
                Question <strong className="text-white">{activeQuestionIndex + 1}</strong> of {roleQuestions.length}
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-lg font-bold text-white leading-relaxed font-sans mb-3">
              &ldquo;{currentQ?.question}&rdquo;
            </h3>

            {/* Indian Context Highlight */}
            {currentQ?.indianContext && (
              <div className="p-2.5 bg-amber-950/30 border border-amber-800/60 rounded text-xs font-mono text-amber-200 mb-4">
                🇮🇳 Indian Context: {currentQ.indianContext}
              </div>
            )}

            {/* Response Area */}
            <div className="space-y-2">
              <label className="text-neutral-400 text-xs font-mono block">
                Your Answer (Speak or type your structured response):
              </label>
              <textarea
                ref={textareaRef}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Walk through the concept step-by-step. State your key assumptions, formula drivers, and quantified financial impact..."
                rows={7}
                disabled={isGrading}
                className="w-full bg-[#080d1a] border border-neutral-800 rounded-lg p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 font-sans leading-relaxed"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-800 text-xs font-mono mt-3">
              <div className="text-neutral-400">
                Words: <strong className="text-white">{userAnswer.trim().split(/\s+/).filter(Boolean).length}</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={isGrading || userAnswer.trim().length < 5}
                  className="px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isGrading ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
                      Evaluating Answer...
                    </>
                  ) : (
                    'Submit Answer for AI Evaluation →'
                  )}
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={isGrading}
                  className="px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
                >
                  Skip / Next &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Graded Result Card */}
          {gradedResult && (
            <div className="bg-[#091122] border border-cyan-500/40 rounded-lg p-5 shadow-2xl space-y-4 font-sans text-xs">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 font-mono">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-black text-white">
                    Score: <span className="text-cyan-400">{gradedResult.score.toFixed(1)}</span> / 10
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded font-bold uppercase text-[11px] ${
                      gradedResult.grade === 'EXCELLENT'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : gradedResult.grade === 'GOOD'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {gradedResult.grade}
                  </span>
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="px-3 py-1 rounded bg-cyan-500 text-black font-bold font-mono hover:bg-cyan-400"
                >
                  Next Question &rarr;
                </button>
              </div>

              {/* Feedback */}
              <div className="space-y-1">
                <div className="font-bold text-white font-mono uppercase text-[11px] text-cyan-300">
                  Interviewer Constructive Feedback
                </div>
                <p className="text-neutral-300 leading-relaxed">{gradedResult.feedback}</p>
              </div>

              {/* Strengths & Missed Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-[#0e1626] border border-neutral-800 p-3 rounded space-y-1">
                  <div className="font-bold text-emerald-400 font-mono text-[11px]">Strengths Demonstrated</div>
                  <ul className="list-disc list-inside text-neutral-300 space-y-0.5">
                    {gradedResult.strengths.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#0e1626] border border-neutral-800 p-3 rounded space-y-1">
                  <div className="font-bold text-rose-400 font-mono text-[11px]">Missed Concepts & Nuances</div>
                  <ul className="list-disc list-inside text-neutral-300 space-y-0.5">
                    {gradedResult.missedPoints.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Model Answer */}
              <div className="space-y-1 pt-2 border-t border-neutral-800">
                <div className="font-bold text-neutral-300 font-mono uppercase text-[11px]">
                  Institutional Model Answer
                </div>
                <p className="text-neutral-300 leading-relaxed bg-[#080d1a] p-3 rounded border border-neutral-800">
                  {gradedResult.betterAnswer}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right (1 Col): Session Progress & History */}
        <div className="space-y-4">
          <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg space-y-3 font-mono text-xs">
            <h4 className="font-bold uppercase tracking-wider text-cyan-300 border-b border-neutral-800 pb-2">
              Mock Interview Scorecard
            </h4>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-[#080d1a] border border-neutral-800 p-2.5 rounded">
                <div className="text-[10px] text-neutral-400">QUESTIONS GRADED</div>
                <div className="text-xl font-bold text-white mt-1">{sessionHistory.length}</div>
              </div>

              <div className="bg-[#080d1a] border border-neutral-800 p-2.5 rounded">
                <div className="text-[10px] text-neutral-400">AVERAGE SCORE</div>
                <div className="text-xl font-bold text-cyan-400 mt-1">{avgSessionScore} / 10</div>
              </div>
            </div>

            {/* Session attempts list */}
            {sessionHistory.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-neutral-800 max-h-[350px] overflow-y-auto scrollbar-none">
                <div className="text-[11px] text-neutral-400">Completed in this session:</div>
                {sessionHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-[#080d1a] border border-neutral-800/80 rounded flex items-center justify-between text-[11px]"
                  >
                    <span className="truncate max-w-[170px] text-neutral-300 font-sans">
                      {item.q.question}
                    </span>
                    <span className="font-bold text-white shrink-0 ml-2">
                      {item.g.score.toFixed(1)}/10
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

