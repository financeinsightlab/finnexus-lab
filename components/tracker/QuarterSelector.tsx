import Link from 'next/link';
import { QUARTERS, type QuarterRef } from '@/lib/trackerData';

interface Props {
  base: string;
  activeKey?: string;
}

export default function QuarterSelector({ base, activeKey }: Props) {
  const years = Array.from(new Set(QUARTERS.map((q) => q.year))).sort((a, b) => b - a);
  const pillBase = 'border-border bg-surface text-content-secondary hover:bg-surface-muted hover:text-content-primary';
  const pillActive = 'border-primary bg-primary text-primary-foreground shadow-lg shadow-brand/20';

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
                <span className={`text-[9px] font-bold uppercase tracking-wider ${active ? 'text-primary-foreground/80' : 'text-content-muted'}`}>
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
