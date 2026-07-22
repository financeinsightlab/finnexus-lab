import { useEffect, useState } from "react";
import { CATEGORY_META, DayPlan } from "../data/plan";
import { getTaskContent } from "../data/taskContent";

type Props = {
  day: DayPlan;
  completedIds: Set<string>;
  onToggle: (id: string) => void;
  isToday: boolean;
};

export function DayCard({ day, completedIds, onToggle, isToday }: Props) {
  const doneCount = day.tasks.filter((t) => completedIds.has(t.id)).length;
  const total = day.tasks.length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;
  const allDone = doneCount === total;
  const totalMin = day.tasks.reduce((s, t) => s + t.minutes, 0);

  return (
    <div
      className={`rounded-2xl border bg-white shadow-sm overflow-hidden transition-all ${
        isToday ? "border-violet-400 ring-2 ring-violet-200" : "border-slate-200"
      } ${allDone ? "opacity-80" : ""}`}
    >
      <div className={`px-5 py-4 ${isToday ? "bg-gradient-to-r from-violet-50 to-indigo-50" : "bg-slate-50"} border-b border-slate-200`}>
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-bold text-white ${
                isToday ? "bg-violet-600" : allDone ? "bg-emerald-500" : "bg-slate-400"
              }`}>
                {allDone ? "✓" : day.day}
              </span>
              <div>
                <div className="font-bold text-slate-800">Day {day.day} — Week {day.week}</div>
                <div className="text-xs text-slate-500">{day.phase} • ⏱ ~{Math.round((totalMin / 60) * 10) / 10} hrs</div>
              </div>
              {isToday && (
                <span className="text-[10px] uppercase font-bold tracking-wider bg-violet-600 text-white px-2 py-1 rounded-full">Today</span>
              )}
              {allDone && !isToday && (
                <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500 text-white px-2 py-1 rounded-full">Done</span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-slate-700">{doneCount}/{total}</div>
            <div className="text-xs text-slate-500">{pct}%</div>
          </div>
        </div>
        <div className="mt-3 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${allDone ? "bg-emerald-500" : "bg-violet-500"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="p-4 space-y-3">
        {day.tasks.map((task) => (
          <TaskCard key={task.id} task={task} completed={completedIds.has(task.id)} onToggle={() => onToggle(task.id)} />
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task, completed, onToggle }: { task: import("../data/plan").Task; completed: boolean; onToggle: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const noteKey = `sumit-task-note-${task.id}`;
  const [taskNote, setTaskNote] = useState(() => localStorage.getItem(noteKey) || "");
  const meta = CATEGORY_META[task.category];
  const content = getTaskContent(task.title);

  useEffect(() => {
    localStorage.setItem(noteKey, taskNote);
  }, [noteKey, taskNote]);

  return (
    <div className={`rounded-xl border overflow-hidden transition-all ${completed ? "bg-slate-50 border-slate-200" : "bg-white border-slate-200 hover:border-violet-300 hover:shadow-sm"}`}>
      <div className="flex items-start gap-3 p-3">
        <label className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
          <input
            type="checkbox"
            checked={completed}
            onChange={onToggle}
            className="w-5 h-5 rounded accent-violet-600 cursor-pointer"
          />
        </label>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
              {meta.icon} {task.category}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">⏱ {task.minutes} min</span>
          </div>
          <div className={`font-bold text-sm ${completed ? "line-through text-slate-400" : "text-slate-800"}`}>
            {task.title}
          </div>
          <div className={`text-xs mt-0.5 ${completed ? "text-slate-400" : "text-slate-600"}`}>
            {task.detail}
          </div>
          {task.resource && (
            <div className="text-[11px] text-violet-600 mt-1 font-medium">
              📖 Resource: {task.resource}
            </div>
          )}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 text-[11px] text-violet-700 bg-violet-50 hover:bg-violet-100 font-bold px-2.5 py-1 rounded-lg border border-violet-200 transition"
          >
            {expanded ? "▲ Hide Study Material & Sources" : "▼ Show Study Material & Sources"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-violet-200 bg-gradient-to-br from-violet-50 via-white to-white p-4 space-y-4">
          <Section label="💡 Concept" color="sky">
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{content.concept}</p>
          </Section>

          {content.formulas && (
            <Section label="🧮 Key Formulas" color="emerald">
              <pre className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap bg-emerald-50/60 p-3 rounded-lg border border-emerald-200 font-sans">{content.formulas}</pre>
            </Section>
          )}

          {content.qa && content.qa.length > 0 && (
            <Section label="❓ Practice Questions with Answers" color="amber">
              <div className="space-y-2">
                {content.qa.map((item, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 overflow-hidden bg-white">
                    <div className="px-3 py-2 bg-amber-50 text-sm font-bold text-amber-900">
                      {item.q}
                    </div>
                    <div className="px-3 py-2.5 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap border-t border-amber-100">
                      <span className="inline-block px-1.5 py-0.5 text-[10px] uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded font-bold mr-2 mb-1">Answer</span>
                      <div>{item.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          <Section label="🎯 Practical Tip / Exercise" color="rose">
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{content.practicalTip}</p>
          </Section>

          <Section label="📝 My Notes for This Task" color="slate">
            <textarea
              value={taskNote}
              onChange={(e) => setTaskNote(e.target.value)}
              placeholder="Write your personal notes, doubts, formulas, solved mistakes, interview points, or project ideas for this task. These notes auto-save and will not be deleted when you close the browser."
              className="w-full min-h-36 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 resize-y"
            />
            <div className="text-[11px] text-slate-500 mt-2">Auto-saved locally in your browser under this exact task.</div>
          </Section>

          <Section label="📚 Best Free Sources to Learn More" color="indigo">
            <div className="space-y-2">
              {content.sources.map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 bg-indigo-50/60 rounded-lg border border-indigo-200">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-indigo-900">{s.name}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{s.note}</div>
                    {s.url && (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-indigo-700 hover:text-indigo-900 hover:underline mt-1 inline-block break-all font-medium"
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

function Section({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  const bgMap: Record<string, string> = {
    sky: "border-sky-200",
    emerald: "border-emerald-200",
    amber: "border-amber-200",
    rose: "border-rose-200",
    indigo: "border-indigo-200",
    slate: "border-slate-200",
  };
  const textMap: Record<string, string> = {
    sky: "text-sky-700 bg-sky-100 border-sky-200",
    emerald: "text-emerald-700 bg-emerald-100 border-emerald-200",
    amber: "text-amber-700 bg-amber-100 border-amber-200",
    rose: "text-rose-700 bg-rose-100 border-rose-200",
    indigo: "text-indigo-700 bg-indigo-100 border-indigo-200",
    slate: "text-slate-700 bg-slate-100 border-slate-200",
  };
  return (
    <div className={`rounded-xl border ${bgMap[color] ?? "border-slate-200"} bg-white overflow-hidden`}>
      <div className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-bold border-b ${textMap[color] ?? "text-slate-700 bg-slate-100 border-slate-200"}`}>
        {label}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}
