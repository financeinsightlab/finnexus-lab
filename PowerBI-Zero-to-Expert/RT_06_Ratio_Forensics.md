# 🎯 RT6 · Ratio Forensics — Catching the Costume Before the Confession

> Every fraud in this academy left fingerprints in its ratios years before the headline: Satyam's "cash" that earned no interest, DHFL's bucket gap, Karvy's borrowed client money. Every cooked book is a costume, and costumes leave seams. This module gives you the six costume families, the tripwire grid, and a full forensic case. No accusations without arithmetic — but when the arithmetic screams, listen.

---

## 🎯 Objectives

- Master the accruals screen: (PAT − CFO) / avg assets, and the CFO/PAT quality gauge
- Apply the Satyam interest test: does reported cash earn plausible interest?
- Compute DSRI (receivables index) and friends from the Beneish family
- Catalog the six costume families with their ratio seams
- Run a complete forensic pass on Vantage Agro and issue a ratings-desk verdict

---

## 📘 Concepts

### 6.1 The accruals screen — profit's shadow

**Accruals ratio = (PAT − CFO) / avg total assets.** Profit is engineered; cash collected is witnessed. Clean companies hover near zero (±5%): ShopKart FY22: (13.25 − 16.95)/103.95 = **−3.6%** — CFO *exceeds* profit: pristine. Chronic **+7–9%+** readings mean profits consistently outrun cash — either the business model genuinely books ahead (long construction contracts — verify!) or the profits are being *manufactured*. Pair with **CFO/PAT**: healthy ≥ 1.0 over a cycle; < 0.7 for years = investigate before anything else (FA7's ShopKart read: 16.95/13.25 = **1.28 ✓**). These two screens are cheap, fast, and historically lethal at finding rot early.

### 6.2 The Satyam interest test — fake cash has no heartbeat

Reported cash must earn somewhere near the risk-free/bank rate. Satyam boasted ₹5,000+ Cr "cash" earning ~**2.1%** implied interest when any treasurer would floor it at **~6.5%** in FDs — a ₹200+ Cr/year heartbeat that simply wasn't there. Formula: **implied yield = interest income / avg cash**; compare to the FD floor for the period. Deviation > ~200bp with no explanation (foreign idle balances, sweep accounts — *ask*) = the cash may exist only in the chairman's letter. Same species: IN2's Karvy (client money treated as own) and every "profits fine, treasury silent" story. **Interest income is cash's witness — always call the witness.**

### 6.3 Beneish's family — the index screens

Statistical fraud screens compress red flags into indices; the three worth memorizing:

- **DSRI (Days Sales in Receivables Index)** = (DSO this year / DSO last year). Revenue recognition games pump receivables, so DSRI > ~1.2 sniffs it. FruitCart case: DSO 45 → 63 on +12% sales: DSRI = 63/45 = **1.87** — glaring (Beneish's research: ~1.0–1.1 is innocent; 1.8+ appears disproportionately among manipulators).
- **GMI (Gross Margin Index)** = margin last year / margin this year — deteriorating margins (GMI > 1) raise the *incentive* to cook.
- **AQI & SGAI** — asset quality (soft/intangible assets swelling) and SGA index. Individually weak; together with accruals + CFO/PAT they form a **grid**: one red flag is a question, four is a prosecution file. Never short a stock on one screen; always walk away from *buying* on three.

### 6.4 The six costume families — seams to check

| # | Costume | Ratio seam |
|---|---|---|
| 1 | **Revenue theater** — channel stuffing, bill-and-hold, Q4 bulges | DSO spiking (DSRI), Q4 sales share >> 25%, sales growth >> volume growth |
| 2 | **Receivables swamp** — booking sales to related/insolvent "customers" | DSO trend vs peers, CFO/PAT gap |
| 3 | **Inventory museum** — obsolete stock kept at full value | DIO rising while turnover claims "efficiency"; GMROI decay |
| 4 | **Capitalization makeup** — opex dressed as capex | Capex/sales jumping without capacity; FA turnover falling; "other intangible assets" ballooning |
| 5 | **Cash-flow theater** — fake cash, timed collections | Satyam interest test; accruals; March-window balance sheet vs quarterly cash |
| 6 | **Tunneling & governance rot** — related-party sales/loans, auditor churn, low effective tax | Related-party share of revenue, auditor resignation timing, effective tax rate vs 25% canon |

### 6.5 The tax tell — pays like a pauper, earns like a prince

Statutory Indian corporate tax ≈ 25.17%. Legitimate shields exist (accelerated depreciation, carry-forward losses) — but they show up as *deferred tax liabilities* and *cash* tax eventually. The seam: **effective tax rate persistently < 10% with rising profit and no deferred explanation + cash tax paid much lower than P&L tax** (AC7/CF5 homework: read the cash-flow statement's tax line, not the P&L's). When profits are manufactured, tax is the one bill management *refuses* to pay on fake income — so fake-profit companies almost always underpay tax relative to their story. The tax line is the confessional booth of creative accounting.

---

## 🧪 LAB — Forensic Pass: Vantage Agro Ltd (10 min)

**Setup:** Vantage Agro (agri-inputs, FY22): PAT ₹42L (+35% yoy), CFO ₹14.7L, sales +14%, receivables: DSO 45d → 63d, Q4 = 41% of annual sales (industry norm ~27%), effective tax 4.2% (canon 25.17%, no deferred explanation, cash tax ₹1.1L), auditor changed mid-year, promoter entity appears as #2 customer. Avg assets ₹190L.

**Do this:**
1. Compute the accruals ratio and CFO/PAT. Interpret both.
2. Compute DSRI. What does 41% Q4 share add to the picture?
3. Apply the Satyam logic to the tax line: why is 4.2% the loudest number on this page?
4. Fill the tripwire grid: list every costume family present, then write the desk verdict (Clean / Watch / Avoid / Short-candidate) with two falsifiers that would clear the company.

**Why this matters:** Real desks get exactly this: a fast-growing midcap everyone's excited about, dumped on your desk before the fund committee. The skill is converting six scattered oddities into one defensible verdict — with arithmetic attached to every adjective. Do this well and you prevent more losses than any stock-picking genius creates gains.

**🔑 Lab answers:**
1. Accruals = (42 − 14.7)/190 = **+14.4%** — double the danger line (ShopKart: −3.6%). CFO/PAT = 14.7/42 = **0.35** — for every claimed profit rupee, only 35 paise of cash arrived. Profits are running ~3× their shadow.
2. DSRI = 63/45 = **1.40** (troubling; combined with +14% sales against +40% receivables growth, it screams costume family #1–2). **Q4 = 41% vs norm 27%** is the hall-of-fame channel-stuffing print: the "growth" arrived in the final fortnight, on credit.
3. 4.2% vs the 25.17% canon with **no deferred-tax bridge and only ₹1.1L cash tax** = the company is paying tax on ~1/6th of its claimed income. Fake profits are tax-free by construction; real ones never are. Of the whole grid, this flag waves hardest because the taxman — unlike auditors — never accepts costumes.
4. **Grid:** family #1 (Q4 bulge ✓, DSO spike ✓), #2 (promoter-entity customer = swamp with a surname ✓), #5 (accruals +14.4%, CFO/PAT 0.35 ✓), #6 (auditor churn mid-year ✓, related-party sales ✓, tax tell ✓). **Verdict: AVOID / short-candidate for risk desks; no longs, no credit.** **Falsifiers:** (a) audited post-year-end collection proof that the Q4 receivables converted to cash by Q2, (b) a deferred-tax reconciliation + assessment-order evidence for the low rate, and (c) a Big-4 clean re-audit of the promoter-customer contracts at arms-length pricing. Without all three, the arithmetic stands.

---

## 💪 Exercises

1. **Screen compute.** MedServe: PAT ₹60L, CFO ₹28L, avg assets ₹400L. Accruals and CFO/PAT? Verdict line?
2. **Satyam test.** A firm reports ₹900L cash all year and ₹14L interest income; bank FD floor is 6.5%. Compute the implied yield and the "missing heartbeat."
3. **DSRI triage.** Three firms: DSO 40→43, 50→66, 60→58. Compute each DSRI and rank concern.
4. **Costume ID.** Match: (a) opex routed into "capex — software development"; (b) March-30 collection blitz, April-5 returns avalanche; (c) new auditor, third in 30 months; (d) sales +20%, volumes +4%, DSO +50%.
5. **The honest exception.** A defence EPC contractor shows CFO/PAT of 0.4 for three straight years with rising receivables — and it's clean. Construct the legitimate explanation and the proof you'd demand anyway.

### ✅ Selected answers

1. Accruals = (60 − 28)/400 = **+8.0%** — above the comfort band; CFO/PAT = 28/60 = **0.47**. Verdict line: *"Profits materially outrun cash; treat every growth claim as unproven until collections are independently verified."*
2. Implied yield = 14/900 = **1.6%** vs the 6.5% floor — missing heartbeat ≈ 900 × (6.5% − 1.6%) ≈ **₹44L/year**. Unless treasury can produce overseas-idle-cash evidence, the cash's witness contradicts the cash.
3. (a) 43/40 = **1.08** — innocent; (b) 66/50 = **1.32** — investigate now; (c) 58/60 = **0.97** — improving. Rank: b >> a > c.
4. (a) capitalization makeup (#4); (b) cash-flow theater / window dressing (#5); (c) governance rot (#6); (d) revenue theater (#1 — price credit-fueled, volume absent, receivables exploding).
5. Legitimate story: **milestone-based long-term contracts** — revenue booked on completion percentage, cash collected on government acceptance cycles running 300+ days; receivables are sovereign-backed, so DSO inflation is structural, not stuffed. Proof anyway: contract-wise receivable aging with subsequent collections, payment history of the ministry, and auditor's POC-method working papers. Forensics is presumption of verify, not presumption of guilt — but the verification list never shortens because the story sounds noble.

---

## ❓ Quiz

**Q1.** Vantage Agro's CFO/PAT of 0.35 alongside accruals of +14.4% tells the analyst:
(a) Working capital is temporarily heavy; ignore
(b) Profits are running roughly 3× their cash shadow — the classic manufactured-earnings fingerprint
(c) The company is underinvesting in growth
(d) Tax rates have fallen

**Q2.** The Satyam interest test flags a company because its ₹900L cash earns an implied 1.6% yield. The core logic is:
(a) All companies must hold FDs by law
(b) Real cash earns a market-rate heartbeat; cash sitting at ~1.6% while FDs pay 6.5% may exist only in the chairman's letter
(c) Interest income is an expense
(d) 6.5% is the statutory minimum treasury yield

**Q3.** Why is a persistent 4–5% effective tax rate (vs the ~25% statutory) such a loud forensic flag?
(a) Low taxes are always fraudulent
(b) Because fake profits are tax-free by construction — managements manufacturing income almost never volunteer real tax on it, so the cash-tax line becomes the confessional
(c) It proves the auditors are honest
(d) It indicates export incentives, conclusively

### ✅ Answers

1. **(b)** — one weak-cash year can be timing; 0.35 *with* +14.4% accruals is a pattern: the P&L is writing checks the cash cycle never cashes. Together they're the two cheapest fraud screens in the toolkit, and Vantage fails both.
2. **(b)** — the screen is pure common sense formalized: treasurers sweep idle cash into FDs; every genuine crore hums at the risk-free rate. A silent treasury with loud profits is how Satyam walked for years — verified by nobody, caught by arithmetic.
3. **(b)** — option (a) is wrong (legitimate shields exist and declare themselves in deferred-tax notes); (d) is what companies *claim*, and claims need assessment orders, not press releases. The screen works because it exploits the fraudster's own thrift: why pay real tax on imaginary income?

---

## ✅ Mastery checklist

- [ ] I compute accruals = (PAT − CFO)/avg assets and read ±5% vs +9% correctly
- [ ] I run CFO/PAT over multiple years, never one
- [ ] I call cash's witness: implied yield vs the FD floor (Satyam test)
- [ ] I compute DSRI and place it inside a grid, never as a solo accusation
- [ ] I can fill the six-costume grid on a fresh case and write a verdict with falsifiers

**Next:** RT7 is the **CAPSTONE — The Ratio Room**: three mystery companies, full five-family panels, sector packs, forensic grids — and you defend every verdict in the dark, then face the interview forge.
