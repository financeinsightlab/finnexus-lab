# 🎯 RR3 · Step 2: Performance Obligations — Counting the Promises

> The transaction price is one number; the performance obligations are what it's actually buying. Undercount promises (see "free" support) and revenue lands too early; overcount (see artificial unbundling) and it lands too late. Ind AS 115's Step 2 is a two-test discipline — capable-of-being-distinct, then distinct-in-the-contract-context — plus a series rule for repetitive services and a set of notorious judgment arenas (installation, integration, set-up fees, shipping) where revenue-recognition careers are won and lost.

---

## 🎯 Objectives

- Define a performance obligation and run the two distinct tests in order
- Fuse goods/services when the contract context demands it: integration, modification, customization, interdependence
- Apply the series guidance to repetitive service bouquets
- Judge the classic arenas: installation, set-up/activation activities, shipping, immaterial promises
- Read bundled-deal disclosures and reverse-engineer the PO map

## 📘 Concepts

### 3.1 The two tests — capable, then contextual

A promised good or service is a separate PO only if it passes BOTH:

1. **Capable of being distinct**: the customer can benefit from it on its own or with readily available resources — it has standalone utility (you can buy the machine without the AMC; the license works without the training).
2. **Distinct within the context of the contract**: the promise is separately identifiable FROM OTHER PROMISES in this particular deal — the contract doesn't fundamentally fuse it with neighbors. This second test kills most artificial unbundling.

Fail either → bundle with the neighbors until you reach a distinct unit. The output of Step 2 is not a list of goods — it's a list of **promises**, which is why software + unspecified upgrades + hosting might be one promise (access to a platform) while the same three items elsewhere are three.

### 3.2 The fusion indicators — when the contract welds promises together

Ind AS 115 names the welding signs that torch test 2:
- **Significant integration service**: you're delivering a COMBINED output the items feed into — construction: bricks, labor, design are inputs to one building-promise; ERP implementation where you knit modules into the client's system into one "solution."
- **Significant modification or customization**: one item customizes the other (industrial software configured deeply for the client's plant).
- **High interdependence/interrelation**: each item's fulfillment depends significantly on the other — the "solution" sells and the components don't transfer independently to the customer.
The mirror image: items the customer could buy separately and that don't transform each other stay distinct. Watch also **functional inseparability** in licenses (RR8): an online-updated anti-virus database is part of one continuous protection-promise, not software + updates.

### 3.3 The series guidance — repetitive services, one PO

When a promise is a **series of distinct goods/services that are substantially the same and transfer the same way over time** — a year of daily cleaning, monthly payroll processing, quarterly maintenance visits with the same scope — the series is treated as ONE performance obligation, with revenue spread by the progress-pattern of the service (typically time-elapsed straight line). Why this matters operationally: without the series rule, you would measure progress for every one of 365 tiny obligations; with it, annual contracts become one clean monthly-drip PO. Series discipline also applies to transaction-price allocation: variable amounts (usage-based fees) can attach to the series as a whole rather than each visit.

### 3.4 The judgment arenas — where Step 2 gets famous

- **Installation/assembly**: complex, customer-specific installation welding machine + commissioning into "a working line" → fused PO, revenue on acceptance, not delivery. Standard drop-in install that any technician could do → distinct service, machine revenue at delivery.
- **Set-up/activation activities** (telco activation fees, onboarding): if the activity transfers nothing the customer can benefit from by itself — pure administrative hurdle — it is not a PO; the fee rides into the real service (RR9's upfront-fee canon ₹1,000/month).
- **Shipping & handling**: if control passes before shipment, shipping is a separate service (or an accounting-policy election to treat post-control shipping as a fulfillment cost, expedient-style).
- **Immaterial promises**: genuinely trivial items (free keychain with a car) may be left out as a practical simplification — low cost items judged in the contract's context; do not stretch to "we think support is trivial."
- **Stand-ready obligations**: a promise to stand ready (technical support hotline, unspecified when-and-if updates) is a service delivered steadily — a PO, typically measured over time — even if the customer never calls.

### 3.5 Mapping real bundles

Telecom ₹24,000 canon (RR1 lab): handset + service → two POs, because the handset is useful with any SIM and the service doesn't transform the phone. SaaS contract: platform subscription + implementation — implementation is distinct ONLY if the customer could use it with another platform or another vendor could do it (rare in deep-config products: fused, recognized over subscription life). Equipment + 3-year AMC + spare-parts commitment: three POs at three timings (delivery, over-time, as-consumed). The disclosure payoff: Ind AS-115 companies must show "disaggregated revenue" — the PO map is literally printed in the notes, and you now know how to audit it.

## 🧪 LAB — Count the Promises (10 min)

Four deals for PO counting, with one-line reasons:

1. **NovaTools** sells a CNC machine (₹40L) + complex integration into the client's fully-automated line (₹8L) + 3-yr AMC (₹6L). How many POs and when does machine revenue hit?
2. **CleanDesk** signs a 12-month daily office-cleaning deal — same crew, same scope.
3. **SoftKart** SaaS: 12-month platform subscription ₹1.2L + onboarding fee ₹30k (pure provisioning, no transferable know-how).
4. **AutoKart** sells a car + free 4 services (first 4 years) + free keychain.

**Why this matters:** PO counting under time pressure, with reasons — the exact shape of the interview question and the audit challenge.

**🔑 Lab answers:**
1. **TWO** POs: (machine + integration fused into one "working line" promise — significant integration welding) and the AMC (distinct, over-time). Machine revenue waits for integration acceptance — delivery alone doesn't transfer a working-line promise.
2. **ONE** PO — the series guidance: substantially-same daily services, same pattern, one obligation, straight monthly drip.
3. **ONE** PO — onboarding transfers no standalone benefit (RR9 canon): ₹1.5L total over 12 months = **₹12,500/month** (1,20,000 + 30,000 = 1,50,000 ÷ 12 ✓).
4. Effectively **TWO** POs — the car (point in time) and the free-service package (service-type warranty/PO, over 4 years, funded by allocating part of the car's price); the keychain is immaterial — left out.

## 💪 Exercises

1. Why does "customer could buy each piece separately" NOT alone create distinct POs?
2. A vendor sells standard software + deep configuration (6 months, changes core logic to the client's process). PO verdict?
3. Pass-test practice: in a tower contract the cement, labor, and design arrive as separate invoices — how many POs and why?
4. A dealer sells TVs + "free" 1-yr brand-extended warranty beyond the standard assurance term. Where does the warranty live in Step 2 (warm-up for RR8)?
5. Write the memo: your CFO wants each of 1,200 monthly service visits treated as its own line-item PO "for precision."

### ✅ Selected answers

1. Because test 2 (context) operates even when test 1 passes: the contract can weld separately-purchasable items through integration, customization, or interdependence. Distinctness is judged against THIS deal's logic, not a catalogue.
2. **Fused** — significant modification/customization welding: one PO, revenue over the config-plus-delivery pattern (typically % of the project), not on license handover.
3. **One PO** — significant integration service: you promise a tower, and the inputs never transfer to the customer independently; their combination IS the asset being built under his control.
4. The extended piece is a **service-type warranty** — a PO in its own right (RR8): allocate some of the TV's price to it, recognize over the coverage period; the standard assurance piece stays an Ind-AS-37 provision.
5. "The series guidance exists precisely for this: 1,200 substantially-identical visits transferring the same way over time collapse into ONE PO with a time-elapsed pattern. Precision comes from correct patterning, not from 1,200 rows — the notes will show one service line, and the audit will be cleaner."

## ❓ Quiz

**Q1.** A promised item is a separate performance obligation only when:
(a) it has its own invoice line
(b) it is capable of being distinct AND separately identifiable within the contract's context — both tests, in that order
(c) the customer paid for it separately
(d) management designated it a PO in the policy manual

**Q2.** Complex on-site integration welding a sold machine into the client's automated line means:
(a) machine revenue at delivery, integration as delivered
(b) machine + integration fuse into one "working line" PO — machine revenue waits for the combined output/acceptance
(c) machine revenue always at factory gate
(d) integration is immaterial

**Q3.** Twelve months of identical daily housekeeping is:
(a) 365 obligations
(b) a single series PO recognized by the service's progress pattern — typically straight line over the year
(c) 12 obligations, one per invoice
(d) one point-in-time obligation at year-end

### ✅ Answers

1. **(b)** — capable first, contextual second; contracts can weld catalogue-distinct items.
2. **(b)** — the welding indicators kill delivery-day machine revenue.
3. **(b)** — the series rule collapses the visits; the pattern (time) does the recognizing.

## ✅ Mastery checklist

- [ ] I can run capable-then-contextual on any bundle in order, out loud
- [ ] I can cite the three welding indicators with one example each
- [ ] I can apply series guidance and defend the one-PO consequence
- [ ] I can judge installation, set-up fees, shipping, immaterial items, stand-ready
- [ ] I can read a disaggregated-revenue note and replay the PO map

**Next:** RR4 prices the deal — variable consideration and its constraint, the significant-financing machine (₹100L → ₹116.64), non-cash consideration, and payments going back to the customer.
