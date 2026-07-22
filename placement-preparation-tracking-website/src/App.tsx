import { useEffect, useMemo, useState } from "react";
import { PLAN, Category, CATEGORY_META } from "./data/plan";
import { StatsCards } from "./components/StatsCards";
import { DayCard } from "./components/DayCard";
import { MentorNote } from "./components/MentorNote";
import { LearningMaterial } from "./components/LearningMaterial";
import { GlobalNotes } from "./components/GlobalNotes";
import { DayQuote } from "./components/DayQuote";
import { PortfolioLab } from "./components/PortfolioLab";

const STORAGE_KEY = "sumit-placement-prep-v1";
const START_DATE_KEY = "sumit-prep-start-date";
const TAB_KEY = "sumit-tab";

type Saved = {
  completed: string[];
  currentDay: number;
};

function loadSaved(): Saved {
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

export default function App() {
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => new Set(loadSaved().completed));
  const [currentDay, setCurrentDay] = useState<number>(() => loadSaved().currentDay);
  const [filter, setFilter] = useState<Category | "All">("All");
  const [viewMode, setViewMode] = useState<"today" | "week" | "all">("today");
  const [tab, setTab] = useState<"tracker" | "learn" | "portfolio">(() => (localStorage.getItem(TAB_KEY) as "tracker" | "learn" | "portfolio") || "tracker");
  const [learnCat, setLearnCat] = useState<string>("All");
  const [startDate] = useState<string>(() => {
    let d = localStorage.getItem(START_DATE_KEY);
    if (!d) {
      d = new Date().toISOString().split("T")[0];
      localStorage.setItem(START_DATE_KEY, d);
    }
    return d;
  });

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
    const s = new Date(startDate);
    s.setDate(s.getDate() + 60);
    return s.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }, [startDate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-50">
      <header className="bg-gradient-to-r from-slate-900 via-violet-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="text-xs uppercase tracking-widest text-violet-300 font-semibold">PGDM Placement Tracker</div>
              <h1 className="text-3xl sm:text-4xl font-bold mt-1">
                🎯 Road to <span className="text-emerald-400">15 LPA+</span>
              </h1>
              <p className="text-sm text-slate-300 mt-2">
                60-day expert plan for <b className="text-white">Sumit Singh</b> • Finance (Major) + Business Analytics (Minor)
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Started: {new Date(startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} • Placement target: <b className="text-emerald-400">{placementDate}</b>
              </p>
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
                tab === "tracker" ? "bg-white text-violet-900 shadow-lg" : "text-white/90 hover:bg-white/10"
              }`}
            >
              📊 Daily Tracker
            </button>
            <button
              onClick={() => setTab("learn")}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition ${
                tab === "learn" ? "bg-white text-violet-900 shadow-lg" : "text-white/90 hover:bg-white/10"
              }`}
            >
              📚 Learning Material & Q&A
            </button>
            <button
              onClick={() => setTab("portfolio")}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition ${
                tab === "portfolio" ? "bg-white text-violet-900 shadow-lg" : "text-white/90 hover:bg-white/10"
              }`}
            >
              🚀 Portfolio Lab
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <GlobalNotes />
        {tab === "tracker" ? (
          <>
            <MentorNote />
            <DayQuote day={currentDay} />
            <StatsCards completedIds={completedIds} currentDay={currentDay} />

            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 mb-6">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Current Day</div>
                  <div className="text-2xl font-bold text-slate-800">Day {currentDay} of 60</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentDay((d) => Math.max(1, d - 1))}
                    disabled={currentDay === 1}
                    className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold"
                  >
                    ← Prev
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={currentDay}
                    onChange={(e) => setCurrentDay(Math.max(1, Math.min(60, Number(e.target.value) || 1)))}
                    className="w-16 text-center px-2 py-2 rounded-lg border border-slate-300 font-semibold"
                  />
                  <button
                    onClick={() => setCurrentDay((d) => Math.min(60, d + 1))}
                    disabled={currentDay === 60}
                    className="px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white disabled:opacity-40 text-sm font-semibold"
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
                        title={`Day ${d.day}: ${done}/${total} done`}
                        className={`flex-shrink-0 w-8 h-10 rounded-md text-[10px] font-bold transition-all flex items-center justify-center ${
                          isCurrent ? "ring-2 ring-violet-600 scale-110" : ""
                        } ${
                          allDone ? "bg-emerald-500 text-white"
                          : partial ? "bg-amber-300 text-amber-900"
                          : "bg-slate-200 text-slate-500 hover:bg-slate-300"
                        }`}
                      >
                        {d.day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
              <div className="inline-flex bg-white rounded-xl p-1 shadow-sm border border-slate-200">
                {(["today", "week", "all"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
                      viewMode === mode ? "bg-violet-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {mode === "today" ? "📍 Today" : mode === "week" ? "📅 This Week" : "🗓️ All 60 Days"}
                  </button>
                ))}
              </div>

              <div className="flex gap-1 flex-wrap">
                <button
                  onClick={() => setFilter("All")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    filter === "All" ? "bg-slate-800 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  All
                </button>
                {(Object.keys(CATEGORY_META) as Category[]).map((cat) => {
                  const meta = CATEGORY_META[cat];
                  const active = filter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                        active ? `${meta.bg} ${meta.color} ring-2 ${meta.ring}` : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <span>{meta.icon}</span> {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              {filteredDays.length === 0 ? (
                <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200">
                  No tasks for this filter. Try another category!
                </div>
              ) : (
                filteredDays.map((d) => (
                  <DayCard
                    key={d.day}
                    day={d}
                    completedIds={completedIds}
                    onToggle={toggleTask}
                    isToday={d.day === currentDay}
                  />
                ))
              )}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
                <div className="text-2xl">💡</div>
                <div className="font-bold text-slate-800 mt-2">Daily Habit Tip</div>
                <p className="text-sm text-slate-600 mt-1">
                  Wake up 1 hour earlier. Use that hour ONLY for English practice (read aloud + record yourself). This single change will transform your placements.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
                <div className="text-2xl">🎯</div>
                <div className="font-bold text-slate-800 mt-2">Target Roles (15 LPA+</div>
                <p className="text-sm text-slate-600 mt-1">
                  Equity Research Associate, Investment Banking Analyst, Risk Analyst, FP&A Analyst, Credit Analyst, Treasury Analyst, Business Analyst (BFSI).
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
                <div className="text-2xl">📚</div>
                <div className="font-bold text-slate-800 mt-2">All Learning Inside</div>
                <p className="text-sm text-slate-600 mt-1">
                  Switch to the 'Learning Material & Q&A' tab above for complete concepts, formulas, interview Q&A with answers, English scripts, SQL queries, and resume templates — no external sites needed.
                </p>
              </div>
            </div>
          </>
        ) : tab === "learn" ? (
          <>
            <div className="rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 text-white p-6 mb-6 shadow-lg">
              <div className="flex items-start gap-4 flex-wrap">
                <div className="text-5xl">📚</div>
                <div className="flex-1 min-w-[250px]">
                  <h2 className="text-2xl sm:text-3xl font-bold">Everything you need — in ONE place</h2>
                  <p className="text-sm text-white/90 mt-2 leading-relaxed max-w-3xl">
                    Full finance concepts, formula sheets, <b>interview questions with answers</b>, English scripts, SQL queries, Excel shortcuts, GD topics with points for/against, resume templates, and HR answers — all embedded.
                    No YouTube or other platforms. Read one module per day.
                  </p>
                  <div className="mt-3 inline-flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 bg-white/20 rounded-full font-semibold">✅ 12+ Finance modules with Q&A</span>
                    <span className="px-2.5 py-1 bg-white/20 rounded-full font-semibold">✅ 5 Analytics deep-dives</span>
                    <span className="px-2.5 py-1 bg-white/20 rounded-full font-semibold">✅ 4 English + GD guides</span>
                    <span className="px-2.5 py-1 bg-white/20 rounded-full font-semibold">✅ 50+ solved aptitude</span>
                    <span className="px-2.5 py-1 bg-white/20 rounded-full font-semibold">✅ Full resume + cover letter</span>
                  </div>
                </div>
              </div>
            </div>

            <LearningMaterial activeCategory={learnCat} setActiveCategory={setLearnCat} />
          </>
        ) : (
          <PortfolioLab />
        )}

        <div className="text-center text-xs text-slate-500 mt-8 pb-6">
          Built with ❤️ for Sumit Singh • Progress saved automatically in your browser • <b>Don't break the chain 🔥</b>
        </div>
      </main>
    </div>
  );
}
