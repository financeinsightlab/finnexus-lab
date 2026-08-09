# 🏅 PP2 · Permutations: Order Rules — Every Arrangement Counts

> Gold, silver, bronze. Three medals, eight ShopKart staffers, one podium. Swap Priya and Rohan's medals and the ceremony CHANGES — photos, bonuses, bragging rights, everything. When the outcome depends on who's in which slot, you're in **permutation** territory: counting arrangements where ORDER is the whole game. Today we weaponize the slot-product from PP1 into the nPr formula, tame factorial-sized line-ups, and shut down the classic exam fraud: words with repeated letters.

---

## 🎯 Objectives

- Define a **permutation**: an ordered arrangement of r items drawn from n distinct items.
- Derive and wield **nPr = n! / (n−r)!** as the slot-product n × (n−1) × ... (r slots).
- Count **full line-ups** (n!) and **repetition-allowed codes** (nʳ).
- Apply the **repeated-items law**: n! / (p! q! ...) when some items are identical.
- Drive Excel: `PERMUT` vs `PERMUTATIONA`, plus `FACT`.

---

## 📘 Concepts

### 2.1 The slot-product becomes a formula

Podium problem: 8 staff, 3 ranked medals.

```
[gold][silver][bronze] = 8 x 7 x 6 = 336 outcomes
```

Three slots, shrinking supply. Mathematicians package this as **8P3**. General law:

```
nPr = n! / (n - r)!        (r ordered picks from n distinct, no repeat)
     = n x (n-1) x ... x (n-r+1)    <- the slot-product, r factors
```

Check the machinery: 8P3 = 8! / 5! = 40,320 / 120 = 336 ✔. The full line-up count n! is just nPn — every slot filled.

**Memory hook:** P for PODIUM. If rearranging the same people gives a different headline, permute.

### 2.2 The four questions every permutation answers

| Scenario | Answer | Why |
|---|---|---|
| 5 books arranged on a shelf | 5! = 120 | full line-up |
| 3 trophies for 12 cricketers | 12P3 = 1,320 | ranked, no repeat |
| 4-digit PIN, digits repeat OK | 10⁴ = 10,000 | slots with repetition: nʳ |
| 4-digit PIN, no digit repeats | 10P4 = 5,040 | slots without repetition |

Notice the two code styles: repetition allowed → nʳ (slots stay fat); repetition banned → nPr (slots shrink). The exam hides this in the words "distinct", "unique", "no digit repeats".

### 2.3 Excel's PERMUT duo

```
=PERMUT(8,3)        -> 336      order matters, NO repeats
=PERMUTATIONA(8,3)  -> 512      order matters, repeats ALLOWED (8^3)
=FACT(8)            -> 40,320
```

Read "PERMUTATIONA" as "permutations AGAIN" — repetition allowed. The number gap between the two (512 vs 336) is exactly the exam's favorite temptation: half the hall picks the wrong twin.

### 2.4 Word factory: repeated letters, the great divider

Arranging the 8 letters of **SHOPKART** (all distinct): 8! = **40,320** banner strings.

But **KIRANA**? Six letters, yet A appears twice. Two A's are placebos — swapping them changes nothing visible. Law: **divide out every repeated letter's internal shuffles.**

```
distinct-word count = n! / (p! q! r! ...)   p,q,r = repetition counts
```

| Word | Letters & repeats | Count |
|---|---|---|
| SHOPKART | 8, all distinct | 8! = 40,320 |
| KIRANA | 6, A×2 | 6!/2! = 360 |
| EXCEL | 5, E×2 | 5!/2! = 60 |
| BANANA | 6, A×3, N×2 | 6!/(3!2!) = 60 |
| COMMERCE | 8, C×2, M×2, E×2 | 8!/(2!2!2!) = 5,040 |
| MISSISSIPPI | 11, I×4, S×4, P×2 | 11!/(4!4!2!) = 34,650 |

Sanity-proof for KIRANA: list all 720 shuffles of the six "labeled" letters; every visible word appears exactly 2! times (A₁↔A₂). 720 ÷ 2 = 360 ✔. Divide by the ghost-shuffles of every repeating twin.

### 2.5 Worked ShopKart shelf problem

Rakesh wants 5 distinct festive product facings in a row at the entrance, chosen from 9 candidate SKUs, arrangement matters (eye-level first):

```
[ slot1 ][ slot2 ][ slot3 ][ slot4 ][ slot5 ]
    9   x   8   x   7   x   6   x   5   = 9P5 = 15,120 displays
```

If instead the ask was "same 5 SKUs, any order — we just need the set", order vanishes and we divide by 5! — that refund is PP3's entire business model.

---

## 🧪 LAB — Arrangement reps (10 min)

Slot diagrams first, formula second.

1. **Photo line-up:** 4 of ShopKart's 7 cashiers pose in a row for the annual report. How many photos?
2. **Word bench:** arrangement counts of DELHI (5 distinct letters) and of ROHINI (I×2).
3. **Locker codes:** 3-digit locker codes at the Saket store, digits may repeat vs may NOT repeat. Both.
4. **Podium check:** PERMUTATIONA(10,4) minus PERMUT(10,4). Interpret the gap in one line.
5. **Banner board:** the word SHOPKART on a flex — how many strings start AND end with a vowel? (Vowels: O, A. Endpoints locked as vowels.)

**Solutions (hide till done):** 1) 7P4 = 840 · 2) 5! = 120; 6!/2! = 360 · 3) 10³ = 1,000 vs 10×9×8 = 720 · 4) 10,000 − 5,040 = **4,960** — the repetition premium · 5) endpoints: 2 × 1; middle six: 6! = 720; total 2 × 720 = **1,440**.

---

## 💪 Exercises

1. Compute 10P2 without a calculator, then with a calculator, then state the slot logic.
2. Arrangements of the letters E-X-C-E-L?
3. District sports day: 12 runners, medals for gold/silver/bronze. Outcomes?
4. COMMERCE letter-arrangement count, and a one-line justification of every factorial you divided by.
5. Excel check: PERMUT(7,3), PERMUTATIONA(7,3), FACT(7) — predict each BEFORE typing.

### ✅ Selected answers

1. 10 × 9 = **90** — two ordered slots, second slot starved by one.
2. 5!/2! = **60** (E repeats twice).
3. 12P3 = 12 × 11 × 10 = **1,320**.
4. 8!/(2!2!2!) = **5,040** — divide by 2! for the C-twins, the M-twins, and the E-twins; each pair's internal flip spells the same word.
5. 210, 343, 5,040 — no-repeat shrink, repeat cube, full line-up.

---

## ❓ Quiz

**Q1.** 7 distinct books arranged on a shelf:
- (a) 2,520
- (b) **5,040 — full line-up = 7!; every slot feeds the next one's starvation: 7×6×5×4×3×2×1**
- (c) 40,320
- (d) 720

**Q2.** Arrangement count of the letters K-I-R-A-N-A:
- (a) 720
- (b) **360 — 6!/2!: the double-A ghosts get divided out; labeled shuffles 720, visible words 360**
- (c) 180
- (d) 120

**Q3.** Gold/silver/bronze among 8 ShopKart staff:
- (a) 56
- (b) **336 (8P3 = 8×7×6) — medals are RANKED, so the swap-test screams permutation; the unordered committee version comes in PP3 at just 56**
- (c) 512
- (d) 24

### ✅ Answers

1. **(b)** — n distinct items in a row = n!. Know your ladder cold.
2. **(b)** — repeat-reflex: count labeled, divide by each twin's shuffles.
3. **(b)** — podium = permutation. Keep the 336-vs-56 pair pinned to your memory wall; it's the entire PP2↔PP3 bridge.

---

## ✅ Mastery checklist — PP2

- [ ] nPr derived as slot-product, n!/(n−r)! verified once by hand
- [ ] Full line-up = n! recalled instantly
- [ ] nʳ vs nPr split (repetition allowed vs banned) stated in one line
- [ ] Repeated-letters law applied (KIRANA 360, MISSISSIPPI 34,650)
- [ ] Excel duo: PERMUT vs PERMUTATIONA predicted correctly
- [ ] Vowel-endpoint restriction solved (1,440) with slots-first discipline

---

**Next:** 🗳️ **PP3 · Combinations: Just Pick, Don't Line Up** — what happens when order DIES: nCr = nPr ÷ r!, the mirror law (nCr = nC(n−r)), committees with constraints, handshakes, diagonals, and Excel's COMBIN gang. The 336 → 56 refund, explained forever.
