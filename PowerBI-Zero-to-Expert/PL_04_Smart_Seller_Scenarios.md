# ⚖️ PL4 · Smart-Seller Scenarios: False Weights, Spiked Milk & Free Offers

> A kirana sells rice "AT COST PRICE, BETA, NO PROFIT" — and quietly pockets 11.11%. His trick isn't the price; it's the STONE: 900 grams labeled 1 kg. The bazaar's smartest arithmetic hides in quantities, not tags — selling less than promised, adding free water to paid milk, or wrapping a discount as "FREE!" This module reads those tricks like an auditor (for defense — ShopKart plays legal or doesn't play), and finishes with the alligation rule that prices every mixture in India, from basmati blends to chai patti.

---

## 🎯 Objectives

- Compute **false-weight gains**: gain% = error / (true weight − error).
- Handle **double dishonesty** (cheating while buying AND selling).
- Price **adulteration/mixture sales** (water-in-milk arithmetic).
- Unmask **free offers** as honest discount percentages (buy 4 get 1 = 20%).
- Run **alligation** to hit a target cost (or target profit) in mixtures.

---

## 📘 Concepts

### 4.1 The 900-gram stone (false weight, basic)

Seller uses a 900 g weight marked "1 kg", sells AT cost price per labeled kg:

```
Customer pays for 1,000 g, receives 900 g
Seller's CP covers 900 g; his charge covers "1 kg" at cost-rate
GAIN% = error / delivered = 100/900 = 11.11%
```

**Law:** gain% = (shortfall) / (quantity actually delivered). The label lies; the denominator is what physically left the shop. Pricing AT COST was the misdirection — the weight WAS the profit.

### 4.2 Double dishonesty (cheat on both scales)

Trader buys using an 1,100 g weight (receives extra) and sells using a 900 g weight (delivers short), pricing everything "at cost":

```
Per labeled kg SOLD: receives goods worth 1,100 for every 1,000 he pays,
delivers 900 for every 1,000 he charges.
GAIN% = (1,100 - 900) / 900 = 200/900 = 22.22%
```

Net-net: his cost per 900 g delivered was 900/1,100 of stated — the two cheats stack multiplicatively (1000/1100 × 1000/900 inverted) and the 200/900 shortcut lands the same 22.22%. Exams ask the shortcut; audits ask the chain.

### 4.3 Water-in-milk (adulteration P&L)

Milk at ₹50/L; a vendor slips in 1 L of free water per 4 L milk, sells the mix at ₹50/L "same rate, dudh ka hi daam":

```
CP of 5 L mix = 4 x 50 = Rs 200      SP of 5 L mix = 5 x 50 = Rs 250
GAIN% = 50/200 = 25%
```

The water sold at milk price is pure markup. Ratio form, worth memorizing: **gain% = water-share/milk-share × 100** when selling at the milk label (1/4 share → 25%). ShopKart's QC lab exists precisely so this arithmetic never happens near our shelves — and so we can catch it at vendor gates.

### 4.4 Free-offer masks (the honest-20 disguise)

**"Buy 4, get 1 FREE":** pay for 4, carry 5 → SP_total = 4 units, goods = 5 units.

```
Effective discount = 1/5 = 20%      (NOT 25%!)
25% would be free/paid (1/4) — discount law prices the freebie
against what you TOOK HOME (5), not what you PAID for (4).
```

Twin offers worth ranking: Buy-4-get-1 (20% off) vs "flat 22% off" — the flat 22% actually wins for the customer; the bundle just FEELS happier. Marketing knows. Now you do too.

### 4.5 Alligation: the mixture price-ladder

Blend ₹40/kg rice with ₹60/kg rice so the mix costs ₹50/kg:

```
        dearer - mean : mean - cheaper
        (60-50) : (50-40) = 10:10 = 1:1
ALLIGATION RULE: quantities go INVERSE to their price-distance from the mean.
```

Target-profit version: mix to SELL at ₹55 with 10% profit → required CP = 55/1.1 = ₹50 → same 1:1 blend. Pricing then profit-targeting, one rule: **hit the mean cost, and the margin takes care of itself.** This is literally how blenders price ShopKart's house-brand poha, puffed rice, and trail mixes.

---

## 🧪 LAB — Bazaar-defense reps (10 min)

Denominators = what was DELIVERED. Freebies priced on TAKE-HOME.

1. Stone aged 800 g ("1 kg"), goods priced at cost. Gain%?
2. Buy-3-get-1-free as a discount %? Then buy-2-get-1?
3. Milk ₹48/L, 1 L water per 3 L milk, mix sold at ₹48/L. Gain%?
4. Double-cheat: buys with 1,200 g stone, sells with 800 g stone, "at cost". Gain%?
5. Blend ₹70/kg almonds with ₹110/kg cashews so mix costs ₹90/kg. Ratio? Then the sale-price for a 20% profit target.

**Solutions (hide till done):** 1) 200/800 = **25%** · 2) pay 3, take 4 → 1/4 = **25%** off; pay 2, take 3 → **33.33%** off · 3) CP of 4 L mix = 3 × 48 = ₹144; SP = 4 × 48 = ₹192 → 48/144 = **33.33%** (water/milk ratio 1/3 × 100 ✔) · 4) (1,200 − 800)/800 = **50%** — crime pays well until Legal Metrology arrives · 5) (110−90):(90−70) = 20:20 = **1:1**; sell at 90 × 1.2 = **₹108/kg** for the 20% target.

---

## 💪 Exercises

1. A sweetswala uses a 950 g stone for 1 kg kaju barfi, priced at cost. Quiet gain% (two decimals)?
2. Verdict + one-liner: is "buy 4 get 1 free" better or worse for the customer than "22% flat off"?
3. Milk-case general: water w liters added per M liters milk, sold at milk price — prove gain% = (w/M) × 100 and re-derive the milk answers with it.
4. Rice house-brand: blend ₹36/kg and ₹56/kg so ShopKart's mix retails at ₹50/kg with a 10% margin on selling price. (Hint: margin-on-SP 10% ⇒ CP target = 50 × 0.9 = ₹45.)
5. Ethics memo in two lines: why does the false-weight trick show up in P&L chapters but belong in a compliance manual instead?

### ✅ Selected answers

1. 50/950 = 5.263% ≈ **5.26%** — even a light stone compounds fat over a Diwali season.
2. Worse: bundle = 20% off (pay 4, take 5); flat 22% > 20% → the banner that FEELS better (FREE!) often prices worse — feelings are not denominators.
3. CP of (M+W) L = M × price; SP = (M+W) × price; gain = W×price over M×price → **(W/M) × 100** ✔ — 1/4 → 25%, 1/3 → 33.33% confirmed.
4. CP target ₹45 → alligation: (56−45):(45−36) = 11:9 → **mix cheaper:dearer = 11:9**; then 10% margin delivered at ₹50 — chain check: 45/50 = 90% cost-to-price ratio ✔.
5. Because gain from goods measured false is THEFT of quantity, not commerce of price — the math is the same, the legality is opposite: ShopKart's edge must come from bargaining, not from the stone.

---

## ❓ Quiz

**Q1.** A trader uses a 900 g weight for 1 kg and prices AT cost. True gain%:
- (a) 10%
- (b) **11.11% — 100/900: the shortfall divided by what he actually DELIVERED; the stone lies, the denominator doesn't**
- (c) 11%
- (d) 9.09%

**Q2.** Milk ₹50/L; 1 L free water per 4 L milk; the mix sells at ₹50/L. Profit%:
- (a) 20%
- (b) **25% — the 5 L mix costs 4 × 50 = ₹200 and bills 5 × 50 = ₹250; water sold at milk's label is the purest margin in dairy, at 1/4 × 100 exactly**
- (c) 15%
- (d) 22.5%

**Q3.** "Buy 4, get 1 free" converts to a flat discount of:
- (a) 25%
- (b) **20% — pay 4, carry 5: the freebie divided by TAKE-HOME = 1/5; the 25% myth prices it against what you PAID for, and discount law has never cared about feelings**
- (c) 16.67%
- (d) 10%

### ✅ Answers

1. **(b)** — gain% = error/delivered, always; pricing-at-cost is the misdirection, weight is the profit.
2. **(b)** — ratio reflex: water-share over milk-share. QC-gate worthy.
3. **(b)** — the bundle's discount lives in the take-home denominator; rank offers by it, not by the exclamation marks.

---

## ✅ Mastery checklist — PL4

- [ ] False-weight law applied: error/delivered (11.11%, 25%, 5.26%)
- [ ] Double-dishonesty computed + chain explained (22.22%, 50%)
- [ ] Water-in-milk ratio law derived and reused (25%, 33.33%)
- [ ] Free-offer conversions cold (b4g1 = 20%, b3g1 = 25%, b2g1 = 33.33%)
- [ ] Alligation run to a cost target AND a profit target (1:1, 11:9)
- [ ] Defense-first framing stated (audit vendor gates, never practice)

---

**Next:** 🎓 **PL5 · The Exam Classics** — the four legendary trains: SP doubled → profit tripled (find P% = 100%), ₹450-gains-y% vs ₹300-loses-y% (CP = the midpoint, ₹375), A→B→C chain trades, and the 33-meters-of-cloth riddle (50% exactly). The quiz-setters' greatest hits, archived with full solutions. Classics never ask twice the same way — but they always rhyme.
