# ⚖️ AV1 · Average Foundations: The Balance Beam

> Welcome to the 🧮 **Aptitude umbrella** — the math that decides placement offers (TCS NQT, Infosys, Wipro, SSC, bank exams all start here). And we start with Averages because it is the foundation stone: percentages, ratios, mixtures, even speed problems borrow its logic. Master this course and 15+ questions of every exam feel familiar. Module 1: what "average" really means — not a formula, a **balance beam**.

---

## 🎯 Objectives

- Define average as **equal share** and **balance point**, not just "add and divide".
- Own the **formula trio**: avg = sum ÷ n · sum = avg × n · n = sum ÷ avg.
- Use the **deviation secret**: the + and − around the average always cancel to ZERO.
- Apply the **two golden properties**: add-k / multiply-k to every value.
- Solve first real problems: missing value, changed scenarios, ShopKart daily sales.

---

## 📘 Concepts

### 1.1 What an average REALLY is (the equal-share story)

ShopKart's 5 Delhi stores sold this week (₹ thousands): **12, 18, 15, 21, 9**.

You want ONE number that represents all five fairly. Imagine pooling all the money and splitting equally:

```
Total = 12 + 18 + 15 + 21 + 9 = 75
Equal share = 75 ÷ 5 = 15 → Average = ₹15,000 per store
```

That equal share is the average: *the number each store would have sold if all stores sold identically and the total stayed the same.* Every formula you'll ever use is compressed inside that sentence.

### 1.2 The formula trio (memorize as one family)

| You want | Formula | Example |
|---|---|---|
| Average from data | **avg = sum ÷ n** | 75 ÷ 5 = 15 |
| Total from average | **sum = avg × n** | avg 15 × 5 stores = 75 |
| Count from total | **n = sum ÷ avg** | 75 ÷ 15 = 5 |

**The missing-value game (exam favorite #1):** The average of 6 numbers is 18. Five of them total 90. Find the sixth.
```
Total (all 6)   = 18 × 6 = 108
Sixth number    = 108 − 90 = 18  ✔️
```
Rule of thumb: **never think in averages alone — always convert to totals.** Totals add up; averages don't.

### 1.3 🏆 The balance-point secret (deviations cancel to zero)

This one idea powers every shortcut in Modules 2–7. Look above the average 15 as the beam's pivot:

```
Store:      12     18     15     21      9
Deviation: −3000  +3000    0   +6000  −6000      (each value − 15000)
Sum of deviations:  −3000 + 3000 + 0 + 6000 − 6000 = 0   ← ALWAYS ZERO
```

The average is the **only** point where the "below" gaps and "above" gains cancel exactly. Therefore:
- If you know all but one deviation, the missing one is whatever brings the sum to 0.
- If deviations don't sum to zero, your computed average is WRONG — a free answer-checker in every question.

**Instant use:** 4 numbers average to 20; deviations of three are −3, +7, +1. Fourth deviation = −(−3+7+1) = **−5** → fourth number = 20 − 5 = 15.

### 1.4 The two golden properties

| Operation on EVERY value | Effect on the average |
|---|---|
| Add the same number k (every store sells ₹2k more) | Average rises **exactly by k** |
| Subtract k from each | Average falls by k |
| Multiply each by k (all sales double) | Average multiplies by k |
| Divide each by k | Average divides by k |

**Why the exam loves it:** "The average of 20 numbers is x. If every number is increased by 10, the new average is…?" → **x + 10**, zero calculation. But if only *some* numbers change → golden property does NOT apply → return to totals (Module 3's engine).

⚠️ **Trap to note forever:** these properties work only when the change applies to **every** value AND the count n stays the same. Change the group size and we need Module 3.

### 1.5 Reading average questions correctly (exam language)

- "Average of the first five natural numbers" → 1,2,3,4,5 → avg 3 (Module 2 gives instant tricks).
- "The average weight of the team is 70 kg" → total weight = 70 × n. Nothing else is known about individuals!
- "The average was found to be 52" → the computed (possibly wrong) answer; corrections problems live here (Module 5).
- "**Average daily sale**" in business = total ÷ number of days — same math, job-interview clothing 😉 (Module 7).

---

## 🧪 LAB — ShopKart weekly pulse (15 min, notebook + calculator for checking only)

Week sales for the Karol Bagh store (₹ thousands): Mon 52, Tue 48, Wed 56, Thu 62, Fri is missing. The store manager claims the 5-day average was 54.

1. Convert to total: what total does the manager's claim imply? (sum = avg × n)
2. Find Friday's sales from the total.
3. Compute all five **deviations** from 54 and confirm they sum to zero.
4. The manager adds ₹2k to *every* day (festival bonus days). New average? (golden property — no re-adding!)
5. If instead the *weekend* were added (6th value ₹40k), can you still use the golden property? Answer in one line, Method to use named (Module preview).

---

## 💪 Exercises

1. The average of 7 numbers is 26. Six of them sum to 160. Find the seventh.
2. The average monthly expense of a ShopKart dark store is ₹4.8 lakh over 12 months. What's the annual expense?
3. The average of 4 numbers is 30. Their deviations include +6, −2, +1 for three of them. Find the fourth number.
4. Each value in a data set is doubled and then increased by 5. If the original average was 40, find the new average.

### ✅ Selected answers

**LAB:** 1) Claimed total = 54 × 5 = 270 2) Friday = 270 − (52+48+56+62) = 270 − 218 = **₹52k** 3) Deviations: −2, −6, +2, +8, −2 → sum 0 ✓ 4) New average = 54 + 2 = **56** (golden property!) 5) No — n changes from 5 to 6, so golden properties don't apply; use the totals engine of Module 3 (new avg = 310/6 ≈ 51.67).
**Exercises:** 1) 26×7 = 182; seventh = 182 − 160 = **22** 2) 4.8 × 12 = **₹57.6 lakh** 3) Known dev sum = +5; fourth dev = −5 → fourth = 30 − 5 = **25** 4) Double each ⇒ avg 80; +5 each ⇒ **85**. (Order of golden properties works both ways here.)

---

## ❓ Quiz

1. "Never think in averages alone — always convert to totals" because…
2. The sum of deviations around the average is always…
3. Every of the 20 numbers is increased by 10; the average increases by…

### ✅ Answers

1. **Averages don't add up — totals do.** Combining, splitting and finding missing values all work in totals; average = total ÷ n only as the final step.
2. **ZERO.** The balance-point test: below-gaps exactly cancel above-gains. Any nonzero remainder signals a calculation error — free verification forever.
3. **Exactly 10** (golden property) — provided EVERY value changed and n stayed fixed. If only some values change, golden properties break and you return to totals.

---

## ✅ Mastery checklist — AV1

- [ ] I can explain average as equal share AND balance point
- [ ] Formula trio flows without notes (avg/sum/n)
- [ ] I solve missing-value questions via totals, not guessing
- [ ] Deviation sum-zero test runs in my head as an answer checker
- [ ] Golden properties applied (and their limits stated!)

---

**Next:** 🔢 **AV2 · Series Averages** — consecutive numbers, first-n naturals, evens-odds-multiples: the patterns where the average is the MIDDLE and the answer needs no adding at all.
