"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  PLAN,
  CATEGORY_META,
  TOTAL_TASKS,
  type Category,
  type DayPlan,
  type Task,
} from "../../lib/placement-prep/plan";
import {
  ALL_MODULES,
  CATEGORY_ORDER,
  type LearningItem,
  type LearningModule,
} from "../../lib/placement-prep/materials";
import { getTaskContent } from "../../lib/placement-prep/taskContent";
import { getDayQuote } from "../../lib/placement-prep/dayQuotes";
import {
  FUTURE_SKILL_STACK,
  PORTFOLIO_PROJECTS,
  WEBSITE_AUDIT,
} from "../../lib/placement-prep/portfolio";

const STORAGE_KEY = "ka-placement-prep-v1";
const START_DATE_KEY = "ka-prep-start-date";
const TAB_KEY = "ka-prep-tab";

type Saved = {
  completed: string[];
  currentDay: number;
};

function loadSaved(): Saved {
  if (typeof window === "undefined") return { completed: [], currentDay: 1 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completed: [], currentDay: 1 };
    return JSON.parse(raw);
  } catch {
    return { completed: [], currentDay: 1 };
  }
}

function saveState(s: Saved) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

export default function PlacementPrepClient() {
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    () => new Set(loadSaved().completed)
  );
  const [currentDay, setCurrentDay] = useState<number>(() => loadSaved().currentDay);
  const [filter, setFilter] = useState<Category | "All">("All");
  const [viewMode, setViewMode] = useState<"today" | "week" | "all">("today");
  const [tab, setTab] = useState<"tracker" | "learn" | "portfolio">(
    () =>
      (typeof window !== "undefined" &&
        (localStorage.getItem(TAB_KEY) as "tracker" | "learn" | "portfolio")) ||
      "tracker"
  );
  const [learnCat, setLearnCat] = useState<string>("All");
  const [startDate, setStartDate] = useState<string>("");

  useEffect(() => {
    let d = localStorage.getItem(START_DATE_KEY);
    if (!d) {
      d = new Date().toISOString().split("T")[0];
      localStorage.setItem(START_DATE_KEY, d);
    }
    setStartDate(d);
  }, []);

  useEffect(() => {
    saveState({ completed: Array.from(completedIds), currentDay });
  }, [completedIds, currentDay]);

  useEffect(() => {
    localStorage.setItem(TAB_KEY, tab);
  }, [tab]);

  const toggleTask = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const resetAll = () => {
    if (confirm("Reset all progress? This can't be undone.")) {
      setCompletedIds(new Set());
      setCurrentDay(1);
      localStorage.removeItem(START_DATE_KEY);
      location.reload();
    }
  };

  const visibleDays = useMemo(() => {
    if (viewMode === "today") return PLAN.filter((d) => d.day === currentDay);
    if (viewMode === "week") {
      const wk = Math.ceil(currentDay / 7);
      return PLAN.filter((d) => d.week === wk);
    }
    return PLAN;
  }, [viewMode, currentDay]);

  const filteredDays = useMemo(() => {
    if (filter === "All") return visibleDays;
    return visibleDays
      .map((d) => ({ ...d, tasks: d.tasks.filter((t) => t.category === filter) }))
      .filter((d) => d.tasks.length > 0);
  }, [visibleDays, filter]);

  const placementDate = useMemo(() => {
    if (!startDate) return "";
    const s = new Date(startDate);
    s.setDate(s.getDate() + 60);
    return s.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [startDate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0D13]">
      {/* Hero header */}
      <header className="relative overflow-hidden bg-brand-navy border-b border-white/5 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#0D6E6E] font-semibold">
                Placement Preparation Tracker
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mt-1 text-white">
                🎯 Road to <span className="text-[#0D6E6E]">15 LPA+</span>
              </h1>
              <p className="text-sm text-slate-300 mt-2">
                60-day expert plan • Finance (Major) + Business Analytics (Minor)
              </p>
              {startDate && (
                <p className="text-xs text-slate-400 mt-1">
                  Started:{" "}
                  {new Date(startDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  • Placement target:{" "}
                  <b className="text-[#0D6E6E]">{placementDate}</b>
                </p>
              )}
            </div>
            <button
              onClick={resetAll}
              className="text-xs px-3 py-1.5 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 transition"
            >
              ↺ Reset Progress
            </button>
          </div>

          <div className="mt-5 inline-flex bg-white/10 backdrop-blur rounded-xl p-1 border border-white/20">
            <button
              onClick={() => setTab("tracker")}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition ${
                tab === "tracker"
                  ? "bg-white text-brand-navy shadow-lg"
                  : "text-white/90 hover:bg-white/10"
              }`}
            >
              📊 Daily Tracker
            </button>
            <button
              onClick={() => setTab("learn")}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition ${
                tab === "learn"
                  ? "bg-white text-brand-navy shadow-lg"
                  : "text-white/90 hover:bg-white/10"
              }`}
            >
              📚 Learning Material & Q&A
            </button>
            <button
              onClick={() => setTab("portfolio")}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition ${
                tab === "portfolio"
                  ? "bg-white text-brand-navy shadow-lg"
                  : "text-white/90 hover:bg-white/10"
              }`}
            >
              🚀 Portfolio Lab
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <GlobalNotes />

        {tab === "tracker" && (
          <>
            <MentorNote />
            <DayQuote day={currentDay} />
            <StatsCards completedIds={completedIds} currentDay={currentDay} />

            <div className="bg-white dark:bg-[#1A1F2E] rounded-2xl shadow-md border border-gray-200 dark:border-white/5 p-4 mb-6">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    Current Day
                  </div>
                  <div className="text-2xl font-bold text-slate-800 dark:text-white">
                    Day {currentDay} of 60
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentDay((d) => Math.max(1, d - 1))}
                    disabled={currentDay === 1}
                    className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    ← Prev
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={currentDay}
                    onChange={(e) =>
                      setCurrentDay(Math.max(1, Math.min(60, Number(e.target.value) || 1)))
                    }
                    className="w-16 text-center px-2 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0f1522] text-slate-800 dark:text-white font-semibold"
                  />
                  <button
                    onClick={() => setCurrentDay((d) => Math.min(60, d + 1))}
                    disabled={currentDay === 60}
                    className="px-3 py-2 rounded-lg bg-[#0D6E6E] hover:bg-[#0a5858] text-white disabled:opacity-40 text-sm font-semibold"
                  >
                    Next →
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto -mx-4 px-4">
                <div className="flex gap-1 min-w-max pb-1">
                  {PLAN.map((d) => {
                    const done = d.tasks.filter((t) => completedIds.has(t.id)).length;
                    const total = d.tasks.length;
                    const allDone = done === total;
                    const partial = done > 0 && !allDone;
                    const isCurrent = d.day === currentDay;
                    return (
                      <button
                        key={d.day}
                        onClick={() => setCurrentDay(d.day)}
                        title={`Day ${d.day} — ${done}/${total}`}
                        className={`w-7 h-7 rounded-md text-[10px] font-bold flex items-center justify-center transition ${
                          isCurrent
                            ? "bg-[#0D6E6E] text-white ring-2 ring-[#0D6E6E] ring-offset-1 ring-offset-white dark:ring-offset-[#1A1F2E]"
                            : allDone
                            ? "bg-emerald-500 text-white"
                            : partial
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10"
                        }`}
                      >
                        {allDone ? "✓" : d.day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <div className="inline-flex bg-gray-100 dark:bg-white/5 rounded-lg p-1">
                  {(["today", "week", "all"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setViewMode(m)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-md transition capitalize ${
                        viewMode === m
                          ? "bg-white dark:bg-[#0f1522] text-slate-800 dark:text-white shadow"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {m === "today" ? "Today" : m === "week" ? "This Week" : "All Days"}
                    </button>
                  ))}
                </div>
                <div className="flex gap-1 flex-wrap">
                  <button
                    onClick={() => setFilter("All")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                      filter === "All"
                        ? "bg-brand-navy text-white"
                        : "bg-gray-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-white/10"
                    }`}
                  >
                    All
                  </button>
                  {(Object.keys(CATEGORY_META) as Category[]).map((cat) => {
                    const meta = CATEGORY_META[cat];
                    return (
                      <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1 ${
                          filter === cat
                            ? `${meta.bg} ${meta.color} ring-2 ${meta.ring}`
                            : "bg-gray-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-white/10"
                        }`}
                      >
                        <span>{meta.icon}</span> {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredDays.length === 0 && (
                <div className="text-center py-12 text-slate-500 bg-white dark:bg-[#1A1F2E] rounded-2xl border border-gray-200 dark:border-white/5">
                  No tasks match this filter.
                </div>
              )}
              {filteredDays.map((d) => (
                <DayCard
                  key={d.day}
                  day={d}
                  completedIds={completedIds}
                  onToggle={toggleTask}
                  isToday={d.day === currentDay}
                />
              ))}
            </div>
          </>
        )}

        {tab === "learn" && (
          <LearningMaterial activeCategory={learnCat} setActiveCategory={setLearnCat} />
        )}

        {tab === "portfolio" && <PortfolioLab />}
      </main>
    </div>
  );
}

/* ===================== GLOBAL NOTES ===================== */
function GlobalNotes() {
  const GLOBAL_NOTES_KEY = "ka-prep-global-brain-dump-v1";
  const [notes, setNotes] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNotes(localStorage.getItem(GLOBAL_NOTES_KEY) || "");
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem(GLOBAL_NOTES_KEY, notes);
  }, [notes, mounted]);

  if (!mounted) return null;

  return (
    <div className="rounded-2xl bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-white/5 shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">
            Quick Brain Dump
          </div>
          <div className="font-bold text-slate-800 dark:text-white">
            Write any thought, idea, doubt, company name, or interview point here
          </div>
        </div>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
          Auto-saved in this browser
        </span>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Example: Need to add HDFC Bank stock pitch to portfolio. Ask mentor about DCF assumptions. Revise NPA and CASA before banking interview..."
        className="w-full min-h-40 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0f1522] px-4 py-3 text-sm text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-[#0D6E6E] focus:border-[#0D6E6E] resize-y"
      />
      <div className="text-[11px] text-slate-500 mt-2">
        This note is separate from task completion. Resetting progress will not clear this note.
      </div>
    </div>
  );
}

/* ===================== MENTOR NOTE ===================== */
function MentorNote() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-amber-950/30 dark:to-rose-950/30 border border-amber-200 dark:border-amber-900/40 p-5 mb-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="text-3xl">🧑‍🏫</div>
        <div>
          <div className="font-bold text-slate-800 dark:text-white mb-1">
            A note from your Mentor 👋
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            This 60-day plan is designed for <b>Finance major, Analytics minor, aiming 15 LPA+</b>.
            Here's what matters:
          </p>
          <ul className="mt-2 text-sm text-slate-700 dark:text-slate-300 space-y-1 list-disc list-inside">
            <li>
              <b>Every day = English practice</b> (your biggest gap — fix this, salary jumps 2-3 LPA).
            </li>
            <li>
              <b>Finance daily</b> — depth matters. Equity Research / IB roles pay 15-25 LPA, but they
              grill on basics.
            </li>
            <li>
              <b>Analytics every 2nd day</b> — SQL + Excel + Power BI = your differentiator. Most
              finance folks don't have this.
            </li>
            <li>
              <b>Every Sunday = Mock Test</b> — score yourself honestly. Track in the dashboard.
            </li>
            <li>
              <b>Last 20 days = Mock Interviews</b> — practice till boring. Confidence comes from reps.
            </li>
          </ul>
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 italic">
            "It is not days in your life but life in your days that count." — keep this energy
            🔥
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===================== DAY QUOTE ===================== */
function DayQuote({ day }: { day: number }) {
  const [copied, setCopied] = useState(false);
  const q = getDayQuote(day);

  const copyQuote = async () => {
    const text = `${q.quote}\n\n${q.caption} | Road to 15 LPA+`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert(text);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-brand-navy via-brand-slate to-[#0f1522] text-white p-5 mb-6 shadow-lg border border-white/10">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-[250px]">
          <div className="text-xs uppercase tracking-widest text-[#0D6E6E] font-bold">
            Unique Quote for Day {day}
          </div>
          <div className="text-xl sm:text-2xl font-bold mt-2 leading-snug">
            &ldquo;{q.quote}&rdquo;
          </div>
          <div className="text-sm text-white/75 mt-2">{q.caption}</div>
        </div>
        <button
          onClick={copyQuote}
          className="text-xs font-bold px-3 py-2 rounded-xl bg-white text-brand-navy hover:bg-[#0D6E6E] hover:text-white transition shadow-sm"
        >
          {copied ? "✓ Copied" : "Copy for upload"}
        </button>
      </div>
    </div>
  );
}

/* ===================== STATS CARDS ===================== */
function StatsCards({
  completedIds,
  currentDay,
}: {
  completedIds: Set<string>;
  currentDay: number;
}) {
  const completed = completedIds.size;
  const percent = Math.round((completed / TOTAL_TASKS) * 100);

  const expectedByToday = PLAN.slice(0, currentDay).reduce(
    (s, d) => s + d.tasks.length,
    0
  );
  const onTrack = completed >= expectedByToday;

  const catCount: Record<Category, { done: number; total: number }> = {
    Finance: { done: 0, total: 0 },
    Analytics: { done: 0, total: 0 },
    English: { done: 0, total: 0 },
    Aptitude: { done: 0, total: 0 },
    "HR/Resume": { done: 0, total: 0 },
    "Future Skills": { done: 0, total: 0 },
    "Mock/Revision": { done: 0, total: 0 },
  };

  PLAN.forEach((d) =>
    d.tasks.forEach((tk) => {
      catCount[tk.category].total += 1;
      if (completedIds.has(tk.id)) catCount[tk.category].done += 1;
    })
  );

  let streak = 0;
  for (let i = 0; i < PLAN.length; i++) {
    const day = PLAN[i];
    const allDone = day.tasks.every((tk) => completedIds.has(tk.id));
    if (allDone) streak++;
    else break;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      <div className="rounded-2xl bg-gradient-to-br from-brand-navy to-brand-slate text-white p-5 shadow-lg">
        <div className="text-xs uppercase tracking-wider opacity-80">Overall Progress</div>
        <div className="text-4xl font-bold mt-1">{percent}%</div>
        <div className="text-sm mt-1 opacity-90">
          {completed} / {TOTAL_TASKS} tasks
        </div>
        <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0D6E6E] rounded-full transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div
        className={`rounded-2xl p-5 shadow-lg text-white ${
          onTrack
            ? "bg-gradient-to-br from-emerald-500 to-teal-600"
            : "bg-gradient-to-br from-orange-500 to-rose-600"
        }`}
      >
        <div className="text-xs uppercase tracking-wider opacity-80">Status</div>
        <div className="text-3xl font-bold mt-1">{onTrack ? "🔥 On Track" : "⚡ Catch Up"}</div>
        <div className="text-sm mt-2 opacity-95">
          Expected by today: <span className="font-bold">{expectedByToday}</span>
        </div>
        <div className="text-sm opacity-95">
          You've done: <span className="font-bold">{completed}</span>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white p-5 shadow-lg">
        <div className="text-xs uppercase tracking-wider opacity-80">Day Streak</div>
        <div className="text-4xl font-bold mt-1">🔥 {streak}</div>
        <div className="text-sm mt-2 opacity-95">consecutive full days</div>
        <div className="text-xs mt-2 opacity-80">Don't break the chain!</div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white p-5 shadow-lg">
        <div className="text-xs uppercase tracking-wider opacity-80">Days Until Placement</div>
        <div className="text-4xl font-bold mt-1">{Math.max(0, 60 - currentDay + 1)}</div>
        <div className="text-sm mt-2 opacity-95">
          Goal: <span className="font-bold text-[#0D6E6E]">15 LPA+</span>
        </div>
        <div className="text-xs mt-1 opacity-70">You got this 💪</div>
      </div>

      <div className="sm:col-span-2 lg:col-span-4 rounded-2xl bg-white dark:bg-[#1A1F2E] p-5 shadow-md border border-gray-200 dark:border-white/5">
        <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
          📚 Category-wise Progress
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(catCount) as Category[]).map((cat) => {
            const { done, total } = catCount[cat];
            const pct = total ? Math.round((done / total) * 100) : 0;
            const meta = CATEGORY_META[cat];
            return (
              <div key={cat} className={`rounded-xl p-3 ${meta.bg} dark:bg-white/5`}>
                <div className="flex items-center justify-between mb-1">
                  <div className={`text-sm font-semibold ${meta.color} flex items-center gap-1`}>
                    <span>{meta.icon}</span> {cat}
                  </div>
                  <div className={`text-xs font-bold ${meta.color}`}>
                    {done}/{total}
                  </div>
                </div>
                <div className="h-1.5 bg-white/60 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-current"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ===================== DAY CARD ===================== */
function DayCard({
  day,
  completedIds,
  onToggle,
  isToday,
}: {
  day: DayPlan;
  completedIds: Set<string>;
  onToggle: (id: string) => void;
  isToday: boolean;
}) {
  const doneCount = day.tasks.filter((t) => completedIds.has(t.id)).length;
  const total = day.tasks.length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;
  const allDone = doneCount === total;
  const totalMin = day.tasks.reduce((s, t) => s + t.minutes, 0);

  return (
    <div
      className={`rounded-2xl border bg-white dark:bg-[#1A1F2E] shadow-sm overflow-hidden transition-all ${
        isToday
          ? "border-[#0D6E6E] ring-2 ring-[#0D6E6E]/30"
          : "border-gray-200 dark:border-white/5"
      } ${allDone ? "opacity-80" : ""}`}
    >
      <div
        className={`px-5 py-4 ${
          isToday
            ? "bg-gradient-to-r from-[#0D6E6E]/10 to-brand-slate/10 dark:from-[#0D6E6E]/20 dark:to-brand-navy/20"
            : "bg-gray-50 dark:bg-[#0f1522]"
        } border-b border-gray-200 dark:border-white/5`}
      >
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-bold text-white ${
                  isToday ? "bg-[#0D6E6E]" : allDone ? "bg-emerald-500" : "bg-slate-400"
                }`}
              >
                {allDone ? "✓" : day.day}
              </span>
              <div>
                <div className="font-bold text-slate-800 dark:text-white">
                  Day {day.day} — Week {day.week}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {day.phase} • ⏱ ~{Math.round((totalMin / 60) * 10) / 10} hrs
                </div>
              </div>
              {isToday && (
                <span className="text-[10px] uppercase font-bold tracking-wider bg-[#0D6E6E] text-white px-2 py-1 rounded-full">
                  Today
                </span>
              )}
              {allDone && !isToday && (
                <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500 text-white px-2 py-1 rounded-full">
                  Done
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-slate-700 dark:text-slate-200">
              {doneCount}/{total}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{pct}%</div>
          </div>
        </div>
        <div className="mt-3 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              allDone ? "bg-emerald-500" : "bg-[#0D6E6E]"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="p-4 space-y-3">
        {day.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            completed={completedIds.has(task.id)}
            onToggle={() => onToggle(task.id)}
          />
        ))}
      </div>
    </div>
  );
}

/* ===================== TASK CARD ===================== */
function TaskCard({
  task,
  completed,
  onToggle,
}: {
  task: Task;
  completed: boolean;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const noteKey = `ka-task-note-${task.id}`;
  const [taskNote, setTaskNote] = useState("");
  const [mounted, setMounted] = useState(false);
  const meta = CATEGORY_META[task.category];
  const content = getTaskContent(task.title);

  useEffect(() => {
    setMounted(true);
    setTaskNote(localStorage.getItem(noteKey) || "");
  }, [noteKey]);

  useEffect(() => {
    if (mounted) localStorage.setItem(noteKey, taskNote);
  }, [noteKey, taskNote, mounted]);

  return (
    <div
      className={`rounded-xl border overflow-hidden transition-all ${
        completed
          ? "bg-gray-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/5"
          : "bg-white dark:bg-[#0f1522] border-gray-200 dark:border-white/5 hover:border-[#0D6E6E]/50 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3 p-3">
        <label className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
          <input
            type="checkbox"
            checked={completed}
            onChange={onToggle}
            className="w-5 h-5 rounded accent-[#0D6E6E] cursor-pointer"
          />
        </label>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}
            >
              {meta.icon} {task.category}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">⏱ {task.minutes} min</span>
          </div>
          <div
            className={`font-bold text-sm ${
              completed ? "line-through text-slate-400" : "text-slate-800 dark:text-white"
            }`}
          >
            {task.title}
          </div>
          <div
            className={`text-xs mt-0.5 ${
              completed ? "text-slate-400" : "text-slate-600 dark:text-slate-300"
            }`}
          >
            {task.detail}
          </div>
          {task.resource && (
            <div className="text-[11px] text-[#0D6E6E] mt-1 font-medium">
              📖 Resource: {task.resource}
            </div>
          )}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 text-[11px] text-[#0D6E6E] bg-[#0D6E6E]/10 hover:bg-[#0D6E6E]/20 font-bold px-2.5 py-1 rounded-lg border border-[#0D6E6E]/30 transition"
          >
            {expanded ? "▲ Hide Study Material & Sources" : "▼ Show Study Material & Sources"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-[#0D6E6E]/20 bg-gradient-to-br from-[#0D6E6E]/5 via-white to-white dark:from-[#0D6E6E]/10 dark:via-[#0f1522] dark:to-[#0f1522] p-4 space-y-4">
          <Section label="💡 Concept" color="sky">
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
              {content.concept}
            </p>
          </Section>

          {content.formulas && (
            <Section label="🧮 Key Formulas" color="emerald">
              <pre className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap bg-emerald-50/60 dark:bg-emerald-950/20 p-3 rounded-lg border border-emerald-200 dark:border-emerald-900/40 font-sans">
                {content.formulas}
              </pre>
            </Section>
          )}

          {content.qa && content.qa.length > 0 && (
            <Section label="❓ Practice Questions with Answers" color="amber">
              <div className="space-y-2">
                {content.qa.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-gray-200 dark:border-white/5 overflow-hidden bg-white dark:bg-[#1A1F2E]"
                  >
                    <div className="px-3 py-2 bg-amber-50 dark:bg-amber-950/20 text-sm font-bold text-amber-900 dark:text-amber-200">
                      {item.q}
                    </div>
                    <div className="px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap border-t border-amber-100 dark:border-amber-900/30">
                      <span className="inline-block px-1.5 py-0.5 text-[10px] uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded font-bold mr-2 mb-1">
                        Answer
                      </span>
                      <div>{item.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          <Section label="🎯 Practical Tip / Exercise" color="rose">
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
              {content.practicalTip}
            </p>
          </Section>

          {mounted && (
            <Section label="📝 My Notes for This Task" color="slate">
              <textarea
                value={taskNote}
                onChange={(e) => setTaskNote(e.target.value)}
                placeholder="Write your personal notes, doubts, formulas, solved mistakes, interview points, or project ideas for this task. These notes auto-save and will not be deleted when you close the browser."
                className="w-full min-h-36 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0f1522] px-3 py-2 text-sm text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-[#0D6E6E] focus:border-[#0D6E6E] resize-y"
              />
              <div className="text-[11px] text-slate-500 mt-2">
                Auto-saved locally in your browser under this exact task.
              </div>
            </Section>
          )}

          <Section label="📚 Best Free Sources to Learn More" color="indigo">
            <div className="space-y-2">
              {content.sources.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-2.5 bg-indigo-50/60 dark:bg-indigo-950/20 rounded-lg border border-indigo-200 dark:border-indigo-900/40"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-indigo-900 dark:text-indigo-200">
                      {s.name}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{s.note}</div>
                    {s.url && (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 hover:underline mt-1 inline-block break-all font-medium"
                      >
                        🔗 {s.url}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}
    </div>
  );
}

function Section({
  label,
  color,
  children,
}: {
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  const borderMap: Record<string, string> = {
    sky: "border-sky-200 dark:border-sky-900/40",
    emerald: "border-emerald-200 dark:border-emerald-900/40",
    amber: "border-amber-200 dark:border-amber-900/40",
    rose: "border-rose-200 dark:border-rose-900/40",
    indigo: "border-indigo-200 dark:border-indigo-900/40",
    slate: "border-slate-200 dark:border-white/10",
  };
  return (
    <div className={`rounded-xl border ${borderMap[color] ?? borderMap.slate} p-3`}>
      <div className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">{label}</div>
      {children}
    </div>
  );
}

/* ===================== LEARNING MATERIAL ===================== */
function LearningMaterial({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string;
  setActiveCategory: (c: string) => void;
}) {
  const [openModule, setOpenModule] = useState<string | null>(null);

  const filteredModules =
    activeCategory === "All"
      ? ALL_MODULES
      : ALL_MODULES.filter((m) => m.category === activeCategory);

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-5">
        <button
          onClick={() => {
            setActiveCategory("All");
            setOpenModule(null);
          }}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
            activeCategory === "All"
              ? "bg-brand-navy text-white shadow-lg"
              : "bg-white dark:bg-[#1A1F2E] text-slate-600 dark:text-slate-300 border border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5"
          }`}
        >
          📚 All ({ALL_MODULES.length})
        </button>
        {CATEGORY_ORDER.map((cat) => {
          const count = ALL_MODULES.filter((m) => m.category === cat).length;
          const meta = CATEGORY_META[cat as keyof typeof CATEGORY_META];
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenModule(null);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-1.5 ${
                active
                  ? `${meta.bg} ${meta.color} ring-2 ${meta.ring} shadow-lg`
                  : "bg-white dark:bg-[#1A1F2E] text-slate-600 dark:text-slate-300 border border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
            >
              <span>{meta.icon}</span> {cat} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filteredModules.length === 0 && (
          <div className="text-center py-12 text-slate-500 bg-white dark:bg-[#1A1F2E] rounded-2xl border border-gray-200 dark:border-white/5">
            No content in this category yet.
          </div>
        )}
        {filteredModules.map((mod) => (
          <ModuleCard
            key={mod.id}
            module={mod}
            open={openModule === mod.id}
            onToggle={() => setOpenModule(openModule === mod.id ? null : mod.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ModuleCard({
  module,
  open,
  onToggle,
}: {
  module: LearningModule;
  open: boolean;
  onToggle: () => void;
}) {
  const meta = CATEGORY_META[module.category as keyof typeof CATEGORY_META];
  return (
    <div className="rounded-2xl border-2 border-gray-200 dark:border-white/5 bg-white dark:bg-[#1A1F2E] shadow-sm overflow-hidden transition-all hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition"
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${meta.bg}`}
          >
            {module.icon}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}
              >
                {module.category}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {module.items.length} sections
              </span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white text-base mt-1">
              {module.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
              {module.summary}
            </p>
          </div>
        </div>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-transform ${
            open
              ? "rotate-180 bg-[#0D6E6E]/20 text-[#0D6E6E]"
              : "bg-gray-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
          }`}
        >
          ▾
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-gray-100 dark:border-white/5 pt-4">
          <div className="space-y-4">
            {module.items.map((item, idx) => (
              <LearningSection key={idx} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LearningSection({ item }: { item: LearningItem }) {
  const typeMeta: Record<string, { bg: string; color: string; label: string }> = {
    Concept: { bg: "bg-sky-100 dark:bg-sky-950/30", color: "text-sky-700 dark:text-sky-300", label: "💡 Concept" },
    Formula: {
      bg: "bg-emerald-100 dark:bg-emerald-950/30",
      color: "text-emerald-700 dark:text-emerald-300",
      label: "🧮 Formula",
    },
    "Q&A": { bg: "bg-amber-100 dark:bg-amber-950/30", color: "text-amber-700 dark:text-amber-300", label: "❓ Q&A" },
    Script: {
      bg: "bg-violet-100 dark:bg-violet-950/30",
      color: "text-violet-700 dark:text-violet-300",
      label: "📝 Script / Template",
    },
    Cheatsheet: {
      bg: "bg-rose-100 dark:bg-rose-950/30",
      color: "text-rose-700 dark:text-rose-300",
      label: "📋 Cheat Sheet",
    },
    Example: {
      bg: "bg-indigo-100 dark:bg-indigo-950/30",
      color: "text-indigo-700 dark:text-indigo-300",
      label: "🔢 Example",
    },
  };
  const t = typeMeta[item.type] ?? typeMeta.Concept;

  return (
    <div className="rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] overflow-hidden">
      <div className="px-4 py-2.5 bg-white dark:bg-[#0f1522] border-b border-gray-100 dark:border-white/5 flex items-center justify-between gap-2 flex-wrap">
        <h4 className="font-bold text-slate-800 dark:text-white text-sm">{item.title}</h4>
        <span
          className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${t.bg} ${t.color}`}
        >
          {t.label}
        </span>
      </div>
      <div className="px-4 py-3">
        {item.content && (
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
            {item.content}
          </p>
        )}
        {item.qa && item.qa.length > 0 && (
          <div className="space-y-2">
            {item.qa.map((qa, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 dark:border-white/5 overflow-hidden bg-white dark:bg-[#1A1F2E]"
              >
                <div className="px-3 py-2 bg-amber-50 dark:bg-amber-950/20 text-sm font-bold text-amber-900 dark:text-amber-200">
                  {qa.q}
                </div>
                <div className="px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap border-t border-amber-100 dark:border-amber-900/30">
                  {qa.a}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ===================== PORTFOLIO LAB ===================== */
function PortfolioLab() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-br from-brand-navy via-brand-slate to-[#0f1522] text-white p-6 shadow-lg">
        <div className="text-xs uppercase tracking-widest text-[#0D6E6E] font-bold">
          Portfolio Upgrade Lab
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mt-2">Make your portfolio recruiter-ready</h2>
        <p className="text-sm text-white/80 mt-2 max-w-4xl leading-relaxed">
          Build proof that you can do finance + analytics work and are ready for an entry-level 15 LPA+
          role. Do 3 strong projects before placements, not 10 weak ones.
        </p>
      </section>

      <section className="rounded-2xl bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-white/5 shadow-sm p-5">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">
              Website Audit
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {WEBSITE_AUDIT.url}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Observed title: <b>{WEBSITE_AUDIT.observedTitle}</b>
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200">
            Needs repositioning
          </span>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-4">
          {WEBSITE_AUDIT.summary}
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <AuditList title="What is good" items={WEBSITE_AUDIT.strengths} color="emerald" />
          <AuditList title="Risks / gaps" items={WEBSITE_AUDIT.risks} color="rose" />
          <AuditList title="Fix first" items={WEBSITE_AUDIT.priorityFixes} color="indigo" />
        </div>
      </section>

      <section className="rounded-2xl bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-white/5 shadow-sm p-5">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">
              Best Projects to Add
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Do 3 strong projects before placements, not 10 weak ones
            </h3>
          </div>
          <div className="text-xs font-bold text-[#0D6E6E] bg-[#0D6E6E]/10 px-3 py-1.5 rounded-full">
            Priority: Project 1 + 2 + 6
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <article
              key={project.title}
              className="rounded-xl border border-gray-200 dark:border-white/5 p-4 bg-gray-50/70 dark:bg-white/[0.02]"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-navy text-white flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{project.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{project.goal}</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] font-bold bg-white dark:bg-[#0f1522] border border-gray-200 dark:border-white/10 text-slate-700 dark:text-slate-200 px-2 py-1 rounded-lg"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="mt-3 text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950/30 px-2.5 py-2 rounded-lg">
                Recruiter value: {project.recruiterValue}
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <MiniList title="Deliverables" items={project.deliverables} />
                <MiniList title="Build steps" items={project.buildSteps} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-white/5 shadow-sm p-5">
        <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">
          Future-Ready Skill Stack
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
          Skills that can make recruiters value you more than average finance candidates
        </h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {FUTURE_SKILL_STACK.map((item) => (
            <div
              key={item.skill}
              className="rounded-xl border border-fuchsia-200 dark:border-fuchsia-900/40 bg-fuchsia-50/70 dark:bg-fuchsia-950/20 p-4"
            >
              <h4 className="font-bold text-fuchsia-900 dark:text-fuchsia-200">{item.skill}</h4>
              <p className="text-sm text-slate-700 dark:text-slate-200 mt-2">
                <b>Why it matters:</b> {item.why}
              </p>
              <p className="text-xs text-fuchsia-800 dark:text-fuchsia-200 bg-white dark:bg-[#0f1522] border border-fuchsia-200 dark:border-fuchsia-900/40 rounded-lg px-2 py-1.5 mt-3">
                <b>Proof to show:</b> {item.proof}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-900/40 p-5 shadow-sm">
        <div className="text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300 font-bold">
          Exact Website Structure I Recommend
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
          Replace company-style claims with proof-style portfolio sections
        </h3>
        <div className="grid gap-3 md:grid-cols-2 mt-4">
          <MiniList title="Top navigation" items={["Home", "Projects", "Skills", "Resume", "Notes", "Contact"]} />
          <MiniList
            title="Hero section"
            items={[
              "Finance + Business Analytics portfolio",
              "Target roles: Equity Research, Credit Risk, Financial Analyst, BFSI Analyst",
              "Buttons: Download Resume, View Projects, LinkedIn",
            ]}
          />
          <MiniList
            title="Project section"
            items={[
              "3 featured projects with screenshots",
              "Problem, tools, method, insights, recommendation",
              "Links to Excel/PBI/PDF/GitHub/Drive",
            ]}
          />
          <MiniList
            title="Trust section"
            items={[
              "Real certifications only",
              "College, internship, competitions",
              "No unverified SEBI/RBI/ISO/Fortune 500 claims",
            ]}
          />
        </div>
        <div className="mt-5">
          <Link
            href="/study"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0D6E6E] hover:underline"
          >
            ← Back to Study Material
          </Link>
        </div>
      </section>
    </div>
  );
}

function AuditList({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: "emerald" | "rose" | "indigo";
}) {
  const styles: Record<string, string> = {
    emerald: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200",
    rose: "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200",
    indigo: "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/40 text-indigo-900 dark:text-indigo-200",
  };
  return (
    <div className={`rounded-xl border p-4 ${styles[color]}`}>
      <h4 className="font-bold mb-2">{title}</h4>
      <ul className="space-y-2 text-sm list-disc list-inside">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg bg-white dark:bg-[#0f1522] border border-gray-200 dark:border-white/10 p-3">
      <div className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">{title}</div>
      <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-200 list-disc list-inside">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
