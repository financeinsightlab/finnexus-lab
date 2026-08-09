# ⚡ PP6 · Traps, Triage & the P&C Mock Arena

> You own the machinery now: two rules, nPr, nCr, blocks, circles, fussy slots, subsets. What's left between you and full marks is the **trap layer** — the five classic frauds exam-setters deploy on tired candidates — plus **triage**: which question to attack, which to park, which to leave loudly. Then we run the Mock Arena: 10 questions, 8 minutes, −0.25 negative marking, exactly like the real banking/SSC papers this course was built for. Suit up, bro.

---

## 🎯 Objectives

- Spot and disarm the **5 named P&C traps** before they fire.
- Run the **7-gate radar** before every solve: order? repetition? restrictions? circle? identical twins? digits/zero? complement-shortcut?
- Apply **triage**: BANK (solve now), GAMBLE (mark & return), DUMP (skip loudly).
- Complete a **10-question timed mock** and audit every miss against the trap table.

---

## 📘 Concepts

### 6.1 The five named traps

**TRAP 1 · ORDER AMNESIA** — using 8C3 when the podium wanted 8P3 (or vice versa).
*Disarm:* the swap-test, run OUT LOUD. Swap two picks; outcome changes → P; survives → C. 336 vs 56 is the whole debate. One audible swap per question, zero amnesia.

**TRAP 2 · DOUBLE-COUNT HANGOVER** — counting two overlapping restrictions and adding both fully, forgetting the intersection was counted TWICE. (Team with A OR B as captain: cases-with-A + cases-with-B − cases-with-both.)
*Disarm:* inclusion–exclusion: |A ∪ B| = |A| + |B| − |A∩B|. Whenever two restrictions can co-occur, subtract the overlap once.

**TRAP 3 · ZERO-FIRST FORGERY** — 5! = 120 "4-digit numbers" from {0..4}, 24 of which begin with 0.
*Disarm:* fussy slot first — thousands place gets counted before its friends (PP5.1). Check reflex: total − all-zero-led = 120 − 24 = 96 ✔.

**TRAP 4 · REPEAT-REFLEX MISS** — declaring 6! = 720 for BANANA; the two N's and three A's ghost-shuffle invisibly.
*Disarm:* the twin-audit: read the word aloud, tally EVERY repeated letter, divide by each p!. BANANA = 6!/(3!2!) = **60**, never 720.

**TRAP 5 · CIRCLE LINE-UP CONFUSION** — answering 8! = 40,320 for a round table (the 8 rotations are one dinner) — or answering (n−1)! for a necklace (forgot the flip = ÷2).
*Disarm:* smell-words → round table/circle = (n−1)!; necklace/garland/beads/bracelet = (n−1)!/2. Say the words back before computing.

### 6.2 The 7-gate pre-solve radar

Run every P&C question through these gates, in order, before touching a formula:

```
GATE 1: ORDER?      (swap-test: does swapping change the outcome?)
GATE 2: REPEATS?    (can items/digits repeat? n^r vs nPr fork)
GATE 3: RESTRICTIONS? (together/apart/must/not -> block, gaps, refund)
GATE 4: CIRCLE?     (anchor one: (n-1)!; beads: halve again)
GATE 5: TWINS?      (identical letters/items -> divide by p! q! ...)
GATE 6: DIGIT-TRAP? (fussy slot first: no leading 0, units even/5)
GATE 7: COMPLEMENT? (is "total - forbidden" cheaper than direct?)
```

Seven gates, under ten seconds, then the question solves itself. Skipping the radar is how 40,320 walks onto your answer sheet.

### 6.3 Triage: BANK · GAMBLE · DUMP

- **BANK:** 1-formula questions (nPr, nCr, handshakes, 2ⁿ−1). Solve in <30s, lock the mark.
- **GAMBLE:** 2-layer questions (committee with exactly-constraint + a mild restriction; rank-of-word). Mark, return after banks.
- **DUMP:** 3-layer monsters (circular + apart + twins) with 90 seconds left — skip; a −0.25 bleed costs more than an unsolved Q.

Negative marking math (PC6 handshake): expected loss on a pure guess with 4 options = ¼(1) − ¾(0.25) = +0.0625 — barely positive, but ONLY if you can eliminate nothing. Eliminate ONE option and guessing earns; zero elimination, walk away.

---

## 🏟️ THE P&C MOCK ARENA — Paper P&C-01 (10 Qs · 8 min · −0.25 per miss)

1. 7P3 = ?
2. 8C5 = ?
3. Arrangements of the letters B-A-N-A-N-A?
4. 10 people at the Saket meet greet everyone once — handshakes?
5. 6 managers around a round review table — seatings?
6. Choose 4 candles from 9 distinct festive candles?
7. Committee of 5 from 6 men + 4 women, EXACTLY 2 women?
8. 3-digit EVEN numbers using digits 1–9, no repeats?
9. 4-digit passcodes, NO digit repeats?
10. 5 staff Secret Santa, self-gifting illegal — valid draws?

### ✅ Arena Key & Analysis

| # | Answer | One-line machinery |
|---|---|---|
| 1 | **210** | 7 × 6 × 5 — slot-product; PERMUT(7,3) signs it off |
| 2 | **56** | mirror law: 8C5 = 8C3 = 56 |
| 3 | **60** | 6!/(3!2!) — twin-audit on A×3, N×2 (TRAP 4!) |
| 4 | **45** | 10C2 — handshakes are unordered pairs |
| 5 | **120** | (6−1)! — anchor one manager (TRAP 5!) |
| 6 | **126** | 9C4 = 126 — swap-test: candle SET, order dead |
| 7 | **120** | 4C2 × 6C3 = 6 × 20 — sub-selections AND-glued |
| 8 | **224** | fussy units first: {2,4,6,8} = 4 × 8 × 7 (TRAP: fill left-to-right and starve the units) |
| 9 | **5,040** | 10 × 9 × 8 × 7 — repeats banned; nʳ = 10,000 would be TRAP 2's cousin (wrong twin) |
| 10 | **44** | !5 = 44 from the derangement table |

**Self-audit ritual:** for every miss, write the TRAP number beside it. Two misses with the same trap number = that trap owns you; redo its PP module section before the next paper.

---

## 💪 Exercises

1. Name the trap: "Committee of 4 with Priya as member OR Ajay as captain: 7C3 + 7C3 = 70." What's missing?
2. Name the trap: "Round table of 9: 9! = 362,880."
3. Radar run: classify these by gate-1 verdict — (i) IPL playing XI from 15, (ii) podium from 8, (iii) 3 toppings from 7.
4. Triage talk: you have 60 seconds; an nC2 handshake Q and a circular-apart-twins monster both remain. What do you do, and why?
5. Expected value: 4 options, +1/−0.25, you eliminate one option with certainty. Show the guess-EV.

### ✅ Selected answers

1. **DOUBLE-COUNT HANGOVER** — cases with BOTH (Priya member AND Ajay captain) were double-counted; subtract the overlap once via inclusion–exclusion.
2. **CIRCLE LINE-UP CONFUSION** — anchor one: (9−1)! = 40,320.
3. (i) combination 15C11 = 15C4 = 1,365 (mirror) · (ii) permutation 8P3 = 336 · (iii) combination 7C3 = 35.
4. BANK the handshake (nC2 lands in <30s), then DUMP/loud-skip the monster — one sure mark beats a probable −0.25 and a stolen minute.
5. 3 live options: EV = ⅓(1) − ⅔(0.25) = 0.333 − 0.167 = **+0.167** — elimination converts guessing from noise into a trade.

---

## ❓ Quiz

**Q1.** Arena Q1 revisited — 7P3 equals:
- (a) 21
- (b) **210 — 7 × 6 × 5: three ordered slots, no repeats; PERMUT(7,3) signs it off in the spreadsheet too**
- (c) 35
- (d) 343

**Q2.** Committee of 5 from 6 men + 4 women with EXACTLY 2 women:
- (a) 2
- (b) **120 — pick the sub-groups AND-glue them: 4C2 × 6C3 = 6 × 20; EXACTLY means one clean product, AT LEAST would summon the complement**
- (c) 252
- (d) 8

**Q3.** The 7-gate radar's FIRST gate before any formula:
- (a) memorize more nCr values
- (b) **ORDER? — the swap-test; gate 1 decides P vs C and every later gate (repeats? restrictions? circle? twins? digits? complement?) only refines that verdict**
- (c) compute 2ⁿ immediately
- (d) draw a pie chart

### ✅ Answers

1. **(b)** — slot-product discipline: r factors starting from n. 210 in under 10 seconds is Arena standard.
2. **(b)** — constraints decompose into small combinations glued by the AND-rule. Grammar is the formula.
3. **(b)** — radar order matters: order → repetition → restrictions → circle → twins → digits → complement. Ten seconds of gates, zero traps.

---

## ✅ Mastery checklist — PP6

- [ ] All 5 traps named + disarm line recited without notes
- [ ] 7-gate radar run on 3 stray questions in ≤10 seconds
- [ ] Inclusion–exclusion stated for overlapping restrictions
- [ ] Triage tiers (BANK/GAMBLE/DUMP) defined with the EV rule
- [ ] Mock Arena completed: ___/10 raw · ___ net after −0.25
- [ ] Every miss tagged with its trap number in the log

---

**Next:** 💼 **PP7 · FINANCE: Counting + Capstone** — audit sampling (52C5 = 2,598,960 ways to pick 5 invoices — this is why random beats gut-feel), coupon-code security (36⁶ = 217.68 crore), UPI PINs & OTPs, portfolio selection vs vendor ranking, and the **Spin & Win Counting Pack** capstone. Counting, now denominated in rupees.
