# 🔢 NS1 · The Difference Machine: One Engine for Every Series

> Number Series is the evergreen opener of banking/SSC/aptitude tests — 5–10 marks dangling from one skill: **spot the rule, extend the rule**. Beginners stare at series hoping for divine inspiration; toppers run a machine. That machine is today's module: **write the differences, and the rule writes itself.** One engine, every family. Master it here, and the next five modules are just the machine wearing different costumes.

---

## 🎯 Objectives

- State what a series question really tests: **rule-induction under time** (not arithmetic skill).
- Run the **Difference Machine**: 1st differences → 2nd → 3rd until a pattern stabilizes.
- Master **arithmetic progressions (AP)** and the constant-difference law.
- Handle **second-order series** (differences of differences) — the n²-family gateway.
- Read **decreasing series** with negative differences without sign slips.

---

## 📘 Concepts

### 1.1 The one universal attack (write it on your rough shelf)

```
STEP 1 · WRITE the series with space between terms
STEP 2 · DIFFERENCES: subtract neighbors (later − earlier), build row 1
STEP 3 · Is the difference-row itself constant/patterned?
          constant → AP, done | patterned → extend it, come back up
STEP 4 · If differences are ugly → RATIOS (÷ neighbors) — NS2 territory
```

**Golden line:** never guess the rule from the terms; DERIVE it from the differences. The machine never lies; eyes lie daily.

### 1.2 Arithmetic progressions (the workhorse family)

AP = constant difference d. **3, 7, 11, 15, 19, ?** → diffs 4,4,4,4 → next diff 4 → **23**.

Properties worth marks:
- nth term: **a + (n−1)d** (7th term of 3,7,11…: 3 + 6×4 = 27).
- Sum of first n: **n/2 × (first + last)** — the AVG brother! (Σ = n × mean-of-ends. hello AV1!)
- ShopKart demo — daily footfall ramp at the new Saket store: 120, 132, 144, 156, ? → diffs 12 → **168** (a + (n−1)d in the wild).

**Variant — difference grows steadily (second order AP):** 2, 6, 12, 20, 30, ? diffs 4,6,8,10 — not constant, but ITSELF an AP (d=2): next diff 12 → **42**. Two rows of the machine = one solution. This \"n²-flavored\" family (n²+n underneath!) is examinership's favorite dinner.

### 1.3 Second differences: the depth gauge

Machine discipline: if row-1 diffs aren't constant, DIFF THE DIFFS:

```
Series:   3   6   11   18   27   ?
diff-1:    3    5    7    9      (+2 each)
diff-2:      2    2    2         (constant!)
Extend diff-1: +11 → 27+11 = 38 ✔   (rule: n² + 2 — but the machine
found it WITHOUT knowing n²! That's the point.)
```

**Depth table (how many rows until constant?):** row-1 constant = AP · row-2 constant = quadratic family · row-3 constant = cubic family (rare in exams, glorious when it lands: 1,8,27,64 has row-3 constant 6!).

### 1.4 Decreasing series (sign discipline)

**100, 81, 64, 49, ?** → diffs −19, −17, −15 → second diffs +2, +2 → next diff −13 → **36** (= 10², 9², 8², 7², 6²). Signing rules: write minus signs EXPLICITLY (−19, −17…), never abbreviate; a lost minus sign kills an otherwise-perfect row.

### 1.5 The ShopKart daily-sales wire (consistency run)

ShopKart weekly sales ladder from your Averages course — 52, 48, 56, 62, 58, 54 (₹'000) — is NOT a series puzzle (no monotone rule): **real-world data is noisy; exam series are exact.** Know the difference: exams hand you crafted sequences where the machine always finds a clean stop. If your rows stay messy after TWO difference levels, switch to ratios (NS2) or twins (NS3) — never force a fifth difference row.

---

## 🧪 LAB — Machine reps (10 min)

1. 5, 11, 19, 29, 41, ? — full machine printout (3 rows).
2. 88, 79, 72, 67, 64, ? — decreasing, sign care.
3. Saket footfall: 95, 104, 113, 122, ? — which term formula gives week-8?
4. 1, 2, 4, 8, 16, ? — try the machine; when row-1 repeats the series itself, what family is whispering? (Save formal GP for NS2 — just name the smell.)
5. a+(n−1)d: 9th term of 7, 11, 15, … — direct formula, no machine.

**Answer key:** 1) diffs 6,8,10,12 → diff-2 +2,+2 → next 14 → **55** ✔. 2) −9,−7,−5,−3 → (+2 each) → next −1 → **63**. 3) +12 weekly → week-8 = 95 + 7×12 = **179**. 4) diff-row = 1,2,4,8,16 = the series ITSELF → **32** — the \"self-replicating\" smell = ×2 geometric (NS2 confirms). 5) 7 + 8×4 = **39** ✔ formula beats machine when asked directly.

---

## 💪 Exercises

1. Machine: 13, 20, 29, 40, 53, ?
2. Machine: 240, 219, 200, 183, 168, ?
3. Sum-check: first 6 terms of 3,7,11,15,19,23 — using the AVG identity.
4. 4, 5, 9, 18, 34, ? — machine until diffs misbehave, then state what you'd try next (two options).
5. Compose a second-order series (diff-2 = +3 constant) starting at 5, 10 — three terms forward.

### ✅ Selected answers

1. 7,9,11,13 → next 15 → **68** ✔.
2. −21,−19,−17,−15 → next −13 → **155** ✔.
3. n/2 × (first+last) = 6/2 × (3+23) = 3×26 = **78** (avg-of-ends × n — AV1 handshake).
4. diffs 1,4,9,16 — SQUARES (1,4,9,16!) → next 25 → **59**; if not smelled: try ratios or twins next (the machine's exit ramps).
5. 5,10 (diff 5) → diffs 5,8,11,14 → series 5,10,**18,29,43** (diff-2 = 3 constant ✔).

---

## ❓ Quiz

**Q1.** 13, 20, 29, 40, 53, ? — the machine's next term is:
- (a) 66
- (b) **68 — diffs 7,9,11,13 grow by 2 (second-order AP), so next diff = 15 and 53+15 = 68; derived, not guessed**
- (c) 70
- (d) 65

**Q2.** The difference machine's FIRST job on any series is to:
- (a) Find the ratio between terms
- (b) **Compute the row of 1st differences — eyes guess rules, differences DERIVE them; ratios and twins are exits only when difference-rows stay messy through two levels**
- (c) Square each term mentally
- (d) Skip every other term

**Q3.** For 3,7,11,15,19,23, the sum of all six terms is:
- (a) 66
- (b) **78 — n/2 × (first + last) = 6/2 × 26: the sum-of-AP identity, which is just n × average-of-ends (AV1's equal-share engine counting, not adding)**
- (c) 72
- (d) 84

### ✅ Answers

1. **(b)** — second-order APs are the exam's favorite family. Two machine rows, zero inspiration needed.
2. **(b)** — attack order matters: differences → ratios → twins/hybrids. The machine's discipline is the whole course in one line.
3. **(b)** — ΣAP = n/2(a₁ + aₙ). Cross-course reflex: your Averages course owns this as \"n × mean.\" Skills compound here, bro.

---

## ✅ Mastery checklist — NS1

- [ ] Machine rows (1st/2nd/3rd diffs) printed cleanly with signs
- [ ] Constant-diff → AP law + nth-term + sum identities cited
- [ ] Second-order series solved without knowing the n² rule behind
- [ ] Decreasing series: minus signs written, never abbreviated
- [ ] I know the exits: ratios (NS2), twins (NS3) after 2 messy rows
- [ ] Real data vs crafted series distinction stated (Saket footfall example)

---

**Next:** 🚀 **NS2 · Ratios, Powers & Two-Step Ops** — the geometric family (×2, ×1.5), the self-replicating diff-row's true identity, ×n±k two-steppers, and the squares/cubes ±k wardrobe (n²+1, n²−1, n³−n). When differences misbehave — ratios take the wheel.
