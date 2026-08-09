# 🎯 RR6 · Step 5: Over Time vs Point in Time — The Revenue Clock

> The last step is the one that moves money between quarters: does control transfer in one moment (point in time) or continuously (over time)? Ind AS 115 tests over time FIRST with three criteria — fail all three and you're point-in-time by default. Then it demands a faithful progress measure: input methods (cost-to-cost), output methods (units/milestones), with surgical exclusions for things like uninstalled materials that would otherwise pollute the percentage. Today's canon: a ₹5cr construction job whose true progress is 16.67%, not the 25% your CFO hoped.

---

## 🎯 Objectives

- Run the three over-time criteria in order and know which businesses live where
- Choose and operate progress methods: input (cost-to-cost), output (units/milestones), time-elapsed
- Apply the uninstalled-materials exclusion and zero-margin adjustment, with numbers
- Use the right-to-invoice practical expedient for rate-per-unit service contracts
- Audit progress-measure quality: unfaithful inputs, stage-of-completion update discipline

## 📘 Concepts

### 6.1 The three over-time criteria — any one earns the drip

A PO transfers over time if ANY criterion holds:

1. **Simultaneous receipt and consumption**: the customer receives and consumes the benefits as you perform — payroll processing, daily cleaning, recurring services. The test asks: if another vendor took over mid-stream, would the customer need to substantially re-perform the work done to date? No re-do needed → benefits were consumed as delivered.
2. **Customer controls the asset as it's created or enhanced**: construction ON THE CUSTOMER'S SITE (a building rising on his land — he controls the work-in-progress), renovation of his factory.
3. **No alternative use + enforceable right to payment**: your performance creates an asset with no alternative use to you (bespoke tooling, dedicated machine, custom software on a client's processes) AND you have an enforceable right to payment for performance completed to date (cost + reasonable margin) at all times if the contract dies — not just damages upside, but pay-for-work-done. BOTH halves mandatory: a bespoke asset without payment rights doesn't qualify; a generic asset with killer payment rights doesn't either.

Fail all three → **point in time**: recognize when control transfers at a moment (delivery, installation acceptance, bill-and-hold provenance in RR9). The landscape consequence to memorize: services → mostly criterion 1; construction on customer sites → criterion 2; bespoke manufacturing/consulting with pay-for-progress clauses → criterion 3; widgets in boxes → point in time.

### 6.2 Progress methods — faithful depiction only

For over-time POs, revenue = transaction price × progress toward complete satisfaction. Two method families, one law: the method must **faithfully depict the transfer of value**, applied consistently per PO type:

- **Input methods** measure effort: **cost-to-cost** (costs incurred ÷ total expected costs), labor hours, machine hours, time elapsed. Watch: input methods can mislead when inputs don't move value proportionally (front-loaded procurement!) — hence the exclusions below.
- **Output methods** measure value delivered: units produced, milestones certified, surveys of work performed, time elapsed. Directly faithful but often unobservable — you can't survey a half-written algorithm; and milestone schedules must actually mirror progressive control transfer (a 90%-at-signoff milestone plan is invoicing, not progress).
Update discipline: progress and total estimates refresh EVERY reporting date; method changes are estimate changes (prospective, disclosed), never retroactive clean-ups.

### 6.3 The uninstalled-materials exclusion — the canon surgery

Cost-to-cost can be gamed by early-buying big-ticket items: land ₹40L of elevators on site day one and your "progress" leaps without any value delivered. Rule: when materials are procured significantly ahead of installation AND their cost doesn't depict transfer, **exclude them from both numerator and denominator of the progress measure**, and recognize revenue on those materials at **zero margin** (cost = revenue) upon transfer to the customer's control.

**Canon (python-verified):** contract price ₹5.0cr; costs incurred ₹1.0cr including ₹40L of uninstalled elevators at zero margin; total expected costs ₹4.0cr. Adjusted progress = (100 − 40)/(400 − 40) = 60/360 = **16.67%** (not the naive 25%). Revenue = 5.0cr × 16.67% + 0.4cr at zero margin = 83.33L + 40L = **₹1.233cr**. Auditors live for this surgery; builders who "forget" it overstate both revenue and margin.

### 6.4 Right-to-invoice — the honest shortcut

Where you invoice an amount that **corresponds directly to the value transferred** — time-and-materials billing at contract rates (₹4,000/hour consulting), per-km logistics, per-unit utilities — you may recognize **revenue as invoiced**: the practical expedient skips measuring progress formally because the invoice pattern IS the faithful pattern. Breaks when: rates are blended/flat but value delivered isn't straight-line (then measure properly); when significant upfront payments distort; when the invoice includes non-service components.

### 6.5 Wasted inputs and inefficiencies

An honest cost-to-cost watch: costs from **unexpected inefficiencies** (rework, wasted material, idle labor from your own scheduling failures) do not represent control transferred — strip them from the progress numerator (and expense them to P&L as incurred, not into asset progress). The compounding effect: they leak out of both the measure and the margin. Budgeted, expected costs stay in; surprises from incompetence leave. The audit trail distinguishes the two through variance analysis — one more reason total-cost estimates deserve the CB6-style control-freak treatment.

## 🧪 LAB — Two Clocks, One Job (10 min)

**Job A (consulting):** ₹40L fixed-fee process-automation advisor ENGAGEMENT running 8 months predicted; no building, bespoke output to the client's own systems, contract guarantees cost+10% payment for work done on any termination.
**Job B (construction):** ₹5.0cr canon above, but now month 8: costs to date ₹2.2cr (incl. ₹40L elevators still uninstalled), total estimate revised to ₹4.4cr.

1. Which criterion puts Job A over time — name BOTH halves and show each is met.
2. Pick Job A's faithful progress measure and say why cost-to-cost misleads here.
3. Job B month-8: adjusted progress %, cumulative revenue, revenue this period (assume year-start cumulative revenue booked was ₹1.233cr).
4. The site logs show ₹12L of crane-idle rework from a scheduling blunder inside the ₹2.2cr. Recompute.

**Why this matters:** criterion-calling + exclusion surgery + inefficiency stripping is the complete Step-5 toolkit on real numbers.

**🔑 Lab answers:**
1. **Criterion 3**: (i) no alternative use — bespoke automation to the client's systems can't be resold; (ii) enforceable right to payment for performance to date — cost + margin terminated-work clause. Both halves met → over time.
2. Output/flavored milestone measure — hours-spent misleads because advisory value isn't linear in hours (design breakthroughs vs documentation grunt); if inputs track value poorly, time-elapsed is the honest time proxy; document WHY the chosen measure depicts value.
3. Progress = (220 − 40)/(440 − 40) = 180/400 = **45%**; cumulative revenue = 5.0cr × 45% + 40L zero-margin = 2.25 + 0.40 = **₹2.65cr**; this-period revenue = 2.65 − 1.233 = **₹1.417cr**.
4. Strip ₹12L inefficiency: progress = (220 − 40 − 12)/(440 − 40) = 168/400 = **42%**; cumulative revenue = 2.10 + 0.40 = **₹2.50cr**; the ₹12L hits P&L as period cost — never as progress.

## 💪 Exercises

1. Why does criterion 1 accept payroll processing but reject audit-report writing?
2. A tower on the BUILDER'S own plot, sold flats under RERA-style agreements — argue both sides of the over-time question (hint: India finished this debate; RR11 lands the landing).
3. Milestone plan: 30% on design signoff, 50% on "substantial completion," 20% on handover. When is this NOT a faithful output measure?
4. The CFO: "Elevator exclusion? We paid cash; the customer owns it. 25% it is." Correct with the canon numbers.
5. T&M contract, ₹3,800/hr auditor-verified rate card, invoices monthly for hours logged. May you use as-invoiced recognition, and what single fact would break permission?

### ✅ Selected answers

1. Takeover test: a new payroll vendor needs no re-do of processed months — benefits consumed continuously ✓. For an audit report, the deliverable transfers only on delivery — a successor substantially re-performs to reach the same position → not over-time under criterion 1 (and usually PIT on delivery with engagement economics).
2. Over-time argument: enforceable agreement + construction to buyer specs; BUT the decisive question is enforceable right to payment for performance to date — in Indian real estate, termination clauses typically refund deposits and let the developer resell the unit (alternative use present), so criterion 3 fails; control passes at handover/registration — **point in time** has been India's landing. RR11 takes the full RERA look.
3. When the milestone percentages mirror billing convenience, not value transfer — if substantial completion genuinely delivers ~80% of the value, a 50% milestone understates progress (and vice versa); output measures must be earned by what the customer actually controls at each stage.
4. Elevators sit excluded from the 25% naive claim: numerator and denominator both remove the ₹40L, giving 16.67% adjusted progress and ₹1.233cr revenue — ownership moving is the zero-margin trigger for the ₹40L line itself, not a 25% progress donation.
5. Yes — hours invoiced directly correspond to value transferred (expedient). It breaks if the rate is a blended/flat structure whose value delivery is non-linear, or if hours logged stop mirroring client value (e.g., a fixed cap kicks in that disconnects price from value).

## ❓ Quiz

**Q1.** The decisive pair for bespoke-asset over-time recognition is:
(a) 50% costs incurred plus signed contract
(b) no alternative use of the asset AND an enforceable right to payment for performance to date — both halves, always
(c) customer paid an advance and approved the design
(d) work happens on the vendor's premises

**Q2.** The uninstalled-materials rule requires:
(a) include them fully in progress
(b) exclude them from the progress measure and recognize them at zero margin on transfer of control — cost-to-cost depicts effort, and parked equipment isn't effort
(c) write them off immediately
(d) recognize them at a standard 10% markup

**Q3.** Month-8 construction: costs ₹2.2cr with ₹40L uninstalled lifts and ₹12L own-fault rework; total estimate ₹4.4cr; price ₹5.0cr. Cumulative revenue is:
(a) ₹2.65cr before stripping rework
(b) ₹2.50cr — adjusted progress (220−40−12)/(440−40) = 42%, plus the ₹40L zero-margin transfer
(c) ₹2.75cr straight cost-to-cost
(d) ₹5.0cr × 50% milestone invoiced

### ✅ Answers

1. **(b)** — bespoke alone is not enough; payment rights alone are not enough; the pair is the law.
2. **(b)** — exclusion surgery plus zero-margin transfer: ownership moves the asset, not the progress.
3. **(b)** — (220−40−12)/(440−40) = 42%; rework is a period cost, never progress: cumulative revenue ₹2.50cr.

## ✅ Mastery checklist

- [ ] I can run the three criteria in order and classify service/construction/bespoke/widget
- [ ] I can name both halves of criterion 3 and refuse half-measures
- [ ] I can compute adjusted progress with materials AND inefficiency surgery
- [ ] I can defend a chosen progress measure in one paragraph
- [ ] I can apply the as-invoiced expedient and name its breaker

**Next:** RR7 balances the engine — contract assets vs receivables vs contract liabilities, ECL riding on contract assets, and the cost-to-obtain/fulfil capitalization rules with their one-year expedient.
