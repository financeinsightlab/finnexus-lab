# 🎯 CS3 · The Consolidation Mechanics — Combine, Align, and the Vanishing Investment Line

> The three locks clicked on CS2 — Meridian controls ForgeTech. So how do statements actually get BUILT? Not with magic software first; with a discipline that looks almost boring until you realize it's the most consequential arithmetic on the financial planet: **combine like items line-by-line** (parent's cash + child's cash, parent's debt + child's debt), **align the children** to uniform accounting policies and reporting dates before combining (a FIFO child inside a WAC parent is measurement salad), and perform the great **vanishing act**: the parent's "Investment in subsidiary ₹400cr" line evaporates, replaced by the child's actual assets and liabilities plus two new creatures — goodwill and NCI. The creature CS1 described is fabricated right here. This module builds the factory; CS4 through CS6 power the machinery inside it.

---

## 🎯 Objectives

- Run line-by-line combination and the pre-combination alignment step
- Apply the uniform-policy doctrine (restate the child to the group's basis)
- Handle the 3-month reporting-date corridor and gap-period adjustments
- Perform the investment-account vanishing act (₹400cr → net assets ₹310cr + goodwill + NCI)
- Locate the parent's separate FS alongside (cost model, dividend income)
- Build the acquisition-date consolidated balance sheet manually

## 📘 Concepts

### 3.1 Combine — one creature, stitched line by line

The assembly rule: add together line-by-line the parent's and each subsidiary's like items — assets, liabilities, equity, income, expenses, cash flows. Ten skins of one creature, one table of numbers. Software does the stitching today, but the DESIGN of the combined table is judgment: which charts of accounts map to which group lines (the collation mapping), what presentation group stuck items land in, and how subsidiary-specific quirks (trust accounts, escrow reserves) reclassify. This is also where mis-mapping mishaps happen: consolidation files with a fixed chart-mapping and an annual review habit beat "copy-row specials" every time.

### 3.2 Align policies first — the uniform-basis doctrine

Before any combining: group members' statements must be restated to UNIFORM accounting policies (the parent's). A FIFO child inside a WAC creature reports mismatched closing inventory and COGS; combining raw would bake policy noise into the creature's margins. Procedure: child prepares group-basis restatement schedules (FIFO→WAC adjustments, Ind AS-115 policy alignment, impairment policy harmonization), the parent's consolidation layer absorbs the delta with disclosure where it bites materially. Modern ERPs automate the dual-ledger; principle stands either way: one creature, one measurement language.

### 3.3 Align dates — the 3-month corridor

Subsidiaries must (practically) match the parent's reporting date; when impossible, the rule tolerates a gap of no more than **3 months**, AND requires adjustments for significant transactions and events in the gap. Canon: child's year closes 31 December, parent's 31 March — consolidate the child's 31-Dec statements plus a gap-patch for material quarter events (a ₹40cr acquisition in Feb, a big dividend in Jan). Never the lazy path: gap-patch discipline is what stops "cheap consolidation" from materially mis-dating the creature. (A child switching year-ends mid-stream handles the similar adjustment with disclosure.)

### 3.4 The vanishing act — ₹400cr becomes a balance sheet

Acquisition date geology, on the CS-verified canon: parent invests **₹400cr** for 80% of ForgeTech; ForgeTech's identifiable net assets at fair value (post-DTL, per DT9) total **₹310cr**; proportionate NCI measure = 20% × 310 = **₹62cr**, goodwill = 400 + 62 − 310 = **₹152cr** (full equation verified in python, CS4 owns the goodwill/NCI choice debate). The consolidation journal's skeleton:

- Dr ForgeTech's individual assets (fair values) and Cr liabilities — the child's balance sheet moves into the creature.
- Cr Investment in ForgeTech ₹400cr (in the parent's books) — the investment line VANISHES.
- Cr NCI in equity ₹62cr — the other owners' claim recognized.
- And the balancing residual, **goodwill ₹152cr**, appearing as the asset where the investment used to sit.

From today forward, "Investment in ForgeTech ₹400cr" never again appears in consolidated statements; in its place live a plant, receivables, payables, debt, a ₹152cr goodwill block, and a ₹62cr NCI slice. That swap — one line of skin for the full organ transplant — is the most important journal in group accounting.

### 3.5 Separate books beside the creature — the cost-model peace

The parent's SEPARATE financial statements (legal-required in India and elsewhere) keep investments in subsidiaries at COST (Ind AS 27, or IAS 109 measurement on election) — cheap, stable, dividend-income-recognizing. The ₹400cr stays as ₹400cr there, static until impairment review or top-up. Both statements coexist by design: separate = the skin's statutory file, consolidated = the creature's public truth; professionals never confuse which is being quoted when "Meridian's profit" hits a headline (Indian results release both columns plainly for this reason).

### 3.6 The first-year file — what the working paper stack looks like

In order: (1) child trial balance mapped to group lines; (2) uniform-policy restatement schedules; (3) gap-date patch (if any); (4) fair-value allocation from the PPA (the DT9 factory step-up lives here, with its DTL); (5) acquisition elimination (§3.4's journal); (6) post-acquisition profit/non-profit movements with NCI attribution (CS5's table); (7) intercompany matrix (CS6 homework); (8) the consolidated primary statements and the reconciliation-first-tick: does every eliminated pair foot back to the skins? Stack discipline is how consolidations survive audit season repeatedly.

## 🧪 LAB — Build the Acquisition-Day Balance Sheet (10 min)

Meridian's day-0 file: parent's own balance sheet has Investment ₹400cr against cash paid; ForgeTech (100% of whose identifiable net assets are measured at ₹310cr fair value, post-DTL) brings: plant & equipment ₹240cr, receivables ₹50cr, cash ₹30cr, payables ₹10cr; NCI is 20% proportionate.

1. Compute NCI day-0 and goodwill.
2. State the vanishing-act journal lines (T-account English, no entries).
3. Where does the ₹400cr investment line appear after consolidation?
4. ForgeTech reports on FIFO while the group's policy is WAC — pre-combination step?
5. ForgeTech's year-end is 31 December; the group's is 31 March — the rule?

**Why this matters:** every M&A closing spawns exactly this stack; running it by hand once is how you stop needing to.

**🔑 Lab answers:**
1. NCI = 20% × 310 = **₹62cr**; goodwill = 400 + 62 − 310 = **₹152cr**. 2. Move ForgeTech's assets/liabilities into the creature (240 + 50 + 30 in, 10 out for 310 net); extinguish the investment ₹400cr; recognize NCI ₹62cr; recognize the ₹152cr goodwill residual. 3. **Nowhere** — replaced by the organs: plant, receivables, cash, payables, goodwill and the NCI equity slice; the skin-line goes extinct on consolidation day. 4. Restate ForgeTech's statements to WAC basis BEFORE combining (uniform-policy doctrine) — the delta rides the restatement schedule with disclosure if material. 5. Corridor permit (≤3 months): consolidate 31-Dec numbers WITH gap-period adjustments for material transactions (acquisitions, dividends, big write-offs in Jan–Mar).

## 💪 Exercises

1. A junior proposes keeping the ₹400cr investment line AND adding ForgeTech's organs ("to show both"). Correct in two lines.
2. Why is policy alignment done BEFORE combination rather than consolidated-then-aligned? One sentence.
3. The child's year-end is 30 June, parent's is 31 March — may you consolidate as-is? Rule and consequence?
4. What does "cost model in separate FS" buy the parent, practically? Two bullets.

### ✅ Selected answers

1. Double-counting — the same ₹400cr economic content would appear twice (as "investment" and again as organs plus NCI plus goodwill); consolidation is a substitution, not an addition: the line vanishes exactly once, completely.
2. Because combined-line arithmetic (margins, inventory turns, comparatives) only means something if every added row speaks the same measurement language — alignment must precede stitch, or the creature's ratios silently blend FIFO and WAC economics.
3. No — the gap is 9 months, beyond the 3-month corridor: ForgeTech must move its reporting date (prepare a special coterminous set); the corridor exists for edge-mismatch cases, not for permanently different calendars.
4. Statutory simplicity (cost-basis stability, no annual FV fighting) and clean dividend-income visibility in the parent's legal profit stream; consolidation carries the economic truth separately — two reports, two deliberately different lenses.

## ❓ Quiz

**Q1.** The investment-account vanishing act on the canon (₹400cr for 80%, NCI 62, goodwill 152):
(a) investment stays plus goodwill added on top
(b) the ₹400cr investment line is extinguished and REPLACED by the child's measured organs (net ₹310cr) plus NCI ₹62cr plus goodwill ₹152cr — a substitution journal, never an additive one; consolidated statements never show "Investment in ForgeTech" again from that day
(c) investment converts directly to goodwill 152
(d) investment halves to 200

**Q2.** Group policy/date alignment before combination:
(a) optional for small gaps
(b) MANDATORY in substance: children restate to uniform group policies (FIFO→WAC-style) BEFORE combining, and year-end gaps fit inside the 3-month corridor with material gap-transactions patched — measurement language and calendar aligned before a single line is added
(c) needed only for foreign children
(d) only policy, dates may vary freely

**Q3.** The parent's separate FS (Ind AS 27):
(a) show consolidated detail too
(b) keep each subsidiary investment at COST (or 109-measurement) with dividend income flowing to its legal P&L — the skin's statutory file, coexisting with the creature's consolidated statements; every professional quote must say which of the two is being quoted
(c) measure subsidiaries at FV through OCI only
(d) eliminate intercompany balances too

### ✅ Answers

1. **(b)** — substitution geology: organs + NCI + goodwill replace the investment line, once, fully.
2. **(b)** — uniform language (policies) and calendar (dates/corridor) precede combination.
3. **(b)** — separate books at cost; consolidated statements beside; quote which, always.

## ✅ Mastery checklist

- [ ] I can run line-by-line combination and name the collation mapping
- [ ] I can restate a child's statements to group policies
- [ ] I can apply the 3-month corridor with gap adjustments
- [ ] I can journal the vanishing act cold: organs + NCI + goodwill
- [ ] I can carry both reports (separate vs consolidated) without confusing them
- [ ] I can stack the first-year working paper file in order

---

**Next:** **CS4 · Goodwill & the NCI Question** — the ₹160cr-vs-₹190cr fork: proportionate-share vs full-goodwill measurement of the minority slice, what each does to goodwill, impairment tests later, and how one election made on acquisition day rides the creature forever.
