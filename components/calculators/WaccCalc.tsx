'use client';

// components/calculators/WaccCalc.tsx — WACC Calculator UI.
// All maths lives in lib/finance/wacc.ts (pure, unit-tested): CAPM with
// direct or Hamada-relevered beta, build-up method, spread-based cost of
// debt, three weight modes, and a leverage sweep that relevers beta at
// every point (the legacy chart held beta fixed — wrong by up to ±2.6pp).
// The result hands off into the DCF tool via its assumption-link support.

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
    WACC_DEFAULTS,
    parseWaccInputs,
    runWacc,
    waccInputsToQuery,
    type BetaMode,
    type CostOfDebtMode,
    type WaccInputs,
    type WeightsMode,
} from '@/lib/finance/wacc';
import { buildWaccCsv } from '@/lib/finance/wacc-export';

const AUTOSAVE_KEY = 'ka_wacc_autosave_v1';

const inp =
    'w-full bg-surface border border-border rounded-xl px-3.5 py-2.5 text-content-primary text-sm font-mono focus:outline-none focus:border-brand transition-colors';
const lbl = 'text-[11px] font-bold uppercase tracking-widest text-content-muted mb-1.5 block';

interface UiState {
    riskFreeRatePct: string; marketRiskPremiumPct: string;
    leveredBeta: string; unleveredBeta: string;
    sizePremiumPct: string; companySpecificPremiumPct: string; countryRiskPremiumPct: string;
    preTaxCostOfDebtPct: string; creditSpreadPct: string; taxRatePct: string;
    debtEquityRatio: string; marketValueEquity: string; marketValueDebt: string; targetDebtWeightPct: string;
    betaMode: BetaMode; costOfDebtMode: CostOfDebtMode; weightsMode: WeightsMode;
}

const toUi = (i: WaccInputs): UiState => ({
    riskFreeRatePct: String(i.riskFreeRate * 100), marketRiskPremiumPct: String(i.marketRiskPremium * 100),
    leveredBeta: String(i.leveredBeta), unleveredBeta: String(i.unleveredBeta),
    sizePremiumPct: String(i.sizePremium * 100), companySpecificPremiumPct: String(i.companySpecificPremium * 100),
    countryRiskPremiumPct: String(i.countryRiskPremium * 100),
    preTaxCostOfDebtPct: String(i.preTaxCostOfDebt * 100), creditSpreadPct: String(i.creditSpread * 100),
    taxRatePct: String(i.taxRate * 100), debtEquityRatio: String(i.debtEquityRatio),
    marketValueEquity: String(i.marketValueEquity), marketValueDebt: String(i.marketValueDebt),
    targetDebtWeightPct: String(Math.round(i.targetDebtWeight * 10000) / 100),
    betaMode: i.betaMode, costOfDebtMode: i.costOfDebtMode, weightsMode: i.weightsMode,
});

const fromUi = (u: UiState): WaccInputs => ({
    riskFreeRate: Number(u.riskFreeRatePct) / 100, marketRiskPremium: Number(u.marketRiskPremiumPct) / 100,
    betaMode: u.betaMode, leveredBeta: Number(u.leveredBeta), unleveredBeta: Number(u.unleveredBeta),
    sizePremium: Number(u.sizePremiumPct) / 100, companySpecificPremium: Number(u.companySpecificPremiumPct) / 100,
    countryRiskPremium: Number(u.countryRiskPremiumPct) / 100, costOfDebtMode: u.costOfDebtMode,
    preTaxCostOfDebt: Number(u.preTaxCostOfDebtPct) / 100, creditSpread: Number(u.creditSpreadPct) / 100,
    taxRate: Number(u.taxRatePct) / 100, weightsMode: u.weightsMode,
    debtEquityRatio: Number(u.debtEquityRatio), marketValueEquity: Number(u.marketValueEquity),
    marketValueDebt: Number(u.marketValueDebt), targetDebtWeight: Number(u.targetDebtWeightPct) / 100,
});

function NumField({ label, value, onChange, step = '0.1', suffix = '%', tooltip }: {
    label: string; value: string; onChange: (v: string) => void; step?: string; suffix?: string; tooltip?: string;
}) {
    return (
        <div>
            <label className={lbl} title={tooltip}>{label}{tooltip && <span className="ml-1 text-brand cursor-help">ⓘ</span>}</label>
            <div className="relative">
                <input type="number" step={step} value={value} onChange={(e) => onChange(e.target.value)} className={inp} aria-label={label} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted text-xs font-mono">{suffix}</span>
            </div>
            {value.trim() !== '' && !Number.isFinite(Number(value)) && <p className="text-[10px] text-red-500 mt-0.5">Enter a number.</p>}
        </div>
    );
}

function ModeTabs<T extends string>({ value, onChange, options, label }: {
    value: T; onChange: (v: T) => void; options: Array<{ id: T; label: string }>; label: string;
}) {
    return (
        <div className="col-span-full">
            <span className={lbl}>{label}</span>
            <div className="inline-flex flex-wrap rounded-xl border border-border bg-surface p-0.5" role="group" aria-label={label}>
                {options.map((o) => (
                    <button key={o.id} type="button" aria-pressed={value === o.id} onClick={() => onChange(o.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400 ${value === o.id ? 'bg-brand text-white' : 'text-content-muted hover:bg-accent hover:text-content-primary'}`}>
                        {o.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

function KpiCard({ label, value, sub, accent = false }: { label: string; value: string; sub?: string; accent?: boolean }) {
    return (
        <div className={`rounded-2xl border p-5 ${accent ? 'border-brand/30 bg-brand-muted' : 'border-border bg-surface-raised'}`}>
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${accent ? 'text-brand' : 'text-content-muted'}`}>{label}</p>
            <p className={`text-2xl font-mono font-extrabold ${accent ? 'text-content-primary' : 'text-brand'}`}>{value}</p>
            {sub && <p className="text-[11px] text-content-muted font-mono mt-2">{sub}</p>}
        </div>
    );
}

const pct = (f: number | null, dp = 2) => (f === null || !Number.isFinite(f) ? '—' : `${(f * 100).toFixed(dp)}%`);

export default function WaccCalc() {
    const [ui, setUi] = useState<UiState>(() => toUi(WACC_DEFAULTS));
    const [hydrated, setHydrated] = useState(false);
    const [notice, setNotice] = useState<string | null>(null);
    const [showFormulas, setShowFormulas] = useState(false);
    const set = (patch: Partial<UiState>) => setUi((cur) => ({ ...cur, ...patch }));

    // Restore: defaults ← autosave ← shared URL (same precedence as DCF).
    useEffect(() => {
        try {
            let base = WACC_DEFAULTS;
            const raw = localStorage.getItem(AUTOSAVE_KEY);
            if (raw) base = parseWaccInputs(JSON.parse(raw) as Record<string, unknown>);
            const params = Object.fromEntries(new URLSearchParams(window.location.search));
            if (Object.keys(params).some((k) => k in WACC_DEFAULTS)) {
                base = parseWaccInputs({ ...base, ...params });
                setNotice('Loaded assumptions from the shared link.');
            }
            setUi(toUi(base));
        } catch { /* keep defaults */ }
        setHydrated(true);
    }, []);

    const inputs = useMemo(() => fromUi(ui), [ui]);
    useEffect(() => {
        if (!hydrated) return;
        try { localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(inputs)); } catch { /* quota */ }
    }, [hydrated, inputs]);

    const result = useMemo(() => runWacc(inputs), [inputs]);
    const hasErrors = result.errors.length > 0;

    const shareLink = async () => {
        const url = `${window.location.origin}/tools/wacc-calculator?${waccInputsToQuery(inputs)}`;
        try { await navigator.clipboard.writeText(url); setNotice('Shareable link copied — it encodes every assumption.'); }
        catch { setNotice(url); }
    };
    const exportCsv = () => {
        const blob = new Blob([buildWaccCsv(inputs, result, new Date().toISOString())], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'wacc-build-up.csv'; a.click();
        URL.revokeObjectURL(url);
    };

    const equitySub = hasErrors ? undefined
        : ui.betaMode === 'buildup'
            ? `Rf + ERP + size + CSRP${inputs.countryRiskPremium ? ' + CRP' : ''}`
            : `${ui.riskFreeRatePct} + ${(result.leveredBetaUsed ?? 0).toFixed(3)}β × ${ui.marketRiskPremiumPct}${ui.betaMode === 'relevered' ? ` (βU ${ui.unleveredBeta} relevered)` : ''}`;

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
            <div className="text-center space-y-2">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand bg-brand-muted border border-brand/25 rounded-full px-3 py-1">
                    PGDM Finance Lab · F06 Unit 4
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-content-primary">WACC Calculator — CAPM &amp; Build-Up</h2>
                <p className="text-sm text-content-muted max-w-xl mx-auto">
                    WACC = E/V·R<sub>e</sub> + D/V·R<sub>d</sub>(1−t), with beta properly unlevered/relevered (Hamada)
                    or a private-company build-up. Defaults are illustrative — overwrite Rf with the current
                    10Y G-Sec yield. Companion to{' '}
                    <Link href="/pgdm/financial-modeling-valuation/time-value-money-and-wacc" className="text-brand hover:underline">TVM &amp; WACC Lecture</Link>.
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                    <button type="button" onClick={shareLink} className="px-3 py-2 rounded-xl border border-border bg-surface text-xs font-semibold hover:bg-accent transition-colors">🔗 Copy share link</button>
                    <button type="button" onClick={exportCsv} className="px-3 py-2 rounded-xl border border-border bg-surface text-xs font-semibold hover:bg-accent transition-colors">⬇ CSV build-up</button>
                    <button type="button" onClick={() => { setUi(toUi(WACC_DEFAULTS)); setNotice('Reset to illustrative defaults.'); }} className="px-3 py-2 rounded-xl border border-border bg-surface text-xs font-semibold hover:bg-accent transition-colors">Reset defaults</button>
                </div>
                {notice && <p role="status" className="text-xs text-teal-700 dark:text-teal-400 bg-teal-500/10 border border-teal-500/20 rounded-xl px-3 py-2 max-w-xl mx-auto break-all">{notice}</p>}
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-2 md:grid-cols-3">
                <p className="col-span-full text-[10px] font-bold uppercase tracking-widest text-content-muted">Cost of Equity</p>
                <NumField label="Risk-free rate (Rf)" value={ui.riskFreeRatePct} onChange={(v) => set({ riskFreeRatePct: v })}
                    tooltip="Long-dated government bond yield in the valuation currency — India: current 10Y G-Sec (CCIL/RBI). Default is illustrative, not live." />
                <ModeTabs label="Cost-of-equity method" value={ui.betaMode} onChange={(v) => set({ betaMode: v })} options={[
                    { id: 'levered', label: 'CAPM · levered β' },
                    { id: 'relevered', label: 'CAPM · peer βU → relever' },
                    { id: 'buildup', label: 'Build-up (private co.)' },
                ]} />
                {ui.betaMode === 'levered' && (
                    <>
                        <NumField label="Market risk premium" value={ui.marketRiskPremiumPct} onChange={(v) => set({ marketRiskPremiumPct: v })}
                            tooltip="Expected market return minus Rf — e.g. Damodaran's India ERP (updated monthly)" />
                        <NumField label="Levered beta (βL)" value={ui.leveredBeta} onChange={(v) => set({ leveredBeta: v })} step="0.05" suffix="β"
                            tooltip="Only valid at the leverage it was estimated at — the sweep below relevers it for other structures" />
                    </>
                )}
                {ui.betaMode === 'relevered' && (
                    <>
                        <NumField label="Market risk premium" value={ui.marketRiskPremiumPct} onChange={(v) => set({ marketRiskPremiumPct: v })}
                            tooltip="Expected market return minus Rf" />
                        <NumField label="Peer unlevered beta (βU)" value={ui.unleveredBeta} onChange={(v) => set({ unleveredBeta: v })} step="0.05" suffix="β"
                            tooltip="Median unlevered beta of listed peers; relevered here at your capital structure via Hamada" />
                    </>
                )}
                {ui.betaMode === 'buildup' && (
                    <NumField label="Equity risk premium (ERP)" value={ui.marketRiskPremiumPct} onChange={(v) => set({ marketRiskPremiumPct: v })}
                        tooltip="Broad-market equity premium over Rf (before size/company-specific add-ons)" />
                )}
                <NumField label="Size premium" value={ui.sizePremiumPct} onChange={(v) => set({ sizePremiumPct: v })} step="0.25"
                    tooltip="Small-cap premium (e.g. Duff & Phelps/Kroll size studies); 0 for large listed firms" />
                <NumField label="Company-specific (CSRP)" value={ui.companySpecificPremiumPct} onChange={(v) => set({ companySpecificPremiumPct: v })} step="0.25"
                    tooltip="Idiosyncratic risk: customer concentration, key-person, illiquidity — needs explicit justification" />
                <NumField label="Country risk (CRP)" value={ui.countryRiskPremiumPct} onChange={(v) => set({ countryRiskPremiumPct: v })} step="0.25"
                    tooltip="Only if Rf/ERP are from a mature market and cash flows sit in a riskier jurisdiction — avoid double-counting" />

                <p className="col-span-full border-t border-border pt-4 text-[10px] font-bold uppercase tracking-widest text-content-muted">Cost of Debt</p>
                <ModeTabs label="Pre-tax cost of debt from" value={ui.costOfDebtMode} onChange={(v) => set({ costOfDebtMode: v })} options={[
                    { id: 'direct', label: 'Direct rate' },
                    { id: 'spread', label: 'Rf + credit spread' },
                ]} />
                {ui.costOfDebtMode === 'direct' ? (
                    <NumField label="Pre-tax cost of debt (Rd)" value={ui.preTaxCostOfDebtPct} onChange={(v) => set({ preTaxCostOfDebtPct: v })}
                        tooltip="Yield to maturity on the company's debt, or marginal bank borrowing rate — not the coupon on old debt" />
                ) : (
                    <NumField label="Credit spread over Rf" value={ui.creditSpreadPct} onChange={(v) => set({ creditSpreadPct: v })} step="0.25"
                        tooltip="From the firm's rating/synthetic rating (interest-coverage based)" />
                )}
                <NumField label="Corporate tax rate (t)" value={ui.taxRatePct} onChange={(v) => set({ taxRatePct: v })}
                    tooltip="Marginal effective rate incl. surcharge & cess — India commonly 25.17% or 22% regime" />

                <p className="col-span-full border-t border-border pt-4 text-[10px] font-bold uppercase tracking-widest text-content-muted">Capital Structure <span className="normal-case font-medium tracking-normal">(use target market-value weights)</span></p>
                <ModeTabs label="Express weights as" value={ui.weightsMode} onChange={(v) => set({ weightsMode: v })} options={[
                    { id: 'de', label: 'D/E ratio' },
                    { id: 'values', label: 'Market values' },
                    { id: 'target', label: 'Target debt %' },
                ]} />
                {ui.weightsMode === 'de' && (
                    <NumField label="Debt / Equity (D/E)" value={ui.debtEquityRatio} onChange={(v) => set({ debtEquityRatio: v })} step="0.05" suffix="×"
                        tooltip="Market value of debt ÷ market value of equity at the target structure" />
                )}
                {ui.weightsMode === 'values' && (
                    <>
                        <NumField label="Market value of equity" value={ui.marketValueEquity} onChange={(v) => set({ marketValueEquity: v })} step="10" suffix=""
                            tooltip="Share price × diluted shares (any currency unit — ratios are what matter)" />
                        <NumField label="Market value of debt" value={ui.marketValueDebt} onChange={(v) => set({ marketValueDebt: v })} step="10" suffix=""
                            tooltip="Traded debt at market; book value is the usual proxy for bank debt" />
                    </>
                )}
                {ui.weightsMode === 'target' && (
                    <NumField label="Target debt weight" value={ui.targetDebtWeightPct} onChange={(v) => set({ targetDebtWeightPct: v })} step="1"
                        tooltip="Long-run target D/(D+E) the firm manages toward — the right WACC weight for a DCF" />
                )}
            </div>

            {hasErrors ? (
                <div role="alert" className="rounded-2xl border border-red-500/30 bg-red-500/5 px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-2">WACC cannot be computed with these inputs</p>
                    <ul className="text-sm text-red-700 dark:text-red-400 list-disc pl-5 space-y-1">
                        {result.errors.map((e) => <li key={e}>{e}</li>)}
                    </ul>
                </div>
            ) : (
                <>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <KpiCard label={ui.betaMode === 'buildup' ? 'Cost of Equity · Build-Up' : 'Cost of Equity · CAPM'} value={pct(result.costOfEquity)} sub={equitySub} />
                        <KpiCard label="After-tax Cost of Debt" value={pct(result.afterTaxCostOfDebt)} sub={`${pct(result.preTaxCostOfDebt)} × (1 − ${ui.taxRatePct}%)`} />
                        <KpiCard label="WACC" value={pct(result.wacc)} accent
                            sub={`${((result.weightEquity ?? 0) * 100).toFixed(1)}% Eq · ${((result.weightDebt ?? 0) * 100).toFixed(1)}% Dt (D/E ${(result.debtEquityRatio ?? 0).toFixed(2)}×)`} />
                    </div>

                    {/* DCF handoff — the workflow this tool exists for */}
                    <div className="rounded-2xl border border-brand/25 bg-brand-muted/40 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-brand mb-1">Next step</p>
                            <p className="text-sm text-content-secondary">Use <strong className="font-mono">{pct(result.wacc)}</strong> as the discount rate in the DCF model — your other DCF inputs are kept as-is.</p>
                        </div>
                        <Link href={`/tools/dcf-valuation-model?wacc=${result.wacc}`}
                            className="inline-flex items-center px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors">
                            Send to DCF model →
                        </Link>
                    </div>

                    {result.warnings.length > 0 && (
                        <div className="rounded-2xl border border-border bg-surface px-5 py-4">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted mb-2">Diagnostics <span className="normal-case font-medium tracking-normal">(rule-based checks)</span></p>
                            <ul className="text-sm text-content-secondary leading-relaxed list-disc pl-5 space-y-1">
                                {result.warnings.map((w) => <li key={w}>{w}</li>)}
                            </ul>
                        </div>
                    )}

                    {/* Leverage sweep — relevered, numeric */}
                    <div className="rounded-2xl border border-border bg-surface p-5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted mb-1">Leverage Sensitivity — beta relevered at every D/E</p>
                        <p className="text-[11px] text-content-muted mb-4 leading-relaxed">
                            Anchored at unlevered β {result.unleveredBeta !== null ? `= ${result.unleveredBeta.toFixed(3)}` : '(build-up — Re held fixed)'}.
                            Debt’s tax shield lowers WACC only modestly once equity risk is relevered; Rd is held
                            constant here — in reality spreads widen with leverage, flattening the curve further.
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm min-w-[560px]">
                                <thead>
                                    <tr className="text-left text-xs uppercase tracking-wider text-gray-500 border-b">
                                        <th className="py-2 pr-2">D/E</th><th className="py-2 pr-2">βL (relevered)</th><th className="py-2 pr-2">Cost of equity</th>
                                        <th className="py-2 pr-2">Weights E / D</th><th className="py-2">WACC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.sweep.map((s) => {
                                        const active = Math.abs(s.debtEquityRatio - (result.debtEquityRatio ?? -1)) < 1e-9;
                                        return (
                                            <tr key={s.debtEquityRatio} className={`border-b last:border-0 ${active ? 'bg-brand-muted font-semibold' : ''}`}>
                                                <td className="py-2 pr-2 font-mono">{s.debtEquityRatio.toFixed(2)}×{active ? ' ← yours' : ''}</td>
                                                <td className="py-2 pr-2 font-mono">{s.leveredBeta === null ? 'n/a' : s.leveredBeta.toFixed(3)}</td>
                                                <td className="py-2 pr-2 font-mono">{pct(s.costOfEquity)}</td>
                                                <td className="py-2 pr-2 font-mono">{(s.weightEquity * 100).toFixed(0)} / {(s.weightDebt * 100).toFixed(0)}</td>
                                                <td className="py-2 font-mono font-bold">{pct(s.wacc)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* Formula reference */}
            <div className="rounded-2xl border border-border bg-surface p-5">
                <button onClick={() => setShowFormulas(!showFormulas)} aria-expanded={showFormulas}
                    className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-content-muted hover:text-brand transition-colors">
                    <span className={`transition-transform duration-200 ${showFormulas ? 'rotate-90' : ''}`}>▶</span>
                    Formula Reference, Assumptions &amp; Sources
                </button>
                {showFormulas && (
                    <>
                        <div className="mt-4 grid sm:grid-cols-2 gap-4">
                            {[
                                { label: 'CAPM — Cost of Equity', formula: 'Re = Rf + βL × MRP (+ premiums)', note: 'β must match the leverage of the structure you weight at — otherwise unlever/relever first.' },
                                { label: 'Hamada Unlevering', formula: 'βU = βL / [1 + (1−t)·D/E]', note: 'Strips financial risk from a peer’s beta. Assumes permanent debt & riskless tax shield.' },
                                { label: 'Hamada Relevering', formula: 'βL = βU × [1 + (1−t)·D/E]', note: 'Re-applies your target leverage. This is what the sweep does at every row.' },
                                { label: 'Build-Up (private cos)', formula: 'Re = Rf + ERP + size + CSRP', note: 'Used when no traded beta exists; every premium needs documented evidence.' },
                                { label: 'After-tax Cost of Debt', formula: 'Rd × (1−t)  ·  Rd = Rf + spread', note: 'Use the marginal borrowing rate; interest is tax-deductible (shield sits in WACC for FCFF).' },
                                { label: 'WACC', formula: 'WACC = (E/V)·Re + (D/V)·Rd·(1−t)', note: 'Weights at target market values — using today’s market cap for a DCF target is circular.' },
                            ].map((f) => (
                                <div key={f.label} className="rounded-xl bg-surface-muted border border-border p-4">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-content-muted">{f.label}</p>
                                    <p className="text-sm font-mono font-bold text-brand mt-1">{f.formula}</p>
                                    <p className="text-[11px] text-content-secondary mt-2">{f.note}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-[11px] text-content-muted mt-4 leading-relaxed">
                            Sources to refresh before real use: Rf — current 10Y G-Sec yield (CCIL/RBI); ERP &amp; unlevered
                            betas by sector — Damodaran Online (updated periodically); size premiums — Kroll Cost of
                            Capital Navigator (paid) or documented local studies; credit spreads — traded bonds of the
                            firm/peers or a synthetic rating from interest coverage. This tool ships no market data:
                            every figure above is your assumption, autosaved only in this browser.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
