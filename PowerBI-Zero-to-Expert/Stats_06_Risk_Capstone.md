# St6 · Risk Statistics & the Expert's Toolkit: VaR, Bootstrap, Portfolios & the Capstone Memo

> *Welcome to the pro tier: the statistics that measure disaster (VaR), rescue truth from tiny samples (bootstrap), combine securities safely (covariance portfolio math), and protect you from your own enthusiasm (backtest hygiene). Final artifact: a one-page statistical risk memo on ShopKart you'd be proud to send a CFO.*

## 🎯 Objectives
VaR (historical & parametric) + Expected Shortfall · fat tails & normality testing · bootstrap confidence intervals · 2-asset portfolio mean/variance with covariance · diversification math · multiple-testing & backtest discipline · capstone: the ShopKart statistical risk memo.

---

## 📘 6.1 VaR — "how bad, how often?"

**Value-at-Risk(α, horizon)** = the loss level only α% of outcomes will exceed. USDINR monthly returns (n=23, mean −0.12%, sd 0.34%):

```python
import numpy as np
r = fx.pct_change().dropna()["USDINR"].values
var95_hist = np.percentile(r, 5)                       # historical: just read the 5th percentile
from scipy import stats as st
var95_param = st.norm.ppf(0.05, r.mean(), r.std())     # parametric: assume Normal (−1.645σ)
```

Say it as the pros do: "95% one-month VaR on USDINR exposure is about x% — losses worse than this should happen ~1 month in 20." Horizon scaling: √t (monthly→annual sd ×√12) assumes i.i.d. — flagged every time (crises cluster; i.i.d. dies when you need it most).

## 📘 6.2 Expected Shortfall — VaR knows the door, ES sees the room behind it

VaR says where the cliff STARTS. **ES/CVaR** = the average loss GIVEN you're past the cliff — what CFOs actually lose sleep over:

```python
es95 = r[r <= var95_hist].mean()
```

ES respects tail shape (coherent risk measure); VaR can be blind to it. Basel rules moved banks to ES for exactly this. Always report them as a pair.

## 📘 6.3 Is it even Normal? Testing before trusting

```python
st.jarque_bera(r)        # JB test: skew/kurt vs Normal — p<0.05 ⇒ non-normal tails
st.normaltest(r); r_std = (r - r.mean())/r.std()
print(pd.Series(r_std).skew(), pd.Series(r_std).kurt())
```

Finance returns: excess kurtosis > 0 (fat tails) more often than not. Consequences: parametric (Normal) VaR UNDERSHOOTS real tail frequency ⇒ prefer historical VaR or Student-t fits for risk; report JB p-value beside any Normal-based claim. This single habit places you ahead of most analysts.

## 📘 6.4 Bootstrap — intervals without formulas

No Normal assumption? No clean formula (median revenue!? Sharpe ratio?!)? **Resample the data with replacement** thousands of times, recompute the statistic, read the percentiles:

```python
rng = np.random.default_rng(42)
boot = [np.median(rng.choice(rev_m, len(rev_m), replace=True)) for _ in range(5000)]
lo, hi = np.percentile(boot, [2.5, 97.5])             # 95% CI for MEDIAN monthly revenue — no t-table!
```

Works for Sharpe CIs, regression coefficients, weird ratios — any statistic. Note: time series needs BLOCK bootstrap (preserve autocorrelation — resample chunks of months, not singles! §St5's lesson).

## 📘 6.5 Two-asset portfolio math — diversification's formula

Two assets with weights w₁,w₂, expected returns μ₁,μ₂, sds σ₁,σ₂, correlation ρ:

```python
mu_p  = w1*mu1 + w2*mu2
var_p = (w1*sd1)**2 + (w2*sd2)**2 + 2*w1*w2*sd1*sd2*rho
sd_p  = var_p ** 0.5
```

Watch `rho` do its magic: ρ=+1 → portfolio sd = weighted average (no diversification); ρ=0 → sd drops; ρ=−1 → weights can cancel risk entirely (perfect hedge). **Diversification works by exploiting correlation below 1** — the only free lunch in finance. Corr matrix from St4 IS your portfolio sand-box (US equity + gold + cash India-style ρ≈0/negative regimes).

## 📘 6.6 Multiplicity & backtest hygiene — the expert's conscience

- **Bonferroni**: testing m claims ⇒ per-test α/m (naive-safe); Holm & Benjamini-Hochberg (FDR) = smarter power. Our St3 campaigns example: 18 tests ⇒ α'=0.0028.
- **Backtest sins**: data-snooping (tested 200 strategies, published the winner), look-ahead bias (used info not available at trade time), survivorship bias (dropped dead companies), and in-sample shows (St5's walk-forward!). Same sins exist in ML feature-mining and Excel-what-if "research".
- Remedy kit: log hypotheses BEFORE testing, split-sample discipline, report ALL tested variants, and a healthy prior: "that backtest with 40%/yr is probably a bug". If you internalize ONE thing at expert level — it's this list.

## 📘 6.7 The capstone memo — your final artifact

<section>

### Template: Statistical Risk Memo (1 page)

1. **Descriptive portrait** (St1): center, spread, CV, skew/outliers of revenue & order values.
2. **Distributional claims** (St2): growth ~N(1.5, 7.35) ⇒ P(down-month >5%) ≈ 19%; JB check.
3. **Estimation honesty** (St3): AOV 95% CI; segment difference test (verdict + effect size).
4. **Drivers** (St4/St5): marketing-revenue assoc 0.43 with causality caveats + seasonal indexes for budget months.
5. **Risk numbers** (St6): USDINR VaR/ES; FX impact on a ₹ import budget sensitivity.
6. **Recommendation**: 2–3 sentences max, numbers attached, interval-aware, no naked forecasts.

</section>

---

## 🧪 LAB St6 — Risk desk, live (75 min)

1. Compute historical + parametric VaR95 for USDINR monthly; then Student-t scaled version; compare — defend your choice citing JB/skew/kurt from §6.3.
2. ES95 beside it; write the VaR+ES sentence a risk committee would accept.
3. Bootstrap 95% CI for the MEDIAN monthly revenue (5,000 resamples); then a SHARPE bootstrap CI on monthly revenue growth (yes, revenue growth as pseudo-return; label assumptions!).
4. Portfolio demo: Revenue-growth as "asset A", Marketing-spend-growth as "asset B" (education mode!): μ, σ of each; ρ; then 60/40 portfolio sd vs both assets' sd — quantify the diversification benefit in one line.
5. Multiple-testing: 20 random β-hunts (permuted-month regressions!) at α=.05 — count significant hits BY LUCK (expected 1); apply Bonferroni; report what survives (hint: nothing honest).
6. Write the full §6.7 memo in Markdown, export; get it reviewed (friend/mentor/LLM), revise once.

## 💪 Exercises
1. VaR horizon scaling √(t) assumes WHAT, and when does it fail most dangerously?
2. Parametric-VaR is typically tighter/less conservative than historical when data is fat-tailed — why, and why is that double-edged?
3. Bootstrap with time-ordered data: why do single-point resamples destroy autocorrelation, and what does block bootstrap preserve?
4. ρ → −1 perfect hedge with weights w₁=σ₂/(σ₁+σ₂): derive from the variance formula (set var=0 path), explaining the intuition behind the ratio.
5. "1 month VaR exceedance in 20 expected, but we saw 4 in a row" — which assumption broke, and which improvement (name one) anticipates clustering?

### ✅ Selected answers
- Ex 1: i.i.d. returns; volatility regimes and clustering (GARCH effects) — crises autocorrelate, so scaled-VaR looks calm right into the storm.
- Ex 4: plug ρ=−1: var=(w₁σ₁−w₂σ₂)² → zero when w₁σ₁=w₂σ₂ ⇒ weights in the RATIO of the OTHER's sd — inverse-risk hedging, textbook perfect-hedge case.

## ❓ Quiz
1. VaR vs Expected Shortfall — the committee-safe one-liner on each?
2. Bootstrap replaces WHAT with WHAT?
3. The multiplication term 2w₁w₂σ₁σ₂ρ is how diversification enters the formula — state the implication when every ρ→+1 (crisis)?
4. The three backtest sins + the universal remedy.

### ✅ Answers
1. VaR: loss exceeded with probability α (the cliff edge); ES: average loss once past VaR (depth below) — pair them; ES is tail-coherent, Basel-preferred.
2. Parametric formula assumptions with resampling (with replacement) of YOUR own data — intervals for statistics without closed forms.
3. Crisis = correlations converge to 1 ⇒ diversification evaporates exactly when needed (portfolio sd → weighted average of component sds). Plan for "ρ jumps".
4. Data-snooping / look-ahead / survivorship; remedy: pre-declared hypotheses + walk-forward/out-of-sample + full-variant reporting — inspire paranoia.

## ✅ Mastery checklist
- [ ] VaR + ES computed, defended with tail evidence
- [ ] Bootstrap CI run (level AND Sharpe case)
- [ ] 2-asset risk math derived, diversification quantified
- [ ] Multiplicity + backtest-sins radar auto-engaged
- [ ] **Capstone memo delivered** 📄

**🏆 STATISTICS TRACK COMPLETE.** You now think statistically about money: shape → uncertainty → proof → drivers → time → risk. That's the brain every quant desk and CFO office pays for. Pair this with Python-for-Finance and you're the full analyst weapon. ⚡📐
