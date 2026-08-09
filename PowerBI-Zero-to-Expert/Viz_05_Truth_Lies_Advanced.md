# DV5 · Truth, Lies & Advanced Patterns: The Manipulation Museum & Uncertainty Viz

> *Darrell Huff wrote "How to Lie with Statistics" in 1954; charts turned it into an industry. This final-technique module arms your inner inspector: every classic deception with anatomy, then the honest advanced arsenal — uncertainty bands, control charts, Pareto, slope/dumbbell — for when accuracy itself is the flex.*

## 🎯 Objectives
The manipulation catalog (spot-the-lie reflexes) · axis/aspect/aggregation cheats · statistical honesty artifacts (error bars, CIs, fan charts) · advanced patterns: sparklines, Pareto, slope/dumbbell, control charts (SPC), horizon charts · ethics & the analyst's court oath.

---

## 📘 5.1 The museum of lies — exhibit by exhibit 🏛️

1. **Truncated bar axis**: baseline ₹90L..₹100L turns a 5% gap into a 10× canyon. Length-encoding fraud (DV2 law). Reflex: glance at every bar axis floor BEFORE the data.
2. **Dual-axis theater**: two trends, two wonders — rescaled to "correlate" (orders & revenue race together!). Diverging axis ranges manufacture fit; sync-when-units differ = visual perjury (T2 warning, now with motive).
3. **Cherry-picked windows**: "revenue doubled since our rebrand" (chart starts at a crash month). Reflex: ask for trailing 24 months minimum; context windows before event flags.
4. **3-D everything**: perspective shrinks far slices; 3-D donut back-left disappears. Depth is the zero-information channel (bottom of the ladder).
5. **Pictogram scaling**: double-height money-bag = 4× ink area (height scaled, area quadrates); viewers read AREA. If pictograms, scale by AREA and count multiples intentionaly; safer: bars.
6. **Non-linear axes unannounced**: log scale dumps drama into calm; index rebasing hides absolute scale; broken axes without the // mark. Legal ONLY when labeled and motivated (range×100 data, DV2 §2.5 rule).
7. **Over-smoothing**: 12-month moving average of volatile churn "proves" stability — smoothed series erase crises; ALWAYS show raw under smoothed (faint) or state window clearly.
8. **Denominator darkness**: "+300% growth!" (₹10k→₹40k) — relative fireworks, absolute triviality; base rates gone (St2's ghost). Reflex: percent + level = sane pair, every time.
9. **Survivorship framing**: "average fund returned 18%" (dead funds deleted). Same sin as St6 backtests; ask "who vanished from this average?"
10. **Aggregation swap tricks**: switching median→mean→sum per chart to pick the best-looking story; post-hoc bin edges until the histogram smiles; category merge "Other" swallowing the bad news.
Add your own exhibits — the museum grows in your notebook forever. ✍️

## 📘 5.2 Aspect ratio & the drama knob

Same line at 10:1 vs 1:1: flat calm vs cliff panic. Banking theory (& 45° rule) sane-izes slope perception; when a chart's FIRST drama verb depends on canvas stretch — it's theater, not analysis. Lock aspect conventions per dashboard (consistency = comparability).

## 📘 5.3 Uncertainty made visible — the honest flex

St3 taught intervals; DV5 draws them:
- **Error bars** (CI or sd — DECLARE which, legend them): quick honesty for comparisons; overlapping-CIs ≠ automatic non-significance nuance, footnote it.
- **CI ribbons** on fitted lines: regression band slim near center, wide at edges — extrapolation punished visually (mind = blown, extrapolation = visible).
- **Fan charts** (St5 forecasts): center line + nested probability bands (50/80/95%) — the Bank of England inflation chart, the CEO-grade future picture.
- **Dot+whisker plots**: estimates with intervals across accounts/regions — the variance-pack hero chart (point = estimate, whisker = CI, color = favourable!).

Warranty line for the labelers: uncertainty displayed must be labeled ("95% CI, n=24 months") — mystery bands breed ghost beliefs. When audiences overload, move bands to tooltips + a session in method footnote — but NEVER silently delete.

## 📘 5.4 Advanced patterns — the senior's six

1. **Sparklines + micro-tables**: no axes, tiny trend beside every KPI/row (variance pack variants, T5 tooltip trick too) — context at text price.
2. **Pareto chart**: bars sorted desc + cumulative % line (80/20 stories: which 20% of sub-categories fund 80%? ShopKart: check!). Axis discipline: bars zero-based (length!), right axis aligned so 100% meets total height.
3. **Slope chart / dumbbell**: before↔after or target↔actual per entity: rank changes & gaps in one compact view (variance winners/losers FY24→FY25 in one sweep; far better than two bars columns).
4. **Control charts (SPC)**: mean ± 1/2/3σ control limits over time + rules (any point outside 3σ; 8 consecutive one-side runs; 6 trending) — process-finance gold: monthly close cycle time, invoice error rate, A/R days. Separates noise from SPECIAL cause (St2 z-score's industrial upgrade; S5 recon dashboard casing).
5. **Horizon charts**: time series folded into layered bands — 50 trends fit where 4 lines drowned (ops rooms, dense monitoring).
6. **Marimekko/mosaic**: 2-D composition (width=size, height=share) for market maps — specialist, but generator-offer when asked "share among players and their internal mix".

## 📘 5.5 Perception checks — the QA battery before ship

Squint test (hierarchy survives blur?), 5-second message test (DV1), sibling read-aloud (can a colleague narrate it wrong?), greyscale survival (DV3), projector-mode check (contrast), print A4 check, alt-text sentence drafted ("Chart: monthly revenue, FY25 +21%, dip in June, source GL") — every accessibility rule from DV3 applies INSIDE charts too. Reinforce: accessibility is not charity — board phones, conference rooms, and 8%-of-men colorblindness are your real audience.

## 📘 5.6 The analyst's oath — ethics as engineering

Same data, different design → different decisions. Therefore design is power, and power wants oaths:
1. Show denominators & units — context is not optional.
2. Uncertainty visible whenever estimates drive decisions.
3. Axes honest by default; deviations labeled loudly.
4. Cherry-picking disallowed: windows/scopes chosen BEFORE results seen.
5. Conflicting evidence gets a chart too (HARKing belongs to psychology scandals).
6. "Would I sign this chart presented against my own agenda?" — the golden mirror.
Your reputation is the only tool no vendor sells. Guard it harder than any dashboard.

---

## 🧪 LAB DV5 — Inspector & arsenal (70 min)

1. Forge three lies on ShopKart/GL data (truncated bars, window cherry-pick, dual-axis theater); then write each one's tell + fix next to the forged exhibit (the museum's first wing is yours).
2. Variance pack hero: dot+whisker for FY25 % variance by account (95% CIs, favorable colors, zero-line reference); add "n=12 months" legend + method footer.
3. Fan chart: extend your St5 forecast — center + 50/80/95% bands for next 6 months revenue; mark where bands exceed budget expectations in diverging accents.
4. Pareto: SubCategory revenue bars + cumulative %; read the 20/80 index from your cursor; screenshot statement ready ("_X sub-categories fund 80%_")。
5. Control chart: monthly AOV (or invoice count variance) ± moving control limits; flag ≥2 rule violations; investigate the flagged months like an auditor (write the root-cause question, not the answer!).
6. Dumbbell: FY24→FY25 revenue by region — who's rising/falling in RANK (invisible in grouped bars!) with Δ labels at the dumbbell middles.

## 💪 Exercises
1. Why does "% growth" demand a level-pair under every large percentage (base-rate ghost, St2 redux)?
2. Name the control-chart rule that catches slow CREEP (no single outlier) and its finance use (drift in close-time!).
3. Fan charts vs plain line+2σ: what extra information do PROBABILITY NESTED bands communicate (and to whom)?
4. Smoothing integrity: the rule pairing raw-vs-smoothed rendering?
5. EU "FT average" stumps — expected fake-line to catch in print media reviews? (museum exhibit #?)

### ✅ Selected answers
- Ex 1: relative-only figures hide magnitude: '+300%' of ₹10k ≠ +3% of ₹2Cr; always state base & level beside rate, else the number says nothing.
- Ex 4: raw data stays visible (faint below) whenever smoothing is displayed; smoothing windows declared ("3-mo MA"); never hide the jagged truth — crises live in it.
- Ex 2: run-rules: 8+ consecutive points one side of center (or 6 trending) flags drift WITHIN limits — close-cycle creep at month 9 with no outlier = this rule's paycheck.

## ❓ Quiz
1. The truncated-bar-axis lie exploits which DV1/DV2 principle?
2. CIs on bands: what 3 disclosures must every uncertainty mark carry?
3. Dot+whisker beats grouped bars for variance packs because…?
4. State the 6-oath's mirror test verbatim-ish.

### ✅ Answers
1. Length encodes value from zero (bar charts); truncated floors fake catastrophic ratios. Reflex: check axis floors before believing any bar.
2. What the band IS (CI / sd / percentile), the confidence LEVEL (95%), and n/source basis — mystery bands grow ghost mythology.
3. "Combined estimate + interval + direction per entity in the ink of one column" — comparisons, uncertainty, and sign all decodable at once.
4. "Would I sign this chart presented against my own agenda?" – fairness test; generates honest axes/windows/denominators automatically.

## ✅ Mastery checklist
- [ ] Forged-and-fixed 3 museum lies personally
- [ ] Uncertainty marks labeled & legend'd everywhere
- [ ] Pareto + dumbbell + control-chart in regular rotation
- [ ] QA battery is muscle memory

**Next: DV6 — expert practice: workflow, critique rubric, 10 golden rules & the capstone review. 🎓**
