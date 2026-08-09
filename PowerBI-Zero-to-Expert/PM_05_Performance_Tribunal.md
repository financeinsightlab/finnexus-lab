# 🎯 PM5 · Measuring Performance — The Tribunal Every Fund Must Face
> A smallcap star shows +21% annualized. A sleepy hybrid shows +11%. Brochures end the trial there — the tribunal is just beginning: divide by the toll (Sharpe 0.44 vs 0.36 canon lineage), count only the downside (Sortino), price β-work (Treynor), test skill against its own benchmark wiggle (Information Ratio), then walk the NAV path looking for the −35% valley nobody advertised (max drawdown, Calmar). PM5 convenes the full panel — five judges, one fraud-detector (survivorship/look-ahead audits) and the verdict template a professional allocator actually fills.

## 🎯 Objectives
- Grade with the five judges: Sharpe (total risk), Treynor (systematic only), Sortino (downside only), IR (per unit of tracking error), Calmar (return per unit of max drawdown).
- Decode the canon duel: Fund A 14% @ σ16 vs NIFTY-like 12% @ σ14, Rf 7: Sharpe 0.44 vs 0.36; add Treynor (β 1.15 vs 1.0) and Sortino layers.
- Compute IR: active return 2% ÷ tracking error 4% = 0.5 — and the grind law (be consistent monthly or shut up).
- Expose fraud vectors: survivorship bias, look-ahead, endpoint casinos, classification drift, benchmark shopping, backtest perfume.
- Write the allocator's verdict card: five judges + fraud audit + constraints fit (caps, mandate, cost) → HIRE / WATCH / PASS.

## 📘 Concepts

### 5.1 The five judges — each sees what the others miss
- **Sharpe (R−Rf)/σ:** total-risk grade — clean until tails hide options or illiquidity inside σ (PM2's caveat). Canon: 0.44 vs 0.36.
- **Treynor (R−Rf)/β:** same numerator, β denominator — the grade IF the fund sits inside a diversified book (idiosyncratic risk irrelevant there): A's β 1.15 → Treynor 7/1.15 = 6.09 vs index 5/1.0 = 5.0 → still A, but note how the denominator choice reranked the SIZE of the victory.
- **Sortino (R−Rf)/downside-dev:** σ counts good spikes as crimes; downside-deviation counts only the fall-side — Sortino is Sharpe for clients who think upside-volatility is a gift: a fund with lumpy-right returns gets justice here.
- **Information Ratio = active return / tracking error:** A vs ITS benchmark: +2%/yr active ÷ 4% tracking error = **IR 0.5** — industry bands: 0.3 decent, 0.5 good, 0.75+ star-grade (and rare). The grind law hidden inside: IR × √breadth ≈ skill payoff — one great call a year is a lottery ticket; a hundred small correct calls is a process.
- **Calmar = CAGR / |max drawdown|:** A at 14% with MDD 35.1% → **0.40**; the drawdowns-lead judge — pensions and retirees watch it first because recovery math (BF6: −35% needs +54%) is lived money, not abstract σ.

### 5.2 Denominator wars — why the tribunal needs five chairs
Same fund, five judges, five stories — by DESIGN: σ punishes tail-forgetfulness; β forgives everything diversifiable; downside-dev forgives happy spikes; TE localizes skill to the declared hunting ground; MDD measures lived pain. Allocator rule: never hire off ONE judge — a Sharpe-0.9 fund with MDD −45% and IR 0.2 is a levered beta product with good years, and the tribunal catches what the marketing excludes. Reverse-hack to know: sharper-than-life ratios with ancient MDD lines are sigma-laundering: the product sells options or holds illiquids whose "quarterly marks" are smoothed, not market (credit/AIF brochures dance here — IN2 6's minimum-bar discipline).

### 5.3 Information Ratio deep-dive — the skill machine, decomposed
IR = α/TE where α is portfolio-minus-benchmark return and TE is the σ of THAT difference. Decomposition (Grinold's fundamental law): **IR ≈ IC × √breadth** — forecast quality (IC: correlation of calls to outcomes) times the square root of independent bets/year: an allocator with IC 0.05 (small edge) needs ~100 independent bets/yr for IR ~0.5 (0.05×10): skill is a FACTORY (many disciplined small bets), not a SPEECH (one grand bet) — which is why concentrated-stock "stars" show feast-famine IRs and process-driven quant/multi-manager shops grind 0.4-0.6 for decades. Portfolio consequence: insist on breadth evidence: hit-rates by quarter, batting average by sleeve, and the alpha PERSISTENCE table — an IR without a decomposition is a rumor with a tie.

### 5.4 The fraud audit — five perfumes and the sniff tests
- **Survivorship:** dead funds vanish from averages (industry returns ~+1-2pp inflated); sniff: "as-of-today" universes — insist on the dead included.
- **Look-ahead:** backtest traded on info not timestamped-available (restatements, index rebalances); sniff: point-in-time data certification.
- **Endpoint casino:** cherry dates (from 2009 trough to 2021 peak); sniff: rolling windows, market-cycle-complete (several).
- **Classification/benchmark drift:** smallcap bets reported as "flexicap beating NIFTY"; sniff: holdings-based style audit vs declared category (ρ to claimed benchmark should be HIGH).
- **Backtest perfume:** strategies tuned to past noise (parameter counts > sample degrees of freedom); sniff: out-of-sample windows, live incubations, and skepticism priced as: real-world alpha ≈ backtest alpha × (0.3-0.5) at best.
Fraud-hunting is process hygiene, not cynicism — the tribunal's job is protecting tomorrow, not punishing yesterday.

### 5.5 The verdict card — allocator's signing page
Five-judge table (fund vs benchmark) → fraud audit column (clean/flagged per vector) → fit-check (mandate caps obeyed? single-name ≤5%? duration dial within card? cost vs IN2 6's drag thresholds?) → **HIRE** (judges + audit + fit all green: size to mandate, review quarterly), **WATCH** (judges mixed or audit one-flag: paper-track 2 quarters with a dated kill-switch), **PASS** (any fraud-vector red or judge-contradiction unresolved — the brochure leaves without the money). Canon card filled on Fund A: Sharpe 0.44 ✅ / Treynor 6.09 ✅ / IR unknown (no TE disclosed — flag) / MDD 35.1% → Calmar 0.40 ✅-with-qualifier / fraud scan two flags (endpoint, TE-undisclosed) → verdict **WATCH**: promising per-unit economics, transparency invoice due before a rupee moves. That card, on a page, IS the job PM7 will scale to three lives.

## 🧪 LAB — Tribunal in session (10 min)
Data: Fund B: 12y CAGR 16%, σ 20%, β 1.25, downside-dev 11%, TE 6%, MDD −42%, active vs benchmark +3%/yr; benchmark TRI 13%, σ 16%, Rf 7%.
1. Seat all five judges (compute each ratio for B and the benchmark where applicable): table ready.
2. Judge-conflict hearing: B's Sharpe vs IR tell different grades (vol-heavy skill) — write the two-line reconciliation an allocator reads to a committee.
3. Fraud audit: B's deck shows back-tested CAGR from 2016 (inception claim) but the actual fund launched 2020: apply the perfume-discount arithmetic and the WATCH/PASS trigger.
4. Fit-check: B's top holding = 9% of fund: which BF6/IN2 cap breaks, and does the tribunal's verdict survive it regardless of the five judges' love?
5. Decompose: B's IC ≈ 0.06 — what breadth/yr justifies its IR? And the one sentence this teaches about process vs heroics.

**Why this matters:** item 1 is literally the case-prep table allocators bring to investment committees; item 3 is how brochure-perfume dies in committee with grace and arithmetic.

**🔑 Lab answers:** (1) B: Sharpe = (16−7)/20 = **0.45**; Treynor = 9/1.25 = **7.2**; Sortino = 9/11 = **0.82**; IR = 3/6 = **0.50**; Calmar = 16/42 = **0.38**. Benchmark: Sharpe (13−7)/16 = **0.375**; Treynor 6/1.0 = 6.0; the table says B beats the bench on every risk-adjusted chair but BLEEDS deeper (−42% vs benchmark-class MDD) — a high-β craftsman (2) reconciliation: "B wins per unit of TOTAL and SYSTEMATIC risk (Sharpe/Treynor) AND per unit of declared-hunting-ground wiggle (IR 0.5 good band); the price is depth-trauma (MDD −42% needs +72% recovery) — a fund for books whose dial-card can absorb −40% seasons without redemption pressure; allocate, size-down, write the pain pre-nup." (3) 2016-2020 slice is backtest-perfume (not live): discount rule real ≈ backtest × 0.3-0.5 → the "16% since 2016" deck compresses to a live-2020-onward record ~13-15% claimed honestly; trigger: any deck presenting backtest AS live = PASS (integrity column is binary); presented-with-disclaimer = WATCH with live-only ratings recomputed (4) single-name 9% breaches the ≤5% client-side concentration card — verdict: fit-check FAILS — allocator asks the FUND its own mandate limit (if fund mandate allows 10%, the fix is sizing: weight B so client's worst single-name exposure ≤5%×portfolio; judges' love never repeals a cap; caps are pre-signed law) (5) breadth needed: IR 0.5 = IC 0.06 × √b → √b = 8.33 → b ≈ **69 independent bets/yr** — the process sentence: good IRs are manufactured in breadth factories (70+ small disciplined calls), so when B's deck narrates TWO heroic stock stories, ask where the other 67 bets are — or price the story as luck until the factory tour.

## 💪 Exercises
1. Five-judge sheet: rebuild the full tribunal table for two real funds you know (from factsheet numbers): Sharpe/Treynor/Sortino est./MDD/Calmar — verdict card filled.
2. Denominator war game: fund σ 22%, β 0.9 (illiquid smallcaps dampen measured correlation), R 18%, Rf 7, bench 13%: show Sharpe and Treynor rank opposite magnitudes and explain which chair suits a diversified client book.
3. IR grind-schedule: for IC 0.03 / 0.05 / 0.08, tabulate breadth needed for IR 0.5: the factory's hiring poster.
4. Perfume lab: a backtest shows 24% CAGR 2015-2024, parameters 47, live since 2023 at 11%: apply discount logic, diagnose overfitting (parameters vs sample), write the PASS/WATCH card.
5. MDD forensics pair: fund X: NAV path with one −48% valley; fund Y: repeated −20% dips; both Calmar-equal seemingly: compute MDD-based Calmars from synthetic numbers, then write the client-type fit for each.
6. Survivorship experiment: design the test: 40 funds of 2014 survived vs how many launched? Estimate the average-return inflation mechanically, and the database discipline that fixes it.
7. Interview forge: "What's the single ratio you'd keep if you could keep only one?" — defend Sortino OR Calmar OR IR in 6 numbered lines (which client, what it misses, why the tribunal exists anyway), ending with the allocator's actual answer.

### ✅ Selected answers
2. Sharpe = (18−7)/22 = **0.50**; Treynor = 11/0.9 = **12.2** — Treynor loves the low measured β (illiquidity dampens it), Sharpe stays skeptical of the total σ; for a client already diversified (PM1's doctrine: only systematic risk matters INSIDE a book), Treynor's chair is legally the right grade — BUT flag: illiquid-smallcap βs are σ-laundering suspects (quarterly marks): demand the stress-day behavior record before trusting the 0.9.
5. X: CAGR 12%, MDD 48 → Calmar 0.25; Y: CAGR 12%, MDD 20 → Calmar 0.60 (they can't be Calmar-equal if MDDs differ at same CAGR — the point); fit: X suits a 25-year-old engine-book with 24y horizons (recovery time abundant, BF6 welds strong); Y suits a 58-year-old pre-retiree whose IPS panic-threshold is −25% (recovery −48 needs +92% — a decade's delay is life-stage lethal). Judge MDD with the client's calendar, not the fund's pride.
7. Six lines (honest version): 1) Clients differ — a pension wants Calmar (drawdown=solvency), a quant book wants IR (skill per wiggle), a family office wants Sortino (pain-side only). 2) Kept to one: **Information Ratio** — it's the only chair that prices skill against the DECLARED benchmark (fraud-resistant to beta-smuggling). 3) It misses tails — so I'd smuggle MDD into the room as a constraint, not a ratio. 4) The tribunal's existence is the point: single-ratio hiring is how levered beta gets capital; 5) each judge's blindspot is another judge's eyes — committees are calibration machines. 6) Allocator's actual answer: "Whichever my client's IPS is written in — the metric follows the mandate; that sentence is why you hire me."

## ❓ Quiz
1. Fund A: 14% R, σ 16%, Rf 7% vs index 12%, σ 14%. The tribunal's first-chair verdict:
   (a) tie
   (b) A leads 0.44 vs 0.36 on Sharpe — more return per unit of toll, honestly; then Treynor (6.09 vs 5.0), Sortino, IR, Calmar convene because single-chair verdicts hire levered beta in a Sharpe costume
   (c) index wins
2. A fund shows Sharpe 0.95 but MDD −48% and undisclosed TE. The allocator's card:
   (a) HIRE — the Sharpe is elite
   (b) WATCH at best, PASS if the TE/endpoint flags don't clear — σ-laundering and endpoint casinos live exactly in that shape (elite σ-grade + trauma-path + opacity); fraud audit precedes capital, euphoria follows verification or nothing follows
   (c) HIRE small
3. IR 0.5 with IC 0.05 needs about:
   (a) 25 bets/yr
   (b) 100 independent bets/yr (0.05 × √100 = 0.5) — skill at scale is a factory of small disciplined calls; anyone selling two heroic stories and calling it 0.5 is reading their horoscope to a committee
   (c) 400 bets/yr

### ✅ Answers
1. **(b)** — chairs vote; no chair rules alone.
2. **(b)** — the tribunal exists because brochures grade themselves.
3. **(b)** — √100 = 10, ×0.05 = 0.5; breadth is the factory's name.

## ✅ Mastery checklist
- [ ] I can seat all five judges and reconcile their verdicts publicly.
- [ ] I quote IR with decomposition (IC × √breadth), not as rumor.
- [ ] I run the five-perfume fraud audit and discount backtests honestly.
- [ ] My verdict cards end HIRE/WATCH/PASS with caps enforced over judges' love.
- [ ] I match metrics to client calendars — the mandate writes the metric.

**Next:** PM6 · The Rebalancing Machine — drift arithmetic (+3.3pp hold, +6.4pp breach), calendar vs 5% bands, tax-aware trims, and the discipline that sells high without a single forecast.
