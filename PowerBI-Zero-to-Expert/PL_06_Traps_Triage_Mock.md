# ⚡ PL6 · Traps, Triage & the P&L Mock Arena

> You own the counter now: the base law, both reverses, twin theorems, markup-discount chains, false weights, the four classics. P&L's remaining dangers are all self-inflicted: using the wrong base because the question felt familiar, letting symmetry seduce you, adding discounts like they're groceries. This module names the five traps, installs a six-gate radar, rehearses exam-hall triage under negative marking — then puts you in the Arena: 10 questions, 8 minutes, every point defended. Let's convert knowledge into marks, bro.

---

## 🎯 Objectives

- Disarm the **5 named P&L traps** with one-line antidotes.
- Run the **6-gate radar** before any solve.
- Apply **triage + guess-EV** under −0.25 marking.
- Finish the **Mock Arena** and audit misses by trap number.

---

## 📘 Concepts

### 6.1 The five named traps

**TRAP 1 · BASE SWAP** — computing the percent on SP (or MP) because that number was printed first. Profit% rides **CP**. Always.
*Antidote:* say "base is cost" before writing any fraction. Margin-vs-markup fluency is the vaccination.

**TRAP 2 · SAME-SP SYMMETRY** — twin sales at equal SP with +x% and −x%, judged as breakeven. Reality: **loss x²/100**, always (the losing sale's CP is the fat one).
*Antidote:* spot the equal-SP pair → write the theorem, win 20 seconds.

**TRAP 3 · STACK-ADDITION MIRAGE** — reading 20%+10% off as 30% off (truth: 28%); or +10 margin then −20 discount as "net −10" (truth: −12).
*Antidote:* multipliers, never headlines: 0.8 × 0.9 = 0.72.

**TRAP 4 · FREE-OFFER BLINDNESS** — "buy 4 get 1" read as 25% off because 1/4 LOOKS right. Truth: 1/5 = 20% — take-home is the denominator.
*Antidote:* denominator = what you CARRY, full stop.

**TRAP 5 · CP-MP SWIRL** — discounting the CP, marking up the MP, or subtracting markup and discount as if they shared a base. CP→MP→SP is a CHAIN of multipliers on changing bases.
*Antidote:* write the chain (1+m)(1−d) = 1+p before touching numbers.

### 6.2 The 6-gate radar

```
GATE 1: BASE?        (P% on CP unless the question rewires it)
GATE 2: PRICES?      (which of CP / MP / SP are actually in play?)
GATE 3: STACK?       (any successive changes -> multiply, don't add)
GATE 4: REVERSE?     (given SP -> divide by the multiplier; check the sign-world)
GATE 5: SPECIAL?     (same-SP twins / free offers / false weights / classics)
GATE 6: SANITY?      (sign of P/L + clean-landing + % size plausible?)
```

Six gates, five seconds. Marks are lost in the second you skip the radar, not in the math.

### 6.3 Triage + guess-EV

- **BANK:** one-multiplier or one-law questions (forward SP, twin theorem, free-offer conversion) — under 30 seconds.
- **GAMBLE:** chain + reverse combos (markup needed, chain-recovery) — 60–90 seconds, mark & return.
- **DUMP:** multi-entity riddles under time pressure (double-dishonest scales + mixture + reverse) — a wrong guess bleeds −0.25; skip loudly.
- **Guess-EV:** +1/−0.25, 4 options: blind guess +0.0625 (barely positive); one elimination → ⅓ − ⅔·0.25 = **+0.167**; zero elimination → walk away.

---

## 🏟️ THE P&L MOCK ARENA — Paper PL-01 (10 Qs · 8 min · −0.25 per miss)

1. Kurta sold ₹1,150 at 15% profit. CP?
2. Two watches sold ₹990 each — one +10%, one −10%. Net result (₹ and %)?
3. Successive discounts 20% + 10% equal a single discount of?
4. Trader's stone: 900 g for "1 kg", priced at cost. True gain%?
5. Selling 33 m of cloth gains the SP of 11 m. Gain%?
6. "Buy 4 get 1 free" as a flat discount %?
7. Markup needed so a 10% discount still yields 20% profit?
8. Table gains y% at ₹450, loses y% at ₹300. CP?
9. Milk ₹50/L + 1 L free water per 4 L milk, sold at ₹50/L. Profit%?
10. Blend ₹40/kg with ₹60/kg rice to SELL ₹55/kg at 10% profit. Cheaper:dearer ratio?

### ✅ Arena Key & Analysis

| # | Answer | Machinery (trap dodged) |
|---|---|---|
| 1 | **₹1,000** | reverse ÷1.15 — clean landing (gate 4) |
| 2 | **₹20 loss = 1%** | twin theorem x²/100 (TRAP 2) |
| 3 | **28%** | 1 − 0.8×0.9 (TRAP 3) |
| 4 | **11.11%** | error/delivered = 100/900 (gate 5) |
| 5 | **50%** | k/(n−k) = 11/22 (classic map) |
| 6 | **20%** | pay 4, take 5 (TRAP 4) |
| 7 | **33.33%** | (1+p)/(1−d) = 1.2/0.9 = 4/3 (TRAP 5) |
| 8 | **₹375** | midpoint law (+ y = 20% free) |
| 9 | **25%** | water/milk ratio × 100 (gate 1: base = CP 200) |
| 10 | **1:1** | CP target 55/1.1 = 50 → distances 10:10 (alligation) |

**Self-audit ritual:** tag every miss with its trap number. Two misses under one trap → that trap's section gets re-read tonight and the paper re-run tomorrow.

---

## 💪 Exercises

1. Name the trap: "'Flat 45% off, best deal in town' — it's just three 15% cuts." What's the truth and the trap?
2. Name the trap: "The two mixers both sold at ₹1,380 — one gained 15%, one lost 15%, so the shop breaks even."
3. Radar-run all six gates on: "After 25% discount, ShopKart still earns 30% on a jacket. Markup?"
4. Triage call: 45 seconds left, one clean reverse question and one double-dishonesty mixture riddle remain. Play or pass, with EV arithmetic.
5. Self-diagnosis: someone computed P% = 40% from CP ₹70, SP ₹100. Then a CFO meeting quoted "40% margin". Who's wrong, and how do you fix the room in one line?

### ✅ Selected answers

1. Three 15% cuts: 0.85³ = 0.614 → effective **38.6%**, NOT 45% — **STACK-ADDITION MIRAGE** layered thrice; the honest banner checks multipliers.
2. **SAME-SP SYMMETRY** — the pair always loses 15²/100 = **2.25%** (CPs 1,200 + 1,623.53 vs SP 2,760 ✔); break-even is the mirage.
3. Base CP ✔ · prices: CP, MP, SP ✔ · stack: single discount only, no ✖ · reverse: formula road ✔ · special: markup-for-wiggle ✔ · sanity: markup must exceed 55%: (1.3/0.75) = 1.7333 → **markup 73.33%** — plausible, above the naive 55% ✔.
4. BANK the reverse (<30 s), DUMP the riddle unattempted — blind-guess EV +0.0625 isn't salary; a sure +1 and an untouched riddle beats a heroic −0.25.
5. Both mis-spoke: CP ₹70 → SP ₹100 is ₹30 profit — exam-law markup is 30/70 ≈ **42.9%**, business margin is 30/100 = **30%**; the quoted "40%" matched NEITHER dialect. The room-fix: "let's name the base before the number" — CP-law for exams, SP-law for finance sheets, one sentence, zero confusion.

---

## ❓ Quiz

**Q1.** Arena re-run: successive discounts 20% + 10% equal a single discount of:
- (a) 30%
- (b) **28% — 1 − 0.8 × 0.9; stacks multiply on a shrinking base, headlines merely add; the multipliers are the referee**
- (c) 26%
- (d) 32%

**Q2.** The SAME-SP SYMMETRY trap sells the story that +10% and −10% cancel. The truth:
- (a) true — gains and losses mirror
- (b) **false — the pair ALWAYS loses x²/100 = 1%; equal SP tags hide unequal CP bases, and the loser hides the fat one**
- (c) false — it always gains 1%
- (d) depends on CP

**Q3.** The 6-gate radar's FIRST gate on any P&L question:
- (a) compute the discount first
- (b) **IDENTIFY THE BASE — profit% rides CP by exam law; one base-swap flips every fraction downstream, so the base gets named before the number gets written**
- (c) convert everything to decimals
- (d) guess CP = ₹100

### ✅ Answers

1. **(b)** — 0.72 is the pay-load; 28% the honest rate; trust multiplication over marketing.
2. **(b)** — the theorem is unconditional: same SP, opposite rates, x²/100 loss — no CP details required.
3. **(b)** — base, prices, stack, reverse, special, sanity — in that order, in five seconds.

---

## ✅ Mastery checklist — PL6

- [ ] All 5 traps named with antidotes, no notes
- [ ] 6-gate radar recited in order
- [ ] Effective-stack computed for 2 and 3 layers (38.6% triple-check)
- [ ] Triage + guess-EV applied (+0.167 after one elimination)
- [ ] Arena paper done: ___/10 raw · ___ net
- [ ] Misses trap-tagged; redo-list scheduled

---

**Next:** 💼 **PL7 · FINANCE: Margin Economics + Capstone** — ShopKart's real P&L machinery: gross margin 29% vs 40.8% markup in live negotiation, why a 10% price cut destroys 34.5% of gross (and needs +52.6% units to catch up), the below-cost clearance law (never cross the ₹71 floor without a memo), early-pay vendor discounts earning 37% annualized, and the **ShopKart Margin Defense Pack** capstone. Exam math, finally denominated in decisions.
