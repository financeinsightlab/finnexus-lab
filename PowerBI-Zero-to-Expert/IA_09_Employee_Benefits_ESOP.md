# 🎯 IA9 · Employee Benefits & Share-Based Payments — Ind AS 19 & 102

> People costs look simple on the payroll line and hide an actuarial universe beneath it. Ind AS 19 forces defined-benefit promises (gratuity, pensions) onto the balance sheet at actuarial present value — with a brutal presentation law: salary-driven service costs hit P&L, assumption-driven shocks hit OCI and NEVER come back. Ind AS 102 prices ESOPs at fair value on grant day — or re-prices them forever if you settle in cash. This module makes both machines run with real numbers.

---

## 🎯 Objectives

- Sort employee benefits into the four Ind AS 19 families and identify the defined-contribution vs defined-benefit fork
- Run defined-benefit mechanics: projected unit credit, DBO, the fiscal anatomy of the annual charge (P&L vs OCI)
- State the remeasurement law: actuarial gains/losses to OCI, never recycled — and why
- Account for equity-settled vs cash-settled share-based payments, including vesting true-ups
- Read a fund's asset ceiling and discount-rate disclosure like an analyst

## 📘 Concepts

### 9.1 The four families and the DC/DB fork

Ind AS 19 sorts employee benefits: **short-term** (salaries, annual leave — accrue, undiscounted, simple), **other long-term** (long-service leave, sabbaticals — actuarial like DB but remeasurements go to **P&L**, a deliberate simplification), **termination benefits** (recognized at the earlier of the offer being accepted-without-withdrawal-possibility or restructuring recognition), and **post-employment** benefits — where the great fork lives: **defined contribution** (company pays a fixed % to a fund — EPF-style structures where the company's obligation ends at the contribution; expense = contribution, no actuarial BS) versus **defined benefit** (company owes a PROMISE — gratuity, legacy pensions — regardless of how the fund performs; the shortfall risk is the employer's). In India, note EPF history: certain exempted trusts guaranteeing rates carried DB characteristics — the fork hides inside legacy arrangements.

### 9.2 The DB machine — projected unit credit

The DBO (defined benefit obligation) is built by the **projected unit credit method**: each year of service earns one extra "unit" of the final promise; project the final salary, convert one service-year's slice of the formula to its retirement-date amount, then **discount at the yield on high-quality corporate bonds** (government securities where the corporate curve is thin) matching the obligation's currency and duration. Canon case (every number python-verified): employee at ₹50,000/month today, salary growth 5%, 28 years to retirement, gratuity formula 15/26 × last-drawn monthly salary per year of service, discount 7.2%. Final monthly salary = 50,000 × 1.05^28 = **₹1,96,006**. One service-year's unit at retirement = 15/26 × 1,96,006 = **₹1,13,081**. Discounted 28 years: **₹16,141** — this year's **current service cost** per employee (with probability adjustments in practice). DBO after 5 completed years (23 years to go) = 5 × 1,13,081 / 1.072^23 = **₹1,14,256 ≈ ₹1.14L**. Scale by the workforce and you see why gratuity disclosures carry crore-level DBOs from rupee-level units.

### 9.3 The year's charge — the P&L/OCI anatomy

An unfunded plan's movement splits into three boxes:

| Component | Destination | Driven by |
|---|---|---|
| Current service cost (+ past service cost on amendments, settlements) | **P&L** | service earned this year |
| **Net interest** on the net DBO (DBO × discount rate; if funded, on DBO − plan assets using the same rate) | **P&L** | the ticking clock |
| **Remeasurements** — actuarial gains/losses from experience deviations and assumption changes (discount rate swings, salary-growth reality, mortality tables); return on plan assets beyond interest | **OCI — NEVER recycled to P&L** | assumptions vs reality |

The law's logic: service and interest are economics of the year; actuarial noise is the market/assumption weather — parking it in OCI (Bucket A) stops a 50bp rate fall from vandalizing operating profit, and the no-recycling rule stops companies from smoothing it back later. Consequence you must be able to say out loud: a discount-rate fall from 7.2% to 6.7% inflates the DBO by roughly its duration × 0.5% — on a long gratuity book that is a high-single-digit % jump, straight to OCI, visible in "other comprehensive income" the same year.

### 9.4 Funded plans and the asset ceiling

Most Indian gratuity is funded (insurer-managed trusts). The balance sheet shows the **net** position: DBO minus fair value of plan assets — a deficit is a liability, a surplus tests the **asset ceiling** (recognize only what is recoverable via refunds or reduced future contributions). Plan-asset returns split: interest income (at the discount rate) through P&L net interest, and the **excess/shortfall actual return** through OCI remeasurements. Analyst's read: investment-return assumptions embedded inside "expected return" lines are gone — the standard makes actual-vs-imputed differences confess in OCI; persistent actuarial losses on assumptions (salary growth reality exceeding projections) signal under-promised obligations.

### 9.5 Ind AS 102 — pricing employee stock

Share-based payments pay people in paper; the standard expenses the paper at **fair value**. Two machines:

1. **Equity-settled (classic ESOP)**: measure the OPTION's fair value at **grant date** (Black-Scholes-style models: market price, exercise price, term, volatility, dividends, risk-free rate); recognize over the **vesting period** as employee cost with a credit to equity (share-options/ESOP reserve). **Never remeasure the option value afterwards** — but DO true-up the **number** expected to vest for service/non-market conditions each year (resignations eat grants), so cumulative expense = grant-date FV × final actual vesting. Market conditions (share-price targets) are inside the FV and never trued up; non-market performance conditions (EPS hurdles) ride the vesting-probability true-up.
2. **Cash-settled (SARs/phantom stock)**: recognize a **liability remeasured at fair value every reporting date** through P&L until settlement — volatility lives in profit, which is exactly why CFOs prefer equity-settled design.

Contrast in one line: equity-settled freezes value at grant and trues up count; cash-settled unfreezes value forever. Disclosure: schemes, assumptions (volatility methods), expense, and movements — the notes let you reverse-engineer dilution from the forge of formulas.

## 🧪 LAB — Price the Promise (10 min)

NovaServices gratuity facts: unfunded; employee cohort DBO opening ₹8.0cr; discount rate 7.2% (matched high-quality corporate yields); current service cost ₹1.1cr; benefits paid ₹0.6cr; an assumption-refined actuarial loss of ₹0.9cr (salary-growth reality exceeded projections); a plan amendment increased benefits with past-service cost ₹0.4cr.

1. Build the DBO roll-forward to closing.
2. Split the year's charge: P&L total vs OCI total.
3. The CFO wants to amortize the ₹0.9cr actuarial loss into future P&L "like old AS 15 did(ish)". Rule on it.
4. Next year the company funds the plan with ₹5.0cr to an insurer trust — actual return ₹0.5cr vs interest-implied ₹0.36cr. Where does the ₹0.14cr excess go?

**Why this matters:** roll-forwards plus the P&L/OCI split are the two things every annual-report note on gratuity actually contains — build one and the note reads itself forever.

**🔑 Lab answers:**
1. Closing DBO = 8.0 + 1.1 (service) + 8.0×7.2% = 0.576≈0.58 (interest) + 0.4 (past service) + 0.9 (actuarial loss) − 0.6 (benefits) = **₹10.38cr**.
2. P&L = service 1.1 + net interest 0.58 + past service 0.4 = **₹2.08cr**; OCI = **₹0.9cr actuarial loss** (Bucket A — permanent).
3. Rejected: remeasurements are recognized **immediately in OCI, never recycled** — no corridor mechanism survives in Ind AS; amortizing into future profit is precisely what the standard closed down.
4. The ₹0.14cr excess actual return over interest-implied goes to **OCI** as a remeasurement (return on plan assets excluding interest income) — P&L only ever sees the discount-rate-implied interest.

## 💪 Exercises

1. Your startup offers (a) EPF at 12% and (b) a self-promised "lifetime medical cover" to retirees. Sort both on the DC/DB fork with consequences.
2. Why does the standard force discounting at high-quality corporate bond yields rather than the company's own expected plan-asset return?
3. An ESOP grant: 100,000 options, grant-date FV ₹120, 3-year vesting, forfeitures now expected at 10%. Year-1 expense?
4. Same grant redesigned as SARs (cash). Stock-price-embedded FV rises to ₹150 by year-1. Expense effect vs answer 3?
5. A discount-rate fall of 60bp sent a ₹50cr DBO to ₹54cr with zero new hires. Write the OCI line and the one-sentence analyst explanation.

### ✅ Selected answers

1. (a) **DC** — expense is the 12% contribution; no DBO, no actuarial story in the vanilla case. (b) **DB** — a promise whose cost depends on future claims and survival; DBO by projected unit credit, remeasurements to OCI. The fork is who bears the promise risk — the fund's money or the company's.
2. The DBO measures the promise's cost to settle with certainty-like cash flows — using an asset-return expectation would let risky asset bets shrink a liability on paper before those bets pay off. High-quality bond yields price the obligation's own risk, not the investment strategy's hope.
3. Expected vesting = 90,000 options × ₹120 = ₹108L total; year-1 charge (1/3 vesting elapsed) = **₹36L** — with equity credit. (Final expense lands at grant-FV × ACTUAL vested count.)
4. Cash-settled remeasures: liability at year-1 = expected-vesting 90,000 × ₹150 × 1/3 = ₹45L → expense ₹45L vs ₹36L — the ₹9L uplift is the remeasurement rule in action: SARs carry FV volatility straight into profit.
5. OCI: "Remeasurement of defined-benefit plans — actuarial loss ₹4.0cr." Explanation: a 60bp fall in the discount rate mechanically re-priced the existing promise by its duration — assumption weather, recognized fully in OCI, never to be amortized or recycled.

## ❓ Quiz

**Q1.** In an unfunded gratuity plan, the year's actuarial loss from a discount-rate change is presented:
(a) spread into P&L over 5 years
(b) in OCI immediately and never recycled to P&L — assumption weather is parked permanently away from operating profit
(c) against the securities premium
(d) in P&L as employee cost

**Q2.** Discount rates for the DBO are anchored to:
(a) the company's borrowing cost
(b) yields on high-quality corporate bonds of matching currency and duration — govt securities where the corporate curve is thin
(c) the expected return on plan assets
(d) the RBI repo rate

**Q3.** An equity-settled ESOP grant's accounting signature is:
(a) remeasure every quarter through P&L
(b) measure at grant-date fair value, expense over vesting with true-ups for vesting PROBABILITY only — no value remeasurement ever
(c) expense the intrinsic value at exercise
(d) book no expense until exercise

### ✅ Answers

1. **(b)** — the remeasurement law; immediate, OCI-only, permanent — the corridor died with old GAAP.
2. **(b)** — price the promise, not the investment strategy.
3. **(b)** — equity-settled freezes value at grant; only the vesting count trues up.

## ✅ Mastery checklist

- [ ] I can sort any benefit into the four families and run the DC/DB fork
- [ ] I can build a unit-credit number (final salary → unit → discounted service cost)
- [ ] I can split a DB roll-forward into P&L vs OCI boxes without error
- [ ] I can explain the asset ceiling and where plan-asset excess returns land
- [ ] I can contrast equity-settled vs cash-settled share-based payment accounting cold

**Next:** IA10 puts performance on the scoreboard — Ind AS 33 basic vs diluted EPS with the anti-dilution sieve, and Ind AS 108's management-approach segments with the 10% and 75% tests.
