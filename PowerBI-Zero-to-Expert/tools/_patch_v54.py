#!/usr/bin/env python3
# Patch build_app_v53.py -> build_app_v54.py
#   + Accounting & Reporting course 7: Consolidated Financial Statements, Ind AS 110 (cs1..cs12)
# QUIZ entries auto-extracted from the md files (single source of truth).
import os, re, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(BASE, "tools", "build_app_v53.py")
dst = os.path.join(BASE, "tools", "build_app_v54.py")
t = open(src, encoding="utf-8").read()

def rep(old, new, n=1):
    global t
    c = t.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:70]!r}"
    t = t.replace(old, new)

# ---------- 1. QUIZZES from md ----------
MD_FILES = [
 "CS_01_One_Creature_Many_Skins.md", "CS_02_Control_The_Three_Locks.md",
 "CS_03_The_Consolidation_Mechanics.md", "CS_04_Goodwill_and_the_NCI_Question.md",
 "CS_05_Attribution_and_the_Equity_Family.md", "CS_06_The_Elimination_Workshop.md",
 "CS_07_Goodwill_Never_Amortizes.md", "CS_08_The_Control_Cliff.md",
 "CS_09_Associates_and_Joint_Ventures.md", "CS_10_The_Foreign_Subsidiary.md",
 "CS_11_Group_Cash_Flows_and_the_Read.md", "CS_12_Capstone_The_Night_Shift.md",
]

def clean(s):
    return re.sub(r"\s+", " ", s.replace("**", "").replace("`", "")).strip()

def parse_quiz(fname):
    txt = open(os.path.join(BASE, fname), encoding="utf-8").read()
    m = re.search(r"## ❓ Quiz(.*?)(?:\n## |\Z)", txt, re.S)
    assert m, f"no quiz block in {fname}"
    body = m.group(1)
    am = re.search(r"### ✅ Answers(.*)", body, re.S)
    assert am, f"no answers block in {fname}"
    qpart, apart = body[:am.start()], am.group(1)
    answers = {}
    for x in re.finditer(r"(?m)^(\d)\.\s+\*\*\(([abcd])\)\*\*\s*[-—–]\s*(.+?)\s*$", apart):
        answers[int(x.group(1))] = (x.group(2), x.group(3))
    assert len(answers) == 3, f"{fname}: {len(answers)} answers"
    qblocks = re.split(r"(?m)^\*\*Q([123])\.\*\*\s*", qpart)
    assert len(qblocks) == 7, f"{fname}: {len(qblocks)} qblocks"
    out = []
    for i in (1, 3, 5):
        n, block = int(qblocks[i]), qblocks[i + 1]
        cut = block.find("\n(a)")
        assert cut > 0, f"{fname} Q{n}: no options marker"
        qtext, rest = block[:cut], block[cut:]
        parts = re.split(r"\(([abcd])\)\s*", rest)
        assert len(parts) == 9, f"{fname} Q{n}: split gave {len(parts)} parts -> {rest[:80]!r}"
        opts = [parts[j].strip() for j in (2, 4, 6, 8)]
        letter, w = answers[n]
        aidx = "abcd".index(letter)
        assert aidx == 1, f"{fname} Q{n}: correct answer not (b)!"
        out.append({"q": clean(qtext), "o": [clean(o) for o in opts], "a": aidx, "w": clean(w)})
    return out

quiz = {}
for f in MD_FILES:
    sid = "cs" + str(int(f[3:5]))
    quiz[sid] = parse_quiz(f)
assert len(quiz) == 12 and sum(len(v) for v in quiz.values()) == 36

qlines = []
for sid, entries in quiz.items():
    qlines.append(f'"{sid}": [')
    for e in entries:
        qlines.append("  " + json.dumps(e, ensure_ascii=True) + ",")
    qlines.append("],")
QUIZ = "\n".join(qlines) + "\n"

# ---------- 2. builder surgery ----------
rep('OUT = os.path.join(BASE, "PowerBI_Course_App_v53.html")',
    'OUT = os.path.join(BASE, "PowerBI_Course_App_v54.html")')

NEW_SECTIONS = r"""
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
"""
DT12 = r'    ("DT_12_Capstone_The_Shadow_Ledger.md", "dt12", "DT12 · CAPSTONE: The Shadow Ledger", "\U0001F3C6", "6 exhibits, current 22 + deferred 9 = 31.0 invariance, net DTL 0.5, 10-Q forge"),'
rep(DT12 + "\n]\n", DT12 + "\n]\n" + NEW_SECTIONS)

rep("PPE_SECTIONS + DT_SECTIONS\n", "PPE_SECTIONS + DT_SECTIONS + CS_SECTIONS\n")

rep('"ia": [], "rr": [], "ls": [], "ic": [], "dp": [], "dt": []}',
    '"ia": [], "rr": [], "ls": [], "ic": [], "dp": [], "dt": [], "cs": []}')
rep('"ia": 0, "rr": 0, "ls": 0, "ic": 0, "dp": 0, "dt": 0}',
    '"ia": 0, "rr": 0, "ls": 0, "ic": 0, "dp": 0, "dt": 0, "cs": 0}')

rep('    if sid == "dt1":\n        _gcur = "dt"\n',
    '    if sid == "dt1":\n        _gcur = "dt"\n    if sid == "cs1":\n        _gcur = "cs"\n')

rep('    ("dt",    "🧾 Deferred Tax", "far"),\n',
    '    ("dt",    "🧾 Deferred Tax", "far"),\n    ("cs",    "🏢 Consolidated Financials", "far"),\n')

rep('MAT → the Shadow Ledger!) — every track basic→advanced, finance-flavored · 1122 auto-graded quiz questions ·',
    'MAT → the Shadow Ledger · 🏢 Consolidated FS — one creature, many skins: the 152-goodwill grid, the attribution weave to 130.5, the NCI walk to 68.5, the control-cliff ceremony → the Night Shift!) — every track basic→advanced, finance-flavored · 1158 auto-graded quiz questions ·')

rep('<div class="stat"><b data-count="374">0</b><span>Sections</span></div>',
    '<div class="stat"><b data-count="386">0</b><span>Sections</span></div>')
rep('<div class="stat"><b data-count="370">0</b><span>Hands-on labs</span></div>',
    '<div class="stat"><b data-count="382">0</b><span>Hands-on labs</span></div>')
rep('<div class="stat"><b data-count="1122">0</b><span>Quiz questions</span></div>',
    '<div class="stat"><b data-count="1158">0</b><span>Quiz questions</span></div>')

rep(' 374 sections across 53 courses: ',
    ' 386 sections across 54 courses: ')
rep('Inventory-COGS, Depreciation-PPE & Deferred Tax (incl.',
    'Inventory-COGS, Depreciation-PPE, Deferred Tax & Consolidated FS (incl.')

rep('"m10": [', QUIZ + '"m10": [')

open(dst, "w", encoding="utf-8").write(t)
print("patched ->", dst, "| quiz entries:", sum(len(v) for v in quiz.values()))
