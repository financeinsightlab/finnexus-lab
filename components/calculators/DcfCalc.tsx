'use client';

// components/calculators/DcfCalc.tsx — DCF Valuation Model UI.
// All maths lives in lib/finance/dcf.ts (pure, unit-tested); this component
// owns input state, persistence (browser-local), exports and rendering.
// Entitlement: the core single-scenario DCF is free; scenario comparison,
// sensitivity, the exit-multiple cross-check and file exports are Pro,
// decided server-side and passed in as `isPremiumUser`.

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts';
import {
    DEFAULT_SCENARIO_DELTAS,
    DCF_DEFAULTS,
    dcfInputsToQuery,
    parseDcfInputs,
    runDcf,
    runScenarios,
    sensitivityGrid,
    type DcfInputs,
    type ScenarioDeltas,
} from '@/lib/finance/dcf';
import { buildDcfCsv } from '@/lib/finance/dcf-export';

const AUTOSAVE_KEY = 'ka_dcf_autosave_v1';
const SAVED_KEY = 'ka_dcf_saved_v1';
const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'] as const;

interface SavedAnalysis {
    id: string;
    name: string;
    savedAt: string;
    currency: string;
    inputs: DcfInputs;
}

// UI state: money/counts as typed; rates edited in percent units.
interface UiState {
    revenue0: string; revenueGrowthPct: string; ebitdaMarginPct: string; daPct: string;
    taxRatePct: string; capexPct: string; nwcPct: string; terminalGrowthPct: string;
    waccPct: string; cash: string; debt: string; shares: string; exitMultiple: string;
    forecastYears: number; midYearDiscounting: boolean; growthFade: boolean;
    taxBenefitOnLosses: boolean; currency: string;
}

const toUi = (i: DcfInputs, currency = 'INR'): UiState => ({
    revenue0: String(i.revenue0), revenueGrowthPct: String(i.revenueGrowth * 100),
    ebitdaMarginPct: String(i.ebitdaMargin * 100), daPct: String(i.daPctRevenue * 100),
    taxRatePct: String(i.taxRate * 100), capexPct: String(i.capexPctRevenue * 100),
    nwcPct: String(i.nwcPctRevenue * 100), terminalGrowthPct: String(i.terminalGrowth * 100),
    waccPct: String(i.wacc * 100), cash: String(i.cash), debt: String(i.debt),
    shares: String(i.shares), exitMultiple: String(i.exitMultiple),
    forecastYears: i.forecastYears, midYearDiscounting: i.midYearDiscounting,
    growthFade: i.growthFade, taxBenefitOnLosses: i.taxBenefitOnLosses, currency,
});

const fromUi = (u: UiState): DcfInputs => ({
    revenue0: Number(u.revenue0), revenueGrowth: Number(u.revenueGrowthPct) / 100,
    ebitdaMargin: Number(u.ebitdaMarginPct) / 100, daPctRevenue: Number(u.daPct) / 100,
    taxRate: Number(u.taxRatePct) / 100, capexPctRevenue: Number(u.capexPct) / 100,
    nwcPctRevenue: Number(u.nwcPct) / 100, terminalGrowth: Number(u.terminalGrowthPct) / 100,
    wacc: Number(u.waccPct) / 100, cash: Number(u.cash), debt: Number(u.debt),
    shares: Number(u.shares), exitMultiple: Number(u.exitMultiple),
    forecastYears: u.forecastYears, midYearDiscounting: u.midYearDiscounting,
    growthFade: u.growthFade, taxBenefitOnLosses: u.taxBenefitOnLosses,
});

export default function DcfCalc({ isPremiumUser }: { slug?: string; isPremiumUser?: boolean }) {
    const premium = Boolean(isPremiumUser);
    const [ui, setUi] = useState<UiState>(() => toUi(DCF_DEFAULTS));
    const [hydrated, setHydrated] = useState(false);
    const [saved, setSaved] = useState<SavedAnalysis[]>([]);
    const [saveName, setSaveName] = useState('');
    const [notice, setNotice] = useState<string | null>(null);
    const [deltas, setDeltas] = useState<Record<'bear' | 'bull', ScenarioDeltas>>(DEFAULT_SCENARIO_DELTAS);

    const set = (patch: Partial<UiState>) => setUi((cur) => ({ ...cur, ...patch }));

    // Restore precedence: defaults ← browser autosave ← shared URL params.
    // Merging (rather than URL-replaces-all) means a handoff link such as
    // ?wacc=0.133 from the WACC calculator changes only the discount rate
    // and leaves the user's in-progress DCF inputs intact.
    useEffect(() => {
        try {
            let base = DCF_DEFAULTS;
            let currency = 'INR';
            const raw = localStorage.getItem(AUTOSAVE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw) as { inputs?: Record<string, unknown>; currency?: string };
                base = parseDcfInputs(parsed.inputs ?? null);
                currency = parsed.currency ?? currency;
            }
            const params = Object.fromEntries(new URLSearchParams(window.location.search));
            const hasShared = Object.keys(params).some((k) => k in DCF_DEFAULTS);
            if (hasShared) {
                base = parseDcfInputs(params, base);
                if (typeof params.currency === 'string') currency = params.currency;
                setNotice(
                    typeof params.wacc === 'string' && Object.keys(params).filter((k) => k in DCF_DEFAULTS).length === 1
                        ? `Discount rate set to ${(Number(params.wacc) * 100).toFixed(2)}% from the WACC calculator — your other inputs were kept.`
                        : 'Loaded assumptions from the shared link.',
                );
            }
            setUi(toUi(base, currency));
            const rawSaved = localStorage.getItem(SAVED_KEY);
            if (rawSaved) setSaved(JSON.parse(rawSaved) as SavedAnalysis[]);
        } catch { /* corrupted local state → keep defaults */ }
        setHydrated(true);
    }, []);

    const inputs = useMemo(() => fromUi(ui), [ui]);

    // Autosave every edit (post-hydration) so a reload never loses work.
    useEffect(() => {
        if (!hydrated) return;
        try { localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({ inputs, currency: ui.currency })); } catch { /* quota */ }
    }, [hydrated, inputs, ui.currency]);

    const result = useMemo(() => runDcf(inputs), [inputs]);
    const scenarios = useMemo(() => (premium ? runScenarios(inputs, deltas) : null), [premium, inputs, deltas]);
    const grid = useMemo(() => (premium && result.errors.length === 0 ? sensitivityGrid(inputs) : null), [premium, inputs, result.errors.length]);

    const locale = ui.currency === 'INR' ? 'en-IN' : 'en-US';
    const money = (v: number | null | undefined, compact = false) =>
        v === null || v === undefined || !Number.isFinite(v) ? '—'
            : new Intl.NumberFormat(locale, {
                style: 'currency', currency: ui.currency,
                notation: compact ? 'compact' : 'standard', maximumFractionDigits: compact ? 2 : 0,
            }).format(v);
    const num = (v: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(Math.round(v));
    const firmPrice = (v: number | null) => v === null || !Number.isFinite(v) ? '—'
        : new Intl.NumberFormat(locale, { style: 'currency', currency: ui.currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);

    const chartData = useMemo(() => {
        if (result.errors.length) return [];
        const rows = result.years.map((y) => ({
            stage: `Year ${y.year}`, value: Math.round(y.presentValue),
            fill: y.presentValue < 0 ? '#dc2626' : '#0ea5e9',
        }));
        rows.push({ stage: 'Terminal Value', value: Math.round(result.pvTerminalValue ?? 0), fill: (result.pvTerminalValue ?? 0) < 0 ? '#dc2626' : '#0d9488' });
        return rows;
    }, [result]);

    // ── Actions ──────────────────────────────────────────────────────────────
    const download = (name: string, content: string, type: string) => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = name; a.click();
        URL.revokeObjectURL(url);
    };
    const exportCsv = () => download('dcf-valuation.csv',
        buildDcfCsv(inputs, result, scenarios, grid, { currency: ui.currency, exportedAt: new Date().toISOString() }),
        'text/csv;charset=utf-8');
    const exportJson = () => download('dcf-assumptions.json',
        JSON.stringify({ tool: 'dcf-valuation-model', version: 1, currency: ui.currency, inputs }, null, 2),
        'application/json');
    const importJson = (file: File) => {
        file.text().then((text) => {
            try {
                const parsed = JSON.parse(text) as { inputs?: Record<string, unknown>; currency?: string };
                if (!parsed.inputs) throw new Error('missing inputs');
                setUi(toUi(parseDcfInputs(parsed.inputs), parsed.currency ?? 'INR'));
                setNotice('Assumptions imported from JSON.');
            } catch { setNotice('Could not import that file — expected a DCF assumptions JSON.'); }
        });
    };
    const shareLink = async () => {
        const url = `${window.location.origin}/tools/dcf-valuation-model?${dcfInputsToQuery(inputs)}&currency=${ui.currency}`;
        try { await navigator.clipboard.writeText(url); setNotice('Shareable link copied — it encodes every assumption.'); }
        catch { setNotice(url); }
    };
    const saveAnalysis = () => {
        const name = saveName.trim() || `Valuation ${saved.length + 1}`;
        const entry: SavedAnalysis = { id: `${Date.now()}`, name, savedAt: new Date().toISOString(), currency: ui.currency, inputs };
        const next = [entry, ...saved].slice(0, 25);
        setSaved(next);
        try { localStorage.setItem(SAVED_KEY, JSON.stringify(next)); } catch { /* quota */ }
        setSaveName('');
        setNotice(`Saved “${name}” in this browser.`);
    };
    const deleteSaved = (id: string) => {
        const next = saved.filter((s) => s.id !== id);
        setSaved(next);
        try { localStorage.setItem(SAVED_KEY, JSON.stringify(next)); } catch { /* quota */ }
    };

    // ── Small building blocks ────────────────────────────────────────────────
    const Field = ({ label, value, onChange, unit, hint, step = '0.1' }: {
        label: string; value: string; onChange: (v: string) => void; unit?: string; hint?: string; step?: string;
    }) => (
        <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">{label}</label>
            <div className="relative">
                <input type="number" step={step} value={value} onChange={(e) => onChange(e.target.value)}
                    className="input w-full pr-7 bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    aria-label={label} />
                {unit && <span className="absolute right-3 top-2.5 text-gray-400">{unit}</span>}
            </div>
            {hint && <p className="text-[10px] text-gray-400 mt-0.5">{hint}</p>}
            {value.trim() !== '' && !Number.isFinite(Number(value)) && (
                <p className="text-[10px] text-red-500 mt-0.5">Enter a number.</p>
            )}
        </div>
    );

    const LockedPanel = ({ title, desc }: { title: string; desc: string }) => (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-amber-500/30 w-full">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 className="font-bold text-brand-navy dark:text-white uppercase tracking-wider text-sm">{title} <span className="ml-1 text-[10px] bg-amber-500/10 text-amber-600 border border-amber-500/25 rounded px-1.5 py-0.5 normal-case tracking-normal">Pro</span></h3>
                    <p className="text-[13px] text-gray-500 mt-1 max-w-xl">{desc}</p>
                </div>
                <Link href="/pricing" className="inline-flex items-center px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors">Unlock with Pro →</Link>
            </div>
        </div>
    );

    const hasErrors = result.errors.length > 0;
    const b = result.baseYear;
    const stmtRow = (label: string, base: string, pick: (y: (typeof result.years)[number]) => string, strong = false) => (
        <tr className={strong ? 'bg-info-muted/30 font-bold' : 'hover:bg-info-muted/20'}>
            <td className="border border-gray-200 dark:border-slate-700 px-2 py-1 pl-3 bg-white dark:bg-slate-900">{label}</td>
            <td className="border border-gray-200 dark:border-slate-700 px-2 py-1 text-right font-mono text-blue-700 bg-warning-muted/60">{base}</td>
            {result.years.map((y) => (
                <td key={y.year} className="border border-gray-200 dark:border-slate-700 px-2 py-1 text-right font-mono">{pick(y)}</td>
            ))}
        </tr>
    );
    const neg = (v: number) => (v < 0 ? `(${num(Math.abs(v))})` : num(v));

    return (
        <div className="min-h-screen py-10 relative">
            <div className="content-page space-y-8">
                <div className="mb-2">
                    <p className="text-teal-600 font-medium mb-2 uppercase tracking-wider text-sm">Kunwar Analytics Valuation Model</p>
                    <h2 className="text-3xl font-bold text-brand-navy dark:text-white">DCF Valuation — Unlevered Free Cash Flow</h2>
                    <p className="text-brand-slate dark:text-slate-300 text-sm max-w-2xl mt-2">
                        Intrinsic value from explicit operating drivers: revenue → EBITDA → EBIT → NOPAT → free cash flow,
                        discounted at WACC with a Gordon-growth terminal value. Every figure below is computed by a
                        unit-tested calculation engine — defaults are illustrative; replace them with company actuals.
                    </p>
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl px-4 py-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Currency</label>
                    <select value={ui.currency} onChange={(e) => set({ currency: e.target.value })} className="input w-auto py-1.5" aria-label="Currency (labelling only, no FX conversion)">
                        {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <span className="hidden md:inline text-[11px] text-gray-400">labelling only — inputs are in this currency</span>
                    <span className="flex-1" />
                    <button type="button" onClick={shareLink} className="px-3 py-2 rounded-xl border border-border bg-surface text-xs font-semibold hover:bg-accent transition-colors">🔗 Copy share link</button>
                    <label className="px-3 py-2 rounded-xl border border-border bg-surface text-xs font-semibold hover:bg-accent transition-colors cursor-pointer">
                        Import JSON<input type="file" accept=".json,application/json" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) importJson(f); e.target.value = ''; }} />
                    </label>
                    {premium ? (
                        <>
                            <button type="button" onClick={exportCsv} className="px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-hover transition-colors">⬇ CSV workbook</button>
                            <button type="button" onClick={exportJson} className="px-3 py-2 rounded-xl border border-border bg-surface text-xs font-semibold hover:bg-accent transition-colors">⬇ Assumptions JSON</button>
                        </>
                    ) : (
                        <Link href="/pricing" className="px-3 py-2 rounded-xl border border-amber-500/40 text-amber-600 text-xs font-semibold hover:bg-amber-500/10 transition-colors">⬇ Exports are a Pro feature →</Link>
                    )}
                </div>
                {notice && <p role="status" className="text-xs text-teal-700 dark:text-teal-400 bg-teal-500/10 border border-teal-500/20 rounded-xl px-3 py-2 break-all">{notice}</p>}

                <div className="grid lg:grid-cols-4 gap-8 relative">
                    {/* Inputs */}
                    <div className="lg:col-span-1 space-y-6 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 h-fit sticky top-24 z-20">
                        <h3 className="font-bold text-brand-navy dark:text-white border-b pb-3 uppercase tracking-wider text-sm">Operating Assumptions</h3>
                        <div className="space-y-4">
                            <Field label="Revenue (Yr 0, actuals)" value={ui.revenue0} onChange={(v) => set({ revenue0: v })} step="100000" />
                            <div className="grid grid-cols-2 gap-2">
                                <Field label="Rev Growth" value={ui.revenueGrowthPct} onChange={(v) => set({ revenueGrowthPct: v })} unit="%" />
                                <Field label="EBITDA Mgn" value={ui.ebitdaMarginPct} onChange={(v) => set({ ebitdaMarginPct: v })} unit="%" />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Field label="D&A % Rev" value={ui.daPct} onChange={(v) => set({ daPct: v })} unit="%" />
                                <Field label="Tax Rate" value={ui.taxRatePct} onChange={(v) => set({ taxRatePct: v })} unit="%" />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Field label="Capex % Rev" value={ui.capexPct} onChange={(v) => set({ capexPct: v })} unit="%" />
                                <Field label="NWC % Rev" value={ui.nwcPct} onChange={(v) => set({ nwcPct: v })} unit="%" hint="Level; ΔNWC derived from revenue change" />
                            </div>
                        </div>

                        <h3 className="font-bold text-brand-navy dark:text-white border-b pb-2 pt-2 uppercase tracking-wider text-sm">Valuation Parameters</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <Field label="WACC" value={ui.waccPct} onChange={(v) => set({ waccPct: v })} unit="%" />
                                <Field label="Terminal Gr" value={ui.terminalGrowthPct} onChange={(v) => set({ terminalGrowthPct: v })} unit="%" />
                            </div>
                            <p className="text-[11px] text-gray-400 -mt-2">Not sure of WACC? Build it up in the <Link href="/tools/wacc-calculator" className="text-teal-600 font-semibold hover:underline">WACC Calculator →</Link></p>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Forecast Years</label>
                                    <select value={ui.forecastYears} onChange={(e) => set({ forecastYears: Number(e.target.value) })} className="input w-full bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white" aria-label="Forecast years">
                                        {[3, 4, 5, 6, 7, 8, 9, 10].map((n) => <option key={n} value={n}>{n} years</option>)}
                                    </select>
                                </div>
                                <Field label="Exit EV/EBITDA" value={ui.exitMultiple} onChange={(v) => set({ exitMultiple: v })} unit="×" hint="Cross-check only" />
                            </div>
                            <div className="space-y-2 text-sm">
                                {([
                                    ['midYearDiscounting', 'Mid-year discounting'],
                                    ['growthFade', 'Fade growth to terminal'],
                                    ['taxBenefitOnLosses', 'Tax benefit on losses'],
                                ] as const).map(([key, label]) => (
                                    <label key={key} className="flex items-center gap-2 text-gray-600 dark:text-slate-300 cursor-pointer">
                                        <input type="checkbox" checked={ui[key]} onChange={(e) => set({ [key]: e.target.checked } as Partial<UiState>)} className="h-4 w-4 accent-teal-600" />
                                        {label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <h3 className="font-bold text-brand-navy dark:text-white border-b pb-2 pt-2 uppercase tracking-wider text-sm">Balance Sheet Bridge</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <Field label="Total Cash" value={ui.cash} onChange={(v) => set({ cash: v })} step="100000" />
                                <Field label="Total Debt" value={ui.debt} onChange={(v) => set({ debt: v })} step="100000" />
                            </div>
                            <Field label="Shares Outstanding (#)" value={ui.shares} onChange={(v) => set({ shares: v })} step="10000" />
                        </div>

                        <h3 className="font-bold text-brand-navy dark:text-white border-b pb-2 pt-2 uppercase tracking-wider text-sm">Saved Analyses</h3>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <input value={saveName} onChange={(e) => setSaveName(e.target.value)} placeholder="Name this valuation…" className="input flex-1 min-w-0" aria-label="Name for saved analysis" />
                                <button type="button" onClick={saveAnalysis} className="px-3 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-hover transition-colors shrink-0">Save</button>
                            </div>
                            {saved.length === 0 ? (
                                <p className="text-[11px] text-gray-400">Nothing saved yet. Saves live in this browser (not your account); your current inputs autosave automatically.</p>
                            ) : (
                                <ul className="space-y-1.5">
                                    {saved.map((s) => (
                                        <li key={s.id} className="flex items-center gap-2 text-xs border border-gray-200 dark:border-slate-700 rounded-lg px-2 py-1.5">
                                            <button type="button" className="flex-1 min-w-0 text-left font-medium truncate hover:text-teal-600" onClick={() => { setUi(toUi(s.inputs, s.currency)); setNotice(`Loaded “${s.name}”.`); }} title={`Saved ${new Date(s.savedAt).toLocaleString()}`}>{s.name}</button>
                                            <button type="button" onClick={() => deleteSaved(s.id)} className="text-gray-400 hover:text-red-500 shrink-0" aria-label={`Delete ${s.name}`}>✕</button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-3 space-y-6 w-full min-w-0">
                        {hasErrors ? (
                            <div role="alert" className="bg-red-500/5 border border-red-500/30 rounded-2xl p-6">
                                <h2 className="font-bold text-red-600 text-sm uppercase tracking-wider">Model cannot be valued with these inputs</h2>
                                <ul className="mt-2 space-y-1 text-sm text-red-700 dark:text-red-400 list-disc pl-5">
                                    {result.errors.map((e) => <li key={e}>{e}</li>)}
                                </ul>
                                <p className="text-xs text-gray-500 mt-3">Fix the inputs on the left — outputs return as soon as the model is valid. Nothing is estimated or filled in for you.</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid md:grid-cols-4 gap-4">
                                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-success/25 ring-2 ring-green-500/10 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-success" />
                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Implied Share Price</p>
                                        <h4 className="text-3xl tracking-tighter font-bold text-green-600">{firmPrice(result.impliedSharePrice)}</h4>
                                        <p className="text-[11px] uppercase tracking-wider text-brand-slate dark:text-slate-300 mt-2">Equity value ÷ diluted shares</p>
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-gray-100">
                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Equity Value</p>
                                        <h4 className="text-3xl tracking-tighter font-bold text-brand-navy dark:text-white">{money(result.equityValue, true)}</h4>
                                        <p className="text-[11px] uppercase tracking-wider text-brand-slate dark:text-slate-300 mt-2">EV + Cash − Debt</p>
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-gray-100">
                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Enterprise Value</p>
                                        <h4 className="text-3xl tracking-tighter font-bold text-gray-700 dark:text-slate-200">{money(result.enterpriseValue, true)}</h4>
                                        <p className="text-[11px] uppercase tracking-wider text-brand-slate dark:text-slate-300 mt-2">Σ PV of UFCF + PV of terminal value</p>
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-gray-100">
                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Terminal Share of EV</p>
                                        <h4 className="text-3xl tracking-tighter font-bold text-gray-700 dark:text-slate-200">{result.terminalValueSharePct !== null ? `${result.terminalValueSharePct.toFixed(1)}%` : '—'}</h4>
                                        <p className="text-[11px] uppercase tracking-wider text-brand-slate dark:text-slate-300 mt-2">Higher = more assumption-driven</p>
                                    </div>
                                </div>

                                {/* PV composition chart — negative years shown honestly */}
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 w-full">
                                    <h3 className="font-bold text-brand-navy dark:text-white mb-1 uppercase tracking-wider text-sm">Where the value comes from (present value)</h3>
                                    <p className="text-[11px] text-gray-500 mb-4">Near-term forecast cash flows (blue) vs the terminal value (teal). Negative-PV years are shown in red — never hidden.</p>
                                    <div className="h-[280px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={chartData} margin={{ top: 10, right: 0, left: 10, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} opacity={0.3} />
                                                <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--content-muted))' }} />
                                                <YAxis tickFormatter={(val: number) => money(val, true)} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} width={70} />
                                                <Tooltip formatter={(value: unknown) => [money(Number(value)), 'Present value']} cursor={{ fill: 'hsl(var(--surface-muted))' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                                                <ReferenceLine y={0} stroke="#94a3b8" />
                                                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                                                    {chartData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Reconciling statement */}
                                <div className="bg-white dark:bg-slate-900 border border-gray-300 shadow-lg rounded-sm overflow-hidden w-full font-sans">
                                    <div className="bg-surface-muted px-3 py-2 text-[11px] font-semibold flex flex-wrap items-center justify-between gap-2 border-b border-gray-300">
                                        <span className="uppercase tracking-wider">DCF operating model — every row foots to the bridge</span>
                                        <span className="font-mono text-[10px] text-gray-500">amounts in {ui.currency} actuals · =SUM(PV explicit) + PV(terminal)</span>
                                    </div>
                                    <div className="horizontal-scroll-region w-full overflow-x-auto" role="region" aria-label="Discounted cash flow model table" tabIndex={0} data-lenis-prevent>
                                        <table className="w-full text-[11px] whitespace-nowrap border-collapse min-w-[760px] select-text">
                                            <thead>
                                                <tr className="bg-gray-100 text-gray-600">
                                                    <th className="border border-gray-300 px-3 py-1 text-left font-bold uppercase text-[11px]">Financial line item</th>
                                                    <th className="border border-gray-300 px-3 py-1 text-center font-bold uppercase text-[11px]">Yr 0 · actuals*</th>
                                                    {result.years.map((y) => <th key={y.year} className="border border-gray-300 px-3 py-1 text-center font-bold uppercase text-[11px]">Year {y.year}</th>)}
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-800">
                                                {b && stmtRow('Revenue', num(b.revenue), (y) => num(y.revenue))}
                                                {b && stmtRow('EBITDA', num(b.ebitda), (y) => num(y.ebitda))}
                                                {b && stmtRow('Less: D&A', `(${num(b.da)})`, (y) => `(${num(y.da)})`)}
                                                {b && stmtRow('EBIT', neg(b.ebit), (y) => neg(y.ebit))}
                                                {b && stmtRow('Less: Cash taxes', `(${num(Math.abs(b.tax))})`, (y) => (y.tax < 0 ? num(Math.abs(y.tax)) : `(${num(y.tax)})`))}
                                                {b && stmtRow('NOPAT', neg(b.nopat), (y) => neg(y.nopat))}
                                                {b && stmtRow('Add: D&A', num(b.da), (y) => num(y.da))}
                                                {b && stmtRow('Less: Capex', `(${num(b.capex)})`, (y) => `(${num(y.capex)})`)}
                                                {stmtRow('Less: Δ Net working capital', 'n/a', (y) => (y.deltaNwc < 0 ? num(Math.abs(y.deltaNwc)) : `(${num(y.deltaNwc)})`))}
                                                {b && stmtRow('Unlevered FCF', neg(b.ufcf), (y) => neg(y.ufcf), true)}
                                                {stmtRow('Discount factor', '—', (y) => y.discountFactor.toFixed(4))}
                                                {stmtRow('Present value', 'excluded', (y) => neg(y.presentValue), true)}
                                                <tr><td colSpan={2 + result.years.length} className="border border-gray-200 dark:border-slate-700 bg-surface-muted/50 py-1 text-[9px] italic text-gray-400 pl-3">* Yr 0 is context (latest actuals) and is excluded from present value. Cells are rounded for display; calculations use full precision.</td></tr>
                                                <tr><td className="border px-2 py-1 pl-3 font-semibold">Sum of PV — explicit period</td><td className="border px-2 py-1 text-right font-mono">{num(result.sumPvExplicit ?? 0)}</td><td colSpan={result.years.length} /></tr>
                                                <tr><td className="border px-2 py-1 pl-3 font-semibold">PV of terminal value (Gordon: TV {num(result.terminalValue ?? 0)})</td><td className="border px-2 py-1 text-right font-mono">{num(result.pvTerminalValue ?? 0)}</td><td colSpan={result.years.length} /></tr>
                                                <tr className="bg-gray-50 dark:bg-slate-800/50"><td className="border px-2 py-1 pl-3 font-extrabold uppercase text-[10px] tracking-widest">Enterprise value</td><td className="border px-2 py-1 text-right font-mono font-bold">{num(result.enterpriseValue ?? 0)}</td><td colSpan={result.years.length} /></tr>
                                                <tr><td className="border px-2 py-1 pl-3 text-green-700">Plus: Cash &amp; equivalents</td><td className="border px-2 py-1 text-right font-mono">{num(inputs.cash)}</td><td colSpan={result.years.length} /></tr>
                                                <tr><td className="border px-2 py-1 pl-3 text-red-600">Less: Total debt</td><td className="border px-2 py-1 text-right font-mono">({num(inputs.debt)})</td><td colSpan={result.years.length} /></tr>
                                                <tr className="bg-[#e2f1e8]"><td className="border px-2 py-2 pl-3 font-extrabold uppercase text-[11px] tracking-widest text-success">Implied equity value</td><td className="border px-2 py-2 text-right font-mono font-bold text-success">{neg(result.equityValue ?? 0)}</td><td colSpan={result.years.length} /></tr>
                                                <tr><td className="border px-2 py-1 pl-3 italic text-gray-500">÷ Fully diluted shares</td><td className="border px-2 py-1 text-right font-mono">{num(inputs.shares)}</td><td colSpan={result.years.length} /></tr>
                                                <tr className="bg-surface-muted"><td className="border px-2 py-2 pl-3 font-extrabold uppercase text-[11px] tracking-widest text-info">Implied share price</td><td className="border px-2 py-2 text-right font-mono font-extrabold text-info">{firmPrice(result.impliedSharePrice)}</td><td colSpan={result.years.length} /></tr>
                                                {result.impliedMultiples && (
                                                    <tr><td className="border px-2 py-1 pl-3 italic text-gray-500">Implied EV / Revenue₀ · EV / EBITDA₀</td><td className="border px-2 py-1 text-right font-mono">{result.impliedMultiples.evToRevenue0.toFixed(1)}× · {result.impliedMultiples.evToEbitda0.toFixed(1)}×</td><td colSpan={result.years.length} /></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Diagnostics — rule-based, labelled as such */}
                                <div className="bg-brand-navy p-6 rounded-xl shadow-lg w-full">
                                    <h3 className="font-bold text-white mb-2 text-sm uppercase tracking-widest border-b border-white/10 pb-3">Model diagnostics <span className="normal-case tracking-normal font-normal text-blue-200/70 text-xs">(rule-based checks on your inputs — not investment advice)</span></h3>
                                    {result.warnings.length === 0 ? (
                                        <p className="text-blue-50 text-sm leading-relaxed pt-2 font-light">
                                            No red flags detected: terminal value is {result.terminalValueSharePct?.toFixed(0)}% of EV
                                            (typical DCFs run 50–85%), free cash flow is positive in every forecast year, and the
                                            equity bridge is solvent. The result is still only as good as the growth, margin and
                                            WACC assumptions — stress them in the scenario and sensitivity views before relying on {firmPrice(result.impliedSharePrice)}.
                                        </p>
                                    ) : (
                                        <ul className="text-blue-50 text-sm leading-relaxed pt-2 font-light list-disc pl-5 space-y-1">
                                            {result.warnings.map((w) => <li key={w}>{w}</li>)}
                                        </ul>
                                    )}
                                </div>

                                {/* Scenarios (Pro) */}
                                {premium && scenarios ? (
                                    <section aria-labelledby="dcf-scenarios" className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 w-full space-y-4">
                                        <h3 id="dcf-scenarios" className="font-bold text-brand-navy dark:text-white uppercase tracking-wider text-sm">Scenario comparison — Bear / Base / Bull</h3>
                                        <div className="grid sm:grid-cols-2 gap-4 text-xs">
                                            {(['bear', 'bull'] as const).map((side) => (
                                                <fieldset key={side} className="border border-gray-200 dark:border-slate-700 rounded-xl p-3">
                                                    <legend className="px-1 font-bold uppercase tracking-wider text-[10px] text-gray-500">{side} deltas (pp vs base)</legend>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {([['growthDelta', 'Growth Δ'], ['marginDelta', 'Margin Δ'], ['waccDelta', 'WACC Δ']] as const).map(([k, lab]) => (
                                                            <div key={k}>
                                                                <label className="block text-[10px] font-bold text-gray-500 mb-1">{lab}</label>
                                                                <input type="number" step="0.5" value={String(deltas[side][k] * 100)} aria-label={`${side} ${lab}`}
                                                                    onChange={(e) => setDeltas((d) => ({ ...d, [side]: { ...d[side], [k]: Number(e.target.value) / 100 } }))}
                                                                    className="input w-full bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </fieldset>
                                            ))}
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm min-w-[560px]">
                                                <thead><tr className="text-left text-xs uppercase tracking-wider text-gray-500 border-b"><th className="py-2 pr-2">Scenario</th><th className="py-2 pr-2">Growth</th><th className="py-2 pr-2">Margin</th><th className="py-2 pr-2">WACC</th><th className="py-2 pr-2">Enterprise value</th><th className="py-2">Share price</th></tr></thead>
                                                <tbody>
                                                    {scenarios.map((s) => (
                                                        <tr key={s.name} className="border-b last:border-0">
                                                            <td className="py-2 pr-2 font-bold">{s.name}</td>
                                                            <td className="py-2 pr-2 font-mono">{(s.inputs.revenueGrowth * 100).toFixed(1)}%</td>
                                                            <td className="py-2 pr-2 font-mono">{(s.inputs.ebitdaMargin * 100).toFixed(1)}%</td>
                                                            <td className="py-2 pr-2 font-mono">{(s.inputs.wacc * 100).toFixed(1)}%</td>
                                                            <td className="py-2 pr-2 font-mono">{money(s.result.enterpriseValue, true)}</td>
                                                            <td className="py-2 font-mono font-bold">{s.result.errors.length ? <span className="text-red-500 text-xs font-sans">{s.result.errors[0]}</span> : firmPrice(s.result.impliedSharePrice)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="space-y-1.5" aria-label="Valuation range by scenario">
                                            {(() => {
                                                const prices = scenarios.map((s) => s.result.impliedSharePrice ?? 0);
                                                const max = Math.max(...prices, 0);
                                                return scenarios.map((s, i) => (
                                                    <div key={s.name} className="flex items-center gap-2 text-xs">
                                                        <span className="w-10 font-bold">{s.name}</span>
                                                        <div className="flex-1 h-4 rounded bg-surface-muted overflow-hidden"><div className={`h-full ${s.name === 'Base' ? 'bg-teal-600' : 'bg-sky-500'}`} style={{ width: max > 0 ? `${Math.max(0, (prices[i] / max) * 100)}%` : '0%' }} /></div>
                                                        <span className="w-24 text-right font-mono">{s.result.errors.length ? 'invalid' : firmPrice(s.result.impliedSharePrice)}</span>
                                                    </div>
                                                ));
                                            })()}
                                        </div>
                                    </section>
                                ) : (
                                    <LockedPanel title="Scenario comparison" desc="Value the business three ways — Bear / Base / Bull with editable growth, margin and WACC deltas — and read the result as a defensible range instead of a single fragile number." />
                                )}

                                {/* Sensitivity (Pro) */}
                                {premium && grid ? (
                                    <section aria-labelledby="dcf-sensitivity" className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 w-full">
                                        <h3 id="dcf-sensitivity" className="font-bold text-brand-navy dark:text-white uppercase tracking-wider text-sm mb-1">Sensitivity — implied share price</h3>
                                        <p className="text-[11px] text-gray-500 mb-4">Rows: WACC. Columns: terminal growth. Centre cell = your base case. “n/a” = invalid combination (growth ≥ WACC), never extrapolated.</p>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm min-w-[520px] text-center">
                                                <thead><tr className="border-b text-xs uppercase tracking-wider text-gray-500"><th className="py-2">WACC \ g</th>{grid.growthValues.map((g, j) => <th key={j} className="py-2 font-mono">{(g * 100).toFixed(2)}%</th>)}</tr></thead>
                                                <tbody>
                                                    {grid.waccValues.map((w, i) => (
                                                        <tr key={i} className="border-b last:border-0">
                                                            <th className="py-2 font-mono text-xs uppercase tracking-wider text-gray-500">{(w * 100).toFixed(2)}%</th>
                                                            {grid.sharePrice[i].map((v, j) => (
                                                                <td key={j} className={`py-2 font-mono ${i === 2 && j === 2 ? 'bg-brand-muted text-brand font-extrabold rounded' : ''}`}>{v === null ? 'n/a' : firmPrice(v)}</td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                ) : (
                                    <LockedPanel title="Sensitivity grid" desc="A 5×5 map of share price across WACC (±2pp) and terminal growth (±1pp) — the fastest way to see which assumption your valuation actually hangs on." />
                                )}

                                {/* Exit-multiple cross-check (Pro) */}
                                {premium && result.exitMultipleCheck ? (
                                    <section aria-labelledby="dcf-exit" className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 w-full">
                                        <h3 id="dcf-exit" className="font-bold text-brand-navy dark:text-white uppercase tracking-wider text-sm mb-1">Terminal value cross-check — exit multiple</h3>
                                        <p className="text-[11px] text-gray-500 mb-4">Two independent terminal-value methods should roughly agree. If they don’t, one of the assumptions is doing too much work.</p>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm min-w-[520px]">
                                                <thead><tr className="text-left text-xs uppercase tracking-wider text-gray-500 border-b"><th className="py-2 pr-2">Method</th><th className="py-2 pr-2">Terminal value</th><th className="py-2 pr-2">Enterprise value</th><th className="py-2">Share price</th></tr></thead>
                                                <tbody>
                                                    <tr className="border-b"><td className="py-2 pr-2 font-bold">Gordon growth (g = {(inputs.terminalGrowth * 100).toFixed(2)}%)</td><td className="py-2 pr-2 font-mono">{money(result.terminalValue, true)}</td><td className="py-2 pr-2 font-mono">{money(result.enterpriseValue, true)}</td><td className="py-2 font-mono font-bold">{firmPrice(result.impliedSharePrice)}</td></tr>
                                                    <tr><td className="py-2 pr-2 font-bold">Exit multiple ({inputs.exitMultiple}× EBITDA{result.years.length})</td><td className="py-2 pr-2 font-mono">{money(result.exitMultipleCheck.terminalValueExit, true)}</td><td className="py-2 pr-2 font-mono">{money(result.exitMultipleCheck.enterpriseValueExit, true)}</td><td className="py-2 font-mono font-bold">{firmPrice(result.exitMultipleCheck.impliedSharePriceExit)}</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <p className="text-[13px] text-gray-500 mt-3">
                                            The {inputs.exitMultiple}× exit multiple implies a perpetuity growth rate of <strong>{(result.exitMultipleCheck.impliedTerminalGrowth * 100).toFixed(2)}%</strong>;
                                            your Gordon terminal value implies an exit multiple of <strong>{result.exitMultipleCheck.impliedExitMultiple.toFixed(1)}×</strong> final-year EBITDA.
                                            Judge both against traded comparables before trusting either.
                                        </p>
                                    </section>
                                ) : (
                                    <LockedPanel title="Exit-multiple cross-check" desc="Reconciles the Gordon terminal value against an EV/EBITDA exit multiple — including the perpetuity growth your multiple secretly assumes. The standard institutional sanity check." />
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Assumptions, formulas & limitations */}
                <details className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 group">
                    <summary className="cursor-pointer font-bold text-brand-navy dark:text-white text-sm uppercase tracking-wider">Assumptions, formulas &amp; limitations</summary>
                    <div className="mt-4 grid md:grid-cols-2 gap-6 text-sm text-brand-slate dark:text-slate-300 leading-relaxed">
                        <div>
                            <h4 className="font-bold text-brand-navy dark:text-white mb-2">Formulas (exactly as computed)</h4>
                            <ul className="list-disc pl-5 space-y-1 font-mono text-[13px]">
                                <li>EBIT = EBITDA − D&amp;A; NOPAT = EBIT − tax</li>
                                <li>UFCF = NOPAT + D&amp;A − Capex − ΔNWC</li>
                                <li>ΔNWC = (Rev<sub>t</sub> − Rev<sub>t−1</sub>) × NWC%</li>
                                <li>PV = UFCF / (1+WACC)<sup>t − adj</sup>, adj = 0.5 if mid-year</li>
                                <li>TV = UFCF<sub>N</sub>(1+g) / (WACC − g)</li>
                                <li>EV = ΣPV + PV(TV); Price = (EV + Cash − Debt) / Shares</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-brand-navy dark:text-white mb-2">Data provenance &amp; limitations</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>All inputs are yours.</strong> Defaults are illustrative (not live market data); currency selection only relabels — no FX conversion is applied.</li>
                                <li>Flat margin/D&amp;A/capex ratios; growth is flat unless fading is enabled. No per-year driver modelling, seasonality, or stub periods.</li>
                                <li>Tax is a flat cash rate on EBIT; loss years get no tax credit and no carry-forward unless you opt in. Interest/tax shields sit inside WACC (FCFF convention).</li>
                                <li>No minority interests, leases, pensions, SBC dilution or other bridge adjustments — add them via Cash/Debt if relevant.</li>
                                <li>Saved analyses and autosave live in this browser only; use the share link or JSON export to move work between devices.</li>
                            </ul>
                        </div>
                    </div>
                </details>

                {/* Glossary (retained from the original tool) */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-6">Valuation Glossary</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            ['💰 Free Cash Flow (UFCF)', 'The cash a company generates after maintaining its asset base and funding working capital — the amount available to all capital providers. This model discounts UFCF at WACC (the FCFF approach).'],
                            ['📉 Discount Rate (WACC)', 'Investors’ required return, blended across debt and equity. Future cash is worth less than present cash, so each year is divided by (1+WACC)^t. Build it up with the WACC Calculator rather than guessing.'],
                            ['🏁 Terminal Value', 'Forecasting year-by-year forever is impossible, so everything after the explicit period is capitalised into one figure — here via Gordon growth, cross-checked against an exit multiple.'],
                            ['⚡ Working Capital (ΔNWC)', 'Growth consumes cash tied up in receivables and inventory. This model sizes NWC as a % of revenue and charges only the year-on-year change — so a zero-growth year correctly consumes no extra working capital.'],
                            ['⚖️ Enterprise vs Equity Value', 'Enterprise value = worth of the operations. Equity value = what remains for shareholders after debt: EV + Cash − Debt, divided by diluted shares for a per-share figure.'],
                            ['🧭 Margin of Safety', 'A DCF output is an estimate with wide error bars, not a price tag. Use the Bear scenario and the sensitivity grid as your range, and demand a discount to even the Bear case before acting.'],
                        ].map(([title, body]) => (
                            <div key={title} className="space-y-2">
                                <h4 className="font-bold text-brand-navy dark:text-white text-lg">{title}</h4>
                                <p className="text-sm text-brand-slate dark:text-slate-300 leading-relaxed">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
