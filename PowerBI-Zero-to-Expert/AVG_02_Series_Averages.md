# 🔢 AV2 · Series Averages: The Middle-Token Trick

> Exam setters adore number series — "average of the first 40 natural numbers", "sum of 15 consecutive even numbers" — because roboteers add for 3 minutes while masters answer in 5 seconds. The secret: in evenly-spaced series, **the average sits exactly in the middle**. THIS module makes that trick automatic, with proof, and hands you every series table the exams actually use.

---

## 🎯 Objectives

- Prove why the average of evenly-spaced numbers = **middle value** (pairing method).
- Answer all classic series instantly: 1..n, evens, odds, multiples, consecutive with gaps.
- Use sum-formulas backwards: **sum = n × average**, average = (first + last) ÷ 2.
- Crack "sum given, find the numbers" mysteries for small consecutive sets.
- Avoid the two exceptions where the middle-trick fails.

---

## 📘 Concepts

### 2.1 The middle-token trick (with proof that takes 10 seconds)

The average of **any evenly-spaced series** = the **average of the first and last term** = its middle value. Why? Pair them up:

```
Series: 12, 13, 14, 15, 16        (gap = 1, all equal)
Pairs:  12 + 16 = 28
        13 + 15 = 28
        14      = 28 ÷ 2
Every pair = 28 → every "fair share" = 14 → average = 14 = MIDDLE TERM ✔️
```

- **Odd count:** middle = the exact center term (14 above).
- **Even count:** middle = mean of the center two: for 10, 11, 12, 13, 14, 15 → center two = 12 & 13 → avg = 12.5.
- Works for **any constant gap** (1, 2, 5, 0.5, 17…) — pairing is gap-blind!

**Golden formula for ALL evenly-spaced series:**
```
average = (first term + last term) ÷ 2
```

### 2.2 The classic series table (exams quote these constantly)

| Series | Average formula | Example |
|---|---|---|
| First n natural numbers (1+2+…+n) | **(n + 1) ÷ 2** | First 40 → 20.5 |
| First n even numbers (2,4,…,2n) | **n + 1** | First 10 evens → 11 |
| First n odd numbers (1,3,…,2n−1) | **n** | First 10 odds → 10 |
| First n multiples of k | **k × (n+1) ÷ 2** | Multiples of 5 up to 50 (n=10) → 5×11÷2 = 27.5 |
| First n whole numbers (0..n−1) | **(n − 1) ÷ 2** | First 40 whole → 19.5 |

**Proof by middle:** first 10 evens = 2,4,…,20 → ends 2+20=22 → avg 11 = n+1 ✓. First 10 odds = 1,3,…,19 → ends 1+19=20 → avg 10 = n ✓. The pairing does every proof for you — never cram, just re-derive.

### 2.3 Sums backwards (the exam's favorite twist)

Sum formulas (use rarely, knowing them exists matters):

```
Sum of first n naturals = n(n+1) ÷ 2        (e.g., 1..40 → 40×41÷2 = 820)
Sum of first n odds     = n²                 (1+3+..+19 → 10² = 100)
```

But the sharper tool in **any** evenly-spaced series:
```
sum = n × average = n × (first + last) ÷ 2
```
Example: "Find the sum of consecutive numbers 21, 22, …, 40."
```
n = 40 − 21 + 1 = 20 terms  (count carefully: n = last − first + 1)
sum = 20 × (21 + 40) ÷ 2 = 20 × 30.5 = 610 ✔️
```
⚠️ The `n = last − first + 1` count trap is where 60% of candidates lose the mark. Say it aloud every time.

### 2.4 "Sum given — find the numbers" mysteries

Exams reverse the game: "The sum of 3 consecutive numbers is 72. Find the largest."
```
Middle (= average) = 72 ÷ 3 = 24 → numbers are 23, 24, 25 → largest = 25 ✔️
```
Odd counts are free. Even counts half-shade: "Sum of 4 consecutive numbers = 58." → avg = 14.5 = mean of the middle two → middles 14 & 15 → numbers 13,14,15,16 ✔️ (sum check 58 ✓).

Consecutive EVENS mystery: "Sum of 5 consecutive even numbers = 160" → mid = 32 → numbers 28,30,32,34,36 ✔️. Works for ANY fixed-step mystery (spaced by 5: "sum of 3 multiples-of-5 consecutive multiples = 90" → mid 30 → 25, 30, 35).

### 2.5 Where the middle trick FAILS (two exceptions, memorize)

1. **Not evenly spaced → no pairing → no center.** Squares (1, 4, 9, 16…), cubes, primes: average of squares of 1,2,3,4 = (1+4+9+16)/4 = 7.5 — the middle of (2.5) is meaningless. Compute directly. Exams bait you: "average of squares of first 4 natural numbers?" — don't dare use (4+1)÷2!
2. **Values repeat or series breaks** — pairing dies quietly. "Data: 2, 2, 5, 2, 5" is not a series; plain totals only: avg = 16/5 = 3.2.

---

## 🧪 LAB — ShopKart day counts (10 min, pen only)

The dark-store tracker logged orders for 9 consecutive days as a growing streak: each day had exactly 10 more orders than the previous. Day 1 = 120 orders; Day 9 = ?

1. Series terms? (evenly spaced, gap 10)
2. Average daily orders across the 9 days (middle-trick only, no adding!)
3. Total weekly … (9-day) total orders via sum = n × avg.
4. The franchise promised 7 MORE days at the same +10 pace, then asks: "Average over all 16 days?" — middle of 16 terms (even count — how do you handle?).
5. Sanity-check Q2 by deviation thinking: where must the average sit relative to Days 8 & 9?

---

## 💪 Exercises

1. Average of the first 60 natural numbers.
2. Average of the first 25 odd numbers; and what's their SUM (bonus, one step).
3. Find the sum: 31 + 32 + 33 + … + 70 (careful with COUNT).
4. Sum of 5 consecutive even numbers is 260. Find the smallest.

### ✅ Selected answers

**LAB:** 1) 120, 130, …, 200 (Day 9 = 120 + 8×10 = 200) 2) avg = (120+200)/2 = **160** 3) total = 9 × 160 = **1,440** 4) For 16 terms: middle = mean of terms #8 &#9 = (190 + 200)/2 = **195** 5) avg must sit BETWEEN Days 8 & 9 (their mean) — confirms 195 ✓.
**Exercises:** 1) (60+1)÷2 = **30.5** 2) avg = **25**; sum = n² = **625** 3) n = 70−31+1 = **40**, sum = 40 × (31+70)/2 = 40 × 50.5 = **2,020** 4) mid = 260/5 = 52; evens 48, 50, 52, 54, 56 → smallest = **48**.

---

## ❓ Quiz

1. "average = (first + last) ÷ 2" works for any…
2. Two students, series 21..40: one uses n = 20, the other n = 19 — who's right and what's the trap?
3. "Average of squares of the first 4 natural numbers?" — the middle trick must NOT be used because…

### ✅ Answers

1. **Evenly-spaced series** — any constant gap (1, 2, 5, 17!). Pairing means every first+last pair is equal, so the center value is the fair share.
2. **n = 20 is right**: n = last − first + 1 = 40 − 21 + 1 = 20. Forgetting the "+1" on inclusive counts is the classic count trap — shout the formula every time.
3. **Squares are NOT evenly spaced** (gaps 3, 5, 7 grow), so no pairing, no center: compute (1+4+9+16)/4 = 7.5 directly. Pattern-exceptions kill rote learners.

---

## ✅ Mastery checklist — AV2

- [ ] Middle-token trick proven to myself (pairing) — not memorized
- [ ] Classic series table reproducible from scratch in 2 minutes
- [ ] n = last − first + 1 chanted automatically
- [ ] solved "sum given → find numbers" for odd AND even counts
- [ ] I can name the 2 middle-trick exceptions without notes

---

**Next:** 🔄 **AV3 · The Group-Change Engine** — members joining, leaving, replaced; classes merged. The totals-before-and-after machine that eats 30% of all exam average questions.
