export function MentorNote() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border border-amber-200 p-5 mb-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="text-3xl">🧑‍🏫</div>
        <div>
          <div className="font-bold text-slate-800 mb-1">A note from your Mentor, Sumit 👋</div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Bhai, I've designed this 60-day plan based on what you told me — <b>Finance major, Analytics minor, weak in English, and aiming 15 LPA+</b>.
            Here's what matters:
          </p>
          <ul className="mt-2 text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li><b>Every day = English practice</b> (your biggest gap — fix this, salary jumps 2-3 LPA).</li>
            <li><b>Finance daily</b> — depth matters. Equity Research / IB roles pay 15-25 LPA, but they grill on basics.</li>
            <li><b>Analytics every 2nd day</b> — SQL + Excel + Power BI = your differentiator. Most finance folks don't have this.</li>
            <li><b>Every Sunday = Mock Test</b> — score yourself honestly. Track in the dashboard.</li>
            <li><b>Last 20 days = Mock Interviews</b> — practice till boring. Confidence comes from reps.</li>
          </ul>
          <p className="text-sm text-slate-700 mt-2 italic">
            "It is not days in your life but life in your days that count." — keep this energy 🔥
          </p>
        </div>
      </div>
    </div>
  );
}
