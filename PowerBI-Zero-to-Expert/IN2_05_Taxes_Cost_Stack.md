# 🎯 IN2 5 · Taxes & the Cost Stack — Every Rupee's Toll Booths
> A trader friend showed “₹60,000 profit” and celebrated a bike; the tax computation showed ₹48,000 take-home and the contract notes showed ₹3,400 of friction he never felt leaving. Invisible geometry: in markets you are PAID in pre-tax, friction-adjusted rupees, not screen profits. IN2 5 builds the full map for an Indian investor — capital-gains rules post the 2024 revamp (STCG 20%, LTCG 12.5% above ₹1.25L), STT & the contract-note stack, debt & dividend taxation at slab, loss set-off/carry-forward, and the broker-cost archaeology that decides whether your “edge” survives contact with reality.

## 🎯 Objectives
- Classify any gain: equity STCG ≤12 months (20%) vs LTCG >12 months (12.5% beyond ₹1.25L/yr exemption); grandfathering logic in one line.
- Decode a contract note end-to-end — canon bill: buy ₹1.5L delivery, total ₹1,50,202.47 (STT ₹150, brokerage ₹20, txn ₹5.25, SEBI ₹0.15, GST ₹4.57, stamp ₹22.50).
- Tax the non-equity world correctly: debt MFs at slab (post-Apr 2023, any horizon), dividends at slab, F&O as business income, intraday as speculative.
- Run set-off & carry-forward: STCL against anything, LTCL only against LTCG, 8-year carry, filing deadline discipline.
- Compute net-of-tax, net-of-cost expectancy of a strategy before funding it — the serialization tax of churn.

## 📘 Concepts

### 5.1 Capital gains — the 2024 map (equity, listed)
Post the July 2024 revamp, simplicity with shorter mercy: **STCG (held ≤ 12 months): flat 20%** + cess. **LTCG (held > 12 months): 12.5%** + cess, with a **₹1.25L per-year exemption** on long-term equity gains pooled across the year (₹2L of LTCG → tax only on ₹75,000 → **₹9,375**). No indexation for listed equity — the trade is: simpler rates, exemption throat, and section 111A/112A machinery replacing the old 10%/15% world. Deadlines & forms: gains go in ITR-2 (or ITR-3 if business income lurks); the AIS pre-fills much of it — reconciling is your job, and mismatches earn notices, not sympathy.

### 5.2 The contract note — canon archaeology
Buy 100 shares @ ₹1,500 delivery = ₹1,50,000 gross. Line by line:

| Charge | Rate | ₹ |
|---|---|---|
| Brokerage (discount flat) | ₹20/order | 20.00 |
| STT (delivery, buy side) | 0.1% | 150.00 |
| Exchange txn charge (illustrative) | 0.0035% | 5.25 |
| SEBI charge | ₹10/crore | 0.15 |
| GST | 18% on (brk+txn+SEBI) | 4.57 |
| Stamp duty (buy side) | 0.015% | 22.50 |
| **TOTAL** | | **₹1,50,202.47** |

Charges ₹202.47 = **0.135%** of trade; effective price/share **₹1,502.02**. Sell side mirrors (STT 0.1% again + stamp-free + DP charge ~₹15). Round-trip delivery friction ≈ **0.27-0.30%** — and intraday/F&O stacks differ (STT structures, no DP). The archaeology lesson: your break-even isn’t the buy price — it’s the buy price PLUS both trips’ toll; a 0.5% “scalp” netted 0.2% before tax existed.

### 5.3 The non-equity shelves — all roads lead to slab
- **Debt mutual funds (post-Apr 2023):** gains at SLAB rate at ANY horizon — the indexation era is over; arbitrage-free parity with FDs on tax, comparison now purely on yield/MTM/liquidity (FI5’s menu logic).
- **Dividends:** added to income at slab (company deducts TDS above thresholds) — the double-layered road, why “dividend yield” strategies must be evaluated post-tax-strip.
- **Equity MF & gold/hybrid:** equity-MF (≥65% domestic equity) follows the equity 20%/12.5% map; others by their own schedules — classification is the entire game, printed in the fund’s type.
- **F&O:** BUSINESS income (audit thresholds, presumptive options) — file ITR-3, expenses deductible (brokerage, data, even that course), carry business losses by rules.
- **Intraday equity:** SPECULATIVE business income — set-off cage and no LTCG mercy: the machine taxes your Tuesday scalps like a shop, because you ran one.

### 5.4 Losses — the silver-lining ledger with rules
- **STCL** sets off against BOTH STCG and LTCG. **LTCL** sets off ONLY against LTCG.
- Unabsorbed: **carry forward 8 assessment years** — but ONLY if the ITR is filed BY THE DUE DATE (belated filing forfeits the carry).
- Harvest doctrine: booking a loss to offset a booked gain is legal tax hygiene—re-buy exposure honestly (mind the spirit; India has no wash-sale statute yet for listed equity, but substance-over-form thinking grows yearly).
Speculative/business losses have their own cages (spec vs spec; non-spec wider; salary never shelters capital/speculative losses). The ledger rule: losses are ASSETS — stored badly (unfiled, wrong head) they expire worthless; stored well they are years of tax-free gain capacity.

### 5.5 Net-of-everything expectancy — where strategies go to be tested
Strategy scoreboard, honest edition: gross edge − friction (note stack × turnover) − tax drag (rate × churn pattern) = **net expectancy**. Two traders at the same 12% gross: investor A (2 round-trips/yr) pays ~0.6% friction + ~₹12.5% rate-class → keeps ~10.4%; churner B (weekly) pays ~13% friction + 20% STCG-class + speculative admin → keeps ≈ **−2%**. Same alpha, opposite lives: frequency is a TAX AND FRICTION CHOICE before it is an alpha choice. Every “hot strategy” must submit a net-of-everything P&L — the scoreboard of adults.

## 🧪 LAB — Toll-booth audit (10 min)
1. STCG vs LTCG fork: gain ₹60,000 on shares — held 8 months: tax? Held 14 months (only equity trade this year): tax? One-line doctrine.
2. ₹2L LTCG year: compute the bill (use the canon ₹9,375) and state what the ₹1.25L exemption does to small-harvest discipline.
3. Contract-note rebuild: seller-side of the canon trade at ₹1,650/share: gross, STT, txn (0.0035%), SEBI, GST on (brk 20 + txn + SEBI), DP ₹15.75, stamp 0? Total credit & the round-trip %.
4. Cage match: Aayush has STCL ₹45,000, LTCG ₹50,000, salary ₹9L, and a belligerent “losses cancel salary” theory. Rule the set-offs allowed and the carry-forward destiny if filed late vs on time.
5. Expectancy court: strategy grosses ₹1.2L/yr on ₹10L via weekly round-trips (friction 0.27%/rt, ~50 rts) taxed as STCG. Net after friction and tax — verdict vs leaving it in an index fund.

**Why this matters:** item 3 is the line-by-line decode you’ll do forever; item 5 is the arithmetic that quietly retires most “active” strategies before their first demat charge posts.

**🔑 Lab answers:** (1) 8 months → STCG 20% = **₹12,000**; 14 months → LTCG: 60,000 ≤ 1,25,000 → **₹0** — one calendar line (12 months) moved the rate 20% → 0: the hold-decision is a tax decision with a date (2) tax = (2,00,000 − 1,25,000) × 12.5% = **₹9,375 (+cess)**; doctrine: the exemption rewards realizing LONG gains patiently each year up to the throat — small annual harvesting of LTCG resets cost basis nearly free (3) sell gross 100 × 1,650 = ₹1,65,000; STT 0.1% = **165.00**; txn 0.0035% = **5.78**; SEBI ₹10/Cr = **0.17**; GST 18% × (20 + 5.78 + 0.17) = **4.67**; DP ~**15.75**; total charges ≈ 191.37 → credit ≈ **₹1,64,808.63**; round-trip on ₹1.5L ≈ (202.47 + 191.37)/1,50,000 ≈ **0.26%** (4) STCL 45,000 sets off against LTCG 50,000 → taxable LTCG 5,000, within the 1.25L exemption → **₹0 tax**; salary NEVER shelters capital losses (theory denied); filed ON TIME the unused loss would carry 8 years — filed LATE the carry dies, and the ₹45,000 asset evaporates (5) friction: 50 × 0.27% × 10L = **₹1.35L — exceeds the entire gross edge**; net ≈ −₹15,000 before tax even applies: verdict — the strategy is a brokerage’s annuity; the index alternative pays its ~0.3% friction once and lets LTCG class mercy do the rest.

## 💪 Exercises
1. Classification sprint: assign head & rate-class for each: 9-month equity gain ₹40k; 15-month equity gain ₹3L (only trade); debt-MF gain ₹30k held 4 years; Nifty-lot F&O gain ₹18k with ₹6k data costs; intraday gain ₹9k with intraday loss ₹4k another day.
2. Note audit real-past: pull (from memory/login) any old trade and rebuild its stack; flag any line surprised you and compute its effective price/share.
3. The ₹1.25L discipline: design the annual LTCG-harvest routine (which tranche, when, re-entry logic, records) for a ₹25L equity portfolio — with the exemption throat arithmetic shown.
4. Loss-ledger rescue: friend carried ₹1.8L STCL “mentally” for years, never filed on time. Diagnose what died, what (if anything) is usable, and the 4-line rule-set you impose going forward.
5. Churn court extended: same 12% gross — investor A 2 round-trips/yr LTCG-class vs B weekly STCG-class vs C intraday speculative-class: build the full net-of-everything table and the closing argument for the jury (your cousin).
6. Dividend illusion: company pays ₹6 dividend “yield 4%” to a 30%-slab investor: post-tax yield, the ex-date price mechanic, and the myth-busting 3-liner for “dividend income is free income.”
7. AIS reconciliation: your computed gains ₹86,400 vs AIS ₹1,02,300: list the four usual culprits (LTCG/STCG mix-ups, F&O netting, buyback lines, MF switch counted as sale) and the resolution workflow before filing.

### ✅ Selected answers
1. 9-month ₹40k → STCG 20% = ₹8,000. 15-month ₹3L → LTCG on (3,00,000 − 1,25,000) × 12.5% = **₹21,875**. Debt-MF 4y → slab (post-2023: horizon irrelevant). F&O → business income ₹12,000 net (18 − 6) at slab via ITR-3. Intraday → speculative; the ₹4k loss sets off ONLY against speculative gains (₹9k same year): net speculative 5k.
3. Routine: identify the oldest held tranches with unrealized LTCG ≈ ₹1.25L each March; sell + immediately repurchase the same exposure (no wash-sale statute for listed equity yet — but document substance); book gains ≈ exemption-throat, cost basis resets UPWARD, tax ≈ cess-only. On ₹25L unrealized-gain-heavy books this amortizes realization across years instead of one swollen exit year — arithmetic shown: harvesting ₹1.25L/yr for 4 years banks ≈ ₹5L of gains at ~0 tax vs a single-year exit paying 12.5% × 3.75L = **₹46,875**.
6. Post-tax yield = 4% × (1 − 0.30) = **2.8%**; ex-date, price drops ≈ the dividend (market marks the cash leaving the company — nothing was created, only relocated). 3-liner: dividends are a taxable partial-liquidation chosen by the company, not a gift; at 30% slab the “income” strips a third; evaluate total-return + tax, never yield alone.
7. Culprits: MF switches and buybacks reported as full sale value, F&O shown gross not net, joint-account duplication, pre-filled STCG/LTCG heads swapped. Workflow: pull broker tax-P&L + console AIS, reconcile line-wise, correct via AIS feedback where needed, file with the reconciled computation attached — a notice answered with arithmetic is a notice that closes; one ignored compounds.

## ❓ Quiz
1. A ₹3L equity gain realized at 15 months (your only trade) is taxed at:
   (a) 20% on all of it
   (b) ₹21,875 + cess — LTCG honours the ₹1.25L exemption first, then 12.5%: the 3-month patience beyond the 12-month line was worth ₹38,125 vs the STCG version of the same trade
   (c) 10% over ₹1L
2. The canon contract note (₹1.5L buy) proves which doctrine?
   (a) STT is the only real cost
   (b) your break-even is buy price PLUS both trips’ tolls (~0.26–0.30% round-trip delivery) — six small lines totalling ₹202.47 that no screen flashes; strategies priced on gross prices are fiction until the note stack signs off
   (c) GST applies on the full trade value
3. STCL of ₹45,000 with LTCG of ₹50,000 in the same year means:
   (a) losses cancel salary
   (b) set-off leaves ₹5,000 LTCG (under exemption → ~zero tax), and any unabsorbed loss carries 8 years ONLY if the ITR is filed by the due date — losses are assets with expiry rules, and belated returns euthanize them
   (c) STCL dies instantly

### ✅ Answers
1. **(b)** — exemption throat first, 12.5% second; (c) is the pre-2024 ghost.
2. **(b)** — toll arithmetic before alpha arithmetic; (c) misreads the GST base.
3. **(b)** — set-off ladder + filing discipline; losses banked properly are future tax-free gains.

## ✅ Mastery checklist
- [ ] I classify any gain into its head and rate class instantly.
- [ ] I can rebuild any contract note line-by-line and quote effective price/share.
- [ ] I know debt/dividend/F&O/intraday routes all lead to slab or business heads.
- [ ] I run set-off ladders and never let carry-forward die by belated filing.
- [ ] Every strategy I fund submits a net-of-friction, net-of-tax expectancy first.

**Next:** IN2 6 · The Retail Playbook — direct vs regular (~₹15.8L of fee drag), SIP mechanics, PMS/AIF/AIF minimums, and the scam-immunization checklist for the WhatsApp era.
