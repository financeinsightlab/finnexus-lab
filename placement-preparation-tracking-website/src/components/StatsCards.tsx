import { CATEGORY_META, Category, PLAN, TOTAL_TASKS } from "../data/plan";

type Props = {
  completedIds: Set<string>;
  currentDay: number;
};

export function StatsCards({ completedIds, currentDay }: Props) {
  const completed = completedIds.size;
  const percent = Math.round((completed / TOTAL_TASKS) * 100);

  // Tasks expected by today
  const expectedByToday = PLAN.slice(0, currentDay).reduce((s, d) => s + d.tasks.length, 0);
  const onTrack = completed >= expectedByToday;

  // Category breakdown
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

  // Streak: count consecutive completed days from Day 1
  let streak = 0;
  for (let i = 0; i < PLAN.length; i++) {
    const day = PLAN[i];
    const allDone = day.tasks.every((tk) => completedIds.has(tk.id));
    if (allDone) streak++;
    else break;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-5 shadow-lg">
        <div className="text-xs uppercase tracking-wider opacity-80">Overall Progress</div>
        <div className="text-4xl font-bold mt-1">{percent}%</div>
        <div className="text-sm mt-1 opacity-90">{completed} / {TOTAL_TASKS} tasks</div>
        <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className={`rounded-2xl p-5 shadow-lg text-white ${onTrack ? "bg-gradient-to-br from-emerald-500 to-teal-600" : "bg-gradient-to-br from-orange-500 to-rose-600"}`}>
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
        <div className="text-sm mt-2 opacity-95">Goal: <span className="font-bold text-emerald-300">15 LPA+</span></div>
        <div className="text-xs mt-1 opacity-70">You got this, Sumit 💪</div>
      </div>

      {/* Category breakdown - full width */}
      <div className="sm:col-span-2 lg:col-span-4 rounded-2xl bg-white p-5 shadow-md border border-slate-200">
        <div className="text-sm font-semibold text-slate-700 mb-3">📚 Category-wise Progress</div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(catCount) as Category[]).map((cat) => {
            const { done, total } = catCount[cat];
            const pct = total ? Math.round((done / total) * 100) : 0;
            const meta = CATEGORY_META[cat];
            return (
              <div key={cat} className={`rounded-xl p-3 ${meta.bg}`}>
                <div className="flex items-center justify-between mb-1">
                  <div className={`text-sm font-semibold ${meta.color} flex items-center gap-1`}>
                    <span>{meta.icon}</span> {cat}
                  </div>
                  <div className={`text-xs font-bold ${meta.color}`}>{done}/{total}</div>
                </div>
                <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${meta.color.replace("text-", "bg-")}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
