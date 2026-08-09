#!/usr/bin/env python3
# Patch build_app_v37.py -> build_app_v38.py : adds Syllogisms course (sy1..sy6)
import io

SRC = "tools/build_app_v37.py"
DST = "tools/build_app_v38.py"

s = io.open(SRC, encoding="utf-8").read()
orig_len = len(s)

def rep(old, new, n=1):
    global s
    c = s.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:80]!r}"
    s = s.replace(old, new)

rep('PowerBI_Course_App_v37.html', 'PowerBI_Course_App_v38.html')

int_tail = '    ("INT_06_Finance_Treasury_Capstone.md", "si6", "INT6 · FINANCE: Treasury & Debt + Capstone", "\\U0001F4BC", "FD ladders, 42.6% unmask, EMI braid, Treasury Memo"),\n]\n'
sy_list = int_tail + '''
SY_SECTIONS = [
    ("SY_01_Statements_Golden_Law.md", "sy1", "SY1 · Statements, AEIO & the Golden Law", "\\U0001F517", "A/E/I/O forms, only-flips, statements-as-gospel"),
    ("SY_02_Circle_Method_All_No.md", "sy2", "SY2 · The Circle Method", "\\u2B55", "nested/separated circles, chains, conversion table"),
    ("SY_03_Some_Particulars_Chains.md", "sy3", "SY3 · Some & the Particulars", "\\U0001F3B2", "I/O pictures, A+I escort chain, two-particulars poverty"),
    ("SY_04_Possibility_Either_Or.md", "sy4", "SY4 · Possibility & Either-Or", "\\U0001F500", "possibility court, complementary pairs, three gates"),
    ("SY_05_Traps_Triage_Mock.md", "sy5", "SY5 · Traps, Triage & Mock Arena", "\\u26A1", "5 named traps, 5-gate radar, SY-01 arena"),
    ("SY_06_Finance_Compliance_Capstone.md", "sy6", "SY6 · FINANCE: Compliance Logic + Capstone", "\\U0001F4CB", "rule registers, verdicts, Policy-Logic Audit"),
]
'''
rep(int_tail, sy_list)

rep(' + RA_SECTIONS + INT_SECTIONS\n', ' + RA_SECTIONS + INT_SECTIONS + SY_SECTIONS\n')

rep('"ra": [], "si": []}', '"ra": [], "si": [], "sy": []}')
rep('"ra": 0, "si": 0}', '"ra": 0, "si": 0, "sy": 0}')

rep('    if sid == "si1":\n        _gcur = "si"\n',
    '    if sid == "si1":\n        _gcur = "si"\n    if sid == "sy1":\n        _gcur = "sy"\n')

rep('    ("si",    "🏦 Simple & Compound Interest", "apt"),\n]',
    '    ("si",    "🏦 Simple & Compound Interest", "apt"),\n    ("sy",    "🔗 Syllogisms", "apt"),\n]')

rep('Ratio & Proportion · NEW! 🏦 Simple & Compound Interest) — every track basic→advanced, finance-flavored · 561 auto-graded quiz questions',
    'Ratio & Proportion · Simple & Compound Interest · NEW! 🔗 Syllogisms) — every track basic→advanced, finance-flavored · 579 auto-graded quiz questions')

rep('<b data-count="187">0</b><span>Sections</span>', '<b data-count="193">0</b><span>Sections</span>')
rep('<b data-count="183">0</b><span>Hands-on labs</span>', '<b data-count="189">0</b><span>Hands-on labs</span>')
rep('<b data-count="561">0</b><span>Quiz questions</span>', '<b data-count="579">0</b><span>Quiz questions</span>')

rep(' 187 sections across 31 courses:', ' 193 sections across 32 courses:')
rep('Probability, Profit & Loss, Ratio & Proportion & Simple & Compound Interest (incl.',
    'Probability, Profit & Loss, Ratio & Proportion, Simple & Compound Interest & Syllogisms (incl.')

qz = '''
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
"m10": ['''
rep('"m10": [', qz)

io.open(DST, "w", encoding="utf-8").write(s)
print(f"patched {SRC} -> {DST}: {orig_len} -> {len(s)} bytes")
