# 🧬 NS3 · Twins, Primes & Addition Families

> Some series refuse NS1/NS2 gates because they are TWO series braided together — or skip to number-names (primes!) or grow by remembering their own past (Fibonacci!). Today's families feel exotic until you learn the single key they share: **stop looking at adjacent terms; check position-pairs and positions themselves.** Odd-position terms march to one rule, even-position terms to another. Primes answer to their names. Fibonacci terms answer to their parents. Module 3 completes your family album.

---

## 🎯 Objectives

- Split **twin (interleaved) series** into odd/even position sub-series and solve each alone.
- Catch **alternating operations** (×2,+2,×2,+2…) as a special twin case.
- Run the **prime wardrobe**: primes, primes±k, prime-indexed terms.
- Solve **addition families**: Fibonacci, sum-of-two-prev, three-term sums, growing sidekicks.
- Re-order the master radar to 7 gates and keep it under 15 seconds.

---

## 📘 Concepts

### 3.1 Twin series (the braid)

**1, 2, 4, 4, 7, 8, 10, 16, ?** — adjacent diffs 1,2,0,3,1,2,6: noise! But split by position:

```
ODD positions  (1st,3rd,5th…): 1, 4, 7, 10 → AP +3 → next odd: 13
EVEN positions (2nd,4th,6th…): 2, 4, 8, 16 → ×2  → next even: 32
```

Overall next term (position 9, odd) = **13**. Detection tell: the series alternates smooth-bumpy-smooth-bumpy — rule-of-thumb: if consecutive differences dance without grace, **split odd/even and re-run the machine on each.** Position numbers SKETCHED above the terms (1..10) make twins jump out visually.

### 3.2 Alternating ops (twin-sibling)

**3, 6, 8, 16, 18, 36, 38, ?** — ops from term to term: ×2, +2, ×2, +2, ×2, +2 → next op = ×2 → **76** ✔. Same family, but the alternation lives in the OPERATOR, not the values. The tell: gain pattern big-small-big-small. Write the op-ladder above the series (like a musical score) and the alternation plays itself.

**Two-sidekicks style:** 4, 7, 9, 13, 16, 22, 25, ? → diffs +3,+2,+4,+3,+6,+3 (+3 on even steps… +2,+4,+6 growing on odd steps) → next diff +4 → **29** ✔ — twins wearing difference-costume; same split-or-sequence-of-ops choice.

### 3.3 The prime wardrobe (names, not arithmetic!)

```
Primes to 60: 2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59
```

- **Pure primes:** 2,3,5,7,11,13,? → **17** (next prime).
- **Primes+k:** 4,6,8,10,14,16,? → primes+2: 2+2,3+2,5+2,7+2,11+2,13+2 → next **19** ✔(17+2).
- **Alternate primes (skip-one):** 2,5,11,17,23,? → every 2nd prime → **31**.
- **Prime POSITIONS saw:** 1st, 2nd, 3rd prime… \"the 6th prime\" = 13 — indexing questions pay for the table being memorized, cold.
Tell: differences that look random yet bounded (1,2,2,4,2,4 — primes' irregular heartbeat!) and terms that resist all classic families.

### 3.4 Addition families (memory-series)

- **Fibonacci:** 1, 1, 2, 3, 5, 8, ? → tₙ = tₙ₋₁ + tₙ₋₂ → **13** ✔.
- **Any two-sum seed:** 2, 3, 5, 9, 17 — verify first: 2+3=5 ✔, but 3+5=8 ≠ 9 → NOT a pure two-sum series; diffs 1,2,4,8 (×2 diff-row) → next +16 → **33** (a hybrid — checking beats assuming at every gate).
- **Three-term sum (tribonacci):** 1, 2, 3, 6, 11, 20, ? → 1+2+3=6 ✔, 2+3+6=11 ✔, 3+6+11=20 ✔ → next 6+11+20 = **37** ✔.
- **Growing sidekick:** 1, 3, 7, 15, 31, ? → ×2+1 each → **63** (Mersenne family 2ⁿ−1 — spotted either as two-stepper (NS2) or diff-row doubling 2,4,8,16 → +32 → 63. TWO doorways again!).

### 3.5 The master radar, upgraded (7 gates, 15 seconds)

```
G1 diffs constant/AP   G2 ratios constant/ladder   G3 ×n±k drift
G4 squares/cubes ±k    G5 TWINS (split odd/even)   G6 primes ±k / indexed
G7 sums & memory (Fib/tribonacci/growing-k)
```
Practice scan narrations aloud: \"3,6,8,16,18 — diffs 3,2,8,2: bumpy (G5?) but wait, ×2,+2,ratio-alternating — G3a — SOLVED 36,38,76.\" Narrating = training. The 15-second scan is narration-internalized.

---

## 🧪 LAB — Family-tag & solve (10 min)

Tag the FAMILY first (one word: twin / alt-ops / prime / sum / wardrobe), then solve:

1. 2, 5, 3, 10, 4, 15, 5, ? — spot the braid.
2. 5, 8, 11, 14, 17, 20, ? — trap: looks AP…, is every term ALSO prime-related?
3. 6, 10, 18, 34, 66, ? — growing sidekick test.
4. 1, 4, 5, 9, 14, ? — which two-sum seed?
5. 3, 7, 13, 21, 31, ? — machine + wardrobe agreement?

**Answer key:** 1) twin: odds 2,3,4,5(+1), evens 5,10,15(+5) → pos-8 = even → **20** ✔. 2) AP +3 → **23** ✔ — and yes, 5,11,17 are primes-with-gap-6 underneath; simpler rule wins (AP) when two families fit → the SIMPLICITY LAW. 3) ×2−2? 6×2−2=10 ✔, 10×2−2=18 ✔ → 34×2−2=66 ✔ → next **130** ✔ (doubles-diff 4,8,16,32 doorway agrees). 4) 1+4=5, 4+5=9, 5+9=14 → **23** (two-sum ✔). 5) Two witnesses agree: wardrobe spot — n²+n+1 gives 3, 7, 13, 21, 31 ✔ (n=1..5) → next 36+6+1 = 43 — and the machine: diffs 4,6,8,10 → +12 → **43** ✔ (when both doorways open into the same room, answer with confidence: family = quadratic / n²+n+1).

---

## 💪 Exercises

1. Twin: 7, 4, 9, 7, 11, 10, 13, ? 
2. Alt-ops: 2, 4, 8, 10, 20, 22, ? (ops ladder: +2, ×2, +2, ×2…)
3. Prime knitting: 2, 3, 5, 7, 11, 13 — the gaps 1,2,2,4,2,4: what's the 8th prime and what's \"prime gaps\" one-line meaning?
4. Tribonacci seed: 2, 2, 4, 8, 14, 26, ?
5. Simplicity-law demo: 2, 4, 8, 16 — which family answer (×2 GP) beats which other plausible family (n² pairs?) and WHY.

### ✅ Selected answers

1. Odds 7,9,11,13 (+2); evens 4,7,10 (+3) → position 8 even → **13** ✔.
2. +2, ×2, +2, ×2 — wait check: 2+2=4, 4×2=8, 8+2=10, 10×2=20, 20+2=22 → next ×2 → **44** ✔.
3. 8th prime = **19**; \"prime gaps = the irregular spacing between consecutive primes (1,2,2,4,2…) — primes' signature when no arithmetic family confesses.\"
4. 2+2+4=8 ✔, 2+4+8=14 ✔, 4+8+14=26 ✔ → 8+14+26 = **48** ✔.
5. GP ×2 → 32 WINS; \"n²-pairs/(1+1,1+3,1+7…)\"-style freak-fits always exist with 4 terms, but exams honor the SIMPLEST consistent family — Occam pays marks.

---

## ❓ Quiz

**Q1.** 1, 2, 4, 4, 7, 8, 10, 16, ? — the winning move and answer:
- (a) Diff-row until constant → 24
- (b) **Split ODD/EVEN positions: odds 1,4,7,10 (+3 → 13), evens 2,4,8,16 (×2); position 9 is odd → 13 — braided series untangle only when split**
- (c) Primes times 2 → 18
- (d) ×2 → 32

**Q2.** A series' gaps read 1,2,2,4,2,4 with no classic family answering. The next family to scan is:
- (a) Factorials
- (b) **PRIMES — that irregular gap-pattern is the prime heartbeat (gaps between 2,3,5,7,11,13,17); when arithmetic fails, number-names take over**
- (c) Cubic roots
- (d) Give up family

**Q3.** 3, 6, 8, 16, 18, 36, 38, ? — the rule and next term:
- (a) ×2 → 76 … wait, after 38 comes +2
- (b) **Alternating ops ×2,+2,×2,+2 — after +2 (36→38) comes ×2 → 76; write the op-ladder above the series and the alternation plays itself**
- (c) +2 → 40
- (d) −4 → 32

### ✅ Answers

1. **(b)** — the braid demands the split. Position-numbers sketched above terms make twins visible in 5 seconds; position 9 = odd sub-series.
2. **(b)** — primes ±k / skip-primes answer by NAME, not arithmetic. Memorize primes to 60; the wardrobe never misuses a mark.
3. **(b)** — op-ladder notation (music score above the terms). Alternating is the twin's sibling: either split values or split OPERATORS — one of the two always confesses.

---

## ✅ Mastery checklist — NS3

- [ ] Position numbers sketched before twin-checks (bumpy-diff tell known)
- [ ] Odd/even split runs the Difference Machine per sub-series
- [ ] Op-ladders notated for alternating-operation series
- [ ] Primes ≤ 60 + gap signature from memory
- [ ] Two-sum / three-sum seeds verified from ANY start (not just 1,1)
- [ ] Simplicity LAW quoted when two families fit (Occam's exam rule)

---

**Next:** 🕵️ **NS4 · Wrong-Term Detective & Missing Middles** — the two nastier question costumes: \"which number BREAKS the pattern?\" (wrong-term forensics: one corrupt term, two dirty differences, one shared culprit) and \"find the missing middle\" — plus the hard-series survival kit and pacing for long-form sets.
