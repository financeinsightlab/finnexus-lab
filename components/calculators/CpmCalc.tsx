'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

/* PGDM Lab — Critical Path Simulator (CPM, deterministic)
   Matches lecture: PGDM 301 Unit 5 · PERT & CPM */

interface Act {
  id: string;
  from: number;
  to: number;
  dur: number;
}

const DEFAULT_ACTS: Act[] = [
  { id: 'A', from: 1, to: 2, dur: 4 },
  { id: 'B', from: 1, to: 3, dur: 5 },
  { id: 'C', from: 2, to: 4, dur: 6 },
  { id: 'D', from: 3, to: 5, dur: 3 },
  { id: 'E', from: 3, to: 4, dur: 0 }, // dummy
  { id: 'F', from: 4, to: 6, dur: 7 },
  { id: 'G', from: 5, to: 6, dur: 4 },
];

const inp =
  'w-14 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white text-sm font-mono text-center focus:outline-none focus:border-teal-500/50';

export default function CpmCalc() {
  const [acts, setActs] = useState<Act[]>(DEFAULT_ACTS);

  const result = useMemo(() => {
    const nodes = Array.from(new Set(acts.flatMap((a) => [a.from, a.to]))).sort((a, b) => a - b);
    const es = new Map<number, number>();
    for (const n of nodes) es.set(n, 0);
    // forward pass (nodes in topo order = numeric order for AOA)
    for (const n of nodes) {
      for (const a of acts) {
        if (a.to === n) es.set(n, Math.max(es.get(n) ?? 0, (es.get(a.from) ?? 0) + a.dur));
      }
    }
    const projectEnd = Math.max(...nodes.map((n) => es.get(n) ?? 0));
    const lf = new Map<number, number>();
    for (const n of nodes) lf.set(n, projectEnd);
    // backward pass
    for (const n of [...nodes].reverse()) {
      for (const a of acts) {
        if (a.from === n) lf.set(n, Math.min(lf.get(n) ?? projectEnd, (lf.get(a.to) ?? projectEnd) - a.dur));
      }
    }
    const rows = acts.map((a) => {
      const esA = es.get(a.from) ?? 0;
      const ef = esA + a.dur;
      const lfA = lf.get(a.to) ?? projectEnd;
      const ls = lfA - a.dur;
      const tf = ls - esA;
      return { ...a, es: esA, ef, ls, lf: lfA, tf };
    });
    const critical = rows.filter((r) => r.tf === 0 && r.dur > 0).map((r) => r.id);
    return { rows, projectEnd, critical };
  }, [acts]);

  const setDur = (i: number, v: number) =>
    setActs((prev) => prev.map((a, j) => (j === i ? { ...a, dur: Number.isFinite(v) ? v : 0 } : a)));

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="text-center space-y-2">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-teal-300 bg-teal-500/10 border border-teal-500/25 rounded-full px-3 py-1">
          PGDM Lab · 301 Unit 5
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Critical Path Simulator (CPM)</h1>
        <p className="text-sm text-gray-400">
          Edit durations of the lecture network (with dummy E) — ES/EF/LS/LF, floats and the critical path
          recompute live. Companion to{' '}
          <Link href="/pgdm/project-management/pert-cpm-scheduling" className="text-teal-300 hover:underline">
            PERT & CPM lecture
          </Link>
          .
        </p>
      </div>

      {/* network */}
      <div className="rounded-2xl border border-white/10 bg-cinema-charcoal/60 p-5">
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-sm">
          {result.rows.map((r) => (
            <span
              key={r.id}
              className={`rounded-xl px-3 py-2 border ${
                r.tf === 0 && r.dur > 0
                  ? 'border-teal-500/50 bg-teal-500/10 text-teal-300 font-bold'
                  : r.dur === 0
                    ? 'border-white/10 bg-white/[0.03] text-gray-500'
                    : 'border-white/10 bg-white/[0.04] text-gray-300'
              }`}
              title={`ES ${r.es} · EF ${r.ef} · LS ${r.ls} · LF ${r.lf} · TF ${r.tf}`}
            >
              {r.from} →<span className="mx-1">{r.id}</span>→ {r.to} · {r.dur}
              {r.dur === 0 ? ' (dummy)' : ''}
            </span>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-teal-500/[0.07] border border-teal-500/25 px-4 py-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-teal-300">Critical path & project duration</p>
          <p className="text-xl font-mono font-extrabold text-white mt-1">
            {result.critical.join(' → ')} = {result.projectEnd} days
          </p>
        </div>
      </div>

      {/* durations editor */}
      <div className="rounded-2xl border border-white/10 bg-cinema-charcoal/60 p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Durations (days) — edit live</p>
        <div className="flex flex-wrap gap-3">
          {acts.map((a, i) => (
            <div key={a.id} className="flex items-center gap-1.5">
              <span className={`text-xs font-mono ${a.dur === 0 ? 'text-gray-600' : 'text-gray-300'}`}>{a.id}</span>
              <input
                type="number" min={0} step={1} value={a.dur}
                onChange={(e) => setDur(i, parseInt(e.target.value))}
                className={inp}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => setActs(DEFAULT_ACTS)}
          className="mt-4 text-[11px] font-bold text-gray-400 hover:text-teal-300 border border-white/10 hover:border-teal-500/40 rounded-lg px-3 py-1.5 transition-colors"
        >
          Reset to lecture example
        </button>
      </div>

      {/* full table */}
      <div className="rounded-2xl border border-white/10 bg-cinema-charcoal/60 p-5 overflow-x-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Schedule table</p>
        <table className="w-full text-[12.5px] font-mono">
          <thead>
            <tr className="text-gray-500 text-left">
              <th className="pb-2 pr-3">Act</th><th className="pb-2 pr-3">Node</th><th className="pb-2 pr-3">Dur</th>
              <th className="pb-2 pr-3">ES</th><th className="pb-2 pr-3">EF</th><th className="pb-2 pr-3">LS</th>
              <th className="pb-2 pr-3">LF</th><th className="pb-2 pr-3">TF</th><th className="pb-2">Path</th>
            </tr>
          </thead>
          <tbody>
            {result.rows.map((r) => (
              <tr key={r.id} className={`border-t border-white/5 ${r.tf === 0 && r.dur > 0 ? 'text-teal-300' : 'text-gray-300'}`}>
                <td className="py-1.5 pr-3 font-bold">{r.id}{r.dur === 0 ? ' ᵈ' : ''}</td>
                <td className="pr-3">{r.from}→{r.to}</td>
                <td className="pr-3">{r.dur}</td>
                <td className="pr-3">{r.es}</td><td className="pr-3">{r.ef}</td>
                <td className="pr-3">{r.ls}</td><td className="pr-3">{r.lf}</td>
                <td className="pr-3">{r.tf}</td>
                <td>{r.tf === 0 && r.dur > 0 ? 'CRITICAL' : 'slack ' + r.tf}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[11px] text-gray-500 mt-3">
          TF = LS − ES. Zero-float activities form the critical path — try making C shorter than B+D and watch the path jump.
        </p>
      </div>
    </div>
  );
}
