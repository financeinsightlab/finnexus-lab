'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { PAGE_TYPE_META, SELECTABLE_PAGE_TYPES, isPageType, type PageType } from '@/lib/promotions/catalog';
import { normalizePath } from '@/lib/promotions/targeting';
import { api, Chip, inputClass, smallButtonClass, Spinner } from '../ui';
import { hasRule, removeRules, ruleBadge, ruleKey, upsertRules } from './draft';
import type { PageRegistryResponse, RegistryGroup, TargetRuleDraft } from './types';

type Mode = 'INCLUDE' | 'EXCLUDE';

const GROUP_ORDER = ['Core', 'Learning', 'Content', 'Company', 'Private'] as const;

/**
 * Page targeting editor.
 *
 * Produces the promotion's INCLUDE/EXCLUDE rules:
 *  - specific pages (searchable, grouped by page type, select-all-matching per group)
 *  - whole page types
 *  - Global (explicit opt-in, clearly labelled)
 *  - tags and content IDs (advanced)
 * Everything is additive and visible in the "Active rules" list, where each rule
 * can be removed or (for pages) switched between exact and "include sub-pages".
 */
export default function PageTargetSelector({
  rules,
  onChange,
  idPrefix = 'promo-targets',
  compact = false,
}: {
  rules: TargetRuleDraft[];
  onChange: (rules: TargetRuleDraft[]) => void;
  idPrefix?: string;
  compact?: boolean;
}) {
  const [mode, setMode] = useState<Mode>('INCLUDE');
  const [query, setQuery] = useState('');
  const [registry, setRegistry] = useState<PageRegistryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [customPath, setCustomPath] = useState('');
  const [customDescendants, setCustomDescendants] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [contentInput, setContentInput] = useState('');
  const requestId = useRef(0);

  // Load (and search) the registry of real public pages.
  useEffect(() => {
    const id = ++requestId.current;
    const handle = window.setTimeout(() => {
      setLoading(true);
      api<PageRegistryResponse>(`/api/admin/content/promotions/pages?q=${encodeURIComponent(query.trim())}`)
        .then((data) => {
          if (id !== requestId.current) return;
          setRegistry(data);
          setError(null);
          if (query.trim()) setOpenGroups(Object.fromEntries(data.groups.map((group) => [group.pageType, true])));
        })
        .catch((err: unknown) => {
          if (id === requestId.current) setError(err instanceof Error ? err.message : 'Page list unavailable');
        })
        .finally(() => {
          if (id === requestId.current) setLoading(false);
        });
    }, query ? 200 : 0);
    return () => window.clearTimeout(handle);
  }, [query]);

  const includeRules = rules.filter((rule) => rule.mode === 'INCLUDE');
  const isGlobal = includeRules.some((rule) => rule.targetType === 'GLOBAL');
  const selectedPathKeys = useMemo(() => new Set(rules.filter((rule) => rule.targetType === 'PATH').map(ruleKey)), [rules]);

  const pathRule = (path: string, includeDescendants = false): TargetRuleDraft => ({ mode, targetType: 'PATH', targetValue: normalizePath(path), includeDescendants });
  const isPathSelected = (path: string) => selectedPathKeys.has(ruleKey(pathRule(path)));
  const findPathRule = (path: string) => rules.find((rule) => ruleKey(rule) === ruleKey(pathRule(path)));

  const togglePath = (path: string) => {
    const rule = pathRule(path);
    onChange(hasRule(rules, rule) ? removeRules(rules, [rule]) : upsertRules(rules, [rule]));
  };
  const toggleDescendants = (rule: TargetRuleDraft) => onChange(upsertRules(rules, [{ ...rule, includeDescendants: !rule.includeDescendants }]));
  const selectGroup = (group: RegistryGroup) => onChange(upsertRules(rules, group.pages.map((page) => pathRule(page.path))));
  const clearGroup = (group: RegistryGroup) => onChange(removeRules(rules, group.pages.map((page) => pathRule(page.path))));
  const selectAllMatching = () => registry && onChange(upsertRules(rules, registry.groups.flatMap((group) => group.pages.map((page) => pathRule(page.path)))));
  const clearAllMatching = () => registry && onChange(removeRules(rules, registry.groups.flatMap((group) => group.pages.map((page) => pathRule(page.path)))));

  const togglePageType = (pageType: PageType) => {
    const rule: TargetRuleDraft = { mode, targetType: 'PAGE_TYPE', targetValue: pageType, includeDescendants: false };
    onChange(hasRule(rules, rule) ? removeRules(rules, [rule]) : upsertRules(rules, [rule]));
  };
  const toggleGlobal = () => {
    const rule: TargetRuleDraft = { mode: 'INCLUDE', targetType: 'GLOBAL', targetValue: '', includeDescendants: false };
    onChange(hasRule(rules, rule) ? removeRules(rules, [rule]) : upsertRules(rules, [rule]));
  };
  const addCustomPath = () => {
    if (!customPath.trim()) return;
    onChange(upsertRules(rules, [pathRule(customPath, customDescendants)]));
    setCustomPath('');
  };
  const addTag = () => {
    const tags = tagInput.split(/[\n,]/).map((value) => value.trim()).filter(Boolean);
    if (!tags.length) return;
    onChange(upsertRules(rules, tags.map((tag) => ({ mode, targetType: 'TAG', targetValue: tag, includeDescendants: false }))));
    setTagInput('');
  };
  const addContent = () => {
    const keys = contentInput.split(/[\n,]/).map((value) => value.trim()).filter((value) => value.includes(':'));
    if (!keys.length) return;
    onChange(upsertRules(rules, keys.map((key) => ({ mode, targetType: 'CONTENT', targetValue: key, includeDescendants: false }))));
    setContentInput('');
  };

  const matchingCount = registry?.totalPages ?? 0;
  const selectedMatching = registry ? registry.groups.reduce((sum, group) => sum + group.pages.filter((page) => isPathSelected(page.path)).length, 0) : 0;
  const pageTypeGroups = GROUP_ORDER.map((group) => ({ group, types: SELECTABLE_PAGE_TYPES.filter((key) => PAGE_TYPE_META[key].group === group) })).filter((entry) => entry.types.length);
  const modeTone = mode === 'INCLUDE' ? 'text-primary' : 'text-red-600 dark:text-red-400';

  return (
    <div className="space-y-4" data-testid="page-target-selector">
      {/* Mode + summary */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div role="radiogroup" aria-label="Rule mode" className="inline-flex rounded-lg border border-border p-0.5 text-xs font-bold">
          {(['INCLUDE', 'EXCLUDE'] as Mode[]).map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={mode === value}
              onClick={() => setMode(value)}
              className={`rounded-md px-3 py-1.5 transition-colors ${mode === value ? (value === 'INCLUDE' ? 'bg-primary text-primary-foreground' : 'bg-red-600 text-white') : 'text-muted-foreground hover:text-foreground'}`}
            >
              {value === 'INCLUDE' ? 'Show on' : 'Never show on'}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{includeRules.length}</span> include rule{includeRules.length === 1 ? '' : 's'} · <span className="font-semibold text-foreground">{rules.length - includeRules.length}</span> exclusion{rules.length - includeRules.length === 1 ? '' : 's'}
        </p>
      </div>

      {/* Global (explicit) */}
      <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 ${isGlobal ? 'border-amber-500/50 bg-amber-500/10' : 'border-border bg-background'}`}>
        <input type="checkbox" checked={isGlobal} onChange={toggleGlobal} className="mt-0.5 h-4 w-4 accent-amber-500" aria-describedby={`${idPrefix}-global-hint`} />
        <span>
          <span className="block text-sm font-semibold text-foreground">Global — every public page</span>
          <span id={`${idPrefix}-global-hint`} className="mt-0.5 block text-xs leading-5 text-muted-foreground">
            Opt-in only. Reaches every eligible public page (never the dashboard, account, checkout, sign-in, legal or status pages). Combine with exclusions below to carve out sections.
          </span>
        </span>
      </label>

      {/* Page types */}
      <div className="rounded-xl border border-border bg-background p-3">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Page types <span className={`normal-case ${modeTone}`}>({mode === 'INCLUDE' ? 'show on' : 'never show on'})</span></p>
        <div className="mt-2 space-y-2">
          {pageTypeGroups.map(({ group, types }) => (
            <div key={group} className="flex flex-wrap items-center gap-1.5">
              <span className="w-16 shrink-0 text-[11px] font-semibold text-muted-foreground">{group}</span>
              {types.map((key) => {
                const meta = PAGE_TYPE_META[key];
                const included = hasRule(rules, { mode: 'INCLUDE', targetType: 'PAGE_TYPE', targetValue: key, includeDescendants: false });
                const excluded = hasRule(rules, { mode: 'EXCLUDE', targetType: 'PAGE_TYPE', targetValue: key, includeDescendants: false });
                const count = registry?.pageTypes.find((entry) => entry.key === key)?.count;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => togglePageType(key)}
                    title={meta.description}
                    aria-pressed={mode === 'INCLUDE' ? included : excluded}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${included ? 'border-primary bg-primary text-primary-foreground' : excluded ? 'border-red-500 bg-red-500/10 text-red-700 line-through dark:text-red-300' : 'border-border bg-card text-muted-foreground hover:text-foreground'}`}
                  >
                    {meta.label}{typeof count === 'number' ? <span className="ml-1 opacity-70">{count}</span> : null}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Specific pages */}
      <div className="rounded-xl border border-border bg-background p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Specific pages <span className={`normal-case ${modeTone}`}>({mode === 'INCLUDE' ? 'show on' : 'never show on'})</span></p>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            {loading ? <Spinner label="Searching…" /> : <span>{matchingCount.toLocaleString()} page{matchingCount === 1 ? '' : 's'} · {selectedMatching} selected</span>}
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input
            id={`${idPrefix}-search`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by path, title or tag (e.g. /research/ai, valuation, dcf)"
            className={`${inputClass} mt-0`}
            aria-label="Search pages"
          />
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={selectAllMatching} disabled={!registry || matchingCount === 0} className={smallButtonClass}>Select all matching</button>
            <button type="button" onClick={clearAllMatching} disabled={!registry || selectedMatching === 0} className={smallButtonClass}>Clear matching</button>
          </div>
        </div>
        {error && <p className="mt-2 text-xs text-destructive" role="alert">{error}</p>}
        <div className={`mt-3 ${compact ? 'max-h-64' : 'max-h-96'} space-y-1 overflow-y-auto pr-1`}>
          {registry?.groups.length === 0 && !loading && <p className="py-4 text-center text-xs text-muted-foreground">No pages match “{query}”.</p>}
          {registry?.groups.map((group) => {
            const open = openGroups[group.pageType] ?? false;
            const selectedInGroup = group.pages.filter((page) => isPathSelected(page.path)).length;
            return (
              <div key={group.pageType} className="rounded-lg border border-border">
                <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-1.5">
                  <button type="button" onClick={() => setOpenGroups((current) => ({ ...current, [group.pageType]: !open }))} aria-expanded={open} className="flex items-center gap-2 text-left text-xs font-semibold text-foreground">
                    <span aria-hidden="true" className="text-muted-foreground">{open ? '▾' : '▸'}</span>
                    {group.label}
                    <span className="font-normal text-muted-foreground">{selectedInGroup}/{group.total}</span>
                    {group.total > group.pages.length && <span className="font-normal text-muted-foreground">(showing first {group.pages.length})</span>}
                  </button>
                  <div className="flex gap-1">
                    <button type="button" onClick={() => selectGroup(group)} className="rounded px-1.5 py-0.5 text-[11px] font-semibold text-primary hover:bg-primary/10">Select all</button>
                    <button type="button" onClick={() => clearGroup(group)} disabled={selectedInGroup === 0} className="rounded px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground hover:bg-muted disabled:opacity-40">Clear</button>
                  </div>
                </div>
                {open && (
                  <ul className="divide-y divide-border border-t border-border">
                    {group.pages.map((page) => {
                      const selected = isPathSelected(page.path);
                      const rule = selected ? findPathRule(page.path) : undefined;
                      return (
                        <li key={page.path} className="flex items-center gap-2 px-2 py-1.5 text-xs">
                          <input
                            id={`${idPrefix}-${page.path}`}
                            type="checkbox"
                            checked={selected}
                            onChange={() => togglePath(page.path)}
                            className={`h-3.5 w-3.5 ${mode === 'INCLUDE' ? 'accent-primary' : 'accent-red-600'}`}
                          />
                          <label htmlFor={`${idPrefix}-${page.path}`} className="min-w-0 flex-1 cursor-pointer">
                            <span className="block truncate font-mono text-[11px] text-foreground">{page.path}</span>
                            <span className="block truncate text-[11px] text-muted-foreground">{page.title}{page.contentKey ? ` · ${page.contentKey}` : ''}</span>
                          </label>
                          {rule && rule.mode === 'EXCLUDE' && <Chip tone="danger">excluded</Chip>}
                          {rule && (page.isHub || rule.includeDescendants) && (
                            <label className="flex shrink-0 cursor-pointer items-center gap-1 text-[11px] text-muted-foreground" title="Also match every page underneath this path">
                              <input type="checkbox" checked={rule.includeDescendants} onChange={() => toggleDescendants(rule)} className="h-3 w-3 accent-primary" />
                              + sub-pages
                            </label>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3 sm:flex-row sm:items-center">
          <input
            value={customPath}
            onChange={(event) => setCustomPath(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); addCustomPath(); } }}
            placeholder="Custom path, e.g. /research/ai-search"
            className={`${inputClass} mt-0 font-mono text-xs`}
            aria-label="Custom path"
          />
          <label className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground"><input type="checkbox" checked={customDescendants} onChange={(event) => setCustomDescendants(event.target.checked)} className="h-3.5 w-3.5 accent-primary" /> include sub-pages</label>
          <button type="button" onClick={addCustomPath} disabled={!customPath.trim()} className={smallButtonClass}>Add path</button>
        </div>
        <p className="mt-1 text-[11px] leading-5 text-muted-foreground">Paths are normalised (leading slash, no trailing slash, no query string). <code>/research</code> matches only the research hub unless “include sub-pages” is on.</p>
      </div>

      {/* Advanced: tags + content IDs */}
      <details className="rounded-xl border border-border bg-background p-3">
        <summary className="cursor-pointer text-xs font-bold uppercase tracking-wider text-muted-foreground">Advanced: tags & content IDs</summary>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor={`${idPrefix}-tags`} className="text-xs font-semibold text-foreground">Tags / categories</label>
            <div className="mt-1 flex gap-2">
              <input id={`${idPrefix}-tags`} value={tagInput} onChange={(event) => setTagInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); addTag(); } }} placeholder="e.g. valuation, fintech" className={`${inputClass} mt-0 text-xs`} />
              <button type="button" onClick={addTag} disabled={!tagInput.trim()} className={smallButtonClass}>Add</button>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">Matches pages whose tags, sector or category contain the tag (case-insensitive).</p>
          </div>
          <div>
            <label htmlFor={`${idPrefix}-content`} className="text-xs font-semibold text-foreground">Content IDs</label>
            <div className="mt-1 flex gap-2">
              <input id={`${idPrefix}-content`} value={contentInput} onChange={(event) => setContentInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); addContent(); } }} placeholder="e.g. RESEARCH:ai-search" className={`${inputClass} mt-0 font-mono text-xs`} />
              <button type="button" onClick={addContent} disabled={!contentInput.includes(':')} className={smallButtonClass}>Add</button>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">Format <code>TYPE:slug</code> — shown next to each page in the list above.</p>
          </div>
        </div>
      </details>

      {/* Active rules */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active rules</p>
        {rules.length === 0 ? (
          <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">No targeting yet — this promotion will not appear anywhere until you choose pages, page types or Global.</p>
        ) : (
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {rules.map((rule) => {
              const badge = ruleBadge(rule);
              const label = rule.targetType === 'PAGE_TYPE' && isPageType(rule.targetValue) ? badge.text.replace(rule.targetValue, PAGE_TYPE_META[rule.targetValue].label) : badge.text;
              return (
                <li key={ruleKey(rule)} className="inline-flex items-center gap-1">
                  <Chip tone={badge.tone} title={label}>{label}</Chip>
                  {rule.targetType === 'PATH' && (
                    <button type="button" onClick={() => toggleDescendants(rule)} className="rounded px-1 text-[10px] text-muted-foreground hover:text-foreground" title={rule.includeDescendants ? 'Switch to exact page only' : 'Also include sub-pages'}>
                      {rule.includeDescendants ? 'exact' : '+sub'}
                    </button>
                  )}
                  <button type="button" onClick={() => onChange(removeRules(rules, [rule]))} aria-label={`Remove rule ${label}`} className="rounded px-1 text-[11px] text-muted-foreground hover:text-destructive">×</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
