# 🎯 PM6 · The Rebalancing Machine — Sell High, Buy Low, Forecast Nothing
> Your 70/30 portfolio has one job besides growing: slowly becoming something else. Equity rallies two years and the split crawls to 76/24 — quietly, without asking, the book's risk dial turned itself up right before the tape that tests it. Rebalancing is the machine that turns the dial back: mechanically trimming what outran and feeding what lagged — the only disciplined "sell high, buy low" ever invented that needs zero market views. PM6 builds the drift arithmetic (canon: 70/30 with equity +25%/yr, debt +6%: year-1 lands 73.3/26.7 = +3.3pp drift, HOLD; year-2 lands 76.4/23.6 = +6.4pp, BREACH → trim), the trigger designs (calendar vs band), the tax-aware execution playbook, and the behavioral weld that makes it automatic.

## 🎯 Objectives
- Compute drift from return differentials: new weight = wᵢ(1+rᵢ)/Σw(1+r) — and judge it against the band.
- Design triggers: calendar (annual/bi-annual), threshold (±5pp bands), hybrid (review calendar, act only on breach) — with the churn/turnover math each implies.
- Execute tax-aware: rebalance WITH FLOWS first (SIP direction, dividends), then LTCG-harvest-compatible trims, minimizing the tollbooth bill (IN2 5 weld).
- Read rebalancing's edge honestly: volatility-harvesting bonus in range-bound tapes vs drag in trending bulls — and why discipline, not alpha, is the real product.
- Wire the machine into the IPS: pre-written triggers, sizes, and the override lock (BF6's weld — humans may interrupt only in writing).

## 📘 Concepts

### 6.1 Drift arithmetic — the quiet dial-turner, canon
Weights re-normalize after returns: **wᵢ′ = wᵢ(1+rᵢ) ÷ Σwⱼ(1+rⱼ)**. Canon book: ₹100 at 70/30, equity +25%, debt +6% yearly.
- Year 1: equity 70×1.25 = 87.5; debt 30×1.06 = 31.8; total 119.3 → **73.3/26.7 (+3.3pp)** — inside a ±5pp band: HOLD.
- Year 2: 87.5×1.25 = 109.4; 31.8×1.06 = 33.7; total 143.1 → **76.4/23.6 (+6.4pp)** — band BREACH: re-target 70% ⇒ 0.70 × 143.1 = ₹100.2 in equity ⇒ **trim ₹9.2L of equity into debt** (a one-sided rebalance order equal to the drift, 6.4% of total book — the machine trades only the DRIFT, never the book).
- Year 3 unchecked: 79.3/20.7 (+9.3pp): the "balanced" investor now rides a small-cap book without ever having made a decision — drift is the only investor who never sleeps, panics, or asks permission.

### 6.2 Trigger designs — the three machines
- **Calendar (annual/bi-annual):** simplest, cheapest on attention; risk: trades on drift that didn't matter (0.3pp min-trades churn costs) or waits while a crash rewrites the book mid-year.
- **Threshold/band (±5pp absolute, or ±20-25% relative):** trades ONLY when the dial truly moved; watch-cost daily/weekly (automated alerts fix it); the pro default for volatile books.
- **Hybrid (review quarterly/annually, act only on band-breach):** the household sweet spot — one calendar commitment, zero unnecessary trades; canon book ran exactly this (year-1 reviewed-and-held, year-2 reviewed-and-trimmed ₹9.2L equivalent). Machine choice trades churn (tollbooths) against drift-risk (dial honesty): bands too tight churn, too loose lie; **±5pp absolute for major sleeves, ±20% relative for small satellites** is the desk-standard compromise.

### 6.3 Execution without tollbooth bleed — the flow-first doctrine
Cheapest rebalance is the one you never trade: (1) **redirect FLOWS** — point the SIP/new money at the UNDERweight sleeve for months (₹15k engine: 100% to debt fund until split heals — zero sales, zero tax); (2) **dividend/interest routing** — sweep income toward laggards (IDCW into the underweight); (3) **within-tax-sheltered-first** — EPF/PPF/NPS moves are tax-free rebalances (the invisible venue); (4) **only then, trim** — and trim with IN2 5's law: prefer tranches inside the ₹1.25L LTCG exemption throat (age-old units first with indexation-dated cost bases), net STCL against the trim's LTCG, and NEVER let a rebalance vend a short-term tranche at 20% when 3 months of patience reclassifies it to 12.5% (the calendar's mercy). A well-run household rebalances for years with total friction <0.1% — flow-first is the discipline that pays for the discipline.

### 6.4 The edge, honestly — harvest the chop, endure the trend
Rebalancing mechanically sells winners/adds losers — so it harvests MEAN-REVERSION (range-bound decades gift the bonus: each oscillation round-trips a trim-and-refeed, historically worth ~0.3-0.8%/yr in choppy regimes) and drags in TRENDING bulls ( trims equity into each rally — 2012-2019 style tapes make rebalancers look slow right up to the drawdown that repays the decade). The machine's true payout profile: **insurance-priced discipline**, not alpha — it sells the insurance of "your risk dial says what your IPS says" for a small trending-market premium, and collects catastrophically on crash-and-recovery cycles (2008-2010, 2020-2022: the rebalanced books owned the recovery at pre-crash dials while drifted books peaked at the crash's door). Behavioral product (BF6): rules executed by calendar/band exempt you from the two sentences that ruin books — "it feels toppy" and "I'll get back in lower".

### 6.5 The override lock — when humans MAY interrupt
Rules bend for regime-level events only, in writing, with a second signature (spouse/partner/advisor): (1) mandate/IPS change (new goal, new horizon — rebalance to the NEW target, that's not an override, it's a re-contract), (2) regime shift with structural evidence (curve inversion + core-cpi regime change = EC7's documented quadrant flip — and even then: change size per IPS caps, executed in 2-3 tranches, documented), and (3) NEVER "because markets feel high/low" — feelings are inputs to the journal, not to the machine. The lock's existence is the machine's final polish: discipline exists precisely at the moment discipline is least comfortable — that's not a bug, it's the whole machine.

## 🧪 LAB — Machine floor (10 min)
1. Drift compute: book ₹2Cr at 60/40; year: equity +18%, debt +5%: new split and the band verdict (±5pp).
2. Band design for a 3-sleeve book (65/10/25 equity/gold/govvies): write the trigger table including the small-sleeve relative rule.
3. Flow-first repair: after the year-2 breach canon (76.4/23.6), engineer a ZERO-sale repair plan given monthly SIP ₹80k: months to heal, and the discipline note for the IPS.
4. Trending-bull honesty: 2012-19-style tape, equity +16%/yr for 7 years, debt +7%: compute the rebalancer's lag vs the drifter after year 3 (approx weights) and write the behavioral sentence that keeps the client aboard the machine at year 3's envy-peak.
5. Tollbooth audit: a client insists on trimming ₹6L of equity profit now: it splits ₹2.2L STCG-class + ₹3.8L LTCG-class (held 14m+): compute the tax, then the alternative calendar-plan that cuts the bill (exemption throat + patience).

**Why this matters:** item 3 is the machine's cheapest miracle (healing with flows), and item 4 is the conversation that separates a system from a suggestion — envy-peak is where machines earn their patents.

**🔑 Lab answers:** (1) equity 60×1.18 = 70.8; debt 40×1.05 = 42.0; total 112.8 → **62.8/37.2 (+2.8pp)** — inside band: HOLD, review logged (the machine's output includes documented non-action) (2) trigger table: equity sleeve ±5pp absolute (65 → act at ≥70 or ≤60); govvies ±5pp (25 → 20/30); gold small-sleeve ±20% RELATIVE of its 10 (act at ≤8 or ≥12); review quarterly, act only on breach, log always — the hybrid choke chain (3) zero-sale repair: split needs equity ↓ from 76.4% to 70% = free 6.4pp of future flows: all-new-SIP to debt: monthly accretion math on ₹143L-equivalent book ≈ each month's ₹80k moving full-debt closes ~0.06pp... too slow alone — better: flows + dividend-sweep + the natural equity-couponless drift: honest plan = 10-14 months of full-debt SIP PLUS IPS note granting interim band-tolerance 74% max, with an auto-trim ONLY above that (dual-trigger: flow-plan plus hard outer rail — discipline with an engineering drawing, not a wish) (4) after year 3 of a 7-year bull: rebalancer trimmed ~4-5pp back toward 60/40 repeatedly vs drifter ~76/24 → CAGR lag ≈ (drift-extra equity 15pp × spread 9pp ≈ **1.2-1.4%/yr visible lag at year-3**); sentence: "the machine pays its premium in peacetime — the 1.3%/yr you envy today is the insurance premium that keeps this book aboard through the year when equity prints −30% and the drifter discovers what 76% minus 30% feels like with your horizon and your pulse." (5) now: STCG 2.2×20% = ₹44k + LTCG on (3.8 − 1.25 throat)×12.5% = ₹31,875 (the throat nets against the year's TOTAL LTCG) → total **₹75,875**; alternative: wait 2+ months for the ₹2.2L tranche to cross 12m (→ LTCG class) then split trims across two FYs (₹1.9L + ₹1.9L? per year within throat ×2 years ≈ mostly exempt): bill → **₹0-8k**; the calendar's mercy, priced at ₹68k of patience.

## 💪 Exercises
1. Drift grid: 70/30, three scenarios year-1: equity +25/debt +6; equity −15/debt +6; equity +6/debt +6: splits + band verdicts + the order size for the breach case.
2. Machine chooser: for (a) ₹10Cr HNI multi-sleeve, (b) ₹15k/month SIP household, (c) NPS-heavy salaried investor: assign calendar/band/hybrid + execution venue (flows/sheltered/trims) with the churn logic.
3. Harvest-backtest narrative: range 2008-2018 chop vs 2012-2019 trend (stylized): rebalance premium sign in each in 4 lines, and the dispersion honesty ("which years is the premium collected in?").
4. Override courtroom: client demands full exit after curve inversion "because 2008"; run the lock protocol: admissible change? conditions? tranche plan? second signature? — the 5-step ruling.
5. Tax-aware trim choreography: book must cut equity ₹10L (all LTCG-class, various FYs): sequence the trims across March/April (FY boundary) to maximize throat use, and state the STCL-netting check first.
6. Drift-vs-dial memo: explain to a spouse in 6 lines why the "winning" equity share rising is the RISK rising (dial turned silently), using the year-3 79.3/20.7 canon + the recovery table (BF6) when the crash arrives at the drifted dial.
7. Interview forge: "Rebalancing is just forced contrarianism — why not momentum instead?" — 6 numbered lines (mandate's target is risk control not alpha; chop vs trend regimes and honesty about which India has been; momentum crashes rebalanced vs not; turnover costs each side; the behavioral asymmetry; and your synth verdict).

### ✅ Selected answers
1. S1 (+25/+6): **73.3/26.7 (+3.3)** — hold. S2 (−15/+6): equity 70×0.85 = 59.5; debt 31.8; total 91.3 → **65.2/34.8 (−4.8pp)** — inside band (just!) — hold-but-watch (the near-breach note is discipline, in writing). S3 (+6/+6): 74.2+31.8 = 106 → 70.0/30.0 (no drift: equal returns, zero work — proof drift lives in the SPREAD, not the level). Breach case order (S1-after-year-2 analog): trim ≈ 4.5% of book from equity to debt (formula: trade size = drift ÷ 2 roughly when both sleeves trade — exact: rebalance order = (w_drifted − w_target) × total, one-sided).
4. Ruling: (1) admissibility check — regime claim needs structural evidence pack (EC7 sheet: inversion depth, core CPI lane, credit lane) — a 2008-memory alone = feelings routed to journal. (2) If evidence passes: change WITHIN IPS caps (equity floor says 55 → may move 70→60-65 toward floor, not to zero — full exit violates the contract, re-contracting requires the full IPS ceremony). (3) Tranches: 3 equal cuts over 3 review-periods (no one-day cathedral). (4) Second signature: partner + the IPS-dated note citing the evidence pack. (5) Re-entry rule written BEFORE cut one: trigger = curve normalization + 2 core-CPI cooler prints, else the "exit" becomes a lifestyle.
7. 1) Mandate first: the machine's target is DIAL-HONESTY; alpha contests are welcome at the satellite sleeve, not the core. 2) Regime honesty: India's long tapes have trended more than chopped — rebalancing pays its premium where it hurts — disclosed on page one. 3) Momentum un-managed has crash manners: 2008/2020 tapes show trend-followers' left tails; rebalanced books step INTO those crashes with dry debt-powder — different wound shapes, member selectable via IPS but not pretend both are free. 4) Turnover: momentum chases pay full churn tollbooths (IN2 5) yearly; bands pay near-zero. 5) Behavior: rebalance-trades are mechanically antithetical to comfort — precisely why they survive humans; momentum trades feel GREAT until the portfolio asks you to pyramid a crash. 6) Verdict: core = rebalancing machine; satellite = momentum rules with kill-switches; the synthesis is a house with both an anchor and a sail — never one pretending to be the other.

## ❓ Quiz
1. 70/30, equity +25%, debt +6%, year-2 closes at:
   (a) 73.3/26.7
   (b) 76.4/23.6 — the drift formula wᵢ(1+rᵢ)/Σw(1+r): +6.4pp in two bull years = the band breached and the trim due; year-1's 73.3 (+3.3) was the machine's documented HOLD
   (c) 70/30 — nothing moved
2. The machine's real product is:
   (a) contrarian alpha
   (b) dial-honesty sold for a small trending-market premium and collected in crash-recovery cycles — insurance-priced discipline; the chop-harvest bonus is a rounding gift compared to owning the recovery at the pre-crash dial while others peak at the door
   (c) tax savings
3. The cheapest repair after a 6.4pp equity breach is:
   (a) immediate ₹9L sale
   (b) flow-first: redirect SIP + sweep dividends to the lagging sleeve with an outer hard rail (e.g., 74%) as dual trigger — months of healing at zero tollbooth, discipline carrying an engineering drawing instead of a wish
   (c) switch to 100% debt

### ✅ Answers
1. **(b)** — (a) was year one; the machine's log preserves both.
2. **(b)** — insurance, priced; everything else is marketing garnish.
3. **(b)** — flows are free rebalances; sales are taxed ones.

## ✅ Mastery checklist
- [ ] I compute drift from return spreads and judge bands with documented HOLDs too.
- [ ] I design calendar/band/hybrid triggers matched to the book's volatility.
- [ ] I execute flow-first and sheltered-first, tollbooths audited each trim.
- [ ] I disclose the trending-bull premium honestly and defend the insurance anyway.
- [ ] My override lock demands evidence, tranches, second signature, and pre-written re-entry.

**Next:** PM7 · CAPSTONE — The Portfolio Desk: three full lives (25/40/60-year-olds) built end-to-end — engines, glides, SWP math, and the interview forge.
