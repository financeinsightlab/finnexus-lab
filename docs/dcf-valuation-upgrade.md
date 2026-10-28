# DCF Valuation Model — Professional Upgrade

Selected tool: **DCF Valuation Model — `/tools/dcf-valuation-model`**
(`components/calculators/DcfCalc.tsx`, registry id 1, previously `gated: true`).

---

## Phase 1 — Audit of the existing model (as found, 2026-10-28)

### Inputs (11, all `useState` in the component)

| Input | Default | Unit | Constraint in code |
|---|---|---|---|
| Revenue (Yr 0) | 10,000,000 | $ actuals (hard-coded USD) | none — negatives accepted |
| Revenue growth | 15% flat, all years | % | none |
| EBITDA margin | 20% flat | % | none (>100% accepted) |
| D&A | 5% of revenue | % | none |
| Tax rate | 21% (US federal) | % | none (>100% accepted) |
| Capex + ΔNWC (lumped) | 5% of revenue | % | none |
| Terminal growth | 2.5% | % | must be < WACC (only validation present) |
| WACC | 10% | % | none (≤0 accepted) |
| Cash / Debt | $2.0M / $1.5M | $ | none |
| Shares | 1,000,000 | count | ≤0 → price silently 0 |

### Outputs
5-year projection table (Revenue, EBITDA, Tax, NOPAT, Capex, UFCF, DF, PV),
equity bridge (ΣPV explicit + PV terminal = EV; +cash −debt = equity value;
÷ shares = share price), PV composition bar chart, KPI cards, canned narrative.

### Formulas (as implemented)
`EBIT = EBITDA − D&A`; `NOPAT = EBIT×(1−t)`; `UFCF = NOPAT + D&A − Capex&NWC`;
`PV = UFCF_t / (1+WACC)^t` (end-year); `TV = FCF_5(1+g)/(WACC−g)` (Gordon);
`EV = ΣPV₁₋₅ + TV/(1+WACC)^5`; `EqV = EV + Cash − Debt`; `P = EqV / shares`.

Golden baseline at defaults (independently replicated): ΣPV = 6,783,621.40;
TV = 32,573,929.65; PV(TV) = 20,225,847.50; EV = 27,009,468.89;
EqV = 27,509,468.89; **ΔP = 27.5095**; TV share of EV = 74.88%.
(Note: at defaults D&A% = Capex% = 5%, so FCF ≡ NOPAT — a coincidence that
would mask formula errors; test cases must use asymmetric values.)

### Bugs & questionable assumptions found

1. **PV row doesn't reconcile.** Yr-0 FCF ($1,185,000) is displayed in the PV
   row but excluded from EV — the displayed PV row overstates the bridge by
   exactly that amount. A reviewer footing the table gets a different EV.
2. **Statement doesn't foot.** D&A and EBIT rows are never shown, so
   "EBITDA − Tax" (displayed) ≠ NOPAT (displayed). No audit trail.
3. **Terminal value (a stock) is placed in the UFCF (flow) row.**
4. **Chart silently zeroes negative-PV years** (`pvFcf > 0 ? … : 0`).
5. **Capex and ΔNWC lumped** as one % of revenue. ΔNWC must scale with the
   *change* in revenue (NWC level = % × revenue), not the level — the model
   overstates reinvestment for a no-growth firm (ΔNWC should be 0 at g=0).
6. **Full tax benefit on negative EBIT** assumed silently (NOPAT = EBIT(1−t)
   for EBIT<0 credits tax immediately).
7. **No input validation** beyond WACC>g: margins >100%, tax >100%, negative
   revenue/shares all produce numbers; clearing a field coerces to 0 via
   `Number(val) || 0` and the model jumps without explanation.
8. **Registry promises features that don't exist**: "3 scenarios, sensitivity
   analysis, and WACC calculator" — none are implemented. The tool was sold
   (Pro) on undelivered capabilities.
9. **Dead, misleading gating code.** The server `Paywall` never renders the
   component for non-Pro users, so the in-component 30-minute trial + email
   gate is unreachable — and its "Pay & Subscribe" button only POSTs to a
   newsletter endpoint (`/api/subscribe`) and sets a localStorage flag.
10. **Fake artefacts:** table is dressed as `DCF_Full_Operating_Model_v7.xlsx`
    (no workbook exists); 3 hard-coded if/else strings are labelled
    "AI M&A Diligence Engine".
11. **No persistence, no export, no tests.** Inputs lost on reload; math is
    embedded in a `useMemo` inside the UI component (untestable as-is).
12. **Currency/units:** hard-coded USD glyphs and $M formatting on an INR-first
    product; no currency or scale declaration anywhere.
13. Missing professional basics: no exit-multiple terminal cross-check, no
    implied multiples, no mid-year discounting option, fixed 5-year horizon,
    flat growth/margin with no fade, single scenario.

### Data & persistence today
No external data (all defaults are illustrative, US-flavoured). No save/export.
Server entitlement: whole tool behind Pro via `Paywall` (server component,
children never sent to non-entitled browsers) driven by `lib/entitlements.ts`.

---

## Phase 2 — Professional specification (scope decision)

**Essential (this delivery)** — correctness + what the registry already promises:
1. Pure, tested calculation engine `lib/finance/dcf.ts` (no React), explicit
   formulas, structured results, validation errors as data.
2. Fully reconciling statement: Revenue → EBITDA → −D&A → EBIT → −Tax → NOPAT
   → +D&A → −Capex → −ΔNWC → UFCF. Capex (% revenue) split from NWC
   (NWC = % × revenue; ΔNWC = change in level). Yr-0 shown as "actuals/LTM"
   context column, **excluded from PV and labelled as such**.
3. Editable horizon (3–10 yrs), growth-fade option (linear fade of revenue
   growth to terminal g by the final year), mid-year discounting toggle.
4. **3 scenarios** (Bear/Base/Bull) via editable deltas on growth, margin,
   WACC → comparison table + valuation range.
5. **Sensitivity grid**: share price across WACC (±2pp) × terminal g (±1pp);
   invalid cells (WACC≤g) rendered `n/a`, never fabricated.
6. **Exit-multiple cross-check**: TV from EV/EBITDA exit multiple, implied
   perpetuity growth of the multiple, implied exit multiple of Gordon TV.
7. Validation: field ranges with messages; model-level diagnostics (TV share
   of EV, negative-FCF years, negative equity, g vs WACC, tax-on-losses
   disclosure with toggle). Negative values displayed, never zeroed.
8. Currency selection (INR/USD/EUR/GBP — labelling only, no FX conversion;
   disclosed) with Intl formatting.
9. Persistence: autosave + named saved analyses in **localStorage**, shareable
   URL encoding of all assumptions, JSON import/export of assumptions.
10. Export: Excel-openable **CSV workbook** (assumptions, projection, bridge,
    scenarios, sensitivity) generated client-side from engine output.
11. Honest framing: diagnostics labelled rule-based; assumptions panel lists
    every input, its source ("user-entered / illustrative default"), formulas,
    and limitations. Remove dead client gating and fake workbook chrome.

**Optional / future (recorded, not built):** in-tool WACC build-up (CAPM) —
the product already has `/tools/wacc-calculator`; cross-link instead.
Per-year editable forecast grid; Monte Carlo; XLSX binary export (new
dependency — CSV covers the job); server-side saved analyses + sharing
(requires a DB model — out of this tool's scope); live comps/market data
(requires a licensed provider — Phase 5).

**Business model (Phase 6):** the paying user is an analyst/founder/CFO who
needs a defensible valuation range and a deliverable, repeatedly. The basic
DCF maths is commodity → **free**. Premium (existing Pro entitlement, decided
server-side) = scenario comparison, sensitivity grid, exit-multiple
cross-check, CSV/JSON export — i.e. the analysis depth and the deliverable,
not the arithmetic. Registry `gated` flips to `false`; the page passes the
server-computed premium flag into the component for feature gating; the
server `Paywall` flow for other tools is untouched.

**Data quality (Phase 5):** no external provider is introduced. All numbers
are user assumptions; defaults are labelled *illustrative* in the UI. Nothing
is described as "live". No credentials exist client-side.

---

## Phase 3 — Formula specification (engine contract)

Inputs (fractions internally, % at the UI boundary): `revenue0`,
`revenueGrowth`, `ebitdaMargin`, `daPctRevenue`, `taxRate`, `capexPctRevenue`,
`nwcPctRevenue`, `terminalGrowth`, `wacc`, `cash`, `debt`, `shares`,
`forecastYears (3–10)`, `midYearDiscounting`, `growthFade`,
`taxBenefitOnLosses`, `exitMultiple` (for cross-check).

For t = 1..N: `g_t = fade? lerp(growth, terminalGrowth, t/N) : growth`;
`Rev_t = Rev_{t−1}(1+g_t)`; `EBITDA = Rev×m`; `D&A = Rev×da%`;
`EBIT = EBITDA − D&A`; `Tax = EBIT×t` (if EBIT<0 and !taxBenefitOnLosses → 0);
`NOPAT = EBIT − Tax`; `Capex = Rev×cx%`; `NWC_t = Rev_t×nwc%`,
`ΔNWC = NWC_t − NWC_{t−1}` (NWC_0 from Rev_0);
`UFCF = NOPAT + D&A − Capex − ΔNWC`;
`DF_t = (1+WACC)^−(t − (midYear?0.5:0))`; `PV_t = UFCF×DF_t`.
Gordon: `TV = UFCF_N(1+g)/(WACC−g)`, discounted at `(N − adj)` — the same
mid-year convention as the explicit flows, applied consistently and disclosed
in the UI (practitioners differ; consistency + disclosure is the point).
Exit: `TV_x = EBITDA_N × multiple`; implied g solves
`TV_x = UFCF_N(1+g)/(WACC−g)` ⇒ `g* = (TV_x·WACC − UFCF_N)/(TV_x + UFCF_N)`.
Bridge: `EV = ΣPV + PV(TV)`; `EqV = EV + Cash − Debt`; `P = EqV/shares`.
Implied multiples: EV/EBITDA₀, EV/Revenue₀, P vs inputs.

Validation (errors block outputs; warnings don't): finite numbers;
revenue0 > 0; shares > 0; WACC > 0; terminalGrowth < WACC; taxRate ∈ [0, 1);
margin/D&A/capex/NWC% ∈ [−1, 2] sanity bounds with warnings outside [0,1];
growth > −1. All % UI inputs converted once at the boundary. IEEE-754 doubles
are appropriate at these magnitudes; rounding happens only in formatters.
Non-finite intermediate results surface as model errors, never NaN in the UI.

Verification: `lib/finance/dcf.test.ts` with independently derived cases —
(1) golden regression vs the Python replication of legacy defaults (with
capex split replicated: legacy lumped 5% = capex 5% + NWC 0% gives ΔNWC=0,
so legacy numbers reproduce exactly as a special case); (2) constant-FCF
annuity closed form; (3) zero-growth perpetuity TV = FCF/WACC; (4) ΔNWC = 0
at zero growth; (5) mid-year factor = √(1+WACC); (6) bridge identity;
(7) implied-g round-trip; (8) every validation rule + WACC≤g; (9) sensitivity
monotonicity (price ↓ as WACC ↑, ↑ as g ↑) and n/a cells; (10) scenario
delta application. Expected values are computed in the test file from
closed forms or hard-coded from the independent replication — never by
calling the engine twice.

---

## Phase 8 — Delivery record (2026-10-28)

### 1. Before → after

| Capability | Before | After |
|---|---|---|
| Maths location | `useMemo` inside 726-line component, untestable | Pure engine `lib/finance/dcf.ts`, 36 unit tests vs independent closed forms |
| Statement integrity | PV row included Yr-0 FCF not in EV; D&A/EBIT rows hidden — table didn't foot | Every row shown and reconciling (Rev→EBITDA→D&A→EBIT→Tax→NOPAT→+D&A→Capex→ΔNWC→UFCF→DF→PV); Yr-0 labelled "actuals — excluded from PV" |
| Capex vs ΔNWC | Lumped % of revenue (wrong at g=0) | Split; ΔNWC derived from revenue change (0 at zero growth — tested) |
| Scenarios / sensitivity | Promised in registry, **not implemented** | Bear/Base/Bull with editable deltas + range view; 5×5 WACC×g grid with honest `n/a` cells (Pro) |
| Terminal value | Gordon only | + exit-multiple cross-check with implied-g / implied-multiple reconciliation (Pro) |
| Horizon / conventions | Fixed 5y, flat, end-year only | 3–10y, growth-fade option, mid-year toggle, tax-on-losses toggle (all disclosed) |
| Validation | WACC>g only; silent 0-coercion; negative PVs zeroed in chart | Full field+model validation, error state blocks outputs, warnings surface negative-FCF years / TV share / negative equity; negatives displayed |
| Currency | Hard-coded $ | INR/USD/EUR/GBP Intl formatting (labelling only, disclosed) |
| Persistence | None (lost on reload) | Autosave + named saved analyses (browser-local, labelled), shareable assumption URLs, JSON import |
| Export | None (fake `.xlsx` filename) | CSV workbook with provenance header (Pro), assumptions JSON (Pro); CSV builder unit-tested against engine output |
| Gating | Whole tool Pro + dead client trial whose "Pay" button hit a newsletter endpoint | Core DCF free; analysis depth + exports Pro via the server-decided entitlement flag; dead code removed. Other tools' server Paywall unchanged (verified) |
| "AI" narrative | 3 if/else strings labelled AI | "Model diagnostics (rule-based)" listing actual checks |

### 2–3. Formula spec & assumptions
Phase 3 above is the implemented contract; engine header carries the same
spec + disclosures. Known simplifications (disclosed in-UI): flat ratios,
no loss carry-forward by default, annual periods, no bridge adjustments
beyond cash/debt, IEEE-754 doubles, currency as label.

### 4. Files changed
- **New:** `lib/finance/dcf.ts`, `lib/finance/dcf.test.ts`,
  `lib/finance/dcf-export.ts`, `lib/finance/dcf-export.test.ts`, this doc.
- **Rewritten:** `components/calculators/DcfCalc.tsx` (consumes the engine;
  dead trial/email-gate removed; scenario/sensitivity/exit panels; toolbar).
- **Surgical:** `app/(dashboard)/tools/[slug]/page.tsx` (DCF branch passes the
  real server premium flag), `lib/tools-registry.ts` (DCF entry: `gated:false`,
  truthful description/includes). No other tool, route, auth or DB changes.

### 5. Tests & actual outcomes
- `npx vitest run` → **42 files / 315 tests passed** (274 prior + 41 new:
  golden legacy regression to the rupee, asymmetric Python-replicated case,
  annuity/perpetuity/mid-year/fade closed forms, 13 validation cases,
  scenario ordering + invalid-scenario handling, sensitivity monotonicity +
  n/a cells, serialisation round-trip/garbage-safety, 5 CSV export tests).
- ESLint on all touched files → **0 errors**. `tsc` → 184 pre-existing
  baseline errors, **0 in touched files** (unchanged count).
- Live smoke (dev server): anonymous `/tools/dcf-valuation-model` → 200 with
  full free model (default share price renders 27.51 = golden 27.5095),
  three honest Pro locked panels, no paywall, fake artefacts gone; a still-
  gated tool (`3-statement-model`) still paywalls; garbage share-link params
  degrade safely to defaults (200).
- `npm run build` remains sandbox-blocked at `prisma generate` (pre-existing
  Prisma CDN issue) — re-run in CI/Vercel.
- Not verifiable here: Pro panels with a real Pro session (engine functions
  they render are fully unit-tested; the flag is server-computed). Spot-check
  on staging with Pro + free logins.

### 6. Data dependencies
None. No external provider, no API keys, nothing labelled "live"; defaults
are illustrative and say so. Future live comps/risk-free rates would need a
licensed server-side provider — deliberately out of scope.

### 7. Export & persistence status
CSV + JSON export work client-side from engine output (tested). Persistence
is browser-local (localStorage autosave + up to 25 named analyses) and is
labelled as such; share links encode all assumptions for cross-device use.
Account-synced saved analyses need a DB model — remaining work, not faked.

### 8. Remaining work (ranked)
1. Server-side saved analyses (DB model + account sync; lets the dashboard
   deep-link "reopen valuation" — its "runs aren't saved to your account"
   note stays accurate until then).
2. In-tool WACC build-up (CAPM) instead of cross-linking the WACC tool.
3. Per-year editable forecast grid (driver overrides per year).
4. Print-optimised report view; XLSX binary export (needs a dependency call).
5. Apply the same engine-extraction pattern to the other 15 calculators.

### 9. Rollback
Self-contained: revert the 5 files above (engine/export are additive;
DcfCalc rewrite + 2 one-line edits revert cleanly to the gated legacy tool).
No data migration to unwind (localStorage keys `ka_dcf_*_v1` are inert if
the UI reverts). Registry `gated` flip is the only product-visible switch —
note flipping it back re-paywalls free users who may have bookmarked the
free model, and reinstates the old dead client gate unless DcfCalc is
reverted in the same change.
