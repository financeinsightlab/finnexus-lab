# Builds PowerBI_Course_App_v3.html — bulletproof edition.
# Navigation works with ZERO JavaScript (pure CSS :target); JS only enhances.
import hashlib, html, json, os, re

BASE = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
OUT = os.path.join(BASE, "PowerBI_Course_App_v12.html")

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
# track-ordered master list: PBI, Excel (+x6), PQ (+p5), SQL, Tableau, Python, Statistics
FIN_PBI = FIN_SECTIONS[0:1]; FIN_XL = FIN_SECTIONS[1:2]; FIN_PQ = FIN_SECTIONS[2:3]
ALL_SECTIONS = SECTIONS + FIN_PBI + EXCEL_SECTIONS + FIN_XL + PQ_SECTIONS + FIN_PQ + SQL_SECTIONS + TABLEAU_SECTIONS + PYTHON_SECTIONS + STATS_SECTIONS

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
    text = re.sub(r"\[([^\]]+)\]\((https?://[^)\s]+|[^)\s]+)\)",
                  r'<a href="\2" target="_blank" rel="noopener">\1</a>', text)
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
_nav_groups = {"pbi": [], "excel": [], "pq": [], "sql": [], "tb": [], "py": [], "st": []}
_nav_counts = {"pbi": 0, "excel": 0, "pq": 0, "sql": 0, "tb": 0, "py": 0, "st": 0}
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
  <div class="kicker">🎓 PERSONAL ACADEMY · SELF-PACED · OFFLINE</div>
  <h1>Power BI<br><span>Zero → World-Class Expert</span></h1>
  <p>Full Power BI + Excel + Power Query + SQL + Tableau + Python + Statistics (basic→advanced) tracks, each with a FINANCE specialization · 141 auto-graded quiz questions · ShopKart retail + Finance GL + a real SQLite practice DB ·
  3 portfolio projects · PL-300 certification plan. Your progress, streaks and notes save automatically.</p>
  <div class="hero-act">
   <button class="cta" id="resumeBtn">▶ Continue learning</button>
   <label class="cta ghost" for="r-roadmap">View roadmap</label>
  </div>
 </div>
</div>
<div class="stats">
 <div class="stat"><b data-count="47">0</b><span>Sections</span></div>
 <div class="stat"><b data-count="43">0</b><span>Hands-on labs</span></div>
 <div class="stat"><b data-count="141">0</b><span>Quiz questions</span></div>
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
   <p class="mut">Complete all 12 sections to unlock your graduation certificate.</p>
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
 try{var _al=document.querySelector('aside .navlink[for="r-'+id+'"]');if(_al){var _dd=_al.closest('details');if(_dd)_dd.open=true;}}catch(e){}
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
$('#exall').addEventListener('click',function(){$all('aside details.navdd').forEach(function(d){d.open=true})});
$('#coall').addEventListener('click',function(){$all('aside details.navdd').forEach(function(d){d.open=false})});
// ---------- search ----------
$('#search').addEventListener('input',function(){var q=this.value.trim().toLowerCase();
 if(q){$all('aside details.navdd').forEach(function(d){d.open=true});}
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
    ("pbi",   "⚡ Power BI Track"),
    ("excel", "📗 Excel Track"),
    ("pq",    "🧹 Power Query Track"),
    ("sql",   "🗄️ SQL Track"),
    ("tb",    "📊 Tableau Track"),
    ("py",    "🐍 Python for Finance"),
    ("st",    "📐 Statistics for Finance"),
]
_dd = []
for _gk, _gtitle in GROUP_META:
    _items = "\n".join(_nav_groups.get(_gk, []))
    if not _items:
        continue
    _open = " open" if _gk == "pbi" else ""
    _dd.append(
        '<li class="navdd-li"><details class="navdd"%s><summary class="navgroup"><span class="ddtitle">%s</span>'
        '<span class="ddcount">%d</span><span class="ddarrow">▾</span></summary><ul class="ddlist">%s</ul></details></li>'
        % (_open, _gtitle, _nav_counts.get(_gk, 0), _items))
nav_html = "\n".join(_dd)
home_final = HOME.replace("CARDS_TOKEN", "\n".join(home_cards))
sections_html = "\n".join(parts)
# fix escaped @{} markers we used to avoid brace conflicts in CSS
CSS = CSS.replace("@{", ":root{").replace("@}", "}")

doc = """<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Power BI Zero → Expert · Interactive Academy</title>
<style>""" + CSS + """</style></head>
<body>
""" + RADIOS + """
<input class="navchk" type="checkbox" id="navchk">
<div id="readbar"></div>
<header>
 <label class="hbtn burger" for="navchk" title="Menu">☰</label>
 <div class="brand"><span class="dot"></span>Power BI Mastery</div>
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
 <p>has completed the full <b>Power BI + Excel: Zero → World-Class Expert</b> program —<br>
 47 sections covering Excel, Power Query, SQL, Tableau, Python & Statistics (incl. advanced + finance), Data Modeling,<br>
 DAX, finance dashboards, Service, Performance & capstones — the complete data-analyst stack.</p>
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
