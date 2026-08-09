# St4 · Correlation & Regression: From "Moves With" to "Explains"

> *Correlation tells you two series dance together. Regression tells you the steps: "each extra ₹1L of marketing associates with ₹___ of revenue" — with significance, fit, and residual forensics. This is also where equity analysts' beloved β (beta) is born. Interpretation discipline inside → wrong regression reading costs real money.*

## 🎯 Objectives
Covariance & correlation (+ its six ways to lie) · correlation matrices for the finance desk · simple regression — meaning of slope, intercept, r² · multiple regression · residual/assumption forensics · prediction the honest way · Excel ToolPak + statsmodels.

---

## 📘 4.1 Covariance & correlation — the dance measure

```python
cov(X,Y) = Σ(x−x̄)(y−ȳ)/(n−1)          # joint wiggle, units mixed (₹×₹!) 
r = cov(X,Y) / (sd_x · sd_y)            # pure, scale-free, in [−1, +1]
# pandas: df[["X","Y"]].cov()  .corr()
# Excel:  =COVARIANCE.S  =CORREL
```

GL data: **Marketing ↔ Revenue monthly correlation ≈ 0.43** — positive, moderate. Revenue moves WITH marketing… but read on before you give the CMO a raise for it.

## 📘 4.2 The six lies correlation tells

1. **Causation**: ice-cream↔drowning → the heat causes both. Third variables lurk.
2. **Outliers**: one whale point can fake r=0.9 (plot first!).
3. **Range restriction**: filtered samples squash r.
4. **Non-linearity**: r≈0 can hide a perfect U-curve (it measures LINEAR only; Spearman's ρ on ranks helps monotone curves).
5. **Aggregation/Simpson**: r inside every region can invert overall.
6. **Spurious pairs**: two trending series correlate by time, not causality (St5 detrending handles).

## 📘 4.3 Simple regression — the line with meaning

**y = α + β·x + ε**, fitted by least squares (minimize squared residuals):

```
β = r · (sd_y/sd_x)      α = ȳ − β·x̄
```

```python
import statsmodels.formula.api as smf
m = smf.ols("Revenue ~ Marketing", data=monthly).fit()     # monthly 24-point table
print(m.params)                                            # Intercept=α, Marketing=β
print(m.summary())
```

- **β** ("slope"): each +₹1 Marketing associates with +₹β Revenue *on average, holding the world constant*.
- **α** ("intercept"): modeled value when x=0 — often uninformative physically.
- **r²**: fraction of revenue variance the line explains (r=0.43 ⇒ r²≈0.18 ⇒ only 18%!). R² is a FIT measure, not a truth serum.

Excel: `=SLOPE`, `=INTERCEPT`, `=RSQ`, or Data → Data Analysis → Regression for the full report.

## 📘 4.4 Beta — the finance-famous regression

Regress an asset's returns on market returns: **β_asset = slope = cov(asset, mkt)/var(mkt)** — the CAPM sensitivity of E6/St6 fame. β=1.2 moves 20% extra with the market. Same formula, same reading: it's not magic, it's St4 out for a walk. With our FX data, regress EURINR returns on USDINR returns — co-movement of FX pairs (drivers of import-pricing risk).

## 📘 4.5 Multiple regression — controls make β honest

```python
smf.ols("Revenue ~ Marketing + Rent + Salaries + np.log(UniverseSize)", data=monthly).fit()
smf.ols("OrderValue ~ Quantity + Discount", data=sales).fit()
```

- Coefficients now mean "holding the OTHERS constant" — ceteris paribus at last.
- **Adjusted R²**: penalizes junk-stuffing variables; watch it, not raw R², when comparing models.
- **Multicollinearity**: x's that clone each other (Rent & Salaries both scale with size) give wild, fragile signs; check VIF, drop or combine.

## 📘 4.6 Reading the statsmodels summary — the four lines that matter

| Line | Your question |
|---|---|
| `coef / std err` | sign & size of β per variable; `t = coef/se` |
| `P>|t|` | is THIS β≠0 believable? (<0.05 with eyes open for multiplicity) |
| `[0.025, 0.975]` | CI for β — tiny-meaningful effects have tight bands; wide bands = don't oversell |
| `R-squared / Adj.` / `F-stat` | overall fit / does the whole model beat nothing |
| (`Omnibus/JB`, `Durbin-Watson`) | residual sanity (St5's autocorrelation gate too) |

## 📘 4.7 Residual forensics — reality's complaint department

Residuals = y − ŷ. Plot them: (a) vs fitted — curvature? funnel shape (heteroscedasticity: errors grow with size → use logs/robust); (b) histogram/QQ — fat tails?; (c) vs TIME/row order — patterns = left-out structure. Good model residuals look like *boring noise*. A model with pretty numbers and patterned residuals is a liar in a suit.

```python
m.resid.hist(bins=30);  m.fittedvalues.plot(); m.resid.plot()
suspect = monthly.loc[abs(stats.zscore(m.resid))>3]    # >3σ residuals: audit them!
```

## 📘 4.8 Prediction with honest bars

`m.get_prediction(new_x).summary_frame(alpha=.05)` returns:
- **confidence interval** — for the MEAN line at x (narrow);
- **prediction interval** — for a FUTURE INDIVIDUAL outcome (wide — reality is noisier than the average).
Reporting only the point estimate is forecasting malpractice; seniors ship the interval.

Also: don't extrapolate wildly — x far outside data range makes regression a fiction generator (discount=90%? unseen territory!).

---

## 🧪 LAB St4 — Models with a spine (65 min)

1. Correlation matrix of the 24-month GL P&L accounts (Revenue, COGS, Marketing, Salaries, Rent, Travel); heatmap it; name the 3 strongest pairs and 1 suspiciously-high-but-spurious-looking pair with your why.
2. Simple: `Revenue ~ Marketing` — report α, β, r², β's 95% CI + p; draw the fitted line over the scatter; write the exec sentence ("each extra ₹1L marketing associates with ₹___… within a 95% band of ___").
3. Multiple: add COGS + Salaries. What happens to β_marketing and Adj R²? Comment on collinearity between COGS & Revenue (structural identities!).
4. Residual forensics on (2): hist + fitted-vs-resid + z>3 outliers; identify the outlier months and the business story.
5. OrderValue ~ Quantity + Discount (1300 rows): interpret both βs; predict an order with qty=8, disc=10% — give point + PREDICTION interval; why is the interval so wide relative to mean AOV?
6. Excel cross-check: same regression with SLOPE/INTERCEPT/RSQ — values must match pandas to the paisa; screenshot both.

## 💪 Exercises
1. Marketing corr 0.43: give two rival causal stories that fit equally well — and one DAG-ish question that could separate them (timing? lags?).
2. r = −0.02 between Discount and Quantity… but the U-plot shows discount 10–20% lifting qty: reconcile + the Spearman/other fix.
3. Perfect multicollinearity: add "Revenue_dup = Revenue" — what would statsmodels do and why shouldn't we test it on a live model?
4. Prediction vs confidence interval: which is narrower and why (one math clue about √n & one conceptual clue)?
5. Standardized βs (x and y z-scored) — what do they enable comparing, and why does the CFO still want raw βs?

### ✅ Selected answers
- Ex 1: "marketing lifts revenue" vs "good months free budget for marketing"; separation: check timing/LAGS (does marketing lead?), or natural experiments/geos with different spend.
- Ex 4: Confidence (for the line's mean) narrows as 1/√n; prediction must ALSO carry each new point's own noise (its irreducible σ) — hence always wider.

## ❓ Quiz
1. r=0.43 for marketing-revenue is evidence of…? Name what it's NOT evidence of.
2. Minimum least-squares solves what optimization?
3. Wide residual funnel vs fitted = name & one remedy?
4. β in CAPM equals which regression output?

### ✅ Answers
1. Positive linear association (association only) — not causation, not "marketing spends itself back", not a stable effect at other scales (range!).
2. Minimize Σ(yᵢ − ŷᵢ)² — squared vertical residuals; squaring makes big misses expensive and math differentiable.
3. Heteroscedasticity — errors grow with size; remedies: log-transform y (multiplicative worlds), robust SEs, or model the variance itself.
4. Slope of asset-returns regressed on market returns: cov/var(mkt). "High-β" = amplified market moves.

## ✅ Mastery checklist
- [ ] corr-matrix + heatmap on GL with 3 interpretations
- [ ] simple + multiple regression fit, read, and defended
- [ ] residual forensics + outlier months explained
- [ ] predictions shipped WITH intervals

**Next: St5 — time-series statistics: trend, seasonality, autocorrelation, forecasting & the spurious-regression trap. ⏱️**
