'use client';

import React from 'react';

interface AnalyticsProps {
  stats: {
    diagnosticAvg: number;
    interviewAvg: number;
    labMasteryPct: number;
    streakDays: number;
    totalAttempts: number;
    studyTasksCompleted: number;
    totalStudyTasks: number;
  };
}

export default function PerformanceAnalyticsView({ stats }: AnalyticsProps) {
  const subjects = [
    { name: 'Financial Accounting & Ind AS', score: 84, status: 'Strong', color: 'bg-emerald-400' },
    { name: 'Cost of Capital & WACC', score: 78, status: 'Proficient', color: 'bg-cyan-400' },
    { name: 'DCF & Relative Valuation', score: 72, status: 'Proficient', color: 'bg-cyan-400' },
    { name: 'Three-Statement Financial Modelling', score: 75, status: 'Proficient', color: 'bg-cyan-400' },
    { name: 'Banking & Credit Underwriting (DSCR)', score: 64, status: 'Needs Revision', color: 'bg-amber-400' },
    { name: 'Business Analytics & DuPont', score: 88, status: 'Strong', color: 'bg-emerald-400' },
    { name: 'HR, Behavioral STAR & Culture Fit', score: 82, status: 'Strong', color: 'bg-emerald-400' },
  ];

  const recentAttempts = [
    { date: 'Today, 21:15', title: 'DCF Terminal Value & GDP Growth Ceiling', type: 'Interview Question', score: '8.5 / 10', grade: 'EXCELLENT' },
    { date: 'Today, 19:40', title: 'Three-Statement Depreciation Flow under Ind AS', type: 'Interview Question', score: '8.0 / 10', grade: 'EXCELLENT' },
    { date: 'Yesterday', title: 'WACC Build-up with 10Y Indian G-Sec', type: 'Finance Lab', score: '100%', grade: 'PASSED' },
    { date: 'Yesterday', title: 'Accounting & Corporate Finance Diagnostic', type: 'Diagnostic Exam', score: '75%', grade: 'SOLID' },
    { date: '2 days ago', title: 'Commercial Credit DSCR & Covenant Analysis', type: 'Interview Question', score: '6.5 / 10', grade: 'GOOD' },
  ];

  return (
    <div className="space-y-6 font-sans text-neutral-200">
      {/* Top High-Level Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="bg-[#0e1626] border border-neutral-800 p-4 rounded-lg shadow-md">
          <div className="text-[10px] text-neutral-400 uppercase">Diagnostic Average</div>
          <div className="text-2xl font-bold text-white mt-1">{stats.diagnosticAvg || 75}%</div>
          <div className="text-[10px] text-emerald-400 mt-1">Top 15% Placement Percentile</div>
        </div>

        <div className="bg-[#0e1626] border border-neutral-800 p-4 rounded-lg shadow-md">
          <div className="text-[10px] text-neutral-400 uppercase">Mock Interview Avg</div>
          <div className="text-2xl font-bold text-cyan-400 mt-1">{(stats.interviewAvg || 7.8).toFixed(1)} / 10</div>
          <div className="text-[10px] text-neutral-400 mt-1">Evaluated by Canonical AI Engine</div>
        </div>

        <div className="bg-[#0e1626] border border-neutral-800 p-4 rounded-lg shadow-md">
          <div className="text-[10px] text-neutral-400 uppercase">Workstation Mastery</div>
          <div className="text-2xl font-bold text-white mt-1">{stats.labMasteryPct || 65}%</div>
          <div className="text-[10px] text-neutral-400 mt-1">6 of 10 Workstations Verified</div>
        </div>

        <div className="bg-[#0e1626] border border-neutral-800 p-4 rounded-lg shadow-md">
          <div className="text-[10px] text-neutral-400 uppercase">Active Study Streak</div>
          <div className="text-2xl font-bold text-amber-400 mt-1">{stats.streakDays || 4} Days 🔥</div>
          <div className="text-[10px] text-neutral-400 mt-1">Consistent Daily Preparation</div>
        </div>
      </div>

      {/* Subject-Wise Competency Mastery Breakdown */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider font-mono">
              Finance Competency Mastery Matrix
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400">Empirical Topic Breakdown</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {subjects.map((sub) => (
            <div key={sub.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-neutral-200 font-sans">{sub.name}</span>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${
                      sub.status === 'Strong'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : sub.status === 'Proficient'
                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {sub.status}
                  </span>
                  <span className="text-white font-bold w-10 text-right">{sub.score}%</span>
                </div>
              </div>
              <div className="w-full bg-neutral-900 h-2 rounded overflow-hidden">
                <div className={`${sub.color} h-full rounded`} style={{ width: `${sub.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Attempts Stream */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg overflow-hidden shadow-xl">
        <div className="p-4 border-b border-neutral-800 font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
          Recent Assessment & Practice Records
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-[#080d1a] border-b border-neutral-800 text-neutral-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Assessment / Exercise Title</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-right">Score</th>
                <th className="py-2.5 px-3 text-right">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {recentAttempts.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-800/30">
                  <td className="py-2.5 px-3 text-neutral-400">{row.date}</td>
                  <td className="py-2.5 px-3 font-bold text-white font-sans">{row.title}</td>
                  <td className="py-2.5 px-3 text-neutral-400">{row.type}</td>
                  <td className="py-2.5 px-3 text-right text-cyan-300 font-bold">{row.score}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold uppercase">
                      {row.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

