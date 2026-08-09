# T2 · Charts & Visual Analytics: The 10 Views You'll Use Every Week

> *90% of real Tableau work is bars, lines, maps, dual-axis combos and one glorious scatter — built fast and formatted clean. This module is chart muscle memory on ShopKart.*

## 🎯 Objectives
Master bar/line/area/treemap/scatter/map/dual-axis · hierarchies & drill-down · groups, sets, Top-N filters · the Analytics pane (trend lines, forecasts, reference lines, totals).

---

## 📘 2.1 The workhorse: sorted, labeled bars

Revenue by Category, sorted desc (toolbar sort button or pill → Sort → By field). Polish: right-click axis → format ₹; drag `SUM(Revenue)` to **Label**; `Category` to Color. **Percent-of-total bars**: right-click pill → Quick Table Calculation → Percent of Total (full table-calc theory in T3 — steal it now, master it next).

## 📘 2.2 Lines, drill-down date hierarchies

`OrderDate` (green continuous) + `SUM(Revenue)`. The **+ / − buttons** on the date pill expand Year→Quarter→Month→Day live — Tableau's built-in drill. Toggle several members in the legend via Highlight. Swap the green pill to `Revenue`, add `Region` to Color → small-multiple vibes with one pill.

## 📘 2.3 Dual-axis combo — the BI classic

1. Rows: `SUM(Revenue)`, then `CNTD(OrderID)` (order volume).
2. Right-click the second pill → **Dual Axis**. Two charts overlay.
3. Right-click the right axis → **Synchronize Axis** ONLY when units match (₹ vs orders = do NOT sync — instead set independent ranges honestly).
4. Change the second marks card to **Bar** → line-over-bars combo. Control layer order by dragging pills in Rows.

## 📘 2.4 Maps of India

1. Check **geographic roles**: `City` → Geographic Role → City; `State` → State/Province; `Country` — create a calc `// Country` → `'India'` if missing, set its role.
2. Double-click `State` → Tableau draws a symbol map. Drag `SUM(Revenue)` to Size, `Region` to Color.
3. Switch Marks to **Map (filled)** for a choropleth by state. Edit locations via Map → Edit Locations if any city geocodes wrong (rename to match Tableau's India geography).

> ⚠️ Tableau Public online render of maps needs internet (tiles); the shape data still works offline once cached.

## 📘 2.5 Scatter & the Analytics pane

1. Columns `SUM(Quantity)`, Rows `SUM(Revenue)`, Detail `ProductName` → one dot per product. Size by `Discount`, color by `Category`.
2. **Analytics pane** (left, next to Data pane): drag **Trend Line** onto the view → linear fit with R²/p-value hover. Drag **Average Line** or **Reference Line**; right-click any to Edit → set value, label, "fill above/below" bands.
3. Drag **Forecast** onto a monthly revenue line → Tableau's built-in exponential smoothing forecast. Right-click → Forecast Options (length, seasonality).

**Distribution bands** (Analytics pane → Distribution Band) on a scatter instantly reveal outliers above 1.5σ. Cheap, impressive, interview-gold.

## 📘 2.6 Hierarchies, groups, sets, Top-N

- **Hierarchy**: drag `SubCategory` onto `Category` in the Data pane → creates drill path Category→SubCategory→ProductName (add ProductName by drag). Then bars drill with +/− on pills.
- **Group**: Ctrl-click members in the Data pane (e.g., tiny sub-categories) → Group → "Other" buckets without touching source data.
- **Set**: right-click `ProductName` → Create → Set → **Top** tab → Top 10 by SUM(Revenue) → drag set to Color/Filter. Sets are dynamic (re-evaluate as data changes) — groups are static.
- **Top-N filter**: drag `ProductName` to Filters → Top tab → By field → 10 / SUM(Revenue). Same result as a top set; parameters make N user-choice in T4.

---

## 🧪 LAB T2 — The ShopKart gallery (60 min)

1. **Ranked bars**: Revenue by SubCategory with labels, sorted; add % of total table calc as a second label.
2. **Dual-axis**: Revenue (bar) vs order count (line) by month. Format honestly (no fake sync).
3. **India map**: filled map of Revenue by State; fix any ungeocoded city; color scale = Company palette (orange→blue divert at midpoint).
4. **Scatter**: Quantity vs Revenue per product, trend line, colored by Category; screenshot and read the trend: are high-volume products the high-revenue ones?
5. **Forecast**: monthly Revenue line + 6-month forecast; write the forecast's confidence band width in your notes.
6. **Set**: Top 8 products by Revenue; color the ranked bar view by In/Out of set → "Pareto-ish" story in one sentence.

## 💪 Exercises
1. Revenue by Region **stacked by Category** — then stop and convert it to 100% stacked (Percent of Total, Compute Using Category).
2. Make a **heat table**: Region × Month, color by Revenue intensity.
3. Average line of Revenue across the trend; reference band = ±1 std dev. Screenshot.
4. Group the 3 lowest-revenue sub-categories as "Long tail"; compare group vs set in words.
5. On the map, why might `City` geocoding fail and what are the 2 fixes?

### ✅ Selected answers
- Ex 2: Region to Rows, MONTH(OrderDate) blue to Columns, SUM(Revenue) to Color (mark type Square). Sort months ascending.
- Ex 5: Names must match Tableau's built-in geography (spelling, duplicates across states). Fixes: Map → Edit Locations to assign manually, or clean the name in source/Power Query.

## ❓ Quiz
1. When should you NOT synchronize a dual axis?
2. Set vs Group — which one updates itself as data changes?
3. What does the + on a date pill do, instantly?
4. Name 3 things hiding in the Analytics pane.

### ✅ Answers
1. When the two axes measure different units (₹ vs orders) — syncing would lie. Sync only same-unit overlays (Actual vs Target).
2. Sets are dynamic queries (e.g., Top N by current Revenue); Groups are static relabeling until re-edited.
3. Expands the date hierarchy one level (Year→Quarter→Month→Day) — built-in drill-down.
4. Trend Line, Forecast, Reference Line/Band, Distribution Band, Box Plot, Totals, Average/Median lines.

## ✅ Mastery checklist
- [ ] Built all 6 view types from LAB T2 without help
- [ ] Used sets + Top-N filters; can explain dynamic vs static
- [ ] Added trend line + forecast and can read the band
- [ ] Cleaned 1 geocoding problem on the India map

**Next: T3 — calculated fields + table calculations, where real analysts are made. 🧮**
