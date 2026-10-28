# WACC Calculator — Professional Upgrade

Selected tool: **WACC Calculator — `/tools/wacc-calculator`**
(`components/calculators/WaccCalc.tsx`, registry id: PGDM Finance Lab, `gated: false`).
Second tool upgraded under the same 8-phase brief (first: DCF, see
`docs/dcf-valuation-upgrade.md`). Its result now hands off into the DCF tool.

---

## Phase 1 — Audit of the existing model (as found, 2026-10-28)

### Inputs (6) / outputs
Rf 6.8%, MRP 8%, levered β 1.2, pre-tax Rd 9.5%, tax 25%, D/E 0.5×.
Formulas: `Re = Rf + β·MRP`; `Rd,after-tax = Rd(1−t)`; weights from D/E
(E=1, D=D/E); `WACC = wE·Re + wD·Rd(1−t)`. Plus a 7-point D/E sensitivity
bar chart, KPI cards, a canned "Analyst Insight", and a formula reference.
Golden defaults (independently verified): Re = 16.40%, Rd,AT = 7.125%,
**WACC = 13.3083%** at 66.7/33.3 weights. Core single-point maths is correct.

### Bugs & questionable assumptions

1. **The D/E sensitivity — the headline feature — is methodologically wrong.**
   Sweeping leverage while holding levered β (and Rd) fixed ignores Hamada
   relevering: adding debt makes equity riskier, so βL and Re must rise with
   D/E. Quantified vs the correct relevered sweep at defaults
   (βU = 1.2 / [1 + 0.75×0.5] = 0.8727):

   | D/E | Legacy WACC | Relevered WACC | Legacy error |
   |---|---|---|---|
   | 0.00 | 16.40% | 13.78% | **+2.62pp** |
   | 0.25 | 14.55% | 13.50% | +1.05pp |
   | 0.50 | 13.31% | 13.31% | 0 (anchor point) |
   | 0.75 | 12.43% | 13.17% | −0.75pp |
   | 1.00 | 11.76% | 13.07% | **−1.31pp** |
   | 1.50 | 10.84% | 12.93% | −2.09pp |
   | 2.00 | 10.22% | 12.83% | **−2.62pp** |

   The legacy chart teaches "debt almost halved-point-for-point cuts WACC"
   (16.4→10.2); the correct relevered WACC barely moves (13.8→12.8) — debt's
   tax shield is mostly offset by rising equity risk. The formula reference
   even prints the Hamada unlevering formula the calculation ignores. A
   1–2.6pp WACC error fed into a DCF terminal value is valuation-critical.
2. **β input has no provenance workflow.** A professional rarely "has" a
   levered β for the subject company: listed-peer β must be unlevered and
   relevered at the target structure; private-company valuations use the
   build-up method (Rf + ERP + size + company-specific premiums). Neither
   exists. No size/CSRP/country-risk premium inputs.
3. **Weights only via D/E.** No market-values mode (E, D in currency) and no
   target-weight mode — and nothing discloses that WACC weights should be
   *target market-value* weights (the circularity professionals must handle).
4. **Cost of debt is a single guessed number** — no Rf + credit-spread path.
5. **Input handling:** `parseFloat` on every keystroke — clearing a field
   sets NaN, the field *displays* 0 (masking), and KPIs render `NaN%`.
   No validation: D/E = −1 divides by zero (V=0 → ∞), tax >100% makes
   after-tax debt cost negative, negative β/Rd accepted silently.
6. **Dead-end workflow:** the DCF tool links here ("build WACC up"), but the
   computed WACC can't flow back — no share/save/export, inputs lost on
   reload. The tool exists to feed a DCF and doesn't.
7. **Provenance gaps:** Rf default 6.8% tooltip cites India 10Y G-Sec with no
   as-of date (will silently go stale); MRP tooltip cites Damodaran 7–9%.
   Nothing states these are illustrative defaults, not live data.
8. Canned 3-bucket "Analyst Insight" (8%/15% cut-offs) with flattering copy;
   bar chart uses min–max normalisation that exaggerates small WACC ranges.
9. Maths in `useMemo` in the component; no tests (platform pattern pre-DCF).
   Duplicate `h1` (page header also renders one).

Entitlement/data: free tool, no external data, no persistence — all fine to
keep, but persistence/export/handoff are missing, not gated.

## Phase 2 — Professional specification (scope decision)

**Essential (this delivery):**
1. Pure engine `lib/finance/wacc.ts` + tests vs independent values.
2. **Three beta/equity modes:** (a) CAPM with a directly entered levered β;
   (b) peer workflow — enter peer *unlevered* βU, relevered via Hamada at
   the structure used for weights; (c) build-up method for private companies
   (Rf + ERP + size premium + company-specific risk premium). Optional
   country/size/CSRP add-ons also available on CAPM modes.
3. **Cost of debt, two ways:** direct pre-tax Rd, or Rf + credit spread (pp).
4. **Weights, three ways:** D/E ratio, market values (E and D in currency),
   or target debt weight %. Disclosure: use target market-value weights.
5. **Corrected D/E sweep:** numeric table (βL, Re, weights, WACC per point)
   with Hamada relevering anchored at the current structure; honours the
   selected beta mode (in build-up mode the sweep holds Re fixed and says
   so — build-up has no β to relever). Rd held constant, disclosed.
6. Validation as data (errors block, warnings flag): finite, tax ∈ [0,1),
   D/E ≥ 0, weights valid, β sanity warnings, WACC sanity band warnings,
   Rd < Rf warning (negative credit spread), negative premiums warning.
7. Workflow: string-typed inputs (fractions at the boundary, as in DCF),
   localStorage autosave + shareable URL, **"Use in DCF" handoff**
   (`/tools/dcf-valuation-model?wacc=…`), CSV export (free — this is a free
   feeder tool; gating its arithmetic would break its job).
8. Honest framing: diagnostics renamed (rule-based), defaults labelled
   illustrative with source guidance, Hamada assumptions disclosed.

**Optional/future:** live Rf/beta data (licensed provider), relevering
variants (Miles–Ezzell / Harris–Pringle — Hamada only, disclosed),
preferred-stock tranche, iterative market-value circularity solver,
credit-spread step-up by leverage in the sweep.

**Phase 6 (business value):** deliberately kept 100% free. WACC arithmetic
is commodity; the paying job is the valuation it feeds. Differentiation =
correct relevering + one-click DCF handoff + education traffic (PGDM lab).

**Phase 5 (data):** no external data introduced. Defaults are illustrative
(Rf ≈ India 10Y G-Sec at time of writing — user is told to overwrite with
the current yield); nothing is labelled live.

Cross-tool fix (justified, minimal): DcfCalc's restore logic will merge
shared URL params *over* the browser autosave (defaults ← autosave ← URL),
so the WACC→DCF handoff changes only `wacc` instead of resetting the user's
saved DCF inputs. Covered by a unit test on `parseDcfInputs(raw, base)`.

## Phase 3 — Formula specification

`Re(CAPM) = Rf + βL·MRP + size + CSRP + CRP`; `βU = βL/[1+(1−t)·D/E]`
(Hamada; assumes debt level permanent & tax shield at Rd — disclosed);
`βL(target) = βU·[1+(1−t)·(D/E)target]`;
`Re(build-up) = Rf + ERP + size + CSRP (+CRP)`;
`Rd = direct | Rf + spread`; `RdAT = Rd(1−t)`;
weights: D/E→(1/(1+D/E), (D/E)/(1+D/E)); values→E/(E+D); target→(1−wD, wD);
`WACC = wE·Re + wD·RdAT`. Sweep: for each D/E point, βL relevered from the
anchored βU (CAPM modes), weights from that D/E, RdAT constant.
All rates fractions internally; % only at the UI boundary.

Independent test constants (derived outside the engine): legacy golden
above; βU = 0.872727; relevered WACC at D/E = 1 → 13.0716%, at 0 → 13.7818%,
at 2 → 12.8348%; build-up example 7+5+3+2 = 17%; market-values weights
800/200 → 80/20.

## Phase 8 — Delivery record (2026-10-28)

### 1. Before → after
| Capability | Before | After |
|---|---|---|
| Leverage sweep | Held βL fixed → wrong by −2.62…+2.62pp; taught "debt halves WACC" | Hamada-relevered at every D/E (13.78→12.83% across 0–2× at defaults); numeric table w/ βL, Re, weights |
| Beta provenance | One guessed levered β | Direct βL · peer βU→relever · private build-up; size/CSRP/CRP premiums with justification prompts |
| Cost of debt | Single guessed rate | Direct or Rf + credit spread |
| Weights | D/E only, undisclosed basis | D/E · market values · target debt weight, with target-market-value guidance |
| Validation | NaN KPIs, D/E=−1 → ∞, silent bad ranges | Engine errors block output; warnings (Rd<Rf, β sanity, distress leverage, Re<RdAT…) |
| Workflow | Dead end; reload loses inputs | Autosave, share link, CSV, and **Send-to-DCF handoff** (`?wacc=` merges into saved DCF inputs) |
| Framing | "Analyst Insight" buckets; stale Rf tooltip | Rule-based diagnostics; defaults labelled illustrative with refresh sources (CCIL/RBI, Damodaran, Kroll) |

### 2–3. Formulas & assumptions — Phase 3 above; Hamada + constant-Rd sweep + no-preferred-stock disclosed in engine header and UI.
### 4. Files changed
New: `lib/finance/wacc.ts`, `wacc.test.ts`, `wacc-export.ts`, `wacc-export.test.ts`, this doc.
Rewritten: `components/calculators/WaccCalc.tsx`. Surgical: `lib/finance/dcf.ts`
(`parseDcfInputs` gains optional base), `components/calculators/DcfCalc.tsx`
(restore merge precedence defaults←autosave←URL + handoff notice),
`lib/finance/dcf.test.ts` (+1 merge test), `lib/tools-registry.ts` (truthful desc).
No entitlement change — tool remains free by design; other calculators untouched.

### 5. Tests & outcomes
`npx vitest run` → **44 files / 344 tests passed** (+29: golden 13.3083%
regression, Hamada round-trips, corrected-sweep table vs independent Python
values incl. legacy-error magnitudes, relevered/build-up/spread/market-value
cases, 6 blocking-validation cases, divide-by-zero regression, serialisation,
3 CSV tests, DCF handoff merge). ESLint 0 errors; tsc 184 baseline unchanged
(0 in touched files). Live smoke: page renders golden 13.31% and corrected
13.78% unlevered sweep point server-side; handoff URL carries the exact
fraction and the DCF accepts it (200); garbage params degrade safely.
`npm run build` still sandbox-blocked at `prisma generate` (pre-existing).

### 6. Data dependencies — none introduced; nothing labelled live.
### 7. Export & persistence — CSV (free, incl. DCF-handoff fraction) + browser autosave + share links; no account sync (same platform limitation as DCF).
### 8. Remaining work — live Rf/ERP/beta provider (licensing decision); Miles–Ezzell/Harris–Pringle variants; spread step-up in sweep; then the same treatment for the 3-Statement Model.
### 9. Rollback — additive engine files + one component rewrite; revert restores the legacy tool (and its sweep error). DCF restore-merge is independently safe (URL params still win field-by-field; covered by test). localStorage key `ka_wacc_autosave_v1` is inert on revert.
