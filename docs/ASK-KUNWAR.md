# Ask Kunwar — Central AI Gateway & Grounded Intelligence Architecture

Ask Kunwar retrieves verified site passages, platform documentation, calculators, and live market observations to synthesize grounded institutional answers with validated inline citations.

---

## 1. Central Multi-Provider Gateway

- All AI inferences run through the centralized gateway (`lib/ai/gateway.ts`), which manages task-specific routing across enterprise providers (**Google Gemini** and **Groq**).
- **Multi-Credential Non-Random Selection:** Administrators can configure multiple API keys per provider in the Admin AI Control Center. The gateway selects credentials based on health, priority, circuit breaker state, and rate-limit cooldown.
- **Failover:** If the primary provider encounters HTTP 429 rate limits, 5xx server errors, or network timeouts, the gateway performs a single, bounded failover to the configured fallback provider without infinite retry loops.
- **Deterministic & Local Fallback:** When external providers are unconfigured, disabled, timed out, or halted by the emergency kill-switch, Ask Kunwar gracefully falls back to deterministic local extractive knowledge (`lib/retrieval-qa.ts`). The platform never crashes or returns empty screens.

---

## 2. API Key Security & Encryption

- **Zero Plaintext Storage:** API keys are encrypted at rest using **AES-256-GCM** with a cryptographically secure 12-byte random IV (`crypto.randomBytes(12)`) and a 16-byte authentication tag.
- **Server-Only Boundary:** Decryption logic is strictly isolated in server-only modules (`import 'server-only'`). Decrypted secrets are NEVER returned via public APIs or rendered into HTML/React props.
- **Masked View Only:** In the Admin Control Center, keys are displayed exclusively as masked strings (e.g. `gsk_••••••••••••abcd` or `AIza••••••••••••3412`).
- **Audit Logging:** Administrative operations (adding keys, updating routing, toggling kill-switch) are recorded in `AIAdminAuditLog` without exposing secret values.

---

## 3. Central Knowledge Intelligence Engine (RAG)

- **Ingestion:** Automatically indexes approved public website content:
  - Financial terminal & markets documentation
  - 25+ financial analytical tools and calculators (`lib/tools-registry.ts`)
  - PGDM finance and analytics curriculum (`lib/pgdm/curriculum.ts`)
  - Institutional research reports and case studies (`lib/research-collections.ts`)
- **Semantic Chunking:** Splits long articles into semantic sections respecting headings and paragraphs (`lib/knowledge/chunker.ts`).
- **Page Context Awareness:** Detects the visitor's current page (e.g. `/tools/dcf-calculator`) and boosts relevant chunks so the assistant immediately understands the context of the user's question.
- **Live Market Connectors:** Real-time application connectors for market indices (Nifty 50, Sensex, 10Y G-Sec yield) ensure the assistant never answers live market queries from stale historical passages.
- **Citation Validation:** Validates inline citation indices (`[1]`, `[2]`) against provided context passages and strips hallucinated citations (`lib/knowledge/citation-validator.ts`).

---

## 4. Progressive Lead Qualification

- Visitors inquiring about institutional research advisory, custom financial modeling, or enterprise subscriptions can request an advisory consultation directly from the chat interface.
- Progressive data capture collects name, email, organization, and project scope with explicit user consent.
- Submissions are recorded in `AILeadCapture` and bridged to the platform's contact engine for administrative follow-up.
