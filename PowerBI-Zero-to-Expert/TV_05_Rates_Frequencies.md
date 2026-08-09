# 🎯 TV5 · Rates & Frequencies — The Quote Police

> "12% per annum" can legally mean 12%, 12.36%, 12.68%, or 12.75% — the compounding frequency is the fine print's favorite hiding place. This module deputizes you: convert every quote to EAR, convert every return to real terms, and never again let a credit-card company or an FD advertisement choose the units of your life.

---

## 🎯 Objectives

- Convert nominal to effective annual rate (EAR) for any frequency — and spot when it matters
- Learn continuous compounding as the limit and where it appears (derivatives, quant models)
- Translate between nominal and real returns exactly — the (1+r)/(1+i) − 1 discipline
- Read loans (APR games) and deposits (frequency games) with the same lens
- Master the Rule of 72 family as field instruments, with their honest error bars

---

## 📘 Concepts

### 5.1 The same 12% can be four different rates

**EAR = (1 + r/m)ᵐ − 1.** The 12% family: annually → 12.00%; half-yearly (6%×2) → 12.36%; quarterly → 12.55%; monthly (1%×12) → **12.68%**; daily → 12.75%; and the limit, **continuous: e^0.12 − 1 = 12.75%**. More frequent compounding = higher effective yield, always. Marketing knows the asymmetry: **deposits quote the frequency that flatters the EAR (or hide it), loans quote the flat/simple convention that shrinks it** (TV3's scam). The deputy's badge: **EAR is the only rate — convert first, compare second, sign third.** A bank offering "7.1% quarterly compounding" FD pays (1 + 0.071/4)⁴ − 1 = **7.29% EAR**; its rival's plain "7.25% annual" is worse *despite looking bigger*. Two-line check, ₹100, one minute — quote policing is cheap.

### 5.2 Continuous compounding — the exponent's home

Increase frequency forever and (1 + r/m)ᵐ → **e^(rt)**: FV = PV·e^(rt), PV = FV·e^(−rt). At 12%: e^0.12 − 1 = **12.75% EAR** — barely above daily (12.7475% vs 12.75%): the marginal frequency beyond daily buys almost nothing, which is itself the lesson. Why it matters anyway: derivatives pricing (Black-Scholes discounts at e^(−rt) — DV course's engine), quant models, and clean math (e^(rt₁)·e^(rt₂) = e^(r(t₁+t₂)) — exponents add, so continuous rates compose beautifully). Field rule: **use discrete EAR for products, continuous e^(rt) for models** — and know ±2bp separates them at sane rates and horizons.

### 5.3 Real vs nominal — the inflation tax collector

**1 + real = (1 + nominal)/(1 + inflation).** Equity 12% with inflation 6% → real = 1.12/1.06 − 1 = **5.66%** (the naive 12 − 6 = 6% flatters by a third of a point — and the error grows as rates grow). Now the gut-punch canon: an FD at 6.5%, taxed at 30%, against 6% inflation: post-tax nominal = 4.55% → real = 1.0455/1.06 − 1 = **−1.37%** — the classic Indian middle-class "safe" FD **quietly pays −1.4% of purchasing power per year**. Safety theatre, funded by you. This single computation converts more FD-maximalists than any equity pitch: compounding −1.37% real for 20 years costs 24% of your purchasing power. Real-rate discipline is also the pension planner's tool: model retirement entirely in today's-rupees (real 5.66%) and inflation disappears from the spreadsheet — TV7's capstone runs exactly this play.

### 5.4 The loan side — APR games and the credit-card abyss

Loans hide in the opposite direction: quote the *smallest legal* number. Credit cards: "just 3.5% per month" — nominal 42%/yr quoted softly, EAR = 1.035¹² − 1 = **51.1%**. Overdrafts, BNPL "processing fees" (a 2% fee on 3-month money is an ~8%+ annualized cost before interest), payday rollovers. Deputy drills: (1) any fee up front is a rate hike in a costume — annualize it; (2) compare all debt on post-tax EAR (student/home-loan tax breaks lower the *effective* rate: 9% home loan with 80EEA benefits ≈ 7.2–8% effective for eligible buyers); (3) the prepay-vs-invest algorithm (TV3) runs on **these** honest numbers, not brochure ones. A 51.1% EAR debt compounding against you is the closest legal thing to a fire in your wallet — there is no investment masterstroke that beats extinguishing it (PM7's drawdown law: the hole you dig is the return you must earn).

### 5.5 The Rule of 72 — calibrated field instruments

**Doubling years ≈ 72/rate%**: 12% → 6y (exact 6.12); 8% → 9y (exact 9.01); 6% → 12y (exact 11.90); 4% → 18y (exact 17.67). Deadly accurate in the 6–12% band, drifts outside it (at 24%: rule says 3y, exact 3.22 — still usable). Cousins: **tripling ≈ 114/r**; and the SIP veteran's party trick — at a 1% monthly rate, money doubles in ln2/ln(1.01) ≈ **69.7 months**, i.e. roughly 70 months. And the 72's forensic use (BF course link): any scheme promising "double in 3 years" is promising **24% sustained** — name the asset class on earth that delivers 24% for a decade without a body count. The Rule of 72 is the world's smallest forensic accounting department.

---

## 🧪 LAB — The Quoting Desk (10 min)

**Setup, five quotes on five slips of paper:** (a) FD "6.9% paid annually"; (b) FD "6.8% compounded quarterly"; (c) savings-plus "5.5% monthly compounding"; (d) credit card "3.4% per month"; (e) dealer scheme "₹1L becomes ₹2L in 4 years, guaranteed!!!"

**Do this:**
1. Convert (a), (b), (c) to EAR and rank. Any surprises?
2. Convert (d) to EAR. If you carried a ₹1L balance for 2 years at that EAR, what do you owe? What would extinguishing the debt "return"?
3. Evaluate (e) with the Rule of 72: implied annual rate? Decompose "guaranteed": guaranteed by whom, recoverable how? List the two documents you demand.
4. Post-tax reality: you're in the 30% slab, inflation 6%. Compute real post-tax returns for the best FD above and for 12%-nominal equity (held >1y, LTCG 12.5% above ₹1.25L — model as 11% post-tax). Which compounds purchasing power? By how wide a margin per decade?
5. Your uncle insists "FD is safe, equity is gambling." Using only this module's numbers, write the three-line reply you'd actually send him.

**Why this matters:** You will meet these five slips of paper a hundred times in your financial life — at bank counters, in WhatsApp family groups, in dealer showrooms, and in your own nostalgia for "safe" returns. Ten minutes of EAR-and-real arithmetic per encounter is the cheapest insurance in personal finance: it converts marketing back into mathematics.

**🔑 Lab answers:**
1. (a) EAR = **6.90%**; (b) (1+0.068/4)⁴−1 = **6.98%** ✓ highest; (c) (1+0.055/12)¹²−1 = **5.64%**. Rank: **b > a > c**. Surprise: the "smallest headline" (6.8%) pays the most — frequency was the payload.
2. EAR = 1.034¹² − 1 = **49.6%**. ₹1L for 2y: 1.496² = **₹2.238L owed** — debt more than doubles in 2 years. Extinguishing it "earns" a guaranteed, tax-free **49.6%** — the single best "investment" available in the Indian economy is canceling this one.
3. Double in 4y → implied rate ≈ 72/4 = **18%/yr** sustained, guaranteed — a rate no regulated deposit pays and no honest manager promises risk-free (sovereign 10y pays ~7%). Documents: (1) the *guarantor's* balance sheet + RBI/SEBI registration certificate, (2) an enforceable instrument naming the guarantee (bond/insurance contract), not a brochure. Verdict until both exist: treat as fiction with a phone number.
4. FD (b): post-tax nominal = 6.98 × 0.7 = 4.89% → real = 1.0489/1.06 − 1 = **−1.05%**. Equity: 11% post-tax → real = 1.11/1.06 − 1 = **+4.72%**. **Equity compounds purchasing power; the FD erodes it** — a spread of ~5.8 real points/year ≈ purchasing-power ratio of 1.057¹⁰ ≈ **1.74× per decade**.
5. *"Uncle, after tax and inflation the FD actually shrinks what my money buys by about 1% every year — that's slow-motion loss wearing a seatbelt. Equity at even a modest post-tax 11% grows purchasing power ~4.7% yearly, so over the next decade the 'safe' choice leaves me with about ₹58 for every ₹100 the 'gamble' preserves-and-grows — 1.74× difference. Real safety isn't zero volatility, it's money that still buys groceries in 2045."*

---

## 💪 Exercises

1. **EAR drill.** Convert: (a) 10% half-yearly; (b) 10% quarterly; (c) 10% monthly; (d) 10% continuous.
2. **Deposit triage.** Bank X: 7.20% annual. Bank Y: 7.00% monthly-compounded. Pick one and prove it.
3. **Real exact.** Nominal 15% with inflation 9%: compute real exactly (not by subtraction) and quantify the naive error.
4. **Fee-buster.** BNPL: ₹40,000 gadget, "0% interest," ₹1,000 processing fee, repay in 4 months. Annualized cost of the fee alone?
5. **72 forensics.** A PMS brochure: "doubled clients' money every 3.5 years (past performance)." Implied rate? List one statistical and one structural reason the future may differ, then the question you ask the salesperson.

### ✅ Selected answers

1. (a) (1.05)²−1 = **10.25%**; (b) (1.025)⁴−1 = **10.38%**; (c) (1+0.10/12)¹²−1 = **10.47%**; (d) e^0.10−1 = **10.52%**. Same nominal, four truths — frequency is the payload.
2. X: **7.20%** EAR flat. Y: (1+0.07/12)¹²−1 = **7.23%**. **Pick Y** — despite the smaller sticker; the monthly machine adds 3bp. (Small, yes — the point is the *reflex*, not the size.)
3. Real = 1.15/1.09 − 1 = **5.50%**. Naive 15−9 = 6% overstates by 0.50pp — nearly 9% relative error; at higher inflation countries (30% prints) the naive error becomes cartoonish.
4. Fee = 1000/40000 = 2.5% over 4 months → annualized ≈ 2.5% × 3 = **~7.5% (simple) / ~7.7% effective** — "0% interest" quietly costing like a personal loan. Up-front fees are interest in a blazer.
5. Implied rate ≈ 72/3.5 = **~20.6%/yr**. Statistical: survivorship/hindsight — doubling periods get quoted from lucky windows (PM6 rebalance-era discipline). Structural: capacity — strategies that double fast attract inflows that flatten the edge. Salesperson question: *"Show me the XIRR net of all fees, against Nifty 50 TRI, live-verified, over a full cycle with drawdowns marked."* Watch which adjective dies first.

---

## ❓ Quiz

**Q1.** "12% per annum" monthly-compounded delivers an effective annual rate of:
(a) 12.00%
(b) 12.68% — (1.01)¹² − 1; frequency is the payload
(c) 12.12%
(d) 12.55%

**Q2.** Inflation 6%, you hold a 6.5% FD in the 30% tax slab. Your real post-tax return is:
(a) +0.5%
(b) −1.37% — post-tax nominal 4.55% loses to 6% inflation; the "safe" FD erodes purchasing power by design
(c) +0.47%
(d) +6.5%

**Q3.** A credit card quoting "3.4% per month" actually charges an effective annual cost of:
(a) 40.8%
(b) 49.6% — 1.034¹² − 1; monthly compounding turns the quote into a bonfire
(c) 3.4%
(d) Depends on the bill cycle only

### ✅ Answers

1. **(b)** — each month books 1%, then next month's interest earns on it; twelve such steps stack the extra 0.68%. Annual = 12.00, half-yearly = 12.36, quarterly = 12.55, monthly = 12.68, continuous = 12.75 — same brochure, four machines.
2. **(b)** — 6.5% × 0.7 = 4.55% nominal keep; 1.0455/1.06 − 1 = −1.37% real. Twenty years of it costs ~24% of purchasing power. The FD's risk isn't volatility — it's the near-certainty of quiet erosion; the deputy's job is naming it in front of the family.
3. **(b)** — the quoted "3.4%" compounds: 1.034¹² = 1.496 ≈ **49.6% EAR**. Lenders quote the tiny monthly number because the annual truth (and its cousin, avoidance) would kill the product. On the flip side, extinguishing this debt is a guaranteed 49.6% "return" — TV3's algorithm sends cash here before any SIP.

---

## ✅ Mastery checklist

- [ ] I convert any nominal quote to EAR by reflex: deposits AND loans
- [ ] I know the 12% frequency ladder: 12.00 / 12.36 / 12.55 / 12.68 / 12.75 (continuous)
- [ ] I use e^(rt) for models and EAR for products — and know why
- [ ] I compute real returns exactly: (1+r)/(1+i) − 1, and the FD post-tax canon −1.37%
- [ ] I wield 72/114 in the field: doubling, tripling, and fraud-sniffing any "double in X years" pitch

**Next:** TV6 cashes in — **TVM in Markets**: bonds (FI's ₹924.18 bridge), stocks (Gordon as a growing perpetuity), DCF as TVM's full orchestra, and the goal-planning engine that turns salaries into corpus.
