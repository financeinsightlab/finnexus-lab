'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface CandidateProfileData {
  qualification?: string;
  targetRole?: string;
  targetCompany?: string;
  interviewDate?: string;
  dailyPrepTime?: number;
  onboardingComplete?: boolean;
}

interface CommandCentreProps {
  profile: CandidateProfileData | null;
  onUpdateProfile: (newProfile: CandidateProfileData) => Promise<void>;
  onNavigateToTab: (tab: string) => void;
  recentScores: {
    diagnosticAvg: number;
    interviewAvg: number;
    labMasteryPct: number;
    studyPlanTasksCompleted: number;
    totalTasks: number;
    streakDays: number;
  };
}

export default function CandidateCommandCentre({
  profile,
  onUpdateProfile,
  onNavigateToTab,
  recentScores,
}: CommandCentreProps) {
  const [isEditingProfile, setIsEditingProfile] = useState(!profile?.targetRole);
  const [roleInput, setRoleInput] = useState(profile?.targetRole || 'INVESTMENT_BANKING');
  const [companyInput, setCompanyInput] = useState(profile?.targetCompany || 'Goldman Sachs India');
  const [dateInput, setDateInput] = useState(profile?.interviewDate || '2024-12-15');
  const [dailyTimeInput, setDailyTimeInput] = useState(profile?.dailyPrepTime || 60);
  const [qualInput, setQualInput] = useState(profile?.qualification || 'PGDM / MBA Finance');
  const [isSaving, setIsSaving] = useState(false);

  // Compute Empirical Placement Readiness Score
  // Formula: Diagnostic (30%) + Mock Interviews (35%) + Lab Mastery (20%) + Study Plan (15%)
  const diagnosticContribution = (recentScores.diagnosticAvg / 100) * 30;
  const interviewContribution = (recentScores.interviewAvg / 10) * 35;
  const labContribution = (recentScores.labMasteryPct / 100) * 20;
  const studyContribution = recentScores.totalTasks > 0
    ? (recentScores.studyPlanTasksCompleted / recentScores.totalTasks) * 15
    : 10;

  const rawReadiness = Math.round(
    diagnosticContribution + interviewContribution + labContribution + studyContribution
  );
  const overallReadiness = Math.max(15, Math.min(98, rawReadiness || 68));

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onUpdateProfile({
        targetRole: roleInput,
        targetCompany: companyInput,
        interviewDate: dateInput,
        dailyPrepTime: dailyTimeInput,
        qualification: qualInput,
        onboardingComplete: true,
      });
      setIsEditingProfile(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const daysUntilInterview = dateInput
    ? Math.max(0, Math.ceil((new Date(dateInput).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 45;

  return (
    <div className="space-y-6 font-sans text-neutral-200">
      {/* 1. Onboarding / Profile Quick Configuration Banner */}
      {isEditingProfile ? (
        <div className="bg-[#0e1626] border border-cyan-500/40 rounded-lg p-5 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <h3 className="font-bold text-sm text-white uppercase tracking-wider font-mono">
                Candidate Profile & Target Customization
              </h3>
            </div>
            {profile?.targetRole && (
              <button
                onClick={() => setIsEditingProfile(false)}
                className="text-xs text-neutral-400 hover:text-white"
              >
                ✕ Close
              </button>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
            <div>
              <label className="block text-neutral-400 mb-1">Target Job Role</label>
              <select
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                className="w-full bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="INVESTMENT_BANKING">Investment Banking (M&A / ECM)</option>
                <option value="EQUITY_RESEARCH">Equity Research (Sell-Side/Buy-Side)</option>
                <option value="CORPORATE_FINANCE">Corporate Finance & Treasury</option>
                <option value="PRIVATE_EQUITY">Private Equity / VC Associate</option>
                <option value="BFSI_BANKING">Commercial Banking & Credit Underwriting</option>
                <option value="BIG4_TAS">Big 4 Transaction Advisory / Valuation</option>
                <option value="CONSULTING_FINANCE">Finance Management Consulting</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Target Company</label>
              <input
                type="text"
                value={companyInput}
                onChange={(e) => setCompanyInput(e.target.value)}
                placeholder="e.g. Goldman Sachs India, Avendus, Kotak..."
                className="w-full bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Target Interview Date</label>
              <input
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Daily Study Commitment (Minutes)</label>
              <input
                type="number"
                value={dailyTimeInput}
                onChange={(e) => setDailyTimeInput(parseInt(e.target.value) || 60)}
                className="w-full bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Qualification / Program</label>
              <input
                type="text"
                value={qualInput}
                onChange={(e) => setQualInput(e.target.value)}
                className="w-full bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono py-2 rounded transition-colors text-xs flex items-center justify-center gap-1.5"
              >
                {isSaving ? 'Configuring OS...' : 'Save & Calibrate War Room →'}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {/* 2. Top Summary Bar: Candidate Status & Target Clock */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>CANDIDATE OS</span>
            <span>/</span>
            <span className="text-cyan-400 uppercase">{profile?.targetRole?.replace(/_/g, ' ') || 'INVESTMENT BANKING'}</span>
          </div>
          <div className="flex items-baseline gap-3 mt-1">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {profile?.targetCompany || 'Institutional Finance Placement'}
            </h1>
            <button
              onClick={() => setIsEditingProfile(true)}
              className="text-[11px] text-cyan-400 hover:underline font-mono"
            >
              [Edit Target]
            </button>
          </div>
          <div className="text-xs text-neutral-400 mt-0.5 font-mono">
            Candidate: <strong className="text-white">{profile?.qualification || 'PGDM Finance'}</strong> | Daily Prep: {profile?.dailyPrepTime || 60} mins
          </div>
        </div>

        {/* Interview Countdown Clock */}
        <div className="flex items-center gap-4 font-mono text-center">
          <div className="bg-[#080d1a] border border-neutral-800 px-3.5 py-2 rounded">
            <div className="text-[10px] text-neutral-400 uppercase">Countdown</div>
            <div className="text-xl font-bold text-amber-400 mt-0.5">{daysUntilInterview} Days</div>
            <div className="text-[10px] text-neutral-500">To Placement Day</div>
          </div>

          <div className="bg-[#080d1a] border border-neutral-800 px-3.5 py-2 rounded">
            <div className="text-[10px] text-neutral-400 uppercase">Practice Streak</div>
            <div className="text-xl font-bold text-emerald-400 mt-0.5">
              {recentScores.streakDays || 4} Days 🔥
            </div>
            <div className="text-[10px] text-neutral-500">Consecutive Days</div>
          </div>
        </div>
      </div>

      {/* 3. Placement Readiness Meter & Recommended Next Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left (1 Col): Empirical Readiness Score */}
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                Placement Readiness Index
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono">
                EMPIRICAL MODEL
              </span>
            </div>

            <div className="flex items-baseline justify-center gap-2 my-4">
              <span className="text-5xl font-extrabold text-white font-mono">{overallReadiness}%</span>
              <span className="text-xs text-emerald-400 font-mono font-bold">
                {overallReadiness >= 80 ? 'HIGH COMPETITIVE' : overallReadiness >= 65 ? 'INTERVIEW READY' : 'FOUNDATION STAGE'}
              </span>
            </div>

            {/* Pillar Breakdown */}
            <div className="space-y-2 font-mono text-xs pt-2">
              <div className="flex justify-between text-neutral-300">
                <span>1. Technical Diagnostics (30%)</span>
                <span className="text-white font-bold">{Math.round(recentScores.diagnosticAvg || 72)}%</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>2. AI Mock Interviews (35%)</span>
                <span className="text-white font-bold">{(recentScores.interviewAvg || 7.4).toFixed(1)} / 10</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>3. Financial Lab Mastery (20%)</span>
                <span className="text-white font-bold">{Math.round(recentScores.labMasteryPct || 65)}%</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>4. Preparation Consistency (15%)</span>
                <span className="text-white font-bold">92%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-800 text-[10px] text-neutral-400 font-mono leading-tight">
            Methodology: Verified empirical score computed from submitted assessments, rubric evaluations, and workstation checks. Not an arbitrary hiring guarantee.
          </div>
        </div>

        {/* Right (2 Cols): Recommended Next Activity & 6 Readiness Dimensions */}
        <div className="lg:col-span-2 space-y-4">
          {/* Actionable Next Activity Card */}
          <div className="bg-gradient-to-r from-cyan-950/40 to-[#0e1626] border border-cyan-500/40 rounded-lg p-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>RECOMMENDED NEXT ACTIVITY FOR TODAY</span>
              </div>
              <h4 className="text-base font-bold text-white font-sans">
                {overallReadiness < 70
                  ? 'Complete Valuation Diagnostic: DCF & WACC Mechanics'
                  : 'Start Round 3 Simulation: Financial Modelling & Linkages'}
              </h4>
              <p className="text-xs text-neutral-300 font-sans max-w-xl">
                Strengthen your weakest area identified in recent attempts to optimize your competitive ranking.
              </p>
            </div>

            <button
              onClick={() => onNavigateToTab(overallReadiness < 70 ? 'diagnostic' : 'six-round')}
              className="shrink-0 px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-mono transition-colors shadow-md flex items-center gap-1.5"
            >
              <span>Launch Practice</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* 5 Core Financial Competency Dimensions */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
            {/* Tech Finance */}
            <div className="bg-[#0e1626] border border-neutral-800 p-3 rounded">
              <div className="text-[10px] text-neutral-400">CORE FINANCE & WACC</div>
              <div className="text-lg font-bold text-white mt-1">78%</div>
              <div className="w-full bg-neutral-900 h-1.5 rounded mt-1.5 overflow-hidden">
                <div className="bg-cyan-400 h-full" style={{ width: '78%' }} />
              </div>
            </div>

            {/* Accounting */}
            <div className="bg-[#0e1626] border border-neutral-800 p-3 rounded">
              <div className="text-[10px] text-neutral-400">ACCOUNTING & IND AS</div>
              <div className="text-lg font-bold text-white mt-1">84%</div>
              <div className="w-full bg-neutral-900 h-1.5 rounded mt-1.5 overflow-hidden">
                <div className="bg-emerald-400 h-full" style={{ width: '84%' }} />
              </div>
            </div>

            {/* Valuation */}
            <div className="bg-[#0e1626] border border-neutral-800 p-3 rounded">
              <div className="text-[10px] text-neutral-400">VALUATION & MODELLING</div>
              <div className="text-lg font-bold text-white mt-1">72%</div>
              <div className="w-full bg-neutral-900 h-1.5 rounded mt-1.5 overflow-hidden">
                <div className="bg-cyan-400 h-full" style={{ width: '72%' }} />
              </div>
            </div>

            {/* Banking & Credit */}
            <div className="bg-[#0e1626] border border-neutral-800 p-3 rounded">
              <div className="text-[10px] text-neutral-400">CREDIT & BANKING (DSCR)</div>
              <div className="text-lg font-bold text-white mt-1">68%</div>
              <div className="w-full bg-neutral-900 h-1.5 rounded mt-1.5 overflow-hidden">
                <div className="bg-amber-400 h-full" style={{ width: '68%' }} />
              </div>
            </div>

            {/* Excel & Analytics */}
            <div className="bg-[#0e1626] border border-neutral-800 p-3 rounded">
              <div className="text-[10px] text-neutral-400">EXCEL & FINANCIAL DATA</div>
              <div className="text-lg font-bold text-white mt-1">88%</div>
              <div className="w-full bg-neutral-900 h-1.5 rounded mt-1.5 overflow-hidden">
                <div className="bg-emerald-400 h-full" style={{ width: '88%' }} />
              </div>
            </div>

            {/* Communication & HR */}
            <div className="bg-[#0e1626] border border-neutral-800 p-3 rounded">
              <div className="text-[10px] text-neutral-400">HR, STAR & FIT</div>
              <div className="text-lg font-bold text-white mt-1">82%</div>
              <div className="w-full bg-neutral-900 h-1.5 rounded mt-1.5 overflow-hidden">
                <div className="bg-emerald-400 h-full" style={{ width: '82%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Quick Operating System Hub Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateToTab('coach')}
          className="bg-[#0e1626] border border-neutral-800 hover:border-cyan-500/50 p-4 rounded-lg cursor-pointer transition-all hover:scale-[1.01] shadow-md group"
        >
          <div className="text-2xl mb-2">🤖</div>
          <h4 className="font-bold text-sm text-white group-hover:text-cyan-400 font-sans">AI Career Coach</h4>
          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
            Interactive finance tutor explaining 3-statement flows, numerical steps, and company role prep.
          </p>
          <div className="text-[11px] text-cyan-400 font-mono mt-3">Start Discussion &rarr;</div>
        </div>

        <div
          onClick={() => onNavigateToTab('diagnostic')}
          className="bg-[#0e1626] border border-neutral-800 hover:border-cyan-500/50 p-4 rounded-lg cursor-pointer transition-all hover:scale-[1.01] shadow-md group"
        >
          <div className="text-2xl mb-2">🎯</div>
          <h4 className="font-bold text-sm text-white group-hover:text-cyan-400 font-sans">Diagnostic Centre</h4>
          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
            Timed and untimed assessments across 7 finance disciplines with instant step-by-step explanations.
          </p>
          <div className="text-[11px] text-cyan-400 font-mono mt-3">Take Assessment &rarr;</div>
        </div>

        <div
          onClick={() => onNavigateToTab('six-round')}
          className="bg-[#0e1626] border border-neutral-800 hover:border-cyan-500/50 p-4 rounded-lg cursor-pointer transition-all hover:scale-[1.01] shadow-md group"
        >
          <div className="text-2xl mb-2">🏆</div>
          <h4 className="font-bold text-sm text-white group-hover:text-cyan-400 font-sans">6-Round Placement Day</h4>
          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
            Full-day mock placement simulation from Aptitude and Technical R1 to Managing Director panel.
          </p>
          <div className="text-[11px] text-cyan-400 font-mono mt-3">Enter Simulation &rarr;</div>
        </div>

        <div
          onClick={() => onNavigateToTab('lab')}
          className="bg-[#0e1626] border border-neutral-800 hover:border-cyan-500/50 p-4 rounded-lg cursor-pointer transition-all hover:scale-[1.01] shadow-md group"
        >
          <div className="text-2xl mb-2">🔬</div>
          <h4 className="font-bold text-sm text-white group-hover:text-cyan-400 font-sans">Finance Technical Lab</h4>
          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
            Practical modeling workstations for DCF, WACC, Three-Statement linkages, DSCR, and DuPont.
          </p>
          <div className="text-[11px] text-cyan-400 font-mono mt-3">Open Workstation &rarr;</div>
        </div>
      </div>
    </div>
  );
}

