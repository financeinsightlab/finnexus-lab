# 🎯 DV7 · Swaps & Risk Machinery — Rates, FX & the Plumbing That Survives
> The biggest derivative market on Earth isn't options or futures — it's **swaps**: quiet, bilateral exchanges of cash-flow streams hiding inside every bank's spine. ShopKart's ₹28L expansion loan floats at MIBOR+3; a 2-point MIBOR spike bills +₹1L/yr. DV7 swaps that floating headache for a fixed payment (with full receipts), handles the Dubai order's USDINR window, respects the CDS glancing from the wings, and builds the CCP/margining plumbing that decides whether the arena survives its storm days.

## 🎯 Objectives
- Structure a plain-vanilla interest-rate swap: pay-fixed vs receive-fixed, with ShopKart's locked 10.5% all-in cost.
- Price the swap logic (comparative advantage, fixed-leg discipline) and demystify **notional-vs-exposure** permanently.
- Run a currency forward lock for the Dubai receivable (83.5 spot → 83.92 six-month) with settlement flows.
- Understand credit exposure: bilateral counterparty risk, netting, collateral — and CDS as default insurance in one paragraph.
- Map the CCP chain (novation → margining → default waterfall) from DV2's foundations to its institutional adult form.

## 📘 Concepts

### 7.1 The interest-rate swap — floating in, fixed out
```text
ShopKart borrows ₹50L @ MIBOR+3% (floating; MIBOR today 6.5% ⇒ paying 9.5%)
Fear: MIBOR to 8.5% ⇒ loan cost 11.5% (+₹1.0L/yr on ₹50L)
SWAP (bank desk): ShopKart PAYS FIXED 10.5% / RECEIVES MIBOR+3% (notional ₹50L, same tenor)
Net all-in cost = loan(MIBOR+3) − swap receive(MIBOR+3) + swap pay 10.5% = **10.5% FIXED ✓**
MIBOR spikes +2pp: loan +₹1.0L · swap receipts +₹1.0L · offset = 0 ✓ certainty purchased
```
**Reading the receipt:** the swap never touched the loan contract; it's a parallel cash-flow treaty that chemically converts floating to fixed (and with the signs flipped, converts boring fixed into floating for liability-tourists — asset-liability management's daily bread at every bank treasury).

### 7.2 Should everyone swap? — comparative advantage & the fixed-leg mind
Swaps exist because borrowers face different relative prices across markets (the strong name borrows cheap fixed, the smaller one borrows less-worse floating; swapping gaps shares the comparative advantage). For ShopKart-scale names the question humbles: swap only if (a) rate-view or ALM mismatch justifies it, (b) the fixed leg covers covenant-stress scenarios (CF8's 0.87×-at-trough test), and (c) MTM on the swap itself is survivable (yes — swaps mark too; the 'fixed' leg's value floats against you when rates FALL, and early-exit bills arrive accordingly). **Fixed is bought certainty, not free luck.**

### 7.3 The Dubai window — currency forward in 3 lines
Receivable: $20,000 SnackBox order, settlement in 6 months. Spot USDINR 83.5; 6-month forward quoted +0.5% ≈ **83.92** (carry = INR-rate premium, DV2's law in FX dress). Lock: sell dollars forward at 83.92 ⇒ ₹16.78L guaranteed regardless of 81 or 86 printing in January. Effective price discipline identical to wheat (DV3): the hedge removes weather, books carry, and lets the export margin be a MANUFACTURING decision instead of a forex prayer.

### 7.4 Credit — counterparty, netting, collateral, one-paragraph CDS
Bilateral world (forwards/swaps): the OTHER side might fold mid-treaty → measure exposure as replacement cost, not notional (notional ₹50L / real exposure ≈ mark-to-market gap, typically 2–5%). Defenses: **netting** (all offsetting treaties collapse into one net claim at default), **collateral/CSA** (variation margin, DV2 DNA), credit reviews. **CDS (one paragraph):** insurance on a borrower's default — buyer pays spread, seller pays (face−recovery) at default-event; elegant for hedging, infamous when the insurance book exceeded the houses insured (2008's geometry lesson: instrument fine, scale-without-collateral criminal).

### 7.5 The CCP chain — arena plumbing that outlives storms
Exchange-traded world: **novation** — the clearing corporation becomes buyer-to-every-seller and seller-to-every-buyer (your counterparty is the CCP, not Sharma Traders). Behind it: daily MTM (DV2) + default waterfall: defaulter's margin → defaulter's guarantee-fund slice → CCP skin-in-game → mutualized fund → (in extremis) assessment powers. The design goal: one member's funeral shouldn't smokey the arena — 2008's bilateral AIG-chain vs 2020-Covid's exchange-margins are the two receipts every derivatives-course student should carry.

## 🧪 LAB — The treaty desk (10 min)
1. All-in cost check: ShopKart's swap at fix 10.5% with MIBOR printing 9.2%: loan pays? swap receives? net?
2. Notional-vs-exposure quiz: swap MTM today = −₹85k against us on ₹50L notional — what's the realistic replacement exposure vs the ₹50L headline? One line.
3. FX forward: $50,000 payable (an ERP vendor!) in 3M, spot 83.5, 3M-forward implied premium 1.2%: locked rate, and the cash difference if spot prints 85.1 at settlement.
4. CDS in one breath: read the headline 'XYZ Fin CDS spread 340bp' — what is the market charging for what, translated?
5. CCP waterfall ordering: margin → guarantee slice → CCP-skin → mutualized fund: put the shields in depletion order and name the design sentence.

**Why this matters:** items 1–3 are SME-finance reality (CA-offices do these live); items 4–5 are the financial-news translation skills interviews test sideways.

**🔑 Lab answers:** (1) loan pays 9.2+3 = 12.2% · swap receives 12.2%, pays 10.5% ⇒ net **10.5%** exactly (receipt: +₹85k swap inflow offsets the extra loan bleed) ✓ (2) exposure ≈ MTM gap ₹85k (± accrual) — the ₹50L is reference-only, quoting it as risk is headline-illiteracy from DV1 (3) forward = 83.5 × 1.012 = **₹84.50** locked payable; spot 85.1 at settlement: forward 'overpays' by 0.6/$ = ₹30k vs spot-now — the regret-profile of locked treaties: pay it gladly, that's exactly the insurance premium settlement-side (4) the market insures XYZ default-risk at 3.4%/yr of protected face — fear incarnate priced per annum (5) depletion: defaulter's margin → defaulter's guarantee-fund slice → CCP skin-in-the-game → mutualized member fund → emergency assessments; sentence: 'no member's funeral may evacuate the arena — every shield is pre-funded, in order, in writing.'

## 💪 Exercises
1. Swap variance ledger: on ₹50L swapped at 10.5% with MIBOR path 6.5 → 7.8 → 8.9 across 3 years: tabulate loan-cost, swap flow, net — and the two-line CFO brief on why year-3 looks identical anyway.
2. Early-exit physics: rates FALL 150bp soon after your pay-fixed swap; why does the swap now carry a negative MTM 'bill' on exit — explain with the fixed-leg-discount logic a treasurer signs.
3. Dubai payoff table: receivable $20k at forward 83.92 vs spot-paths 81.9 / 83.9 / 86.2 at settlement — three-column honesty (INR received hedged, would-be unhedged, regret/relief verdict).
4. Comparative-advantage sketch: AAA borrows fixed 7.0%/float MIBOR+0.5; ShopKart-like SME borrows fixed 12%/float MIBOR+3. Show the swap-shape that shares the gap's 1.0%-point advantage honestly (who swaps into what, and why the bank takes a slice).
5. Netting proof: two treaties owe you +₹4L (swap A) and you owe −₹9L (swap B) with the same counterparty: default without netting vs with netting (recovery math at 40% on the −9L leg) — show the rupee difference netting saves.
6. CDS coffee-test: explain in 4 lines why 'selling CDS with no reserves = selling naked puts with essays' (tie the wings: premium-capped income × tail payout × gap-city).
7. Novation storyboard: A sells to B through CCP — redraw the two contracts that replace one and state who bears Sharma Traders' mood-swings thereafter.

### ✅ Selected answers
1. Year1: loan 9.5 · swap +0 → net 9.5; Year2: loan 10.8 · swap +0.3 → net 10.5; Year3: loan 11.9 · swap +1.4 → net **10.5** — brief: 'the fixed number was signed in year-1 calm; year-3's identity is the product, not a coincidence — MIBOR's weather arrives at the swap desk, never at our P&L.'
2. Your pay-fixed leg (10.5%) now exceeds new-money fixed rates (~9%): a buyer of your position demands compensation for the above-market coupon ⇒ fair value = PV of the spread-gap (150bp × ₹50L × remaining-tenor annuity ≈ ₹1.4L at 2 years) ⇒ exit bills = that PV; 'fixed' was certainty both ways — you locked the regret-prices too.
3. Hedged always ₹16.78L. Unhedged: 81.9 → ₹16.38L (−40k relief-lost? — hedge WINS); 83.9 → ₹16.78L (even); 86.2 → ₹17.24L (−46k regret). Verdict column: 'insurance' twice out of three moods — treaty graded on exposure-deletion, not on January's mandi quote (DV3's creed, FX edition).
4. AAA wants floating (short-tenor ALM), SME wants fixed(sleep): AAA borrows fixed 7.0 & swaps to floating at MIBOR−0.2 (gains 0.7 vs its own+0.5); SME takes fixed leg at 11.6 (gains 0.4 vs its own 12); desk slices the remainder; gap shared = the comparative-advantage harvest — fixed-vs-float relative-pricing differences, not anyone's generosity.
5. Without netting: you PAY ₹9L in full, recover 40% of ₹4L = ₹1.6L ⇒ net −₹7.4L. With netting: net claim −₹5L only ⇒ pay 5 ⇒ save **₹2.4L** of no-fault money — netting is the headline reason ISDA-masters rule the bilateral world.
6. CDS seller = annual spread income, tail payout (face − recovery) exactly the naked-put profile: capped coupon vs gap-city loss; the essays differ, the payoff twin doesn't; reserve like an insurer or the obituary column finds its pen.
7. Two contracts now exist: A↔CCP and CCP↔B (novation). Sharma Traders' mood swings = CCP's problem with margin+waterfall armor; your counterparty became an institution with a rulebook instead of a person with a story — the entire point.

## ❓ Quiz
1. ShopKart's pay-fixed/receive-floating swap (10.5% fixed, MIBOR+3) at MIBOR 8.5% leaves all-in cost at:
   - (a) 11.5%
   - (b) 10.5% — loan pays 11.5 but swap receipts +₹1.0L exactly offset; the treaty converts floating risk into a fixed signed number; certainty was purchased in advance, regret both ways priced at signing
   - (c) 9.5%
2. Quoting a ₹50L swap notional as 'risk exposure' is wrong because:
   - (a) swaps have no risk
   - (b) notional is the REFERENCE size; real exposure ≈ the mark-to-market gap (replacement cost, usually a few % ±) — defensed by netting, collateral, and credit review; headline-notional is media's favorite illiteracy ever since 2008 needed a big number
   - (c) exposure is always ₹50L
3. The CCP novation chain's deepest selling point is:
   - (a) lower fees
   - (b) your counterparty becomes a pre-funded institution (margin + waterfall) instead of a person with a story — storm-days settle via the rulebook, not via Sharma Traders' solvency mood; bilateral chains failed in 2008, margined arenas held in 2020 — keep both receipts
   - (c) faster apps

### ✅ Answers
1. **(b)** — the loan statement shows 11.5; the treasury P&L shows 10.5; both are true, only one decides sleep.
2. **(b)** — exposure lives in the replacement bill, not the reference number; netting exists precisely for it.
3. **(b)** — plumbing that outlives storms is the entire derivatives story; apps are wallpaper.

## ✅ Mastery checklist
- [ ] Pay-fixed swap receipts verified across a 3-year MIBOR path (net 10.5% identity, no coincidences)
- [ ] Notional-vs-exposure one-liner quoted with the replacement-cost number
- [ ] FX forward locked + three-mood payoff table built with regret/relief verdicts
- [ ] Comparative-advantage sketch run (who borrows what, who swaps into what, who slices)
- [ ] Netting savings computed on a two-treaty book; ISDA-master respect installed
- [ ] CDS explained in one breath; 2008-vs-2020 plumbing receipts carried

**Next:** **DV8 · CAPSTONE — The Risk Desk** — the full festival hedge book executed live: wheat (₹1L saved), silver gifting (₹71k saved), OD swap (floating→fixed), margin stress paths pre-funded, the SEBI creed renewed (hedge ≠ speculate), and the interview forge where 'explain a hedge without saying hedge' finally gets its answer! 🏆
