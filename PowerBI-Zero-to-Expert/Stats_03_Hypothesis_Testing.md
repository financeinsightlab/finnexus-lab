# St3 · Estimation & Hypothesis Testing: Prove It, Don't Feel It

> *"Consumer orders average higher — I can see it!" Really? With what confidence? This module converts vibes into verdicts: confidence intervals, p-values (demystified once and for all), t-tests, chi-square — and the sample-size math that auditors live by. You'll test ShopKart's segments, regions, and campaigns for real.*

## 🎯 Objectives
Point estimates + standard error · confidence intervals (with the √n law) · sample size for audits · H0/H1, α, p-value honesty · one- & two-sample t-tests · chi-square independence · Type I/II errors & practical vs statistical significance.

---

## 📘 3.1 Estimate + uncertainty = the honest statement

A number without an error bar is a guess. From St2: **standard error SE = σ/√n** measures how much the sample mean would wiggle if we re-sampled. The full claim is always: **estimate ± (critical value × SE)**.

```python
n, xbar, sd = 1300, 47918, 72505
se = sd / (n ** .5)                     # ≈ 2,011
print(f"AOV = ₹{xbar:,.0f} ± ₹{se:,.0f} (1 SE)")
```

## 📘 3.2 Confidence intervals — the range that traps the truth

**95% CI = x̄ ± t̂ × SE**, where t̂ ≈ 1.96 for large n (t-table for small n: df = n−1). With n=1300: AOV 95% CI ≈ ₹43,975…₹51,861.

```python
from scipy import stats                        # in Colab: preinstalled
stats.t.interval(0.95, df=n-1, loc=xbar, scale=se)
# Excel: =T.INV(0.975, n-1) * se ; or Analysis ToolPak → Descriptive Statistics ✓Conf Lvl
```

**Meaning (say it carefully!):** the PROCEDURE traps the true mean 95% of the time — not "95% chance the true mean is in THIS one interval". Wrong phrasing fails interviews; right intuition everywhere else.

The √n law strikes: want twice the precision ⇒ 4× the sample. Under-sampled pilots "prove" nothing; auditors therefore PLAN sample sizes:

```python
n_req = (1.96 * sd / margin) ** 2     # margin of error target, e.g., ±₹2,000 ⇒ ~5,053 orders!
```

## 📘 3.3 Hypothesis testing — the courtroom

- **H₀ (null)** = "nothing happened" (the defendant: assumed innocent).
- **H₁ (alt)** = "the effect is real".
- Data plays evidence; if evidence convicts beyond a threshold **α** (usually 0.05), we "reject H₀". Otherwise "fail to reject" — never "accept H₀" (insufficient evidence ≠ innocence).

## 📘 3.4 p-values — finally, honestly

**p = P(data at least this extreme, IF H₀ were true).** Small p ⇒ surprising data under "no effect" ⇒ doubt H₀. p is NOT: the probability the effect is real, nor the size of the effect. A p=0.001 can describe a ₹3 difference with huge n (statistically sure, practically nothing). ALWAYS pair p with the effect size + CI.

## 📘 3.5 One-sample t-test — "Is Consumer AOV really ₹50k?"

Consumer segment: n=575, mean ₹50,194. Test vs benchmark μ₀=₹45,000:

```python
from scipy import stats
vals = df.loc[df.CustomerID.map(cust_seg)=="Consumer", "OrderValue"]
stats.ttest_1samp(vals, 45000)         # → t ≈ ?, p ≈ ?
# Hand: t = (x̄ − μ₀)/(sd/√n), df = n−1, compare |t| to t-table ≈1.96
```

Excel route: compute t by formula, `=T.DIST.2T(ABS(t), df)` → p.

## 📘 3.6 Two-sample t-test — the A/B workhorse

Consumer ₹50,194 (n=575) vs Corporate ₹43,556 (n=372) — differ by ₹6,638… or is that noise?

```python
stats.ttest_ind(consumer_vals, corporate_vals, equal_var=False)   # Welch ≠ pooled — safer default
```

If p < 0.05: "the gap is statistically significant at 5%" (then report the ₹ gap + CI for the difference!). If p ≥ 0.05: "insufficient evidence — do NOT conclude they're equal; under-powered tests see nothing." Power lesson: with small samples, only HUGE effects turn significant.

## 📘 3.7 Chi-square independence — categories, not means

Is **Segment independent of Region?** 30 customers: count table Segment × Region, expected counts under independence = (row total × col total)/N, then:

```python
from scipy import stats
tbl = pd.crosstab(customers["Segment"], customers["Region"])
stats.chi2_contingency(tbl)
# Excel: =CHISQ.TEST(actual_range, expected_range)
```

χ² = Σ (obs−exp)²/exp. Watch small expected counts (<5) — rerun with merged cells/simulation. Finance uses: defaults × branch, fraud flags × payment mode, audit findings × process owner.

## 📘 3.8 Errors, α, and the analyst's conscience

| Reality ↓ \ Verdict → | Fail to reject | Reject H₀ |
|---|---|---|
| **H₀ true** | ✅ 1−α | ❌ **Type I** (α = false alarm) |
| **H₀ false** | ❌ **Type II** (β = miss) | ✅ power = 1−β |

Trading desks set α tiny (fat tails lurk); marketing pilots accept 10%. Multiple comparisons flood: 20 tests at α=5% ⇒ expect ~1 false hit BY LUCK (St6's Bonferroni fixes this). And the ultimate honesty: **a peeked-at, refit 50 times "discovery" is data snooping** — pre-register your test before looking (yes, even internally).

---

## 🧪 LAB St3 — Stat testing, ShopKart edition (60 min)

1. 95% CI for overall AOV by hand + scipy; then CI using only the first 100 orders — same data, smaller n: how much wider? (Feel the √n law in your hands.)
2. Sample size: how many orders to pin AOV within ±₹1,500 at 95%? Compare with the 1,300 we have.
3. One-sample: Consumer segment vs ₹45,000; two-sample Welch: Consumer vs Corporate — verdicts, p-values, and the ₹-gap CIs. Write the exec sentences.
4. Chi-square: Segment × Region on customers. Independent? Which cell contributes the biggest surprise? Plot the table as a heatmap (pandas `.style.background_gradient`).
5. Two-sided vs one-sided: rerun Consumer-vs-45k as one-sided (H₁: greater) — how does p halve? When is one-sided LEGITIMATE vs when is it p-hacking?
6. Power thought experiment: segments Home Office vs Corporate differ ₹5k — IF n were 50 each, would you have caught it? (Simulate: sample 50, test, repeat 200 times; count "significant".)

## 💪 Exercises
1. A "95% CI" computed on SKewed order values — what assumption bends slightly, and what makes it still usable here?
2. Marketing twice ran a "significant p=0.03" campaign study among 18 variants — expected number of false hits, the fix's name, and the new per-test α?
3. "Fail to reject" ≠ "accept": give the audit-risk framing in one sentence.
4. Why does Welch beat Student's pooled t-test as a default?
5. Auditors often use 90% (not 95%) confidence for attribute sampling — what error are they tolerating more of, and why is that rational for THEM?

### ✅ Selected answers
- Ex 2: ~0.5… but with correlation/hidden multiplicity closer to "at least 1"; **Bonferroni**: α' = 0.05/18 ≈ 0.0028 per test (conservative; Holm/BH refine).
- Ex 4: Welch doesn't assume equal variances — equal-variance assumption failing with uneven n inverts real error rates; cost of Welch = slightly fewer degrees of freedom.

## ❓ Quiz
1. The correct meaning of a 95% confidence INTERVAL?
2. p = 0.02 means what exactly (and what does it NOT mean)?
3. Type I vs Type II error in plain words? Who chooses α?
4. Chi-square: when do small expected counts invalidate it?

### ✅ Answers
1. The PROCEDURE catches the true parameter in 95% of repeated samples; this one interval either does or doesn't (we behave as if it does).
2. Under "no effect", data this extreme has 2% probability. NOT: 2% chance H₁ is false, nor that the effect is big.
3. I: convicting an innocent H₀ (false alarm, α) · II: acquitting a guilty one (missed effect, β). The analyst/business sets α by the cost of each.
4. Expected < ~5 in cells → χ² approximation breaks; merge rows/cols or simulate/exact-test.

## ✅ Mastery checklist
- [ ] CIs by hand + scipy; √n law felt in lab
- [ ] t-tests both kinds interpreted (effect + CI + p, all three!)
- [ ] Chi-square with heatmap + weak-cell judgment
- [ ] Multiplicity & Type I/II in the memory bank

**Next: St4 — correlation & regression: from "moves with" to "explains" (and the beta that feeds CAPM). 📉**
