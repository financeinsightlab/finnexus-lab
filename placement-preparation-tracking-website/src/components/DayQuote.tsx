import { getDayQuote } from "../data/dayQuotes";

export function DayQuote({ day }: { day: number }) {
  const q = getDayQuote(day);

  const copyQuote = async () => {
    const text = `${q.quote}\n\n${q.caption} | Road to 15 LPA+`;
    try {
      await navigator.clipboard.writeText(text);
      alert("Quote copied. You can upload/post it now.");
    } catch {
      alert(text);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-violet-900 to-indigo-900 text-white p-5 mb-6 shadow-lg border border-white/10">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-[250px]">
          <div className="text-xs uppercase tracking-widest text-violet-300 font-bold">Unique Quote for Day {day}</div>
          <div className="text-xl sm:text-2xl font-bold mt-2 leading-snug">"{q.quote}"</div>
          <div className="text-sm text-white/75 mt-2">{q.caption}</div>
        </div>
        <button
          onClick={copyQuote}
          className="text-xs font-bold px-3 py-2 rounded-xl bg-white text-violet-900 hover:bg-violet-100 transition shadow-sm"
        >
          Copy for upload
        </button>
      </div>
    </div>
  );
}