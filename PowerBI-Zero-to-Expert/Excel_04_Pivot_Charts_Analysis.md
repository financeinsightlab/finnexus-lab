# Excel 04 — PivotTables, Charts & What-If Analysis

> *If Excel had one feature to rule interviews, it's the PivotTable — drag, drop, and a 5,000-row dataset confesses in seconds.*

## 🎯 Objectives
Build and format PivotTables confidently · Show-Values-As % tricks · slice & dice with slicers/timelines · pick and polish charts · answer "what if?" with Goal Seek and Data Tables.

---

## 📘 4.1 PivotTables — the 60-second concept

A PivotTable **summarizes flat data** by dimensions: drag **Region→Rows**, **Revenue→Values** = instant totals. Wells: **Rows, Columns, Values, Filters**. Insert → PivotTable (source = a Table like `tblSales`; New Worksheet recommended). **Rules of good sources:** one header row, no merged cells, no blank rows/columns, one row per record — your Tables already qualify.

⚠️ **Refresh:** Pivots cache data — after editing the source, **Alt+F5** or right-click → Refresh. (PivotTable Options → Data → "Refresh on open" helps forgetful humans.)

## 📘 4.2 Value Field Settings — where the magic hides

Click the dropdown on a value field → **Value Field Settings**:
- **Summarize by:** Sum / Count / Average / Max / Min.
- **Show Values As:** % of Grand Total, **% of Parent** (category share inside Region!), **% of Column/Row Total**, **Difference From** (e.g., vs previous month → instant MoM delta), **Running Total In**, Rank. *This one tab replaces pages of formulas.*

## 📘 4.3 Grouping, Slicers, Timelines

- **Date grouping:** right-click a date in the pivot → Group → Years/Quarters/Months (modern Excel auto-groups date fields — right-click → Ungroup to remove).
- **Number grouping:** band ages/incomes (0–10k, 10–20k…).
- **Slicers (Insert → Slicer):** clicky filter buttons for any field; **Timeline** = slicer for dates. **Report Connections** lets one slicer drive multiple pivots → dashboard feel.
- Design touches: Report Layout → Tabular (Excel-pro look), repeat item labels, grand totals on/off.

## 📘 4.4 Charts that tell the story

- **PivotCharts:** select pivot → Insert → PivotChart. Combo charts: two metrics (column Revenue + line Margin %) via Change Chart Type → Combo → Secondary Axis for the %.
- Chart chooser recap (same logic as Power BI track): comparison → bar/column · trend → line · share → stacked/bar (pie ≤5 slices) · KPI vs target → column + marker.
- **Sparklines** (Insert → Sparklines): tiny in-cell trend lines — perfect for a Summary sheet.
- Polish rules: direct labels > legends · kill gridlines/borders · one accent color · title = takeaway.

## 📘 4.5 What-If tools (Data → What-If Analysis)

| Tool | Question it answers |
|---|---|
| **Goal Seek** | "To hit ₹1,000,000 revenue, what must Quantity be?" — one input, one goal |
| **Data Table (1-var/2-var)** | Grid of outcomes as 1–2 inputs change (price × discount sensitivity) |
| **Scenario Manager** | Save named input sets (Best/Expected/Worst) and flip between them |

---

## 🧪 LAB 4 — ShopKart Excel Dashboard (60 min, on `ShopKart.xlsx` from Lab 2)

1. Insert → PivotTable from `tblSales` (with your Category & Region cols) → new sheet `Dashboard`.
2. Pivot A: Rows = **Category** → Values = **Revenue (Sum, ₹ format)** + Revenue again → second field → Show Values As **% of Grand Total**. Sort desc.
3. Pivot B: Rows = **OrderDate** (grouped Years + Months), Values = Revenue → add Revenue again → Show Values As **Difference From → OrderDate → (previous)** = MoM change. Format green/red.
4. Insert a **Slicer for Region** + a **Timeline for OrderDate**; wire both to both pivots (Report Connections).
5. Insert **PivotChart (Combo)**: Column = Revenue by Month, Line = Running Total (Show Values As → Running Total In).
6. New sheet `Spark`: 5 product rows, in-cell **sparkline** of monthly revenue (source via pivot or GETPIVOTDATA).
7. **Goal Seek:** on a scratch cell chain `TargetRev = Price*Qty*0.9` → set TargetRev to 1,000,000 by changing Qty. Record the answer.
8. Format the Dashboard: title, KPI cards (big-number cells referencing GETPIVOTDATA or cube of pivots), hide gridlines (View → uncheck Gridlines).

## 💪 Exercises
1. Pivot: Category rows, **Margin buckets** columns (create a helper col first), values = % of Parent Row. Which category is discount-bleeding?
2. Rank each region's products: value field → Show Values As → Rank Largest to Smallest (base field ProductName).
3. Two-input **Data Table**: Revenue across Price (rows: 700,800,900…) × DiscountRate (cols: 0%,5%,10%,15%).
4. Turn the Category pivot into a *normalized* table again? Trick question — unpivoting needs Power Query (remember Module 02 & Excel_05!). Write the why in your journal.
5. Customize a slicer: 2 columns, style match, hide header.

## ❓ Quiz
1. Why must you refresh a pivot (and shortcut)? 2. Difference From + (previous) gives you…? 3. When do you need a Secondary Axis on a combo chart? 4. Goal Seek changes ___ to make ___ equal a goal.

### ✅ Answers
1. Pivots cache; source edits don't flow in until Refresh (Alt+F5 / right-click → Refresh).
2. The period-over-period delta (MoM/QoQ/YoY growth) with zero formulas.
3. When two series have very different scales (₹ vs %), else the small-scale line looks flat on zero.
4. One **input cell** … one **formula cell** to the desired value.

## ✅ Mastery checklist
- [ ] % of Parent and Difference From used without fear
- [ ] One slicer drives two pivots
- [ ] I can defend my chart choice for any question
- [ ] Dashboard screenshot saved to portfolio

**Next: `Excel_05_Advanced.md` — INDEX/MATCH, dynamic arrays, Power Query in Excel, macros.**
