# 🎯 DP3 · Five Machines Inside One — The Component Approach

> Here is a sentence that will win you audits: a crane is not an asset — it is five assets in a trench coat. Ind AS 16 para 43 orders you to allocate the amount initially recognized to an item's SIGNIFICANT PARTS and depreciate each separately, because parts with different useful lives die at different speeds. Average them and you get the composite-life lie: the fast parts die early with cost still hanging on the balance sheet, the slow parts drag phantom charges for years after their cost is gone. This course's throne-room example: a ₹90L overhead travelling crane that is really five machines with five clocks. Honourable mention: the ₹9,000 jib crane from the Stockroom Trial — proof the component knife has a materiality sheath.

---

## 🎯 Objectives

- Apply para 43: significant parts with different useful lives = separate components, separate clocks
- Build the ₹90L crane's five-component canon and its ₹7.3L depreciation script
- Quantify the composite-life lie (₹6.0L vs ₹7.3L — the ₹1.3L annual understatement)
- Treat major inspections and overhauls as components (₹4L every 4 years = ₹1L/yr)
- Know when NOT to split: the materiality sheath and the ₹9,000 jib crane

## 📘 Concepts

### 3.1 Para 43 — the splitting order

Each part of an item of PPE with a cost that is **significant** in relation to the total cost shall be depreciated SEPARATELY. Two triggers, both judgmental: significance of the part's cost, and difference of its useful life from the rest. The remainder (insignificant scraps) is grouped and depreciated on a proxy basis. Note what the standard permits too: it does NOT force atomization — you may depreciate separately parts whose lives are SIMILAR, grouped sensibly. Componentization is a scalpel for big, differently-lived parts — not a blender for everything.

### 3.2 The ₹90L crane canon (all numbers python-verified)

Your new overhead travelling crane at the Gurugram fabrication bay — one purchase order, ₹90L, but five economic animals inside:

| Component | Cost ₹L | Life | Dep ₹L/yr |
|---|---|---|---|
| Bridge and girder structure | 36.0 | 30 yr | 1.200 |
| Hoist unit | 22.5 | 9 yr | 2.500 |
| Drives and motors | 13.5 | 9 yr | 1.500 |
| Runway rails and supports | 9.0 | 30 yr | 0.300 |
| Controls and electronics | 9.0 | 5 yr | 1.800 |
| **Total** | **90.0** | five clocks | **7.300** |

Component invoice: the structure and rails glide for 30 years while the controls are dead by year five and the hoist retires at nine. **Annual depreciation ₹7.3L**, set honestly, part by part.

The composite-life lie: books that book the crane as ONE asset over the finance team's favourite "average" 15 years charge 90 / 15 = **₹6.0L/yr** — an annual understatement of **₹1.3L**, profit dressed up by the same amount, and a_checkmate arriving at year nine when the ₹22.5L hoist is scrapped with a fat book value still attached: a "surprise" disposal loss that was really nine years of under-depreciation coming home. Components turn the surprise into a schedule.

### 3.3 The overhaul component — the inspection that became an asset

The same crane faces a statutory inspection and overhaul every 4 years, ₹4L a pop. Ind AS 16 para 14: the cost of a major inspection is recognized in the CARRYING AMOUNT of the item as a REPLACEMENT — if recognition criteria are met. Translation: on acquisition day, slice out the embedded "first inspection" component (₹4L), depreciate it to the first overhaul date (**₹1L/yr**); when the new ₹4L inspection lands, capitalize IT as the renewed component and derecognize whatever sliver of the old one remains.

Day-one estimation trick the standard blesses: if the original embedded inspection cost was never separately priced, use the CURRENT inspection cost as the indication of what it cost when the asset was acquired — no time machine required, just a defensible proxy.

### 3.4 Why analysts should love components (and fraudsters hate them)

- **Honest matching**: consumption pattern per part, not corporate poetry.
- **Clean replacements (DP7 preview)**: when you swap a component, you know exactly which slice died — derecognize ITS carrying amount, capitalize the newcomer. Composite books make every replacement a guessing game.
- **The manipulation surface**: choosing one fat composite life is the fastest legal-ish way to over-state profit this year (₹1.3L per crane per year, at fleet scale = crores). The ratio radar in DP11 hunts exactly this.

### 3.5 The ₹9,000 jib crane — the sheath on the knife

The Stockroom Trial teased it: our warehouse walls carry a ₹9,000 jib crane. Serious audit files do NOT split it into springs, cables and trolleys — significance fails at birth; the whole unit sits below materiality worth splitting (and often below the capitalization gate itself, expensed on arrival). The doctrine is "significant parts of significant assets," significant twice. Judgment, documented in policy, applied consistently — that is the para 43 peace treaty between theory and the real world.

## 🧪 LAB — Split the DG Set (10 min)

A diesel generator set costs ₹40L. Engineering says: engine block ₹20L / 15 years, alternator ₹10L / 10 years, control panel ₹4L / 5 years, base frame and canopy ₹6L / 20 years. A major top overhaul every 5 years costs ₹2L (embedded at acquisition).

1. Compute each component's annual depreciation (straight-line, residual nil).
2. Total annual charge under componentization.
3. The lazy composite life the vendor's brochure suggests is 12 years. Charge per year?
4. By how much does componentization EXCEED composite in the early years — and where does that difference sit in the reconciliation an auditor will make you sign?
5. The same plant buys a ₹9,000 wall jib for the tool room. Split or not?

**Why this matters:** the component schedule IS the fixed-asset register's first page; auditors trace capitalized cost → components → lives → charge, in that order.

**🔑 Lab answers:**
1. Block 20/15 = **₹1.33L** (1.333); alternator 10/10 = **₹1.00L**; panel 4/5 = **₹0.80L**; frame 6/20 = **₹0.30L**; overhaul slice 2/5 = **₹0.40L**. 2. Total **₹3.83L** (1.33+1.00+0.80+0.30+0.40 = 3.83). 3. 40/12 = **₹3.33L**. 4. Componentization exceeds composite by roughly **₹0.50L/yr** early — sitting inside the depreciation-note reconciliation and visible as an early-years drag that reverses into post-year-10 relief when the composite book keeps charging for dead parts. 5. **One unit, possibly expensed outright** — below the splitting significance gate (and likely the capitalization threshold); the ₹9,000 jib lesson: materiality sheaths the component knife.

## 💪 Exercises

1. The crane's controls (₹9L, 5-yr) are scrapped at year 5 and replaced for ₹10L. Walk the derecognition-and-capitalization entry flow.
2. Finance wants the crane "simplified" to one 20-year line "since overall it lasts 20." Compute the year-one understatement versus the component script.
3. Why does the standard let you use the CURRENT cost of a major inspection as the proxy for the embedded component at acquisition? One paragraph: what assumption is baked in?
4. An airline claims its aircraft need no components because "the whole plane has a 25-year life." Refute in two sentences (DP10 will do the full autopsy).

### ✅ Selected answers

1. Old controls' carrying amount is nil (fully depreciated on schedule — components made the ending clean); derecognize zero, capitalize ₹10L, start the new 5-year clock at ₹2L/yr. No disposal loss drama — that is the entire point.
2. One line at 20 years: 90/20 = ₹4.5L. Component script: ₹7.3L. Year-one understatement **₹2.8L** — profit overstated by the same amount, compounding at fleet scale.
3. It assumes the inspection's technology and scope are stable enough that today's ₹4L reasonably indicates what the embedded inspection was "worth" when the asset was bought — a defensible measurement expedient, not perfect history; document the basis and apply consistently.
4. Para 43 mandates separating SIGNIFICANT parts with different lives: engines vs airframe vs interiors vs landing gear live and die on different clocks (DP10: the ₹900cr airframe at ₹52.8cr/yr). One composite life buries years of under-depreciation into mid-life disposal shocks.

## ❓ Quiz

**Q1.** Para 43 requires separate depreciation for:
(a) every bolt and cable individually
(b) each part of an item whose cost is SIGNIFICANT relative to total and whose useful life differs from the rest — the ₹90L crane splits into five clocks summing to ₹7.3L/yr, while the jib-crane class stays whole because significance fails
(c) only parts above ₹1 crore
(d) parts the vendor prices separately on the invoice only

**Q2.** Composite one-line life of 15 years on the ₹90L crane understates year-one depreciation by:
(a) ₹1.3L through faster residual recognition
(b) 90/15 = ₹6.0L vs component script ₹7.3L → understatement ₹1.3L, profit dressed up by the same amount, with the bill arriving as a disposal loss when the ₹22.5L hoist dies at year nine with book value still attached
(c) nothing — methods do not matter
(d) ₹4.5L

**Q3.** The ₹4L statutory overhaul every 4 years is:
(a) expensed when incurred as repairs
(b) capitalized as a REPLACEMENT component — the embedded first inspection is sliced out at acquisition (₹4L slice, ₹1L/yr), each new overhaul renews the component at ₹4L and the old sliver is derecognized; the current-cost proxy estimates the embedded slice when history is silent
(c) added to the structure's 30-year clock
(d) parked as inventory until used

### ✅ Answers

1. **(b)** — significance plus life-difference trigger the split; materiality decides when to stop.
2. **(b)** — ₹1.3L/yr of phantom profit, ending in a staged disposal "surprise" that was nine years of short charging.
3. **(b)** — inspections ride inside the asset as replaceable components with their own clock.

## ✅ Mastery checklist

- [ ] I can recite the two para-43 triggers (significance + different life)
- [ ] I can rebuild the ₹90L crane's five-line schedule and the ₹7.3L total from memory
- [ ] I can show the composite-life lie: ₹6.0L, ₹1.3L/yr understatement, year-nine reckoning
- [ ] I can treat a major overhaul as a replacement component with the current-cost proxy
- [ ] I can explain when NOT to split — the ₹9,000 jib-crane materiality sheath

---

**Next:** **DP4 · The Three Clock Faces** — straight-line, written-down-value (the derived 25.01% rate), and units-of-production; residual values and the annual review; the Companies Act Schedule II parallel clock; and the change-in-estimate rule that bans retroactive surgery.
