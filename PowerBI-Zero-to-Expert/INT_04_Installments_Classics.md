# 🎯 INT4 · Installments & the Time Classics
> Two eternal exam families, both defeated by one idea: **money has a timestamp**. ₹8,820 next year is not ₹8,820 today — discount it, and two "rupees-the-same" installments reveal a ₹16,400 principal. Then the k-fold laws: SI obeys **R·T = 100(k − 1)**, CI obeys **doubling chains** — and suddenly "time, rate, and multiples" questions collapse into one line each.

## 🎯 Objectives
- Price any installment plan by **discounting each payment** to today: P = x/(1+r) + x/(1+r)² + …
- Audit a loan **roll-forward**: interest, pay, carry — balance must hit zero exactly.
- Execute SI k-fold classics ("doubles in t years", "k times itself") with **R·T = 100(k − 1)** in both directions.
- Execute CI **multiplier chains**: repeated doubling/tripling via powers, and the relationship doubling-time ×3 = octupling-time.
- Install the reflex: installments are **never added** — they're discounted or roll-forwarded.

## 📘 Concepts

### 4.1 The installment PV — discount, never add
A vendor sells ShopKart a display fridge on "2 equal annual installments of **₹8,820**, interest 5% CI." What's the fair cash price — i.e., the **principal** this plan really replaces?

```text
₹8,820 paid in 1 year is worth  8,820 / 1.05  = ₹8,400 today
₹8,820 paid in 2 years is worth 8,820 / 1.1025 = ₹8,000 today
Fair cash price (principal) = 8,400 + 8,000 = ₹16,400
```

Adding the installments (₹17,640) prices future money at today's value — the **installment-addition trap**, the single most common error in this entire course. Future rupees get divided by (1+r)ⁿ, then — and only then — added.

### 4.2 The roll-forward audit — proving the pricing
Reverse direction to *verify*: lend ₹16,400 at 5% CI, collect ₹8,820 twice, and the ledger must close at zero:

| Moment | Math | Balance |
|---|---|---|
| Start | borrow | 16,400 |
| + 1 year | ×1.05 | 17,220 |
| pay 8,820 | − 8,820 | 8,400 |
| + 1 year | ×1.05 | 8,820 |
| pay 8,820 | − 8,820 | **0 ✓** |

That zero is the seal. When an option's PV and roll-forward disagree, the option is wrong — this audit is 20 seconds and catches everything. (Bro-tip: the middle balance ₹8,400 mirroring the first PV is no accident — one remaining 1-year payment of 8,820 prices at 8,820/1.05.)

### 4.3 The equal-installment formula (2-year pattern)
For two equal installments at rate r:

```text
P = x/(1+r) + x/(1+r)²      or solved for x: x = P · r(1+r)² / ((1+r)² − 1)
```

Canonical ladder at 10%: installment ₹1,210 ↔ principal ₹2,100 (1,100 + 1,000). Recognize the pairs 1,100/1,000, 8,400/8,000 — exam authors recycle these decimals mercilessly, and the pattern-spot saves 60 seconds.

### 4.4 SI k-fold classics — one law, both directions
Under SI, for the principal to become **k times** itself, interest must equal (k − 1) principals:

```text
P·R·T/100 = (k − 1)P   ⇒   R·T = 100(k − 1)
```

- "Doubles (k = 2) in 10 y" → R = 100×1/10 = **10%**.
- "Amounts to 4× in 12 y" → R = 100×3/12 = **25%**.
- Rate 20%: doubles in 5 y, triples in 10 y, quadruples in 15 y — add a doubling-per-5. **Linear in k**, because the engine is flat.
- Sneaky variant: "₹A amounts to ₹B in t years" → k = B/A first, then the law. Never skip the k-extraction.

### 4.5 CI multiplier chains — powers, not multiples
CI doubles per fixed window, then **compounds the windows**:

- Doubles every 4 y ⇒ 16 y = 4 doublings = 2⁴ = **×16** (not ×4 — the classic blunder).
- Triples every 5 y ⇒ 15 y = 3³ = **×27**.
- "Becomes 8× in 6 y" ⇒ 8 = 2³ ⇒ doubles every 2 y ⇒ in 12 y, ×2⁶ = 64.
- Cross-check with the 72 club: doubling every 4 y ⇒ r ≈ 18%, so ×16 in 16 y at 18% — consistent (1.18¹⁶ ≈ 14.1, the rule approximates; chains are exact).

SI adds multiples (k linear in T); CI powers multiples (k exponential in T). Say the engine name out loud before choosing the law — that's the ENGINE-ID gate from the Arena.

### 4.6 EMI bridge (the INT6 teaser)
Monthly installments at monthly rests = the same discounting law run 60 times, solved once: EMI = P·i(1+i)ⁿ/((1+i)ⁿ − 1). ShopKart's van loan ₹5,00,000 @ 12% (i = 1%/mo, n = 60) → EMI ≈ **₹11,122**. INT6 splits every such EMI into its interest/principal braid — for now, recognize the formula as our PV ladder in stereo.

## 🧪 LAB — Timestamp shift (10 min)
1. PV these at 5% CI: ₹6,300 in 1 y + ₹5,512.50 in 2 y. (Decimals behave — trust division.)
2. Roll-forward audit: does paying ₹6,050/yr × 2 at 10% clear a ₹10,500 loan? Show the ledger to the zero (or the gap).
3. SI: a sum doubles in 8 y. Rate? In how many years does it triple?
4. CI: money doubles every 5 y. Multiple after 20 y? After 25 y?
5. "₹12,000 amounts to ₹24,000 in 10 y (SI)." Rate? Then redo with CI eyes: doubling in 10 y ⇒ ~7.2% — why do the answers differ?

**Why this matters:** installments + k-folds are 40% of the interest chapter's exam weight, and both are one-law jokes once the timestamp religion lands.

**🔑 Lab answers:** (1) 6,300/1.05 = 6,000; 5,512.50/1.1025 = 5,000 → **₹11,000** (2) 10,500 ×1.1 = 11,550 − 6,050 = 5,500; ×1.1 = 6,050 − 6,050 = **0 ✓ clears exactly** (3) R = 100/8 = **12.5%**; triple ⇒ k−1 = 2 ⇒ T = 200/12.5 = **16 y** (linear in k, SI-law) (4) 20/5 = 4 doublings → **×16**; 25/5 = 5 → **×32** (5) SI: 12,000×R×10/100 = 12,000 → **R = 10%**. CI: 72/10 = 7.2%. They differ because CI's growth itself grows — flat 10% and compound 7.2% reach the same 10-year station by different roads.

## 💪 Exercises
1. Two annual installments of ₹12,100 at 10% CI — principal? (Pattern-spot 4.3 before computing!)
2. Fair cash price: ₹9,000 today + ₹11,000 in 1 y + ₹12,100 in 2 y, all at 10%.
3. Roll-forward: loan ₹25,000, 10% CI, pay ₹15,000 after year 1 — balance entering year 2? What single payment closes year 2?
4. SI classics: (i) triples in 16 y → rate; (ii) 15% ⇒ quadruples in ___ y; (iii) amounts to ₹4.5× in 14 y → rate.
5. CI chains: (i) doubles every 3 y → 12 y multiple; (ii) becomes ×32 in 20 y → doubling window; (iii) triples every 4 y → 8 y multiple.
6. Trap drill: vendor offers fridge "₹19,200 installment plan: ₹9,900 × 2 years" at 5% CI. Compute the honest cash price, then name the trap in the ₹19,200 figure.
7. EMI bridge: van loan ₹5,00,000, i = 1%/mo, n = 60. Given (1.01)⁶⁰ ≈ 1.8167, compute EMI ≈ 5,000 × 1.8167 / 0.8167 and confirm the canon ₹11,122. First month's interest (balance × 1%)? Principal part?

### ✅ Selected answers
1. ₹12,100 = ₹1,210 × 10 ⇒ PV = ₹2,100 × 10 = **₹21,000** (12,100/1.1 + 12,100/1.21 = 11,000 + 10,000 ✓).
2. 9,000 + 11,000/1.1 + 12,100/1.21 = 9,000 + 10,000 + 10,000 = **₹29,000**.
3. 25,000 × 1.1 = 27,500 − 15,000 = **₹12,500**; closer = 12,500 × 1.1 = **₹13,750**.
4. (i) R = 100×2/16 = **12.5%** (ii) T = 300/15 = **20 y** (iii) k − 1 = 3.5 → R = 350/14 = **25%**.
5. (i) 2⁴ = **×16** (ii) 32 = 2⁵ ⇒ doubling window 20/5 = **4 y** (iii) 3² = **×9**.
6. 9,900/1.05 + 9,900/1.1025 = 9,428.57 + 8,979.59 = **₹18,408** honest price; "₹19,200" is raw addition — **installment-addition trap**, ₹792 of fictional value.
7. EMI = 5,000 × 2.2245 ≈ **₹11,122** ✓; month-1 interest = 5,00,000 × 0.01 = **₹5,000**; principal = **₹6,122**; new balance ₹4,93,878. The braid begins — INT6 untwists all 60 months.

## ❓ Quiz
1. A fridge sells on 2 annual installments of ₹8,820 each at 5% CI — the fair cash price (principal):
   - (a) ₹17,640 (just add the installments)
   - (b) ₹16,400 — 8,820/1.05 = 8,400 and 8,820/1.1025 = 8,000; discount the future, never add it
   - (c) ₹16,800
2. Under SI, money doubles in 10 years. The rate:
   - (a) 7.2%
   - (b) 10% — doubling means interest = P, so R·T = 100(k−1) = 100; R = 100/10
   - (c) 20%
3. CI doubles every 4 years. In 16 years money multiplies by:
   - (a) ×4
   - (b) ×16 — 16/4 = 4 doublings, 2⁴ = 16; k-folds are powers, not multiples
   - (c) ×8

### ✅ Answers
1. **(b)** — option (a) is the installment-addition trap in uniform; timestamp every rupee.
2. **(b)** — 7.2% is the CI answer (72 club) for a different engine; SI obeys R·T = 100(k−1).
3. **(b)** — each window multiplies the pile by 2, and windows stack in the exponent: 2, 4, 8, 16.

## ✅ Mastery checklist
- [ ] Future installments get divided by (1+r)ⁿ before any addition — reflex level
- [ ] My roll-forward audits land on ₹0.00 and I trust them over options
- [ ] The 1,100/1,000 and 8,400/8,000 installment patterns flash on sight
- [ ] R·T = 100(k − 1) runs forward and backward in my head
- [ ] Doubling chains come out as powers (×16 in 16 y, not ×4)
- [ ] I can state R·T=100(k−1) vs 72-club side by side and name which engine owns which

**Next:** **INT5 · Traps, Triage & Mock Arena** — the five named interest traps, the 5-gate radar, and Paper INT-01 under negative marking. Two engines walk in; one survivor walks out! ⚡
