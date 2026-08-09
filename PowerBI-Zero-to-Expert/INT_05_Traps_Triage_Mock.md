# ⚡ INT5 · Interest Traps & the Mock Arena

> You now hold two engines, three frequencies, the 72 club, and the installment autopsy — which means the exam's only remaining weapons are the traps built from YOUR habits. Using CI on an SI question because "banks do CI, right?", adding installments because addition is comfortable, answering ₹8,820 when the interest was asked (₹820). Five traps, all named; a 5-question radar to sweep them; then the Arena. Finish the engine room strong.

---

## 🎯 Objectives

- Disarm the **5 named interest traps** on sight.
- Run the **5-question radar** before any bank-rate arithmetic.
- Apply final triage + guess-EV for this paper style.
- Complete the **10-question Arena** and trap-tag misses.

---

## 📘 Concepts

### 7.1 The five named traps

**TRAP 1 · ENGINE MIX-UP** — compounding what the question stated as simple (half-year short loans, deposits, "flat" wording), or worse, the reverse. SI language: "flat", "simple", "same every year". CI language: "compounded", "added to balance".
*Antidote:* gate-1 of the radar is ENGINE-ID, said aloud before formulas.

**TRAP 2 · FREQUENCY BLIND** — treating "10% half-yearly" as 10% per period (it's 5% per period × 2 periods = 11,025 vs 11,000).
*Antidote:* rate ÷ k, periods × k — recited before every multiply.

**TRAP 3 · INSTALLMENT ADDITION** — summing future installments into "the loan" (₹8,820 + ₹8,820 = ₹17,640) instead of discounting (₹16,400).
*Antidote:* future money is cheaper; discount each piece, audit roll-forward.

**TRAP 4 · ALIAS SWAP** — answering with Amount (P + I) when the interest was asked, or quoting ₹8,820 for CI = ₹820.
*Antidote:* underline the question's noun; two labels, no mercy.

**TRAP 5 · STRAIGHT-LINE DEPRECIATION** — melting value by "30% of ORIGINAL price per 3 years" style linear guesses (₹2L − 60,000 = ₹1,40,000) when engines compound downward (₹1,45,800).
*Antidote:* ×(1 − r)ⁿ, power engines alone — growth and decay both compound.

### 7.2 The 5-question radar

```
Q1: ENGINE?      (SI flat or CI re-basing?)
Q2: FREQUENCY?   (rate/k and periods x k, spoken)
Q3: TIME SHAPE?  (years proper, months -> /12, fractions -> hybrid tail)
Q4: NOUN?        (interest, amount, principal, rate, time - underline ONE)
Q5: SANITY?      (CI > SI beyond year 1; depreciation < straight-line;
                  reverses re-plug; doubling ~ 72/r?)
```

### 7.3 Triage + guess-EV (final drill)

BANK: direct I = PRT/100, jewel squaring, 72-club (<25 s). GAMBLE: installment PVs, hybrid tails, backward depreciation (60–90 s). DUMP: multi-part k-fold + frequency mash-ups under time — guess-EV law from PC-course math: one elimination makes +1/−0.25 guessing earn +0.167; zero elimination, walk away.

---

## 🏟️ THE INTEREST MOCK ARENA — Paper INT-01 (10 Qs · 8 min · −0.25 per miss)

1. ₹5,00,000 at 10% SI for 9 months — interest?
2. A sum at SI amounts to 1.25P in 5 years — rate?
3. CI on ₹8,000 at 5% for 2 years (interest only)?
4. ₹10,000 at 10%, half-yearly, 1 year — amount?
5. ₹2,00,000 van melting 10%/year × 3 years — value?
6. Two annual installments of ₹8,820 at 5% CI — principal?
7. 2-year CI−SI gap of ₹400 at 5% — principal?
8. Doubling at 12% via the 72 club?
9. ₹1,00,000 at 10% CI for 2 years 6 months — amount (hybrid)?
10. CI doubles every 4 years — factor in 16 years?

### ✅ Arena Key & Analysis

| # | Answer | Machinery (trap dodged) |
|---|---|---|
| 1 | **₹37,500** | months → 0.75 y BEFORE PRT (gate 3) |
| 2 | **5%** | RT = 100(F−1) cancel-P law |
| 3 | **₹820** | CI = SI 800 + jewel 20 (TRAP 4 dodge: interest, not amount) |
| 4 | **₹11,025** | 5% × 2 periods (TRAP 2) |
| 5 | **₹1,45,800** | ×0.9³ = ×0.729 (TRAP 5) |
| 6 | **₹16,400** | discount, never add (TRAP 3) |
| 7 | **₹1,60,000** | D/(r/100)² autopsy |
| 8 | **6 years** | 72/12 club law |
| 9 | **₹1,27,050** | ×1.21 × 1.05 hybrid tail (gate 3+) |
| 10 | **×16** | 2^4 multiplier chain (gate 1: CI side) |

**Self-audit ritual:** trap-number every miss; two under one trap = that module-section re-read tonight, paper re-run tomorrow.

---

## 💪 Exercises

1. Name the trap: "Deposits earn flat annual interest; after 3 years A = P(1.08)³."
2. Name the trap: "Two EMIs of ₹5,000 repay a ₹10,000 phone at 0% interest — the loan was ₹10,000 anyway." (When is adding legal?)
3. Radar-run all five gates on: "₹3,00,000 at 8% CI quarterly for 6 months — amount?"
4. Alias drill: for ₹40,000 at 10% CI 2 years, quote interest, amount, and CI−SI — three separate labels.
5. Triage the pair: (i) ₹50,000 @ 12% SI × 4 months — interest; (ii) a 3-installment + hybrid-tail + backward-rate mash-up, 45 seconds left. Decide, with EV.

### ✅ Selected answers

1. **ENGINE MIX-UP** — flat-earning deposits are SI by description: A = P + P×0.08×3 = 1.24P, NOT 1.08³; language decides engines, never tradition.
2. Adding future payments is legal ONLY at **0% rate** (discount factor 1) — the zero-interest skin helps TRAP 3 hide; at any positive rate, discount first — and INT6 documents the extra horror line: "0% EMI" products often sneak the fee into the sticker price itself, so the discount-factor discipline isn't just exam fuel, it's wallet armor.
3. ENGINE CI ✔ · FREQUENCY ÷4: 2% × 2 periods ✔ · TIME 0.5 ✔ · NOUN amount ✔ · SANITY 8%-per-year stack under 1 y ≈ x1.04 ✔ → 3,00,000 × 1.02² = **₹3,12,120** ✔ verified.
4. Interest = **₹8,400**; Amount = **₹48,400**; CI−SI = **₹400** (= 40,000 × 0.01 jewel-check ✔).
5. BANK (i): 50,000 × 12 × (4/12)/100 = **₹2,000** in 20 seconds; DUMP (ii) unattempted — no elimination possible in 45 s and a −0.25 bleed out-prices pride.

---

## ❓ Quiz

**Q1.** Arena re-run: ₹5,00,000 at 10% SI for 9 months earns interest of:
- (a) ₹50,000
- (b) **₹37,500 — 9 months = 0.75 years converts BEFORE P×R×T; TRAP-3-in-reverse lives exactly in the 9/12 you skip under pressure**
- (c) ₹45,000
- (d) ₹3,750

**Q2.** "10% per annum compounded half-yearly" for 1 year on ₹10,000 vs plain annual — the extra earned:
- (a) ₹0
- (b) **₹25 — 11,025 − 11,000; FREQUENCY BLIND people never see the second serving of 5%, and that invisibility is the entire marketing budget of such schemes**
- (c) ₹100
- (d) ₹250

**Q3.** The radar's FIRST gate before any interest arithmetic:
- (a) divide the rate by the frequency
- (b) **ENGINE-ID — simple or compound, spoken aloud from the question's language ("flat"/"simple" vs "compounded"/"added to balance"); the wrong engine invalidates every dial set after it**
- (c) find amount first
- (d) compute the doubling time

### ✅ Answers

1. **(b)** — the time-conversion ambush is the whole question; disarm, then multiply.
2. **(b)** — frequency is a gear, not a garnish; gear-Shifts compound quietly.
3. **(b)** — engine first, frequency second, time-shape third, noun fourth, sanity fifth — recite till boring.

---

## ✅ Mastery checklist — INT5

- [ ] All 5 traps + antidotes from memory
- [ ] 5-question radar recited in order
- [ ] Engine-ID spoken before dialing on 3 live questions
- [ ] Alias drill passed (₹8,400 / ₹48,400 / ₹400 labels)
- [ ] Arena completed: ___/10 raw · ___ net
- [ ] Misses trap-tagged; redo scheduled

---

**Next:** 💼 **INT6 · FINANCE: Treasury & Debt + Capstone** — the ShopKart Treasury Memo: tax-provision FD parking (₹25L → ₹26.82L on quarterlies), EMIs and the delivery-van braid, RD vs SIP-lites, and the credit-card horror documented at 42.6% effective. Interest math, finally in charge of real cash.
