# 🎯 SY3 · Some & the Particulars
> The two weakest words in logic run the most dangerous district: **some** and **some-not**. Learn exactly what an I or O buys you (existence, not coverage), the ONE beautiful chain that survives a particular premise (**All A are B + Some C are A ⇒ Some C are B**), and why two particulars together are a shrug.

## 🎯 Objectives
- Draw **I (Some S are P)** and **O (Some S are not P)** correctly: overlap-only for I; the O-diagram's dot lives OUTSIDE P.
- Execute the one safe particular chain: **a "some" of a fully-captured class inherits the class's property** (A + I ⇒ I).
- Reject the two-particulars poverty: **I + I ⇒ nothing definite**; I + O ⇒ nothing definite.
- Block the **SOME OVERREACH** trap: "some" premises never earn "all" conclusions.
- Handle the case-sensitivity of possibilities under particulars (which roads stay open — SY4 cashes this in).

## 📘 Concepts

### 3.1 The pictures — a dot, not a fence
```text
I: Some S are P                 O: Some S are not P
  ┌────┐  ┌────┐                 ┌────────┐
  │ S  │..│ P  │                 │ S      │
  │   ██  │    │                 │  ●     │   ┌────┐
  └────┘  └────┘                 └────────┘   │ P  │
    ██ = overlap guaranteed                  └────┘
    (the rest of both = open territory)    ● = at least one S outside P
```

An I-statement guarantees exactly ONE thing: the overlap is inhabited. The rest of S, the rest of P — **terra incognita**. An O-statement guarantees a single dot of S sitting outside P; about the *remaining* S it maintains professional silence.

### 3.2 Some ⇏ Some-Not, and Some-Not ⇏ Some — the twin towers don't talk
"Some discounts are festive" — maybe ALL of them are? You don't know. So "some discounts are not festive" is NOT earned. Reverse too: "some SKUs are not barcoded" — tells you nothing about whether ANY SKU is barcoded (maybe none!). The twins live closer in everyday speech than in logic; in the arena they don't even wave at each other. **I never yields O; O never yields I.**

### 3.3 The golden particular chain — A + I ⇒ I
```text
All CAs are graduates. (A: CA ⊆ graduates)
Some auditors are CAs. (I: auditors ∩ CA inhabited)
⇒ Some auditors are graduates. ✓
Why: take that one auditor who IS a CA — the All-net drags them into graduates. Some is all we claimed.
```

The asymmetry that prints marks: the chain works because **All captured the member we know exists**. Flip which class is "some" and the magic vanishes:

```text
All CAs are graduates. Some graduates are auditors.
⇒ Some auditors are CAs?  NO — the "some graduates" might all live OUTSIDE the CA circle.
Draw: big graduates-ring, a dot of auditors in the ring's CA-free zone. Statements happy, conclusion dead.
```

Drug of choice for every particular chain: ask **"did the premises escort my known-existing member all the way to the target?"** If the escort passes through an All at every step, yes; if any leg is a "some" wandering through unowned territory, no.

### 3.4 Two particulars = a shrug
```text
Some vendors are registered. Some vendors are punctual.
⇒ Some registered are punctual?   NO.
Draw: three circles meeting in pairs but never in triple-overlap. Legal. Conclusion dead.
```

**I + I forces nothing. I + O forces nothing. O + O forces nothing.** One universal premise is the minimum entry ticket into the definite-conclusion club. (Exam authors make the shrug look juicy: "Some toppers are lazy. Some lazy people are rich." ⇒ Some toppers are rich? A shrug in a suit.)

### 3.5 The O-chains that DO work (universal escort, again)
- **All A are B. Some C are not B. ⇒ Some C are not A** ✓ — the C-dot outside B is automatically outside everything inside B, including A. *("All invoices over ₹50k carry GST. Some entries in the old ledger are not GST-carrying ⇒ those entries aren't ₹50k+ invoices.")*
- **All A are B. No B is C. ⇒ Some…** if additionally "Some D are A": then Some D are B, and Some D are not C (the classical "some-not" harvest). Universals do the heavy lifting; the some-tag comes along for the ride.

### 3.6 Trap radar for particulars (SY5's greatest hits, preview)
1. **SOME OVERREACH** — "Some agents are riders ⇏ All agents are riders."
2. **TWIN TOWERS TALK** — "I ⇒ O" smuggling.
3. **TRIPLE-OVERLAP MIRAGE** — I + I ⇒ the shared "some."
4. **ESCORT REVERSAL** — All B are A + Some C are A ⇏ Some C are B (the escort walked the wrong way — only "Some B are C" is possible, not forced).
5. **O → ALL LEAP** — "Some S are not P" never bounds the rest of S.

## 🧪 LAB — Particular gym (10 min)
1. All employees have badges. Some trainees are employees. ⇒ offered: (i) Some trainees have badges (ii) Some badge-holders are trainees. Verdicts?
2. All refunds need receipts. Some requests are not receipts-backed. ⇒ offered: (i) Some requests are not refunds (ii) Some refunds are not requests. Verdicts?
3. Some pickers are fast. Some fast people are riders. ⇒ "Some pickers are riders." Kill it with one drawing sentence.
4. Some suppliers are not GST-registered. ⇒ offered: "Some suppliers ARE GST-registered." Verdict + reason.
5. All CA-holders are graduates. Some graduates are riders. ⇒ "Some CA-holders are riders." Verdict, plus the drawing that kills it.

**Why this matters:** particulars are where the marks are lost *quietly*; people FEEL the overlap that the paper never promised.

**🔑 Lab answers:** (1) (i) ✓ escorted chain A+I ⇒ I (ii) ✓ I-conversion of (i) (2) (i) ✓ the O-escort (All A are B + Some C not B ⇒ Some C not A) (ii) ✗ — refunds ⊆ receipts-needing; says nothing about request-membership; possible, not forced (3) draw pairs-overlap circles: pickers∩fast and fast∩riders with EMPTY triple zone (4) ✗ — O is silent about the rest of S; maybe NO supplier is registered (5) ✗ — the "some graduates" dot lives in the ring outside CA-holders; kill-drawing: graduates-circle, CA-circle inside, auditors… riders-dot in graduates-minus-CA zone.

## 💪 Exercises
1. All leads are graduates. Some associates are leads. ⇒ (i) Some associates are graduates (ii) Some graduates are associates (iii) All associates are graduates.
2. Some invoices are manual. No manual invoice is auto-approved. ⇒ "Some invoices are not auto-approved."
3. Two particular poverty: Some agents are insured. Some agents are riders. ⇒ can we reach "Some insured are riders"? Answer with the legal drawing.
4. All pilots are licensed. Some crew are not licensed. ⇒ offer the strongest forced conclusion about crew and pilots.
5. Twin towers: "Some stores are profitable." Offered: "Some stores are not profitable." Referee's call + the single-word reason.
6. All A are B. Some B are C. Offered: (i) Some A are C (ii) Some B are A (iii) Some C are B. Verdicts?
7. Written-set drill (finance flavor): "All KYC-complete accounts may trade. Some legacy accounts are not KYC-complete." Two offered lines: (i) Some legacy accounts may not trade — careful, does 'may not trade' follow? (ii) No conclusion about trading follows for legacy accounts. Pick + justify.

### ✅ Selected answers
1. (i) ✓ A+I chain (ii) ✓ downhill conversion of an All… wait — (ii) follows from (i) by I-conversion ✓ (iii) ✗ SOME OVERREACH.
2. ✓ — take the inhabited manual∩invoices dot: manual ⇒ never auto-approved ⇒ at least one invoice outside auto-approved. (I + E ⇒ O — the escorted some-not harvest.)
3. **No** — draw insured-circle and rider-circle inside/overlapping agents-circle at *disjoint* zones; both "some agents" satisfied, shared overlap empty. Statements hold, conclusion fails.
4. Some crew are not pilots ✓ — the unlicensed crew-dot can't sit inside licensed, and pilots ⊆ licensed, so it lives outside pilots. **Forced.** (Never "all crew are not pilots" — overreach again.)
5. **Rejected** — "some" might be all; I never yields O. One word: **possibly-all**.
6. (i) ✗ the C-dots may sit outside A (escort reversal dies) (ii) ✓ All A are B ⇒ Some B are A (iii) ✓ Some B are C ⇒ I-conversion Some C are B.
7. **(ii)** — "may trade" is a permission granted KYC-complete accounts; the statements never DENY trading to non-complete accounts (the gate isn't stated to be the only door). So no conclusion about legacy trading follows — not even a "may not." Logic only moves along stated arrows. *This is exactly how policy language fools compliance juniors — SY6 monetizes it.*

## ❓ Quiz
1. "All CAs are graduates. Some auditors are CAs." forces:
   - (a) all auditors are graduates
   - (b) some auditors are graduates — the inhabited auditors∩CA dot is dragged inside graduates by the All-net; some is all we can honestly invoice
   - (c) some graduates are not auditors
2. "Some vendors are registered. Some vendors are punctual." — what follows about registered vs punctual?
   - (a) some registered are punctual
   - (b) nothing definite — two particulars share no forced relation; three circles can overlap pairwise with an empty triple zone
   - (c) no registered vendor is punctual
3. "Some SKUs are not barcoded" lets us infer about barcoded SKUs:
   - (a) some SKUs are barcoded
   - (b) nothing at all — an O-statement is professionally silent about the rest of S; maybe none are barcoded
   - (c) most SKUs are barcoded

### ✅ Answers
1. **(b)** — (a) is SOME OVERREACH; the All-escort has jurisdiction only over the members we know exist.
2. **(b)** — the pairwise-overlap/empty-triple drawing is the universal killer. One universal premise is the minimum entry ticket to certainty.
3. **(b)** — twin towers don't talk; O⇒I smuggling is the second-most common wrong answer in bank papers.

## ✅ Mastery checklist
- [ ] I-picture = inhabited overlap; O-picture = one dot outside — drawn in 5 seconds
- [ ] I never yields O, O never yields I — twin towers don't talk
- [ ] A + I ⇒ I is my one beloved chain, and I check the escort direction first
- [ ] Two particulars = a shrug; I + E ⇒ O harvested when the dot's escort is universal
- [ ] SOME OVERREACH bounces off me reflexively ("some" never becomes "all")
- [ ] I ask "is my known-existing member escorted All the way?" before endorsing any chain

**Next:** **SY4 · Possibility & Either-Or** — conclusions that MIGHT be true (and how to test them in one question), plus the either-or twins: when do two weak answers team up into a guaranteed pair? The most exam-weaponized corner of the subject! 🔀
