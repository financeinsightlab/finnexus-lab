'use client';

import { useState, useEffect } from 'react';
import { PLAN, CATEGORY_META, type DayPlan, type Task } from '@/lib/placement-prep/plan';

interface Props {
  onSelectTopicForWarRoom?: (topicName: string) => void;
}

export default function StudyPlanView({ onSelectTopicForWarRoom }: Props) {
  const [selectedPhase, setSelectedPhase] = useState<'ALL' | 'Phase 1' | 'Phase 2' | 'Phase 3'>('ALL');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());

  // Load completed tasks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('placement_study_plan_completed_tasks');
      if (stored) {
        setCompletedTaskIds(new Set(JSON.parse(stored)));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      try {
        localStorage.setItem('placement_study_plan_completed_tasks', JSON.stringify([...next]));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const filteredDays = PLAN.filter((d) => {
    if (selectedPhase === 'ALL') return true;
    return d.phase.startsWith(selectedPhase);
  });

  const currentDayPlan: DayPlan = PLAN.find((d) => d.day === selectedDayNumber) || PLAN[0];

  // Calculate overall stats
  const totalTasks = PLAN.reduce((acc, d) => acc + d.tasks.length, 0);
  const completedCount = completedTaskIds.size;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="space-y-6 pt-2">
      {/* Top Header & Progress */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">60-Day Placement Preparation Roadmap</h2>
            <p className="text-sm text-slate-400">
              Structured daily curriculum engineered for PGDM / MBA Finance & Analytics students targeting 15+ LPA roles.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Total Progress</span>
              <span className="text-lg font-black text-amber-400 font-mono">
                {completedCount} <span className="text-xs text-slate-400 font-normal">/ {totalTasks} tasks ({progressPercent}%)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
            style={{ width: `${Math.max(2, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Phase Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'ALL', label: 'All 60 Days' },
          { id: 'Phase 1', label: 'Phase 1: Foundation (Day 1–20)' },
          { id: 'Phase 2', label: 'Phase 2: Depth + Analytics (Day 21–40)' },
          { id: 'Phase 3', label: 'Phase 3: Mock + Polish (Day 41–60)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedPhase(tab.id as any)}
            className={`text-xs font-semibold px-3.5 py-2 rounded-xl transition ${
              selectedPhase === tab.id
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 cols: Days Selector */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 max-h-[600px] overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
            Select Day ({filteredDays.length} Days)
          </div>
          {filteredDays.map((dp) => {
            const isSelected = dp.day === selectedDayNumber;
            const dayCompleted = dp.tasks.every((t) => completedTaskIds.has(t.id));
            const someCompleted = dp.tasks.some((t) => completedTaskIds.has(t.id));

            return (
              <button
                key={dp.day}
                onClick={() => setSelectedDayNumber(dp.day)}
                className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between border ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 text-white'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-950'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold font-mono ${isSelected ? 'text-amber-400' : 'text-slate-300'}`}>
                      Day {dp.day}
                    </span>
                    <span className="text-[10px] text-slate-500">Week {dp.week}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-300 truncate mt-0.5">
                    {dp.focus}
                  </div>
                </div>

                <span className="text-xs shrink-0">
                  {dayCompleted ? '✅' : someCompleted ? '⏳' : '○'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right 8 cols: Day Tasks & Details */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                  DAY {currentDayPlan.day}
                </span>
                <span className="text-xs text-slate-400">{currentDayPlan.phase}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{currentDayPlan.focus}</h3>
            </div>

            {onSelectTopicForWarRoom && (
              <button
                onClick={() => onSelectTopicForWarRoom(currentDayPlan.focus)}
                className="text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold hover:opacity-90 transition shadow-md"
              >
                Practice in War Room →
              </button>
            )}
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Today&apos;s Curriculum Checklist ({currentDayPlan.tasks.length} Modules):
            </h4>

            {currentDayPlan.tasks.map((task: Task) => {
              const isDone = completedTaskIds.has(task.id);
              const meta = CATEGORY_META[task.category] || {
                color: 'text-amber-400',
                bg: 'bg-amber-500/10',
                icon: '📌',
              };

              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-start gap-3.5 ${
                    isDone
                      ? 'bg-slate-950/30 border-slate-800/50 opacity-60'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => {}} // handled by parent onClick
                    className="mt-1 h-4 w-4 rounded accent-amber-500 cursor-pointer"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-white leading-snug">
                        {task.title}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${meta.bg} ${meta.color}`}>
                        {meta.icon} {task.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        ⏱ {task.minutes} min
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-2">
                      {task.detail}
                    </p>

                    {task.resource && (
                      <div className="text-[11px] text-amber-400/90 font-mono">
                        Source: {task.resource}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
