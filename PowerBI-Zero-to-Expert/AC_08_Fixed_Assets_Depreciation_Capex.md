# 🎯 AC8 · Fixed Assets, Depreciation & Capex — Machines on the Ledger Diet
> A delivery van costs ₹15L once and serves eight years — so the P&L shouldn't swallow it on day 1. Capitalize, then depreciate: the elegant matching-machine that turns a truck into a time-series of expense. We duel SLM vs WDV, respect Schedule II lives, dissect capital-vs-revenue expenditure (the oldest audit battlefield), run impairment and disposal entries, and face the question that has destroyed countless interview candidates: *is depreciation a source of funds?*

## 🎯 Objectives
- Decide **capitalize or expense** with the three gates (future benefit, >1 year, materiality) — and *intent* tongued firmly.
- Compute **SLM** (companies) and **WDV** (tax books) depreciation and narrate timing effects on tax and reported margin.
- Work **gross block, accumulated depreciation, net block** as a fluent trio; place capex vs repairs correctly.
- Execute disposals: book value, sale, gain/loss — and retrieve the favorite "sold above book" trick.
- Apply impairment logic (carrying vs recoverable) and answer the funds question like a professional.

## 📘 Concepts

### 8.1 Capitalize vs expense — the three gates + the battlefield
```text
Gate 1: Future economic benefit (> current period)?  Gate 2: Useful life > 1 year?
Gate 3: Material to the statements?
ALL YES → capitalize (asset, then depreciate) · otherwise expense today.
```

- New billing laptop ₹80,000 → asset (3-yr life). Monthly antivirus ₹2,000 → expense.
- Routine van servicing ₹18,000 → expense. **Engine overhaul extending life 3 years ₹1.6L → capitalize** — the battlefield: companies resisting margins-pressure "overhaul" their way into capitalization. Audit weapon: before/after capacity evidence, not invoices.
- The ShopKart canonical audit-line: FF-221 (₹55,755 with GST) for a POS terminal → capitalize ₹47,250 (input credit claimed on ₹8,505) — fixed assets ride EX-GST when ITC is claimed; this is why invoice literacy (AC6) precedes asset accounting.

### 8.2 Depreciation is allocation, not valuation (nor cash)
Three one-liners that separate students from professionals:
1. Depreciation spreads cost over useful life — **matching**, not measuring market value.
2. Profit falls but **cash stays** — it's non-cash (AC5's add-back).
3. The asset's book value ≠ price Tagore the market would pay (resale) — delivery of the "asset carrying ₹40L, recoverable ₹32L" conversation (impairment, 8.4).

**SLM (Companies Act, Schedule II):** (Cost − Residual) / Life. Van: (15 − 1)/8 = **₹1.75L/yr** for 8 years — straight, boring, faithful.
**WDV (Income Tax):** rate on diminishing balance: van at 25%: y1 ₹3.75L, y2 15×0.75×0.25 = **₹2.8125L**, y3 ₹2.109375L — front-loaded (tax-friendlier early), balances never touch zero (theoretical tail). Schedule II useful lives (memorize the big four): **computers & servers 3 yrs, vehicles 8 yrs, furniture 10 yrs, buildings 30–60 yrs** (plant & machinery default 15).

Two-books reality: companies commonly keep Companies-Act depreciation for shareholders and WDV for tax — the difference shows up later in your life as deferred tax (Course 5 handles the full reconciliation story).

### 8.3 The block trio — read any fixed-asset schedule in 10 seconds
```text
Gross block 25 (open)  + capex 5 (van)  = 30 gross
Accumulated depreciation: 2.5 + 6 (year's charge) = 8.5
Net block = 21.5  ✓ (ShopKart FY25 canon)
Age meter ≈ AccumDep / AnnualDep = 8.5/6 ≈ 1.4 years of charge in the tank
```
A gross-old/net-young BS says "recently re-invested"; gross-and-accum-dep both huge says "the fit-outs are geriatric."

### 8.4 Disposals & impairments — the entries that expose the narrative
**Disposal (WDV route):** van, book after 2 years = 15 − 3.75 − 2.8125 = **₹8.4375L**, sold for ₹9L ⇒ **gain ₹0.5625L** (other income; never recast as operating margin!). Sold for ₹7L ⇒ loss ₹1.4375L. Interview trick #1: "sold above book ⇒ profit" — then probe if the company *wanted* the window dressing.
**Impairment (Ind AS 36):** carrying ₹40L vs recoverable (higher of value-in-use and fair-value-less-costs) ₹32L ⇒ **Dr Impairment loss 8 / Cr Asset 8** — the knife (7.3's NRV cousin for machines) recognizing machines that will never earn their carry. Impairment is how old telecom and big-box retail skeletons finally confess; the audit question is never *arithmetic*, it's *assumptions* (discount rates, cash projections) — Course 5 extends.

### 8.5 "Is depreciation a source of funds?" — the interview guillotine
Correct answer, three lines: **No.** It is an *allocation* of a past cash outflow; no cash enters. Income tax shield aside (it saves tax × dep), it doesn't generate money — its add-back in CFO merely says the cash never left *this year*. The funds arrived when the asset was bought (or when profit earned it). "Depreciation is a source of funds" is the charming textbook half-truth; professionals call it **cash-preservation through tax-timing**, not a source.

## 🧪 LAB — Workshop floor (10 min)
1. Machine cost ₹8L, salvage ₹0.5L, life 6 (SLM). Annual charge? Net block after year 3?
2. Same machine at 30% WDV — years 1 & 2 charges? Which government prefers which book?
3. Cap-or-expense gate drill, yes/no + gate reason: (a) ₹60,000 website rebuild (b) ₹6,500 printer (c) ₹2.2L cold-room for the dairy aisle (d) ₹90,000 annual store repaint.
4. Disposal: laptop block (3-yr SLM) cost ₹1.2L, no salvage, sold end-year-2 at ₹30,000. Book value, gain/loss?
5. Impairment screen: kiosk carrying ₹16L; value-in-use ₹11L; sale-net ₹13L. Charge?

**Why this matters:** this is the fixed-asset register's everyday grind; doing it cleanly is how juniors graduate to seniors without suspense accounts named after them.

**🔑 Lab answers:** (1) dep = 7.5/6 = **₹1.25L/yr** → net block after y3 = 8 − 3.75 = **₹4.25L** (2) y1 ₹2.4L, y2 8×0.7×0.3 = **₹1.68L**; Companies Act reads SLM (shareholder books), Income Tax honors WDV (tax books) — two books, one tranquility (3) (a) capitalize (extended life/benefit) (b) expense (materiality/threshold practice, though technically an asset — firms set floors like ₹5–10k) (c) capitalize (d) expense (maintenance, restores but doesn't extend) (4) book = 1.2 − 0.8 = **₹0.4L** ⇒ **loss ₹0.1L** (₹10,000) (5) recoverable = max(11, 13) = 13 ⇒ impairment **₹3L**.

## 💪 Exercises
1. ShopKart's van, full schedule under BOTH methods for 3 years (₹15L, salvage ₹1L, life 8 / WDV 25%): list annual charges.
2. Two-book day: profits identical, D&A yrs 1–2 differ. Write one line on "why reported PAT ≠ taxable income" that a CA intern could tell a CFO without dripping jargon.
3. Gate-fire audit: pick which items a margin-desperate firm would TRY to capitalize and invent the honest rule for each: 6-month branding campaign ₹30L; 3-day compliance-software config ₹4L; store CCTV infra ₹7L (life 5); Diwali hoardings ₹1.2L.
4. Disposal maths under SLM: van sold after 4 full years for ₹6.4L (book path from 8.1). Gain/loss, and where in the P&L?
5. Age meter: gross block ₹120L, accum dep ₹84L, annual dep ₹12L. Story?
6. Impairment mini-case: a store's fit-out carries ₹22L; competing mall opens; value-in-use drops to ₹14L, fair-sale ₹12L. Entry + the one assumption auditors will grill first.
7. "Funds from depreciation" urban legend: in four lines, give the correct version a non-finance founder finally internalizes (mention tax shield, add-back, allocation, capex age).

### ✅ Selected answers
1. SLM: 1.75 / 1.75 / 1.75. WDV: 3.75 / 2.81 / 2.11 (4th would be 1.58 — front-load decays).
2. "Reported PAT follows Schedule II lives (shareholder truth); taxable income follows Income-tax WDV rates (policy truth); the gap is real, legal, and bridged later by deferred-tax accounting — that's literally its job description" (Course 5).
3. Branding: expense (benefit is neither durable nor reliably measurable beyond the campaign — firms TRY capitalizing this one, and it dies at the "durable future benefit" gate). Compliance-software config: expense (a 3-day implementation service on software already owned, with no separate controllable asset created). CCTV: capitalize (5-year life) — the honest yes. Hoardings: expense (seasonal, single-period benefit — the classic revenue expenditure).
4. Book after 4 yrs SLM = 15 − 7.0 = **₹8.0L** ⇒ sale 6.4 ⇒ **loss ₹1.6L** — recorded under Other Expenses/P&L non-operating wear; never CC-ranked with opex bleeding.
5. Age = 84/12 = **7 years of charge inside** — this grid of assets ran ~7 of normal working life; capex renewal window opening — expect big CFI outflows soon (a company's wrinkles, quantified).
6. Recoverable = max(14, 12) = 14 ⇒ **Dr Impairment 8 / Cr Fit-out 8**; first assumption grilled: the value-in-use cash forecast (footfall post-mall) and its discount rate — arithmetic obeys them blindly.
7. Depreciation is the P&L *remembering* a past cash purchase in slices. It never brings cash home from outside — except that lower accounting profit lowers taxable profit, so the taxman co-signs a check worth dep × tax-rate. Calling it a "source" confuses the adjective "non-cash" with the verb "earns"; the capex that bought the asset, and the revenues it enables, are the sources. Misuse of language creates delusions of cash — and delusions don't payroll.

## ❓ Quiz
1. Van ₹15L, salvage ₹1L, 8-year SLM: annual charge and net block after year 2:
   - (a) ₹1.875L, ₹11.25L
   - (b) ₹1.75L and ₹11.5L — (15−1)/8 straight-lined; two years of matching = 3.5 consumed; accumulation never touches the van's cost history (gross 15 stays)
   - (c) ₹2.5L, ₹10L
2. A routine van service (₹18,000) versus an engine overhaul that adds three life-years (₹1.6L):
   - (a) both expenses
   - (b) service = expense (restore), overhaul = capitalize (extend beyond original condition) — the battlefield gate is FUTURE BENEFIT, verified with before/after capacity evidence, not with invoices
   - (c) both capitalize
3. "Depreciation is a source of funds" is:
   - (a) correct — CFO adds it back
   - (b) wrong — it's an ALLOCATION of a past outflow (non-cash); the only cash it ever moves is the tax shield (dep × rate); the add-back says the money never left this year, not that any arrived
   - (c) correct only for profitable firms

### ✅ Answers
1. **(b)** — (a) forgot salvage; (c) invented ₹2L salvage — read the problem's numbers, not the answer's style.
2. **(b)** — accountants who capitalize services to flatter EBITDA meet auditors with capacity meters; this exact gate is where margin-games die.
3. **(b)** — language precision here separates treasury thinkers from exam tourists; the guillotine drops kindly on the prepared.

## ✅ Mastery checklist
- [ ] Three gates recited + the materiality floor respected (printer-class spends expensed by policy)
- [ ] SLM/WDV tables built through any horizon; two-books story narrated in one line
- [ ] Block trio read as a 10-second fingerprint (gross age vs charge = renewal clock)
- [ ] Disposals: book, sale, gain/loss in the right P&L neighborhood (never opex masquerade)
- [ ] Impairment: carrying vs recoverable; assumptions listed as the audit surface
- [ ] The funds question answered with tax-shield precision, no legend, no fluff

**Next:** **AC9 · Liabilities, Provisions & Equity** — the other side of the scale: debt's terms, provisions vs contingencies vs reserves (the trio everyone fumbles), share capital anatomy, dividends, buybacks, EPS price — the claims side gets its full due! ⚖️
