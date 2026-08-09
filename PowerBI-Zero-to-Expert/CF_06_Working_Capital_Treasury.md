# 🎯 CF6 · Working Capital Treasury — Cash Conversion Cycle & the Desk
> Profit is a quarterly photograph; working capital is the daily oxygen. More retailers die *profitable-but-strangled* than unprofitable — inventory eats cash, debtors sleep on it, and the OD clock never stops. CF6 is the treasury desk: the **Cash Conversion Cycle** as your master dial, every day saved priced in rupees, the order-size law, and the receivables-politics math that decides whether easy terms are growth or slow poison.

## 🎯 Objectives
- Build the **CCC** = inventory days + receivable days − payable days; ShopKart = 81 + 41 − 48 = **74 days**.
- Price saved days: each CCC day ≈ ₹0.545L at COGS pace ⇒ 10 days = ₹5.45L freed ≈ **₹0.65L/yr** interest saved at OD 12%.
- Optimize each leg honestly: JIT the perishables, chase the aging ladder, stretch suppliers *ethically*.
- Compute **EOQ** (√(2DS/H) = 980 units) and know when the square-root law lies.
- Decide receivable relaxation cases with a net-benefit table (+₹5.7L verdict on the 60-day pilot).

## 📘 Concepts

### 6.1 The master dial — 74 days, dissected
```text
Inventory days = closing stock / COGS × 365 = 44.2/198.8 × 365 = 81
Receivable days = debtors / credit sales × 365 = 31.5/280 × 365  = 41
Payable days   = creditors / purchases × 365 = 26/205 × 365      = 46 (≈48 at COGS)
CCC = 81 + 41 − 46 ≈ 74–76 days   →  ~₹45.9L locked, funded at 12% OD ≈ ₹5.5L/yr
```
Every CCC day costs OD interest: daily COGS ₹0.545L × 12% ⇒ **₹0.065L/day-year** — shrinking CCC by 10 days saves ≈ **₹0.65L annually**, forever, risk-free, no customer asked. That is the cheapest EBITDA improvement in business.

### 6.2 Leg-by-leg levers (with honesty rails)
- **Inventory (81d):** ABC discipline — A-class weekly reviews, C-class quarterly; fresh/perishables JIT (dairy daily, staples fortnightly); GMROI watch (1.89 canon) — cut SKUs paying rent in dust, never the ones converting footfall. *Rail:* availability kills first; 95-day availability paranoia is the buyer's trick (AC7's lab).
- **Receivables (41d):** aging ladder owner meetings weekly; standard 2/10-net-30 discount where margin holds (cheaper than 12% OD when YOU'RE the payer… flip it as the seller: 37.2% is what you *charge* them implicitly — wise sellers price it); credit limits + stop-supply triggers at 60+.
- **Payables (46d):** stretch to terms, NOT beyond — supplier quality, price loyalty, and festival allocation depend on your payment reputation; permanent slow-pay converts into hidden price hikes with compound interest. Ethics and arithmetic agree here for once.

### 6.3 EOQ — the square-root law
`EOQ = √(2 × D × S / H)` — D=12,000 units/yr, order cost S=₹800, holding H=₹20/unit ⇒ √(2×12000×800/20) = √960,000 = **980 units**. Total cost curve is FLAT near the optimum (ordering 900–1,100 barely moves cost) — robustness is the law's real gift. Where it lies: lumpy festival demand, perishability, MOQ vendor games, and shelf-life caps — then use EOQ as the skeleton and judgment as the skin.

### 6.4 The receivables-relaxation decision — full table
Pilot: extend B2B terms 41→60 days on select vendors; expected sales +8% = +₹22.4L.
```text
+ GP on new sales: 22.4 × 29%                         = +6.50L
− funding extra AR: 22.4 × 60/365 = 3.68L × 12%       = −0.44L
− expected default (1.5% new sales)                   = −0.34L
────────────────────────────────────────────────────────────
Net benefit ≈ **+₹5.7L** ⇒ ACCEPT — with ageing screens ON
```
The template is the takeaway: margin gained − funding cost − default cost, always all three, never one.

### 6.5 Treasury daily — the 13-week rule
Professionals run a **rolling 13-week cash forecast**: opening cash + receipts − payments, weekly granularity, refreshed weekly. It catches the OD ceiling kiss 6 weeks early (when fixes are cheap), sizes festival builds, and converts surprises into calendar items. Idle-cash policy: sweep above 2× weekly outflow into liquid instruments — idle ₹20L earning nothing while the OD runs at 12% elsewhere in the group is silent self-billing.

## 🧪 LAB — The desk shift (10 min)
1. Monthly pace check: stock rises ₹46→52L while sales pace is flat. CCC days impact (steps only) + the question you send the buyer?
2. Price a 12-day CCC cut for ShopKart in rupees saved per year.
3. EOQ: D = 6,000, S = ₹500, H = ₹12 — units, and orders/year.
4. Vendor asks 45-day terms vs your 30-day standard, offering 1% price cut on ₹60L annual volume. Accept?
5. 13-week rule: opening cash ₹12L, festival build needs ₹9L peak outflow week 6, receipts curve pays back +₹11L weeks 7–9. Any problem?

**Why this matters:** each item is a daily ticket on a real retail treasury desk; 2 and 4 are also MBA case staples.

**🔑 Lab answers:** (1) inventory days jump 198.8-pace: Δdays = 6/0.545 ≈ +11 days ⇒ CCC ≈ 85 days and ₹6L more cash frozen; mail: 'which SKUs — show the aging split before I approve the festival PO' (2) 12 × 0.545 × 12% = **₹0.79L/yr** ≈ free PAT (3) √(2×6000×500/12) = **707 units**; 6,000/707 ≈ **8.5 orders/yr** (4) 1% × 60L = **₹0.60L** saving vs extra funding 60×15/365×12% = ₹0.30L ⇒ **accept** (net +₹0.30L) — and if the OD were ever tight, re-price at the true marginal funding rate, not the average (5) NO problem *visible*: week-6 trough ₹12−9 = ₹3L > safety floor; but the desk books the OD headroom for week 6 NOW — treasury's job is making surprises into calendar items.

## 💪 Exercises
1. Full CCC rebuild for a rival: stock ₹80L, COGS ₹400L, debtors ₹55L, sales ₹500L, creditors ₹35L, purchases ₹420L. Days each + CCC + rupees locked at 11%?
2. JIT raid design: ShopKart dairy aisle — list the two operational prerequisites (supplier cadence, shrink visibility) before cutting dairy's 9-day cover to 3; and the failure mode if either is missing.
3. Payables-ethics precis: write the 3-line vendor-letter voice ShopKart should use when it temporarily needs 10 extra festival-stocking days on payables. (Hint: ask, price, commit.)
4. Receivable pilot remix: same +8% sales, but defaults run 3% and funding is 13.6% (equity-priced): accept or reject with the full table?
5. EOQ with festival lumpiness: 70% of the 12,000 units sell in 90 festive days. Defend punching the steady EOQ anyway vs switching to seasonal builds — 4 lines, mention holding-cost asymmetry.
6. Idle-cash audit: group has ₹25L sitting 11 days between a property sale and a capex tranche; OD in another entity runs ₹40L at 12%. What SHOULD the treasurer do, and what's 'unrelated-entity' honesty rail?
7. 13-week template build: sketch columns + three operating lines (receipts from debtors aging, payments from payable schedule + rent/salary calendar, OD line) — text format, ShopKart week-1 numbers: opening 12, receipts 5.2, payments 6.1.

### ✅ Selected answers
1. Inv days 73, rec days 40, pay days 30 ⇒ **CCC 83 days**; locked cash ≈ (80 + 55 − 35) = ₹100L ⇒ ≈ **₹11L/yr** at 11% — the dial and the bill, in one pass.
2. Prerequisites: (i) supplier commits 2× daily drops with quality SLA, (ii) shrink/expiry tracked per batch so stock-outs ≠ silent. Missing (i): shelves gap at 7pm peaks; missing (ii): shrink eats the saved holding cost and worse — expiry waste lands in GM.
3. 'Festival window Oct 12–Nov 10: we request +10 days on invoices FF-3xx series, we will pay a 0.8% carrying adjustment on the extended period, and we commit the payment calendar in writing — your allocation to us stays our top priority.' Asking + pricing + commitment turns begging into trade credit markets, Indian-vendor edition.
4. GP +6.50 − funding 3.68×13.6% = −0.50 − defaults 22.4×3% = −0.67 ⇒ **+₹5.33L still accept** — note DEFAULTS, not rates, swing these pilots; a 4.6% default rate would zero it. Underwriting beats pricing in B2B credit.
5. Steady EOQ defends routine weeks and smooths supplier lines; the festive 70% deserves *seasonal pre-builds* with separate math (holding cost of 90-day carry vs stock-out margin loss: festive margins run higher and airlift/substitution costs brutal — usually pre-build wins). EOQ gives the skeleton; seasonality gets custom skin, never Pareto worship.
6. Park the ₹25L in an overnight/liquid instrument (≈6.5% for 11 days ≈ ₹4,900 — honest money) and separately settle the ₹40L OD from legitimate internal accrual flows; rail: cross-entity sweeps need board/related-party hygiene — 'matching inside the group' without paperwork is how treasury becomes AC9's related-party chapter.
7. Columns: week | opening | receipts | payments | net | closing | OD. Week-1: 12 + 5.2 − 6.1 = **11.1 closing**, OD untouched ✓ — three lines power: receipts drawn from the AGING ladder, payments from the vendor calendar, salaries/rent always dated truth.

## ❓ Quiz
1. ShopKart's CCC ≈ 74 days priced at a 12% OD implies cutting 10 days saves yearly:
   - (a) ₹0.065L
   - (b) ≈ ₹0.65L — each frozen day costs daily-COGS × 12% run-rate, forever; ten saved days is the cheapest PAT on Earth: no customer asked, no sale risked, pure clock-speed
   - (c) ₹6.5L
2. The net-benefit template for relaxing terms MUST include:
   - (a) sales growth only
   - (b) margin gained − incremental funding cost − expected defaults, all three or don't pilot (recall canon: +6.50 − 0.44 − 0.34 = +₹5.7L); single-line sales-vibes pilots are how receivables rot quietly into AC10 red flags
   - (c) competitor behavior
3. The square-root law EOQ (D=12,000, S=₹800, H=₹20) lands at:
   - (a) 346 units
   - (b) 980 units — √(2×12,000×800/20) = √960,000; and the cost curve is mercifully FLAT around it (900–1,100 barely differs), which is why festivals, perishables and MOQs are handled as judgment-skin over the EOQ skeleton
   - (c) 1,386 units

### ✅ Answers
1. **(b)** — clock-speed is a free return stream; (c) misplaced the decimal by one glorious zero.
2. **(b)** — three rows or no pilot; defaults swing the verdict faster than rates do.
3. **(b)** — √960,000 ≈ 980; (a) halved demand, (c) forgot the ÷H.

## ✅ Mastery checklist
- [ ] CCC built from any three statements in 3 minutes; rupee-lock conversion fluent (₹0.065L/day/yr)
- [ ] Three-leg lever list with honesty rails recited (availability for inventory, credit limits for AR, reputation for AP)
- [ ] EOQ computed + its four 'lies' named; flat-curve robustness exploited in narration
- [ ] Terms-relaxation table built solo with defaults as the swing row
- [ ] 13-week rolling forecast columns from memory; festival-trough reasoning out loud
- [ ] Idle-cash and OD-in-other-entity trap diagnosed with the related-party rail

**Next:** **CF7 · Valuation Front Door — DCF & Multiples Discipline** — from FCFF ₹13.67L to enterprise value ₹194L to ₹37.4/share vs the ₹30 market quote: the full DCF build, the terminal-value gravity warning (67% of EV!), sensitivity tables, and P/E vs EV/EBITDA — when each multiple lies to your face! 💎
