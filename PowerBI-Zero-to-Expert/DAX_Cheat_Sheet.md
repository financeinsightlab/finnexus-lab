# ⚡ DAX Cheat Sheet — Print & Pin Edition

## The Two Laws
```
1. Measures evaluate in FILTER CONTEXT (visual rows, slicers, cross-filters).
2. Calculated columns & iterators evaluate in ROW CONTEXT (current row),
   and CALCULATE converts row context → filter context (CONTEXT TRANSITION).
```

## House style
```dax
Measure Name =
VAR First  = ...
VAR Second = CALCULATE ( [Measure], 'Dim'[Col] = "X" )
RETURN
    DIVIDE ( First - Second, Second )      -- always DIVIDE, never "/"
```
Columns: `Table[Column]` · Measures: `[Measure]` (never with table name) · Comment `--` · Filter **dimension columns**, never `FILTER ( FactTable, … )`.

## Core aggregations & logic
| Task | DAX |
|---|---|
| Safe divide | `DIVIDE ( [A], [B], 0 )` |
| Branch | `IF (...)` / `SWITCH ( TRUE(), cond, result, ..., default )` |
| Null safety | `COALESCE ( x, 0 )`, `ISBLANK ( x )`, `BLANK ()` |
| Iterate | `SUMX / AVERAGEX / MAXX / MINX / RANKX / CONCATENATEX ( tbl, expr )` |
| Counts | `COUNTROWS ( t )`, `DISTINCTCOUNT ( col )`, `COUNT ( col )` |
| Text in cards | `FORMAT ( [Sales], "₹ #,##0" )`, `CONCATENATEX ( VALUES ( c ), c, ", " )` |

## Filter-context surgery
| Function | Does |
|---|---|
| `CALCULATE ( expr, f… )` | the boss — rewrites context (default = REPLACE) |
| `KEEPFILTERS ( f )` | intersect instead of replace |
| `REMOVEFILTERS ( t/c )` | clear filters |
| `ALL ( t/c )` / `ALLEXCEPT ( t, c… )` | remove all / all-except filters |
| `ALLSELECTED ( c )` | ignore in-visual filters, keep slicers (for % of visible, ranking) |
| `VALUES / DISTINCT ( c )` | visible uniques (VALUES adds RI blank) |
| `SELECTEDVALUE ( c, def )` | single pick or fallback → dynamic titles |
| `FILTER ( t, cond )` | custom row set (keep t small!) |
| `USERELATIONSHIP ( c1, c2 )` | wake inactive relationship per-measure |
| `CROSSFILTER ( c1, c2, BOTH )` | per-measure bidirectionality |
| `TREATAS ( tbl, col… )` | virtual relationship |
| `ISINSCOPE / HASONEVALUE / ISFILTERED` | sense the visual level |
| `RELATED` / `RELATEDTABLE` | pull 1-side value / row-set into row context |

## Time intelligence (marked Date table!)
```dax
YTD     = TOTALYTD ( [M], 'Date'[Date] )           -- QTD/MTD same family
LY      = CALCULATE ( [M], SAMEPERIODLASTYEAR ( 'Date'[Date] ) )
PrevMo  = CALCULATE ( [M], PREVIOUSMONTH ( 'Date'[Date] ) )
Shift   = CALCULATE ( [M], DATEADD ( 'Date'[Date], -1, QUARTER ) )
Roll12  = CALCULATE ( [M], DATESINPERIOD ( 'Date'[Date], MAX ( 'Date'[Date] ), -12, MONTH ) )
Between = CALCULATE ( [M], DATESBETWEEN ( 'Date'[Date], DATE(2025,1,1), DATE(2025,6,30) ) )
YoY %   = VAR LY = [LY measure] RETURN IF ( NOT ISBLANK ( LY ), DIVIDE ( [M] - LY, LY ) )
```

## 10 patterns that answer 90% of requests
```dax
-- Running total
RT = CALCULATE ( [M], FILTER ( ALL ( 'Date' ), 'Date'[Date] <= MAX ( 'Date'[Date] ) ) )
-- % of total / % of parent
% Tot = DIVIDE ( [M], CALCULATE ( [M], ALL ( 'Dim' ) ) )
% Par = DIVIDE ( [M], CALCULATE ( [M], ALL ( 'Dim'[Child] ) ) )
-- Rank within selection
Rk  = IF ( HASONEVALUE ( Dim[C] ), RANKX ( ALLSELECTED ( Dim[C] ), [M] ) )
-- Moving average (rows = Date days)
MA3 = AVERAGEX ( DATESINPERIOD ( 'Date'[Date], MAX ( 'Date'[Date] ), -90, DAY ), [M] )
-- New customers in period
New = VAR c = VALUES ( F[CustID] )
      VAR p = CALCULATETABLE ( VALUES ( F[CustID] ), FILTER ( ALL ( 'Date' ), 'Date'[Date] < MIN ( 'Date'[Date] ) ) )
      RETURN COUNTROWS ( EXCEPT ( c, p ) )
-- Retention (active in period & prior)
Ret = VAR p = CALCULATETABLE ( VALUES ( F[CustID] ), PREVIOUSMONTH ( 'Date'[Date] ) )
      RETURN COUNTROWS ( INTERSECT ( VALUES ( F[CustID] ), p ) )
-- Top N flag (visual filter Rk <= 5) — or TOPN for tables:
TopT = TOPN ( 5, VALUES ( 'Dim'[C] ), [M], DESC )
-- Dynamic title
Ttl = "Sales | " & COALESCE ( SELECTEDVALUE ( D[Region] ), "All Regions" )
-- Conditional color measure (use as Field value!)
Clr = IF ( [Margin %] >= 0.3, "#2E7D32", "#C62828" )
-- Semi-additive snapshot (inventory/headcount)
Cls = CALCULATE ( [M], LASTDATE ( 'Date'[Date] ) )
```

## Visual calculations (visual-local, no model edit)
`RUNNINGSUM([M])` · `MOVINGAVERAGE([M], 3)` · `PREVIOUS([M])` / `NEXT` · `FIRST/LAST/LOOKUP` · `RANGE(3)` sets · axes: `ROWS / COLUMNS / ROWS COLUMNS`.

## Emergency decoder (top errors)
| Error | Meaning → fix |
|---|---|
| "single value for column…" | bare column in measure → aggregate it or SELECTEDVALUE |
| circular dependency | two calc columns/tables mutually depend via CALCULATE → merge logic into one or move to PQ |
| wrong subtotal | filter-context logic: think per-level, add ISINSCOPE branches |
| time-intel blanks | Date table not marked / gaps / relationship to a DateTime column |
| everything slow | FILTER over fact, bi-dir relationships, huge-cardinality slicers, visuals/page > 8 |
```
Debug ritual: table visual → return VARs one by one → DAX Studio Server Timings (SE% high = good).
```

## Format strings
`"₹ #,##0"` money · `"0.0%"` pct · `"dd-MMM-yyyy"` dates · dynamic: measure → Format → *Dynamic* (FORMAT function string computed by another measure: `IF ( [M] >= 10000000, "₹ #,##0,,.0 Cr", "₹ #,##0" )` style via format-string expression).
