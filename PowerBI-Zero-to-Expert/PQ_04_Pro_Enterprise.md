# PQ 04 — Pro & Enterprise Power Query: Folding, Speed, Dataflows & Architecture

> *Final level: making queries that refresh millions of rows in seconds, design organizations — not just files — and run from CSVs to APIs to lakes.*

## 🎯 Objectives
Understand & exploit **query folding** · performance engineering patterns · API/Web connections · incremental refresh & dataflows · reference architecture of a real project.

---

## 📘 4.1 Query folding — the deepest PQ secret

Folding = Power Query **translates your steps into the source's native language** (SQL!) and ships work to the server. A filter+select on SQL Server becomes `SELECT … WHERE` server-side — millions of rows never leave the database.
- **Right-click a step → View Native Query** (greyed out when folding broke). Folding stops mattering at CSVs/Excel (no server to fold *to*); it dominates SQL/Fabric sources.
- Fold-friendly: SelectRows/Remove columns/Rename/Type (mostly)/Sort/Group/Keep rows, merges/joins.
- **Fold-breakers:** Add Index Column, many custom `each` text gymnastics (Split via Text.*), `Table.Buffer` (except when intentional), mixing sources (data privacy firewall), using M functions the driver can't express.
- Pro pattern: **do foldable steps FIRST**, break-folding ones LAST; and prefer cleaning upstream (a SQL view) when steps break folding.

## 📘 4.2 Performance playbook

1. Load fewest columns/rows as early as possible (select before transforms).
2. Avoid double work: disable load on staging; **Reference**, don't Duplicate.
3. `Table.StopFolding`/`Table.Buffer` knowingly: Buffer locks a snapshot mid-pipeline (kills folding but stops re-evaluation).
4. Keep source indexes healthy for database filtering columns.
5. Most M perf sins = post-type-change text surgery on millions of rows — move to the source (VIEW/T-SQL) instead.

## 📘 4.3 Web & API connectors

```powerquery
// Weather JSON for Delhi (Open-Meteo, no key):
let
    Resp  = Json.Document(Web.Contents("https://api.open-meteo.com",
            [RelativePath="v1/forecast", Query=[latitude="28.61", longitude="77.20", hourly="temperature_2m"]])),
    Hours = Resp[hourly][time], Tmps = Resp[hourly][temperature_2m],
    Tbl   = Table.FromColumns({Hours, Tmps}, {"Time", "Temp"}),
    Typed = Table.TransformColumnTypes(Tbl, {{"Time", type datetime}, {"Temp", type number}})
in
    Typed
```
Patterns: JSON navigation via `[key]`/`{index}`, **Into Table** buttons in the UI, API keys in headers (`Headers=[Authorization="Bearer …"]` — keep OUT of shared files; use parameters/credentials), **RelativePath+Query** options (avoids "dynamic data source" refresh blocks in the Service).

## 📘 4.4 Dataflows & cloud Power Query

**Dataflow** = Power Query running in the Service (or Fabric): centralize cleaning once → many models consume clean tables. Standard/computed entities, incremental refresh, AI insights. Fabric: Dataflows Gen2 write to **Lakehouse/Warehouse**. Mindset: *if more than one .pbix needs the same cleaned table, it should probably be a dataflow.*

## 📘 4.5 Incremental refresh (the big-file blessing)

Partition by date: refresh only the recent window, store the rest.
1. Create **RangeStart/RangeEnd** parameters (DateTime).
2. Filter your date column: `>= RangeStart` and `< RangeEnd` (**must fold!** check Native Query).
3. Right-click table → **Incremental refresh**: store 5 years, refresh last 30 days; optional *detect data changes* via a modified-date column; "only refresh complete periods".
4. Requires Pro+ (Premium for huge partitions). The CSV-family sources don't fold → point at SQL/Fabric for real implementations.

## 📘 4.6 Reference architecture of a real project

```
_Sources:   _src_SQL_Sales    _src_Folder_Budget    _src_API_FX     (load: OFF)
Staging:    stg_Sales_Clean   stg_Budget_Combined   stg_FX_Table    (load: OFF)
Business:   Sales  Budget  FX  Customers  Products  _Date (M-built) (load: ON)
Naming:     folder groups, step names in plain English, parameters for every path/env,
            one README query documenting data quality decisions
```
Plus: colocate folding checks, set privacy levels deliberately, version queries in .pbip (TMDL/pq text) for Git review.

---

## 🧪 LAB 4 — Four pro exercises (90 min)
1. **Folding demo:** connect to *any* SQL-ish source you have (or simulate via CSV + note where "View Native Query" is absent). List 3 steps that break folding.
2. **Delhi weather API:** paste §4.3's query; convert hourly time; chart later in a report. Add parameter `pLat`, `pLon`.
3. **Incremental refresh simulation:** build RangeStart/RangeEnd parameters + the filter step on Sales; write the remaining click-path you'd use in a Premium workspace into your journal.
4. **Layout your ShopKart master file** into `_Sources / stg_ / Output` groups with disabled loads; add one README query (Enter Data) documenting every cleaning decision made in P2/P3 labs.

## 💪 Exercises
1. Your refresh takes 11 min on CSV files. Folding won't save you — list three things that actually will (fewer columns, disabled loads on staging, buffering, file format…).
2. Fetch JSON of `https://api.github.com/users/octocat` (public, no auth) and flatten 3 fields into a table.
3. Walk through a scenario where `Table.Buffer` both helps and hurts — describe each.
4. Modify §4.3 to pull *yesterday* only (hint: `Query` params start/end via `Date.ToText(DateTime.Date(DateTime.LocalNow())-#duration(1,0,0,0),"yyyy-MM-dd")`).
5. Design a dataflow plan: your org's Sales table needed by 5 reports — entities, workspace, refresh cadence.

### ✅ Selected answers
- Ex 1: remove unused columns earliest; CSV→Excel-native/source-database migration; Table.Buffer after an expensive step; use Excel workbook named-tables (not sheet regions) as sources; disable load on staging.
- Ex 3: Helps = isolates steps from being recomputed per downstream reference; Hurts = kills folding → whole table flows through the PQ engine → memory + time.

## ❓ Quiz
1. What does "View Native Query" prove? 2. Why must the incremental-refresh date filter fold? 3. Dataflow vs per-file PQ — organizational tradeoffs? 4. Why RelativePath/Query in Web.Contents?

### ✅ Answers
1. That everything up to that step folded into a single SQL statement — server does the work.
2. Else every refresh pulls the full history to evaluate the filter — incremental refresh degrades into full refresh.
3. Dataflows = one governed clean layer for many consumers (+central refresh) vs duplicated per-file logic drifting apart; cost = extra workspace management.
4. It keeps the URL *static* for credential/privacy evaluation → scheduled refresh in the Service isn't blocked as a "dynamic data source".

## ✅ Mastery checklist
- [ ] I can name fold-friendly vs fold-killing steps from memory
- [ ] Live API data landed in my model via parameter-relative Web.Contents
- [ ] My master file uses `_Sources/stg_/Output`, disabled loads, parameters, README
- [ ] I can whiteboard dataflows + incremental refresh for any company scenario

**Track complete. 🎉 Power Query now powers your Power BI (Module 02), Excel (E5), and Fabric ( Module 08 ) — go build something real.**
