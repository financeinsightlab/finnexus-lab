# 🚀 NS2 · Ratios, Powers & Two-Step Ops

> Yesterday's engine stalls on series that MULTIPLY instead of add: 3, 6, 12, 24 has no graceful difference-row (diffs 3,6,12 — the series echoing itself!). That's the machine whispering: **switch to ratios.** This module completes the attack pair — divide neighbors when differences misbehave — then arms you against the two grown-up families: **×n±k two-steppers** and the **powers wardrobe** (squares, cubes, ±k costumes). By the end, your radar scans \"add? multiply? mixed?\" in five seconds flat.

---

## 🎯 Objectives

- Detect **geometric progressions (GP)**: constant ratio r = term₂ ÷ term₁.
- Recognize the **self-echo signal**: difference-row repeating the series ⇒ multiply-family.
- Solve **two-step operations** ×n+k and ×n−k (×2+3, ×3−2, …).
- Own the **powers wardrobe**: n², n³, n²±k, n³−n, 2ⁿ, 3ⁿ.
- Build the **family-scan order**: diffs → ratios → ops → powers (15-second radar).

---

## 📘 Concepts

### 2.1 The ratio row (the machine's second gear)

```
STEP 1 · DIFFS messy? → compute RATIOS: term ÷ previous-term
STEP 2 · constant ratio = GP: 3, 6, 12, 24 → r=2 → next 48
STEP 3 · ratio-row itself patterned (2, 3, 4, …) = ×n ladder family!
```

**×n ladder (ratio grows):** 3, 6, 18, 72, ? → ratios 2, 3, 4 → next ratio 5 → **360** ✔ (ratios forming their own AP — a beautiful exam classic). Non-integer ratios allowed: 16, 24, 36, 54, ? → ÷1.5 each → **81** (×3/2 — fractional GPs are legal currency).

**GP properties:** nth term = **a·rⁿ⁻¹** — the seed of COMPOUND INTEREST (PC3's ladder says hello again; NS6 will cash this in as money). 8th term of 5,10,20…: 5·2⁷ = **640**.

### 2.2 Two-step ops (×n ± k): the series-with-a-sidekick

The operation applies, then a constant joins/leaves:

- **×2+1:** 2, 5, 11, 23, 47, ? → term = 2×prev + 1 → next **95** ✔ (5=2×2+1, 11=5×2+1 …)
- **×3−2:** 4, 10, 28, 82, ? → 4×3−2=10 ✔ … → next **244**
- **×2+2,×2+3,×2+4… (ops grow):** 3, 8, 19, 42, 89 → ×2+2=8, ×2+3=19, ×2+4=42, ×2+5=89 → next ×2+6 = **184**.

**Detection trick:** ratios hover NEAR a constant but float slightly (11/5=2.2, 23/11≈2.09 → approaching 2) with differences that double-ish — try \"2×prev + small k\" and solve k from two consecutive pairs. Machine-check: (t₂ − 2t₁) = (t₃ − 2t₂) = k constant ⇒ **×2+k confirmed**.

### 2.3 The powers wardrobe (recognize the skeletons)

| Family | Signature | Terms |
|---|---|---|
| n² | squares | 1, 4, 9, 16, 25, 36 |
| n²+1 | squares plus | 2, 5, 10, 17, 26, 37 |
| n²−1 | squares minus | 0, 3, 8, 15, 24, 35 |
| n³ | cubes | 1, 8, 27, 64, 125, 216 |
| n³−n | cubes minus self | 0, 6, 24, 60, 120, 210 |
| 2ⁿ | doubles | 2, 4, 8, 16, 32, 64 |

**The 3-second check:** memorize the first 12 squares and first 6 cubes; subtract each term from the nearest square — CONSTANT offset everywhere ⇒ wardrobe picked. 2,5,10,17,26: nearest squares 1,4,9,16,25 → offsets +1,+1,+1,+1 → **n²+1 → next 37** ✔. The machine agrees second-hand: their second differences are constant 2 — same family, two doorways.

### 2.4 The family-scan order (15-second radar printout)

```
GATE 1 · differences constant/AP-shape? → AP / second-order      (NS1)
GATE 2 · ratios constant or ladder?     → GP / ×n ladder         (2.1)
GATE 3 · near-constant ratio drift?     → ×n ± k two-step        (2.2)
GATE 4 · near squares/cubes with offset?→ powers wardrobe        (2.3)
GATE 5 · none yet → twins / primes / sums — NS3 opens tomorrow
```
Gate order = probability order. Exams draw ~70% of series from gates 1–3.

---

## 🧪 LAB — Ratio-ward reps (10 min)

1. 7, 21, 63, 189, ? — name the family in one word, then the term.
2. 2, 6, 20, 72, ? — near-constant ratio with drift: find the ×n±k.
3. 12, 18, 27, 40.5, ? — fractional GP (₹-hint: ShopKart's soda case price creep at +50% every 2.. no — just solve!).
4. Wardrobe: 0, 7, 26, 63, 124, ? — cubes nearby?
5. 5, 14, 41, 122, ? — two-step hunt (solve k from two pairs).

**Answer key:** 1) GP r=3 → **567**. 2) Ratios 3, 3.33, 3.6 drift toward 4 → test ×4−k: 2×4−2=6 ✔, 6×4−4=20 ✔, 20×4−8=72 ✔ (k doubles: −2,−4,−8) → next 72×4−16 = **272** ✔ (bonus view: terms = 1·2, 2·3, 4·5, 8·9 → next 16·17 = 272 — two readings AGREE, which is the strongest confirmation possible). 3) r=1.5 → **60.75**. 4) n³−1: 1−1, 8−1, 27−1, 64−1 ✔ → 216−1 = **215** ✔. 5) 5×3−1=14 ✔, 14×3−1=41 ✔ → **365** (×3−1).

---

## 💪 Exercises

1. Ratios: 200, 100, 50, 25, ? (falling GP — r fractions allowed!)
2. ×n ladder: 2, 6, 24, 120, ? → which famous family is this series' secret twin?
3. Two-step: 1, 3, 8, 19, 42, ? (solve the sidekick)
4. Wardrobe triage: 11, 20, 35, 56, 83 — squares with WHAT offset?
5. GP formula: 6th term of 4, 12, 36, …; and the exact smell when ratios beat differences (one line).

### ✅ Selected answers

1. ÷2 each → **12.5** (halving GP — falling ratios are normal).
2. ×2, ×3, ×4, ×5 → **720** — secret twin: **factorials!** (2, 6, 24, 120 = 2!, 3!, 4!, 5! ✔ — the factorial family, spotted purely via its ratio ladder).
3. Ratios drift → test ×2+k: 1×2+1=3 ✔, 3×2+2=8 ✔, 8×2+3=19 ✔ (k grows +1) → 42×2+5? wait pattern: k=1,2,3,4 then +5 → hmm 19×2+4=42 ✔ → next 42×2+5 = **89**.
4. Wardrobe probe first: nearest squares give offsets 2, 4, 10, 20, 47 — no constant offset, wardrobe empty. Switch to the machine: diffs 9, 15, 21, 27 (climbing +6) → next diff +33 → 83+33 = **116** (second-order family; when offsets fail, the machine takes over).
5. 4·3⁵ = **972**; smell-line: \"when the difference-row echoes the series, ratios take the wheel.\"

---

## ❓ Quiz

**Q1.** 3, 6, 18, 72, ? — the rule and next term:
- (a) +6n continuing → 120
- (b) **Ratio ladder ×2, ×3, ×4, so next ×5 → 360 — when ratios themselves progress, the ladder IS the family**
- (c) ×2 again → 144
- (d) n² × 3 → 108

**Q2.** The reliable fingerprint of a two-step ×n+k series is:
- (a) Constant differences
- (b) **Ratios hovering NEAR a constant but drifting toward it (2.2 → 2.09 → 2.04), with (t₂ − n·t₁) giving the same k twice — then ×n+k is confirmed**
- (c) Terms always even
- (d) Differences halving

**Q3.** To crack 2, 5, 10, 17, 26 the fastest doorway is:
- (a) Third differences
- (b) **Nearest-square offsets: 1,4,9,16,25 each +1 → n²+1 → next 37 — the powers wardrobe; second-differences (2 constant) is the same family through the machine's door**
- (c) Ratios ≈ 2.5
- (d) Prime hunting

### ✅ Answers

1. **(b)** — ladder ratios (2,3,4→5) outrank any additive story. Same skeleton as 2,6,24,120 whose secret twin is factorials — family recognition pays compound interest.
2. **(b)** — drift-toward-constant is the two-stepper's gait; the k-check (t₂ − n·t₁) twice-confirms. Constant ratios = pure GP; drifting = sidekick aboard.
3. **(b)** — squares-in-a-coat. Two doorways to n²±k (offset check / second-diff = 2) — redundancy is the machine being kind.

---

## ✅ Mastery checklist — NS2

- [ ] Ratio rows computed when diff-rows misbehave — gate order obeyed
- [ ] GP identities: nth term a·rⁿ⁻¹; falling GPs welcomed (r < 1)
- [ ] ×n ladder + factorial twin spotted (2,6,24,120 = factorials)
- [ ] ×n±k detected via drift + k double-check from two pairs
- [ ] Powers wardrobe: first 12 squares + 6 cubes memorized; offset audit runs
- [ ] LAB Q2-style growing-sidekick accepted without panic (branch proved)

---

**Next:** 🧬 **NS3 · Twins, Primes & Addition Families** — interleaved double-series (odd vs even positions), alternating operations (×2,+2,×2…), the prime-number wardrobe, Fibonacci-style sum series, and three-term hybrids — the families where looking at ONE position at a time is the trap, and position-pairs are the key.
