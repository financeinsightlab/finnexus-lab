# Central AI Intelligence Platform — Audit & Architecture Report (Phase 0 / Stage 1)

**Date:** November 2026  
**Repository:** `financeinsightlab/finnexus-lab`  
**Domain:** `https://kunwaranalytics.in`  
**Execution Environment:** Google Antigravity  

---

## 1. Executive Summary

Kunwar Analytics has an established, high-traffic financial terminal, research publication ecosystem, and placement preparation suite. Prior to this upgrade, AI integrations were fragmented:
1. `lib/hf-provider.ts` and `lib/placement-war-room/ai-client.ts` directly targeted Hugging Face's router (`https://router.huggingface.co/v1/chat/completions`) using `HUGGINGFACE_API_KEY` and fixed model `mistralai/Mistral-7B-Instruct-v0.3`.
2. Provider keys required deployment environment variables, preventing on-the-fly credential updates, key rotation, or failover across providers (Gemini vs. Groq).
3. Plaintext key exposure or reliance on manual `.env` updates created maintenance overhead and single-point-of-failure risks.
4. Website knowledge retrieval was limited to local search hits and fixed platform passages without an automated multi-source RAG engine, administrative document ingestion, or grounded web search intelligence.

This audit establishes the baseline for the **Central AI Intelligence Platform**:
- A unified gateway under `lib/ai/` supporting Google Gemini and Groq.
- Non-plaintext credential management (AES-256-GCM + 12-byte random nonce + auth tag) managed completely via the Admin Panel.
- Multi-credential management with priority, rate-limit cooldown, and health tracking.
- Central Knowledge Engine under `lib/knowledge/` indexing website articles, tools, calculators, admin uploads (PDF, DOCX, CSV, XLSX, URLs), and live market connectors.
- Floating Ask Kunwar AI upgrade with page context awareness and progressive lead qualification.
- Seamless migration of Placement Day War Room, Company Intelligence, Research, and Learn to the Central Gateway.

---

## 2. Dependency & Codebase Audit Matrix

| Area | Existing Implementation | Existing Dependencies / Models | Required Action |
|---|---|---|---|
| **Ask Kunwar** (`app/api/ask/route.ts`) | Calls `huggingFaceProvider` or falls back to `localExtractiveProvider` | `HUGGINGFACE_API_KEY`, `HUGGINGFACE_INFERENCE_ENABLED` | **Upgrade:** Connect to Central AI Gateway (`ask-kunwar` task) + Knowledge Engine + Context Awareness + Progressive Lead Qualification |
| **Floating Chatbot UI** (`components/ask/AskKunwar.tsx`, `AskKunwarBubble.tsx`) | Global floating widget with chat interface, citation links, quick queries | React client component, Lucide icons, `localStorage` for privacy toggle | **Preserve & Upgrade:** Keep institutional dark styling, add page context awareness, progressive lead capture dialog, and provider transparency |
| **Company Intelligence** (`lib/company-intelligence.ts`) | Server-side function `generateCompanyIntelligence()` calls HF directly | `HUGGINGFACE_API_KEY`, `mistralai/Mistral-7B-Instruct-v0.3` | **Migrate:** Connect to Central AI Gateway task `company-intelligence`. Preserve strict JSON schema and deterministic fallback |
| **Placement Day War Room** (`lib/placement-war-room/ai-client.ts`, `evaluation.ts`, `app/api/placement-war-room/coach/route.ts`) | `placementWarRoomAiChat` & `placementWarRoomAiJson` call router.huggingface.co | `HUGGINGFACE_API_KEY`, Mistral 7B, Prisma models (`CandidateProfile`, `DiagnosticAttempt`, `InterviewSession`) | **Migrate:** Route through Central AI Gateway task `placement`. Preserve all scoring rubrics, question banks, and fallback evaluations |
| **Research Hub** (`/research`, `/research/[slug]`, `lib/research-content.ts`) | Editorial publications, financial models, case studies, Algolia/sitemap indexing | Static MDX files, `RESEARCH_COLLECTIONS`, Algolia | **Connect:** Index all published research reports and case studies into the Central Knowledge Engine |
| **Learning / PGDM** (`/learn`, `lib/pgdm/curriculum.ts`, `lib/tools-registry.ts`) | Comprehensive finance curriculum, calculators, interactive tools | Static registry, lesson structures | **Connect:** Index all learning topics and tool documentation into the Central Knowledge Engine |
| **Markets Terminal** (`app/(dashboard)/markets/`, `lib/data-providers/`) | Real-time and historical equity/macro data feeds | `DataProvider`, `MetricDefinition`, `MetricObservation` | **Connect:** Live application connectors in Knowledge Engine so AI answers live questions deterministically, never hallucinating stale prices |
| **Admin Panel** (`app/admin/`) | Operations, CMS, Media, Users, Analytics, Settings, System Health | `User` (role-based: `ADMIN`, `ANALYST`, `STAFF`) | **Add:** AI Control Center (`/admin/ai`) with Overview, Providers, Multi-Credentials, Task Routing, Knowledge Base, and Audit Logs |

---

## 3. Security & Cryptographic Architecture

### 3.1 Encryption Strategy
- **Master Key:** `process.env.AI_ENCRYPTION_MASTER_KEY` (32 bytes / 256 bits, base64 or hex).
- **Algorithm:** AES-256-GCM (`crypto.createCipheriv('aes-256-gcm', key, iv)`).
- **Nonce (IV):** Cryptographically secure 12-byte random IV (`crypto.randomBytes(12)`) per encryption operation.
- **Authentication Tag:** 16-byte authentication tag (`cipher.getAuthTag()`) stored alongside the encrypted payload.
- **Key Versioning:** Integer version (`1`, `2`, ...) stored on each credential record to allow future key rotation.
- **Strict Boundary:** All decryption logic isolated in server-only modules (`import 'server-only'`). Decrypted secrets are NEVER returned via public APIs or rendered into HTML/React props.

### 3.2 Display & Audit Policy
- Credentials displayed strictly as masked strings (e.g., `gsk_••••••••••••abcd` or `AIza••••••••••••1234`).
- All admin actions (adding credential, modifying routing, testing connectivity) are recorded in `AIAdminAuditLog` without logging any secret payload.

---

## 4. Database Schema Requirements

To persist provider configurations, encrypted keys, routing rules, usage metrics, knowledge records, and audit events without redeployment, the following Prisma models will be added:
1. `AIProviderConfig`: Provider name (`gemini` \| `groq`), enabled, priority, default model, JSON config.
2. `AIProviderCredential`: Encrypted secret, nonce, auth tag, key version, masked label, status, health metrics, error tracking.
3. `AITaskRoute`: Task key (`ask-kunwar`, `company-intelligence`, `placement`, `research`, `learning`), primary provider/model, fallback provider/model.
4. `AIUsageLog`: Task, provider, model, credential ID, latency, token metrics, error category, fallback flag.
5. `KnowledgeDocument`: Title, canonical URL, source type, category, raw text, metadata, indexing status.
6. `KnowledgeChunk`: Document relationship, chunk index, text content, token size, keyword vectors.
7. `AIPromptTemplate`: Task key, system prompt, temperature, max tokens, version, isActive.
8. `AIAdminAuditLog`: Admin user ID, action type, entity type, entity ID, metadata JSON, IP address.
9. `AILeadCapture`: Integrated lead qualification model for Ask Kunwar progressive CRM capture.

---

## 5. Next Steps
- **Stage 2:** Implement Central AI Gateway, provider adapters (Gemini & Groq), credential manager, encryption, routing, failover, circuit breaker, and database migrations.
- **Stage 3:** Build the complete Admin AI Control Center with tabbed navigation, live metrics, test buttons, credential forms, and route editor.
- **Stage 4:** Build the Central Knowledge Intelligence Engine (crawler, parser, chunker, hybrid retriever, citation validator, live connectors).
- **Stage 5:** Upgrade Ask Kunwar floating assistant with context awareness and progressive lead qualification.
- **Stage 6:** Migrate Company Intelligence and Placement Day War Room.
- **Stage 7:** Execute test suite, production build, documentation updates, and merge/push directly to `main` on GitHub.

