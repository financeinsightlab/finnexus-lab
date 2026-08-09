# 🎯 AC6 · Revenue, Receivables & Provisions
> Revenue is the loudest number in accounting and the easiest to lie with. When exactly is a sale a sale? Who owes what when cash lags delivery? And how much of that 'asset' called debtors is honestly receivable? The five-step contract machine (Ind AS 115), the aging ladder, ECL provisioning — and the early-pay paradox where 2% polite-discount equals a 37.2% annualized borrowing costs.

## 🎯 Objectives
- Run the **five-step revenue machine** on any contract: identify contract → performance obligations → transaction price → allocate → recognize as obligations are satisfied (not when invoiced!).
- Quantify receivable risk: build **aging ladders** and expected-credit-loss provisions (our ₹1.14L canon drill).
- Master discount mathematics in both directions: **2/10-net-30 = 37.2% annualized** — take it as a supplier, offer it knowingly as a seller.
- Read revenue-quality tells: bill-and-hold, channel stuffing, round-tripping, stretched terms disguised as "sales push."
- Place GST correctly: a throughput liability, never P&L for a registered business.

## 📘 Concepts

### 6.1 The five-step machine (Ind AS 115)
```text
1 Identify the CONTRACT           (enforceable rights/obligations)
2 Identify PERFORMANCE OBLIGATIONS (goods/services distinctly promised)
3 Determine TRANSACTION PRICE      (expected consideration, net of returns/discounts)
4 ALLOCATE the price to obligations (relative standalone-selling-price)
5 RECOGNIZE revenue as obligations are SATISFIED (over time vs point in time)
```
ShopKart application: **festival hamper sold with a 2-service promise** — hamper (point-in-time on delivery) ₹900 + 12-month service plan ₹300 deferred: price ₹1,200 → allocate 900/1,200 & 300/1,200 ⇒ recognize ₹900 on delivery, ₹25/month over 12 months. Cash lands Jan 1; revenue lands monthly. Invoiced ≠ earned: advance receipts are **contract liabilities** until delivered (AC2's advance drill in Sunday best).

### 6.2 The timing traps — old games, new audits
- **Bill-and-hold** ("invoice now, ship later with customer's blessing"): only booked when goods are separately identified + ready + customer-requested + can't be used elsewhere. Else = premature.
- **Channel stuffing** (push December stock at B2B, watch January returns): revenue *gross of expected returns* is overstated; Ind AS 115 forces **returns provisions** — the stuffing always shows its shadow in Q1 reversals.
- **Round-tripping** ("sell to friendly reseller who will sell it back"): substance-over-form; auditors match gross margins (they die: sold at cost-ish?) and ask *why*.
Teaching verdict: revenue is sacred — mis-timing >5% of it is the beginning of fudged results; Satyam-era files are thick with exactly these.

### 6.3 Receivables & the aging ladder — receivable ≠ collectible
ShopKart's receivables (₹38L gross; B2B-heavy sub-ledger shown, ₹L):

| Bucket | Amount | ECL % | Provision |
|---|---|---|---|
| 0–30 days | 26 | 1% | 0.26 |
| 31–60 days | 7 | 4% | 0.28 |
| >60 days | 5 | 12% | 0.60 |
| **Total** | **38** | | **₹1.14L** |

**ECL (expected credit loss)** recognizes EXPECTED pain at reporting date — not pain confirmed (the old 'incurred loss' delays provisioning until it's embarrassing). Entry (first-time provision): Dr Impairment loss (P&L) 1.14 / Cr Provision 1.14 → debtors shown NET 36.86. Next-year moves provision only by its delta — the **cookie-jar watch**: over-provisioning in fat years creates a rainy-day reserve to quietly release in lean years (earnings smoothing; AC10's casefile #4).

### 6.4 Write-offs, recoveries and the discipline
- Specific customer went under (₹1.5L): Dr Provision 1.14 + Dr Bad-debts 0.36 / Cr Debtors 1.5 — loss beyond provision = direct P&L.
- Recovered ₹0.4L from an old write-off: Cr other income; lesson: provision ≠ prediction per customer — it's portfolio honesty.

### 6.5 Early-pay mathematics — the 37.2% costume party
FF-221 (canon): ₹47,250 + 18% GST ₹8,505 = **₹55,755**, terms **2/10-net-30**.

```text
Pay by day 10: 55,755 × 0.98 = ₹54,639.90 → save ₹1,115.10
Pay by day 30 instead: you're paying 2% for 20 extra days of credit
Annualized = (2/98) × (365/20) = 37.2% ← the vendor's effective lending rate
```

Two-sided reading: **Buyer** — taking the discount ≈ earning a 37.2%/yr return (beat every OD at 12%!); **Seller** — offering it is expensive working capital (but converts receivables to safe cash + kills ECL). This is the single most-quoted finance nugget in Indian treasury circles; we've now priced it instead of nodding at it.

### 6.6 GST — the throughput that just Looks Like money
Registered ShopKart: collects 18% GST on sales (output liability), pays GST on purchases (input credit) — net difference goes to the government. Journal essence (sale ₹100 + ₹18 GST): Dr Cash 118 / Cr Sales 100 / Cr Output GST 18. P&L never sees the ₹18 (revenue ₹100 only); BS holds net GST payable. The classic compliance fraud — claiming **fake input credits on fake invoices** — is why the fakes run shell-invoice factories; the auditor's counter: match ITC with suppliers' filings (GSTR-2A/2B reconciliation). GST deserves its ten minutes of reverence because *invoice language = tax language = audit language* — FF-221's ₹47,250 + ₹8,505 is your second tongue now.

## 🧪 LAB — Revenue desk (10 min)
1. Contract billed ₹2.0L: goods ₹1.7L (delivered Dec) + installation ₹30,000 (happens Jan). December revenue?
2. Aging & ECL: buckets 0–30: ₹15L @1%, 31–60: ₹4L @5%, >60: ₹1L @15%. Provision & net debtors?
3. Early-decision: bill of ₹2,00,000, terms 1.5/10-net-45. Cost of skipping the discount, annualized?
4. Returns estimate: December B2B dispatches ₹10L, expected returns 3% by policy history. December B2B revenue?
5. GST journal: local sale ₹50,000 + 18% to a consumer — walk the accounts including the purchase-side input of ₹3,780 already locked this month. Net GST liability?

**Why this matters:** this lab is month-end close in miniature — the five entries a finance intern gets judged on during week one.

**🔑 Lab answers:** (1) **₹1.7L** — installation is a separate obligation ⇒ ₹30,000 sits as contract liability till January (2) provision = 0.15 + 0.20 + 0.15 = **₹0.50L** ⇒ net debtors ₹19.5L (3) (1.5/98.5) × (365/35) = **15.9%** (4) ₹10L − 3% provision = **₹9.7L revenue + returns liability 0.3** (5) output 9,000 − input 3,780 → **₹5,220 net payable** through the GST account.

## 💪 Exercises
1. Hamper case: price ₹1,500; hamper standalone ₹1,200; 12-month service standalone ₹600. Allocate and state revenue recognized in month 1.
2. Aging forensics: last year's >60 bucket was 8% of receivables, this year 19% on ₹44L gross. ECL moved how (use 12% ECL)? One-line smell test?
3. Same 2/10-net-30 but the offer is 3/10-net-60. Buyer's annualized reward for early pay? Seller's one-line calculus trade-off?
4. Detect the stuffing: dispatch value December ₹25L (5× monthly norm), booking revenue gross. The two adjusting lines Ind AS 115 demands + the smell signal in Q1?
5. Provision rollforward: opening provision ₹1.14L, specific write-offs ₹0.9L, year-end required provision (fresh aging) ₹0.95L. Entries and P&L credit/charge?
6. Round-trip case: goods sold to sister entity at ₹1L margin on ₹5L invoice and re- bought next month. What's wrong and which two statement lines scream it first?
7. "Revenue grew 40%, debtors grew 120%" — CFO/PAT moved from 1.1 to 0.6. Two-sentence forensic paragraph.

### ✅ Selected answers
1. Allocate 1,200/1,800 & 600/1,800 ⇒ hamper ₹1,000 (month-1, point-in-time) + service ₹500 deferred ⇒ month-1 revenue = **₹1,000 + ₹41.67 = ₹1,041.67**.
2. >60 amount = ₹8.36L; ECL = 1.00L extra vs last year's ≈ ₹0.29L (2.4L @12%) ⇒ +₹0.71L provision hit; smell: >60s nearly tripled — the aging ladder tattles before the aging manager does.
3. Buyer: (3/97) × (365/50) = **22.6%** — still beats the OD; seller trades 3% of sales for 50-day-early cash and near-zero ECL — deep discounts buy settlement certainty, not generosity.
4. Revenue booked net of expected returns + a **returns liability** for estimated reverse flow; Q1 signal: gross-margin rate holds but returns spike — stuffing has a January cough.
5. Utilize: Dr Provision 0.9 / Cr Debtors 0.9 (provision now 0.24). True-up to 0.95: Dr Impairment Loss 0.71 / Cr Provision 0.71 ⇒ **P&L charge ₹0.71L**; no phantom release — provision moves to cover the ladder's truth, not the quarter's mood.
6. Substance is a loan/financing loop, not revenue; margins look structurally high (cost-less margin!) AND related-party disclosures + reversed purchases line scream in the notes; auditors kill it as **sale-and-repurchase financing** — unwind both legs.
7. "Revenue" increasingly means "we shipped invoices": conversion to cash is failing (0.6), and receivables outpacing sales 3:1 says either terms were silently stretched or the B2B gate opened too wide — before any multiple conversation, map the aging ladder and watch January's returns.

## ❓ Quiz
1. ₹1,200 hamper contract (₹900 hamper + ₹300 twelve-month service, allocated from standalone prices). January revenue recognized:
   - (a) ₹1,200 — cash is in the drawer
   - (b) ₹925 — performance drives recognition: hamper delivered (900, point-in-time) + one month of service (300/12 = 25); the rest sits as a contract liability until served
   - (c) ₹900
2. ShopKart's aging ladder (26 @1%, 7 @4%, 5 @12%) sets a provision of:
   - (a) ₹38L
   - (b) ₹1.14L — expected credit loss is portfolio honesty: 0.26 + 0.28 + 0.60, debtors shown net ₹36.86L, and next year the provision moves only by its delta (the cookie-jar audit watches exactly that delta)
   - (c) ₹0.60L
3. Vendor terms: 2/10-net-30. Paying on day 30 instead of availing the discount implies an annualized cost of:
   - (a) 2%
   - (b) 37.2% — (2/98) × (365/20): two percent for twenty days of credit is the most expensive politeness in business; taking the discount beats every bank overdraft on the street
   - (c) 24%

### ✅ Answers
1. **(b)** — cash-vs-earned is the loudest confusion in accounting; the five-step machine settles it permanently.
2. **(b)** — (a) is gross, (c) is only the >60 bucket; ECL is an estimate of the whole portfolio's shadow.
3. **(b)** — (c) is the naive ×12 linearization; the 2/98 base rewards the *credit actually extended* — always compute on what you pay extra for from where you start.

## ✅ Mastery checklist
- [ ] Five-step machine executed: obligations split, price allocated, recognition tied to performance
- [ ] Contract liabilities vs revenue kept brutally separate (advances = promises, not sales)
- [ ] Aging ladder + ECL buildable in 2 minutes; rollforward entries correct
- [ ] Early-pay math in both directions from memory (37.2% phantom installed)
- [ ] Timing traps named: bill-and-hold, stuffing, round-tripping, with their tells
- [ ] GST runs as throughput on my journals; ITC reconciliation respected as an audit wall

**Next:** **AC7 · Inventory & COGS Economics** — FIFO vs Weighted Average (and why India bans LIFO), NRV markdowns, shrinkage & margin forensics, and the days-inventory machine that whispers whether the shelves are assets or anchors. Stacks and stocks! 📦
