# Py5 · Quant Finance Toolkit: NumPy, NPV/IRR & Monte Carlo

> *Excel's PMT/NPV/IRR formulas live inside numpy-financial — and you're about to out-formula Excel by simulating ten thousand possible futures of ShopKart's revenue. This is where analysts become quants. (Study simulation ethics: education only, never "advice".)*

## 🎯 Objectives
NumPy arrays & vectorization · Decimal honesty for money · NPV/IRR/XIRR (+ the E6 caveats) · annuities & retirement math · returns/risk/Sharpe · Monte Carlo simulation of revenue → probability of beating budget.

---

## 📘 5.1 NumPy arrays — the engine under pandas

```python
import numpy as np
prices    = np.array([499, 2499, 65999.0])
discounts = np.array([0.05, 0.10, 0.15])        # element-wise, no loop:
net = prices * (1 - discounts)                   # array([474.05, 2249.1 , 56099.15])
(net ** 1.02).round(2); net.clip(500); net.sum(); net.mean(); net.std()
np.log1p(prices); np.cumsum(net)
```

Arrays are typed (float64), memory-tight, ~100× faster than Python lists. Broadcasting: `prices * 1.18` GST-applies every element. Vectorize habit: think in COLUMNS, not rows (Py3's lesson, now at silicon level).

## 📘 5.2 Decimal — when a lakh must be a lakh

```python
0.1 + 0.2                        # 0.30000000000000004 😱 — binary floats
from decimal import Decimal, ROUND_HALF_UP
(Decimal("0.1") + Decimal("0.2"))                       # Decimal('0.3') exactly
(Decimal("12345.675")).quantize(Decimal("0.01"), ROUND_HALF_UP)  # ₹12,345.68, banker's-safe
```

Rule: compute analytics in floats (fast), settle invoices/ledger postings in Decimal (exact). Strings are mandatory in Decimal() (`Decimal(str(x))`) — never Decimal(0.1).

## 📘 5.3 Time value of money — from scratch first

```python
PV = FV / (1 + r) ** t            # present value
FV = PV * (1 + r) ** t            # future value
def pv(rate, fv, t):  return fv / (1 + rate) ** t
def fv(rate, pv, t):  return pv * (1 + rate) ** t
```

Annuity (the EMI engine, now transparent): `PMT = P·r / (1 − (1+r)^-n)`; FV of SIP: `PMT · ((1+r)^n − 1)/r · (1+r)` (annuity-due, monthly SIP at period start).

## 📘 5.4 numpy-financial — the Excel function library, unlocked

```python
pip install numpy-financial
import numpy_financial as npf

npf.pmt(0.095/12, 60, 5_000_000)              # ≈ -1,05,008 (sign convention: money OUT is -)
npf.ipmt(0.095/12, 1, 60, 5_000_000)          # interest part of EMI #1
npf.ppmt(0.095/12, 1, 60, 5_000_000)          # principal part
npf.npv(0.12, [0, 40, 45, 50, 55, 60])          # ⚠️ E6 RULE: period-0 at index 0!
npf.irr([-100, 40, 45, 50, 55])               # the rate where NPV = 0
```

**The E6 gotchas, coded:** (a) npf.npv discounts from period 0 — include your today-flow at index 0 OR add it outside; (b) IRR can misbehave (multiple roots) when flows flip sign repeatedly; (c) negatives = outflows sign convention mirrors Excel PMT.

## 📘 5.5 XIRR — irregular dates, honest yield

Real flows arrive on real dates (E6). XNPV with day-fractions, then solve via xirr:

```python
from datetime import date
def xnpv(rate, flows):   # flows = [(date, amount), ...]
    t0 = flows[0][0]
    return sum(amt / (1 + rate) ** ((d - t0).days / 365) for d, amt in flows)

def xirr(flows, guess=0.1):
    lo, hi = -0.9999, 10.0                     # bisection — 60 halvings = more than enough
    for _ in range(60):
        mid = (lo + hi) / 2
        (lo, hi) = (mid, hi) if xnpv(mid, flows) > 0 else (lo, mid)
    return (lo + hi) / 2

flows = [(date(2025,1,1), -100000), (date(2025,7,15), 30000),
         (date(2026,1,1), 45000),  (date(2026,3,31), 42000)]
print(f"XIRR = {xirr(flows):.2%}")
```

Bisection: shrink a bracket around the root each iteration — boring, bulletproof, and you can EXPLAIN it in an interview (most can't!). 

## 📘 5.6 Returns, risk & the Sharpe lens

With FX monthly returns (Py4 machinery):

```python
r = fx.pct_change().dropna()["USDINR"]
ann_ret   = (1 + r).prod() ** (12 / len(r)) - 1     # CAGR from monthly data
ann_vol   = r.std() * np.sqrt(12)
sharpe    = (ann_ret - 0.07) / ann_vol                # India 10-yr risk-free ≈ 7%
max_dd    = ((1 + r).cumprod() / (1 + r).cumprod().cummax() - 1).min()
```

Volatility = standard deviation of returns (annualize: ×√12 monthly, ×√252 daily). Sharpe: excess return per unit of risk. Max drawdown: worst peak-to-trough pain — the number investors actually FEEL.

## 📘 5.7 Monte Carlo — 10,000 possible ShopKart futures

Question: *"Will next year's revenue beat budget ₹22,000,000?"* Historical monthly revenue growth → simulate:

```python
rev_m = (gl[(gl["AccountName"]=="Sales Revenue")]
           .set_index("MonthStart")["Amount"].resample("ME").sum())
g = rev_m.pct_change().dropna()                 # monthly growth rates
mu, sigma, last = g.mean(), g.std(), rev_m.iloc[-1]

rng = np.random.default_rng(seed=42)            # reproducible!
paths = rng.normal(mu, sigma, size=(10_000, 12))
sim = last * np.cumprod(1 + paths, axis=1)      # 10k paths × 12 months
final_years = sim.sum(axis=1)                   # yearly revenue per path

p_beat = (final_years > 22_000_000).mean()      # share of futures beating budget
print(f"P(beat budget) = {p_beat:.0%}")
print(f"P5/P50/P95 = ₹{np.percentile(final_years, [5,50,95]) / 1e5} lakh")
```

Histogram + percentile lines = the classic risk chart. What a CFO gets: not one forecast, but a DISTRIBUTION and a probability — decision-grade honesty. Sensitivity: widen sigma → watch P5 collapse (stress testing lite).

---

## 🧪 LAB Py5 — The quant desk (75 min)

1. Verify §5.4 PMT against your Py2 `emi()` for ALL 5 loans (assert-close) — Excel E6, numpy-financial AND your formula must agree on the paisa.
2. Project appraisal: a new delivery hub costs ₹40L today, returns ₹[9, 11, 13, 15, 16]L/y for 5 years, MARR 12%. NPV + IRR + verdict. Then sensitivity: ±10% on each year's inflow — at what NPV does the project flip?
3. §5.5 xirr on your invented SIP flows; cross-check with Excel's XIRR if available.
4. §5.6 full risk panel for USDINR + EURINR side by side (CAGR, vol, Sharpe, max drawdown) — table + one chart.
5. §5.7 Monte Carlo with YOUR numbers (seed fixed), then re-run with 100k paths — does P(beat) stabilize? Plot the histogram with P5/P50/P95 vertical lines, save `revenue_mc.png`.
6. Decimal: recompute one invoice row (qty × price × (1−disc)) float vs Decimal — show the paisa difference can exist, then when it round-trips to zero.

## 💪 Exercises
1. Why is `np.percentile(x, [5,50,95])` more honest for CFOs than a single point forecast? (2 sentences.)
2. npf.pmt sign dance: write the `abs()` + negate pattern that makes positive loans read positive EMIs.
3. Multiple-IRR trap: flows [-100, 230, -132] have TWO roots (show both!) — why does NPV-beat-IRR-in-conflict?
4. Annualizing: vol ×√12 assumes what about the returns? (Hint: independence — is that true in real markets?)
5. Monte Carlo misuse: name TWO business cases where historical-μ/σ normal simulation is dangerously wrong.

### ✅ Selected answers
- Ex 3: flows flip signs twice → quadratic-root ambiguity → IRR ≈ 10% AND ≈ 20% (verify with xnpv!); NPV survives because it uses ONE observable hurdle rate — no root-hunting.
- Ex 5: regime shifts (COVID-lockdown months in training data) and fat tails (currency crises) — normal assumptions underprice disaster; add stress scenarios & fat-tailed sampling (Student-t) in real desks.

## ❓ Quiz
1. numpy-financial npv() — the period-0 rule (E6 redux)?
2. XIRR mechanics: what does bisection actually do, in one line?
3. Sharpe's numerator and its India-context risk-free benchmark?
4. Float vs Decimal settlement rule?

### ✅ Answers
1. Flow at index 0 is treated as TODAY (un-discounted); put the year-1 flow at index 1 or add the initial outlay outside — same E6 caveat, same discipline.
2. Repeatedly halves the rate bracket [-99.99%, 1000%] keeping the sign change inside → converges to the root in ~60 iterations; no calculus needed.
3. (ann_return − risk_free), typically India's 10-year G-Sec ≈ 7% — excess return per unit of total risk (vol).
4. Analyze in fast floats; invoice/book entries in exact Decimal — and never Decimal(float) (pulls in float noise).

## ✅ Mastery checklist
- [ ] npf toolkit & manual TVM agree to the paisa
- [ ] XIRR coded via bisection and verified
- [ ] Risk panel (CAGR/vol/Sharpe/drawdown) understood
- [ ] 10k-path Monte Carlo produced P(beat budget) + percentile band chart

**Next: Py6 — capstone: the end-to-end finance toolkit in code — loaders, recon checks, variance pack, loan book, Excel export, one command. 🏦**
