# 🎯 DP4 · The Three Clock Faces — Straight-Line, WDB, and Units

> One machine, three legal ways to spread its cost across the years — and the choice is NOT cosmetic, because the year's charge lands straight in profit. Ind AS 16 para 60 tells you to pick the method that most closely reflects the PATTERN in which the asset's future economic benefits are consumed, review it annually, and change it only as a change in estimate — prospectively, never by retroactive surgery. Meet the cast with one ₹60L machine as the shared canon: straight-line at ₹6.75L a year, written-down-value at a derived (not invented) 25% ≈ 25.01%, and units-of-production at ₹20 per unit — plus the Companies Act's parallel Schedule II clock that every Indian company also has to live beside.

---

## 🎯 Objectives

- Define depreciation formally: systematic allocation of depreciable amount over useful life
- Run all three clock faces on one canon machine and compare the first-3-year charges
- Derive a WDB rate from the formula instead of pulling one from a hat
- Police residual value and useful life: the annual review and the change-in-estimate rule
- Know EXACTLY when the clock starts, when it idles, and when it stops
- Live beside the twin regulators: Ind AS 16's judgment vs Companies Act Schedule II's presumptive lives

## 📘 Concepts

### 4.1 The formal definitions — depreciable amount and useful life

- **Depreciation**: the systematic allocation of the **depreciable amount** of an asset over its **useful life**.
- **Depreciable amount** = cost (or revalued amount) minus **residual value** — the amount you'd get TODAY for the asset if it were already at the end of its life (net of disposal costs). Note the elegant consequence: if residual ≥ carrying amount, the charge is ZERO until facts move — the clock with a floor.
- **Useful life**: the period over which the asset is expected to be available FOR USE by you, or the number of production units you expect from it. It is an economic-life-measured-by-you concept — a machine lasting 20 years in the industry that you run into the ground in 8 has a useful life of 8. Both residual value and useful life are reviewed at least every financial year-end (para 51) — Ind AS 8 governs any change, ALWAYS prospective.

### 4.2 Face one — straight-line: the default honest servant

Canon machine: cost ₹60L, residual ₹6L, useful life 8 years → depreciable ₹54L → **₹6.75L every single year** (python-verified). Flat, boring, EXACTLY right when benefits are consumed evenly — buildings, furniture, most civil works. Its glamour is auditability: any ₹6.75L year can be reproduced by an intern with one ₹ touch-up. Its sin is pretending a car consumes itself as gently in year 7 as in year 1.

### 4.3 Face two — WDB: the front-loaded clock with a derived rate

Diminishing (written-down-value) charges a fixed RATE on the OPENING carrying amount each year. The rate is derived, not invented — the formula: **rate = 1 − (residual ÷ cost)^(1 ÷ life)**. For the canon: 1 − (6 ÷ 60)^(1 ÷ 8) = **25.01%**, taught rounded as 25% (python-verified).

Schedule at 25%: year 1 ₹15.00L, year 2 ₹11.25L, year 3 ₹8.44L (8.4375), tapering toward ₹2.00L in year 8, closing book ≈ ₹6.0L — the residual arriving as designed (6.01 at the rounded rate; the exact 25.01% lands on 6.00 — note the rounding convention in your policy). Three-year front-load comparison: **WDB ₹34.69L vs SL ₹20.25L** — a ₹14.4L gap in the early years. The method fits assets that genuinely fade fastest when young: vehicles, tech, anything whose maintenance curve climbs. Its glamour is matching accelerating service decay; its sin is hiding losses-of-pace deep in footnotes nobody reads.

### 4.4 Face three — units-of-production: the clock with a speedometer

Charge per unit of output = depreciable amount ÷ total expected output = ₹54L ÷ 2,70,000 units = **₹20/unit** (python-verified). Year 1 produces 60,000 units → **₹12L**; year 2 produces 75,000 → **₹15L**. The charge follows the actual wear of the machine like a taxi meter — genuinely superior for extractive and single-product kit (a mine's crusher, a bottling line) and immune to idle-year fiction: no production, no charge. Its governance demand: honest capacity estimates, reviewed as facts shift.

### 4.5 Start, idle, stop — the clock's three switches

- **START**: depreciation begins when the asset is AVAILABLE FOR USE — in the right location and condition to operate as intended (the DP2 finish line) — not when it starts earning revenue.
- **IDLE**: depreciation CONTINUES while the asset is idle or retired from active use (unless it is classified held-for-sale or fully depreciated) — the ₹9,000 jib crane on the wall burns clock even on holiday weeks. (Under units-of-production the charge naturally pauses with output — method matters.)
- **STOP**: the earlier of (a) classification as held-for-sale under Ind AS 105 (DP8), and (b) derecognition.

### 4.6 The twin regulators — Ind AS 16 vs Companies Act Schedule II

Indian companies operate beside TWO clocks. Ind AS 16 says: useful life is YOUR estimate of benefit-consumption, evidenced and reviewed. The Companies Act, 2013 (Schedule II) supplies presumptive useful lives for financial statements under Schedule III — buildings ~30/60 years, general plant ~15 (continuous-process ~25), furniture ~10, computers ~3, servers ~6, vehicles ~8/10 — with residual value presumptively capped at 5% of original cost. Deviate from Schedule II and you must justify with technical evaluation and DISCLOSE. Practical canon: Schedule II is the floor of common practice, Ind AS 16 the doctrine; great files reconcile the two explicitly instead of pretending the tension does not exist.

### 4.7 The change-in-estimate rule — no time machines

Mid-life review: a machine with carrying amount ₹40L is reassessed from 4 years remaining to 8 (better maintenance data). New charge: 40 ÷ 8 = **₹5L/yr**, replacing ₹10L/yr (python-verified) — from THIS year forward, disclosed with its effect. NO restatement of past charges, no hammering the equity of history. That prospectivity is the shield that lets estimates breathe — and the door the manipulation radar (DP11) watches for the classic year-of-the-capex crunch "life extension miracle."

## 🧪 LAB — Three Faces, One Machine (10 min)

Machine: cost ₹80L, residual ₹8L, life 8 years, expected output 3,60,000 units. Actual output: year 1 = 54,000 units.

1. Straight-line annual charge.
2. Derive the WDB rate from the formula (round sensibly), then compute the year-1 charge at the rounded rate.
3. Units-of-production year-1 charge.
4. Rank the three methods by year-1 charge and give ONE asset-real-world reason each ranking could be "right."
5. At end of year 1 under straight-line, review revises TOTAL remaining life to 6 years (from 7). Compute the new annual charge.

**Why this matters:** depreciation notes get read like X-rays; being able to reproduce every number is the skill.

**🔑 Lab answers:**
1. (80 − 8) ÷ 8 = **₹9L/yr**. 2. 1 − (8 ÷ 80)^(1 ÷ 8) = 1 − (0.1)^0.125 ≈ **25.01%**; at 25%: 80 × 25% = **₹20L year 1**. 3. (80 − 8) ÷ 3,60,000 = **₹20/unit**; 54,000 × 20 = **₹10.8L**. 4. WDB 20.0 > UoP 10.8 > SL 9.0: WDB right if the asset fades young (tech, vehicles); UoP right if wear is output-driven (a crusher sitting idle half the year); SL right if service is steady (the shed itself). 5. Carrying after year 1: 80 − 9 = ₹71L; less residual ₹8L = ₹63L over 6 years = **₹10.5L/yr prospective** — no restatement of year 1.

## 💪 Exercises

1. Your plant head argues depreciation should stop while the autumn maintenance shutdown runs because "nothing is being made." Rule and one-line reason?
2. Which method suits a ₹600cr fleet of commercial aircraft whose revenue life is aircraft-hours — and why does Schedule II complicate that instinct in India?
3. Residual games: finance proposes a residual of ₹20L on the ₹60L machine to drop the annual SL charge. New charge? Why is the proposal auditable-suspicious?
4. Under units-of-production, what two disclosures guard the estimate behind ₹20/unit?

### ✅ Selected answers

1. Clock continues — usage-based methods aside, depreciation runs on availability and elapsed service capacity; shutdown maintenance is part of the life of the asset, not a pause in owning it. Only Ind AS 105 classification or derecognition stops the clock.
2. Units-of-production (flying hours) is the doctrinal fit — wear tracks cycles and hours, not calendar; Schedule II pressure (its presumptive lives) means a filed technical justification must bridge Ind AS judgment to the Act, disclosed clearly.
3. New charge: (60 − 20) ÷ 8 = **₹5L/yr** (from ₹6.75L — a ₹1.75L/yr profit puff). Suspicious because residual is measurable TODAY-at-end-of-life scrap reality, not a profit dial; a ₹20L scrap claim on a ₹60L machine invites "show me the scrapyard quote" questions.
4. Total expected output (3,60,000 units basis) and the review cadence — plus the disclosure that these are estimates and how changes flow prospectively.

## ❓ Quiz

**Q1.** The canon's WDB rate of ~25% is:
(a) lifted from the tax rules
(b) derived — rate = 1 − (residual ÷ cost)^(1 ÷ life) = 1 − (6 ÷ 60)^(1 ÷ 8) = 25.01%, so the clock lands the book at the ₹6L residual by design; rounding conventions get documented, never improvised
(c) an industry average auditors accept
(d) whatever keeps year-1 profit smooth

**Q2.** First-3-year depreciation for the ₹60L/₹6L/8-yr canon compares as:
(a) SL ahead because WDB is slower early
(b) WDB ₹34.69L vs SL ₹20.25L — a ₹14.4L front-load gap: diminishing charge mirrors assets that fade young, straight-line fits even consumption, and units-of-production meters actual wear at ₹20/unit
(c) identical under all methods, only timing differs
(d) WDB ₹20.25L vs SL ₹34.69L

**Q3.** Remaining-life review — ₹40L carrying amount now judged to last 8 years not 4:
(a) restate the last four years' accounts
(b) charge ₹5L/yr from now, prospectively, with disclosure — Ind AS 8 governs estimate changes; the past is never reopened, which is exactly why the life-stretch trick earns a radar slot
(c) credit the ₹20L saving straight to reserves
(d) disclose only in year 8

### ✅ Answers

1. **(b)** — the rate is algebra from the residual target, not folklore.
2. **(b)** — front-loading is the feature when benefits fade young; the ₹14.4L gap is doctrine, not error.
3. **(b)** — estimates move forward-only: ₹5L/yr prospective, disclosed.

## ✅ Mastery checklist

- [ ] I can define depreciable amount, residual value, useful life — and quote para 51's annual review
- [ ] I can run all three faces on one machine and reconcile the front-load gap
- [ ] I can derive a WDB rate from 1 − (S ÷ C)^(1 ÷ n) cold
- [ ] I know the three switches: available-for-use starts, idle continues, 105/derecognition stops
- [ ] I can explain the Schedule II twin-clock and the deviation-disclosure dance
- [ ] I apply change-in-estimate prospectively with disclosure, never retroactively

---

**Next:** **DP5 · The Revaluation Model** — the second measurement policy: fair value on the face, ₹10L of OCI that never was profit, the deferred-tax shadow (₹2.5L DTL), and the downward-staircase rules that raid P&L first when there's no surplus left.
