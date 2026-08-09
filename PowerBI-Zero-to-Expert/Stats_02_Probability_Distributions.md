# St2 · Probability & Distributions: Expected Value, Z-Scores & the Normal's Promises

> *Finance is probability wearing a suit: will the loan default? will January beat target? is this return "normal" or "alarm"? This module gives you the math of uncertainty — expected value, the classic distributions, z-scores, and the Central Limit Theorem that makes estimation possible (St3 needs it!).*

## 🎯 Objectives
Probability rules + conditional probability/Bayes-lite · random variables, E[X] & Var(X) · Binomial & Poisson for finance events · the Normal + z-scores + empirical rule · log-normal for prices · sampling distributions & the CLT.

---

## 📘 2.1 The grammar of uncertainty

- P(A) between 0 and 1; P(not A) = 1−P(A); **independent** events multiply: P(A∩B)=P(A)·P(B); mutually exclusive events add: P(A∪B)=P(A)+P(B).
- **Conditional**: P(A|B) = "A given B happened". Independence means P(A|B)=P(A); most real finance events are NOT independent (crashes, defaults, campaigns).

```python
# Employee mode: two loan officers both pass? P(0.9 * 0.9) if independent.
# Reality mode: defaults in a recession cluster — correlations spike. Remember 2008.
```

## 📘 2.2 Bayes-lite — the fraud/credit intuition pump

A widget test catches fraud 99% of the time (true positive) but has 1% false positives. Fraud is rare: 0.1% of transactions. You flag a transaction — probability it's REALLY fraud?

```python
p_fraud, p_pos_given_fraud, p_pos_given_ok = 0.001, 0.99, 0.01
p_fraud_given_pos = (p_pos_given_fraud * p_fraud) / (
      p_pos_given_fraud * p_fraud + p_pos_given_ok * (1 - p_fraud))
print(f"{p_fraud_given_pos:.1%}")     # ≈ 9.0% ! NOT 99% — base rates rule
```

The "base-rate fallacy" bankrupts naive credit/fraud systems. Before trusting any classifier or screening — ask for the BASE RATE.

## 📘 2.3 Random variables — E[X] & Var(X), the soul of finance

```python
# A 3-scenario project: profit (₹ lakh) with probabilities
scen = {"boom": (120, 0.25), "base": (60, 0.55), "bust": (-40, 0.20)}
EX  = sum(x*p for x,p in scen.values())                 # 55
var = sum(p*(x-EX)**2 for x,p in scen.values())         # spread of outcomes
sd  = var ** 0.5
print(f"E[X]=₹{EX}L  σ=₹{sd:.1f}L")
```

- **E[X] = probability-weighted mean** — the fair "price" of a gamble; the DCF/insurance/premium intuition.
- **Var/σ = how wrong the average can be** — the physics of RISK. Two projects with identical E[X] can have wildly different σ — the risk-averse pick the tighter one (Markowitz's whole game, preview of St6).

## 📘 2.4 Binomial & Poisson — counts of loan approvals & order streams

**Binomial** (n fixed trials, two outcomes, independent, p constant): *"Of 10 loan files, each 20% default probability — P(exactly 2 defaults)?"*

```python
from math import comb
p = comb(10, 2) * 0.2**2 * 0.8**8     # ≈ 0.302 — C(n,k) p^k (1−p)^(n−k)
# Excel: =BINOM.DIST(2, 10, 0.2, FALSE)
```

**Poisson** (events per interval, rate λ): ShopKart took 1,300 orders over ~1,095 days (2023–2025) → mean ≈ 1.19 orders/day. P(exactly 3 tomorrow)?

```python
from math import exp
lam = 1300/1095
p3 = lam**3 * exp(-lam) / 6           # ≈ 0.217 =  λ^k e^(−λ)/k!
# Excel: =POISSON.DIST(3, lam, FALSE)
```

Queuing, call-center staffing, operational-risk event counts, arrear arrivals — Poisson everywhere. Mean = variance = λ (spot over-dispersion when reality violates this!).

## 📘 2.5 The Normal — beautiful, useful, dangerous

N(μ, σ²) — bell, symmetric, fully described by two numbers. **The empirical rule:** ~68% within ±1σ, ~95% within ±2σ, ~99.7% within ±3σ.

```python
# Monthly revenue growth: mean +1.5%, sd 7.35% (your GL data!)
# P(next month growth < −5%)?  z = (−5 − 1.5)/7.35 ≈ −0.88
# In Excel: =NORM.DIST(-5, 1.5, 7.35, TRUE)   ≈ 18.9% chance of a "down >5%" month
```

## 📘 2.6 Z-scores — the universal "how weird is this?" ruler

```python
z = (x - mean) / sd          # distance from typical, in sigmas
```

Revenue Jan-2024 ₹17,97,854 vs mean ₹20,83,169, sd ₹2,13,131 → z ≈ −1.34: unusual but unalarming. z beyond ±2 → investigate; beyond ±3 → almost certainly special cause (data error, campaign, shock). Z-scores = the poor-man's alerting system (and the seed of control charts in quality ops!).

## 📘 2.7 Log-normal — prices don't go negative, returns do

Prices/values ≥ 0 and grow multiplicatively ⇒ sum of small % changes = additive in LOGS ⇒ **log returns are ≈ normal** ⇒ prices are **log-normal** (bell-shaped after a log). This is why quants model *returns*, not prices; and why your Py4/Py5 work uses `pct_change` + `log1p`/`cumprod`.

```python
import numpy as np
log_ret = np.log(fx["USDINR"] / fx["USDINR"].shift(1)).dropna()   # ≈ simple % for small moves
```

## 📘 2.8 Sampling distributions & the Central Limit Theorem — the miracle

Take 30 orders, average them; repeat 1,000 times. The AVERAGES form a (near-)Normal distribution centered on the true mean with **standard error σ/√n** — regardless of the raw data's skew! (n ≳ 30–50 usually suffices; heavier tails need more.)

```python
mu, se = s.mean(), s.std(ddof=1) / (len(s) ** .5)   # SE = σ/√n
```

C-L-T consequences (memorize these): (1) AVERAGES behave even when INDIVIDUALS are wild; (2) quadrupling n only HALVES the error (√n law — stats' cruelest geometry); (3) it makes confidence intervals possible — St3 walks through that door.

---

## 🧪 LAB St2 — Risk arithmetic on real data (55 min)

1. From Sales order values compute P(order > ₹1,00,000) empirically (count/1300) — then compare with what a Normal(47918, 72505) predicts. Mismatch? Confirm with the skew from St1: the Normal UNDERESTIMATES big-order frequency (right tail!). 💡
2. z-score every month's GL revenue; list |z|>2 months — label each with a story (seasonal low? campaign spike?).
3. Binomial: ShopKart approves 92% of credit-requested orders; for the next 15 files compute P(≥13 approved).
4. Poisson: with λ=1.19 orders/day compute P(0 orders tomorrow) — meaningful for staffing/cash planning?
5. Bayes: tweak §2.2 to a 5% false-positive rate — how does P(fraud|flag) change? Write the governance takeaway in one line.
6. Quick CLT experiment: resample 1000 means of 40 orders each from order values; histogram them; fit-eye a bell; compare histogram's sd to σ/√40.

## 💪 Exercises
1. E[X] ethics: a ₹10L insurance claim with 1% probability and a premium of ₹12,000/day-equivalent pricing — compute the insurer's edge. Why is it legal/fair?
2. If Var(X) uses (x−EX)², why not |x−EX|? (Hint: math convenience — but name the absolute measure too.)
3. Monthly revenue sd 7.35% growth — convert to a 2σ "normal band" for next month's growth; is a −9% month a crisis or noise?
4. Poisson's mean=variance check: compute orders/day mean & variance from Sales (group by date). Over-dispersed? What business reality violates Poisson assumptions?
5. Why do quants model logs of prices but never logs of negative numbers (losses)?

### ✅ Selected answers
- Ex 1: E[payout]=₹10,000 vs premium ₹12,000 → ₹2,000/day margin for capital + tail-risk bearing — that's the whole insurance business model.
- Ex 3: band = 1.5% ± 14.7% ⇒ −9% is INSIDE 2σ noise. Not a crisis; grief should arrive around z < −2 to −3.

## ❓ Quiz
1. P(fraud|flag) stayed ~9% despite a "99% accurate" test — the villain?
2. What three inputs define a Binomial question in finance?
3. CLT says WHAT becomes normal, and at what error rate?
4. Why log-normal for prices instead of plain Normal?

### ✅ Answers
1. The base rate: rare events (0.1%) generate so few true cases that false positives dominate the flags. Bayes puts prevalence first.
2. n, p, and independence — and the count/question itself; breaking independence (recession contagion) breaks Binomial too.
3. The distribution of SAMPLE MEANS, with standard error σ/√n — irrespective of the parent distribution, given sufficient n.
4. Prices are ≥0 and multiply; logs make growth additive and roughly bell — so log(prices) ≈ normal ⇒ prices ≈ log-normal.

## ✅ Mastery checklist
- [ ] E[X]/σ scenarios computed for a project
- [ ] z-score alert map produced for revenue
- [ ] Binomial + Poisson solved from our own rates
- [ ] CLT demonstrated by your own resampling

**Next: St3 — confidence intervals & hypothesis testing: prove it, don't feel it. 🎯**
