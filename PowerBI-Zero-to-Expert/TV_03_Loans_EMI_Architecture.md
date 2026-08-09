# 🎯 TV3 · Loans & EMI Architecture — Reading a Loan Like an Engineer

> An EMI is an annuity wearing a bank's uniform — and banks price that uniform better than you do, unless you know the architecture. This module opens the loan's engine: the amortization split, the flat-rate scam, prepayment alchemy, and the loan-vs-invest algorithm that settles every family WhatsApp debate permanently.

---

## 🎯 Objectives

- Derive the EMI from the annuity formula and split any installment into interest + principal
- Expose flat-rate pricing: why "10% flat" is really 17.27%
- Run prepayment math: same-EMI tenure cuts vs reduced-EMI relief
- Execute the loan-vs-invest decision algorithm (guaranteed vs expected, post-tax)
- Read amortization front-loading: why year 1 of a 20-year loan is almost pure interest

---

## 📘 Concepts

### 3.1 The EMI engine — annuity in reverse

A loan is the bank buying an annuity *from you*: it hands you PV = ₹30L today, you return n equal payments. From TV2's annuity-PV: **EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ − 1)**. Home loan canon: ₹30L at 9% for 20 years (r = 0.75%/mo, n = 240): EMI = 30,00,000 × 0.0075 × 6.009 / 5.009 = **₹26,992**. Total paid = 26,992 × 240 = ₹64.78L → **total interest ₹34.78L — more than the house money itself.** Every extra year of tenure multiplies this quietly; every notch of rate multiplies it loudly. Two dials, one machine: rate and tenure decide whether you buy a house or two.

### 3.2 The split — every EMI is a different animal

Each installment pays **interest on that month's outstanding balance**; the residue retires principal. Month 1: interest = 30L × 0.75% = **₹22,500**; principal = 26,992 − 22,500 = **₹4,492** — the first EMI is 17% ownership, 83% rent-to-the-bank. The balance falls slowly at first, so the split stays cruel for years: at ₹26,992 flat EMI, **principal finally exceeds interest only around month 147 — year 13**. This front-loading explains two bank behaviors: (1) they happily let you transfer/sell in early years (your balance barely moved; interest was largely pre-collected), and (2) foreclosure penalties concentrate early. Knowing the split converts "₹26,992 per month" from one numb number into a monthly purchase of equity whose price changes every month.

### 3.3 The flat-rate scam — 10% that is 17.27%

Dealers quote **flat rates**: "₹10L, 5 years, just 10% flat!" Interest = 10L × 10% × 5 = ₹5L; monthly = 15L/60 = **₹25,000**. Sounds like 10%. But you repay principal monthly while paying interest on the *original* ₹10L for all 60 months — you pay full interest on money you no longer hold. Solve the true reducing-balance rate from EMI ₹25,000 on ₹10L over 60 months: **r ≈ 17.27% reducing**. The conversion rule of thumb: **reducing ≈ 1.8–1.9 × flat** for 5-year loans (longer tenure widens the gap). Consumer-durable"0% EMI" variants hide the rate in a forfeited discount or a "processing fee" — the math is identical: **always demand the reducing-balance APR, the only honest number in lending.** RBI mandates APR disclosure precisely because flat quotes fooled a generation.

### 3.4 Prepayment alchemy — the same-EMI move

After 60 EMIs on the ₹30L/9%/20y loan, outstanding = **₹26.61L** (yes — five years in, you still owe 89%; front-loading again). Prepay ₹5L and choose **"reduce tenure, keep EMI ₹26,992"**: new remaining tenure = **122.8 months ≈ 10.2 years** instead of 15 — **4.8 years wiped out, interest saved ≈ ₹10.4L from a ₹5L move (2.1× your prepayment)**. Choose "reduce EMI, keep tenure" instead and the same ₹5L saves only ~₹3.4L of interest — relief today, three times less alchemy. Rule: **prepay against tenure, not EMI**, whenever cash flow allows — you're deleting the most expensive (longest) future installments. Also: prepay the *highest-rate* loan first (avalanche), regardless of balance size — psychologically satisfying "close the small loan" snowball moves are a math tax.

### 3.5 Loan vs invest — the family WhatsApp killer

"Prepay the 9% home loan or SIP at 12%?" The honest algorithm: (1) **convert to identical address** — prepaying yields a *guaranteed, tax-free* 9% return (in interest avoided); the SIP promises an *expected, volatile, taxable* 12%; (2) risk-adjust: certainty-equivalent of the SIP ≈ 12% − volatility cost − LTCG ≈ 9.5–10% for most savers; (3) **decide the spread**: the ≥9% guaranteed option usually wins or ties *on the math* — with two legit exceptions: employer-matched retirement contributions (instant 100% return — always first), and loans above ~10% (credit cards at 42–51%: nothing legal beats prepaying those; TV5 proves it). Algorithm order: **kill >10% debt → capture employer match → then split the rest between prepaying and investing per your risk appetite.** Anyone who answers without asking your loan rate first is selling something.

---

## 🧪 LAB — Dissect a Home Loan Like a Banker (10 min)

**Setup:** ₹30L home loan, 9%/yr monthly-compounded, 20 years. EMI ₹26,992. You are 5 years in (60 paid), balance ₹26.61L, and a bonus gives you ₹5L.

**Do this:**
1. Write EMI month 61's split (interest/principal) using the ₹26.61L balance.
2. A rival bank offers a "balance transfer at 8.6%" with ₹60k fees over the remaining 15 years. Rough-read it: new EMI 26,440-ish saves ~₹550/mo → ~₹99k over 15y against ₹60k fees + process risk. Worth it? What single number settles it?
3. Compare the two ₹5L prepayment modes: tenure-cut (saves ~₹10.4L interest) vs EMI-cut (~₹3.4L). Why is the ratio roughly 3:1?
4. Your cousin says "never prepay — markets return 12% > 9%." Give the algorithmic answer with his loan at 9% and his credit card at 42%.
5. Compute the flat-vs-reducing truth for a ₹3L, 3-year, "8% flat" gadget loan: monthly payment and true APR (rule of thumb ≈ 1.8×).

**Why this matters:** This is the exact 30-minute analysis that saves Indian households lakhs — split, transfer, prepay, compare. Run it once for your own loan and you will never read an EMI table passively again; you'll read it as a menu of choices with prices attached.

**🔑 Lab answers:**
1. Interest = 26,61,211 × 0.0075 = **₹19,959**; principal = 26,992 − 19,959 = **₹7,033**. Five years in, the split has improved from 17% to 26% ownership — slowly, as designed.
2. The settling number is **total remaining interest + fees on both paths**: (26,440×180 − 26.61L) + 0.60 = ₹21.39L + transfe hassle vs current 26,992×180 − 26.61L = ₹21.98L. Net benefit ~₹0.6L? Careful: 21.98 + 0 = 21.98 vs (26,440×180 = 47.59 − 26.61 = 20.98) + 0.60 = 21.58 → saves only ~₹0.4L over 15 years — ~₹222/month of sanity for paperwork, insurance-porting, and rate-reset risk. **Verdict: skip unless the rate gap crosses ~0.75pp or fees vanish.**
3. Tenure-cut deletes **future interest-heavy years** (the tail where your balance is still large relative to payments); EMI-cut keeps the full 15-year clock running, so interest continues accruing on a larger schedule. Same ₹5L, ~3:1 difference — the tenure cut is alchemy because it attacks *time*, and time is the exponent.
4. Algorithm: card at 42–51% → **prepay first, nothing competes**; employer match → take before any prepayment; then 9% guaranteed-tax-free vs ~9.5–10% certainty-equivalent of the 12% SIP → roughly a tie, split per temperament. "Never prepay" and "always prepay" are both slogans; the algorithm is a person, not a slogan.
5. Flat: interest = 3L × 8% × 3 = ₹72k; payment = 372/36 = **₹10,333/mo**. Thumb rule APR ≈ 8 × 1.8 ≈ **14.4–15% reducing** — double the sticker. The dealer didn't sell you a gadget at 8%; he sold you a 14.5% loan with a gadget attached.

---

## 💪 Exercises

1. **Split.** New car loan ₹8L, 9%, 5 years, EMI ₹16,607. Month-1 interest and principal?
2. **Total-cost shock.** Compute the car loan's total interest and express it as % of the car price. Then compare with the home loan's 116%-of-principal ratio: explain the difference in one word.
3. **Flat bust.** "₹5L education loan, 4 years, 9% flat." Monthly payment and thumb-rule APR?
4. **Avalanche vs snowball.** Loans: (a) ₹2L @ 42%, (b) ₹8L @ 11%, (c) ₹30L @ 9%. Rank prepayment order with one line each.
5. **Transfer triage.** ₹26.61L balance, 15y left, current 9%. Offer: 8.25% with ₹80k fees and a 6-month process. Decision rule?

### ✅ Selected answers

1. Interest = 8,00,000 × 0.0075 = **₹6,000**; principal = 16,607 − 6,000 = **₹10,607**. (Shorter tenure → kinder split from day one: 64% ownership immediately vs the home loan's 17%.)
2. Total interest = 16,607 × 60 − 8,00,000 = **₹1.96L ≈ 24.5% of the car**; home loan = 34.78/30 = **116% of principal**. One word: **time** — the exponent: 240 vs 60 periods.
3. Interest = 5 × 9% × 4 = ₹1.8L; payment = 6.8L/48 = **₹14,167/mo**; APR ≈ 9 × 1.8 ≈ **16% reducing** — nearly double the sticker, as always with flat quotes.
4. (a) **first** — 42% guaranteed beats every legal investment on earth; (b) **second** — 11% clear of the ~9.5–10% certainty-equivalent threshold; (c) **last/optional** — split against investing per temperament. Avalanche = math; snowball = feelings; fund your prepayments with arithmetic, not dopamine.
5. Compute both total remaining costs: current = 26,992×180 − 26.61L = **₹21.98L**; new interest at 8.25% (EMI ≈ 25,830) = 25,830×180 − 26.61L = **₹19.88L** + 0.80 fees = **₹20.68L** → saves ~₹1.3L ≈ 6% of remaining interest. **Transfer** — at ≥0.75pp gaps the arithmetic finally outweighs the friction; below that, stay.

---

## ❓ Quiz

**Q1.** On the ₹30L / 9% / 20y home loan (EMI ₹26,992), the first month's payment splits as:
(a) ₹13,496 interest / ₹13,496 principal
(b) ₹22,500 interest / ₹4,492 principal — installments pay that month's interest on the outstanding balance first
(c) ₹4,492 interest / ₹22,500 principal
(d) Fully principal in year 1

**Q2.** A dealer offers "10% flat for 5 years" on ₹10L. The true reducing-balance APR is closest to:
(a) 10% — flat and reducing are aliases
(b) 17.27% — you pay interest on the original principal for 60 months while returning it monthly
(c) 12.5%
(d) 20%

**Q3.** With ₹5L to deploy, the highest-value use on the home loan (5 years in, 15 left) is:
(a) Partial prepayment choosing "reduce EMI" for cash-flow comfort
(b) Prepay choosing "reduce tenure, keep EMI" — deletes ~4.8 years, saves ~₹10.4L of interest, about 2.1× the prepayment
(c) FD at 7% for safety
(d) Gold

### ✅ Answers

1. **(b)** — interest is computed monthly on outstanding: 30L × 0.75% = ₹22,500, leaving just ₹4,492 of ownership. Front-loading is why early balances melt so slowly, and why banks stay relaxed about early exits — they've pre-collected much of the interest in the opening years.
2. **(b)** — solving EMI ₹25,000 against ₹10L on a reducing basis yields ~17.27%. Thumb rule APR ≈ 1.8–1.9 × flat. The flat quote is a marketing costume for an expensive loan; RBI's APR-disclosure rule exists because this trick works so well.
3. **(b)** — tenure-cutting attacks the exponent: it deletes the longest, most interest-dense future installments. EMI-cutting saves only ~₹3.4L on the same ₹5L, an FD at 7% *loses* to the guaranteed 9% prepayment return, and gold doesn't service debt. Attack tenure, highest-rate-first, and let the machine run.

---

## ✅ Mastery checklist

- [ ] I derive any EMI from the annuity formula and split installments monthly
- [ ] I know the ₹30L/9%/20y canon cold: ₹26,992, ₹34.78L interest, month-1 split 22,500/4,492
- [ ] I convert flat→reducing with the 1.8–1.9× thumb rule (10% flat ≈ 17.27%)
- [ ] I prepay against tenure, not EMI — and I can show the ~3:1 savings gap
- [ ] I run the loan-vs-invest algorithm: >10% debt → employer match → split the rest

**Next:** TV4 flips from being the payer to being the judge — **NPV & IRR**: the two decision engines that rank every project, machine, and acquisition — plus the traps (multiple IRRs, scale blindness) that embarrass MBAs in boardrooms.
