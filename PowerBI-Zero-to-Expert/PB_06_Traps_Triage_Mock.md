# ⚡ PB6 · Traps, Triage & the Probability Mock Arena

> You now own the whole engine room: favorable/total, addition with refunds, multiplication with starvation checks, conditions that shrink universes, counting on both floors. What's left is exam-hall warfare: the five traps that harvest tired candidates, the 7-step scan that defuses any question in seconds, the BANK/GAMBLE/DUMP triage for negative marking — and a 10-question timed paper to prove it all under clock. This is the module where probability stops being chapters and becomes POINTS. Arena time, bro.

---

## 🎯 Objectives

- Disarm the **5 named probability traps** before they fire.
- Run the **7-step pre-solve scan** on any question in ≤10 seconds.
- Apply **triage + EV-of-guess** discipline under −0.25 marking.
- Complete the **10-question Mock Arena** and audit every miss by trap number.

---

## 📘 Concepts

### 6.1 The five named traps

**TRAP 1 · BASE-RATE BLINDNESS** — believing a 90%-accurate screen means a flagged case is 90% guilty. At a 2% base rate the truth was 18/67 ≈ 27% (PB4).
*Disarm:* natural frequencies per 1,000 — never trust percentages of different wholes.

**TRAP 2 · REPLACEMENT AMNESIA** — computing (5/9)² when the ball never went back (truth: 5/9 × 4/8 = 5/18), or answering 1/169 for two aces WITHOUT replacement (truth: 1/221).
*Disarm:* declare replacement status OUT LOUD before computing. Both counters starve together in no-replacement worlds.

**TRAP 3 · DOUBLE-COUNT UNION** — P(heart OR face) = 13/52 + 12/52 = 25/52, forgetting the 3 face-hearts (truth: 11/26).
*Disarm:* the overlap question first: "can BOTH happen at once?" Yes → refund the intersection ONCE.

**TRAP 4 · GAMBLER'S FALLACY** — "five reds in a row, black is DUE!" Independent trials have no memory; the coin owes nothing to its past.
*Disarm:* independence test — does the past physically change the next outcome? For coins, dice, roulette: never. P stays put.

**TRAP 5 · AT-LEAST-ONE BRUTE FORCE** — adding P(exactly 1) + P(exactly 2) + ... for 5 draws and drowning in cases (and usually missing one).
*Disarm:* complement law instantly: 1 − P(none). One product, one subtraction, done.

### 6.2 The 7-step pre-solve scan

```
STEP 1: SAME-RULES LOCK  - favorable & total counted by the same method?
STEP 2: UNIVERSE         - what are ALL equally-likely outcomes (grid? bag? deck?)
STEP 3: REPLACEMENT      - with or without? (changes everything)
STEP 4: INDEPENDENCE     - do the events move each other's odds?
STEP 5: EXCLUSIVITY      - OR-question? overlap to refund?
STEP 6: COMPLEMENT       - "at least one" / "at most none" -> 1 - P(opposite)?
STEP 7: SANITY           - answer within [0,1]? extreme-base-rate smell-check?
```

Ten seconds of scan, then the arithmetic is clerical. Most exam tragedies are step-2 and step-3 skipped.

### 6.3 Triage + guess-EV (negative marking math)

- **BANK:** single-law questions — one fraction, one multiply, one complement (<30s).
- **GAMBLE:** two-layer questions — conditional + a counting floor (return after banks).
- **DUMP:** three-layer Bayes/league-table monsters under 90 seconds — a −0.25 bleed out-prices a heroic attempt.
- **Guess-EV:** +1/−0.25 with 4 options is +0.0625 blind; eliminating ONE option makes it +0.167. Zero eliminations → walk.

---

## 🏟️ THE PROBABILITY MOCK ARENA — Paper PB-01 (10 Qs · 8 min · −0.25 per miss)

1. Two fair coins: P(both heads)?
2. Two dice: P(sum = 7)?
3. One card: P(king OR queen)?
4. Two cards, NO replacement: P(both aces)?
5. A die thrown 4 times: P(at least one six)? (Exact fraction or 2 decimals.)
6. 3 balls from 5 red + 4 blue: P(all red)?
7. Two children, at least one a boy: P(both boys)?
8. Committee of 5 from 6 men + 4 women: P(exactly 2 women)?
9. One card: P(heart OR face)?
10. A coin has shown HHHH; P(head on the 5th toss)?

### ✅ Arena Key & Analysis

| # | Answer | One-line machinery |
|---|---|---|
| 1 | **1/4** | independent multiply: 1/2 × 1/2 |
| 2 | **1/6** | six winning cells in the 36-grid (ways 1-2-3-4-5-6-5-4-3-2-1 has 6 at the peak) |
| 3 | **2/13** | exclusive add: 4/52 + 4/52 |
| 4 | **1/221** | 4/52 × 3/51 — no-replacement starvation (TRAP 2!) |
| 5 | **671/1296 ≈ 0.518** | complement: 1 − (5/6)⁴ (TRAP 5 dodge!) |
| 6 | **5/42** | 5C3/9C3 = 10/84 — same-rules counting on both floors |
| 7 | **1/3** | delete only GG → universe {BB, BG, GB} |
| 8 | **10/21** | (4C2 × 6C3)/10C5 = 120/252 |
| 9 | **11/26** | 13/52 + 12/52 − 3/52 — refund the 3 face-hearts (TRAP 3!) |
| 10 | **1/2** | no memory — the GAMBLER'S FALLACY's final exam (TRAP 4!) |

**Self-audit ritual:** tag every miss with its trap number (1–5). Two misses under one trap = redo that trap's module section tonight, then re-run the paper tomorrow.

---

## 💪 Exercises

1. Name the trap: "The screen is 90% accurate, so a flagged vendor is 90% likely fraudulent."
2. Name the trap: "P(heart or face) = 25/52."
3. A student computes two aces without replacement as (1/13)². Two errors — name both the trap AND the arithmetic slip.
4. Scan-run (say all 7 steps' verdicts): "5 pitches, each independent 25% close; P(at least one close)?"
5. Triage: 50 seconds left; one nCr handshake-style BANK and one 3-layer Bayes monster remain. Decide + justify with guess-EV.

### ✅ Selected answers

1. **BASE-RATE BLINDNESS** — accuracy P(flag|fraud) ≠ P(fraud|flag); run per-1,000 frequencies before believing anything.
2. **DOUBLE-COUNT UNION** — the 3 face-hearts were counted twice; true value 22/52 = 11/26.
3. **REPLACEMENT AMNESIA** (the card never returned) AND coin-logic: 1/13 × 1/13 = 1/169 is the WITH-replacement answer; no-replacement starves both counters → 1/221.
4. Universe: independent binary trials; replacement: n/a; independence: yes (25% each); exclusivity: n/a; complement: YES — 1 − 0.75⁵ = 1 − 0.2373 = **0.7627 ≈ 76.3%**; sanity: inside [0,1], bigger than any single 25% ✔.
5. BANK the combo question (<30s), DUMP the monster unattempted — blind-guess EV is barely positive (+0.0625) and dips negative with panic-error odds; a sure +1 beats a lottery ticket with a fee.

---

## ❓ Quiz

**Q1.** Arena re-run: the coin showed HHHH. P(head on toss 5):
- (a) 1/32
- (b) **1/2 — independent tosses carry no memory; the GAMBLER'S FALLACY sells streak narratives to people who forgot the coin can't read its own history**
- (c) 1/16
- (d) 3/4

**Q2.** Two-dice sum is 7 or 11:
- (a) 1/6
- (b) **2/9 — the cells are exclusive (one throw can't be two sums), so add: 6/36 + 2/36; overlap-check first, then add clean**
- (c) 8/36 minus overlap
- (d) 1/9

**Q3.** The 7-step scan's SECOND gate asks about:
- (a) Bayes formula
- (b) **the UNIVERSE — what are ALL equally-likely outcomes here (grid, bag, deck, rounds)? Every tragedy in this chapter starts with a universe that was never drawn**
- (c) the answer choices
- (d) the clock

### ✅ Answers

1. **(b)** — independence: the past physically cannot steer the next toss. Streaks are stories, not physics.
2. **(b)** — exclusivity confirmed → clean add. The overlap question is always asked BEFORE adding.
3. **(b)** — same-rules lock first, universe second, replacement third… ten seconds of scan, then arithmetic is clerical.

---

## ✅ Mastery checklist — PB6

- [ ] All 5 traps named with disarm lines, no notes
- [ ] 7-step scan recited in order and applied in ≤10s
- [ ] Guess-EV computed (+0.0625 blind; +0.167 with one elimination)
- [ ] Triage tiers defined; DUMP discipline defended arithmetically
- [ ] Mock Arena completed: ___/10 raw · ___ net after −0.25
- [ ] Every miss trap-tagged; redo-list scheduled

---

**Next:** 💼 **PB7 · FINANCE: Probability of Money + Capstone** — expected value pricing a ₹80,000 scooter promo (₹0.40 per card!), expected-loss credit math (approve at ₹1,200 vs ₹3,000 fee), the fraud screen's 27% verdict scaled to a vendor book, conversion streaks (67.2%), and the **ShopKart Risk & Rupees Deck** capstone. Probability, finally, in rupees.
