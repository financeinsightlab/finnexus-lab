# 🎯 TW1 · The Rate Engine — LCM Units & Man-Days
> A finishes in 12 days, B in 18 — and the beginner's brain immediately adds 12 + 18. Never again. Work is a **tank of units**: set it to LCM(12, 18) = 36, read each worker's daily flow (3 u/d and 2 u/d), and every question in the chapter becomes one division. Plus the man-day: the currency in which real project budgets are actually paid.

## 🎯 Objectives
- Flip the unit: "n days to finish" means **1/n of the work per day** — rate, not time, is the working currency.
- Master the **LCM work-tank**: total work = LCM of the given days; per-person units/day; combined flow; TANK ÷ flow = time.
- Combine any crew (2, 3, fractional workers) and handle "finishing together" variants with one formula.
- Price work in **man-days / man-hours**: M₁D₁ = M₂D₂ for constant work, with the inverse-flip instincts locked.
- Spot ADD-THE-DAYS, the chapter's founding felony, on sight.

## 📘 Concepts

### 1.1 Rates, not days — the atomic flip
A wall takes A 12 days: A's rate = **1/12 wall/day**. B needs 18**: 1/18**. Together:

```text
1/12 + 1/18 = 3/36 + 2/36 = 5/36 per day → wall done in 36/5 = 7.2 days
```

Adding days (12+18 = 30) is the founding felony — two workers don't take LONGER than each alone. The adding happens in **rates**, the answering in the reciprocal.

### 1.2 The LCM tank — fractions you can eat
Identical math, but dressed for combat: declare the **tank = LCM(days) = 36 units**.

```text
A: 36/12 = 3 units/day · B: 36/18 = 2 units/day · together 5 u/d → 36/5 = 7.2 days ✓
```

Whole numbers, no fraction dust, and every variant ("A works 4 days then B joins") becomes tank bookkeeping: A banks 4×3 = 12, remaining 24, joint flow 5 u/d ⇒ 24/5 = 4.8 more days, total 8.8. Current state of the tank is ALWAYS one multiplication away. That's why toppers whisper "LCM" and beginners cry in fractions.

### 1.3 Crews and unequal blends
Three workers 10, 15, 30 days ⇒ tank 30: flows 3 + 2 + 1 = 6 ⇒ **5 days**. The formula card for two: T = xy/(x + y) (12×18/30 = 7.2 ✓) — the harmonic twin walks here too (TSD2 salutes from next door); for three or more, tank-flow is cleaner. Fractional help: "A does half, then A+B finish it": half-tank 18 at 3 u/d = 6 days; remaining 18 at 5 u/d = 3.6 ⇒ total 9.6. Piecewise tanks — one equation per phase.

### 1.4 Man-days — the billing unit of real India
Work constant ⇒ **M₁ × D₁ = M₂ × D₂** (inverse, always inverse):

```text
Canon: a festive shelf-reset needs 150 man-days.
25 men  → 150/25 = 6 days ✓      30 men → 5 days        10 men → 15 days
ShopKart translation: at ₹2,500/man-day, the JOB costs ₹3,75,000 no matter
how many bodies you rent — headcount moves the CALENDAR, not the invoice.
```

Scale with hours too: 8-hour vs 10-hour shifts reprice man-days into man-hours (150 md = 1,200 mh at 8 h; at 10 h/day that's 120 body-days) — TW6's staffing pack invoices exactly this. Watch the silence-traps: "men work 8 h/day" vs "…10 h/day" flips the man-hours mid-question.

### 1.5 The first smell-tests
- Crew finishes **faster** than the fastest member alone ⇒ 7.2 < 12 ✓.
- Double the bodies ⇒ **half** the days (inverse), never "double the days."
- Adding one lazy worker (small rate) still **speeds up** the job — rates add, even tiny ones.
Break any of these and the radar (TW5) already knows which trap you fed.

## 🧪 LAB — The tank room (10 min)
1. A: 8 days, B: 12 days — together? (Tank + check against xy/(x+y).)
2. A: 20, B: 30, C: 60 — all three together?
3. A (12 d) works alone 3 days, then B (18 d) joins — total time?
4. Man-days: audit accepts 240 man-days. 20 auditors ⇒ ___ days. If they must finish in 8 days ⇒ ___ auditors?
5. 6 packers do a warehouse chore in 10 days working 8 h/day. How many days for 8 packers at 6 h/day? (Man-hours bridge!)

**Why this matters:** tank-flow is 70% of the chapter; man-days are 100% of its billing reality. Nail both in 10 minutes, own the topic for a decade.

**🔑 Lab answers:** (1) tank 24: 3 + 2 = 5 u/d ⇒ **4.8 days** (8×12/20 = 4.8 ✓) (2) tank 60: 3+2+1 = 6 ⇒ **10 days** (3) A banks 9; left 27; joint 5 u/d ⇒ 5.4 more ⇒ **8.4 days total** (4) 240/20 = **12 days**; 240/8 = **30 auditors** (5) work = 6×10×8 = 480 man-hours ⇒ 480/(8×6) = **10 days** — more bodies, fewer hours, same answer: man-hours is the invariant.

## 💪 Exercises
1. A: 15 days, B: 20 days — together, in one tank line.
2. Feed-the-tank: A: 4 days, B: 6 days, C: 12 days → together?
3. A can do a job in 18 days. A works 6 days alone; then A+B finish in 6 more days. B alone?
4. Two workers bill 96 man-days for a client-reset. Contract demands 4 days ⇒ how many bodies? At ₹2,500/man-day, the labor line?
5. 12 men finish in 8 days working 6 h/day. If the client compresses to 4 days with 9-h days, how many men?
6. Smell-test drill: "A: 6 days, B: 8 days, together: 14 days." Refute in one line without computing the truth; then compute the truth in one tank line.
7. Solo-to-crew ratio: a job needs 40 man-days. Team of 5 starts; after 3 days, 2 men leave. Total days to finish?

### ✅ Selected answers
1. Tank 60: 4 + 3 = 7 ⇒ **60/7 = 8.57 days** (check xy/(x+y) = 300/35 ✓).
2. Tank 12: 3+2+1 = 6 ⇒ **2 days**.
3. Tank = 18 units: A banks 6 units in 6 days, leaving 12. Joint flow covers 12 units in 6 days ⇒ joint flow 2 u/d; A flows 1 ⇒ **B flows 1 u/d ⇒ B alone = 18 days**. (Fraction form agrees: A banked 1/3 of the work, so the pair did 2/3 in 6 days ⇒ 1/9 per day joint, 1/18 each after A's 1/18… same answer, no dust when the tank does the talking.)
4. 96/4 = **24 bodies**; 96 × 2,500 = **₹2,40,000**.
5. Work = 12×8×6 = 576 man-hours ⇒ 576/(4×9) = **16 men** — compression with overtime still needs bodies; man-hours don't care how you slice them.
6. Two workers can't take longer than either alone (14 > 8 is absurd on its face). Truth: tank 24: 4+3 = 7 ⇒ **24/7 = 3.43 days**.
7. 5 men × 3 days = 15 man-days banked; remaining 25 man-days with 3 men ⇒ 8.33 days ⇒ **total 11.33 days** — the leave-leg reprices the crew, not the work.

## ❓ Quiz
1. A does a job in 12 days, B in 18. Together (LCM tank of 36 units):
   - (a) 15 days
   - (b) 7.2 days — flows 3 + 2 = 5 u/d against the 36-unit tank; rates add, days divide, and 12 + 18 = 30 stays the chapter's founding felony
   - (c) 6 days
2. A shelf-reset needs 150 man-days. With 25 men it takes:
   - (a) 12 days
   - (b) 6 days — M₁D₁ = M₂D₂: the job's man-day bill is fixed, headcount only moves the calendar (at ₹2,500/man-day the job costs ₹3.75L however you staff it)
   - (c) 5 days
3. A (12 d) works 4 days alone, then B (18 d) joins to finish. Total time:
   - (a) 8 days
   - (b) 8.8 days — tank 36: A banks 12, joint flow 5 u/d clears the remaining 24 in 4.8; 4 + 4.8; current tank state is always one multiplication away
   - (c) 9.6 days

### ✅ Answers
1. **(b)** — smell-test: must beat 12 (A solo) and lose to 6 (halving A). 7.2 sits exactly between, as physics demands.
2. **(b)** — man-days is the invariant; (a) and (c) priced the calendar, not the work.
3. **(b)** — phase-wise tank bookkeeping: bank-then-flow. (c) sent B in at day 4 with a fresh tank — the work A already banked is never re-done.

## ✅ Mastery checklist
- [ ] "n days" instantly reads as 1/n per day; adding happens in rates ONLY
- [ ] LCM tank set before any computation; flow arithmetic in whole numbers
- [ ] Phase problems: bank first, then joint flow, then total the phases
- [ ] M₁D₁ = M₂D₂ and man-hour bridging (hours/day changes reprice manpower)
- [ ] Smell-tests: crew < fastest solo · double bodies = half days · lazy help still helps
- [ ] ADD-THE-DAYS spotted and mocked within 2 seconds of exposure

**Next:** **TW2 · Efficiency & Wages** — "A is twice as good" quantified, wage splits by work-done (₹750 → ₹450:₹300), and why the hard worker invoicing by days is leaving money on his own table. Efficiency gets a price tag! 💰
