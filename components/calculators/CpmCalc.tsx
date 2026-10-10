'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

/* PGDM Lab — Critical Path Simulator (CPM + PERT, deterministic + probabilistic)
   Matches lecture: PGDM 301 Unit 5 · PERT & CPM
   
   CPM: deterministic durations; ES/EF/LS/LF via forward+backward pass; TF = LS−ES
   PERT: expected duration te = (o + 4m + p) / 6; variance σ² = ((p−o)/6)²
*/

interface Act {
  id: string;
  from: number;
  to: number;
  dur: number;
  // PERT fields (optional)
  optimistic?: number;
  mostLikely?: number;
  pessimistic?: number;
}

const DEFAULT_ACTS: Act[] = [
  { id: 'A', from: 1, to: 2, dur: 4,  optimistic: 2, mostLikely: 4,  pessimistic: 8  },
  { id: 'B', from: 1, to: 3, dur: 5,  optimistic: 3, mostLikely: 5,  pessimistic: 9  },
  { id: 'C', from: 2, to: 4, dur: 6,  optimistic: 4, mostLikely: 6,  pessimistic: 10 },
  { id: 'D', from: 3, to: 5, dur: 3,  optimistic: 2, mostLikely: 3,  pessimistic: 6  },
  { id: 'E', from: 3, to: 4, dur: 0 }, // dummy
  { id: 'F', from: 4, to: 6, dur: 7,  optimistic: 5, mostLikely: 7,  pessimistic: 12 },
  { id: 'G', from: 5, to: 6, dur: 4,  optimistic: 2, mostLikely: 4,  pessimistic: 7  },
];

const inp =
  'w-14 bg-surface border border-border rounded-lg px-2 py-1.5 text-content-primary text-sm font-mono text-center focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20';

export default function CpmCalc() {
  const [acts, setActs] = useState<Act[]>(DEFAULT_ACTS);
  const [usePert, setUsePert] = useState(false);

  const result = useMemo(() => {
    // Choose durations: CPM = deterministic, PERT = te = (o+4m+p)/6
    const effectiveActs = acts.map(a => {
      if (usePert && a.optimistic !== undefined && a.mostLikely !== undefined && a.pessimistic !== undefined) {
        const te = (a.optimistic + 4 * a.mostLikely + a.pessimistic) / 6;
        return { ...a, dur: te };
      }
      return a;
    });

    const nodes = Array.from(new Set(effectiveActs.flatMap((a) => [a.from, a.to]))).sort((a, b) => a - b);
    const es = new Map<number, number>();
    for (const n of nodes) es.set(n, 0);

    // Forward pass
    for (const n of nodes) {
      for (const a of effectiveActs) {
        if (a.to === n) es.set(n, Math.max(es.get(n) ?? 0, (es.get(a.from) ?? 0) + a.dur));
      }
    }
    const projectEnd = Math.max(...nodes.map((n) => es.get(n) ?? 0));

    const lf = new Map<number, number>();
    for (const n of nodes) lf.set(n, projectEnd);

    // Backward pass
    for (const n of [...nodes].reverse()) {
      for (const a of effectiveActs) {
        if (a.from === n) lf.set(n, Math.min(lf.get(n) ?? projectEnd, (lf.get(a.to) ?? projectEnd) - a.dur));
      }
    }

    const rows = effectiveActs.map((a, i) => {
      const orig = acts[i];
      const esA = es.get(a.from) ?? 0;
      const ef = esA + a.dur;
      const lfA = lf.get(a.to) ?? projectEnd;
      const ls = lfA - a.dur;
      const tf = ls - esA;

      // PERT variance for critical path analysis
      let sigma2 = 0;
      if (usePert && orig.optimistic !== undefined && orig.pessimistic !== undefined) {
        sigma2 = Math.pow((orig.pessimistic - orig.optimistic) / 6, 2);
      }

      return { ...a, id: orig.id, dur: a.dur, origDur: orig.dur, es: esA, ef, ls, lf: lfA, tf, sigma2 };
    });

    const critical = rows.filter((r) => Math.abs(r.tf) < 0.001 && r.dur > 0).map((r) => r.id);

    // PERT: sum of variances on the critical path
    let cpVariance = 0;
    if (usePert) {
      rows.filter(r => critical.includes(r.id)).forEach(r => { cpVariance += r.sigma2; });
    }
    const cpSigma = Math.sqrt(cpVariance);

    return { rows, projectEnd, critical, cpSigma, usePert };
  }, [acts, usePert]);

  const setDur = (i: number, v: number) =>
    setActs((prev) => prev.map((a, j) => (j === i ? { ...a, dur: Number.isFinite(v) ? v : 0 } : a)));

  const setPertField = (i: number, field: 'optimistic' | 'mostLikely' | 'pessimistic', v: number) =>
    setActs((prev) => prev.map((a, j) => (j === i ? { ...a, [field]: Number.isFinite(v) ? v : 0 } : a)));

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand bg-brand-muted border border-brand/25 rounded-full px-3 py-1">
          PGDM Lab · 301 Unit 5
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-content-primary">
          Critical Path Simulator — CPM / PERT
        </h1>
        <p className="text-sm text-content-muted">
          Edit activity durations — ES/EF/LS/LF, floats, and the critical path recompute live. Companion to{' '}
          <Link href="/pgdm/project-management/pert-cpm-scheduling" className="text-brand hover:underline">
            PERT &amp; CPM lecture
          </Link>.
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex items-center gap-4 justify-center">
        <button
          onClick={() => setUsePert(false)}
          className={`text-xs font-bold rounded-xl px-4 py-2 border transition-all ${!usePert ? 'bg-brand-muted text-brand border-brand/40' : 'bg-surface-muted text-content-muted border-border'}`}
        >
          CPM — Deterministic
        </button>
        <button
          onClick={() => setUsePert(true)}
          className={`text-xs font-bold rounded-xl px-4 py-2 border transition-all ${usePert ? 'bg-brand-muted text-brand border-brand/40' : 'bg-surface-muted text-content-muted border-border'}`}
        >
          PERT — 3-Point Estimate
        </button>
      </div>

      {/* Network visual */}
      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-sm">
          {result.rows.map((r) => (
            <span
              key={r.id}
              className={`rounded-xl px-3 py-2 border transition-all ${
                r.tf < 0.001 && r.dur > 0
                  ? 'border-brand/50 bg-brand-muted text-brand font-bold'
                  : r.dur === 0
                    ? 'border-border-subtle bg-surface-muted text-content-muted'
                    : 'border-border bg-surface-muted text-content-secondary'
              }`}
              title={`ES ${r.es.toFixed(1)} · EF ${r.ef.toFixed(1)} · LS ${r.ls.toFixed(1)} · LF ${r.lf.toFixed(1)} · TF ${r.tf.toFixed(1)}`}
            >
              {r.from} →<span className="mx-1">{r.id}</span>→ {r.to}
              {' '}·{' '}
              {usePert ? r.dur.toFixed(1) : r.dur}
              {r.dur === 0 ? ' (dummy)' : ''}
            </span>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-brand-muted border border-brand/25 px-4 py-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Critical path &amp; project duration</p>
          <p className="text-xl font-mono font-extrabold text-content-primary mt-1">
            {result.critical.join(' → ')} = {result.projectEnd.toFixed(1)} days
          </p>
          {usePert && result.cpSigma > 0 && (
            <p className="text-[11px] text-content-muted mt-1 font-mono">
              σ (critical path) = {result.cpSigma.toFixed(2)} days · 95% confidence: ≤ {(result.projectEnd + 1.645 * result.cpSigma).toFixed(1)} days
            </p>
          )}
        </div>
      </div>

      {/* Duration editor */}
      <div className="rounded-2xl border border-border bg-surface p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted mb-3">
          {usePert ? 'PERT 3-point estimates (Optimistic / Most Likely / Pessimistic)' : 'Durations (days) — edit live'}
        </p>
        {!usePert ? (
          <div className="flex flex-wrap gap-3">
            {acts.map((a, i) => (
              <div key={a.id} className="flex items-center gap-1.5">
                <span className={`text-xs font-mono ${a.dur === 0 ? 'text-content-muted' : 'text-content-secondary'}`}>{a.id}</span>
                <input
                  type="number" min={0} step={1} value={a.dur}
                  onChange={(e) => setDur(i, parseInt(e.target.value))}
                  className={inp}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="text-[12px] font-mono border-collapse min-w-[500px]">
              <thead>
                <tr className="text-content-muted text-left border-b border-border">
                  <th className="pb-2 pr-4">Act</th>
                  <th className="pb-2 pr-4">Optimistic</th>
                  <th className="pb-2 pr-4">Most Likely</th>
                  <th className="pb-2 pr-4">Pessimistic</th>
                  <th className="pb-2">te = (o+4m+p)/6</th>
                </tr>
              </thead>
              <tbody>
                {acts.map((a, i) => {
                  const te = a.optimistic !== undefined && a.mostLikely !== undefined && a.pessimistic !== undefined
                    ? (a.optimistic + 4 * a.mostLikely + a.pessimistic) / 6
                    : a.dur;
                  return (
                    <tr key={a.id} className="border-t border-border-subtle">
                      <td className="py-1.5 pr-4 font-bold text-content-secondary">{a.id}</td>
                      <td className="pr-4">
                        {a.dur === 0 ? <span className="text-content-muted">—</span> : (
                          <input type="number" min={0} step={0.5} value={a.optimistic ?? a.dur}
                            onChange={(e) => setPertField(i, 'optimistic', parseFloat(e.target.value))}
                            className={inp} />
                        )}
                      </td>
                      <td className="pr-4">
                        {a.dur === 0 ? <span className="text-content-muted">—</span> : (
                          <input type="number" min={0} step={0.5} value={a.mostLikely ?? a.dur}
                            onChange={(e) => setPertField(i, 'mostLikely', parseFloat(e.target.value))}
                            className={inp} />
                        )}
                      </td>
                      <td className="pr-4">
                        {a.dur === 0 ? <span className="text-content-muted">—</span> : (
                          <input type="number" min={0} step={0.5} value={a.pessimistic ?? a.dur}
                            onChange={(e) => setPertField(i, 'pessimistic', parseFloat(e.target.value))}
                            className={inp} />
                        )}
                      </td>
                      <td className="font-bold text-brand">{te.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <button
          onClick={() => setActs(DEFAULT_ACTS)}
          className="mt-4 text-[11px] font-bold text-content-muted hover:text-brand border border-border hover:border-brand/40 rounded-lg px-3 py-1.5 transition-colors"
        >
          Reset to lecture example
        </button>
      </div>

      {/* Full schedule table */}
      <div className="rounded-2xl border border-border bg-surface p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted mb-3">Schedule table</p>
        <div className="horizontal-scroll-region" role="region" aria-label="CPM schedule table" tabIndex={0} data-lenis-prevent>
          <table className="w-full text-[12.5px] font-mono border-collapse min-w-[520px]">
            <thead>
              <tr className="text-content-muted text-left border-b border-border">
                <th className="pb-2 pr-3">Act</th>
                <th className="pb-2 pr-3">Node</th>
                <th className="pb-2 pr-3">Duration</th>
                <th className="pb-2 pr-3">ES</th>
                <th className="pb-2 pr-3">EF</th>
                <th className="pb-2 pr-3">LS</th>
                <th className="pb-2 pr-3">LF</th>
                <th className="pb-2 pr-3">TF</th>
                <th className="pb-2">Path</th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map((r) => (
                <tr
                  key={r.id}
                  className={`border-t border-border-subtle ${r.tf < 0.001 && r.dur > 0 ? 'text-brand font-semibold' : 'text-content-secondary'}`}
                >
                  <td className="py-1.5 pr-3 font-bold">{r.id}{r.dur === 0 ? ' ᵈ' : ''}</td>
                  <td className="pr-3">{r.from}→{r.to}</td>
                  <td className="pr-3">{r.dur.toFixed(usePert ? 1 : 0)}</td>
                  <td className="pr-3">{r.es.toFixed(usePert ? 1 : 0)}</td>
                  <td className="pr-3">{r.ef.toFixed(usePert ? 1 : 0)}</td>
                  <td className="pr-3">{r.ls.toFixed(usePert ? 1 : 0)}</td>
                  <td className="pr-3">{r.lf.toFixed(usePert ? 1 : 0)}</td>
                  <td className="pr-3">{r.tf.toFixed(usePert ? 1 : 0)}</td>
                  <td>{r.tf < 0.001 && r.dur > 0 ? '⚡ CRITICAL' : `slack ${r.tf.toFixed(usePert ? 1 : 0)}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-content-muted mt-3">
          TF = LS − ES. Zero-float activities form the critical path.{' '}
          {usePert && 'PERT te = (o + 4m + p) / 6. The σ of the critical path assumes independence of activities.'}
        </p>
      </div>
    </div>
  );
}
