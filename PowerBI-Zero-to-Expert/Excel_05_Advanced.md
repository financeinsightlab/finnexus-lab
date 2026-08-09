# Excel 05 — Advanced: INDEX/MATCH, Dynamic Arrays, Power Query & Macros

> *This module is the bridge from "Excel user" to "person others call". It also connects directly to Power BI — same Power Query engine, refresh-and-done mindset.*

## 🎯 Objectives
Lookup freedom with INDEX+MATCH · modern dynamic-array formulas (365) · Get & Transform (Power Query) inside Excel · record your first macro · professional workbook hygiene & protection.

---

## 📘 5.1 Defined Names — say goodbye to $F$2:$F$99 nonsense

Formulas → **Name Manager** → New: `TaxRate` = Sheet1!$E$1, `PriceList` = a Table column. Then formulas read `=Qty*Price*TaxRate`. Names can hold constants, ranges, even formulas (dynamic named range: `=OFFSET` — with caution). Scopes: Workbook vs one sheet. Keyboard: Ctrl+F3.

## 📘 5.2 INDEX + MATCH — the lookup the pros trust

```excel
=INDEX(return_column, MATCH(lookup_value, lookup_column, 0))
=INDEX(tblProducts[ProductName], MATCH("P7", tblProducts[ProductID], 0))
-- Two-way matrix lookup:
=INDEX(B2:Z50, MATCH(city, A2:A50, 0), MATCH(month, B1:Z1, 0))
```
MATCH types: **0** exact · **1** largest ≤ value (ascending data — price tiers) · **-1** smallest ≥ (descending). Why pros love it: looks **any direction**, no column-count fragility, cheaper on big sheets than VLOOKUP. (If you have 365: XLOOKUP does all of this alone — know both, interviews ask both.)

## 📘 5.3 SUMPRODUCT & friends (pre-365 power tricks)

```excel
=SUMPRODUCT((Region="West")*(Category="Electronics")*Revenue)   -- SUMIFS with math/logic inside
=SUMPRODUCT((MONTH(OrderDate)=10)*Qty)                           -- conditions SUMIFS can't express
```
`COUNTIFS` covers most counting; SUMPRODUCT covers *formula-logic* conditions.

## 📘 5.4 Dynamic Arrays (Microsoft 365) — a new Excel

One formula → results **spill** into many cells (blue outline; `#` refers to the spill; `#SPILL!` = blocked):

```excel
=UNIQUE(tblSales[Region])                                  -- list of regions, auto-updates
=SORT(UNIQUE(...)) 
=FILTER(tblSales, tblSales[Revenue]>100000, "No big orders")   -- rows matching, live
=SORTBY(tblProducts[ProductName], tblProducts[UnitPrice], -1)
=SEQUENCE(12,1,DATE(2025,1,1),31)                          -- dynamic month starts
=LET(r,[@[Revenue]], IF(r>50000,"⭐","-"))                 -- name inline values: readable formulas
=LAMBDA(x, x*1.18)(100)                                    -- reusable logic via Name Manager: =AddGST(100)
```
Also: `XLOOKUP`, `XMATCH`, `SEARCHB`-free splits (`TEXTSPLIT`, `TEXTBEFORE/AFTER`, `TOCOL`, `TAKE`, `VSTACK`). *Compatibility:* older Excel shows `@` (implicit intersection) and won't spill — check your audience's version.

## 📘 5.5 Power Query in Excel — your Power BI head start

**Data → Get & Transform Data** = the *same engine* you learned in Power BI Module 02: connect CSV/Folder/Web/SQL, Applied Steps, merges, unpivots, M. Workflow: Get Data → From Text/CSV → Transform Data (same editor!) → **Close & Load To** → Table/PivotTable Report/**Connection Only**. **Refresh All (Ctrl+Alt+F5)** re-runs everything. Rule: if a cleaning task will repeat monthly, build it in Power Query, not by hand.

## 📘 5.6 Macros & VBA — first steps

- View → **Macros → Record Macro** (tick "Use Relative References" first!) → do your formatting clicks → Stop. Run it on new data = same steps instantly.
- View the code (Alt+F11): it's writing VBA for you (`Sub FormatReport() ... End Sub`) — nudge values, save as **.xlsm** (macros can't live in .xlsx), assign to a shape/button (Insert → Shape → right-click → Assign Macro).
- Trust Center: macros run only from files you enable — never enable random macros from the internet.
- When to graduate from macros to Power Query: data-shaping → PQ; workbook *actions* (format, export, email) → VBA.

## 📘 5.7 Professional hygiene & protection

1. One **Inputs/Config** sheet for assumptions (named cells); formulas never hardcode numbers.
2. Tables + names everywhere; document logic with sheet `README`; consistent colors (locked cells grey, input cells yellow).
3. **Review → Protect Sheet** (allow selecting formats only; optionally unlock input cells first). Workbook protection for structure.
4. Version your files in OneDrive/SharePoint (auto-history) — the Excel counterpart of Power BI's .pbip story.

---

## 🧪 LAB 5 — The advanced trifecta (75 min)

**A) Dynamic-array report (365):** new sheet `LiveReport`:
1. `B2: =LET(reg, SORT(UNIQUE(tblSales[Region])), reg)` → spilling region list.
2. `C2: =SUMIFS(tblSales[Revenue], tblSales[Region], B2#)` → whole column answers from one formula (note the `B2#` spill reference!).
3. `E2: =TAKE(SORTBY(tblProducts, tblProducts[UnitPrice],-1), 5)` → live Top-5 premium products table.

**B) Power Query bridge:** Data → Get Data → queries for `Sales`, `Products`, `Customers` (Connection Only) → Merge Sales+Products (name `pq_Fact`) → **Close & Load To → PivotTable Report**. Refresh after editing a CSV → magic. Compare with Module 02 of the Power BI track: *same steps, same M code, different home.*

**C) First macro:** on any sheet: Record Macro `FormatHeader` (relative refs on) → make A1 bold, fill dark, font white, row autofit → Stop → Alt+F11 to admire/easy-edit the VBA → Save as `ShopKart_Lab5.xlsm` → draw a shape, Assign Macro, click. Automation unlocked.

## 💪 Exercises
1. Rewrite a VLOOKUP from Module 02's Lab as INDEX/MATCH; then break it deliberately (insert column in source) — explain what survived and why.
2. `=SUMPRODUCT((MONTH(tblSales[OrderDate])=10)*(YEAR(tblSales[OrderDate])=2025)*tblSales[Quantity])` — what does it give? Verify with a filtered pivot.
3. Build a price-tier lookup with MATCH type 1.
4. LET-ify any ugly formula from earlier: name intermediate values, shave 30% of length.
5. Record a macro that exports the active sheet to PDF (hint: use ExportAsFixedFormat — find it via recording).
6. Protect the Summary sheet allowing edits only on the yellow input cells.

### ✅ Selected answers
- Ex 2: total units sold in October 2025.
- Ex 1: INDEX/MATCH survives inserted columns (references are explicit columns, not a counted offset); VLOOKUP silently shifts.

## ❓ Quiz
1. MATCH's three match types and when type 1 is useful. 2. What does `#` after a cell reference mean in 365? 3. Two reasons to choose Power Query over manual cleaning in Excel. 4. What file type must macros live in?

### ✅ Answers
1. 0 = exact · 1 = largest value ≤ lookup (ascending ranges → tiers/bands) · -1 = smallest ≥ lookup (descending).
2. The entire spilled result of that cell's dynamic-array formula (e.g., `B2#`).
3. It's a recorded, refreshable recipe (no redo-by-hand next month) and far more powerful/auditable (applied steps, merges, M).
4. `.xlsm` (or personal.xlsb) — .xlsx strips macros.

## ✅ Mastery checklist
- [ ] INDEX/MATCH and XLOOKUP both fluent
- [ ] One solved problem each via dynamic arrays, Power Query, and a macro
- [ ] Workbook hygiene: names, no hardcodes, protected output
- [ ] I see the Excel ↔ Power BI bridge clearly (same Power Query!)

**Next stop: back to the Power BI track (`Module_02_Power_Query.md`) — or take PL-300/common Excel interview questions in `Resources_Certification_Career.md`. 🎓**
