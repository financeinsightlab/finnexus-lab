# Module 09 — Capstone Projects: Build Your Expert Portfolio

> *Certificates open doors; projects close deals. Three builds of increasing independence. Screenshot everything — you'll assemble a public portfolio at the end.*

**Portfolio rules:** ① every project gets a problem statement, a model diagram, and a "decisions" log; ② commit as .pbip to GitHub; ③ capture 4–6 annotated screenshots; ④ write a 150-word summary (business problem → approach → impact). Publish to **novypro.com** and pin on LinkedIn.

---

# 🏆 PROJECT 1 — ShopKart Retail Sales 360 (Guided)

**Story:** You're ShopKart's first data analyst. The founder wants one app answering: *How are we doing, where, on what, and vs plan?*
**Data:** your `datasets/` (Sales, Customers, Products, Targets). **Deliverable:** published app with RLS.

### Requirements checklist
| # | Requirement | Skills it proves |
|---|---|---|
| R1 | Star schema w/ marked Date table (2023–2025) | M3 |
| R2 | Core KPIs incl. YoY %, Margin %, Achieved % vs Target | M4 |
| R3 | Running total + 3-month moving average trend | M5 |
| R4 | Product ranking + Pareto 80/20 view | M5 |
| R5 | Executive page (KPI row, trend, category bar, map) following the 5-second rule | M6 |
| R6 | Collapsible slicer panel + Reset button (bookmarks) | M6 |
| R7 | Customer drillthrough page + product tooltip page | M6 |
| R8 | Dynamic RLS for 4 regional managers | M7 |
| R9 | Scheduled refresh or OneDrive sync + Promoted model + usage metrics | M7 |
| R10 | Performance pass: PA timings before/after in decisions log | M8 |

### Milestones (2–3 days, ~6–8 hrs)
1. Model (reuse `ShopKart_Model.pbix`) + Targets connected to Date; validate target numbers only appear correctly at Region×Month granularity. ⚠️ *Decision log: why NOT relate Targets→Customers directly.*
2. Measures: build R2–R4; refactor to VAR/RETURN; display folders `_KPIs`, `_Time Intel`, `_Advanced`.
3. Pages: *Executive Overview*, *Products & Pareto*, *Customers (drillthrough)*, *TT_Product (tooltip)*. Apply theme, alt text, tab order, mobile layout.
4. Publish → app with two audiences (Leadership sees all; Managers see Overview+Customers) → dynamic RLS `RegionAccess` → test as role → screenshots.
5. Performance: PA record → apply one model-diet & one DAX fix → record again → write the delta in the log.

**Self-grade rubric (100):** correctness 30, model quality 20, design/story 20, interactivity 15, performance/ops 15. ≥85 = portfolio-ready.
**Stretch:** field-parameter KPI switcher; new-card visual KPIs; a decomposition tree answering "why did West dip in October?"; a /visual-calculation running sum replacing pattern 1 — compare both.

---

# 🥈 PROJECT 2 — Retail Discovery HR Analytics (Semi-Guided)

**Story:** HR Director of a 4,000-person retailer: *"Attrition is eating us. Show me where, who, and why — and let my regional HR leads see only their region."*
**Data:** fetch IBM HR Analytics Attrition (Kaggle) or similar HR dataset (~1,500 rows: Age, Department, JobRole, MonthlyIncome, YearsAtCompany, OverTime, Satisfaction, Attrition…). Add a second truth: build a small `HeadcountTargets.csv` yourself in Enter Data style.

### You must figure out (hints, not steps)
- Grain analysis: one row per employee → headcount = `COUNTROWS`, attrition = `CALCULATE ( [Employees], HR[Attrition] = "Yes" )`, **Attrition Rate = DIVIDE ( leavers, avg headcount )** — defend your denominator choice in the log.
- Banding: create Age Band, Salary Band columns (PQ or DAX — justify), then discover: overtime × department × salary band matrix with conditional heat.
- A "Key influencers" visual on Attrition + a decomposition tree (Income → Department → Role). When AI visuals mislead, note it.
- Story pages: *Overview* → *Drivers* → *Employee directory (drillthrough)* → *Actions* (text-page recommendations — dashboards that end in action get used).
- Security: dynamic RLS by Region with 3 HR leads + HR Director override who sees all (trick: role DAX with a Director flag row OR a second role).
- Ops: publish, app with 2 audiences, subscription for Monday 9 AM, sensitivity label "Confidential", usage metrics review after a week.

**Stretch:** predictive angle — simple logistic-ish scorebucket in DAX using satisfaction×overtime heuristics, visualized as risk tiers; or Fabric notebook to score (bonus-only). Deliverable = GitHub folder + novypro page + 6 screenshots.

---

# 🥇 PROJECT 3 — Open Independent Data (Unguided)

Pick ONE; own it end-to-end like a consultant with a real client (me — ask me anything as your "client"):
| Track | Source | Killer question |
|---|---|---|
| 🇮🇳 Indian public data | data.gov.in (agriculture, health, transport…) | e.g., rainfall vs crop patterns in your state |
| Sports | Kaggle cricket/IPL datasets | win drivers, player value per ₹ |
| Finance | NSE/BSE daily data via web connector | sector momentum dashboards w/ running MAs |
| Climate | Our World in Data / World Bank API | your country's energy transition story |

**Non-negotiables:** real-world mess (document 3 cleaning challenges) · a proper star even here · at least 2 advanced DAX patterns · one interactive mechanism (bookmarks/drillthrough) · published app link (or exported PDF + screenshots if no shareable license) · decision log · 1-page executive PDF summary. **Defense:** in your journal, answer "why this chart/measure/model choice?" for 10 random elements — that's exactly how interviews sound.

---

## 🎓 Portfolio & career assembly-line (Week 12)
1. **GitHub:** one repo per project (.pbip text files!) + a `README.md` with screenshots, problem, model diagram, DAX highlights, results.
2. **novypro.com:** publish PBIX demos (respect data privacy) — recruiters browse it.
3. **LinkedIn:** headline `Power BI Developer | DAX | Data Storytelling`; Featured = 3 projects; post a carousel per project (problem → model → dashboard → insight).
4. **Résumé bullets with outcomes:** "Built star-schema semantic model (1.3k→tested to millions-rows pattern) cutting refresh 65% via incremental refresh; 12-measure KPI layer; dynamic RLS app for 4 teams."
5. **Mock client drill (do with me):** I give vague requirements → you ask 6 scoping questions → propose an MVP page list → estimate 3 days. This is 50% of a real BI job.
6. **Final boss — the 60-minute rebuild:** from blank Desktop, rebuild Project 1's core (model + 6 measures + 1 page). Time yourself monthly; <60 min = hireable muscle memory.

**Then:** → `Resources_Certification_Career.md` to schedule PL-300 and start interviewing. You're not a beginner anymore. 🎓
