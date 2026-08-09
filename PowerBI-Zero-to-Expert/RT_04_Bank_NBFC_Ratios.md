# 🎯 RT4 · Bank & NBFC Ratios — The ALM-First Playbook

> A bank is a leverage machine wearing a suit: it borrows short (your deposit), lends long (your home loan), and lives off the sliver between. Standard ratios still exist, but banks need their own cockpit — NIM, CASA, GNPA/NNPA, PCR, credit cost, and CRAR. This module builds that cockpit and ends with the single most powerful bank ratio instinct: *asset quality first, growth second, everything else third.*

---

## 🎯 Objectives

- Explain why banks break the standard ratio framework (debt is raw material, not risk)
- Compute and judge NIM, CASA mix, cost-to-income, and PPOP
- Run the asset-quality ladder: GNPA → PCR → NNPA → credit cost
- Read CRAR as the bank's true solvency ratio and project capital needs from growth
- Distinguish bank vs NBFC ratio priorities (ALM mismatch, funding cost)

---

## 📘 Concepts

### 4.1 Why banks are different — debt is the inventory

For ShopKart, debt is a choice; for CityFirst Bank, **deposits are the raw material**. So D/E is meaningless (a healthy bank runs ~8–12× leverage by design), the current ratio dissolves (deposit "liabilities" are also the franchise), and interest coverage inverts — interest expense is COGS. Instead, ask the banker's three questions: **(1) What spread does it earn? (2) How safe is the loan book? (3) Is there enough capital to absorb losses and fund growth?** Every bank ratio hangs off one of these three hooks.

### 4.2 The spread engine — NIM, CASA, cost-to-income, PPOP

- **NIM (Net Interest Margin)** = (interest earned − interest paid) / avg earning assets. CityFirst: ₹340L NII / ₹10,000L = **3.4%** — respectable (Indian banks run ~2.5–4.5%; cheap-deposit franchises earn more).
- **CASA ratio** = current + savings deposits / total deposits = **42%** — the cheap-fuel gauge: CASA pays ~0–3% vs 6%+ on term deposits, so a high-CASA bank structurally wins the NIM race. Falling CASA in a rising franchise = the moat is leaking.
- **Cost-to-income** = opex / (NII + other income) = 208/435 = **47.8%** — below 50% is decent; best-in-class private banks run 35–42%.
- **PPOP (Pre-Provision Operating Profit)** = NII + other income − opex = 340 + 95 − 208 = **₹227L** — the bank's *operating engine before the monsoon hits*. Credit people watch PPOP because provisions can erase a year of it; PPOP/assets = 227/10,500 ≈ 2.2% is the shock absorber thickness.

### 4.3 The asset-quality ladder — the only ladder that matters

1. **GNPA** = gross bad loans / total advances = **2.8%** (under ~3% is calm; >6% is a story).
2. **PCR (Provision Coverage Ratio)** = provisions held / GNPA = **75%** — how much of the rot is already paid for.
3. **NNPA** = GNPA × (1 − PCR) = 2.8% × 0.25 = **0.70%** — the *unprovided* rot that future profits must absorb. NNPA is the honest number; GNPA is the admissions register.
4. **Credit cost** = year's provisions / avg advances = 62/8,900 ≈ **0.70%** — the annual toll. Normalize: if management guides 0.7% through a recession, they're selling weather forecasts, not banking.

Monsoon drill: if GNPA rises to 4% with PCR held at 75%, NNPA doubles to 1.0% and next year's credit cost jumps — check PPOP can absorb it (227L covers a lot of 62L-style years; that 3.7× cushion is the point of computing PPOP).

### 4.4 CRAR — the real solvency ratio, and the growth prophecy

**CRAR = capital / risk-weighted assets** (FI8 canons: regulatory minimum 11.5% incl. buffers). CityFirst: **16%**. Here's the prophecy formula professionals carry: **internal accretion ≈ ROA × retention can't exceed loan growth forever.** CityFirst accretes capital ~13.5%/year internally but is growing risk-weighted assets at **18%**. Do the glide math: CRAR ≈ 16% × (1.135/1.18) each year ≈ 15.4% → 14.8% → 14.2% → 13.7%, and so on — it grinds toward the 13% board-comfort line in **roughly four years**, and capital raises take ~2 years to plan and execute. **Conclusion: this bank must raise equity within ~2 years or slow loan growth.** You predicted a capital raise with one subtraction: 13.5% < 18%. When analysts say a fast-growing bank "will come to market," this is the entire arithmetic.

### 4.5 NBFC add-ons — the ALM alarm

NBFCs borrow from markets (bonds, bank lines), not grandmas — so add two gauges: **funding cost trend** (spreads over G-sec — FI8's Z-spread conversation) and **ALM mismatch** (cumulative outflows vs inflows by bucket — the IN2 3 DHFL lesson: short money in, long loans out = a liquidity bomb with a balance sheet that can look "profitable" right up to the explosion). NBFC ratios checklist: CRAR ✓, GNPA ✓ — then immediately: **maturity ladder, funding concentration, and liquidity buffer**. For an NBFC, the ALM statement *is* the current ratio.

---

## 🧪 LAB — Underwrite CityFirst Bank (10 min)

**Setup:** CityFirst Bank FY22: NII ₹340L, other income ₹95L, opex ₹208L, provisions ₹62L, avg earning assets ₹10,000L, avg advances ₹8,900L, CASA 42% of deposits, GNPA 2.8%, PCR 75%, CRAR 16%, internal accretion 13.5%, RWA growth 18%. Management guidance: "20% loan growth, no equity raise planned."

**Do this:**
1. Compute NIM, cost-to-income, PPOP, NNPA, and credit cost. Grade each against the module's benchmarks.
2. GNPA stress: a downturn pushes GNPA to 4.5% at the same PCR. Compute new NNPA and the provision bill if they must hold PCR at 75% on the higher stock (extra provisions ≈ advances × ΔGNPA × PCR). Can PPOP take it?
3. Judge the guidance: reconcile "20% growth, no raise" with the accretion math. What exactly breaks first?
4. Rank these banks by franchise quality, one line each: Bank A (NIM 4.1%, CASA 45%, NNPA 0.3%), Bank B (NIM 2.9%, CASA 28%, NNPA 1.8%).

**Why this matters:** Bank analysis is 80% asset quality and capital trajectory, 20% everything else. This lab is the exact first pass a fund analyst runs on any lender — and Q4 is the kind of question that separates people who quote NIM from people who *underwrite banks*.

**🔑 Lab answers:**
1. NIM = 340/10,000 = **3.4%** (healthy); cost-to-income = 208/435 = **47.8%** (decent); PPOP = 340 + 95 − 208 = **₹227L** (2.2% of assets — thick absorber); NNPA = 2.8% × (1 − 0.75) = **0.70%** (clean); credit cost = 62/8,900 ≈ **0.70%** (normal-year toll). Overall: a well-run mid-tier bank.
2. New NNPA = 4.5% × 0.25 = **1.125%**. Extra provisions needed ≈ 8,900 × (4.5% − 2.8%) × 75% ≈ **₹113L** — about half a year's PPOP. Painful, survivable: that's what the 2.2% absorber is *for*.
3. Accretion 13.5% << growth 20% — worse than the 18% base case. CRAR glide: 16% × (1.135/1.20) ≈ 15.1% after one year, ~14.3% after two, ~13.5% after three — the comfort line arrives in ~3 years. **What breaks first: either the growth promise or the no-raise promise — they cannot both survive.** Expect a QIP announcement; the honest guidance would name the raise.
4. **Bank A** — cheap-CASA-funded spread engine with near-zero unprovided rot: a franchise; own it and check price. **Bank B** — thin NIM funded by expensive bulk deposits with 6× the unprovided rot: earnings are one monsoon from red; avoid or demand a deep discount.

---

## 💪 Exercises

1. **Compute.** FinServe NBFC: NII ₹120L, other income ₹18L, opex ₹61L, provisions ₹30L, avg earning assets ₹4,000L, avg advances ₹3,550L, GNPA 3.6%, PCR 60%. NIM, PPOP, cost-to-income, NNPA, credit cost?
2. **PCR politics.** FinServe's CEO proposes cutting PCR to 45% "since recoveries are improving." What happens to reported profit and to NNPA? What question should the board ask?
3. **CASA erosion.** CityFirst's CASA slides 42% → 35% while deposits grow 15%. Explain the likely NIM path and one management action to defend it.
4. **Capital prophecy.** An NBFC accretes 16% internally, grows 24%, CRAR 19%. Roughly when does CRAR approach 15%? Recommend the CFO's first move.
5. **ALM first.** FinServe's 1-year bucket shows ₹1,800L inflows vs ₹2,600L outflows. Its GNPA and CRAR are fine. Is it safe? Explain the DHFL logic.

### ✅ Selected answers

1. NIM = 120/4,000 = **3.0%**; PPOP = 120 + 18 − 61 = **₹77L**; cost-to-income = 61/138 = **44.2%**; NNPA = 3.6% × (1 − 0.60) = **1.44%**; credit cost = 30/3,550 ≈ **0.85%**.
2. Releasing provisions (60%→45% on the stock) **boosts reported profit one-time** while NNPA jumps to 3.6% × 0.55 = **1.98%** — profit up, safety down: the classic earnings-costume (RT6). Board question: *"Show the recovery evidence account-by-account; if it's real, where's the cash?"*
3. Losing 7pp of ~0–3% funding and replacing it with ~6.5% bulk money raises average funding cost roughly 7pp × 3.5pp ≈ **25bp**, dragging NIM toward ~3.1% unless loan yields rise (risky) or opex falls. Defense: win salary accounts, sweep products, and branch-led retail TDs — CASA is rebuilt with *habits*, not rate wars.
4. Glide per year ≈ 1.16/1.24 = 0.935 → 19% → 17.8 → 16.6 → 15.5 → 14.5: the 15% line arrives in **about 3.5–4 years**. First move *now*: line up capital options (raise window, securitization to lighten RWA, or trim growth to ~16%) — prophecy beats surprise.
5. **No.** An ₹800L negative gap in the 1-year bucket is DHFL arithmetic: assets are fine *if held to maturity*, but they must be *refinanced to maturity*. When markets doubt you, the bucket gap — not GNPA — kills you in weeks. For NBFCs, the ALM statement is the true liquidity ratio.

---

## ❓ Quiz

**Q1.** CityFirst's NNPA with GNPA 2.8% and PCR 75% is:
(a) 2.1%
(b) 0.70% — GNPA × (1 − PCR), the unprovided rot future profits must absorb
(c) 3.5%
(d) 0.28%

**Q2.** A bank accretes capital at 13.5% while growing risk-weighted assets at 18%, with CRAR at 16%. The professional forecast is:
(a) CRAR rises as profits grow
(b) CRAR glides down toward board-comfort levels in roughly four years — plan a capital raise about two years before it bites
(c) Nothing — CRAR is static
(d) The bank must merge immediately

**Q3.** Why is D/E nearly useless for comparing banks?
(a) Banks don't publish debt figures
(b) Debt is a bank's raw material — healthy banks run 8–12× leverage by design, so D/E misreads the business model; capital adequacy (CRAR) carries the solvency question instead
(c) D/E is illegal for banks under RBI rules
(d) Bank equity cannot be measured

### ✅ Answers

1. **(b)** — 2.8% × 25% = 0.70%. GNPA is the admissions register; NNPA is the unpaid bill. Two banks with identical GNPA but PCRs of 75% vs 40% are completely different credits.
2. **(b)** — 16% × (1.135/1.18) ≈ 15.4%, 14.8%, 14.2%, 13.7%, and so on — arithmetic does the prophesying. Fast-growing lenders *always* return to the capital well; the only question a professional asks is whether they plan the raise or get ambushed by it.
3. **(b)** — a bank without "debt" (deposits) has no business; leverage is the product, not the sin. That's why the Basel framework invented risk-weighted capital ratios — CRAR is the banks' D/E, scaled by how dangerous the assets actually are.

---

## ✅ Mastery checklist

- [ ] I explain why standard ratios break for lenders (debt = inventory; coverage inverts)
- [ ] I compute NIM, CASA context, cost-to-income, and PPOP with benchmarks
- [ ] I walk the asset-quality ladder GNPA → PCR → NNPA → credit cost without mixing them up
- [ ] I run the CRAR glide (accretion vs RWA growth) and call capital raises early
- [ ] For NBFCs, I read the ALM bucket ladder before believing any other ratio

**Next:** RT5 leaves the bank branch for the sector bazaar — **sector-specific ratio packs**: SSSG and GMROI for retail, ARPU/churn/CAC for telecom and SaaS, combined ratios for insurers, RevPAR for hotels, and the Rule of 40.
