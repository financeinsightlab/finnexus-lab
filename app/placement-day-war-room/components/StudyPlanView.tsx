'use client';

import { useState, useEffect } from 'react';
import { PLAN, CATEGORY_META, type DayPlan, type Task } from '@/lib/placement-prep/plan';

interface Props {
  onSelectTopicForWarRoom?: (topicName: string) => void;
}

type DurationSprint = 7 | 15 | 30 | 60;

export default function StudyPlanView({ onSelectTopicForWarRoom }: Props) {
  const [selectedDuration, setSelectedDuration] = useState<DurationSprint>(60);
  const [selectedPhase, setSelectedPhase] = useState<'ALL' | 'Phase 1' | 'Phase 2' | 'Phase 3'>('ALL');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());

  // Load completed tasks from localStorage on mount
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

  const toggleTask = async (taskId: string) => {
    const next = new Set(completedTaskIds);
    const isNowDone = !next.has(taskId);
    if (isNowDone) next.add(taskId);
    else next.delete(taskId);

    setCompletedTaskIds(next);
    try {
      localStorage.setItem('placement_study_plan_completed_tasks', JSON.stringify([...next]));
      // Try syncing with API in the background if logged in
      fetch(`/api/placement-war-room/study-plan/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: isNowDone }),
      }).catch(() => {
        // Fallback silently to localStorage
      });
    } catch {
      // ignore
    }
  };

  // Slice PLAN according to selected duration
  const durationPlan = PLAN.slice(0, selectedDuration);

  const filteredDays = durationPlan.filter((d) => {
    if (selectedPhase === 'ALL') return true;
    return d.phase.startsWith(selectedPhase);
  });

  const currentDayPlan: DayPlan = durationPlan.find((d) => d.day === selectedDayNumber) || durationPlan[0] || PLAN[0];

  // Calculate overall stats for the selected duration
  const totalTasks = durationPlan.reduce((acc, d) => acc + d.tasks.length, 0);
  const completedCount = durationPlan.reduce(
    (acc, d) => acc + d.tasks.filter((t) => completedTaskIds.has(t.id)).length,
    0
  );
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6 pt-2">
      {/* Top Header & Progress */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                ADAPTIVE ROADMAP
              </span>
              <span className="text-xs text-slate-400">Institutional Curriculum</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">
              Finance & Analytics Placement Curriculum
            </h2>
            <p className="text-sm text-slate-400">
              Targeting IIM / top-tier PGDM 15+ LPA roles in Investment Banking, Equity Research, and Corporate Finance.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Sprint Progress</span>
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

      {/* Duration Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold mr-1">Sprint Horizon:</span>
          {([
            { days: 7, label: '7-Day Sprint' },
            { days: 15, label: '15-Day Fast-Track' },
            { days: 30, label: '30-Day Intensive' },
            { days: 60, label: '60-Day Master Roadmap' },
          ] as const).map((sprint) => (
            <button
              key={sprint.days}
              onClick={() => {
                setSelectedDuration(sprint.days);
                if (selectedDayNumber > sprint.days) setSelectedDayNumber(1);
              }}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition ${
                selectedDuration === sprint.days
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {sprint.label}
            </button>
          ))}
        </div>

        {/* Phase Filter Tabs (visible when 60 or 30 days) */}
        {selectedDuration >= 30 && (
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'ALL', label: 'All Phases' },
              { id: 'Phase 1', label: 'Phase 1: Foundation' },
              { id: 'Phase 2', label: 'Phase 2: Depth' },
              { id: 'Phase 3', label: 'Phase 3: Mocks' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedPhase(tab.id as any)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition ${
                  selectedPhase === tab.id
                    ? 'bg-slate-800 text-amber-400 border border-amber-500/30'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 cols: Days Selector */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 max-h-[600px] overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2 flex justify-between items-center">
            <span>Select Day ({filteredDays.length} Days)</span>
            <span className="font-mono text-amber-400 text-[11px]">{selectedDuration}D Plan</span>
          </div>
          {filteredDays.map((dp) => {
            const isSelected = dp.day === selectedDayNumber;
            const dayCompleted = dp.tasks.length > 0 && dp.tasks.every((t) => completedTaskIds.has(t.id));
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
                  DAY {currentDayPlan.day} OF {selectedDuration}
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
