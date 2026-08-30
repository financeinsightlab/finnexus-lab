import Link from 'next/link';
import { SUBJECTS } from '@/lib/pgdm/curriculum';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search the PGDM curriculum | FinNexus Lab',
  description: 'Full-text search across every PGDM lecture — finance and analytics, all 14 subjects.',
};

interface Hit {
  subject: { slug: string; code: string; name: string };
  lecture: { slug: string; number: number; title: string };
  field: string;
  text: string;
}

function snippet(text: string, q: string, radius = 90): string {
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text.slice(0, radius * 2);
  const start = Math.max(0, i - radius);
  const end = Math.min(text.length, i + q.length + radius);
  return (start > 0 ? '…' : '') + text.slice(start, end).replace(/\*\*/g, '') + (end < text.length ? '…' : '');
}

function search(q: string): Hit[] {
  const needle = q.toLowerCase().trim();
  if (!needle) return [];
  const hits: Hit[] = [];
  for (const s of SUBJECTS) {
    const inSubjectName = `${s.code} ${s.name} ${s.tagline}`.toLowerCase().includes(needle);
    for (const l of s.lectures) {
      const fields: [string, string][] = [
        ['Lecture', `${l.title}. ${l.summary}`],
        ...l.sections.flatMap((sec, i) => [
          [`Unit ${i + 1} · ${sec.heading}`, sec.body.join(' ')] as [string, string],
          ...(sec.bullets ? [[`${sec.heading} — key points`, sec.bullets.join(' · ')] as [string, string]] : []),
        ]),
        ...(l.formulas ? l.formulas.map((f) => ['Formula', `${f.name}: ${f.expr} — ${f.meaning}`] as [string, string]) : []),
        ['Revision', l.revision.join(' · ')],
        ...l.practice.map((p) => ['Practice Q&A', `${p.q} — ${p.a}`] as [string, string]),
      ];
      for (const [field, text] of fields) {
        if (text.toLowerCase().includes(needle) || inSubjectName) {
          hits.push({
            subject: { slug: s.slug, code: s.code, name: s.name },
            lecture: { slug: l.slug, number: l.number, title: l.title },
            field,
            text: inSubjectName && !text.toLowerCase().includes(needle) ? l.summary : text,
          });
          break; // one hit per lecture keeps results readable
        }
      }
    }
  }
  return hits;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  const hits = search(q);

  const bySubject = hits.reduce<Record<string, Hit[]>>((acc, h) => {
    (acc[h.subject.slug] ??= []).push(h);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#0a1120] text-slate-100">
      <main className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <header className="space-y-3 text-center">
          <Link href="/pgdm" className="text-xs text-teal-300 hover:underline">← PGDM curriculum</Link>
          <h1 className="text-2xl md:text-3xl font-extrabold">Search all 14 subjects</h1>
          <p className="text-sm text-slate-400">
            Lectures, sections, formulas, revision notes and practice Q&A — one box.
          </p>
        </header>

        <form action="/pgdm/search" method="get" className="flex gap-2">
          <input
            name="q"
            defaultValue={q}
            placeholder="e.g. elasticity, VaR, entropy, DSCR, attribution, k-means…"
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50"
          />
          <button
            type="submit"
            className="rounded-xl border border-teal-500/30 bg-teal-500/10 px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-teal-300 hover:bg-teal-500/20 transition-colors"
          >
            Search
          </button>
        </form>

        {!q ? (
          <div className="text-center space-y-3">
            <p className="text-sm text-slate-400">Try one of these:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['WACC', 'elasticity', 'VaR', 'entropy', 'attribution', 'DSCR', 'ARIMA', 'DuPont', 'CLV', 'CRR'].map((t) => (
                <Link
                  key={t}
                  href={`/pgdm/search?q=${encodeURIComponent(t)}`}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:border-teal-500/40 hover:text-teal-300 transition-colors"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-xs text-slate-500">
              {hits.length === 0
                ? 'No matches — try a broader term (e.g. "cost of capital" instead of "ke").'
                : `${hits.length} lecture${hits.length === 1 ? '' : 's'} match “${q}” across ${Object.keys(bySubject).length} subject${Object.keys(bySubject).length === 1 ? '' : 's'}.`}
            </p>
            {Object.entries(bySubject).map(([slug, list]) => (
              <section key={slug} className="space-y-3">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-teal-300">
                  {list[0].subject.code} · {list[0].subject.name}
                </h2>
                {list.map((h, i) => (
                  <Link
                    key={i}
                    href={`/pgdm/${h.subject.slug}/${h.lecture.slug}`}
                    className="block rounded-xl border border-white/8 bg-white/[0.02] p-4 hover:border-teal-500/30 transition-colors"
                  >
                    <p className="text-sm font-semibold text-white">
                      Lecture {h.lecture.number} — {h.lecture.title}
                      <span className="ml-2 text-[9px] font-bold uppercase tracking-widest text-violet-300">{h.field}</span>
                    </p>
                    <p className="text-[13px] text-slate-400 mt-1 leading-relaxed">{snippet(h.text, q)}</p>
                  </Link>
                ))}
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
