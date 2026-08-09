# 🎯 FA3 · Ratio Engine Room I — Liquidity & Solvency
> Bankers don't read stories; they read survival arithmetic. FA3 builds the two shields: **liquidity** (can we pay next quarter?) and **solvency** (can we pay eventually?) — current/quick ratios with their makeup cases, D/E and gearing, interest coverage with its cyclical trap, and the covenant logic you'll face as borrower or lender. ShopKart FY25 (CR 2.06, D/E 0.30, coverage 8.7×) graduates as the canon: strong-position deliberate-headroom.

## 🎯 Objectives
- Compute and challenge current (2.06) & quick ratios — and name when inventories flatter the pretty one.
- Run solvency architecture: D/E, gearing (debt/capital), net-debt/EBITDA — and choose the right one per audience.
- Master **interest coverage** (EBIT/interest = 8.7×) including cycle-adjusted versions for cyclicals.
- Read covenant schedules (min coverage 4×, max D/E 1.0, dividend-locks) and convert them into management decisions.
- Expose liquidity makeup: window-dressing receivable/payable games that distort year-end ratios.

## 📘 Concepts

### 3.1 Liquidity — the oxygen gauges
- **Current ratio = CA/CL = 89.2/43.3 = 2.06** (canon). Textbook guardrail ~1.5–2 for traders/retailers; below 1 says current promises outnumber current resources — survival requires refinancing conversations.
- **Quick (acid-test) = (CA − inventory − prepaids)/CL = (89.2 − 44.2 − 1.5)/43.3 = 43.5/43.3 = 1.00**: strips the shelf-optimism — if the stock can't convert to cash at book in time, pretty CR becomes stage makeup. Retail legitimately runs lower quick ratios than services — read it INDUSTRY-first, then year-over-year.
- **Cash ratio & CCC contra-gauge:** cash 12/43.3 = 0.28 plus CCC 74 days (CF6) — liquidity is a stock AND a clock: a 2.06 with a rotten CCC trend is a slow leak wearing a full bucket.

### 3.2 Solvency — the pillars that outlive cycles
- **D/E = 19/63.4 = 0.30** (canon): total borrowed vs owned. Audience-match: equity analysts quote D/E, lenders quote **gearing = debt/capital employed = 19/82.4 = 23%**, covenant sheets quote **net-debt/EBITDA = (19−12)/26 = 0.27×** (payback-in-years unit — above ~3×, banks sweat; above ~5×, they bring chairs).
- **Interest coverage = EBIT/interest = 20/2.3 = 8.7×**: the margin of error between operations and coupons. **Cyclical trap:** 8.7× measured at peak-margin is really ~2× at cycle-average — banks require **through-cycle coverage** (average EBIT, not today's). CF4's DOL math is the same ghost: 4.06 operating leverage behind the ratio.
- Crony-zone flags: D/E fine BUT coverage crumbling (cheap debt can't service at scale) or coverage fine BUT rolling OD never swings credit (evergreening, CF3 pathology page).

### 3.3 Window-dressing — year-end liquidity makeup
Three classics, one season: (1) **early supplier paydown before Dec-31 + reload in Jan** — CR flatters at photo-time while average-year liquidity is far thinner (ask for QUARTERLY ratios, not year-end); (2) **receivable collection blitz with early-pay discounts** — real, but PRICED (37.2% cost, AC6's knife — the window-dresser paid margin for the photo); (3) **stock puff-hold** ('sell-through planned for Q1') — days rising into the photo without purchase-order evidence = next-year's markdown letter being drafted. **Ratio skepticism doctrine: slopes over snapshots, averages over year-ends, quarters over years.**

### 3.4 Covenant architecture — the lender's remote control
Standard construct: financial covenants (min interest coverage ≥ 4×, max D/E ≤ 1.0, current ratio ≥ 1.25), behavioral locks (dividend lock if coverage <3×, capex caps, promoter-pledge reporting), event triggers (auditor change!, key-man). Borrower's lens (CF8 preview): keep **headroom ≥ 30% on every covenant at trough-case EBIT**, not at signing-day EBIT — ShopKart's 8.7-vs-4 and 0.30-vs-1.0 profile is that doctrine executed, not luck.

### 3.5 The banker's two-ledger rule
Every credit is underwritten twice: **repayment ledger** (cash flows: CFO trajectory, CCC, seasonal troughs) and **liquidation ledger** (what cash arrives if we must sell: net-block realizable ~40-60% of book, stock realizable ~60%, debtors-discounted) — a 2.06 CR built from 60% slow inventory scores F on the liquidation ledger. You'll run both ledgers on FruitCart in FA6's lab.

## 🧪 LAB — The gauges bench (10 min)
1. Quick-check: rival retailer's CR is 1.9, CA includes stock 70% of total. Quick ratio estimate and liquidity verdict?
2. Net-debt/EBITDA: ShopKart's canon vs a hotel chain with ND/EBITDA 4.2× — who gets the cheaper loan and why (two drivers)?
3. Through-cycle fix: cyclical steel supplier shows coverage 9× this year, 6-year average EBIT is 55% of current. Bank view?
4. Trough headroom: covenant min coverage 4×, firm at 5.2× with DOL 3.5 — a −10% sales shock takes coverage where? Pass/fail + the memo verb.
5. Dressing detector: debtor-days plunge 55→28 in December-week only, collection blitz offered 3% early-pay discount: flag color + the priced question?

**Why this matters:** items 3–5 are the daily bread of rating analysts and credit committees; phrased correctly, each answer is one sentence and one number.

**🔑 Lab answers:** (1) quick ≈ (1.9 × 0.30) ≈ **0.57** ⇒ photo-pretty, oxygen-thin: inventory-heavy CR = liquidation-hope, not liquidity (2) ShopKart 0.27× vs 4.2× ⇒ ShopKart's pricing wins on (i) payback years (0.3y vs 4.2y of EBITDA) and (ii) DOL-adjusted stability (retail staples vs cyclical hospitality — the volatility haircut amplifies the spread) (3) through-cycle coverage = 9 × 0.55 = **~5.0×** at average-EBIT — bank underwrites the AVERAGE, sizes to trough; quoted-peak is deck-makeup (4) EBIT drop proxy: −10% × 3.5 = −35% EBIT ⇒ coverage 5.2 × 0.65 = **3.4× ⇒ FAIL** — memo verb: delever BEFORE the shock (the covenant failed at sale's-slide, not at default-date) (5) AMBER: discount cost = 3% for ~27 days head-start ≈ 40%+ annualized — collection discipline is good, but the question is 'did customers accelerate at this price because credit was previously over-extended?' — blitzes confirm prior laxity as often as discipline.

## 💪 Exercises
1. Full gauge-page for ShopKart rival 'FreshBazaar': CA ₹68L (stock 41, debtors 19, cash 8), CL ₹44L ⇒ CR, quick, cash ratio + industry-context verdict in 3 lines?
2. Two-ledger audit for FreshBazaar: liquidation haircuts (stock 60%, debtors 85%, cash full) vs CL — does the firm pass repayment-solvency if sales halt 90 days? Numbers.
3. Coverage algebra: interest ₹5.2L, covenant 3.5×. Minimum EBIT floor? Then with DOL 4.4, the sales-drop % that touches the floor?
4. Gearing dialect translation: D/E 0.8 = gearing? ND/EBITDA 0.27× at ShopKart converts to payback-statement in one sentence the promoter understands?
5. Window-dress year: CR at year-end 1.9, but quarterly-average CR 1.25 + January creditor-reload tells the story — write the credit-officer adjustment paragraph (slopes-over-snapshots doctrine applied).
6. Covenant negotiation: craft the three terms you'd trade (coverage floor, D/E ceiling, capex cap) as ShopKart's CFO entering the ₹28L expansion loan — each with trough-math justification, not hope.
7. Evergreening smell-test: OD limit ₹30L, actuals stay 28–30L for 11 straight months, never dips below 90% utilization. Diagnose with the two-line pathology + the auditor's verification step.

### ✅ Selected answers
1. CR = 68/44 = **1.55** ✓; quick = (68−41)/44 = **0.61** ⚠; cash = 8/44 = 0.18. Verdict: picture passes at the gate (1.55), oxygen fails in the hall (0.61): solvency of this firm rides the stock-room's honesty — recommend CCC + GMROI review before any term sheet; retail-normal but margin-for-error thin.
2. Liquidation ledger: 41×0.6 + 19×0.85 + 8 = 24.6 + 16.15 + 8 = **₹48.75L vs CL 44 ⇒ cover 1.11× — thin PASS** at bankruptcy-month-zero, BEFORE fire-sale fees; repayment-ledger dominates anyway: verdict is 'survivable liquidation, still a repayment-first credit — proceed only with CCC covenants stapled'.
3. EBIT floor = 5.2 × 3.5 = **₹18.2L minimum**; DOL 4.4 ⇒ allowable EBIT slide = (E−18.2)/E; at E=25: 27% EBIT room / 4.4 = **6.2% sales-slide** — the covenant negotiates in millimetres of revenue; size debt accordingly.
4. Gearing = 0.8/1.8 = **44%**; promoter-speak: 'if profits froze completely, the business repays every lender in about four months of today's operations' — ND/EBITDA is the covenant everyone's grandmother can audit.
5. 'Year-end dressing confirmed: quarterly-average CR 1.25 against photo-CR 1.9 with January supplier-reload pattern. Adjustment: underwrite at TTM-average liquidity 1.25, require quarterly covenant definitions EXPLICITLY averaged, and treat any discount-funded December blitz as a margin-cost event, not a liquidity event.'
6. Trade-set example: coverage floor 3.5× (base-case 8.7×, trough-calc 4.7× — headroom documented in writing), D/E ceiling 0.75 post-money (still under peers), capex cap = project envelope +15% with draw-stop if CCC > 80d; each term traded with printed trough-math = respect currency at the committee table.
7. Pathology: an OD that never breathes is a term-loan wearing OD clothes — classic evergreening signature (interest serviced by fresh drawals cycling). Auditor step: verify 2-3 months of bank statements for genuine credit swings and trace whether credits originate from OPERATIONS or from related-party/short-term bridges — paper nets catch oxygen-thieves.

## ❓ Quiz
1. ShopKart's current ratio 2.06 and quick ratio 1.00 together say:
   - (a) liquidity is fake
   - (b) real but inventory-dependent — the shelf-full bucket holds up well when stock converts honestly (81-day CCC, shrinkage 0.55%), but strip the shelves and cover is exactly 1: watch the CCC clock and the GMROI, not just the prettier gauge; ratios travel in bands, always industry-context first
   - (c) both must rise
2. Net-debt/EBITDA at ShopKart (19−12)/26 reads:
   - (a) 0.27 years of EBITDA — lenders can be repaid from ~3 months of operations
   - (b) same, read as payback — above ~3× banks sweat, above ~5× they bring committees; 0.27× with coverage 8.7× = deliberate headroom (CF8's trough-discipline paid off in ratio form)
   - (c) gearing 23%
3. Year-end supplier-paydown + January reload distorts the current ratio because:
   - (a) payables are evil
   - (b) ratios photograph a single date — snapshot engineered by pre-dated actions; the antidote doctrine: slopes over snapshots, quarterly averages over year-ends, and decode any blitz at its priced cost before applauding liquidity
   - (c) CR ignores cash

### ✅ Answers
1. **(b)** — depopulate the shelf and the prettier number confesses its makeup case.
2. **(b)** — (a) and (c) are neighboring dialects; the covenant unit is payback-years, quoted properly here.
3. **(b)** — time-series cynicism is the analyst's sunscreen: apply quarterly or burn.

## ✅ Mastery checklist
- [ ] CR/quick/cash computed and context-called for any BS in 2 minutes (industry band named)
- [ ] D/E vs gearing vs ND/EBITDA dialect matched to audience + payback-years translation
- [ ] Through-cycle coverage discipline applied (average-EBIT, DOL-adjusted trough)
- [ ] Covenant arithmetic negotiated at trough-cases, not signing-day photographs
- [ ] Window-dressing trio flagged with priced-cost questions (blitz collection, paydown, puff-hold)
- [ ] Two-ledger underwriting executed (repayment + liquidation) on any small-cap BS

**Next:** **FA4 · Ratio Engine Room II — Profitability & Efficiency** — the DuPont decomposition that splits ShopKart's ROE 22.8% into 4.73% × 2.69 × 1.79 and tells three different management stories, ROCE vs ROE discipline, return-quality traps (buyback-inflated EPS cousins), asset-turnover vs margin business models, and efficiency ratios that show exactly which shelf pays rent! ⚙️
