# 🗳️ PP3 · Combinations: Just Pick, Don't Line Up

> Three-person promo squad needed from ShopKart's 8 store staff. Does it matter if we announce "Priya, Rohan, Ajay" or "Ajay, Rohan, Priya"? The squad is the SAME squad — no ranks, no podium, just three names on a poster. The moment ORDER dies, permutations overcount like crazy (each squad gets counted 3! = 6 times!). **Combinations are permutations with the ghost-orders refunded.** This one refund — divide by r! — powers committees, handshakes, diagonals, audit samples, and half of every banking exam's quant section.

---

## 🎯 Objectives

- Define a **combination**: an unordered selection of r items from n distinct items.
- Drive **nCr = nPr ÷ r! = n! / (r! (n−r)!)** and the **swap-test** that picks P vs C.
- Apply the **mirror law**: nCr = nC(n−r) — pick who LEAVES instead of who stays.
- Solve **committee problems**: exactly/at-least constraints via sub-selection AND-gluing.
- Know the classics: handshakes = nC2, polygon diagonals = nC2 − n, cards and spades.
- Excel: `COMBIN` vs `COMBINA`.

---

## 📘 Concepts

### 3.1 The refund: why we divide by r!

Promo squad: 3 from 8 staff, no ranks. Start with the PP2 machine: 8P3 = 336 counts every squad once per internal ordering. But {Priya, Rohan, Ajay} was counted as 6 different "arrangements" (3! ghosts). Refund time:

```
8C3 = 8P3 / 3! = 336 / 6 = 56 squads

nCr = nPr / r!  =  n! / ( r! (n - r)! )
```

**The swap-test (pin it to your wall):** pick any outcome, swap two of the picked items. Outcome changed? → **Permutation** (medals, PINs, rankings). Outcome identical? → **Combination** (squads, samples, subsets). One swap settles the P-vs-C debate forever.

### 3.2 nCr arithmetic without tears

```
10C3 = (10 x 9 x 8) / (3 x 2 x 1) = 720 / 6 = 120
```

Write r descending factors on top, r! below, CANCEL before multiplying. The slot-product is refunding on the fly.

### 3.3 The mirror law: nCr = nC(n−r)

Picking 11 cricketers to PLAY from 15 is identical to picking 4 to REST:

```
15C11 = 15C4 = (15 x 14 x 13 x 12) / (4 x 3 x 2 x 1) = 32,760 / 24 = 1,365
```

Always flip to the smaller r before touching arithmetic. 12C9 → 12C3 = 220 in one line. The mirror law is PC2's "division-multiplier" wearing a combinatorics kurta: same number, cheaper road.

### 3.4 The two classics (memorize like your DOB)

**Handshakes.** Every handshake = an unordered pair of people → nC2.

```
10 staff at the Saket meet-and-greet: 10C2 = 45 handshakes
```

**Polygon diagonals.** Every vertex-pair gives a line; subtract the n sides:

```
Octagon: 8C2 - 8 = 28 - 8 = 20 diagonals
```

### 3.5 Committees with constraints (AND-gluing sub-selections)

**ShopKart festive committee:** 5 members from 6 men AND 4 women, with EXACTLY 3 men.

```
Pick the men:    6C3 = 20
Pick the women:  4C2 = 6
Glue (AND):      20 x 6 = 120 committees
```

Read the grammar: "exactly 3 men" forces (3 of 4 women too) — each constraint is its own little combination, and the PP1 AND-rule multiplies them. **Cards warm-up:** 2 spades from a deck = 13C2 = **78** (the full 52C5 = 2,598,960 monster gets its own scene in PP7's audit lab).

### 3.6 Excel's COMBIN gang

```
=COMBIN(10,3)   -> 120    unordered, NO repeats
=COMBINA(4,3)   -> 20     unordered, repeats allowed (multi-sets)
```

COMBINA(4,3) counts ways to pick 3 identical chocolates from 4 flavors, repeats welcome — formula C(n+r−1, r) = 6C3 = 20. Useful for stock-count problems, rare in exams, glorious on dashboards.

---

## 🧪 LAB — Selection reps (10 min)

Swap-test first. Mirror law always.

1. **Audit squad:** choose 3 of ShopKart's 8 staff to verify Cash vs Books at Rohini. How many squads?
2. **Mandatory Ajay:** same squad, but Ajay MUST be in. (Hint: lock him, pick the rest.)
3. **Ajay boycott:** same squad, Ajay EXCLUDED. Now add Q2 + Q3 — what should it equal and why?
4. **Handshake city:** 12 investors at the funding meet greet everyone once. Handshakes?
5. **Committee count:** 5-member team from 6 men + 4 women with exactly 2 WOMEN this time.

**Solutions (hide till done):** 1) 8C3 = **56** · 2) lock Ajay, pick 2 of 7: 7C2 = **21** · 3) 7C3 = **35**; 21 + 35 = 56 ✔ (every squad either has Ajay or not — OR-rule validates the partition) · 4) 12C2 = **66** · 5) 4C2 × 6C3 = 6 × 20 = **120**.

---

## 💪 Exercises

1. Compute 9C2 using descending-product-over-r!.
2. 12C9 the FAST way — show the mirror flip.
3. 12 people, one handshake per pair — count it, then say which classic you used.
4. Diagonals of an octagon — line-by-line derivation.
5. From a deck, choose any 2 spades. Count, and state which slot of the course meets the "any 2 of all 52" version (hint: PP7 audit lab).

### ✅ Selected answers

1. (9 × 8)/(2 × 1) = **36**.
2. 12C9 = 12C3 = (12 × 11 × 10)/6 = **220** — pick who sits out, same count.
3. 12C2 = **66** — handshakes are unordered pairs.
4. 8C2 − 8 = 28 − 8 = **20** — every vertex-pair is a line; the 8 sides aren't diagonals.
5. 13C2 = **78**; the 5-of-52 version is 52C5 = 2,598,960 — PP7's audit sampling star.

---

## ❓ Quiz

**Q1.** A 3-person promo squad from 8 staff (no ranks):
- (a) 336
- (b) **56 — 8C3: same three people, one squad; divide 8P3 by 3! to vaporize the six order-ghosts**
- (c) 24
- (d) 6

**Q2.** We divide nPr by r! because:
- (a) it's a textbook tradition
- (b) **every selection was counted r! extra times — once per internal ordering of the picked r items; dividing refunds those ghosts; ABC and BCA are ONE committee**
- (c) it makes the numbers smaller
- (d) Excel demands it

**Q3.** 15C11 (15 choose 11) the fast way:
- (a) compute all 15 descending factors
- (b) **mirror to 15C4 = 1,365 — nCr = nC(n−r): choosing 11 to take IS choosing 4 to leave behind; always flip to the smaller r**
- (c) 15 × 11 = 165
- (d) 11C15 = 0

### ✅ Answers

1. **(b)** — podium ordered (336) vs squad unordered (56): one refund, whole chapter.
2. **(b)** — r! is the ghost-multiplier. See it once, never overcount again.
3. **(b)** — the mirror law is pure laziness of the noble kind: same answer, quarter of the arithmetic.

---

## ✅ Mastery checklist — PP3

- [ ] nCr stated as nPr ÷ r! with the ghost story attached
- [ ] Swap-test applied to classify three fresh scenarios
- [ ] Mirror law used to dodge big r (12C9 → 220)
- [ ] Handshakes (nC2) and diagonals (nC2 − n) recalled cold
- [ ] Constraint committees AND-glued (exactly-3-men = 120)
- [ ] Mandatory/excluded partition validated (21 + 35 = 56)
- [ ] COMBIN vs COMBINA distinction stated

---

**Next:** 🚧 **PP4 · Restrictions & Circles** — the rule-breakers: friends who MUST sit together (glue them!), rivals who REFUSE to (total − together), vowels demanding adjacency, and the round table where 8! collapses to 7!. Where counting meets drama.
