# Module 08 — Performance, Big Models & the Enterprise Toolkit

> *Anyone can build a dashboard. Experts build one that's still fast at 500 million rows, version-controlled, deployable, and governed. Welcome to the senior-league module.*

## 🎯 Objectives
Storage modes · why models bloat · Performance Analyzer + DAX Studio diagnostics · DAX & model optimization playbook · incremental refresh & aggregations · pro tooling (.pbip/TMDL, Tabular Editor, pipelines, Git) · Fabric & Copilot orientation.

---

## 📘 8.1 Storage modes (pick deliberately)

| Mode | Data lives in… | When to choose |
|---|---|---|
| **Import** | VertiPaq (compressed, in-memory) | Default. Fastest, full DAX. Refresh to update |
| **DirectQuery** | Stays at source; queries per visual | Real-time needs / huge data. Slower visuals, DAX/time-intel limits; tune the source |
| **Dual** | Both (Import cache + DQ fallback) | Dimensions in composite models |
| **Composite** | Mix Import + DQ in one model | Agg tables + big DQ facts = best of both |
| **Direct Lake** (Fabric) | Delta tables in OneLake, loaded on demand | Fabric lakehouse/warehouse sources; near-Import speed, no refresh copies |

## 📘 8.2 Why models get slow & fat (and the cures)

**VertiPaq charge:** cost ≈ column count × **cardinality** (unique values). Diets:
1. **Drop every unused column** (facts keep only keys + measures). VBA-ish tag-team: **Measure Killer / Bravo (SQLBI)**; measure what each column costs with DAX Studio → *View Metrics*.
2. Lower cardinality: split DateTime → Date + Time (or round), drop unique IDs, prefer integers over text keys (but pre-summarized ints beat long GUIDs).
3. Disable **Auto date/time** (hidden tables per date column!) — you have a real Date table already.
4. Star schema (again) — big flat tables compress worse than star + relationships.
5. Numbers: avoid high-precision decimals, round money; avoid calculated columns that a measure can replace; **order-by** encoding friendly columns helps compression (let PQ sort big fact by keys).
6. Image/binary/long text out of the model entirely.

## 📘 8.3 Diagnose, then optimize (never guess)

1. **Performance Analyzer** (Optimize tab → Start recording → Refresh visuals): per-visual *DAX query / Visual display / Other* ms + **Copy query**.
2. Paste into **DAX Studio → Server Timings + Query Plan**: storage engine (SE) vs formula engine (FE). Fast DAX = most work pushed to SE (simple filters on columns), little FE row-iteration.
3. **DAX optimization playbook (memorize):**
   - Filter **dimension columns**, not `FILTER ( FactTable, … )`.
   - `KEEPFILTERS` when filtering by a *measure condition* over sets: `FILTER ( KEEPFILTERS ( VALUES ('Date'[Month] ) ), [Total Sales] > 100000 )`.
   - Prefer `DIVIDE`, variables (compute once), and measure references over repeated expressions.
   - Avoid nested iterators on big virtual tables; `SUMMARIZECOLUMNS` for query-style tables; watch out `RANKX` over 100k-row tables.
   - Boolean *or* heavy `FILTER` → move logic to the model (flags as columns in dims) or PQ.
   - Time-intel sugar funcs are fine; the sin is scanning `ALL ( 'Sales' )` to rebuild calendars per-visual.
   - Replace *whole-table* `VALUES ( Table )` with `VALUES ( Table[Column] )` whenever possible.
4. **Report-level speed:** fewer visuals/page (each visual = query), fewer slicers (each slicer = query on load), avoid bi-directional relationships & high-cardinality slicer lists, turn off "cross-highlight" where unneeded, sort hidden helper columns out of visuals, images via URLs not embedded.

## 📘 8.4 Scale features

- **Incremental refresh:** parameters `RangeStart`/`RangeEnd` (DateTime) → filter the fact in PQ (`>= RangeStart and < RangeEnd` — ensure **query folding**!) → right-click table → Incremental refresh: store 5 years, refresh last 7 days (+ *only refresh complete periods*, optional "detect data changes" on a modified-date column). Requires Pro? — Pro yes (Premium needed for large/hybrid). Refresh time collapses from hours to minutes.
- **User-defined aggregations:** small Import **agg table** (Sales by Month×Category×Region) + *Manage aggregations* (GroupBy/Sum/Count mappings + Precedence). Queries hitting aggregated level answer from memory; detail queries drop to DQ fact. Composite magic.
- **Automatic aggregations:** DirectQuery + Import-driven auto-built aggs (Premium) — turn on, watch hit-rate in the refresh history.
- **Hybrid tables:** historical Import partitions + today's DirectQuery partition = real-time tail without DQ pain (Premium).
- Query folding discipline (the DQ/incremental enabler): keep steps foldable (View → *Native query* must stay clickable; avoid index columns, merges on computed columns, `Text.*` gymnastics after folding). Push cleanup **upstream** (SQL view) when it breaks folding.

## 📘 8.5 Professional toolchain

| Tool | For |
|---|---|
| **.pbip / Power BI Projects + TMDL view** | Save as folder of text files → **Git** version control of model/report; TMDL view in Desktop edits model as code |
| **XMLA endpoint** (Premium/PPU; read or read/write) | Connect SSMS/tools, script models, automation |
| **Tabular Editor 2 (free) / 3 (paid)** | Best Practice Analyzer, calculation groups, batch measures/renames, perspectives, OLS, C# scripts (`foreach(var c in Selected.Columns) c.IsHidden = true;`) |
| **ALM Toolkit** | Schema compare/merge between models (dev→prod) |
| **DAX Studio** | Diagnostics + `EVALUATE` queries + View Metrics |
| **Bravo (SQLBI)** | Model size analysis, date-table generator |
| **Deployment pipelines** | Dev → Test → Prod with rules (parameter swaps, dataset retargeting) — standard enterprise ALM (Premium) |
| **Fabric Git integration** | Workspace ↔ Azure DevOps/GitHub: branches, PRs, CI |

**Pattern to rehearse:** .pbip in repo → develop on feature branch → PR review the TMDL diff → merge → pipeline deploys Test → gate check (BPA) → Prod workspace → app update.

## 📘 8.6 Fabric & Copilot (2026 reality-check)

**Microsoft Fabric** = OneLake + lakehouses/warehouses (Delta), Data Factory, Synapse, Real-Time, and **Power BI on top**. Analyst impact: data often lands as *lakehouse tables* → connect **Direct Lake** → near-instant semantic models, no import refresh, "default semantic model" per lakehouse (always rebuild your own pro model on top). Fabric trial = free capacity to learn this.

**Copilot in Power BI** (Fabric capacity required): generate report pages from prompts, write/explain DAX, summarize semantic models into narrative visuals. Treat as a fast junior: prompt well ("Create a bar of Profit by Region for 2025 with conditional color on negative values"), **verify everything**, know that weak models produce weak Copilot output — your modeling skills make AI useful.

---

## 🧪 LAB 8 — Optimize ShopKart & taste Fabric (60–75 min)
1. Baseline: Performance Analyzer on your Executive Overview page; screenshot timings.
2. Apply the diet: hide/delete unused columns (Discount in a calc-measure? keep), disable auto date/time, ensure no text keys in visuals, replace any `FILTER ( Sales, ...)`: rewrite with dimension filters. Re-record; compare.
3. Rewrite one expensive measure using variables + `KEEPFILTERS`; note the SE/FE split change in DAX Studio.
4. Convert `ShopKart_Model.pbix` → **Save as .pbip**; open the folder; commit to a local `git init` repo; edit a measure name in TMDL view; watch Desktop hot-update; `git diff` the change. (This demo alone wows interviewers.)
5. Read-through (no Premium needed): incremental refresh setup on `Sales` with RangeStart/RangeEnd as far as Power Query allows; write the exact click-path you'd use in a Premium workspace.
6. Fabric sampler (trial): create workspace on trial capacity → new Lakehouse → upload `Sales.csv` as table → build a Direct-Lake semantic model → one visual. Note the speed/no-refresh difference in your journal.
7. Optional: Tabular Editor 2 connect → Best Practice Analyzer → fix top 3 warnings (unformatted measures, visible keys, missing descriptions — add descriptions!).

## 💪 Exercises
1. Order these by cost: drop 1M-row ID column / drop text address column with 50 uniques / hide a column. Explain.
2. A DirectQuery report renders in 12 s/page: list five attack vectors (source indexes, fewer visuals, aggregations…).
3. Write the incremental-refresh PQ filter line and explain why `<` vs `<=` matters at boundary.
4. Composite scenario design: 3-year 800M-row fact (DQ) + aggs by Month/Region — describe tables, storage modes, and which visuals hit which.
5. Calculation-group concept: sketch a "Time Intelligence" calc group with items Current/YTD/PY/YoY% that wraps `SELECTEDMEASURE()`. (Research Tabular Editor docs; write the YTD item expression.)
6. Journal: when would you *not* use Import mode even in Fabric world?

## ❓ Quiz
1. VertiPaq's pricing unit is basically…? 2. SE vs FE in one line each. 3. Three reasons auto date/time is evil at scale. 4. Why must incremental-refresh steps fold? 5. User-defined vs automatic aggregations. 6. What does .pbip enable that .pbix can't? 7. Dual mode purpose. 8. Copilot's biggest dependency for quality output?

### ✅ Answers
1. Column cardinality × rows (storage engine compresses best low-cardinality, value-encoded columns).
2. Storage engine = blinding-fast compressed scans/filters over columns; formula engine = slow row-by-row logic when DAX is too exotic for SE.
3. Hidden table **per date column**; bloats size; uncontrolled 1900–2100 spans; competes with your real Date table logic.
4. The date-range filter must translate to SQL so only new partitions pull data — non-folding steps force full-table processing.
5. User-defined = you build/map the agg table with precedence; automatic = Premium builds/maintains aggs from query logs — both fallback to DQ on miss.
6. Text-based source control, diffs/PRs, TMDL editing, automation/CI.
7. Looks/behaves Import-fast when cached, falls back to DirectQuery when the cache can't serve the query — keeps composite models responsive.
8. The semantic model's quality (names, relationships, measures) — great models make Copilot look brilliant; mess makes it confidently wrong.

## ✅ Mastery checklist
- [ ] I can profile any report and propose 3 concrete speed-ups with evidence
- [ ] Model diet + DAX rewrite both delivered measurable wins
- [ ] I've Git-committed a .pbip and edited TMDL
- [ ] I can whiteboard Import/DQ/composite/incremental/aggs and Fabric placement for any scenario

**Next: `Module_09_Capstone_Projects.md` — prove it all with portfolio projects.**
