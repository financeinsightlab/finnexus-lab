# 🎯 SY6 · FINANCE: Compliance Logic + Capstone
> Policies are AEIO propositions with a company seal. An invoice above ₹50,000 walks through the "All such invoices need CFO sign-off" rule and the conclusion *must* follow — or the audit finding writes itself. We turn ShopKart's policy folder into a syllogism gym, learn where compliance language leaks (the deadly "only", the silent gate), then ship the **Policy-Logic Audit** capstone.

## 🎯 Objectives
- Parse real policy lines into A/E/I/O — including the "only"-flip and "unless" chains.
- Decide **COMPLIES / ESCALATE / BLOCKED** for transactions as forced syllogistic conclusions.
- Detect policies whose wording does NOT cover the action being taken (the silent-gate finding).
- Distinguish policy permission ("may trade") from policy mandate ("needs sign-off") — arrows only travel the way they're stated.
- **Capstone:** produce ShopKart's one-page Policy-Logic Audit: rule register, transaction verdicts, and two gap findings with recommended redrafts.

## 📘 Concepts

### 6.1 The ShopKart rule register, typed
| Rule (as written) | Type | Standard form |
|---|---|---|
| All invoices above ₹50,000 need CFO sign-off | A (escalation) | invoice>₹50k → CFO-required |
| No cash sale exceeds ₹2,00,000 | E | cash-sale ✗ >₹2L |
| Only GST-registered vendors receive purchase orders | A, flipped | PO-recipient → GST-registered |
| Some refunds are instant | I | refunds ∩ instant ≠ ∅ |
| Some legacy vendors are not GST-registered | O | legacy ↛ GST |
| Unless KYC-complete, accounts may not trade | E-chain | non-KYC ✗ trading ("unless X, not Y" = No non-X is Y) |

The **"unless"** line deserves its plaque: *"Unless KYC-complete, accounts may not trade"* parses as **No non-KYC-complete account may trade** — a hard wall, not a suggestion. (Watch its weaker cousin in 6.3 — the permission arrow that says nothing about the other side of the gate.)

### 6.2 Transaction verdicts — conclusions that MUST follow
**FF-221 invoice: ₹47,250 + 18% GST (₹8,505) = ₹55,755, payable net-30.**
- Rule: All invoices above ₹50,000 need CFO sign-off. FF-221 (₹55,756 total duty… invoice value ₹55,755 > ₹50,000) is such an invoice. ⇒ **ESCALATE — CFO sign-off mandatory.** Forced, not advisory. (An auditor who skips the ">" check writes-or-misses a finding.)
- Is a ₹49,999 invoice exempt? All-and-only >₹50k invoices carry the duty; the rule is silent below the line ⇒ **no sign-off duty follows** (a deliberate threshold — and a deliberate split-invoice temptation; see 6.4).

**Cash sale of ₹2,10,000?** No cash sale may exceed ₹2,00,000 ⇒ **BLOCKED.** The E-wall doesn't negotiate.

**PO to a legacy vendor who is not GST-registered?** PO-recipient → GST-registered; this vendor is not ⇒ no PO may be issued ⇒ **BLOCKED** (contrapositive of the flipped A — contraposition is legal: "All PO-holders are GST-reg" forces "No non-GST vendor is a PO-holder").

**Refund processed instantly today?** Some refunds are instant ⇒ today COULD be one of them ⇒ **COMPLIES (possible, no breach)** — an I-rule permits; it never mandates.

### 6.3 The silent gate — where audits are won
Rule: *"All KYC-complete accounts may trade."* A legacy account is NOT KYC-complete and it traded. Breach?
- Parse: the arrow grants permission traveling one way (KYC ⇒ may trade). It never says **only** KYC-complete accounts trade. The statements are silent about non-KYC accounts ⇒ **NO violation follows from this sentence alone.** (Exactly SY3's exercise 7 in the wild.)
- The audit-grade redraft: "*Only KYC-complete accounts may trade*" (flips to: all trading accounts must be KYC-complete) or "*No non-KYC-complete account may trade*" (the E-wall). Compliance juniors who can't type these two sentences cost companies real findings — you just learned to type them.

### 6.4 Threshold gaming — the split-invoice syllogism
Rule: All invoices above ₹50,000 need CFO sign-off. Vendor proposes two invoices of ₹27,878 each (splits FF-221). Each invoice: below threshold ⇒ no sign-off duty follows *per invoice*. Is the spirit breached? **Logic can't convict the letters** — the rule as written passes both invoices. Finding: the rule lacks an anti-splitting aggregate ("all invoices to the same vendor **aggregating** above ₹50,000 in a 7-day window…"). This is a genuine audit pattern (**structuring** in AML: deposits split below ₹10L reporting). Syllogisms don't just pass exams; they tell you where the policy's circle has a hole.
**Recommended redraft:** "All invoices to a single vendor aggregating above ₹50,000 within any 7-day window need CFO sign-off." (Type: A, with an aggregate subject — the subject-set itself now includes split-pairs.)

### 6.5 The audit-flag matrix — escalation chains as A-chains
Chain rules compound: *All invoices above ₹50,000 need CFO sign-off. All CFO sign-offs above ₹2,00,000 need a second director's counter-signature.* ⇒ All invoices above ₹2,00,000 need CFO **and** director signatures (A→A chain ✓). Vendor invoice ₹2,40,000 signed by CFO only ⇒ **ESCALATE to director.** Chained duties are just nested circles in a suit.
Also note the E-harvest: *No cash sale exceeds ₹2,00,000. The Diwali bulk order is a cash sale of ₹2,40,000 ⇒ Diwali bulk ⇒ blocked*, and by conversion: nothing exceeding ₹2L is a permissible cash sale.

### 6.6 CAPSTONE BRIEF — the ShopKart Policy-Logic Audit (one page)
**Deliverable 1 — Rule register:** the 6.1 table, re-typed by YOU, plus one line per rule naming its type and its arrow direction.
**Deliverable 2 — Verdict docket (this week's live items):**
1. FF-221, ₹55,755, unsigned → **ESCALATE (CFO)** — forced by rule 1 ✓
2. ₹2,40,000 cash, Diwali bulk → **BLOCKED** — E-wall ✓
3. PO #884 to legacy vendor, GST status unknown → **HOLD — prove GST-registration first** (standard form needs the fact; audits run on facts, not vibes)
4. Instant refund ₹1,300 → **COMPLIES** — I-rule permits ✓
5. Non-KYC legacy account executed a trade under the OLD "may trade" wording → **NO breach by the letter** — file as wording gap, not violation ✓
**Deliverable 3 — Gap findings & redrafts:**
- Gap A (silent gate): 6.3's KYC sentence → redraft to the E-wall version.
- Gap B (threshold gaming): 6.4's sign-off rule → redraft with vendor-aggregation.
**Deliverable 4 — Sign-off:** three lines of CFO-speak explaining why "some refunds are instant" never obligates an instant refund tonight (the I vs mandate distinction — twin towers don't talk, now with money).

## 🧪 LAB — Compliance desk (10 min)
1. Type-tag this policy: "Only employees with badges may enter the server room." Then verdict: intern (badged temp) entering — permitted worded-ly? Supervisor WITHOUT badge entering?
2. "All wire transfers above ₹10,00,000 need dual authorization." Wire of ₹12,00,000 signed by one authorized officer — verdict and the forced-conclusion chain.
3. Rules: All CFO sign-offs are logged. Some CFO sign-offs happened after midnight. Forced conclusion about the log?
4. Silent-gate hunt: "All GST-registered vendors may receive POs." Vendor X is NOT registered but holds PO #901. Breach by the letter? Redraft so X is blocked.
5. Split-game: three invoices ₹19,000 / ₹18,500 / ₹17,000, same vendor, same day, aggregate ₹54,500. Rule as written in 6.1 — verdicts per invoice? Finding type?

**Why this matters:** this is 80% of a real internal-audit internship — parsing rules, forcing conclusions, and finding the holes the words left open.

**🔑 Lab answers:** (1) flipped A: All server-room enterers must be badged employees ⇒ badged intern: COMPLIES by the letter; badge-less supervisor: **BLOCKED** (rank is not an arrow the rule stated) (2) ESCALATE/BLOCKED: single-signatory wire >₹10L contradicts dual-authorization — A-chain: transfer >10L ⇒ needs two authorizations; one present ⇒ duty unmet (3) Some CFO sign-offs are logged… no wait — stronger: those after-midnight sign-offs ARE CFO sign-offs, all of which are logged ⇒ **Some after-midnight sign-offs are logged** ✓ (A+I escort) (4) NO breach by the letter (permission arrow one-way); redraft: "Only GST-registered vendors may receive POs" (5) each below ₹50k ⇒ no duty per letter ⇒ verdict COMPLIES ×3 + **Gap finding: aggregate-threshold missing** (recommend the 7-day window redraft).

## 💪 Exercises
1. Build a 4-rule mini-register for a warehouse (safety, access, discounts, refunds): one A, one E, one flipped-A (only), one I. Then trade questions with yourself: one COMPLIES, one BLOCKED, one "no breach by the letter," one ESCALATE.
2. Contrapositive drill: from "All PO-holders are GST-registered," derive the E-form conclusion about non-registered vendors in two ways (chain, then contraposition). Prove they're the same wall.
3. Wording audit: company doc says "Managers may approve refunds." Staffer (non-manager) approved one. List what follows, what doesn't, and the two possible redrafts depending on intent.
4. Chain audit: All invoices >₹50k → CFO. All CFO sign-offs >₹2L → Director. Verdict for an unsigned ₹2,60,000 invoice? For a CFO-only-signed ₹2,60,000? For a ₹49,000 unsigned one?
5. AML structuring note: rule "All deposits above ₹9,50,000 are reported to FIU." Five deposits of ₹1,90,000 each, same account, same week (total ₹9,50,000)? By the letter? Finding + redraft (mirror 6.4).
6. Capstone rehearsal: present Deliverable 2's docket in 60 seconds aloud — item, verdict, forcing rule. Record yourself; replay for the words "forced" and "by the letter."

### ✅ Selected answers
1. Sample: All staff wear helmets on the floor (A) · No forklift enters the canteen (E) · Only supervisors authorize overtime (flipped A) · Some bins are temperature-controlled (I). Verdicts mirror the lab patterns — the point is the register discipline (type + arrow) more than my wording.
2. (i) Chain: No GST ⇒ … can't chain E directly — use conversion after contraposition: All PO are GST ⇒ If not-GST then not-PO ⇒ **No non-GST vendor is a PO-holder**; (ii) contraposition of A→B is ¬B→¬A directly — same wall. Both legal; the syllogistic safe road is: All PO are GST + (hypothetical vendor non-GST) ⇒ vendor ∉ PO-holders ⇒ E-statement.
3. Follows: nothing about staffers (permission arrow one-way — MAY the manager; silent about others). Doesn't follow: "breach" (by the letter). Redraft (intent=restrict): "Only managers may approve refunds." Redraft (intent=inform): keep + add separate duty rule for staffers if desired.
4. ₹2,60,000 unsigned: ESCALATE ×2 (CFO + Director, chained) · CFO-only: **ESCALATE to Director** (chain forced) · ₹49,000: no duty follows by the letter (threshold line).
5. By the letter: each deposit ≤ ₹9,50,000 ⇒ **zero reports owed — and the total sits AT the line, not above it** ⇒ as written, passes. Finding: aggregate/structuring gap. Redraft: "All deposits to a single account aggregating ₹9,50,000 or more within any 7-day window are reported."
6. Self-scored — but if any verdict came without naming its forcing rule, that's a POSSIBILITY PANIC cousin: conclusions must cite their arrows.

## ❓ Quiz
1. Policy: "All invoices above ₹50,000 need CFO sign-off." FF-221 totals ₹55,755 — the FORCED action:
   - (a) nothing until payment falls due
   - (b) CFO sign-off is mandatory (ESCALATE) — A-rule + member of the subject class ⇒ duty follows with logical force; audits are conclusions with letterheads
   - (c) GST re-verification first
2. Policy: "All KYC-complete accounts may trade." A non-KYC account trades. By the letter:
   - (a) breach — the gate was stated
   - (b) NO breach follows — the permission arrow travels one way (KYC ⇒ may trade) and is silent about non-KYC accounts; block it by redrafting to "Only KYC-complete accounts may trade" (the flipped E-wall)
   - (c) possible breach, definite fine
3. Vendor splits FF-221 into two ₹27,878 invoices, both unsigned. The rule in Q1:
   - (a) blocks both — thresholds aggregate automatically
   - (b) passes both BY THE LETTER — each invoices below ₹50,000 and the rule never aggregates; the finding is a redraft with a 7-day vendor-window, exactly the AML-structuring pattern
   - (c) blocks only the second one

### ✅ Answers
1. **(b)** — ">"-check + member + A-chain = verdict. No vibes required.
2. **(b)** — the silent gate: one-way arrows are the most expensive wording mistake in policy-drafting.
3. **(b)** — logic convicts letter, not spirit; then you redraft the letter. That's the whole audit loop.

## ✅ Mastery checklist
- [ ] I type-tag policy lines (incl. "only"-flips and "unless" E-walls) in seconds
- [ ] Verdicts COMPLIES / ESCALATE / BLOCKED always cite their forcing rule
- [ ] One-way permission arrows never smuggle bans for the other side of the gate
- [ ] Threshold gaps trigger my aggregation-redraft reflex (7-day window, vendor-total)
- [ ] Contraposition and E-conversion give me the same block from two roads
- [ ] I shipped the 4-deliverable Policy-Logic Audit — register, docket, gaps, sign-off

🏆 **COURSE COMPLETE — Syllogisms!** From AEIO vowels to either-or machines to a signed policy audit — you now run two courts (definite & possibility), draw worlds on demand, and never let the real world leak into the statement-world. Logic, monetized.

**Next:** **🚄 Time, Speed & Distance** — back to numbers: D = S×T, averages that harmonize, trains, boats, races and circular tracks — all priced in ShopKart delivery-kilometers. Lace up! 🚀
