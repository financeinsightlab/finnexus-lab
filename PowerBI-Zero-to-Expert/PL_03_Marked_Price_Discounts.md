# 🏷️ PL3 · Marked Price & Discounts: The MRP Game

> Walk into any ShopKart store in Diwali week and you'll see the third price of retail life: the one PRINTED on the sticker. Cost price is what we pay, selling price is what you pay — and **marked price (MP) is what we PRETEND you'll pay** so the 25% discount feels like a festival. CP → mark UP → MP → mark DOWN → SP: the whole game is two multipliers shaking hands. Master the chain today and you'll decode every "FLAT 50% OFF!" banner in the country — including the honest math no banner will ever print.

---

## 🎯 Objectives

- Run the **three-price chain**: CP →(markup m%)→ MP →(discount d%)→ SP, as pure multiplied rates.
- Compute **effective single discounts** for stacks: 20% + 10% = 28% (never 30).
- Solve the classic: **markup needed** so that after d% discount, profit is still p%.
- Compare rival offers (stacked vs single) and spot the better real deal.
- Know the Indian frame: **MRP is a legal maximum**, discounts ride on it, GST is computed on the final transaction price.

---

## 📘 Concepts

### 3.1 The chain and its proof

```
CP -(markup m%)-> MP -(discount d%)-> SP
SP = CP x (1 + m) x (1 - d)      (rates as decimals)

CP 500, markup 60% -> MP = 800; discount 25% -> SP = 600 -> profit = 20%
```

Two multipliers, three prices, one profit. The markup buys elbow room; the discount spends it; the CHAIN decides what's left. Fast audit of any banner: recover the chain, don't trust the exclamation mark.

### 3.2 Discount stacks DON'T add (they multiply)

"Extra 10% off on the 20% off" is NOT 30%:

```
SP/MP = 0.8 x 0.9 = 0.72  -> effective discount = 1 - 0.72 = 28%
LAW: effective = 1 - product(1 - di)      (PC3's a+b+ab/100 in a sari)
```

And the better-deal test: **single 30% vs 20%+10%** → 30% beats the stack (0.70 < 0.72). Bigger headline isn't always bigger discount; the multiplier is the referee. (Mind the direction: for the CUSTOMER, lower final multiplier wins; for the STORE, higher wins.)

### 3.3 The markup-for-wiggle-room classic

"After allowing 10% discount, a trader still gains 20%. His markup on CP was?"

```
0.9 x MP = 1.2 x CP   ->   MP = (1.2/0.9) CP = (4/3) CP   ->  markup = 33.33%
GENERAL: (1+m)(1-d) = 1+p   ->   1+m = (1+p)/(1-d)
p=20, d=10 -> 1.2/0.9 = 4/3 ✔      p=25, d=10 -> 1.25/0.9 = 1.3889 -> 38.89%
```

Read it aloud: **sell-price multiplier ÷ discount survivor = markup multiplier.** The formula prints the sticker; the discount just performs on it. Most kiranas mark up 40–60% precisely so a 25%-off Diwali banner still pays the rent.

### 3.4 ShopKart festive banner (worked, honest version)

Winter jacket: CP ₹800. ShopKart marks up 75% → MP ₹1,400. Big Diwali Sale drops 30% → SP ₹980. Real profit = 980 − 800 = **₹180 = 22.5%** on CP — a genuine deal, since the chain (1.75 × 0.70 = 1.225) is above water. Compare a rival banner: "Up to 60% OFF" on a jacket marked ₹1,999 with CP ₹900 — chain: discounted SP ≈ ₹800 → genuine 11% LOSS-leader pricing to drag footfall. Same festival, opposite intents; the chain exposes both.

### 3.5 The Indian frame (MRP & GST hygiene)

MRP is the **legal ceiling** printed by the manufacturer (Legal Metrology) — selling above it is an offence; discounts ride below it. GST is charged on the **actual transaction value** (post-discount SP), not on MRP: FF-221's ₹47,250 base + 18% = ₹8,505 → ₹55,755 invoice (canon). So in a stacked world: MRP on sticker, discount at till, GST on final — three different prices doing three different jobs, one bill.

---

## 🧪 LAB — Chain reps (10 min)

Chains as multipliers first. Effective rates before comparison.

1. Toaster: CP ₹600, markup 50%, then 20% off. SP and P%?
2. Single 40% vs stack (30% + 10%) — which serves the CUSTOMER better, and by what margin on a ₹1,000 MP item?
3. Markup math: trader offers 12% discount and targets 32% profit. Required markup?
4. Chain-recovery: SP ₹736 after 8% off a marked price that was itself 15% above CP. Find CP.
5. Banner audit: "BUY AT 40% OFF!" on a gadget marked ₹2,000 whose CP is ₹1,300. True P% for the store?

**Solutions (hide till done):** 1) 600 × 1.5 × 0.8 = ₹720 → **20% profit** · 2) single 40%: pay 600; stack: pay 1,000 × 0.7 × 0.9 = 630 → **single wins by ₹30** (0.60 < 0.63) · 3) 1+m = 1.32/0.88 = 1.5 → **markup 50%** · 4) MP = 736/0.92 = 800; CP = 800/1.15 ≈ **₹695.65** (setters' numbers aren't always round — chain-recovery only needs ordered division) · 5) SP = 1,200 → loss ₹100 → **7.69% loss** — a real clearance bleed, not a trick.

---

## 💪 Exercises

1. Mixer: CP ₹1,000, markup 80%, festive 45% off. SP and the honest P%?
2. Triple stack: 20% + 10% + 5% on an MRP of ₹5,000. Effective single discount and final SP?
3. Markup classic: discount 20%, target profit 25%. Markup on CP? (Formula + the 4-option gut-check.)
4. Which deal is better for the buyer: (A) straight 35% off, or (B) 25% + 15%? Show final multipliers.
5. ShopKart wants the jacket chain (CP ₹800) to show "40% OFF" while keeping markup 75% law. Final SP and P% — and the one-line ethics read on the banner's honesty.

### ✅ Selected answers

1. 1,000 × 1.8 × 0.55 = **₹990** → **1% loss** — the deep discount ate the entire fat markup (banners can bleed for real).
2. 0.8 × 0.9 × 0.95 = 0.684 → **31.6% effective**; SP = 5,000 × 0.684 = **₹3,420**.
3. 1+m = 1.25/0.8 = 1.5625 → **markup 56.25%** — gut-check: markup must EXCEED 45% (the naive 25+20), always, because the discount bites a bigger base (MP).
4. A: 0.65; B: 0.75 × 0.85 = 0.6375 → **B is better for the buyer** (63.75% pay-load → 36.25% effective) — stacks CAN beat singles; compute, don't assume.
5. 800 × 1.75 × 0.60 = **₹840 → 5% profit**; ethics: the 40%-off banner is technically true yet still profitable — the markup was the room the discount danced in (and P&L honesty means we can say so on an internal memo).

---

## ❓ Quiz

**Q1.** Successive discounts 20% + 10% equal ONE discount of:
- (a) 30%
- (b) **28% — 1 − 0.8 × 0.9: multipliers carry discounts, and every stack undercuts its own headline sum because the second cut bites a shrunken base**
- (c) 32%
- (d) 15%

**Q2.** After a 10% discount, a trader still earns 20%. His markup on CP was:
- (a) 30%
- (b) **33.33% — 0.9 × MP = 1.2 × CP ⇒ MP = 4/3 CP: markup one-third above cost buys exactly enough room to perform a 10% festival and bank 20%**
- (c) 20%
- (d) 32%

**Q3.** CP ₹500, marked up 60%, then 25% off. Final SP and the verdict:
- (a) ₹600, 20% profit — 500 × 1.6 × 0.75 = 600; the chain runs costs→sticker→till→truth in two multiplies
- (b) **₹600, 20% profit — 500 × 1.6 × 0.75 = 600; the chain runs cost → sticker → till in exactly two multiplies, and 1.2 survives the math**
- (c) ₹700, 40% profit
- (d) ₹500, break-even

### ✅ Answers

1. **(b)** — stacks multiply; headlines add; trust the multipliers.
2. **(b)** — (1+p)/(1−d) is the sticker-printer formula: 1.2/0.9 = 4/3.
3. **(b)** — note the (a)/(b) twin here guards the classic "40% profit" daydream: markup 60% minus discount 25% is NOT 35% profit; it's whatever the multipliers say: 1.2.

---

## ✅ Mastery checklist — PL3

- [ ] Three-price chain driven as two multipliers (500→600 walk)
- [ ] Stack math: effective = 1 − Π(1−dᵢ) computed for 2 and 3 layers
- [ ] Markup-for-wiggle formula (1+p)/(1−d) applied (33.33%, 50%, 56.25%)
- [ ] Customer-vs-store better-deal direction stated correctly (lower pay-load wins for buyer)
- [ ] Chain-recovery by ordered division (SP→MP→CP)
- [ ] MRP/GST frame stated (India: MRP ceiling, GST on final transaction)

---

**Next:** ⚖️ **PL4 · Smart-Seller Scenarios: False Weights, Spiked Milk & Free Offers** — the 900-gram stone (11.11% secret gain), milk that lactose-intolerant accountants can't catch (25% on water), buy-4-get-1 masks (20%, not 25!), and the alligation split that prices rice mixtures. The cunning side of the bazaar — learned for defense, never for practice.
