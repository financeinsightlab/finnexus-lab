# 🎯 AV4 · Weighted Averages & Speed Shortcuts: The Assumed-Mean Superpower

> Two students get the same question: "Average of 982, 995, 966, 1010, 997?" Student A adds and divides — 90 seconds. Student B assumes 990, taps deviations (−8, +5, −24, +20, +7 = 0), answers 990 — 10 seconds *in his head*. This module installs Student B: weighted averages (why simple averages lie), the assumed-mean method, deviation stacking, and the two-group line shortcut. Speed is teachable; today we teach it.

---

## 🎯 Objectives

- Explain **weighted average**: why simple averaging lies when groups differ.
- Use the **assumed-mean method** for near-round data — full mental math.
- Stack **deviations** for cricket-style running averages.
- Apply the **two-group line shortcut** (segments divide in *inverse* ratio).
- Combine all four into 30-second solutions of previously-2-minute problems.

---

## 📘 Concepts

### 4.1 Weighted average: when "simple" averages lie

ShopKart employs 5 officers at avg salary ₹80,000 and 15 clerks at avg ₹30,000. The CFO tweets "average ShopKart salary is ₹55,000!" — (80+30)/2. **Lie?** Yes, because the groups have different counts. Correct weighted average:

```
weighted avg = (w₁·a₁ + w₂·a₂) ÷ (w₁ + w₂)
             = (5×80,000 + 15×30,000) ÷ 20
             = (4,00,000 + 4,50,000) ÷ 20 = ₹42,500  ✔️  (NOT 55,000)
```

Weights = how many members each group carries: people, credits, marks, hours, quantities, rupees. **Wherever group sizes differ, average with weights or don't average.** (Module 7 uses this to expose "average salary" marketing 😄.)

Also classic in colleges — credit-weighted SGPA:
```
Maths(4 credits, 80) + English(2 credits, 70) + Science(4 credits, 90)
= (4×80 + 2×70 + 4×90)/10 = (320+140+360)/10 = 82  ✔️
```

### 4.2 ⚡ The assumed-mean method (AAA: Assume · Adjust · Answer)

For data clustered near a round number (900-level expenses, 70-level marks, 40-level ages):

1. **Assume** a convenient average A (round number near the data).
2. **Adjust**: write each deviation (value − A), add the deviations: D.
3. **Answer**: avg = A + D ÷ n.

The opener problem:
```
Data:     982   995   966   1010   997    (A = 990)
Dev:      −8    +5    −24   +20    +7     → D = 0
Average = 990 + 0/5 = 990  ✔️ (10 seconds, no column addition)
```
**Why so fast?** Small signed numbers beat big column arithmetic; cancellation does your math. This is AV1's balance secret, weaponized. Deviation D=0 also PROVES your number in the same move (self-checking method).

### 4.3 Deviation stacking (running averages without pain)

A ShopKart delivery rider's deliveries over 5 days: 62, 88, 45, 100, 75. Average?
```
A = 70 → dev: −8, +18, −25, +30, +5 → D = +20 → avg = 70 + 20/5 = 74  ✔️
```
Now extend — the skill exams test as "cricket average questions": each new value changes the average by **(value − oldAvg) ÷ newN**:

```
Batsman's avg after 40 innings = 50. Next innings: 120.
Rise = (120 − 50) ÷ 41 = 70/41 ≈ 1.71 → new average ≈ 51.71  ✔️
(Verification: total 2000 → 2120 → 2120/41 ≈ 51.7 ✓)
```
No total-multiplication needed — just the gap and the new count. Bowlers, batters, monthly expenses (Module 7) — same stacking.

### 4.4 The two-group line shortcut (segments divide in inverse ratio)

Merging A (20 members, avg 40) and B (10 members, avg 70) — where does the combined average sit on the number line?

```
Rule: distances from combined average split INVERSELY to group sizes.
A : B = 20 : 10 = 2 : 1   →   combined avg divides the gap in ratio 1 : 2
Gap = 70 − 40 = 30 → closer-to-B segment (A's pull) = 10 → avg = 40 + 10 = 50  ✔️
(Check: (20×40 + 10×70)/30 = 1500/30 = 50 ✓)
```
Memory sentence: **"the big group pulls the average toward itself, proportionally."** In exams with options, this halves the work: immediately reject anything outside the between-band or on the wrong side — sometimes the only legal answer is visible before any arithmetic.

Three-group and beyond? Do pairwise merges in sequence, or straight weighted formula. Line method shines exactly for 2 groups — most exam questions.

### 4.5 Speed-stack playbook (which tool when — the 5-second diagnosis)

| If the question shows… | Grab |
|---|---|
| Data clustered near round number | assumed-mean (4.2) |
| New value joins/leaves an existing average | deviation shift (4.3) |
| Two groups merge | line shortcut (4.4) → weighted check |
| Unequal sizes in business language ("officers vs clerks") | weighted average, never simple-mean |
| Consecutive/series | AV2's center tricks (fastest of all) |

---

## 🧪 LAB — speed bootcamp (15 min, timer ON, pen & brain only)

**Set A — assumed mean, mental only:** weekly expense readings (₹) of the canteen: 4,950 / 5,020 / 4,880 / 5,150 / 4,990 / 5,010. Average? (A = 5,000.)

**Set B — deviation shift:** ShopKart app's daily active users avg 4,200 over 30 days. On day 31 a festival pushes DAU to 6,000. New monthly average?

**Set C — line shortcut:** Section A: 40 students avg 55; Section B: 20 students avg 70. Combined? Do the ratio split line, then verify weighted.

**Set D — the office lie:** A startup has 30 freshers avg ₹4 LPA and 5 leads avg ₹20 LPA. A tweet says "avg salary ₹12 LPA". Compute the true weighted average and comment briefly (as if to a younger sibling — why was the tweet misleading?).

---

## 💪 Exercises

1. Mental, assumed-mean: average of 196, 205, 188, 211, 200, 199, 192, 208.
2. Batsman's average after 25 innings is 52. He scores 130 next innings. New average (deviation shift)?
3. Group P: 15 members avg 36; group Q: 5 members avg 56. Combined via line method.
4. A college gives final grade weights: attendance 10% (scored 90), internals 30% (scored 70), final exam 60% (scored 60). Final weighted score?

### ✅ Selected answers

**LAB answers:**
- Set A: devs −50, +20, −120, +150, −10, +10 → D = 0 → avg = **₹5,000**. (Cancellation party 🎉)
- Set B: (6000 − 4200)/31 ≈ +58.06 → new avg ≈ **₹4,258/day (DAU)** (exact: 131,800/31 ≈ 4258.06).
- Set C: sizes 40:20 = 2:1 → inverse splits gap 15 into 5:10 → avg = 55 + 5 = **60** ✓ ((2200+1400)/60 = 60).
- Set D: true avg = (30×4 + 5×20)/35 = (120+100)/35 ≈ **6.29 LPA**; the tweet's (4+20)/2 = 12 assumed equal groups — tiny lead group dragged the false mean up, hiding reality from applicants.

**Exercises:** 1) A = 200: devs −4,+5,−12,+11,0,−1,−8,+8 → D = −1 → avg = 200 − 0.125 = **199.875** 2) (130−52)/26 = 3 → **55** 3) sizes 3:1 → split 20 in 1:3 → avg = 36 + 5 = **41** 4) 0.1×90 + 0.3×70 + 0.6×60 = 9+21+36 = **66**.

---

## ❓ Quiz

1. The assumed-mean method is fast because…
2. A batsman's average rises by exactly (score − old avg) ÷ newN because…
3. In the two-group line shortcut, the combined average divides the gap…

### ✅ Answers

1. **Small signed deviations beat big column addition** — cancellation does the arithmetic, and D=0 self-verifies the answer in the same step.
2. **Every other member's value is unchanged**, so the whole group's total changes only by the newcomer's gap above the old average, spread over the new count. No re-summing needed — the ledger's previous page already balanced.
3. **Inversely to group sizes** — the big group pulls the pivot toward itself, proportionally: 2:1 sizes → 1:2 segments. (And it must sit inside the between-band — any option outside is eliminated for free.)

---

## ✅ Mastery checklist — AV4

- [ ] Weighted average used automatically when group sizes differ
- [ ] Assumed-mean in my head on 6-term sets, D=0 confirming the answer
- [ ] Deviation shift formula fluent (gap ÷ newN)
- [ ] Line shortcut + inverse-ratio logic explained to a friend
- [ ] Speed diagnosis: I pick the right shortcut in ≤5 s

---

**Next:** 🏏 **AV5 · The Exam Classics** — ages (family + birth-time), cricket with the not-out twist, average speed (harmonic rule), misread corrections, and a mini DI set. The patterns that never stop appearing, finally fully owned.
