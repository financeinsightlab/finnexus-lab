import Link from 'next/link';
import { QUARTERS, type QuarterRef } from '@/lib/trackerData';

interface Props {
  base: string;
  activeKey?: string;
  light?: boolean;
}

export default function QuarterSelector({ base, activeKey, light = false }: Props) {
  const years = Array.from(new Set(QUARTERS.map((q) => q.year))).sort((a, b) => b - a);
  const pillBase = light
    ? 'border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white'
    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white';
  const pillActive = light
    ? 'border-teal-400 bg-teal-500/90 text-white shadow-lg shadow-teal-500/20'
    : 'border-transparent bg-teal-600 text-white shadow-lg shadow-teal-600/20 dark:bg-teal-600';

  return (
    <div className="flex flex-wrap items-center gap-2">
      {years.map((year) => (
        <div key={year} className="flex flex-wrap items-center gap-1.5">
          {QUARTERS.filter((q) => q.year === year).map((q: QuarterRef) => {
            const active = q.key === activeKey;
            return (
              <Link key={q.key} href={`${base}?q=${q.key}`} scroll={false}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all ${active ? pillActive : pillBase}`}>
                {q.label}
                <span className={`text-[9px] font-bold uppercase tracking-wider ${active ? 'text-white/80' : light ? 'text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}>
                  {q.kind === 'Actual' ? 'actual' : 'proj'}
                </span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
