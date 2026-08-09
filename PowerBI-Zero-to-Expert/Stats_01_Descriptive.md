# St1 · Descriptive Statistics for Finance: See the Shape Before the Sum

> *Before any model, any dashboard, any forecast — comes one question: what does my data LOOK like? Finance analysts who skip this step report averages that lie. You'll learn to summarize any dataset honestly — with Excel, pandas, and your own eyes — using ShopKart's 1,300 real orders.*

## 🎯 Objectives
Populations vs samples · data types · mean/median/mode & which survives skew · weighted means · variance, sd, CV · percentiles, IQR, outliers · skew/kurtosis intuition · your first statistical portrait of ShopKart.

---

## 📘 1.1 Population vs sample — the frame for everything to come

- **Population (N)** = ALL of it: ShopKart's 1,300 recorded orders *are* the population of past orders.
- **Sample (n)** = a slice used to infer: those 1,300 orders are a *sample* of "all orders ShopKart will ever take".

This single distinction changes formulas (÷N vs ÷(n−1), §1.6!) and the meaning of every conclusion: describing the past (certainty) vs betting on the future (uncertainty). St3 turns that gap into math.

**Data types you must tag before computing:** nominal (Category), ordinal (ratings), interval (dates differences), ratio (₹ amounts, quantities). Mean is legal only on interval/ratio; median survives everything ordinal+; mode is your only friend on nominal ("what sells most").

## 📘 1.2 Center — and the lying average

ShopKart order values: **mean ₹47,918 · median ₹22,555 · min ₹239 · max ₹5,27,992**. The mean is *double* the median! Why? A few ₹5-lakh laptop orders drag the average up while half the orders sit under ₹22.5k. **Right-skew: mean > median > mode.** For "typical order", the MEDIAN is honest; the mean answers "total ÷ count" (needed for capacity/finance totals!).

```python
# Excel:      =AVERAGE(rng)   =MEDIAN(rng)   =MODE.SNGL(rng)
# pandas:     df["value"].mean()  .median()  .mode()[0]
```

Rule of thumb: skew > ~1 → report median alongside mean, always with n. Reporting only the mean on skewed money data = the classic rookie trap (audit committees LOVE catching it).

## 📘 1.3 Weighted means — the AOV you already know

```python
# NOT mean(UnitPrice)! weight by units sold:
AOV_like = Σ(Revenue) / Σ(Quantity)         # ₹ paid per unit
# In SQL (S2):     SUM(qty*price)/SUM(qty)
# In pandas:       (df.Revenue.sum() / df.Quantity.sum())
```

Portfolio returns, WACC, average purchase price after averaging-down a stock — all weighted means where weights are money, not counts.

## 📘 1.4 Spread — range, variance, standard deviation

```python
# Population vs SAMPLE (the ÷N vs ÷(n−1) Bessel fix):
# Excel:   =STDEV.P(rng)   =STDEV.S(rng)   =VAR.P / =VAR.S
# pandas:  df.std(ddof=0)  df.std()        # pandas default = sample (ddof=1) ✅
```

Order values: **sd ≈ ₹72,505** — bigger than the mean! Interpretation: order sizes swing enormously (skew + heavy right tail). Standard deviation is in the SAME units as data (₹) — variance is ₹² (nobody speaks squared rupees), so report sd, compute var.

## 📘 1.5 Coefficient of Variation — apples-to-apples riskiness

```python
CV = sd / mean        # unitless: compare spread across scales!
```

Monthly revenue: mean ₹20,83,169, sd ₹2,13,131 → **CV ≈ 10.2%** (steady business). USDINR monthly returns CV… mean is −0.124% vs sd 0.341% → CV explodes (mean near zero!) — CV breaks when means approach 0 or can flip sign; use it for levels (₹, units), never for returns/growth.

## 📘 1.6 Percentiles, quartiles, IQR & outliers

```python
# Order: P25 P50 P75; IQR = Q3−Q1; fences = Q1−1.5·IQR, Q3+1.5·IQR
# pandas: df.value.quantile([.25,.5,.75,.9,.95,.99])
# Excel:  =QUARTILE.INC(rng,1)   =PERCENTILE.INC(rng,0.95)
```

Above the upper fence = statistical outlier. On ShopKart orders the fence flags the laptop-whales — they're LEGIT (big-ticket category), so investig-ate before elimin-ate: outliers are errors sometimes, insights often, and in finance sometimes fraud (Benford-adjacent instincts).

## 📘 1.7 Shape — skewness & kurtosis, decision use

- **Skewness**: negative = left tail (insurance losses framing), positive = right tail (revenues, incomes, order sizes, loss amounts). Sign tells you WHERE danger/opportunity clusters.
- **Kurtosis (excess)**: fat tails vs normal. Positive ⇒ extremes happen more than a normal world predicts. Return-series risk models that assume normality die here (St6's VaR catches this).

```python
# pandas:  df.value.skew()   df.value.kurt()
# Excel:   =SKEW(rng)   =KURT(rng)
```

## 📘 1.8 The descriptive portrait — your new opening ritual

For ANY finance series, print this wall in 30 seconds (pandas describe + a few adds):

```python
s = df["value"]
summary = {"n": s.count(), "mean": s.mean(), "median": s.median(),
           "sd": s.std(), "cv": s.std()/s.mean(), "min": s.min(),
           "q25": s.quantile(.25), "q75": s.quantile(.75), "max": s.max(),
           "skew": s.skew(), "kurt": s.kurt()}
```

+ a histogram (buckets tell the truth) + a boxplot (medians & outliers at a glance). Numbers AND pictures — never just one of them.

---

## 🧪 LAB St1 — The ShopKart portrait (50 min)

1. Load Sales; build `OrderValue = Quantity × UnitPrice × (1−Discount)`. Print the full §1.8 summary. Verify mean≈₹47.9k, median≈₹22.6k — then state in one sentence WHY they diverge.
2. Same portrait by **Category** (merge Products): which category has the highest CV (most unpredictable order sizes)? Plot a boxplot per category.
3. Compute the IQR fences; count outliers; list the top-10 outlier orders — are they errors or legit? Your verdict + rule for treating them.
4. Discipline check: compute order-value sd with ddof=0 vs ddof=1 — why do they differ, and which applies here (population of PAST orders vs sample of FUTURE)?
5. Quantity distribution: mean vs median again; is qty skewed the same direction as value? (Spoiler: mostly — but compare magnitudes of skew.)
6. Write the CFO one-liner: "Typical order = ₹___ (median); average = ₹___ because ___ orders pull it up; monthly revenue CV = ___% ⇒ ___ ."

## 💪 Exercises
1. When would the mean still be the RIGHT "typical" value even under skew?
2. Geometric vs arithmetic mean — which compounds correctly, and why can't arithmetic mean-average returns?
3. Compute monthly-revenue (GL Sales Revenue) skew. Is it near zero? What does that hint about using normal models per St2? 👀
4. Two datasets share mean AND sd but look wildly different — what's the statistical name of this trap? (Hint: a famous dinosaur/clown gallery of scatterplots.)
5. Why is variance measured in ₹² never reported directly to management?

### ✅ Selected answers
- Ex 1: Capacity/finance planning needs totals: total revenue = mean × N — the mean preserves totals even when it's not "typical".
- Ex 4: **Same summary stats, different distributions** — the Anscombe's-quartet lesson: always plot, never trust naked numbers!
- Ex 2: Geometric: `(Π(1+r))^(1/n)−1` — arithmetic mean overestimates compounded growth (volatility drag).

## ❓ Quiz
1. Mean = 2× median on order values— what shape is implied, and which stat is "typical"?
2. When does CV mislead?
3. What does ddof/Bessel's n−1 correction account for?
4. An order above Q3 + 1.5·IQR is…?

### ✅ Answers
1. Strong right-skew — median = the typical value; mean = totals ÷ n (still needed for capacity math).
2. When means hover near zero or can be negative (returns, growth, net income swings) — CV explodes/flips meaning.
3. Sample variance ÷(n−1) unbiases the estimate — your sample's spread would understate the true population's if divided by n.
4. A flagged outlier — investigate (error? whale? fraud?) BEFORE deleting. Data ≠ bad just because it's big.

## ✅ Mastery checklist
- [ ] Full descriptive portrait produced for order values & monthly revenue
- [ ] Can defend median-vs-mean under skew to any CFO
- [ ] CV + IQR fences + skew/kurtosis computed & interpreted
- [ ] ddof discipline understood (sample vs population)

**Next: St2 — probability & distributions: expected value, z-scores, the Normal's promises (and its lies). 🎲**
