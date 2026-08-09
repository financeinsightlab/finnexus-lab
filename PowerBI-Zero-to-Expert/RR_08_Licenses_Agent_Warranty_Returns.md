# 🎯 RR8 · Application Guidance I — Licenses, Principal vs Agent, Warranties, Returns

> The five steps answer 80% of life inside the textbook. Ind AS 115's application guidance is where the stubborn 20% lives, and four questions dominate audits in India: is THIS software/IP a gift of today's snapshot or a stream of tomorrow's updates (licenses); whose revenue is the marketplace's full GMV (principal-agent); is the free repair promise a provision or a product (warranties); and how much of the sales line evaporates into the returns bin (right of return). All four resolve with bite-size canon math.

---

## 🎯 Objectives

- Split licenses into right-to-USE (point in time) vs right-to-ACCESS (over time) with the three access criteria
- Apply the sales/usage-based royalty exception — constrained to zero until the trigger event
- Run principal-vs-agent with the three control indicators and compute net agent revenue
- Classify warranties: assurance (Ind AS 37 provision) vs service (PO under 115)
- Build the right-of-return machinery: revenue, refund liability, recovery asset, with ₹1,90,000/₹10,000/₹7,000 canon

## 📘 Concepts

### 8.1 Licenses — snapshot or stream?

A license of IP is a promise that needs the Step-2/Step-5 treatment: is the customer getting today's IP as it exists (**right to USE → point in time**, recognized when they can first use it) or an evolving IP that the licensor keeps improving (**right to ACCESS → over time**)? Access ONLY if ALL THREE criteria hold: (1) the contract requires (or customer reasonably expects) the entity to undertake activities significantly affecting the IP; (2) those activities directly affect the customer (positively or negatively — content updates, brand campaigns, team rosters); (3) the activities aren't separate goods/services themselves (they don't transfer anything on their own). **Canon mapping:** static software license with no update obligation (perpetual office suite, era-2013) → use, day-1 revenue. SaaS platform with continuous updates baked in → access, straight-line over term (₹90L/3-yr → **₹30L/yr**). Brand/franchise logos with ongoing brand activities → access. A music master licensed for a film → use (the IP won't change); a streaming catalog with content added/removed continuously → access. And drug-formula licenses with mandatory R&D that could change the molecule → access; sold-as-is compounds → use.

### 8.2 The royalty exception — zero until trigger

For license revenue based on the licensee's SALES or USAGE (book royalties per copy, per-stream music fees, franchise % of store sales), you recognize revenue only at the LATER of (a) the licensee's sale/usage occurring and (b) the obligation being satisfied. Translation: estimates are forbidden — even your best-conservatively-guessed royalty streams stay OUT until actuals arrive (the hardest exception in the standard, deliberately written to stop forecasted-royalty games). Applies only when the license is the dominant item; a royalty on a bundle where the license is incidental follows general variable-consideration rules instead.

### 8.3 Principal vs agent — whose sale is it?

When another party helps provide goods/services to the end customer, the entity must declare: do we **control the good/service before it transfers** (principal → GROSS revenue) or merely arrange its provision (**agent → NET fee**)? Three control indicators, weighted by facts: (a) **primary responsibility** for fulfillment (customer comes to YOU when it breaks); (b) **inventory risk** before/after transfer (buy first, sell later, eat returns); (c) **pricing discretion** (set your own price vs collect a set commission). **Canon:** online marketplace sells a ₹100 item run by the merchant; the marketplace sets the platform rules and takes ₹15 commission, merchant owns the product and pricing → agent → **revenue ₹15, not ₹100**; GMV is a metric, not revenue. A dealer buying machines for stock and reselling with his own add-ons → principal, gross. Travel portals, food-delivery rails, consignment agents, and ride-share all run this test publicly — misclassifying inflates the topline 5-8x, and the notes catch it.

### 8.4 Warranties — promise vs provision

Split at purpose: an **assurance-type** warranty (the product will work as specified; statutory and customary defect coverage) is NOT a PO — it's an **Ind AS 37 provision** estimated at sale (canon: 2% expected claims on ₹20L sales → **₹40,000 provision** booked with the sale, trued to experience). A **service-type** warranty (the customer can buy extended coverage, or you're promising more than defect-fixing — free 4-services included in a car deal, extended-care plans) is a **performance obligation**: allocate price to it, recognize over the coverage period. The giveaway test: is it available for separate purchase? If yes, it's a service PO even when bundled as "free." Mixed warranties split proportionately — the classic car-deal split you already met in RR3.

### 8.5 Right of return — the evaporation machinery

Sales with return rights are NOT gross-then-adjust-later — they're variable-consideration-day-one surgery: recognize revenue only for units NOT expected to return (constraint applied at estimation), book a **refund liability** for the expected-return consideration, book a **recovery asset** (asset measured at the former carrying amount minus expected recovery costs) for the goods you expect back, and reduce COGS accordingly. **Canon (python-verified):** 100 units at ₹2,000 price (cost ₹1,400), 5% expected returns → revenue **₹1,90,000** (95 × 2,000), refund liability **₹10,000** (5 × 2,000), recovery asset **₹7,000** (5 × 1,400), COGS **₹1,33,000** (95 × 1,400). Restate the expectation every period — a festive-season return surge is an estimate change flowing into the next quarter, not a scandal, unless the estimate itself was hope.

## 🧪 LAB — Four Verdicts (10 min)

1. **StreamBox** licenses its content library for ₹90L/3 years; the library is continuously added to and rotated (50 titles/week churn): use or access, and yearly revenue?
2. **BookSoft** licenses its publishing suite perpetually, no update obligation: ₹60L deal, point or over?
3. **KartBazaar** lists merchant goods (₹100 average basket), keeps ₹15; ships via merchant's own logistics; returns come back to it only as a routing layer. Revenue on 10,000 baskets?
4. **AutoKart** sells a car ₹9L with 2-year statutory defect coverage (expected cost 1.5%) + free 4-year service pack (SSP ₹1.2L). Slice the ₹9L across everything.

**Why this matters:** these four one-liners are 90% of the licensing/agent/warranty audit questions in Indian practice, boiled.

**🔑 Lab answers:**
1. **Access** — all three criteria: continuous entity activities significantly affect the IP, directly affecting customers, and no separate goods/services transfer → over-time: **₹30L/yr** straight line (unless usage pattern beats time).
2. **Use** — no significant-IP-activities obligation → **point in time**: ₹60L when the customer can first use the license (post-delivery activation).
3. **Agent** — the merchant controls the goods (responsibility, inventory risk, pricing): revenue = **10,000 × ₹15 = ₹1.5L** — GMV ₹10L stays a footnote, never the topline.
4. Statutory coverage → **provision** ₹9L × 1.5% = **₹13,500** (Ind AS 37); service pack → **PO**: allocate ₹9L in SSP ratio: car 9,00,000 × 7.8/9.0 = **₹7.80L** at delivery; service 1,20,000 → proportional allocation lands at 9,00,000 × 1.2/9.0 = **₹1.20L** deferred over 4 years. (Total SOC-check: 7.80 + 1.20 = 9.00 ✓)

## 💪 Exercises

1. Why did the writers of the standard forbid estimated royalties with such an iron exception?
2. A marketplace handles payments, sets the platform's quality rules, and takes 20%, but merchants own pricing, stock, and returns. Principal or agent — argue once against, once for.
3. When does a "lifetime warranty" flip into a service PO — and what does lifetime even price at?
4. Compute a returns quarter: 500 units at ₹4,000 (cost ₹2,600), expected returns 6% with ₹200/unit restocking cost borne by you. Revenue, refund liability, recovery asset, COGS.
5. Your founder wants GMV in the P&L "with the commission rate shown in notes." Explain why the standard refuses.

### ✅ Selected answers

1. Royalty forecasts are the most manipulable estimate in franchise/entertainment economics — long horizons, total dependence on the counterparty's books, and asymmetric forgiveness once booked. The exception trades precision-of-timing for honesty of amounts: actuals, not hopes.
2. Agent: merchants own inventory risk, pricing discretion, and fulfillment responsibility → net the 20%. (For, if factually true: the marketplace could be principal for specific flows WHERE it buys stock itself, sets price, or runs its own fulfillment — classification is per-flow, not per-logo.) The mixed-principal platform is the reality of modern e-commerce disclosure.
3. "Lifetime" defect coverage stays assurance (provision — estimated over the genuine expected-claims horizon, not literally infinite); the moment lifetime includes consumables/services beyond defect-fixing (annual servicing forever, replacement guarantees), that component is a service PO priced at its SSP with revenue spread over the coverage clock.
4. Revenue = 500 × 94% × 4,000 = **₹18,80,000**; refund liability = 30 × 4,000 = **₹1,20,000**; recovery asset = 30 × (2,600 − 200) = **₹72,000**; COGS = (500 × 2,600) − 72,000 = **₹12,28,000**. Restocking cost trims the recovery, never the refund.
5. Because control is the revenue test, not scale: GMV overstates the entity's performance obligation (it promised a match, not the merchandise), inflates comparability (a ₹1.5L agent and a ₹10L principal would print the same topline), and invites the old internet-bubble trick of selling-in-circles to pump "revenue." The notes carry GMV; the P&L carries promises kept.

## ❓ Quiz

**Q1.** A 3-year ₹90L license to a continuously-updated content library recognizes:
(a) ₹90L at signing
(b) ₹30L/year over time — continuous activities significantly affecting the IP make this a right to ACCESS
(c) ₹90L when the library stops updating
(d) as usage reports arrive only

**Q2.** KartBazaar on 10,000 baskets of ₹100 at a ₹15 commission reports revenue of:
(a) ₹10L gross
(b) ₹1.5L net — the agent's share; GMV is a disclosure metric because the merchant controls the goods (inventory risk, pricing, fulfillment)
(c) ₹8.5L after refunds
(d) ₹15 per basket booked as marketing income

**Q3.** On the returns canon (100 units at ₹2,000/₹1,400, 5% expected returns), the recovery asset is:
(a) ₹10,000 at selling price
(b) ₹7,000 — expected-back goods measured at former carrying amount (₹1,400 × 5 units), matched against a ₹10,000 refund liability and ₹1,90,000 revenue
(c) ₹1,33,000
(d) nil; returns are expensed

### ✅ Answers

1. **(b)** — the access test welds the license to the update stream; time spreads the price.
2. **(b)** — indicators decide agency; topline inflation is precisely what the net rule stops.
3. **(b)** — ₹7,000 carries the asset-side of the evaporation; revenue holds at the 95 units that stay sold.

## ✅ Mastery checklist

- [ ] I can run the three access criteria on any IP deal
- [ ] I can state the royalty exception and its dominance test
- [ ] I can classify principal vs agent with the three control indicators
- [ ] I can split assurance vs service warranties and price both
- [ ] I can build returns machinery: revenue / refund liability / recovery asset / COGS

**Next:** RR9 vaults the rest of the guidance — consignment, bill-and-hold's four tests, non-refundable upfront fees (the ₹1,000/month gym canon), customer options and material rights, and breakage estimation.
