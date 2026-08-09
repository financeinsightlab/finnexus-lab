# 🎯 RT3 · Turnover & the Cash Machine — DIO, DSO, DPO, CCC

> Profit is an opinion until it collects. Activity ratios measure how hard every rupee of assets sweats — and the cash conversion cycle measures how many days of your life your money spends locked in inventory and customers' pockets before returning home. Master these six ratios and you can spot burning working capital before the P&L admits anything.

---

## 🎯 Objectives

- Compute inventory, receivable, and payables day counts the professional way (with averages, on COGS/credit sales)
- Assemble the Cash Conversion Cycle (CCC = DIO + DSO − DPO) and read it as "days of sales trapped"
- Quantify working capital trapped = Sales × CCC/365, and the growth tax on it
- Apply total and fixed asset turnover; spot "lazy asset" stories
- Run the retail/SaaS contrast: CCC machines across business models

---

## 📘 Concepts

### 3.1 The three day-counts — the cycle's organs

- **DIO (Days Inventory Outstanding)** = avg inventory / COGS × 365 — days stock sits before selling. ShopKart: ₹44.1L / ₹198.8L → **81 days** (grocery: high by design — availability beats stockouts).
- **DSO (Days Sales Outstanding)** = avg receivables / credit sales × 365 — days customers take to pay. ShopKart: 41→43→44→**45** across 2019–22 — receivables grew *ahead* of sales every year: a slow, honest-looking drift worth watching (RT6 decides if it's honest).
- **DPO (Days Payables Outstanding)** = avg payables / COGS × 365 — days you make suppliers wait. ShopKart: ₹28.3L / ₹198.8L → **52 days**.

Craft rules: always **average balances** ((open+close)/2), inventory and payables on **COGS** (not sales — margins distort), DSO on **credit sales** where disclosed.

### 3.2 CCC — the machine's heartbeat

**CCC = DIO + DSO − DPO = 81 + 45 − 52 = 74 days.** Interpretation: every rupee ShopKart sells spends 74 days as inventory-plus-IOU minus supplier credit before returning as cash. **Working capital trapped ≈ Sales × CCC/365 = 280 × 74/365 ≈ ₹56.8L** permanently locked. That trapped capital is why a 22.8% ROE retailer still needs a banker. Lower CCC = faster machine; some giants run *negative* CCCs (DMart ~7–10 days, Amazon negative): customers pay instantly, suppliers wait — suppliers effectively fund the business. Whoever funds the cycle holds the power in the supply chain.

### 3.3 The growth tax — expansion sends a bill

Working capital scales with sales, so **growth consumes cash mechanically**: ΔWC ≈ ΔSales × CCC/365. ShopKart grows 30% (ΔSales = ₹84L): the cycle demands **84 × 74/365 ≈ ₹17.0L of new trapped cash** *on top of* the ₹22.5L capex already planned (CF6). This is the quiet killer of "profitable" fast-growers: the P&L celebrates while CFO starves — and the CFO/PAT gap (Module 6/FA7) is exactly where it shows first. Professional rule: **fund the growth tax before you celebrate the growth.**

### 3.4 Turnover ratios — sweat per rupee of assets

- **Total asset turnover** = Sales / avg total assets = 280/103.95 = **2.69×** — the DuPont lever. Sector law: retail/logistics sweat hard (2–4×) on thin margins; utilities/infra sweat slowly (0.3–0.6×) on fat margins; ROA (= margin × turnover) ends up comparable — *different machines, same destination.*
- **Fixed asset turnover** = Sales / avg net FA = 280/64.6 = **4.33×** — stores earn their fit-out.
- **The lazy-asset tell**: turnover falling year after year while management cites "capacity for the future." Capacity that never meets demand is not investment; it's ego in concrete. Check whether the FA7 CapEx-to-growth map (₹1 capex → ₹X sales) still holds.

### 3.5 Business-model contrast — read the model off the days

| Model | DIO | DSO | DPO | CCC | Read |
|---|---|---|---|---|---|
| Grocery (ShopKart) | 81 | 45 | 52 | **74d** | Inventory-heavy, supplier-funded partially |
| Hypermarket leader | ~35 | ~5 | ~30 | **~10d** | Scale = supplier terms power |
| SaaS (ProjectHub) | 0 | ~60 (billings) | ~15 | **45d but funded by deferred revenue** | Negative working capital in disguise |
| Capital goods | 120+ | 150+ | 60 | **210d+** | The cycle IS the business risk |

Same formulas, wildly different machines. The craft is comparing a company to **its own model's physics** — a 74-day CCC is healthy for grocery and catastrophic for software.

---

## 🧪 LAB — Audit the Cycle, Price the Growth (10 min)

**Setup:** ShopKart FY22: sales ₹280L, COGS ₹198.8L (71% of sales), avg inventory ₹44.1L, avg receivables ₹34.5L, avg payables ₹28.3L, debt ₹19L at ~12%, CFO ₹16.95L.

**Do this:**
1. Compute DIO (on COGS), DSO (assume all sales credit), DPO (on COGS), and the CCC. Compare to the canon 74 days.
2. Compute working capital trapped and express it as days of sales.
3. FY23 plan: +30% sales, cycle ratios unchanged. Compute the growth tax (new trapped cash). Management claims "profit will fund everything" — PAT guide ₹17.5L, payout 40%. Does retained profit cover the tax?
4. The CFO proposes squeezing DIO from 81→70 days via a new replenishment system. How much cash is released?

**Why this matters:** This is how treasury teams actually plan: the cycle converts a sales plan into a cash bill. Analysts who can price the growth tax predict "surprise" working-capital blowouts a year early — the classic tell before debt spikes or equity dilutes.

**🔑 Lab answers:**
1. DIO = 44.1/198.8 × 365 = **81 days**; DSO = 34.5/280 × 365 = **45 days**; DPO = 28.3/198.8 × 365 = **52 days**. CCC = 81 + 45 − 52 = **74 days ✓**.
2. Trapped = 280 × 74/365 = **₹56.8L** — i.e., **74 days of sales** permanently locked in the machine.
3. Growth tax = ₹84L × 74/365 = **₹17.0L**. Retained profit = 17.5 × 60% = **₹10.5L**. **Shortfall ₹6.5L** — the claim fails: profit alone does *not* fund the cycle, and that's before the ₹22.5L capex (CF6). Either debt rises, payout falls, or the cycle must speed up.
4. Cash released = COGS × 11/365 = 198.8 × 11/365 ≈ **₹6.0L** one-time release — enough to nearly close Exercise 3's gap. *This is why CFOs obsess over single-digit day improvements.*

---

## 💪 Exercises

1. **Compute.** A distributor: sales ₹500L, COGS ₹400L, avg inventory ₹60L, avg receivables ₹75L, avg payables ₹44L. DIO, DSO, DPO, CCC, trapped cash?
2. **Direction sense.** Each change moves CCC which way? (a) negotiate supplier terms 30→45 days; (b) festive inventory build; (c) launch instant-payment UPI discounts; (d) switch to consignment stock.
3. **The DMart puzzle.** A peer runs CCC of 9 days on similar margins. List two sources of their advantage and one risk of trying to copy it overnight.
4. **Growth-tax shock.** The distributor in Exercise 1 plans +40% growth. Price the tax and recommend funding (internal accruals ₹35L, undrawn WC limits ₹50L).
5. **Lazy-asset audit.** ShopKart's FA turnover fell 5.1× → 4.33× in FY22 while adding 2 dark stores "for future capacity." Write the analyst's three probing questions.

### ✅ Selected answers

1. DIO = 60/400 × 365 = **54.75d**; DSO = 75/500 × 365 = **54.75d**; DPO = 44/400 × 365 = **40.15d**; CCC = 54.75 + 54.75 − 40.15 = **69.35d ≈ 69 days**; trapped = 500 × 69.35/365 ≈ **₹95L**.
2. (a) CCC ↓ (DPO up — suppliers fund more); (b) CCC ↑ seasonally (DIO up); (c) CCC ↓ (DSO collapses toward zero); (d) CCC ↓ sharply (inventory sits on the supplier's books until sold).
3. Advantages: brutal DIO discipline (~35 days via data-led replenishment) and supplier-funding power (~30+ DPO with near-zero DSO — cash customers). Risk of copying: squeezing DPO overnight detonates supplier relationships and in-stock rates — CCC improvement must be *earned* with scale and data, not announced in a circular.
4. Tax = ΔSales ₹200L × 69.35/365 ≈ **₹38L** — exceeds the ₹35L accruals *alone*, and growth years also need capex. Draw the ₹50L WC line but pair it with cycle targets: each DSO day is worth 500/365 ≈ ₹1.37L, so DSO −5 days frees ≈ ₹6.8L; each DIO day frees 400/365 ≈ ₹1.1L. Recommendation: fund with limits + DSO discipline, not pure debt stacking.
5. (1) "What sales per dark store are assumed, and by when — show the ramp?" (2) "What is the payback on the ₹X fit-out at current 4.33×?" (3) "If FY24 turnover falls again, which assets get shuttered — is there an exit plan?" Capacity without a dated ramp is ego in concrete.

---

## ❓ Quiz

**Q1.** ShopKart's cash conversion cycle (DIO 81, DSO 45, DPO 52) equals:
(a) 178 days
(b) 74 days — inventory plus receivable days minus the supplier-credit offset
(c) 126 days
(d) 29 days

**Q2.** ShopKart grows sales by ₹84L with a 74-day CCC. The working-capital growth tax is approximately:
(a) Zero — profits fund growth automatically
(b) ₹17.0L of new cash trapped in the cycle, on top of any capex
(c) ₹84L of new debt
(d) ₹2.3L of extra interest

**Q3.** Why do inventory and payables day-counts use COGS while receivables use sales?
(a) Tradition — no analytical reason
(b) Inventory and payables are carried at cost; mixing sales (which includes margin) would systematically distort their day-counts, while receivables genuinely arise from invoiced sales
(c) SEBI mandates it
(d) COGS is easier to find in annual reports

### ✅ Answers

1. **(b)** — 81 + 45 − 52 = 74. The −DPO is the supplier-financing offset: suppliers fund 52 of the 126 gross days, leaving 74 on ShopKart's own balance sheet.
2. **(b)** — ₹84L × 74/365 = ₹17.0L. It's mechanical, unavoidable, and *in addition* to capex — which is why high-growth "profitable" companies keep surprising investors with cash calls. Fund the tax before celebrating the growth.
3. **(b)** — day-counts must divide like by like: stock and supplier credit live at purchase cost, receivables at invoice value. Using sales for DIO inflates the denominator by the gross margin and flatters the cycle — a quiet way bad analysts (and worse companies) make sluggish inventory look brisk.

---

## ✅ Mastery checklist

- [ ] I compute DIO/DPO on COGS and DSO on credit sales, with average balances
- [ ] I assemble CCC and convert it to trapped cash via Sales × CCC/365
- [ ] I price the growth tax = ΔSales × CCC/365 before believing any growth story
- [ ] I read total and fixed asset turnover against sector physics
- [ ] I can interrogate falling turnover: dated ramp, payback, exit plan

**Next:** RT4 covers the survival family — **liquidity, solvency, and coverage**: current/quick/cash ratios done right, Debt/EBITDA, and why coverage — not D/E — is the ratio that actually kills companies.
