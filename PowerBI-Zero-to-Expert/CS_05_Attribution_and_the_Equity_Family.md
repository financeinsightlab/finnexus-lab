# 🎯 CS5 · Attribution & the Equity Family — After the Acquisition, the Creature Moves

> Acquisition day is geology; the years after are weather. The child earns profits (or losses), pays dividends, and every rupee must be SPLIT between the owners of the parent and the non-controlling interest — the consolidated P&L's most read two lines: "Profit attributable to owners of the parent" and "Profit attributable to NCI." And then a strange, beautiful doctrine appears: once control is yours, trading MORE or LESS of the child's shares WITHOUT losing control is not a business event at all — it's an EQUITY family transaction. Buy another 10% of your own subsidiary and the difference doesn't touch goodwill, doesn't touch P&L — it lands directly in your OWN equity, like buying back your own shares from a cousin. This module runs both families: attribution and equity-within-control.

---

## 🎯 Objectives

- Split consolidated profit between owners and NCI — including NCI's share of LOSSES
- Track consolidated equity movements: NCI = open + share of profit − dividends received
- Run the ownership-change-without-loss-of-control canon: 80% → 90%, ₹5cr to parent equity
- Mirror the sale-without-loss: premium received credits equity, never P&L
- Explain the doctrine: control once proven, all later family trades ride through equity alone

## 📘 Concepts

### 5.1 Attribution — the two most read lines in a group P&L

Every period: split total comprehensive income and profit between owners of the parent and NCI — clean canon (CS-verified from the full capstone grid): subsidiary's own-year profit ₹42.5cr (after acquisition-date fair-value adjustments; grid math in CS12): owners take 80% = **₹34cr**, NCI takes 20% = **₹8.5cr**. Promptly two discipline points. First, NCI shares LOSSES as well — even if the NCI balance turns NEGATIVE: the minority's debit balance stands in equity (no subsidized floor "because minorities can't owe"), disclosed as such. Second, attribution reflects ECONOMICS: preference shares, profit-sharing quirks, and blocking rights must ride the actual entitlement ladder, not the raw voting percentage where they diverge.

### 5.2 NCI's balance sheet walk — the minority's own ledger

Every period, the NCI line moves like a mini-reserve: NCI_close = NCI_open + share of profit (or loss) − dividends PAID TO NCI ± ownership changes ± share of OCI ± its side of PPA amortization. Capstone canon (python-verified): NCI open ₹62cr (day-0 proportionate value) + ₹8.5cr share of the year − ₹2cr dividend received = **₹68.5cr closing**. Keeping the NCI walk as a signed schedule matters practically: the consolidated SOCIE builds from it, the disclosures table material-NCI subsidiaries off it, and whenever a claim disputes "what did the minority ever get," this walk is the courtroom exhibit.

### 5.3 Buying more of your own child — the equity family transaction

You control the child already (80%). You buy another 10% from the minority for **₹55cr** when the NCI's consolidated carrying for that slice is 10% × 500 = **₹50cr** of net-asset share. Business accounting? NO — Ind AS 110 treats this as an equity transaction between owners: NCI drops by ₹50cr (the slice's carrying); consideration ₹55cr; the ₹5cr difference goes STRAIGHT TO EQUITY attributable to owners of the parent — a reserve debit, like a treasury-share overpay (python-verified). No goodwill (goodwill is computed ONCE, on acquisition day), no P&L gain or loss, no revaluation of the child's net assets. The doctrine breath: control is binary; the family was already consolidated — trading WITHIN the family moves ownership percentages without moving economics.

### 5.4 Selling without losing control — the mirror image

Sell 10% of your 90% to an outside investor for ₹70cr (creature stays controlled): increase NCI by the slice's carrying share — say ₹60cr (10% of NA 600) — and credit the ₹10cr premium straight to owner's equity. The group's books simply re-label family slices; the creature's total equity rises by exactly the cash received, split between "owners of the parent" and NCI. Retest control after every such sale (did you cross below control? then CS8's loss-of-control machinery fires — a different universe entirely).

### 5.5 Consolidated SOCIE — where it all lands

The consolidated statement of changes in equity is the yearly census: owner's entries (profit share, OCI, dividends paid to owners, equity-family adjustments from §5.3/§5.4) and NCI entries (profit share, dividends received, family trades) march side by side in separate columns. The analyst habit for reading groups: always scan the equity-family lines — they reveal creeping buyouts (control entrenchment), minority discounts forced at low prices (governance flags), and premium raises from strategic minorities — stories the P&L is forbidden to tell but equity whispers every year.

## 🧪 LAB — The Moving Years (10 min)

ForgeTech year-2 file after the CS3/CS12-style acquisition: S profit for year 2 ₹50cr; fair-value uplift depreciation overload ₹10cr with DTL release ₹2.5cr; S declares and pays dividends ₹20cr (₹16 to Meridian, ₹4 to NCI); NCI opened year 2 at ₹68.5cr. Mid-year, Meridian buys a further 5% slice for ₹35cr when that slice's consolidated carrying is ₹22cr. Owner share was 80%.

1. S's consolidated profit for the year after acquisition adjustments.
2. Profit attribution between owners and NCI (at 80/20, the family trade lands after year-end for this question — state the convention).
3. NCI closing balance schedule.
4. The 5% family trade: journal in T-account English.
5. Which line of the consolidated P&L is untouched by the family trade?

**Why this matters:** this is the moving-year file every group reporting team stamps quarterly; wield it without thinking.

**🔑 Lab answers:**
1. S consolidated profit = 50 − 10 + 2.5 = **₹42.5cr** (same engine as CS12's grid). 2. Owners: 80% × 42.5 = **₹34cr**; NCI: **₹8.5cr** — convention: the 5% family trade closes after year-end, attribution stands at the year-average family structure. 3. NCI walk: 68.5 + 8.5 − 4 = **₹73.0cr closing** (pre-family-trade; the trade then re-slices the pie as step 4 records). 4. The trade moves ₹22cr of NCI (carrying) against ₹35cr consideration: **NCI −₹22cr, cash −₹35cr, owner's equity −₹13cr (the premium paid above carrying)** — an equity-family journal, no goodwill, no P&L. 5. **The profit BEFORE attribution** (total consolidated profit) — family trades change only the split columns; the creature earned what it earned.

## 💪 Exercises

1. Why can NCI legally go NEGATIVE in consolidated equity? One dense sentence.
2. A CEO wants the ₹13cr premium on the 5% buyout "shown as a goodwill increase — we paid extra because the child got better." Refuse in two lines.
3. NCI opened ₹40cr, NCI loss share ₹6cr, dividends to NCI ₹1cr — closing NCI and the disclosure note.
4. Sell 5% of your 95%-held child for ₹40cr when its carrying slice is ₹30cr — journal and the rule.

### ✅ Selected answers

1. Because attribution follows entitlements, not floors: if the creature loses, the minority's share of those losses is real and the consolidation shows its debit balance in equity (with disclosure) — subsidizing the appearance would hide part of the creature from the owners who must actually absorb it.
2. Goodwill was born ONCE — at acquisition, as the residual over net identifiable assets with NCI measured; buying more of a controlled family member moves NO control, so no fresh goodwill may be recognized — the ₹13cr is an equity-debit premium, disclosed inside the SOCIE's family column.
3. NCI = 40 − 6 − 1 = **₹33cr** closing; nothing special to disclose beyond the walk — NEGATIVE outcome variant: if the loss were ₹45cr, NCI would stand at −₹6cr debit-balance with a note explaining the minority's deep share of group losses, no artificial floor.
4. Cash +₹40cr; NCI +₹30cr; owner's equity +₹10cr — the premium credited to equity (mirror of §5.3), P&L silent, creature equity rises by the cash exactly, control re-verified intact afterward.

## ❓ Quiz

**Q1.** The attribution canon (S's consolidated profit ₹42.5cr at 80/20):
(a) owners ₹42.5cr, NCI zero
(b) owners ₹34cr and NCI ₹8.5cr — comprehensive income splits by entitlement every period, NCI sharing profits AND losses (its balance may even run debit/negative, disclosed without an artificial floor), and the equity walk NCI = open + share − dividends stays signed and accurate
(c) owners ₹8.5cr, NCI ₹34cr
(d) all to owners until NCI exits

**Q2.** Buying another 10% of a controlled child for ₹55cr when that slice carries at ₹50cr:
(a) new goodwill ₹5cr recognized
(b) an EQUITY family transaction — NCI falls ₹50cr, parent equity absorbs the ₹5cr premium directly; no goodwill (computed once, at acquisition), no P&L (family trades never tour the income statement): control is binary, and after the gate, percentage-trading moves ownership, not economics
(c) P&L loss ₹5cr
(d) revalue all child assets

**Q3.** Selling 10% while keeping control for ₹70cr over a ₹60cr carrying slice:
(a) gain ₹10cr to P&L
(b) NCI rises ₹60cr and owner's equity credits the ₹10cr premium — the mirror family entry; total consolidated equity swells exactly by the cash received, split between the two owner columns, control re-tested after each such slice but the creature intact
(c) goodwill reduces ₹10cr
(d) nothing until dividends

### ✅ Answers

1. **(b)** — attribution follows entitlement: 34/8.5, with signed NCI walks and negative-balance honesty.
2. **(b)** — family trades ride through equity only: premium to reserves, never goodwill, never P&L.
3. **(b)** — the mirror: NCI +60, equity +10 premium, P&L untouched.

## ✅ Mastery checklist

- [ ] I can split group profit owners-vs-NCI on adjusted profits
- [ ] I can keep the signed NCI walk and allow negative NCI with disclosure
- [ ] I can journal buy-more and sell-less family trades into equity
- [ ] I can explain why goodwill is born once and never grows later
- [ ] I can read the consolidated SOCIE's family column for governance stories

---

**Next:** **CS6 · The Elimination Workshop** — where the group stops lying to itself: intercompany receivables that die on sight, unrealized profit in inventory (the ₹20L on ₹1cr, downstream vs upstream with NCI's ₹2cr share), the DP2 lathe finally eliminated (₹6L gain + ₹1.2L/yr depreciation clawback), and dividends that vanish between skins.
