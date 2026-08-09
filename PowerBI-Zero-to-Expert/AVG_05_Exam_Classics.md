# 🏏 AV5 · The Exam Classics: Ages, Cricket, Speed, Corrections & DI

> Every average question in any aptitude paper belongs to one of six families. You've already conquered foundations, series, group-change and weighted logic. This module conquers the last two classic families — age problems and cricket — plus the speed-average twins, the misread-correction pattern, and a Data-Interpretation starter. Do these once with understanding and the same 30 exam marks stop being scary forever.

---

## 🎯 Objectives

- Solve **age-averages**: the "n years pass" no-calc pattern and the "at birth" family pattern.
- Master **cricket averages**: target runs, new innings effect, and the **not-out twist** that traps everyone.
- Apply **average speed rules**: harmonic mean for equal distances, weighted time problem otherwise.
- Handle **misread/correction problems** via the totals engine.
- Extract averages from a **mini DI table** (exam Section-2 style).

---

## 📘 Concepts

### 5.1 Age problems (two patterns cover 95%)

**Pattern 1 — "n years later/ago" (zero calculation):**
> The average age of a family of 5 is 25. What will it be after 3 years?

Every member gets 3 years older → average rises by exactly 3 → **28**. That's it. Golden property wearing birthday clothes. Same move for "2 years ago" → 22. No totals needed — but if newborns/deaths enter the story, revert to the engine.

**Pattern 2 — "average at the time of birth":**
> A family of 5 has average age 20 today. The youngest is 8. What was the family average when the youngest was born?

Engine:
```
Total age today       = 5 × 20 = 100
Eight years ago, the 4 other members' total = 100 − 5×8 = 60
(youngest didn't exist → divide by 4, not 5!)
Average at birth = 60 ÷ 4 = 15  ✔️
```
Trap spotlight: dividing by 5 at the end (the child gets aged −?!) — the **who-existed-then clause** is the whole question.

### 5.2 🏏 Cricket averages (India's favorite exam love story)

**Batting basics:** batting average = total runs ÷ innings **in which the batsman got out** (not total innings!). 

**The not-out twist (trap of the century):**
> Scores in 10 innings total 300 runs, with 2 not-out innings. Batting = 300 ÷ (10 − 2) = **37.5** — NOT 30. Examiners put "30" as the first option to catch robotic readers.

**New innings impact (deviation shift from AV4):**
```
Avg 50 after 40 innings; scores 120 next.
Rise = (120 − 50)/41 ≈ 1.71 → new avg ≈ 51.71 ✔️
```

**Target runs (most tested):**
> A batsman has average 30 after 10 innings (300 runs). He wants average 32 after 12 innings. What total must he score in the next 2 innings?
```
Target total = 12 × 32 = 384
Needed = 384 − 300 = 84 runs (across the 2 innings, e.g., 42 + 42, or 60 + 24)
```
**Bowler version:** bowler's economy 20 runs/match over 14 matches (280 conceded). For the career figure to drop to 19 after 15 matches: next match can concede at most 15×19 − 280 = 285 − 280 = **5 runs** ✔️.

### 5.3 Average speed (two rules, and the forbidden move)

**Rule 1 — equal distances → harmonic mean:**
> Delhi → Jaipur at 60 km/h, return at 40 km/h.
```
avg speed = 2ab/(a+b) = 2×60×40/100 = 48 km/h  ✔️   (NOT 50!)
```
Why not 50? You spend MORE time at the slower speed — time, not distance, is the weight. Proof: distance D each way → time = D/60 + D/40 → avg = 2D/(D/60+D/40) = 48.

**Rule 2 — unequal distances/times → total distance ÷ total time:**
> 2 hours at 40 km/h, 3 hours at 60 km/h → (80 + 180)/5 = 52 km/h. Time-weighted average ✔️.

🚫 Forbidden move: simple average of speeds in ANY realistic case (only legal for equal time splits — almost never the question).

### 5.4 Misread correction problems (engine FTW)

> An exam admin calculated the average of 25 students as 50. Later, one score written as 84 was actually 48. Find the correct average.
```
Wrong total = 25 × 50 = 1250
Correct total = 1250 − 84 + 48 = 1214
Correct average = 1214/25 = 48.56  ✔️
```
**Quick check via deviation:** the error was −36 over 25 students = −1.44 per head → 50 − 1.44 = 48.56 ✓. Both routes in 15 seconds once the engine's yours.

### 5.5 Mini DI set (Section-2 style table)

ShopKart's 4 stores — daily sales (₹ '000) for a week:

| Store | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Karol Bagh | 52 | 48 | 56 | 62 | 52 |
| Noida | 60 | 55 | 58 | 66 | 61 |
| Gurugram | 40 | 44 | 39 | 50 | 47 |
| Rohini | 33 | 36 | 35 | 40 | 36 |

DI-typical asks: per-store weekly averages (KB 54, Noida 60, Gurugram 44, Rohini 36) · citywide daily average Friday: (52+61+47+36)/4 = 49 · store with highest single-day deviation from its own mean (KB Thu +8 above 54) · store ranking stability (Noida always #1). Two-table cross-questions live in the DI course later — here you only need clean fast reads.

---

## 🧪 LAB — The Classic Gauntlet (timed, 20 min — aim ≤ 2 min/question)

1. Average age of 4 brothers is 14 today. What was it 5 years ago? (no-calc)
2. Family of 6 averages 22 today; youngest is 6. Average at birth? (divide by whom?!)
3. Batsman: avg 45 after 20 innings (incl. 3 not-outs — CAREFUL with totals), scores 60 & 30 (both out). New average?
4. A rider wants an 8-match economy of ≤18 after conceding at 20/match for 7 matches (140 runs). Max conceded in match 8?
5. Gurugram sales round trip: truck out at 48 km/h, back at 32 km/h (same route). Average speed?
6. Misread: 30 students, computed avg 72; one mark entered as 90 was actually 60. Correct average?

---

## 💪 Exercises

1. Average age of a 4-member family is 20. In 4 years? Without calculation — but explain in one line WHY.
2. Batsman totals 630 runs in 18 innings with 4 not-outs. Batting average?
3. To raise your exam mock average from 60 (5 mocks) to 64 overall (6 mocks), how much in mock 6?
4. ShopKart truck: 1 hour at 40, 1 hour at 50, then 2 hours at 70 (deliveries across NCR). Average speed for the trip?
5. In the DI table, which store has the LOWEST weekly average, and what is the citywide Thursday average?

### ✅ Selected answers

**LAB:** 1) 14 − 5 = **9** 2) total today 132; at birth (6 yrs ago, 5 members) total = 132 − 6×6 = 96 → 96/5 = **19.2** 3) total = 45×20 = 900, innings out = 20−3 = 17, avg 45 means "per dismissal" → careful setup: total runs 900. New runs 900 + 60 + 30 = 990 over 19 dismissals (3 NO + both new out) → 990/19 ≈ **52.1** 4) target total ≤ 8×18 = 144 → ≤ **4 runs** 5) 2×48×32/80 = **38.4 km/h** 6) error −30 over 30 students = −1 → **71**.
**Exercises:** 1) **24** — every member ages equally, golden property. 2) 630/14 = **45** 3) 6×64 − 5×60 = 384 − 300 = **84** 4) (40 + 50 + 140)/4 = 230/4 = **57.5 km/h** 5) Rohini (36); Thursday: (62+66+50+40)/4 = **54.5**.

---

## ❓ Quiz

1. "Youngest was born when" problems require dividing by…
2. A batsman has 2 not-outs in 10 innings — the infamous exam trap makes you divide by…
3. Delhi-Jaipur at 60 & back at 40: why is 50 km/h the WRONG answer?

### ✅ Answers

1. **The number of members who existed then** — the newborn isn't in the cohort. Total age shifted back by n × (birth age today), then divide by (total members − newborns).
2. **10 instead of 8**: batting average uses dismissals (innings − not-outs): 300/8 = 37.5. Examiners bank on robotic readers; you read like an analyst.
3. **Time is the weight, not distance**: the return leg at 40 takes 50% longer, dragging the mean below the simple average — harmonic rule gives 48. Simple averaging of speeds is legal only for equal TIME splits, which questions almost never give.

---

## ✅ Mastery checklist — AV5

- [ ] Age patterns 1 & 2 solved without hesitation (incl. who-existed logic)
- [ ] Cricket: target-runs, next-innings shift, **not-out dismissal divisor**
- [ ] Average speed: harmonic vs total-distance rule chosen correctly every time
- [ ] Misread correction with totals engine + deviation double-check
- [ ] DI mini-table read confidently (store means, city means, deviations)

---

**Next:** ⚡ **AV6 · Traps, Speed & The Mock Arena** — the 5 deadliest traps catalogued, elimination tactics that solve MCQs without full math, verification rituals, and your first timed 10-question mock with answer key. Game day. 🎮
