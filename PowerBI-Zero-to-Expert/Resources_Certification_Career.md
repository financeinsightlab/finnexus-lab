# 🎓 Certification, Career & Lifelong Resources

## 1. Certification: PL-300 (Power BI Data Analyst Associate)
- **Status:** the flagship Power BI exam, active and refreshed (skills outline updated Jan 15, 2026). Always check Microsoft Learn's exam page for the latest weight split.
- **Format:** 40–60 questions, ~100 min, pass = 700/1000; Pearson VUE online or test center; **renew free every year** online. Fee ≈ ₹4,800 for India (check current pricing; discounts via student programs/Exam Replay).
- **Skill areas → your course map:**
  | PL-300 area | Where you mastered it |
  |---|---|
  | Prepare the data (~25–30%) | Module 02 (+ M) |
  | Model the data (~25–30%) | Modules 03–05 (DAX heavy) |
  | Visualize & analyze (~25–30%) | Modules 01, 06 |
  | Manage & secure (~15–20%) | Module 07 (+ 08) |
- **7-day final prep plan:** ① Microsoft Learn PL-300 learning paths (free) ② your cheat sheet rewrite from memory ③ MS *Practice Assessment* ④ weak-area labs redo ⑤ full project rebuild in 60 min ⑥ exam-day list: RLS test steps, refresh/gateway, join kinds, time-intel quirks, workspace roles ⑦ sleep.
- Next-level (later): **DP-600** Fabric Analytics Engineer (Direct Lake, SQL, KQL neighborhood).

## 2. Your forever resource shelf
| Resource | Use |
|---|---|
| **Microsoft Learn** (Power BI paths) & official docs | free, exam-aligned |
| **SQLBI.com** (Marco Russo & Alberto Ferrari) — articles, DAX/VertiPaq courses, **DAX.do**, Bravo | *the* deep-DAX authority; 1 article/week |
| **Guy in a Cube** (YouTube) | weekly product updates + tutorials |
| **Power BI Community** (community.fabric.microsoft.com) | ask/answer — answering accelerates mastery |
| Workout-Wednesday-style challenges & novypro gallery | weekly visual sparring + portfolio hosting |
| *The Definitive Guide to DAX* (book) | reference bible after Module 05 |
| Microsoft Fabric blog + monthly Desktop updates video | the product changes monthly — stay current |

## 3. 60-day expert treadmill (post-course)
Mon: rebuild one community challenge · Wed: one SQLBI read + implement on ShopKart · Fri: answer 2 forum questions · Sun: portfolio polish / post. Two months of this = top-5% practitioner habits.

## 4. Interview question bank (answer aloud; top 30)
**Foundations:** PBIX contents? Import vs DirectQuery vs Direct Lake? Workflow end-to-end? Implicit vs explicit measures?
**Modeling:** star vs snowflake · why avoid bidirectional · date table requirements · cardinality & (Blank) member · resolve many-to-many (bridge/shared dims).
**DAX:** row vs filter context (they *will* ask) · context transition · CALCULATE replace vs KEEPFILTERS · ALL vs ALLSELECTED · VALUES vs DISTINCT · measure vs column · RANKX ties? · how time intelligence works · YoY% safe-guard · why totals look wrong.
**Performance:** diagnose slow visual (PA → DAX Studio SE/FE) · shrink model 5 ways · incremental refresh setup · aggregations/composite design.
**Service:** workspace roles · app vs link sharing · RLS static vs dynamic + USERPRINCIPALNAME · gateway modes · build permission · deployment pipelines.
**Scenario:** "CEO wants live sales; fact has 800M rows" (composite + hybrid + aggs — walk it through). "Managers must see only their region across 10 reports" (central certified model + dynamic RLS + audiences).
**Behavioral:** tell about a wrong number you caught; balancing pretty vs accurate; handling vague stakeholder asks.

## 5. Glossary (pin this page)
**Aggregator/Aggregation** summarized pre-computed table · **App** packaged content w/ audiences · **Applied Steps** PQ recipe · **Autodetect** auto relationships (turn off) · **Bookmark** saved view state · **CALCULATE** context-rewriter · **Cardinality** unique count per column · **Composite model** mixed Import+DQ · **Context transition** row→filter via CALCULATE · **DAX** formula language · **Date table** marked continuous calendar · **Direct Lake** Fabric delta-source mode · **DirectQuery** live-source mode · **Drillthrough** filtered detail page · **Fabric** unified data platform home of Power BI · **Fact/Dimension** events vs descriptors · **Field parameter** user-switchable fields · **Filter context** active filters at eval · **Gateway** on-prem refresh bridge · **Incremental refresh** partition-based partial loads · **Iterator (X-functions)** row-by-row then aggregate · **Lineage view** dependency map · **M** Power Query language · **Measures table** `_Measures` home trick · **OLS** object-level security · **Pareto** cumulative 80/20 · **pbip** project text format (Git-able) · **Power Query** ETL engine · **Q&A** natural-language visual · **RLS** row-level security · **Semantic model** the published model artifact · **Snowflake** normalized dims (avoid) · **Star schema** dims around fact (GOAL) · **TMDL** model-as-code view · **USERELATIONSHIP** activate inactive rel · **VertiPaq** Power BI's columnar engine · **Visual calculation** visual-local DAX · **XMLA endpoint** model scripting port.

## 6. Keyboard shortcuts that save hours
`Ctrl+D` duplicate visual · `Alt+Shift+F10` move focus · `Ctrl+G/U` group/ungroup · `Arrow keys` nudge (with Ctrl = 1px? use format pane precision) · `Ctrl+Enter` commit DAX new-line in formula bar (Shift+Enter for line break) · DAX Studio: `F5` run · Desktop: `Ctrl+S` constantly 🙂 · Publish: `Ctrl+Alt+P`? — production habit: keep one master file versioned in Git instead of `_final_v7_REAL.pbix`.

## 7. My office hours 🤝
Stuck on a lesson, want a deeper dive on any topic, need your DAX reviewed, want another messy dataset generated, or a mock interview? Just ask me in this chat — paste your formula/model description and I'll debug it with you like a senior reviewing a junior's PR.

*You started with zero. By the time you finish Module 09 and the 60-day treadmill, you'll interview like someone with two years of experience — because you'll have built the work to prove it. — Your tutor*
