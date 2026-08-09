# 💼 PP7 · FINANCE: Counting Rupees + Capstone — Audit, Promo & Portfolio Math

> Every P&C formula you now own has a rupee-denominated day job. Auditors sample invoices because checking all of them costs a fortune — and 52C5 = 2,598,960 possible samples is WHY random beats the manager's "pick the fat files" gut. Your UPI PIN is a 10,000-possibility lock; your OTP is a 10-lakh lock; a 6-character coupon code is a 217-crore fortress. Fund houses pick 3 schemes from 10 shortlists; credit teams rank vendors. This finale turns counting into **compliance, security, and marketing ROI** — and closes with a capstone pack that puts the whole course to work on one ShopKart festive promo.

---

## 🎯 Objectives

- Frame **audit sampling** as combinations — and defend why random sampling crushes convenience sampling.
- Size **security search-spaces**: UPI PINs, OTPs, passwords, coupon codes (slot-product math, choices^length).
- Split **selection vs ranking** in finance: portfolios combine (nCr), leaderboards permute (nPr).
- Count **product-configuration spaces**: EMI tenures × rate slabs × insurers.
- Deliver the **capstone**: ShopKart Spin & Win Counting Pack with a one-page decision memo.

---

## 📘 Concepts

### 7.1 Audit sampling: the 2.6-million-way defense

ShopKart's statutory auditor must sample 5 vendor invoices from 52 received this quarter. How many distinct samples exist?

```
52C5 = (52 x 51 x 50 x 49 x 48) / 120 = 2,598,960 samples
```

Over **25 lakh** possible 5-invoice bundles. This number is the auditor's shield: with that many samples, "the manager conveniently chose only clean files" becomes statistically indefensible — every bundle was equally likely, bias has nowhere to hide. In Excel: `=COMBIN(52,5)` → 2,598,960. (GST audit warm-up: 5 of 12 suppliers = 12C5 = **792** — small-team sampling, same law.)

### 7.2 Security search-spaces: PINs, OTPs, passwords, coupons

The slot-product from PP1 is the world's cheapest security audit:

```
UPI PIN (4 digits, repeats OK):        10^4  = 10,000
Delivery OTP (6 digits):               10^6  = 10,00,000 (10 lakh)
6-char coupon (36 alphanumeric):       36^6  = 2,176,782,336  ~ 217.68 crore
8-char password (36 chars):            36^8  = 2,821,109,907,456  ~ 2.82 lakh crore
```

**Law:** each extra position multiplies the moat by the alphabet size. One more digit on the OTP = ×10; one more character on the coupon = ×36. When marketing proposes a 4-character coupon ("looks cute"), your answer is a number, not an opinion: 36⁴ = 16.8 lakh — brute-forceable by a laptop in a chai break. Demand 6+.

### 7.3 Selection vs ranking: the finance twin-set

```
PICK 3 debt funds from a 10-fund shortlist (a portfolio):  10C3 = 120
RANK the top 3 vendors from 10 (podium matters):           10P3 = 720
PICK 4 stocks from a 20-name watchlist:                    20C4 = 4,845
```

Same shortlist, different question. The swap-test tells you which meeting you're in: swap two holdings in the portfolio — same portfolio (nCr). Swap two podium vendors — different bonus pool (nPr). (Fresh Farms vendors, take note: FF's payment-priority ranking from LR7 is permutation business.)

### 7.4 Configuration spaces: EMI plans & product variants

A NBFC offers 5 tenures × 4 rate slabs = **20 EMI plans**; add 2 partner insurers → 40 bundles. When sales says "we have soooo many options," the counter is a slot diagram, not a vibe. Keeps product catalogs honest and pivot tables sized correctly.

### 7.5 The lottery honesty check (marketing ethics by number)

A rival mart runs "pick 6 lucky SKUs of 49, win a scooter": 49C6 = **13,983,816** combos — a 1-in-139.83-lakh shot. Your compliance memo writes itself: the "lucky draw" is honest arithmetic in a glitter costume. ShopKart's own promo (capstone below) is designed with visible, capped odds — which is precisely why you can defend it.

---

## 🧪 LAB — Finance counting reps (12 min)

1. Branch audit plan: choose 2 of ShopKart's 6 branches for a surprise cash-verification visit. Plans?
2. GST season: pick 3 of 12 suppliers for input-tax-credit document sampling. Samples?
3. Vendor leaderboard: rank the top 3 of ShopKart's 8 fresh-vendor shortlist (bonus ladder follows rank). Outcomes?
4. Loan marketplace: 5 tenures × 4 slabs × 2 insurers — bundle count?
5. Coupon upgrade: move from 6-char to 7-char codes (alphabet still 36). New space, and the multiplier over the old?

**Solutions (hide till done):** 1) 6C2 = **15** · 2) 12C3 = **220** · 3) 8P3 = **336** — rank matters (podium!) · 4) 5×4×2 = **40** · 5) 36⁷ = 78,364,164,096 ≈ **783.64 crore**, exactly ×36 the 217.68-crore space.

---

## 💪 Exercises

1. Verify 52C5 = 2,598,960 with descending-product-over-5! cancellation, then confirm with `=COMBIN(52,5)`.
2. A 10,000-attempt attacker fires random 6-char coupon codes. Winners live in a 217.68-crore space with exactly 1,00,000 seeded codes. Approximate the hit-rate per attempt (percentage, two decimals).
3. Rank-vs-pick drill in one line each: (i) choose 4 of 20 watchlist stocks, (ii) declare gold/silver/bronze of those 20.
4. The 2.6-million-sample figure is the auditor's shield — explain why in two sentences.
5. Derangement drill: ShopKart's 6-staff Secret Santa (self-gifting illegal). Valid draws?

### ✅ Selected answers

1. (52×51×50×49×48)/120 = 311,875,200/120 = **2,598,960** ✔ spreadsheet concurs.
2. 1,00,000 / 2,176,782,336 ≈ 0.000046 ≈ **0.0046%** per attempt — the space-to-winner ratio is the security feature; warn marketing that seeding more winners also multiplies exposure.
3. (i) 20C4 = **4,845** · (ii) 20P3 = **6,840** — swap-test: portfolio survives a swap, podium doesn't.
4. With 25+ lakh equally-likely samples, no human "gut" cherry-pick is reproducible-random; every drawn bundle is defensible, and every skipped file had a fair chance — bias must sit this one out.
5. !6 = **265** (from the table: 0, 1, 2, 9, 44, 265).

---

## 🎓 CAPSTONE — The ShopKart Spin & Win Counting Pack

Rakesh approves a Diwali "Spin & Win". Ajay (ops), Priya (marketing), and you (the analyst) own the counting pack. Every number below must ship in the memo.

**The promo spec:** 6-character scratch-card codes (A–Z, 0–9) · 20,00,00,000 (20 crore) cards to print · 1,00,000 seeded winning codes · a 3-person Prize Committee · a 5-supplier GST audit alongside · an 8-hamper display photo for the poster · a 6-staff Secret Santa.

| # | Pack item | Formula | Answer |
|---|---|---|---|
| 1 | Coupon code space (6 chars × 36) | 36⁶ | **217.68 crore codes** (2,176,782,336) |
| 2 | Feasibility: print 20 crore distinct codes | space ≫ print | **Fits — 9.2% of the space used** |
| 3 | Fraud exposure of 1 lakh winners vs 10,000 tries | winners/space | **≈ 0.0046% per attempt** |
| 4 | Prize Committee: 3 of 8 staff | 8C3 | **56 committees** |
| 5 | Committee with Ajay mandatory | 7C2 | **21** (mandatory-lock) |
| 6 | GST sample: 5 of 12 suppliers | 12C5 | **792 samples** |
| 7 | Hamper photo row: 8 distinct products | 8! | **40,320 arrangements** |
| 8 | Photo constraint: 2 FMCG hampers together | 7! × 2! | **10,080** (block method) |
| 9 | Secret Santa, 6 staff, no self-gifts | !6 | **265 draws** |
| 10 | Winner-odds honesty line | 1,00,000 / 20,00,00,000 | **1 in 2,000 cards** — print it ON the card |

**Your one-page decision memo (what the boss actually reads):**
- **Code space is fortress-grade.** 217.68 crore possible codes vs 20 crore printed keeps collisions at bay; 1 lakh winners inside the full space = 0.0046% per-attempt hit-rate. Random guessing is a donation, not an exploit.
- **Print the odds.** 1-in-2,000 on the card face = compliance armor + customer trust. The rival's 13.98-million-to-one scooter draw reads like a fraud beside us.
- **Committee & audit are defensible by construction.** 56 possible committees (21 with Ajay locked), 792 GST samples — every selection documented as equally-likely. If anyone challenges the draw, the math testifies.
- **Photo constraint costs ~75% of arrangements** (40,320 → 10,080 with the FMCG pair glued). Marketing should know their "just keep them together" ask is a real constraint, not a shrug.

**Mastery bar:** you can rebuild every row of the table cold, name the trap each formula dodges, and defend the odds line in front of the legal team.

---

## ❓ Quiz

**Q1.** Statutory audit: sample 5 invoices from 52 (`COMBIN(52,5)`):
- (a) 2,598
- (b) **2,598,960 — over 25 lakh distinct samples; random beats gut-feel because no manager can "conveniently pick" his way through 2.6 million equal-likelihood bundles**
- (c) 260
- (d) 311,875,200

**Q2.** Spin & Win codes: 6 characters from a 36-symbol alphabet:
- (a) 2.18 crore codes
- (b) **217.68 crore codes (36⁶ = 2,176,782,336) — print 20 crore, seed 1 lakh winners, and a 10,000-try attacker wins 0.0046% of attempts; the slot-product IS the security audit**
- (c) 21.77 lakh codes
- (d) 36 codes

**Q3.** Pick 3 debt funds from a 10-fund shortlist (order irrelevant):
- (a) 720
- (b) **120 — 10C3; ranking the top 3 instead is 10P3 = 720: same shortlist, different question, and the swap-test is the only referee needed**
- (c) 30
- (d) 45

### ✅ Answers

1. **(b)** — audit defense = combinatorics; the sample-space size is the legal argument.
2. **(b)** — choices^length, every position ×36 deeper. Demand 6+ characters, always with numbers.
3. **(b)** — portfolios combine, podiums permute. Know which meeting you're in before reaching for the formula.

---

## ✅ Mastery checklist — PP7 & FULL COURSE

- [ ] 52C5 rebuilt by hand AND in Excel; audit-shield story told in 2 lines
- [ ] Search-spaces sized by slot-product: PIN 10⁴, OTP 10⁶, coupon 36⁶, password 36⁸
- [ ] Each extra position = ×alphabet law stated (OTP ×10, coupon ×36)
- [ ] Selection-vs-ranking twin-set split on command (120 vs 720; 4,845 vs 6,840)
- [ ] Lottery honesty: 49C6 = 13,983,816 cited with the ethics angle
- [ ] Capstone table rebuildable cold — 10 rows, formulas + answers + traps dodged
- [ ] The two rules anchored everything: AND→×, OR→+ — the whole course in one breath

---

**🎉🎉 PERMUTATIONS & COMBINATIONS COMPLETE, BRO!** From uniform combos to 217-crore coupon fortresses, you now count on purpose: two rules, three verbs, seven gates, zero fear. **Aptitude course #7 is in the bag** — a beautiful stack beside Averages, Blood Relations, DI, Percentages, Logical Reasoning Puzzles and Number Series.

**Next up in the track:** ⚖️ **Ratio & Proportion** — the multiplier grammar that sits underneath half the quant syllabus (and every P&L you'll ever read). Ask for it and it's yours!
