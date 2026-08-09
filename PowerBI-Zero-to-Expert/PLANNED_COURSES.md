# 📋 Planned Courses — Build Queue (confirmed 2026-07-23)

> 🎧 **v20 infra fix (2026-07-23):** audio now EMBEDDED — all 12 clips are base64 data-URIs inside the single HTML with `<audio controls>` players (module md keeps `[label](english_audio/x.mp3)` links; `audio_embed()` in builder converts them at build). BE course (be1×2/be5/be6) links were added to modules e1/e5/e6. Rebuild anytime via build_app_v20.py; new audio courses just need the md link — embedding is automatic.

User decided NOT to build these yet — planned for later. When asked "add the planned courses" (or individually), build in this order, Tier-1 first. Keep ticking them off here as they ship.

## 🏆 Tier 1 — Business Analytics umbrella (after Time Series, before English umbrella)

1. **💼 Business & Financial Acumen** (suggested 6 modules)
   - Reading financial statements fluently (P&L / Balance Sheet / Cash Flow + linkages)
   - Ratio analysis: liquidity, solvency, efficiency, profitability (DSCR, current ratio…)
   - DuPont decomposition of ROE; margin vs turnover stories
   - Working capital cycle (DSO/DPO/DIO), cash conversion
   - Unit economics: contribution margin, CAC, LTV, churn, payback; KPI trees
   - Capstone: ShopKart financial health memo using Finance_GL + Budget datasets
   - **Why:** the missing "Business" in Business Analytics; makes E6/P5/S5/M10/T6/Py6/St6/TS6 click deeper
   - Suggested ids prefix: `bfa` group key "bfa", section ids like `c1..c6` (check collisions first)

2. **🎯 Prescriptive Analytics & Optimization (Decision Science)** (suggested 6 modules)
   - Decision science mindset: descriptive ✓ predictive ✓ → prescriptive (what SHOULD we do)
   - Excel Solver mastery (setup, constraints, sensitivity reports)
   - Linear programming basics (graphical + Solver): product mix, resource allocation
   - Integer/assignment problems, transportation & logistics models
   - Inventory: EOQ, reorder point, safety stock (ties St/TS demand forecasts!)
   - Capstone: ShopKart inventory + allocation optimization pack
   - **Why:** completes the analytics trilogy; turns analyst into decision-maker
   - Suggested group key "opt", section ids like `o1..o6` (check collisions first)

3. **🤖 Machine Learning for Analysts** (suggested 6 modules)
   - ML mindset for analysts: when ML helps vs when it's overkill (rules-first honesty)
   - Data prep: train/test (ML leakage = TS5's enemy), encoding, scaling; scikit-learn basics
   - Classification: logistic regression + trees for churn; metrics beyond accuracy (precision/recall/ROC-AUC; St3 ties)
   - Regression upgrade: regularization intuition (St4 upgrade), feature importance
   - Clustering/segmentation: k-means on ShopKart customers (RFM!); honest cluster validation
   - Capstone: churn-score + customer segments for ShopKart with SHAP-light explanation + ethics notes
   - **Why:** career bridge from Business Analyst to senior/DS-adjacent roles
   - Suggested group key "ml", section ids like `j1..j6` (`g1..g5` now taken by Group Discussion course since v22)

## 📚 Tier NEXT — English umbrella — ✅ STARTED (Basic English shipped 2026-07-23, v15)

- ✅ 🗣️ **Basic English** — 6 modules (BE1–BE6), ids e1–e6, group key "eng1", umbrella key "eng" (cyan mega), audio pack in `english_audio/` (4 clips)
- ✅ 🗞️ **Business News Speaking** — 5 modules (BN1–BN5; BN5 = finance/markets spec + earnings-anchor capstone on Finance_GL), ids n1–n5, group key "eng2", umbrella "eng", audio pack adds 2 model clips (bns2 60-sec summary, bns5 earnings brief) — shipped 2026-07-23, v16
- ✅ 📖 **Business Vocabulary** — 5 modules (BV1–BV5; BV5 = finance/salary/banking spec + payslip capstone), ids b1–b5, group key "eng3", umbrella "eng", audio adds 2 pronunciation drills (bv1 office words, bv5 finance words) — shipped 2026-07-23, v17
- ✅ ✉️ **Email Writing** — 5 modules (EM1–EM5; EM5 = finance/money-emails spec + vendor-payment-cycle capstone), ids l1–l5, group key "eng4", umbrella "eng", audio adds 2 model clips (ew3 tone ladder, ew5 payment reminder ladder) — shipped 2026-07-23, v18
- ✅ 📝 **English Grammar for Interviews** — 5 modules (GR1–GR5; GR5 = finance/HR-round spec + mock-interview capstone), ids r1–r5, group key "eng5", umbrella "eng", audio adds 2 model clips (g2 tell-me-about-yourself, g5 HR round) — shipped 2026-07-23, v19. (Note: `g` prefix now taken by Grammar audio names only; section ids are r1–r5 — ML course should still check `g1..g6` collision at build time)
- ✅ 📚 **English Reading Practice** — 5 modules (RP1–RP5; RP5 = finance/financial-documents spec + earnings-announcement capstone), ids d1–d5, group key "eng6", umbrella "eng", audio adds 2 read-along clips (rp1 graded text, rp5 earnings announcement) — shipped 2026-07-23, v21
- ✅ 👥 **Group Discussion Skills** — 5 modules (GD1–GD5; GD5 = finance/money-GD spec + 8-minute panel capstone on ShopKart GL: net margin 2.4%, Q2 +21%/+252% small-base), ids g1–g5, group key "eng7", umbrella "eng", audio adds 2 model clips (gd3 floor moves, gd5 capstone panel) — shipped 2026-07-23, v22. (Note: section ids g1–g5 now TAKEN by GD — the ML course must use different ids, suggest `j1..j6`; grammar audio filenames g2_/g5_ are files only, no section-id collision)
- ✅ 🎤 **Interview Communication** — 5 modules (IC1–IC5; IC5 = finance-rounds spec + 10-question capstone mock with the ShopKart GL star story + closing statement), ids i1–i5, group key "eng8", umbrella "eng", audio adds 2 model clips (ic2 intro+STAR answers, ic5 finance round answers) — shipped 2026-07-23, v23
- ✅ 🎙️ **Pronunciation & Voice Recording** — 5 modules (PR1–PR5; PR5 = finance money-talk spec + 90-second earnings readout capstone on ShopKart GL), ids a1–a5, group key "eng9", umbrella "eng", audio adds 4 clips (pr1 minimal pairs, pr2 word stress, pr3 rhythm/intonation, pr5 earnings readout) — MOST audio clips of any course (it's the audio course) — shipped 2026-07-23, v24
- ✅ 👋 **Self-Introduction Speaking** — 5 modules (SI1–SI5; SI5 = finance analyst-intro spec + 4-variant intro suite capstone (15/30/60/120s recorded with money-number trick on ShopKart GL)), ids h1–h5, group key "eng10", umbrella "eng", audio adds 2 model clips (si2 4-context intros, si5 finance intros) — shipped 2026-07-24, v25
- ✅ 🗣️ **Spoken English Fluency** — 5 modules (FL1–FL5; FL5 = finance fluent-money-talk spec + "Chai pe ShopKart" 3-minute unscripted capstone), ids f1–f5, group key "eng11", umbrella "eng", audio adds 2 model clips (fl3 conversations, fl5 chai finance explainer) — FULL DEPTH + easy language per user request — shipped 2026-07-24, v26
- ⏭️ Suggested next English courses (user's call): none pending — English umbrella COMPLETE at 11 courses unless user asks more (Basic → News → Vocabulary → Email → Grammar → Reading → GD → Interview → Pronunciation → Self-Intro → Fluency ✅)

## 🧮 Tier NEW — Aptitude umbrella — ✅ STARTED (user directive 2026-07-24: "start aptitude courses")

**NEW RULE (user, 2026-07-24): "don't use only 5 modules — whichever course demands how many modules for creating top level no.1 course, create that amount."** Aptitude courses size to the topic. Finance capstone module still mandatory per standing rule. Third umbrella key "apt" (🧮 Aptitude) added to UMBRELLA_META in v27.

- ✅ 🧮 **Averages** — 7 modules (AV1–AV7; AV7 = finance money-averages spec + ShopKart Average Report Card capstone), ids av1–av7, group key "avg", umbrella "apt" — shipped 2026-07-24, v27
- ✅ 🩸 **Blood Relations** — 6 modules (BR1–BR6; BR6 = finance family-money spec: HUF coparceners, nominee vs legal heir, intestate Class-I equal shares + ShopKart Family Tree Audit capstone), ids br1–br6, group key "blood", umbrella "apt", NO audio (aptitude convention) — shipped 2026-07-24, v28
- ✅ 📊 **Data Interpretation (Charts & Tables)** — 7 modules (DI1–DI7; DI7 = finance statements-as-DI spec: P&L table, budget-vs-actual variance, margin math + ShopKart Analyst DI Pack capstone), ids di1–di7, group key "di", umbrella "apt", NO audio. Consistent FY25 dataset across all modules: 5 stores + Online, quarters 58/65/76/81 = ₹2.8 cr, expense pie ties to GL net ₹6.7L @ 2.4% — shipped 2026-07-24, v29
- ✅ 💯 **Percentages** — 6 modules (PC1–PC6; PC6 = finance money-percentages spec: SI/CI as multipliers, recovery ladder in portfolios, discount economics (10% price cut = 34.5% of gross on 29%-margin ShopKart), GST flows, real returns + Price-War Audit capstone vs 15% quick-commerce rival: blanket 10% needs +52.6% units → SMART BUNDLE wins), ids pc1–pc6, group key "pct", umbrella "apt", NO audio — shipped 2026-07-24, v30
- ✅ 🧩 **Logical Reasoning Puzzles** — 7 modules (LR1–LR7; LR7 = finance money-logic spec: vendor-payment calendar w/ cash ceilings + DPO math, if-then credit-committee laws + Ops Puzzle Suite capstone), ids lr1–lr7, group key "lr", umbrella "apt", NO audio. Reusable cast: Arjun/Simran/Priya/Rohan/Deepa/Farhan/Gauri/Harish; solved canon: staff row 1-PR 2-RO 3-AJ 4-FH 5-HA 6-SI 7-GA 8-DP · 6-circle 1-SI 2-RO 3-AJ 4-FH 5-PR 6-DP · floors 1-DP 2-RO 3-SI 4-PR 5-FH 6-AJ 7-GA · roster Mon-PR Tue-GA Wed-RO Thu-FH Fri-AJ Sat-SI Sun-DP — shipped 2026-07-26, v31
- ⏭️ **Aptitude build queue** (user's order call): **Ratio & Proportion** (next) → **Profit & Loss** → **Simple & Compound Interest** → **Time & Work** → **Time, Speed & Distance** → **Number System** → **Permutations, Combinations & Probability** (+ reasoning extras on user's request)
- Suggested id prefixes: pct `pc1..pcN`, ratio `rt1..rtN` (check collisions: r1-r5 grammar sections! use `ra1..raN` instead), profit `pf1..pfN` (check p1-p5 power query! use `pl1..plN` instead — wait, no — p-l prefix unused ✓), interest `si1..siN` (unused ✓), work `tw1..twN` (unused ✓), speed `sd1..sdN` (unused ✓), numbers `ns1..nsN` (unused ✓), P&C `pp1..ppN` (unused ✓), DI `di1..diN` (unused ✓). Verify at build anyway.
- Structure: add more courses under `UMBRELLA_META` eng key — new GROUP_META entries with "eng" umbrella marker, new ENx_SECTIONS list (en2/en3 as list names), ids like g1..g6 (CHECK collisions first: e1-e6 taken)

## 🔁 Build procedure reminder (each course)

1. New markdown modules in folder (same structure: Objectives → concepts → LAB → Exercises+answers → Quiz+answers → Mastery checklist)
2. Roadmap rows in `00_START_HERE_Roadmap.md`
3. New builder version (copy latest `tools/build_app_vN.py`): SECTIONS list + ALL_SECTIONS + QUIZZES (3 Q/module) + `_nav_groups/_nav_counts` key + `_gcur` on first sid + GROUP_META entry (+ mega count auto-computes)
4. If NEW umbrella: wrap its tracks in a second `details.navmega` (pattern from build_app_v14)
5. Update hero paragraph count/stat numbers + cert text + track list wording
6. Build → structure checks → node --check → jsdom smoke (latest test file pattern /tmp/smoke_vN.js) → deploy to `PowerBI_Course_App.html` + version copy, delete previous version copy
7. present_file + summary table
