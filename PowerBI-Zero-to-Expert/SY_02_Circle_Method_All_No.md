# 🎯 SY2 · The Circle Method — All, No & Chains
> Stop debating conclusions in your head — **draw the worlds**. All-statements nest circles, No-statements separate them, and when worlds overlap in *every* legal drawing, you've found a for-sure conclusion. Plus the three conversion rules that travel the AEIO map in reverse.

## 🎯 Objectives
- Draw **A (All S are P)** as a nested circle and **E (No S is P)** as separated circles — in under 5 seconds each.
- Chain two or more universal statements (All + All, All + No) and read off forced conclusions.
- Master the **false-friend draw**: sketch an arrangement where a tempting conclusion FAILS, to kill it.
- Apply the **conversion table**: No ↔ No and Some ↔ Some convert freely; All ⇒ Some converts downhill only.
- Never forget the **middle term**: two "All" statements chain **only through a shared middle** — and only when the middle is *fully* captured.

## 📘 Concepts

### 2.1 The A-circle and the E-gap — one picture per law
```text
A: All S are P.           E: No S is P.
   ┌─────────┐               ┌───┐   ┌───┐
   │  P      │               │ S │   │ P │
   │  ┌───┐  │               └───┘   └───┘  ← an uncrossable gap
   │  │ S │  │               (draw the empty middle as void)
   │  └───┘  │
   └─────────┘
The outside of P is mostly UNKNOWN territory — shade nothing there.
```

The A-picture hides the deadly detail: S sits *inside* P, but the P-region **outside S may be full, may be empty**. Everything All-statements do lives in that little ring of maybes. The E-picture is cleaner: total separation, no overlap, end of story.

### 2.2 Chaining universals — the middle term is the bridge
```text
All A are B.  All B are C.     ⇒  All A are C. ✓
(A inside B inside C — the nesting is transitive)

All A are B.  No B is C.       ⇒  No A is C.  ✓  (A is locked inside B; B never touches C)
All A are B.  No A is C.       ⇒  No B ... NO! B's ring outside A might touch C freely.
                                   Only "Some B are not C" — wait, draw it: B ⊂ ? ... 
                                   legal drawing exists with B partly in C ⇒ NOT forced.
```

The bridge law, chiseled: **the middle term (B) must be DISTRIBUTED — fully pinned down — in at least one premise.** "All A are B" distributes A (every A accounted for), but says nothing about B's full extent. Two statements sharing an *undistributed* middle chain into nothing:

```text
All A are B.  All C are B.     ⇒  ??? A and C are two tenants of B — no relation forced.
(Classic wrong answer: "Some A are C." It's POSSIBLE — never DEFINITE.)
```

### 2.3 The false-friend draw — killing conclusions like a pro
To show a conclusion is **not forced**, exhibit ONE drawing consistent with the statements that violates it. Example:

```text
Statements: All auditors are employees. All CA-holders are employees.
Offered:    Some auditors are CA-holders.

Killer draw: employees-circle containing two DISJOINT circles (auditors | CA-holders).
Statements happy, conclusion dead ⇒ NOT a valid conclusion. ✓
```

One legal counter-world beats a hundred plausible worlds. Conversely, if *every* legal drawing forces the overlap, the conclusion stands — that's the whole method: **try hard to break it; if you can't, it follows.**

### 2.4 The conversion table — legal U-turns only
| Statement | Converts to | Rule |
|---|---|---|
| No A is B (E) | No B is A ✓ | **Free U-turn** — separation is mutual |
| Some A are B (I) | Some B are A ✓ | **Free U-turn** — overlap is mutual |
| All A are B (A) | Some B are A ✓ | **Downhill only** — All shrinks to Some on the turn |
| All A are B (A) | ~~All B are A~~ ✗ | **THE ALL→ALL REVERSAL — eternal false friend** |
| Some A are not B (O) | — none | O converts into **nothing definite** |

Why the A shrink is safe: All A are B guarantees A's members exist inside B (syllogism-land assumes named sets aren't empty), so at least *some* B are A. Why the full reversal dies: draw B as a big circle with tiny A inside — premises hold, "All B are A" doesn't.

### 2.5 The 20-second protocol (drill this order)
1. Draw circles — one statement at a time; universals first (they pin the frame).
2. Mark the middle term; check it's distributed in a chaining premise.
3. For each offered conclusion, attempt a **false-friend draw** before trusting it.
4. Convert only via the table; All→All reversals and O-conversions are slander.
5. Answer with the strength it deserves: definite, possible, or dead.

## 🧪 LAB — Circle gym (10 min)
1. Chain: All pickers are badge-holders. All badge-holders are insured. Conclusions offered: (i) All pickers are insured (ii) All insured people are pickers (iii) Some insured are pickers. Verdicts?
2. All scooters are two-wheelers. No two-wheeler is permitted on the expressway. Offered: (i) No scooter is expressway-permitted (ii) No expressway-permitted vehicle is a scooter. Verdicts?
3. All CA-holders are employees. All auditors are employees. Offered: "Some auditors are CA-holders." Kill or confirm with a drawing (one line description).
4. Convert, if legal: "No intern is a signatory." / "All leads are graduates." / "Some agents are riders."
5. Middle-term audit: "All managers are bonus-eligible. Some trainees are bonus-eligible." Offered: "Some trainees are managers." Is the middle distributed? Verdict?

**Why this matters:** universals are the skeleton of every bank reasoning paper; speed here is free marks at scale.

**🔑 Lab answers:** (1) (i) ✓ nesting transitive (ii) ✗ All→All reversal (iii) ✓ downhill conversion (2) (i) ✓ A-chain into E (ii) ✓ E converts both ways (3) **kill** — draw employees-circle with two disjoint circles "auditors" and "CA-holders" inside; statements fine, overlap absent (4) No signatory is an intern ✓ · Some graduates are leads ✓ (downhill) · Some riders are agents ✓ (5) middle "bonus-eligible" never distributed → **invalid**; trainees and managers could be disjoint tenants.

## 💪 Exercises
1. All planners are analysts. All analysts are Excel users. Offered: (i) All planners are Excel users (ii) Some Excel users are planners (iii) All Excel users are planners.
2. All CAs are graduates. Some auditors are CAs. Offered: "All auditors are graduates." Kill it with one drawing sentence.
3. No contractor is insured. All riders are contractors. Offered: (i) No rider is insured (ii) No insured person is a rider (iii) Some insured are not riders.
4. Verdict + reason line: "All laptops are assets. All assets are logged." ⇒ "Some logged items are laptops."
5. Which conversions are legal? (a) Some stores are profitable → Some profitable things are stores (b) All stores are profitable → All profitable things are stores (c) No store is unprofitable → No unprofitable thing is a store
6. Statements: All A are B. All C are B. All B are D. Offered: "Some D are A." Verdict, and the conversion path.
7. Statements: All managers are employees. No employee is a part-timer. Offered: "Some part-timers are not managers." Verdict with a drawing argument.

### ✅ Selected answers
1. (i) ✓ forced (nesting) (ii) ✓ downhill conversion (iii) ✗ — the Excel-users ring outside planners may be huge; All→All reversal dies.
2. Draw graduates-circle with auditors sitting partly OUTSIDE CAs (only "some" auditors were captured) — statements hold, "All auditors are graduates" fails ⇒ **invalid**. (True conclusion: *Some* auditors are graduates ✓.)
3. (i) ✓ All+E chain (ii) ✓ E-conversion (iii) ✓ — riders are locked inside contractors, contractors never touch insured; so at least some insured are outside riders (in fact all of them are — but logicians answer the *offered* line, and this one is forced: everything insured is a non-rider, so "some insured are not riders" holds as long as insured people exist ✓).
4. ✓ — All A are B ⇒ A's members exist inside B ⇒ Some B are A; chain B→D lifts it: Some logged items are laptops (A ⊆ B ⊆ D, A non-empty ⇒ A ∩ D ≠ ∅).
5. (a) ✓ I converts freely (b) ✗ reversal slander (c) ✓ E converts freely.
6. ✓ — All A are B and All B are D ⇒ All A are D ⇒ (downhill) Some D are A.
7. ✓ — managers ⊆ employees, employees ∩ part-timers = ∅ ⇒ every part-timer is outside managers; so (provided part-timers exist) some part-timers are not managers — in fact all of them.

## ❓ Quiz
1. Statements: "All auditors are employees. All CA-holders are employees." Which conclusion is FORCED?
   - (a) Some auditors are CA-holders
   - (b) none of the offered All/Some links between auditors and CA-holders — the middle "employees" is distributed in neither premise; two tenants of one set share no forced relation
   - (c) All CA-holders are auditors
2. The legal conversion of "All leads are graduates" is:
   - (a) All graduates are leads
   - (b) Some graduates are leads — All converts only downhill, to Some; the graduates-ring outside leads may be enormous or empty, so the full reversal is never owed
   - (c) Some leads are not graduates
3. "All scooters are two-wheelers. No two-wheeler is expressway-permitted." Therefore:
   - (a) some two-wheelers are expressway-permitted
   - (b) no expressway-permitted vehicle is a scooter — A chains into E across a distributed middle ("all scooters…"), and E converts both directions freely
   - (c) some scooters are expressway-permitted

### ✅ Answers
1. **(b)** — disjoint-tenant drawing kills (a) and (c) instantly; demand the bridge or stay silent.
2. **(b)** — remember the table: E↔E, I↔I free; A→I downhill; everything else is slander.
3. **(b)** — scooters locked inside two-wheelers, two-wheelers exiled from expressways; the converted form is equally forced.

## ✅ Mastery checklist
- [ ] A = nested circle, E = separated circles — drawn before my coffee cools
- [ ] Universal chains only through a distributed middle — I audit the bridge first
- [ ] I kill weak conclusions with ONE false-friend drawing, not with vibes
- [ ] Conversion table engraved: E↔E, I↔I, A⇒I (downhill), All→All = false friend
- [ ] "Valid" means unbreakable under every legal drawing — I say why in one line
- [ ] O-statements convert into nothing — I never force them to

**Next:** **SY3 · Some & the Particulars** — the I and O kingdom: what some/some-not really buy you, safe chains (All + Some ⇒ Some), and the poverty of two particulars. The modal verb "might" is about to get a workout! 🎲
