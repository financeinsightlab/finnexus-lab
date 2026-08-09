# 🎯 INT6 · FINANCE: Treasury & Debt + Capstone
> Six modules of engine work, now aimed at real money. ShopKart's ₹25L tax provision goes into a quarterly FD (₹26.82L out), a vendor's credit card quote gets unmasked (42.6% effective!), the van-loan EMI splits into its interest/principal braid, and the flat-rate costume gets ripped off. Then the grand **ShopKart Treasury Memo** capstone — one page, four decisions, all signed with arithmetic.

## 🎯 Objectives
- Deploy idle corporate cash into frequency-geared FDs and compute exact maturities.
- Convert **nominal APR to effective annual cost** for monthly-compounded debt (the credit-card unmasking).
- Split any EMI into its **interest/principal braid** month by month, and audit total loan cost.
- Unmask **flat-rate quotes** into reducing-balance truth (flat 6.5% ≈ 12%+ real).
- Value recurring deposits with the annuity formula and benchmark RD vs SIP-lite.
- **Capstone:** write the ShopKart Treasury Memo — provision parking, sweep-vs-OD, card policy, staff RD — with numbers a CFO can sign.

## 📘 Concepts

### 6.1 Parking the tax provision — frequency is money
ShopKart sets aside **₹25,00,000** for GST/advance-tax outflows. The bank offers an FD at **7.1% p.a., quarterly rests**. One year parked:

```text
Per-quarter rate = 7.1/4 = 1.775%
Maturity = 25,00,000 × 1.01775⁴ = 25,00,000 × 1.072913 = ₹26,82,282  (≈ ₹26.82L)
Flat 7.1% would pay ₹26,77,500 → quarterly gear bonus = ₹4,782
```

Same nominal rate, different paycheck (INT3's ladder, in the wild). For shorter parks, chain by quarters: two quarters ⇒ 25,00,000 × 1.03582 = **₹25,89,538**. The treasury rule: **match maturity to the liability date** — provision money is liability-driven, not yield-chasing, so ladder FDs against the tax calendar. Idle money in a current account is an undocumented donation to the bank.

### 6.2 The credit-card unmasking — 3% per month is not 36%
A vendor offers ShopKart 45-day inventory "on card" at *just* 3% per month. Finance-team junior writes "36% p.a., expensive." Still wrong — monthly compounding:

```text
Effective = 1.03¹² − 1 = 1.425761 − 1 = 42.58%  (APR nominal 36% hides 6.6 points)
At 3.5%/mo: 1.035¹² − 1 = 51.11%. Personal cards routinely quote these.
```

Any monthly-quoted rate compounds **twelve times**: effective = (1 + m)¹² − 1. The household names to recite: 2%/mo ≈ 26.8%, 3%/mo ≈ 42.6%, 3.5%/mo ≈ 51.1%. This unmasking is the highest-ROI line in the course — businesses and families both bleed here silently.

### 6.3 The EMI braid — interest first, principal creeps
NS6 canon loan: ₹5,00,000 delivery-van loan @ 12% reducing, 60 EMIs of **₹11,122**. Every EMI splits:

```text
Month 1: interest = 5,00,000 × 1% = 5,000  → principal = 6,122 → balance 4,93,878
Month 2: interest = 4,93,878 × 1% = 4,938.78 → principal = 6,183.22 → balance 4,87,694.78
Month 3: interest 4,876.95 → principal 6,245.05 … Month 60: interest ≈ 110, principal ≈ 11,012
Total: 60 × 11,122 = ₹6,67,320 → total interest ≈ ₹1,67,320
```

Watch the **braid**: the interest strand starts fat (₹5,000) and thins; the principal strand starts thin (₹6,122) and fattens — because each small balance cut shrinks next month's interest. Two treasury corollaries: (1) **prepay early** and you delete the fattest interest; (2) insurance+bundled-fee EMIs quote a lower "rate" while the braid says otherwise — always recompute from balance × i.

### 6.4 The flat-rate costume
A rival lender pitches the same van at "flat 6.5%, way below 12%": interest = 5,00,000 × 6.5 × 5/100 = ₹1,62,500; total ₹6,62,500 → ₹11,041.67/mo. *Cheaper than ₹11,122?* Compute the truth: under flat, you pay interest on the ₹5L **for all 60 months**, though you repay principal monthly — average outstanding ≈ half the loan. Effective reducing equivalent ≈ **12.3–12.5%** (the average-balance rule: flat × ~1.85–1.9). So "6.5% flat" is "12.4% real" wearing a costume — marginally *worse* than the honest 12%. Rule for life: **never compare a flat quote with a reducing quote; convert first.** (Flat × ~1.9 for 5-year monthly loans; the multiplier shrinks with tenure.)

### 6.5 RD vs SIP-lite — the annuity ladder
ShopKart diwali fund: **₹5,000/month for 12 months @ 7% p.a., monthly rests, paid at month-start** (annuity-due):

```text
i = 0.07/12 = 0.005833
FV = 5,000 × [(1.005833¹² − 1)/0.005833] × 1.005833
   = 5,000 × 12.3926 × 1.005833 ≈ ₹62,325   (deposits 60,000 → interest ≈ ₹2,325)
```

Each ₹5,000 is a mini-FD with its own tenure (11 months for January's, 0 for December's) — the ladder mental model keeps the formula honest. A **SIP-lite** (index fund) may beat or trail 7%; the RD's superpower is the *guaranteed* curve for money with a fixed date, the SIP's is long-run upside for money without one. Treasury allocates by **purpose**, not by optimism.

### 6.6 CAPSTONE BRIEF — the ShopKart Treasury Memo
Q2 surplus decisions, all computed, one page:

**① Provision parking.** GST + advance-tax provision ₹25,00,000, payable in 6 months → ladder into two quarterly FDs; maturity 25,00,000 × 1.03582 = **₹25,89,538** (interest ₹89,538 vs ₹0 in current account). Recommend: auto-sweep + matched ladder.

**② Festive inventory gap ₹4,00,000 for 3 months.** Vendor card 3%/mo ⇒ 4,00,000 × 1.092727 = ₹4,37,091 (rent ₹37,091). OD @12% ⇒ 4,00,000 × 1.03 = ₹4,12,000 (rent ₹12,000). **Recommendation: draw the OD, save ₹25,091 per quarter, and write a card-policy line — monthly-quoted credit is banned for inventory finance.**

**③ Van fleet expansion ₹5,00,000.** Quotes: 12% reducing EMI 11,122 (interest ₹1.67L) vs "flat 6.5%" (interest ₹1.63L but ≈12.4% real + processing fee 1% = ₹5,000 + foreclosure lock). **12% reducing wins** on cost AND flexibility (prepay friendly).

**④ Surplus sweep ₹8,00,000 for 2 months.** OD prepay: save 8,00,000 × 12% × 2/12 = **₹16,000** interest. FD @7.1% (2 quarters? no — 2 months = one short FD @6.5% 60-day): earn ≈ 8,00,000 × 6.5% × 2/12 ≈ **₹8,667**. **Kill debt before you lend: the 12% enemy beats the 7.1% friend.** (Spread ≈ 4.9 points = the treasurer's compass.)

**Sign-off:** every line above is INT1–INT5 math — flat engine, compound engine, gears, timestamps. Treasury is just the course with GSTIN attached.

## 🧪 LAB — Treasury shift (10 min)
1. ₹10,00,000 parked 2 quarters @ 7.1% quarterly rests → maturity?
2. Unmask: store card at 2.8%/mo → effective annual? (1.028¹².)
3. Braid: ₹2,00,000 loan @ 1%/mo flat EMI 4,450 (approx). Month-1 interest, principal, new balance?
4. Flat-to-real: "flat 8%, 3 y, monthly" on ₹1,00,000 — true reducing ≈ ? (avg-balance rule ×~1.75–1.8).
5. RD: ₹1,000/month, 12 months, 6% p.a., annuity-due → FV (i = 0.005, (1.005¹²−1)/0.005 ≈ 12.3356).

**Why this matters:** these five ARE the capstone's skeleton. A CFO who can run them live in a negotiation *is* the negotiation.

**🔑 Lab answers:** (1) 10,00,000 × 1.03582 = **₹10,35,815** (2) 1.028¹² = 1.3929 → **≈39.3% effective** (3) interest = 2,000 → principal = 2,450 → balance **₹1,97,550** (4) true ≈ **14–14.5%** (interest 24,000 on avg outstanding ≈ 55,000 over 3 y → 24000/55000/3 ≈ 14.5%/y … hail the rule-of-thumb: flat × 1.8) (5) 1,000 × 12.3356 × 1.005 ≈ **₹12,397**.

## 💪 Exercises
1. ₹40,00,000 provision, 3 quarters, 7.1% quarterly rests → maturity and bonus vs current account.
2. Unmask the trio: 1.9%/mo, 3%/mo, 0.05%/day (×365 rests: 1.0005³⁶⁵). Rank by effective cost.
3. Braid the brute way: ₹5L van loan — months 1–3 full ledger (rates from 6.3) and verify total-EMI × 60 ≈ ₹6,67,320.
4. Prepay power: after month 12 of the van loan the balance is ≈ ₹4,19,000 — a ₹1,00,000 prepay cuts next-month interest by how much? Why is prepay-time-value highest early?
5. Flat costume: dealer offers the ₹5L van "flat 5.9%, 5 years". Total interest? EMI? Effective reducing ≈ ? Verdict vs 12% honest?
6. RD design: Shubham wants ₹65,000 next Diwali (12 months). Deposits at month-start, 7% p.a. What monthly amount? (Scale the ₹5,000 canon — linear!)
7. Treasury compass: sweep ₹15,00,000 for 3 months — OD outstanding at 12% AND FD at 7.1% available. Choose and quantify the quarter.

### ✅ Selected answers
1. 40,00,000 × 1.05420 = **₹42,16,802** (bonus ₹2,16,802 — a part-time salary recovered from thin air).
2. 1.019¹² = 1.2544 → 25.4%; 1.03¹² → 42.6%; 1.0005³⁶⁵ = 1.2002 → 20.0%. Rank: **daily 0.05% (20%) < 1.9%/mo (25.4%) < 3%/mo (42.6%)** — "small" daily rates deceive; always annualize the same way.
3. From 6.3: (5,000|6,122|4,93,878) → (4,938.78|6,183.22|4,87,694.78) → (4,876.95|6,245.05|4,81,449.73); 60 × 11,122 = **₹6,67,320** ✓
4. Next-month interest drops by 1,00,000 × 1% = **₹1,000/month**, and every future month inherits the cut — early prepay rides the full braid; month-55 prepay barely matters. Time-in-braid is the value.
5. Interest = 5,00,000×5.9×5/100 = ₹1,47,500; total ₹6,47,500 → EMI **₹10,792**; real ≈ 5.9 × 1.85 ≈ **10.9–11%** — genuinely competitive! Costume math *protects you from rejecting good deals too* — always convert, never assume the costume lies by default.
6. ₹5,000 → ₹62,325 canon; need 65,000/62,325×5,000 = **₹5,215/month** (annuity scales linearly in the deposit).
7. Kill OD: save 15,00,000×12%×¼ = **₹45,000**; FD earns 15,00,000×7.1%×¼ ≈ ₹26,625 → **prepay OD by ₹18,375 better**. The compass points at the biggest enemy, always.

## ❓ Quiz
1. A credit card charging 3% PER MONTH really costs per year:
   - (a) 36%
   - (b) 42.6% — 1.03¹² = 1.4258; monthly rests compound twelve times, and the nominal APR hides 6.6 points
   - (c) 39%
2. ₹25,00,000 parked at 7.1% p.a. with quarterly rests for one year matures at about:
   - (a) ₹26,77,500
   - (b) ₹26.82 lakh — ×1.01775⁴ = ×1.072913 ➜ ₹26,82,282; the quarterly gear beats flat 7.1% by ₹4,782
   - (c) ₹26,10,000
3. ShopKart's ₹5,00,000 van loan at 12% (EMI ₹11,122): the first month's interest strand is:
   - (a) ₹11,122
   - (b) ₹5,000 — balance × monthly 1% = 5,000; principal takes the remaining ₹6,122 and the braid begins
   - (c) ₹6,122

### ✅ Answers
1. **(b)** — (1 + m)¹² − 1 every time a rate wears "/month" on its sleeve.
2. **(b)** — option (a) used flat arithmetic; quarterly rests earn interest on each quarter's interest within the year.
3. **(b)** — interest is computed on the outstanding balance FIRST; the EMI's residue is the principal attack. Reverse the strands and you're wearing the flat-rate costume.

## ✅ Mastery checklist
- [ ] I ladder corporate cash into FDs whose maturities match liability dates
- [ ] Any "/month" quote gets (1+m)¹² − 1'd before I speak (3%/mo = 42.6%, recited)
- [ ] I can braid-split any EMI in 30 seconds: balance × i first, residue to principal
- [ ] Flat-rate costumes get converted (×≈1.85 for 5-y monthly) before verdicts
- [ ] RD math (annuity ladder) sizes a target-festival fund to the rupee
- [ ] The treasurer's compass is engraved: kill the highest-rate enemy first
- [ ] I shipped the 4-item ShopKart Treasury Memo with signed, checkable numbers

🏆 **COURSE COMPLETE — Simple & Compound Interest!** From SI = PRT/100 to ₹26.82L FD ladders, jewel gaps, 72-club doublings, installment timestamps, EMI braids and the 42.6% card unmasking — you now price time itself.

**Next:** **🔗 Syllogisms** — no numbers this time; pure logic machinery. All/Some/None chains, Venn engines, either-or twins and the conclusions that MUST be true. See you in the arena, logician! 🚀
