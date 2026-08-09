# Builds PowerBI_Course_App_v3.html — bulletproof edition.
# Navigation works with ZERO JavaScript (pure CSS :target); JS only enhances.
import base64, hashlib, html, json, os, re

BASE = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
OUT = os.path.join(BASE, "PowerBI_Course_App_v54.html")

SECTIONS = [
    ("00_START_HERE_Roadmap.md", "roadmap", "00 · Start Here — Roadmap", "🚀", "12-week plan & setup"),
    ("Module_01_Foundations.md", "m1", "01 · Foundations & First Report", "🏁", "Power BI tour + first report"),
    ("Module_02_Power_Query.md", "m2", "02 · Power Query", "🧹", "Clean any messy data"),
    ("Module_03_Data_Modeling.md", "m3", "03 · Data Modeling", "📐", "Star schemas that scale"),
    ("Module_04_DAX_Fundamentals.md", "m4", "04 · DAX Fundamentals", "∑", "Measures & KPIs"),
    ("Module_05_DAX_Advanced.md", "m5", "05 · DAX Mastery", "🔥", "CALCULATE & patterns"),
    ("Module_06_Visualization_Design.md", "m6", "06 · Visualization & Design", "🎨", "Dashboards that wow"),
    ("Module_07_Service_Sharing_Security.md", "m7", "07 · Service & Security", "☁️", "Publish, refresh, RLS"),
    ("Module_08_Performance_Enterprise.md", "m8", "08 · Performance & Enterprise", "⚡", "Speed & enterprise"),
    ("Module_09_Capstone_Projects.md", "m9", "09 · Capstone Projects", "🏆", "3 portfolio projects"),
    ("DAX_Cheat_Sheet.md", "cheat", "★ · DAX Cheat Sheet", "📌", "DAX at your fingertips"),
    ("Resources_Certification_Career.md", "res", "★ · Career & PL-300", "🎓", "Certification + interviews"),
]
EXCEL_SECTIONS = [
    ("Excel_01_Foundations.md", "x1", "E1 · Excel Foundations", "📗", "Interface, $ refs, formatting"),
    ("Excel_02_Formulas_Core_Functions.md", "x2", "E2 · Excel Formulas & Functions", "🧮", "IF, SUMIFS, XLOOKUP"),
    ("Excel_03_Data_Tools.md", "x3", "E3 · Excel Data Tools", "🧽", "Tables, text, validation"),
    ("Excel_04_Pivot_Charts_Analysis.md", "x4", "E4 · PivotTables & Charts", "📊", "Pivots, slicers, Goal Seek"),
    ("Excel_05_Advanced.md", "x5", "E5 · Excel Advanced", "🚀", "INDEX/MATCH, arrays, macros"),
]
PQ_SECTIONS = [
    ("PQ_01_Foundations.md", "p1", "P1 · PQ Foundations", "🧹", "Connect, types, applied steps"),
    ("PQ_02_Shaping_Combining.md", "p2", "P2 · Shaping & Combining", "🔗", "Joins, unpivot, folder combine"),
    ("PQ_03_M_Language.md", "p3", "P3 · M Language Mastery", "📜", "let/in, functions, parameters"),
    ("PQ_04_Pro_Enterprise.md", "p4", "P4 · PQ Pro & Enterprise", "🏗️", "Folding, APIs, dataflows"),
]
FIN_SECTIONS = [
    ("Module_10_Finance.md", "m10", "10 · Power BI for Finance", "💰", "P&L, variance, balance DAX"),
    ("Excel_06_Finance.md", "x6", "E6 · Excel for Finance", "💼", "PMT, NPV/IRR, modeling"),
    ("PQ_05_Finance.md", "p5", "P5 · PQ for Finance", "🏦", "TBs, fiscal years, FX, entities"),
]
SQL_SECTIONS = [
    ("SQL_01_Foundations.md", "s1", "S1 · SQL Foundations", "🗄️", "SELECT, WHERE, ORDER BY"),
    ("SQL_02_Joins_Aggregations.md", "s2", "S2 · Joins & Aggregations", "🧩", "GROUP BY, joins, HAVING"),
    ("SQL_03_Intermediate.md", "s3", "S3 · Intermediate SQL", "🪜", "CTEs, subqueries, windows"),
    ("SQL_04_Advanced.md", "s4", "S4 · Advanced SQL", "⚙️", "Views, indexes, plans, optimization"),
    ("SQL_05_Finance.md", "s5", "S5 · SQL for Finance", "💹", "GL, variance, fiscal, recon"),
]
TABLEAU_SECTIONS = [
    ("Tableau_01_Foundations.md", "t1", "T1 · Tableau Foundations", "🖼️", "Blue vs green, first views, publish"),
    ("Tableau_02_Charts_Visual_Analytics.md", "t2", "T2 · Charts & Visual Analytics", "📊", "10 views, maps, analytics pane"),
    ("Tableau_03_Calculations.md", "t3", "T3 · Calculations & Table Calcs", "🧮", "Calc fields, compute-using"),
    ("Tableau_04_Advanced.md", "t4", "T4 · LODs, Parameters & Sets", "⚡", "FIXED/INCLUDE/EXCLUDE"),
    ("Tableau_05_Dashboards_Stories_Sharing.md", "t5", "T5 · Dashboards, Stories & Sharing", "🧩", "Actions, layouts, publish"),
    ("Tableau_06_Finance.md", "t6", "T6 · Tableau for Finance", "💹", "P&L, variance, waterfall, FX"),
]
PYTHON_SECTIONS = [
    ("Python_01_Basics_for_Finance.md", "y1", "Py1 · Python Basics for Finance", "🐍", "Variables, loops, EMI by hand"),
    ("Python_02_Core_Tools.md", "y2", "Py2 · Functions, Dates & Files", "🧰", "def, datetime, CSV, amortization"),
    ("Python_03_Pandas_Foundations.md", "y3", "Py3 · Pandas Foundations", "🐼", "DataFrames, groupby, outer merge"),
    ("Python_04_Pandas_TimeSeries.md", "y4", "Py4 · Pandas Time-Series", "📈", "resample, shift, rolling, charts"),
    ("Python_05_Quant_Finance.md", "y5", "Py5 · Quant Finance", "🧮", "NumPy, NPV/IRR/XIRR, Monte Carlo"),
    ("Python_06_Finance_Capstone.md", "y6", "Py6 · Finance Capstone", "🏦", "Month-end close engine"),
]
STATS_SECTIONS = [
    ("Stats_01_Descriptive.md", "z1", "St1 · Descriptive Statistics", "📏", "Mean/median truth, CV, skew, outliers"),
    ("Stats_02_Probability_Distributions.md", "z2", "St2 · Probability & Distributions", "🎲", "E[X], Binomial/Poisson, Normal, CLT"),
    ("Stats_03_Hypothesis_Testing.md", "z3", "St3 · Hypothesis Testing", "🎯", "CIs, t-tests, chi-square"),
    ("Stats_04_Correlation_Regression.md", "z4", "St4 · Correlation & Regression", "📉", "r, OLS, residuals, beta"),
    ("Stats_05_TimeSeries.md", "z5", "St5 · Time-Series Statistics", "⏱️", "ACF, decomposition, forecasting"),
    ("Stats_06_Risk_Capstone.md", "z6", "St6 · Risk & Capstone", "🏆", "VaR/ES, bootstrap, portfolio"),
]
VIZ_SECTIONS = [
    ("Viz_01_Foundations.md", "v1", "DV1 · Foundations of Visual Thinking", "👁️", "Marks, channels, accuracy ladder"),
    ("Viz_02_Chart_Mastery.md", "v2", "DV2 · Chart Mastery", "🧱", "12 types: use, avoid, when they lie"),
    ("Viz_03_Design_Perception.md", "v3", "DV3 · Design & Perception", "🎨", "Palettes, type, ink economy"),
    ("Viz_04_Dashboard_Story.md", "v4", "DV4 · Dashboards & Stories", "🖥️", "Hierarchy, interaction, narrative arc"),
    ("Viz_05_Truth_Lies_Advanced.md", "v5", "DV5 · Truth, Lies & Advanced", "🕵️", "Manipulation museum, uncertainty viz"),
    ("Viz_06_Expert_Capstone.md", "v6", "DV6 · Expert & Capstone", "🎓", "Workflow, rubric, golden rules"),
]
TS_SECTIONS = [
    ("TS_01_Foundations.md", "w1", "TS1 · TS Foundations", "📈", "Components, ACF/PACF, stationarity"),
    ("TS_02_Smoothing_Decomposition.md", "w2", "TS2 · Smoothing & Decomposition", "🌊", "MA/EMA, STL, deseasonalized truth"),
    ("TS_03_Exponential_Smoothing.md", "w3", "TS3 · Exponential Smoothing", "⚗️", "SES→Holt→Winters, FORECAST.ETS"),
    ("TS_04_ARIMA_Dynamic_Regression.md", "w4", "TS4 · ARIMA & Dynamic Regression", "🤖", "p,d,q hunting, SARIMAX, Ljung-Box"),
    ("TS_05_Validation_Hierarchies.md", "w5", "TS5 · Validation & Hierarchies", "🧬", "Rolling origin, MASE, reconciliation"),
    ("TS_06_Finance_Forecasting_Capstone.md", "w6", "TS6 · Finance Forecasting Capstone", "🏅", "Band budget, cash-flow, council"),
]
EN1_SECTIONS = [
    ("English_Basic_01_Foundations.md", "e1", "BE1 · English Foundations", "🔤", "Letters, sounds, greetings, first words"),
    ("English_Basic_02_First_Grammar.md", "e2", "BE2 · First Grammar", "🧩", "Nouns, articles, am/is/are, S→V→O"),
    ("English_Basic_03_Everyday_English.md", "e3", "BE3 · Everyday English", "🛒", "Family, food, shopping, time, travel"),
    ("English_Basic_04_Past_Present_Future.md", "e4", "BE4 · Past, Present & Future", "🕰️", "Simple tenses + 30 irregulars"),
    ("English_Basic_05_Read_Listen_Write.md", "e5", "BE5 · Read, Listen & Write", "📖", "3-gear reading, shadowing, forms"),
    ("English_Basic_06_Speak_Graduation.md", "e6", "BE6 · Speak Up! Graduation", "🎤", "Pronunciation clinic, 60-sec speech"),
]
BNS_SECTIONS = [
    ("BNS_01_News_Foundations.md", "n1", "BN1 · Read & Understand News", "🗞️", "Article X-ray, headline code, 45 terms"),
    ("BNS_02_Speak_Summaries.md", "n2", "BN2 · Summaries & Opinions", "🎤", "3-sentence formula, attribution, smooth numbers"),
    ("BNS_03_Discuss_Debate.md", "n3", "BN3 · Discuss & Debate at Work", "💬", "Small talk, polite disagreement, GD moves"),
    ("BNS_04_Present_Like_Anchor.md", "n4", "BN4 · Present Like an Anchor", "🎬", "4-beat briefing, transitions, Q&A"),
    ("BNS_05_Finance_Markets_Speaking.md", "n5", "BN5 · FINANCE: Markets & Earnings", "💹", "Sensex/RBI talk, earnings anchor capstone"),
]
VOCAB_SECTIONS = [
    ("BV_01_Office_Word_Foundations.md", "b1", "BV1 · Office Word Foundations", "🏢", "Departments, people ladder, action verbs"),
    ("BV_02_Companies_Money.md", "b2", "BV2 · Companies & Money", "💰", "Pvt Ltd → unicorn, revenue vs profit, B2B/B2C"),
    ("BV_03_Meetings_Email.md", "b3", "BV3 · Meetings, Email & Desk Talk", "📧", "Agenda→minutes, CC/BCC, Indian-English fixes"),
    ("BV_04_Idioms_Collocations.md", "b4", "BV4 · Idioms & Collocations", "🗯️", "20 power idioms, make/do, confusables"),
    ("BV_05_Finance_Salary_Banking.md", "b5", "BV5 · FINANCE: Salary, Banking & Loans", "🏦", "CTC decode, EMI files, SIP kit"),
]
EMAIL_SECTIONS = [
    ("EW_01_Email_Foundations.md", "l1", "EM1 · Email Foundations", "✉️", "7-part skeleton, subject science, scan-format"),
    ("EW_02_Workplace_Emails.md", "l2", "EM2 · Workplace Email Templates", "📨", "Requests, status, scheduling, follow-ups, leave"),
    ("EW_03_Tone_Difficult.md", "l3", "EM3 · Tone & Difficult Emails", "🎚️", "Tone ladder, BLUF, no's, complaints 🎧"),
    ("EW_04_Professional_Advanced.md", "l4", "EM4 · Executive & Client Emails", "🖋️", "VP altitude, AIDA, job mails, threads"),
    ("EW_05_Finance_Money_Emails.md", "l5", "EM5 · FINANCE: Money Emails", "💸", "Invoices, reminder ladder, salary counters 🎧"),
]
GRAMMAR_SECTIONS = [
    ("GR_01_Grammar_Foundations.md", "r1", "GR1 · Sentence Core", "📝", "Agreement, do/does/did machine, 7 fossils"),
    ("GR_02_Tenses_Your_Story.md", "r2", "GR2 · Tenses: Tell Your Story", "⏳", "5-tense map, since/for, model intro 🎧"),
    ("GR_03_Question_Bank.md", "r3", "GR3 · Question Bank Grammar", "🎯", "STAR verbs, weakness frame, comparatives"),
    ("GR_04_Advanced_Polish.md", "r4", "GR4 · Advanced Polish", "✨", "Conditionals, articles, reported speech"),
    ("GR_05_Finance_HR_Round.md", "r5", "GR5 · FINANCE: HR & Finance Rounds", "🤝", "CTC grammar, number sentences, mock 🎧"),
]
READING_SECTIONS = [
    ("RP_01_Reading_Foundations.md", "d1", "RP1 · Reading Foundations", "📖", "Purpose-first, chunking, rescue moves 🎧"),
    ("RP_02_Everyday_Workplace.md", "d2", "RP2 · Workplace Documents", "🗂️", "Notices, emails, forms, fine print"),
    ("RP_03_Articles_Longform.md", "d3", "RP3 · Articles & Fact vs Opinion", "📰", "Anatomy, purpose, active-summary"),
    ("RP_04_Speed_Reports.md", "d4", "RP4 · Speed, RC & Reports", "⚡", "Pointer method, exam tricks, fast lane"),
    ("RP_05_Finance_Documents.md", "d5", "RP5 · FINANCE: Financial Documents", "📊", "Results, annual reports, RBI, DRHP 🎧"),
]
GD_SECTIONS = [
    ("GD_01_Foundations.md", "g1", "GD1 · GD Foundations & Scoring", "👥", "The 5-point scorecard, topic types, air-time math"),
    ("GD_02_Think_Structure.md", "g2", "GD2 · Think Fast & Structure", "🧩", "90-second explosion, PREP, hedged numbers"),
    ("GD_03_Speak_and_People.md", "g3", "GD3 · Speak & Play Well", "🤝", "Interruption ladder, build-on, leadership 🎧"),
    ("GD_04_Practice_Lab.md", "g4", "GD4 · The Practice Gym", "🏋️", "10 topics + point banks, rubric, solo mocks"),
    ("GD_05_Finance_Topics.md", "g5", "GD5 · FINANCE: Money GDs + Capstone", "💹", "4-beat analyst talk, 8-min panel capstone 🎧"),
]
IC_SECTIONS = [
    ("IC_01_Interview_Foundations.md", "i1", "IC1 · Interview Foundations", "🎤", "Signal-not-knowledge, 6 formats, first 90 seconds"),
    ("IC_02_Answer_Frameworks.md", "i2", "IC2 · Answer Frameworks", "🧠", "60-sec intro, STAR bank, salary ladder 🎧"),
    ("IC_03_Thinking_Under_Fire.md", "i3", "IC3 · Thinking Under Fire", "🔥", "Bought-time lines, guesstimates, stress protocols"),
    ("IC_04_Mock_Interview_Lab.md", "i4", "IC4 · The Mock Interview Lab", "🎬", "24-question bank, mock protocol, 3-pass rubric"),
    ("IC_05_Finance_Rounds.md", "i5", "IC5 · FINANCE: Finance Rounds + Mock", "💼", "GL star story, 6 classics, 10-Q capstone 🎧"),
]
PRON_SECTIONS = [
    ("PR_01_Sound_Foundations.md", "a1", "PR1 · Sound Foundations", "👂", "44 sounds, 6 trouble sounds, minimal pairs 🎧"),
    ("PR_02_Word_Stress.md", "a2", "PR2 · Word Stress & Your World", "🔤", "80/20 rules, fossil hitlist, -ed endings 🎧"),
    ("PR_03_Rhythm_Intonation.md", "a3", "PR3 · Rhythm & Intonation", "🎵", "Sentence stress, golden pause, 3 tones 🎧"),
    ("PR_04_Recording_Lab.md", "a4", "PR4 · The Voice Recording Lab", "🎙️", "Zero-budget studio, 3-take method, rubric"),
    ("PR_05_Finance_Money_Talk.md", "a5", "PR5 · FINANCE: Money-Talk + Readout", "💰", "Finance words, R-S-L, earnings capstone 🎧"),
]
SI_SECTIONS = [
    ("SI_01_Intro_Foundations.md", "h1", "SI1 · Intro Foundations", "👋", "3 jobs, 5 rooms, O·R·P·H skeleton, 4 time tiers"),
    ("SI_02_Build_Your_Story.md", "h2", "SI2 · Build Your Story", "📖", "Inventory grid, 3-number rule, fun card 🎧"),
    ("SI_03_Delivery_Presence.md", "h3", "SI3 · Delivery & Presence", "🎭", "Pace ladder, name-drop pause, nerves protocol"),
    ("SI_04_Practice_Gym.md", "h4", "SI4 · The Practice Gym", "🏋️", "10 scenarios, weekly workout, intro rubric"),
    ("SI_05_Finance_Analyst_Intro.md", "h5", "SI5 · FINANCE: Analyst Intro Suite", "💼", "Money-number trick, 4-variant capstone 🎧"),
]
FL_SECTIONS = [
    ("FL_01_Fluency_Foundations.md", "f1", "FL1 · Fluency Foundations", "🗣️", "Flow+Comfort first, think-in-English ladder, baseline"),
    ("FL_02_Chunks_Connectors.md", "f2", "FL2 · Chunks & Connectors", "🧩", "60-chunk pack, glue rules, word-rescue kit"),
    ("FL_03_Conversation_Engine.md", "f3", "FL3 · The Conversation Engine", "💬", "FORD small talk, ping-pong, story spine 🎧"),
    ("FL_04_Fluency_Gym.md", "f4", "FL4 · The Fluency Gym", "🏋️", "4-3-2 drill, shadowing, 30-day plan + tracker"),
    ("FL_05_Finance_Fluent_Money_Talk.md", "f5", "FL5 · FINANCE: Fluent Money Talk", "💼", "Jargon translator, impromptu frame, chai capstone 🎧"),
]
AVG_SECTIONS = [
    ("AVG_01_Average_Foundations.md", "av1", "AV1 · Average Foundations", "⚖️", "Equal share, formula trio, balance-point secret"),
    ("AVG_02_Series_Averages.md", "av2", "AV2 · Series Averages", "🔢", "Middle-token trick, n(n+1) table, sum-backwards"),
    ("AVG_03_Group_Change.md", "av3", "AV3 · The Group-Change Engine", "🔄", "Members in/out/replaced, merged groups"),
    ("AVG_04_Weighted_Shortcuts.md", "av4", "AV4 · Weighted & Speed Shortcuts", "🎯", "Assumed-mean method, deviation shift, line trick"),
    ("AVG_05_Exam_Classics.md", "av5", "AV5 · The Exam Classics", "🏏", "Ages, cricket incl. not-out, speed, corrections"),
    ("AVG_06_Traps_Speed_Mock.md", "av6", "AV6 · Traps & The Mock Arena", "⚡", "5 traps vaccinated, elimination, 10-Q timed mock"),
    ("AVG_07_Finance_Use_Cases.md", "av7", "AV7 · FINANCE: Money Averages", "💰", "Moving averages, CAGR trap, Report Card capstone"),
]
BR_SECTIONS = [
    ("BR_01_Blood_Relations_Foundations.md", "br1", "BR1 · Tree Thinking Foundations", "🌳", "4-symbol pen kit, generation staircase, 20-word lexicon"),
    ("BR_02_Statement_Chains_Photo_Point.md", "br2", "BR2 · Statement Chains & Photo Point", "🧭", "Chain→Tree→Trace, anchor trick, quote-splitting method"),
    ("BR_03_Coded_Relations.md", "br3", "BR3 · Coded Blood Relations", "🔐", "Decode tables, expression chains, reverse-build questions"),
    ("BR_04_Family_Puzzles.md", "br4", "BR4 · Family Puzzles & Data Sufficiency", "🧩", "3-pass blueprint, counting Qs, minimum members, DS audit"),
    ("BR_05_Traps_Speed_Mock.md", "br5", "BR5 · Traps, Speed & Mock Arena", "⚡", "5 named traps, elimination kit, 10-Q timed mock"),
    ("BR_06_Finance_Family_Money.md", "br6", "BR6 · FINANCE: Family, Money & Blood", "💼", "HUF, nominee vs heir, wills — Family Tree Audit capstone"),
]
DI_SECTIONS = [
    ("DI_01_Foundations_Math_Engine.md", "di1", "DI1 · DI Foundations & Math Engine", "🧭", "4-step routine, % engine, fraction table, approximation law"),
    ("DI_02_Tables_Mastery.md", "di2", "DI2 · Tables Mastery", "📋", "T-trace, totals-first, missing cells, cross-tab %"),
    ("DI_03_Bar_Charts.md", "di3", "DI3 · Bar Charts", "📊", "Clustered/stacked bars, gridline math, axis lies"),
    ("DI_04_Line_Charts.md", "di4", "DI4 · Line Charts", "📈", "Slope honesty, crossovers, double-axis trap"),
    ("DI_05_Pie_Charts.md", "di5", "DI5 · Pie Charts", "🥧", "Degrees↔%↔value, multi-pie rules, expense-pie story"),
    ("DI_06_Caselets_Traps_Mock.md", "di6", "DI6 · Caselets, Traps & Mock Arena", "🏟️", "Tabulate-first law, 5 DI traps, 10-Q mock"),
    ("DI_07_Finance_Statements_Capstone.md", "di7", "DI7 · FINANCE: Statements DI + Capstone", "💼", "P&L as DI, budget variance, Analyst DI Pack"),
]
PC_SECTIONS = [
    ("PC_01_Percent_Foundations.md", "pc1", "PC1 · Percent Foundations", "💯", "Per-100 meaning, base rule, conversions, mirror trick"),
    ("PC_02_Change_Reverse.md", "pc2", "PC2 · Change & The Reverse", "🔁", "%-change formula, ÷-multiplier reverse, recovery ladder"),
    ("PC_03_Successive_Chains.md", "pc3", "PC3 · Successive Changes & Chains", "⛓️", "a+b+ab/100, growth/decay chains, net-zero paradoxes"),
    ("PC_04_Comparison_Classics.md", "pc4", "PC4 · Comparison & Applied Classics", "⚖️", "More-vs-less flip, elections, consumption-cut rule"),
    ("PC_05_Traps_Speed_Mock.md", "pc5", "PC5 · Traps, Speed & Mock Arena", "⚡", "Fraction kit, 5 traps, 10-Q timed mock"),
    ("PC_06_Finance_Money_Percent.md", "pc6", "PC6 · FINANCE: Money Percentages", "💼", "SI/CI multipliers, discount economics, Price-War capstone"),
]
LR_SECTIONS = [
    ("LR_01_Puzzle_Method.md", "lr1", "LR1 · The Puzzle Method", "🧩", "4 clue types, Frame-Load-Chain-Verify, most-constrained first"),
    ("LR_02_Linear_Seating.md", "lr2", "LR2 · Linear Seating", "🪑", "Row batteries, facing flips, 8-person walkthrough"),
    ("LR_03_Circular_Square.md", "lr3", "LR3 · Circular & Square Seating", "⚫", "Center-facing law, opposite math, corners vs edges"),
    ("LR_04_Floors_Boxes_Ordering.md", "lr4", "LR4 · Floors, Boxes & Ordering", "🏢", "Vertical batteries, midpoint trick, comparison chains"),
    ("LR_05_Scheduling_Selection_Grids.md", "lr5", "LR5 · Scheduling, Selection & Grids", "📅", "Day batteries, if-then laws, elimination grids"),
    ("LR_06_Traps_Triage_Mock.md", "lr6", "LR6 · Traps, Triage & Mock Arena", "⚡", "5 LR traps, 30-s triage, 10-Q timed mock"),
    ("LR_07_Finance_Money_Logic.md", "lr7", "LR7 · FINANCE: Logic of Money Decisions", "💼", "Payment calendar, credit committee, Ops capstone"),
]
NS_SECTIONS = [
    ("NS_01_Difference_Machine.md", "ns1", "NS1 · The Difference Machine", "🏭", "1st/2nd differences, AP laws, the universal attack"),
    ("NS_02_Ratios_Powers_TwoStep.md", "ns2", "NS2 · Ratios, Powers & Two-Step Ops", "🚀", "GP ratios, ratio ladders, x*n±k, squares/cubes wardrobe"),
    ("NS_03_Twins_Primes_Addition.md", "ns3", "NS3 · Twins, Primes & Addition", "🧬", "Odd/even splits, op-ladders, primes, Fibonacci"),
    ("NS_04_Wrong_Missing_Hard.md", "ns4", "NS4 · Wrong-Term Detective", "🕵️", "Dirty-pair forensics, missing middles, position-ops"),
    ("NS_05_Traps_Radar_Mock.md", "ns5", "NS5 · Traps, Radar & Mock Arena", "⚡", "5 named traps, 7-gate radar, 10-Q timed mock"),
    ("NS_06_Finance_Money_Series.md", "ns6", "NS6 · FINANCE: Money Series + Capstone", "💼", "CI as GP, SIP ladders, EMI braid, Detective Report"),
]
PP_SECTIONS = [
    ("PP_01_Two_Rules_of_Counting.md", "pp1", "PP1 · The Two Rules of Counting", "\U0001F9F1", "AND->x, OR->+, factorial ladder, PIN math"),
    ("PP_02_Permutations_Arrangements.md", "pp2", "PP2 · Permutations: Order Rules", "\U0001F3C5", "nPr slot-product, factorial words, repeats n!/p!q!"),
    ("PP_03_Combinations_Selections.md", "pp3", "PP3 · Combinations: Just Pick", "\U0001F5F3\uFE0F", "nCr = nPr/r!, mirror law, committees, COMBIN"),
    ("PP_04_Restrictions_Circles.md", "pp4", "PP4 · Restrictions & Circles", "\U0001F6A7", "Together/apart blocks, gap method, (n-1)!, beads"),
    ("PP_05_Digits_AtLeast_Ranking.md", "pp5", "PP5 · Digits, At-Least & Ranking", "\U0001F522", "Zero-first trap, 2^n-1 subsets, word rank, !n cameo"),
    ("PP_06_Traps_Triage_Mock.md", "pp6", "PP6 · Traps, Triage & Mock Arena", "\u26A1", "5 named traps, 7-gate radar, 10-Q timed mock"),
    ("PP_07_Finance_Counting_Capstone.md", "pp7", "PP7 · FINANCE: Counting + Capstone", "\U0001F4BC", "Audit sampling, coupon codes, portfolios, Spin & Win pack"),
]
PB_SECTIONS = [
    ("PB_01_Probability_Foundations.md", "pb1", "PB1 · Probability Foundations", "\U0001F3AF", "P = favorable/total, dice grids, deck anatomy, raffles"),
    ("PB_02_OR_Rules_Addition.md", "pb2", "PB2 · OR Rules: Addition", "\u2795", "Exclusive adds, inclusion-exclusion, complement 1-P"),
    ("PB_03_AND_Rules_Multiplication.md", "pb3", "PB3 · AND Rules: Multiplication", "\u2716\uFE0F", "Independent vs without-replacement starvation"),
    ("PB_04_Conditional_Bayes.md", "pb4", "PB4 · Conditional & Bayes", "\U0001F575\uFE0F", "P(A|B), universe-shrinking, base-rate fraud reveal"),
    ("PB_05_Counting_Power_Ups.md", "pb5", "PB5 · Counting Power-Ups", "\U0001F309", "nCr engines, at-least-one counters, odds language"),
    ("PB_06_Traps_Triage_Mock.md", "pb6", "PB6 · Traps, Triage & Mock Arena", "\u26A1", "5 named traps, 7-step scan, 10-Q timed mock"),
    ("PB_07_Finance_Probability_Capstone.md", "pb7", "PB7 · FINANCE: Probability + Capstone", "\U0001F4BC", "EV pricing, expected loss, fraud Bayes, Risk & Rupees Deck"),
]
PL_SECTIONS = [
    ("PL_01_PL_Foundations.md", "pl1", "PL1 · P&L Foundations", "\U0001F4B0", "CP/SP, the Base Law, multipliers, margin vs markup"),
    ("PL_02_Reverses_Twin_Sales.md", "pl2", "PL2 · Reverses & Twin Sales", "\U0001F519", "Loss-world reverses, same-SP theorem, SP-quoted profits"),
    ("PL_03_Marked_Price_Discounts.md", "pl3", "PL3 · Marked Price & Discounts", "\U0001F3F7\uFE0F", "CP-MP-SP chains, stack math, markup-for-wiggle"),
    ("PL_04_Smart_Seller_Scenarios.md", "pl4", "PL4 · Smart-Seller Scenarios", "\u2696\uFE0F", "False weights, spiked milk, free offers, alligation"),
    ("PL_05_Exam_Classics.md", "pl5", "PL5 · The Exam Classics", "\U0001F393", "Triple-profit train, midpoint law, chains, cloth riddle"),
    ("PL_06_Traps_Triage_Mock.md", "pl6", "PL6 · Traps, Triage & Mock Arena", "\u26A1", "5 named traps, 6-gate radar, 10-Q timed mock"),
    ("PL_07_Finance_Margin_Economics.md", "pl7", "PL7 · FINANCE: Margin Economics + Capstone", "\U0001F4BC", "Margin elasticity, floor law, early-pay yields, Defense Pack"),
]
RA_SECTIONS = [
    ("RA_01_Ratio_Foundations.md", "ra1", "RA1 · Ratio Foundations", "\u2696\uFE0F", "Term-vs-whole, equal-parts splits, chaining, duplicate laws"),
    ("RA_02_Proportion_k_Constant.md", "ra2", "RA2 · Proportion & the k-Constant", "\u2797", "ad = bc, fourth/mean proportional, k-method riddles"),
    ("RA_03_Partnerships.md", "ra3", "RA3 · Partnerships", "\U0001F91D", "Capital x time, mid-year joining, compensation ladder"),
    ("RA_04_Mixtures_Alligation.md", "ra4", "RA4 · Mixtures & Alligation", "\U0001F95B", "Inverse-distances cross, replacement law, vessel marriages"),
    ("RA_05_Traps_Triage_Mock.md", "ra5", "RA5 · Traps, Triage & Mock Arena", "\u26A1", "5 named traps, 5-gate radar, 10-Q timed mock"),
    ("RA_06_Finance_Equity_Capstone.md", "ra6", "RA6 · FINANCE: Ratios in Money + Capstone", "\U0001F4BC", "Deed layers, ROCE, D/E, Expansion Equity Pack"),
]

INT_SECTIONS = [
    ("INT_01_Simple_Interest_Engine.md", "si1", "INT1 · The Simple Interest Engine", "\U0001F3E6", "SI = PRT/100, reverse gears, credit stacks, engine-ID"),
    ("INT_02_Compound_Engine.md", "si2", "INT2 · The Compound Engine", "\U0001F9E8", "1.1-ladder, jewel formula CI-SI = P(r/100)^2, autopsy"),
    ("INT_03_Frequencies_Fractions_72.md", "si3", "INT3 · Frequencies, Fractions & 72", "\U0001F4C6", "gear-shifts, hybrid tails, 72 club, depreciation mirror"),
    ("INT_04_Installments_Classics.md", "si4", "INT4 · Installments & Time Classics", "\U0001F4B3", "discounting PV, roll-forward audit, R.T = 100(k-1), k-fold chains"),
    ("INT_05_Traps_Triage_Mock.md", "si5", "INT5 · Traps, Triage & Mock Arena", "\u26A1", "5 named traps, 5-gate radar, INT-01 arena"),
    ("INT_06_Finance_Treasury_Capstone.md", "si6", "INT6 · FINANCE: Treasury & Debt + Capstone", "\U0001F4BC", "FD ladders, 42.6% unmask, EMI braid, Treasury Memo"),
]

SY_SECTIONS = [
    ("SY_01_Statements_Golden_Law.md", "sy1", "SY1 · Statements, AEIO & the Golden Law", "\U0001F517", "A/E/I/O forms, only-flips, statements-as-gospel"),
    ("SY_02_Circle_Method_All_No.md", "sy2", "SY2 · The Circle Method", "\u2B55", "nested/separated circles, chains, conversion table"),
    ("SY_03_Some_Particulars_Chains.md", "sy3", "SY3 · Some & the Particulars", "\U0001F3B2", "I/O pictures, A+I escort chain, two-particulars poverty"),
    ("SY_04_Possibility_Either_Or.md", "sy4", "SY4 · Possibility & Either-Or", "\U0001F500", "possibility court, complementary pairs, three gates"),
    ("SY_05_Traps_Triage_Mock.md", "sy5", "SY5 · Traps, Triage & Mock Arena", "\u26A1", "5 named traps, 5-gate radar, SY-01 arena"),
    ("SY_06_Finance_Compliance_Capstone.md", "sy6", "SY6 · FINANCE: Compliance Logic + Capstone", "\U0001F4CB", "rule registers, verdicts, Policy-Logic Audit"),
]

TSD_SECTIONS = [
    ("TSD_01_Speed_Engine_Units.md", "sd1", "TSD1 · The Speed Engine & Unit Wars", "\U0001F684", "D = S x T, x5/18 bridge, late-man inverse flips, promise radius"),
    ("TSD_02_Average_Speed_Harmonic.md", "sd2", "TSD2 · Average Speed — The Harmonic Reality", "\u2696\uFE0F", "2xy/(x+y), distance vs time equal legs, layover parasite"),
    ("TSD_03_Trains_Relative_Speed.md", "sd3", "TSD3 · Trains & Relative Speed", "\U0001F686", "length law, platforms, opposite-add/same-subtract"),
    ("TSD_04_Boats_Streams.md", "sd4", "TSD4 · Boats & Streams", "\U0001F6A4", "x +/- w gears, back-solve halves, round-trip current tax"),
    ("TSD_05_Races_Circular_Tracks.md", "sd5", "TSD5 · Races & Circular Tracks", "\U0001F3DF", "margin ratios, head starts, relative-length meets, LCM law"),
    ("TSD_06_Traps_Triage_Mock.md", "sd6", "TSD6 · Traps, Triage & Mock Arena", "\u26A1", "5 named traps, 5-gate radar, TSD-01 arena"),
    ("TSD_07_Finance_Fleet_Costing_Capstone.md", "sd7", "TSD7 · FINANCE: Fleet Costing + Capstone", "\U0001F4B8", "Rs 4/km + Rs 150/h tariff, batching dividend, fleet sheet"),
]

TW_SECTIONS = [
    ("TW_01_Rate_Engine_LCM.md", "tw1", "TW1 · The Rate Engine — LCM Units & Man-Days", "\u23F1\uFE0F", "1/n flips, LCM tank, M1D1 = M2D2 invariant"),
    ("TW_02_Efficiency_Wages.md", "tw2", "TW2 · Efficiency & Wages", "\U0001F4B0", "flow ratios, inverse days, pay-by-work-done splits"),
    ("TW_03_Alternates_Leavers_Joiners.md", "tw3", "TW3 · Alternates, Leavers & Joiners", "\U0001F501", "cycle + day-walk, two stopwatches, bank-then-price"),
    ("TW_04_Pipes_Cisterns_Leaks.md", "tw4", "TW4 · Pipes, Cisterns & Leaks", "\U0001F527", "signed flows, net-flow fill times, leak autopsy"),
    ("TW_05_Traps_Triage_Mock.md", "tw5", "TW5 · Traps, Triage & Mock Arena", "\u26A1", "5 named traps, 5-gate radar, TW-01 arena"),
    ("TW_06_Finance_Staffing_Capstone.md", "tw6", "TW6 · FINANCE: Festive Staffing Pack + Capstone", "\U0001F4CB", "crew-vs-penalty corner, biller rosters, staffing pack"),
]

AC_SECTIONS = [
    ("AC_01_Double_Entry_DNA.md", "ac1", "AC1 · Double-Entry DNA", "\U0001F4D2", "equation, debit=credit grammar, journals, T-accounts, TB"),
    ("AC_02_Accounting_Cycle_Accruals.md", "ac2", "AC2 · The Cycle & Accrual Religion", "\U0001F504", "cash vs accrual, adjustments, closing, matching"),
    ("AC_03_Income_Statement_Engineering.md", "ac3", "AC3 · Income Statement Engineering", "\U0001F4C8", "revenue-to-PAT ladder, EBITDA vs EBIT vs PBT, EPS"),
    ("AC_04_Balance_Sheet_Architecture.md", "ac4", "AC4 · Balance Sheet Architecture", "\U0001F3DB\uFE0F", "anatomy, working capital, articulation via RE"),
    ("AC_05_Cash_Flow_Mastery.md", "ac5", "AC5 · Cash Flow Statement Mastery", "\U0001F4A7", "direct vs indirect, CFO/CFI/CFF, 3-statement knot"),
    ("AC_06_Revenue_Receivables_Provisions.md", "ac6", "AC6 · Revenue, Receivables & Provisions", "\U0001F9FE", "Ind AS 115 five steps, aging & ECL, early-pay 37.2%"),
    ("AC_07_Inventory_COGS_Economics.md", "ac7", "AC7 · Inventory & COGS Economics", "\U0001F4E6", "FIFO vs WAC, NRV, shrinkage, inventory days & GMROI"),
    ("AC_08_Fixed_Assets_Depreciation_Capex.md", "ac8", "AC8 · Fixed Assets, Depreciation & Capex", "\U0001F69A", "capitalize vs expense, SLM vs WDV, impairment, disposals"),
    ("AC_09_Liabilities_Provisions_Equity.md", "ac9", "AC9 · Liabilities, Provisions & Equity", "\u2696\uFE0F", "debt vs equity, provision triad, dividends & buybacks"),
    ("AC_10_Capstone_Forensics_Interview_Forge.md", "ac10", "AC10 · CAPSTONE: Books-to-Board & Forensics", "\U0001F3C6", "JE-to-TB sprint, QoE red flags, interview forge"),
]

CF_SECTIONS = [
    ("CF_01_CFO_Decision_Engine.md", "cf1", "CF1 · The CFO's Decision Engine", "\U0001F3E6", "goal of firm, 3 drawers, spread & EVA, agency war"),
    ("CF_02_Cost_of_Capital.md", "cf2", "CF2 · Cost of Capital: WACC From Zero", "\U0001F4B2", "CAPM Ke 13.6%, shielded Kd 9.1%, canon WACC 12.6%"),
    ("CF_03_Capital_Structure.md", "cf3", "CF3 · Capital Structure", "\U0001F9E9", "MM pizza, VL = VU + tD, distress costs, pecking order"),
    ("CF_04_Leverage_Amplifiers.md", "cf4", "CF4 · Leverage Amplifiers", "\U0001F4D0", "DOL 4.06 x DFL 1.13 = 4.59, BE Rs 211L, MOS 24.6%"),
    ("CF_05_Dividend_Doctrine.md", "cf5", "CF5 · Dividend Doctrine", "\U0001F4B8", "residual payout, ex-date physics, buyback optics, bonus fog"),
    ("CF_06_Working_Capital_Treasury.md", "cf6", "CF6 · Working Capital Treasury", "\U0001F3EA", "CCC 74 days priced, EOQ 980, terms table, 13-week rule"),
    ("CF_07_Valuation_Front_Door.md", "cf7", "CF7 · Valuation Front Door", "\U0001F48E", "DCF EV Rs 194L to Rs 37.4/share, TV gravity, multiples"),
    ("CF_08_Capstone_CFO_War_Room.md", "cf8", "CF8 · CAPSTONE: CFO War Room", "\U0001F3C6", "3-project triage, Rs 28L funding stack, covenant math"),
]

BF_SECTIONS = [
    ("BF_01_Two_Systems_One_Investor.md", "bf1", "BF1 · Two Systems, One Investor", "\U0001F9E0", "S1/S2, heuristics engine, Mr Market, process > personality"),
    ("BF_02_Bias_Hall_I.md", "bf2", "BF2 · Bias Hall of Fame I", "\U0001F3AD", "overconfidence (SEBI 9/10!), anchoring, echo chambers"),
    ("BF_03_Bias_Hall_II.md", "bf3", "BF3 · Bias Hall of Fame II", "\U0001F3A2", "loss aversion 2.25x, prospect curve, framing, jars"),
    ("BF_04_Herds_Bubbles_Anomalies.md", "bf4", "BF4 · Herds, Bubbles & Anomalies", "\U0001F388", "5-stage mania anatomy, drawdown math, anomaly zoo"),
    ("BF_05_Self_Mastery_Playbook.md", "bf5", "BF5 · Self-Mastery Playbook", "\U0001F6E1\uFE0F", "7-gate checklist, cooling periods, journal, caps law"),
    ("BF_06_Capstone_Behavioral_Audit.md", "bf6", "BF6 · CAPSTONE: The Behavioral Audit", "\U0001F3C6", "12-trade autopsy, IPS one-pager, interview forge"),
]

DV_SECTIONS = [
    ("DV_01_Derivatives_101.md", "dv1", "DV1 · Derivatives 101 — Four Families", "\U0001F4C9", "underlyings, notional, hedger/spec/arb, leverage & MTM"),
    ("DV_02_Forwards_Futures_Mechanics.md", "dv2", "DV2 · Forwards & Futures Mechanics", "\u2699\uFE0F", "cost-of-carry pricing, margins, basis & convergence"),
    ("DV_03_Hedging_With_Futures.md", "dv3", "DV3 · Hedging with Futures", "\U0001F6E1\uFE0F", "wheat desk Rs 1L saved, basis risk, h* ratios, audit"),
    ("DV_04_Options_Anatomy.md", "dv4", "DV4 · Options Anatomy", "\U0001F3AF", "calls/puts, capped-vs-unbounded, payoffs, intrinsic+time"),
    ("DV_05_Option_Strategies.md", "dv5", "DV5 · Option Strategies", "\U0001F9E9", "protective put, covered call, spreads, straddles, IV crush"),
    ("DV_06_Option_Pricing_Greeks.md", "dv6", "DV6 · Option Pricing & The Greeks", "\U0001F9EE", "parity Rs 2.91, binomial Rs 13.64, BSM dials, delta to rho"),
    ("DV_07_Swaps_Risk_Machinery.md", "dv7", "DV7 · Swaps & Risk Machinery", "\U0001F504", "float-to-fixed 10.5%, FX locks, notional-vs-exposure, CCP"),
    ("DV_08_Capstone_Risk_Desk.md", "dv8", "DV8 · CAPSTONE: The Risk Desk", "\U0001F3C6", "festival hedge book, margin protocol, board memo, forge"),
]

FA_SECTIONS = [
    ("FA_01_Analysts_Lens.md", "fa1", "FA1 · The Analyst's Lens", "\U0001F50D", "lethal reading order, audit opinions, confessional pages"),
    ("FA_02_Common_Size_Trend.md", "fa2", "FA2 · Common-Size & Trend Autopsies", "\U0001F4D0", "verticals, divergence signature, margin walk, bridges"),
    ("FA_03_Ratios_Liquidity_Solvency.md", "fa3", "FA3 · Ratio Engine I: Liquidity & Solvency", "\U0001F4A7", "CR 2.06 vs quick 1.00, coverage 8.7x, covenant math"),
    ("FA_04_Ratios_Profitability_Efficiency.md", "fa4", "FA4 · Ratio Engine II: Profitability & Efficiency", "\u2699\uFE0F", "DuPont 22.8% = 4.73 x 2.69 x 1.79, ROCE vs ROE, traps"),
    ("FA_05_Earnings_Quality_Forensics.md", "fa5", "FA5 · Earnings Quality & Forensics", "\U0001F50E", "accruals -3.6%, Beneish M -2.31, Satyam screens, panels"),
    ("FA_06_Credit_Banker_Lens.md", "fa6", "FA6 · The Credit & Banker Lens", "\U0001F3E6", "DSCR 5.8x, two ledgers, drawing power, bank reverse-read"),
    ("FA_07_Capstone_Full_Autopsy.md", "fa7", "FA7 · CAPSTONE: The Full Company Autopsy", "\U0001F3C6", "ShopKart one-pager, FruitCart 7-flag courtroom, duel verdicts"),
]

FI_SECTIONS = [
    ("FI_01_Bond_Anatomy.md", "fi1", "FI1 · Bond Anatomy", "\U0001F9EC", "FV/coupon/YTM, accrued 29.84 vs 30.00, clean vs dirty, tribes"),
    ("FI_02_Price_Yield_Seesaw.md", "fi2", "FI2 · The Price-Yield See-Saw", "\U0001F3A2", "canon table 1000/961.10/1084.25, asymmetry, RBI chain"),
    ("FI_03_Duration_Convexity.md", "fi3", "FI3 · Duration & Convexity", "\U0001F4CF", "MacD 4.312, ModD 3.993, conv 21.05, pred 961.13"),
    ("FI_04_Yield_Curve_RBI.md", "fi4", "FI4 · Yield Curve & the Central Bank", "\U0001F4C8", "shapes, forwards 8.1%, term premium, roll-down, NIM"),
    ("FI_05_GSec_Deep_Dive.md", "fi5", "FI5 · Government Securities Deep Dive", "\U0001F3DB\uFE0F", "T-bill 98.40 to 6.52%, auctions, Retail Direct, 3 risks"),
    ("FI_06_Corporate_Bonds_Spreads.md", "fi6", "FI6 · Corporate Bonds & Credit Spreads", "\U0001F4B3", "spread ladder, twin engines, 25-year default ledger"),
    ("FI_07_Portfolio_Engineering.md", "fi7", "FI7 · Bond Portfolio Engineering", "\U0001F3D7\uFE0F", "ladders, barbells, immunization Rs 40L lock, ModD dial"),
    ("FI_08_Capstone_Bond_Desk.md", "fi8", "FI8 · CAPSTONE: The Bond Desk", "\U0001F3C6", "Rs 50L book, YTM 7.524%, ModD 5.218, two storms, forge"),
]

IN2_SECTIONS = [
    ("IN2_01_Market_Machine.md", "in21", "IN2 1 · The Market Machine", "\u2699\uFE0F", "order to demat, CCP novation, T+1, order types, circuits"),
    ("IN2_02_SEBI_Rulebook.md", "in22", "IN2 2 · SEBI & the Rulebook", "\u2696\uFE0F", "1992 origin, UPSI presumption, SAT/SCORES, F&O guardrails"),
    ("IN2_03_Indices_Money_Flows.md", "in23", "IN2 3 · Indices & the Money Flows", "\U0001F4CA", "divisor doctrine, Sensex 800x, SIP Rs 25k Cr bid, tribes"),
    ("IN2_04_IPOs_Listings.md", "in24", "IN2 4 · IPOs & Listings", "\U0001F4DC", "DRHP drill, quotas, anchors, OFS 90%, pop discipline"),
    ("IN2_05_Taxes_Cost_Stack.md", "in25", "IN2 5 · Taxes & the Cost Stack", "\U0001F4B8", "STCG 20% / LTCG 12.5%, note Rs 1,50,202.47, set-offs"),
    ("IN2_06_Retail_Playbook.md", "in26", "IN2 6 · The Retail Playbook", "\U0001F9ED", "drag Rs 15.84L, SIP step-ups, ladder, scam checklist"),
    ("IN2_07_Capstone_India_Desk.md", "in27", "IN2 7 · CAPSTONE: The India Desk", "\U0001F3C6", "Priya desk: 70/25/5 engine, note audit, IPS signed, forge"),
]

EC_SECTIONS = [
    ("EC_01_Micro_Foundations.md", "ec1", "EC1 · Micro Foundations", "\u2696\uFE0F", "opportunity cost, margins, elasticity 0.8, pricing power"),
    ("EC_02_Market_Structures.md", "ec2", "EC2 · Market Structures & the Firm", "\u265F\uFE0F", "MR=MC, DWL Rs 800, oligopoly chess, Jio dilemma"),
    ("EC_03_Macro_Scoreboard.md", "ec3", "EC3 · The Macro Scoreboard", "\U0001F4CA", "GDP 3 ways, real 6.5, CPI vs WPI, jobs triangle"),
    ("EC_04_Money_Banking_Inflation.md", "ec4", "EC4 · Money, Banking & Inflation", "\U0001F4B5", "multiplier 20x, RBI toolkit, engine diagnosis, half-lives"),
    ("EC_05_Fiscal_Policy_Budget.md", "ec5", "EC5 · Fiscal Policy & the Budget", "\U0001F3DB\uFE0F", "4 deficits, multiplier 2x, crowding out, g-r test"),
    ("EC_06_External_Sector_Rupee.md", "ec6", "EC6 · External Sector & the Rupee", "\U0001F4B1", "BoP, CAD -2%, REER, reserves armor, hedge doctrine"),
    ("EC_07_Capstone_Macro_Desk.md", "ec7", "EC7 · CAPSTONE: The Macro Desk", "\U0001F3C6", "regime grid, lead-lag ladder, tilts, desk note, forge"),
]

PM_SECTIONS = [
    ("PM_01_Diversification_Free_Lunch.md", "pm1", "PM1 · Diversification: The Free Lunch", "\U0001F37D\uFE0F", "sigma 15.33 vs 19, rho<1 law, crisis manners, layers"),
    ("PM_02_Risk_Return_Foundations.md", "pm2", "PM2 · Risk & Return Foundations", "\U0001F4CF", "AM 15 vs GM 13.5, drag formula, Sharpe debut, MDD"),
    ("PM_03_CAPM_Beta.md", "pm3", "PM3 · CAPM & Beta", "\U0001F4C8", "beta cards, SML 13.5, alpha 4 taxes, Ke bridge"),
    ("PM_04_Efficient_Frontier_Asset_Allocation.md", "pm4", "PM4 · Efficient Frontier & Allocation", "\U0001F5FA\uFE0F", "bullet, CAL, two-fund, Brinson 90%, glides"),
    ("PM_05_Performance_Tribunal.md", "pm5", "PM5 · The Performance Tribunal", "\u2696\uFE0F", "Sharpe/Sortino/Treynor/IR 0.5/Calmar, fraud audit"),
    ("PM_06_Rebalancing_Machine.md", "pm6", "PM6 · The Rebalancing Machine", "\u2699\uFE0F", "drift canon 76.4, bands Rs 9.2L trim, flow-first"),
    ("PM_07_Capstone_Portfolio_Desk.md", "pm7", "PM7 · CAPSTONE: The Portfolio Desk", "\U0001F3C6", "3 lives, Rs 19.3Cr engine, 50y SWP, IPS law, forge"),
]

RT_SECTIONS = [
    ("RT_01_The_Ratio_System.md", "rt1", "RT1 · The Ratio System", "\U0001F9EE", "5 families, 3 comparisons, 5 pitfalls, ShopKart panel"),
    ("RT_02_DuPont_Surgery.md", "rt2", "RT2 · DuPont Surgery", "\U0001FA7A", "5-way 22.80%, earned vs borrowed ROE, g* 13.7%"),
    ("RT_03_Turnover_Cash_Machine.md", "rt3", "RT3 · Turnover & the Cash Machine", "\U0001F504", "DIO/DSO/DPO, CCC 74d, growth tax Rs 17.0L"),
    ("RT_04_Bank_NBFC_Ratios.md", "rt4", "RT4 · Bank & NBFC Ratios", "\U0001F3E6", "NIM 3.4, NNPA 0.70, PPOP, CRAR glide, ALM-first"),
    ("RT_05_Sector_Ratio_Packs.md", "rt5", "RT5 · Sector Ratio Packs", "\U0001F3EA", "GMROI 1.84, ARPU/churn/CAC, Rule of 40, RevPAR"),
    ("RT_06_Ratio_Forensics.md", "rt6", "RT6 · Ratio Forensics", "\U0001F575", "accruals -3.6 vs +9, Satyam test, DSRI 1.87, 6 costumes"),
    ("RT_07_Capstone_Ratio_Room.md", "rt7", "RT7 · CAPSTONE: The Ratio Room", "\U0001F3C6", "Panels X/Y/Z, 5-pass protocol, verdicts, forge"),
]

TV_SECTIONS = [
    ("TV_01_The_One_Law.md", "tv1", "TV1 · The One Law", "\u23F3", "FV/PV arrow, 3.1058L canon, J-curve, 72-rule"),
    ("TV_02_Annuities.md", "tv2", "TV2 · Annuities & Perpetuities", "\U0001F4B8", "SIP 98.93L, pension 59.8L, Gordon 62.5, corpus 4.27Cr"),
    ("TV_03_Loans_EMI_Architecture.md", "tv3", "TV3 · Loans & EMI Architecture", "\U0001F3E0", "EMI 26,992, split 22,500/4,492, flat 17.27%, prepay saves 10.4L"),
    ("TV_04_NPV_IRR.md", "tv4", "TV4 · NPV & IRR", "\u2696\uFE0F", "+0.81L / 15.24%, 3 traps, MIRR 13.77, XIRR"),
    ("TV_05_Rates_Frequencies.md", "tv5", "TV5 · Rates & Frequencies", "\U0001F4DF", "EAR 12.68/12.75, real -1.37% FD, cc 51.1%"),
    ("TV_06_TVM_In_Markets.md", "tv6", "TV6 · TVM in Markets", "\U0001F4C8", "bond 924.18, Gordon mirror, DCF 72% terminal, doses"),
    ("TV_07_Capstone_TVM_Desk.md", "tv7", "TV7 · CAPSTONE: The TVM Desk", "\U0001F3C6", "Sharma file, 6-move protocol, defuse, forge"),
]

WM_SECTIONS = [
    ("WM_01_The_Wealth_Machine.md", "wm1", "WM1 · The Wealth Machine", "\U0001F4B0", "4 gears, save-first law, wishes->goals, FI 28x/25x, Verma dashboard"),
    ("WM_02_Risk_Profiling_Allocation.md", "wm2", "WM2 · Risk Profiling & Allocation", "\U0001F9ED", "capacity x willingness x required tie-break, 60/30/10 glidepath, core-satellite AAP"),
    ("WM_03_Instrument_Shelf_Fee_Drag.md", "wm3", "WM3 · The Instrument Shelf & Fee Drag", "\U0001F4E6", "6 shelves, drag canon: 1% fee = 19.8% of 30y corpus, 9% factor 1,829, realty math"),
    ("WM_04_Tax_Architecture.md", "wm4", "WM4 · Tax Architecture", "\U0001F9FE", "regime arithmetic, 80C->NPS->80D->HRA order, Rs 62,400 stack, TLH March"),
    ("WM_05_Insurance_Protection.md", "wm5", "WM5 · Insurance & Protection", "\U0001F6E1\uFE0F", "Separation Law, 12x anchor Rs 2Cr, health stack 10L+90L, CSR 98 / solvency 1.8"),
    ("WM_06_Retirement_Withdrawal_Estate.md", "wm6", "WM6 · Retirement, Withdrawal & Estate", "\U0001F3D6\uFE0F", "SWR 3-3.5%, 3-bucket defense, SWP 24-29k vs annuity 1.9L tax, estate layer"),
    ("WM_07_Capstone_Wealth_Desk.md", "wm7", "WM7 · CAPSTONE: The Wealth Desk", "\U0001F3C6", "Mehta file judged, dose ladder Rs 32.6k vs Rs 65k, protection Rs 1.85L/yr, forge"),
]

CB_SECTIONS = [
    ("CB_01_The_Capital_Decision.md", "cb1", "CB1 · The Capital Decision", "\U0001F4D0", "incremental-flow law, 4 poisons, sunk vs opportunity, phantom Rs 17.5L"),
    ("CB_02_Estimating_Project_Cash_Flows.md", "cb2", "CB2 · Estimating Project Cash Flows", "\U0001F4B5", "OCF/capex/WC blocks, dep shield 0.50L, honest -0.83, cold-chain breakeven"),
    ("CB_03_Cost_of_Capital.md", "cb3", "CB3 · The Cost of Capital", "\u2696\uFE0F", "WACC 12.14% (0.70x13.5 + 0.30x8.98), Hamada 1.083, divisional 13.59, hurdle games"),
    ("CB_04_Uncertainty_Real_Options.md", "cb4", "CB4 · Uncertainty & Real Options", "\U0001F3B2", "sensitivity E[NPV] -0.26L, abandonment put, pilot option +16.4, delay +12.4"),
    ("CB_05_Unequal_Lives_Rationing_Replacement.md", "cb5", "CB5 · Unequal Lives, Rationing & Replacement", "\U0001F500", "EAA 0.435 vs 0.536, rationing A+B+C 6.3, POS +1.91, lease 7.69 vs 8.47"),
    ("CB_06_Execution_Post_Audit.md", "cb6", "CB6 · Execution & Post-Audit", "\U0001F4CB", "sanction memo, 2x overrun physics, sponsor ledger, audit: WC 19L / CCC 80d"),
    ("CB_07_Capstone_Capital_Committee.md", "cb7", "CB7 · CAPSTONE: The Capital Committee", "\U0001F3C6", "Doors 1/2/3, defuser roots -8%/+41%, bundle 2+3 = +8.69L, chair memo, forge"),
]

IA_SECTIONS = [
    ("IA_01_The_Standards_World.md", "ia1", "IA1 · The Standards World", "\U0001F4DA", "convergence & carve-outs, roadmap Rs 500cr/250cr phases, principles vs rules, LIFO exhibit"),
    ("IA_02_Conceptual_Framework.md", "ia2", "IA2 · The Conceptual Framework", "\U0001F9F1", "elements & qualities, neutrality vs prudence, HC vs current value, Ind AS 8 hierarchy"),
    ("IA_03_Presentation_IndAS1.md", "ia3", "IA3 · Presentation of FS (Ind AS 1)", "\U0001F5C2\uFE0F", "complete set, 12m gauntlet, DTA always non-current, 2 OCI buckets, 3rd BS rule"),
    ("IA_04_First_Time_Adoption_IndAS101.md", "ia4", "IA4 · First-Time Adoption (Ind AS 101)", "\U0001F309", "transition 1-Apr-15 vs first yr 16-17, no-hindsight exceptions, deemed cost, recon 966.25"),
    ("IA_05_Fair_Value_IndAS113.md", "ia5", "IA5 · Fair Value (Ind AS 113)", "\u2728", "exit price canon, L1/L2/L3, 3 techniques, H&BU, Day-1 deferral"),
    ("IA_06_Financial_Instruments_Classification.md", "ia6", "IA6 · FI Classification (Ind AS 109)", "\U0001F4C7", "2 gates: business model + SPPI, AC/FVOCI/FVTPL, equity one-way door, EIR 10.53%"),
    ("IA_07_ECL_Impairment_Engine.md", "ia7", "IA7 · ECL Impairment (Ind AS 109)", "\U0001F6DF", "3 stages, 12m vs lifetime, 30-dpd presumption, 27.3cr on 650 = 4.2%, matrix 12.0"),
    ("IA_08_Foreign_Currency_IndAS21.md", "ia8", "IA8 · Foreign Currency (Ind AS 21)", "\U0001F310", "functional vs presentation, machine Rs 88L frozen, payable Rs 3.5L, FCTR->OCI"),
    ("IA_09_Employee_Benefits_ESOP.md", "ia9", "IA9 · Employee Benefits & ESOPs (19/102)", "\U0001F474", "PUC unit Rs 16,141, DBO Rs 1.14L, OCI-only remeasurements, ESOP grant-FV"),
    ("IA_10_EPS_Segments.md", "ia10", "IA10 · EPS & Segments (33/108)", "\U0001F522", "basic 12.00 -> ESOP 11.57 -> diluted 10.34, anti-dilution sieve, 10%/75% rules"),
    ("IA_11_Standards_Tour.md", "ia11", "IA11 · The Standards Tour", "\U0001F9F0", "37/38/36/23/24/10 tour, onerous Rs 0.7L, CGU -10/-13.3/-6.7, pool cap 9.6%"),
    ("IA_12_Capstone_Standards_Tribunal.md", "ia12", "IA12 · CAPSTONE: The Standards Tribunal", "\U0001F3C6", "5 live files, OCI-or-P&L drill, equity bridge Rs 1,413cr, interview forge"),
]

RR_SECTIONS = [
    ("RR_01_Five_Step_Model.md", "rr1", "RR1 · The Five-Step Model", "\U0001F6E0\uFE0F", "5-step engine, control doctrine, IAS 18/11 autopsy, bundle Rs 15k/9k/375"),
    ("RR_02_Contract_Identification.md", "rr2", "RR2 · Step 1: Identify the Contract", "\U0001F91D", "5 criteria, collect=probable, combinations, 3 modification doors"),
    ("RR_03_Performance_Obligations.md", "rr3", "RR3 · Step 2: Performance Obligations", "\U0001F3AF", "distinct x2 tests, welding indicators, series rule, set-ups, stand-ready"),
    ("RR_04_Transaction_Price.md", "rr4", "RR4 · Step 3: Transaction Price", "\U0001F4B5", "EV 13L vs most-likely 20L, constraint, SFC 100->116.64L, non-cash, netting"),
    ("RR_05_Allocation_SSP.md", "rr5", "RR5 · Step 4: Allocation & SSP", "\U0001F370", "relative-SSP hammer, 3 lanes + residual guardrail, telecom Rs 12,000 + 500/mo"),
    ("RR_06_Over_Time_Point_in_Time.md", "rr6", "RR6 · Step 5: Over Time vs Point in Time", "\u23F1\uFE0F", "3 OT criteria, input/output measures, materials exclusion Rs 123.33L, expedient"),
    ("RR_07_Contract_Positions_Costs.md", "rr7", "RR7 · Contract Assets, Liabilities & Costs", "\u2696\uFE0F", "conditionality knife, asset Rs 9,000, ECL crossover, obtain/fulfil gates"),
    ("RR_08_Licenses_Agent_Warranty_Returns.md", "rr8", "RR8 · Licenses, Agent, Warranties & Returns", "\U0001F4DD", "access vs use, royalty exception, agent net Rs 15, warranty split, returns canon"),
    ("RR_09_Consignment_BillHold_Options.md", "rr9", "RR9 · Consignment, Bill-and-Hold & Options", "\U0001F3F7\uFE0F", "channel-stuffing, B&H fortress, gym fee Rs 1,000/mo, option SSP 9,000, breakage"),
    ("RR_10_Construction_Long_Term.md", "rr10", "RR10 · Construction & Long-Term Contracts", "\U0001F3D7\uFE0F", "POC 40%->4.0cr, unsigned=zero, retention, onerous law +0.167cr tonight"),
    ("RR_11_SaaS_Telecom_RealEstate.md", "rr11", "RR11 · Industry Engines", "\U0001F3ED", "SaaS Rs 12,500/mo, telecom churn, T&M vs fixed-bid, RERA PIT, escrow 70%"),
    ("RR_12_Capstone_Revenue_Chamber.md", "rr12", "RR12 · CAPSTONE: The Revenue Chamber", "\U0001F3C6", "6 files, 10-exhibit PIT/OT trial, canon conductor, chamber memo, forge"),
]

LS_SECTIONS = [
    ("LS_01_Rent_Became_Debt.md", "ls1", "LS1 · When Rent Became Debt", "\U0001F4C9", "IAS 17 illusion, AirSutra 240cr->166cr both sides, EBITDA mirage, front-loading"),
    ("LS_02_Definition_and_Exemptions.md", "ls2", "LS2 · The Definition Gauntlet", "\U0001F50D", "3 locks, identified asset, substantive substitution, fiber knife, 2 exemptions"),
    ("LS_03_Lease_vs_Service.md", "ls3", "LS3 · Lease vs Service: The Split", "\U0001F9E9", "components split 30L->21.43/8.57, expedient 70.01 vs 93.35, lessor no merge"),
    ("LS_04_Initial_Measurement.md", "ls4", "LS4 · Day-One Measurement", "\U0001F4CF", "5 buckets, IBR hunt, liability 38.90, ROU build 42.00, annuity due 16.70"),
    ("LS_05_Subsequent_Remeasurement.md", "ls5", "LS5 · Life After Day One", "\U0001F501", "accretion table, front-load 11.28/8.61, EBITDA re-badge, 3 remeasure doors"),
    ("LS_06_Modifications.md", "ls6", "LS6 · Modifications: The Three Doors", "\U0001F527", "3 doors, scope decrease gain 0.79, reprice +7.02, separate 11.19"),
    ("LS_07_Sale_and_Leaseback.md", "ls7", "LS7 · Sale & Leaseback", "\U0001F504", "115 gate, ROU 24.5cr, gain 19.5cr, above-market=loan, failed sale"),
    ("LS_08_Lessor_Accounting.md", "ls8", "LS8 · Lessor: The Two Doors Stay", "\U0001F3E6", "2 doors survive, NI 84.29 @9% income 7.59, manufacturer 6L, SL 9.5"),
    ("LS_09_Subleases_Incentives.md", "ls9", "LS9 · Subleases & Sweeteners", "\U0001FA86", "ROU-reference, NI 29.16 loss 1.96, negative carry, incentives, COVID expedient"),
    ("LS_10_Disclosures_and_Ratios.md", "ls10", "LS10 · Disclosures, Ratios & Covenants", "\U0001F4CA", "bridge 50->38.90 (-11.10), ICR 8.0->4.97, D/EBITDA 1.67->2.22, frozen GAAP"),
    ("LS_11_Industry_Plays.md", "ls11", "LS11 · Industry Plays", "\U0001F3EC", "aviation SLB, mall 31.12 vs 12, escalation doors, REIT smoothing, towers/fiber"),
    ("LS_12_Capstone_Lease_Ledger.md", "ls12", "LS12 · CAPSTONE: The Lease Ledger", "\U0001F3C6", "6 files, conductor table, EBITDA bridge, covenant memo, 10-Q forge"),
]

INV_SECTIONS = [
    ("IC_01_The_Shelf_That_Owns_the_PnL.md", "ic1", "IC1 · The Shelf That Owns the P&L", "\U0001F4E6", "COGS bridge 40+260-60=240, Rs 1-law, scope fence, DIO reading"),
    ("IC_02_What_Counts_as_Cost.md", "ic2", "IC2 · What Counts as Cost", "\U0001F9FE", "3 buckets, Rs 141 autopsy, exclusion wall, FOH 200/160, whisky 1cr/yr"),
    ("IC_03_Cost_Formulas.md", "ic3", "IC3 · Cost Formulas", "\U0001F504", "FIFO 8000 vs WAC 9000 (46.7%/40.0%), LIFO funeral, specific ID fence"),
    ("IC_04_NRV_Write_Downs.md", "ic4", "IC4 · NRV Write-Downs", "\U0001F4B2", "lower-of item-by-item, 460 vs 500, 8,000 down / 7,000 capped back"),
    ("IC_05_Overhead_Absorption.md", "ic5", "IC5 · Overhead Absorption", "\U0001F3ED", "normal capacity 24L/12k=200, joint 46L->32.2/13.8, whey clip, loss doctrine"),
    ("IC_06_Cost_Sheet_COGS.md", "ic6", "IC6 · The Cost Sheet", "\U0001F4CA", "chain 240->320->400->390->400, retail method 10L, standards 140/141"),
    ("IC_07_Borderlands.md", "ic7", "IC7 · The Borderlands", "\U0001F33E", "harvest deemed cost 8.0L, broker-traders NRV, developer stack 13cr->12.5"),
    ("IC_08_In_Transit_Shrinkage_Consignment.md", "ic8", "IC8 · Transit, Shrinkage & Consignment", "\U0001F69A", "FOB truck 25L clause-law, shrink 3L, consignment 12L, returns 1.88L"),
    ("IC_09_Disclosures_Manipulation_Radar.md", "ic9", "IC9 · The Manipulation Radar", "\U0001F6A8", "shelter 9.6L swing, museum 5L dodge, disclosure corkboard, pledges"),
    ("IC_10_Industry_Plays.md", "ic10", "IC10 · Industry Plays", "\U0001F3EA", "FEFO/promos, steel 50,000/t (47.5cr+50L), pharma batches, solitaires"),
    ("IC_11_Systems_Perpetual_Cutoff.md", "ic11", "IC11 · Systems, Counts & Cut-Off", "\U0001F4CB", "perpetual vs periodic, 3-body recon, 2-way count tests, last-GRN walls"),
    ("IC_12_Capstone_Stockroom_Trial.md", "ic12", "IC12 · CAPSTONE: The Stockroom Trial", "\U0001F3C6", "6 files, conductor table, 9.08L memo, 10-Q forge"),
]

PPE_SECTIONS = [
    ("DP_01_PPE_and_the_Second_Clock.md", "dp1", "DP1 · PP&E and the Second Clock", "\U0001F3ED", "3 adjectives + 2-bolt lock, scope fence, generator vs spanner, materiality gate"),
    ("DP_02_The_Cost_Build_Up.md", "dp2", "DP2 · The Cost Build-Up", "\U0001F9F1", "Rs 59L cage line-by-line, exclusion wall, 2022 testing amendment, swap gain 5L"),
    ("DP_03_Five_Machines_Inside_One.md", "dp3", "DP3 · Five Machines Inside One", "\U0001F9E9", "Rs 90L crane = 5 clocks dep 7.3L vs composite 6.0L (1.3L lie), overhaul components"),
    ("DP_04_The_Three_Clock_Faces.md", "dp4", "DP4 · The Three Clock Faces", "\U000023F3", "SL 6.75L, WDB rate 25.01% derived, UoP Rs 20/unit, change-in-estimate 10->5"),
    ("DP_05_The_Revaluation_Model.md", "dp5", "DP5 · The Revaluation Model", "\U0001F4C8", "class election, 40->50: 10 OCI net 7.5 + DTL 2.5, downward P&L-first rules"),
    ("DP_06_Living_with_Revaluation.md", "dp6", "DP6 · Living with Revaluation", "\U0001F501", "dep 10 vs 8 wedge, para-41 transfer 2L/yr, disposal gain 2 + surplus->RE"),
    ("DP_07_The_Spending_After.md", "dp7", "DP7 · The Spending After", "\U0001F527", "servicing wall, cylinder swap: capitalize 6, derecognize 1.6, five tests"),
    ("DP_08_The_Exit_Door.md", "dp8", "DP8 · The Exit Door", "\U0001F6AA", "disposal gain 4 not revenue, HFS lower-of 25/23, dep stops, abandonment burial"),
    ("DP_09_Three_Neighbour_Standards.md", "dp9", "DP9 · Three Neighbour Standards", "\U0001F6E1", "impair 20 / capped reversal 15, grant 9.6 both doors, interest 20 cap + 4 exp"),
    ("DP_10_Industry_Plays.md", "dp10", "DP10 · Industry Plays", "\U0001F6EB", "airliner 52.8cr/yr, power 18cr/yr, land never clocks, laptop pool 20L/yr"),
    ("DP_11_Disclosures_and_Radar.md", "dp11", "DP11 · Disclosures & the Ratio Radar", "\U0001F4CA", "gross 215 / accdep 138 / NBV 77, 3.0x-4.0yr-1.5 radar, six fraud signatures"),
    ("DP_12_Capstone_The_Clock_Audit.md", "dp12", "DP12 · CAPSTONE: The Clock Audit", "\U0001F3C6", "6 exhibits, conductor table, 11.4L memo, partner cross, 10-Q forge"),
]

DT_SECTIONS = [
    ("DT_01_The_Two_Clocks.md", "dt1", "DT1 · The Two Clocks", "\U000023F1", "book vs taxable profit, bridge 95->23.75+1.25=25.0 invariance, permanent wedge"),
    ("DT_02_Tax_Base_and_Temporary_Differences.md", "dt2", "DT2 · Tax Base × Temporary Differences", "\U0001F4D0", "four-cell map: machine DTL 5, warranty DTA 2.5, advance 2.5, BS beats bridge"),
    ("DT_03_Recognition_Discipline.md", "dt3", "DT3 · Recognition Discipline", "\U0001F512", "DTL presumption vs DTA probable-profit gate, IRE anti-recursion, goodwill carve-out"),
    ("DT_04_The_Depreciation_Gap.md", "dt4", "DT4 · The Depreciation Gap", "\U00002699", "DTL biography 1.25 climb to 5.0 then home, fleet snowball, WDV blocks +180-day gate"),
    ("DT_05_Provisions_and_the_Timing_Map.md", "dt5", "DT5 · Provisions & the Timing Map", "\U0001F5FA", "warranty 2.0 / ECL 2.0 / 43B 4.0 / NRV 1.5 DTA family, timing compass"),
    ("DT_06_OCI_and_Backwards_Tracing.md", "dt6", "DT6 · OCI & Backwards Tracing", "\U0001F317", "tax follows the item: reval 2.5 / FVOCI 2.0 / DBO 1.5 to OCI, hereditary staging"),
    ("DT_07_Loss_Carryforwards_and_MAT.md", "dt7", "DT7 · Loss Carryforwards & MAT", "\U0001F4C9", "8-yr vs forever clocks, loss DTA 40->10 gate, release 6, MAT pay 15 bank 7"),
    ("DT_08_Groups_and_Undistributed_Profits.md", "dt8", "DT8 · Groups & Undistributed Profits", "\U0001F3E2", "outside-basis gaps, 2-condition exemption, JV 0 vs 5cr on one resolution"),
    ("DT_09_Business_Combinations_Gateway.md", "dt9", "DT9 · The Business-Combination Gateway", "\U0001F91D", "step-up DTL 10 -> goodwill +10, dormant DTAs -7, unwind 2.5/yr annuity"),
    ("DT_10_India_Deep_Dive.md", "dt10", "DT10 · India Deep Dive", "\U0001F3DB", "25.168% stapled rate, 115BAA fork, WDV/180-day, 43B gate, MAT scale, transition layer"),
    ("DT_11_Presentation_Rate_Change_and_the_Reconciliation.md", "dt11", "DT11 · Presentation, Rate Change & Reconciliation", "\U0001F4D1", "offset zoning, DTL 10->8.8 release 1.2, crown jewel 125->123.8 ETR 24.76%"),
    ("DT_12_Capstone_The_Shadow_Ledger.md", "dt12", "DT12 · CAPSTONE: The Shadow Ledger", "\U0001F3C6", "6 exhibits, current 22 + deferred 9 = 31.0 invariance, net DTL 0.5, 10-Q forge"),
]

CS_SECTIONS = [
    ("CS_01_One_Creature_Many_Skins.md", "cs1", "CS1 · One Creature, Many Skins", "\U0001F9EC", "one creature many skins, why consolidation exists, Ind AS 110 scope, shell-debt antidote"),
    ("CS_02_Control_The_Three_Locks.md", "cs2", "CS2 · Control: The Three Locks", "\U0001F512", "power + returns + link, all three locks together, de-facto control, principal-agent, kick-outs"),
    ("CS_03_The_Consolidation_Mechanics.md", "cs3", "CS3 · The Consolidation Mechanics", "\U0001F3D7", "investment line vanishes, 100% line-by-line organs, uniform policy, same-date books, window shortcut"),
    ("CS_04_Goodwill_and_the_NCI_Question.md", "cs4", "CS4 · Goodwill & the NCI Question", "\U0001F531", "consideration + NCI - FV net assets; partial 160/60 vs full 190/90 fork, Level-3 guard"),
    ("CS_05_Attribution_and_the_Equity_Family.md", "cs5", "CS5 · Attribution & the Equity Family", "\U0001F46A", "attribution owners 34 / NCI 8.5, family equity slides, NCI -50 +5 premium doors, no P&L"),
    ("CS_06_The_Elimination_Workshop.md", "cs6", "CS6 · The Elimination Workshop", "\U0001F9F9", "four families: R/P pair, 25/125 UPP, dividends, lathe 6/1.2 clawback, matrix + tie-out + standing file"),
    ("CS_07_Goodwill_Never_Amortizes.md", "cs7", "CS7 · Goodwill Never Amortizes", "\U0001FAA6", "tested not amortized, gross-up 50 = 40 goodwill-first + 10 pro-rata, never reverses, headroom radar"),
    ("CS_08_The_Control_Cliff.md", "cs8", "CS8 · The Control Cliff", "\U0001F9D7", "cliff ceremony: derecognize all, retain-at-FV remeasure, OCI recycle, gain 140 vs family slides"),
    ("CS_09_Associates_and_Joint_Ventures.md", "cs9", "CS9 · Associates & Joint Ventures", "\U0001FAA2", "equity method 30 + 6 - 2 = 34 breathing investment, share-only UPP 1.5, loss floor zero, JV splits"),
    ("CS_10_The_Foreign_Subsidiary.md", "cs10", "CS10 · The Foreign Subsidiary", "\U0001F310", "closing vs transaction/average rates, CTA 1.25 + 2.43 to OCI, transaction P&L 15L, hedge, recycle"),
    ("CS_11_Group_Cash_Flows_and_the_Read.md", "cs11", "CS11 · Group Cash Flows & the Read", "\U0001F30A", "deal-year OCF 170 / ICF -430 / FCF -1, NCI div financing, -375 net line, DSO blanket 58 vs 138"),
    ("CS_12_Capstone_The_Night_Shift.md", "cs12", "CS12 · CAPSTONE: The Night Shift", "\U0001F3C6", "6 exhibits: grid 152/62, weave 130.5/122/8.5, walk 68.5 two routes, cliff -41/+19, partner cross + forge"),
]
# track-ordered master list: Business Analytics (9 tracks) then English umbrella (Basic, News, Vocabulary, Email, Grammar, Reading, Group Discussion, Interview Communication, Pronunciation, Self-Introduction, Fluency) + Aptitude (Averages, Blood Relations, Data Interpretation, Percentages, Logical Reasoning Puzzles, Permutations & Combinations, Probability, Profit & Loss, Ratio & Proportion)
FIN_PBI = FIN_SECTIONS[0:1]; FIN_XL = FIN_SECTIONS[1:2]; FIN_PQ = FIN_SECTIONS[2:3]
ALL_SECTIONS = SECTIONS + FIN_PBI + EXCEL_SECTIONS + FIN_XL + PQ_SECTIONS + FIN_PQ + SQL_SECTIONS + TABLEAU_SECTIONS + PYTHON_SECTIONS + STATS_SECTIONS + VIZ_SECTIONS + TS_SECTIONS + EN1_SECTIONS + BNS_SECTIONS + VOCAB_SECTIONS + EMAIL_SECTIONS + GRAMMAR_SECTIONS + READING_SECTIONS + GD_SECTIONS + IC_SECTIONS + PRON_SECTIONS + SI_SECTIONS + FL_SECTIONS + AVG_SECTIONS + BR_SECTIONS + DI_SECTIONS + PC_SECTIONS + LR_SECTIONS + NS_SECTIONS + PP_SECTIONS + PB_SECTIONS + PL_SECTIONS + RA_SECTIONS + INT_SECTIONS + SY_SECTIONS + TSD_SECTIONS + TW_SECTIONS + AC_SECTIONS + CF_SECTIONS + BF_SECTIONS + DV_SECTIONS + FA_SECTIONS + FI_SECTIONS + IN2_SECTIONS + EC_SECTIONS + PM_SECTIONS + RT_SECTIONS + TV_SECTIONS + WM_SECTIONS + CB_SECTIONS + IA_SECTIONS + RR_SECTIONS + LS_SECTIONS + INV_SECTIONS + PPE_SECTIONS + DT_SECTIONS + CS_SECTIONS

# radios: one per tab (home default checked), placed right after <body>
RADIOS = "\n".join(
    ['<input class="tabr" type="radio" name="tabc" id="r-home" checked>']
    + ['<input class="tabr" type="radio" name="tabc" id="r-%s">' % sid for _, sid, _, _, _ in ALL_SECTIONS]
)

# generated CSS: checked radio shows its section (zero-JS navigation)
_tabcss = [".tabr{position:fixed;left:-9999px;top:-9999px;opacity:0;pointer-events:none}",
             "main > section.lesson{display:none}"]
for _sid in ["home"] + [sid for _, sid, _, _, _ in ALL_SECTIONS]:
    _tabcss.append("#r-%s:checked ~ main section#%s{display:block;animation:fadein .35s cubic-bezier(.2,.7,.3,1)}" % (_sid, _sid))
    _tabcss.append("#r-%s:checked ~ aside .navlink[for='r-%s']{background:var(--panel2);border-color:var(--line);box-shadow:inset 3px 0 0 var(--acc)}" % (_sid, _sid))
TABS_CSS = "\n".join(_tabcss)


QUIZZES = {
"roadmap": [
  {"q":"You have a Windows laptop and 8 hrs/week. What's the correct first step today?",
   "o":["Buy a Power BI Pro license","Install Power BI Desktop free + sign up at app.powerbi.com","Learn SQL for 6 months first","Watch 40 hours of YouTube videos"],"a":1,
   "w":"Desktop is 100% free for building; you only need Service licenses to SHARE. Learning starts with installing + Lab 1, not with spending."},
  {"q":"The 30/70 rule of this course means:",
   "o":["30% DAX, 70% Power Query","30% of modules are optional","30% learning, 70% building/practicing","Study 30 min, rest 70 min"],"a":2,
   "w":"Watching videos never made anyone an expert — you become one by building. Every lab twice!"},
  {"q":"Stuck on a problem for 30+ minutes — the 4-step rescue is:",
   "o":["Give up → new career","Re-read error → tiny test page → simplify → ask with formula + model","Delete the file and restart","Ask AI to do the lab for you"],"a":1,
   "w":"Debugging is a core analyst skill; the rescue ladder keeps you moving without shortcutting learning."}],
"m1": [
  {"q":"The 5-step Power BI workflow, in order:",
   "o":["Visualize → Model → Share → Clean → Get Data","Get Data → Clean → Model → Visualize → Share","Model → Get Data → Share → Clean → Visualize","Get Data → Visualize → Clean → Share → Model"],"a":1,
   "w":"Get → Clean (Power Query) → Model → Visualize → Share. This loop is every pro project ever."},
  {"q":"A .pbix file contains…",
   "o":["Only the report visuals","A link to the cloud","Data + model + report together (Import mode)","Only DAX measures"],"a":2,
   "w":"The .pbix embeds a compressed copy of the data, the model, and the report pages — one portable file."},
  {"q":"An 'implicit measure' is…",
   "o":["A hidden calculated column","Power BI auto-aggregating a dragged numeric column (e.g., Sum)","A measure written in Excel","A visual filter"],"a":1,
   "w":"Drag Quantity into a card → auto Sum. Pros replace these with explicit DAX measures for control & reuse."}],
"m2": [
  {"q":"Why are Applied Steps the heart of Power Query?",
   "o":["They make queries faster","They re-run your whole cleaning recipe automatically on Refresh","They compress the data","They format visuals"],"a":1,
   "w":"Clean once by hand → refresh forever. Recipes, not manual edits — that's the pro mindset."},
  {"q":"Merge vs Append:",
   "o":["Merge stacks rows, Append adds columns","Merge = JOIN side-by-side on keys; Append = UNION rows on top","They're identical","Merge is only for Excel"],"a":1,
   "w":"Merge widens (join), Append stacks (rows). Confusing them is the #1 beginner error."},
  {"q":"Errors appeared after a type change. Best first move?",
   "o":["Delete the whole column","Investigate via column profile, fix the text, then Remove/Replace Errors deliberately","Ignore them","Close Power Query"],"a":1,
   "w":"Keep-vs-drop bad data is a BUSINESS decision — look first (column quality %), fix the cause, then handle errors on purpose."}],
"m3": [
  {"q":"Fact vs dimension, choose correct:",
   "o":["Facts describe people, dimensions hold numbers","Facts = measurable events to aggregate; Dimensions = who/what/where you filter by","Same thing","Dimensions are always bigger"],"a":1,
   "w":"Filter/slice by dims, aggregate facts. Sales = fact; Customers/Products/Date = dims."},
  {"q":"Default relationship settings you trust in a star schema:",
   "o":["Many-to-many, Both directions","One-to-one","Many-to-one (fact→dim), Single direction","Active = false"],"a":2,
   "w":"*:1 single-direction keeps filters unambiguous and fast; bidirectional is a deliberate, rare exception."},
  {"q":"A valid Date table requires…",
   "o":["At least 10,000 rows","Contiguous unique dates with no gaps, covering the range, marked as date table","A fiscal calendar only","Auto date/time enabled"],"a":1,
   "w":"No proper date table → time intelligence silently wrong. Mark it, relate it, never trust hidden auto tables."}],
"m4": [
  {"q":"Why default to measures over calculated columns?",
   "o":["Measures are easier to type","Measures compute at query time (no model bloat) AND respond to filter context","Columns can't aggregate","Measures use less RAM at refresh"],"a":1,
   "w":"A column is frozen at refresh; a measure re-computes per visual per slicer click. 'If in doubt, measure.'"},
  {"q":"CALCULATE([Total Sales], ALL(Products)) as a denominator gives…",
   "o":["Only electronics sales","Zero","Total sales ignoring all product filters — perfect for % of total","An error"],"a":2,
   "w":"CALCULATE rewrites the filter context; ALL removes product filters → grand total per cell."},
  {"q": "'Cannot determine a single value for column' error means:",
   "o":["The column is too long","You referenced a bare column inside a measure — wrap it in an aggregation","The data has duplicates","License expired"],"a":1,
   "w":"Measures need one value per context: SUM(col), SELECTEDVALUE(col), etc. Bare [Column] = measure-land error."}],
"m5": [
  {"q":"KEEPFILTERS changes CALCULATE's behavior from ___ to ___:",
   "o":["AND → OR","Replace existing filters → intersect with them","Import → DirectQuery","Row → column"],"a":1,
   "w":"Default = replace (ignores slicers on that column). KEEPFILTERS = intersect (respects slicers)."},
  {"q":"Context transition is:",
   "o":["Switching report pages","CALCULATE converting the current row's values into filters during evaluation","Refreshing the model","Drilling through"],"a":1,
   "w":"Row context + CALCULATE → filter context. It's also why measure references (hidden CALCULATE) 'see' each iterated row."},
  {"q":"For ranking that adapts to the user's slicers, use:",
   "o":["RANKX(ALL(...))","RANKX(ALLSELECTED(...))","COUNTROWS","TOPN only"],"a":1,
   "w":"ALL ignores slicers AND visual filters; ALLSELECTED keeps the user's selection — ranks react to what's visible."}],
"m6": [
  {"q":"8 categories to compare — pick the visual:",
   "o":["Pie chart","Gauge","Bar/column chart","3-D cone chart"],"a":2,
   "w":"Humans compare lengths far better than angles. Pies beyond ~5 slices = unreadable mush."},
  {"q":"Bookmark that only toggles visibility (collapsible panel) must UNcheck:",
   "o":["Display","Current page","Data","Spotlight"],"a":2,
   "w":"Unchecking 'Data' keeps the user's filters/slicers untouched — otherwise the bookmark traps old filter states."},
  {"q":"The 5-second rule says a page must…",
   "o":["Load in 5 seconds","Convey its main message within 5 seconds","Have exactly 5 visuals","Auto-refresh every 5 s"],"a":1,
   "w":"Title = the answer, F-layout, KPI row on top. Executives decide in seconds whether to keep reading."}],
"m7": [
  {"q":"Dynamic RLS is powered by which DAX pattern?",
   "o":["RANKX over Users","Security table filtered by USERPRINCIPALNAME()","TOTALYTD(VIEWERS)","Publish to web"],"a":1,
   "w":"One role like [Email] = USERPRINCIPALNAME() + a mapping table = any user sees only their rows. Test with 'View as role'."},
  {"q":"You need scheduled refresh from an on-prem SQL Server. You need…",
   "o":["Nothing extra","A data gateway (standard/personal) with stored credentials","A bigger laptop","Power BI on Mac"],"a":1,
   "w":"Gateway = the bridge services use to reach internal sources; cloud sources need only credentials."},
  {"q":"Why 'one semantic model, many reports'?",
   "o":["Saves disk space","Single source of truth: measures/RLS/refresh fixed once, consistent numbers org-wide","It's Microsoft policy","Reports can't have models"],"a":1,
   "w":"Governed central models + Build permission = trusted self-service instead of 14 versions of 'sales'."}],
"m8": [
  {"q":"VertiPaq model size is driven mostly by:",
   "o":["Number of visuals","Row count × column cardinality (unique values)","Theme colors","Number of workspaces"],"a":1,
   "w":"High-cardinality columns (IDs, datetimes) are the fat — drop, split, or integer-ize them."},
  {"q":"Auto date/time should be disabled because…",
   "o":["It deletes old data","It creates hidden date tables per date column, bloating the model","It breaks DAX","It's a premium feature"],"a":1,
   "w":"Hidden per-column date tables inflate size and fight your real, marked Date table."},
  {"q":"The .pbip project format's superpower:",
   "o":["It's smaller","Text-based model & report files → Git diffs, branches, PRs, TMDL editing","It runs on Mac","It skips refresh"],"a":1,
   "w":".pbip + TMDL = real source control and code review for BI. Interviewers love this."}],
"m9": [
  {"q":"What makes a capstone project 'portfolio-ready'?",
   "o":["At least 20 pages","Problem statement, clean star model, advanced DAX, interactive UX, screenshots, decision log","Only if you used real company data","Rainbow color palette"],"a":1,
   "w":"Recruiters read the story: problem → approach → decisions → result. Screenshots + README + rubric ≥85."},
  {"q":"The 60-minute rebuild drill tests for…",
   "o":["Typing speed","Hireable muscle memory: model + 6 measures + 1 page from blank file","Memory of exact measures only","How fast you can Google"],"a":1,
   "w":"Rebuild Project 1's core in <60 min monthly — that's fluency, and fluency is what interviews actually measure."},
  {"q":"novypro.com is used in this course to…",
   "o":["Buy licenses","Publish/an showcase your PBIX portfolio publicly","Download DAX Studio","Email managers"],"a":1,
   "w":"GitHub (.pbip) + novypro demos + LinkedIn = the recruiter trifecta."}],
"cheat": [
  {"q":"Division in DAX should always use…",
   "o":["/ operator","DIVIDE([A],[B]) — blank-safe, no div/0 crashes","AVERAGE","MOD"],"a":1,
   "w":"DIVIDE handles zero/blank gracefully and reads cleaner. The slash is for daredevils."},
  {"q":"The Two Laws: measures evaluate in ___; calculated columns/iterators in ___:",
   "o":["row, filter","filter, row","table, query","import, direct"],"a":1,
   "w":"Filter context vs row context. Internalize this and 80% of DAX confusion evaporates."},
  {"q":"First move when a measure misbehaves:",
   "o":["Rewrite the model","Table visual → return VARs one by one → DAX Studio timings","Add more filters","Restart Windows"],"a":1,
   "w":"Debug ritual: isolate in a table, inspect intermediate VARs, then check SE vs FE split."}],
"p1": [
  {"q":"Hit Refresh in Power Query and it…",
   "o":["only downloads new files","re-runs every Applied Step on current data — cleaning replays automatically","resets your steps","formats the visuals"],"a":1,
   "w":"Steps = recipe. Refresh = re-cook with fresh ingredients. That's the entire point."},
  {"q":"A staging (stg_) query should usually be…",
   "o":["loaded to the model","load disabled but kept in refresh","deleted after use","set to DirectQuery"],"a":1,
   "w":"Enable load OFF keeps it out of the model while still feeding final queries on refresh."},
  {"q":"'Using Locale' when changing a column's type exists to…",
   "o":["translate the UI","parse culture-specific dates/numbers like dd-MM-yyyy correctly","change the font","sort faster"],"a":1,
   "w":"31/01/2025 is valid in India, invalid in US defaults — locale tells M how to parse."}],
"p2": [
  {"q":"A Left ANTI join returns…",
   "o":["all rows from both tables","only matches","left-side rows with NO match (orphan finder)","duplicates"],"a":2,
   "w":"Anti-joins answer 'who didn't…' — customers with no orders, unmatched keys, change detection."},
  {"q":"Folder-combine: why edit the Transform SAMPLE file?",
   "o":["it looks cleaner","the sample becomes the function applied to EVERY file","it deletes junk files","to rename the folder"],"a":1,
   "w":"One sample edit = consistent cleaning for all current and future files in that folder."},
  {"q":"Unpivot turns…",
   "o":["tall data wider","wide data (Jan|Feb|Mar columns) into tall rows (Month, Value)","rows into tables","text into numbers"],"a":1,
   "w":"Models think tall-and-narrow. Unpivot is how report-shaped exports become analyzable."}],
"p3": [
  {"q":"In M, 'each' is shorthand for…",
   "o":["a loop","(_) => — a function of the current row","the previous step","a parameter"],"a":1,
   "w":"each [Qty]*[Price] = for every row, take those fields. Nested = use the explicit (_) => form."},
  {"q":"'try expr otherwise 0' is used to…",
   "o":["crash faster","rescue error cells with a fallback value instead of dropping rows","skip refresh","format numbers"],"a":1,
   "w":"Surgical error-handling keeps rows alive; Remove Errors deletes them. Choose by data trust."},
  {"q":"Parameters (Manage Parameters) exist to…",
   "o":["make queries slower","externalize changeable values (paths, years, dates) so re-pointing = one edit","hide data","store passwords"],"a":1,
   "w":"Change pDataFolder once instead of editing 30 steps. Incremental refresh runs on exactly this trick."}],
"p4": [
  {"q":"'View Native Query' available on a step proves…",
   "o":["the file is CSV","query folding — your steps became SQL executed by the server","an error","the query is cached"],"a":1,
   "w":"Folding = the database does the heavy lifting. Break it, and every row travels through your engine."},
  {"q":"Incremental refresh date filter: why MUST it fold?",
   "o":["it looks better","without folding every refresh re-reads full history — incremental degrades to full refresh","Microsoft says so","to use less RAM"],"a":1,
   "w":"RangeStart/RangeEnd must become a WHERE clause server-side, or nothing is saved."},
  {"q":"RelativePath + Query options in Web.Contents prevent…",
   "o":["typos","the Service blocking refresh of the API as a 'dynamic data source'","slow JSON","auth popups"],"a":1,
   "w":"Static base URL evaluates fine; fully dynamic URLs fail scheduled refresh in the cloud."}],
"s1": [
  {"q":"SQL execution order (interview answer):",
   "o":["SELECT → FROM → WHERE","FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY","WHERE → SELECT → FROM","ORDER BY first"],"a":1,
   "w":"That's why a SELECT alias can't be used in its own WHERE — alias doesn't exist yet when WHERE runs."},
  {"q":"Discount = NULL matches…",
   "o":["rows where it's 0","nothing ever — NULL = unknown; use IS NULL","all rows","blank strings"],"a":1,
   "w":"Three-valued logic: NULL compared to anything = unknown → row excluded. IS NULL is the only test."},
  {"q":"LIKE '_ouse' matches…",
   "o":["'mouse' only","exactly one char + 'ouse' (Mouse, House)","'%ouse%'","one mouse"],"a":1,
   "w":"Underscore = exactly one character; percent = any run of characters."}],
"s2": [
  {"q":"WHERE vs HAVING:",
   "o":["identical","WHERE filters rows before grouping; HAVING filters groups after","HAVING is faster","WHERE works on groups"],"a":1,
   "w":"Write 'HAVING COUNT(*)>=3' for group-level conditions; WHERE can't see aggregates."},
  {"q":"A LEFT JOIN shows NULL on the right side when…",
   "o":["the join is wrong","no match exists — left rows survive with right cols padded NULL","data is corrupt","RANK ties"],"a":1,
   "w":"That's the point: 'everyone on the left, matches IF any'. NULLs on the right = the audit signal."},
  {"q":"In a GROUP BY query, SELECTed columns must be…",
   "o":["all numeric","in GROUP BY or inside an aggregate function","indexed","primary keys"],"a":1,
   "w":"Otherwise the engine can't pick WHICH row's value per group — the unbreakable law."}],
"s3": [
  {"q":"ROW_NUMBER vs RANK vs DENSE_RANK with ties:",
   "o":["all identical","ROW_NUMBER no ties / RANK ties+skip next / DENSE_RANK ties no skip","RANK is random","DENSE skips"],"a":1,
   "w":"Knowing tie behavior decides leaderboards, dedupes, and top-N-per-group correctness."},
  {"q":"LAG(Revenue,1) OVER (ORDER BY Month) gives…",
   "o":["next month","previous month's value beside the current row (MoM/YoY math)","average","first month"],"a":1,
   "w":"Combine: (cur - LAG)/LAG for period growth. LEAD peeks forward."},
  {"q":"Prefer NOT EXISTS over NOT IN because…",
   "o":["it reads better","a single NULL in the NOT IN list negates the whole condition","EXISTS creates indexes","IN is deprecated"],"a":1,
   "w":"Three-valued logic strikes again — NULL-safe semi-joins use EXISTS/NOT EXISTS."}],
"s4": [
  {"q":"The left-prefix rule says index (CustomerID, OrderDate) serves…",
   "o":["every query","filters on CustomerID and (CustomerID+OrderDate) but NOT OrderDate alone","dates only","nothing"],"a":1,
   "w":"Composite indexes work left-to-right, like a phone book sorted last name, first name."},
  {"q":"A full SCAN in EXPLAIN on a huge filtered table usually means…",
   "o":["good performance","missing/defeated index — likely a function wrapped the column (SARGable violation)","table is sorted","cache hit"],"a":1,
   "w":"Rewrite: no functions on filtered columns; range conditions instead of strftime() on the fly."},
  {"q":"Transactions guarantee atomicity meaning…",
   "o":["fast queries","all statements commit together or ALL roll back — never half","nested selects","auto-indexing"],"a":1,
   "w":"Money moves are bundles. ACID's A = no half-applied bundles, ever."}],
"s5": [
  {"q":"Sign-normalize finance data…",
   "o":["in every query separately","centrally in a view (CASE per Type) so all consumers share identical math","in Excel later","never"],"a":1,
   "w":"Same discipline as Power Query: fix once, audit one place, everyone reads identical numbers."},
  {"q":"Balance-sheet values in SQL need…",
   "o":["SUM over months","last-observation in period: FIRST_VALUE … ORDER BY MonthStart DESC (or latest-row join)","AVG","COUNT"],"a":1,
   "w":"Identical rule to DAX LASTDATE — stocks are point-in-time, not cumulative."},
  {"q":"A tie-out check in a trial balance is…",
   "o":["sum of profits","SUM(debits) = SUM(credits) comparison — instant error/fraud detector","row count","index rebuild"],"a":1,
   "w":"Accounting's built-in checksum. One inequality = something is wrong, investigate before close."}],
"t1": [
  {"q":"In Tableau, a BLUE pill means…",
   "o":["continuous values on an axis","discrete labels creating headers","an error state","an extract field"], "a":1,
   "w":"Blue = discrete (Jan, Feb, Mar as headers). Green = continuous (a smooth axis). Dates can flip between both."},
  {"q":"The 'noodle' (logical relationships) is safer than joining everything because…",
   "o":["it types faster","it resolves joins per-viz — no duplicate-row explosions across one-to-many tables","it makes prettier charts","it skips data types"], "a":1,
   "w":"Relationships fetch only what each sheet needs; a premature physical join multiplies rows silently."},
  {"q":"Tableau guesses dimensions vs measures from…",
   "o":["alphabetical order","data type (text/dates → dims, numbers → measures) — you can drag to convert","color","file size"], "a":1,
   "w":"CustomerID is numeric but should usually be a dimension (then use CNTD) — roles are yours to control."}],
"t2": [
  {"q":"When should you NOT synchronize a dual axis?",
   "o":["never sync","when the two axes measure different units (₹ vs orders) — syncing would lie","always sync","only on Tuesdays"], "a":1,
   "w":"Sync only same-unit overlays (Actual vs Target). Different units on one scale = visual fraud."},
  {"q":"A Set differs from a Group because a set…",
   "o":["is colorful","is dynamic — re-evaluates against the current data (e.g., Top N by Revenue)","is slower","needs SQL"], "a":1,
   "w":"Groups are static relabels; sets are living queries. Combined sets = AND/OR of two sets."},
  {"q":"Clicking + on a date pill…",
   "o":["adds a field","drills the built-in date hierarchy Year→Quarter→Month→Day","duplicates the sheet","zooms the map"], "a":1,
   "w":"Tableau's free drill-down. Same idea as Power BI's expand - and no DAX required."}],
"t3": [
  {"q":"The iron rule of calculated fields:",
   "o":["use caps","if any field is aggregated, ALL numbers in the calc must be aggregated","never use IF","calcs are optional"], "a":1,
   "w":"AOV = SUM([Revenue])/COUNTD([OrderID]) — ratios aggregate both sides or Tableau rejects the formula."},
  {"q":"ZN([Col]) guards against…",
   "o":["zeppelins","NULL poisoning: joined lookups or NULL + x arithmetic returning NULL","z-index bugs","zero rows"], "a":1,
   "w":"NULLs eat arithmetic row-by-row and averages column-by-column. ZN converts NULL→0 explicitly."},
  {"q":"'Compute Using' for a table calc chooses…",
   "o":["the font","the addressing — which marks walk across/down/in-pane where the calc accumulates","the server","the extract"], "a":1,
   "w":"Wrong addressing = percent-of-wrong-denominator. Ask 'of what?' then set specific dimensions."}],
"t4": [
  {"q":"{FIXED [CustomerID]: MIN([OrderDate])} computes…",
   "o":["random dates","each customer's first purchase date — the cohort anchor","the last order","today"], "a":1,
   "w":"One value per customer, computed independent of the view. Cohorts, new-vs-returning, LTV windows all start here."},
  {"q":"FIXED LODs ignore dimension filters; to make a filter apply you must…",
   "o":["cry","right-click the filter → Add to Context (context filters run ABOVE FIXED)","restart Tableau","use MORE filters"], "a":1,
   "w":"Order of operations: Context → FIXED → Dimension filters. Grey pill = context = LOD sees it."},
  {"q":"Parameters do nothing until you…",
   "o":["rename them","reference them in a calc/filter/top-tab (measure switcher CASE, Top-N lever, what-if multiplier)","publish","color them"], "a":1,
   "w":"A parameter is a stored lever; the formula that reads it is the wiring. Show Parameter Control = the UI."}],
"t5": [
  {"q":"Default dashboard layout mode + the one big exception:",
   "o":["floating always; tile for logos","tiled (snap grid) always; float only for overlays like filters/logos/tooltip cards","random","print-only"], "a":1,
   "w":"Tiled = structure that reflows. Floating = decoration. Containers inside containers = magazine layouts."},
  {"q":"A .twbx file is…",
   "o":["an XML workbook","a zip bundle: workbook XML + extracts + images (the share/publish format)","a backup","a theme"], "a":1,
   "w":".twb = XML that references external data; .twbx = packaged with everything embedded."},
  {"q":"'Use as Filter' (sheet menu on a dashboard)…",
   "o":["breaks filters","lets clicking a mark in that sheet filter the other sheets — zero dialog-wiring","prints","hides sheets"], "a":1,
   "w":"Instant interactivity. Add Highlight + URL actions next and your dashboard behaves like an app."}],
"t6": [
  {"q":"Sign-normalizing GL amounts should happen…",
   "o":["per chart","once, in ONE calculated field (CASE per Type) — every viz reads identical math","in Excel after export","never"], "a":1,
   "w":"Fix once, audit one place — identical mantra to P5's conditional column and S5's sign view."},
  {"q":"Balance-sheet items (Cash, Inventory) in Tableau need…",
   "o":["SUM over months","the period-end observation only (LAST()==0 filter per partition) — stocks don't sum","AVG","MAX always"], "a":1,
   "w":"Same semi-additive rule as DAX LASTDATE / SQL FIRST_VALUE-DESC / E6's ending balance."},
  {"q":"Favourable variance for OpEx is when…",
   "o":["actual > budget","actual < budget — costs under budget = good (income logic is the reverse)","budget = 0","it never is"], "a":1,
   "w":"Encode the flip per Type in one calc; rendering decisions must never re-derive finance logic."}],
"y1": [
  {"q":"Python's / and ** operators…",
   "o":["always return int","/ always returns float; ** is exponentiation — the compounding engine","are deprecated","only work in Excel"], "a":1,
   "w":"10/2 → 5.0 (float). 1.06**10 → growth. Finance code lives on **."},
  {"q":"f\"₹{emi:,.2f}\" inside a print produces…",
   "o":["an error","thousand-separated, exactly-2-decimal currency — report grade","₹ twice","a float"], "a":1,
   "w":"f-strings sprinkle values inside text; {:,.2f} = commas + 2 decimals; {:.1%} = percent."},
  {"q":"A dict beats a list for a trial balance because…",
   "o":["it's prettier","accounts are looked up by NAME (tb['Rent']) — no index memorizing","it's faster","lists can't hold numbers"], "a":1,
   "w":"Keys ARE the account names. Add, lookup, iterate .items() — a ledger in six lines."}],
"y2": [
  {"q":"A function without return gives…",
   "o":["0","None — silently, and downstream math on it crashes far away","an exception","the last value"], "a":1,
   "w":"Always return explicitly. A None in a finance report is the silent killer."},
  {"q":"India fiscal-year rule (FY starts April):",
   "o":["FY = year always","month >= 4 → current year, else year − 1","depends on company","use % operator"], "a":1,
   "w":"Mar 2025 → FY2024(-25); Apr 2025 → FY2025(-26). Same rule you'll meet in P5/S5/T6 — coded once here."},
  {"q":"csv.DictReader rows need explicit type conversion because…",
   "o":["fun","everything arrives as strings — '9.5'+'1' would CONCATENATE not add","CSVs encrypt","pandas requires it"], "a":1,
   "w":"Types are a contract: float() the amounts, date.fromisoformat() the dates, or your sums die."}],
"y3": [
  {"q":"Sign normalization uses np.where (vectorized) instead of a loop because…",
   "o":["loops are illegal","millions of rows in milliseconds + ONE audited column, no loop-bug surface","np.where is shorter","colors"], "a":1,
   "w":"Py3 executes P5's 'fix once, audit one place' rule as code: every downstream consumer stays natural."},
  {"q":"merge(how='outer', indicator=True) protects variance packs from…",
   "o":["slow code","budget-without-spend and spend-without-budget vanishing silently + shows each row's origin","NaN","disk space"], "a":1,
   "w":"S5's full-outer discipline in code: _merge column = both/left_only/right_only audit trail."},
  {"q":"groupby(['MonthStart','Type'])['Signed'].sum().unstack('Type') equals…",
   "o":["a join","an Excel PivotTable: Types as columns — the wide monthly P&L","a chart","a filter"], "a":1,
   "w":"unstack lifts a group level into columns. Add margins via pivot_table for grand totals."}],
"y4": [
  {"q":"resample('QE') — Revenue .sum() but Cash .last() because…",
   "o":["Cash is special","flows accumulate over the period; stocks must be the period-END snapshot — semi-additivity","MSCI rule","Cash is negative"], "a":1,
   "w":"The 5th meeting of this law (E6/P5/S5/T6): summing stocks triple-counts money."},
  {"q":"pct_change(12) on monthly data computes…",
   "o":["12%","Year-over-Year growth — each month vs same month last year (seasonality-safe)","MoM","average"], "a":1,
   "w":"shift/pct_change(k) = the LAG pattern from SQL windows, vectorized. Sign-safe: (cur−prev)/prev.abs()."},
  {"q":"(1 + returns).cumprod() builds…",
   "o":["volatility","a cumulative performance index — growth of ₹1, the universal comparison chart","correlation","EMI"], "a":1,
   "w":"Every normalized 'since inception' chart on Bloomberg = this one line."}],
"y5": [
  {"q":"numpy_financial.npv() quirk (E6 redux):",
   "o":["it ignores flows","index 0 is treated as TODAY, un-discounted — put year-1 at index 1 or add the outlay outside","it's broken","it needs Excel"], "a":1,
   "w":"Same caveat as Excel NPV(): today-flows must not be discounted again. One assert in tests = safety."},
  {"q":"np.percentile(years, [5,50,95]) after Monte Carlo tells the CFO…",
   "o":["nothing","a distribution of futures: P5 pessimistic / P50 median / P95 optimistic — honesty over point guesses","only the max","the EMI"], "a":1,
   "w":"10,000 simulated paths → probability of beating budget. Decision-grade honesty, no crystal ball."},
  {"q":"Sharpe's numerator uses which risk-free proxy in India context?",
   "o":["0%","10-year G-Sec yield (~7%) — excess return over near-riskless Indian bonds","SBI FD 1-month","Bitcoin APR"], "a":1,
   "w":"(return − risk_free)/vol. Benchmark choice stated explicitly = quant hygiene."}],
"y6": [
  {"q":"Recon checks run BEFORE the report because…",
   "o":["log order","garbage-in → beautiful WRONG pack; fail loud before stakeholder eyes","faster","color"], "a":1,
   "w":"S5's close discipline: gate checks first, outputs after. Block early, print precisely what's broken."},
  {"q":"Keeping config separate (paths, rates, income types) means…",
   "o":["more files","a CFO edits assumptions without touching pipeline logic — less breakage, clear audit","fun","pytest"], "a":1,
   "w":"Every assumption in one importable file = the code version of P5's parameters table."},
  {"q":"Production-grade one-command reports have…",
   "o":["emojis","reproducibility (seed/config), timestamped outputs, gate checks, clear failure messages","passwords","macros"], "a":1,
   "w":"Same input → same pack, every run, provably. That's what 'month-end engine' really means."}],
"z1": [
  {"q":"Order values: mean ≈ ₹47.9k but median ≈ ₹22.6k. The data is…",
   "o":["broken","right-skewed — big-ticket orders drag the mean up; the MEDIAN is the honest 'typical'","left-skewed","normal"], "a":1,
   "w":"Mean > median > mode = right tail. Report median + n alongside; keep the mean for totals × N capacity math."},
  {"q":"CV (sd/mean) misleads when…",
   "o":["n is large","the mean hovers near zero or flips sign — returns, growth, net income swings","data is money","skew > 0"], "a":1,
   "w":"Divide-by-near-zero explodes. CV belongs to levels (₹, units), never to returns."},
  {"q":"Sample sd divides by n−1 (Bessel) because…",
   "o":["tradition","dividing by n would UNDERSTATE true population spread from one sample","it's faster","Excel says so"], "a":1,
   "w":"ddof=1 undoes the shrink from using x̄ instead of μ. pandas .std() defaults to it; Excel STDEV.S vs STDEV.P."}],
"z2": [
  {"q":"A '99% accurate' fraud test flags a transaction, but P(fraud|flag) ≈ 9% because…",
   "o":["math is broken","the base rate (0.1%) is so low that false positives outnumber true flags — Bayes rules","tests lie","α is big"], "a":1,
   "w":"P(ill|+) = sens·prev / [sens·prev + fpr·(1−prev)]. Prev first, always."},
  {"q":"The Central Limit Theorem says the distribution of…",
   "o":["raw data","SAMPLE MEANS approaches Normal with SE σ/√n — whatever the parent skew","errors","medians only"], "a":1,
   "w":"Averages behave even when individuals are wild; √n law: 4× data = 2× precision."},
  {"q":"Prices are modeled log-normal because…",
   "o":["logs are cool","prices ≥ 0 and grow multiplicatively ⇒ log-returns ≈ Normal ⇒ prices log-normal","statute","Normal is wrong"], "a":1,
   "w":"This is why quant work uses pct_change/log1p + cumprod: additive in logs, multiplicative in levels."}],
"z3": [
  {"q":"A 95% confidence interval correctly means…",
   "o":["95% chance the truth is in THIS interval","the PROCEDURE traps the true value in 95% of repeated samples — this interval either does or doesn't","95% of data inside","margin of error 5%"], "a":1,
   "w":"Behavioral, not Bayesian: act as if caught; report method explicitly in audits/interviews."},
  {"q":"p = 0.02 means…",
   "o":["2% chance the effect is real","if H₀ were true, data THIS extreme has ~2% probability — NOT effect size, NOT P(H₁)","98% confidence","2 se's always"], "a":1,
   "w":"Small p = 'surprising under no-effect'. Pair p with effect size + CI, always, or it's numerology."},
  {"q":"Type I vs Type II error:",
   "o":["same thing","I = reject true H₀ (false alarm, α) · II = fail to reject false H₀ (the miss, β; power = 1−β)","I = crash","II = bug"], "a":1,
   "w":"Analysts choose α by alarm-cost; power depends on n & effect size — under-powered studies see nothing."}],
"z4": [
  {"q":"r = 0.43 between marketing and revenue is NOT evidence of…",
   "o":["association","causation — third variables, reverse causality, or common trend could drive it (St5!)","movement","positivity"], "a":1,
   "w":"The six lies correlation tells: causation, outliers, range-restriction, non-linearity, Simpson, spurious-trend pairs."},
  {"q":"Least-squares regression minimizes…",
   "o":["absolute error","Σ(yᵢ − ŷᵢ)² — squared vertical residuals (big misses cost quadratically)","R²","p-values"], "a":1,
   "w":"Differentiable, closed-form, punishes outliers — and that's ALSO why it's outlier-sensitive."},
  {"q":"CAPM β equals…",
   "o":["R²","the SLOPE of asset returns regressed on market returns = cov(asset, mkt)/var(mkt)","the intercept","a ranking"], "a":1,
   "w":"β=1.2 ⇒ moves ~20% extra with the market. Regression slope wearing a finance suit."}],
"z5": [
  {"q":"A lag-12 spike in monthly revenue's ACF indicates…",
   "o":["data error","annual seasonality — each month echoes the same month last year","outliers","stationarity"], "a":1,
   "w":"ACF reads structure: lag-1 = momentum/trend, lag-12 = yearly rhythm. Differencing removes trend first."},
  {"q":"Before any fancy model is trusted, it must beat…",
   "o":["ARIMA","naive, seasonal naive, and drift benchmarks — 'dumb' forecasts are the gatekeepers","Excel","the mean"], "a":1,
   "w":"If a neural net can't beat 'same month last year', ship the benchmark and save the compute."},
  {"q":"Regressing two trending LEVELS produces…",
   "o":["clarity","spurious regression — common trend fakes linkage; fix: difference/growth rates or add trend + check DW","causality","cointegration always"], "a":1,
   "w":"Trendy series correlate by time. First-difference or include t; Durbin-Watson ≈2 = clean residuals."}],
"z6": [
  {"q":"Expected Shortfall (ES/CVaR) differs from VaR because ES…",
   "o":["is smaller","averages losses BEYOND the VaR point — the cliff's depth, not just its edge","is parametric","ignores tails"], "a":1,
   "w":"VaR marks the door; ES measures the room behind it. Coherent & Basel-preferred; report as a pair."},
  {"q":"Bootstrap CIs work by…",
   "o":["normal tables","resampling YOUR data with replacement thousands of times and reading percentile spread of the statistic","SQL","rounding"], "a":1,
   "w":"No closed-form needed (median! Sharpe! ratios!). Time series needs BLOCK bootstrap to keep autocorrelation."},
  {"q":"In crises, portfolio correlations tend to…",
   "o":["drop to 0","converge toward +1 — diversification evaporates exactly when needed most","stay fixed","invert"], "a":1,
   "w":"2w₁w₂σ₁σ₂ρ term: ρ→1 ⇒ portfolio sd → weighted average. Plan for the ρ-jump regime, not the calm one."}],
"v1": [
  {"q":"Top of the channel accuracy ladder:",
   "o":["color hue","position on a common scale (dot/bar baselines) — then length, angle, area… hue last","3-D depth","area"], "a":1,
   "w":"Cleveland & McGill: place your KEY message on position/length; demote the rest to classifiers."},
  {"q":"Anscombe's quartet proves…",
   "o":["stats are lies","identical summary stats can hide wildly different data → visualize FIRST, compute after","r is useless","plot slowly"], "a":1,
   "w":"Same mean/sd/r/line ≠ same data. Eyes catch what aggregates hide. Naked numbers are a trap."},
  {"q":"Pre-attentive highlights (one red dot among grey) fail when…",
   "o":["printed","everything is highlighted — scarcity creates the 200ms pop","used once","in dashboards"], "a":1,
   "w":"Highlight everything = highlight nothing. ONE pop per view; demote the rest."}],
"v2": [
  {"q":"Truncated bar axes are fraud because…",
   "o":["axes are sacred","bars encode value as LENGTH from zero — cutting the floor fakes ratios (₹95L vs ₹100L ≠ 5x)","bars are old","zoom rules"], "a":1,
   "w":"Length encodings demand zero baselines. Lines (slope carriers) may zoom — with disclosure."},
  {"q":"Line charts over categorical x-axis commit…",
   "o":["nothing","fake continuity — inventing trend between unordered categories","3-D crime","pie crime"], "a":1,
   "w":"Lines = continuous x only (time, numerics). Categories get bars or dots — the gap is meaning."},
  {"q":"100%-stacked bars trade WHAT for share?",
   "o":["color","total magnitude — totals variance disappears when every column is normalized to 100%","labels","speed"], "a":1,
   "w":"Share charts answer 'mix', not 'how much'. Never present shares when the CFO asked about levels."}],
"v3": [
  {"q":"Diverging palettes belong to…",
   "o":["all data","deviations around a MEANINGFUL midpoint (variance≈0, achievement≈100%)","categories","maps"], "a":1,
   "w":"Midpoint = meaning (zero variance). Fake midpoints create fake drama. Favourable↔unfavorable is diverging by nature."},
  {"q":"Finance variance colors should pair blue/orange (not red/green) because…",
   "o":["taste","~8% of men can't distinguish red/green; pair color with ▲/▼ markers for redundant encoding","brands","printing"], "a":1,
   "w":"Redundant encoding + colorblind-safe pairs = accessibility that survives any boardroom and grayscale print."},
  {"q":"Data-ink ratio maximization means…",
   "o":["more ink","delete non-data ink: borders, heavy grids, shadows, 3-D, legends→direct end-labels","bigger charts","more colors"], "a":1,
   "w":"Tufte: every pixel either carries data or pays rent. Scaffolding is not data."}],
"v4": [
  {"q":"The North-Star KPI belongs…",
   "o":["bottom right","top-left — the Z-pattern's first fixation","in a filter","hidden"], "a":1,
   "w":"Attention is spent before it's earned: top-left = the ONE number the meeting watches."},
  {"q":"Dashboard defaults (no clicks) must…",
   "o":["be empty","tell the complete story — interactions deepen, never rescue; screenshots travel","show filters","spin"], "a":1,
   "w":"Your page gets exported, forwarded, screenshotted. An empty 'pick filters' canvas is your public face."},
  {"q":"The data-story arc order:",
   "o":["action first","Context → Complication → Resolution (evidence-backed, ending on decisions)","end with data","random"], "a":1,
   "w":"Agreement, then tension, then proposal. Charts appear in arc order, each with a so-what sentence."}],
"v5": [
  {"q":"Dual-axis theater manufactures correlation by…",
   "o":["honesty","rescaling two axes until unrelated trends 'race together' — visual perjury","trends","labels"], "a":1,
   "w":"Diverging axis ranges fake fit. Sync only same-unit overlays; declare dual units loudly or facet instead."},
  {"q":"Every uncertainty mark on a chart must disclose…",
   "o":["nothing","what the band IS, the confidence level, and n/source basis","colors","secrets"], "a":1,
   "w":"Mystery bands breed ghost beliefs. Declare CI/sd/percentile + level + n — then let viewers decide."},
  {"q":"Control charts (SPC) detect…",
   "o":["only outliers","special-cause shifts: >3σ points, runs/trends (drift!) vs ordinary noise — close-cycle monitoring gold","bugs","profits"], "a":1,
   "w":"Common vs special cause: don't chase noise, never ignore the 8-point run creeping your close time up."}],
"v6": [
  {"q":"Production workflow order:",
   "o":["polish first","Brief → Sketch → Prototype → Critique → Polish → QA","QA first","random"], "a":1,
   "w":"Brief saves days: audience × decision × cadence BEFORE pixels. Sketch on paper; ugly-true beats pretty-wrong? Always."},
  {"q":"Rubric ship threshold:",
   "o":["any score","≥42/50 total AND no dimension below 3 — strengths can't bail out deal-breaker axes","50/50","gut feel"], "a":1,
   "w":"One dishonest axis invalidates ten brilliant choices — hence the floor per dimension."},
  {"q":"'Reconcile before reveal' means…",
   "o":["format dates","headline numbers tie-out to source totals before any demo — finance's trust oath","print first","zoom"], "a":1,
   "w":"Execs trust what reconciles. Polish is schedule risk; wrong numbers are bankruptcy. QA battery includes tie-out."}],
"w1": [
  {"q":"The four components of a time series — and which are forecastable?",
   "o":["all four","Trend + Seasonality + Cycle + Irregular; T & S are predictable, I is only bounded, C needs long data","trend only","noise only"], "a":1,
   "w":"Decompose first, forecast the predictable parts, bound the rest. ShopKart: May 1.29 / Feb 0.80 = pure seasonality."},
  {"q":"ACF signature of annual seasonality on monthly data:",
   "o":["no bars","a spike at lag 12 (and harmonics 24…) — same month echoes every year","only lag 1","flat line"], "a":1,
   "w":"Trend = slow decay across all lags; season = spike exactly at the period. Both can co-exist on one wall."},
  {"q":"ADF test p < 0.05 means…",
   "o":["nothing","stationarity defensible — statistical properties hold steady → models can generalize","data is fake","trend is gone"], "a":1,
   "w":"The gate before ARIMA-family modeling: reject unit-root, then p,d,q hunting may begin."}],
"w2": [
  {"q":"A 2×12-MA improves on plain 12-SMA by…",
   "o":["being longer","centering the even-window trend ON each month — aligned, unbiased-phase trend spine","adding seasons","smoothing less"], "a":1,
   "w":"Even windows sit between months; averaging two adjacent 12-SMAs re-centers it. Classical decomposition's backbone."},
  {"q":"EMA_t = α·y_t + (1−α)·EMA_(t−1) wins on dashboards because…",
   "o":["it is old","one-step recursion, no stored window — fresh each refresh; half-life makes the span explainable","it's exact","colors"], "a":1,
   "w":"HL = ln2/−ln(1−α). Say 'the memory halves every 4 months' and the room finally understands smoothing."},
  {"q":"Deseasonalized comparisons fix…",
   "o":["charts","calendar-rhythm illusions: 'Dec fell −11%' is season (0.89 index), not a business turn","decimals","grains"], "a":1,
   "w":"Compare like-for-like: strip the seasonal component (Y/S) before judging consecutive months."}],
"w3": [
  {"q":"Benchmarks every forecast must beat:",
   "o":["ARIMA","naive, seasonal-naive, drift (+mean) — scored on rolling windows","Excel","the mean"], "a":1,
   "w":"A model that loses to 'same month last year' gets deleted without discussion. MASE < 1 formalizes it."},
  {"q":"Holt-Winters adds over Holt…",
   "o":["nothing","a seasonal component (additive or multiplicative) on top of level + trend","longer window","Excel mode"], "a":1,
   "w":"SES=level → Holt=+trend → Winters=+season. Match the ladder to the structure, never more."},
  {"q":"Damped Holt's φ exists because…",
   "o":["fun","plain Holt extrapolates last slope forever — φ bends the runway toward flat far out","Excel","speed"], "a":1,
   "w":"Linear-runway hype: revenue trends fade, empires plateau. φ = trend + (φ+φ²+…+φʰ)·trend decays geometrically."}],
"w4": [
  {"q":"In ARIMA(p,d,q), finance level series default to d=…",
   "o":["0","    1 — first-difference reaches stationarity for trending levels","2 always","12"], "a":1,
   "w":"Diff once for trend; returns/growth are already ~stationary (d=0 there). d=2 only if diff still trends."},
  {"q":"ACF cuts after lag q, PACF trails off ⇒ the series looks like…",
   "o":["white noise","MA(q)-dominant — shocks linger briefly then clear (mirror: PACF cuts after p ⇒ AR(p))","trend","season"], "a":1,
   "w":"The identification duet: PACF tells AR order, ACF tells MA order. Blurry walls → AIC + Ljung-Box referee."},
  {"q":"Ljung-Box failing on your champion's residuals means…",
   "o":["victory","predictable structure remains — revisit orders/seasonality/covariates; never ship through a failed gate","done","more data"], "a":1,
   "w":"White-noise leftovers are the goal: mean≈0, ACF inside band, no lag-12 ghosts."}],
"w5": [
  {"q":"Rolling-origin validation beats one holdout because…",
   "o":["it's slower","it scores across MANY origins/seasons/regimes — error distribution, not one lucky year","it's easier","fewer models"], "a":1,
   "w":"Holdout = one roll of dice in one historical mood. Rolling = honest autopsy over multiple worlds."},
  {"q":"MASE < 1 means…",
   "o":["perfect","your model's MAE beats in-sample naive MAE — the benchmark law quantified","overfit","bad data"], "a":1,
   "w":"Champion-selection metric: comparable across scaled series, benchmark-relative, tournament-native."},
  {"q":"Hierarchical forecasts must be coherent because…",
   "o":["controllers say so","every cut (Region/Category/Channel) must sum to the SAME total — one truth for the close pack","it's pretty","tax rules"], "a":1,
   "w":"Bottom-up/top-down/middle-out + reconciliation (MinT-family) — S5/P5's tie-out religion in forecast form."}],
"w6": [
  {"q":"A band budget uses P50/P80/P20 for…",
   "o":["decoration","operating plan / stretch target / covenant & credit-line sizing — bands govern, points pretend","audits only","colors"], "a":1,
   "w":"Treasury sizes safety to P20; targets ride P50. 'Missed budget' becomes 'outside the corridor' — sharper accountability."},
  {"q":"Dethroned champion models should…",
   "o":["be deleted","shadow-run one more quarter — dethronement is evidence-decided, not mood-decided","be hidden","cost more"], "a":1,
   "w":"Shadows keep receipts. If the old model rebounds, the council sees it in the scoreboard."},
  {"q":"FVA (Forecast Value Added) measures each process step by…",
   "o":["meetings held","whether it beats the error of the step before it (naive→model→planner) — theater steps get cut","cost","speed"], "a":1,
   "w":"Win-rate per step with an override log — survivorship-proof, audit-friendly, institution-grade."}],
"e1": [
  {"q":"A letter's NAME vs its SOUND:",
   "o":["they're identical","we say names when spelling (R-A-V-I) but sounds inside words (cat uses /k/ of C)","names for kids","sounds only in songs"], "a":1,
   "w":"Spelling = names; reading = sounds. C is 'see' by name, /k/ or /s/ by sound — never 'ch'!"},
  {"q":"'An hour', not 'a hour', because…",
   "o":["it's longer","h is silent — articles follow the SOUND (vowel sound asks for 'an')","tradition","it's capital"], "a":1,
   "w":"Same family: an MBA ('em-bee-ay' starts with vowel sound), a university ('yoo-' = consonant sound)."},
  {"q":"The Indian-time favourite 'quarter to seven' means…",
   "o":["7:15","7:25","6:45 — quarter BEFORE seven o'clock","7:45"], "a":2,
   "w":"'To' points to the coming hour. Half past six = 6:30, quarter past = :15."}],
"e2": [
  {"q":"Hindi says 'मैं चाय पीता हूँ' — English demands which order?",
   "o":["the same","S → V → O: 'I drink tea' — verb stays right after the subject","O → V → S","any order"], "a":1,
   "w":"Hindi ends on the verb; English parks it beside the subject. The #1 habit to retrain."},
  {"q":"Which is correct English?",
   "o":["I am agree","I am having a car","I have a car — ownership uses 'have', and 'agree' needs no 'am'","Both are fine"], "a":2,
   "w":"'Am agreeing/having' covers ACTION right now (I am having lunch = eating!). Ownership/feelings stay simple."},
  {"q":"On the phone, introduce yourself with…",
   "o":["I am Ravi","Myself Ravi","He is Ravi","This is Ravi speaking"], "a":3,
   "w":"Phone convention = 'This is…'. 'Myself Ravi' is never a self-intro (myself = emphasis: 'I did it myself')."}],
"e3": [
  {"q":"The standard (international) family word that covers 'cousin brother':",
   "o":["cousin — any age, any gender","far-brother","co-brother","nephew"], "a":0,
   "w":"'Cousin brother/sister' is Indian English only — lovely at home, confusing abroad. Standard: just cousin."},
  {"q":"at/on/in for time — correct match:",
   "o":["at 8:30, on July, in Monday","in 8:30, at July, on Monday","at 8:30 (exact time), on Monday (days), in July (months/years)","all 'on'"], "a":2,
   "w":"Exact clock-time = at; days & dates = on; months/years/parts of day = in. Bonus trap: AT night!"},
  {"q":"Most polite request form on the ladder:",
   "o":["Give water","Water please","Can I have water?","Would you mind getting me some water, please?"], "a":3,
   "w":"Longer/softer frame = more politeness, zero grammar risk — memorize the fixed blocks."}],
"e4": [
  {"q":"'Does she goes?' — the verdict:",
   "o":["fine","wrong — 'does' already carries the -s: 'Does she GO?'","needs two -s","rural English"], "a":1,
   "w":"One -s per team! With does/did, the main verb returns to base. Same: 'I didn't go', not 'didn't went'."},
  {"q":"'Yesterday I go' breaks which rule?",
   "o":["no rule","'ago/yesterday/last' = past signals → go in past: 'Yesterday I WENT'","verb too short","subjects"], "a":1,
   "w":"Signal-first habit: read the time word, THEN pick the tense switch. Signals kill 80% of errors."},
  {"q":"'Look at those clouds — it ___ rain.'",
   "o":["will be","went","is going to — visible evidence demands going to","goes"], "a":2,
   "w":"will = promises/opinions; going to = fixed plans & evidence-based predictions."}],
"e5": [
  {"q":"Reading tactic when hunting ONE fact (price/time):",
   "o":["read everything twice","skim","scan — slide straight to where the fact lives","translate fully"], "a":2,
   "w":"Three gears: skim for gist, scan for facts, deep-read only where meaning matters."},
  {"q":"Unknown word blocks your reading — first move?",
   "o":["stop and give up","dictionary immediately","skip the sentence","guess from context — the sentence usually explains it"], "a":3,
   "w":"'Ravi was exhausted after sixteen hours' — the sentence itself says: tired! Dictionary = last resort."},
  {"q":"it's vs its — correct pair:",
   "o":["identical","it's = it is / its = belonging (the shop lost ITS keys)","its = it is","it's = belonging"], "a":1,
   "w":"Swap-test with 'it is'. If the sentence still works, use it's. Otherwise its."}],
"e6": [
  {"q":"V vs W mechanics:",
   "o":["identical sounds","both teeth","both lips","V: teeth on lip (buzzing) · W: lips rounded (no teeth)"], "a":3,
   "w":"Mirror drill: v-v-vest (teeth!) vs w-w-west (round lips). One week of this = fixed for life."},
  {"q":"To fix 'tink' for 'think', place the tongue…",
   "o":["behind teeth","between the teeth, air flowing out","on the palate","rolled"], "a":1,
   "w":"TH = tongue between teeth. Voiced version (the/this) buzzes the same spot."},
  {"q":"English rhythm vs Hindi rhythm:",
   "o":["identical beats","English stress-timed — STRONG content words, shrunk glue-words; Hindi syllable-even","both fast","n/a"], "a":1,
   "w":"'I WANT to GO to the MARket' — big words big, little words tiny. Clap stress for instant naturalness!"}],
"n1": [
  {"q":"In a news article, the LEAD (first paragraph) is special because…",
   "o":["it's the longest paragraph","it answers the 5Ws — who, what, when, where, why — in 1–2 lines","it carries the ads","it's written last"], "a":1,
   "w":"Headline + lead = 80% of the story. Everything below is evidence, background and quotes."},
  {"q":"Headline: 'ShopKart to open 100 dark stores' — 'to open' really means…",
   "o":["it opened yesterday","it is opening right now","it PLANS to open — 'to + verb' = future in headline code","it's a grammar mistake"], "a":2,
   "w":"Headline code: present simple = past events, 'to + verb' = future plans, colon = 'said', articles (a/an/the) dropped."},
  {"q":"₹2.5 crore equals…",
   "o":["2.5 million","25 million","250 million","2.5 billion"], "a":1,
   "w":"1 crore = 10 million → 2.5 crore = 25 million. Quick rule: lakh ÷ 10 = million; crore × 10 = million."}],
"n2": [
  {"q":"The 30-second summary formula runs in which order?",
   "o":["opinion → details → date","FACT (what happened) → IMPACT (why it matters) → WHAT NEXT","greeting → weather → news","numbers → names → quotes"], "a":1,
   "w":"Three sentences: who did what, the so-what, and what happens now. Compression = credibility."},
  {"q":"'According to the Economic Times,…' is an example of…",
   "o":["hedging","attribution — naming your source, which borrows credibility","small talk","a filler phrase"], "a":1,
   "w":"Reported speech + named source = analyst voice. Hedging is a different tool ('could/might')."},
  {"q":"Best SPOKEN version of ₹71.8 lakh in a 30-second summary?",
   "o":["seventy-one point eight lakh exactly","about seventy-two lakh — rounded, with a pause before + after","seventy lakh flat","seven point one eight million"], "a":1,
   "w":"Max two digits spoken, direction word attached, padded with pauses. Exact figures live on paper."}],
"n3": [
  {"q":"Safest way to disagree with a senior colleague?",
   "o":["stay silent forever","'No, that's wrong.'","soft opener first: 'I see your point, but…' — attack the idea, respect the person","send an email later"], "a":2,
   "w":"The ladder: softest → direct. Concede something, then disagree with the IDEA, never the person."},
  {"q":"Best first entry into a noisy group discussion?",
   "o":["shout your point loudest","wait for silence that never comes","build on someone's point: 'Great point by Priya — and to add…'","repeat what the topper said"], "a":2,
   "w":"Listening + adding scores double: teamwork AND content in one move. Never barge; keep turns under 45 seconds."},
  {"q":"'Did you see the news about the RBI rate cut?' is…",
   "o":["a bulletin transition","a news small-talk OPENER — current, safe and open","a headline rule","hedging language"], "a":1,
   "w":"Openers + the 3-reply loop (react → add/question → mini-view) = how office news conversations begin."}],
"n4": [
  {"q":"The 4-beat briefing order:",
   "o":["context → headline → forecast → intro","HEADLINE → CONTEXT → IMPACT → WHAT NEXT","thanks → numbers → jokes → bye","any order works"], "a":1,
   "w":"Hook the fact, give the backstory, land who wins/loses with numbers, close with your view + what's next."},
  {"q":"Presenting a chart verbally, you should FIRST…",
   "o":["read every axis label aloud","describe the SHAPE ('line climbs, dips in Feb…'), then land ONE hero number","apologize for messy data","count the bars"], "a":1,
   "w":"Brains process shape before digits. Shape → one rounded number → meaning. The room remembers one number, not eleven."},
  {"q":"In Q&A you genuinely don't know the answer. The pro move:",
   "o":["make a confident guess","silently change the subject","P.A.R. — pause, acknowledge, respond honestly: 'I'll verify and share by EOD'","end the meeting early"], "a":2,
   "w":"Honesty under pressure is a promotion signal. Bluffing on live data is how trust dies."}],
"n5": [
  {"q":"'ShopKart's profit beat street estimates' means profit was…",
   "o":["lower than expected","exactly as expected","higher than analysts predicted — markets move on surprise vs expectation","against regulations"], "a":2,
   "w":"Prices already contain expectations; the surprise (actual − expected) is the new information that moves stocks."},
  {"q":"RBI cuts the repo rate. The correct office-talk chain:",
   "o":["EMIs rise → spending falls","loans get cheaper → EMIs fall → consumption rises → markets usually cheer","inflation jumps instantly","the rupee stops trading"], "a":1,
   "w":"Repo is RBI's master rate: cut = cheaper credit + growth push; hike = inflation brake. Say the chain, win the chai debate."},
  {"q":"'Sensex down 1,000 points — bloodbath!' — the pro correction:",
   "o":["short everything you own","panic politely","translate to % + context: 'down about 1.2% — a normal volatile day'","points and % are the same thing"], "a":2,
   "w":"Points scale with index level; percentages don't. Pros always quote % and add context — never drama words without data."}],
"b1": [
  {"q":"Your colleague who works at the SAME level as you is your…",
   "o":["subordinate","peer — a colleague at your level","superior","boss"], "a":1,
   "w":"Subordinate = below you, superior = above you, peer/colleague = level with you. Direction words matter!"},
  {"q":"You CHOOSE to leave your job for a better offer. The correct word:",
   "o":["got fired","got laid off","resigned","retired"], "a":2,
   "w":"Resign/quit = your choice · fire = your fault · lay off = company's economics · retire = career end. Four different stories!"},
  {"q":"'Please share the informations' is wrong because…",
   "o":["spelling","information is UNCOUNTABLE — no plural: 'share the information'","it's rude","missing 'please'"], "a":1,
   "w":"Same trap family: feedback, work, furniture, advice, luggage — no -s, no 'a/an'!"}],
"b2": [
  {"q":"Revenue vs profit:",
   "o":["same thing","revenue = total sales in; profit = what remains after all costs","profit counts sales; revenue counts costs","both mean salary"], "a":1,
   "w":"'Revenue up, profit down' is a real headline — knowing the difference is what separates you from chai-stall analysts!"},
  {"q":"A startup valued over $1 billion is called a…",
   "o":["conglomerate","unicorn","subsidiary","blue-chip"], "a":1,
   "w":"Conglomerate = group of many businesses; subsidiary = child company; blue-chip = big safe listed company."},
  {"q":"A flour mill selling to bakeries is a ___ business:",
   "o":["B2B — business sells to business","B2C","D2C","B2G"], "a":0,
   "w":"B2B = to businesses · B2C = to consumers (ShopKart!) · D2C = brand sells direct, no middlemen."}],
"b3": [
  {"q":"CC vs BCC:",
   "o":["identical copies","BCC = blind copy — recipients can't see who else got the mail","BCC = bigger copy","CC is secret"], "a":1,
   "w":"CC = visible FYI. BCC = hidden — use for privacy with many external recipients; never for sneaky internal moves!"},
  {"q":"'Let's take this offline' means…",
   "o":["disconnect the internet","discuss it later/privately — not in this meeting","print the file","the meeting is cancelled"], "a":1,
   "w":"Meeting gold phrases: park it, circle back, wrap up, action items — chair 60 seconds and you sound senior."},
  {"q":"Why replace 'Please do the needful'?",
   "o":["it's rude","too long","it's vague — state the exact action: 'Please approve invoice #221 by Thursday'","it's French"], "a":2,
   "w":"Vague requests transfer the thinking to the reader. Specific + deadline = senior email. Also fix: revert→reply, passed out→graduated!"}],
"b4": [
  {"q":"'Let's pick the low-hanging fruit first' means…",
   "o":["import fruit","grab the easiest, quickest wins before the hard stuff","take a break","blame the juniors"], "a":1,
   "w":"Progress idioms team: get the ball rolling, move the needle, in the pipeline, hit the ground running."},
  {"q":"Which collocation pair is CORRECT?",
   "o":["do a decision · make business","make a decision · do business","make homework · do money","do a mistake · make a favour"], "a":1,
   "w":"MAKE: decision, money, progress, mistake, effort · DO: business, research, homework, a favour. And a deal is CLOSED, not done!"},
  {"q":"Buzzword rule — 'We leverage synergistic paradigms for scalable disruption' is…",
   "o":["excellent English","BS Bingo bait — translate to human words: 'we work with partners to grow'","formal register","correct idiom use"], "a":1,
   "w":"One buzzword = flavour; five = fog. Clear is senior. Could a 12-year-old understand it? If not, simplify."}],
"b5": [
  {"q":"CTC ₹10 LPA but in-hand ₹68,000/month. The gap is…",
   "o":["a banking error","employer PF + gratuity + bonuses inside CTC, minus employee PF/TDS deductions before credit","tax refund","fake offer"], "a":1,
   "w":"CTC = total cost to company. In-hand = what reaches your bank after the named deductions. Say BOTH numbers like a pro."},
  {"q":"Your EMI is made of…",
   "o":["only interest","only principal","principal + interest parts in each installment","bank charges"], "a":2,
   "w":"EMI = equated monthly installment. Early EMIs are interest-heavy; later ones eat more principal. Prepayment cuts principal directly!"},
  {"q":"A SIP is…",
   "o":["a one-time big investment","investing a fixed amount regularly (monthly) into a mutual fund","a bank loan","an insurance claim"], "a":1,
   "w":"SIP = systematic investment plan: auto-invest monthly, buy at every NAV, rupee-cost average like a machine."}],
"l1": [
  {"q":"Best subject for chasing invoice approval?",
   "o":["Quick question","Approval needed: invoice #FF-221 (₹47,250) by Thursday","Hi Amit","PLEASE READ: important!!"], "a":1,
   "w":"Formula: action tag + topic + deadline. Searchable 6 months later; junk subjects ('Hi', 'Question') vanish forever."},
  {"q":"A single email should carry…",
   "o":["as many requests as you remember","ONE main purpose — readers answer #1 and skim the rest","max 2 topics, always","only questions"], "a":1,
   "w":"The reader processes at the speed of the weakest point. One mail = one purpose; everything else gets its own mail."},
  {"q":"Most important information belongs…",
   "o":["at the end, as a punchline","at the TOP — readers skim on phones between meetings","in the middle","in the PS line"], "a":1,
   "w":"Upside-down writing (BLUF's seed). If only the first line gets read, the email should still have landed."}],
"l2": [
  {"q":"Which request actually gets actioned?",
   "o":["Please send data when free","Could you share the Q2 extract (XLSX, Q1 format) by Wed 3 PM?","URGENT: data needed","Reminder: data"], "a":1,
   "w":"Exact thing + format + why (half line) + deadline (day+time) + escape hatch. People reply to clarity, not pressure."},
  {"q":"Replace 'Per my last email…' with…",
   "o":["As I said earlier…","Circling back on my note below — could you share X by Friday?","You missed this…","nothing — stop writing"], "a":1,
   "w":"'Per my last email' says 'you failed to read'. Restate the ONE ask + deadline kindly — same thread, history intact."},
  {"q":"Leave applications get APPROVED because of…",
   "o":["the emotional reason","the password-protected HR form","the coverage plan — tasks + backup + reachability","capital letters"], "a":2,
   "w":"Managers approve continuity, not absences. Dates + leave type + 3-line handover = instant yes."}],
"l3": [
  {"q":"BLUF means…",
   "o":["write the story, then the point","Bottom Line Up Front — verdict in sentence 1, explanation after","bullets always first","Best Letters Use Fonts"], "a":1,
   "w":"Military habit, business standard: 'Recommendation:' / 'Bottom line:' first, then ≤3 bullets why, then the ask again at the end."},
  {"q":"A professional NO is…",
   "o":["a wall of sorry-sorry","absolute silence","acknowledge + ONE reason + an alternative — a negotiation, not a wall","a CC to their boss"], "a":2,
   "w":"No-with-alternative keeps the relationship AND shows solution-thinking. No-without-alternative just blocks air."},
  {"q":"The complaint spine order:",
   "o":["feelings → threats → ask","facts → impact → ask → future grace note","ask → apology → facts","deadline → anger → facts"], "a":1,
   "w":"Facts (invoice #, dates) are not debatable; impact adds weight; one clear ask with deadline gets resolved. Insults get ignored."}],
"l4": [
  {"q":"Emailing a VP — the subject should read…",
   "o":["Hi, updates inside","topic + verdict + deadline: 'Decision: Option B saves ₹9L — approval by Aug 5'","long and detailed","blank, for focus"], "a":1,
   "w":"Executive altitude: they decide from the subject alone. Verdict squared = subject AND sentence 1. 200 mails/day don't read journeys."},
  {"q":"Cold-email reply-rate KILLER:",
   "o":["a specific research line","a micro-ask (15 min)","vague 'let's collaborate' + 5 follow-ups","a graceful exit line"], "a":2,
   "w":"Research line first, give before asking, micro-ask, dignity exit — and max TWO follow-ups. Third = spam. Forever."},
  {"q":"Job emails must mirror the posting's keywords because…",
   "o":["it flatters HR","ATS bots + 6-sec human scans both match keywords","it fills space","grammar rules demand it"], "a":1,
   "w":"The robot reads exact words; the recruiter skims in 6 seconds. 'Power BI, SQL' in THEIR words = you pass both gates."}],
"l5": [
  {"q":"The holy trinity of every money email:",
   "o":["Dear/Sir/Regards","reference number + exact amount (tax split) + exact date","greeting/apology/closing","logo/border/watermark"], "a":1,
   "w":"Invoice # + ₹amount (+GST split) + date — carry all three even in a one-liner and disputes get nothing to breed on."},
  {"q":"In the 3-step payment reminder ladder, what NEVER changes?",
   "o":["the deadline","same thread + holy trinity + warm professional tone","the GST rate","the UTR number"], "a":1,
   "w":"Deadlines shift and firmness rises — but the thread, the facts (trinity) and the manners stay. Structure escalates; respect doesn't."},
  {"q":"Why counter a salary offer IN WRITING?",
   "o":["writing is more formal","inboxes remember — anchor + reasons survive re-reading and recruiter handovers","it's legally required","phones cost money"], "a":1,
   "w":"Verbal numbers evaporate; recruiters rotate. Written counters keep your anchor, reasons and alternatives exact, forever."}],
"r1": [
  {"q":"'She didn't went to the client meeting' — the fix:",
   "o":["she didn't gone","she didn't go — after do/does/did, the verb returns to base","she doesn't went","she don't go"], "a":1,
   "w":"The 'did' already carries the past; doubling past is the #1 panel fossil. Same family: 'Does she GO?', 'Did you FINISH?'"},
  {"q":"'The list of candidates ___ on your desk.'",
   "o":["are","is — the subject is 'list', not the candidates","were","be"], "a":1,
   "w":"Prepositional decoration (of candidates) can't steal the subject. Same trap: 'A batch of freshers IS…'"},
  {"q":"Introducing yourself in a panel, say…",
   "o":["Myself Amit from Delhi","I'm Amit Sharma, from Delhi","Mine Amit","Itself Amit"], "a":1,
   "w":"'Myself' is only reflective ('I taught myself SQL'). An intro needs a subject: I am…"}],
"r2": [
  {"q":"'I am working here since 2023' — the correct shape:",
   "o":["I work since 2023","I have been working here since 2023","I am have worked since 2023","I was worked since 2023"], "a":1,
   "w":"Open time since = perfect territory: present perfect continuous for ongoing action, or 'I have worked here since 2023'."},
  {"q":"since vs for:",
   "o":["since + start POINT (since 2023) · for + DURATION (for 2 years)","both identical","since + years only","for + dates only"], "a":0,
   "w":"'for 2 years since 2024' can hold both in one sentence. Bonus kill: '2 years back' → '2 years ago'."},
  {"q":"Which sentence is interview-correct?",
   "o":["I have joined in 2023","I joined in 2023 — exact past time takes past simple","I have been join in 2023","I am joining since 2023"], "a":1,
   "w":"Present perfect HATES exact finished time. Fix A: 'I joined in 2023'. Fix B: 'I have been here since 2023'."}],
"r3": [
  {"q":"STAR stands for… and its verb rule:",
   "o":["Story–Talk–Act–Rate","Situation → Task → Action → Result; actions told in past verbs claimed with 'I'","Sit–Think–Ask–Repeat","Skills–Tools–Awards–Results"], "a":1,
   "w":"Panels credit verbs to owners: 'I automated the tracker; the team tested it' — claim your share, keep the team's."},
  {"q":"A weakness answer must always travel with…",
   "o":["an excuse","an improving verb — 'I'm working on… / I've already improved…'","a matching strength","an apology"], "a":1,
   "w":"Naked weakness = confession; weakness + improving arc = the #1 signal of self-awareness. 'Work too hard' fools nobody."},
  {"q":"'I'm more comfortable ___ SQL ___ Python.'",
   "o":["in / than","with / than","with / from","at / to"], "a":1,
   "w":"comfortable WITH X THAN Y. And under formal tone: 'better than I (am)'; watch the fossils 'more better', 'senior then'."}],
"r4": [
  {"q":"'If I ___ hired, I would automate the month-end pack.'",
   "o":["was","were — subjunctive for hypotheticals","am","will be"], "a":1,
   "w":"Imaginary/present conditionals: If + were, would + base. The last fossil panels subconsciously listen for!"},
  {"q":"Why 'an MBA' but 'a CFO'?",
   "o":["random tradition","articles follow SOUND: MBA starts with vowel sound 'em'; CFO starts with consonant 'see'","M is special","both are 'a'"], "a":1,
   "w":"Sound over spelling: an hour ('h' silent), a university ('yoo-'), an HR round ('aitch'), a US company ('yoo-es')."},
  {"q":"'We discussed ___ the migration plan.'",
   "o":["about","nothing — 'discuss' takes no preposition: 'we discussed the plan'","upon","for"], "a":1,
   "w":"Big-3 kills: 'discussed about' ❌, 'comprise of' ❌ (use 'comprises'/'is composed of'), 'entered into the room' ❌."}],
"r5": [
  {"q":"'Prices ___ sharply, so the RBI ___ the repo rate.'",
   "o":["raised / rose","rose / raised — rise takes NO object; raise takes an object","rose / rose","had risen / rose"], "a":1,
   "w":"The sun rises; the RBI raises rates. Sales rose; we raised the forecast. Object = raise, no-object = rise!"},
  {"q":"'Revenue rose ___ 21% ___ ₹71.8 lakh.'",
   "o":["to / by","by / to — growth BY 21% up TO the new level","at / in","from / towards"], "a":1,
   "w":"by = the jump; to = the landing spot. Swap them and you announced wrong numbers — the panel's favourite trap."},
  {"q":"The HR-clean salary sentence:",
   "o":["I am getting salary of 9 LPA","I'm currently drawing ₹9 LPA, in-hand around ₹62,000","Myself paid 9 LPA","My stipend is 9 lakh"], "a":1,
   "w":"'Drawing' is the professional frame; pair with package grammar: 'My package comprises a fixed part plus a bonus.'"}],
"d1": [
  {"q":"Mid-text unknown word blocks you. The rescue ladder?",
   "o":["open the dictionary instantly","skip if the sentence still works; guess from context if the word matters — dictionary is the LAST stop","translate to Hindi always","abandon the paragraph"], "a":1,
   "w":"Skip → guess (definition/example/contrast/logic clues) → rescue ONLY for repeated/central/own-it words. Max 2 stops per page!"},
  {"q":"Chunking means…",
   "o":["reading every word separately","taking 3–5-word meaning-groups per glance, bordered by grammar units","reading verbs only","skipping every third word"], "a":1,
   "w":"Eyes glide chunk-to-chunk: [ShopKart India] [has opened] [100 dark stores]. Grammar itself draws the borders."},
  {"q":"The reading-magnet habit:",
   "o":["read slowly and hope for meaning","set ONE question before reading, so the brain filters for it","always read the last line first","read everything twice"], "a":1,
   "w":"A question tells your attention what to flag — reading with purpose auto-filters 80% of the noise."}],
"d2": [
  {"q":"The notice/circular scan order:",
   "o":["read top to bottom equally","what changed → who → effective date → action+deadline (LAST lines!) → who to ask","skip to the signature","read only emails"], "a":1,
   "w":"Your action + deadline lives at the bottom 90% of the time. Structure scan beats linear read 5×."},
  {"q":"Best reading method for bills & offer letters:",
   "o":["read every word once","scan structure first (bold/numbers/tables), then deep-read the pockets that carry money and conditions","trust the headline price","skip the small print"], "a":1,
   "w":"Fine print carries traps: 'above ₹15,000' conditions, physical-damage exclusions, the To-Pay pyramid."},
  {"q":"Why should you always read the PS line of an email?",
   "o":["PS = decorative flourish","the real action often hides in the PS — hurried writers park the ask there","PS = legal disclaimer","PS shows attachments"], "a":1,
   "w":"After ANY mail, answer aloud: what's the ONE action and by when? Can't answer? Ask, don't guess."}],
"d3": [
  {"q":"'Experts believe growth will cross 7%' — fact or opinion?",
   "o":["fact — attribution makes it true","still the speakers' claim; facts need documents, and ALL predictions are opinions in suits","fact because it's printed","opinion only if in an editorial"], "a":1,
   "w":"Attribution tells you WHO said it, not that it's certain. Verifiable-with-document = fact, else claim."},
  {"q":"The active-summary method's power move:",
   "o":["re-reading the section twice","covering the text and retelling in your own words, then checking the gaps","highlighting everything","copying sentences verbatim"], "a":1,
   "w":"Read → cover → retell → check → title. Retrieval practice beats exposure — the gap IS the learning."},
  {"q":"Detecting author's purpose:",
   "o":["all articles share one purpose","weigh verb neutrality, evidence selection and emotion-word density: inform / explain / persuade / alarm / entertain","editorials = pure facts","length decides purpose"], "a":1,
   "w":"Numbers = informer brain, adjectives = persuader heart. 'Should/must' + one-sided evidence = opinion piece."}],
"d4": [
  {"q":"Effective reading speed equals…",
   "o":["raw words per minute","wpm × comprehension % — 250 wpm at 85% beats 350 at 50%","lines skipped per minute","pages per hour only"], "a":1,
   "w":"Skipping ≠ speed. Real speed = bigger chunks + killed regression. Slow-deep-once beats fast-thin-twice."},
  {"q":"The pointer method works because it…",
   "o":["looks studious","sets steady pace and kills REGRESSION — unconscious backward eye-jumps eating 15–30% of reading time","teaches spelling","slows you safely"], "a":1,
   "w":"Pen under the line, eyes chase; fades after day 7, pace stays. Habitual re-readers gain the most."},
  {"q":"RC exam rule for detail questions:",
   "o":["answer from memory","return to the passage and verify the exact line — RC is open-book; extreme/too-narrow options usually lose","pick 'always/never' options","read questions first, skip passage"], "a":1,
   "w":"Examiners bait memory: too-narrow options = one vivid example you liked; extreme options = measured authors never sign."}],
"d5": [
  {"q":"A headline screams 'Profit soars 240%!'. First analyst move?",
   "o":["forward it to office chat","audit exceptional items & the base — strip one-offs before judging, PR leads with the biggest legal number","buy the stock","margin = profit ÷ revenue"], "a":1,
   "w":"One-time gains/losses inflate stories. 'Ex-items, profit grew X%' is the real engine. Base effects hide inside YoY too."},
  {"q":"RBI says stance = 'withdrawal of accommodation'. Translation?",
   "o":["rate cuts coming","future bias toward HIKES — EMIs can rise; 'accommodative' would signal cut-bias, 'neutral' sits two-way","banks on holiday","nothing — decoration"], "a":1,
   "w":"The stance trio: accommodative → cut-leaning · neutral → two-way · withdrawal of accommodation → hike-leaning. That's your home-loan crystal ball."},
  {"q":"In an auditor's report, the quiet killer phrase is…",
   "o":["true and fair view","'qualified opinion' / 'material uncertainty' — anything extra is a 🚩; 'true and fair view' alone is the clean pass","managed by professionals","date of signature"], "a":1,
   "w":"90-second story: clean = 'true and fair view'. 'Qualified', 'emphasis of matter', 'material uncertainty' = slow down and investigate."}],
"g1": [
  {"q":"The single biggest mindset fix for GDs is…",
   "o":["memorise 100 English lines","it's NOT a debate — performers raise the whole group's thinking; observers score behaviour, not victory","speak first and loudest","agree with everything said"], "a":1,
   "w":"Debaters defeat sides; GD scorers watch content + communication + group behaviour + leadership. Arguing to win reads as poor group skills."},
  {"q":"Which two criteria does 'loud + empty' damage at once?",
   "o":["initiation and closure","content quality AND group behaviour — both collapse when volume carries no substance","only communication","none, volume impresses"], "a":1,
   "w":"Empty turns score down on content; steamrolling scores down on group behaviour. A double penalty in one habit."},
  {"q":"In a 12-minute, 10-person GD your realistic target is…",
   "o":["speak the most minutes","2–3 structured turns of ~20–25 seconds — quality per second beats total seconds","one long speech","speak only at the end"], "a":1,
   "w":"72 theoretical seconds each, reality less. Two excellent beats get written up; six forgettable ones get nothing."}],
"g2": [
  {"q":"The 6-lens explosion exists to solve…",
   "o":["impressing with big words","the blank head in the thinking minute — six forced lenses guarantee raw material in 20 seconds","pronunciation","memorising topics"], "a":1,
   "w":"People/money/law/society/tech/future: any topic yields six cells. Blank head disappears permanently."},
  {"q":"The safe data formula for a GD is…",
   "o":["quote exact decimals confidently","hedge + attribute + round: 'as per reports… roughly 18 billion…' — over-precise fakes sink credibility","avoid all numbers","invent plausible stats"], "a":1,
   "w":"Hedge signals honest approximation, attribution names the source-family, rounding sounds real. Never 'exactly 67.4%'."},
  {"q":"'Let's first define the topic' is which opener — and strongest when?",
   "o":["data opener, on current affairs","the Definition opener — strongest on abstract/ambiguous topics where anchoring the term IS leadership","question opener, always","story opener, never"], "a":1,
   "w":"Defining 'blue', 'Mercury' or unclear terms structures the whole room — observers pay for structure."}],
"g3": [
  {"q":"Someone holds the floor mid-flow. Correct first step?",
   "o":["interrupt loudly","rung 1: visible signal (lean in, hand half-raised, nod) and slide into the next micro-gap with a ≤6-word trigger","wait for 10-second silence","address the observer"], "a":1,
   "w":"Windows are 1–3 second exhales. Long wind-ups get re-interrupted; enter on the last word, not after silence."},
  {"q":"The highest-scoring single move is usually…",
   "o":["the data dump","the build-on: 'Building on X's point…' scores content + listening + group behaviour in one sentence","speaking first","the loudest summary"], "a":1,
   "w":"You took their idea further — the observer ticks three criteria at once and notes 'team player'."},
  {"q":"'You're wrong, that makes no sense.' The scored response is…",
   "o":["fight back harder","3-breath pause then thank-and-pivot: 'Fair point — let me narrow my claim…' composure is free marks","go silent the whole GD","complain to moderator"], "a":1,
   "w":"The pause reads as confidence; absorbing and pivoting scores group behaviour. Getting hot donates your marks."}],
"g4": [
  {"q":"Why record a Speaker-B reply in the kitchen-table protocol?",
   "o":["to double air-time","disagreeing gracefully is the least-practised highest-scored skill — simulating both sides trains the reflex","to fill 6 minutes","for accent practice only"], "a":1,
   "w":"You can't drill grace under fire alone… unless you invent the fire. Speaker B is the fire."},
  {"q":"Rubric targets for week 3 of practice:",
   "o":["5s everywhere immediately","4s on Content + Communication (trainable solo); 3s elsewhere — perfection now = procrastination","only leadership matters","no scoring until placement"], "a":1,
   "w":"Solo practice moves content/communication first; group behaviour needs humans. Score honestly, improve one fix daily."},
  {"q":"The playbook bans corridor gossip after the GD because…",
   "o":["corridors are noisy","assessment doesn't stop at the door — observers are still around; professionalism is a full-day signal","it's bad luck","HR forbids talking"], "a":1,
   "w":"Thanks, chair back, quiet exit. The GD ends when you leave the building, not when the timer stops."}],
"g5": [
  {"q":"'Margin improved from 2.0% to 2.4%' — phrase the change as…",
   "o":["margin up by 0.4%","up 0.4 percentage POINTS — margin moves in points, not percent; conflating them embarrasses in finance rooms","margin 2.4 better","margin doubled"], "a":1,
   "w":"2.4 − 2.0 = 0.4 points. 'By 0.4%' would mean 2.008%. Points vs percent is the classic finance-GD trap."},
  {"q":"The Analyst's 4-beat order is…",
   "o":["opinion → feeling → repeat → exit","metric → base → driver → call: name the number, give the comparison window, what moved it, then your decision","data → story → data → data","ask → wait → ask → wait"], "a":1,
   "w":"Number first lands authority; call last lands leadership. 'Profitability is the metric… my call: vendor terms first.'"},
  {"q":"'Net profit up 252% — ShopKart is booming!' Your analyst reply…",
   "o":["agree and celebrate","agree-and-add + small-base caveat: ₹1.09L→₹3.85L is ~₹2.8L absolute; strip exceptionals — it's margin RECOVERY, not boom","leave the room","quote a bigger number back"], "a":1,
   "w":"Base effect: 252% off under-1% margin flatters itself. Auditing the base + one-offs before celebrating IS the analyst move."}],
"i1": [
  {"q":"An interview primarily measures…",
   "o":["your memorized knowledge","SIGNAL: 'can I work with you daily • will you own problems • can you think off-script' — knowledge got you the interview","your accent quality","your speed of talking"], "a":1,
   "w":"The resume already passed the knowledge screen. The room scores clarity, ownership stories with numbers, and structured thinking under curveballs."},
  {"q":"Catching the question species in the first 3 words lets you…",
   "o":["ignore part of the question","answer in the RIGHT SHAPE: direct→short, behavioral→STAR, situational→structure aloud, deep-dive→layered","skip STAR practice","impress with big words"], "a":1,
   "w":"'Tell me about a time…' demands a story, not theory. 'Walk me through…' demands layers with check-ins. Shape = half the marks."},
  {"q":"The 3 acceptable 'I don't know' forms all preserve…",
   "o":["your salary range","TRUST — pivot / divide / commit keep it; the fourth form (bluffing) burns it permanently","the time limit","your ego only"], "a":1,
   "w":"'Haven't used it directly, but here's my approach…' is strength. One caught bluff ends the interview — every interviewer is a professional detector."}],
"i2": [
  {"q":"In STAR, the Action beat deserves ~60% because…",
   "o":["interviewers love long stories","they hire YOUR actions, not the weather report — most candidates invert it and drown in Situation","action is easy to invent","Situation bores them legally"], "a":1,
   "w":"S 15% · T 10% · A 60% · R 15%. Verbs-first Actions, land on ONE number, then stop talking."},
  {"q":"The correct weakness formula is…",
   "o":["'I'm a perfectionist'","real weakness → damage limiter → measurable fix → evidence; fake strengths-as-weaknesses are eye-roll bait","never admit any weakness","blame the education system"], "a":1,
   "w":"True + contained + fix-in-progress: 'I used to skip data validation → cost me a wrong report → now a 4-step ritual → last three projects error-free.'"},
  {"q":"HR probes expected CTC early. Best shape?",
   "o":["refuse to answer twice","range + rationale + flexibility: '₹9–11 LPA based on benchmarks — open once I see the full scope.' Deflect at most once","give current CTC only, one number","say 'as per company standards'"], "a":1,
   "w":"A range signals research; rationale signals logic; flexibility signals non-fragility. Refusing twice reads as hiding."}],
"i3": [
  {"q":"The bought-time line works because it…",
   "o":["shows you're slow","converts silence into ANNOUNCED THINKING — the room reads 'composing' not 'panicking' (max 2 uses)","tricks the interviewer","buys 30 seconds"], "a":1,
   "w":"'Let me take a second to structure that properly' + eyes up + 5 seconds = seniority. 'Umm sorry one minute' + eyes down = panic."},
  {"q":"In a guesstimate, interviewers actually score…",
   "o":["final accuracy","STRUCTURE + narrated arithmetic: segments, round numbers, constant narration, sanity check — wild-but-structured beats exact-but-silent","memory of statistics","how fast you answer"], "a":1,
   "w":"Clarify → segment → maths aloud → sanity check. The thinking is the product; silence is the bug."},
  {"q":"They ask 'Are you sure?' a second time. Correct move?",
   "o":["cave immediately","re-state logic calmly, then invite their concern — confidence + open door; caving = spineless, fighting = ego","raise your voice","change the topic"], "a":1,
   "w":"'I'm confident in the arithmetic — if you share the concern, I'll correct happily.' Verify once, stand once, never fight."}],
"i4": [
  {"q":"The gut-feel score in the mock protocol exists because…",
   "o":["friends are bad scorers","real interviewers run on it too — technical scores + a final hire/maybe/no gut vote; measure both in practice","it fills time","rubric looks incomplete otherwise"], "a":1,
   "w":"If the mock doesn't capture 'would they hire you', it misses the metric that decides real offers."},
  {"q":"Why review Pass 1 audio-only and Pass 2 video-muted separately?",
   "o":["it's more thorough-feeling","split channels isolate the leak: fillers/pace vanish on mute-video; posture/eye-splits are invisible on audio — a combined pass hides the cause","to use the rubric twice","audio is more important"], "a":1,
   "w":"Diagnose the channel before prescribing the fix. Most students practice content while their BODY loses the marks."},
  {"q":"'Any questions for us?' — best close is…",
   "o":["'No, thank you'","2–3 smart questions on the work, 90-day success and growth path — 'no questions' broadcasts low curiosity","ask about salary immediately","ask for the interviewer's LinkedIn"], "a":1,
   "w":"'What would a great first 90 days look like?' signals ownership. It's the last free impression — keep it."}],
"i5": [
  {"q":"'Grew a lot last quarter' in a finance round is a red flag because…",
   "o":["growth is bad","numbers fluency IS the test: no by/to, no window, no driver = no analyst signal; calibration is competency","HR hates quarters","it's too short an answer"], "a":1,
   "w":"Say: 'up 21% YoY to ₹71.8 lakh — mostly festive season, so watch the base.' Precision + calibration = hired."},
  {"q":"The ethics classic ('smooth the numbers?') has exactly one permanently wrong answer —",
   "o":["refusing too bluntly","FABRICATING/SMOOTHING the numbers — career-ending; the scored answer is transparent facts + honest drivers + a recovery plan","asking for time","saying yes reluctantly"], "a":1,
   "w":"Ledgers outlive jobs. One fabrication follows you forever; one principled refusal gets remembered (in a good way)."},
  {"q":"The capstone finance add-on demands an UNPROMPTED…",
   "o":["salary demand","CAVEAT — small-base or exceptionals honesty nobody asked for; that separates number-readers from analysts","joke","question back"], "a":1,
   "w":"'+252% — but off a ₹1.09 lakh base, and exceptionals sit inside.' Volunteering the caveat = the difference between reporting and analysis."}],
"a1": [
  {"q":"English has ~44 sounds but only 26 letters, meaning…",
   "o":["spelling is reliable","spelling can't teach pronunciation — sound lives in audio; when letters and ears disagree, the ears win","English has 44 letters","accents are spelling mistakes"], "a":1,
   "w":"through/though/thought/tough all rhyme differently. That's why this course is built around the 🎧 clips, not the page."},
  {"q":"The minimal-pairs loop trains, first of all,…",
   "o":["your spelling","THE EAR — mouths can't produce differences ears haven't registered: hear → mirror → record → compare","your handwriting","vocabulary size"], "a":1,
   "w":"Vine/wine fools you? Train the distinction in the ear first; the mouth fixes itself once the difference exists for you."},
  {"q":"Equal weight on every syllable sounds robotic because English…",
   "o":["needs more syllables","is STRESS-TIMED: one syllable gets the beat, neighbors shrink to lazy vowels — equal weight is a non-English drum","should be spoken slowly","has no rhythm"], "a":1,
   "w":"de-ve-lo-pu-men-tu → di-VEL-up-ment. Lazy unstressed vowels aren't sloppy; they're the correct English groove."}],
"a2": [
  {"q":"'de-VE-LOP' with three full equal vowels sounds robotic because…",
   "o":["it's too fast","unstressed syllables must shrink to the lazy schwa — ONE beat, lazy neighbors: di-VEL-up","it's too polite","it needs British accent"], "a":1,
   "w":"Hunting full vowels everywhere is the #1 Indian-English rhythm tell. Embrace the laziness; it's fluent."},
  {"q":"In REcord/reCORD the beat shift signals…",
   "o":["nothing important","WORD CLASS: noun = beat first, verb = beat last — stress carries grammar, like -ed carries past tense","a pronunciation error","British vs American"], "a":1,
   "w":"'Let me REcord the session' (I need a recording) vs 'I'll reCORD your answer' (verb). Interviewers hear the difference."},
  {"q":"'asked' said as 'axed' is dangerous because…",
   "o":["it sounds too British","AXE IS A DIFFERENT WORD — 'axed' means fired/terminated; 'I axed my manager' is not the sentence you meant","it's too old-fashioned","HR prefers 'asked'"], "a":1,
   "w":"ask + t = askt. Practice it with the -ed rule: unvoiced verbs take the /t/ ending."}],
"a3": [
  {"q":"Punch content words, shrink function words — because…",
   "o":["it's fashionable","meaning rides on CONTENT words (reconstruct from 40%); grammar rides on function glue — comprehension engineering","function words are useless","it sounds American"], "a":1,
   "w":"'I WANT to JOIN your TEAM because I LOVE solving PROBlems with DATA' → six punches carry the whole sentence."},
  {"q":"'SQL, Power BI, and Excel' — the tone pattern should be…",
   "o":["fall, fall, fall","rise, rise, FALL — the final fall tells the listener the list ended","rise, rise, rise","flat, flat, flat"], "a":1,
   "w":"All-rising = listener waits awkwardly. All-falling = chopping wood. Rise-rise-fall = natural with a clear end-signal."},
  {"q":"The fastest fix for 'my answers sound like questions' is…",
   "o":["speak faster","LAND the last line on a FALLING tone + micro-pause — rising endings broadcast doubt even with right content","add sorry at the end","use longer words"], "a":1,
   "w":"'So we shipped the dashboard.' ↘ = confidence. '…shipped the dashboard?' ↗ = doubt. Same words, opposite signal."}],
"a4": [
  {"q":"The 3-take method forbids take 12 because…",
   "o":["storage limits","we train HABITS not perfect files — diminishing returns + voice fatigue; tomorrow's fresh take 1 is the training","3 is superstition","files get heavy"], "a":1,
   "w":"Cold → marked → performed, then stop. Obsessing for a perfect take trains perfectionism, not speech."},
  {"q":"In the rubric, the Fluency fix for fillers is…",
   "o":["speak faster","THE PAUSE — replace umm/actually with 200ms silence (<6/min target) — silence sounds confident, fillers sound evasive","bigger vocabulary","reading from notes"], "a":1,
   "w":"Count fillers per minute on your takes. The pause is PR3's golden move doing double duty."},
  {"q":"'Can you hear me clearly?' at call start works because…",
   "o":["it fills silence","one cheap calibration NOW beats discovering garbled audio 12 minutes in — costs a second, builds trust","it's polite tradition","mic tests are mandatory"], "a":1,
   "w":"Cheapest insurance in professional communication. Narrating tech calmly = composed; silently fighting tech = visible chaos."}],
"a5": [
  {"q":"R-S-L stands for — and numbers slow to ~120 wpm because…",
   "o":["read-speak-listen","ROUND, SIGNPOST, LAND — figures get filing time; numbers are the point, so they get the most space, never the least","really slow language","right sound level"], "a":1,
   "w":"'On revenue — about two point eight crore, up eighteen point five percent.' Rounded, signposted, landed falling. Boardroom clean."},
  {"q":"'Exceptional items sit in both years' in the capstone proves…",
   "o":["you read footnotes","you AUDIT before you celebrate — one-offs aren't repeatable; volunteering the caveat compounds listener trust","the company is bad","accounting is complex"], "a":1,
   "w":"RP5/IC5's old friend: unprompted caveats are what separate number-readers from analysts. Say them every time."},
  {"q":"'two point five two times' vs 'up 252%' matters because…",
   "o":["times is shorter","analyst language is STANDARDIZED: multiples are shop-floor fluent, public numbers ride in percent+window+base — code-switching correctly","times is wrong grammar","percentages are bigger"], "a":1,
   "w":"Bilingual between shop-floor ('2.5×') and boardroom ('up 252% YoY off a small base'). The switch itself signals seniority."}],
"h1": [
  {"q":"The 3 jobs of EVERY self-intro are…",
   "o":["impress, educate, entertain","REMEMBERED → TRUSTED → INVITE FOLLOW-UP — a trailer is not a biography; the room keeps a hook or nothing","name, city, degree","fast, loud, funny"], "a":1,
   "w":"Miss job 1 = forgettable. Miss job 2 = memorable for wrong reasons. Miss job 3 = dead air. O·R·P·H hits all three."},
  {"q":"Stretching an intro from 30s to 120s, you add…",
   "o":["more adjectives","EXAMPLES and NUMBERS — never adjectives; delete the least specific line when cutting","your full family tree","faster talking"], "a":1,
   "w":"'Hardworking and passionate' dies first in every edit. Specifics stretch credibility; adjectives stretch only the clock."},
  {"q":"Why the micro-pause + falling tone on your name?",
   "o":["it's dramatic","the NAME is the anchor of job #1: slow+falling makes it owned and catchable; rushed+rising makes it optional","grammar requires it","mics need silence"], "a":1,
   "w":"'I'm AARav.' ↘ = belongs to you. 'Aarav?' ↗ = asking permission. The pause gives the room time to file you."}],
"h2": [
  {"q":"Why do small stories count double for freshers in the grid?",
   "o":["they're shorter","SPECIFIC + SMALL beats GENERIC + BIG: 'cut canteen stockouts in 30 days' is verifiable and memorable; 'passionate since childhood' is neither","big stories are banned","small = humble"], "a":1,
   "w":"Freshers win on specifics, not scale. One 30-day tracked project beats five vague 'various experiences'."},
  {"q":"The 6-word landmark card beats a memorized paragraph because…",
   "o":["it's shorter","NATURAL DELIVERY: you own landmarks and improvise the glue — sentences survive noise tests, recital dies","cards look pro","paragraphs are illegal"], "a":1,
   "w":"Rehearse mirror/recorder/friend/standing/noise — if six words survive the fan-blade test, they survive the interview AC."},
  {"q":"Same facts flipped for professor/manager/friend proves…",
   "o":["you're inconsistent","AUDIENCE FIRST, CONTENT SECOND — the ultimate professional reflex, in intros and dashboards alike","you have 3 personalities","stories are flexible lies"], "a":1,
   "w":"Learning lens (curiosity) / results lens (outcome) / fun lens (energy). Same truth, three doors into three brains."}],
"h3": [
  {"q":"Nervous speakers get the pace ladder backwards by…",
   "o":["speaking too slowly","RACING through names/numbers and SLOWING on fluff — the ladder demands brakes on the important, cruise on the rest","pausing too much","using simple words"], "a":1,
   "w":"Record and find where you sped up — it's your name and your best number, the exact spots that deserve ~120 wpm."},
  {"q":"The name-drop pause's cost vs payoff is…",
   "o":["awkward silence risk","ZERO cost, maximum authority: one breath-length pause = room catches your name + reads composure + launch pad for the headline","it wastes 5 seconds","only for seniors"], "a":1,
   "w":"'I'm Aarav — (breath) — and I turn messy ledgers into decisions.' The pause IS the statement."},
  {"q":"After your hand-off line, correct performance is…",
   "o":["explain more quickly","SILENCE + SMILE — the pause is THEIR conversational turn; 'umm that's it' burns everything you just built","sit down fast","check your phone"], "a":1,
   "w":"The post-intro pause invites follow-up (job 3). Filling it tells the room 'please stop listening', and they obey."}],
"h4": [
  {"q":"Why match practice SHAPE to the actual room?",
   "o":["it looks serious","skill is SHAPE-SPECIFIC: rehearsing seated for a standing room is cricket nets with a tennis ball","rooms don't matter","microphones need it"], "a":1,
   "w":"The body learns the performance it will actually give. Stage scenarios standing, panel scenarios seated, always."},
  {"q":"'One thing to keep, one thing to change' as the peer question works because…",
   "o":["friends like rules","SPECIFIC asks get TRUTH; 'any feedback?' gets 'nice yaar' — a 10-second answerable ask = real data for the next workout","it's polite","two is lucky"], "a":1,
   "w":"Open asks buy compliments. Specific asks buy coaching. You want coaching — compliments don't clear interviews."},
  {"q":"The quarterly upgrade exists to stop intros becoming…",
   "o":["too popular","MOLDED — a frozen intro tells last year's story; one refreshed number per quarter keeps growth VISIBLE","too long","too humble"], "a":1,
   "w":"The intro is a living artifact like your resume: same update rhythm, same owner. Your story compounds or molds."}],
"h5": [
  {"q":"Finance intros win on energy + …",
   "o":["loudness","CALIBRATION — a number with its context; anyone can boom energy, only analysts volunteer the margin context","jokes","certificates listed"], "a":1,
   "w":"'30 days of working capital found — margin sits at 2.4%, so a real lever' beats any 'passionate about finance' ever spoken."},
  {"q":"The caveat rides INSIDE the number's breath because…",
   "o":["it's shorter","separate = SHEEPISH correction; inside = CALIBRATED honesty worn lightly","grammar rules","it hides the number"], "a":1,
   "w":"Same-breath caveat = 'I audit before I celebrate'. Later caveat = 'I got corrected'. Which analyst would you hire?"},
  {"q":"'I saved the company crores' (classroom model) must become…",
   "o":["deleted entirely","HONEST VERBS: 'modeled' / 'found' / 'estimated' — the claim survives intact; only the inflated verb dies","whispered","vague: 'helped with numbers'"], "a":1,
   "w":"Interviewers reward truthful framing with follow-up questions, and punish inflated verbs with challenges. Easy choice."}],
"f1": [
  {"q":"Fluency, correctly defined, is…",
   "o":["zero grammar mistakes","FLOW + COMFORT first, accuracy second — saying what you want at normal speed without panic; even natives make and repair mistakes","very fast speaking","using big vocabulary"], "a":1,
   "w":"Small slips + continuous flow = sounds fluent. Perfect grammar + 4-second freezes = does not. The triangle is 40/40/20, not 100% accuracy."},
  {"q":"The translation trap freezes you because…",
   "o":["Hindi is slower","it adds 4–6 SECONDS per sentence (think in Hindi → search English → assemble grammar → check mistakes); the ladder deletes translation entirely","English words are long","grammar is too hard"], "a":1,
   "w":"Steps 1–5 rewire brain: name the world → silent commentary → feelings → opinions → full inner talk. 5 weeks, English inner voice."},
  {"q":"'Sorry, let me say that again' after a mistake is…",
   "o":["embarrassing","FLUENT-SPEAKER EQUIPMENT — natives repair constantly; 'I mean' / 'let me say that again' / 'what I'm trying to say is' are pro tools","a grammar error","only for beginners"], "a":1,
   "w":"You don't notice native repairs because fluent speakers flow PAST mistakes. Frozen speakers broadcast them. Repair + continue = fluent behavior."}],
"f2": [
  {"q":"Chunks make you fluent because they…",
   "o":["sound fancy","cut sentence-building from ~10 decisions to ~4 shelf-pulls, WITH grammar pre-assembled inside each block","increase vocabulary size","impress the listener"], "a":1,
   "w":"'To be honest] [I didn't like] [the movie] [much' = 4 pulls. Brain does that in Hindi automatically — grow the English shelf 200→2000 blocks."},
  {"q":"Glue phrases vs filler spam — the difference is…",
   "o":["accent","DOSE: 1–2 connectors per minute = natural glue; every sentence starting with 'basically' = spam; the pro replaces excess with a PAUSE","formality","sentence length"], "a":1,
   "w":"Healthy: 'Actually, we shipped Friday — client loved it.' Spam: 'So basically like basically I basically…' — pause beats umm, always."},
  {"q":"The 4th word-rescue move teaches the golden order…",
   "o":["check dictionary first","SPEED FIRST, FANCY LATER: 'very tired' spoken NOW beats 'exhausted' after a 6-second freeze — listeners score flow, not Scrabble value","apologize then continue","switch to Hindi"], "a":1,
   "w":"Describe it → general word → ask the listener → simpler swap. Never the 6-second silent freeze: that's the only real failure."}],
"f3": [
  {"q":"Small talk's real job is…",
   "o":["killing time before the real talk","two humans deciding 'safe or not safe' in 2 minutes — trust opens BEFORE business; skipping it makes everything structurally weird","showing vocabulary","being polite to elders only"], "a":1,
   "w":"FORD lanes (Family, Occupation, Recreation, Dreams) + share-first combo: 'I'm still adjusting to Delhi winter — where are you from?'"},
  {"q":"The ping-pong rule exists because…",
   "o":["questions are polite","answers without returns make INTERVIEWS, not conversations — answer + return question keeps the ball moving 50/50","silence is illegal","people forget names"], "a":1,
   "w":"'Yes, everyone's getting eve chai. You come here often?' — the return question is worth more than the answer. 'Oh really? And then?' = cheapest magic."},
  {"q":"In a 5-bone story, listeners remember…",
   "o":["the date and time","the ONE vivid detail + the LANDING line — 'doors closed in my face' survives; ten plain details die by dinner","your vocabulary level","the moral of the story"], "a":1,
   "w":"Scene → normal → problem → what happened → landing+stop. ≤90 seconds, then ping-pong: 'What's YOUR worst metro story?'"}],
"f4": [
  {"q":"Automaticity is the key to fluency because…",
   "o":["it sounds scientific","only HABIT-BRAIN speech is fast and effortless — thinking brain costs 4 seconds/sentence; daily correct repetition moves chunks into habit","it removes practice","grammar becomes optional"], "a":1,
   "w":"The bicycle story: week 1 terror, week 6 hands-free. Same with English chunks — drills are how skill changes brains."},
  {"q":"In the 4-3-2 drill, why the SAME story all three takes?",
   "o":["to save time","the drill IS the repetition — same content + shrinking time (4→3→2 min) forces the brain to DELETE dead wood and surface best phrasing; new stories = endless warmups","stories are hard to find","it's a memory test"], "a":1,
   "w":"Take 3 vs take 1 is visibly tighter: fewer fillers, clean chunks, tight spine. That's automaticity arriving live, in one sitting."},
  {"q":"The tracker's 'never miss twice' rule protects against…",
   "o":["losing the notebook","HABIT COLLAPSE: one miss is human, two consecutive misses installs a NEW bad habit — the streak is the fragile asset","punishment by tutor","over-practice injury"], "a":1,
   "w":"20 min × 30 days = 30 retrieval events the habit brain trusts. One 10-hour blast = one exhausted event, forgotten by Tuesday."}],
"f5": [
  {"q":"KISS finance asks: can BOTH follow you?",
   "o":["two friends of yours","a 16-year-old cousin AND a CFO — owning multiple registers in one mouth = real expertise; deeper understanding = simpler speech","Hindi and English speakers","panel and HR"], "a":1,
   "w":"The skill isn't dumbing down — it's register-switching. Explaining margin as 'keep from every ₹100' takes MORE mastery, not less."},
  {"q":"The jargon translator's same-breath pattern is…",
   "o":["avoid all jargon","JARGON → 'that is, [plain words]' — immediately: 'working capital — money resting in shelves and supplier bills'","use Hindi translation","explain later in notes"], "a":1,
   "w":"Auto-translation in the same breath = senior explainer. Reciters repeat jargon harder; explainers translate effortlessly."},
  {"q":"In the capstone's friendly register, the +252% caveat must sound like…",
   "o":["a formal footnote","a FRIEND'S WARNING: 'careful — tiny base, so the % looks bigger than the money' — same exceptionals lesson, human music","a joke","silent (skip it)"], "a":1,
   "w":"Analyst content, chai music. That's FL5's entire definition of finance fluency: no footnotes, no lectures — calibrated conversation."}],
"av1": [
  {"q":"'Never think in averages alone — convert to totals' because…",
   "o":["averages are boring","AVERAGES DON'T ADD UP — TOTALS DO; the average only exists as total ÷ n at the final step","totals are easier to memorize","it sounds professional"], "a":1,
   "w":"Combining, splitting, missing-values: all solved in totals. The ledger is the truth; averages are its summaries."},
  {"q":"The sum of deviations around the average is always…",
   "o":["# of terms","ZERO — below-gaps exactly cancel above-gains; any remainder signals a calculation error (free answer-checker)","first + last","unknown till computed"], "a":1,
   "w":"The balance beam: pivot where everything balances. Deviation-zero test = lifetime free verification on every average you compute."},
  {"q":"All 20 numbers increase by 10: the average increases by…",
   "o":["20 (10 × 2)","EXACTLY 10 — golden property, valid since EVERY value changed and n stayed fixed; otherwise the totals engine","10 ÷ 20","it doubles"], "a":1,
   "w":"Add-k/multi-k properties work for every-value changes only. Group-size changes need Module 3's engine — the two gates check first."}],
"av2": [
  {"q":"average = (first + last) ÷ 2 works for…",
   "o":["all data sets","EVENLY-SPACED series (any constant gap) — pairing makes every endpoint pair equal, so the centre is the fair share","small data only","sorted-by-size lists"], "a":1,
   "w":"Pairs 12+16 = 13+15 = 28: every share is 14. Constant gap = constant pairs = middle = average."},
  {"q":"In 21..40, the term count n = …",
   "o":["19 (40−21)","20 — last − first + 1 (inclusive-count trap! chant it every time)","21 (the average)","can't say"], "a":1,
   "w":"Inclusive counting forgets the +1 in 60% of wrong answers. n = last − first + 1, then sum = n × (first + last)/2."},
  {"q":"The middle trick must NOT be used on squares because…",
   "o":["squares too big","gaps between consecutive squares GROW (3, 5, 7…) — not evenly spaced, so no pairing and no centre","exams ban squares","formula unknown"], "a":1,
   "w":"Average of 1,4,9,16 = 30/4 = 7.5 by direct totals. The instant-exceptions: squares, cubes, primes, repeats."}],
"av3": [
  {"q":"When the group size changes, golden properties break — use…",
   "o":["middle-token trick","the TOTALS ENGINE: before-total → event → after-total → the difference IS the answer (plus a sense-check)","guess-and-check","average of averages"], "a":1,
   "w":"Totals are the ledger; averages are summaries. The engine: BEFORE total = oldAvg×oldN, AFTER = newAvg×newN."},
  {"q":"A leaver makes the group's average RISE — the leaver was…",
   "o":["above average","BELOW the old average — cutting a below-pivot weight raises the beam (deviation shortcut: members pocketed the rise)","exactly average","the lazy one obviously"], "a":1,
   "w":"Sense-checks catch sign errors instantly: joiner above → rise; leaver below → rise. Picture the beam."},
  {"q":"(a₁ + a₂)/2 for merged groups is legal ONLY when…",
   "o":["both averages are round numbers","GROUP SIZES ARE EQUAL — otherwise weight: (n₁a₁ + n₂a₂)/(n₁+n₂)","the teacher says so","values are close together"], "a":1,
   "w":"Different sizes = weighted average (Module 4). The combined average must sit between the two, closer to the bigger group."}],
"av4": [
  {"q":"The assumed-mean method is fast because…",
   "o":["it's approximate","small SIGNED DEVIATIONS CANCEL each other — no column arithmetic; D = 0 also self-verifies the answer","calculators allow it","it ignores outliers"], "a":1,
   "w":"Assume 990: −8+5−24+20+7 = 0 → avg 990, proven in the same stroke. Small numbers, big speed."},
  {"q":"Batsman's rise = (score − old avg) ÷ newN because…",
   "o":["it's a cricket rule","ALL OTHER MEMBERS UNCHANGED — the whole group's total changes only by the newcomer's gap, spread over the new count","averages always shift up","innings don't matter"], "a":1,
   "w":"No re-summing 2000 runs. Only the gap (120−50=70) matters, shared by the new innings count (41). Ledger logic."},
  {"q":"The two-group line shortcut divides the gap…",
   "o":["equally down the middle","INVERSELY to group sizes — the big group pulls the pivot toward itself, proportionally","in direct ratio","by a coin flip"], "a":1,
   "w":"Sizes 2:1 → segments 1:2. 20@40 + 10@70: gap 30 splits 10:20 → avg = 50. Big group's pull wins."}],
"av5": [
  {"q":"'At the time of birth' age problems require dividing by…",
   "o":["total members today","members WHO EXISTED THEN — the newborn wasn't in the cohort (total minus newborns)","the youngest's age","n + 1"], "a":1,
   "w":"Total today 100 − 5×8 = 60 over FOUR existing members → 15. Dividing by 5 is the trap the setter prays for."},
  {"q":"The infamous not-out trap makes students divide by…",
   "o":["total innings","DISMISSALS — innings minus not-outs (300/8 = 37.5, NOT 300/10 = 30). The '30' option exists to catch robots","matches played","overs bowled"], "a":1,
   "w":"Batting average = runs ÷ times dismisssed. Read 'not out' in every cricket line before dividing anything."},
  {"q":"60 km/h out and 40 back (same route): why is 50 km/h WRONG?",
   "o":["speeds change over time","TIME is the weight — the slow leg takes 1.5× longer, dragging the mean below the simple average (harmonic = 48)","distance differs both ways","fuel consumption differs"], "a":1,
   "w":"Simple average only legal for equal TIME splits (almost never asked). Equal DISTANCES → harmonic: 2ab/(a+b) = 48."}],
"av6": [
  {"q":"The 'average of averages' vaccine starts with the question…",
   "o":["is it hard?","'ARE THE SIZES EQUAL?' — if not, weighted merge; saying it aloud kills the reflex","who set the paper","what units?"], "a":1,
   "w":"The 5 traps: averages-of-averages, not-out divisor, speed weights, off-by-one count, property overreach. Name them, and they die."},
  {"q":"Back-plug works fastest starting from the…",
   "o":["largest option","MIDDLE option — its failure direction (too high/too low) halves the remaining search instantly","first option","random option"], "a":1,
   "w":"MCQ superpower: options carry information. Middle-option test → sign error → correct band → confirm. Faster than fresh algebra."},
  {"q":"Your error journal's middle column should hold the trap's…",
   "o":["page number","NAME — naming the trap rewires instinct; next time the pattern appears, the vaccine fires before the trap","difficulty rating","attempt date"], "a":1,
   "w":"'Q-code · trap-name · fix'. Two mocks of journaling and your personal trap profile is impossible to surprise."}],
"av7": [
  {"q":"'Average salary ₹12 LPA' lied because the advertiser averaged…",
   "o":["too many people","TWO GROUP MEANS as if sizes were equal ((4+20)/2): the Trap-1 illegal move — weighted truth ≈ ₹6.3 LPA by headcount","in CTC terms","with inflation"], "a":1,
   "w":"Interview counter: 'How does that average break by level?' Weighted-police thinking — hired-worthy on the spot."},
  {"q":"+60% then −30% is NOT '+15%/year' on money because…",
   "o":["markets fluctuate wildly","MONEY MULTIPLIES: ₹100 → 160 → 112; CAGR ≈ 5.8%, not 15% — losses are heavier than equal gains","the fund performed badly","averages always round down"], "a":1,
   "w":"−50% needs +100% to heal. Arithmetic return-averages are always optimistic: 'average return' ad → translate: 'inflated — show CAGR'."},
  {"q":"A bigger k in a moving average makes it…",
   "o":["react faster","SMOOTHER but SLOWER to respond — 7-day for ops, 12-week for management reviews (same trade-off as TS smoothing)","more accurate always","larger in value"], "a":1,
   "w":"SMA-3 catches the W4 spike at 58.7; SMA-4 damps it to 56. k chooses how much noise you tolerate vs how fast you see turns."}],
"br1": [
  {"q":"On a blood-relations tree, the double line = between two boxes (drawn doubled) always means...",
   "o":["The two are twins","The two are HUSBAND & WIFE - a couple at the same generation level","The two are cousins","The two are business partners"], "a":1,
   "w":"Twins share the single sibling line; the double marriage line is reserved for couples. Confusing them flips every count-by-couples sub-question."},
  {"q":"Your mother's brother's daughter is your...",
   "o":["Niece","COUSIN - mama's child sits at YOUR generation (0), maternal side","Aunt","Sister-in-law"], "a":1,
   "w":"Mother's brother = maternal uncle; his daughter is at my level, so cousin. 'Niece' is your sibling's daughter - one stair too low."},
  {"q":"Relative to YOU, your paternal grandfather stands at generation...",
   "o":["0","+2 - parent is +1, parent's parent is +2","-2","+3"], "a":1,
   "w":"Me(0) > father(+1) > his father(+2). The family staircase never lies; count the stairs aloud while pointing."}],
"br2": [
  {"q":"Pointing to a photo, Ramesh said: 'She is the daughter of my grandfather's only son.' The woman is Ramesh's...",
   "o":["Aunt","SISTER - grandfather's only son = his father ('only' = zero brothers); father's daughter = sister","Mother","Cousin"], "a":1,
   "w":"Quote-splitting method: solve the TAIL first. 'Only' is a padlock - grandfather's only son can ONLY be my father."},
  {"q":"'A is the mother of B. B is the sister of C.' A's relation to C is...",
   "o":["Aunt","MOTHER - 'sister of C' locks B & C as siblings of the SAME parents, so A mothers them both","Grandmother","Cannot be determined"], "a":1,
   "w":"'Sister of' is a same-parents bond by exam convention. A is C's mother - 'cannot be determined' would be bait here."},
  {"q":"For 'How is the woman related to ME?' chains, the pro opening move is...",
   "o":["Draw outward from the woman","Anchor MYSELF on the tree first, then hang every clause off ME","Assume her gender and skip drawing","Count the clauses and guess"], "a":1,
   "w":"The anchor technique: 'my' chains give a free starting node - plant ME, hang clauses, trace the walk. Memory-free answers."}],
"br3": [
  {"q":"You receive 4 symbol definitions. Before touching the expression, the champion's first 15 seconds go to...",
   "o":["Reading the options","Writing the FULL DECODE TABLE - every operator's exact words, first-letter rule, gender + level gifts","Drawing their own family","Solving the easiest option"], "a":1,
   "w":"The decode table is a 15-second investment that buys every sub-question. Skipping it is how x becomes 'father' at hour two."},
  {"q":"P x Q - R (x = mother-of, - = brother-of). R is P's...",
   "o":["Son, for sure","Son OR DAUGHTER - Q, R are siblings sharing mother P, but R sits second in the operator and nothing genders it","Nephew","Brother"], "a":1,
   "w":"Operators gender only their FIRST letter. R never gets a gender word, so 'son or daughter'. Gender-honesty wins marks."},
  {"q":"'Which expression means P is the MATERNAL uncle of R?' - the fastest accurate attack is...",
   "o":["Decode all four options fully","BUILD THE TARGET TREE first (P must be brother of R's mother), generate the expression my tree demands, then match it","Read options backwards","Pick the middle option"], "a":1,
   "w":"Build-target-first beats four trial decodes: maternal uncle = mother's brother. Draw it, write the code, match. About 30 seconds."}],
"br4": [
  {"q":"The correct way to count 'males in the family' from your finished puzzle tree:",
   "o":["Every male-sounding name","Count ONLY gender-LOCKED boxes - diamonds enter neither count; report them as unknown separately","Half the members, always","Sons plus fathers only"], "a":1,
   "w":"Examiners plant 'Suman'/'Kiran' hoping you'll assign gender. Locked-only counting survives the gender-open node every time."},
  {"q":"Minimum-member puzzles ('grandfather, father, mother, two sons, a daughter - least members?') crack via...",
   "o":["Adding all stated roles","STACKING ROLES - one person legally wears multiple labels (the father IS the grandfather's son); build the SMALLEST legal tree","Assuming one couple only","Using a family average"], "a":1,
   "w":"That puzzle answers 5, not 6: the father doubles as one of the 'sons'. Merge labels wherever generations legally allow it."},
  {"q":"Data Sufficiency 'How is X related to Y?' - the winning discipline:",
   "o":["Answer the relation first, then check","TRIPLE AUDIT in order: fresh tree from I alone, then II alone, then merged I+II - STOP the moment sufficiency is decided","Always mark 'both needed'","Skip DS questions entirely"], "a":1,
   "w":"DS asks WHETHER you can answer, not the answer itself. I-fails-alone does not mean 'both needed' - sometimes II alone does the whole job."}],
"br5": [
  {"q":"'Suman is the child of Ramesh' and the question asks 'how many females?' - Suman must be...",
   "o":["Counted female (it's a girl's name)","Left GENDER-NEUTRAL - names never lock gender; only relation-words do; excluded from BOTH counts until locked","Counted male (more common)","Removed from the tree"], "a":1,
   "w":"Trap 1: the Gender-Name Bait. Suman/Kiran/Kamal stay diamonds until a word like 'son'/'daughter' locks them."},
  {"q":"A man says, 'He is the only son of my father's wife.' (No adoptions.) 'He' is...",
   "o":["The man's brother","THE MAN HIMSELF - father's wife = his mother; mother's ONLY SON = him; 'only' points back at the speaker","The man's nephew","Cannot be determined"], "a":1,
   "w":"Trap 2: self-reference lock. Every 'my' starts a walk at the speaker's node; 'only son of my mother' can only be the speaker."},
  {"q":"'Cannot be determined' should be picked when...",
   "o":["You ran out of time","A COMPLETE, honest tree still leaves the target's gender or a linking edge OPEN - CBD is a legit scoring answer","The question feels hard","Two options look close"], "a":1,
   "w":"Trap 3 phobia cured: CBD is correct precisely when the locked tree provably can't answer. Defending it with your tree IS the flex."}],
"br6": [
  {"q":"After the Hindu Succession (Amendment) Act 2005, daughters in an HUF are...",
   "o":["Members but never coparceners","COPARCENERS BY BIRTH - same rights as sons, including demanding partition and becoming Karta","Excluded once married","Coparceners only if unmarried"], "a":1,
   "w":"Birthright parity since 2005. Marriage adds membership in the spouse's HUF without deleting her own coparcenary. Simran = Arjun, legally."},
  {"q":"The nominee on a bank FD or insurance policy is best understood as...",
   "o":["The automatic final owner","A CARETAKER who collects the money and must hand it to the legal heirs - nomination is a payment channel, not ownership","The bank's agent","The default tax assessor"], "a":1,
   "w":"The Rs-12-lakh lesson: nominee = temp custodian; legal heir = owner. Nominate the heir and the trust-gap disappears."},
  {"q":"A Hindu male dies intestate. Present: widow, mother, one son, one daughter. The estate splits...",
   "o":["Son takes half first","EQUALLY among Class-I heirs - 4 heirs, one-fourth each (siblings & father are Class-II, take nothing while Class-I exists)","Everything to the widow","As the eldest child decides"], "a":1,
   "w":"Intestate Class-I = widow + mother + sons + daughters, equal shares. Rs 2.4 cr becomes Rs 60L each. AV1's equal-share engine, legal edition."}],
"di1": [
  {"q":"The correct FIRST step on opening any DI set is...",
   "o":["Read the entire table top to bottom","Read the QUESTION first - fix the target (value? ratio? %? rank?), then locate only the 2-4 numbers it needs","Admire the chart","Add all totals immediately"], "a":1,
   "w":"Snipers target-first; tourists browse 400 numbers and drown. Routine: Target > Locate > Units > Compute."},
  {"q":"GST of 18% on Rs 47,250 by the 10%-anchor method:",
   "o":["Rs 4,725","Rs 8,505 - 10% (4,725) + 5% (2,362.5) + 3% (1,417.5); invoice total Rs 55,755","Rs 9,450","Rs 8,000"], "a":1,
   "w":"Anchor blocks: shift for 10%/1%, halve for 5%. Any whole % builds in ~5 seconds - no column multiplication."},
  {"q":"In a %-change question, the denominator is always...",
   "o":["The larger number","The BASE - the 'old' value / the 'of'-thing; say 'of WHAT?' aloud before dividing","The newer number","The average of both"], "a":1,
   "w":"90% of DI % errors are wrong-denominator errors. New-old over OLD; part over WHOLE; A over B."}],
"di2": [
  {"q":"A cell is blank but its column total and all siblings are known. Recovery rule:",
   "o":["Estimate from the graph","Missing cell = TOTAL - sum of known siblings; verify on the second total's path when both exist","Use last quarter's value","Unsolvable"], "a":1,
   "w":"Reverse totals: 76 - 58 = 18 recovered Online-Q3 in the LAB. Two blanks? Row-total one, column-total the other."},
  {"q":"'KB's Q3 as a % of the quarter's company total' - the denominator is:",
   "o":["KB's FY total (54)","The Q3 COLUMN total (76) - 'of the quarter's total' names the whole; 15/76 = 19.7%","The grand total (280)","Q3's average store"], "a":1,
   "w":"The of-phrase OWNS the denominator. Same cell over row total (54) = 27.8% answers a DIFFERENT question."},
  {"q":"The totals-first rule on a table set means spending the first 30 seconds...",
   "o":["Reading question 1 twice","Writing the row+column TOTAL skeleton on the rough sheet - converting every later share question into one division","Sketching a bar chart","Checking page numbers"], "a":1,
   "w":"Skeleton: stores 54/46/42/38/34/66; quarters 58/65/76/81; grand 280. Every 'share of' then costs one division, not one panic."}],
"di3": [
  {"q":"Rohini Q1 9 > Q4 12 vs Online Q3 18 > Q4 22. 'Fastest % growth' vs 'highest absolute jump':",
   "o":["Same answer always","Can DIFFER - Online's +4L is the absolute king while Rohini's +33.3% beats Online's +22.2%; % divides by the FIRST value","Absolute jumps are always smaller","% needs no base"], "a":1,
   "w":"The absolute-vs-% flip, now visual. Underline 'most' (Rs) vs 'fastest' (%) before computing - exams draw flips deliberately."},
  {"q":"A bar chart's y-axis starts at 40, not 0. Comparing Q4 vs Q1 by EYE is now...",
   "o":["Totally fine","A LIE - visible heights 41 vs 18 say 2.3x; real values 81 vs 58 say 1.4x; enter numbers-only mode","Better zoom","Illegal everywhere"], "a":1,
   "w":"3-second axis audit (units? step? zero?) then numbers-only reading. The non-zero baseline inflates every difference visually."},
  {"q":"In a STACKED bar, a segment's value equals...",
   "o":["Its top edge value","TOP edge MINUS BOTTOM edge - the stack subtraction reflex (Online-in-Q3 = 76-58 = 18, not 76)","The bar's total","Its color label"], "a":1,
   "w":"Reading a stack's top edge as its value is the classic slip. value = top - bottom. Audit: segments must re-sum to the total."}],
"di4": [
  {"q":"Two equal-looking slopes: 5>6 and 5.5>6.5. Their %-growths are...",
   "o":["Equal - same slope","DIFFERENT - 20% vs 18.2%; % divides by the FIRST value, so equal slopes on different bases are never equal ratios","Unknowable from a chart","Both 10%"], "a":1,
   "w":"Eyes read steepness (absolute); formulas read ratio. Small-base law on slopes - trust the formula, not the picture."},
  {"q":"The crossover point of two same-axis lines means...",
   "o":["The companies merged","The two series have EQUAL values at that x-point; 'when did A overtake B?' resolves to the month right after the intersection","The chart broke","Both series are rising"], "a":1,
   "w":"Intersection = equality, once. Overtake month = next point. A free 15-second question if you keep it that simple."},
  {"q":"A line chart has two y-axes. Before reading ANY value, the pro move is...",
   "o":["Read the left axis only","Match legend > line > AXIS for every series - right-axis values on the left axis corrupt everything downstream","Average the axes","Skip the set"], "a":1,
   "w":"The double-axis discipline. One legend-line-axis triple per series, THEN arithmetic. Cross-axis comparisons need unit conversion first."}],
"di5": [
  {"q":"A pie slice measures 54 degrees. Its share is...",
   "o":["54%","15% - 1% = 3.6 degrees, so 54/3.6 = 15; on Rs 280L that is Rohini's Rs 42L slice","5.4%","150 degrees"], "a":1,
   "w":"Tri-conversion: /3.6 for degrees>%, then share x total for Rs. one formula, three costumes, all marks."},
  {"q":"Comparing slices across TWO pies is directly legal only when...",
   "o":["The pies look the same size","The pie TOTALS are equal - else compare shares only, or convert share x total per pie first (20% of 350L > 25% of 236L!)","You are quick","Colors match"], "a":1,
   "w":"Totals rule multi-pies. The 'share down, value up' flip on rising totals is the exam's favorite pie bait."},
  {"q":"Expense pie: COGS at 255.6 deg, Net Profit at 8.6 deg. The analyst line for the Sharma review:",
   "o":["'Profit looks small, panic'","'Every Rs 100 keeps Rs 2.4 - margin lives/dies in the 255.6-deg COGS slice; a 1-pt saving there adds ~Rs 2.8L, HALF a whole year's profit'","'Rent is the problem'","'Pies can't show profit'"], "a":1,
   "w":"The 8.6-deg sliver IS the story: 71% COGS on Rs 280L leaves Rs 6.7L net. Tiny sliver, giant lever - hunt the fat slice."}],
"di6": [
  {"q":"The first move on ANY caselet (paragraph DI) is...",
   "o":["Answer from the prose directly","TABULATE - convert the paragraph's fractions/ratios/percents into a value table using the given TOTAL as anchor; then it's plain table DI","Draw a pie of it","Skip - caselets are traps"], "a":1,
   "w":"The tabulate-first law. Caselets hide zero new math; they test conversion discipline. Words > grid > calculator-fast answers."},
  {"q":"'Online share rose from 20.7% to 27.2%.' Stated CORRECTLY, the increase is...",
   "o":["6.5%","6.5 percentage POINTS - which is +31.4% relative (6.5/20.7); the points-vs-percent vaccine","27.2%","20.7%"], "a":1,
   "w":"Both statements true only when named. Un-named '6.5%' options are the weaponized version of this confusion."},
  {"q":"In a full DI section, the professional pacing order is...",
   "o":["Caselets first, get them done","Clean tables & bars FIRST, pies/lines next, caselets & mixed sets LAST - same marks, so buy cheap ones first; skip-rule at 120 s","Strict paper order","Colorful ones first"], "a":1,
   "w":"Set triage. DI sections are won by ordering, not heroics. Written skip-rule: any Q beyond 120 s goes to the revisit pile."}],
"di7": [
  {"q":"FY25 net margin from the P&L equals...",
   "o":["Net profit / COGS","Net profit / REVENUE - 6.72/280 = 2.4%, the expense pie's 8.6-deg sliver; the revenue anchor owns the denominator","Revenue / net profit","The net growth %"], "a":1,
   "w":"Margin = profit over revenue, always. FY24: 1.13%; FY25: 2.4% (+1.27 points). Statements ARE DIs - totals-first owns them."},
  {"q":"Marketing actual Rs 9.8L vs budget Rs 12L (variance -18.3%). The analyst-grade verdict:",
   "o":["'Favorable, celebrate'","'Cost-favorable on paper - FLAG WHY: if marketing drove the +5.7% revenue beat, under-spend is a growth-RISK; variance marks WHERE, judgment decides WHY'","'Unfavorable'","'Must be an error'"], "a":1,
   "w":"F/U labels are a first read, not a verdict. Under-spending a growth engine while revenue over-performs demands the WHY question."},
  {"q":"The data-honesty clause that must accompany 'net profit +152.6%':",
   "o":["'Source: company filings'","'...against a small Rs 2.66L FY24 base' - small-base caveat; the +Rs 4.06L absolute gain is real, the frothy % needs its denominator named","'Subject to market risks'","'Audited by CA firm'"], "a":1,
   "w":"Name the base, keep the trophy - exactly the GL note beside the +252% YoY. Honesty sells insight, in exams and boardrooms alike."}],
"pc1": [
  {"q":"'40% of ShopKart's revenue' - the MOST important word downstream is the hidden one:",
   "o":["'40' - it's the number","'REVENUE' - the base; every % statement answers 'of WHAT?' and the base decides the truth; circle it before arithmetic","'%' - the symbol","'of' - the connector"], "a":1,
   "w":"Law of the Base: 40% of revenue, 40% of profit, 40% of last year - same number, different universes."},
  {"q":"8% of 25 is fastest solved as...",
   "o":["0.08 x 25 column work","25% of 8 = 2 - the mirror trick x% of y = y% of x; swap the friendly percent onto the friendly number","25 x 8 / 100 twice","8 + 25 - 100"], "a":1,
   "w":"Any 'nice-five' percent (50/25/20/10/5) on the wrong side gets swapped. 14% of 50, 65% of 20 - all one-liners."},
  {"q":"240% of Rs 50L means...",
   "o":["An error - percents cap at 100","Rs 120L - over-100% means MORE THAN ONE BASE (2.4x); '140% of target' is +40% over plan, not a bug","Rs 24L","Rs 70L"], "a":1,
   "w":">100% is a gradient, not an error. Q2-FY26 net = 352% of last year - fear of big percents costs real marks."}],
"pc2": [
  {"q":"'After a 30% discount the price is Rs 2,100. MRP?' - the correct engine:",
   "o":["2,100 + 30% = 2,730","2,100 / 0.70 = Rs 3,000 - after -30% you hold 0.70 x original; reverse = DIVIDE by the surviving multiplier","2,100 x 1.3 x 0.7","Cannot be found"], "a":1,
   "w":"Add-back-x fails: 30% of the REDUCED number is not 30% of the ORIGINAL. Forward-check closes the loop: 3,000 - 900 = 2,100."},
  {"q":"Your portfolio crashes -50%. Recovery needed to break even:",
   "o":["+50%","+100% - the base halved so it must DOUBLE: y = 100x/(100-x) = 100. Losses are heavier than equal gains","+75%","+25%"], "a":1,
   "w":"The ladder's dramatic row: Rs 100 > 50 > needs x2. Same insight upgrades investor-you and exam-you in one stroke."},
  {"q":"'Revenue grew TO 118.6% of last year' vs 'grew BY 18.6%' - these statements are...",
   "o":["Different facts","THE SAME FACT in TO/BY costumes - TO includes the original 100%; BY is only the delta; exams swap them to catch ear-readers","TO is bigger growth","BY ignores the base"], "a":1,
   "w":"TO = new/old factor (280/236 = 1.186); BY = delta/old (44/236 = 18.6%). One coin, two faces."}],
"pc3": [
  {"q":"Price +20%, then +10% again. Net change:",
   "o":["+30%","+32% - the second change acts on the ALREADY raised base; a + b + ab/100 = 20 + 10 + 2 (never add percents)","+22%","+12%"], "a":1,
   "w":"The ab/100 compounding term = 2 points of 'growth on growth'. Multiplier check: 1.2 x 1.1 = 1.32."},
  {"q":"'Two years of 10% growth' on Rs 50L gives after 2 years:",
   "o":["Rs 60L","Rs 72L - x1.1^2 = x1.21; compounding adds 'growth on growth'. This exact ladder IS Compound Interest (PC6 names it)","Rs 70L","Rs 55L"], "a":1,
   "w":"1.1^2 = 1.21 forever. Memorize 1.21 / 1.331 / 1.4641 - CI and growth questions repay in seconds."},
  {"q":"A Rs 1,00,000 asset depreciates 10%/year. After 2 years its value is:",
   "o":["Rs 80,000","Rs 81,000 - decay compounds too: x0.9^2 = 0.81; total loss 19%, not 20%","Rs 90,000","Rs 85,000"], "a":1,
   "w":"The straight-subtraction 80k is the decoy. Book-value chains in bank exams always run this frame."}],
"pc4": [
  {"q":"'Online sales are 44.3% MORE than KB's.' Then 'KB is ___% LESS than Online' equals:",
   "o":["44.3% - same gap","30.7% - the gap divided by ONLINE now; the flip 100x/(100+x) turns +44.3 into -30.7; bases change answers","55.7%","22.15%"], "a":1,
   "w":"MORE-than divides by the smaller base; LESS-than by the larger. One Rs-gap, two true percentages."},
  {"q":"A candidate won 58%, opponent 42%, margin = 64 votes. Total valid votes:",
   "o":["320","400 - margin = SHARE-GAP x total: (58-42)% = 16% = 64 votes, so total = 64 / 0.16 = 400","640","580"], "a":1,
   "w":"Election engine: find the share-gap, divide the vote-gap by it. Invalid-% variants: apply valid share first."},
  {"q":"Rice price jumps +25%. To keep the bill EXACTLY flat, consumption must drop:",
   "o":["25%","20% - the consumption-cut rule x/(100+x) = 25/125; price x1.25 needs quantity x0.8 to land back at 1","12.5%","33.33%"], "a":1,
   "w":"x/(100+x) = the cut; 100x/(100-x) = the raise. Two plugs, one family, zero confusion after practice."}],
"pc5": [
  {"q":"'62.5% of 48,000' - the champion's compute line is:",
   "o":["0.625 column multiplication","48,000 x 5/8 = 30,000 - fraction substitution; the number dividing the denominator cleanly is the exam whispering the shortcut","48,000 x 62.5 / 100","48,000 / 62.5"], "a":1,
   "w":"Bank-SSC numbers (48,000 / 72,000 / 6,400) are DESIGNED for /8, /9, /12.5 fractions. Hear the whisper, save 30 s."},
  {"q":"The 'Reverse Overreach' trap means...",
   "o":["Reversing too many questions","Adding x% BACK after a cut ('2,100 + 30% = 2,730') instead of dividing by the surviving multiplier (/0.7 = 3,000)","Solving in reverse order","Too many multipliers"], "a":1,
   "w":"Percent of the reduced is not percent of the original. Only legal reverse: / survivor, then forward-check."},
  {"q":"Pacing plan for a 10-question mixed % mini-section:",
   "o":["Strict 1-to-10 order","2-PASS: bank direct %-of/conversions/single-change first (~30 s), reverse+chain grinders second; skip-rule >100 s","Hardest first","All-in on the first five"], "a":1,
   "w":"Equal marks, unequal costs. Written skip-rule kills the 'one more minute' bleed that wrecks whole sections."}],
"pc6": [
  {"q":"Rs 1,00,000 @ 8% for 2 years: CI - SI =",
   "o":["Rs 0","Rs 640 - the 'interest on interest' term P(r/100)^2; SI pays Rs 16,000 flat, CI's x1.08^2 pays Rs 16,640","Rs 1,600","Rs 320"], "a":1,
   "w":"P(r/100)^2 for 2 years, ladder for longer. The most-asked CI exam classic falls in 5 seconds."},
  {"q":"A Rs 100 item with Rs 71 COGS gets a 10% discount. The damage is...",
   "o":["10% off profit","Gross profit falls Rs 29 > Rs 19 = -34.5% (margin 29% > 21.1%): small price-% eats giant profit-%","Margin falls 10 points","COGS rises 10%"], "a":1,
   "w":"Price-% is not profit-%. 10% of price = 34.5% of gross = ~42% of net per point. THE retail asymmetry - quote it cold."},
  {"q":"Rival cuts 15%; your blanket 10% counter needs what unit-growth to hold gross Rs?",
   "o":["10%","+52.6% - old-GP/new-GP = 29/19; near-1.5x volume is fantasy, so the audit backs the targeted bundle (+11.5%) + a 1-pt COGS claw","15%","5%"], "a":1,
   "w":"Break-even volume formula = old GP / new GP. Blanket cuts on 2.4%-net retailers are theater; targeted defense wins."}],
"lr1": [
  {"q":"'Two people sit between Arjun and Simran' forces their positions to differ by...",
   "o":["2","3 - the between-count law: |difference| - 1 = 2, so difference = 3; the most-misread phrase in LR","1","4"], "a":1,
   "w":"X _ _ Y = three apart. 'Immediate' = 1 apart. 'Somewhere left' = order only. Say the law once per puzzle."},
  {"q":"The correct order of the 4-Step Puzzle Routine is...",
   "o":["Chain > Frame > Verify > Load","FRAME > LOAD > CHAIN > VERIFY - slots first, direct clues next, most-constrained chaining with re-scans, every clue re-read at the end","Load > Chain > Frame > Verify","Guess > Verify > Load > Frame"], "a":1,
   "w":"Architecture before deductions; verification before celebration. One mismatch at VERIFY = a chain error, not a bad puzzle."},
  {"q":"Your ideal first move on a fresh puzzle (after framing) is...",
   "o":["Place whoever is named first","Load ALL direct clues, then chain from the MOST-CONSTRAINED (most-mentioned) element; zero-mention people fall last by elimination","Try Case 1/Case 2 randomly","Solve the last clue first"], "a":1,
   "w":"Direct clues are free structure; the most-mentioned person locks fastest; every lock triggers a full clue re-scan. Stuck? You stopped re-reading."}],
"lr2": [
  {"q":"In an 8-slot row, '4th from the right end' is position number...",
   "o":["4","5 - the flip formula N - k + 1 = 8 - 4 + 1 (in the staff battery, that is Harish)","6","Depends on facing"], "a":1,
   "w":"N - k + 1 forever. Answered in 3 seconds while others count on fingers."},
  {"q":"After loading direct clues, the correct chaining priority is...",
   "o":["The clue naming the most people","The clue that LOCKS a position given current fixes - |AJ-SI|=3 with AJ=3 leaves ONE legal side, so SI=6; then re-scan every clue","Negative clues always first","Conditional clues always first"], "a":1,
   "w":"Chaining = 'what locks given my frame?' Each lock re-activates parked relatives and negatives. Locks rule; mentions hint."},
  {"q":"Gauri alone faces south in a north-facing row. Her 'immediate-left neighbor' sits at...",
   "o":["Her picture-left","Her PICTURE-RIGHT - mixed-facing flips that person's left/right; write (flipped) above her head BEFORE any left/right clue about her","The right end always","Cannot be determined"], "a":1,
   "w":"She sees the row mirrored. The (flipped) tag at frame-time is LR2's cheapest mark insurance."}],
"lr3": [
  {"q":"In a circle facing the CENTER, 'second to the LEFT of X' is found by moving...",
   "o":["Counter-clockwise two seats","CLOCKWISE two seats - facing-center flips intuition: LEFT = clockwise; facing outward mirrors it back","Clockwise one seat","Either way"], "a":1,
   "w":"The campfire test: face the center, your left hand sweeps clock-wise. Write 'L = clk' on the frame - it saves every sub-question."},
  {"q":"In an 8-seat circle, Priya sits at seat 3. Simran sits opposite. Simran's seat is...",
   "o":["6","7 - opposite of k = k + N/2 = 3 + 4; opposite clues anchor circles early because they need NO direction","5","8"], "a":1,
   "w":"k + N/2 (wrap on overflow). Opposite pairs are the circle's free nails - place them before direction clues."},
  {"q":"The correct FIRST placement in a symmetric all-center circle is...",
   "o":["After full analysis","ANYWHERE for the most-mentioned person - circles have no ends; symmetry makes the first lock FREE; anchor with opposites, chain fast","Bottom of the page","Skipped until needed"], "a":1,
   "w":"No ends = rotational freedom = first placement costs nothing and buys everything. Take free gifts without ceremony."}],
"lr4": [
  {"q":"'Exactly TWO people live between Arjun(6) and Simran' places Simran on floor...",
   "o":["8 or 4","3 - difference of 3, downward (9 illegal); the vertical between-count law is the same |diff|-1 engine","4 only","2"], "a":1,
   "w":"Row laws wear hard hats vertically. Difference 3 + legality check (no floor 9) = floor 3."},
  {"q":"'Priya lives exactly midway between Simran(3) and Farhan(5)' is confirmed by...",
   "o":["Her seniority","The MIDPOINT trick: (3+5)/2 = 4 = Priya's floor; endpoints need the SAME parity - floors 2 & 5 can never flank an 'exactly-between'","Adjacency to both","A lucky guess"], "a":1,
   "w":"Average the endpoints; parity audit first. 'Exactly between' questions are midpoint-locks - collect greedily."},
  {"q":"Ordering chain (FH > SI > DP > PR, loose branch AJ > RO): 'who is shortest?' is honestly...",
   "o":["PR","CANNOT-BE-DETERMINED until RO links to the DP/PR branch - unlinked branches never get ranks by vibes","RO","SI"], "a":1,
   "w":"AJ > RO hangs off the chain; RO could sit above or below DP/PR. CBD with a reason beats vibes every time."}],
"lr5": [
  {"q":"Off-roster clue: 'Arjun immediately BEFORE Simran; neither adjacent to Rohan (Wed)' resolved to...",
   "o":["Wed-Thu","Fri-Sat - the only forward pair left after banning Wed's neighbors (Tue, Thu); positions before attributes","Sat-Sun","Thu-Fri"], "a":1,
   "w":"Adjacent-to-Wed pairs get banned first; (Fri, Sat) survives alone. Full-frame constraints beat local guesses."},
  {"q":"Selection law 'If A is picked, B is picked' kills exactly which teams?",
   "o":["Teams with B","Teams with A but WITHOUT B - A > B says NOTHING about B-without-A; arrow direction is the most-misread grammar in LR","Teams with A and B","All teams of size 3"], "a":1,
   "w":"If-then arrows fire one way. B-alone teams are legal unless other laws fire. Convert English to arrows BEFORE placing anyone."},
  {"q":"In a matching grid, the professional's marking order is...",
   "o":["Ticks first","CROSSES first - each clue eliminates boxes; ticks close ONLY by elimination or proven packaging; dead branches are killed citing the clue number","Random alternation","Colors, no marks"], "a":1,
   "w":"Crosses are free truth; ticks must be earned. After solving: SI-Delhi-Sales, AJ-Gurugram-Ops, PR-Jaipur-Finance - read the grid like a newspaper."}],
"lr6": [
  {"q":"'Possibility Upgrading' means...",
   "o":["Improving puzzle options","Treating a MAYBE-position as LOCKED - every downstream lock built on a guess collapses silently; tiny-letters under open slots, branch at hard forks","Placing conditional clues late","Using two cases"], "a":1,
   "w":"LOCKED vs OPEN, never mixed. One assumed placement quietly re-arranges six people behind your back."},
  {"q":"The 30-second triage classifies a single-rail 6-clue floor puzzle as...",
   "o":["DUMP - floors are slow","BANK - single hierarchy, bounded clues, near-unique: solve it first; puzzles pay 3-5 questions each so finished sets beat half-solved pairs","GAMBLE","SKIP"], "a":1,
   "w":"Triage is marks-per-minute math: Bank > Gamble > Dump. Weights favor finished sets."},
  {"q":"The correct bail-out discipline for a resisting puzzle is...",
   "o":["Exit mid-chain when frustrated","Bail EARLY at triage or FINISH the set - a 60% puzzle abandons the questions its last locks anchor; the 4-minute park is the only mercy","Never bail","Blind-guess its questions"], "a":1,
   "w":"Early or never. Frustration-exits are the Overstay trap's evil twin: the Under-harvest."}],
"lr7": [
  {"q":"The payment calendar's GrainHouse-on-Monday move banks...",
   "o":["Goodwill only","Rs 1,240 - the 2% early-pay discount (62,000 x 2%), ~104% annualized; the discount column is secretly a returns column, and the frame says which day unlocks it","Rs 620","Nothing"], "a":1,
   "w":"Calendar-locked discounts are arbitrage with an expiry date. Frame: Mon <= deadline, ceiling respected = discount captured."},
  {"q":"Stretching FF-221 to day 45 saves Rs 699 of borrowing cost. Refuse anyway because...",
   "o":["Stretching is illegal","The late-fee/trust cost (Rs 709/month + vendor strain) EXCEEDS the float saving - DPO games pay only INSIDE terms; Net-30 is a money constraint, not a courtesy","FF is family","Rs 699 is too small"], "a":1,
   "w":"Compute BOTH lines before 'optimizing': Rs 699 saving < Rs 709 cost + trust damage. Case closed with arithmetic, not vibes."},
  {"q":"Committee LAW 3 (2+ late deliveries > no raise) fired on FF. Next quarter's re-arm condition is...",
   "o":["Automatic - time heals","A CLEAN-DELIVERY streak unlocking LAW 3's condition - laws cite conditions, so rulings cite them too; meanwhile GrainHouse's raise proceeds under LAW 2","Nothing ever again","Fire the vendor"], "a":1,
   "w":"Condition-cited rulings are real credit-committee language. LAW 3 defers, LAW 2 allocates, the memo names each."}],
"ns1": [
  {"q":"13, 20, 29, 40, 53, ? - the machine's next term:",
   "o":["66","68 - diffs 7,9,11,13 climb by 2 (second-order AP), so next diff = 15 and 53+15 = 68; derived, not guessed","70","65"], "a":1,
   "w":"Second-order APs are the exam's favorite family. Two machine rows, zero inspiration needed."},
  {"q":"The difference machine's FIRST job on any series:",
   "o":["Find the ratio","Compute the row of 1st DIFFERENCES - eyes guess rules, differences DERIVE them; ratios/twins are exits after two messy rows","Square each term","Skip every other term"], "a":1,
   "w":"Attack order: differences > ratios > twins/hybrids. The machine's order IS the whole course in one line."},
  {"q":"Sum of 3,7,11,15,19,23 (six terms) equals:",
   "o":["66","78 - n/2 x (first+last) = 3 x 26: the AP-sum identity, i.e. n x average-of-ends (AV1's engine counting, not adding)","72","84"], "a":1,
   "w":"Sum(AP) = n/2(a1+an). Cross-course reflex: your Averages course owns this as n x mean."}],
"ns2": [
  {"q":"3, 6, 18, 72, ? - the rule and next term:",
   "o":["+6n continuing","Ratio ladder x2, x3, x4, so next x5 > 360 - when ratios THEMSELVES progress, the ladder is the family","x2 again > 144","n2 x 3 > 108"], "a":1,
   "w":"Ladder ratios outrank any additive story. Same skeleton as 2,6,24,120 - whose secret twin is factorials."},
  {"q":"The reliable fingerprint of a two-step x*n+k series:",
   "o":["Constant differences","Ratios hovering NEAR a constant but drifting toward it (2.2 > 2.09 > 2.04), with (t2 - n.t1) giving the same k twice","Terms always even","Differences halving"], "a":1,
   "w":"Drift-toward-constant is the two-stepper's gait; the k-check twice-confirms. Constant ratios = pure GP; drifting = sidekick aboard."},
  {"q":"To crack 2, 5, 10, 17, 26 the fastest doorway is:",
   "o":["Third differences","Nearest-square offsets: 1,4,9,16,25 each +1 > n2+1 > next 37 - the powers wardrobe (second-diff = 2 opens the same family)","Ratios","Prime hunting"], "a":1,
   "w":"Squares-in-a-coat. Two doorways to n2k families - redundancy is the machine being kind."}],
"ns3": [
  {"q":"1, 2, 4, 4, 7, 8, 10, 16, ? - the winning move and answer:",
   "o":["Diff-row until constant","SPLIT odd/even positions: odds 1,4,7,10 (+3 > 13); position 9 is odd > 13 - braided series untangle only when split","Primes x2","x2 > 32"], "a":1,
   "w":"The braid demands the split. Position-numbers sketched above terms make twins visible in 5 seconds."},
  {"q":"A series' gaps read 1,2,2,4,2,4 with no classic family answering. Next family to scan:",
   "o":["Factorials","PRIMES - that irregular gap-pattern is the prime heartbeat (gaps between 2,3,5,7,11,13,17); when arithmetic fails, number-names take over","Cubic roots","Give up"], "a":1,
   "w":"Primes answer by NAME, not arithmetic. Memorize primes to 60; the wardrobe never wastes a mark."},
  {"q":"3, 6, 8, 16, 18, 36, 38, ? - the rule and next term:",
   "o":["x2 everywhere","Alternating ops x2,+2,x2,+2 - after +2 (36>38) comes x2 > 76; the op-ladder above the series plays the alternation itself","+2 > 40","-4 > 32"], "a":1,
   "w":"Op-ladder notation = a musical score above the terms. Split values or split OPERATORS - one always confesses."}],
"ns4": [
  {"q":"3, 7, 15, 31, 63, 128 - the wrong term and its replacement:",
   "o":["63 > 64","128 > 127 - the x2+1 law holds on every CLEAN link; substituting 127 re-cleans the whole row (63>127 = 64)","15 > 14","None wrong"], "a":1,
   "w":"Protocol: law from clean links > corrupt term = shared suspect of the dirty pair > substitution proof. One bump, one culprit."},
  {"q":"A missing-MIDDLE candidate is PROVEN only when...",
   "o":["It fits the incoming difference","It satisfies BOTH links - incoming AND outgoing; the double-link verification law: one clean link is a suspect, two is a conviction","It looks nice","Options agree"], "a":1,
   "w":"Middle holes demand both neighbors' testimony. Bidirectional machine-runs: five seconds of diligence for a mark."},
  {"q":"1, 2, 6, 21, 88, ? - the family and next term:",
   "o":["x2 ladder","Position-indexed ops: tn = n x t(n-1) + n (1x1+1, 2x2+2, 6x3+3, 21x4+4) > 88x5+5 = 445 - ratio-drift growing WITH position is its fingerprint","Fibonacci","n3"], "a":1,
   "w":"Drift 2, 3, 3.5, 4.2 tracks position n: tn = n.t(n-1) + n. Rare, glorious, unmistakable once named."}],
"ns5": [
  {"q":"The 'Premature Commit' trap is vaccinated by...",
   "o":["Trusting the first fit","Running ONE MORE machine row (or a second family-witness) before committing - 3,6,11,18 looks chaotic until second differences show the constant 2","Choosing bigger answers","Skipping checks"], "a":1,
   "w":"Two witnesses or no conviction. Commit twice-fast beats commit once-wrong."},
  {"q":"5, 11, 17 fits BOTH AP(+3) and prime-gap-6 families. The correct tie-breaker:",
   "o":["Panic and skip","The SIMPLICITY LAW - lowest-order rule wins (AP); the OPTIONS disambiguate which family the setter wants; freezing is the only losing move","Always primes","Multiply rules"], "a":1,
   "w":"Occam pays marks. AP beats exotic-families at equal fit; options resolve the rest. Your only illegal state is frozen."},
  {"q":"For braided (twin) series, the 3-second mega-vaccine first is:",
   "o":["More difference rows","Sketch POSITION NUMBERS above the terms - twins and position-slips become visible instantly; the odd/even split then owns the target position","Read backwards","Cube the terms"], "a":1,
   "w":"Position numbers: the world's cheapest vaccine - 3 seconds, kills twin-blindness and position-slips in one stroke."}],
"ns6": [
  {"q":"Rs 1,00,000 @ 10% for 5 years forms which series - and its year-5 value:",
   "o":["AP > 150,000","GEOMETRIC (r = 1.1): 1,00,000 x 1.1^5 = Rs 1,61,051 - the a.r^(n-1) from NS2 wearing a suit; AP-thinking undercounts compounding","Fibonacci","n2 family"], "a":1,
   "w":"CI is the purest GP in the wild. Rule-of-72: doubling at 10% ~ 7.3 years - 1.61x at year-5 tracks perfectly."},
  {"q":"Fresh Farms raises prices a STEADY ~2% per week. The forensic verdict:",
   "o":["Harmless drift","STEALTH COMPOUNDING - (1.019)^52 ~ x2.66/year: small weekly steps are a 166%-annualized hike in a fake moustache","Noise","AP behavior"], "a":1,
   "w":"Constant-ratio drift compounds quietly. x2.66/year is the negotiation memo in one number; 'harmless' is how vendors prefer you think."},
  {"q":"On Rs 5,00,000 at 12% p.a. (monthly rest), the FIRST EMI's interest content is:",
   "o":["Rs 4,000","Rs 5,000 - outstanding x monthly rate = 1% of 5 lakh; the interest sub-series then DECAYS while principal share GROWS (the EMI twin-braid)","Rs 10,000","Rs 500"], "a":1,
   "w":"One multiply: 1% of outstanding. The braid does the rest - interest down, principal up - which is why early EMIs feel all-interest."}],
"pp1": [
  {"q":"ShopKart uniform combos: 3 shirts x 4 pants =",
   "o":["10","12 - AND-rule: shirt AND pant needed, so 3 x 4; the x rule builds outfits, the + rule splits menus","7","24"], "a":1,
   "w":"AND multiplies, OR adds. Two chained decisions = product; one decision across categories = sum."},
  {"q":"A 4-digit UPI PIN (digits may repeat) has how many possibilities?",
   "o":["5040","10,000 - four slots x 10 choices each: 10^4; the no-repeat variant is 10 x 9 x 8 x 7 = 5040, a different question entirely","40,000","1111"], "a":1,
   "w":"Repetition-allowed slot math: choices ^ slots. No-repeat pulls one option away per slot."},
  {"q":"0! equals:",
   "o":["0","1 - BY LAW: exactly one way to arrange an empty shelf (do nothing); keeps nCr = 1 consistent when r = 0 or r = n","undefined","infinity"], "a":1,
   "w":"The 0! = 1 convention is load-bearing: COMBIN(n,n) works at the edges only because of it."}],
"pp2": [
  {"q":"7 distinct books arranged on a shelf:",
   "o":["2520","5040 - full line-up = 7!; every slot feeds the next starvation: 7x6x5x4x3x2x1","40320","720"], "a":1,
   "w":"n distinct items in a row = n!. The factorial ladder earns its keep here."},
  {"q":"Arrangements of the letters K I R A N A:",
   "o":["720","360 - 6!/2! because A repeats twice: divide out the duplicate shuffles of the twin-letters","180","120"], "a":1,
   "w":"Repeat-reflex: n!/p!q!... MISSISSIPPI does it thrice: 11!/(4!4!2!) = 34,650."},
  {"q":"Gold/silver/bronze among 8 ShopKart staff:",
   "o":["56","336 (8P3 = 8x7x6) - medals are RANKED so the swap-test screams permutation; the unordered committee is just 56","512","24"], "a":1,
   "w":"Podium = permutation. Pin the 336-vs-56 pair to your memory wall: it is the PP2/PP3 bridge."}],
"pp3": [
  {"q":"A 3-person promo squad from 8 staff (no ranks):",
   "o":["336","56 - 8C3: same three people, one squad; divide 8P3 by 3! to vaporize the six order-ghosts","24","6"], "a":1,
   "w":"nCr = nPr/r!. Podium ordered = 336; squad unordered = 56. One refund, whole chapter."},
  {"q":"We divide nPr by r! because:",
   "o":["it is a textbook tradition","every selection was counted r! extra times - once per internal ordering of the picked r items; ABC and BCA are ONE committee","it makes numbers smaller","Excel demands it"], "a":1,
   "w":"r! is the ghost-multiplier. Divide and be free."},
  {"q":"15C11 the fast way:",
   "o":["compute all 15 descending factors","mirror to 15C4 = 1,365 - nCr = nC(n-r): choosing 11 to take IS choosing 4 to leave behind","15 x 11 = 165","11C15 = 0"], "a":1,
   "w":"Always flip to the smaller r before touching arithmetic. Same answer, quarter of the work."}],
"pp4": [
  {"q":"6 people in a row, 3 specific friends must sit TOGETHER:",
   "o":["720","144 - glue the trio into one block (4 entities -> 4! = 24), then un-glue the internal 3! = 6: 24 x 6","36","288"], "a":1,
   "w":"GLUE, COUNT, UN-GLUE. Three verbs beat three pages of casework."},
  {"q":"8 staff around a ROUND table:",
   "o":["40,320","5,040 - (n-1)!: anchor Rakesh, arrange the other 7; rotations of the same circle are the same dinner","2,520","720"], "a":1,
   "w":"Circular law: fix one person to kill rotation clones. Beads and necklaces halve again: (n-1)!/2."},
  {"q":"A and B must NOT sit together - the fastest attack:",
   "o":["list every seating by hand","total minus together - count ALL arrangements, subtract the block count; the complement turns a phobia constraint into one subtraction","seat A first and hope","skip the question forever"], "a":1,
   "w":"APART = TOTAL - TOGETHER. The single most examinable line in restricted counting."}],
"pp5": [
  {"q":"Choose at least one of 5 different promo offers:",
   "o":["32","31 - each offer IN/OUT gives 2^5 = 32 subsets; the all-OUT basket buys nothing, so refund 1: 2^n - 1","25","16"], "a":1,
   "w":"Subset law: 2^n total, minus the empty set for at-least-one. Works on offers, sauces, friends."},
  {"q":"4-digit numbers from {0,1,2,3,4}, no repeat:",
   "o":["120","96 - thousands slot first (1-4 only), then 4x3x2; blind 5! = 120 smuggles in 24 zero-led fakes, so 5! - 4! checks it","100","24"], "a":1,
   "w":"Fussy slot FIRST. The crowd counts 120; analysts count 96 and verify with total-minus-fakes."},
  {"q":"The swap-test: swapping two picks CHANGES the outcome, so use:",
   "o":["combinations","permutations - order matters by definition; if nothing changed on swap, it is a combination instead","subtraction","a guess"], "a":1,
   "w":"One swap, whole classification. Change = permute; no change = combine."}],
"pp6": [
  {"q":"Arena re-run - 7P3 equals:",
   "o":["21","210 - 7 x 6 x 5: three ordered slots, no repeats; PERMUT(7,3) signs it off in the spreadsheet too","35","343"], "a":1,
   "w":"Slot-product discipline: r factors starting at n. 210 in under 10 seconds is Arena standard."},
  {"q":"Committee of 5 from 6 men + 4 women with EXACTLY 2 women:",
   "o":["252","120 - sub-groups AND-glued: 4C2 x 6C3 = 6 x 20; EXACTLY means one clean product, AT LEAST summons the complement","8","2"], "a":1,
   "w":"Constraints decompose into small combinations glued by the AND-rule. Grammar is the formula."},
  {"q":"The 7-gate radar FIRST gate before any formula:",
   "o":["memorize more nCr values","ORDER? - the swap-test; gate 1 decides P vs C, every later gate (repeats, restrictions, circle, twins, digits, complement) only refines it","compute 2^n immediately","draw a pie chart"], "a":1,
   "w":"Radar order: order -> repetition -> restrictions -> circle -> twins -> digits -> complement. Ten seconds, zero traps."}],
"pp7": [
  {"q":"Statutory audit: sample 5 invoices from 52 (COMBIN(52,5)):",
   "o":["2598","2598960 - over 25 lakh distinct samples; random beats gut-feel because no gut can eyeball 2.6 million options","260","311875200"], "a":1,
   "w":"Sampling math defends the audit: every 5-invoice bundle equally likely, bias has nowhere to hide."},
  {"q":"Spin & Win coupon codes: 6 chars from 36 alphanumeric symbols:",
   "o":["2.18 crore","217.68 crore codes (36^6 = 2176782336) - print 20 crore, seed 1 lakh winners, and a 10,000-try attacker hits about 0.0046% of attempts","21.77 lakh","36 crore"], "a":1,
   "w":"Slot-product security: choices^length. Each extra position multiplies the moat by 36."},
  {"q":"Pick 3 debt funds from a 10-fund shortlist (order irrelevant):",
   "o":["720","120 - 10C3; ranking the top 3 instead is 10P3 = 720: same shortlist, different question, swap-test referees","30","45"], "a":1,
   "w":"Portfolios combine, podiums permute. Know which meeting you are in before reaching for the formula."}],
"pb1": [
  {"q":"A fair die shows an EVEN number with probability:",
   "o":["1/3","1/2 - three of six faces (2, 4, 6): favorable over total with equal-likely outcomes; the whole course lives in this one fraction","1/4","1/6"], "a":1,
   "w":"Favorable/total on an equal-likely set. Check fairness, then divide and walk."},
  {"q":"Two fair dice: P(sum = 7) =",
   "o":["1/8","1/6 - six winning cells (1-6 through 6-1) out of the 36-cell grid; 7 owns the most roads","1/9","5/36"], "a":1,
   "w":"The ways run 1-2-3-4-5-6-5-4-3-2-1 across sums 2..12. Count roads, not vibes."},
  {"q":"One card from a shuffled 52-deck: P(a red FACE card) =",
   "o":["1/26","3/26 - 6 red faces (J, Q, K of hearts + diamonds) over 52; deck anatomy is the entire exam career of a card question","6/13","1/13"], "a":1,
   "w":"Anatomy first: 4 suits x 13 ranks, 26 red, 12 face, 4 aces. Every card question is counting in a tuxedo."}],
"pb2": [
  {"q":"P(king OR queen) from 52 cards:",
   "o":["2/26","2/13 - mutually exclusive (no card is both), so the add is clean: 4/52 + 4/52","1/13","8/13"], "a":1,
   "w":"Exclusive events just add; the can-both-happen test is the only gate."},
  {"q":"P(heart OR face card) needs care because:",
   "o":["plain addition always suffices","the overlap double-counts - 3 face-hearts get tallied twice, so 13/52 + 12/52 - 3/52 = 22/52 = 11/26","hearts are not cards","face cards are banned"], "a":1,
   "w":"Inclusion-exclusion: find the overlap, refund it once. PB2 is PC3's overlap law in disguise."},
  {"q":"The complement law P(not A) = 1 - P(A) shines brightest when:",
   "o":["events are few and tidy","the question says AT LEAST ONE - the hit-side is a zoo, but 1 minus the all-miss product is one line: 1 - (5/6)^4 = 671/1296 = 0.518","probabilities exceed 1","you are sorting laundry"], "a":1,
   "w":"At-least-one means complement, instantly, forever. Highest ROI reflex in the subject."}],
"pb3": [
  {"q":"Two fair coins tossed: P(both heads) =",
   "o":["1/3","1/4 - independent events MULTIPLY: 1/2 x 1/2; the first coin cannot gossip with the second","1/2","2/3"], "a":1,
   "w":"Independence test: does one outcome move the other's odds? Coins: never. Multiply."},
  {"q":"Two cards drawn WITHOUT replacement, both aces:",
   "o":["1/169","1/221 (4/52 x 3/51) - the second pick starves TWICE: one ace gone AND one card gone; silent replacement would give 1/169","1/52","4/51"], "a":1,
   "w":"Replacement status IS the question. Declare it before computing; both counters starve together."},
  {"q":"Bag: 5 red + 4 blue; two drawn without replacement, both red:",
   "o":["25/81","5/18 (5/9 x 4/8 = 20/72) - dependent draws shrink numerator and denominator together; (5/9)^2 pretends the ball hopped back in","1/2","5/9"], "a":1,
   "w":"The bridge formula working: P(A) x P(B given A). Sequential and combo routes agree at 5/18 and 5/42."}],
"pb4": [
  {"q":"A drawn card turned out RED. P(it is a king | red):",
   "o":["4/52","1/13 - the condition shrinks the universe to 26 red cards holding 2 kings: 2/26; the full deck is now irrelevant","2/13","1/52"], "a":1,
   "w":"Shrink the universe to the given, then count winners inside it."},
  {"q":"A family has two children, AT LEAST one a boy. P(both boys):",
   "o":["1/2","1/3 - the given deletes only the GG cell, leaving BB, BG, GB; one of three; conditions edit the sample space, never your swagger","1/4","2/3"], "a":1,
   "w":"Specificity is everything: at-least-one gives 1/3, the-elder-is-a-boy gives 1/2."},
  {"q":"Fraud base rate 2%; screen catches 90% of fraud, false-alarms 5% of clean. A flagged vendor is truly fraudulent with probability about:",
   "o":["90%","27% - per 1,000: 18 real catches vs 49 false alarms, 18/67; when the hunted thing is rare, even good tests mostly flag the innocent","95%","2%"], "a":1,
   "w":"Natural frequencies beat algebra on napkins: 18 and 49 tell the whole base-rate story."}],
"pb5": [
  {"q":"3 balls drawn from 5 red + 4 blue, ALL red:",
   "o":["1/12","5/42 (5C3/9C3 = 10/84) - both floors counted under the SAME combination rules; PB3's sequential chain lands the identical answer","5/9","1/9"], "a":1,
   "w":"Same-rules law in action, plus a self-audit via the second derivation."},
  {"q":"10 hampers, 2 defective; sample of 3: P(at least one defective):",
   "o":["3/10","8/15 - complement the all-good case: 1 - 8C3/10C3 = 1 - 56/120 = 64/120; the direct sum agrees","1/6","56/120"], "a":1,
   "w":"At-least-one = complement with P&C numerators now. The dual-check separates confidence from hope."},
  {"q":"The cardinal rule of counting-based probability:",
   "o":["any fraction under 1 is legal","favorable/total with BOTH floors counted by the SAME method - combos with combos, arrangements with arrangements; the r! ghosts cancel only when present on both floors","total divided by favorable","always use permutations"], "a":1,
   "w":"Mixing perms over combos is the classic self-goal. Ghosts cancel only when they appear on both floors."}],
"pb6": [
  {"q":"Arena re-run: the coin showed HHHH already. P(head on toss 5):",
   "o":["1/32","1/2 - independent tosses carry no memory; the GAMBLER'S FALLACY sells streak narratives, the coin cannot read its own history","1/16","3/4"], "a":1,
   "w":"Streaks are stories, not physics. The past cannot steer the next toss."},
  {"q":"Two-dice sum is 7 or 11:",
   "o":["1/6","2/9 - the cells are exclusive (one throw cannot be two sums), so add clean: 6/36 + 2/36","8/36 minus overlap","1/9"], "a":1,
   "w":"Exclusivity confirmed, then add. The overlap question always comes first."},
  {"q":"The 7-step scan's SECOND gate asks about:",
   "o":["Bayes formula","the UNIVERSE - what are ALL equally-likely outcomes here (grid, bag, deck, rounds)? Every tragedy starts with a universe that was never drawn","the answer choices","the clock"], "a":1,
   "w":"Scan order: same-rules lock, universe, replacement, independence, exclusivity, complement, sanity."}],
"pb7": [
  {"q":"Scooter grand prize (Rs 80,000) rides on 1-in-2,00,000 scratch cards. Expected cost per card:",
   "o":["Rs 80","Rs 0.40 - EV = 80,000 / 2,00,000; the promo is insurable and budgetable at forty paise a card; EV turns marketing into procurement","Rs 4","Rs 800"], "a":1,
   "w":"Expected value: every price in this module is a value x chance."},
  {"q":"Loan: Rs 1,00,000 exposure, 2% default, 40% recovery. Expected loss per loan - and verdict at a Rs 3,000 fee:",
   "o":["Rs 2,000 - reject","Rs 1,200 - EAD x PD x (1 - recovery) = 1,00,000 x 0.02 x 0.60; fee of 3,000 clears it with 1,800 margin: APPROVE; at PD 5.5% the row flips to DECLINE","Rs 600 - approve","Rs 20,000 - reject"], "a":1,
   "w":"EL is the approve/reject line; the whole NBFC model is this row in a suit."},
  {"q":"Five independent pitches, 20% close each. P(at least one close):",
   "o":["20%","about 67.2% - 1 - 0.8^5 = 1 - 0.32768; adding 5 x 20% = 100% is the freshers' siren: multiply the misses, cash the complement","100%","32%"], "a":1,
   "w":"Complement law + independence: the two most employable moves in applied probability, in one line."}],
"pl1": [
  {"q":"The basmati bag: Rs 71 cost, Rs 100 shelf. Exam-law profit %:",
   "o":["29%","40.8% - 29/71: profit% rides the COST price by law; the 29% figure is business margin on SP - same bag, two dialects","25%","20%"], "a":1,
   "w":"Base first, always. Margin and markup are one profit wearing two denominators."},
  {"q":"CP Rs 250, target profit 20%. The selling price:",
   "o":["Rs 270","Rs 300 - 250 x 1.20; the multiplier IS the profit percent wearing a calculator","Rs 280","Rs 310"], "a":1,
   "w":"Forward = build with (1 + rate). One multiplication, one answer."},
  {"q":"A kurta SOLD at Rs 1,150 earned 15% profit. Its CP:",
   "o":["Rs 1,050","Rs 1,000 - reverse the multiplier: 1,150 / 1.15; dividing is CP-recovery and the clean landing confirms it","Rs 977.50","Rs 1,225"], "a":1,
   "w":"Reverse = divide by the multiplier. Round CPs are the exam gift to division."}],
"pl2": [
  {"q":"Twin watches: both sold Rs 990, one at +10%, one at -10%. Overall:",
   "o":["break-even","LOSS of 1% - CPs 900 + 1,100 = 2,000 vs SP 1,980; same-SP twins ALWAYS lose x^2/100 = 10^2/100","gain 1%","loss 2%"], "a":1,
   "w":"The loser hides a fat CP under the identical tag. The theorem never sleeps."},
  {"q":"A mixer sold Rs 480 at a 20% LOSS. Its CP:",
   "o":["Rs 384","Rs 600 - 480 / 0.8: loss-sales sit on the (1 - rate) multiplier, so the reverse divides small and grows","Rs 576","Rs 400"], "a":1,
   "w":"A CP smaller than SP on a loss-sale would be a multiply-slip confession."},
  {"q":"A trader's profit is 25% of the SELLING price. Exam-law profit% (on CP):",
   "o":["25%","33.33% - SP 100 gives P 25, CP 75, so 25/75; SP-quoted bragging inflates by exactly the CP:SP gap; k/(100-k) converts in one breath","20%","75%"], "a":1,
   "w":"Quote the base or be misquoted. SP dialect flatters, CP law settles."}],
"pl3": [
  {"q":"Successive discounts 20% + 10% equal ONE discount of:",
   "o":["30%","28% - 1 - 0.8 x 0.9: multipliers carry discounts, and every stack undercuts its own headline sum","32%","15%"], "a":1,
   "w":"Stacks multiply on a shrinking base; headlines merely add."},
  {"q":"After a 10% discount, a trader still earns 20%. His markup on CP was:",
   "o":["30%","33.33% - 0.9 x MP = 1.2 x CP, so MP = 4/3 CP: markup one-third above cost buys exactly enough room for the festival","20%","32%"], "a":1,
   "w":"(1+p)/(1-d) is the sticker-printer formula: 1.2/0.9 = 4/3."},
  {"q":"CP Rs 500, marked up 60%, then 25% off. Final SP and verdict:",
   "o":["Rs 700, 40% profit","Rs 600, 20% profit - 500 x 1.6 x 0.75 = 600; the chain runs cost to sticker to till in two multiplies, and 1.2 survives","Rs 550, 10% profit","Rs 500, break-even"], "a":1,
   "w":"Markup 60 minus discount 25 is NOT 35 profit; only the multipliers get a vote."}],
"pl4": [
  {"q":"A trader uses a 900 g weight for 1 kg and prices AT cost. True gain%:",
   "o":["10%","11.11% - 100/900: the shortfall over what he actually DELIVERED; the stone lies, the denominator does not","11%","9.09%"], "a":1,
   "w":"Gain% = error/delivered. Pricing at cost is the misdirection; weight is the profit."},
  {"q":"Milk Rs 50/L; 1 L free water per 4 L milk; mix sold at Rs 50/L. Profit%:",
   "o":["20%","25% - the 5 L mix costs 4 x 50 = 200 and bills 5 x 50 = 250; water sold at milk label is the purest margin in dairy","15%","22.5%"], "a":1,
   "w":"Ratio reflex: water-share over milk-share times 100. QC-gate worthy."},
  {"q":"Buy 4 get 1 free converts to a flat discount of:",
   "o":["25%","20% - pay 4, carry 5: the freebie divided by TAKE-HOME = 1/5; the 25% myth prices it against what you PAID for","16.67%","10%"], "a":1,
   "w":"The bundle discount lives in the take-home denominator. Rank offers by it, not by feelings."}],
"pl5": [
  {"q":"If the SP were doubled, the profit would TRIPLE. The profit% is:",
   "o":["50%","100% - SP - CP = P with 2SP - CP = 3P force SP = 2P, so CP = P; the train family terminates at profit = cost","75%","200%"], "a":1,
   "w":"Write the two equations, subtract the baseline, collect your mark."},
  {"q":"A table at Rs 450 gains y%; at Rs 300 it loses y%. The cost price:",
   "o":["Rs 350","Rs 375 - the midpoint law: symmetric rates put CP dead-center; (450+300)/2, and y = 150/750 = 20% comes free","Rs 400","Rs 325"], "a":1,
   "w":"Symmetric rates mean CP equals the average of the two prices."},
  {"q":"Selling 33 meters of cloth earns the SP of 11 meters as profit. Gain%:",
   "o":["33.33%","50% - profit equals SP of 11 of the 33 sold, so the cost of all 33 equals SP of 22: 11/22; the k/(n-k) map","25%","11%"], "a":1,
   "w":"Gain-as-SP-of-k maps to k/(n-k). Read the noun before choosing the map."}],
"pl6": [
  {"q":"Arena re-run: successive 20% + 10% equal a single discount of:",
   "o":["30%","28% - 1 - 0.8 x 0.9; stacks multiply on a shrinking base, headlines merely add","26%","32%"], "a":1,
   "w":"0.72 is the pay-load; 28% the honest rate. Trust multiplication over marketing."},
  {"q":"The SAME-SP SYMMETRY trap says +10% and -10% cancel. The truth:",
   "o":["true - gains mirror losses","false - the pair ALWAYS loses x^2/100 = 1%; equal tags hide unequal CP bases, the loser hides the fat one","false - it gains 1%","depends on CP"], "a":1,
   "w":"Unconditional theorem: same SP, opposite rates, x^2/100 loss."},
  {"q":"The 6-gate radar's FIRST gate on any P&L question:",
   "o":["compute the discount first","IDENTIFY THE BASE - profit% rides CP by exam law; one base-swap flips every fraction downstream","convert to decimals","guess CP = Rs 100"], "a":1,
   "w":"Base, prices, stack, reverse, special, sanity - in that order, in five seconds."}],
"pl7": [
  {"q":"ShopKart's Rs 100 shelf item (COGS Rs 71): gross MARGIN vs exam-law markup:",
   "o":["29% vs 29%","29% margin (on SP) vs 40.8% markup (on CP) - one transaction, two dialects; the analyst converts in 5 seconds","40.8% vs 29%","22.5% vs 29%"], "a":1,
   "w":"Margin = markup/(1+markup). Dialect slips are pricing bugs."},
  {"q":"A blanket 10% price cut on the Rs 100/71 item does what to gross profit:",
   "o":["drops it 10%","drops it 34.5% - Rs 29 to Rs 19 (cut% over margin%); catching up needs +52.6% units - price wars are computed, not cheered","drops it 3.45%","no change"], "a":1,
   "w":"Margin elasticity: shallow discounts dig straight through thin gross layers."},
  {"q":"FF-221 early-pay: 2% off for paying 20 days early. Annualized earning:",
   "o":["2%","about 37.2% - (2/98) x (365/20): two percent for twenty days annualizes miles above the 12% loan rate - the cheapest yield in the building","7.3%","24%"], "a":1,
   "w":"Days-to-rate conversion is procurement's quiet superpower. Take the discount."}],
"ra1": [
  {"q":"Rs 1,75,000 profit split 4:3 pays out:",
   "o":["87,500 each","1,00,000 and 75,000 - 7 equal parts of 25,000, taken 4 and 3; the re-add check tiles to 1,75,000","1,05,000 and 70,000","1,25,000 and 50,000"], "a":1,
   "w":"Equal-parts division with a compulsory tile-check. Splits must rebuild the total."},
  {"q":"A:B = 3:4 and B:C = 5:6 give A:B:C equal to:",
   "o":["3:4:6","15:20:24 - B speaks with two faces (4 and 5), so normalize to LCM 20, then read the trio","6:8:6","3:5:6"], "a":1,
   "w":"The common-middle LCM move. Never chain raw."},
  {"q":"84:144 in simplest form:",
   "o":["8:14","7:12 - divide both terms by HCF 12; only multiplication and division preserve ratios (addition bends them toward 1)","6:8","4:7"], "a":1,
   "w":"HCF-divide, always. The ABCD law guards the rest."}],
"ra2": [
  {"q":"The fourth proportional to 3, 4, 6 is:",
   "o":["6","8 - 3/4 = 6/x gives 3x = 24; the cross-product law (extremes = means) does these in one line","4.5","12"], "a":1,
   "w":"Extremes times extremes equals means times means."},
  {"q":"Incomes 7:5, expenses 3:2, savings Rs 2,000 each. The incomes are:",
   "o":["12,000 and 9,000","14,000 and 10,000 - 7k-3m = 5k-2m gives m = 2k, then 7k - 6k = 2,000; one substitution kills the whole riddle family","21,000 and 15,000","9,000 and 7,000"], "a":1,
   "w":"Two letters, two equations; subtracting them is the universal first move."},
  {"q":"A pouch has 50p:25p:10p coins in 2:3:5 worth Rs 90. Count of 50p coins:",
   "o":["36","80 - value-weight first: 1.0k + 0.75k + 0.5k = 2.25k = 90, so k = 40 and the 50p count is 2k = 80","40","120"], "a":1,
   "w":"Ratio counts objects; k gets priced per unit before solving."}],
"ra3": [
  {"q":"Rakesh Rs 40,000 x 6 months vs Arjun Rs 50,000 x 12 months - split ratio:",
   "o":["4:5","2:5 - capital x time: 2,40,000 vs 6,00,000; rupee-MONTHS, not rupees, tell the partnership story","1:1","5:2"], "a":1,
   "w":"Time is the only dial a mid-year joiner turns."},
  {"q":"A invests 30,000 all year; B 45,000 from month 4. Of Rs 1,02,000 profit, A takes:",
   "o":["45,000","48,000 - products 3,60,000 : 4,05,000 = 8:9, so A takes 8/17 of 1,02,000","51,000","54,000"], "a":1,
   "w":"Bigger-then-late capital still led, but time trimmed it to 9 parts."},
  {"q":"In a deed with interest-on-capital AND salary, residual ratio-split applies to:",
   "o":["the full profit","whatever REMAINS after interest and salary are deducted - firm expenses first, the ratio eats leftovers","only the salary","the interest"], "a":1,
   "w":"Ladder order is sacred: interest, salary, then residual."}],
"ra4": [
  {"q":"40 L pure milk; 4 L drawn-and-replaced with water, 3 times. Milk remaining:",
   "o":["28 L","29.16 L - 40 x 0.9^3 = 40 x 0.729; each pull takes the CURRENT mix, so decay is geometric, never linear","29.6 L","32 L"], "a":1,
   "w":"The replacement formula. Straight-line subtraction is the fresher answer."},
  {"q":"Rs 36/kg and 56/kg grains for a Rs 45 mean - blend ratio:",
   "o":["9:11","11:9 - quantities run INVERSE to price-distances from the mean: (56-45):(45-36) = 11:9, verified at 45/kg","4:5","1:1"], "a":1,
   "w":"The alligation cross. Five seconds, one X."},
  {"q":"Vessels A (5:3) and B (7:5) milk:water, equal quantities mixed, give:",
   "o":["6:4","29:19 - common-total method: 24 L each, milk 15 + 14 = 29, water 9 + 10 = 19; adding ratios term-to-term is the self-goal","29:21","3:2"], "a":1,
   "w":"Fractions marry at common totals."}],
"ra5": [
  {"q":"Arena re-run: Rs 66,000 in 7:4 pays out:",
   "o":["36,000 and 30,000","42,000 and 24,000 - 11 parts of 6,000 taken 7 and 4; gate 1 names the whole before arithmetic","38,000 and 28,000","44,000 and 22,000"], "a":1,
   "w":"Equal-parts plus tile-check. The oldest move never loses a mark."},
  {"q":"Adjust 3:5 by adding 4 to each term - the verdict:",
   "o":["legal, same ratio","illegal - 7:9 is a NEW ratio (37.5% to 43.75%); ABCD law: only multiplication and division preserve ratios","legal if k is small","illegal only with decimals"], "a":1,
   "w":"Additive tweaks are new ratios with good PR. Compute fresh."},
  {"q":"The 5-gate radar FIRST gate asks:",
   "o":["is the HCF extracted","TERM-VS-WHOLE - term-over-term or term-over-sum? naming the denominator (2:5 vs 2/7) is half the subject","cross product","draw the vessels"], "a":1,
   "w":"Then units, middles, time, legality - five gates, five seconds."}],
"ra6": [
  {"q":"Gurugram deed: Arjun's year-1 total earning:",
   "o":["80,000","1,90,000 - interest 80,000 + working salary 30,000 + residual 80,000; layers first, ratio second; the bare capital ratio misses 1,10,000 of his pay","1,60,000","1,20,000"], "a":1,
   "w":"Deeds pay in layers. Read all three floors."},
  {"q":"Rs 24L debt against 36L equity gives a D:E of:",
   "o":["0.24","0.67 - 24:36 = 2:3; under the 1.0 conservative ceiling so the 12% OD line stays reserved for working capital","1.50","2:1"], "a":1,
   "w":"D/E is governance, not just a quotient."},
  {"q":"Marketing Rs 1,40,000 split by store revenue 54:46:42:38:34:66 pays Karol Bagh (54):",
   "o":["54,000","27,000 - per-revenue-lakh 500 (1,40,000/280); all six figures tile back to 1,40,000 exactly","11,662","14,000"], "a":1,
   "w":"Allocation that tiles to the rupee is the analyst signature."}],

"si1": [
  {"q":"ShopKart parks Rs 25,000 at 10% SI for 15 years - total interest:",
   "o":["Rs 25,000","Rs 37,500 - 25,000 x 10 x 15 / 100; flat P.R.T arithmetic, no compounding anywhere","Rs 12,500","Rs 15,000"], "a":1,
   "w":"SI = PRT/100, one multiplication. 12,500 stopped at year 5; 25,000 misread P as interest."},
  {"q":"A deposit earned Rs 6,250 SI on Rs 25,000 in 5 years - the rate:",
   "o":["10%","5% - R x T = 100 x SI / P = 25, so R = 25/5; reverse the same formula, never a new one","6.25%","2.5%"], "a":1,
   "w":"Rearrange the same line: R = 100.SI/(P.T)."},
  {"q":"The visual signature of simple-interest growth:",
   "o":["a rising curve, steeper each year","a straight line - equal absolute interest added every year (arithmetic growth)","flat until year 5, then a jump","a curve flattening over time"], "a":1,
   "w":"The curve belongs to CI. Equal increments = flat engine."}],
"si2": [
  {"q":"Rs 2,000 at 10% for 2 years: CI minus SI equals:",
   "o":["Rs 2","Rs 20 - P(r/100)^2 = 2,000 x 0.01; the jewel prices interest-on-interest directly","Rs 40","Rs 200"], "a":1,
   "w":"The gap IS interest on year-1's Rs 200."},
  {"q":"Rs 1,00,000 at 10% CI for 3 years matures at:",
   "o":["Rs 1,30,000","Rs 1,33,100 - 1.1 x 1.1 x 1.1 = 1.331 on the re-based pile; SI would underpay by 3,100","Rs 1,33,000","Rs 1,21,000"], "a":1,
   "w":"Three re-basings; 1,30,000 is the flat-engine fantasy."},
  {"q":"Fastest tell that an account compounds rather than runs simple:",
   "o":["the rate is above 8%","year-2's interest is BIGGER than year-1's - the base re-bases every cycle","interest credit is monthly","the passbook shows a digital badge"], "a":1,
   "w":"Growing yearly increments at a constant rate = re-basing = compound."}],
"si3": [
  {"q":"Rs 10,000 at 10% p.a. compounded HALF-YEARLY for 1 year grows to:",
   "o":["Rs 11,000","Rs 11,025 - two rests at 5%; the second serving adds the Rs 25","Rs 11,050","Rs 10,500"], "a":1,
   "w":"Rate/2, periods x2. The gear shift is worth money."},
  {"q":"Rule of 72: money doubles in 6 years. The rate:",
   "o":["6%","12% - 72/6; the club pairs always multiply to 72 (12x6, 8x9, 24x3)","7.2%","10%"], "a":1,
   "w":"Rate x years = 72, recited as pairs."},
  {"q":"A Rs 2,00,000 delivery van depreciates 10% a year (reducing balance). Value after 3 years:",
   "o":["Rs 1,40,000","Rs 1,45,800 - x0.9^3 = x0.729; depreciation is CI with a negative rate, never flat subtraction","Rs 1,34,000","Rs 1,50,000"], "a":1,
   "w":"1,40,000 melted flat 20,000 x 3; mirrors compound too."}],
"si4": [
  {"q":"A fridge sells on 2 annual installments of Rs 8,820 each at 5% CI - the fair cash price (principal):",
   "o":["Rs 17,640 (just add the installments)","Rs 16,400 - 8,820/1.05 = 8,400 and 8,820/1.1025 = 8,000; discount the future, never add it","Rs 16,800","Rs 16,000"], "a":1,
   "w":"Installment-addition trap. Timestamp every rupee, then add."},
  {"q":"Under SI, money doubles in 10 years. The rate:",
   "o":["7.2%","10% - doubling means interest = P, so R x T = 100(k - 1) = 100","20%","12%"], "a":1,
   "w":"7.2% is the CI answer (72 club) for the OTHER engine."},
  {"q":"CI doubles every 4 years. In 16 years money multiplies by:",
   "o":["x4","x16 - 16/4 = 4 doublings, 2^4 = 16; k-folds are powers, not multiples","x8","x64"], "a":1,
   "w":"Windows stack in the exponent: 2, 4, 8, 16. Adding doublings is the classic blunder."}],
"si5": [
  {"q":"Arena re-run: Rs 5,00,000 at 10% SI for 9 months earns interest of:",
   "o":["Rs 50,000","Rs 37,500 - 9 months = 0.75 years converts BEFORE P x R x T; the time-conversion ambush is the whole question","Rs 45,000","Rs 3,750"], "a":1,
   "w":"Disarm units, then multiply: 5,00,000 x 10 x 0.75/100."},
  {"q":"'10% per annum compounded half-yearly' for 1 year on Rs 10,000 vs plain annual - the extra earned:",
   "o":["Rs 0","Rs 25 - 11,025 - 11,000; the second serving of 5% that frequency-blind solvers never see","Rs 100","Rs 250"], "a":1,
   "w":"Frequency is a gear, not a garnish; gear-shifts compound quietly."},
  {"q":"The radar's FIRST gate before any interest arithmetic:",
   "o":["divide the rate by the frequency","ENGINE-ID - simple or compound, spoken aloud from the question's language; a wrong engine invalidates every dial after it","find the amount first","compute the doubling time"], "a":1,
   "w":"Engine first, frequency second, time-shape third, noun fourth, sanity fifth."}],
"si6": [
  {"q":"A credit card charging 3% PER MONTH really costs per year:",
   "o":["36%","42.6% - 1.03^12 = 1.4258; monthly rests compound twelve times and the nominal APR hides 6.6 points","39%","30%"], "a":1,
   "w":"(1+m)^12 - 1 whenever a rate wears /month on its sleeve."},
  {"q":"Rs 25,00,000 parked at 7.1% p.a. with quarterly rests for one year matures at about:",
   "o":["Rs 26,77,500","Rs 26.82 lakh - x1.01775^4 = x1.072913 gives 26,82,282; the quarterly gear beats flat 7.1% by Rs 4,782","Rs 26,10,000","Rs 27,05,000"], "a":1,
   "w":"26,77,500 used flat arithmetic; rests compound within the year."},
  {"q":"ShopKart's Rs 5,00,000 van loan at 12% (EMI Rs 11,122): the first month's interest strand is:",
   "o":["Rs 11,122","Rs 5,000 - balance x monthly 1% = 5,000; principal takes the remaining 6,122 and the braid begins","Rs 6,122","Rs 5,500"], "a":1,
   "w":"Interest on outstanding FIRST; the EMI residue attacks principal."}],

"sy1": [
  {"q":"'Only supervisors can approve a return above Rs 5,000,' in standard logical form, is:",
   "o":["All supervisors are return-approvers","All return-approvers (Rs 5,000+) are supervisors - 'only X are Y' flips to All Y are X; the only-class owns the door","Some supervisors are return-approvers","No supervisor is a return-approver"], "a":1,
   "w":"Option (a) reverses the containment; the rule restricts WHO approves, not what supervisors do."},
  {"q":"'Some discounts are festival discounts' logically guarantees:",
   "o":["some discounts are NOT festival discounts","at least one discount is a festival discount - possibly all of them; logic's 'some' is a door left open, never a headcount","most discounts are festival discounts","exactly half are festival discounts"], "a":1,
   "w":"I means existence, not majority, and never the negative twin."},
  {"q":"A syllogism states 'All cats are dogs. Tom is a cat.' The conclusion 'Tom is a dog' is:",
   "o":["invalid - cats are not dogs in reality","valid - conclusions are judged inside the statement-world; reality leaks are illegal under the Golden Law","possible but not definite","invalid - the statement is unscientific"], "a":1,
   "w":"Inside the machine the premises are gospel. Statements bind; world knowledge doesn't."}],
"sy2": [
  {"q":"Statements: 'All auditors are employees. All CA-holders are employees.' Which conclusion is FORCED?",
   "o":["Some auditors are CA-holders","none of the offered All/Some links between auditors and CA-holders - the middle 'employees' is distributed in neither premise; two tenants of one set share no forced relation","All CA-holders are auditors","No auditor is a CA-holder"], "a":1,
   "w":"Disjoint-tenant drawing kills both positive links instantly. Demand the bridge."},
  {"q":"The legal conversion of 'All leads are graduates' is:",
   "o":["All graduates are leads","Some graduates are leads - All converts only downhill, to Some; the graduates-ring outside leads may be enormous or empty","Some leads are not graduates","No graduate is a lead"], "a":1,
   "w":"Table: E-E, I-I free; A->I downhill; everything else is slander."},
  {"q":"'All scooters are two-wheelers. No two-wheeler is expressway-permitted.' Therefore:",
   "o":["some two-wheelers are expressway-permitted","no expressway-permitted vehicle is a scooter - A chains into E across a distributed middle, and E converts both directions freely","some scooters are expressway-permitted","all two-wheelers are scooters"], "a":1,
   "w":"Scooters locked inside two-wheelers, two-wheelers exiled from expressways; the converted form is equally forced."}],
"sy3": [
  {"q":"'All CAs are graduates. Some auditors are CAs.' forces:",
   "o":["all auditors are graduates","some auditors are graduates - the inhabited auditors-CA dot is dragged inside graduates by the All-net; some is all we can honestly invoice","some graduates are not auditors","no auditor is a graduate"], "a":1,
   "w":"(a) is SOME OVERREACH; the escort covers only the members we know exist."},
  {"q":"'Some vendors are registered. Some vendors are punctual.' What follows about registered vs punctual?",
   "o":["some registered are punctual","nothing definite - two particulars share no forced relation; three circles can overlap pairwise with an empty triple zone","no registered vendor is punctual","most registered are punctual"], "a":1,
   "w":"The pairwise-overlap/empty-triple drawing is the universal killer."},
  {"q":"'Some SKUs are not barcoded' lets us infer about barcoded SKUs:",
   "o":["some SKUs are barcoded","nothing at all - an O-statement is professionally silent about the rest of S; maybe none are barcoded","most SKUs are barcoded","all SKUs are unbarcoded"], "a":1,
   "w":"Twin towers don't talk: O never yields I, I never yields O."}],
"sy4": [
  {"q":"Statements: 'All engineers are readers. Some readers are musicians.' The claim 'Some engineers being musicians is a possibility':",
   "o":["fails - no chain forces it","holds - possibility needs only ONE friendly drawing, and nothing in the statements blocks the engineer-musician overlap","holds, and is also definite","fails - engineers and musicians are disjoint"], "a":1,
   "w":"Possibility court asks only 'explicitly blocked?' Unblocked is not the same as forced - but possibility is cheap."},
  {"q":"The complementary partner of 'All employees are clerks' is:",
   "o":["No employee is a clerk","Some employees are not clerks - negation flips the quantifier AND the gate: All vs Some-not exhausts every world","Some employees are clerks","All clerks are employees"], "a":1,
   "w":"All vs No are NOT complementary - both can be false together in a mixed world."},
  {"q":"Statements force 'No officer is a clerk' and 'All officers are employees.' Offered: (I) No employee is a clerk; (II) Some employees are clerks. Verdict:",
   "o":["(I) follows; (II) dies","either (I) or (II) follows - same S-P, complementary E vs I, and each dies in a legal drawing, so the pair is jointly guaranteed","neither follows","both follow definitely"], "a":1,
   "w":"Three gates green. (I) alone dies: employees are bigger than officers - one clerk-employee outside the officer-circle is a legal world."}],
"sy5": [
  {"q":"Arena re-run: 'All auditors are employees. Some auditors are CA-holders.' The FORCED conclusion:",
   "o":["all employees are CA-holders","some employees are CA-holders - the inhabited auditors-CA dot sits inside employees; some is all an escorted particular can honestly claim","some CA-holders are not employees","no CA-holder is an employee"], "a":1,
   "w":"Dot-escort logic. (c) dies - the twin towers don't talk."},
  {"q":"Pair audit: '(I) Some invoices carry GST (II) Some invoices do not carry GST.' Either-or?",
   "o":["yes - opposites","NO - gate-2 forgery: some/some-not are NOT complementary (both can hold together); only All-vs-Some-not and No-vs-Some partition the world","yes, if statements are silent","only (I) follows"], "a":1,
   "w":"Complementary means exactly one true in EVERY world; Some/Some-not fail together in the mixed world."},
  {"q":"The radar's FIRST gate before any syllogism answer:",
   "o":["tag A/E/I/O types","GOLDEN LAW - am I inside the statement-world? kill every reality import before type-tagging, bridging, or strength-courting anything","check for complementary pairs","draw all circles immediately"], "a":1,
   "w":"Order: leak, types, bridge, strength, pairs. Recite till boring."}],
"sy6": [
  {"q":"Policy: 'All invoices above Rs 50,000 need CFO sign-off.' FF-221 totals Rs 55,755 - the FORCED action:",
   "o":["nothing until payment falls due","CFO sign-off is mandatory (ESCALATE) - A-rule + member of the subject class = duty follows with logical force; audits are conclusions with letterheads","GST re-verification first","a random audit sample"], "a":1,
   "w":"'>'-check + member + A-chain = verdict. No vibes required."},
  {"q":"Policy: 'All KYC-complete accounts may trade.' A non-KYC account trades. By the letter:",
   "o":["breach - the gate was stated","NO breach follows - the permission arrow travels one way and is silent about non-KYC accounts; block it by redrafting to 'Only KYC-complete accounts may trade'","possible breach, definite fine","breach if the trade lost money"], "a":1,
   "w":"The silent gate: one-way arrows are the most expensive wording mistake in policy-drafting."},
  {"q":"Vendor splits FF-221 into two Rs 27,878 invoices, both unsigned. The Rs 50,000 rule:",
   "o":["blocks both - thresholds aggregate automatically","passes both BY THE LETTER - each invoice is below Rs 50,000 and the rule never aggregates; the finding is a redraft with a 7-day vendor-window, the AML-structuring pattern","blocks only the second one","blocks both if the vendor is new"], "a":1,
   "w":"Logic convicts the letter, not the spirit; then you redraft the letter. That is the audit loop."}],

"sd1": [
  {"q":"54 km/h expressed in m/s:",
   "o":["12 m/s","15 m/s - 54 x 5/18; the train chapter's master key (a 150 m train crosses a pole in exactly 10 s at this speed)","18 m/s","25 m/s"], "a":1,
   "w":"x5/18 always; x18/5 to go home. Picking 12 means the fraction flipped."},
  {"q":"Walking at 3/4 of his usual speed, a man is 20 minutes late. His usual time:",
   "o":["80 min","60 min - speed ratio 3:4 flips the time ratio to 4:3; the extra 1/3 = 20 min means the usual 3/3 = 60","45 min","100 min"], "a":1,
   "w":"Inverse proportionality: the time ratio is the speed ratio upside-down."},
  {"q":"ShopKart's rider averages 24 km/h with a 10-minute promise. The delivery radius:",
   "o":["2.4 km","4 km - 24 x 10/60; one multiplication that prices an entire dark-store network","6 km","12 km"], "a":1,
   "w":"Hours in the speed demand hours in the time: 10/60, not 10."}],
"sd2": [
  {"q":"A van does 120 km out at 40 km/h and 120 km back at 60 km/h. Average speed:",
   "o":["50 km/h","48 km/h - total 240 km over 3+2 = 5 h, or harmonic 2xy/(x+y); the slow leg owns more clock","45 km/h","52 km/h"], "a":1,
   "w":"Averaging the speeds averages the wrong thing - time weights the truth."},
  {"q":"A rider drives one hour at 48 km/h, then covers 48 km at 32 km/h. Honest whole-day average:",
   "o":["40 km/h","38.4 km/h - 48 km in 1 h plus 48 km in 1.5 h = 96 km / 2.5 h; the stretch repeated, not the clock","43.2 km/h","36 km/h"], "a":1,
   "w":"Equal distances vote harmonic; equal hours vote arithmetic."},
  {"q":"'A rider averages 30 km/h except for a 1-hour wait.' True trip average if riding covered 90 km?",
   "o":["30 km/h","22.5 km/h - riding was 90/30 = 3 h, plus 1 h layover = 4 h for 90 km; the layover parasite taxes every denominator","27 km/h","25 km/h"], "a":1,
   "w":"Total / total, always - the wait sits inside the denominator."}],
"sd3": [
  {"q":"A 150 m train at 54 km/h crosses a 250 m platform in:",
   "o":["16.67 s","26.67 s - length menu 150+250 = 400 m at 15 m/s; the rear's exit is part of the crossing","10 s","33.33 s"], "a":1,
   "w":"Pole = L only; platform = L + P. Menu first, division second."},
  {"q":"Two 150 m trains at 50 and 40 km/h approach head-on. They clear each other in:",
   "o":["108 s","12 s - relative 90 km/h = 25 m/s over both bodies (300 m): opposite = add speeds, lengths always add","6.67 s","24 s"], "a":1,
   "w":"108 s is the same-direction sibling (relative 10 km/h); head-on means the gears add."},
  {"q":"Same two trains, same direction (50 chasing 40). Overtake time:",
   "o":["12 s","108 s - relative 10 km/h = 2.78 m/s over 300 m; same direction SUBTRACTS speeds and the longer clock is the trap-tax for adders","54 s","36 s"], "a":1,
   "w":"Subtraction geometry; lengths still add - both bodies must clear."}],
"sd4": [
  {"q":"Boat runs 12 km/h in still water, stream 3 km/h. Downstream and upstream speeds:",
   "o":["12 and 9","15 and 9 - the river is a moving floor: down = x + w, up = x - w; anchor pair 12 & 3 pays out forever","15 and 12","18 and 6"], "a":1,
   "w":"Gears: plus down, minus up; the still-water muscle sits in the middle."},
  {"q":"A boat logs downstream 24 km/h and upstream 16 km/h. Still-water speed and current:",
   "o":["20 and 8","20 and 4 - midpoint is the boat (d+u)/2, half the gap is the river (d-u)/2","22 and 2","24 and 8"], "a":1,
   "w":"The back-solve halves: (24+16)/2 and (24-16)/2."},
  {"q":"Same 30 km round trip: still-water average 12 km/h. With a 3 km/h current, the loop-average:",
   "o":["12 km/h - current balances out","11.25 km/h - the 9 km/h up-leg bleeds more clock than the 15 km/h down-leg saves (harmonic 2x15x9/24); the river ALWAYS taxes the loop","12.5 km/h","10.5 km/h"], "a":1,
   "w":"T = 2dx/(x^2 - w^2) > 2d/x whenever w > 0. Balances-out never survives arithmetic."}],
"sd5": [
  {"q":"In a 100 m race A beats B by 20 m. Their speed ratio:",
   "o":["6:5","5:4 - same clock, so finish-line distances ARE the ratio (100:80); the by-margin unrolls in one line","4:3","5:3"], "a":1,
   "w":"Margins are distances at the same clock. Gift wrap off, ratio out."},
  {"q":"Two runners (8 and 5 m/s) run a 400 m loop in the SAME direction. They first meet after:",
   "o":["30.8 s","133.3 s - the faster must gain one full lap at the 3 m/s gap: 400/3 (opposite directions would be 400/13 = 30.8 s)","400 s","80 s"], "a":1,
   "w":"Direction chooses the gear: gap for same, sum for opposite."},
  {"q":"Lap times on a circuit: 50 s and 80 s. Both riders first stand together AT THE STARTING POINT after:",
   "o":["400/3 s","400 s - the at-start reunion needs whole laps from BOTH: LCM(50, 80); 'starting point' switches the law from relative-length to LCM","130 s","65 s"], "a":1,
   "w":"Anywhere-meeting ≠ at-start meeting - the word switches the machine."}],
"sd6": [
  {"q":"Arena re-run: rider 48 km/h out and 32 km/h back over the same stretch - day average:",
   "o":["40 km/h","38.4 km/h - the stretch repeated, not the clock: harmonic 2x48x32/80; the strength gate kills the arithmetic-mean mirage","36 km/h","42 km/h"], "a":1,
   "w":"Mirage season is year-round; harmonic or bust on equal distances."},
  {"q":"A 150 m train at 54 km/h crosses a man walking ALONG the track at 6 km/h. Time:",
   "o":["10 s","12.5 s - relative = 54 - 6 = 48 km/h = 13.33 m/s over the train's own 150 m (man is a point; chase means subtract)","8.33 s","15 s"], "a":1,
   "w":"10 s forgot the man moves; 8.33 ADDED speeds on a chase - TRAP 3 in 4K."},
  {"q":"The TSD radar's LAST gate is SANITY because:",
   "o":["it sounds dramatic","unit/direction/menu errors survive calculation but fail family smell-tests (same-direction slower, upstream dearer, pole quickest) - the last cheap catch before submission","papers demand a fifth gate","it replaces gate 1 when time is short"], "a":1,
   "w":"Gates 1-3 prevent, gate 4 qualifies, gate 5 arrests. Five seconds, five gates."}],
"sd7": [
  {"q":"Tariff Rs 4/km + Rs 150/h: a single-order run of 8 km and 20 minutes costs:",
   "o":["Rs 72","Rs 82 - fuel 8x4 = 32 plus time 20/60 x 150 = 50; two meters, one route, the lonely tax in full","Rs 90","Rs 48"], "a":1,
   "w":"Both meters bill every sortie; forgetting one is how margins leak."},
  {"q":"A pair-run covers 12 km in 30 minutes on the same tariff. Cost per order and dividend vs singles:",
   "o":["Rs 73, 11%","Rs 61.50, 25% - run cost 48+75 = 123 shared by 2 orders; batching splits both meters and returns a quarter of every single-run rupee","Rs 61.50, 12%","Rs 55, 33%"], "a":1,
   "w":"The run gets pricier while each ORDER gets cheaper - per-order is the only denominator that votes."},
  {"q":"With contribution Rs 217.5 per order, delivery at Rs 82 (single) vs Rs 61.5 (pair) eats:",
   "o":["25% vs 18%","37.7% vs 28.3% - batch policy is margin policy: the cost dividend returns about 9.4 points of contribution to every order","41% vs 30%","30% vs 22%"], "a":1,
   "w":"Delivery eats contribution, and dispatch is the dial. CFOs read this column first."}],

"tw1": [
  {"q":"A does a job in 12 days, B in 18. Together (LCM tank of 36 units):",
   "o":["15 days","7.2 days - flows 3 + 2 = 5 u/d against the 36-unit tank; rates add, days divide, and 12 + 18 = 30 stays the founding felony","6 days","30 days"], "a":1,
   "w":"Smell-test: must beat 12 (A solo) and lose to 6 (halving A). 7.2 sits between."},
  {"q":"A shelf-reset needs 150 man-days. With 25 men it takes:",
   "o":["12 days","6 days - M1D1 = M2D2: the man-day bill is fixed; headcount moves the calendar, not the invoice","5 days","10 days"], "a":1,
   "w":"At Rs 2,500/man-day the job costs Rs 3.75L however you staff it."},
  {"q":"A (12 d) works 4 days alone, then B (18 d) joins to finish. Total time:",
   "o":["8 days","8.8 days - tank 36: A banks 12, joint flow 5 u/d clears the remaining 24 in 4.8; 4 + 4.8","9.6 days","10 days"], "a":1,
   "w":"Phase-wise tank bookkeeping: bank first, then joint flow."}],
"tw2": [
  {"q":"'A is 3:2 against B in efficiency' means their day-ratios are:",
   "o":["3:2 as well","2:3 - efficiency divides the calendar: better workers finish in fewer days, so times sit inverse to flows","9:4","3:5"], "a":1,
   "w":"Tank proof: flows 3+2, together 6 days = 30 units; A 10 d, B 15 d."},
  {"q":"Shelf-dressing pool of Rs 750; two workers (flows 3:2), same attendance. Senior's cheque:",
   "o":["Rs 375","Rs 450 - money follows work-done: 3/5 of the pool; equal attendance makes wage ratio = flow ratio (450:300 canon)","Rs 500","Rs 600"], "a":1,
   "w":"Pools buy units of work, not hours of presence."},
  {"q":"A does a job in 10 days; B is 25% MORE efficient. B's calendar:",
   "o":["12.5 days","8 days - divide days by 1.25: 10/1.25; more efficient means fewer days, and 12.5 adds the percentage in the wrong direction","7.5 days","9 days"], "a":1,
   "w":"x1.25 rate = /1.25 time. Say the direction before dividing."}],
"tw3": [
  {"q":"A (10 d) and B (20 d) work alternate days, A starting (tank 20, flows 2 and 1). Total time:",
   "o":["13.33 days","13 days - six 2-day cycles bank 18; day 13 is A's hammer adding the final 2 units; fractional calendars ignore discrete daily lumps","15 days","12 days"], "a":1,
   "w":"Cycles first, then the day-walk. Averages decapitate in this chapter."},
  {"q":"A (12 d) and B (18 d) work together for 4 days, then A leaves. Total PROJECT time:",
   "o":["8 days","12 days - tank 36: bank 4x5 = 20 units; B finishes 16 at 2 u/d in 8; the 4 banked days still count on the project's stopwatch","16 days","10 days"], "a":1,
   "w":"B's solo stretch is 8; the project's clock reads 12. Two stopwatches."},
  {"q":"On that same leaver problem, B's man-days billed vs A's (flows 2 and 3):",
   "o":["equal - teamwork","B: 24, A: 12 - B attended all 12 days (24 units), A only 4 (12 units); the checksum 24 + 12 = 36 never lets a unit ghost the ledger","B: 16, A: 20","B: 18, A: 18"], "a":1,
   "w":"Ledger: tenure x flow each; the bill prices attendance times rate."}],
"tw4": [
  {"q":"Pipes fill in 12 h and 18 h; a tap empties in 20 h. Together (180-unit tank):",
   "o":["11.25 days","11.25 h - net flow 15 + 10 - 9 = 16 u/h; the emptier carries its minus into the table, and 180/16 is the only line needed","5.29 h","7.29 h"], "a":1,
   "w":"5.29 h is the sign-flip's trophy; 7.29 h forgot nothing - it added the leak as help."},
  {"q":"A tap fills a tank in 12 h; with a leak it takes 24 h. The leak alone empties a full tank in:",
   "o":["36 h","24 h - with-leak net = 7.5 u/h, so the leak swallows 15 - 7.5 = 7.5 u/h; drain solo = 180/7.5 = 24 (a two-line autopsy)","12 h","18 h"], "a":1,
   "w":"Leak strength = solo fill flow minus with-leak net."},
  {"q":"Filler (6 h) versus emptier (4 h) on one tank - after 12 hours the tank is:",
   "o":["half full","still empty - net = 30 - 45 = -15 u/h; the drain outruns the tap, so it NEVER fills (write 'never', not a negative time)","full","one-third full"], "a":1,
   "w":"Net sign is the verdict; a drowning tank does not negotiate."}],
"tw5": [
  {"q":"Arena re-run: A: 15 days, B: 20 days, together:",
   "o":["35 days","60/7 = 8.57 days - tank 60: 4 + 3 = 7 u/d; ADD-THE-DAYS dies because two workers never take longer than the slower one solo","8 days","12 days"], "a":1,
   "w":"Flows are the only things allowed to add in this chapter."},
  {"q":"A 240 man-day job is staffed with 20 auditors (12 days). Would 30 auditors cost LESS?",
   "o":["yes - 30 is more efficient","no - man-days is the invariant: 30 auditors finish in 8 days but still burn 240 man-days and Rs 6,00,000; headcount moves the calendar, not the invoice","yes, by exactly one-third","no - more auditors is always slower"], "a":1,
   "w":"MAN-DAY DILUTION is the belief that headcount discounts the bill."},
  {"q":"Pipes 12 h and 18 h fill, tap empties in 20 h - forgetting the tap's minus gives 7.29 h. Truth:",
   "o":["7.29 h was correct","11.25 h - SIGN FLIP identified: the emptier subtracts (net 15+10-9 = 16 on the 180-tank); sanity gate: an emptier must make filling SLOWER","16 h","9 h"], "a":1,
   "w":"Signs spoken before summing; sanity after."}],
"tw6": [
  {"q":"Festive reset = 120 man-days, 10-day deadline, Rs 5,000/day late-penalty, Rs 2,500/man-day. The 8-staff plan (15 days) costs:",
   "o":["Rs 3,00,000","Rs 3,25,000 - labor is the invariant (120 x 2,500) but the calendar breaches: 5 days x 5,000; the fictional headcount saving just got invoiced","Rs 3,12,500","Rs 3,50,000"], "a":1,
   "w":"Read both meters: labor line AND penalty meter."},
  {"q":"The optimal plan for the same contract:",
   "o":["15 staff, 8 days - fastest is safest","12 staff, exactly 10 days - ceil(man-days / deadline) = 12: same labor, zero penalty, no idle slack; the deadline-on-time corner owns the Pareto seat","10 staff with overtime","8 staff and apologize"], "a":1,
   "w":"Crashing past the deadline buys slack, not savings."},
  {"q":"Diwali floor: 560 bills/day at 40 bills per biller means:",
   "o":["12 billers","14 simultaneous billers - one ratio line staffs the floor (560/40); rostering to payroll-day names (about 25 plus floaters over two shifts) is the second, separate ledger","28 billers","40 billers"], "a":1,
   "w":"Simultaneous vs employed-per-day: staffing's two stopwatches."}],
"ac1": [
  {"q":"Owner introduces \u20B950,00,000 cash into ShopKart. The equation moves:",
   "o":["Cash up, Revenue up","Assets up \u20B950L (Cash), Equity up \u20B950L (Capital) - every transaction keeps Assets = Liabilities + Equity; capital-introduction touches no income account","Cash up, Liabilities up","Cash up, Profit up"], "a":1,
   "w":"Equity is the owner's claim; revenue is earned by selling, not by investing."},
  {"q":"ShopKart buys a delivery van for \u20B915L cash. In the T-accounts:",
   "o":["Expense up, Cash down","One asset (Van) debited, another (Cash) credited - an asset SWAP inside the equation; nothing about profit moved, and the TB stays level by construction","Asset up, Capital up","Revenue up, Cash down"], "a":1,
   "w":"Swaps are the quietest legal moves in accounting; expensing a van (a) would be a principle error AC8 hunts."},
  {"q":"A trial balance that balances PROVES:",
   "o":["the books are fully correct","Arithmetical discipline only - omissions, wrong accounts, wrong principles and compensating errors all sail through a balanced TB","profit is correctly computed","all postings reached the right accounts"], "a":1,
   "w":"A TB is a checksum, not an audit. Forensics (AC10) begins exactly where the TB ends."}],
"ac2": [
  {"q":"ShopKart pays \u20B93L on 25 December covering December and January rent. Accrual accounting records December expense of:",
   "o":["\u20B93,00,000","\u20B91,50,000 - expense follows consumption; the other \u20B91.5L sits as a Prepaid ASSET until January burns it (matching principle)","zero, cash year differs","\u20B92,00,000"], "a":1,
   "w":"Cash timing is trivia; consumption is scripture. (a) is the cash-bias shopkeeper reflex."},
  {"q":"Every adjusting entry touches:",
   "o":["two balance-sheet accounts","One P&L account and one balance-sheet account - the religion's fingerprint; rent-prepaid defers expense into an asset, accrued salary creates expense with a liability","two nominal accounts","two revenue accounts"], "a":1,
   "w":"One leg measures, the other holds. Two-BS-legs or two-P&L-legs adjustments are category errors."},
  {"q":"A Suspense A/c appearing in a trial balance means:",
   "o":["the books are certified healthy","Debits \u2260 credits somewhere and the difference was force-parked - fix the root error and zero it; suspense must never reach the statements","a new equity reserve","audit is complete"], "a":1,
   "w":"Suspense is an IOU from the ledger to arithmetic; honorable books repay it before anyone reads the statements."}],
"ac3": [
  {"q":"ShopKart FY25: COGS = Opening 41.7 + Purchases 205.0 - Closing 44.2 = \u20B9198.8L. If closing stock had been OVERSTATED by \u20B95L:",
   "o":["COGS falls to \u20B9193.8L honest","COGS falls \u20B95L and profit INFLATES by the same \u20B95L - the identity turns inventory fiction into instant PBT; closing-stock overstatement is the oldest profit factory in commerce","only the balance sheet is affected","purchases rise \u20B95L"], "a":1,
   "w":"The \u20B95L flows straight to PBT - why auditors exist, and why AC10 forensics counts boxes."},
  {"q":"EBITDA (\u20B926.0L) sits between gross profit and EBIT because it:",
   "o":["includes depreciation, excludes interest","Strips out D&A, financing, and tax choices - measuring the cash-earning power of OPERATIONS alone; the banker's favorite rung for EV/EBITDA multiples and loan covenants","equals cash flow from operations","is the tax base"], "a":1,
   "w":"(a) is EBIT's definition in disguise; EBITDA is not CFO when working capital is hungry - AC5's lesson."},
  {"q":"ShopKart's EPS (PAT \u20B913.25L, 5,00,000 shares):",
   "o":["\u20B926.50","\u20B92.65 - PAT per claimant; dividend \u20B90.53 at 20% payout retains \u20B92.12 for next year's earnings engine (at \u20B930 market the P/E teaser is 11.3x)","\u20B96.63","\u20B913.25"], "a":1,
   "w":"Per-share literacy is the whole retail-investor game; (a) multiplied by 10 somewhere, (c) took the dividend as numerator."}],
"ac4": [
  {"q":"ShopKart FY25 closes: Reserves move from \u20B92.8L to \u20B913.4L because:",
   "o":["revenue grew","Articulation: opening RE 2.8 + PAT 13.25 - dividend 2.65 = 13.4 - the P&L pours into the balance sheet through retained earnings; the snapshot is the video's residue","capital increased","assets were revalued"], "a":1,
   "w":"Capital transactions and trading results are different doors into equity; only one of them is open at year-end."},
  {"q":"Working capital (CA 89.2 - CL 43.3 = \u20B945.9L) while PAT was \u20B913.25L. The lesson:",
   "o":["accounting error - WC should equal PAT","Profit got REINVESTED into stock, debtors and prepaids instead of idling as cash - 'profit is opinion, cash is fact' is written in working capital, which is why bankers read deltas, not headlines","creditors were overpaid","WC must be cut to match PAT"], "a":1,
   "w":"The delta column of a balance sheet IS the cash's diary; AC5 turns it into the formal statement."},
  {"q":"Buying 8-year-life store fit-outs using the recallable-any-day bank OD is:",
   "o":["smart - OD is cheaper","A funding mismatch - long assets financed on short money; the rate is cheaper but every renewal is a coin-flip; term loans or leases match tenors and kill the spiral risk","illegal","a tax optimization"], "a":1,
   "w":"The 1% you save is your fee for carrying refinancing risk all year; credit officers are paid to find exactly this in 20 seconds."}],
"ac5": [
  {"q":"ShopKart FY25's CFO is \u20B916.95L against PAT \u20B913.25L chiefly because:",
   "o":["creditors were underpaid","The \u20B96L depreciation is a non-cash charge added back, and working capital ate only \u20B94.6L of it - quality conversion (CFO/PAT \u2248 1.28) is the pulse of earnings you can bank","capital was raised","tax was deferred"], "a":1,
   "w":"(c) would land in CFF, not CFO; suppliers rose only 0.9 - the conversion hero is the non-cash add-back."},
  {"q":"Depreciation rises by \u20B910 (tax rate 25%). The three-statement walk gives:",
   "o":["PAT -10, CFO -10, cash -10","PAT -7.5, CFO +2.5, BS balances with block -10 / cash +2.5 / RE -7.5 - depreciation is an inside charge: only the tax shield moves in cash","PAT -7.5, CFO -7.5, BS balances","nothing - depreciation is non-cash"], "a":1,
   "w":"The nuke is the standard interview gate because it forces ALL the plumbing at once."},
  {"q":"Persistent CFO < PAT with ever-growing receivables most strongly suggests:",
   "o":["prudent banking","Toilet-paper profits - earnings that live in warehouses and invoices rather than the drawer; quality-of-earnings red flag number one (AC10's opening casefile)","excellent collections","rapid healthy growth"], "a":1,
   "w":"The pulse test: CFO/PAT < 1 persistently = paper profits; Satyam veterans nod grimly."}],
"ac6": [
  {"q":"\u20B91,200 hamper contract (\u20B9900 hamper + \u20B9300 twelve-month service, allocated from standalone prices). January revenue recognized:",
   "o":["\u20B91,200 - cash is in the drawer","\u20B9925 - performance drives recognition: hamper delivered (900, point-in-time) + one month of service (300/12 = 25); the rest sits as a contract liability until served","\u20B9900","\u20B91,000"], "a":1,
   "w":"Cash-vs-earned is the loudest confusion in accounting; the five-step machine settles it permanently."},
  {"q":"ShopKart's aging ladder (26 @1%, 7 @4%, 5 @12%) sets a provision of:",
   "o":["\u20B938L","\u20B91.14L - expected credit loss is portfolio honesty: 0.26 + 0.28 + 0.60, debtors shown net \u20B936.86L, and next year the provision moves only by its delta","\u20B90.60L","\u20B93.80L"], "a":1,
   "w":"(a) is gross, (c) is only the >60-day bucket; ECL is an estimate of the whole portfolio's shadow."},
  {"q":"Vendor terms: 2/10-net-30. Paying on day 30 instead of availing the discount implies an annualized cost of:",
   "o":["2%","37.2% - (2/98) x (365/20): two percent for twenty days of credit is the most expensive politeness in business; taking the discount beats every bank overdraft on the street","24%","12%"], "a":1,
   "w":"(c) is the naive x12 linearization; compute on the 98 you actually stretch - the base rewards the credit extended."}],
"ac7": [
  {"q":"ShopKart FY25's closing stock (Opening 41.7 + Purchases 205.0 - COGS 198.8):",
   "o":["\u20B9236.8L","\u20B944.2L - the tripod identity; auditors corner any fake corner because the other two are checked by independent roads (count + registers)","\u20B941.7L","\u20B96.2L"], "a":1,
   "w":"Three-corner recover mastery is the auditor reflex this course hammers."},
  {"q":"In the rising-price basket (70\u219273\u219276), FIFO versus WAC reports:",
   "o":["identical profit","HIGHER pretax profit under FIFO (\u20B9337.50 in the 200-unit basket) - oldest cheapest costs hit COGS first, leaving the recent pricey stock on a healthy BS; the price: more tax today","lower stock value under FIFO","lower profit under FIFO always"], "a":1,
   "w":"Valuation is not physics: identical boxes, different accounts. Policy choice shapes earnings texture."},
  {"q":"NRV markdown on the \u20B9800-cost hoodie (expected sale \u20B9750, \u20B960 selling cost):",
   "o":["\u20B950","\u20B9110 - NRV = 750 - 60 = 690, and prudence cuts at the lower of cost vs NRV, per class, never reversing upward until sold","\u20B9140","\u20B90 - wait for the sale"], "a":1,
   "w":"(a) forgot selling costs; (c) treated NRV as the price tag unnetted."}],
"ac8": [
  {"q":"Van \u20B915L, salvage \u20B91L, 8-year SLM: annual charge and net block after year 2:",
   "o":["\u20B91.875L, \u20B911.25L","\u20B91.75L and \u20B911.5L - (15-1)/8 straight-lined; two years of matching = 3.5 consumed; accumulation never touches the van's cost history (gross 15 stays)","\u20B92.5L, \u20B910L","\u20B91.75L, \u20B912.25L"], "a":1,
   "w":"(a) forgot salvage; (c) invented \u20B92L salvage - read the problem's numbers, not the answer's style."},
  {"q":"A routine van service (\u20B918,000) versus an engine overhaul that adds three life-years (\u20B91.6L):",
   "o":["both expenses","Service = expense (restore), overhaul = capitalize (extend beyond original condition) - the battlefield gate is FUTURE BENEFIT, verified with before/after capacity evidence, not with invoices","both capitalize","split each 50:50"], "a":1,
   "w":"Accountants who capitalize services to flatter EBITDA meet auditors with capacity meters; this exact gate is where margin-games die."},
  {"q":"'Depreciation is a source of funds' is:",
   "o":["correct - CFO adds it back","Wrong - it is an ALLOCATION of a past outflow (non-cash); the only cash it ever moves is the tax shield (dep x rate); the add-back says the money never left this year, not that any arrived","correct only for profitable firms","correct only in year 1"], "a":1,
   "w":"Language precision here separates treasury thinkers from exam tourists; the guillotine drops kindly on the prepared."}],
"ac9": [
  {"q":"A customer lawsuit with probable unfavorable outcome estimated at \u20B91.2L should be:",
   "o":["disclosed in notes only","BOOKED as a provision - present obligation + probable + reliably estimable = Dr P&L, Cr Provision (possible-only claims stay as contingent disclosures; inflows stay silent until virtually certain)","ignored until judgement","paid immediately"], "a":1,
   "w":"Probable + measurable is the booking trigger; the triad exists precisely to stop 'we will see' accounting."},
  {"q":"ShopKart issues 10,000 shares at \u20B940 (par \u20B910). The \u20B930 premium per share lands in:",
   "o":["the P&L as other income","Securities Premium within EQUITY - over-par consideration is capital-claim money, never income; it strengthens net worth without a single rupee of operations","a contingent reserve","retained earnings"], "a":1,
   "w":"Premiums are equity's applause section; booking them as profit is an old scam red-flagged in every fraud syllabus."},
  {"q":"Buying back 10% of shares with \u20B915L cash while PAT is unchanged leaves EPS:",
   "o":["unchanged - cash left","~11% HIGHER purely arithmetically (PAT spread over 10% fewer shares) - the accretion illusion: beautiful per-share optics with zero operational improvement; dividends never change per-share arithmetic at all","lower - buyback cost money","lower - fewer earners"], "a":1,
   "w":"Per-share metrics react to denominators as well as numerators; ask 'WHAT operated better?' before applauding any optics."}],
"ac10": [
  {"q":"Phase 1's TB sprint taught, at the cash-level check, that:",
   "o":["a balanced TB proves the books complete","The customer advance (\u20B940) was double-counted into cash - cash lines reconcile independently first (597, not 637); TB 'balance' can coexist with mis-postings; arithmetic checks certify columns, not completeness","discounts don't affect cash","typed totals are trustworthy"], "a":1,
   "w":"Double-entry balances by construction; fraud and fumbles both dress inside that clause. Bank reconciliation is respect."},
  {"q":"ShopKart FY25's FY-pack shows CFO/PAT of 1.28 with FCF \u20B913.67L. The board's honest read:",
   "o":["profits are paper","Earnings convert to cash at a healthy rate - non-cash dep added back while WC hunger stayed modest - and the \u20B92.65L dividend is a fraction of FCF; growth headroom intact, no financing gymnastics","unrelated numbers","sell the stock immediately"], "a":1,
   "w":"Quality = cash-confirming profits. When conversion dips below 1 for LONG, the flags start flying, not before."},
  {"q":"The single question that most reliably separates quality earnings from costume jewelry:",
   "o":["How big is marketing spend?","Show me CFO versus PAT across five years, with the receivable and stock deltas - conversion reveals what rungs dress up; the deltas name exactly WHERE the costume sits","Who is the auditor?","What is the P/E?"], "a":1,
   "w":"Every other flag eventually confesses in conversion; five years leaves no costume unworn."}],
"cf1": [
  {"q":"ShopKart's ROCE is 29.7% against a 12.6% WACC on Rs 67.4L capital employed. The firm:",
   "o":["breaks even","creates ~Rs 11.5L of value - the +17.1% spread x capital = profit above what the same risk earns elsewhere; retention at these spreads is compounding","destroys value - WACC is high","creates Rs 20L of value"], "a":1,
   "w":"Spread x capital is the EVA; confusing the cost of capital with a verdict is the classic error."},
  {"q":"A rights issue, a dividend, and a store closure walk in. Their drawers:",
   "o":["investment, payout, financing","financing, payout, investment (a DIS-investment still files under investment) - every headline is these three verbs in costume","payout, financing, investment","payout, investment, financing"], "a":1,
   "w":"Ninety percent of corporate news sorts this fast once the drawers are installed."},
  {"q":"'Maximize profit' fails as a corporate goal because it ignores:",
   "o":["marketing","timing, risk, and capital consumed - Rs 10L in year 5 is not Rs 10L today, 2x profit at 2x ruin-odds is arson, and profit never asks what the capital cost","branding","employees"], "a":1,
   "w":"Three failures; interviews ask for them verbatim, in any costume."}],
"cf2": [
  {"q":"ShopKart's CAPM build (rf 7%, beta 1.1, ERP 6%) prices equity at:",
   "o":["12.1%","13.6% - risk-free anchor plus beta-titled market premium; equity stands last on the claims staircase and invoices accordingly","9.1%","8.2%"], "a":1,
   "w":"7 + 6.6; option (a) is debt, option (c) is debt-after-shield - three rungs, three prices."},
  {"q":"After-tax cost of ShopKart's debt (12.1% gross, 25.17% tax):",
   "o":["12.1%","~9.1% - interest cuts taxable profit, so the exchequer co-pays about a quarter of every rupee of interest; the shield is real only where profits exist to shield","15.2%","3.0%"], "a":1,
   "w":"Shield = rate x tax; memorize it as 'the government co-signs a quarter of the coupon'."},
  {"q":"The canon WACC (76.9% equity at 13.6%, 23.1% debt at 9.1%):",
   "o":["10.5%","~12.6% - the hurdle every NPV, EVA and DCF ahead will bow to; a 130bp error here rewrites crores of valuation downstream","14.8%","16.4%"], "a":1,
   "w":"Weighted by how the firm is actually funded; (a) reversed the weights, (c) used the beta-1.3 shadow cell."}],
"cf3": [
  {"q":"MM-with-taxes prices leverage's gift as:",
   "o":["VL = VU - tD","VL = VU + t x D - Rs 40L debt at 25% tax adds Rs 10L of shield value; equity holders capture it, which is why cheap-looking debt seduces until distress costs crash the calc","VL = VU (structure never matters)","VL = VU + D"], "a":1,
   "w":"(c) is the tax-free MM world; (a) flips the sign and bankrupts the algebra."},
  {"q":"The correct real-world funding sequence is:",
   "o":["equity, then debt, then accruals","internal accruals, then debt, then equity - accruals carry no signal or banker; debt keeps control and banks the shield; outside equity pays dilution PLUS the adverse-selection whisper (ShopKart's RE then loan path, exact)","debt, then equity, then accruals","equity only when risky"], "a":1,
   "w":"Sequence logic survives every cycle; exceptions need documented reasons (distress, mega-options)."},
  {"q":"A promoter pledging 70% of personal holdings should make an analyst:",
   "o":["bullish - skin in the game","add a spirals test to the checklist: price fall, margin call, forced sale, deeper fall; pledging is leverage ON TOP of leverage, classic India midcap pathology","indifferent - it is personal","ask for collateral"], "a":1,
   "w":"(a) reads commitment where there is compulsion; the spiral is mechanical, not personal."}],
"cf4": [
  {"q":"ShopKart's DCL of 4.59 means a 10% sales dip moves PBT by:",
   "o":["-10%","~-45.9% - the two gears multiply: every sales rupee contributes 29 paise, fixed costs pretend not to notice; 17.7 falls to ~Rs 9.58L","-4.59%","+45.9%"], "a":1,
   "w":"(a) forgets the gears exist; (c) confuses the gear with the result."},
  {"q":"Break-even sales (ex-interest) with fixed Rs 61.2L and CM 29%:",
   "o":["Rs 177L","~Rs 211L - the zero-EBIT watermark; margin of safety (280-211)/280 = 24.6% is the honest headline every lender actually reads","Rs 61.2L","Rs 280L"], "a":1,
   "w":"BE = fixed / CM; options (a) and (c) divided the wrong way."},
  {"q":"The pairing rule says high-DOL industries should run:",
   "o":["high DFL - stack gears","low DFL - a fixed-cost cathedral must not also carry fixed coupons; stacking both gears is how airlines die on schedule, while low-DOL traders can carry debt safely","zero sales growth","high inventory"], "a":1,
   "w":"The entire module in one rule: choose ONE gear to worship, never both."}],
"cf5": [
  {"q":"On ex-date, a Rs 30 share paying a Rs 1 dividend opens near Rs 29 because:",
   "o":["the market hates dividends","cash left the company's drawer and entered yours - a price-drop identity, not punishment; the factory is unchanged minus Rs 1 in the till; reading it as a crash is the classic retail tell","HFTs front-ran it","dividend tax hits at open"], "a":1,
   "w":"Ex-date physics is an identity; sentiment readings of it are comedy."},
  {"q":"A firm with a Rs 55L queue of above-WACC projects and Rs 50L PAT should, by doctrine, pay:",
   "o":["50% payout","roughly zero - payout is the residual of investment policy: retain while spreads are positive, return explicitly what is not needed; retention is a claim that must keep proving itself each year","as much as peers","100% payout"], "a":1,
   "w":"Residual doctrine; (c) is clientele cosplay, (a) is a costume number."},
  {"q":"A 1:1 bonus issue makes shareholders:",
   "o":["twice as rich","exactly as rich - shares double, price halves, reserves re-label as capital with net worth untouched; par-value cosmetics plus liquidity psychology, never value creation","twice as poor","half as rich"], "a":1,
   "w":"Cosmetics legal, mood-lit, value-free; value comes only from spreads x capital."}],
"cf6": [
  {"q":"ShopKart's CCC ~74 days priced at a 12% OD implies cutting 10 days saves yearly:",
   "o":["Rs 0.065L","~Rs 0.65L - each frozen day costs daily-COGS x 12% run-rate, forever; ten saved days is the cheapest PAT on Earth: no customer asked, no sale risked, pure clock-speed","Rs 6.5L","Rs 0.0065L"], "a":1,
   "w":"Clock-speed is a free return stream; (c) misplaced the decimal by one glorious zero."},
  {"q":"The net-benefit template for relaxing credit terms MUST include:",
   "o":["sales growth only","margin gained - incremental funding cost - expected defaults, all three or don't pilot (canon: +6.50 - 0.44 - 0.34 = +Rs 5.7L); single-line sales-vibes pilots rot receivables quietly","competitor behavior","the festive season"], "a":1,
   "w":"Three rows or no pilot; defaults swing the verdict faster than rates do."},
  {"q":"The square-root law EOQ (D=12,000, S=Rs 800, H=Rs 20) lands at:",
   "o":["346 units","980 units - root of (2 x 12,000 x 800 / 20) = root of 960,000; the cost curve is mercifully flat around it, so festivals, perishables and MOQs are judgment-skin over the EOQ skeleton","1,386 units","707 units"], "a":1,
   "w":"(a) halved demand, (c) forgot the divide-by-H, (d) changed the inputs."}],
"cf7": [
  {"q":"ShopKart's DCF pipeline ends: EV Rs 194L - net debt Rs 7L, over 5L shares, per share:",
   "o":["Rs 30.0","~Rs 37.4 - discount the unlevered cash at 12.6%, add the Gordon terminal grown at 3%, strip the debt, divide by claimants; vs the Rs 30 ticker the margin of safety opens IF inputs survive cross-examination","Rs 19.4","Rs 44.2"], "a":1,
   "w":"(a) confused market price with value; (c) is one year's PV, not the pipeline."},
  {"q":"The single most dangerous line in any DCF is:",
   "o":["year-1 revenue","terminal value - 67% of EV here lived inside (WACC - g); demand g at or under GDP, TV/EV under ~75%, and the reinvestment math behind the growth; most valuation crimes are committed in the hereafter","depreciation","WACC itself"], "a":1,
   "w":"The hereafter is where decks go to lie; everything else is small print."},
  {"q":"Choosing between P/E and EV/EBITDA to compare two differently-levered retailers:",
   "o":["P/E - simpler","EV/EBITDA - EV repacks debt into the price and EBITDA strips financing and D&A timing, neutralizing the leverage difference; P/E would crown the high-debt firm 'cheap' because interest ate its visible earnings","EV/Sales - always","P/B - niftiest"], "a":1,
   "w":"Same stores deserve the same clean lens; simplicity that hides leverage is not a feature."}],
"cf8": [
  {"q":"Project A (capex 40, FCFF 12 x 5y, WACC 12.6%) shows NPV +Rs 2.6L, IRR ~15.2%:",
   "o":["reject - margin too thin","accept with monitoring - positive spread is positive value; thinness is a WATCH-LIST instruction (CCC creep, ramp pace), not a rejection reason; IRR 250bp above hurdle covers honest forecast error","accept and forget","reject - IRR < 20%"], "a":1,
   "w":"(a) outsources judgment to a vibe; (c) outsources it to amnesia; (b) is doctrine plus discipline."},
  {"q":"The billboard 'it earns 12.5%, basically at hurdle' is killed by:",
   "o":["billboard ugliness","sub-WACC is sub-WACC - negative spread destroys value at any closeness; equity pays 13.6% for its risk and the deck wants 12.5%; close-romanticism fills CFO desks with compounding regrets","inflation","brand equity wins"], "a":1,
   "w":"Value is spread arithmetic, not grade-school rounding; sub-hurdle is destruction in a tuxedo."},
  {"q":"Funding the expansion with the recallable-any-day OD instead of a term loan would:",
   "o":["save 1% - do it","commit the funding-mismatch felony: 8-year assets on 8-day money, every renewal a coin-flip THROUGH the trough (lenders flee exactly in recessions); match tenor, sleep, then compare rates","be illegal","be tax-efficient"], "a":1,
   "w":"Mismatch first, rate second, always in that order; (a) is how the story starts."}],
"bf1": [
  {"q":"Most harmful money decisions are signed by:",
   "o":["System 2 - too much analysis","System 1 - fast pattern-matching hijacked by a flashing screen; you cannot uninstall it, only refuse it the wheel at decision time (checklists exist to be the bouncer)","bad luck","the demat app"], "a":1,
   "w":"Blame the driver, not the weather; (c) is System 1's favorite alibi."},
  {"q":"Graham's Mr. Market parable teaches that daily price quotes are:",
   "o":["orders","offers from a moody partner - his mood is his problem; your valuation band is your answer; transact only when the quote serves YOUR arithmetic; margin of safety is a doorbell, not a panic alarm","consensus truth","insider signals"], "a":1,
   "w":"(a) and (c) are the retail reflex this course retires permanently."},
  {"q":"Heuristics become harmful specifically in markets because markets supply:",
   "o":["too much data","noisy signals plus delayed feedback plus adversarial counterparties - a compression genius trained on survival fog meets a domain where noise pays randomly; the more intuitive a trade feels, the more audit it deserves","low fees","high returns"], "a":1,
   "w":"Volume of data is not quality of feedback; fog plus flashing lights equals tuition."}],
"bf2": [
  {"q":"The SEBI F&O finding (9-in-10 retail losers, average loss ~Rs 1.1L) is best explained by:",
   "o":["retail stupidity","overconfidence's three faces meeting leverage plus noise: better-than-average entry, precision-fake targets, control illusions - multiplied by churn costs; firmware-correct humans, firmware-hostile arena","broker fraud everywhere","regulation failure"], "a":1,
   "w":"Blame architecture, offer process; contempt and conspiracy both skip the homework."},
  {"q":"A stock 'cheap at Rs 640 because 52-week-high Rs 1,200' is enslaved to:",
   "o":["value investing","an anchor - the high is calendar-written, not value-written; intrinsic says what it says regardless of old quotes; the same bug, weaponized, is the Rs 999 MRP making Rs 599 feel donated","mean reversion law","a quality signal"], "a":1,
   "w":"Reversion happens sometimes, anchoring happens always; the calendar is not an analyst."},
  {"q":"The only cure for hindsight bias that survives memory is:",
   "o":["more experience","the timestamped journal - thesis, numbers, expected range, kill-switch, all inked BEFORE acting; memory redraws charts, ink doesn't, and the journal doubles as your honest hit-rate ledger","meditation","mentor groups"], "a":1,
   "w":"Experience without timestamps becomes older bias, not wiser judgment."}],
"bf3": [
  {"q":"Refusing the +110/-100 coin flip while hugging a -38% loser 'to breakeven' is:",
   "o":["rational prudence","the reflection effect - risk-averse in the gains frame, risk-SEEKING in the losses frame, both pivoted on the buy-price reference; loss aversion (~2.25x) is the same engine in both costumes; pros pre-commit because intuition flips at zero","proof markets are rigged","a diversification error"], "a":1,
   "w":"One bug, two costumes, one reference point; rules beat reflexes at zero-crossings."},
  {"q":"A '1% of AUM fee' pitch must be reframed before judging because:",
   "o":["percentages are lies","frames change verdicts on identical facts - the absolute math (Rs 25,000/yr on Rs 25L, compounding to lakhs over decades) plus the gain/loss costume check is the 90-second anti-marketing protocol; compute the invoice, not the costume","SEBI bans it","agents overcharge"], "a":1,
   "w":"Frames are legal anesthesia; absolutes and re-labeling are the surgery-light."},
  {"q":"The sunk-cost protocol's deciding question is:",
   "o":["how much did I pay?","would I buy it TODAY at today's price with today's information? - yes: hold or add by thesis; no: exit and bank the salvage; the receipt is history's invoice, not tomorrow's asset; every breakeven-exit plan is a shrine, not a strategy","what does the group think?","did it beat the Nifty?"], "a":1,
   "w":"(a) is the shrine, (c) is availability wearing a social costume."}],
"bf4": [
  {"q":"Drawdown arithmetic: a 2x-leveraged book taking a market -30% leaves equity needing, just to recover:",
   "o":["+30%","+150% - leverage doubled the wound to -60% on equity; recovery = 60/40; this computation, done BEFORE trading, converts risk appetite from a vibe into a sizing law (f/(1-f) never forgives)","+60%","+130%"], "a":1,
   "w":"Recovery is f/(1-f) on the SURVIVING base; leverage edits the base, brutally."},
  {"q":"The five-stage anatomy's euphoria fingerprints include:",
   "o":["insiders buying, media silent","mutated valuation language (eyeballs/paradigm), retail flooding with grey-market sparkle, leverage joining the guests, and lock-in expiries sitting on the calendar like scheduled stage-4 alarms; the costume changes every decade, the anatomy doesn't","CFO-led prudence","low retail interest"], "a":1,
   "w":"(a) and (c) are stage-4/5 weather; learn to read stage-3 skies before flying investments in them."},
  {"q":"Anomalies worth respecting share which trait:",
   "o":["biggest backtest fit","a stubborn BEHAVIORAL engine underneath (career-cover herding, loser-affection, patience scarcity) plus exploitation that stays painful - because pure screen-arbitrage dies by crowding, and subscriptions to its corpse get sold to you","formula complexity","regulator endorsement"], "a":1,
   "w":"Mechanisms outlive spreadsheets; the rest is marketing with Greek letters."}],
"bf5": [
  {"q":"The 7-gate checklist works primarily because it:",
   "o":["improves stock picks magically","removes negotiation between System 1 and the moment - each gate targets a named bias (base rate vs availability, disconfirm vs confirmation, journal vs hindsight), and any two blank means NO TRADE; laminated cards out-argue adrenaline","impresses employers","boosts IQ"], "a":1,
   "w":"Gates are bouncers, not oracles; pick quality is research, behavior quality is the card."},
  {"q":"SIP-as-commitment works (beyond averaging) because it:",
   "o":["times the market better","makes the good behavior AUTOMATIC and the sabotage effortful - purchase happens with no mood vote, volatility becomes a discount calendar (125 units at NAV 40 vs 83 at 60), and pausing becomes a written, reviewable act instead of a stage-3 reflex","guarantees returns","insures the NAV"], "a":1,
   "w":"Systems outperform moods; averaging is the dividend, automation is the factory."},
  {"q":"Position-size law's deepest function is:",
   "o":["maximizing CAGR","buying the right to be wrong repeatedly without dying - account-level caps (5% stock, 20% sector, sealed explore sleeve, leverage at or under 1.2x) survive every other bias failing at once; amputation math (-50 needs +100) can't be outsmarted, only sized around","SEBI compliance only","picking winners"], "a":1,
   "w":"Courage is a mood; caps are concrete; concrete outlasts mood in every drawdown on record."}],
"bf6": [
  {"q":"ProfitPrem's ~Rs 1.9L tuition on a churned Rs 6L year decomposes mostly into:",
   "o":["bad luck and slippage","already-named biases priced individually - herding into pops, house-money F&O, sunk-cost averaging, mood-paused SIPs - each with an invoice AND a gate that would have blocked it; 'unlucky' fails the receipt test when the mechanism is this legible","market manipulation","exchange outages"], "a":1,
   "w":"Legibility is the course's point: mechanisms first, receipts second, excuses never."},
  {"q":"The IPS annual-amendment + 30-day-cool rule exists because:",
   "o":["paperwork is fun","rules drafted in stage-1 calm get lobbied by stage-3 adrenaline - a constitution must refuse same-week amendments; flexibility is how discipline dies in fancy dress, so amendments wait their calendar while stays hold their line","SEBI requires it","tax planning"], "a":1,
   "w":"Constitutions out-argue adrenaline precisely because they arrived earlier, in writing."},
  {"q":"The best answer-spine for 'What is your biggest bias?':",
   "o":["'I read a lot, mostly cured'","name, invoice, gate - 'availability cost me a paused SIP (~Rs 38k opportunity); 24h cooling plus base-rate lookup now gate every urge' - self-awareness with RECEIPTS and MECHANISM beats every confident shrug in interview history","'I have none left'","'I meditate'"], "a":1,
   "w":"(a) and (c) are overconfidence's encore; receipts are graduation."}],
"dv1": [
  {"q":"The defining split between options and the other three families is:",
   "o":["options are cheaper","options sell a RIGHT (capped loss = premium) while forwards/futures/swaps impose OBLIGATION on both sides - asymmetry is the product, premium is its price, and this single property is why options exist","options are safer for sellers","options have no expiry"], "a":1,
   "w":"(c) is backwards: sellers carry the unbounded side for the premium."},
  {"q":"Nifty at 25,000, lot 75, margin 10%: the notional controlled per lot is:",
   "o":["Rs 1.87L","Rs 18.75L - with Rs 1.875L posted; a -0.8% index day debits Rs 15,000 = 8% of that margin tonight; leverage is the reason MTM discipline exists and why the 9-in-10 statistic grows","Rs 750","Rs 25,000"], "a":1,
   "w":"(a) is the margin, not the notional; the account moved 10x the index's day."},
  {"q":"A clearing corporation demands daily mark-to-market primarily to:",
   "o":["increase fees","stop losses compounding silently into one expiry-day default bomb - credit risk becomes small daily survivable settlements; the trader-broker-CCP chain holds only if nobody carries a season of someone else's weather","reward day traders","improve liquidity"], "a":1,
   "w":"Risk plumbing beats risk prayer; fees are a side dish."}],
"dv2": [
  {"q":"October wheat at Rs 2,650 vs July spot Rs 2,600 (r 10%, T 0.25) mainly reflects:",
   "o":["traders expecting drought","the cost-of-carry invoice: 2,600 x 1.025 = ~Rs 2,665, net of convenience ~Rs 2,650 - futures price financing and storage, and arbitrage enforces it; expectations that fight the invoice get warehouse-slammed by janitors","government fixing","festival sentiment"], "a":1,
   "w":"Tales move the slope gradient at best; the level is an invoice."},
  {"q":"Daily MTM on a -250-point adverse close (25,000 contract, lot 75) debits:",
   "o":["Rs 250","Rs 18,750 tonight from your margin balance - MTM is not a monthly statement; positions must be sized for the maintenance-survival path, not the initial-debit euphoria","nothing until expiry","Rs 6,250"], "a":1,
   "w":"(c) is the forward's disease; the future cured it with nightly surgery."},
  {"q":"Basis = -50 (spot 2,600, futures 2,650) describes, by expiry:",
   "o":["divergence to -100","contango shrinking to ~0 - carry amortizes daily, futures must converge into spot plus/minus delivery friction; every hedge leans on this law, and 'hold till recovery' meets the same law without mercy","backwardation forming","basis is random"], "a":1,
   "w":"Convergence is law, not hope; it prints like clockwork every expiry."}],
"dv3": [
  {"q":"ShopKart's wheat hedge (long 500q at Rs 2,650, October spot Rs 2,850) ends with effective cost:",
   "o":["Rs 2,600/q - July spot","Rs 2,650/q - the futures ENTRY: the Rs 1.0L futures gain offsets the Rs 1.25L spot rise (14.25L - 1.00L = 13.25L); you lock the carry invoice, and the crash-side rerun pays the identical 13.25L - weather deleted in BOTH directions","Rs 2,850/q - hedging was useless","Rs 2,750/q average"], "a":1,
   "w":"The hedge is not a bet you win; it is a weather you stop having."},
  {"q":"Hedging replaces direction risk with:",
   "o":["zero risk","basis risk - the spot-minus-futures wiggle at lift (grade, location, timing): small, survivable, honest weather vs the naked thunderstorm it replaced; 'perfect hedge' claims are sales decks, not risk memos","opportunity risk only","counterparty risk only"], "a":1,
   "w":"Insurance has a deductible called basis; the honest quote includes it."},
  {"q":"A desk shows +Rs 3L 'hedge profit' on crude futures. The CFO's first move:",
   "o":["bonus the desk","demand the mapping: every contract to its commercial exposure line with quantities and dates - hedge gains without a commercial mother are trading profits in a costume; excitement exceeding loss-relief is speculation","double the program","ignore profits"], "a":1,
   "w":"Hedge books never orphan P&L; celebrate symmetry, investigate orphans."}],
"dv4": [
  {"q":"Buying the 25,000 call at Rs 180 (lot 75) sets your maximum loss at:",
   "o":["unlimited below breakeven","Rs 13,500 - the premium, capped, whatever the crash; that is what the ticket bought: asymmetry - but BE 25,180 means being 'right' below that level still invoices tuition","Rs 18.75L notional","Rs 18,000"], "a":1,
   "w":"(c) confused notional with risk; unbounded losses live on the writer's side."},
  {"q":"A spot-25,000 board quoting 24,800C at Rs 260 decomposes as:",
   "o":["Rs 260 time value","Rs 200 intrinsic + Rs 60 time value - ITM carries real deliverable worth plus clock-juice; ATM options hold ~pure time value (max uncertainty peak), OTM are pure probability tickets decaying toward their probable funeral","Rs 200 time + Rs 60 intrinsic","Rs 260 intrinsic"], "a":1,
   "w":"Decomposition is instantaneous: spot minus K, remainder is the clock."},
  {"q":"Writing (selling) naked options is structurally dangerous because:",
   "o":["premium is too small","income is capped at premium while losses run unbounded (call) or to strike x lot (put) - you are the INSURER: one gap event against an under-reserved writer is how the F&O obituary column gets its weekly material","buyers always win","theta turns negative"], "a":1,
   "w":"Sell insurance only with insurer-grade reserves."}],
"dv5": [
  {"q":"The bull call spread (buy 25,000C @180, sell 25,400C @90, lot 75) hands you:",
   "o":["unlimited upside, max loss Rs 26,250","cost Rs 6,750, max profit Rs 23,250, BE 25,090, risk/reward ~1:3.4 - you sold the tail you didn't believe to fund the move you did; defined risk BOTH directions makes it the desk's favorite straitjacket","free insurance","a delta-zero book"], "a":1,
   "w":"(a) is the fantasy version casinos also sell; wings cap both."},
  {"q":"A covered call faithfully rented out does NOT:",
   "o":["earn premium tonight","protect against crashes - the Rs 1.5 rent cushions Rs 1.5 of a Rs 9 fall; it is a sleepy-tape yield tool that caps your thunder (called at 33 while it prints 36); the crash-bodyguard is the protective put, a different instrument for a different promise","cap the rally","reduce basis"], "a":1,
   "w":"Rent is not armor; armor is priced separately and behaves like insurance should."},
  {"q":"Buying an event straddle at IV 38% usually dies even when the event lands because:",
   "o":["events are rigged","IV crush: the scream was priced into the premium; post-event uncertainty collapses, vega evicts the loft, and a +1.8% spot move under a halved IV is a losing ticket - price implied-vs-realized history BEFORE paying for explosions","straddles cannot profit","theta stops at events"], "a":1,
   "w":"The bill for uncertainty arrives BEFORE the answer; the answer refunds nothing."}],
"dv6": [
  {"q":"Put-call parity (S=100, K=100, r=10%, T=1y, C=Rs 12) prices the fair put at:",
   "o":["Rs 12.00","Rs 2.91 - C - P = S - PV(K): 12 - P = 100 - 90.91; ATM calls legitimately cost MORE than puts when rates are positive - the weld, not the mood, sets the family prices","Rs 9.09","Rs 4.55"], "a":1,
   "w":"(a) assumes a symmetry rates do not permit; (c) forgot the call's Rs 12."},
  {"q":"The one-step binomial prices the K=100 call at Rs 13.64 WITHOUT the real up-probability because:",
   "o":["probability is illegal","the replicating clone (stock + bond) has identical payoffs by construction - arbitrage forces prices to match, so only the RANGE and rates matter; sentiment cancels, the deepest insight in modern pricing (grow the tree tall and BSM blooms)","gamma removes it","the CCP fixes it"], "a":1,
   "w":"Replication is the courtroom; probability forecasts are spectators."},
  {"q":"Your straddle loses Rs 11,550/lot despite the event landing 'as expected' chiefly because:",
   "o":["theta was quiet","vega collected the bill: IV 32 to 18 = 14 vol-points x vega 11 = 154 pts of scheduled evaporation - the event's uncertainty WAS the asset you held, and it expired at the announcement; price implied-vs-realized history before renting explosions","delta betrayed you","rho spiked"], "a":1,
   "w":"The Greeks don't betray; invoices simply arrive at the named hour."}],
"dv7": [
  {"q":"ShopKart's pay-fixed/receive-floating swap (10.5% fixed, MIBOR+3) at MIBOR 8.5% leaves all-in cost at:",
   "o":["11.5%","10.5% - loan pays 11.5 but swap receipts (+Rs 1.0L on Rs 50L) exactly offset; the treaty converts floating risk into a fixed signed number; certainty was purchased in advance, regret both ways priced at signing","9.5%","8.5%"], "a":1,
   "w":"The loan statement shows 11.5; the treasury P&L shows 10.5; only one decides sleep."},
  {"q":"Quoting a Rs 50L swap notional as 'risk exposure' is wrong because:",
   "o":["swaps have no risk","notional is the REFERENCE size; real exposure = the mark-to-market gap (replacement cost, usually a few percent) - defended by netting, collateral, and credit review; headline-notional is media's favorite illiteracy since 2008","exposure is always Rs 50L","only buyers face risk"], "a":1,
   "w":"Exposure lives in the replacement bill, not the reference number."},
  {"q":"The CCP novation chain's deepest selling point is:",
   "o":["lower fees","your counterparty becomes a pre-funded institution (margin + default waterfall) instead of a person with a story - storm-days settle via the rulebook; bilateral chains failed in 2008, margined arenas held in 2020; keep both receipts","faster apps","tax shields"], "a":1,
   "w":"Plumbing that outlives storms is the entire derivatives story."}],
"dv8": [
  {"q":"The Phase-1 festival hedge book's total verified deliverables were:",
   "o":["speculative alpha on hindsight charts","exposure deletion with rupees: wheat Rs 1.0L saved, silver ~Rs 71.5k saved, rate-lock and FX-lock as pre-signed certainties - graded on the exposure column, every lot with a commercial mother, zero orphans; weather was the product sold OUT of the P&L","Rs 30L notional bragging rights","MTM trophies"], "a":1,
   "w":"Insurance is measured on the fire-days column; everything else is costumes."},
  {"q":"The margin stress protocol's core insight is:",
   "o":["hedges never lose","hedges die of MARGIN-CALLS long before prices - worst-path MTM funding must be pre-arranged (wheat -Rs 79.5k path vs Rs 1.0L buffer verified); night-3 memos written calmly during the bleed separate a desk from a group chat","buffers quadruple returns","maintenance margin is optional"], "a":1,
   "w":"Price risk converts to cash-flow risk the moment futures go on; fund the conversion."},
  {"q":"The board memo's spine sentence is:",
   "o":["markets humble everyone","'We stopped having weather - that is a deliverable': savings are insurance outcomes, worst-cases were pre-signed, MTM funding verified unused, kill-criteria unreached; alpha claims belong to a different ledger, banned by policy","the desk beats CNBC","basis is destiny"], "a":1,
   "w":"One sentence that makes calm seasons defensible and storm seasons survivable."}],
"fa1": [
  {"q":"The lethal order reads auditor, notes, MD&A, statements before ratios because:",
   "o":["auditors pay better","statements are management's OUTPUT and their factory comes first - audit exceptions tell you which lines to recompute, policy pages which trends are spliced, related-party pages which 'profits' are family arrangements; ratio-first reading prices costumes before checking bodies","ratios are hard","SEBI requires it"], "a":1,
   "w":"Factory first, claims second, compression last; that's the entire module."},
  {"q":"A statutory auditor resigning mid-tenure makes a professional analyst:",
   "o":["buy the dip","treat it as the loudest alarm in the Indian toolkit - Satyam-legacy markets re-rate on the resignation letter weeks before results; stance = no-position until the reason reconciles with cash-and-records; ask the audit committee first, chart later","wait for results day","upgrade only if big-4"], "a":1,
   "w":"Resignation letters age into headlines; by results day the discount is already priced."},
  {"q":"'Depreciation life for vehicles rewritten 8 to 12 years' signals:",
   "o":["engineering insight","a policy makeup that halves the annual charge and lifts PBT cosmetically (~Rs 0.58L per Rs 15L van) - legitimate only with capacity evidence; without it, life-estimate machinery is weaponized to manufacture margin expansion the trucks never delivered","tax mastery","boring compliance"], "a":1,
   "w":"Lives are estimates with receipts attached; demand the receipts or discount the profit."}],
"fa2": [
  {"q":"ShopKart FY24-25 indices (Revenue 116.7, GP 109.1, Opex 115, EBITDA 98.5) diagnose:",
   "o":["superb operating leverage","growth WITHOUT operating leverage - opex out-ran gross profit while GM slipped 2pp, so EBITDA fell despite +16.7% revenue; a strategic verdict (new-store cohorts ramping on a clock) with one deadline question attached","data error","seasonality"], "a":1,
   "w":"Indices name diseases; names route to the correct doctor (procurement + cohort-ramp here)."},
  {"q":"The margin walk converts 'PAT fell Rs 1.1L' into:",
   "o":["despair","assigned causality: +volume - GM slippage - opex ramp + financing deltas, each rupee-quantified with an owner and a clock - the bridge turns a headline into a discussion and headlines into decisions","a pie chart","a restatement"], "a":1,
   "w":"Bridges are the difference between analyzing and narrating."},
  {"q":"Comparing an own-property retailer with a rent-heavy one on raw EBITDA margins first requires:",
   "o":["more decimals","normalization - impute market rent into the own-property books (or strip lease costs both sides) so opex architectures match; without homogenizing, the gap is a financing disguise dressed as operating genius","sector-average WACC","DuPont first"], "a":1,
   "w":"Compare architectures, then margins; the reverse order is a costume party."}],
"fa3": [
  {"q":"ShopKart's current ratio 2.06 and quick ratio 1.00 together say:",
   "o":["liquidity is fake","real but inventory-dependent - the shelf-full bucket holds while stock converts honestly (81-day CCC, shrinkage 0.55%), but strip the shelves and cover is exactly 1; watch the CCC clock and GMROI, not just the prettier gauge","both must rise","banks panic at 2.06"], "a":1,
   "w":"Depopulate the shelf and the prettier number confesses its makeup case."},
  {"q":"Net-debt/EBITDA at ShopKart (19-12)/26 reads:",
   "o":["0.73","0.27 years of EBITDA - lenders can be repaid from ~3 months of operations; above ~3x banks sweat, above ~5x they bring committees; 0.27x with coverage 8.7x = deliberate headroom paid off in ratio form","gearing 23% exactly","below zero"], "a":1,
   "w":"The covenant unit is payback-years; quote it in the unit the committee dreams in."},
  {"q":"Year-end supplier-paydown + January reload distorts the current ratio because:",
   "o":["payables are evil","ratios photograph a single date - a snapshot engineered by pre-dated actions; the antidote doctrine: slopes over snapshots, quarterly averages over year-ends, and decode any collection blitz at its priced cost before applauding liquidity","CR ignores cash","auditors allow it"], "a":1,
   "w":"Time-series cynicism is the analyst's sunscreen: apply quarterly or burn."}],
"fa4": [
  {"q":"ShopKart's DuPont (4.73% x 2.69 x 1.79 ~ 22.8%) identifies it chiefly as:",
   "o":["a margin machine","a TURNOVER machine - thin margins sprinting at 2.69 asset turns with civilized leverage; the applause belongs to operational velocity (shelves spinning weekly), which is why spoilage, shrinkage and labor discipline own the risk register","a leverage story","a tax story"], "a":1,
   "w":"(c) is the dangerous-uncle species with bigger gears; (a) wears luxury margins nobody claimed."},
  {"q":"Comparing ShopKart's 22.8% ROE with a levered trader's 33% ROE requires FIRST:",
   "o":["a bigger calculator","decomposition inside species - split margin x turns x leverage on both, then compare; the trader's extra points may be pure denominator-thinness wearing excellence's blazer; headline-ROE rankings without DuPont are committee malpractice","their auditor's number","5 years of prices"], "a":1,
   "w":"Same headline does not mean same species; biopsy before applause, always."},
  {"q":"ROCE 29.7% vs WACC 12.6% certifies:",
   "o":["dividend safety","value creation at the FACTORY level - +17.1pp operating spread x Rs 67.4L = EVA ~ Rs 11.5L before financing stories begin; ROCE-vs-WACC grades operations, ROE-vs-Ke grades what owners kept after the treasurer played","low inventory risk","high payout room"], "a":1,
   "w":"Operations are what is left when financing stops talking."}],
"fa5": [
  {"q":"ShopKart's accruals ratio of -3.6% certifies:",
   "o":["problems in receivables","high earnings quality - cash arriving AHEAD of booked profit (non-cash dep flowing back home, WC hunger modest); CFO/PAT 1.28 told the same story in a different ruler: two witnesses agreeing is where forensics rests its case","creative capitalization","window dressing"], "a":1,
   "w":"Negative accruals = cash outrunning opinion; the gold standard dresses plainly."},
  {"q":"A Beneish M-score of -0.9 (DSRI 1.6, TATA +0.09, GM defiance) tells the analyst to:",
   "o":["buy the growth","treat as manipulator-zone until three named pages reconcile (top-20 aging, provision-vs-aging deltas, CFO/PAT 5-year ribbon) - motive components can be innocent; accrual rows rarely are; investigate at normal speed or watch panic speed do it for you","wait for annual numbers","trim 25%"], "a":1,
   "w":"Receipts before verdicts, verdicts before positions."},
  {"q":"The interest-income vs cash-balance mismatch is a feared screen because:",
   "o":["interest is taxable","cash that exists EARNS - claimed Rs 20L earning 2.1% against a 6.5% sweep floor is either lazy (management failing) or NOT THERE (management lying); Satyam's imaginary balances failed this screen years before confessing, and it costs ninety seconds to run","banks report it","rates always vary"], "a":1,
   "w":"Money that earns nothing is either lazy or imaginary; both doors open audits."}],
"fa6": [
  {"q":"ShopKart's DSCR of ~5.7-5.8x places it:",
   "o":["at decline floors","in woo-the-customer territory - numerator (PAT + interest + dep - drawings) over (interest + scheduled principal) at thrice the strong-band floor of 2.0; professionals pair it with the trough print (~3.3x) so committees see headroom as policy, not luck","needing equity cures","at covenant breach"], "a":1,
   "w":"Floors define postures; posture decides pricing; pricing decides who calls whom sir."},
  {"q":"Drawing Power mechanics mean your Rs 30L sanctioned OD gives usable:",
   "o":["Rs 30L always","(stock x 75% + 90-day debtors x 75% - creditors), capped at sanction - the arithmetic ceiling, not the contractual one; treasuries designed against the sanction letter meet the DP page on the worst possible day","Rs 37.5L with margin","Rs 22.5L minus TDS"], "a":1,
   "w":"Sanction letters are ceilings upon ceilings; the true ceiling is three-form multiplication."},
  {"q":"Reading a bank, the PCR (provision coverage ratio) matters most because it tells:",
   "o":["deposit growth speed","provisioning honesty - rot admitted AND medicated (72%) beats rot admitted but left raw (58%): headline GNPA is the symptom, PCR is the prescription-compliance; provision-normalized profits are the only bank profits that travel across analysts uncorrected","branch count","CASA ratio"], "a":1,
   "w":"A bank's balance sheet reads like anyone's: what confessed, what provisioned, what still hidden."}],
"fa7": [
  {"q":"ShopKart's dual verdict, properly phrased, is:",
   "o":["buy everything, lend everything","EQUITY: investable window with a margin-ramp clock and the CF7 band; CREDIT: approve-class (DSCR 5.8/3.3, liquidation cover 1.58x) - same ledger read in two verdict-grammars, each with its own proof standards; the one-page autopsy made both in four minutes","sell: margins fell","wait for the next budget"], "a":1,
   "w":"Windows not adjectives, bands not soundbites, two proof-standards honored at once."},
  {"q":"FruitCart's interest-mismatch (Rs 0.42L on claimed Rs 20L average cash) convicts because:",
   "o":["interest is small anyway","claimed cash must EARN at sweep-floor (~6.5%): 2.1% implies the cash exists mostly on paper - the zero-price Satyam screen turning positive, and with it the file collapses from 'analyze' to 'investigate': existential rows outrank ratio-engines whenever they fire","banks round down","FDs pay 2% now"], "a":1,
   "w":"Money that earns nothing is either lazy or imaginary; both roads leave before valuation talk."},
  {"q":"The identical-P&L duel teaches, in one line:",
   "o":["PAT is luck","earnings are an INPUT, quality is the DIVISOR - accrual-sign, conversion-history, DuPont-species, and covenant posture price the same Rs 13L into a premium story and a committee file; 'same PAT, same price' is the retail reflex this course retires forever","always prefer leverage","turnover always wins"], "a":1,
   "w":"The multiplier is invisible right up until it isn't; screens before multiples, always."}],
"fi1": [
  {"q":"Alpha Infra's Rs 90 coupon with the bond trading at Rs 940 means its current yield is:",
   "o":["exactly 9.00%","9.57% - 90/940; the same Rs 90 on a cheaper ticket, while YTM adds the pull-to-par on top; coupon is the contract, current yield is the counter, YTM is the truth","8.43%","10.44%"], "a":1,
   "w":"(c) inverted the fraction; (a) forgot the price moved."},
  {"q":"A bond trades at par precisely when:",
   "o":["markets are calm","YTM equals the coupon rate - the discount engine at coupon-speed hands back exactly face value; above par means required yield is BELOW coupon, below par means above; the see-saw is exact, not psychological","the issuer is AAA","coupon is zero"], "a":1,
   "w":"AAA is a credit statement, not a pricing law."},
  {"q":"Clean Rs 985 + accrued Rs 45 (30/360, half-year held) settles at:",
   "o":["Rs 985","Rs 1,030 - the buyer pays the seller's earned half-coupon tonight and recovers it inside the next full Rs 90 courier; dirty is the real cash invoice, clean is just the quotable one","Rs 940","Rs 1,075"], "a":1,
   "w":"Accrued is real money owed at settlement."}],
"fi2": [
  {"q":"RBI hikes and your canon bond's yield moves 8% to 9%. Price lands at:",
   "o":["Rs 980.55","Rs 961.10 (-3.89%) - 311.17 coupons + 649.93 principal; the see-saw is arithmetic, not sentiment; the table lives in FI2 for a reason","Rs 943.34","Rs 920.10"], "a":1,
   "w":"Rebuild the cell: annuity 3.8897 x 80 + PV 0.6499 x 1000."},
  {"q":"Yields -2% vs +2% on the same bond shows +8.42% vs -7.58% because:",
   "o":["SEBI cushions falls","the price curve bends (convexity): far cash flows compound-gain more on yield drops than they discount-lose on rises - the holder's secret structural kindness, priced in FI3","coupons auto-reinvest","FDs compete away losses"], "a":1,
   "w":"Geometry, not regulation; shorts pay it, holders collect it."},
  {"q":"A hold-to-maturity investor with sound credit sees yields jump 1%. Her correct reaction:",
   "o":["sell before more damage","nothing changed about her contracted cash flows; the MTM dip is weather and arriving coupons now reinvest RICHER - the true risk she manages is credit, not the see-saw","convert everything to equity","write to SEBI"], "a":1,
   "w":"Selling converts weather into a realized loss at the trough."}],
"fi3": [
  {"q":"The canon bond (MacD 4.312 at y 8%) carries modified duration:",
   "o":["4.312","3.993 - divided by (1+y): Macaulay is the clock, modified is the damage meter, meaning +1% yields cost about -3.99% price","4.634","2.156"], "a":1,
   "w":"4.312 / 1.08 = 3.993; the desk quotes modified."},
  {"q":"Convexity 21.05 predicts +1% at -3.887% and the market prints -3.890%. The lesson:",
   "o":["duration failed","duration + convexity nails big moves within paise (961.13 predicted vs 961.10 actual) - duration is the straightedge, convexity the curve's confessed bend","convexity failed","models are useless"], "a":1,
   "w":"Two paise of error on a 1% shock: that is a corrected model."},
  {"q":"The twitchiest bond in any room is usually:",
   "o":["short maturity, fat coupon","long maturity, low coupon - cash gravity parked farthest out, so every rate step compounds against deeper money; zero-coupons are the extreme: duration EQUALS maturity","the AAA one","the floating one"], "a":1,
   "w":"Gravity distance rules; credit rating changes default risk, not rate physics."}],
"fi4": [
  {"q":"With 1y = 7.0% and 2y = 7.6% (premium ~10bp), the implied next-year 1y is:",
   "o":["7.3%","about 8.1% - 15.2 minus 7.0 minus 0.1: the curve publishes the crowd's hike forecast for free; a borrower ignoring it buys optimism at retail","7.0%","6.9%"], "a":1,
   "w":"The forward is the curve's opinion, priced."},
  {"q":"An inverted curve (short yields ABOVE long) is taken seriously mainly because:",
   "o":["SEBI mandates warnings","it is a money-backed bet that today's tight policy gets cut into tomorrow's slowdown - long buyers accept less yield NOW expecting far less LATER; the bet genuinely precedes slowdowns","banks like flat margins","rating agencies demand it"], "a":1,
   "w":"Flat curves squeeze banks - (c) is backwards."},
  {"q":"RBI's firmest grip on the curve sits at:",
   "o":["the 30-year point","the overnight-91-day short end - the repo corridor arbitrage-pins short money to policy while the long end floats free as the market's essay on the future","the 10y benchmark auction","SDL spreads"], "a":1,
   "w":"The corridor owns the short end; credibility owns the rest."}],
"fi5": [
  {"q":"A 91-day T-bill at Rs 98.40 annualizes to:",
   "o":["6.29%","6.52% - 1.60 earned on the 98.40 PAID scaled 365/91: discount instruments quote price, professionals answer in yield, and the PAID-price base is where rookies slip","6.52% earned on Rs 100","1.63%"], "a":1,
   "w":"(a) used 100 as base - the classic error."},
  {"q":"Zero-default-risk G-Secs still carry:",
   "o":["no risks worth naming","price (MTM/duration), reinvestment, and inflation risk - the sovereign kills the default question so the other three can be heard; a 10y gilt's ModD ~7 marks -7% in a +1% cycle","only liquidity risk","currency risk only"], "a":1,
   "w":"Safest paper in India once printed a -4% year."},
  {"q":"For a Rs 5L goal exactly 3 years away, the strongest sovereign-leaning choice is:",
   "o":["open gilt fund ModD 6.8","a 3-year target-maturity fund (or direct 3y gilts) - horizon locked to duration, roll-down working FOR you, cost near zero; the ModD 6.8 fund is a rate bet strapped to a house booking","364-day T-bill rolled yearly","equity hybrid fund"], "a":1,
   "w":"Match duration to horizon first, minimize cost second."}],
"fi6": [
  {"q":"An AA- NCD's 2.4% spread pays Rs 24,000/yr on Rs 10L; one default at 60% LGD confiscates:",
   "o":["2 years of spread","25.0 years of spread - Rs 6,00,000 of principal against Rs 24,000 of annual rent: credit is priced by survival-and-recovery across the book, never by the coupon's smile","6 years of spread","9 years of spread"], "a":1,
   "w":"600,000 / 24,000 = 25.0 exactly; the cold ledger."},
  {"q":"Zenith Ports (ModD 4.0) in a week of G-Sec -20bp and spread +150bp prints roughly:",
   "o":["+0.8%","-5.2% net - the rate engine gifted +0.8% while the spread engine billed -6.0%: corporate bonds answer to TWO dials and the fear dial can override the RBI dial in a week","-1.5%","-3.2%"], "a":1,
   "w":"Twin engines, opposite signs; fear won the week."},
  {"q":"A secured AA 9.4% NCD, issuer CFO-negative, stale solo rating, Rs 8Cr issue:",
   "o":["buy for the security cover","pass - the checklist runs security AFTER cash engine, rating quality and liquidity: 3 of 6 flags failed means 9.4% is a dare dressed as yield; coupons are read last","buy small for diversification","buy on dips"], "a":1,
   "w":"Order discipline IS the credit skill."}],
"fi7": [
  {"q":"Your 5-rung ladder shows ModD 2.66. A parallel +50bp prints about:",
   "o":["-2.66%","-1.33% - half the shift times the book's dial; the ladder's design promise: weather exists, disasters do not, because no single rate season anchors the story","-0.66%","-5.32%"], "a":1,
   "w":"(a) forgot the shift size; (c) halved twice."},
  {"q":"Immunizing a Rs 40L 6-year liability works because:",
   "o":["gilt funds guarantee returns","matching asset ModD (~6) to liability distance makes price risk and reinvestment risk trade punches - the lock is mechanical, re-keyed yearly as durations drift","the liability is nominal","RBI backstops it"], "a":1,
   "w":"Guarantees live in duration-matching, not on factsheets."},
  {"q":"A 60/40 spine-muscle book (ModD 4.0 and 3.2) runs a dial of:",
   "o":["2.4","3.68 - 0.6x4.0 + 0.4x3.2: the weighted dial is the one number committees ask pre-trade, so +1% prints (-3.68%) were agreed before occurring","7.2","3.6"], "a":1,
   "w":"Dials average; they never add."}],
"fi8": [
  {"q":"The canon Rs 50L book's portfolio YTM and dial are:",
   "o":["7.1% and 6.5","7.524% and 5.218 - holding-weighted across all five sleeves (income Rs 3,76,200, slack Rs 26,200 over mandate); desks are audited on weighted numbers, never the best sleeve","8.2% and 4.2","7.0% and 5.0"], "a":1,
   "w":"(a) is just the spine; (c) is just the AAA basket."},
  {"q":"The +1% shock and the AA default cost, respectively:",
   "o":["-Rs 5L and -Rs 3L","-Rs 2.61L MTM (8.3 months of income, healing via pull-to-par plus richer reinvestment) and -Rs 1.8L realized (5.7 months; survivable only because the 6% single-name cap was law)","-Rs 1.0L and -Rs 2.6L","-Rs 3.9L and -Rs 0.9L"], "a":1,
   "w":"Both figures were pre-signed at onboarding - a desk, not a prayer."},
  {"q":"The strongest defence of the Rs 5L liquid buffer at 6.3% is:",
   "o":["it keeps the factsheet green","Rs 9,500/yr of explicit drag bought dry powder that rebuilt income at +250bp spreads - insurance priced as a small known loss to fund a large timed opportunity","liquid funds are tax-free","SEBI requires it"], "a":1,
   "w":"4.6x payback in one repair season."}],
"in21": [
  {"q":"Your shares legally live at:",
   "o":["the broker","the depository (NSDL/CDSL) as a ledger entry in YOUR demat - brokers are access pipes, exchanges match engines, clearing corps guarantors; a broker's death interrupts trading for days, ownership for zero minutes","the exchange","the RBI"], "a":1,
   "w":"The vault question is the first question of market structure."},
  {"q":"Full T+1 settlement in India (January 2023) mainly bought investors:",
   "o":["lower taxes","less counterparty exposure and faster capital turnaround - first major market on earth to do it; money and shares exchange next evening and margin locked in the system shrinks","higher brokerages","more IPOs"], "a":1,
   "w":"Settlement compression is risk compression."},
  {"q":"A stock locked at the 20% lower price band is best described as:",
   "o":["illegal to trade","tradeable ONLY at the band floor and only if a buyer arrives - brakes stop the cascade AND your exit; position sizing decided before the news is the only protection","halted for the quarter","delisted"], "a":1,
   "w":"Lower-circuit mornings are sizing exams set long before exam day."}],
"in22": [
  {"q":"Modern insider-trading law bites hardest because:",
   "o":["SEBI reads private chats","possession of UPSI by a connected person creates a rebuttable presumption of guilt - the practical burden flips, so process (windows, pre-clearance, trading plans) is the only real defence","insiders must disclose salary","SAT never upholds SEBI"], "a":1,
   "w":"Innocence must be PROVABLE, not felt."},
  {"q":"The right first escalation for a wrong square-off with an emailed admission is:",
   "o":["consumer court","broker desk in writing, then SCORES with contract notes and the admission, then exchange arbitration for the money - the ladder works when rungs are climbed in order with paper","social media outrage","a police FIR first"], "a":1,
   "w":"SEBI polices conduct; arbitration writes cheques."},
  {"q":"SEBI's F&O guardrails (bigger lots, fewer expiries) formalize which doctrine?",
   "o":["banning retail risk entirely","reprice friction so only capital-serious participants remain - the study said 9-in-10 retail lose about Rs 1.1L on average; since 1992: measure the carnage, raise the ante, shrink the casino, recalibrate","boosting exchange volumes","matching US rules"], "a":1,
   "w":"Friction as consumer protection - same instinct that banned badla."}],
"in23": [
  {"q":"When a NIFTY stock does a 2:1 split, the index divisor:",
   "o":["doubles immediately","is untouched - price halves, shares double, free-float cap self-cancels; the divisor moves only where cap math doesn't (composition swaps, bonus/rights) so the series moves ONLY on real price moves","halves immediately","rises 5%"], "a":1,
   "w":"Market-cap math self-neutralizes splits."},
  {"q":"The deepest change in India's crash-resilience since the 2010s is:",
   "o":["more FIIs","the SIP bid - Rs 25,000+ Cr/month of sticky, date-driven domestic buying absorbing FII exits; rented foreign money no longer sets the floor alone","faster exchanges","more trading holidays"], "a":1,
   "w":"Stickiness beats depth at panic o'clock."},
  {"q":"Passive index funds add the new NIFTY inclusion:",
   "o":["when they judge it cheap","at the cutoff, in exact index weights - no opinion, pure obedience; that mechanical bid creates the inclusion-week pop and the post-cutoff give-back","gradually over months","only on green days"], "a":1,
   "w":"Rules, not views; both the cost advantage and the footprint."}],
"in24": [
  {"q":"OFS-heavy IPOs (90% offer-for-sale) primarily mean:",
   "o":["the company gets growth capital","insiders are exiting at the discovered price - 90 paise of every bid-rupee goes to promoter/PE pockets; the thesis must justify buying what officers professionally sell at max-band optimism","SEBI rejected the fresh issue","anchors demanded it"], "a":1,
   "w":"Follow the money: fresh feeds factories, OFS feeds founders."},
  {"q":"NII subscription of 190x mostly reflects:",
   "o":["190x genuine demand","leveraged IPO financing that unwinds at allotment - paper demand theatre; the muscle metric is REAL QIB money, slow and fully-paid","smart retail","anchor conversions"], "a":1,
   "w":"3-day financing is weather, not climate."},
  {"q":"A disciplined listing-pop trade requires:",
   "o":["conviction in the brand","pre-sized lottery framing with a pre-written exit rule (sell at pop or hard stop at issue) - riding it without an FA7 thesis converts a lottery win into an unexamined position at peak crowd","the biggest application possible","grey-market tips"], "a":1,
   "w":"Discipline before the open; size is the only real edge."}],
"in25": [
  {"q":"A Rs 3L equity gain realized at 15 months (your only trade) is taxed at:",
   "o":["20% on all of it","Rs 21,875 + cess - LTCG honours the Rs 1.25L exemption first, then 12.5%: 3 months of patience past the 12-month line was worth Rs 38,125 vs the STCG version","10% over Rs 1L","zero always"], "a":1,
   "w":"(c) is the pre-2024 ghost; the date line moves rates."},
  {"q":"The canon contract note (Rs 1.5L buy) proves which doctrine?",
   "o":["STT is the only real cost","your break-even is buy price PLUS both trips' tolls (~0.26-0.30% round-trip delivery) - six small lines totalling Rs 202.47 that no screen flashes","GST applies on full trade value","stamp duty is negotiable"], "a":1,
   "w":"Toll arithmetic before alpha arithmetic."},
  {"q":"STCL of Rs 45,000 with LTCG of Rs 50,000 in the same year means:",
   "o":["losses cancel salary","set-off leaves Rs 5,000 LTCG (under exemption, near-zero tax), and unabsorbed loss carries 8 years ONLY if the ITR is filed by the due date - losses are assets with expiry rules","STCL dies instantly","LTCG becomes tax-free forever"], "a":1,
   "w":"Belated returns euthanize the carry-forward."}],
"in26": [
  {"q":"Rs 10L for 20 years at 12% gross: direct (TER ~0.1%) vs regular (~1.1%) leaves:",
   "o":["about the same","Rs 96.46L vs Rs 80.62L - Rs 15.84L, a 158%-of-principal tribute delivered one invisible basis-point at a time; fees compound exactly like returns, except their owner is not you","Rs 86L vs Rs 84L","Rs 90L vs Rs 89L"], "a":1,
   "w":"(c) is the marketing-brochure version of the same theft."},
  {"q":"A tips group claiming 90% accuracy, SEBI-registered WZ1234 gets neutralized by:",
   "o":["asking their office address","verifying the registration on SEBI's own portal plus demanding the AUDITED net record plus calling via the official listed number - fraud collapses at independent verification","negotiating fees down","reading their testimonials"], "a":1,
   "w":"The verification triad; honest RAs welcome the drill."},
  {"q":"The most underrated wealth lever in a 20-year SIP plan is:",
   "o":["catching the bottom","the +10%/yr step-up - salary-linked contribution growth beats hours of fund-picking (Rs 3.4Cr+ class vs Rs 1.98Cr flat); you cannot research past an engine you refused to refuel","weekly rebalancing","sector rotation"], "a":1,
   "w":"Contributions scale with you; edges do not scale with hours."}],
"in27": [
  {"q":"Priya's correct order of operations is:",
   "o":["IPO first, cover later","protection, then emergency stack, then investing engine, then speculation sleeve - every inversion converts a fixable shock into a liquidation at market-bottom prices","SIP and tips in parallel","stocks first for alpha"], "a":1,
   "w":"Sequence is strategy; the pyramid stands or falls in order."},
  {"q":"Her 100-share buy at Rs 1,500 settles at Rs 1,50,202.47 because:",
   "o":["broker added hidden fees","six statutory stack lines (STT 150 + stamp 22.50 + brokerage 20 + txn 5.25 + SEBI 0.15 + GST 4.57) make effective price Rs 1,502.02 - the note is the machine's receipt","STT is 1%","GST ate the rest"], "a":1,
   "w":"Auditing line-by-line is the cheapest professional habit."},
  {"q":"The single engine-killer the IPS welds shut is:",
   "o":["picking the wrong flexicap","the SIP pause button in a -20% tape - interruptions of compounding outweigh every other retail error combined, so the document outranks the mood","choosing direct over regular","skipping one rebalancing"], "a":1,
   "w":"Fund choice tunes the engine; the weld keeps it running."}],
"ec1": [
  {"q":"A founder leaves Rs 40L idle for 2 years at 12.6% WACC. The honest P&L line is:",
   "o":["zero - cash is safe","about Rs 10.1L of invisible tuition (40 x 1.126^2 - 40) - opportunity cost is a real employee with a negative salary; safety belongs in yield-bearing parking, never a 0% costume","inflation only","Rs 4L"], "a":1,
   "w":"Idle is not safe; the cost is the road not taken, compounded."},
  {"q":"Order price Rs 58, average cost Rs 61, marginal cost Rs 44. Accept?",
   "o":["no - below average cost","yes - +Rs 14 marginal contribution; averages smear fixed costs across units and lie about single orders; refuse only when the order steals capacity from full-margin demand","only big clients","only with discounts"], "a":1,
   "w":"The margin is the courtroom; averages are hearsay."},
  {"q":"+10% price, -8% volume on a staple means the hike:",
   "o":["failed - volume fell","worked - E 0.8 < 1 makes revenue +1.2% (Rs 100.0k to Rs 101.2k); inelastic demand is pricing power, the economic name for the moat every investor hunts","is neutral","needs retesting"], "a":1,
   "w":"Elasticity converts pricing from gambling into measurement."}],
"ec2": [
  {"q":"A uniform-pricing monopolist (P = 100 - Q, MC = 20) maximizes profit at:",
   "o":["Q=50, P=50","Q=40, P=60 - set MR = MC: 100 - 2Q = 20; the restriction to 40 while P 60 > MC 20 manufactures the Rs 800 deadweight triangle antitrust exists to tax","Q=80, P=20","Q=60, P=40"], "a":1,
   "w":"(a) maximizes revenue (MR=0); (c) is competition's answer."},
  {"q":"Same-quarter 8% hikes across cement majors with flat inputs indicates:",
   "o":["proven cartel","price leadership or legal parallelism - chess without a meeting; cartel needs communication evidence, so price the DISCIPLINE as an investor and leave conspiracy to the regulator","demand collapse","cost push"], "a":1,
   "w":"Discipline is investable signal; conspiracy is a courtroom standard."},
  {"q":"Jio's 2016-19 entry, structurally, was:",
   "o":["irrational pricing","the deliberate dilemma play - choose the ruinous cell with parent-funded loss tolerance, outlast rivals' balance sheets, then collect the consolidated oligopoly; price wars are chess endgames and the winner bleeds longest","a regular price war","regulatory capture"], "a":1,
   "w":"Pockets set the game's horizon; horizon set the equilibrium."}],
"ec3": [
  {"q":"Nominal growth 9%, deflator about 2.3%. Markets price the real number near:",
   "o":["11.3%","about 6.5% (exact 1.09/1.0235) - 6.7% by shortcut; the surgery is routine, and quoting nominal as real is how press releases manufacture inflation-year miracles","4.2%","9%"], "a":1,
   "w":"Scoreboards feed models, not headlines."},
  {"q":"CPI spikes on tomatoes, crude falls, core quiet. RBI's mature reaction:",
   "o":["emergency hike","look through the food spike - rates cannot grow tomatoes; watch core and expectations, tighten only on second-round wage-chasing; supply shocks tax patience, not repo","cut rates fast","raise CRR to 8%"], "a":1,
   "w":"Core and expectations are the policy thermometers."},
  {"q":"Unemployment falls while LFPR falls faster. The correct reading:",
   "o":["recovery","discouragement signature - seekers exited the force, shrinking the numerator not the job gap; the triangle (rate, participation, quality) must heal together","measurement error","sectoral rotation"], "a":1,
   "w":"Participation is the confessor the headline hides."}],
"ec4": [
  {"q":"One Rs 5L deposit at CRR 5% can ultimately support broad money up to:",
   "o":["Rs 5L","Rs 100L - the ceiling 1/0.05 = 20x; loans create deposits which re-lend, bounded by reserves and dragged by leakages; money is mostly lending's footprint, not mint output","Rs 10L","Rs 25L"], "a":1,
   "w":"Ceilings teach the machine's architecture."},
  {"q":"Crude +30%, INR 83 to 86, core CPI 3.8%. The WRONG medicine is:",
   "o":["targeted duty relief","aggressive repo hikes - oil does not respond to RBI, and choking domestic demand while customs invoices inflate punishes the host for the guest's fever; hold-hawk, smooth FX, relieve inputs","hawkish hold with FX smoothing","watch expectations"], "a":1,
   "w":"Diagnose the engine before choosing the wrench."},
  {"q":"At 6% inflation, cash halves its purchasing power in about:",
   "o":["18 years","12 years - rule of 72 (72/6); the silent tax compounds quarterly on the complacent, which is why every PM plan is denominated in tomorrow's rupees","6 years","24 years"], "a":1,
   "w":"The furnace is slow but patients are its fuel."}],
"ec5": [
  {"q":"Spend Rs 100, non-borrowed receipts Rs 75, GDP Rs 500. Fiscal deficit is:",
   "o":["Rs 25, 12.5% of GDP","Rs 25 = 5% of GDP - the borrowing need and its ratio are the desk's first numbers; quality checks (capex share, primary gap) decide whether 5% builds highways or hangovers","Rs 25, 25% of GDP","Rs 175"], "a":1,
   "w":"25/500 = 5%; the fraction's placement is the job."},
  {"q":"India's realistic capex multiplier (~2x) trails the textbook (4x) because:",
   "o":["RBI offsets everything","leakages - imports, taxes, precautionary savings, execution lag - steal the later rounds; multipliers are measured in leakages, and transfers leak fastest","MPC is 0.4 in India","states refuse to spend"], "a":1,
   "w":"The leak-map, not the speech, sizes the multiplier."},
  {"q":"Debt-GDP stays stable whenever:",
   "o":["deficits stop entirely","nominal growth g exceeds effective interest r with modest primary deficits - India runs g ~9-10% vs r ~7.2%; sustainability is a growth policy wearing a calculator, and a deflation stall flips it fastest","ratings agencies approve","exports boom"], "a":1,
   "w":"The whole sovereignty debate in one inequality."}],
"ec6": [
  {"q":"Exports 450 + invisibles 180 - imports 700, GDP 3,500, equals CAD of:",
   "o":["-4% of GDP","-70 = -2.0% of GDP - livable zone IF financed by FDI-class lifers buying capital goods; the same number rented-financed in a gold season is a 2013 application letter","+0.4%","-0.2%"], "a":1,
   "w":"Composition footers convert numbers into risk ratings."},
  {"q":"India's reserves ($650-700B, 10+ months cover) primarily buy:",
   "o":["a permanently stronger rupee","time, calm and policy space during flow panics - armor, not a level; RBI smooths splurges instead of defending numbers, and the 1991 3-weeks-cover contrast is why the pile exists","lower rates abroad","FDI incentives"], "a":1,
   "w":"Armor buys composure; levels are never promised."},
  {"q":"Nominal INR flat, inflation differential +3%. The honest verdict:",
   "o":["exporters gain","REER appreciated about 3% - exporters' dollar prices rose through domestic inflation without a paisa of FX movement; the stable-rupee headline hides a competitiveness tax","nothing changed","importers lose"], "a":1,
   "w":"REER is competition's price tag; nominal is the headline's."}],
"ec7": [
  {"q":"The reliable place to read the FUTURE in the monthly dump is:",
   "o":["GDP - the big number","the LEFT of the ladder - curve, PMI, GST, credit; GDP arrives after the movie and prices nothing; concluding forward from rearview data pays zero","headline CPI alone","editorials"], "a":1,
   "w":"The ladder exists so nobody trades yesterday's newspaper."},
  {"q":"Core CPI rising 3.8 to 4.9 while IIP fades 5.2 to 3.1 places the quadrant at:",
   "o":["goldilocks","stagflation-lite drift - price-heat up with quantity-heat down; RBI keys on core, and hiking-into-slowing-growth punishes both engines, which is why gold and buffer earn sleeves","reflation","disinflation"], "a":1,
   "w":"Engine maps first, quadrant names second, tilts third."},
  {"q":"The 2y at 7.6% above the 10y at 7.0% is best read as:",
   "o":["a bond-market error","policy pinning the front while the long end prices future cuts into growth damage - the money-backed recession whistle of FI4; respect with sizes and kill-switches","liquidity surplus","data lag"], "a":1,
   "w":"Inversion is information with money behind it."}],
"pm1": [
  {"q":"60/40, sigma 15/25, rho 0.3: the portfolio sigma is:",
   "o":["19.0%","15.33% - the cross-term under-fills whenever rho < 1; the 3.67pp discount is the free lunch that costs nothing, and rho = 1 is the honest boundary (exactly 19%)","12.04%","17.2%"], "a":1,
   "w":"(c) is the NEGATIVE-correlation version; accuracy beats optimism."},
  {"q":"Risk the market pays you NOTHING for is:",
   "o":["systematic","idiosyncratic - one firm's fraud is diversifiable with a click, so no premium survives; about 15-20 names kill it, and holding 3-4 stocks is unpaid risk in a costume","duration risk","credit risk"], "a":1,
   "w":"Paychecks attach to what cannot be clicked away."},
  {"q":"The diversification layer the SIP mass-produces is:",
   "o":["geography","time - entry-price diversification monthly, the only layer a salaried investor manufactures at scale; pair with asset-class layers and lunch is served on a date schedule","factor","strategy"], "a":1,
   "w":"The calendar is the broker that never charges."}],
"pm2": [
  {"q":"Series +30%, -10%, +25%. The TRUE compounded annual return is:",
   "o":["15.0%","13.5% - AM lies by the volatility drag (about sigma^2/2): the -10% year taxes the compound path; every wealth number must be GM and every sigma is a fee","13.9%","16.1%"], "a":1,
   "w":"Drag is physics, not pessimism."},
  {"q":"Fund MDD 30% (peak 130 to trough 91). Recovery-required is:",
   "o":["30%","42.9% - drawdowns demand asymmetric recoveries; that asymmetry is why max-DD, not sigma, predicts which clients stay solvent in spirit through a bear","35%","25%"], "a":1,
   "w":"130/91 - 1 = 42.9%; ladders down are steeper."},
  {"q":"Fund A 14% at sigma 16 vs index 12% at sigma 14, Rf 7%. Winner:",
   "o":["A on raw return","A on Sharpe too - 0.44 vs 0.36, A earned its extra toll; if A's sigma hides option-selling tails, the PM5 tribunal convenes before capital moves","index on lower risk","tie at 0.40"], "a":1,
   "w":"Per-unit-of-toll is the duel's rule."}],
"pm3": [
  {"q":"Beta 1.3, Rf 7%, premium 5%: the required return is:",
   "o":["12.0%","13.5% - 7 + 1.3x5, the SML fair wage; deliver 15% and alpha is +1.5% AFTER the line's work is paid, not before","13.0%","16.0%"], "a":1,
   "w":"(a) forgot the amplification; (c) rounded faithlessly."},
  {"q":"The most honest sentence about fund alpha is:",
   "o":["alpha = return above NIFTY","alpha exists only after beta-work, factor tilts, costs and a full cycle take their cuts - most marketed alpha is beta (or smallcap slope) wearing a costume","alpha compounds forever","alpha needs no benchmark"], "a":1,
   "w":"The four tax collectors never sleep."},
  {"q":"Portfolio beta over a book is:",
   "o":["impossible without full covariance","the simple weighted average of constituent betas (no cross-terms) - the book's systematic lever, steerable with overlays; the cross-term drama belongs to sigma, not beta","always below 1","fixed daily"], "a":1,
   "w":"Beta averages; sigma crosses the border."}],
"pm4": [
  {"q":"Two-Fund Separation says timid and brave investors both should:",
   "o":["hold completely different risky books","hold the SAME tangency risky book, changing only its share against bills - personalization lives on the risk dial (proportion), not inside the engine room","pick stocks by personality","own at least 8 funds"], "a":1,
   "w":"One great engine, many volume knobs."},
  {"q":"Brinson's ~90% finding legitimately teaches:",
   "o":["stock-picking is worthless","the policy SPLIT writes ~90% of return variability - get the frontier-side split roughly right first and agonize over picking later; it prices variance across funds, so it crowns architecture first","markets are random","bonds are obsolete"], "a":1,
   "w":"Architecture first; asterisks read aloud."},
  {"q":"The CAL's slope equals:",
   "o":["beta","the tangency book's Sharpe - steeper line, better core; every investor's map upgrades when the risky engine's per-unit price improves, so building the engine outranks tilting it","the risk-free rate","the risk premium"], "a":1,
   "w":"The highway's grade IS the engine's grade."}],
"pm5": [
  {"q":"Fund A 14% R, sigma 16%, Rf 7% vs index 12%, sigma 14%. First-chair verdict:",
   "o":["tie","A leads 0.44 vs 0.36 on Sharpe - more return per unit of toll, honestly; then Treynor, Sortino, IR, Calmar convene because single-chair verdicts hire levered beta in a Sharpe costume","index wins","insufficient data"], "a":1,
   "w":"Chairs vote; no chair rules alone."},
  {"q":"A fund shows Sharpe 0.95 but MDD -48% and undisclosed TE. The card:",
   "o":["HIRE - elite Sharpe","WATCH at best, PASS if flags don't clear - sigma-laundering and endpoint casinos live exactly in that shape (elite sigma-grade, trauma path, opacity); fraud audit precedes capital","HIRE small","HIRE slowly"], "a":1,
   "w":"The tribunal exists because brochures grade themselves."},
  {"q":"IR 0.5 with IC 0.05 needs about:",
   "o":["25 bets/yr","100 independent bets/yr (0.05 x sqrt(100) = 0.5) - skill at scale is a factory of small disciplined calls; two heroic stories is not an IR","400 bets/yr","5 bets/yr"], "a":1,
   "w":"Breadth is the factory's name."}],
"pm6": [
  {"q":"70/30, equity +25%, debt +6%, year-2 closes at:",
   "o":["73.3/26.7","76.4/23.6 - the drift formula w(1+r)/total: +6.4pp in two bull years means band breached and the trim due; year-1's 73.3 (+3.3) was the documented HOLD","70/30","80/20"], "a":1,
   "w":"(a) was year one; the machine's log preserves both."},
  {"q":"The machine's real product is:",
   "o":["contrarian alpha","dial-honesty sold for a small trending-market premium and collected in crash-recovery cycles - insurance-priced discipline; who owns the recovery at the pre-crash dial wins","tax savings only","higher yield"], "a":1,
   "w":"Insurance, priced; the rest is marketing garnish."},
  {"q":"Cheapest repair after a 6.4pp equity breach is:",
   "o":["immediate Rs 9L sale","flow-first: redirect SIP and sweep dividends to the lagging sleeve with an outer hard rail as dual trigger - months of healing at zero tollbooth","switch to 100% debt","do nothing forever"], "a":1,
   "w":"Flows are free rebalances; sales are taxed ones."}],
"pm7": [
  {"q":"Anand's flat Rs 30k/mo over 35y at 12% lands near:",
   "o":["Rs 7.6Cr","Rs 19.3Cr nominal (Rs 1.26Cr contributed; about Rs 2.5Cr in today's rupees) - with +10% step-ups toward Rs 45Cr-class; the last two decades are the payload","Rs 3.4Cr","Rs 12.6Cr"], "a":1,
   "w":"Engine math; (a) is the 10%-board fantasy-cut."},
  {"q":"Ramesh's Rs 3Cr at blended 7% drawing flat Rs 1L/month survives:",
   "o":["about 22 years","50+ years with balance standing at month 600 - the nominal-flat proof; the honest plan adds +6% steps answered by 45-50% equity, a 24-month moat, annual real re-basing","forever, untouched","10 years"], "a":1,
   "w":"Durability proved; honesty steps attached."},
  {"q":"The desk's untouchable rule across all three lives is:",
   "o":["maximum equity always","signature first, markets second - allocation, bands, draw-order and welds are IPS law written in peacetime, reviewable on schedule, override-able only in writing","rebalance only in crashes","follow the best fund"], "a":1,
   "w":"Machinery beats negotiation in every single crash."}],
"rt1": [
  {"q":"The primary reason analysts prefer ratios over raw statement numbers is:",
   "o":["They are harder to manipulate","They strip out scale, making companies comparable across size and time","They eliminate accounting choices","SEBI requires them"], "a":1,
   "w":"Rs 13.25L alone is noise; a 4.73% margin or 22.8% ROE is evidence."},
  {"q":"ShopKart's interest coverage of 8.7x means:",
   "o":["Debt is 8.7x equity","EBIT covers the annual interest bill 8.7 times - comfortable debt-service headroom","The interest rate is 8.7%","Profit is 8.7x sales"], "a":1,
   "w":"Coverage = 20.0 / 2.30 = 8.7: it measures servicing, not size or price."},
  {"q":"Current ratio 2.5, but 70% of current assets are slow inventory. The pitfall is:",
   "o":["snapshot vs average balances","the one-ratio verdict - liquidity is real only after you open the composition","negative denominators","valuation mismatch"], "a":1,
   "w":"The quick ratio exists to strip that inventory out."}],
"rt2": [
  {"q":"The 5-way DuPont chain that builds ROE is:",
   "o":["margin x leverage x coverage","tax burden x interest burden x operating margin x asset turnover x leverage","ROA x P/E x payout","current ratio x quick ratio x D/E"], "a":1,
   "w":"0.748 x 0.885 x 0.0714 x 2.69 x 1.79 = 22.8% - and it must multiply back."},
  {"q":"A and B both post 30% ROE; A runs 1.5x leverage with 9x coverage, B runs 5x with 2.2x. Verdict:",
   "o":["equally attractive - ROE matches","A's return is earned and recession-resistant; B's is an amplifier artifact with thin survival margin","B is better - leverage shows confidence","compare P/E ratios first"], "a":1,
   "w":"Identical ROE, opposite quality - DuPont exists to kill 30% = 30% thinking."},
  {"q":"Growing above g* (22.8% ROE, 40% payout) without new equity requires:",
   "o":["nothing - it is mathematically capped","better margins or asset sweat, deliberate leverage, or a payout cut","revaluing assets upward","aggressive revenue recognition"], "a":1,
   "w":"g* is a budget: fund growth by moving a lever, never by cosmetics."}],
"rt3": [
  {"q":"ShopKart's cash conversion cycle (DIO 81, DSO 45, DPO 52) equals:",
   "o":["178 days","74 days - inventory plus receivable days minus the supplier-credit offset","126 days","29 days"], "a":1,
   "w":"Suppliers fund 52 of the 126 gross days; 74 sit on ShopKart's own book."},
  {"q":"Sales grow Rs 84L with a 74-day CCC. The working-capital growth tax is about:",
   "o":["zero - profit funds growth","Rs 17.0L of new cash trapped in the cycle, on top of any capex","Rs 84L of new debt","Rs 2.3L of extra interest"], "a":1,
   "w":"Delta sales x CCC/365 - fund the tax before celebrating the growth."},
  {"q":"Why do DIO and DPO use COGS while DSO uses sales?",
   "o":["tradition, no reason","like-by-like: inventory and payables sit at cost while receivables genuinely arise from invoiced sales - mixing margin into DIO would flatter the cycle","SEBI mandates it","COGS is easier to find"], "a":1,
   "w":"Sales-for-DIO inflates the denominator by the gross margin."}],
"rt4": [
  {"q":"CityFirst: GNPA 2.8% and PCR 75% give an NNPA of:",
   "o":["2.1%","0.70% - GNPA x (1 - PCR), the unprovided rot future profits must absorb","3.5%","0.28%"], "a":1,
   "w":"GNPA is the admissions register; NNPA is the unpaid bill."},
  {"q":"A bank accretes capital at 13.5% while growing RWA at 18%, CRAR 16%. The professional forecast:",
   "o":["CRAR rises with profits","CRAR glides down toward comfort levels in roughly four years - plan a capital raise about two years before it bites","nothing - CRAR is static","the bank must merge immediately"], "a":1,
   "w":"16% x (1.135/1.18) each year does the prophesying."},
  {"q":"Why is D/E nearly useless for comparing banks?",
   "o":["banks hide debt figures","debt is a bank's raw material - healthy banks run 8-12x leverage by design, so CRAR carries the solvency question instead","RBI bans it","bank equity cannot be measured"], "a":1,
   "w":"For lenders, leverage is the product, not the sin."}],
"rt5": [
  {"q":"ShopKart's GMROI 1.84 beats FreshWala's 1.40 despite a lower gross margin because:",
   "o":["GMROI ignores margins","inventory turns 4.51x vs 2.7x - turn velocity out-multiplies margin richness","FreshWala has more stores","different reporting periods"], "a":1,
   "w":"GMROI = (GM/COGS) x turns: 0.4085 x 4.51 = 1.84."},
  {"q":"CloudKart: 45% growth with -12% FCF margin. Rule-of-40 verdict:",
   "o":["57 - elite","33 - fail: the sum must clear 40 however you buy the growth","45 - exactly at the line","the Rule does not apply above 40% growth"], "a":1,
   "w":"The Rule prices the fuel of growth, not just the speed."},
  {"q":"SafeShield's combined ratio of 103% (72% losses + 31% expenses) means:",
   "o":["3% underwriting profit","underwriting loses 3 paise per premium rupee and float investment income must save the P&L","shut it immediately","premiums are exactly 3% too high"], "a":1,
   "w":"Insuring skill vs investing luck - the combined ratio separates them."}],
"rt6": [
  {"q":"Vantage Agro posts CFO/PAT of 0.35 with accruals of +14.4%. This says:",
   "o":["working capital timing - ignore it","profits are running roughly 3x their cash shadow - the manufactured-earnings fingerprint","the firm underinvests in growth","tax rates fell"], "a":1,
   "w":"The two cheapest fraud screens in the toolkit; Vantage fails both."},
  {"q":"The Satyam interest test flags Rs 900L cash earning an implied 1.6% because:",
   "o":["law requires FDs","real cash earns a market-rate heartbeat; a 1.6% yield against a 6.5% FD floor means the cash may exist only in the chairman's letter","interest income is an expense","6.5% is the statutory treasury yield"], "a":1,
   "w":"Interest income is cash's witness - always call the witness."},
  {"q":"A persistent 4-5% effective tax rate (vs ~25% statutory) is a loud flag because:",
   "o":["low tax is always fraud","fake profits are tax-free by construction - nobody volunteers real tax on manufactured income, so the cash-tax line becomes the confessional","it proves auditor honesty","it proves export incentives conclusively"], "a":1,
   "w":"Legitimate shields declare themselves in deferred-tax notes."}],
"rt7": [
  {"q":"Panel X: ROE 23.7% to 40.6% while CFO/PAT collapses to 0.41 and tax falls to 9.8%. Verdict:",
   "o":["conviction - rare ROE growth","avoid / short-candidate - leverage-and-margin bloat performed by storytellers while every witness (cash, tax, auditor) contradicts","watch - one more quarter","buy the bonds instead"], "a":1,
   "w":"When storytellers and witnesses disagree, believe the witnesses."},
  {"q":"Panel Y's 0.90 CFO/PAT is honest while Panel X's 0.41 is forensic because:",
   "o":["both are equally suspicious","Y's gap is sovereign payment timing that reverses (5y average near 1, full tax paid, DSRI 1.06); X's gap widens monotonically - timing that never heals","Y's auditors are bigger","Y bills in dollars"], "a":1,
   "w":"A single year is a snapshot; the 5-year average is the X-ray."},
  {"q":"SteadyBrew guides 15% growth against a g* of 17.6%. Reading:",
   "o":["no ambition - short it","the guidance fits inside the self-funded ceiling with 2.6pp headroom - the signature of a plan that intends to be kept","mathematically dishonest","g* is irrelevant to guidance"], "a":1,
   "w":"Guide inside your arithmetic and the market can underwrite you."}],
"tv1": [
  {"q":"Rs 1L at 12% for 10 years compounds to:",
   "o":["Rs 2.2L","Rs 3.1058L - 1.12^10; every year the base itself is bigger","Rs 3.4L","Rs 12L"], "a":1,
   "w":"Reverse the arrow: Rs 1L due in 10y is worth Rs 32,197 today at 12%."},
  {"q":"The Rule of 72 at 8% puts doubling at about:",
   "o":["8 years","9 years (72/8; exact 9.01) - deadly accurate in the 6-12% band","10 years","7.2 years"], "a":1,
   "w":"For tripling use 114; the 72 family is a field instrument with error bars."},
  {"q":"Rs 13L in 5 years vs Rs 8L today at a 9% hurdle - the honest verdict:",
   "o":["take the 8 now - bird in hand","take the 13 later: its PV is Rs 8.45L, and the choice only flips above the 10.2% breakeven rate","coin flip","take 8 now - inflation"], "a":1,
   "w":"Convert every rupee to the same address before choosing."}],
"tv2": [
  {"q":"A Rs 10,000/month SIP for 20 years at 12% builds a corpus of:",
   "o":["Rs 24L","Rs 98.93L on Rs 24L contributed - the engine pays four times the feeder","Rs 50L","Rs 1.5Cr"], "a":1,
   "w":"Annuity FV factor at 1%/month for 240 months = 989.26."},
  {"q":"The price of a Rs 1L/year perpetuity at a 12% hurdle is:",
   "o":["Rs 12L","Rs 8.33L - 1/0.12; the first honest price of forever","Rs 1L","infinite"], "a":1,
   "w":"Growing 3% forever instead: 1/(0.12-0.03) = Rs 11.11L."},
  {"q":"College fees of Rs 2L/year for 4 years at 9%: year-start (due) vs year-end (ordinary) cost:",
   "o":["identical","due costs 6.48 x 1.09 = Rs 7.06L PV vs Rs 6.48L ordinary - the start-date shifts a full year of discounting","due is cheaper","depends on the college"], "a":1,
   "w":"Annuity-due = ordinary x (1+r); colleges know this math - sign accordingly."}],
"tv3": [
  {"q":"The first EMI on Rs 30L at 9% for 20 years (EMI Rs 26,992) splits as:",
   "o":["Rs 13,496 / Rs 13,496","Rs 22,500 interest / Rs 4,492 principal - each installment pays that month's interest on the outstanding first","Rs 4,492 interest / Rs 22,500 principal","entirely principal in year 1"], "a":1,
   "w":"Front-loading: at month 147 (year 13) principal finally beats interest."},
  {"q":"A dealer offers '10% flat for 5 years' on Rs 10L. The true reducing APR is about:",
   "o":["10% - flat and reducing are aliases","17.27% - you pay interest on the original principal for 60 months while returning it monthly","12.5%","20%"], "a":1,
   "w":"Thumb rule: reducing = flat x about 1.8; always demand the APR."},
  {"q":"Rs 5L spare, 5 years into the home loan (15 left). Highest-value use:",
   "o":["prepay and cut the EMI for comfort","prepay and cut TENURE keeping the EMI - deletes ~4.8 years and saves ~Rs 10.4L of interest, about 2.1x the prepayment","FD at 7%","gold"], "a":1,
   "w":"Tenure cuts attack the exponent; EMI cuts only save ~Rs 3.4L on the same Rs 5L."}],
"tv4": [
  {"q":"Machine: -Rs 10L, +Rs 3L/year for 5 years, hurdle 12%. NPV and IRR are:",
   "o":["NPV -0.81L, IRR 10% - reject","NPV +0.81L, IRR 15.24% - accept: it pays its 12% rent on time and tips Rs 81k besides","NPV +5L, IRR 30%","NPV 0, IRR 12%"], "a":1,
   "w":"3 x annuity(12%,5) = 3 x 3.6048 = 10.81 - 10 = +0.81."},
  {"q":"Project A (IRR 60%, NPV Rs 4.29L) vs Project B (IRR 36%, NPV Rs 10.71L); fund only one:",
   "o":["A - highest IRR always wins","B - it creates 2.5x the rupees; percentages cannot be spent, and incremental IRR of 30% confirms the upgrade","A - smaller is safer","reject both - judges disagree"], "a":1,
   "w":"Maximize NPV in rupees; IRR only narrates."},
  {"q":"A project with cash signs - + - shows NPV positive at 10% but negative at both 2% and 30%. Response:",
   "o":["quote the higher IRR","dismiss IRR (two sign changes give multiple roots) and rule with NPV at the hurdle plus sensitivity analysis","average the two IRRs","lower the hurdle until IRR behaves"], "a":1,
   "w":"Every sign flip can add a root; NPV is unique at a given hurdle."}],
"tv5": [
  {"q":"'12% per annum' compounded monthly gives an effective annual rate of:",
   "o":["12.00%","12.68% - (1.01)^12 - 1; frequency is the payload","12.12%","12.55%"], "a":1,
   "w":"The ladder: 12.00 annual / 12.36 half / 12.55 quarter / 12.68 monthly / 12.75 continuous."},
  {"q":"A 6.5% FD in the 30% slab with 6% inflation delivers a real post-tax return of:",
   "o":["+0.5%","-1.37% - post-tax 4.55% loses to inflation; the safe FD erodes purchasing power by design","+0.47%","+6.5%"], "a":1,
   "w":"Real = 1.0455/1.06 - 1. Safety is purchasing power, not zero volatility."},
  {"q":"A credit card at 'just 3.4% per month' actually costs per year:",
   "o":["40.8%","49.6% - (1.034)^12 - 1; the monthly quote hides a bonfire, so prepaying the card earns a guaranteed 49.6%","3.4%","depends on the bill cycle"], "a":1,
   "w":"Lenders quote the tiny monthly number because the annual truth would kill the product."}],
"tv6": [
  {"q":"The FI canon bond (Rs 1,000, 8% coupon, 5y) prices at Rs 924.18 under 10% YTM because:",
   "o":["coupons shrink by regulation","the market demands 10% on an 8% promise - discounting every rupee at 10% prices the shortfall below par","par value depreciates","duration subtracts 7.58% directly"], "a":1,
   "w":"At 9% YTM the same formula prints Rs 961.10 - one formula, the whole seesaw."},
  {"q":"In the five-stage DCF (FCF +12%/yr, WACC 12%, terminal g 4%), the terminal value supplies about:",
   "o":["25% of EV","72% of EV - most DCF value sits beyond the visible horizon, so underwrite WACC and terminal g first","50% of EV","zero - terminals are optional"], "a":1,
   "w":"139.3 / 192.9 = 72%: the afterlife writes the cheque."},
  {"q":"Same Rs 4.27Cr retirement at 12%: age 32 (28y) needs Rs 15,630/mo vs age 40 (20y) Rs 43,160/mo. Lesson:",
   "o":["older savers earn more, it evens out","the 8-year head start cuts the dose to 36% - time is the exponent, and delay is the most expensive tuition in finance","inflation explains the gap","the 40-year-old should simply take more risk"], "a":1,
   "w":"Factors 2,731 vs 989: the same corpus costs 64% less when time lifts."}],
"tv7": [
  {"q":"The Sharma household plan that breathes (44-45% of salary) totals about:",
   "o":["Rs 77k - flat doses only","Rs 67.9k - house 26.3k + college 18.45k + stepped retirement 6.5k + car EMI 16.6k","Rs 40k - skip the goals","Rs 1.5L - everything at once"], "a":1,
   "w":"The 10% step-up escalator lets today breathe while later, larger installments compound."},
  {"q":"The dealer's '7.5% flat' on Rs 8L / 5 years actually costs about:",
   "o":["7.5% - printed on the brochure","13.5% reducing - flat x ~1.8; Rs 18,333/mo and ~Rs 2.9L interest vs Rs 1.96L at honest 9%","9% - same as the bank","15% by RBI formula"], "a":1,
   "w":"Flat quotes are technically true and commercially fatal."},
  {"q":"'Guaranteed Double in 12 years' is defused by which arithmetic?",
   "o":["a credible return","72/12 = 6% - below inflation and taxable: a guarantee to stand still in purchasing power; long goals need growth assets","it is fraud, always","it suits the 6-year house fund"], "a":1,
   "w":"Not fraud - an honest, legal, bad deal. Decline politely with math."}],
"wm1": [
  {"q": "The wealth machine's biggest early-career dial is:", "o": ["Picking the best-performing fund", "The surplus rate \u2014 the % of income converted to assets; moving 4.5% toward 25% outperforms any fund pick", "Churning portfolios annually", "Waiting for a market crash"], "a": 1, "w": "dial 1: the corpus is contributions \u00d7 compounding; you control contributions fully, returns approximately, and time only by starting. Verma's real problem wasn't funds \u2014 it was a 4.5% conversion rate on a \u20b91.32L machine."},
  {"q": "Verma FI arithmetic: annual expense \u20b913.4L, India-adjusted multiple 28\u00d7 means the FI corpus is about:", "o": ["\u20b91.34Cr", "\u20b93.76Cr \u2014 28 \u00d7 the annual expense, inflation-adjusted for a 6%-inflation economy", "\u20b967L", "25\u00d7 monthly income"], "a": 1, "w": "13.4 \u00d7 28 = 3.755 \u2248 \u20b93.76Cr. The US 4%-rule's 25\u00d7 assumes ~3% inflation; at India's ~6%, real sustainable withdrawal \u2248 3.5-3.77% (TV5/PM7 canon) \u2192 27-28\u00d7 is the honest multiple. Vague dreams don't retire people; spreadsheet cells do."},
  {"q": "The gear to fix FIRST in every household plan is:", "o": ["GROW \u2014 max equity", "PROTECT \u2014 emergency fund + term + health cover, because an uninsured SIP is a donation to the next emergency", "EARN \u2014 side hustles", "KEEP \u2014 cut all expenses to zero"], "a": 1, "w": "sequence: PROTECT \u2192 KEEP \u2192 GROW \u2192 (EARN runs in parallel always). Invert the order and compounding builds on sand: one medical bill or one breadwinning death converts the SIP book into a settlement cheque. The gears work as a transmission, not a menu."},
],
"wm2": [
  {"q": "The allocation tie-break law says final equity % equals:", "o": ["100 minus age, always", "min(capacity, willingness) \u2014 then stress-tested against what the goals require", "whatever the adviser recommends", "whichever dimension is highest"], "a": 1, "w": "capacity is math, willingness is measured behavior, required is the goal's demand; the equity number is the *minimum* of the first two, validated against the third. If required exceeds the minimum, you fix the goal or the surplus \u2014 you never \"hope\" your way past the ceiling."},
  {"q": "The Vermas land at 60% equity instead of the age-rule's ~76% mainly because:", "o": ["index funds were expensive that week", "his measured willingness (a full exit in March 2020) is the household ceiling \u2014 past behavior, not questionnaires, sizes the stomach", "debt funds promised 9%", "SEBI caps equity at 60%"], "a": 1, "w": "questionnaires lie politely; March 2020 told the truth. The household corpus answers to the weaker stomach, because a panic-sell at \u221232% (and never re-entering) costs more than 16pp of equity allocation ever earns. As scars turn into experience, the ceiling can rise \u2014 reviewed annually, never mid-storm."},
  {"q": "A college corpus with admission in 3 years sits 90% in equity. The professional call:", "o": ["Hold \u2014 equity always wins long-term", "Start the glide now: \u221210-15pp/yr to \u226430% equity by admission, because goal dates \u2014 not convictions \u2014 set the de-risking clock", "Move 100% to FD today", "Take a loan instead"], "a": 1, "w": "de-risking is scheduled by the *goal's* calendar: 90 \u2192 ~75 \u2192 60 \u2192 45 \u2192 \u226430% across the final years, tuition-year money liquid 12 months out. \"Long-term\" is a horizon the college fee receipt does not share; the fix is discipline with dates, not drama."},
],
"wm3": [
  {"q": "A 1% annual fee-vs-direct gap over 30 years of \u20b910k SIP costs about:", "o": ["1% of the final corpus", "19.8% of the corpus \u2014 factors 3,495 vs 2,804: the drag compounds like a fifth columnist", "\u20b93,000 per year, flat", "Nothing if markets rise"], "a": 1, "w": "1 \u2212 2,804/3,495 = 19.8%: the fee doesn't take 1% of your money; it takes 1% of your *compounding base every year*, and the base is where the exponent lives. Ask any product for its all-in cost the way a credit officer asks for collateral."},
  {"q": "The correct household shelf-map is:", "o": ["everything in equity for maximum growth", "equity = far goals, government wrappers = taxed debt anchor, SGB/ETF = gold sleeve, property = living first, FD/liquid = parking only", "ULIPs for discipline", "FDs for retirement, equity for emergencies"], "a": 1, "w": "jobs, not brands: far goals need the growth engine, dated goals their parking, retirement debt its EEE wrapper, gold its insurance sleeve, housing its stability logic \u2014 and every rupee's job description named before its product. (c) dies to the drag canon; (d) inverts both addresses."},
  {"q": "The landlord's \u20b91.6Cr flat renting at \u20b930k/mo shows the honest buy-vs-rent gap because:", "o": ["rent rises 5% yearly, always fixing the math", "a 2.25% rental yield needs ~8.4%/yr appreciation to tie a 10.65% blended portfolio \u2014 possible in pockets, not as a default", "EMIs are cheaper than rent by RBI rule", "flats never appreciate"], "a": 1, "w": "3.6L/160L = 2.25%; the spread to the blend must come from appreciation, and betting the family corpus on 8.4% property growth for 20 years is a thesis (write it, falsify it) \u2014 not a default. Rent + SIP wins until the math changes."},
],
"wm4": [
  {"q": "At \u20b915L gross with modest deductions, the FY2025-26 arithmetic verdict is:", "o": ["Old regime \u2014 always better for everyone", "New regime: \u20b997,500 vs ~\u20b91,95,000 old (\u20b92L deductions) \u2014 and old only competes when deductions cross ~\u20b93.5-4L of HRA + interest + 80C stacks", "Regime choice doesn't matter", "Pay the portfolio manager to decide"], "a": 1, "w": "the new regime's slab geometry + \u20b975k standard deduction + rebate beats thin deduction stacks; fat HRA/interest profiles (Ananya's \u20b96.56L) flip it back. It's arithmetic per April, not identity: spreadsheet, sign, move on."},
  {"q": "Full menu utilization at the 30% slab (80C \u20b91.5L + NPS \u20b950k) delivers per year:", "o": ["\u20b910,000", "\u20b962,400 \u2014 \u20b946,800 + \u20b915,600; \u2248 \u20b95,200/month free, forever, for reading two lines", "\u20b92,00,000", "Nothing above inflation"], "a": 1, "w": "1.5L \u00d7 31.2% = 46,800; 0.5L \u00d7 31.2% = 15,600 (30% slab + 4% cess). Compounded at 12%/25y the habit approaches a crore; the Act is a product catalog for people willing to fill forms."},
  {"q": "The correct March habit with \u20b980k gains + \u20b945k losses is:", "o": ["Sell nothing \u2014 taxes are for July", "Realize losses against gains, redeploy per allocation, and separately bank the \u20b91.25L LTCG-exemption harvest before the 31st, with T+1 settlement respected", "Sell everything to be safe", "Wait for profits to grow"], "a": 1, "w": "TLH converts a paper loss into ~\u20b95.6k of real tax saved *without* changing the portfolio's exposure, and the annual \u20b91.25L exemption is use-it-or-lose-it \u2014 March 31 resets it, T+1 decides which year a trade lands in. Tax alpha is the only alpha that's contractual."},
],
"wm5": [
  {"q": "The Mehtas' endowment (\u20b91L/yr \u2192 \u20b920L cover, ~3.3% IRR projected) should be judged as:", "o": ["A disciplined savings plan \u2014 keep it", "A double failure: negative-real returns AND cover at ~1% of his need \u2014 make paid-up and redirect premiums to term + SIP", "Better than term because \"money comes back\"", "Fine if the bonus projection holds"], "a": 1, "w": "3.3% IRR against 6% inflation is purchasing-power erosion with a life-insurance sticker, and \u20b920L covers ~6 months of his family's needs. The \u20b91.6L/yr premium buys the entire correct stack (term \u20b93.5Cr + health \u20b91Cr + PA/CI) with change \u2014 the audit math feels like finding money because it IS."},
  {"q": "Correct term sizing for a \u20b918L/yr earner with \u20b926.6L loan and \u20b942L assets is closest to:", "o": ["\u20b920L \u2014whatever the agent suggests", "\u20b92Cr \u2014 12 \u00d7 income + liabilities \u2212 assets, split across two insurers", "\u20b950L \u2014 round numbers feel right", "No cover needed since assets exist"], "a": 1, "w": "12 \u00d7 18 + 26.6 \u2212 42 \u2248 \u20b92Cr: income replacement is the point (the corpus must fund 25\u00d7 family expense if he vanishes). Splitting across insurers diversifies claim-handling risk and lets nominations track obligations \u2014 the \"split\" isn't superstition, it's operations."},
  {"q": "Choosing between CSR 99.1% (\u20b91,150/mo) and CSR 94.2% (\u20b9950/mo) for identical \u20b92Cr term:", "o": ["The 94.2% one \u2014 term is a commodity, buy cheap", "The 99.1% one \u2014 the product you are actually buying is the *claim payment itself*; the \u20b9200 premium gap is a courtroom-discount coupon", "Flip a coin", "Buy both \u20b91Cr each"], "a": 1, "w": "with term insurance the cheapest product and the best product differ by a pizza per month, and the entire purchase fires exactly once \u2014 when your family cannot negotiate. Buy the payer. (Option d \u2014 splitting for the sake of it \u2014 splits the medical-tests hassle more than it diversifies risk.)"},
],
"wm6": [
  {"q": "The India-honest safe withdrawal band is:", "o": ["6-7% \u2014 FD rates say so", "3-3.5% \u2014 10.7% blend minus 6% inflation minus volatility drag; \u20b93Cr quietly supports ~\u20b99-10L/yr", "2% \u2014 never touch principal", "10% if markets are good"], "a": 1, "w": "the 4% US rule assumed US inflation-realities; India's 6% treadmill plus deeper drawdown culture puts the honest band at 3-3.5% with bucket discipline. Above the band, plans only survive brochure markets \u2014 and brochures don't raise children."},
  {"q": "The 3-bucket defense defeats sequence risk because:", "o": ["buckets earn different returns", "buckets 1-2 carry 9+ years of withdrawals, so the equity engine (B3) is never *forced* to sell into a crash \u2014 volatility becomes refillable noise, not a death spiral", "it eliminates market risk entirely", "SEBI mandates buckets at 60"], "a": 1, "w": "sequence risk is *forced* selling at bad prices; the buckets remove the gun from volatility's hand for 9+ years \u2014 longer than any Indian bear market on record. The equity sleeve goes from payroll to pension fund: it refills, on the plan's schedule, from strength."},
  {"q": "The \u20b92.8Cr-for-9.25%-annuity pitch should be declined chiefly because:", "o": ["annuities are illegal past 65", "the payout is slab-taxed, flat forever (real value halves roughly every 12 years at 6% inflation), and the corpus (plus everything for heirs) belongs to the insurer on death", "9.25% is below FD rates", "SWPs are commission-free always"], "a": 1, "w": "triple underperformance: tax at slab vs SWP's gains-only-12.5%, zero inflation step vs the 6% raise rule, zero estate vs the corpus-plus-heirs intact. Annuities fit as a slim floor-layer (\u226420%), never as the whole retirement \u2014 the RM's 9.25% is five years of comfort exchanged for twenty years of erosion witnessed visibly."},
],
"wm7": [
  {"q": "The Mehta file's weakest gear requiring week-1 action is:", "o": ["GROW \u2014 equity too low", "PROTECT \u2014 \u20b920L of endowment cover against \u20b93.5Cr need, employer-locked health, no nominations hygiene or will", "EARN \u2014 need side hustles", "SHELF \u2014 wrong index fund"], "a": 1, "w": "investments \u20b985L exist *before* the floor does: classic inverted stack. Week-1 sequence: term applications (medicals take 2-4 weeks \u2014 start the clock), parent health stack, nomination fixes. Growth problems are optimizable; protection gaps are existential."},
  {"q": "Funding all three goals today (factors 310 / 573 / 1,713 for \u20b940L / \u20b950L / \u20b94.5Cr) needs monthly doses of about:", "o": ["\u20b91L+ \u2014 impossible, so drop retirement", "\u2248 \u20b932.6k total (\u20b912.9k + \u20b98.7k + \u20b911k stepped-retirement) against a \u20b965k surplus \u2014 funded WITH headroom", "\u20b95k \u2014 goals are cheap", "\u20b948k \u2014 exactly the EMI, so cancel the EMI"], "a": 1, "w": "12.9 + 8.7 + 11(stepped) = 32.6k vs 65k surplus: the family funds everything with \u20b932k headroom remaining for prepay tokens and buffer. The myth \"we can't afford goals\" was a premium-confusion artifact \u2014 the paid-up endowment and surrendered ULIP even refilled the reserves. Address discipline, not income, was the missing crore."},
  {"q": "\"Term insurance is money wasted \u2014 nothing comes back\" is answered by:", "o": ["Agreeing and buying an endowment plan", "The Separation Law: protection is rented income-stream (\u20b92,500/mo for \u20b93.5Cr), not an investment; products that 'return money' return less of everything", "Buying ULIPs instead", "Skipping insurance entirely"], "a": 1, "w": "\"nothing comes back\" IS the product working: you bought a \u20b93.5Cr promise for the price of two streaming subscriptions, and the premium isn't lost \u2014 it's the rental cost of your family's resilience. Money-back plans return your own money at 3.3%, minus cover adequacy, minus two decades. Family-friendly and arithmetically fatal."},
],
"cb1": [
  {"q": "The incremental-flow law counts only:", "o": ["all accounting profits the project books", "after-tax CASH flows that change because of the project, when they move \u2014 sunk, allocated, and alternative-blind items excluded", "every rupee spent on the project including studies", "projected revenues, gross"], "a": 1, "w": "the four corollaries (sunk dead, allocation out, opportunity costs priced, side effects counted both ways) are all just applications of one test: does this flow *move* if we say yes? If it doesn't move, it doesn't belong in the model \u2014 no matter how emotionally attached the sponsor is."},
  {"q": "The sponsor's deck showed +\u20b96L/yr; the honest flow was +\u20b90.3L/yr. The phantom NPV created was about:", "o": ["\u20b91L", "\u20b917.5L of phantom value \u2014 (5.7 \u00d7 0.7483 \u00d7 4.1114): honesty adjustments are not conservatism, they are the difference between a project and a donation", "\u20b94L \u2014 the study cost", "zero \u2014 depreciation fixes it"], "a": 1, "w": "decks don't lie at the NPV line first; they lie in the flow lines, quietly, via opportunity-cost blindness and cannibalization denial. CB1's craft is catching \u20b917.5L of phantom while it's still a slide, not a store."},
  {"q": "Which statement about the decision-rule map is correct?", "o": ["Payback crowns all decisions", "NPV is the only rule fluent in rupee wealth; IRR narrates in %, payback vets survival, PI rations scarce budgets \u2014 jurisdiction by question", "IRR alone suffices", "PI replaces NPV everywhere"], "a": 1, "w": "the map exists because each rule answers a *different* question and fails differently: NPV maximizes wealth, IRR trips on scale/sign-patterns, payback is profit-blind past the cutoff, and PI mis-sorts indivisible bundles (CB5). Fluent analysts switch rules by jurisdiction; fluent committees ask for two minimum."},
],
"cb2": [
  {"q": "ShopKart's full machine model moved TV4's +\u20b90.81L headline to \u2212\u20b90.83L mainly because:", "o": ["markets fell", "the honest model adds installation + NWC build at t=0 and taxes the operating flows while crediting the dep shield \u2014 lurkers that headline decks leave out", "depreciation is fake", "12% is too high"], "a": 1, "w": "\u22121.5L NWC \u22120.5L install at t=0, taxes taken out of rich-looking pre-tax savings, shield credited honestly, terminal repatriated: verdict flips \u22120.83 vs +0.81. Projects near zero NPV are where capital budgeting earns its salary: the borderline IS the battlefield."},
  {"q": "The depreciation tax shield of \u20b90.336L/yr on the cold-chain unit means:", "o": ["Depreciation generates cash sales", "The non-cash depreciation line shrinks taxable profit, so \u20b90.336L of cash that would have gone to taxes stays with the project annually", "Salvage must be ignored", "NWC is tax-free"], "a": 1, "w": "shields are timing-sensitive cash: WDV front-loads them (year-1 \u20b90.846L vs SL \u20b90.336L) and NPV rises with the arrow. The shield is why \"depreciation method\" appears in capex committees and not just audit notes."},
  {"q": "The correct inflation rule for project models is:", "o": ["Always deflate everything to today's money", "Nominal flows with nominal rates or real flows with real rates (5.66% at 12%/6%) \u2014 never mix; inconsistency is a pre-committed verdict", "Use 6% when unsure", "Inflation doesn't exist in stable economies"], "a": 1, "w": "remixing inflates or deflates precisely the number the decision stands on; the sponsor who escalates savings at 6% while discounting at 6% has secretly doubled the project's difficulty. Consistency is free; discipline is why so few models have it."},
],
"cb3": [
  {"q": "ShopKart's WACC (Ke 13.5%, Kd 12%, tax 25.17%, target 70/30) is:", "o": ["11.2%", "12.14% \u2014 0.70 \u00d7 13.5 + 0.30 \u00d7 12 \u00d7 0.7483: after-tax debt is the only debt equity holders truly pay", "13.5%", "12.83% \u2014 ignore tax"], "a": 1, "w": "9.45 + 2.69 = 12.14% at target weights (12.14-12.39% disclosing the range): the (1\u2212t) multiplier is half of debt's whole point. This hurdle has been dividing every ShopKart NPV since TV4 \u2014 now its receipt is signed."},
  {"q": "Why must Ke give way to divisional rates inside a diversified firm?", "o": ["SEBI mandates divisional rates", "One WACC between businesses of different \u03b2 over-expands the risky arms and starves the safe ones \u2014 each project's money must be priced at ITS risk economy", "Divisions have different auditors", "Ke only works for startups"], "a": 1, "w": "risk is a local currency: grocer money prices grocer projects, NBFC money prices lending. Using group WACC everywhere is the conglomerate-error machine gun: it shoots the safe cash cows AND arms the risky ventures, one board meeting at a time."},
  {"q": "\"Retained earnings at 10% are cheaper than new equity \u2014 fund internally\" should be ruled as:", "o": ["True \u2014 internal money avoids fees", "False \u2014 retained earnings carry the same Ke opportunity cost; the shareholders' forgone alternative prices internal capital, and only flotation (1-2%) differs", "True for small companies only", "False \u2014 internal accruals must always sit in FDs"], "a": 1, "w": "internals-vs-externals is a capital-structure decision (CF), not a discount on the hurdle. Every rupee retained is a rupee NOT returned to shareholders' 13.5%-expected world; the firm must out-earn that world with it or hand it back via buyback/dividend."},
],
"cb4": [
  {"q": "A sensitivity grid shows NPV flipping sign only when sales drop 10% (other drivers inert). The desk output is:", "o": ["Reject \u2014 project is risky", "Evidence-required red-flag on sales: sanction contingent on contracts/LOIs proving the base, because ONE assumption carries the verdict", "Approve \u2014 only one risk driver", "Raise the hurdle 2%"], "a": 1, "w": "the grid's purpose is triage: it finds the assumption that deserves measurement budget. Rejecting on \"risk\" alone throws away margin-rich projects with measurable drivers; approving without evidence outsources the company's money to the sponsor's forecast smile."},
  {"q": "The dark-store abandonment option (\u20b935L salvage in the bad state vs \u20b920L continue) adds value because:", "o": ["salvage is free money", "it converts bounded patience into a priced put: 0.5\u00d7(35\u221220) = \u20b97.5L of flexibility that static NPV never counted", "it raises the hurdle", "it offends no one"], "a": 1, "w": "a put with strike \u20b935L against continuing at \u20b920L: the put pays only in the bad state, exactly where static NPV bleeds. Salvage clauses, staged exits, equipment with secondary markets \u2014 every one is quiet optionality the bundled model treats as footnotes and the options lens reprices as value."},
  {"q": "Pilot-first structure B outperformed all-in A-with-abandon (\u20b916.4L vs \u20b911.6L) because:", "o": ["pilots are trendy", "the \u20b98L premium purchased information about demand before \u20b952L committed \u2014 buying truth cheaper than the market sells it", "structure A had no IRR", "Low state disappears under B"], "a": 1, "w": "resolution of uncertainty is an asset class: High/Base/Low became a decision menu instead of a destiny. The pilot is the capex version of buying a look at the cards; the promoter framing (\"indecision\") mistakes information-gathering for weakness \u2014 the spreadsheet disagrees by \u20b94.8L."},
],
"cb5": [
  {"q": "Fryer Y beats Fryer X for the shop floor because:", "o": ["its raw NPV is bigger (1.931 vs 1.044)", "its EAA (53.6k/yr) beats X's (43.5k) \u2014 cross-life comparisons must be made in annual-equivalent terms under repeatability", "it costs more, so it must be better", "5-year machines always win"], "a": 1, "w": "raw NPV cross-life is the classic committee fumble (longer machines collect bigger totals trivially); EAA converts value to per-year salary terms. And the answer states its universal caveat: repeatability/homologous windows \u2014 conditions, not vibes."},
  {"q": "With a \u20b920L budget and indivisible projects, the correct ruling on the five proposals was:", "o": ["PI rank, fill greedily, stop", "PI ranking PLUS exhaustive bundle audit \u2014 the crown goes to the combination with max total NPV (A+B+C = \u20b920L, +\u20b96.3L); PI is the heuristic, bundle NPV is the crown", "fund the largest NPV single project", "split every project pro-rata"], "a": 1, "w": "the \u20b920L case is the polite one (greedy = optimal); the Lab-exercise variant (\u20b935L canon: P1+P2+P3 beat P2+P3+P4+P5's fuller desk by 7.2 vs 5.9) is where bundle audits earn their keep. Unspent budget is not failure; suboptimal bundling is."},
  {"q": "The POS replacement (+\u20b91.91L incremental) was justified even after the life-mismatch caveat because:", "o": ["new machines are shiny", "even using ONLY the defender's remaining 3 years of \u0394OCF (3.60 PV), it still covers the \u20b93.5L incremental outlay \u2014 the verdict is robust to the objection, which is how borderline answers must be presented", "depreciation was fully used", "the lease option covered the gap"], "a": 1, "w": "attacking your own conclusion before the opposition does is the sign of a department, not a deck: strip the contested years, recompute, and the verdict survives \u2014 so present both lines. Replace. And the same lens (delay option) guards you when tomorrow robustly beats today."},
],
"cb6": [
  {"q": "The ShopKart month-12 audit red-flag was:", "o": ["capex +10.2%", "WC build \u20b919L vs \u20b917.0L modeled with CCC slipping to 80d \u2014 festive overstock habits compounding the growth tax; the savings decree held green", "sales at 69% of plan, which was expected", "the chiller replacement"], "a": 1, "w": "the ramp miss (69%) was calibration-typical amber, capex overruns inside band via change-board stay amber; the WC/CCC slip is the red because working-capital sins compound silently (RT3 growth tax was modeled, observed, and then exceeded anyway). The audit exists to name exactly this."},
  {"q": "With continue-PV \u20b914L vs salvage \u20b99L, the correct governance call on the dark-store put is:", "o": ["exercise it \u2014 salvage is cash", "stay \u2014 the put is \u20b95L out of the money; document its price at every review so exercising is arithmetic the day it flips, not a mood the day it storms", "hold a vote of store managers", "exercise only if sales fall 50%"], "a": 1, "w": "options are exercised on prices, not vibes: salvage 9 < continue 14 means persistence wins today, and the memo-bound review cadence guarantees the flip gets caught if footfalls decay further. Executive discipline = the put's strike printed in every review pack."},
  {"q": "The best governance response to a +\u20b96L \"marketing push\" at the same stores is:", "o": ["approve \u2014 momentum matters", "defer under tranche-staging: pilot \u20b91L/45d with a control store, staged \u20b92L releases on evidence, sponsor co-signature on variance", "reject forever and scold publicly", "fund fully from contingency"], "a": 1, "w": "the pilot structure converts an opinion (\"push works\") into evidence at 1/6th the price, with tranche gates protecting the rest. Governance isn't smaller ambition; it's ambition with receipts \u2014 defer-pending-evidence IS the approval path, not the block."},
],
"cb7": [
  {"q": "The committee's optimal allocation of \u20b935L was:", "o": ["Doors 1+2 \u2014 exact budget usage wins", "Doors 2+3 at \u20b930L, NPV \u20b98.69L \u2014 leaving \u20b95L as buffer/scale option; Door 1 deferred for unmeasured savings, because thin NPV on unproven drivers fails the evidence bar regardless of sign", "Door 2 alone \u2014 concentrate on the biggest NPV", "All three \u2014 bankers can stretch budget"], "a": 1, "w": "exact-spend is a vanity metric; bundle-NPV plus evidence gating is the craft. The \u20b95L buffer doubles as the dark-store scale-option funding (CB4 staging made flesh): idle-committed capital bought a second decision for free."},
  {"q": "The Warehouse Expansion (IRR claims 6% AND 35%) was ruled by:", "o": ["averaging the IRRs to 20.5%", "dismissing IRR (two sign flips \u2192 multiple roots), ruling on NPV@12% (+2.8, thin), and demanding a closure-cost contract as the decree \u2014 which, when produced at \u20b972L, re-priced it to +7.6 admissibly for the next cycle", "accepting the 35% IRR the sponsor preferred", "rejecting forever"], "a": 1, "w": "the defuser drill closed properly: no favorite roots, NPV-at-hurdle first, then the contract that converts estimate-risk into enforceable arithmetic. Committees that learn this once stop fearing sign-flip projects and start pricing them."},
  {"q": "The Software Rewrite ranked highest on PI (1.34) yet the chair's memo still gated it because:", "o": ["software is intangible", "every funded project exits the committee with a kill/scale/evidence decree \u2014 shrinkage savings \u2265 \u20b91.82L tracked by month 6, rollback ready; PI ranks projects, decrees govern them", "27% IRR sounded too good", "PIs are meaningless under \u20b940L budgets"], "a": 1, "w": "this is the whole CB recipe in one answer: analytics (NPV/PI) picks the menu, governance (memos, decrees, audits) chooses how dinner is eaten. A 27% IRR with a rollback plan is a stronger project, not a suspicious one \u2014 strong numbers with weak governance is precisely how \u20b95L rewrites become \u20b950L archaeology."},
],
"ia1": [
  {"q": "In India, an accounting standard becomes legally enforceable when:", "o": ["ICAI issues the exposure draft", "MCA notifies it under the Companies Act \u2014 drafting by ICAI and recommendation by NFRA are steps, not enforcement", "NFRA publishes a guidance note", "SEBI circularizes it to listed companies"], "a": 1, "w": "ICAI drafts and NFRA recommends; only MCA notification turns text into law."},
  {"q": "Meridian (unlisted) crosses \u20b9250cr net worth this year and drops below it three years later. Its Ind AS status:", "o": ["applies only while net worth stays above \u20b9250cr", "mandatory from the Phase II trigger and permanent \u2014 there is no exit once Ind AS applies", "optional at board discretion each year", "lapses automatically below the threshold"], "a": 1, "w": "permanence protects comparability; the threshold decides entry, never exit."},
  {"q": "The cleanest one-line difference between US GAAP and IFRS/Ind AS for inventory:", "o": ["US GAAP bans LIFO; IFRS allows it", "US GAAP permits LIFO; IFRS/Ind AS ban it \u2014 a living fossil of the principles-vs-rules debate", "both mandate weighted average", "IFRS mandates FIFO; US GAAP is free choice"], "a": 1, "w": "LIFO's US survival is the standard exhibit for why 'identical' inventory can price differently across systems."},
],
"ia2": [
  {"q": "The 2018 Conceptual Framework defines an asset as:", "o": ["anything expected to give future benefit", "a present economic resource controlled by the entity as a result of past events \u2014 control replaces mere ownership/probability", "a resource with probable economic benefits, owned by the entity", "any expenditure not yet written off"], "a": 1, "w": "right + control + past event; probability was pushed to recognition, not the definition."},
  {"q": "Deliberately overstating liabilities by 10% \"to be safe\" violates:", "o": ["the going concern assumption", "faithful representation's neutrality \u2014 prudence means cautious judgment, never systematic bias", "the cost constraint", "the materiality filter only"], "a": 1, "w": "neutrality is the fighter; a bias in either direction is unfaithful."},
  {"q": "No Ind AS covers your transaction. The Ind AS 8 fallback order is:", "o": ["IFRS first, then the framework", "the Framework's definitions and criteria first, then recent pronouncements of other framework-similar standard-setters, then accepted practice", "tax accounting, then whatever the board likes", "standards on similar issues first, ignoring the framework"], "a": 1, "w": "specific standard \u2192 framework concepts \u2192 cousins (IFRS) and practice, with judgment disclosed."},
],
"ia3": [
  {"q": "Deferred tax assets and liabilities present as:", "o": ["current if expected to reverse within 12 months", "always non-current \u2014 a deliberate classification canon so DT never flips with operating cycles", "netted against current tax", "split 50/50 by management estimate"], "a": 1, "w": "always non-current; cycle-independent by design."},
  {"q": "Which OCI item may be recycled to P&L?", "o": ["remeasurements of defined-benefit plans", "foreign currency translation reserve of a subsidiary \u2014 Bucket B: it joins P&L when the operation is disposed", "FVOCI equity-instrument gains", "revaluation surplus on PPE"], "a": 1, "w": "FCTR is the classic Bucket B item; the other three are permanent residents of Bucket A."},
  {"q": "A retrospective restatement forces Ind AS 1 to demand:", "o": ["a fourth cash-flow statement", "a third balance sheet \u2014 as at the beginning of the preceding period, so restatement effects sit on the face of the statements", "an auditor's special certificate", "no extra statement, only a note"], "a": 1, "w": "the third BS is the restater's alarm: restate you may, hide you may not."},
],
"ia4": [
  {"q": "For a Phase I company, the Ind AS transition date and first reporting date are:", "o": ["1-Apr-2016 and 31-Mar-2017", "1-Apr-2015 and 31-Mar-2017 \u2014 transition is the opening of the earliest comparative, the first Ind AS year itself is FY 2016-17", "1-Apr-2015 and 31-Mar-2016", "1-Apr-2017 and 31-Mar-2018"], "a": 1, "w": "comparatives force FY15-16 into Ind AS; the bridge opens 1-Apr-2015."},
  {"q": "Which of these is an optional exemption, not a mandatory exception?", "o": ["keeping old estimates frozen to their original dates", "fair value as deemed cost for PPE \u2014 a one-time menu election; estimates, derecognition and NCI rules are compulsory", "prospective derecognition of financial assets", "prospective treatment of non-controlling interests"], "a": 1, "w": "deemed cost is an election with decades of depreciation consequences."},
  {"q": "NovaTech's bridge (850 + 120 \u2212 25 + 15 + 6.25) lands Ind AS equity at:", "o": ["\u20b9941.25cr", "\u20b9966.25cr \u2014 every adjustment carries a standard citation and usually a tax shadow", "\u20b91,016.25cr", "\u20b9850cr, exemptions cancel out"], "a": 1, "w": "read bridges as biography: FV unlocks + tax shadows, not performance."},
],
"ia5": [
  {"q": "Fair value under Ind AS 113 is best described as:", "o": ["the price you paid, adjusted for inflation", "an exit price in an orderly transaction between market participants at the measurement date \u2014 market-based, not entity-specific", "the replacement cost of the asset", "management's best estimate of intrinsic worth"], "a": 1, "w": "four load-bearing words: exit, orderly, market participants, measurement date."},
  {"q": "A corporate bond priced from yields of actively traded comparable bonds is:", "o": ["Level 1 always", "Level 2 \u2014 observable inputs short of an identical active-market quote; the lowest significant input decides the level", "Level 3 because comparables are not identical", "exempt from the hierarchy"], "a": 1, "w": "comparables' yields are observable; but the instrument's level follows its lowest significant input."},
  {"q": "A model-only structured note shows a Day-1 model profit. Ind AS 113/109 treatment:", "o": ["book it immediately in P&L", "defer the day-one difference and release it as unobservable inputs become observable \u2014 model-only profit cannot be front-loaded", "book it in OCI until sold", "ignore the hierarchy and amortize over 10 years"], "a": 1, "w": "unobservable day-one differences defer; heroic models cannot front-load profit."},
],
"ia6": [
  {"q": "A debt fund holds bonds both to collect coupons and to sell for liquidity-management needs; cash flows are pure SPPI. Category:", "o": ["amortized cost \u2014 any selling kills it", "FVOCI \u2014 hold-collect-and-sell business model with SPPI pass; P&L runs like AC, FV gap in OCI, recycling on sale", "FVTPL, sales prove trading", "HTM with disclosure only"], "a": 1, "w": "the hybrid: AC-flavored P&L on an FV balance sheet, with Bucket-B honesty on exit."},
  {"q": "A bond paying twice the Nifty-50 return classifies as:", "o": ["FVOCI, since index exposure is just a market factor", "FVTPL \u2014 SPPI fails: cash flows must be solely principal and interest on outstanding principal; the 2x leverage clause kills it", "AC if held to maturity", "AC if no fees were charged"], "a": 1, "w": "one leverage clause, category decided; SPPI is binary."},
  {"q": "On disposal of an equity investment held under the FVOCI election, the accumulated OCI:", "o": ["recycles to P&L like FVOCI debt", "is never recycled to P&L \u2014 it moves within equity; the one-way door blocks sale-timing games with profit", "transfers to deferred tax", "reverses through P&L as impairment"], "a": 1, "w": "the door is one-way by design: no flipping winners through the profit line."},
],
"ia7": [
  {"q": "Under the general ECL model, a performing loan with no significant risk increase since origination carries:", "o": ["zero allowance until a trigger event", "a 12-month ECL allowance with interest revenue on the GROSS carrying amount \u2014 provisioning starts at origination, not at default", "lifetime ECL always", "lifetime ECL with interest on net"], "a": 1, "w": "ECL's philosophy flip: reserve at birth, smooth through life, and interest stays honest to the stage."},
  {"q": "Payments 45 days past due on a loan imply:", "o": ["nothing until 90 days, by RBI rules", "a rebuttable presumption of SICR \u2014 the loan is presumed Stage 2 unless documented evidence says otherwise", "automatic Stage 3 classification", "immediate write-off"], "a": 1, "w": "30 days past due is the mechanical floor; rebuttal needs evidence, not narrative."},
  {"q": "FinGrow's book computes: \u20b9620cr S1 @1.0% + \u20b9140cr S2 @5.0% + \u20b940cr S3 @40% gives total ECL of:", "o": ["\u20b922.0cr with 2.75% coverage", "\u20b929.2cr with 3.65% coverage \u2014 stage rates applied stage-wise, then migrate-and-measure is how the quarterly charge builds", "\u20b931.2cr with 3.9% coverage", "\u20b916.0cr, Stage 3 only"], "a": 1, "w": "6.2 + 7.0 + 16.0 = 29.2 on 800: coverage is the first number every earnings call asks for."},
],
"ia8": [
  {"q": "The euro-payable on Meridian's machine at year-end (100,000 booked at 88, year-end 91.5) produces:", "o": ["a \u20b93.5L increase in the machine's cost", "a \u20b93.5L exchange LOSS in P&L and a payable of \u20b991.5L \u2014 monetary items retranslate to closing rate; the machine, non-monetary at cost, is frozen at \u20b988.0L", "no entry until paid", "a \u20b93.5L OCI hit"], "a": 1, "w": "frozen assets, living liabilities: the asymmetry that moves import-heavy P&Ls."},
  {"q": "Translating a US subsidiary for consolidation:", "o": ["everything at average rate", "assets/liabilities at closing rate and income/expenses at average, with ALL resulting differences to OCI as FCTR \u2014 recycled to P&L on disposal", "everything at closing, differences to P&L", "non-monetary at history, monetary at closing"], "a": 1, "w": "closing for the BS, average for the flows, OCI for the difference, recycling on exit."},
  {"q": "Restating under hyperinflation (IAS 29), the gain/loss on the net monetary position lands:", "o": ["in OCI with FCTR", "in P&L \u2014 restatement by general price index first, translation to group currency after", "in equity directly", "never \u2014 hyperinflation kills profit"], "a": 1, "w": "monetary erosion is a P&L fact; index first, then translate at closing."},
],
"ia9": [
  {"q": "In an unfunded gratuity plan, the year's actuarial loss from a discount-rate change is presented:", "o": ["spread into P&L over 5 years", "in OCI immediately and never recycled to P&L \u2014 assumption weather is parked permanently away from operating profit", "against the securities premium", "in P&L as employee cost"], "a": 1, "w": "the remeasurement law; immediate, OCI-only, permanent \u2014 the corridor died with old GAAP."},
  {"q": "Discount rates for the DBO are anchored to:", "o": ["the company's borrowing cost", "yields on high-quality corporate bonds of matching currency and duration \u2014 govt securities where the corporate curve is thin", "the expected return on plan assets", "the RBI repo rate"], "a": 1, "w": "price the promise, not the investment strategy."},
  {"q": "An equity-settled ESOP grant's accounting signature is:", "o": ["remeasure every quarter through P&L", "measure at grant-date fair value, expense over vesting with true-ups for vesting PROBABILITY only \u2014 no value remeasurement ever", "expense the intrinsic value at exercise", "book no expense until exercise"], "a": 1, "w": "equity-settled freezes value at grant; only the vesting count trues up."},
],
"ia10": [
  {"q": "ESOPs: 1cr options, strike \u20b950, average market \u20b980, PAT \u20b9120cr on 10cr shares. Diluted EPS from the ESOP step alone:", "o": ["\u20b910.91 \u2014 all 1cr options are added as new shares", "\u20b911.57 \u2014 the treasury-stock method adds only 0.375cr net shares, since exercise proceeds buy back stock at market price", "\u20b912.00 \u2014 options never dilute", "\u20b911.43 \u2014 computed with the if-converted method"], "a": 1, "w": "strike-money buys back shares; only the net wedge (37.5% of options) dilutes."},
  {"q": "Under Ind AS 108, an operating segment is fundamentally defined by:", "o": ["the legal entity structure of the group", "the management approach: components whose results the CODM regularly reviews for resource allocation and performance assessment", "MINIMUM \u20b9100cr of revenue", "the auditor's business classification"], "a": 1, "w": "the CODM's dashboard maps your segments, not the MCA's registry."},
  {"q": "GigaChem's convertible prefs (1.0cr shares, \u20b99cr dividend saved, tested after bonds at \u20b911.03) are included because:", "o": ["all potentials are always included", "their inclusion yields \u20b910.94, still below \u20b911.03 \u2014 instruments enter in most-dilutive-first order and stay only while each successive EPS falls", "anti-dilution tests happen only at basic level", "their incremental EPS of \u20b99.00 is above basic \u20b912.00"], "a": 1, "w": "the sieve runs instrument-by-instrument, cheapest-dilution first, until a test fails."},
],
"ia11": [
  {"q": "The provision trident requires all three of:", "o": ["risk, materiality, auditor sign-off", "present obligation from a past event, probable outflow, and a reliable estimate \u2014 miss one and you disclose, you do not recognize", "a lawsuit, a lawyer, and a court date", "board approval, probability, and insurance exhaustion"], "a": 1, "w": "the trident decides recognize-vs-disclose; rainy-day provisions are earnings management in costume."},
  {"q": "Development-phase spend capitalizes under Ind AS 38 when:", "o": ["the amount is material", "all six PIRATE criteria (probable benefits, intention, resources, ability, technical feasibility, measurable expenditure) hold \u2014 expense research always", "research is complete", "the CFO certifies the budget"], "a": 1, "w": "the gate is criteria-based, not spend-based; and internally generated goodwill/brands never clear it."},
  {"q": "GigaPack's CGU impairment (carrying 100: goodwill 10, PPE 60, intangibles 30; recoverable 70) allocates as:", "o": ["equal \u20b910cr to each asset", "goodwill \u2212\u20b910cr first, then the remaining \u20b920cr pro-rata: PPE \u2212\u20b913.3cr, intangibles \u2212\u20b96.7cr", "goodwill untouched, all to PPE", "reverse-order: intangibles first"], "a": 1, "w": "allocation order: goodwill dies first, pro-rata follows, floors respected, and goodwill never comes back."},
],
"ia12": [
  {"q": "File 3's ruling \u2014 the euro machine and its unpaid euro payable at year-end (88 \u2192 91.5) \u2014 is:", "o": ["both retranslate: machine \u20b991.5L, loss \u20b93.5L", "machine frozen at \u20b988.0L (non-monetary at cost); payable retranslated to \u20b991.5L with \u20b93.5L exchange loss in P&L \u2014 para 46A-style capitalization is unavailable to Ind AS adopters", "machine retranslated, payable frozen", "both frozen: nothing booked until settlement"], "a": 1, "w": "frozen assets, living liabilities; election-era carve-outs do not cross the Ind AS bridge."},
  {"q": "FinBerry's regulator-ordered migration of \u20b950cr from Stage 1 (1.0%) to Stage 2 (5.0%) costs the quarter:", "o": ["\u20b950cr", "\u20b92.0cr \u2014 the incremental-rate shortcut: exposure \u00d7 the allowance-rate gap lands straight in P&L", "zero \u2014 stages are disclosure labels", "\u20b90.5cr"], "a": 1, "w": "shortcut math: 50 \u00d7 4.0pp = \u20b92.0cr; the protocol measures the delta, not the drama."},
  {"q": "VedaTextiles' bridge lands Ind AS opening equity at:", "o": ["\u20b91,200cr", "\u20b91,413cr \u2014 1,200 + 300 \u2212 40 + 18 \u2212 75 + 10, each line carrying its standard citation and its tax shadow", "\u20b91,338cr", "\u20b91,488cr"], "a": 1, "w": "build the bridge line by line, tax shadows attached: 1,413."},
],
"rr1": [
  {"q": "Under Ind AS 115, revenue is recognized when:", "o": ["invoice is raised and payment is assured", "control of the promised good or service transfers to the customer \u2014 the ability to direct use and take substantially all benefits, in the amount the entity expects to be entitled to", "all significant risks of ownership have left the factory", "cash is collected in full"], "a": 1, "w": "control-transfer doctrine: rights, not logistics, drive the revenue clock."},
  {"q": "Selling a handset with 24 months of bundled service is primarily a problem for:", "o": ["Step 1 \u2014 contract existence", "Step 5 \u2014 timing only", "Steps 2 and 4 \u2014 identifying the separate performance obligations and allocating the price between them", "no step \u2014 one product, one price"], "a": 1, "w": "free-hardware bundles were the old standard's blind spot; the model attacks them at identify + allocate."},
  {"q": "Which item falls OUTSIDE Ind AS 115?", "o": ["maintenance retainer from a customer", "GST billed on invoices \u2014 collected on behalf of the Government, so never part of the transaction price", "loyalty points granted to shoppers", "a SaaS annual subscription"], "a": 1, "w": "third-party collections exclude themselves; retainers, points and SaaS all live inside the engine."},
],
"rr2": [
  {"q": "The collectability criterion asks whether it is:", "o": ["certain the customer will pay the full list price", "probable the entity will collect the consideration it expects to be entitled to \u2014 ability AND intention, judged after anticipated concessions at inception", "possible the customer will pay something", "irrelevant \u2014 ECL handles everything"], "a": 1, "w": "a real probability judgment on the real expected price, made at inception."},
  {"q": "A modification adds distinct services priced fairly below standalone selling price. It is accounted as:", "o": ["separate contract", "prospective: terminate the old contract and recombine remaining promises with the new ones \u2014 the discount re-spreads across the whole relationship", "cumulative catch-up through the single PO", "marketing expense"], "a": 1, "w": "door 2 spreads sweetheart discounts over the whole remaining relationship; only SSP-priced distinct adds get door 1."},
  {"q": "An unsigned construction claim lives in:", "o": ["Step 3 \u2014 variable consideration, estimate it now", "Step 1 \u2014 nothing exists until the claim is enforceable; variable consideration treatment is for prices that vary within an enforceable contract", "OCI until signed", "revenue with a 100% provision"], "a": 1, "w": "enforceability first, variability second: the Step-1/Step-3 knife-edge."},
],
"rr3": [
  {"q": "A promised item is a separate performance obligation only when:", "o": ["it has its own invoice line", "it is capable of being distinct AND separately identifiable within the contract's context \u2014 both tests, in that order", "the customer paid for it separately", "management designated it a PO in the policy manual"], "a": 1, "w": "capable first, contextual second; contracts can weld catalogue-distinct items."},
  {"q": "Complex on-site integration welding a sold machine into the client's automated line means:", "o": ["machine revenue at delivery, integration as delivered", "machine + integration fuse into one \"working line\" PO \u2014 machine revenue waits for the combined output/acceptance", "machine revenue always at factory gate", "integration is immaterial"], "a": 1, "w": "the welding indicators kill delivery-day machine revenue."},
  {"q": "Twelve months of identical daily housekeeping is:", "o": ["365 obligations", "a single series PO recognized by the service's progress pattern \u2014 typically straight line over the year", "12 obligations, one per invoice", "one point-in-time obligation at year-end"], "a": 1, "w": "the series rule collapses the visits; the pattern (time) does the recognizing."},
],
"rr4": [
  {"q": "A \u20b920L binary completion bonus with 70% track record estimates as:", "o": ["EV \u20b914L, always average it", "most-likely \u20b920L \u2014 binary outcomes price at the likely single outcome; then the reversal constraint decides how much of it may be included", "zero until received, per prudence", "\u20b920L with a 30% provision"], "a": 1, "w": "estimator by outcome structure, then constraint; two dials, one at a time."},
  {"q": "Customer pays \u20b9100L two years before delivery at an 8% financing rate. At delivery:", "o": ["revenue \u20b9100L, the rest is finance income", "revenue \u20b9116.64L and interest expense \u20b916.64L recognized over the wait \u2014 significant upfront payment contains an embedded loan, measured at the cash-selling price equivalent", "revenue spread \u20b958.32L per year", "revenue recognized at payment date cash amount only"], "a": 1, "w": "SFC strips the embedded financing into interest lines; delivery recognizes the accreted price."},
  {"q": "Slotting fees paid to a retailer with no distinct service returned are:", "o": ["marketing expense", "netted against transaction price \u2014 payable-to-customer without a distinct service coming back reduces the price, full stop", "capitalized as shelf assets", "deferred as prepaid advertising"], "a": 1, "w": "the blade: pay-to-play without a distinct service is price reduction, not promotion cost."},
],
"rr5": [
  {"q": "The \u20b924,000 telecom bundle (SSP: handset \u20b918,000 + service \u20b918,000) allocates day-1 handset revenue of:", "o": ["\u20b918,000 \u2014 the phone's list price", "\u20b912,000 \u2014 relative-SSP: half the SSP pool, so half the \u20b924,000 total consideration, recognized at delivery", "\u20b90 \u2014 free means free", "\u20b924,000 \u2212 first month \u00d7 \u20b91,000"], "a": 1, "w": "the pro-rata hammer: 18,000/36,000 \u00d7 24,000 = 12,000; \"free\" was a marketing costume."},
  {"q": "The residual approach to an unobservable license price is legitimate only when:", "o": ["management approves it annually", "the license price is highly variable or uncertain AND the residual outcome remains plausible against market evidence \u2014 an absurd residual collapses the lane", "the resulting license figure is zero or negative", "support is also priced as a residual"], "a": 1, "w": "residual is the guarded lane: variability admits you, absurdity ejects you."},
  {"q": "A bundle discount pins to ONE obligation only when:", "o": ["it is the smallest obligation", "there is observable standalone evidence the discount attaches there (e.g., that item is routinely discounted alone); otherwise the discount spreads pro-rata to all", "the CFO designates it at inception", "it is the point-in-time obligation"], "a": 1, "w": "evidence pins discounts; preference does not."},
],
"rr6": [
  {"q": "The decisive pair for bespoke-asset over-time recognition is:", "o": ["50% costs incurred plus signed contract", "no alternative use of the asset AND an enforceable right to payment for performance to date \u2014 both halves, always", "customer paid an advance and approved the design", "work happens on the vendor's premises"], "a": 1, "w": "bespoke alone is not enough; payment rights alone are not enough; the pair is the law."},
  {"q": "The uninstalled-materials rule requires:", "o": ["include them fully in progress", "exclude them from the progress measure and recognize them at zero margin on transfer of control \u2014 cost-to-cost depicts effort, and parked equipment isn't effort", "write them off immediately", "recognize them at a standard 10% markup"], "a": 1, "w": "exclusion surgery plus zero-margin transfer: ownership moves the asset, not the progress."},
  {"q": "Month-8 construction: costs \u20b92.2cr with \u20b940L uninstalled lifts and \u20b912L own-fault rework; total estimate \u20b94.4cr; price \u20b95.0cr. Cumulative revenue is:", "o": ["\u20b92.65cr before stripping rework", "\u20b92.50cr \u2014 adjusted progress (220\u221240\u221212)/(440\u221240) = 42%, plus the \u20b940L zero-margin transfer", "\u20b92.75cr straight cost-to-cost", "\u20b95.0cr \u00d7 50% milestone invoiced"], "a": 1, "w": "(220\u221240\u221212)/(440\u221240) = 42%; rework is a period cost, never progress: cumulative revenue \u20b92.50cr."},
],
"rr7": [
  {"q": "The single test separating receivable from contract asset is:", "o": ["whether the invoice has been printed", "whether the right to consideration is UNCONDITIONAL \u2014 receivables wait only on time; contract assets are conditioned on future performance or milestones", "whether the customer dispute risk is high", "whether the contract is over one year"], "a": 1, "w": "conditionality vs time is the knife; risk profiles follow the split."},
  {"q": "A 5% success commission on a 3-year contract is:", "o": ["always expensed as sales cost", "capitalized as an incremental cost of obtaining the contract and amortized over the expected relationship period \u2014 it would not exist but for the win", "netted against the transaction price", "capitalized only if the customer is a related party"], "a": 1, "w": "the obtain-asset mechanics; the 12-month expedient is the only legitimate escape to expensing."},
  {"q": "Fulfilment costs capitalize when:", "o": ["they exceed \u20b910L", "all three tests pass: direct relation to the contract, resource generation/enhancement for future performance, and expected recovery \u2014 wasted inputs and finished-performance costs never qualify", "the CFO certifies them", "the contract is long-term only"], "a": 1, "w": "the three-test gate: relate, enhance, recover \u2014 in that order, on the same cost."},
],
"rr8": [
  {"q": "A 3-year \u20b990L license to a continuously-updated content library recognizes:", "o": ["\u20b990L at signing", "\u20b930L/year over time \u2014 continuous activities significantly affecting the IP make this a right to ACCESS", "\u20b990L when the library stops updating", "as usage reports arrive only"], "a": 1, "w": "the access test welds the license to the update stream; time spreads the price."},
  {"q": "KartBazaar on 10,000 baskets of \u20b9100 at a \u20b915 commission reports revenue of:", "o": ["\u20b910L gross", "\u20b91.5L net \u2014 the agent's share; GMV is a disclosure metric because the merchant controls the goods (inventory risk, pricing, fulfillment)", "\u20b98.5L after refunds", "\u20b915 per basket booked as marketing income"], "a": 1, "w": "indicators decide agency; topline inflation is precisely what the net rule stops."},
  {"q": "On the returns canon (100 units at \u20b92,000/\u20b91,400, 5% expected returns), the recovery asset is:", "o": ["\u20b910,000 at selling price", "\u20b97,000 \u2014 expected-back goods measured at former carrying amount (\u20b91,400 \u00d7 5 units), matched against a \u20b910,000 refund liability and \u20b91,90,000 revenue", "\u20b91,33,000", "nil; returns are expensed"], "a": 1, "w": "\u20b97,000 carries the asset-side of the evaporation; revenue holds at the 95 units that stay sold."},
],
"rr9": [
  {"q": "Dealer-stock sold on pay-on-resale terms with manufacturer recall rights is recognized as revenue:", "o": ["on shipment to the dealer", "when dealers sell through \u2014 consignment indicators mean control never passed; shipment was logistics", "when the quarter closes", "when invoices age 30 days"], "a": 1, "w": "possession is not control, take two; the onward sale is the trigger."},
  {"q": "Bill-and-hold revenue requires, cumulatively:", "o": ["just warehousing fees to be charged separately", "a customer request with substance, goods separately identified, physically ready for transfer, and no ability to use or redirect them \u2014 all four criteria, always", "a written side letter", "auditor approval"], "a": 1, "w": "the fortress is cumulative; miss one test and recognition waits for real delivery."},
  {"q": "The \u20b99,000 voucher SSP comes from:", "o": ["40% \u00d7 \u20b950,000 \u00d7 60%", "30pp incremental discount \u00d7 \u20b950,000 expected purchase \u00d7 60% expected use \u2014 material rights price only the discount ABOVE standard rates, times expected exercise", "10% \u00d7 \u20b950,000", "\u20b99,000 face value of the coupon"], "a": 1, "w": "only the incremental discount above standard rates, times expected exercise, prices the right."},
],
"rr10": [
  {"q": "An unsigned escalation claim of \u20b90.6cr on a running contract is accounted as:", "o": ["expected value \u20b90.3cr in progress", "\u20b90 \u2014 no unsigned paper in progress: Step-1 enforceability gates every claim; only then does Step-3 estimation start", "included at full value per management intent", "booked as an asset with full provision"], "a": 1, "w": "enforceability first, estimation second; the claim pipeline is not the transaction price."},
  {"q": "On the \u20b910cr tower (Y2: \u20b97.0cr costs, total \u20b910.5cr), the immediate-loss law forces tonight:", "o": ["nothing until project completion", "an extra provision of \u20b90.167cr now \u2014 booked margin \u2212\u20b90.333cr against the full expected \u2212\u20b90.5cr loss; Ind AS 37 makes the hole visible the day it forms", "spread \u20b90.5cr over remaining progress", "reversal of year-1's \u20b91.0cr margin"], "a": 1, "w": "the law books today what completion would only confirm: 0.5 \u2212 0.333 = \u20b90.167cr tonight."},
  {"q": "Retention money withheld until defect-liability expiry sits as:", "o": ["a receivable from day one", "a contract asset \u2014 performed work whose billing is conditioned on the defect-free certification; it flips to receivable only when that condition lapses", "revenue deferred entirely", "inventory until certified"], "a": 1, "w": "work done \u2260 billing rights until the defect window closes; the conditionality knife parks it as a contract asset."},
],
"rr11": [
  {"q": "CloudDukaan's welded \u20b92.4L platform + \u20b960k onboarding over 24 months recognizes monthly revenue of:", "o": ["\u20b910,000 with onboarding deducted", "\u20b912,500 \u2014 (240,000 + 60,000) \u00f7 24: welded implementation rides the subscription stream as one over-time PO", "\u20b960,000 day one + \u20b910,000 after", "\u20b912,000 with the fee as marketing expense"], "a": 1, "w": "the weld pools the fee; time-elapsed spreads the pool."},
  {"q": "On SIMWala's \u20b924,000 canon plan, activation-day revenue is:", "o": ["\u20b924,000 \u2014 full consideration", "\u20b912,000 \u2014 handset SSP-share at control transfer, plus the first \u20b9500 service slice as the month passes; the rest drips at \u20b9500/month", "\u20b90 \u2014 plans start monthly", "\u20b912,500 \u2014 dealer commission added"], "a": 1, "w": "activation books the phone's relative-SSP slice; the service keeps dripping monthly."},
  {"q": "GruhNirman's \u20b9480cr of sold flats (55% collected, 70% built, handovers next quarter) most likely shows:", "o": ["\u20b9336cr revenue now (70% POC)", "\u20b90-recognition to date with \u20b9264cr contract liability: Indian buyer agreements generally fail enforceable-payment-rights, landing residential sales point-in-time at handover", "\u20b9264cr revenue released proportionately", "\u20b9480cr revenue under bill-and-hold"], "a": 1, "w": "RERA-era reality: control lands at handover, so sold units ride as contract liability and inventory until then."},
],
"rr12": [
  {"q": "File 3's verdict \u2014 elevators inside the \u20b95cr job \u2014 is:", "o": ["25% progress, as the CFO computed", "adjusted progress 16.67% with the \u20b940L lifts at zero margin \u2014 \u20b91.233cr cumulative revenue; parked materials aren't effort, and naive cost-to-cost gets surgically corrected", "full costs in progress, revenue \u20b91.25cr", "exclude lifts entirely from all of revenue"], "a": 1, "w": "exclusion surgery: 60/360 progress, not 100/400; the canon holds under audit."},
  {"q": "The 4% franchise royalty recognizes:", "o": ["\u20b932L/yr from day one on a solid estimate", "only as the franchisee's sales actually occur \u2014 the sales-or-usage-based royalty exception parks estimates at zero until the trigger; fixed-fee treatment runs its separate use-vs-access test", "50% upfront per the constraint", "nothing until audit of the franchisee"], "a": 1, "w": "the exception is absolute: royalty estimates stay at zero until the underlying sales actually occur."},
  {"q": "TelcoX's month-6 contract asset lands at:", "o": ["\u20b912,000 unchanged", "\u20b99,000 \u2014 \u20b912,000 handset slice minus six \u20b9500 billing slices reclaimed; conditional claims unwind into receivables as bills rise", "\u20b96,000", "\u20b90 \u2014 it was settled upfront"], "a": 1, "w": "12,000 \u2212 6\u00d7500 = 9,000: every bill converts one slice from conditional claim to unconditional receivable."},
],
"ls1": [
  {"q": "AirSutra pays \u20b930cr/year rent for 8 years, IBR 9%. Under Ind AS 116, what lands on its balance sheet?", "o": ["\u20b9240cr liability, matching the commitment footnote exactly", "\u20b9166.0cr lease liability + \u20b9166.0cr ROU asset \u2014 the PV of the payments at 5.5348; the \u20b974cr gap to \u20b9240cr is imputed interest, amortized through finance costs", "\u20b930cr liability for next year's rent only", "an asset of \u20b9240cr and no liability, since ownership stays with the lessor"], "a": 1, "w": "PV at the IBR, both sides of the balance sheet; gross-vs-PV gap is interest yet to accrue."},
  {"q": "In Year 1 of adoption, UrbanNest's per-store statements show:", "o": ["EBITDA down \u20b910L, PAT flat", "EBITDA up \u20b910L (rent reclassified below the line), PAT down \u20b91.28L \u2014 depreciation \u20b97.78L plus interest \u20b93.50L totals \u20b911.28L versus the old \u20b910L rent, because interest is front-loaded on the fat opening liability", "EBITDA flat, PAT up \u20b91.28L", "EBITDA up \u20b911.28L, PAT up \u20b910L"], "a": 1, "w": "reclassification inflates EBITDA mechanically; front-loaded interest nicks PAT; both effects are arithmetic, not performance."},
  {"q": "Which universe did Ind AS 116 leave substantially alone?", "o": ["lessee accounting for office buildings", "lessor accounting \u2014 the finance-vs-operating classification survives for lessors, along with electable lessee exemptions for short-term and low-value leases; the revolution targets the lessee's balance sheet", "sale-and-leaseback gains", "sublease classification rules"], "a": 1, "w": "lessors keep the old two-door model; exemptions keep small beer off the lessee's books."},
],
"ls2": [
  {"q": "A contract guarantees UrbanNest \"50 server-units of compute anywhere across the supplier's five interchangeable data centres\". It is:", "o": ["a lease of 50 identified servers", "a service \u2014 no identified asset: substitution is substantive (practical ability across centres plus economic benefit from load-balancing) and no capacity portion is physically distinct, so all three locks never even get tested", "a lease because the servers physically exist somewhere", "a finance lease from day one"], "a": 1, "w": "substantive substitution and no physically distinct portion = no identified asset = service."},
  {"q": "The low-value exemption correctly applies to:", "o": ["any asset whose RENT is small", "assets low value when new on an absolute ~US$5,000 scale \u2014 laptops, tablets, small furniture \u2014 elected lease-by-lease, and NOT available where the asset is subleased or is an interdependent organ of a bigger asset", "any asset below \u20b94L resale value today", "the head lease of laptops subleased onward to franchisees"], "a": 1, "w": "absolute-scale low value, assessed when new, with the sublease and interdependence catches welded in."},
  {"q": "\"Rent = 1% of sales, minimum \u20b910L/year.\" Under Ind AS 116 the \u20b910L floor is:", "o": ["variable consideration, expensed as sales occur", "an in-substance fixed payment \u2014 unavoidable, so it enters the lease liability at day one; only the excess of 1%-of-sales over the floor remains genuinely variable and hits P&L as incurred", "disclosed but never measured", "a contingent asset"], "a": 1, "w": "floors are fixed in substance; caps and floors in clauses decide what gets capitalized."},
],
"ls3": [
  {"q": "\u20b930L/yr bundle; standalone prices \u20b925L (platform) + \u20b910L (maintenance); no expedient. The lease liability math runs on:", "o": ["\u20b930L, all-in", "\u20b921.43L \u2014 consideration allocates on RELATIVE standalone prices: 30 \u00d7 25/35 to the lease component; only that stream is capitalized, while \u20b98.57L is expensed as incurred", "\u20b910L, services first", "\u20b925L, the platform's sticker price"], "a": 1, "w": "relative standalone prices carve the bundle; only the lease stream is capitalized."},
  {"q": "UrbanNest elects the lessee practical expedient for a \u20b924L/yr bundle (lease \u20b918L + services \u20b96L), 5 years at 9%:", "o": ["liability \u20b970.01L, services still expensed", "liability \u20b993.35L \u2014 the election merges services into the lease component, so \u20b924L \u00d7 3.8897 lands on BOTH sides of the balance sheet; \u20b923.34L more than the separate-treatment \u20b970.01L, with zero extra borrowing", "liability \u20b924L", "the election is prohibited for real estate"], "a": 1, "w": "the lessee expedient swallows services into lease accounting; balance sheet inflates symmetrically."},
  {"q": "Which statement about lessors and bundles is right?", "o": ["lessors get the same merge-everything expedient as lessees", "lessors MUST separate lease and non-lease components and allocate under Ind AS 115's discipline \u2014 their split re-labels revenue lines, and revenue classification gets no expedients", "lessors always treat CAM as lease income", "lessors capitalize services into the net investment"], "a": 1, "w": "no merge for lessors: Ind AS 115 allocation protects rent-vs-service revenue classification."},
],
"ls4": [
  {"q": "Which stream ENTERS the lease liability at commencement?", "o": ["2%-of-sales top-up rent", "an in-substance fixed floor and the expected RVG shortfall \u2014 unavoidable payments (fixed floors, fixed payments, index-linked at today's level, expected guarantee shortfalls, reasonably-certain strikes); only genuinely activity-contingent money stays out, forever", "CAM actuals trued-up quarterly", "a purchase option at 40% confidence"], "a": 1, "w": "the liability holds unavoidable economics; activity-contingent variables are expensed as incurred."},
  {"q": "5 years \u00d7 \u20b910L/yr in arrears at IBR 9% gives a liability of:", "o": ["\u20b950.00L \u2014 the gross commitment", "\u20b938.90L \u2014 10 \u00d7 3.8897; the \u20b911.10L gap to \u20b950L is interest that accretes through LS5's table, not missing liability", "\u20b938.90L asset but \u20b950.00L liability", "\u20b911.10L, the time value only"], "a": 1, "w": "PV at the IBR; gross-vs-PV gap is precisely the interest schedule to come."},
  {"q": "ROU = \u20b938.90L liability + \u20b91.00L commission + \u20b92.60L restoration PV \u2212 \u20b90.50L incentive produces:", "o": ["\u20b938.90L \u2014 adjustments cancel out", "\u20b942.00L \u2014 the liability dressed with upfront/indirect-cost/restoration/incentive adjustments; depreciation then runs on the dressed \u20b942.00L (\u20b98.40L/yr), not on the naked liability", "\u20b942.00L, depreciated over 8 years", "\u20b940.40L, since incentives add"], "a": 1, "w": "ROU is the liability plus/minus its four adjustments, and depreciation follows the dressed number."},
],
"ls5": [
  {"q": "Year-1 total P&L charge on the \u20b910L/yr, 5y, 9% canon (SL depreciation) is:", "o": ["\u20b910.00L \u2014 same as rent, timing-neutral", "\u20b911.28L \u2014 depreciation \u20b97.78L plus interest \u20b93.50L; interest is fattest on the fat opening balance, so charge front-loads (+\u20b91.28L now, \u2212\u20b91.39L by Year 5) while lifetime totals match the old \u20b950L", "\u20b910.78L \u2014 dep minus interest", "\u20b913.50L \u2014 full interest load"], "a": 1, "w": "\u20b97.78L + \u20b93.50L = \u20b911.28L; front-loading is balance-size arithmetic, forecastable to the paisa."},
  {"q": "CPI resets remaining payments upward mid-lease (amounts changed, term and options untouched). The liability is remeasured at:", "o": ["today's market IBR, always", "the UNCHANGED original discount rate \u2014 only the cash amounts moved; the (python-verified) \u20b910.6L-for-3-years case lands \u20b926.83L vs \u20b925.31L, a +\u20b91.52L tweak to liability and ROU with no day-one P&L hit", "the lessor's implicit rate", "zero \u2014 remeasurements are prohibited"], "a": 1, "w": "amount-only resets keep the original rate; rate follows the deal's shape, not its invoice."},
  {"q": "A 2-year extension becomes reasonably certain; remaining payments become \u20b910L \u00d7 5; today's IBR is 10%:", "o": ["keep 9% \u2014 rates never change", "remeasure at the REVISED 10% rate: \u20b937.91L against the \u20b925.31L carrying, +\u20b912.60L to liability and ROU \u2014 the deal's shape changed, so the rate gets re-shopped at current market for the revised horizon", "expense the \u20b912.60L to P&L immediately", "derecognize and sign again"], "a": 1, "w": "term/option changes re-open the deal at a revised rate; no immediate P&L, the ROU absorbs."},
],
"ls6": [
  {"q": "End-Y2, UrbanNest surrenders 2 of 5 floors (carrying: liability \u20b925.31L, ROU \u20b923.34L). P&L today shows:", "o": ["nothing \u2014 modifications never touch P&L", "a GAIN of \u20b90.79L \u2014 derecognize 40% of each artifact (\u20b910.13L liability vs \u20b99.34L ROU); the forgiven debt outweighs the surrendered asset because interest had fattened the liability's young balance", "a loss of \u20b90.79L", "a gain of \u20b91.56L"], "a": 1, "w": "partial derecognition compares forgiven debt with surrendered asset; young leases usually hand back a gain."},
  {"q": "Same space, same term, rent renegotiated \u20b910L \u2192 \u20b913L for Y3\u2013Y5 (revised IBR 10%):", "o": ["expense \u20b97.02L immediately", "remeasure at the REVISED rate \u2014 \u20b932.33L vs \u20b925.31L carrying; +\u20b97.02L into the ROU with nil P&L today; the reprice then bleeds in through \u20b910.12L/yr depreciation and a fatter interest line", "open a separate lease", "restate prior years"], "a": 1, "w": "Door 3 repricing: revised rate, ROU absorbs, P&L pays later through dep and interest."},
  {"q": "Adding 2 floors at the market \u20b94.5L/yr for the remaining 3 years is:", "o": ["a Door-2 partial derecognition", "a SEPARATE lease \u2014 added right to use new assets at commensurate standalone price; own liability \u20b911.19L at the current 10% rate, own depreciation schedule, old lease untouched", "plan evidence for restating the old lease", "a variable payment event"], "a": 1, "w": "both separate-lease conditions met; run a clean parallel file."},
],
"ls7": [
  {"q": "Warehouse: FV \u20b9100cr = sale price, carrying \u20b970cr, PV of leaseback payments \u20b935cr. Under Ind AS 116:", "o": ["recognize the full \u20b930cr gain \u2014 a sale is a sale", "ROU \u20b924.5cr (70 \u00d7 35% rights retained) and recognized gain \u20b919.5cr (\u20b930cr \u00d7 65% rights transferred); the other \u20b910.5cr of gain rides inside the ROU and exits only as avoided depreciation", "ROU \u20b935cr, gain \u20b90", "keep the warehouse, no gain, financial liability \u20b9100cr"], "a": 1, "w": "proportion-of-rights: gain only on what left the building; the retained slice hides in the ROU."},
  {"q": "The same warehouse sells for \u20b9110cr against FV \u20b9100cr; PV of contractual payments is \u20b945cr:", "o": ["gain recognized \u20b930cr \u00d7 65% on the \u20b9110cr price", "the extra \u20b910cr is a financial LIABILITY (additional financing); PV splits \u20b910cr financing + \u20b935cr lease; ROU stays \u20b924.5cr and recognized gain stays \u20b919.5cr \u2014 the unwound-to-FV machinery prices reality, not stickers", "the extra \u20b910cr is extra recognized gain", "the sale fails automatically at any off-market price"], "a": 1, "w": "off-market prices unwind to FV first; above-market excess is debt, not dream income."},
  {"q": "A \"sale\" with a fixed-price repurchase obligation in four years is:", "o": ["SLB with proportion-of-rights gain", "a failed sale \u2014 control never passed under Ind AS 115; keep the asset, keep depreciating, book the proceeds as a financial liability under Ind AS 109 and split every payment interest/principal; no ROU, no gain, no lease", "an operating leaseback with deferred gain", "a finance leaseback with P&L smoothing"], "a": 1, "w": "repurchase obligations kill the sale at Gate 1; the file becomes Ind AS 109 borrowing."},
],
"ls8": [
  {"q": "LeaseLine's canon: 5 receipts of \u20b920L in arrears + \u20b910L guaranteed residual, fair value \u20b984.29L. Year-1 finance income is:", "o": ["\u20b920.00L \u2014 the first receipt", "\u20b97.59L \u2014 9% \u00d7 \u20b984.29L net investment; receipts then split income/principal so the closing balance accretes exactly to the \u20b910L residual at year 5", "\u20b97.20L \u2014 9% on \u20b980L", "\u20b925.71L \u2014 lifetime income, all upfront"], "a": 1, "w": "constant periodic return on outstanding net investment; the schedule foots to the residual."},
  {"q": "A manufacturer lessor finance-leases a vehicle costing \u20b922L at FV-anchored terms of \u20b928L. At commencement it books:", "o": ["nothing until the first payment arrives", "revenue \u20b928L and selling profit \u20b96L immediately (the lease is a sales channel), a net investment for the stream, and negotiation costs expensed at commencement \u2014 the finance-income tail then unwinds over the term", "revenue spread \u20b91.2L per year over 5 years", "profit \u20b96L over the lease term on collection"], "a": 1, "w": "manufacturer/dealer lessors book selling profit at commencement; selling costs expense with it."},
  {"q": "5-year operating lease, \u20b910L/yr, first 3 months rent-free. Annual recognized income is:", "o": ["\u20b910L in billing years, \u20b90 in the free stretch", "\u20b99.5L every year \u2014 aggregate billings \u20b947.5L \u00f7 5 years; incentives bend cash (year-1 cash \u20b97.5L with a \u20b92L receivable accrual) but never total income, which straight-lines across the term", "\u20b97.5L in year 1, then \u20b910L", "\u20b947.5L recognized at inception"], "a": 1, "w": "operating incentives smooth through the term; watch the receivable bridge, not the cash."},
],
"ls9": [
  {"q": "UrbanNest (intermediate lessor) subleases 100% of its space for the full remaining 4 years at PV \u20b929.16L against a \u20b931.12L ROU. Day one produces:", "o": ["nothing \u2014 subleases are off balance sheet", "derecognized ROU \u20b931.12L, net investment \u20b929.16L, and an immediate \u20b91.96L LOSS \u2014 the sublease is classified against the ROU (finance), while the head liability \u20b932.40L marches on untouched", "deferred gain \u20b91.96L", "the head lease liability reduced to \u20b929.16L"], "a": 1, "w": "ROU-reference classification makes this a sale of the ROU at market: receivable in, loss crystallized, head debt unmoved."},
  {"q": "Year-2 P&L under the finance-sublease canon shows:", "o": ["rent expense \u20b99L, income \u20b910L", "interest income \u20b92.62L (9% on the net investment) and interest expense \u20b92.92L (9% on the surviving head liability) \u2014 a negative carry of \u20b90.29L that itemizes the cheap subletting every year", "a single net rental margin line", "depreciation \u20b97.78L and sublease income \u20b99L"], "a": 1, "w": "two interest engines running against each other; the negative spread is the annual scar."},
  {"q": "A COVID-era lockdown rent waiver (all expedient conditions met; elected) is accounted:", "o": ["modification, revised discount rate, ROU absorbs", "NOT as a modification \u2014 the waived \u20b96L drops straight to P&L as a negative variable lease payment in the trigger quarter, liability relieved, election and amount disclosed; no revised rate, no ROU surgery", "other comprehensive income over the term", "straight reduction of the head-lease term"], "a": 1, "w": "the expedient: variable-payment treatment for qualifying pandemic mercy, elected and disclosed."},
],
"ls10": [
  {"q": "The maturity-analysis bridge for 5 \u00d7 \u20b910L runs:", "o": ["\u20b938.90L undiscounted reconciling to \u20b950.00L on the balance sheet", "\u20b950.00L undiscounted (<1y: \u20b910L; 1\u20135y: \u20b940L) \u2212 \u20b911.10L imputed unaccrued interest = \u20b938.90L carrying liability \u2014 the imputed slice foots exactly to the accretion schedule's lifetime interest", "\u20b950.00L on the balance sheet, \u20b938.90L in notes", "\u20b911.10L contractual cash with \u20b938.90L interest"], "a": 1, "w": "undiscounted buckets minus imputed interest equals the carrying liability; the slice must tie to the schedule's total interest."},
  {"q": "Post-adoption, mini-company (EBIT 40, int 5, debt 50, EBITDA 30, one 10-rent store capitalized) shows:", "o": ["ICR 8.00x flat, Debt/EBITDA 1.67x flat", "ICR 4.97x (42.22/8.50) and Debt/EBITDA 2.22x (88.90/40) \u2014 interest cover thins 38% and leverage jumps 33% purely from re-badge mechanics: rent became dep+interest and lease debt joined the balance sheet", "ICR improves to 9.2x", "Debt/EBITDA improves to 1.25x because EBITDA rose"], "a": 1, "w": "both ratios re-rate mechanically; performance is unchanged, the arithmetic moved."},
  {"q": "The clause that leaves a pre-2019 lender exactly as protected as priced is:", "o": ["a higher-margin grid clause", "a frozen-GAAP covenant clause \u2014 ratios computed under FY19 (Ind AS 17) policies going forward (or an equivalent Ind AS 116 carve-out with dual-basis reporting), so a standards change can't quietly donate or confiscate headroom", "an MAC clause citing Ind AS 116", "a waiver-fee escalator"], "a": 1, "w": "frozen GAAP (or the symmetric carve-out) keeps the risk model the bank actually priced."},
],
"ls11": [
  {"q": "A mall store pays \u20b98L/yr fixed + 3% of sales (\u20b94cr this year), 5 years at 9%. Ind AS 116 gives:", "o": ["liability \u20b977.79L capturing the full rent", "liability \u20b931.12L (fixed slice only: 8 \u00d7 3.8897) and \u20b912L variable expense in this year's P&L \u2014 sales-contingent rent is avoidable in form, so it never joins the liability; fixed:variable mix, negotiated at the table, draws the balance-sheet silhouette", "liability \u20b912L for the variable slice", "everything expensed off balance sheet"], "a": 1, "w": "fixed capitalizes, variable expenses; the mix negotiated decides the silhouette."},
  {"q": "Warehouse lease with contractual 5% escalation every 3 years vs one with CPI-linked 3-yearly resets:", "o": ["both sit outside the liability until invoiced", "the escalated LADDER discounts into the day-one liability (contractual fixed payments); the CPI-linked contract enters at today's index level and re-measures later through the unchanged-rate index door \u2014 same corridor of rent, two different day-one balance sheets", "both capitalize the full projected 12-year ladder", "escalations are always services"], "a": 1, "w": "contractual ladders capitalize day one; index-linked waits for the index, then the unchanged-rate door."},
  {"q": "A 15-year IRU for 30% of the capacity of a fiber pair is:", "o": ["a finance lease of the pair", "a service \u2014 a capacity portion that isn't substantially all of the pair and isn't physically distinct fails the identified-asset test; only contracting dedicated end-to-end strand(s) (substantially all capacity) flips it into lease territory", "a low-value exempt lease", "a short-term exempt lease"], "a": 1, "w": "fiber capacity portions fail physical distinctness unless they carry substantially all."},
],
"ls12": [
  {"q": "Across the six files, tonight's balance sheet gains (roughly):", "o": ["nothing \u2014 leases are all expensed now", "ROU \u20b942.00L + \u20b913.74L + \u20b924.5cr and liabilities \u20b938.90L + \u20b914.92L + \u20b935cr, while Files 2\u20134 (\u20b9201L/yr) stay entirely off balance sheet \u2014 exemptions and the service verdict are where the light books live", "\u20b9211L of liabilities for every envelope", "\u20b935cr less liability after the SLB"], "a": 1, "w": "six files, three destinations: full capitalization, exempt expense, service expense."},
  {"q": "File 1's Year-1 effect on reported results is:", "o": ["EBITDA flat, PAT flat", "EBITDA +\u20b910L (rent leaves operating lines) and PBT \u2212\u20b91.90L (dep \u20b98.40L + interest \u20b93.50L = \u20b911.90L against the old \u20b910L rent) \u2014 the dressed ROU makes this file heavier than the naked canon, which is why the bridge runs File by File", "EBITDA +\u20b911.90L, PAT +\u20b91.90L", "EBITDA \u2212\u20b910L because interest rose"], "a": 1, "w": "re-badge lifts EBITDA; dressed-ROU depreciation plus interest nicks PBT."},
  {"q": "UrbanNest's Year-1 one-off gains from Files 5 and 6 are:", "o": ["\u20b919.5cr and \u20b90.79L, both booked without machinery", "\u20b919.5cr (SLB: \u20b930cr \u00d7 65% rights transferred \u2014 the other \u20b910.5cr locked inside the \u20b924.5cr ROU) and \u20b90.79L (Door-2 partial derecognition: forgiven liability \u20b910.13L vs surrendered ROU \u20b99.34L) \u2014 every rupee traceable to a proportion-of-rights or schedules-race computation", "\u20b930cr and \u20b91.56L", "zero \u2014 116 bans gains on lease events"], "a": 1, "w": "both gains are computed, constrained and traceable; the standard prints the working."},
],
"ic1": [
  {"q": "Opening \u20b940L + purchases \u20b9260L \u2212 closing \u20b960L gives:", "o": ["COGS \u20b9300L, since closing adds on", "COGS \u20b9240L and GP \u20b9260L against \u20b9500L revenue (52.0% margin) \u2014 the bridge expenses exactly what left the building; every rupee of closing-stock error hits profit one-for-one and reverses next year through opening stock", "GP \u20b9240L", "COGS \u20b9240L only if all purchases were paid for"], "a": 1, "w": "the bridge: expense what departed; error-in-closing equals error-in-profit, one-for-one, self-reversing."},
  {"q": "Which of these belongs INSIDE Ind AS 2's fence?", "o": ["a bank's investment gold bars", "apples just harvested at fair value on harvest day \u2014 biological assets and at-harvest produce are Ind AS 41's, but the moment after harvest the produce enters Ind AS 2 at that fair value as deemed cost; merchandise and service WIP are always in; everything financial is always out", "an orchard's fruit still on trees", "steel awaiting a construction site's POC tally"], "a": 1, "w": "harvest is the standard-border: 41 up to the cut, 2 at deemed cost after."},
  {"q": "A \u20b910L closing-stock OVER-statement in Year 1:", "o": ["cuts Year-1 profit \u20b910L permanently", "inflates Year-1 profit \u20b910L exactly, then claws back \u20b910L through Year 2's fatter opening stock \u2014 a two-year wash that forces fraud to reload annually, which is why stock games collapse cliff-style", "has no P&L effect, purely balance-sheet", "inflates profit \u20b95L via amortization"], "a": 1, "w": "the error emigrates to the next period; persistence requires reloading, and reloads end in cliffs."},
],
"ic2": [
  {"q": "The \u20b9141/unit canon comprises:", "o": ["list price + all taxes + admin allocation", "list 100 \u2212 trade discount 5 + freight-in 6 + DL 12 + VOH 8 + FOH-at-normal 20 \u2014 excluding recoverable IGST, abnormal breakage \u20b92, finished-goods storage \u20b93 and corporate admin \u20b94, which march straight to P&L as period costs", "everything invoiced by the factory plus selling freight", "purchase price only, 95"], "a": 1, "w": "three buckets minus the wall: \u20b9141; the \u20b99 of exclusions never touch the shelf."},
  {"q": "Fixed production OH \u20b924L, normal capacity 12,000 units, actual 10,000:", "o": ["absorb \u20b924L, \u20b9240/unit", "rate locked at \u20b9200/unit on NORMAL capacity \u2192 \u20b920.0L absorbed into inventory and \u20b94.0L UNABSORBED expensed in the year \u2014 idle capacity belongs to the period, not to the units that showed up; over-production years recompute the rate down so absorbed never exceeds \u20b924L actual", "absorb \u20b920L, expense nothing", "absorb \u20b924L at \u20b9200/unit"], "a": 1, "w": "normal capacity sets the rate; unabsorbed is period expense; recomputation caps absorbed at actual."},
  {"q": "During 3-year maturation, the \u20b910cr spirits loan's 10% interest:", "o": ["expenses immediately, always", "capitalizes into inventory \u20b91.0cr/year as an Ind AS 23 qualifying asset \u2014 the cask sleep is substantial readying runway; capitalization stops the day the spirit is ready for sale", "capitalizes only if auditors agree", "capitalizes into property, not inventory"], "a": 1, "w": "qualifying-asset doctrine: interest rides the inventory until ready-for-sale day."},
],
"ic3": [
  {"q": "Lots 100@50, 100@60, 100@70; sell 150 @ \u20b9100. Under FIFO the statements show:", "o": ["COGS \u20b99,000, closing \u20b99,000", "COGS \u20b98,000 (oldest layers exit: 100@50 + 50@60), closing \u20b910,000 priced in fresh lots, GP \u20b97,000 at a 46.7% margin \u2014 FIFO fattens current margins under rising prices and keeps the shelf current", "COGS \u20b910,000, GP \u20b95,000", "COGS \u20b915,000, GP \u20b90"], "a": 1, "w": "oldest exits first under FIFO; the margin feast and the current-cost shelf both follow."},
  {"q": "LIFO's funeral was arranged because:", "o": ["it was too complex for software", "it lied physically (no shelf ships newest first), rotted the balance sheet (closing stock in fossil prices), and served profit menus (LIFO-dipping cheap layers on demand) \u2014 tax shield in the US, executed under IAS 2 and never permitted under Ind AS", "auditors disliked it", "WAC lobbied it out of existence"], "a": 1, "w": "physical lie + fossil shelf + profit menus: three bullets, one funeral."},
  {"q": "Specific identification is REJECTED for:", "o": ["a certified diamond solitaire", "interchangeable bolts \u2014 specific ID on fungible goods lets management hand-pick which cost layers \"sold\", turning profit into a curated selection; it is MANDATORY for genuinely non-interchangeable items like certified solitaires and custom hulls", "a custom-built machine", "a bespoke yacht hull"], "a": 1, "w": "fungibles march in formula order; only true one-of-ones carry their own passports."},
],
"ic4": [
  {"q": "Cost \u20b9500, expected price \u20b9480, selling costs \u20b920, 200 units. The shelf shows:", "o": ["\u20b91,00,000 at cost", "\u20b992,000 \u2014 NRV \u20b9460 (480 \u2212 20) beats cost down; the \u20b940/unit \u00d7 200 = \u20b98,000 write-down expenses in this period, and if prices later recover to NRV \u20b9495 the reversal restores \u20b935/unit (\u20b97,000), capped at the write-down taken and credited against current inventory expense", "\u20b996,000 at replacement cost", "\u20b9500 per unit forever, per cost principle"], "a": 1, "w": "the brake engages at \u20b9460, the reversal road is capped at the floor removed, both rides disclosed."},
  {"q": "Steel sheet at \u20b9200/kg (market \u20b9180) whose cabinets still clear cost is:", "o": ["written down \u20b920/kg immediately", "held at \u20b9200 \u2014 materials aren't written below cost while the finished goods they become still sell at or above cost; only when cabinets sink below cost does the sheet test, normally at replacement cost as the NRV proxy", "written up to replacement", "reclassified as financial inventory"], "a": 1, "w": "the materials safe-harbor: your economics, not the quote, decides; replacement cost only when the end-product fails."},
  {"q": "Lower-of-cost-and-NRV is applied to:", "o": ["total inventory, warehouse-wide", "each item \u2014 with grouping allowed only across items of similar nature and use \u2014 so one line's strength can't launder another's markdown; firm-contract quantities test at contract prices, the excess at market prices", "whichever method any group chooses quarterly", "classes only, never items"], "a": 1, "w": "item-by-item with similar-group mercy; netting warehouses is the polite fraud."},
],
"ic5": [
  {"q": "Fixed OH \u20b924L, normal 12,000, actual 10,000 then 15,000 across two years:", "o": ["\u20b9240/unit year 1; \u20b9160/unit year 2 absorbs \u20b924L", "\u20b9200/unit locked on normal \u2192 Year 1 absorbs \u20b920.0L with \u20b94.0L unabsorbed EXPENSED; Year 2 recomputes to \u20b9160/unit absorbing exactly \u20b924.0L \u2014 idle-capacity costs belong to the period, and the cap means no year may capitalize cost that was never incurred", "\u20b924L absorbed both years at \u20b9200", "\u20b94L capitalized into Year-1 inventory"], "a": 1, "w": "normal locks the rate, actual caps the absorption; the period pays for emptiness."},
  {"q": "Joint pool \u20b950L, by-product NRV \u20b94L, A \u20b970L vs B \u20b930L at split-off:", "o": ["A \u20b925L, B \u20b925L \u2014 split equals", "clip the \u20b94L by-product at NRV first \u2192 pool \u20b946L allocated on relative sales value: A \u20b932.2L, B \u20b913.8L \u2014 by-products pay rent on joint costs at NRV before the heirs divide by revenue power", "A \u20b935L, B \u20b915L", "A \u20b946L, B \u20b90 \u2014 winner takes pool"], "a": 1, "w": "by-product clipped at NRV, mains split \u20b946L by sales value 70/30."},
  {"q": "A beyond-normal 4% spoilage batch costing \u20b91,41,000 is:", "o": ["absorbed into good units like normal loss", "expensed immediately as an abnormal loss \u2014 only inherent, expected process erosion (normal loss) rides inside good-unit cost; accidents and beyond-line spoilage are period costs, mirroring idle-capacity doctrine", "added to the by-product", "capitalized as machinery cost"], "a": 1, "w": "abnormal is expelled at period cost; normal loss hides inside good units by design."},
],
"ic6": [
  {"q": "The canon chain RM 240 \u2192 DL 80 \u2192 VOH 30 + FOH 50 \u2192 WIP 20/30 \u2192 FG 50/40 produces:", "o": ["COGS \u20b9390L", "prime 320 \u2192 works 400 \u2192 cost of production 390 (WIP swing) \u2192 COGS \u20b9400L (FG swing) \u2014 four inventory-bordered valves, each altering WHICH period pays; overstate any closing stage and that station's expense deflates today's cost line", "prime cost \u20b9400L", "cost of production \u20b9420L"], "a": 1, "w": "five stations, two swings; each closing-stage valve moves expense between periods."},
  {"q": "The retail method is legitimate only when:", "o": ["margins are always 30%", "selling prices convert through the REALIZED margin pattern \u2014 markdowns pierced in \u2014 reviewed per department; it approximates cost, and the lower-of-NRV brake still tests the resulting stock independently", "auditors pre-sign the percentage", "SKUs are few and slow-moving"], "a": 1, "w": "realized margins, markdowns pierced, NRV brake still riding."},
  {"q": "Standard \u20b9140 vs actual \u20b9141 for 50,000 units sold:", "o": ["ignore, standards smooth", "the \u20b950,000 adverse variance books to the period's COGS (or is prorated between closing stock and COGS if material), and the standard itself gets reviewed \u2014 year-end inventory must approximate ACTUAL cost, and a standard missing every month is a policy lie in instalments", "credits add to closing stock", "debit a reserve"], "a": 1, "w": "variance is real cost: expense it or prorate it, and re-aim the standard."},
],
"ic7": [
  {"q": "10t of apples, \u20b980k/t FVLCTS at harvest; later expected sale \u20b995k/t, costs \u20b95k/t:", "o": ["inventory \u20b90 until sold; gain recognized daily", "inventory opens at deemed cost \u20b98.0L at harvest; later NRV \u20b990k/t exceeds cost so no write-down \u2014 Ind AS 41 grows it at fair value, Ind AS 2 sells it at cost discipline from the cut onward", "inventory \u20b99.0L at selling price", "inventory stays under Ind AS 41 until sold"], "a": 1, "w": "harvest is the handshake: fair value grows the asset, deemed cost starts the shelf."},
  {"q": "Identical 100t barley: broker-trader (NRV \u20b922k) vs miller (cost \u20b920k) at year-end:", "o": ["both at \u20b920.0L, inventory is cost-based by law", "trader: \u20b922.0L with \u20b92L P&L gain (broker-traders measure at NRV\u2212CTS with changes in P&L \u2014 their business IS the curve); miller: \u20b920.0L at cost since NRV beats cost \u2014 same physical stock, two honest numbers, because the activities differ", "both at \u20b922.0L to be comparable", "trader \u20b920.0L, miller \u20b922.0L"], "a": 1, "w": "purpose decides measurement: curve-trading floats at NRV, milling anchors at cost."},
  {"q": "A developer holds a plot phase costing \u20b913cr (land 10 + development 2 + qualifying interest 1); phase NRV \u20b912.5cr:", "o": ["keep \u20b913cr \u2014 land never writes down", "carry at \u20b912.5cr: the phase is INVENTORY (held for sale in ordinary course), tested plot-wise at lower of cost and NRV; the \u20b91cr interest legitimately joined cost during development but cannot protect the shelf from the market's verdict \u2014 a \u20b90.5cr write-down reports now", "reclassify to investment property", "write off \u20b913cr fully"], "a": 1, "w": "developer stock is inventory; lower-of rules and plot-level testing apply, interest-inclusive stack and all."},
],
"ic8": [
  {"q": "\u20b925L shipment, FOB shipping point, dispatched 28-Mar, received 3-Apr. On ShopKart's 31-March books:", "o": ["nothing until receipt", "\u20b925L goods-in-transit inventory plus the \u20b925L payable \u2014 title passed at the vendor's dock, so the truck at midnight is ShopKart's shelf; flip the clause to FOB destination and the same truck stays the vendor's inventory until 3-Apr", "\u20b925L expense immediately", "a receivable from the vendor"], "a": 1, "w": "title rides the Incoterm: shipped-so-received by the buyer; the clause decides the shelf."},
  {"q": "Book \u20b9100L, floor count \u20b997L:", "o": ["reduce purchases \u20b93L", "write inventory to \u20b997L with a \u20b93L shrinkage expense in the period (cost of sales lane) \u2014 the ledger always surrenders to physics; ABC-cadence cycle counts turn climaxes into questions", "capitalize the loss into remaining units", "defer until vendor reconciliation completes"], "a": 1, "w": "shrinkage is a period loss, never a cost of surviving boxes."},
  {"q": "\u20b912L consignment rack at a franchisee, \u20b92L sold to end-customers in March:", "o": ["franchisee carries \u20b910L inventory", "ShopKart (consignor) carries \u20b910L consignment inventory and recognizes only the \u20b92L truly sold onward; the franchisee holds a memo and agency fee, never the stock \u2014 until the end sale, the shelf belongs to the principal", "ShopKart books \u20b912L revenue in March", "the stock writes off at the franchisee's door"], "a": 1, "w": "consignment stock is the principal's until the end sale; agents record fees, not inventory."},
],
"ic9": [
  {"q": "Write-down \u20b940/unit taken; NRV recovers to \u20b9495 (cost \u20b9500). The period shows:", "o": ["\u20b940/unit reversal into other income", "\u20b935/unit reversal = \u20b97,000 credited against current inventory expense, disclosed with its trigger circumstances, capped at the write-down taken \u2014 restoration refunds the floor removed, and never mints gains into income lines", "nothing until sale", "revaluation surplus \u20b940/unit"], "a": 1, "w": "capped, expense-credited, disclosed; reversals are measurements corrected, not income minted."},
  {"q": "Price \u20b9700, variable \u20b9400, FOH \u20b924L, normal 10,000, sales 8,000: under-producing 6,000 vs producing 10,000 swings reported operating profit by:", "o": ["\u20b90 \u2014 production is a balance-sheet detail", "\u20b99.6L \u2014 identical GP \u20b94.8L either way, but under-production detonates \u20b99.6L unabsorbed overhead as period expense while produce-to-plan parks \u20b94.8L of fixed OH inside the closing pile; the swing prints in the unabsorbed line where analysts read utilization truth", "\u20b94.8L via GP differences", "\u20b924L, the full FOH"], "a": 1, "w": "the shelter lives below GP: unabsorbed lines and parked OH swing \u20b99.6L between equal economics."},
  {"q": "The \u20b96L-cost / \u20b91L-NRV obsolete line requires:", "o": ["a \u20b95L provision spread per judgement", "an immediate \u20b95L write-down \u2014 obsolescence discovered is measured NOW; dodging it invents \u20b95L of this-period profit one-for-one, and the \"surprise exceptional charge\" that exits years later is the museum's confession, not its discovery", "reclassification to stores", "disclosure only, no charge"], "a": 1, "w": "the museum burns when discovered; spread it and you become the eight quarters of dishonesty."},
],
"ic10": [
  {"q": "Steel: 10,000t in, \u20b948cr, 400t normal loss, 100t abnormal, 9,500t good:", "o": ["\u20b948,000/t on all units", "\u20b950,000/t across the 9,600 non-normal-loss tonnes \u2192 good output \u20b947.5cr into inventory; abnormal charge \u20b950L expelled to P&L \u2014 normal erosion hides inside the rate by design, accidents pay the period", "\u20b950,526/t inventory only", "all \u20b948cr to P&L (prudence)"], "a": 1, "w": "the partition foots: \u20b947.5cr shelved, \u20b950L burned, rate formed through normal erosion."},
  {"q": "A batch-level NPPA price-ceiling reprices batch PX-17's NRV to \u20b918L vs \u20b932L cost while PX-18 is fine:", "o": ["pool both batches before testing", "\u20b914L write-down on PX-17 alone \u2014 batch-level specific costs and item-level NRV discipline mean healthy batches never cushion dying ones, and the ceiling's regulator date is hard evidence for the test", "reclassify PX-17 to samples", "amortize over shelf-life"], "a": 1, "w": "item-level testing plus item-dated evidence: batch funerals are private affairs."},
  {"q": "Certified solitaire vs 4kg interchangeable chains in a 6% gold crash:", "o": ["both WAC; formula unity is mandatory", "solitaire under specific ID with its own NRV story; chains under WAC with the lower-of brake biting to the tune of \u20b913.92L against a \u20b9232L cost \u2014 fungibility decides the formula, hedges change risk but never the shelf's measurement", "both at replacement cost", "solitaire WAC; chains expensed"], "a": 1, "w": "fungibility picks FIFO/WAC vs specific ID; derivatives manage risk, not the shelf."},
],
"ic11": [
  {"q": "Periodic systems fundamentally differ from perpetual because:", "o": ["they're faster to compute", "COGS is derived as a residual (opening + purchases \u2212 closing) at count time, so shrinkage between counts hides inside \"COGS\" disguised as sales-serving cost; perpetual systems keep quantities live, and cycle counts CONFIRM them \u2014 the policy choice is really counted shrinkage vs invisible shrinkage", "they require no counts at all", "they're newer ERP technology"], "a": 1, "w": "residual COGS hides shrinkage; live quantities expose it. Choose your visibility."},
  {"q": "Floor 480 vs sheet 520 on a test pallet means:", "o": ["a completeness issue \u2014 recount later", "an existence failure: 40 recorded units are ghost stock (recorded-but-absent, the classic phantom family) \u2014 freeze, investigate recent adjustments on the SKU, extend two-way tests before anyone files it as count error", "expend \u20b90 \u2014 immaterial by definition", "the floor count is wrong by law"], "a": 1, "w": "ghost direction is the fraud direction: freeze and investigate before reclassifying."},
  {"q": "GRN 38,442 tagged 1-April with vendor claiming 30-March receipt, wall = GRN 38,441:", "o": ["book this year \u2014 vendor says so", "park OUT of the year: tag-side control passed in April, so neither purchase nor inventory enters March; last-GRN walls exist precisely to stop claimed-custody from outbidding documented custody at midnight", "book half in each year", "expense it in March and stock it in April"], "a": 1, "w": "cut-off walls run on documents and custody, not on claims; 38,442 lives in April."},
],
"ic12": [
  {"q": "File 2's rulings on absorption:", "o": ["accept 9,000 \u2014 management knows its plant", "assert-9,000 rejected: 10,000 \u00d7 \u20b9266.7 = \u20b926.67L > \u20b924L actual breaches the absorption cap, so normal stays at demonstrated 12,000 \u2192 rate \u20b9200, absorbed \u20b920.0L, \u20b94.0L unabsorbed expensed this year; capacity assertions are audit territory with an inequality, not management poetry", "\u20b9240/unit both ways", "absorb \u20b924L and expense nothing"], "a": 1, "w": "the cap kills the fake assertion; the period pays the honest \u20b94.0L."},
  {"q": "File 3's saga from March to Q1 touches P&L as:", "o": ["\u2212\u20b98,000 then nothing until sale", "\u2212\u20b98,000 write-down (NRV \u20b9460 vs cost \u20b9500 per unit \u00d7 200), then +\u20b97,000 reversal when NRV reaches \u20b9495 \u2014 capped at the \u20b940/unit floor taken, credited against inventory expense, both disclosed with trigger evidence", "+\u20b97,000 only", "\u2212\u20b980,000 asset write-off"], "a": 1, "w": "down \u20b98,000, back up \u20b97,000 with caps and notes; the last \u20b95 waits for evidence."},
  {"q": "Files 4\u20136 combined tonight require:", "o": ["exclude the truck, WIP \u20b910L, keep the museum", "include the \u20b925L truck as buyer's inventory (FOB shipping point) with the payable; WIP at \u20b930L keeping the chain at COGS \u20b9400L (\u20b910L \"prudence\" is a \u20b920L self-inflicted valve error); museum burnt \u20b95L now \u2014 clause-based title, honest counts, discovered-NRV charged", "truck vendor-owned; COGS \u20b9420L; write down \u20b96L", "only disclosure, no numbers change"], "a": 1, "w": "title by clause, counts by tags, obsolescence by discovery date: rulings, not vibes."},
],
"dp1": [
  {"q": "Ind AS 16 recognition of an item of PPE requires:", "o": ["physical possession plus a sale contract", "probable future economic benefits flowing to the entity AND cost measurable reliably \u2014 the para 7 two-bolt lock, applied on top of the three adjectives (tangible, held for use, more than one period)", "an invoice and a GST number", "auditor approval at year end"], "a": 1, "w": "probability of benefits plus reliable cost: both bolts, every item."},
  {"q": "A \u20b93cr emergency stand-by generator, expected 12-year service, never yet used:", "o": ["inventory \u2014 it is \"spare\"", "PPE \u2014 stand-by equipment used over more than one period qualifies, and depreciation runs on availability of service capacity, not on it being switched on", "expense now, asset when first started", "investment property, as it appreciates"], "a": 1, "w": "duration of service, not motion, governs; stand-by equipment is PPE with a running clock."},
  {"q": "Which landing is WRONG for the fence?", "o": ["factory shed used by the owner \u2014 Ind AS 16", "mango orchard \u2014 the RIPENING MANGOES are PPE under Ind AS 16 \u2014 wrong: bearer TREES are PPE but produce on them is Ind AS 41 agriculture; the fence runs at the fruit", "warehouse held to earn rent \u2014 Ind AS 40", "leased truck the company controls \u2014 Ind AS 116 ROU"], "a": 1, "w": "the twist: trees inside Ind AS 16, fruit inside Ind AS 41."},
],
"dp2": [
  {"q": "The \u20b959L canon includes:", "o": ["everything the factory paid anyone during the installation quarter", "net price 48 + duty 4 + freight 1 + site prep 0.5 + installation 1.5 + testing 2 + dismantling provision 2 \u2014 with IGST (creditable), training, ceremony, admin overheads, abnormal breakage and early operating losses marched straight to P&L", "list price 50 plus every tax on the invoice", "price plus financing interest for the next five years"], "a": 1, "w": "the cage is net-price-plus-attributable-plus-provision; the exclusion wall keeps the rest out."},
  {"q": "Under the 2022 amendment, \u20b90.5L from selling test-run cartons:", "o": ["reduces the cost of the press", "is recognized in P&L as revenue/income with matching production cost \u2014 proceeds before intended use no longer net against the asset, so the cost cage keeps the full \u20b92L testing cost", "sits in a reserve until warranty expiry", "reduces testing cost but not installation cost"], "a": 1, "w": "amendment doctrine: proceeds meet P&L, the cage stays whole."},
  {"q": "A \u20b93L present-value reinstatement obligation on the leased shed at installation day:", "o": ["expense it when the lease ends", "adds to the press cost with a matching Ind AS 37 provision \u2014 the obligating event is installation; the slice then depreciates with the asset while the provision unwinds through finance cost", "ignore until year five", "add to repairs expense"], "a": 1, "w": "para 16(c) \u00d7 Ind AS 37: day-one provision inside cost, discount unwinding in finance cost."},
],
"dp3": [
  {"q": "Para 43 requires separate depreciation for:", "o": ["every bolt and cable individually", "each part of an item whose cost is SIGNIFICANT relative to total and whose useful life differs from the rest \u2014 the \u20b990L crane splits into five clocks summing to \u20b97.3L/yr, while the jib-crane class stays whole because significance fails", "only parts above \u20b91 crore", "parts the vendor prices separately on the invoice only"], "a": 1, "w": "significance plus life-difference trigger the split; materiality decides when to stop."},
  {"q": "Composite one-line life of 15 years on the \u20b990L crane understates year-one depreciation by:", "o": ["\u20b91.3L through faster residual recognition", "90/15 = \u20b96.0L vs component script \u20b97.3L \u2192 understatement \u20b91.3L, profit dressed up by the same amount, with the bill arriving as a disposal loss when the \u20b922.5L hoist dies at year nine with book value still attached", "nothing \u2014 methods do not matter", "\u20b94.5L"], "a": 1, "w": "\u20b91.3L/yr of phantom profit, ending in a staged disposal \"surprise\" that was nine years of short charging."},
  {"q": "The \u20b94L statutory overhaul every 4 years is:", "o": ["expensed when incurred as repairs", "capitalized as a REPLACEMENT component \u2014 the embedded first inspection is sliced out at acquisition (\u20b94L slice, \u20b91L/yr), each new overhaul renews the component at \u20b94L and the old sliver is derecognized; the current-cost proxy estimates the embedded slice when history is silent", "added to the structure's 30-year clock", "parked as inventory until used"], "a": 1, "w": "inspections ride inside the asset as replaceable components with their own clock."},
],
"dp4": [
  {"q": "The canon's WDB rate of ~25% is:", "o": ["lifted from the tax rules", "derived \u2014 rate = 1 \u2212 (residual \u00f7 cost)^(1 \u00f7 life) = 1 \u2212 (6 \u00f7 60)^(1 \u00f7 8) = 25.01%, so the clock lands the book at the \u20b96L residual by design; rounding conventions get documented, never improvised", "an industry average auditors accept", "whatever keeps year-1 profit smooth"], "a": 1, "w": "the rate is algebra from the residual target, not folklore."},
  {"q": "First-3-year depreciation for the \u20b960L/\u20b96L/8-yr canon compares as:", "o": ["SL ahead because WDB is slower early", "WDB \u20b934.69L vs SL \u20b920.25L \u2014 a \u20b914.4L front-load gap: diminishing charge mirrors assets that fade young, straight-line fits even consumption, and units-of-production meters actual wear at \u20b920/unit", "identical under all methods, only timing differs", "WDB \u20b920.25L vs SL \u20b934.69L"], "a": 1, "w": "front-loading is the feature when benefits fade young; the \u20b914.4L gap is doctrine, not error."},
  {"q": "Remaining-life review \u2014 \u20b940L carrying amount now judged to last 8 years not 4:", "o": ["restate the last four years' accounts", "charge \u20b95L/yr from now, prospectively, with disclosure \u2014 Ind AS 8 governs estimate changes; the past is never reopened, which is exactly why the life-stretch trick earns a radar slot", "credit the \u20b920L saving straight to reserves", "disclose only in year 8"], "a": 1, "w": "estimates move forward-only: \u20b95L/yr prospective, disclosed."},
],
"dp5": [
  {"q": "An upward revaluation of \u20b910L (never-before-revalued asset, 25% tax teaching rate):", "o": ["increases profit by \u20b910L", "is credited to OCI and accumulates in a revaluation surplus in equity \u2014 net \u20b97.5L after recognizing a \u20b92.5L deferred tax liability against OCI \u2014 with P&L receiving exactly \u20b90 (P&L touches such gains only when reversing that asset's earlier P&L-charged decrease)", "increases revenue, disclosed in segment note", "is deferred until the asset is sold"], "a": 1, "w": "OCI plus net-of-tax surplus; profit untouched: the upward stair bypasses earnings."},
  {"q": "Same asset later falls \u20b96L in fair value with \u20b910L gross surplus standing:", "o": ["P&L takes the \u20b96L immediately", "the decrease debits the existing surplus (through OCI) in respect of that same asset \u2192 surplus left \u20b94L, P&L untouched; only a fall EXCEEDING the surviving cushion spills into profit", "deferred tax is also reversed through P&L", "the cost model must be adopted now"], "a": 1, "w": "same-asset cushion absorbs the drop first; only overflow bleeds into P&L."},
  {"q": "The class-election rule exists primarily to:", "o": ["save valuation fees", "block cherry-picking \u2014 revalue your prime land and every parcel in the class follows, so management cannot surf only the winning assets into OCI while parking the losers at cost", "align with Companies Act Schedule II", "keep auditors employed"], "a": 1, "w": "the anti-shopping-cart rule; a class rises or stays, together."},
],
"dp6": [
  {"q": "The para-41 annual transfer equals:", "o": ["the full surplus divided by original cost", "the difference between depreciation on the revalued base and depreciation on historical cost \u2014 \u20b910L minus \u20b98L = \u20b92L/yr here \u2014 moved from surplus to retained earnings INSIDE equity, an equity-to-equity corridor that never crosses P&L", "the deferred tax unwinding", "the impairment reversal for the year"], "a": 1, "w": "transfer = the \u20b92L wedge between revalued and historical depreciation, equity-to-equity only."},
  {"q": "Disposal of the revalued machine: proceeds \u20b932L, current carrying \u20b930L, surplus \u20b94L:", "o": ["gain \u20b912L to P&L, surplus kept forever", "gain \u20b92L to P&L measured against the REBASED carrying amount; the \u20b94L surplus transfers to retained earnings in equity \u2014 uplift was never profit, and its exit never becomes one either (revalue-then-sell scam structurally dead)", "gain \u20b912L to P&L plus \u20b94L surplus to RE", "loss \u20b90, all of it absorbed by surplus"], "a": 1, "w": "\u20b92L P&L gain on the rebased base; surplus walks to RE without touching profit."},
  {"q": "\"Deemed cost\" under Ind AS 101 means:", "o": ["the asset must be revalued every year thereafter", "fair value at the transition date was adopted as the STARTING cost \u2014 a one-time reset, after which the asset lives under the cost model; those flat land values visible across Indian balance sheets are doorways walked once, not a revaluation policy", "any tax-assessed value", "the valuer's insurance estimate"], "a": 1, "w": "one reset at the border, cost model thereafter: deemed cost is history wearing today's value."},
],
"dp7": [
  {"q": "Day-to-day servicing of an existing machine:", "o": ["capitalizes if the contract is annual", "is expensed as incurred (para 12) \u2014 it restores or maintains benefits already counted; the two-gate recognition lock (probable new benefits, reliable cost) is what any spend must pass to join the carrying amount", "capitalizes if above \u20b91L", "is deferred to a maintenance reserve"], "a": 1, "w": "servicing is the rent of ownership, never a new asset."},
  {"q": "The cylinder canon: new \u20b96L, old estimated \u20b94L cost 60% consumed:", "o": ["capitalize \u20b96L and keep the old slice inside the register too", "capitalize \u20b96L AND derecognize the old part's \u20b91.6L carrying amount as a P&L loss \u2014 using the new part's cost as the indicator of the old when history is silent, so no zombie component keeps depreciating after death", "expense \u20b96L and keep the old slice", "capitalize the \u20b91.6L difference only"], "a": 1, "w": "replace-and-bury: \u20b96L in, \u20b91.6L out, estimate ladder for silent histories."},
  {"q": "Which spend capitalizes?", "o": ["repainting and pit-filling the press body", "a control-system upgrade demonstrably raising throughput 12% \u2014 measurable future-benefit enhancement (test 3 passes), versus servicing, compliance cosmetics, and repainting, which all restore the status quo and die in P&L", "the annual preventive-maintenance contract", "safety-guard retrofit with no output or life impact"], "a": 1, "w": "only the throughput upgrade buys measurable future benefit."},
],
"dp8": [
  {"q": "A lathe (carrying \u20b918L) sold and delivered for \u20b922L:", "o": ["revenue \u20b922L, cost of goods sold \u20b918L", "gain \u20b94L in profit or loss \u2014 net proceeds minus carrying amount, dated by the Ind AS 115 control handshake, presented OUTSIDE revenue (other income), because gains on disposal of PPE are forbidden from masquerading as operating revenue", "gain \u20b94L to revaluation surplus", "recognize only when the five-year warranty expires"], "a": 1, "w": "derecognize, net gain to P&L outside revenue: exits are events, not operations."},
  {"q": "Held-for-sale classification trigger + measurement (Ind AS 105):", "o": ["management intention alone; keep depreciating", "available for immediate sale in present condition AND highly probable sale (committed plan, active marketing, reasonable price, completion within one year) \u2192 measure at LOWER of carrying amount and FVLCD, depreciation STOPS \u2014 \u20b925L asset carries at \u20b923L when FVLCD is \u20b923L, never written UP to \u20b928L when the wind improves", "board resolution alone; fair value through OCI", "signed sale agreement only; measure at carrying amount"], "a": 1, "w": "criteria + lower-of + clock-stop: the protocol is exact."},
  {"q": "Burying an abandoned machine (carrying \u20b92L, zero salvage, zero future benefits):", "o": ["keep depreciating quietly for ten years", "the no-future-benefits trigger of para 67 \u2014 derecognize the carrying amount now and recognize the full \u20b92L loss in P&L: no future benefits from use OR disposal means the asset died; delaying the funeral is spreading the smell, and the impairment standard should have spoken even earlier", "reclassify as inventory at \u20b92L", "move to a suspense account"], "a": 1, "w": "the funeral now rule: zero-benefit assets get derecognized, not preserved."},
],
"dp9": [
  {"q": "End of year 1 for the \u20b9100L canon (carrying \u20b980L), FVLCD \u20b958L, VIU \u20b960L:", "o": ["no entry \u2014 depreciation already covers decline", "impairment loss \u20b920L to P&L \u2014 recoverable is the HIGHER of FVLCD and VIU (\u20b960L), carrying falls to \u20b960L, and depreciation re-bases to \u20b915L/yr automatically; indicator-triggered, an event beside the schedule", "write down to \u20b958L, the prudential floor", "reverse \u20b920L to OCI"], "a": 1, "w": "higher-of sets recoverable at \u20b960L; \u20b920L through P&L; the clock re-bases."},
  {"q": "Year 2: recoverable bounces to \u20b990L against carrying \u20b945L:", "o": ["reverse \u20b945L immediately", "reverse only to the no-impairment ceiling \u2014 what carrying would have been (100 \u2212 2 \u00d7 20 = \u20b960L) \u2192 reversal \u20b915L through P&L; capped so a market sneeze can never manufacture profit beyond the frozen schedule", "reverse \u20b930L, matching recovery speed", "no reversals of PPE impairment are ever permitted"], "a": 1, "w": "capped reversal doctrine: \u20b915L only, to the \u20b960L would-have-been line."},
  {"q": "The tower's \u20b930L interest year with a 2-month permit halt and \u20b96L interest income:", "o": ["capitalize all \u20b930L", "capitalize ten months' interest \u20b925L minus \u20b95L income = \u20b920L; the extended-halt window's net \u20b94L expensed \u2014 suspension doctrine: general activity delays capitalize, extended permit fights do not, and commencement needs expenditures plus borrowing plus activity all alive", "expense all \u20b930L to be safe", "capitalize \u20b924L, evenly ignoring the halt"], "a": 1, "w": "\u20b920L in the tower, \u20b94L through P&L: extended halts suspend the ride."},
],
"dp10": [
  {"q": "The \u20b9900cr airliner dep canon:", "o": ["\u20b936cr/yr on a single 25-year composite", "\u20b952.8cr/yr \u2014 airframe 20.8 (520/25) + engines 20.0 (260/13) + interiors 8.0 (64/8) + gear 4.0 (56/14), with heavy checks capitalized as overhaul components; a single composite life would under-charge every year and stage disposal losses at every mid-life refit", "\u20b920.8cr/yr on the airframe only", "whatever smoothes quarter profit"], "a": 1, "w": "four components, four clocks, \u20b952.8cr/yr \u2014 the composite gap is the play's punch."},
  {"q": "In the \u20b912cr own-use office canon the land slice (\u20b94cr):", "o": ["depreciates over 60 years like the structure", "is carved out on relative fair value and is NOT depreciated \u2014 land's useful life is indefinite; the building-side \u20b98cr further components into structure/HVAC/lifts at \u20b940L/yr total, and any floor rented out for yield transfers to Ind AS 40 by purpose, same floor, different standard", "is revalued every year as inventory", "depreciates only when sold"], "a": 1, "w": "land never clocks; purpose moves floors between Ind AS 16 and 40."},
  {"q": "The laptop fleet play teaches that:", "o": ["every device must be componentized by battery/screen", "policy materiality \u2014 a documented capitalization threshold with pooled 3-year clocks (\u20b960L pool, \u20b920L/yr) \u2014 applies the SAME doctrine proportionately: components for airframes, policy for pools; below-threshold items expense without doctrine ever bending", "laptops cannot be PPE at all", "residual value must equal 5% by law everywhere"], "a": 1, "w": "doctrine scales by policy; the jib-crane sheath generalizes to fleets."},
],
"dp11": [
  {"q": "The canonical schedule reconciliation:", "o": ["gross closes at 215, accumulated depreciation at 138", "gross 200 + 45 additions \u2212 30 disposals = \u20b9215cr; accumulated dep 120 + 30 charge \u2212 12 disposals = \u20b9138cr; net \u20b977cr vs opening \u20b980cr \u2014 the note announces an ageing fleet before any ratio runs, and each column must tie to P&L and disposal gains exactly", "gross closes at 200, acc dep at 120", "net block cannot decline with additions present"], "a": 1, "w": "every column is arithmetic with a story; the net decline is the story."},
  {"q": "The radar trio on the canon (revenue \u20b9300cr, net-block-canon \u20b9100cr base, additions \u20b945cr, charge \u20b930cr, acc-dep \u20b9120cr):", "o": ["turnover 0.33x, age 0.25yrs, cover 0.67", "asset turnover 3.0x, average age 4.0 years, capex cover 1.5 \u2014 read TOGETHER: falling turnover + rising age + cover under ~0.8 triangulates the sweating fleet; above ~1.2 sustained reads expansion", "turnover 3x, age 4, cover 0.67", "ratios do not apply to PP&E"], "a": 1, "w": "the triangulated read: 3.0x / 4.0 / 1.5 \u2014 and the trio's joint grammar."},
  {"q": "\"Same project sits in CWIP four years, capitalized interest growing\" most likely signals:", "o": ["careful project management", "CWIP parking \u2014 keeping the asset 'not ready' beyond its capable-of-operating date so that no depreciation ever starts (with interest possibly capitalized past the Ind AS 23 cessation line): the CWIP ageing schedule plus one finish-line question collapses the alibi", "statutory requirement for large projects", "land banking, which is standard"], "a": 1, "w": "parking keeps the clock off; the finish line is capable-of-operating, not inauguration."},
],
"dp12": [
  {"q": "The Clock Audit's corrected memo reads:", "o": ["overstatement \u20b913.9L exactly", "net overstatement \u20b911.4L \u2014 training 3.0 + components 1.3 + uplift-to-OCI 8.0 +bogus-upgrade net 1.6, against ONE counter-entry (held-for-sale dep reversed +2.5): 13.9 \u2212 2.5 = 11.4, profit \u20b968L \u2192 \u20b956.6L, every rupee paragraph-mapped", "understatement \u20b911.4L", "overstatement \u20b98.4L"], "a": 1, "w": "four inflators, one deflator, \u20b911.4L net: the memo in one number."},
  {"q": "Exhibit 3's \u20b98L land uplift could legally have passed through P&L only if:", "o": ["a board resolution said so", "it reversed that same parcel's earlier P&L-charged revaluation decrease \u2014 the corridor door: gains repay P&L debts of the same asset first, never creating fresh income; otherwise class-wide election and OCI-surplus-with-tax own the route", "the valuer were independent", "it were a building, not land"], "a": 1, "w": "the corridor repays old P&L debts; fresh gains never enter as income."},
  {"q": "Exhibit 5's full-year treatment once criteria were met on 1 April:", "o": ["full-year depreciation, write-down \u20b93L", "classify held for sale from 1 April: depreciation STOPS that date (reverse the \u20b92.5L), measure at lower of carrying \u20b925L and FVLCD \u20b925L \u2192 stays \u20b925L, re-present separately; correction ADDS back \u20b92.5L to profit", "keep depreciating until the sale deed signs", "move to inventory and depreciate there"], "a": 1, "w": "criteria day stops the clock; lower-of holds at \u20b925L; P&L gets \u20b92.5L back."},
],
"dt1": [
  {"q": "The \u20b9100L canon (book dep 20, tax dep 25) produces:", "o": ["total tax expense \u20b923.75L, because only current tax is real", "current \u20b923.75L + deferred \u20b91.25L = total \u20b925.00L exactly equal to book profit \u00d7 25% \u2014 timing differences shuffle tax between the current and deferred columns and can never move the lifetime total, because every difference reverses by construction", "total tax expense \u20b926.25L", "only deferred tax, since books rule"], "a": 1, "w": "the invariance law: 23.75 + 1.25 = 25.0 = book \u00d7 25%, timing is a column shuffle."},
  {"q": "A permanent difference \u20b92L (a non-deductible fine):", "o": ["creates a DTA of \u20b90.5L", "flows straight into current tax only \u2014 taxable income 102, tax \u20b925.5L, ETR up from 25.0% to 25.5%; no deferred entry ever, because nothing will reverse: permanents are the one true mover of total tax expense relative to book \u00d7 rate", "creates a DTL of \u20b90.5L", "is ignored in the tax note"], "a": 1, "w": "permanent differences are pure ETR: current-only, no deferred, +0.5 points forever."},
  {"q": "Book profit vs taxable income differ primarily because:", "o": ["accountants make errors the tax office corrects", "two different legislators' objectives \u2014 accrual-true-profit vs statute-driven revenue collection \u2014 produce different MEASUREMENTS, not different truths: timing gaps reverse over asset lives, permanent gaps never do, and Ind AS 12 exists to account for the timing side today", "tax is computed on cash accounting only", "companies hide profit from shareholders"], "a": 1, "w": "two clocks, two honest speeds; deferred tax is the translator."},
],
"dt2": [
  {"q": "Machine: carrying \u20b980L, tax base \u20b960L:", "o": ["deductible TD \u20b920L \u2192 DTA \u20b95L", "taxable TD \u20b920L \u2192 DTL \u20b95L at 25% \u2014 recovering an \u20b980L asset against only \u20b960L of remaining tax deduction means \u20b920L of future taxable flows; the tax sprint already taken is a liability today", "no TD \u2014 both numbers are honest", "DTA \u20b915L on the gap"], "a": 1, "w": "assets: carrying above base = taxable; \u20b920L of future tax = \u20b95L liability."},
  {"q": "Warranty provision \u20b910L, deductible only when paid:", "o": ["DTL \u20b92.5L \u2014 provision grows", "tax base = 10 \u2212 10 = nil \u2192 deductible TD \u20b910L \u2192 DTA \u20b92.5L \u2014 settling the liability later brings a future deduction; for LIABILITIES the map mirrors: carrying above base is deductible, the exact sign-flip of assets", "DTL \u20b92.5L on the future expense", "nothing \u2014 provisions are ignored for tax"], "a": 1, "w": "liabilities mirror: carrying above base = deductible; DTA \u20b92.5L."},
  {"q": "Why is the balance-sheet method strictly more complete than the P&L bridge?", "o": ["it uses bigger numbers", "it catches differences born OUTSIDE profit or loss \u2014 revaluation uplifts in OCI (\u20b910L \u2192 \u20b92.5L DTL riding in OCI) and business-combination step-ups create carrying/base gaps with no income statement trace; the bridge alone would miss them, the balance-sheet camera sees all four cells", "the Act demands balance sheets monthly", "it avoids using tax bases"], "a": 1, "w": "OCI-born and combination-born differences never cross the bridge but always cross the map."},
],
"dt3": [
  {"q": "The recognition asymmetry:", "o": ["both DTA and DTL need probable profits", "DTLs are recognized for ALL taxable temporary differences (narrow exceptions only), while DTAs pass a probable-profit GATE \u2014 liabilities are facts, assets are arguments; the presumption is that asset-recovery always generates the taxable flows the shadow expects", "DTAs are always recognized, DTLs need evidence", "both are optional by policy"], "a": 1, "w": "the asymmetry is the discipline: DTLs presumed, DTAs argued."},
  {"q": "The initial-recognition exemption exists because:", "o": ["small assets don't matter", "recognizing deferred tax on a stand-alone, non-BC purchase that touches neither profit measure would force the asset's cost to gross up against its own DTL endlessly \u2014 an infinite regress; the exemption cuts the knot at birth and ignores that initial difference thereafter", "goodwill requires it", "tax law forbids deferred entries"], "a": 1, "w": "IRE is the anti-recursion clause for stand-alone initial differences."},
  {"q": "A company with three recent loss years wants to recognize a \u20b910L loss DTA:", "o": ["impossible while losses continue in memory", "possible only with CONVINCING evidence beyond the losses themselves \u2014 non-recurring cause (the fire), signed orderbooks, executable tax-planning \u2014 plus reassessment every single balance-sheet date, haircutting or restoring through P&L as probability moves", "automatic \u2014 losses guarantee refunds", "only if auditors agree unanimously"], "a": 1, "w": "recent-loss history raises the evidence bar to convincing, and probation never ends."},
],
"dt4": [
  {"q": "The canon machine's DTL across years 1\u20135 runs:", "o": ["1.25 rising forever \u2014 liabilities never reverse", "1.25, 2.50, 3.75, 5.00, then home to 0.00 \u2014 four \u20b91.25L climbs while tax outpaces book, the \u20b95.0L summit when the tax base hits zero, and full release in year 5 as books catch the spent base; lifetime sum exactly \u20b90, matching the invariance law", "5.00 flat every year", "\u22121.25 (releases) every year"], "a": 1, "w": "climb, summit, homecoming: 1.25 \u2192 5.0 \u2192 0.0, lifetime zero."},
  {"q": "A growing company's machinery DTL keeps rising because:", "o": ["someone is hiding tax", "new cohorts' fresh climbs outweigh old vintages' homecomings \u2014 each asset individually washes to zero, but the fleet of birth-and-death schedules nets upward while capex expands; a capex STOP reverses the snowball as deferred income floods home", "the depreciation rate changed", "tax always exceeds book forever"], "a": 1, "w": "the fleet snowball: births vs homecomings; a capex stop brings the shadows home."},
  {"q": "India's WDV reality (the desi overlay):", "o": ["tax runs straight-line exactly like books", "tax runs WDV blocks \u2014 15% plant, 10% building, 40% computers, 25% intangibles \u2014 pooled, front-loaded, with a HALF-rATE first year for assets used under 180 days (\u20b919.5L vs \u20b917.25L on the canon block), and no component-level interest: the five book components of a crane all swim in one pool, so gap tracking lives at registry level", "intangibles depreciate at 40% WDV", "the half-year rule doubles first-year deduction"], "a": 1, "w": "blocks, pooling, front-loads, and the 180-day half rule: the registry-level reality."},
],
"dt5": [
  {"q": "\u20b98L warranty provision booked at point of sale, nil paid:", "o": ["DTL \u20b92.0L \u2014 provisions build liability", "deductible TD \u20b98L \u2192 DTA \u20b92.0L \u2014 book expense first, tax deduction when claims are serviced; a timing gap by the compass (book first/tax later is DTA for expenses), unwinding to zero in the settlement year, lifetime sum nil", "permanent \u2014 warranties are never deducted", "nothing until next year"], "a": 1, "w": "book-first/tax-later is the DTA cell; settle-year release completes the biography."},
  {"q": "Ind AS ECL \u20b912L vs tax-allowed \u20b94L this year:", "o": ["TD 4 \u2192 DTA 1", "the \u20b98L gap is a deductible TD \u2192 DTA \u20b92.0L \u2014 books provisioning the FUTURE honestly while tax waits for specific default evidence; the same engine explains why Indian banks stack huge provision-linked DTAs, and why DTA-quality after loss years becomes the analyst's first question", "TD 12 \u2192 DTA 3, since tax follows book", "DTL \u20b92.0L on the profitable part"], "a": 1, "w": "expected-loss honesty vs specific-default statute: \u20b98L gap, DTA \u20b92.0L, bank-scale consequences."},
  {"q": "The timing compass for EXPENSES states:", "o": ["tax first always means DTA", "book first, tax later \u2192 DTA; tax first, book later \u2192 DTL \u2014 and incomes run the exact reverse: one couplet sorts every provision, reserve and deferral anywhere, while permanent disallowances (fines, beyond-ceiling donations) carry no timing and no shadow at all", "provisions never create differences", "DTA and DTL labels are interchangeable"], "a": 1, "w": "the couplet is the compass; permanents never enter the shadow ledger."},
],
"dt6": [
  {"q": "Revaluation uplift \u20b910L (tax base unchanged, 25%):", "o": ["DTL \u20b92.5L charged to P&L", "DTL \u20b92.5L charged to OCI beside the surplus \u2014 backwards tracing: the deferred tax shares its parent's stage, so the revaluation pocket stands at \u20b97.5L net and the year's P&L tax line carries no part of it", "DTA \u20b92.5L in OCI", "no deferred entry at all for OCI items"], "a": 1, "w": "hereditary staging: \u20b92.5L rides in OCI, pocket nets to \u20b97.5L."},
  {"q": "The tracing law, complete:", "o": ["all deferred tax goes to P&L for simplicity", "tax follows the item \u2014 deferred tax on items recognized in OCI is recognized in OCI (FVOCI \u20b92.0L, DBO remeasurement-earned DTA \u20b91.5L); items recognized directly in equity trace to equity; P&L parents (depreciation, provisions) trace to P&L; the shadow's home is hereditary", "OCI items are tax-exempt", "the filer may choose per policy"], "a": 1, "w": "P&L/OCI/equity by parent: the tracing law in one breath."},
  {"q": "A rate change remeasures the revaluation-parked DTL downward by \u20b90.3L:", "o": ["credit P&L tax expense", "credit OCI \u2014 the remeasurement obeys the parent's stage too: the revaluation never left OCI, so its shadow's rate-driven haircut stays in OCI; only untraceable historical mixtures default to P&L", "debit OCI", "capitalize against the asset"], "a": 1, "w": "rate changes inherit the parent's stage as well."},
],
"dt7": [
  {"q": "\u20b940L of unused tax losses, gate cleared by convincing evidence:", "o": ["DTL \u20b910L, since losses are liabilities", "DTA \u20b910L recognized through P&L \u2014 losses are future deduction rights at 25%; but the probable-profit gate demands CONVINCING evidence (signed orderbooks, non-recurring cause repaired), and anything unrecognized sits disclosed with its expiry ladder", "nothing \u2014 losses can't create entries", "DTA \u20b940L at 100%"], "a": 1, "w": "the asset born from losing money: coupon rights at 25%, convincingly-evidenced or just disclosed."},
  {"q": "Turnaround year absorbing \u20b924L of the loss pile shows:", "o": ["current tax \u20b924 plus DTA release", "current tax zero on the absorbed slice + deferred tax CHARGE \u20b96L as the DTA steps \u20b910L \u2192 \u20b94L \u2014 total expense still tracking (book + permanent) \u00d7 rate: utilization isn't saving tax twice, it's spending a coupon you already booked as an asset", "current tax \u20b96 with release nil", "MAT credit \u20b96"], "a": 1, "w": "utilization = coupon spent: current zero mirrored by release charge \u20b96L, closing DTA \u20b94L."},
  {"q": "The MAT canon (book \u20b9100L vs regular \u20b98L tax):", "o": ["pay \u20b98L, the lower of the two", "pay \u20b915L (15% of book profit) IN CASH \u2014 inside the MAT machine, and bank the \u20b97L difference as MAT credit with a 15-year fuse, carried as a DTA-family unused tax credit gated by probable future utilization horizons", "pay \u20b923L, both stacked", "file for refund next year automatically"], "a": 1, "w": "MAT makes book profit the floor: pay 15, bank 7, 15-year fuse, utilization-gated."},
],
"dt8": [
  {"q": "The two-condition exemption for subsidiaries:", "o": ["recognize DTL always, no exceptions", "no DTL only if the parent can CONTROL the reversal's timing AND reversal is not probable in the foreseeable future \u2014 the \u20b95cr JV shadow stays unbooked under a genuine no-payout plan and springs onto the books the moment repatriation becomes probable", "no DTL if the child is foreign", "no DTL if dividends are under \u20b910cr"], "a": 1, "w": "control plus improbability: the parent's calendar governs the shadow."},
  {"q": "For associates vs subsidiaries, condition one differs because:", "o": ["associates are small", "a parent DICTATES a subsidiary's dividend policy but only INFLUENCES an associate's \u2014 timing control is the gateway leg; without a shareholders'-agreement mechanism giving you that control (as the amended JV agreement did), the exemption struggles at its first gate before probable-reversal is even tested", "associates have no tax base", "subsidiaries are always exempt"], "a": 1, "w": "influence is not timing control; the JV agreement amendment is the canonical unlock."},
  {"q": "Modern Indian dividend tax architecture:", "o": ["DDT is payable by the distributing company at 15%", "dividends are taxed in the SHAREHOLDER's hands with withholding at source (DDT abolished from FY 2020-21) \u2014 shrinking domestic repatriation shadows for Indian groups, while foreign withholdings, capital gains on stake sales, and branch remittances remain classic outside-basis territory", "dividends are now tax-free entirely", "dividends face only face fine mechanics"], "a": 1, "w": "shareholder-borne now; think jurisdictions, withholdings and exits."},
],
"dt9": [
  {"q": "The plant step-up (FV \u20b9140L, tax base \u20b9100L) at acquisition:", "o": ["IRE applies \u2014 nothing booked", "DTL \u20b910L recognized \u2014 business combinations are carved OUT of the initial-recognition exemption; the shadow is booked inside the goodwill equation, raising goodwill one-to-one: 400 \u2212 (340 \u2212 10) = \u20b970L instead of \u20b960L; the buyer pre-pays the inherited tax in the purchase arithmetic", "DTA \u20b910L against goodwill", "expense \u20b910L immediately"], "a": 1, "w": "carve-out carved where the goodwill equation can absorb the shadow: DTL \u20b910L, goodwill +\u20b910L."},
  {"q": "Recognizing the target's dormant loss DTAs at acquisition (\u20b928L losses \u2192 \u20b97L):", "o": ["is forbidden after the deal closes", "raises net identifiable assets by \u20b97L and SHRINKS goodwill one-to-one (63 vs 70 in the lab chain) whenever group profits make utilization probable \u2014 the data-room exercise every M&A diligence runs; within the measurement window it adjusts goodwill, after it it flows through P&L", "increases the bargain gain", "creates a permanent difference"], "a": 1, "w": "dormant DTAs activated by group probability: net assets +\u20b97L, goodwill \u2212\u20b97L."},
  {"q": "The step-up DTL's four-year unwind means the acquirer's consolidated tax note shows:", "o": ["an unusual new current-tax cost", "\u20b92.5L per year of DEFERRED TAX INCOME as the \u20b910L walks 10 \u2192 7.5 \u2192 5.0 \u2192 2.5 \u2192 0 \u2014 the DT4 homecoming in acquisition costume; a scripted post-deal tailwind analysts should read as acquisition arithmetic, not operating skill", "goodwill shrinking yearly", "fresh DTL every year"], "a": 1, "w": "the unwind annuity: four years of scripted deferred income."},
],
"dt10": [
  {"q": "The Indian domestic rate under 115BAA:", "o": ["25.0% exactly", "22% \u00d7 1.10 surcharge \u00d7 1.04 cess = 25.168% \u2014 and deferred balances are measured at the rate expected to apply in REVERSAL years (the old-regime stack runs ~34.94% for large corporates), which is why every working paper starts by locating the regime and the rate note", "30% flat for all companies", "17.5% with no cess"], "a": 1, "w": "a stapled rate: 25.168% for the BAA world, ~34.94% in the old one; measure at reversal rates."},
  {"q": "A \u20b9120L plant addition used 140 days in year one (15% block):", "o": ["\u20b918L depreciation", "\u20b99L \u2014 the 180-day gate halves the first-year rate for under-180-day usage (120 \u00d7 7.5%); commissioning calendars move tax timing by design, and the DT4 shadow ledger records the postponement", "\u20b9120L written off", "nothing until next year"], "a": 1, "w": "the 180-day gate: half-rate first year, \u20b99L not \u20b918L."},
  {"q": "Section 43B's family operates as:", "o": ["accrual = deductible always", "deduction on actual PAYMENT for welfare/statutory accruals (gratuity \u20b916L unpaid \u2192 DTA \u20b94L teaching canon; dues relaxed only if paid before the return-due window) \u2014 every unpaid slice in the family walks with a DTA tag that melts as money moves", "never deductible at all", "deductible only on audit approval"], "a": 1, "w": "payment-gated deductions with the proviso window; the DTA train follows the unpaid slice."},
],
"dt11": [
  {"q": "Offset permission requires:", "o": ["any nettable vibes", "a legally enforceable right to set off (same entity, same authority) AND net-settlement intent/pattern per future reversal period \u2014 one company under one Act merges to one figure; cross-jurisdiction group members stay in separate columns", "offset whenever DTA > DTL", "offset only annually"], "a": 1, "w": "zoning law for shadows: same authority, same entity, net settlement pattern."},
  {"q": "The enacted rate cut 25% \u2192 22% with the machine family DTL \u20b910L:", "o": ["nothing until reversal years", "remeasure ALL related balances at once: DTL 10 \u2192 8.8, release \u20b91.2L to P&L (OCI-parked shadows remeasure too, to OCI by hereditary staging); legislation reprices the shadow ledger the day it's substantially enacted \u2014 2019's Indian cut printed exactly this income line nation-wide", "expense \u20b91.2L now", "only the current tax rate changes"], "a": 1, "w": "enacted-day repricing: 10 \u2192 8.8, income \u20b91.2L, OCI-parked to OCI."},
  {"q": "On the crown jewel table (500 \u00d7 25% = 125; penalty +2; holiday \u22125; rate remeasure \u22121.2; MAT-credit true-up +3):", "o": ["expense \u20b9125.0L, ETR 25.0%", "expense \u20b9123.8L, ETR 24.76% \u2014 the statutory-to-effective bridge that lists every honest reason (permanents up, holidays down, legislation repricing, true-ups) why real tax differs from naive multiplication; the first table analysts photograph because six lines tell the whole tax story", "expense \u20b9121.8L, ETR 24.4%", "expense \u20b9131.0L, ETR 26.2%"], "a": 1, "w": "\u20b9123.8L at 24.76%: the bridge that converts the tax story into six lines."},
],
"dt12": [
  {"q": "The Shadow Ledger's memo reads:", "o": ["current \u20b922.0L only, deferred is imaginary", "current \u20b922.0L + deferred \u20b99.0L = total \u20b931.0L \u2014 proven live by the invariance theorem ((120 book + 4 permanent) \u00d7 25% = 31.0): bridge 120 \u2192 88 \u2192 current 22.0, columns shuffled by timing families (dep +5.0, warranty \u22122.0, loss release +6.0), permanents alone bending total from 30 to 31", "total \u20b930.0L exactly", "total \u20b935.0L with penalty deferred"], "a": 1, "w": "the invariance proof assembled: \u20b931.0L = (120 + 4) \u00d7 25%, columns and all."},
  {"q": "The closing positions and presentation:", "o": ["DTL 6.5 and DTA 6.0 shown gross always", "DTL gross \u20b96.5L (dep 5.0 P&L-staged + revaluation 1.5 OCI-staged) vs DTA \u20b96.0L (warranty 2.0 + losses 4.0) \u2192 offset conditions met (same entity, same authority, net pattern) \u2192 ONE balance-sheet line: net DTL \u20b90.5L, with staging venues disclosed separately", "net DTA \u20b90.5L", "both zero \u2014 shadows cancel"], "a": 1, "w": "gross 6.5 vs 6.0, zoning offset \u2192 net DTL \u20b90.5L, staging disclosed."},
  {"q": "The enacted 22% drill on this file shows:", "o": ["nothing until next year", "five remeasurements: dep DTL 5.0\u21924.4 (income 0.6), warranty DTA 2.0\u21921.76 (charge 0.24), loss DTA 4.0\u21923.52 (charge 0.48) \u2192 net charge \u20b90.12L to P&L \u2014 while the revaluation 1.5\u21921.32 releases \u20b90.18L into OCI by hereditary staging; one enactment, four venues kept straight", "net income \u20b90.60L", "a fresh \u20b92.0L DTL"], "a": 1, "w": "legislation reprices every shadow in one enactment: P&L net charge \u20b90.12L, OCI release \u20b90.18L."},
],
"cs1": [
  {"q": "Ind AS 110's core command to parents:", "o": ["consolidate only when profitable", "present parent and controlled subsidiaries as ONE economic entity \u2014 every skin's assets, debts and flows combined as the creature, with the minority outsiders shown as NCI inside equity; legal skins remain for courts, the creature reports for investors", "present each company separately with notes", "consolidate only listed children"], "a": 1, "w": "one creature presented as one; NCI inside equity as the honest outsider claim."},
  {"q": "The historic abuse consolidation was built to kill:", "o": ["paying vendors on time", "hiding debt, losses and risk in shell subsidiaries (\"off-balance parks\") so the parent's standalone ratios glowed \u2014 legal-separate skins carrying economic liabilities the commander controlled; the standard substitutes creature-for-form: control decides, substance reports", "recognizing revenue early", "valuing inventory against cost"], "a": 1, "w": "the off-balance-shell trick: killed by substituting creature for legal form."},
  {"q": "The investment-entity exception means a fund-model parent:", "o": ["must consolidate all its portfolio companies", "measures subsidiaries at FVTPL instead of consolidating \u2014 because its whole performance model IS fair value (exit multiples, periodic marks); the creature-as-line-items fiction would destroy information rather than add it", "never has to disclose holdings", "consolidates only unlisted portfolio companies"], "a": 1, "w": "fair-value-model parents FVTPL their subs; line-by-line would hide the model."},
],
"cs2": [
  {"q": "Control under Ind AS 110 requires:", "o": ["holding 51% \u2014 always mechanical", "ALL THREE locks together: power over relevant activities via existing rights with current ability + exposure to variable returns + the link that power can affect your own returns \u2014 any lock failing hands you an associate, JV, or plain investment instead", "a written control agreement", "board seats above half"], "a": 1, "w": "three locks welded; fifty-one percent is the plain case, not the definition."},
  {"q": "Meridian's de facto case (45%, dispersed others, historical meeting dominance) means:", "o": ["no consolidation \u2014 below 50%", "control may well exist DESPITE the minority percentage \u2014 substance reads relative block size + dispersion + demonstrated dominance; reassess every year because a 20% challenger or rising turnout can revoke the verdict without any share changing hands", "consolidate only ex-post after meetings", "significant influence at best"], "a": 1, "w": "de facto power by substance: dominance + dispersion + track record, annually re-argued."},
  {"q": "FundComp's manager goes from agent to principal mainly when:", "o": ["the fee doubles", "its own economic exposure becomes significant (25% co-invest + performance pay) AND kick-out rights turn practically inert (supermajority scattered across 900 holders) \u2014 the link lock flips: power now clearly affects the manager's OWN returns, and the fund consolidates into the manager", "it attends more meetings", "the fund lists its units"], "a": 1, "w": "the agent-to-principal flip rides on returns exposure plus removal practicality."},
],
"cs3": [
  {"q": "The investment-account vanishing act on the canon (\u20b9400cr for 80%, NCI 62, goodwill 152):", "o": ["investment stays plus goodwill added on top", "the \u20b9400cr investment line is extinguished and REPLACED by the child's measured organs (net \u20b9310cr) plus NCI \u20b962cr plus goodwill \u20b9152cr \u2014 a substitution journal, never an additive one; consolidated statements never show \"Investment in ForgeTech\" again from that day", "investment converts directly to goodwill 152", "investment halves to 200"], "a": 1, "w": "substitution geology: organs + NCI + goodwill replace the investment line, once, fully."},
  {"q": "Group policy/date alignment before combination:", "o": ["optional for small gaps", "MANDATORY in substance: children restate to uniform group policies (FIFO\u2192WAC-style) BEFORE combining, and year-end gaps fit inside the 3-month corridor with material gap-transactions patched \u2014 measurement language and calendar aligned before a single line is added", "needed only for foreign children", "only policy, dates may vary freely"], "a": 1, "w": "uniform language (policies) and calendar (dates/corridor) precede combination."},
  {"q": "The parent's separate FS (Ind AS 27):", "o": ["show consolidated detail too", "keep each subsidiary investment at COST (or 109-measurement) with dividend income flowing to its legal P&L \u2014 the skin's statutory file, coexisting with the creature's consolidated statements; every professional quote must say which of the two is being quoted", "measure subsidiaries at FV through OCI only", "eliminate intercompany balances too"], "a": 1, "w": "separate books at cost; consolidated statements beside; quote which, always."},
],
"cs4": [
  {"q": "The two doors on the canon (400 for 80%, NA 300):", "o": ["goodwill 160 both ways", "partial \u2192 NCI \u20b960cr + goodwill \u20b9160cr; full \u2192 NCI \u20b990cr + goodwill \u20b9190cr \u2014 a \u20b930cr fork representing the NCI's share of the whole-pie goodwill, elected PER transaction in the PPA file and living with the creature forever after", "goodwill 60 in full method", "NCI zero under full-goodwill"], "a": 1, "w": "160 vs 190: the fork in one equation, elected once per deal, lived with permanently."},
  {"q": "Full-goodwill's impairment consequence:", "o": ["all impairment hits NCI", "impairment charges allocate between OWNERS and NCI on the profit-sharing basis \u2014 the \u20b980cr hit splits 60/20 on a 75/25 creature \u2014 while the partial-goodwill world charges the whole visible hit to owners (with the gross-up convention disclosed), so the door chosen years earlier decides who absorbs today's bruise", "impairment is prohibited", "NCI exits the balance sheet on impairment"], "a": 1, "w": "full-goodwill splits the bruise by profit-share; partial concentrates it on owners."},
  {"q": "NCI at fair value is hardest to defend when:", "o": ["the sub is listed with liquid trades", "there's NO market evidence \u2014 Level-3 DCF fantasy stacked into a permanent balance-sheet block; defensible NCI fair value runs on hierarchy: quoted liquid prices (control-premium-adjusted), recent stake trades, then techniques with disclosed sensitivities \u2014 a valuer's report missing those answers is the file that returns unsigned", "goodwill is small", "NCI profit share is positive"], "a": 1, "w": "the further the evidence from Level-1 liquid prices, the louder the audit file must speak."},
],
"cs5": [
  {"q": "The attribution canon (S's consolidated profit \u20b942.5cr at 80/20):", "o": ["owners \u20b942.5cr, NCI zero", "owners \u20b934cr and NCI \u20b98.5cr \u2014 comprehensive income splits by entitlement every period, NCI sharing profits AND losses (its balance may even run debit/negative, disclosed without an artificial floor), and the equity walk NCI = open + share \u2212 dividends stays signed and accurate", "owners \u20b98.5cr, NCI \u20b934cr", "all to owners until NCI exits"], "a": 1, "w": "attribution follows entitlement: 34/8.5, with signed NCI walks and negative-balance honesty."},
  {"q": "Buying another 10% of a controlled child for \u20b955cr when that slice carries at \u20b950cr:", "o": ["new goodwill \u20b95cr recognized", "an EQUITY family transaction \u2014 NCI falls \u20b950cr, parent equity absorbs the \u20b95cr premium directly; no goodwill (computed once, at acquisition), no P&L (family trades never tour the income statement): control is binary, and after the gate, percentage-trading moves ownership, not economics", "P&L loss \u20b95cr", "revalue all child assets"], "a": 1, "w": "family trades ride through equity only: premium to reserves, never goodwill, never P&L."},
  {"q": "Selling 10% while keeping control for \u20b970cr over a \u20b960cr carrying slice:", "o": ["gain \u20b910cr to P&L", "NCI rises \u20b960cr and owner's equity credits the \u20b910cr premium \u2014 the mirror family entry; total consolidated equity swells exactly by the cash received, split between the two owner columns, control re-tested after each such slice but the creature intact", "goodwill reduces \u20b910cr", "nothing until dividends"], "a": 1, "w": "the mirror: NCI +60, equity +10 premium, P&L untouched."},
],
"cs6": [
  {"q": "Parent sold goods costing \u20b980L to its sub at \u20b91cr, all unsold at year-end:", "o": ["nothing to do \u2014 one company sold, another bought", "cancel the \u20b91cr internal revenue and COGS, then eliminate the \u20b920L unrealized profit sleeping in the creature's closing inventory (\u20b91cr \u00d7 25/125) and re-anchor stock at \u20b980L \u2014 downstream, so the \u20b920L hits the parent/owners' share 100%; it releases next year when outsiders finally buy", "eliminate only \u20b910L, half", "increase NCI by \u20b920L"], "a": 1, "w": "pairs die, UPP sleeps in stock until outsiders wake it; downstream = owners' wound entirely."},
  {"q": "The DP2 lathe (sold inside the creature at \u20b926L against \u20b920L carrying) meets the workshop:", "o": ["keep the seller's \u20b96L gain \u2014 cash did move", "erase the \u20b96L internal gain AND re-anchor the lathe at \u20b920L creature cost, then claw back the \u20b91.2L/yr of overcharge depreciation (5.2 vs 4.0 at five years) every remaining year \u2014 a standing elimination with a schedule, because a group can never make a profit selling to itself", "eliminate only the gain, leave depreciation", "re-anchor at 24 to split the difference"], "a": 1, "w": "gain erased, basis re-anchored, depreciation clawed \u20b91.2L/yr on a standing schedule."},
  {"q": "Upstream UPP \u20b92cr (sub sold to parent, margin still in parent's stock):", "o": ["eliminate \u20b92cr against owners only", "eliminate 100% against the SUBSIDIARY's results because the fake profit is written on ITS books \u2014 attribution then spreads the wound: owners absorb \u20b91.6cr and NCI absorbs its \u20b90.4cr share, matching how the minority shares every real loss of the child", "eliminate \u20b90.4cr only", "carry to the cash flow only"], "a": 1, "w": "upstream corrections split by attribution: 1.6 owners, 0.4 NCI."},
],
"cs7": [
  {"q": "Goodwill's doctrinal trade under Ind AS:", "o": ["amortized 20 years, no tests", "never amortized \u2014 indefinite life \u2014 but tested for impairment ANNUALLY with or without indicators, because no expiry pattern exists and absence of schedule demands presence of proof; other assets test only on indicators, goodwill alone must prove itself on schedule every single year", "amortized 10 years with annual tests", "tested only when markets crash"], "a": 1, "w": "immortality traded for an annual public trial under Ind AS 36."},
  {"q": "The canon test (carrying \u20b9500cr incl. GW \u20b940cr vs recoverable \u20b9450cr):", "o": ["impair all assets pro-rata", "impairment \u20b950cr \u2014 allocated goodwill FIRST (\u20b940cr gone entire) then \u20b910cr pro-rata to other assets with floors (no asset below its own FVLCD/VIU/zero), and once the halo bleeds it never regrows: goodwill impairment is never reversed, even if the CGU's fortune fully rebounds", "impair \u20b950cr against goodwill only", "no impairment \u2014 use amortization"], "a": 1, "w": "halo first, then pro-rata with floors; and the surrender is forever."},
  {"q": "The assumptions note gets read first because:", "o": ["it has pretty tables", "headroom, WACC-growth pairs and sensitivity are where the next surrender pre-announces \u2014 a CGU whose headroom is eaten by a 0.5% rate clock change or by terminal growth above economy growth is narrating next year's impairment in this year's fine print; rank CGUs by headroom, then cross-examine the optimism", "auditors demand thick notes", "it reveals segment CEOs"], "a": 1, "w": "the fine print carries next year's impairment in draft; headroom ranking plus optimism cross-exam is the protocol."},
],
"cs8": [
  {"q": "Losing control triggers:", "o": ["eliminate 60% proportionately and carry on", "FULL ceremony: derecognize the ENTIRE child (organs, NCI, goodwill \u2014 all 100%), re-ink the retained stake at fair value as a new instrument, recycle OCI as if organs sold directly (CTA \u20b912cr joins P&L too), and report one loud number that measures the ownership chapter's true lifetime result", "no entries until final cash settles", "transfer goodwill to NCI first"], "a": 1, "w": "whole child out, retained in at FV, OCI recycled, one loud lifetime number."},
  {"q": "The canon loud number (420 + 140 + 105 \u2212 525):", "o": ["gain \u20b935cr", "gain \u20b9140cr \u2014 consideration + retained-at-FV + NCI derecognized MINUS the creature's full carrying (net assets + goodwill); the formula's honesty is valuing the whole child at exit against everything the creature held in it, which is exactly the lifetime score the board needed", "loss \u20b9140cr", "gain \u20b9560cr"], "a": 1, "w": "\u20b9140cr: everything received plus kept minus everything carried."},
  {"q": "Gaining control in steps (30% \u2192 70%):", "o": ["associate carrying just rolls into goodwill", "the previously-held interest is REMEASURED to fair value at acquisition with the jump through P&L (\u20b960cr \u2192 \u20b9150cr = \u20b990cr deemed-disposal gain), THEN goodwill computes on the re-measured numbers (200 + 150 + 162 \u2212 540 = \u2212\u20b928cr \u2192 bargain-purchase re-verify): step-up accounting stops stale associate-era bases from polluting acquisition arithmetic", "only the new 40% gets fair-valued", "treat as equity family because we knew the child"], "a": 1, "w": "remeasure first through P&L, then goodwill on fresh numbers; bargain re-verified."},
],
"cs9": [
  {"q": "The equity-method canon (30%, cost \u20b930cr, profit share \u20b96cr, dividend \u20b92cr):", "o": ["carrying \u20b930cr flat, income \u20b92cr", "investment breathes: 30 + 6 \u2212 2 = carrying \u20b934cr, with the P&L holding exactly one associate line \u2014 share of profit \u20b96cr \u2014 while dividends reduce carrying instead of touching income; cost plus share minus returns, the one-line consolidation's entire gearbox", "carrying \u20b936cr, no dividend impact", "nothing until sold"], "a": 1, "w": "the breathing line: carrying 34, income only the \u20b96cr share; dividends shrink the claim."},
  {"q": "Your 30% associate bought your goods with \u20b95cr margin, all in its stock:", "o": ["eliminate 100% like a subsidiary", "eliminate only YOUR share \u2014 30% \u00d7 5 = \u20b91.5cr \u2014 against the investment line: associate territory sits outside the creature's skin, so merely your slice of the internal motion is internal; the subsidiary-style full erasure would invent a boundary outsiders never signed", "eliminate nothing \u2014 arms-length", "expense the margin"], "a": 1, "w": "stakeholder granularity: \u20b91.5cr eliminated, never the full \u20b95cr."},
  {"q": "Associate losses beyond your stake (carrying down to \u20b90):", "o": ["always recognize forever", "STOP at zero unless legal/constructive obligations or guarantees force a liability for the excess \u2014 memo-share the overflow losses, resume profit-share only after they refill; the floor protects silent partners, never guarantors", "impair to negative", "consolidate immediately"], "a": 1, "w": "zero-floor with guarantee teeth; losses memo-park beyond it."},
],
"cs10": [
  {"q": "Foreign-operation translation protocol:", "o": ["everything at average rate", "assets & liabilities at CLOSING rate, income & expenses at transaction/average rates, equity items at historical when formed \u2014 the residual difference between these two-rate walks is not profit or loss anywhere; it parks in OCI inside the CTA bay, silently, for as long as the child remains family", "everything at closing rate", "old rates throughout"], "a": 1, "w": "two rates by design, the residue parked: CTA in OCI until the family tie breaks."},
  {"q": "The \u20b91.25cr CTA canon (12\u00d782 + 1\u00d782.5 vs 13\u00d783):", "o": ["CTA \u20b90 \u2014 rates don't matter", "naive close \u20b91,066.5m against closing-rate \u20b91,079m \u2192 CTA \u20b912.5m = \u20b91.25cr to OCI \u2014 the measurement-residue of translating one honest dollar ledger into rupees at two different dates' rates; NCI claims its attribution slice too, just like profit", "CTA \u20b995m", "P&L loss \u20b912.5m"], "a": 1, "w": "\u20b91.25cr: the plug between the naive walk and the closing-rate truth."},
  {"q": "Selling the US child outright (control lost):", "o": ["CTA stays in OCI forever", "the entire accumulated CTA for THAT operation recycles into P&L inside the ceremony gain/loss \u2014 the bay empties its lifetime residue in one day (CS8's step-three payday), while partial family sales that keep control merely re-attribute slices to NCI without any recycle at all", "CTA shifts to NCI fully", "recycle only 60%"], "a": 1, "w": "disposal recycles the whole bay; family slices re-attribute, nothing recycles."},
],
"cs11": [
  {"q": "The associate's \u20b912cr share of consolidated profit in the group cash flow:", "o": ["leave it inside operating cash inflows", "back it OUT of operating as a non-cash item \u2014 the share of profit is accrual arithmetic that never moved a rupee; the only cash truth an associate delivers is the dividend actually received, which reports in investing as a return on investment", "deduct it inside financing", "split it half-and-half across sections"], "a": 1, "w": "share of profit is non-cash accrual; only received dividends are cash, and they invest."},
  {"q": "Dividends paid to NCI holders, \u20b92cr:", "o": ["operating outflow \u2014 minorities are outsiders", "FINANCING outflow, sitting beside the \u20b930cr paid to the parent's own shareholders \u2014 NCI holders are equity holders of the group, and distributions to ANY equity family member are financing by the logic of who owns the pie, not who runs the kitchen", "deduct them from the associate line", "never disclosed"], "a": 1, "w": "NCI is equity family; its dividends finance, never operate."},
  {"q": "ForgeTech bought for \u20b9400cr cash, the child holding \u20b925cr at closing:", "o": ["investing \u2212\u20b9400cr, then a separate +\u20b925cr inflow", "a single investing line of \u2212\u20b9375cr \u2014 consideration NET of cash acquired, because buying the child's cash with your own money is not an investment; the gross components live in the notes, the face shows the honest net physics", "financing outflow \u20b9400cr", "operating outflow \u20b9375cr"], "a": 1, "w": "net-of-cash single line: \u2212\u20b9375cr, gross detail in the notes."},
],
"cs12": [
  {"q": "The acquisition-day grid \u2014 80% for \u20b9400cr, net assets \u20b9280cr book + \u20b940cr brand \u2212 \u20b910cr DTL, proportionate policy:", "o": ["NCI \u20b9100cr at the parent's implied whole, goodwill \u20b9190cr", "net assets at fair value \u20b9310cr \u2192 NCI \u20b962cr, goodwill \u20b9152cr \u2014 consideration + NCI \u2212 identifiable net assets at FV: the Stepmother enters at her share of the identifiable pie, goodwill is what remains of the \u20b9400cr after both claims are seated, and the premium-polluted \u20b9100cr is the fork the policy file rejected", "NCI \u20b956cr on book value, goodwill \u20b9146cr", "NCI \u20b977.5cr, goodwill \u20b9167.5cr"], "a": 1, "w": "NCI \u20b962cr on proportionate identifiable net assets, goodwill \u20b9152cr; parity and book bases are the classic fouls."},
  {"q": "Tonight's weave \u2014 parent \u20b9100cr with \u20b98cr dividend inside, child \u20b950cr, deal stack 10 and 2.5, downstream UPP \u20b94cr:", "o": ["group \u20b9150cr, owners \u20b9140cr, NCI \u20b910cr", "group \u20b9130.5cr, owners \u20b9122.0cr, NCI \u20b98.5cr \u2014 92.0 + 42.5 \u2212 4.0, with attribution taking 20% of the child's ADJUSTED \u20b942.5cr (the deal stack flows to her too), closing 122.0 + 8.5 = 130.5 and reconciling to the naive \u20b9150cr through the fully narrated \u20b919.5cr gap", "group \u20b9134.5cr, owners \u20b9126.0cr, NCI \u20b98.5cr", "group \u20b9128cr, owners \u20b9120cr, NCI \u20b98cr"], "a": 1, "w": "92.0 + 42.5 \u2212 4.0 = 130.5 group; NCI 8.5 on adjusted profit; owners 122.0; both close-checks pass."},
  {"q": "The board's offer \u2014 sell 55 of 80 points for \u20b9420cr, retain 25% at \u20b9140cr fair value, net assets \u20b9525cr, goodwill \u20b9152cr, CTA \u20b94cr credit, NCI \u20b972cr:", "o": ["a gain of \u20b919cr \u2014 sign immediately", "a LOSS of \u20b941cr \u2014 (420 + 140 + 72 + 4) \u2212 (525 + 152) = 636 \u2212 677: the ceremony promises truth, not a gain, and tonight truth says decline, hold above the \u20b9461cr neutral price, and reopen at 480-plus", "exactly zero \u2014 proceed neutrally", "a loss of \u20b9113cr"], "a": 1, "w": "\u20b941cr loss at 420: truth, not a gain; the floor is \u20b9461cr and the memo declines."},
],
"m10": [





  {"q":"Why LASTDATE() for balance-sheet items?",
   "o":["it caches faster","balances are stocks at a point in time — adding months double-counts money","it formats dates","LASTDATE sums better"],"a":1,
   "w":"Flows (sales) sum over time; stocks (cash balances) must be read at period END — semi-additive logic."},
  {"q":"Cost variance is FAVOURABLE when…",
   "o":["actual > budget","actual < budget","actual = 0","budget = 0"],"a":1,
   "w":"For costs, under-budget = good. Revenue works the opposite way — sign logic flips per Type."},
  {"q":"Which visual bridges Budget → Volume → Price → Actual?",
   "o":["funnel","waterfall","ribbon","map"],"a":1,
   "w":"The waterfall is the CFO's favourite: it decomposes the journey from one number to another."}],
"x6": [
  {"q":"PMT(9.5%/12, 60, -5000000) returns…",
   "o":["the interest rate","the monthly EMI of the loan","total interest","the principal"],"a":1,
   "w":"PMT computes the constant periodic payment; IPMT/PPMT split each EMI into interest vs principal."},
  {"q":"Year-0 outlay is added OUTSIDE NPV() because…",
   "o":["NPV can't take negatives","it's already at present value — NPV() discounts future flows only","Excel bug","IRR requires it"],"a":1,
   "w":"NPV(rate, y1..y5) - initial_outlay is the correct construction; discounting today double-penalises."},
  {"q":"XIRR vs IRR:",
   "o":["identical","XIRR uses actual irregular dates; IRR assumes even periods","IRR uses dates","XIRR is slower"],"a":1,
   "w":"Real cash flows arrive on real dates — XNPV/XIRR are the honest pair."}],
"p5": [
  {"q":"Sign conventions (credit-negative etc.) should be fixed…",
   "o":["in every DAX measure","once, in one conditional column in the staged query","in the visuals","never"],"a":1,
   "w":"One SignedAmount step → downstream math stays natural (Income − Costs). Fix once, audit easily."},
  {"q":"Actual ⟷ Budget merge uses…",
   "o":["Left join on Month","FULL OUTER on MonthStart + AccountCode","Inner on AccountName","Append"],"a":1,
   "w":"Budget-without-spend and spend-without-budget both exist — dropping either creates wrong variances."},
  {"q":"Fill Down on daily FX simulates…",
   "o":["deleting weekends","LOCF — last observed rate carried over non-trading days","averaging","rounding"],"a":1,
   "w":"Markets close on weekends; finance logic carries the last known rate forward."}],
"x1": [
  {"q":"To lock a reference so it never moves when copied, write it as…",
   "o":["A1","$A$1","A$1$","=A1!"],"a":1,
   "w":"$A$1 is absolute. Press F4 while editing to cycle $A$1 → A$1 → $A1 → A1."},
  {"q":"21-Jul-2026 is stored internally as…",
   "o":["text","days since 1-Jan-1900 (serial)","a special date string","#VALUE!"],"a":1,
   "w":"Dates are serial numbers — which is why date+7 adds a week and A2-A1 gives days between."},
  {"q":"Ctrl+E in Excel triggers…",
   "o":["Flash Fill","Filter","Format Cells","Evaluate Formula"],"a":0,
   "w":"Flash Fill detects your example pattern and fills the rest — splits/merges with zero formulas."}],
"x2": [
  {"q":"Correct SUMIFS argument pattern:",
   "o":["SUMIFS(range, criteria, sum_range)","SUMIFS(sum_range, crit_range1, crit1, …)","SUMIFS(crit1, sum_range)","SUMIFS(sum_range, crit1) only"],"a":1,
   "w":"SUMIFS takes the SUM range FIRST (unlike SUMIF, where it's last). Classic interview gotcha."},
  {"q":"XLOOKUP is safer than VLOOKUP by default because…",
   "o":["it's faster","exact match is the default (no FALSE needed) and it looks any direction","it ignores errors","it's newer"],"a":1,
   "w":"VLOOKUP defaults to approximate match unless you pass FALSE — the classic silent-wrong-answer bug."},
  {"q":"Bulletproof pattern for A/B:",
   "o":["=A2/B2","=IFERROR(A2/B2,\"\")","=ROUND(A2/B2)","=IF(B2=0)"],"a":1,
   "w":"IFERROR catches #DIV/0! and friends; pair with IF guards when blank isn't desired."}],
"x3": [
  {"q":"Which is NOT a Table (Ctrl+T) superpower?",
   "o":["structured references","auto-expansion on new rows","automatic macros","total row + filters"],"a":2,
   "w":"Tables handle structure & references; macros live in VBA-land (.xlsm)."},
  {"q":"TRIM vs CLEAN:",
   "o":["identical","TRIM removes spaces; CLEAN removes non-printable characters","TRIM formats dates","CLEAN removes spaces only"],"a":1,
   "w":"Chain both on imported data: invisible chars break lookups as often as spaces do."},
  {"q":"Whole-row conditional formatting formula uses:",
   "o":["=$F2 — column locked, row free","=F$2","=$F$2","=F2"],"a":0,
   "w":"Lock the COLUMN ($F) so each row's rule checks that row's F cell."}],
"x4": [
  {"q":"After editing pivot source data you must…",
   "o":["restart Excel","Refresh (Alt+F5) — pivots cache","rebuild the pivot","close/reopen"],"a":1,
   "w":"Pivots cache results; source edits flow in only after Refresh (or 'refresh on open')."},
  {"q":"Show Values As → 'Difference From' (previous month) yields…",
   "o":["an error","period-over-period delta (MoM/QoQ growth) without formulas","the average","a ranking"],"a":1,
   "w":"One dialog replaces pages of YoY/MoM formulas."},
  {"q":"Secondary axis on a combo chart is needed when…",
   "o":[">3 series","two series use very different scales (₹ vs %)","you want pie charts","always"],"a":1,
   "w":"Otherwise the small-scale series flattens along zero."}],
"x5": [
  {"q":"MATCH(x, range, 1) finds…",
   "o":["exact match","largest value ≤ x (ascending data — tiers/bands)","smallest value","column number"],"a":1,
   "w":"Type 1 = price tiers/slabs on ascending data; type 0 = exact; -1 = smallest ≥."},
  {"q":"In 365, B2# refers to…",
   "o":["a comment","the entire spilled result of B2's dynamic-array formula","an error","a named range"],"a":1,
   "w":"#SPILL! means the spill is blocked; # alone (B2#) reads the whole dynamic result."},
  {"q":"Macros must be saved as…",
   "o":[".xlsx",".xlsm",".csv",".pdf"],"a":1,
   "w":".xlsx strips macros; .xlsm keeps VBA. Only enable macros from files you trust."}],
"res": [
  {"q":"PL-300 passing score and annual obligation:",
   "o":["500/1000, lifetime cert","700/1000, free online renewal every year","1000/1000, never renew","No score, interview only"],"a":1,
   "w":"700 to pass; associate certifications renew FREE online annually via Microsoft Learn."},
  {"q":"The single fastest way to deepen mastery after the course:",
   "o":["Rewatch all modules","Answer forum questions + explain concepts to others (teaching)","Buy more courses","Change careers"],"a":1,
   "w":"Teaching exposes fuzzy knowledge instantly — the 60-day treadmill builds on this."},
  {"q":"In interviews, 'row vs filter context' will…",
   "o":["Rarely come up","Almost certainly be asked — answer aloud, precisely","Only be asked for Fabric roles","Be a trick question"],"a":1,
   "w":"It's THE DAX interview gate. Practice your spoken answer until it's crisp."}],
}

KW = ("ADDCOLUMNS|ALL|ALLEXCEPT|ALLSELECTED|AVERAGE|AVERAGEX|BLANK|CALCULATE|CALCULATETABLE|CALENDAR|COALESCE|"
      "CONCATENATEX|COUNT|COUNTROWS|COUNTX|CROSSFILTER|DATEADD|DATESBETWEEN|DATESINPERIOD|DISTINCT|DISTINCTCOUNT|"
      "DIVIDE|EXCEPT|FILTER|FIRST|FORMAT|GENERATE|HASONEVALUE|IF|IGNORE|INTERSECT|ISBLANK|ISFILTERED|ISINSCOPE|KEEPFILTERS|"
      "LAST|LASTDATE|LOOKUP|MAXX|MIN|MINX|MONTH|MOVINGAVERAGE|NEXT|NOT|PREVIOUS|PREVIOUSMONTH|QUARTER|RANKX|RANGE|"
      "RELATED|RELATEDTABLE|REMOVEFILTERS|RETURN|ROW|RUNNINGSUM|SAMEPERIODLASTYEAR|SELECTEDMEASURE|SELECTEDVALUE|"
      "SUM|SUMMARIZE|SUMMARIZECOLUMNS|SUMX|SWITCH|TOPN|TOTALMTD|TOTALQTD|TOTALYTD|TREATAS|USERELATIONSHIP|USERPRINCIPALNAME|"
      "VALUES|VAR|WEEKDAY|YEAR|Let|In|Each|Table\.[A-Za-z]+|Text\.[A-Za-z]+|try|otherwise|true|false")

def hl_code(code, lang):
    esc = html.escape(code)
    if lang.lower() in ("dax", "powerquery", "m", ""):
        esc = re.sub(r"(&quot;[^&]*?&quot;)", r'<span class="st">\1</span>', esc)
        esc = re.sub(r"(--[^\n]*)", r'<span class="cm">\1</span>', esc)
        esc = re.sub(r"\b(" + KW + r")\b", r'<span class="kw">\1</span>', esc, flags=re.IGNORECASE)
    return esc

def slugify(t):
    return re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")[:40]

_B64 = {}
def audio_embed(url, label):
    path = os.path.join(BASE, url)
    if not os.path.isfile(path):
        return '<a href="%s" target="_blank" rel="noopener">%s</a>' % (url, label)
    if url not in _B64:
        with open(path, "rb") as f:
            _B64[url] = base64.b64encode(f.read()).decode("ascii")
    return ('<span class="aud"><span class="audcap">%s</span>'
            '<audio controls preload="none" src="data:audio/mpeg;base64,%s"></audio></span>' % (label, _B64[url]))


def inline(text):
    text = text.replace("\\*", "\x01")
    codes = []
    def stash(m):
        codes.append(html.escape(m.group(1)))
        return "\x00%d\x00" % (len(codes) - 1)
    text = re.sub(r"`([^`]+)`", stash, text)
    text = html.escape(text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<![\w*])\*([^*\n]+)\*(?!\w)", r"<em>\1</em>", text)
    def link_repl(m):
        label, url = m.group(1), m.group(2).strip()
        if url.lower().endswith(".mp3"):
            return audio_embed(url, label)
        return '<a href="%s" target="_blank" rel="noopener">%s</a>' % (url, label)
    text = re.sub(r"\[([^\]]+)\]\((https?://[^)\s]+|[^)\s]+)\)", link_repl, text)
    text = re.sub(r"\x00(\d+)\x00", lambda m: "<code>" + codes[int(m.group(1))] + "</code>", text)
    return text.replace("\x01", "*")

def md_to_html(md, sid):
    lines = md.split("\n")
    out, i, stack, para, h2n = [], 0, [], [], 0
    def flush_para():
        if para:
            out.append("<p>" + inline(" ".join(para)) + "</p>"); para.clear()
    def flush_lists():
        while stack: out.append("</%s>" % stack.pop()[1])
    while i < len(lines):
        line = lines[i]
        if line.strip().startswith("```"):
            flush_para(); flush_lists()
            lang = line.strip()[3:].strip()
            code = []; i += 1
            while i < len(lines) and not lines[i].strip().startswith("```"):
                code.append(lines[i]); i += 1
            label = html.escape(lang) if lang else "code"
            out.append('<div class="codewrap"><div class="codetop"><span class="dots"><i></i><i></i><i></i></span>'
                       '<span class="clang">%s</span></div><pre><code>%s</code></pre></div>'
                       % (label, hl_code("\n".join(code), lang)))
            i += 1; continue
        s = line.strip()
        if not s:
            flush_para(); flush_lists(); i += 1; continue
        if s.startswith("|") and i + 1 < len(lines) and re.match(r"^\s*\|?[\s:\-|]+\|?\s*$", lines[i + 1]):
            flush_para(); flush_lists()
            def cells(r): return [c.strip() for c in r.strip().strip("|").split("|")]
            header = cells(s); i += 2; rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                rows.append(cells(lines[i])); i += 1
            t = ['<div class="tbl"><table><thead><tr>' + "".join("<th>%s</th>" % inline(c) for c in header) + "</tr></thead><tbody>"]
            for r in rows:
                r = (r + [""] * len(header))[:len(header)]
                t.append("<tr>" + "".join("<td>%s</td>" % inline(c) for c in r) + "</tr>")
            t.append("</tbody></table></div>")
            out.append("".join(t)); continue
        m = re.match(r"^(#{1,4})\s+(.*)$", s)
        if m:
            flush_para(); flush_lists()
            lvl = len(m.group(1)); txt = m.group(2)
            if lvl == 2:
                h2n += 1
                out.append('<h2 id="%s-h%d">%s</h2>' % (sid, h2n, inline(txt)))
            else:
                out.append("<h%d>%s</h%d>" % (lvl, inline(txt), lvl))
            i += 1; continue
        if re.fullmatch(r"-{3,}", s):
            flush_para(); flush_lists(); out.append("<hr>"); i += 1; continue
        if s.startswith(">"):
            flush_para(); flush_lists()
            out.append("<blockquote>" + inline(s.lstrip("> ")) + "</blockquote>"); i += 1; continue
        mc = re.match(r"^(\s*)[-+*]\s+\[ \]\s+(.*)$", line)
        m = re.match(r"^(\s*)([-+*])\s+(.*)$", line)
        m2 = None if (m or mc) else re.match(r"^(\s*)(\d+)[.)]\s+(.*)$", line)
        if mc or m or m2:
            flush_para()
            g = mc or m or m2
            indent = len(g.group(1)); tag = "ul" if not m2 else "ol"
            if not stack or indent > stack[-1][0]:
                out.append("<%s>" % tag); stack.append((indent, tag))
            else:
                while stack and indent < stack[-1][0]:
                    out.append("</%s>" % stack.pop()[1])
                if stack and stack[-1][1] != tag:
                    out.append("</%s>" % stack.pop()[1]); out.append("<%s>" % tag); stack.append((indent, tag))
                if not stack:
                    out.append("<%s>" % tag); stack.append((indent, tag))
            if mc:
                key = sid + "-" + hashlib.md5(g.group(2).encode()).hexdigest()[:8]
                out.append('<li class="chk"><label><input type="checkbox" data-ck="%s"><span></span> %s</label></li>'
                           % (key, inline(g.group(2))))
            else:
                out.append("<li>" + inline((m or m2).group(3)) + "</li>")
            i += 1; continue
        para.append(s); i += 1
    flush_para(); flush_lists()
    return "\n".join(out)

# ---------------- build ----------------
parts, home_cards, nav_items = [], [], []
_gcur = "pbi"
_nav_groups = {"pbi": [], "excel": [], "pq": [], "sql": [], "tb": [], "py": [], "st": [], "viz": [], "ts": [], "eng1": [], "eng2": [], "eng3": [], "eng4": [], "eng5": [], "eng6": [], "eng7": [], "eng8": [], "eng9": [], "eng10": [], "eng11": [], "avg": [], "blood": [], "di": [], "pct": [], "lr": [], "ns": [], "pp": [], "pb": [], "pl": [], "ra": [], "si": [], "sy": [], "sd": [], "tw": [], "ac": [], "cf": [], "bf": [], "dv": [], "fa": [], "fi": [], "in2": [], "ec": [], "pm": [], "rt": [], "tv": [], "wm": [], "cb": [], "ia": [], "rr": [], "ls": [], "ic": [], "dp": [], "dt": [], "cs": []}
_nav_counts = {"pbi": 0, "excel": 0, "pq": 0, "sql": 0, "tb": 0, "py": 0, "st": 0, "viz": 0, "ts": 0, "eng1": 0, "eng2": 0, "eng3": 0, "eng4": 0, "eng5": 0, "eng6": 0, "eng7": 0, "eng8": 0, "eng9": 0, "eng10": 0, "eng11": 0, "avg": 0, "blood": 0, "di": 0, "pct": 0, "lr": 0, "ns": 0, "pp": 0, "pb": 0, "pl": 0, "ra": 0, "si": 0, "sy": 0, "sd": 0, "tw": 0, "ac": 0, "cf": 0, "bf": 0, "dv": 0, "fa": 0, "fi": 0, "in2": 0, "ec": 0, "pm": 0, "rt": 0, "tv": 0, "wm": 0, "cb": 0, "ia": 0, "rr": 0, "ls": 0, "ic": 0, "dp": 0, "dt": 0, "cs": 0}
RAW_MD = {}

for idx, (fname, sid, label, icon, desc) in enumerate(ALL_SECTIONS):
    raw = open(os.path.join(BASE, fname), encoding="utf-8").read()
    body = md_to_html(raw, sid)
    RAW_MD[sid] = raw
    words = len(re.sub(r"<[^>]+>", " ", body).split())
    rt = max(4, round(words / 180))
    quizzone = ('<div class="quizzone" data-qz="%s"></div>' % sid) if sid in QUIZZES else ""
    # server-generated prev / next (no JS needed)
    prev_id, prev_lbl = ("home", "🏠 Home") if idx == 0 else (ALL_SECTIONS[idx-1][1], ALL_SECTIONS[idx-1][2])
    if idx < len(ALL_SECTIONS) - 1:
        next_id, next_lbl = ALL_SECTIONS[idx+1][1], ALL_SECTIONS[idx+1][2]
    else:
        next_id, next_lbl = ("home", "🏠 Home")
    pn = ('<nav class="pn"><label class="pnl" for="r-%s">← %s</label><label class="pnl" for="r-%s">%s →</label></nav>'
          % (prev_id, html.escape(prev_lbl), next_id, html.escape(next_lbl)))
    parts.append(
        '<section class="lesson" id="%s" data-title="%s">'
        '<div class="secmeta"><span class="chip">%s %s</span><span class="chip ghost">⏱ ~%d min read</span>'
        '<button class="chipbtn notesb" data-notes="%s">📝 Notes</button><button class="chipbtn mdl-sec" data-md="%s">📄 Markdown</button></div>\n%s\n%s\n%s\n'
        '<div class="lesson-foot"><button class="done-btn" data-id="%s"><span class="dbi">✔</span> Mark as complete</button></div>'
        "</section>" % (sid, html.escape(label), icon, html.escape(label), rt, sid, sid, body, quizzone, pn, sid))
    home_cards.append(
        '<label class="card" for="r-%s" data-goto="%s"><span class="cicon">%s</span><b>%s</b><small>%s</small>'
        '<span class="cdone" data-cdone="%s"></span></label>' % (sid, sid, icon, label, desc, sid))
    if sid == "roadmap":
        _gcur = "pbi"
    if sid == "x1":
        _gcur = "excel"
    if sid == "p1":
        _gcur = "pq"
    if sid == "s1":
        _gcur = "sql"
    if sid == "t1":
        _gcur = "tb"
    if sid == "y1":
        _gcur = "py"
    if sid == "z1":
        _gcur = "st"
    if sid == "v1":
        _gcur = "viz"
    if sid == "w1":
        _gcur = "ts"
    if sid == "e1":
        _gcur = "eng1"
    if sid == "n1":
        _gcur = "eng2"
    if sid == "b1":
        _gcur = "eng3"
    if sid == "l1":
        _gcur = "eng4"
    if sid == "r1":
        _gcur = "eng5"
    if sid == "d1":
        _gcur = "eng6"
    if sid == "g1":
        _gcur = "eng7"
    if sid == "i1":
        _gcur = "eng8"
    if sid == "a1":
        _gcur = "eng9"
    if sid == "h1":
        _gcur = "eng10"
    if sid == "f1":
        _gcur = "eng11"
    if sid == "av1":
        _gcur = "avg"
    if sid == "br1":
        _gcur = "blood"
    if sid == "di1":
        _gcur = "di"
    if sid == "pc1":
        _gcur = "pct"
    if sid == "lr1":
        _gcur = "lr"
    if sid == "ns1":
        _gcur = "ns"
    if sid == "pp1":
        _gcur = "pp"
    if sid == "pb1":
        _gcur = "pb"
    if sid == "pl1":
        _gcur = "pl"
    if sid == "ra1":
        _gcur = "ra"
    if sid == "si1":
        _gcur = "si"
    if sid == "sy1":
        _gcur = "sy"
    if sid == "sd1":
        _gcur = "sd"
    if sid == "tw1":
        _gcur = "tw"
    if sid == "ac1":
        _gcur = "ac"
    if sid == "cf1":
        _gcur = "cf"
    if sid == "bf1":
        _gcur = "bf"
    if sid == "dv1":
        _gcur = "dv"
    if sid == "fa1":
        _gcur = "fa"
    if sid == "fi1":
        _gcur = "fi"
    if sid == "in21":
        _gcur = "in2"
    if sid == "ec1":
        _gcur = "ec"
    if sid == "pm1":
        _gcur = "pm"
    if sid == "rt1":
        _gcur = "rt"
    if sid == "tv1":
        _gcur = "tv"
    if sid == "wm1":
        _gcur = "wm"
    if sid == "cb1":
        _gcur = "cb"
    if sid == "ia1":
        _gcur = "ia"
    if sid == "rr1":
        _gcur = "rr"
    if sid == "ls1":
        _gcur = "ls"
    if sid == "ic1":
        _gcur = "ic"
    if sid == "dp1":
        _gcur = "dp"
    if sid == "dt1":
        _gcur = "dt"
    if sid == "cs1":
        _gcur = "cs"
    _nav_groups[_gcur].append(
        '<li data-s="%s"><div class="navrow"><label class="navlink" for="r-%s"><span class="ni">%s</span><span class="lbl">%s</span>'
        '<span class="tick" data-tick="%s"></span></label>'
        '<button class="mdl" data-md="%s" title="View Markdown">MD</button></div></li>'
        % (sid, sid, icon, html.escape(label), sid, sid))
    _nav_counts[_gcur] += 1

HOME = """
<section class="lesson show" id="home">
<div class="hero">
 <div class="blob b1"></div><div class="blob b2"></div>
 <div class="hero-in">
  <div class="kicker">🎓 PERSONAL LEARNING ACADEMY · SELF-PACED · OFFLINE</div>
  <h1>Skill Academy<br><span>Zero → World-Class Expert</span></h1>
  <p>Five umbrellas now — 🎓 <b>BUSINESS ANALYTICS</b> (9 courses: Power BI · Excel · Power Query · SQL · Tableau · Python · Statistics · Data Viz · Time Series) · 🗣️ <b>ENGLISH</b> (11 courses: Basic to Fluency) · 🧮 <b>APTITUDE</b> (Averages · Blood Relations · DI · Percentages · LR Puzzles · Number Series · Permutations & Combinations · Probability · Profit & Loss · Ratio & Proportion · Simple & Compound Interest · Syllogisms · Time Speed & Distance · NEW! ⏱️ Time & Work) · 💼 <b>FINANCE CORE</b> (NEW! 📒 Accounting · 🏦 Corporate Finance · 🧠 Behavioural Finance · 📉 Derivatives · 📊 Financial Statement Analysis · 🛡️ Fixed Income · 🇮🇳 Indian Market · 🌍 Economics · 🧺 Portfolio Management · 🔍 Ratio Analysis · ⏳ Time Value of Money · 💎 Wealth Management · 🏗️ Capital Budgeting — the complete 13-course Finance Core: from journal entries to the wealth desk and the capital committee!) · 📚 <b>FINANCE: ACCOUNTING & REPORTING</b> (NEW! 📜 Ind AS & IFRS — framework → fair value → financial instruments → ECL → the Tribunal · 💰 Revenue Recognition — the king standard: 5 steps, SSP slicing, PIT/OT clock, POC warfare → the Revenue Chamber · 🔑 Leases — rent became debt: the ROU revolution, the Rs 38.9L canon, SLB machinery → the Lease Ledger · 📦 Inventory & COGS — the shelf that owns the P&L: FIFO-vs-WAC margins, the Rs 141 autopsy, NRV brakes → the Stockroom Trial · 🏭 Depreciation & PP&E — the slow clock: the Rs 59L cage, the Rs 90L five-clock crane, the derived 25.01% WDB rate, the OCI stair → the Clock Audit · 🧾 Deferred Tax — the shadow ledger: two clocks, the 25.0 invariance, DTL biographies, loss coupons & MAT → the Shadow Ledger · 🏢 Consolidated FS — one creature, many skins: the 152-goodwill grid, the attribution weave to 130.5, the NCI walk to 68.5, the control-cliff ceremony → the Night Shift!) — every track basic→advanced, finance-flavored · 1158 auto-graded quiz questions · ShopKart retail + Finance GL + a real SQLite practice DB ·
  3 portfolio projects · PL-300 certification plan · 🎧 26 embedded audio clips — press play anywhere, fully offline. Your progress, streaks and notes save automatically.</p>
  <div class="hero-act">
   <button class="cta" id="resumeBtn">▶ Continue learning</button>
   <label class="cta ghost" for="r-roadmap">View roadmap</label>
  </div>
 </div>
</div>
<div class="stats">
 <div class="stat"><b data-count="386">0</b><span>Sections</span></div>
 <div class="stat"><b data-count="382">0</b><span>Hands-on labs</span></div>
 <div class="stat"><b data-count="1158">0</b><span>Quiz questions</span></div>
 <div class="stat"><b data-count="1300">0</b><span>Practice rows</span></div>
</div>
<div class="dash">
 <div class="panel ringpanel">
  <svg viewBox="0 0 140 140" class="ring"><circle cx="70" cy="70" r="56" class="ringbg"/><circle cx="70" cy="70" r="56" class="ringfg" id="ringfg"/></svg>
  <div class="ringtxt"><b id="ringpct">0%</b><span>course complete</span></div>
 </div>
 <div class="panel">
   <h3>🔥 Study streak</h3><div class="bignum" id="streaknum">1</div><p class="mut">day(s) in a row — open the app daily to keep it alive</p>
   <h3 style="margin-top:18px">🧠 Quiz mastery</h3><div class="bignum" id="quizavg">—</div><p class="mut">average best score across sections</p>
 </div>
 <div class="panel">
   <h3>🎯 Up next</h3><p id="nextup" class="nextup">—</p>
   <h3 style="margin-top:18px">🏅 Certificate</h3>
   <p class="mut">Complete every section to unlock your graduation certificate.</p>
   <button class="cta small" id="certBtn" disabled>🔒 Locked</button>
 </div>
</div>
<h2 class="homeh">Your modules</h2>
<div class="cards">CARDS_TOKEN</div>
<h2 class="homeh">How to use this app</h2>
<ul class="howto">
<li><strong>⌨️ Shortcuts:</strong> <code>/</code> search · <code>←</code>/<code>→</code> previous/next section</li>
<li><strong>📝 My notes</strong> button on every section — your journal, saved on this device.</li>
<li><strong>☑️ Checklists</strong> inside modules are tappable and remembered.</li>
<li><strong>🧪 Quizzes</strong> at section ends auto-grade instantly with explanations.</li>
<li>Practice files live in the <code>datasets/</code> folder — open Power BI Desktop → Get Data → Text/CSV.</li>
</ul>
</section>
"""

CSS = """
@{--bg:#080b12;--bg2:#0d1320;--panel:rgba(20,28,44,.72);--panel2:#131c2e;--ink:#eef2fa;--mut:#8f9bb3;
--acc:#f2c811;--acc2:#22d3ee;--good:#34d399;--bad:#f87171;--line:#1e2a42;--r:16px;
--glow:0 10px 40px rgba(0,0,0,.5);--font:"Segoe UI",system-ui,-apple-system,sans-serif;}
body.lite{--bg:#eef1f8;--bg2:#ffffff;--panel:#ffffff;--panel2:#f4f6fc;--ink:#141d31;--mut:#5d6880;--line:#dfe6f3;--glow:0 12px 34px rgba(20,40,90,.10);}
*:root@{} *{} 
:root{}
html{scroll-behavior:smooth}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.65 var(--font);overflow-x:hidden}
body::before{content:"";position:fixed;inset:0;background:
 radial-gradient(700px 380px at 12% -5%,rgba(242,200,17,.10),transparent 60%),
 radial-gradient(800px 420px at 95% 10%,rgba(34,211,238,.09),transparent 60%),
 radial-gradient(600px 500px at 50% 110%,rgba(168,85,247,.07),transparent 60%);pointer-events:none;z-index:0}
#readbar{position:fixed;top:0;left:0;height:3px;width:0;background:linear-gradient(90deg,var(--acc),var(--acc2));z-index:99;transition:width .1s}
header{position:fixed;top:0;left:0;right:0;height:60px;z-index:50;display:flex;align-items:center;gap:10px;padding:0 14px;
 background:color-mix(in srgb,var(--bg2) 82%,transparent);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.brand{font-weight:800;display:flex;align-items:center;gap:9px;white-space:nowrap;letter-spacing:.2px}
.brand .dot{width:14px;height:14px;border-radius:4px;background:linear-gradient(135deg,var(--acc),#ff9f1a);box-shadow:0 0 14px rgba(242,200,17,.55)}
#search{flex:1;max-width:400px;background:var(--panel2);border:1px solid var(--line);border-radius:10px;color:var(--ink);
 padding:8px 12px 8px 32px;outline:none;background-image:linear-gradient(transparent,transparent);transition:border-color .2s,box-shadow .2s}
#search:focus{border-color:var(--acc);box-shadow:0 0 0 3px rgba(242,200,17,.15)}
.swrap{position:relative;flex:1;max-width:400px}.swrap::before{content:"🔎";position:absolute;left:10px;top:8px;font-size:.8rem;opacity:.7}
.swrap #search{width:100%}
.hbtn{background:var(--panel2);border:1px solid var(--line);color:var(--ink);border-radius:10px;padding:7px 11px;cursor:pointer;transition:.2s}
.hbtn:hover{border-color:var(--acc);transform:translateY(-1px)}
.flame{display:flex;align-items:center;gap:4px;font-weight:800;color:#fb923c;padding:6px 10px;border:1px solid var(--line);border-radius:99px;background:var(--panel2)}
.progwrap{margin-left:auto;display:flex;align-items:center;gap:10px;font-size:.82rem;color:var(--mut);white-space:nowrap}
.prog{width:110px;height:7px;background:var(--panel2);border-radius:99px;overflow:hidden;border:1px solid var(--line)}
.prog i{display:block;height:100%;width:0%;background:linear-gradient(90deg,var(--acc),var(--acc2));transition:width .4s}
.burger{display:none}
aside{position:fixed;top:60px;bottom:0;left:0;width:288px;overflow-y:auto;padding:14px 10px 30px;
 background:color-mix(in srgb,var(--bg2) 88%,transparent);backdrop-filter:blur(14px);border-right:1px solid var(--line);z-index:40}
aside ul{padding:0;margin:0}
aside li{list-style:none;margin:3px 0}
aside .navlink{cursor:pointer;display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink);padding:9px 10px;border-radius:11px;font-size:.9rem;
 border:1px solid transparent;transition:.15s}
aside .navlink:hover{background:var(--panel2);border-color:var(--line)}
aside .navlink.active{background:var(--panel2);border-color:var(--line);box-shadow:inset 3px 0 0 var(--acc)}
.ni{width:30px;height:30px;display:grid;place-items:center;background:var(--panel2);border:1px solid var(--line);border-radius:9px;font-size:.95rem;flex:none}
.lbl{flex:1}
.tick{font-style:normal;color:var(--good);font-weight:800}
main{position:relative;z-index:1;margin:60px 0 0 288px;padding:30px clamp(16px,4vw,54px) 110px;min-height:100vh}
.toc{position:fixed;right:0;top:60px;bottom:0;width:230px;padding:22px 18px 40px;overflow-y:auto;z-index:30;display:none}
@media (min-width:1280px){.toc{display:block}main{margin-right:230px}}
.toc b{font-size:.72rem;text-transform:uppercase;letter-spacing:.14em;color:var(--mut)}
.navgroup{list-style:none;margin:18px 4px 6px;font-size:.68rem;letter-spacing:.16em;color:var(--mut);font-weight:800;text-transform:uppercase}
.navdd-li{margin:10px 0 2px}
details.navdd{border:1px solid var(--line);border-radius:13px;background:var(--panel);overflow:hidden}
details.navdd summary.navgroup{margin:0;display:flex;align-items:center;gap:8px;padding:10px 10px;cursor:pointer;user-select:none;list-style:none;border-bottom:1px solid transparent;transition:.15s}
details.navdd summary.navgroup::-webkit-details-marker{display:none}
details.navdd summary.navgroup:hover{background:var(--panel2);color:var(--ink)}
details.navdd[open] summary.navgroup{color:var(--ink);border-bottom:1px solid var(--line);background:var(--panel2)}
.ddtitle{flex:1}
.ddcount{background:var(--acc);color:#111;font-size:.62rem;font-weight:800;border-radius:99px;padding:2px 7px;letter-spacing:.02em}
.ddarrow{transition:.2s;font-size:.8rem;color:var(--mut)}
details.navdd[open] .ddarrow{transform:rotate(180deg)}
.ddlist{padding:6px 6px 8px!important}
.ddlist li{margin:2px 0}
.navmega-li{margin:12px 0 2px}
details.navmega{border:1px solid var(--acc);border-radius:15px;background:linear-gradient(180deg,color-mix(in srgb,var(--acc) 8%,transparent),transparent);overflow:hidden;box-shadow:0 0 22px color-mix(in srgb,var(--acc) 14%,transparent)}
details.navmega summary.navmegah{list-style:none;cursor:pointer;display:flex;align-items:center;gap:8px;padding:11px 12px;font-size:.74rem;letter-spacing:.14em;color:var(--acc);font-weight:900;text-transform:uppercase;user-select:none;transition:.15s;border-bottom:1px solid transparent}
details.navmega summary.navmegah::-webkit-details-marker{display:none}
details.navmega summary.navmegah:hover{background:color-mix(in srgb,var(--acc) 10%,transparent)}
details.navmega[open] summary.navmegah{border-bottom:1px solid color-mix(in srgb,var(--acc) 30%,transparent)}
.megatitle{flex:1}
.megacount{font-size:.58rem;color:var(--mut);border:1px solid var(--line);border-radius:99px;padding:2px 8px;font-weight:800;letter-spacing:.04em;white-space:nowrap}
details.navmega[open] summary.navmegah .ddarrow{transform:rotate(180deg)}
.megalist{padding:6px 7px 9px!important}
.megalist .navdd-li{margin:7px 0 1px}
details.navmega.eng{border-color:var(--acc2);box-shadow:0 0 22px color-mix(in srgb,var(--acc2) 14%,transparent)}
details.navmega.eng summary.navmegah{color:var(--acc2)}
details.navmega.eng summary.navmegah:hover{background:color-mix(in srgb,var(--acc2) 10%,transparent)}
details.navmega.eng[open] summary.navmegah{border-bottom-color:color-mix(in srgb,var(--acc2) 30%,transparent)}
.ddctl{display:flex;gap:6px;margin:10px 2px 2px}
.ddctl button{flex:1;background:var(--panel2);border:1px solid var(--line);color:var(--mut);border-radius:8px;font-size:.68rem;font-weight:700;padding:5px 6px;cursor:pointer}
.ddctl button:hover{color:var(--acc);border-color:var(--acc)}
.navrow{display:flex;align-items:center;gap:5px}
.navrow .navlink{flex:1;min-width:0}
.mdl{flex:none;background:var(--panel2);border:1px solid var(--line);color:var(--mut);border-radius:6px;font-size:.6rem;font-weight:800;padding:4px 6px;cursor:pointer;letter-spacing:.03em}
.mdl:hover{color:var(--acc);border-color:var(--acc)}
#mdmodal{display:none;position:fixed;inset:0;background:rgba(4,6,12,.8);backdrop-filter:blur(5px);z-index:95;padding:20px}
#mdmodal.open{display:grid;place-items:center}
.mdbox{background:var(--bg2);border:1px solid var(--line);border-radius:16px;width:min(860px,95vw);height:min(640px,90vh);display:flex;flex-direction:column;overflow:hidden}
.mdbox .dhead{display:flex;align-items:center;gap:8px;padding:14px 16px;border-bottom:1px solid var(--line);font-weight:800}
.mdbox pre{flex:1;overflow:auto;margin:0;padding:18px;font:.82rem/1.6 Consolas,monospace;color:var(--ink);white-space:pre-wrap;word-wrap:break-word}
.mdcopy{background:var(--acc);border:none;color:#111;border-radius:8px;padding:6px 14px;font-weight:700;cursor:pointer}
.ghostbtn{background:var(--panel2);border:1px solid var(--line);color:var(--ink);border-radius:8px;padding:6px 14px;cursor:pointer}
.toc a{display:block;color:var(--mut);text-decoration:none;font-size:.8rem;padding:6px 0 6px 12px;border-left:2px solid var(--line);transition:.15s}
.toc a.on{color:var(--acc);border-color:var(--acc)}
.toc a:hover{color:var(--ink)}
""" + TABS_CSS + """
@keyframes fadein{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
.secmeta{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:6px}
.chip{display:inline-flex;align-items:center;gap:6px;background:var(--panel2);border:1px solid var(--line);border-radius:99px;padding:4px 12px;font-size:.75rem;font-weight:700}
.chip.ghost{color:var(--mut);font-weight:600}
.chipbtn{margin-left:auto;background:var(--panel2);border:1px solid var(--line);color:var(--ink);border-radius:99px;padding:5px 12px;font-size:.78rem;cursor:pointer}
.chipbtn:hover{border-color:var(--acc)}
h1{font-size:clamp(1.5rem,3vw,2rem);line-height:1.25;margin:.4em 0 .8em}
h1::after{content:"";display:block;height:3px;width:120px;border-radius:99px;margin-top:10px;background:linear-gradient(90deg,var(--acc),transparent)}
h2{font-size:1.28rem;margin-top:2.3rem;scroll-margin-top:80px}
h2::before{content:"";display:inline-block;width:9px;height:9px;border-radius:3px;background:var(--acc);margin-right:9px;box-shadow:0 0 10px rgba(242,200,17,.6)}
h3{font-size:1.08rem;margin-top:1.7rem;color:var(--acc2);font-weight:700}
h4{margin-top:1.2rem}
a{color:var(--acc2)}
p{color:var(--ink)}
.mut{color:var(--mut)}
code{background:var(--panel2);border:1px solid var(--line);padding:1px 6px;border-radius:6px;font-family:Consolas,"Cascadia Mono",monospace;font-size:.88em;color:#ffd76a}
body.lite code{color:#b45309}
.codewrap{background:#0a0f1a;border:1px solid var(--line);border-radius:14px;margin:16px 0;overflow:hidden;box-shadow:var(--glow)}
body.lite .codewrap{background:#101828}
.codetop{display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,.03);border-bottom:1px solid var(--line)}
.dots i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px}
.dots i:nth-child(1){background:#ff5f57}.dots i:nth-child(2){background:#febc2e}.dots i:nth-child(3){background:#28c840}
.clang{font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:var(--mut)}
.codewrap pre{margin:0;padding:16px;overflow-x:auto;font:0.88rem/1.55 Consolas,"Cascadia Mono",monospace;color:#c9d7f2}
.kw{color:#7dd3fc;font-weight:700}.st{color:#fbbf24}.cm{color:#64748b;font-style:italic}
.copyb{margin-left:auto;background:var(--panel2);border:1px solid var(--line);color:var(--ink);border-radius:7px;font-size:.7rem;padding:3px 9px;cursor:pointer}
.copyb:hover{border-color:var(--acc)}
.tbl{overflow-x:auto;border:1px solid var(--line);border-radius:14px;margin:16px 0;box-shadow:var(--glow)}
table{border-collapse:collapse;width:100%;font-size:.9rem}
th,td{border-bottom:1px solid var(--line);padding:9px 12px;text-align:left;vertical-align:top}
th{background:var(--panel2);font-size:.78rem;letter-spacing:.05em;text-transform:uppercase;color:var(--mut)}
tr:last-child td{border-bottom:none}
tbody tr{transition:background .12s}
tbody tr:hover{background:rgba(242,200,17,.05)}
blockquote{border-left:3px solid var(--acc2);margin:16px 0;padding:12px 16px;background:linear-gradient(90deg,rgba(34,211,238,.07),transparent);border-radius:0 12px 12px 0}
hr{border:none;border-top:1px solid var(--line);margin:2.4rem 0;position:relative}
ul,ol{padding-left:1.3rem}
li{margin:5px 0}
li::marker{color:var(--acc)}
li.chk{list-style:none;margin-left:-1.3rem}
li.chk label{display:flex;gap:10px;align-items:flex-start;background:var(--panel2);border:1px solid var(--line);border-radius:10px;padding:9px 12px;cursor:pointer;transition:.15s}
li.chk label:hover{border-color:var(--acc)}
li.chk input{display:none}
li.chk span{flex:none;width:18px;height:18px;margin-top:3px;border:2px solid var(--mut);border-radius:6px;display:inline-block;position:relative;transition:.15s}
li.chk input:checked+span{background:var(--good);border-color:var(--good)}
li.chk input:checked+span::after{content:"✓";position:absolute;inset:0;display:grid;place-items:center;color:#04121f;font-weight:900;font-size:.8rem}
li.chk input:checked~b,li.chk input:checked~*{} 
li.chk input:checked{text-decoration:none}
details.answers{margin:14px 0;background:var(--panel);border:1px solid var(--line);border-radius:14px;overflow:hidden}
details.answers summary{cursor:pointer;font-weight:700;color:var(--acc);padding:14px 18px;list-style:none;display:flex;align-items:center;gap:8px}
details.answers summary::after{content:"+";margin-left:auto;font-size:1.2rem;transition:transform .2s}
details.answers[open] summary::after{transform:rotate(45deg)}
details.answers>summary::-webkit-details-marker{display:none}
details.answers h2,details.answers h3{display:none}
details.answers p,details.answers pre,details.answers .codewrap,details.answers ul,details.answers ol,details.answers .tbl{padding-left:18px;padding-right:18px}
details.answers .tbl{margin:0 18px 14px}
.lesson-foot{margin-top:2.6rem;display:flex;gap:12px;flex-wrap:wrap}
.done-btn{background:linear-gradient(135deg,var(--panel2),var(--panel2));border:1px solid var(--line);color:var(--ink);border-radius:12px;padding:12px 20px;font-size:.95rem;font-weight:700;cursor:pointer;transition:.2s}
.done-btn:hover{border-color:var(--good);transform:translateY(-2px)}
.done-btn.done{border-color:var(--good);color:var(--good);box-shadow:0 0 18px rgba(52,211,153,.15)}
.pn{display:flex;justify-content:space-between;gap:10px;margin-top:1.6rem}
.pn .pnl{cursor:pointer;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:12px 18px;text-decoration:none;color:var(--ink);font-weight:600;transition:.2s}
.pn .pnl:hover{border-color:var(--acc);transform:translateY(-2px)}
/* quiz */
.quizzone{margin-top:2.4rem;border:1px solid var(--line);border-radius:18px;overflow:hidden;box-shadow:var(--glow)}
.qzhead{background:linear-gradient(90deg,rgba(242,200,17,.12),transparent);padding:16px 20px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--line)}
.qzhead b{font-size:1.05rem}
.qzscore{margin-left:auto;font-weight:800;color:var(--acc)}
.qcard{padding:18px 20px;border-bottom:1px solid var(--line)}
.qcard:last-child{border-bottom:none}
.qq{font-weight:700;margin-bottom:10px}
.qopts{display:grid;gap:8px}
.qopt{display:flex;gap:10px;align-items:center;background:var(--panel2);border:1px solid var(--line);color:var(--ink);
 border-radius:11px;padding:10px 12px;cursor:pointer;text-align:left;font-size:.92rem;transition:.15s;width:100%}
.qopt:hover{border-color:var(--acc)}
.qopt .k{flex:none;width:24px;height:24px;border-radius:8px;border:1px solid var(--line);display:grid;place-items:center;font-size:.75rem;font-weight:800;color:var(--mut)}
.qopt.right{border-color:var(--good);background:rgba(52,211,153,.10)}
.qopt.right .k{background:var(--good);color:#052e1f;border-color:var(--good)}
.qopt.wrong{border-color:var(--bad);background:rgba(248,113,113,.08);animation:shake .3s}
@keyframes shake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
.qwhy{display:none;margin-top:10px;font-size:.88rem;color:var(--mut);border-left:3px solid var(--good);padding:8px 12px;background:rgba(52,211,153,.06);border-radius:0 10px 10px 0}
.qwhy.show{display:block}
.qzretry{margin:14px 20px}
.qzretry button{background:var(--panel2);border:1px solid var(--line);color:var(--ink);border-radius:10px;padding:8px 16px;cursor:pointer}
/* home */
.hero{position:relative;overflow:hidden;border:1px solid var(--line);border-radius:22px;padding:clamp(26px,5vw,52px);background:
 linear-gradient(135deg,#0e1626,#0a0e18 60%);box-shadow:var(--glow)}
body.lite .hero{background:linear-gradient(135deg,#ffffff,#eef3ff)}
.blob{position:absolute;border-radius:50%;filter:blur(60px);opacity:.5;animation:float 9s ease-in-out infinite}
.b1{width:280px;height:280px;background:rgba(242,200,17,.25);top:-90px;right:-40px}
.b2{width:220px;height:220px;background:rgba(34,211,238,.22);bottom:-100px;left:30%}
@keyframes float{50%{transform:translateY(-16px) rotate(8deg)}}
.hero-in{position:relative;z-index:1;max-width:660px}
.kicker{font-size:.72rem;letter-spacing:.18em;color:var(--acc);font-weight:800;margin-bottom:10px}
.hero h1{font-size:clamp(2rem,5vw,3.1rem);margin:0 0 14px;line-height:1.1}
.hero h1::after{display:none}
.hero h1 span{background:linear-gradient(90deg,var(--acc),#ff9f1a,var(--acc2));-webkit-background-clip:text;background-clip:text;color:transparent;
 background-size:200% 100%;animation:shine 6s linear infinite}
@keyframes shine{to{background-position:200% 0}}
.hero p{color:var(--mut)}
.hero-act{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px}
.cta{background:linear-gradient(135deg,var(--acc),#ffb300);color:#1a1400;border:none;border-radius:12px;padding:13px 24px;font-weight:800;font-size:.98rem;cursor:pointer;
 box-shadow:0 8px 24px rgba(242,200,17,.25);transition:.2s}
.cta:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(242,200,17,.35)}
.cta.ghost{background:var(--panel2);color:var(--ink);border:1px solid var(--line);box-shadow:none}
.cta.small{padding:9px 16px;font-size:.85rem}
.cta:disabled{opacity:.45;cursor:not-allowed;transform:none;box-shadow:none}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;margin:18px 0}
.stat{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:16px;text-align:center;backdrop-filter:blur(8px)}
.stat b{font-size:1.7rem;background:linear-gradient(135deg,var(--acc),var(--acc2));-webkit-background-clip:text;background-clip:text;color:transparent;display:block}
.stat span{font-size:.78rem;color:var(--mut)}
.dash{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;margin:6px 0 8px}
.panel{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:18px;backdrop-filter:blur(8px)}
.panel h3{margin:0 0 4px;color:var(--ink);font-size:.95rem}
.bignum{font-size:2rem;font-weight:800;color:var(--acc)}
.nextup{font-weight:700}
.ringpanel{position:relative;display:grid;place-items:center;min-height:170px}
.ring{width:130px;transform:rotate(-90deg)}
.ringbg{fill:none;stroke:var(--line);stroke-width:12}
.ringfg{fill:none;stroke:url(#gring);stroke-width:12;stroke-linecap:round;stroke-dasharray:352;stroke-dashoffset:352;transition:stroke-dashoffset .8s cubic-bezier(.2,.7,.3,1)}
.ringfg{stroke:var(--acc)}
.ringtxt{position:absolute;text-align:center}
.ringtxt b{font-size:1.6rem;display:block}
.ringtxt span{font-size:.72rem;color:var(--mut)}
.homeh{margin-top:2rem}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px;margin-top:14px}
.card{display:block;text-decoration:none;color:inherit;position:relative;background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:18px;cursor:pointer;transition:.18s;overflow:hidden}
.card::before{content:"";position:absolute;inset:0 0 auto 0;height:3px;background:linear-gradient(90deg,var(--acc),var(--acc2));opacity:0;transition:.2s}
.card:hover{transform:translateY(-4px);border-color:rgba(242,200,17,.5);box-shadow:var(--glow)}
.card:hover::before{opacity:1}
.cicon{font-size:1.5rem}
.card b{display:block;margin:8px 0 3px;font-size:.95rem}
.card small{color:var(--mut);font-size:.8rem}
.cdone{position:absolute;top:12px;right:12px;color:var(--good);font-weight:900}
.howto li{margin:8px 0}
/* notes drawer */
#drawer{position:fixed;top:0;right:-400px;width:min(400px,92vw);height:100vh;background:var(--bg2);border-left:1px solid var(--line);
 z-index:80;transition:right .3s cubic-bezier(.2,.7,.3,1);display:flex;flex-direction:column;box-shadow:-20px 0 60px rgba(0,0,0,.4)}
#drawer.open{right:0}
#drawer header2,.dhead{display:flex;align-items:center;gap:8px;padding:16px;border-bottom:1px solid var(--line);font-weight:800}
#drawer textarea{flex:1;margin:16px;background:var(--panel2);color:var(--ink);border:1px solid var(--line);border-radius:12px;padding:14px;
 font:.95rem/1.6 var(--font);outline:none;resize:none}
#drawer textarea:focus{border-color:var(--acc)}
.dfoot{padding:0 16px 16px;font-size:.78rem;color:var(--mut)}
/* certificate */
#certWrap{display:none;position:fixed;inset:0;background:rgba(4,6,12,.85);backdrop-filter:blur(6px);z-index:90;padding:20px;overflow:auto}
#certWrap.open{display:grid;place-items:center}
.cert{background:#0e1424;color:#f4e9c8;width:min(760px,94vw);border:2px solid #d4af37;border-radius:8px;padding:44px 40px;text-align:center;
 box-shadow:0 0 80px rgba(212,175,55,.25);position:relative}
.cert::before{content:"";position:absolute;inset:10px;border:1px solid rgba(212,175,55,.5);border-radius:4px;pointer-events:none}
.cert .seal{font-size:2.6rem}
.cert h2{border:none;color:#ffd76a;font-size:1.9rem;margin:10px 0 4px}
.cert .cname{font-size:2rem;font-weight:800;margin:16px 0;color:#fff;border-bottom:1px solid #d4af37;display:inline-block;padding:0 30px 8px}
.cert p{color:#cbbd93}
.cert .cdate{margin-top:18px;font-size:.85rem;letter-spacing:.1em}
.certbtns{margin-top:22px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
#namebar{display:none;position:fixed;inset:0;background:rgba(4,6,12,.7);z-index:95;place-items:center}
#namebar.open{display:grid}
#namebar .nb{background:var(--bg2);border:1px solid var(--line);border-radius:16px;padding:24px;width:min(400px,92vw);text-align:center}
#namebar input{width:100%;padding:12px;border-radius:10px;border:1px solid var(--line);background:var(--panel2);color:var(--ink);margin:12px 0;font-size:1rem}
#confetti{position:fixed;inset:0;pointer-events:none;z-index:100}
#top{position:fixed;right:18px;bottom:18px;z-index:60;display:none;box-shadow:var(--glow)}
.flash{animation:fl 1.6s ease}
@keyframes fl{0%{box-shadow:0 0 0 3px var(--acc)}100%{box-shadow:none}}
::-webkit-scrollbar{width:10px;height:10px}
::-webkit-scrollbar-thumb{background:var(--line);border-radius:99px}
::-webkit-scrollbar-thumb:hover{background:var(--mut)}
::selection{background:rgba(242,200,17,.3)}
@media (max-width:900px){
 aside{transform:translateX(-100%);transition:.25s;width:274px}
 aside.open{transform:none;box-shadow:0 0 50px rgba(0,0,0,.55)}
 .navchk:checked ~ aside{transform:none;box-shadow:0 0 50px rgba(0,0,0,.55)}
 .navchk{position:fixed;left:-9999px;top:-9999px;opacity:0;pointer-events:none}
 main{margin-left:0}.burger{display:inline-block;cursor:pointer}.progwrap .plabel{display:none}.flame .fnum{display:none}
 .swrap{max-width:none}
}
@media print{
 header,aside,.toc,.lesson-foot,.pn,#top,.quizzone,.secmeta .notesb{display:none!important}
 body::before{display:none}
 main{margin:0}
 body.certonly *{visibility:hidden}
 body.certonly #certWrap,body.certonly #certWrap *{visibility:visible}
 #certWrap{position:fixed;inset:0;padding:0;background:#fff}
 .cert{width:100%;box-shadow:none}
}
"""

JS_HEAD = """
var IDS=TOKEN_IDS,LBL=TOKEN_LBL,QZ=TOKEN_QZ;
function $(s){return document.querySelector(s)}function $all(s){return Array.prototype.slice.call(document.querySelectorAll(s))}
try{if(typeof requestAnimationFrame==='undefined')window.requestAnimationFrame=function(f){return setTimeout(function(){f(Date.now())},18)};}catch(e){}
var MEM={};
function ls(k,v){
 try{
  if(v===undefined){
   var r=null;try{r=localStorage.getItem(k)}catch(e2){}
   if(r!==null)return JSON.parse(r);
   return (k in MEM)?MEM[k]:null;
  }
  MEM[k]=v;
  try{localStorage.setItem(k,JSON.stringify(v))}catch(e3){}
  return v;
 }catch(e){if(v!==undefined){MEM[k]=v;return v}return (k in MEM)?MEM[k]:null}
}
var prog=ls('pbi2-progress')||[],quiz=ls('pbi2-quiz')||{},checks=ls('pbi2-checks')||{},last=ls('pbi2-last')||'roadmap';
// ---------- copy code buttons ----------
$all('.codewrap').forEach(function(w){
 var top=w.querySelector('.codetop');if(!top)return;
 var b=document.createElement('button');b.className='copyb';b.textContent='copy';
 b.addEventListener('click',function(){
  var txt=(w.querySelector('pre code')||{}).innerText||'';
  try{navigator.clipboard.writeText(txt)}catch(e){
   try{var ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}catch(e2){}
  }
  b.textContent='copied!';setTimeout(function(){b.textContent='copy'},1200)});
 top.appendChild(b);
});
// ---------- streak ----------
var sk=ls('pbi2-streak')||{count:0,last:''};
var today=new Date().toDateString();
if(sk.last!==today){var y=new Date(Date.now()-864e5).toDateString();sk.count=(sk.last===y)?sk.count+1:1;sk.last=today;ls('pbi2-streak',sk)}
$('#streaknum').textContent=sk.count;$('#flamec').textContent=sk.count;
// ---------- progress ----------
function pctDone(){return Math.round(100*prog.length/IDS.length)}
function paint(){
 var done={};prog.forEach(function(x){done[x]=1});
 $all('.tick').forEach(function(t){t.textContent=done[t.getAttribute('data-tick')]?'✓':''});
 $all('.cdone').forEach(function(t){t.textContent=done[t.getAttribute('data-cdone')]?'✓':''});
 $all('.done-btn').forEach(function(b){var d=done[b.getAttribute('data-id')];b.className='done-btn'+(d?' done':'');b.innerHTML='<span class="dbi">'+(d?'✔ Completed':'✔')+'</span>'+(d?' — tap to undo':' Mark as complete');});
 var p=pctDone();$('#pfill').style.width=p+'%';$('#ptext').textContent=prog.length+'/'+IDS.length+' complete';
 var ring=$('#ringfg');if(ring){ring.style.strokeDashoffset=352-352*p/100;$('#ringpct').textContent=p+'%';}
 var qs=[];for(var k in quiz)qs.push(quiz[k]);
 $('#quizavg').textContent=qs.length?Math.round(qs.reduce(function(a,b){return a+b},0)/qs.length)+'%':'—';
 var nx=IDS.find(function(x){return!done[x]});
 $('#nextup').innerHTML=nx?(LBL[nx]+'<br><a href="#'+nx+'">Open →</a>'):'🎉 Everything done. Go get certified!';
 var cb=$('#certBtn');
 if(p===100){cb.disabled=false;cb.textContent='🎓 Claim certificate'}else{cb.disabled=true;cb.textContent='🔒 '+p+'% — finish all sections'}
 var rb=$('#resumeBtn');rb.textContent='▶ Continue: '+(LBL[last]||'Start'); 
}
// ---------- nav: radios + :checked CSS show/hide. JS only enhances & never blocks ----------
function currentId(){var r=document.querySelector('.tabr:checked');return r?r.id.slice(2):'home'}
function syncUI(id){
 try{$all('aside .navlink').forEach(function(a){a.classList.toggle('active',a.getAttribute('for')==='r-'+id)});}catch(e){}
 try{var _al=document.querySelector('aside .navlink[for="r-'+id+'"]');if(_al){for(var _el=_al.parentElement;_el&&_el!==document.body;_el=_el.parentElement){if(_el.tagName==='DETAILS')_el.open=true;}}}catch(e){}
 try{window.scrollTo({top:0})}catch(e){}
 try{document.querySelector('aside').classList.remove('open')}catch(e){}
 try{location.hash=(id==='home')?'':id;}catch(e){}
 try{if(id!=='home'){last=id;ls('pbi2-last',id);buildToc(id)}else{$('#tocbox').innerHTML=''}}catch(e){}
 try{paint()}catch(e){}
}
function onTab(){try{var _nc=document.getElementById('navchk');if(_nc)_nc.checked=false;}catch(e){}
 syncUI(currentId())}
function sel(id){var r=document.getElementById('r-'+id);if(r){if(!r.checked)r.checked=true;onTab()}}
$all('.tabr').forEach(function(r){r.addEventListener('change',onTab)});
window.addEventListener('hashchange',function(){
 var h=(location.hash||'').slice(1)||'home';
 if(h!==currentId())sel(h);
});
$('#resumeBtn').addEventListener('click',function(){sel(last)});
$all('.done-btn').forEach(function(b){b.addEventListener('click',function(){
 var id=b.getAttribute('data-id');
 if(prog.indexOf(id)>=0){prog=prog.filter(function(x){return x!==id})}else{prog.push(id)}
 ls('pbi2-progress',prog);paint();confetti();})});
// ---------- toc ----------
function buildToc(id){var box=$('#tocbox');var hs=$all('#'+id+' h2');
 box.innerHTML='<b>ON THIS PAGE</b>'+hs.map(function(h){return'<a href="javascript:void(0)" data-t="'+h.id+'">'+h.textContent.slice(0,42)+'</a>'}).join('');
 $all('#tocbox a').forEach(function(a){a.addEventListener('click',function(){try{document.getElementById(a.getAttribute('data-t')).scrollIntoView({behavior:'smooth'})}catch(e){document.getElementById(a.getAttribute('data-t')).scrollIntoView()}})});}
// ---------- scrollspy & readbar ----------
var tick=false;
window.addEventListener('scroll',function(){
 if(tick)return;tick=true;requestAnimationFrame(function(){tick=false;
  var h=document.documentElement;var pc=100*window.scrollY/Math.max(1,h.scrollHeight-innerHeight);$('#readbar').style.width=pc+'%';
  $('#top').style.display=window.scrollY>600?'block':'none';
  var cur=location.hash.slice(1);if(!cur||cur==='home')return;
  var hs=$all('#'+cur+' h2');var act=null;
  hs.forEach(function(x){if(x.getBoundingClientRect().top<120)act=x.id});
  $all('#tocbox a').forEach(function(a){a.classList.toggle('on',a.getAttribute('data-t')===act)});
 });});
$('#top').addEventListener('click',function(){try{window.scrollTo({top:0,behavior:'smooth'})}catch(e){}});
// ---------- checklists ----------
$all('input[data-ck]').forEach(function(c){var k=c.getAttribute('data-ck');c.checked=!!checks[k];
 c.addEventListener('change',function(){checks[k]=c.checked;ls('pbi2-checks',checks)})});
// ---------- answers reveal ----------
$all('section.lesson h2, section.lesson h3, section.lesson h4').forEach(function(h){
 if(!/answers|✅ solutions|✅ selected/i.test(h.textContent))return;
 var det=document.createElement('details');det.className='answers';
 det.innerHTML='<summary>🔑 '+h.textContent.replace(/###/g,'')+' — reveal (try first!)</summary>';
 var n=h.nextSibling;
 while(n){if(n.nodeType===1&&/^(H1|H2|H3|H4|HR)$/.test(n.tagName))break;var nn=n.nextSibling;det.appendChild(n);n=nn;}
 h.parentNode.replaceChild(det,h);});
// ---------- quizzes ----------
$all('.quizzone').forEach(function(zone){
 var id=zone.getAttribute('data-qz');var data=QZ[id];if(!data)return;
 var htmlQ='<div class="qzhead">🧪 <b>Quick check — '+data.length+' questions</b><span class="qzscore" data-qs></span></div>';
 data.forEach(function(item,qi){
  htmlQ+='<div class="qcard"><div class="qq">'+(qi+1)+'. '+item.q+'</div><div class="qopts">'
   +item.o.map(function(o,oi){return'<button class="qopt" data-q="'+qi+'" data-o="'+oi+'"><span class="k">'+'ABCD'[oi]+'</span>'+o+'</button>'}).join('')
   +'</div><div class="qwhy" data-w="'+qi+'">'+item.w+'</div></div>';});
 htmlQ+='<div class="qzretry"><button data-retry>↺ Retry quiz</button></div>';
 zone.innerHTML=htmlQ;
 var answered=0,right=0,doneAll=false;
 function saveScore(){var sc=Math.round(100*right/data.length);if(!quiz[id]||sc>quiz[id]){quiz[id]=sc;ls('pbi2-quiz',quiz)}
  var best=quiz[id];zone.querySelector('[data-qs]').textContent='Best: '+best+'%';}
 zone.querySelectorAll('.qopt').forEach(function(btn){btn.addEventListener('click',function(){
  if(this.parentNode.dataset.done)return;
  var card=this.parentNode;var qi=+this.dataset.q,oi=+this.dataset.o;card.dataset.done='1';
  if(oi===data[qi].a){this.classList.add('right');right++}else{this.classList.add('wrong');
   card.querySelector('[data-o="'+data[qi].a+'"]').classList.add('right');}
  card.parentNode.querySelector('[data-w="'+qi+'"]').classList.add('show');
  answered++;if(answered===data.length){saveScore();paint();confetti();}});});
 zone.querySelector('[data-retry]').addEventListener('click',function(){
  answered=0;right=0;
  zone.querySelectorAll('.qopts').forEach(function(o){delete o.dataset.done});
  zone.querySelectorAll('.qopt').forEach(function(o){o.classList.remove('right','wrong')});
  zone.querySelectorAll('.qwhy').forEach(function(w){w.classList.remove('show')});});
 var b=quiz[id];if(b)zone.querySelector('[data-qs]').textContent='Best: '+b+'%';
});
// ---------- notes ----------
var curNotes=null;
$all('.notesb').forEach(function(b){b.addEventListener('click',function(){
 curNotes=b.getAttribute('data-notes');$('#dtitle').textContent='📝 Notes — '+LBL[curNotes];
 $('#dtext').value=ls('pbi2-notes-'+curNotes)||'';$('#drawer').classList.add('open');$('#dtext').focus();})});
$('#dclose').addEventListener('click',function(){$('#drawer').classList.remove('open')});
$('#dtext').addEventListener('input',function(){ls('pbi2-notes-'+curNotes,this.value);$('#dsaved').textContent='saved ✓ '+new Date().toLocaleTimeString();
 clearTimeout(window._dt);window._dt=setTimeout(function(){$('#dsaved').textContent='auto-saved on this device'},2000)});
// ---------- markdown modal ----------
var _mdId=null;
function openMD(id){try{
 _mdId=id;var t=(MD_SRC[id]||'Markdown not embedded for this section.');
 $('#mdtitle').textContent=LBL[id]+' .md';
 $('#mdtext').textContent=t;
 $('#mdmodal').classList.add('open');
}catch(e){}}
$all('.mdl, .mdl-sec').forEach(function(b){b.addEventListener('click',function(e){
 e.preventDefault();e.stopPropagation();openMD(b.getAttribute('data-md'));})});
$('#mdclose').addEventListener('click',function(){$('#mdmodal').classList.remove('open')});
$('#mdmodal').addEventListener('click',function(e){if(e.target===this)this.classList.remove('open')});
$('#mdcopy').addEventListener('click',function(){
 var t=$('#mdtext').textContent;var b=this;
 try{navigator.clipboard.writeText(t)}catch(e){
  try{var ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}catch(e2){}}
 b.textContent='Copied!';setTimeout(function(){b.textContent='Copy'},1200)});
$('#mddown').addEventListener('click',function(){try{
 var id=_mdId||'section', t=$('#mdtext').textContent;
 var blob=new Blob([t],{type:'text/markdown'});var url=URL.createObjectURL(blob);
 var a=document.createElement('a');a.href=url;a.download=id+'.md';document.body.appendChild(a);a.click();
 setTimeout(function(){URL.revokeObjectURL(url);a.remove()},300);
}catch(e){}});
// ---------- sidebar dropdown controls ----------
$('#exall').addEventListener('click',function(){$all('aside details').forEach(function(d){d.open=true})});
$('#coall').addEventListener('click',function(){$all('aside details.navdd').forEach(function(d){d.open=false})});
// ---------- search ----------
$('#search').addEventListener('input',function(){var q=this.value.trim().toLowerCase();
 if(q){$all('aside details').forEach(function(d){d.open=true});}
 $all('aside li[data-s]').forEach(function(li){var t=li.textContent.toLowerCase().indexOf(q)>=0;
  var b2=!q?true:document.getElementById(li.getAttribute('data-s')).textContent.toLowerCase().indexOf(q)>=0;
  li.style.display=(t||b2)?'':'none';
  if((t||b2)&&q){var dd=li.closest('details');if(dd)dd.open=true;}});});
$('#search').addEventListener('keydown',function(e){if(e.key!=='Enter')return;var q=this.value.trim().toLowerCase();if(!q)return;
 for(var i=0;i<IDS.length;i++){var s=document.getElementById(IDS[i]);
  if(s.textContent.toLowerCase().indexOf(q)>=0){sel(IDS[i]);s.classList.add('flash');setTimeout(function(){s.classList.remove('flash')},1700);break;}}});
// ---------- keyboard ----------
document.addEventListener('keydown',function(e){
 if(/input|textarea/i.test(document.activeElement.tagName))return;
 if(e.key==='/'){e.preventDefault();$('#search').focus()}
 if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
  var cur=currentId();var ix=IDS.indexOf(cur);
  if(e.key==='ArrowRight'&&ix>=0&&ix<IDS.length-1)sel(IDS[ix+1]);
  if(e.key==='ArrowRight'&&cur==='home')sel(IDS[0]);
  if(e.key==='ArrowLeft'&&ix>0)sel(IDS[ix-1]);
  if(e.key==='ArrowLeft'&&ix===0)sel('home');}});
// ---------- theme ----------
$('#theme').addEventListener('click',function(){document.body.classList.toggle('lite');
 ls('pbi2-theme',document.body.classList.contains('lite')?'lite':'dark')});
if(ls('pbi2-theme')==='lite')document.body.classList.add('lite');
// ---------- counters ----------
var counted=false;
function counters(){if(counted)return;counted=true;
 $all('[data-count]').forEach(function(el){var T=+el.getAttribute('data-count'),t0=null;
  function step(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/1100);el.textContent=Math.round(T*(1-Math.pow(1-p,3))).toLocaleString();
   if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)})}
setTimeout(counters,400);
// ---------- confetti ----------
function confetti(){try{
 var c=$('#confetti');if(!c||!c.getContext)return;
 var x=c.getContext('2d');if(!x)return;
 c.width=innerWidth;c.height=innerHeight;
 var P=[],cols=['#f2c811','#22d3ee','#a78bfa','#34d399','#f87171','#ffffff'];
 for(var i=0;i<130;i++)P.push({x:Math.random()*c.width,y:-20-Math.random()*c.height*.4,w:5+Math.random()*6,h:8+Math.random()*8,
  c:cols[i%6],vy:2+Math.random()*3.4,vx:-1.4+Math.random()*2.8,r:Math.random()*3.14,vr:-.12+Math.random()*.24});
 var frames=0;(function loop(){x.clearRect(0,0,c.width,c.height);frames++;var alive=false;
  P.forEach(function(p){p.y+=p.vy;p.x+=p.vx;p.r+=p.vr;if(p.y<c.height+30)alive=true;
   x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.w/2,-p.h/2,p.w,p.h);x.restore();});
  if(alive&&frames<480)requestAnimationFrame(loop);else x.clearRect(0,0,c.width,c.height);})();
}catch(e){}}
// ---------- certificate ----------
$('#certBtn').addEventListener('click',function(){$('#namebar').classList.add('open');$('#cname2').focus()});
$('#mkcert').addEventListener('click',function(){var n=$('#cname2').value.trim()||'Power BI Expert';
 $('#cname').textContent=n;$('#cdate').textContent='Awarded on '+new Date().toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'});
 $('#namebar').classList.remove('open');$('#certWrap').classList.add('open');confetti();});
$('#pclose').addEventListener('click',function(){$('#certWrap').classList.remove('open')});
$('#pprint').addEventListener('click',function(){document.body.classList.add('certonly');window.print();setTimeout(function(){document.body.classList.remove('certonly')},500)});
// ---------- init ----------

try{
 var h=(location.hash||'').slice(1),r=h?document.getElementById('r-'+h):null;
 if(r)r.checked=true;
 onTab();
}catch(e){try{paint()}catch(e2){}}
"""

labels_js = "{" + ",".join(json.dumps(s) + ":" + json.dumps(lbl) for _, s, lbl, _, _ in ALL_SECTIONS) + ",'home':'🏠 Home'}"
ids_js = json.dumps([s for _, s, _, _, _ in ALL_SECTIONS])
js_final = JS_HEAD.replace("TOKEN_IDS", ids_js).replace("TOKEN_LBL", labels_js).replace("TOKEN_QZ", json.dumps(QUIZZES))
js_final = "var MD_SRC=" + json.dumps(RAW_MD) + ";" + js_final


GROUP_META = [
    ("pbi",   "⚡ Power BI Track", "ba"),
    ("excel", "📗 Excel Track", "ba"),
    ("pq",    "🧹 Power Query Track", "ba"),
    ("sql",   "🗄️ SQL Track", "ba"),
    ("tb",    "📊 Tableau Track", "ba"),
    ("py",    "🐍 Python for Finance", "ba"),
    ("st",    "📐 Statistics for Finance", "ba"),
    ("viz",   "🎨 Data Visualization", "ba"),
    ("ts",    "🔮 Time Series & Forecasting", "ba"),
    ("eng1",  "📕 Basic English", "eng"),
    ("eng2",  "🗞️ Business News Speaking", "eng"),
    ("eng3",  "📖 Business Vocabulary", "eng"),
    ("eng4",  "✉️ Email Writing", "eng"),
    ("eng5",  "📝 Grammar for Interviews", "eng"),
    ("eng6",  "📚 English Reading Practice", "eng"),
    ("eng7",  "👥 Group Discussion Skills", "eng"),
    ("eng8",  "🎤 Interview Communication", "eng"),
    ("eng9",  "🎙️ Pronunciation & Voice Recording", "eng"),
    ("eng10", "👋 Self-Introduction Speaking", "eng"),
    ("eng11", "🗣️ Spoken English Fluency", "eng"),
    ("avg",   "🧮 Averages", "apt"),
    ("blood", "🩸 Blood Relations", "apt"),
    ("di",    "📊 Data Interpretation", "apt"),
    ("pct",   "💯 Percentages", "apt"),
    ("lr",    "🧩 Logical Reasoning Puzzles", "apt"),
    ("ns",    "🔢 Number Series", "apt"),
    ("pp",    "🎲 Permutations & Combinations", "apt"),
    ("pb",    "🎰 Probability", "apt"),
    ("pl",    "💰 Profit & Loss", "apt"),
    ("ra",    "⚖️ Ratio & Proportion", "apt"),
    ("si",    "🏦 Simple & Compound Interest", "apt"),
    ("sy",    "🔗 Syllogisms", "apt"),
    ("sd",    "🚄 Time, Speed & Distance", "apt"),
    ("tw",    "⏱️ Time & Work", "apt"),
    ("ac",    "📒 Accounting", "fin"),
    ("cf",    "🏦 Corporate Finance", "fin"),
    ("bf",    "🧠 Behavioural Finance", "fin"),
    ("dv",    "📉 Derivatives", "fin"),
    ("fa",    "📊 Financial Statement Analysis", "fin"),
    ("fi",    "🛡️ Fixed Income", "fin"),
    ("in2",   "🇮🇳 Indian Market", "fin"),
    ("ec",    "🌍 Micro & Macro Economics", "fin"),
    ("pm",    "🧺 Portfolio Management", "fin"),
    ("rt",    "🔍 Ratio Analysis", "fin"),
    ("tv",    "⏳ Time Value of Money", "fin"),
    ("wm",    "💎 Wealth Management", "fin"),
    ("cb",    "🏗️ Capital Budgeting", "fin"),
    ("ia",    "📜 Ind AS & IFRS", "far"),
    ("rr",    "💰 Revenue Recognition", "far"),
    ("ls",    "🔑 Leases", "far"),
    ("ic",    "📦 Inventory & COGS", "far"),
    ("dp",    "🏭 Depreciation & PP&E", "far"),
    ("dt",    "🧾 Deferred Tax", "far"),
    ("cs",    "🏢 Consolidated Financials", "far"),
]
UMBRELLA_META = [
    ("ba",  "🎓 Business Analytics"),
    ("eng", "🗣️ English"),
    ("apt", "🧮 Aptitude"),
    ("fin", "💼 Finance Core"),
    ("far", "📚 Finance: Accounting & Reporting"),
]
_megas = []
for _uk, _utitle in UMBRELLA_META:
    _dd = []
    _nc, _ns = 0, 0
    for _gk, _gtitle, _gu in GROUP_META:
        if _gu != _uk:
            continue
        _items = "\n".join(_nav_groups.get(_gk, []))
        if not _items:
            continue
        _open = " open" if _gk == "pbi" else ""
        _dd.append(
            '<li class="navdd-li"><details class="navdd"%s><summary class="navgroup"><span class="ddtitle">%s</span>'
            '<span class="ddcount">%d</span><span class="ddarrow">▾</span></summary><ul class="ddlist">%s</ul></details></li>'
            % (_open, _gtitle, _nav_counts.get(_gk, 0), _items))
        _nc += 1
        _ns += _nav_counts.get(_gk, 0)
    if _dd:
        _megas.append(
            '<li class="navmega-li"><details class="navmega %s" open>'
            '<summary class="navmegah"><span class="megatitle">%s</span>'
            '<span class="megacount">%d course%s · %d section%s</span><span class="ddarrow">▾</span></summary>'
            '<ul class="megalist">%s</ul></details></li>'
            % (_uk, _utitle, _nc, "" if _nc == 1 else "s", _ns, "" if _ns == 1 else "s", "\n".join(_dd)))
nav_html = "\n".join(_megas)
home_final = HOME.replace("CARDS_TOKEN", "\n".join(home_cards))
sections_html = "\n".join(parts)
# fix escaped @{} markers we used to avoid brace conflicts in CSS
CSS = CSS.replace("@{", ":root{").replace("@}", "}")
CSS += ("\n.aud{display:block;margin:14px 0;padding:13px 15px;border:1px solid var(--line);border-radius:16px;"
        "background:linear-gradient(135deg,color-mix(in srgb,var(--acc) 10%,transparent),transparent)}"
        "\n.aud .audcap{display:block;font-size:.86rem;font-weight:800;margin-bottom:9px}"
        "\n.aud audio{width:100%;height:36px;border-radius:10px;outline:none;display:block}")

doc = """<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Skill Academy · Zero → Expert</title>
<style>""" + CSS + """</style></head>
<body>
""" + RADIOS + """
<input class="navchk" type="checkbox" id="navchk">
<div id="readbar"></div>
<header>
 <label class="hbtn burger" for="navchk" title="Menu">☰</label>
 <div class="brand"><span class="dot"></span>Skill Academy</div>
 <div class="swrap"><input id="search" placeholder="Search course… ( / )"></div>
 <button class="hbtn" id="theme">◐</button>
 <span class="flame">🔥<span class="fnum" id="flamec">0</span></span>
 <div class="progwrap"><span class="plabel" id="ptext"></span><div class="prog"><i id="pfill"></i></div></div>
</header>
<aside>
<div class="ddctl"><button id="exall">▾ Expand all</button><button id="coall">▴ Collapse</button></div>
<ul>
 <li class="home-li"><label class="navlink" for="r-home"><span class="ni">🏠</span><span class="lbl">Home</span></label></li>""" + nav_html + """
</ul></aside>
<div class="toc" id="tocbox"></div>
<main>
""" + sections_html + "\n" + home_final + """
</main>
<div id="drawer">
 <div class="dhead"><span id="dtitle">📝 Notes</span><button class="hbtn" id="dclose" style="margin-left:auto">✕</button></div>
 <textarea id="dtext" placeholder="Your thoughts, errors, aha-moments… (auto-saved on this device)"></textarea>
 <div class="dfoot"><span id="dsaved">auto-saved on this device</span></div>
</div>
<div id="namebar"><div class="nb">
 <h3 style="margin:0 0 6px">🎓 Certificate of Completion</h3>
 <p class="mut" style="margin:0">Type your name as it should appear:</p>
 <input id="cname2" placeholder="e.g., Aarav Sharma" maxlength="40">
 <button class="cta" id="mkcert">Generate my certificate ✨</button>
</div></div>
<div id="certWrap"><div class="cert">
 <div class="seal">🏅</div>
 <h2>Certificate of Completion</h2>
 <p>This certifies that</p>
 <div class="cname" id="cname">—</div>
 <p>has completed the full <b>Skill Academy: Zero → World-Class Expert</b> program —<br>
 386 sections across 54 courses: Power BI, Excel, Power Query, SQL, Tableau, Python, Statistics, Data Visualization, Time Series, Basic English, Business News Speaking, Business Vocabulary, Email Writing, Interview Grammar, Reading Practice, Group Discussion, Interview Communication, Pronunciation Lab, Self-Introduction Speaking, Spoken Fluency, Averages, Blood Relations, Data Interpretation, Percentages, Logical Reasoning Puzzles, Number Series, Permutations & Combinations, Probability, Profit & Loss, Ratio & Proportion, Simple & Compound Interest, Syllogisms, Time Speed & Distance, Time & Work, Accounting, Corporate Finance, Behavioural Finance, Derivatives, Financial Statement Analysis, Fixed Income, Indian Market, Economics, Portfolio Management, Ratio Analysis, Time Value of Money, Wealth Management, Capital Budgeting, Ind AS-IFRS, Revenue Recognition, Leases, Inventory-COGS, Depreciation-PPE, Deferred Tax & Consolidated FS (incl. advanced + finance),<br>
 DAX, finance dashboards, forecasting, market-talk & interview-ready language skills — the complete data-analyst stack.</p>
 <div class="cdate" id="cdate">—</div>
 <p style="margin-top:14px;font-size:.8rem">— Your Arena AI Tutor —</p>
 <div class="certbtns"><button class="cta small" id="pprint">🖨 Print / Save PDF</button>
 <button class="cta small ghost" id="pclose">Close</button></div>
</div></div>
<div id="mdmodal"><div class="mdbox">
 <div class="dhead">📄 <span id="mdtitle">Markdown</span>
  <span style="margin-left:auto;display:flex;gap:8px">
   <button class="mdcopy" id="mdcopy">Copy</button>
   <button class="ghostbtn" id="mddown">Download .md</button>
   <button class="ghostbtn" id="mdclose">✕ Close</button>
  </span></div>
 <pre id="mdtext"></pre>
</div></div>
<canvas id="confetti"></canvas>
<button class="hbtn" id="top">↑</button>
<script>""" + js_final + """</script>
</body></html>"""

with open(OUT, "w", encoding="utf-8") as f:
    f.write(doc)
print("Wrote", OUT, "-", round(os.path.getsize(OUT) / 1024), "KB")
