# 🎯 CB3 · Cost of Capital — Pricing the Hurdle

> Every NPV in this course divides by a rate somebody chose. Choose 10% and half the company looks profitable; choose 14% and it all dies. The hurdle is not a mood — it's the weighted price of the money funding the project. This module builds ShopKart's WACC brick by brick and then guards it: because hurdle-rate gaming is the capital committee's oldest drama.

---

## 🎯 Objectives

- Build WACC = E/V × Ke + D/V × Kd(1−t) with target weights and after-tax debt
- Source Ke honestly: CAPM (PM3 canon), and why promoters should demand their own higher bar
- Run levered/unlevered logic and divisional (project-specific) rates
- Handle new-issue floats and the marginal-vs-average distinction
- Detect the four ways hurdle rates get gamed in committees

---

## 📘 Concepts

### 3.1 The formula — a weighted bill, not a guess

**WACC = (E/V) × Ke + (D/V) × Kd × (1 − t).** ShopKart canon (CF/PM3): Ke = 13.5% (CAPM: Rf ~7% + β ~1.1 × ERP ~6%), Kd = 12%, tax 25.17% → after-tax Kd = 12 × 0.7483 = **8.98%**. Weights — use **target structure** (where the firm is heading), not book accident: ShopKart targets 70/30 (E/D ≈ per CF planning; market-today is 75.4/24.6): **WACC = 0.70 × 13.5 + 0.30 × 8.98 = 9.45 + 2.69 = 12.14%** (market weights give 12.39% — same neighborhood). This is the 12% hurdle we've used since TV4: now you see its receipt. The intuition to keep: **debt is cheaper but capped** — leverage past the comfort zone lifts BOTH Kd (bankers reprice risk) and Ke (equity owners see RT2's borrowed-ROE amplifier) until WACC turns back up; the U-curve is why "more debt = cheaper capital" dies in the second act.

### 3.2 Ke without a stock price — the private-firm problem

ShopKart isn't listed, so β can't be measured directly. The playbook: **pure-play proxy** — take listed comparables' betas, **unlever** them (strip their debt: β_asset ≈ β_equity / (1 + (1−t)D/E)), average, **relever** at ShopKart's target structure (β_E = β_asset × (1 + (1−t)D/E) — the Hamada bridge from CF course). Add-ons some desks apply: size premium (+1-2% small co), promoter-concentration premium. The honest auditor's warning: **private-company Ke is a range (12-15%), not a point** — report it as one, run sensitivities at both ends, and never pretend the CAPM machinery manufactured precision it borrowed.

### 3.3 Divisional rates — one company, multiple risk economies

A single WACC for everything produces the **conglomerate error**: risky ventures get cheap money (over-expand), safe cash cows get taxed (under-invest). If ShopKart launches a fintech lending arm (risk ≈ NBFC world) beside grocery retail, grocery's 12% hurdle cannot bless quick-commerce loans. The fix: divisional hurdles = β_asset of the division's peer set, relevered at the division's own target structure (financial arms lever higher by design — the RT4 lesson: lenders *are* leverage machines). Group treasury keeps the umbrella WACC for reportage; **decisions consume division-specific rates** or they're shopping with someone else's prescription.

### 3.4 New money costs new price — marginals and floats

Projects consume **marginal** capital: today's Kd, today's expected Ke — not the 8% term loan Grandpa signed in 2019. Flotation costs (issue fees on new equity ~1-2%, loan processing) raise effective Ke/Kd slightly — most desks fold them into higher effective rates rather than cash flows directly. And the retained-earnings debate, settled: retained earnings are NOT free — they carry Ke opportunity cost (WM1's household logic scaled up: money staying in the firm must out-earn the shareholder's next-best use). This one line kills the sponsor favorite "internal accruals are cheap": **internally generated capital is equity-priced capital.**

### 3.5 Hurdle games — the committee's four cheats

1. **Straight-line optimism** — project presented at exactly hurdle + 0.1% (IRR 12.1% at a 12% WACC): the model knew the answer before the data did. Counter: pre-committed sensitivity grids (CB4) and CB6's post-audit with sponsor signatures.
2. **Risk-category smuggling** — arguing a venture is "core" to inherit the low group WACC (divisional discipline dies in the meeting, not the model). Counter: category decided by a standing committee, not the sponsor.
3. **Terminal-value stuffing** — 70%+ of NPV living in TV (TV6's 72% canon) with g quietly near economic-growth-max: counter: g cap = long-run GDP growth (~6% nominal India), TV share must be disclosed on page 1.
4. **Strategic-essential card** — non-quantified flag-planting ("strategically essential!"): counter: strategy gets its OWN line (real options, CB4) priced transparently, never smuggled into Ke or flows.

---

## 🧪 LAB — Build and Stress ShopKart's Hurdle (10 min)

**Setup:** Unlevered comparable-set β_asset = 0.82; ShopKart target D/E = 42.9% (i.e., D/V = 30%); tax 25.17%; Rf = 7.0% (10y G-Sec zone); ERP = 6.0%; Kd = 12%; flotation ignored.

**Do this:**
1. Relever to ShopKart: β_E = β_asset × (1 + (1−t) × D/E). Compute Ke via CAPM.
2. Compute WACC at target 70/30 with after-tax Kd. Compare with the 13.5% PM-canon: why the small gap (rounded ERP/β source-vs-proxy)? Present verdict: use 12% or 12.3%?
3. A fintech-lending division is proposed: comparable lending β_asset = 1.05, target D/E = 300% (NBFC-like). Compute its divisional Ke and WACC — can it borrow the grocery hurdle?
4. Committee scene: sponsor claims "retained earnings at 10% are cheaper than new equity at 12.7% — let's fund 60% internally." Rule on it in two sentences.
5. Bank offers project debt at "11% special, 2% processing fee, 5 years." Effective pre-tax Kd ≈ 11% + fee/5y → and after-tax Kd? (simple spread reasoning).

**Why this matters:** The hurdle enters every NPV as a divisor — a 2pp error rewrites verdicts by lakhs more than any operating assumption. Committees that can't defend WACC can't defend any decision made with it; this lab prices the divisor, then stands guard over it.

**🔑 Lab answers:**
1. β_E = 0.82 × (1 + 0.7483 × 0.429) = 0.82 × 1.3210 = **1.083** → Ke = 7.0 + 1.083 × 6.0 = **13.50%** — the Hamada bridge lands exactly on the PM3 canon (13.5%): the academy's books reconcile.
2. WACC = 0.70 × 13.5 + 0.30 × 12 × 0.7483 = 9.45 + 2.69 = **12.14%**. The 12.3% (market weights 75.4/24.6) sits 25bp off because weights differ — report **12.14% as policy hurdle, disclose 12.14-12.39% range**, and keep votive candles away from fake point-precision.
3. Divisional β_E = 1.05 × (1 + 0.7483 × 3.0) = 1.05 × 3.245 = **3.41** → Ke_div = 7 + 3.41 × 6 = **27.4%** (NBFC-style equity is a fire); but its WACC = 0.25 × 27.4 + 0.75 × 8.98 = 6.85 + 6.74 = **13.59%** — divisional hurdle, NOT grocery's 12.14. Borrowing the group rate would over-expand lending by ~1.5pp of mispriced risk (RT4/NBFC lessons formalized).
4. **Overruled:** retained earnings cost Ke (13.5%) — the shareholders' opportunity forgone — exactly like new equity, minus float. Funding mix is a *capital-structure* conversation (CF course), not a discount-rate discount.
5. Fee 2% over 5y ≈ ~0.4%/yr loading → effective Kd ≈ **11.4%** → after-tax = 11.4 × 0.7483 = **8.53%**. (TVM check: the flat-fee annualization is a fine approximation at this scale; the exact annuity-amortized IRR-version is ~11.5% — same verdict.)

---

## 💪 Exercises

1. **Build.** Firm: E ₹80L, D ₹40L (target), Ke 15%, Kd 11%, tax 25.17%. WACC?
2. **U-curve.** Explain in three sentences why doubling leverage from 30% to 55% D/V eventually RAISES WACC despite debt's cheaper sticker.
3. **Conglomerate error.** Conglomo uses one 10% hurdle across: utilities-style distribution (safe, β_asset 0.5) and EV-manufacturing venture (β_asset 1.2). What misallocation follows — one line per arm?
4. **Proxy work.** Peer-1: β_E 1.2 at D/E 0.5; Peer-2: β_E 1.0 at D/E 1.0; tax 25%. Unlever both, average, state the β_asset estimate.
5. **Game-spot.** Which cheat is this: (a) "this year's WACC is 11.8%; project IRR is 11.85% — approve"; (b) "it's not an NBFC project, it's a *customer-experience* project — group rate applies"; (c) terminal g set at 9% nominal; (d) "strategically essential for dealer morale."

### ✅ Selected answers

1. E/V = 80/120 = 66.7%, D/V = 33.3%; after-tax Kd = 11 × 0.7483 = 8.23%; **WACC = 0.667 × 15 + 0.333 × 8.23 = 10.0 + 2.74 = 12.74%**.
2. At 30% D/V debt is plentiful and lenders see a cushion; at 55% they see RT2's borrowed-ROE tableau and reprice Kd upward (8.98 → 10+), while equity re-levers into β_E ≈ 1.08 → ~1.6 territory (Ke 13.5 → 16%+). The cheap-debt slide stops being cheap because BOTH legs reprice — WACC reaches a floor and bends back up: leverage's discount is a finite coupon, not a slope.
3. Distribution arm: 10% is TOO EXPENSIVE for its risk (its true hurdle ~7-8%) → good projects get rejected, the cash cow starves quietly. EV arm: 10% is TOO CHEAP → risky bets look falsely attractive → over-expansion, the exact road DHFL-adjacent balance sheets travel. One-size WACC misprices everyone, symmetrically and silently.
4. P1: β_A = 1.2/(1 + 0.7483×0.5) = 1.2/1.374 = **0.873**; P2: β_A = 1.0/(1 + 0.7483×1.0) = 1.0/1.748 = **0.572**. Average ≈ **0.72** — the unlevered estimate for THIS business's operating risk, ready to relever at any target structure.
5. (a) straight-line optimism (precision cosplay); (b) risk-category smuggling; (c) terminal-value stuffing (g > long-run nominal GDP ~6% = the company outgrows the universe); (d) the strategic-essential card — price strategy in its own named line (real options, CB4), never inside the divisor.

---

## ❓ Quiz

**Q1.** ShopKart's WACC (Ke 13.5%, Kd 12%, tax 25.17%, target 70/30) is:
(a) 11.2%
(b) 12.14% — 0.70 × 13.5 + 0.30 × 12 × 0.7483: after-tax debt is the only debt equity holders truly pay
(c) 13.5%
(d) 12.83% — ignore tax

**Q2.** Why must Ke give way to divisional rates inside a diversified firm?
(a) SEBI mandates divisional rates
(b) One WACC between businesses of different β over-expands the risky arms and starves the safe ones — each project's money must be priced at ITS risk economy
(c) Divisions have different auditors
(d) Ke only works for startups

**Q3.** "Retained earnings at 10% are cheaper than new equity — fund internally" should be ruled as:
(a) True — internal money avoids fees
(b) False — retained earnings carry the same Ke opportunity cost; the shareholders' forgone alternative prices internal capital, and only flotation (1-2%) differs
(c) True for small companies only
(d) False — internal accruals must always sit in FDs

### ✅ Answers

1. **(b)** — 9.45 + 2.69 = 12.14% at target weights (12.14-12.39% disclosing the range): the (1−t) multiplier is half of debt's whole point. This hurdle has been dividing every ShopKart NPV since TV4 — now its receipt is signed.
2. **(b)** — risk is a local currency: grocer money prices grocer projects, NBFC money prices lending. Using group WACC everywhere is the conglomerate-error machine gun: it shoots the safe cash cows AND arms the risky ventures, one board meeting at a time.
3. **(b)** — internals-vs-externals is a capital-structure decision (CF), not a discount on the hurdle. Every rupee retained is a rupee NOT returned to shareholders' 13.5%-expected world; the firm must out-earn that world with it or hand it back via buyback/dividend.

---

## ✅ Mastery checklist

- [ ] I build WACC with target weights and after-tax Kd by reflex (12.14% ShopKart canon)
- [ ] I unlever/relever betas across structures (Hamada bridge: 0.82 → 1.083)
- [ ] I present private-company Ke as a range with sensitivity, never false precision
- [ ] I enforce divisional rates (fintech arm: 13.59%, not 12.14%)
- [ ] I name all four hurdle games and the counter to each

**Next:** CB4 stresses the model — **appraisal under uncertainty**: sensitivity grids, scenario tables, NPV breakevens, and the real-options upgrade (abandon, expand, delay) that turns projects from bets into strategies with escape routes.
