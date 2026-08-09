# 🕵️ NS4 · Wrong-Term Detective & Missing Middles

> Finding the NEXT term is polite crime-solving. But exams love two nastier costumes: **\"which number in this series is WRONG?\"** — you must find the corrupted term, not extend the clean one — and **\"fill the missing middle\"**, where the hole isn't at the end. Wrong-term questions terrify beginners because one bad number dirties TWO differences; detectives know this double-dirty signature and catch the shared culprit in seconds. Then we graduate to hard mixed series and the survival pacing for them.

---

## 🎯 Objectives

- Run the **wrong-term protocol**: dirty-difference pairs → shared suspect → replacement proof.
- Distinguish break types: single-term corruption vs pattern-shift confusion.
- Solve **missing-middle** series via bidirectional machine-runs.
- Survive **hard mixed series** (family switches inside one series).
- Price your time: the 60-second mercy rule for any single term.

---

## 📘 Concepts

### 4.1 The wrong-term protocol (forensics in 4 steps)

```
STEP 1 · Run the machine (diffs, ratios) over the FULL series
STEP 2 · Find the pattern that fits the MAJORITY of terms (the 'law of the series')
STEP 3 · The corrupt term dirties exactly TWO neighbor-links (left & right):
         locate the one term whose REPLACEMENT makes both links clean
STEP 4 · PROVE it: substitute the correction; re-run the row end-to-end — all clean? convicted.
```

**Live case:** 3, 7, 15, 31, 63, **128**, …
Machine: diffs 4, 8, 16, 32, **65**. Five diffs, one hooligan (65 should be 64). The 65 sits between 63 and 128; the shared suspect = **128** — replace with 127: link 63→127 = 64 ✔ (and 127→ next would be ×2+1 = 255 ✔ family ×2+1 holds everywhere). Convicted: **128 is wrong (should be 127).**

The signature to memorize: in a wrong-term series, the diff-row has a LOCAL bump (one big value), sitting at the corrupt term's incoming link — or straddling it. The *law of the series* (×2+1 here) is found from the CLEAN links, not the dirty ones.

### 4.2 Break types (know which murder you're solving)

- **Single-term corruption** (90% of questions): one term off by a small amount (63→ 128-for-127 = off-by-1 DNA). Fix = replacement.
- **Offset-then-flat**: from the corrupt term ONWARD everything continues as if the corruption were the truth — the series \"heals around the lie.\" Here you must report the WOUND TERM still (first corrupt), because the question asks which term is wrong, not where continuity died.
- **Pattern-shift decoys**: a series that lawfully changes rule mid-way (gate-5 territory) — answer is \"no wrong term; two patterns\" ONLY if options bait it; otherwise keep hunting corruptions. RARE; last resort.

### 4.3 Missing-middle (the hole in the middle)

**5, 9, _, 23, 35** → machine both directions: forward diffs 4, ?, ?, 12; backward from the right: 35−23 = 12. Assume smooth growth (second-order AP): try diffs 4, 6, 8, 10, 12 → 9+6 = 15, then 15+8 = 23 ✔ and 23+12 = 35 ✔ → **15** (verified BOTH directions — that's the middle-hole law: the candidate must satisfy incoming AND outgoing links).

**Rules for middles:** (1) write the expected diff-skeleton first; (2") the middle term's proof needs both links clean; (3) with TWO holes, assume the simplest smooth diff-row that satisfies all four outer links, then test.

### 4.4 Hard mixed series (family switches inside one line)

Exam endgame: 1, 2, 6, 21, 88, ? — diffs 1,4,15,67 (ugly); ratios 2,3,3.5,4.19 (drifting up): test ×n+k: 1×1+1=2, 2×2+2=6, 6×3+3=21, 21×4+4=88 → **×n+n with n growing!** → 88×5+5 = **445** ✔. The \"n grows with position\" class (tₙ = n×tₙ₋₁ + n) hides under ratio-drift — name it: **position-indexed ops**. Same for tₙ = tₙ₋₁² ± … (rare; explosive growth is the tell: 2, 5, 26 → 5²+1 ✔ next 677 — only in finale-level sets).

### 4.5 Survival pacing for hard series

| Term hunt type | Mercy rule |
|---|---|
| Next term, clean family | ≤ 30 s |
| Wrong term | ≤ 60 s (protocol is mechanical — trust it) |
| Missing middle | ≤ 45 s |
| Family-grows-with-position | ≤ 75 s, else park & return |
Rule of the arena: **a series you haven't cracked at second differencing + ratio check = move on, return later.** Series pay the same marks as the easy ones.

---

## 🧪 LAB — Detective board (12 min)

1. Convict: 2, 5, 10, 17, 26, 36, 50 — which term is WRONG? (family: n²+1…)
2. Convict: 4, 9, 19, 39, 79, 159, 319 — ×2+1 law: who breaks it?
3. Missing middle: 3, 7, _, 31, 63 — fill and double-verify.
4. Missing middle: 3, 8, 15, _, 35, 48 — fill and double-verify.
5. Hard: 2, 3, 7, 25, 121, ? — ratio-drift tells what growth family? Solve.

**Answer key:** 1) n²+1 law: 1+1, 4+1, 9+1, 16+1, 25+1 should read 36+1 = 37 — the series shows 36 → **36 is wrong (should be 37)**; the next link 37→50 = +13 → 7²+1 = 50 ✔ resumes clean ✔. 2) Chain check: 4×2+1=9 ✔, 9×2+1=19 ✔, 19×2+1=39 ✔, 39×2+1=79 ✔, 79×2+1=159 ✔, 159×2+1=319 ✔ — every link clean → **NO wrong term** — an honest all-clean conviction (trap lab on purpose; report it boldly). 3) ×2+1 family: 3→7 ✔, 7→**15**, 15→31 ✔ (15×2+1 = 31 ✔ outgoing clean), 31→63 ✔ → **15**, both links verified. 4) Diffs 5, 7, _, 13 → smooth climb 5,7,9,11,13 → 15+9 = **24**, verify 24+11 = 35 ✔, 35+13 = 48 ✔ → **24**. 5) Ratios 1.5, 2.33, 3.57, 4.84 — drifting up with position → test the position-indexed law **tₙ = tₙ₋₁ × n − (n−1)**: 2×2−1=3 ✔, 3×3−2=7 ✔, 7×4−3=25 ✔, 25×5−4=121 ✔ → next = 121×6−5 = **721** ✔.

---

## 💪 Exercises

1. Convict: 8, 13, 20, 32, 40 — second-order family (diffs should climb 5,7,9,11…).
2. Fill the middle: 2, 11, _, 47, 74 (second-order family; diffs stride by 6).
3. Two-side verify: 3, 9, _, 45, 93 (a ×2+k family).
4. Hard: 3, 4, 12, 45, 196, ? — position ops with a square sidekick.
5. Mercy drill: 60-s timer on 7, 10, 16, 28, 52 — solve or park; state which.

### ✅ Selected answers

1. Expected second-order family: diffs 5,7,9,11 → clean terms 8,13,20,29,40. Given shows 32 in position 4: the links 20→32 (12) and 32→40 (8) are BOTH dirty — shared suspect = **32 → should be 29**; substitution heals both links (20→29 = 9 ✔, 29→40 = 11 ✔). Conviction by the double-link test.
2. Diffs stride by 6: 11−2 = 9, so diffs 9, 15, 21, 27 → 11+15 = **26**; verify 26+21 = 47 ✔ and 47+27 = 74 ✔ — double-link proof. 
3. ×2+3 family: 3×2+3 = 9 ✔, 9×2+3 = **21**, verify 21×2+3 = 45 ✔, 45×2+3 = 93 ✔ → **21**.
4. Ratios drift with position → try **tₙ = k · tₙ₋₁ + k²** (k = 1,2,3,…): 3×1+1 = 4 ✔, 4×2+4 = 12 ✔, 12×3+9 = 45 ✔, 45×4+16 = 196 ✔ → next k=5: 196×5+25 = **1005** ✔ (multiplier AND sidekick both indexed — the double-barrel!).
5. Diffs 3,6,12,24 doubling → 52+48 = **100** (<60 s if you smelled the doubling diff-row; parking was legal otherwise — the drill is the decision, not just the answer).

---

## ❓ Quiz

**Q1.** 3, 7, 15, 31, 63, 128, … — the wrong term and its replacement:
- (a) 63 → 64
- (b) **128 → 127 — the ×2+1 law holds on every CLEAN link; one off-by-one corruption dirties the 63→128 link (65 instead of 64); replacement re-cleans the whole row**
- (c) 15 → 14
- (d) None is wrong

**Q2.** For a missing-MIDDLE hole, a candidate value is PROVEN only when…
- (a) It fits the incoming difference
- (b) **It satisfies BOTH links — incoming AND outgoing: the two-direction verification law; one clean link is a suspect, two clean links is a conviction**
- (c) It looks nice
- (d) The options say so

**Q3.** 1, 2, 6, 21, 88, ? — the family and next term:
- (a) ×2 ladder → 176
- (b) **Position-indexed ops: tₙ = n × tₙ₋₁ + n (1×1+1, 2×2+2, 6×3+3, 21×4+4) → 88×5+5 = 445 — ratio-drift THAT grows with position is this family's fingerprint**
- (c) Fibonacci → 109
- (d) n³ → 125

### ✅ Answers

1. **(b)** — wrong-term protocol: law from clean links, corrupt term = shared suspect of the dirty pair, substitution proof. One bump, one culprit, one conviction.
2. **(b)** — the double-link law. Middle holes demand both neighbors' testimony; bidirectional machine-runs are five seconds of diligence for a mark.
3. **(b)** — drift-toward-position (ratios 2, 3, 3.5, 4.2) tags position-indexed ops: ×n+n. Rare, glorious, and unmistakable once named.

---

## ✅ Mastery checklist — NS4

- [ ] Wrong-term protocol: law-from-clean-links + substitution proof, both run
- [ ] Double-dirty signature recognized (one corruptor, two wounds)
- [ ] Missing-middle: double-link verification never skipped
- [ ] Position-indexed ops family (×n+n, ×n+n²) named + spotted via drift
- [ ] 60-second mercy rule + park discipline practiced honestly
- [ ] \"No wrong term\" confidence: all-clean reports delivered without fear

---

**Next:** ⚡ **NS5 · Traps, The Radar Scan & Mock Arena** — the five named series traps, the 15-second seven-gate radar recital, wrong-term-vs-next-term question triage, and the **10-question Series Mock Arena** (8 minutes, every family on duty). Then Module 6 turns your pattern eye into a money detector.
