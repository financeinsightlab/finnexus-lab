import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSubject } from '@/lib/pgdm/curriculum';
import PrintButton from '@/components/pgdm/PrintButton';
import JsonLd from '@/components/seo/JsonLd';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ subject: string }>;
}

export async function generateStaticParams() {
  const { SUBJECTS } = await import('@/lib/pgdm/curriculum');
  return SUBJECTS.map((s) => ({ subject: s.slug }));
}

const titleCap = (parts: string, max = 62) => {
  if (parts.length <= max) return parts;
  const cut = parts.slice(0, max);
  const sp = cut.lastIndexOf(' ');
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).replace(/[ —|:-]+$/, '');
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject: slug } = await params;
  const subject = getSubject(slug);
  if (!subject) return {};
  return {
    title: { absolute: titleCap(`${subject.code} Cheat Sheet — Formulas & Revision`) },
    description: `Every formula and exam revision note from ${subject.code} ${subject.name} on one page — print or save as PDF for revision.`.slice(0, 158),
  };
}

export default async function CheatSheetPage({ params }: PageProps) {
  const { subject: slug } = await params;
  const subject = getSubject(slug);
  if (!subject) notFound();

  const lectures = subject.lectures.filter((l) => l.status === 'live');

  const BASE = 'https://kunwaranalytics.in';
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: `${subject.code} Cheat Sheet — Formulas & Revision`,
      description: `One-page exam cheat sheet for ${subject.code} ${subject.name}: all lecture formulas and revision notes.`,
      url: `${BASE}/pgdm/${subject.slug}/cheatsheet`,
      learningResourceType: 'Study guide',
      isAccessibleForFree: true,
      isPartOf: { '@type': 'Course', name: `${subject.code} — ${subject.name}`, url: `${BASE}/pgdm/${subject.slug}` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'PGDM', item: `${BASE}/pgdm` },
        { '@type': 'ListItem', position: 2, name: subject.name, item: `${BASE}/pgdm/${subject.slug}` },
        { '@type': 'ListItem', position: 3, name: 'Cheat Sheet', item: `${BASE}/pgdm/${subject.slug}/cheatsheet` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a1120] text-slate-100">
      <JsonLd data={schemas} />
      {/* print overrides: force light-on-white, full width */}
      <style>{`@media print {
        .cheat, .cheat * { color: #0f172a !important; background: #ffffff !important; border-color: #cbd5e1 !important; box-shadow: none !important; }
        .cheat .print-hide { display: none !important; }
        .cheat main { padding: 0 !important; max-width: 100% !important; }
        .cheat section, .cheat .no-break { break-inside: avoid; }
      }`}</style>

      <div className="cheat">
        <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
          <header className="space-y-3">
            <div className="print-hide">
              <Link href={`/pgdm/${subject.slug}`} className="text-xs text-teal-300 hover:underline">
                ← {subject.code} · {subject.name}
              </Link>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold">
              {subject.code} Cheat Sheet
            </h1>
            <p className="text-sm text-slate-400">
              Every formula and exam revision note from {lectures.length} lectures on one page — sorted per unit.
              Use <strong>Print / Save as PDF</strong> for a downloadable copy.
            </p>
            <div className="print-hide">
              <PrintButton />
            </div>
          </header>

          {subject.units.map((u, i) => {
            const lec = lectures[i];
            const title = u.split('—')[1]?.split(':')[0]?.trim() || `Unit ${i + 1}`;
            return (
              <section key={i} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-teal-300 mb-1">
                  Unit {i + 1} · {title}
                </p>
                <h2 className="text-lg font-bold mb-3 no-break">
                  {lec ? lec.title : 'Lecture in progress'}
                </h2>

                {lec?.formulas && lec.formulas.length > 0 && (
                  <div className="mb-4 overflow-x-auto">
                    <table className="w-full text-[13px]">
                      <thead>
                        <tr className="text-left text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/10">
                          <th className="py-1.5 pr-3">Formula</th>
                          <th className="py-1.5 pr-3">Expression</th>
                          <th className="py-1.5">Meaning</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lec.formulas.map((f, j) => (
                          <tr key={j} className="border-b border-white/5 align-top">
                            <td className="py-1.5 pr-3 font-semibold whitespace-nowrap">{f.name}</td>
                            <td className="py-1.5 pr-3 font-mono text-teal-300 whitespace-nowrap">{f.expr}</td>
                            <td className="py-1.5 text-slate-400">{f.meaning}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {lec?.revision && lec.revision.length > 0 && (
                  <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-1.5 text-[13px] text-slate-300">
                    {lec.revision.map((r, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-teal-400 font-mono text-[10px] pt-1">▪</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="print-hide mt-3">
                  <Link href={`/pgdm/${subject.slug}/${lec?.slug ?? ''}`} className="text-xs text-teal-300 hover:underline">
                    Read the full lecture →
                  </Link>
                </p>
              </section>
            );
          })}

          {/* Promotion slot: CONTENT_BOTTOM (hidden when printing) */}
          <div className="print-hide">
            <PromotionSlot slot="CONTENT_BOTTOM" path={`/pgdm/${subject.slug}/cheatsheet`} tags={[subject.track]} className="w-full" />
          </div>

          <footer className="print-hide text-center text-xs text-slate-500">
            <Link href="/pgdm" className="hover:text-teal-300">All subjects</Link> ·{' '}
            <Link href={`/pgdm/${subject.slug}`} className="hover:text-teal-300">Subject page</Link> ·{' '}
            <Link href="/tools" className="hover:text-teal-300">Calculators</Link>
          </footer>
        </main>
      </div>
    </div>
  );
}
