# T5 · Dashboards, Stories & Sharing: Package It Like a Pro

> *A great chart answers a question. A great dashboard answers five before the user asks. This module turns your T1–T4 worksheets into a polished, interactive ShopKart command center — and puts it on the internet.*

## 🎯 Objectives
Build dashboards with containers & device layouts · filter/highlight/URL/set actions · stories for narrative · publish to Tableau Public · extracts (.hyper), performance & refresh basics · dashboard design discipline.

---

## 📘 5.1 Dashboard anatomy

Left pane: available Sheets (drag to canvas) + Objects: **Horizontal/Vertical containers**, Text, Image, Web Page, Blank (spacer), Button, Extension.

- **Tiled** (default): every object snaps to a grid — always start tiled; Floating for overlays (logos, filter pop-ups, decorative cards).
- **Containers rule everything**: a horizontal container parent holds children side-by-side; get the resize handles controlled via "Distribute Contents Evenly" (container's drop-down). Pro move: fill each "row" with a horizontal container inside one big vertical — instant magazine layout.
- **Size**: set Desktop Browser (1000×800) for fixed, or Generic for auto-flow. Right-click side tab → show **Device Preview** → add Phone layouts (Tableau drafts one; you tidy it).

## 📘 5.2 Actions — the difference between a report and an app

Dashboard → Actions… → Add Action:

| Action | Trigger → effect |
|---|---|
| **Filter** | Click a mark in sheet A → filter sheets B,C (choose source/target fields) |
| **Highlight** | Hover/click → emphasize related marks everywhere |
| **Go to URL** | Click city → open Google Maps / Shareholder letter URL |
| **Go to Sheet** | Button → jump to detailed tab ("drill to detail") |
| **Set Action** | Click marks → add/remove them from a set (spotlight anything) |
| **Parameter Action** | Click mark → write into a parameter (dynamic compare mode) |

Also free: sheet's drop-down on the dashboard → **Use as Filter** (instant, no dialog). Think in verbs: *click* = filter, *hover* = highlight, *menu* = details.

## 📘 5.3 The ShopKart design system

1. **Title bar** (Text object): "ShopKart India — Retail Command Center", 22pt bold; subtitle with month coverage + `#` of rows.
2. **KPI row** (4 BANs): Revenue, Orders, AOV, Units — each a minimal sheet (text mark, transparent bg, hidden header, fit = Entire View, zero padding).
3. **Middle row**: trend line (left, 60%) + Region bar (right, 40%).
4. **Bottom row**: India map + top-products bar (filtered by nothing — safe landing view).
5. **Right rail**: quick filters Region/Category/Year as compact dropdowns + apply button. Set all quick filters to "Only Relevant Values".
6. Kill ALL extra padding (Layout tab → outer padding 4), consistent card backgrounds, one accent hue; dark or light — pick one.

> 🧭 Layout first on paper, containers second, sheets last. Rebuilding a dashboard is normal; rebuilding it because of missing containers is pain.

## 📘 5.4 Tooltips & polish that feel expensive

Tooltip editor supports rich text + any field + auto-refresh:
```
<b><Segment></b> · <City>
Revenue: <SUM(Revenue)>  (<AGG(% of Region)> of region)
Orders: <CNTD(OrderID)> · AOV: <AGG(AOV)>
```
Insert sheet-in-tooltip (Viz in Tooltip) for a sparkline per city! Then: Worksheet → Tooltip → an obsessively honest one-liner for each view ("bars show net revenue after discounts").

## 📘 5.5 Stories & publishing

- **Story** = sequence of captions + dashboards ("2024 recap → category mix shift → regional winners → 2025 outlook"). Ideal for exec reviews; each point preserves live interactivity.
- **Publish**: File → Save to Tableau Public As… → sign in (public = anyone, never upload real company data!). Share the link on LinkedIn/resume — this IS your portfolio.
- Extracts: connecting CSVs auto-extracts (.hyper) on publish. Live vs extract: at work, extracts = snapshot + scheduled refresh on Server/Cloud (daily/hourly), live = zero-latency on DBs. RLS: user filters (`USERNAME()` / `ISMEMBEROF`) restrict rows per viewer — the same idea as Power BI RLS in M7.

## 📘 5.6 Performance hygiene (learn early, hurt less)

Fewer marks (filter before rendering!), extract + aggregate, context filters sparingly, prefer `=` over CONTAINS on big dims, table calcs last, minify quick filters on dashboard (show only essentials), hide unused fields. Tableau's **Workbook Optimizer** (Server menu → Workbook Optimizer) lints 20+ rules automatically.

---

## 🧪 LAB T5 — Ship the command center (90 min)

1. Build the §5.3 dashboard exactly: title, KPI row (4 BANs), middle row, bottom row, filter rail; containers only; fixed 1000×800.
2. Actions: Region bar = Use as Filter; map click filters trend + products; hover = highlight across all; "Top product" menu action → URL to its detail sheet.
3. Viz-in-tooltip: sparkline of monthly revenue inside the city map tooltip.
4. Story: 4-point narrative of ShopKart's 2 years; point 3 zooms the worst region.
5. Publish to Tableau Public (name: "ShopKart Retail Command Center — T5"), then view URL on your phone (device preview honesty check).
6. Run Workbook Optimizer mentally: write 3 speed risks you created (e.g., too many marks on map) and a fix for each.

## 💪 Exercises
1. Set action spotlight: click 3 products → "Focus set" updates a color + a KPI of share.
2. Parameter action: click a category mark → parameter stores it → title reads "Deep-dive: <param>".
3. Device: edit the phone layout to stack KPI → trend → map (Containers, remove floating chaos).
4. Peek behind: File → Export → Packaged Workbook (.twb vs .twbx — what's actually inside?).
5. Journal: 3 differences vs Power BI (pages↔sheets, containers↔grids, actions↔interactions) with one win per side.

### ✅ Selected answers
- Ex 4: `.twbx` = zip bundle (twb XML + extracts + images); `.twb` = XML only (needs its data source beside it). Right-click → open in text editor to see the XML.
- Ex 5 (samples): Tableau wins: pixel-perfect control, set/param actions; Power BI wins: cross-filter by default everywhere, enterprise governance/behind-Microsoft-SSO.

## ❓ Quiz
1. Tiled vs floating — default and when to float?
2. "Use as Filter" does what without any Action dialog?
3. `.twb` vs `.twbx`?
4. Name the 6 action types.

### ✅ Answers
1. Tiled is default/snap grid (structured, reflow-safe); float only for overlays: logos, pop-up filters, design cards, Viz-in-tooltip hacks—never the base layout.
2. Clicking a mark in that sheet filters all other sheets sharing fields — instant interactivity.
3. .twb: XML workbook referencing external data/ extracts. .twbx: packaged zip with everything embedded (share/publish format).
4. Filter, Highlight, Go to URL, Go to Sheet, Change Set Values, Change Parameter.

## ✅ Mastery checklist
- [ ] Command-center dashboard with containers & actions published
- [ ] Viz-in-tooltip shipped
- [ ] 4-point story built
- [ ] Can defend live-vs-extract & name 3 perf levers

**Next: T6 — Tableau for Finance: P&L, variance packs, waterfalls, stocks/portfolios rules. 💹**
