# 🎯 AC3 · Income Statement Engineering — The Ladder from Sales to PAT
> One page tells the year's entire story: what ShopKart sold, what it spent making and moving that sale, what lenders and the taxman took, and what the owners finally kept. Every rung of the ladder — Revenue → Gross Profit → EBITDA → EBIT → PBT → PAT — answers a different interrogator: the merchant, the banker, the analyst, the government, the shareholder. We build ShopKart's FY25 P&L rung by rung and learn to grill it.

## 🎯 Objectives
- Build a multi-step income statement from ledger balances and defend every rung's definition.
- Read **EBITDA** like a banker (cash-earning power of operations) and know its blind spots.
- Separate EBIT / PBT / PAT cleanly — who gets paid in between (lenders, government), and why that order is NOT negotiable.
- Compute **EPS** and read basic vs diluted; greet the P/E teaser.
- Run margin forensics: why COGS = Opening + Purchases − Closing, and what a shrinking gross margin confesses.

## 📘 Concepts

### 3.1 The ShopKart FY25 P&L — full canon ladders (₹ Lakh)
| Rung | Line | ₹L | Margin |
|---|---|---|---|
| Revenue from operations | | 280.0 | 100% |
| − COGS | Opening stock 41.7 + Purchases 205.0 − Closing 44.2 | (198.8) | 71.0% |
| = **Gross Profit** | | **81.2** | **29.0%** |
| − Operating expenses | Rent 18.0 · Salaries 24.0 · Marketing 6.0 · Admin 4.2 · Utilities 3.0 | (55.2) | |
| = **EBITDA** | | **26.0** | 9.29% |
| − Depreciation & Amortization | vans, fit-outs, IT | (6.0) | |
| = **EBIT** (operating profit) | | **20.0** | 7.14% |
| − Finance costs | OD 15L @12% ≈ 1.8 · van loan 0.5 | (2.3) | |
| = **PBT** | | **17.7** | 6.32% |
| − Tax | @25.17% | (4.45) | |
| = **PAT** | | **13.25** | **4.73%** |

### 3.2 Rung interrogations — who asks, and what each rung tells them
- **Gross Profit (₹81.2L, 29%):** the merchant's rung — pricing power over COGS. FY24's was 31% ⇒ slide forensics: buying costlier, or discounting deeper? (Price-war echo from the Ratio & P&L courses: −10% price = −34.5% gross on ₹100/₹71 items.)
- **EBITDA (₹26.0L):** bankers' rung — operating cash-earning power *before* capex habits (D&A), financing layers (interest), and jurisdiction (tax). That's why loan covenants, valuation multiples (EV/EBITDA) and credit officers live here. Blind spots: it ignores the machines' renewal cost and working-capital hunger — a company can "grow EBITDA" and be starving.
- **EBIT (₹20.0L):** purists' operating truth — includes the depreciation rent for machines consumed. Altman's Z-score and ROCE numerators use EBIT.
- **PBT (₹17.7L):** levered result — the interest deduction is why capital structure belongs to the CFO, not the sales team. Interest coverage = EBIT/Interest = 20/2.3 = **8.7×** — comfortably bankable territory (trade lore: >4× breathes, <2× sweats).
- **PAT (₹13.25L):** the owner's line — flows to Reserves (₹13.4L closing after ₹2.65L dividends) and feeds EPS.

### 3.3 COGS = Opening + Purchases − Closing — the merchant's identity
Not a formula, a conservation law: everything bought either sold or sits on shelves. ShopKart FY25: 41.7 + 205.0 − 44.2 = **198.8** ✓. Two instant forensics:
1. **Closing-stock inflation** props up profit — every ₹1L of fictional stock adds ₹1L to PBT. Satyam-era trick #7; auditors count boxes because of it.
2. Margin slide diagnosis: 29% vs 31% last year on flat prices means procurement/pilferage/absorption worsened ~2 points ≈ ₹5.6L of gross profit quietly leaving the year.

### 3.4 EPS — PAT per claimant
Equity: 5,00,000 shares of ₹10 (Capital ₹50L). **EPS = PAT ÷ shares = 13.25L ÷ 5.00L = ₹2.65/share.** Dividend at 20% payout = ₹0.53/share ⇒ retained ₹2.12/share builds next year's earnings power. Basic vs diluted: with convertible instruments/options outstanding, diluted divides by *potential* shares — same numerator, fatter denominator. The P/E bridge (teaser to courses ahead): at ₹30 market price, P/E = 30/2.65 = 11.3× — "11.3 months of CURRENT profit per rupee paid" is the fastest valuation sentence ever spoken.

### 3.5 Format literacy — Schedule III & the single-step jungle
Indian companies publish in **Schedule III** format (nature-of-expense): Revenue from operations, Other income, then expenses by nature (materials consumed, employee benefits, finance costs, D&A, other). US-style is function-of-expense (COGS, SG&A). Both ladders lead to the same PAT tenet: never confuse rung names across formats — "operating income" in the US ≈ our EBIT, banks' "operating profit" in India often means EBITDA. When someone quotes a rung, ask: whose ladder?

## 🧪 LAB — Ladder workshop (10 min)
1. ShelfCo: Sales ₹95L, opening stock ₹12L, purchases ₹60L, closing ₹15L. COGS and gross margin %?
2. From (1): opex — rent ₹8L, salaries ₹12L, marketing ₹4L, admin ₹1L. EBITDA? Why no depreciation asked? (Check what opex ≠.)
3. Continue: D&A ₹3L, interest ₹1.5L, tax 25.17%. EBIT → PAT line by line.
4. Interest coverage from (3)? Verdict vs the 4×/2× lore?
5. ShelfCo has 2,00,000 shares. EPS, and a conceptual: if PAT doubled ONLY via cutting closing-stock honesty (overstating stock), which rungs stay "true"?

**Why this matters:** five minutes of ladder drills build the muscle that reads any annual report's P&L in a single breath — the core literacy for interviews.

**🔑 Lab answers:** (1) COGS = 12+60−15 = ₹57L ⇒ GP = 38 ⇒ **40.0%** (2) EBITDA = 38 − 25 = **₹13L** (dep excluded BY DEFINITION — that's the whole point of the rung) (3) EBIT = 10 → PBT = 8.5 → tax 2.14 → **PAT ₹6.36L** (6.36 ≈ 8.5 − 2.138 ✓) (4) 10/1.5 = **6.7×** — bankable, above 4× (5) EPS = 6.36L/2L = **₹3.18**; stock games never touch Revenue rung but COGS and everything below lie — which is why analysts walk shelves.

## 💪 Exercises
1. Rebuild ShopKart FY25 margins as a % ladder (Revenue → PAT) and flag the biggest single leak.
2. BulkBazaar: Revenue ₹420L, GM 24%, opex ₹78L, D&A ₹9L, interest ₹6L, tax 25.17%. Full ladder to PAT.
3. A CFO says "interest is an operating cost of retail — all our stores are leased and borrowed." Defend or attack the P&L placement of finance costs vs rent. (One paragraph.)
4. Margin-slide autopsy: ShopKart's GM slid 31% → 29% at revenue +7.7%. Price effect vs cost effect — frame the two-question investigation (procurement ledgers first, promo calendars second) and size the ₹ impact at FY24 margins.
5. EPS math: company A PAT ₹40L, 10L shares; company B PAT ₹26L, 4L shares. Higher EPS holder trades at 20×, the other at 12×. Justify the market's logic in terms of growth vs yield. (Approximate, two lines.)
6. Dividend chess: ShopKart Board considers 30% or 50% payout on FY25 PAT. Compute retained earnings under each and state the compounding tradeoff in one line each.
7. Other Income trap: a steel trader shows EBITDA of ₹50L including ₹12L from selling an old plot. Clean the "operational" EBITDA and restate the operational margin on ₹500L revenue.

### ✅ Selected answers
1. 100 → 71 COGS → 29 GP → 19.7 opex → 9.29 EBITDA → 2.14 D&A → 7.14 EBIT → 0.82 interest → 6.32 PBT → 1.59 tax → **4.73 PAT**. Biggest leak: COGS itself (71 paise of every rupee) — exactly why procurement finance is a department, not a ledger.
2. GP = 100.8 → EBITDA = 22.8 → EBIT = 13.8 → PBT = 7.8 → tax 1.96 → **PAT ₹5.84L**. Margin 1.39% — scale without margin is a treadmill (hello, quick-commerce).
3. Rent lives in opex (operations need premises); interest prices the CAPITAL MIX, which owners/lenders choose independently of operations — separating lets EBIT compare a debt-free rival fairly. Verdict: CFO's feelings aside, the ladder order stays.
4. At FY24's 31%, GP would be ₹86.8L vs actual ₹81.2L ⇒ **₹5.6L of gross margin evaporated**; questions: (i) purchase prices up? (discounts lost?) (ii) discount/promo depth up? — margin slides are purchased by someone's decision; find the decision-maker.
5. A: EPS ₹4.0; B: ₹6.5. Market pays 20× for B (₹130) and 12× for A (₹48) — B holds more EARNINGS POWER per share (higher EPS on smaller capital), suggesting better capital efficiency; P/E premiums track expected growth and return on equity, not size.
6. 30% payout: dividend 3.98L, retained 9.27L — more firepower for store #7. 50%: dividend 6.63L, retained 6.62L — happier shareholders today, slower expansion tomorrow. Payout is the board's confession of how many good projects it actually has.
7. Operational EBITDA = 50 − 12 = **₹38L** ⇒ 7.6% (vs reported 10%) — plot sales are not operations; "clean the rungs" is analyst move #1 before multiples touch anything.

## ❓ Quiz
1. ShopKart FY25: COGS built as Opening 41.7 + Purchases 205.0 − Closing 44.2 = ₹198.8L. If closing stock had been OVERSTATED by ₹5L, then:
   - (a) COGS falls to ₹193.8L honest
   - (b) COGS falls ₹5L and profit INFLATES by the same ₹5L — the identity turns inventory fiction into instant PBT; closing-stock overstatement is the oldest profit factory since commerce began
   - (c) only the balance sheet is affected
2. EBITDA (₹26.0L) sits between gross profit and EBIT because it:
   - (a) includes depreciation, excludes interest
   - (b) strips out D&A, financing, and tax choices — measuring the cash-earning power of OPERATIONS alone; the banker's favorite rung for EV/EBITDA multiples and loan covenants
   - (c) equals cash flow from operations
3. ShopKart's EPS (PAT ₹13.25L, 5,00,000 shares):
   - (a) ₹26.50
   - (b) ₹2.65 — PAT per claimant; dividend ₹0.53 at 20% payout retains ₹2.12 for next year's earnings engine (the P/E teaser: at ₹30 market, that's 11.3×)
   - (c) ₹6.63

### ✅ Answers
1. **(b)** — that ₹5L flows straight to PBT, which is why auditors exist (and why AC10 forensics counts boxes).
2. **(b)** — (a) is EBIT's definition in disguise; (c) is AC5's lesson: EBITDA ≠ CFO when working capital is hungry.
3. **(b)** — per-share literacy is the whole retail-investor game; (a) multiplied by 10 somewhere, (c) took the dividend as numerator.

## ✅ Mastery checklist
- [ ] I build the full ladder Revenue→PAT and defend each rung's owner
- [ ] EBITDA explained as operations-only cash power, blind spots included
- [ ] COGS identity recited; closing-stock games named and hunted
- [ ] Interest coverage and effective tax rate from any P&L in 20 seconds
- [ ] EPS, payout, retention link to next-year growth computed calmly
- [ ] Format babel decoded: Schedule III vs US-style, rung-by-rung

**Next:** **AC4 · Balance Sheet Architecture** — the photograph that must balance: assets by liquidity, claims by seniority, working capital as a living number, and the articulation that links it to AC3's P&L through Reserves. The twin engine fires! 🏛️
