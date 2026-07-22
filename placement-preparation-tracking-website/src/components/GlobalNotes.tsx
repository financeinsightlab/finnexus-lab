import { useEffect, useState } from "react";

const GLOBAL_NOTES_KEY = "sumit-global-brain-dump-v1";

export function GlobalNotes() {
  const [notes, setNotes] = useState(() => localStorage.getItem(GLOBAL_NOTES_KEY) || "");

  useEffect(() => {
    localStorage.setItem(GLOBAL_NOTES_KEY, notes);
  }, [notes]);

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">Quick Brain Dump</div>
          <div className="font-bold text-slate-800">Write any thought, idea, doubt, company name, or interview point here</div>
        </div>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
          Auto-saved in this browser
        </span>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Example: Need to add HDFC Bank stock pitch to portfolio. Ask mentor about DCF assumptions. Revise NPA and CASA before banking interview..."
        className="w-full min-h-40 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 resize-y"
      />
      <div className="text-[11px] text-slate-500 mt-2">
        This note is separate from task completion. Resetting progress will not clear this note.
      </div>
    </div>
  );
}