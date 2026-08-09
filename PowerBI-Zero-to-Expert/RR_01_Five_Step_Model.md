# 🎯 RR1 · The Five-Step Model — Ind AS 115's Revenue Engine

> Revenue is the most manipulated line in the history of accounting, and until 2015 there was no single engine disciplining it — IAS 18 covered "goods and services," IAS 11 covered construction, US GAAP had hundreds of industry rules, and every bundle deal was a negotiation. Ind AS 115 (= IFRS 15 = ASC 606's twin) replaced all of it with ONE model: **recognize revenue when CONTROL of goods or services transfers to the customer, in the amount you expect to be entitled to.** This module installs the engine; the next eleven make it industrial-strength.

---

## 🎯 Objectives

- Explain the control-transfer doctrine and how it dethroned risks-and-rewards
- Recite the five steps and know what decision each one actually makes
- State why IAS 18/11 died: the bundle problem, the guidance vacuum, the US divergence
- Apply the model's scope boundaries — what revenue is NOT Ind AS 115's job
- Read any revenue disclosure and map it back to the five steps

## 📘 Concepts

### 1.1 The doctrine — control, not risk

Old IAS 18 recognized revenue when **significant risks and rewards of ownership** transferred. Control-thinking replaced it because risk-speak is slippery: a seller can retain real risks (a warranty, a price guarantee) while the customer has plainly taken charge of the asset. **Control = the present ability to direct the use of an asset and obtain substantially all of its remaining benefits** — including the ability to PREVENT others from using it. Indicators: present obligation to pay, legal title, physical possession, risks/rewards moved, customer acceptance. The swap matters in practice: consignment stock sitting in a dealer's warehouse carries "reward" optics, but until the dealer controls it by selling on, the manufacturer's revenue clock stays silent. Every module of this course is the control doctrine applied at higher resolution.

### 1.2 The five steps — and the question each answers

| Step | Name | The actual question |
|---|---|---|
| 1 | **Identify the contract** | Do we have an enforceable deal (and with whom), or just a conversation? |
| 2 | **Identify performance obligations** | WHAT did we actually promise — one thing, or a basket of separately-deliverable things? |
| 3 | **Determine the transaction price** | HOW MUCH do we expect to keep — after variables, financing, non-cash, kickbacks? |
| 4 | **Allocate the price** | WHICH promise gets which slice of the money? |
| 5 | **Recognize revenue** | WHEN does control of each promise transfer — point in time, or over time? |

The genius of the model is that failure modes map to steps: a collectability doubt is a Step-1 problem, not a vague "be conservative" problem; a free handset is a Step-2/4 allocation problem, not "marketing expense"; a customer advance is Step-3 financing math. Interviews run exactly this diagnostic: hear fact → name the step → run the step's rules.

### 1.3 Why the old standards had to die

- **The bundle problem**: IAS 18 had almost nothing to say about selling a phone WITH service WITH updates WITH support — companies allocated bundles by management convenience, which is to say, by earnings preference. Step 2/4 machinery was invented to end the negotiation.
- **The guidance vacuum**: IAS 18 was ~30 pages for a ₹100-lakh-crore economy of revenue models; IAS 11 construction logic (percentage completion) leaked everywhere as analogy. Two standards, two vocabularies, endless analogies.
- **The US divergence**: US GAAP's thousands of industry-specific revenue rules vs IFRS's skeletal ones meant global peers reported the same deal differently. IFRS 15/ASC 606 were literally co-developed so a Boeing and an Airbus-grade aerospace contract follow one model.
- The casualties were total: IAS 18, IAS 11, and the IFRIC interpretations on loyalty points, barter, customer contributions — all replaced by Ind AS 115 in India from FY 2018-19.

### 1.4 Scope — what this engine does NOT touch

Ind AS 115 covers revenue from **contracts with customers** — ordinary-activity consideration for promised goods or services. It does NOT price: lease income (Ind AS 116 — course #3 of this very series), insurance contracts, financial instruments and other contractual rights within Ind AS 109 (your IA6-7 territory), dividends, and non-monetary exchanges between entities in the same line of business (to facilitate sales to OTHER parties). Watch non-customer counterparties: a government grant, a collaboration partner who shares R&D upside, a settlement with a supplier — none is a "customer," so none feeds this engine. Boundary-drawing is itself an exam classic.

### 1.5 The vocabulary that every note uses

**Contract asset** (your right when you've performed but something other than time conditions the bill), **receivable** (unconditional right — passage of time is all that's left), **contract liability** (customer paid, you owe performance), **transaction price** (what you expect to be entitled to — excluding amounts collected for third parties like GST), **performance obligation (PO)**, **standalone selling price (SSP)**. The patterns you'll see in every Ind AS-115 disclosure: disaggregated revenue (by line, geography, timing), opening/closing contract balances, revenue recognized from the opening contract liability, backlog (remaining performance obligations) with expected timing — each number is a Step-4/5 artifact, and this course makes each computable.

## 🧪 LAB — Run the Engine Abstractly (10 min)

Meridian Systems sells a ₹24,000 bundle: handset + 2 years of service (standalone prices ₹20,000 and ₹12,000 total). Customer pays upfront; handset delivers day 1; service runs monthly.

1. Map each fact to its step — what does Step 1 confirm, what are the Step-2 units, what is Step-3's price, what does Step-4 compute, what does Step-5 say about each unit's timing?
2. At month 0, how much revenue is recognized and what sits on the balance sheet?
3. Why would old risks-and-rewards thinking have made this UGLIER?

**Why this matters:** this exact bundle (numbers python-verified) is the course's hello-world; if you can narrate all five steps on it, the remaining modules are elaborations, not new religions.

**🔑 Lab answers:**
1. Step 1: enforceable contract, one customer ✓. Step 2: TWO POs — handset (distinct good) and service (distinct service). Step 3: ₹24,000 transaction price. Step 4: allocate on SSP ratio: handset 24,000 × 20/32 = **₹15,000**; service 24,000 × 12/32 = **₹9,000**. Step 5: handset = point in time (control at delivery); service = over time (customer consumes monthly).
2. Day 1: revenue **₹15,000** (handset) + first-month service slice 9,000/24 = **₹375**; contract liability = 24,000 − 15,375 = **₹8,625** carried as advance-owed-performance.
3. Risks-and-rewards offered no allocation machinery: sellers either dumped the full ₹24,000 into day-1 revenue ("all risks passed with the box") or parked it ALL as deferred until service ended — both fiction, both common, and precisely the earnings-preference negotiation Ind AS 115 was built to kill.

## 💪 Exercises

1. Your CEO: "Goods out the gate = revenue, why complicate?" Correct with the control doctrine in three sentences.
2. Classify: (a) interest income, (b) lease receipts from your fleet, (c) sale of a SaaS subscription, (d) dividend from a subsidiary — under/outside Ind AS 115 with the governing standard.
3. "GST charged on invoices is part of my transaction price." Rule on it.
4. Name a business model whose entire revenue logic is a Step-2 problem, and one whose is a Step-5 problem.
5. Write one sentence per step describing how a construction company runs the engine on a 3-year tower.

### ✅ Selected answers

1. "Control is when the customer can direct the use and take the benefits — my gate is not their control. I can ship and STILL control (consignment), or retain possession while THEY control (bill-and-hold, proven case in RR9). Shipment is a logistics event; control is a rights event; revenue follows rights."
2. (a) Outside — Ind AS 109. (b) Outside — Ind AS 116. (c) **Inside** — SaaS subscription is a contract with a customer; you'll build it in RR11. (d) Outside — dividends ride Ind AS 109/27 territory, not the customer-contract engine.
3. Excluded: amounts collected **on behalf of third parties** (GST to the Government) are not consideration the entity is entitled to — transaction price is net of them. Invoice total ≠ economics.
4. Step-2 business: telecom bundles / software-plus-maintenance / equipment-plus-installation (the entire game is finding the real promises). Step-5 business: construction, long-term services, licensing (the entire game is WHEN control moves).
5. One contract signed (1); two POs — tower construction + 5-yr facility O&M (2); price ₹40cr plus a ₹2cr bonus judged most-likely and constrained (3); allocate ₹40cr to tower, ₹2cr separately to O&M via SSP (4); tower over time via cost-to-cost progress, O&M straight-line monthly starting post-handover (5).

## ❓ Quiz

**Q1.** Under Ind AS 115, revenue is recognized when:
(a) invoice is raised and payment is assured
(b) control of the promised good or service transfers to the customer — the ability to direct use and take substantially all benefits, in the amount the entity expects to be entitled to
(c) all significant risks of ownership have left the factory
(d) cash is collected in full

**Q2.** Selling a handset with 24 months of bundled service is primarily a problem for:
(a) Step 1 — contract existence
(b) Step 5 — timing only
(c) Steps 2 and 4 — identifying the separate performance obligations and allocating the price between them
(d) no step — one product, one price

**Q3.** Which item falls OUTSIDE Ind AS 115?
(a) maintenance retainer from a customer
(b) GST billed on invoices — collected on behalf of the Government, so never part of the transaction price
(c) loyalty points granted to shoppers
(d) a SaaS annual subscription

### ✅ Answers

1. **(b)** — control-transfer doctrine: rights, not logistics, drive the revenue clock.
2. **(b)** — free-hardware bundles were the old standard's blind spot; the model attacks them at identify + allocate.
3. **(b)** — third-party collections exclude themselves; retainers, points and SaaS all live inside the engine.

## ✅ Mastery checklist

- [ ] I can state the control doctrine and three indicators cold
- [ ] I can name each step's actual question without looking
- [ ] I can explain the three failure modes of IAS 18/11
- [ ] I can scope-test whether a payment stream belongs to Ind AS 115
- [ ] I can narrate the ₹24,000 bundle through all five steps (15,000/9,000/375)

**Next:** RR2 opens Step 1 for real — the five contract criteria, collectability as an arithmetic threshold, contract combinations, and the three legal routes a modification can take.
