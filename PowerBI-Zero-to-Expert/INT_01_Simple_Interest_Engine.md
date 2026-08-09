# 🎯 INT1 · The Simple Interest Engine
> One multiplication rules the flat world: **SI = PRT/100**. We forge the formula inside ShopKart's cash room, reverse it to hunt missing rates and times, stack multiple credits, and learn the arithmetic-growth signature that separates SI from its savage cousin.

## 🎯 Objectives
- State, derive and drive **SI = P × R × T / 100** and the amount A = P + SI with total fluency.
- Normalize units every time: **years** for T (months → ÷12, days → ÷365), % p.a. for R.
- Reverse-engineer any of P, R, T from the other three — same line, re-arranged, never a new formula.
- Stack multiple SI credits/borrowings and audit the total rent.
- Recognize SI's **straight-line signature** (equal yearly interest) — the engine-ID that half of all traps attack.

## 📘 Concepts

### 1.1 The flat engine, forged in the cash room
ShopKart parks a surplus **₹25,000** with its NBFC partner at **10% p.a. simple interest**. What does the deposit earn per year?

Interest per year = 10% of ₹25,000 = **₹2,500** — and under SIMPLE interest it is *always* ₹2,500, whether it's year 1 or year 15. The interest never joins the principal; it piles up on the side, un-multiplied. That's the whole engine:

```text
SI = (P × R × T)/100        Amount A = P + SI
Year 1:  2,500   cumulative 2,500
Year 5:  2,500   cumulative 12,500
Year 15: 2,500   cumulative 37,500   ← our canon: ₹25,000 × 10 × 15 / 100
```

The legends: **P** = principal (the rupee pile), **R** = rate % **per annum**, **T** = time in **years**. The formula is one line because the world it's modeling is flat: same ₹2,500, every year, forever.

### 1.2 Unit discipline — the only conversion that matters
Every SI wound is self-inflicted through units. Contracts quote **% per annum**, so T must land in **years**:

- **Months → divide by 12.** The ShopKart working-capital bridge: ₹1,20,000 drawn from the OD for **4 months** @ 10.5% → SI = 1,20,000 × 10.5 × (4/12) / 100 = **₹4,200**. (The "₹4,200 stack" — remember this one; it comes back in the arena.)
- **Days → divide by 365** (some banks use 360 — read the fine print). ₹80,000 for 73 days @ 12% → 80,000 × 12 × (73/365)/100 = **₹1,920**.
- Gate-check: if T landed bigger than the number of years you *feel*, you forgot to divide.

### 1.3 Reverse gear — one line, four directions
Exams and CFOs both love hiding one variable. Solve for it with the same formula:

| Hunted | Formula | Example |
|---|---|---|
| R | R = 100·SI/(P·T) | ₹6,250 earned on ₹25,000 in 5 y → R = 6,25,000/1,25,000 = **5%** |
| T | T = 100·SI/(P·R) | ₹9,000 on ₹30,000 @ 6% → T = 9,00,000/1,800… = **5 y** |
| P | P = 100·SI/(R·T) | earns ₹4,500 @ 9% in 2 y → P = 4,50,000/18 = **₹25,000** |

The **R×T product trick**: given SI = ₹6,250 on ₹25,000, we get R×T = 100·SI/P = **25**. Any pair multiplying to 25 fits (5%×5y, 10%×2.5y, 25%×1y) — so when an exam says "the rate and time are both integers," you're hunting factor pairs of the product. Cheap, fast, deadly.

### 1.4 Stacking credits — the cash-room ledger
ShopKart routinely runs several flat-interest lines at once. Each is its own SI line; total rent is the **sum**:

```text
Supplier credit   ₹40,000 @ 9%   6 months → 40,000×9×0.5/100  = 1,800
OD bridge         ₹1,20,000 @ 10.5% 4 mo →                     = 4,200
Staff advance     ₹15,000 @ 4%   1 year  →                     =   600
TOTAL July rent                                                  = ₹6,600  ✓
```

Never average the rates first (the principals differ!). Line-by-line, then add — the audit trail a CA can re-walk.

### 1.5 The straight-line signature — engine ID
SI growth is **arithmetic**: cumulative interest 2,500 → 5,000 → 7,500 → 10,000… a perfect **straight line** against time. CI (next module) re-bases and curves upward. Two instant tells:

1. Equal yearly increments ⇒ SI.
2. Year-2 interest equals year-1 interest ⇒ SI (under CI it's strictly bigger).

Hold this signature; the traps module weaponizes it.

### 1.6 Why SI still rules real India
- **Short money**: OD lines, supplier credit, inter-corporate deposits under a year — flat and simple by contract.
- **village & vehicle lending**: many two-wheeler loans quote flat SI — which is why INT6 shows a "flat 8%" can hide a ~14.7% reducing-balance truth.
- **Bonds & FD payouts**: the coupon is computed SI-style on face value even when markets trade the bond on yields.

SI is not "the easy chapter." It is the **pricing language of short-term India**.

## 🧪 LAB — Cash-room shift (10 min)
1. ₹45,000 @ 8% SI, 3 years → interest and amount?
2. ₹96,000 @ 7.5%, 8 months → interest? (Units gate!)
3. ₹2,00,000 @ 12%, 146 days → interest? (Days gate, /365.)
4. Reverse: ₹3,600 interest on ₹24,000 in 3 years → R?
5. Stack: ₹30,000 @ 6% for 4 mo **plus** ₹50,000 @ 8% for 9 mo — total rent?

**Why this matters:** these five lines are a full evening at the ShopKart cash room. Speed here is rent money.

**🔑 Lab answers:** (1) 45,000×8×3/100 = **₹10,800**; A = **₹55,800** (2) 96,000×7.5×(8/12)/100 = **₹4,800** (3) 2,00,000×12×(146/365)/100 = **₹9,600** (4) R = 100×3,600/(24,000×3) = **5%** (5) 30,000×6×⅓/100 = 600 + 50,000×8×0.75/100 = 3,000 → **₹3,600**.

## 💪 Exercises
1. Canon replay: verify ₹25,000 @ 10% for 15 years → ₹37,500, and write the 15-year cumulative sequence (2,500, 5,000, …) out to the end.
2. ₹75,000 @ 11% for 7 months — interest?
3. ₹64,000 @ 9% for 219 days (/365) — interest?
4. R×T hunting: SI = ₹10,000 on P = ₹40,000. List all integer (R, T) factor pairs of the product.
5. Stack audit: supplier credit ₹70,000 @ 9% for 5 months + OD ₹1,50,000 @ 10.5% for 2 months + advance ₹20,000 @ 4% for 1.5 y. Total rent?
6. Engine ID: an account's cumulative interest after years 1,2,3 reads 4,000 / 8,000 / 12,000 on ₹50,000. Engine? Rate?
7. Flat-rate trap preview: a bike dealer quotes "SI 8% p.a., 3 years, EMI" on ₹1,00,000. Total interest he'd charge? (We'll expose what this *really* costs in INT6.)

### ✅ Selected answers
1. 25,000×10×15/100 = **₹37,500** ✓; sequence 2,500 → 5,000 → … → 37,500 (15 equal steps — pure arithmetic progression).
2. 75,000×11×(7/12)/100 = **₹4,812.50**.
3. 64,000×9×(219/365)/100 = 64,000×0.054 = **₹3,456** (219/365 = 0.6 exactly — sneaky-neat exam design).
4. R×T = 100×10,000/40,000 = **25** → (1,25), (5,5), (25,1). Three auctions, three valid answers; demand the constraint that pins one.
5. 70,000×9×(5/12)/100 = 2,625; 1,50,000×10.5×(2/12)/100 = 2,625; 20,000×4×1.5/100 = 1,200 → **₹6,450**. (Twin 2,625s — auditors love accidental symmetry; verify, don't trust.)
6. Equal 4,000 steps ⇒ **SI**; 4,000 = 50,000×R/100 ⇒ **R = 8%**.
7. 1,00,000×8×3/100 = **₹24,000** — pocket it: INT6 unmasks why the reducing-balance truth is far lower… and why dealers still love quoting flat.

## ❓ Quiz
1. ShopKart parks ₹25,000 at 10% SI for 15 years — total interest:
   - (a) ₹25,000
   - (b) ₹37,500 — 25,000 × 10 × 15 / 100; flat P·R·T arithmetic, no compounding anywhere
   - (c) ₹12,500
2. A deposit earned ₹6,250 SI on ₹25,000 in 5 years — the rate:
   - (a) 10%
   - (b) 5% — R×T = 100×SI/P = 25, so R = 25/5; reverse the same formula, never a new one
   - (c) 6.25%
3. The visual signature of simple-interest growth:
   - (a) a rising curve, steeper each year
   - (b) a straight line — equal absolute interest added every year (arithmetic growth)
   - (c) flat until year 5, then a jump

### ✅ Answers
1. **(b)** — SI = PRT/100, one multiplication. Option (c) stopped at year 5; option (a) misread P as interest.
2. **(b)** — rearrange the same line: R = 100·SI/(P·T) = 6,25,000/1,25,000 = 5.
3. **(b)** — the curve belongs to CI (INT2). Equal increments = flat engine.

## ✅ Mastery checklist
- [ ] I compute SI in one line and never confuse P, SI and A
- [ ] Months ÷12 and days ÷365 are reflexes, not reminders
- [ ] I reverse-engineer R or T via the 100·SI/(P·other) pattern
- [ ] I stack multiple credits line-by-line instead of averaging rates
- [ ] I spot the straight-line signature and call the engine out loud
- [ ] ₹25,000 @ 10% × 15 y = ₹37,500 lives in my head rent-free

**Next:** **INT2 · The Compound Engine** — re-basing, the 1.1-ladder, and the jewel formula CI − SI = P(r/100)² that prices interest-on-interest in one move. The curve begins! 🚀
