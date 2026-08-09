# Excel 02 — Formulas & Core Functions

> *Functions are Excel's vocabulary. Master ~25 of them and you out-analyze people with "10 years of experience".*

## 🎯 Objectives
Write correct formulas fast · logic with IF family · conditional aggregation (SUMIFS) · lookups (XLOOKUP/VLOOKUP) · bulletproof error handling.

---

## 📘 2.1 Formula anatomy

Every formula starts with **=**. `=B2*C2` same-cell math · `=SUM(D2:D10)` function over a range. **Precedence** (like school math): `()` → `^` → `*` `/` → `+` `-`. Comparisons `> = < >= <= <>` return TRUE/FALSE. Edit with **F2** (or double-click cell).

## 📘 2.2 The essential 12 (memorize cold)

`SUM` `AVERAGE` `MIN` `MAX` `COUNT` (numbers only) `COUNTA` (non-empty) `COUNTBLANK` `MEDIAN` `LARGE(range,n)` `SMALL(range,n)` `ROUND(x,2)` `TODAY()`
Tip: `LARGE(range,2)` = 2nd biggest — instant Top-N analysis without sorting.

## 📘 2.3 Logic family

```excel
=IF(B2>=50000,"High","Low")
=IFS(B2>=50000,"High", B2>=10000,"Mid", TRUE,"Low")     -- cleaner than nested IFs
=IF(AND(B2>1000,C2="West"),"VIP","")                    -- AND(...)  OR(...)
```
Nested IFs work (`=IF(x,"a",IF(y,"b","c"))`) but `IFS` keeps you sane.

## 📘 2.4 Conditional aggregation — business favorite

```excel
=SUMIF(Region,"West",Sales)                    -- one condition
=SUMIFS(SalesRange, Region,"West", Category,"Electronics")   -- many ANDs
=COUNTIFS(Region,"North", Qty,">=3")
=AVERAGEIFS(...)
```
**Syntax law:** SUMIF = (criteria_range, criteria, sum_range); SUMIFS = (**sum_range first**, then pairs). Wildcards: `"Lap*"` starts with, `*mouse*` contains, `"?"` single char.

## 📘 2.5 Lookups — fetching data across tables

**XLOOKUP (Excel 365/2021 — the modern king):**
```excel
=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])
=XLOOKUP([@ProductID], tblProducts[ProductID], tblProducts[Category], "Unknown")
=XLOOKUP(code, Products[ID], Products[Price], , -1)   -- next-smaller match (price tiers)
```
Exact match by **default** (VLOOKUP's biggest trap gone), looks **left or right**, survives inserted columns.

**VLOOKUP (legacy, still everywhere):**
```excel
=VLOOKUP(value, table, col_index_number, FALSE)   -- FALSE = exact match. ALWAYS use FALSE unless ranges/tiers.
=RANK-equivalents only with TRUE on sorted data.
```
Know both; default to XLOOKUP when available.

## 📘 2.6 Error-proofing

| Error | Means | Fix |
|---|---|---|
| `#DIV/0!` | /0 or blank | `=IFERROR(A2/B2,"")` or guard with IF |
| `#N/A` | lookup miss | `=IFNA(XLOOKUP(...),"Not found")` |
| `#VALUE!` | wrong type (text where number expected) | coerce: `--A2`, `VALUE()` |
| `#REF!` | deleted a referenced cell/range | rebuild reference; use Tables to prevent |
| `#NAME?` | typo in function/range name | spell-check, check defined names |

---

## 🧪 LAB 2 — An analyst's summary sheet (45 min)

1. In `ShopKart.xlsx`: also import `Products.csv` and `Customers.csv` as Tables: `tblProducts`, `tblCustomers`.
2. In `tblSales`, add **Category**: `=XLOOKUP([@ProductID],tblProducts[ProductID],tblProducts[Category],"?")`
3. Add **Region** (two-hop lookup!): `=XLOOKUP(XLOOKUP([@CustomerID],tblCustomers[CustomerID],tblCustomers[Region]),tblCustomers[Region],tblCustomers[Region])` — simpler: nested XLOOKUP fetches region via customer. *(If your Excel is older: `=VLOOKUP([@CustomerID],tblCustomers[#All],6,FALSE)`.)*
4. New sheet `Summary`. In B2: `=SUMIFS(tblSales[Revenue],tblSales[Region],"West")`; build a small grid: Regions down, Categories across, formula combining `SUMIFS` with **$ locked** ranges and row/col labels. One formula, dragged everywhere — this is why $ matters.
5. Add **YoY-lite**: `=COUNTIFS(tblSales[OrderDate],">=1/1/2025")` (mind your system's date format) — criteria on dates work with `"&` comparisons.
6. Wrap lookup columns in **IFNA** to show "Unmapped" instead of `#N/A`.
7. Spot-check 3 numbers manually against a filtered view (always validate!).

## 💪 Exercises
1. `=COUNTIFS(tblSales[Quantity],">=5",tblSales[Discount],0)` — how many full-price bulk orders?
2. Average revenue of Electronics orders in South.
3. `=LARGE(tblSales[Revenue],1)` vs `=MAX(...)` — same? Then find the **2nd largest**.
4. Write with IFS: band AvgDiscount into Zero (<0.01), Low (<0.08), High (else).
5. Legacy drill: rebuild the Category column with VLOOKUP; explain in your journal one way it can silently break that XLOOKUP can't (hint: inserting a column in tblProducts).

### ✅ Selected answers
- Ex 2: `=AVERAGEIFS(tblSales[Revenue],tblSales[Category],"Electronics",tblSales[Region],"South")`
- Ex 5: VLOOKUP's col_index is a hard-coded number — insert a column in tblProducts and the lookup silently returns the wrong column. XLOOKUP references the column itself.

## ❓ Quiz
1. SUMIF vs SUMIFS argument order? 2. Why is XLOOKUP's default safer than VLOOKUP's? 3. `"Lap*"` means what in criteria? 4. Show the IFERROR pattern for A/B.

### ✅ Answers
1. SUMIF: criteria_range, criteria, sum_range(last). SUMIFS: **sum_range first**, then range/criteria pairs.
2. XLOOKUP is exact-match by default; VLOOKUP defaults to approximate (dangerous unless you write FALSE).
3. Wildcard: any text starting with "Lap".
4. `=IFERROR(A2/B2,"")` (or a friendly fallback label).

## ✅ Mastery checklist
- [ ] SUMIFS grid built with locked ranges (drag = correct everywhere)
- [ ] Two-hop lookup understood (Sales→Customers→Region)
- [ ] I default to XLOOKUP and IFNA for hygiene

**Next: `Excel_03_Data_Tools.md` — sort, tables, text & dates, validation, conditional formatting.**
