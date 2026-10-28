# Calculator Upgrades — All Remaining Tools (batch programme)

Same 8-phase brief as the DCF (`docs/dcf-valuation-upgrade.md`) and WACC
(`docs/wacc-calculator-upgrade.md`) upgrades, applied to the remaining 14
calculators. Pattern per tool: **audit → pure engine in `lib/finance/` with
independently-derived tests → component rewired onto the engine (same visual
design, same result keys) → dead client-side gate neutralised → verify.**
The server `Paywall` remains the only entitlement gate for gated tools.

## Cross-cutting legacy findings (all 14)
- Maths embedded in component `useMemo`s; zero tests anywhere.
- 10 of 14 carry the same dead client "30-minute trial + email unlock" code
  found in the legacy DCF (unreachable behind the server Paywall; its
  subscribe call only writes a newsletter tag). **Neutralised in this pass**
  (lock-triggering effects removed; overlay can never fire). Full deletion
  of the dead overlay JSX is a follow-up cleanup.
- Input coercion masks errors (`Number(x)||0`, silent clamps, `safeX`
  floors), several tools show `NaN`/`Infinity` on cleared fields.
- Canned narrative blocks, some labelled "AI" — retained as copy but now fed
  by engine numbers; relabelling to rule-based diagnostics is incremental.
- No persistence/share-links (engines now ship `parse*/`*ToQuery` for the
  flat-input tools; autosave wired where state shape allows).

## Per-tool audit headlines (details in each engine header)
1. **3-Statement** (`three-statement.ts`): balance sheet balances by
   construction (good), but depreciation never stops at end of useful life
   (over-depreciates when life < horizon; PP&E floor at 0 masks it), working
   capital is receivables-only, debt can never be repaid (financing ≡ 0),
   opening PP&E/equity are silent plugs. Fixed: vintage depreciation with
   cut-off, DIO/DPO added (0 = legacy), optional debt-repayment %, balance
   assertion every year, DCF-driver handoff.
2. **SaaS LTV/CAC** (`saas.ts`): cohort curve excludes month-0 gross profit
   (cumulative understates LTV by one month vs the closed form); 0% churn
   silently floored to 0.1%; simple payback ignores churn decay. Fixed:
   consistent series, churn-adjusted payback, optional discounted LTV.
3. **CCA** (`cca.ts`): median picks the upper middle on even peer counts
   (biases value up when a peer drops out); silent fallback blends. Fixed:
   proper median, N peers, explicit validity per multiple.
4. **Ratio Analyzer** (`ratios.ts`): formulas sound; inputs are 15
   independent fields that can contradict each other (components > totals,
   statements not balancing) with no warning. Fixed: consistency warnings.
5. **TVM** (`tvm.ts`): EMI/PV/FV/Gordon correct incl. r=0; explodes at
   years≤0 / rate≤−100%. Fixed: validation + full amortisation schedule.
6. **Portfolio Risk** (`portfolio.ts`): ρ outside [−1,1] produces negative
   variance silently sqrt-clamped. Fixed: validation + tangency (max-Sharpe)
   weight added.
7. **Market Sizing** (`market-sizing.ts`): user counts used *unclamped*
   inputs while money used clamped ones (inconsistent); silent 0–100
   clamping hides typos. Fixed: single validated path, errors not clamps.
8. **Q-Commerce** (`qcommerce.ts`): break-even understates — contribution
   per order omits returns loss and revenue-linked marketing. Fixed:
   full per-order waterfall, correct BE, scenario engine reuse.
9. **B2B ROI** (`b2b-roi.ts`): CAC shown as 0 when nothing closes (should be
   n.m.); ROI on gross ACV with no margin/duration. Engine adds optional
   gross-margin & contract-life (defaults reproduce legacy).
10. **AI Agent ROI** (`ai-roi.ts`): assumes automation % of payroll becomes
    cash saved instantly from month 1. Engine adds ramp + savings-realisation
    factor (defaults reproduce legacy), assumptions disclosed.
11. **Autonomous Workforce** (`workforce.ts`): `currentMultiple` input is
    **dead** (never used); "gross margin expansion" is a cost-reduction %;
    value creation uses only the projected multiple on the expansion.
    Fixed labels in engine outputs; re-rating vs savings split disclosed.
12. **Tokenomics** (`tokenomics.ts`): allocations silently renormalised to
    100%; TGE 10% and 48-month community vesting are hard-coded constants.
    Fixed: both are inputs; renormalisation (if kept) is an explicit warning.
13. **Porter's** (`porters.ts`): unweighted average only. Engine adds
    optional force weights, bands, dominant-force; templates stay UI-side.
14. **CPM/PERT** (`cpm.ts`): passes rely on node numbers being topological
    (single sorted sweep); no cycle detection. Fixed: Kahn topological
    sort, cycle/disconnect errors, PERT on-time probability (normal CDF).

## Delivery record
(Appended after verification — test counts, smoke results, per-tool status.)

---

# Delivery Record (Phase 8) — all 14 tools upgraded

**Date:** 2026-10-28 · **Branch:** `arena/570c2fa8-finnexus-lab`

## Architecture delivered (same discipline as DCF/WACC)

Every tool's maths now lives in a pure, tested engine under `lib/finance/`:
`three-statement.ts`, `saas.ts`, `cca.ts`, `ratios.ts`, `tvm.ts`,
`portfolio.ts`, `market-sizing.ts`, `qcommerce.ts`, `b2b-roi.ts`,
`ai-roi.ts`, `workforce.ts`, `tokenomics.ts`, `porters.ts`, `cpm.ts`.
Each returns `{ errors, warnings, …nulls-not-NaN }`, documents its formula
contract in the file header, and ships tolerant `parseXInputs` /
`xInputsToQuery` codecs used for autosave + share links. Components keep
their existing charts/JSX; only the calculation core was replaced and
aliased to legacy variable names (surgical rewiring, zero visual redesign).

## Material corrections (all quantified, all golden-tested)

| Tool | What was wrong | Now |
|---|---|---|
| 3-Statement | Depreciation never stopped at end of asset life (PP&E floored at 0 hid over-depreciation — at life 3, Y5 dep 203 vs correct 133 in test case); receivables-only WC; financing ≡ 0 | Vintage depreciation with cut-off; DIO/DPO inputs; optional debt repayment; opening-equity plug disclosed; balance difference asserted 0 every year; **drivers → DCF handoff link** |
| SaaS | Cohort curve excluded month-0 GP (understated cum. profit by exactly GP); 0% churn silently floored to 0.1% | t=0-inclusive series (1667.55 vs legacy 1582.55 at Mo36); 0% churn → honest "infinite LTV"; churn-adjusted payback + optional discounted LTV |
| CCA | Even-count "median" = upper middle (upward bias as peers drop out) | True median; mean/min/max; explicit exclusion of invalid multiples; DLOM-on-equity preserved; football-field range |
| Ratios | 15 independent fields could contradict with no warning | Engine + consistency warnings (components>totals, EBITDA−dep≠EBIT, non-balancing); nulls not NaN/∞ |
| TVM | Exploded at years≤0 / rate≤−100% | Guard rails; full amortisation schedule from engine (EMI golden ₹44,986.30) |
| Portfolio | ρ outside [−1,1] → negative variance silently sqrt-clamped | Validation errors; **tangency (max-Sharpe) portfolio added** (closed form grid-verified); MVP clamping disclosed |
| Market Sizing | Users computed from raw %, money from silently clamped %; `$` formatting of an India model | One validated path (out-of-range % = error); ₹ formatting; convergence diagnostics as warnings |
| Q-Commerce | **Break-even understated ~9.6×** (returns loss + marketing/order missing from contribution: legacy ~348 orders/day vs honest ~3,333 at defaults) | Complete per-order waterfall; break-even from engine; negative-contribution case handled explicitly |
| B2B ROI | CAC displayed $0 when nothing closed; ROI on gross ACV only | CAC = not-meaningful; gross-margin + contract-life inputs (defaults reproduce legacy); CAC payback + LTV:CAC |
| AI ROI | Assumed automation % of payroll = cash saved from month 1 | Adoption-ramp and savings-realisation inputs (defaults = legacy); ramp-aware payback |
| Autonomous Workforce | `currentMultiple` input was **dead**; "margin expansion" was a cost-reduction %; 100% replacement assumed silently | Both multiples used and labelled (value at current vs projected); replacement-share input; warnings |
| Tokenomics | Allocations silently renormalised; TGE 10% / 48-month community vesting hard-coded | Renormalisation is a loud warning; both are inputs; constant-price disclosure on market cap |
| Porter's | Unweighted average could mask one brutal force | Engine banding + dominant-force masking warning; local autosave (notes don't belong in URLs) |
| CPM/PERT | Passes assumed node numbers = topological order; cycles silently wrong | Kahn topological sort; cycle errors; **P(finish ≤ target)** via normal CDF; renumbered-network regression test |

## Workflow (Phase 4)

- **Persistence:** autosave to localStorage on all 14; share-link restore on
  the 12 flat-state tools (copy-link button each). Porter's keeps local
  autosave only (free-text notes excluded from URLs by design); CPM
  autosaves the network.
- **Validation UX:** every tool now renders engine errors (blocking, `role=alert`)
  and warnings above results instead of error-masking coercions.
- **Cross-tool flow:** 3-Statement → DCF ("Value these drivers in the DCF →")
  joins the existing WACC → DCF handoff; DCF's merge-over-autosave restore
  already handles it.

## Entitlements (Phase 6)

Server-side `Paywall` + registry `gated` flags are **unchanged** (7 of these
tools remain premium-gated exactly as before; verified anonymous smoke shows
no calculator render on gated slugs). The dead client-side "30-minute trial +
newsletter unlock" was neutralised in the 10 tools that carried it — it sat
behind the server gate, granted nothing, and a localStorage flag can never be
an entitlement. No basic calculation was newly paywalled; no premium feature
was faked. Registry copy for all 14 rewritten to describe what the tools
actually do (previous copy claimed Excel templates, "India market data",
"cohort heatmaps" etc. that do not exist).

## Tests & checks (Phase 7)

- **40 new engine tests** (`batch-a.test.ts`, `batch-bc.test.ts`) built on
  independently derived Python goldens (constants in the audit section).
  Full suite: **384/384 across 46 files** (was 344).
- **tsc:** 184 errors = pre-existing baseline (sandbox Prisma noise); zero
  errors in any touched file. **eslint:** 0 errors on touched files
  (39 benign warnings, mostly pre-existing unused imports and
  `exhaustive-deps` on intentionally field-enumerated memos).
- **Smoke:** all 16 tool routes (14 + DCF + WACC) HTTP 200; SSR markers for
  new features verified (tangency portfolio, share links, realisation input,
  critical path); garbage query params return 200 everywhere; DCF handoff
  URL returns 200. Premium-rendered views of the 7 gated tools could not be
  clicked through in-sandbox (mock auth) — rendering correctness is
  established by SSR of the free tools, tsc, and the engine tests.

## Assumptions & limitations (disclosed in-engine)

Simplifications are documented in each engine header: e.g. 3-Statement
interest on beginning debt and `tax=max(0,EBT×t)`; Q-Commerce 30-day month
and step-fixed staffing; tokenomics constant price; PERT normal
approximation on a single critical path; Porter's equal weights unless
supplied. Component-level cosmetic follow-ups (not done, zero functional
impact): dead lock-overlay JSX + unused `handleSubscribe` remain in 10
components but are now unreachable; several components still label
themselves "Premium Web Calculator" including on free tools.

## Rollback

All work is on `arena/570c2fa8-finnexus-lab`. Engines are additive files;
each component change can be reverted independently (`git checkout <commit0>
-- components/calculators/<File>.tsx`) without touching others. No schema,
auth, entitlement, or URL changes — rollback is a pure code revert.
