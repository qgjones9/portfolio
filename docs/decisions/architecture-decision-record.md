# Architecture decision record (ADR)

Lightweight log of significant decisions for the portfolio project. Each entry includes context, options, decision, and consequences.

For narrative detail, see the [architecture docs](../index.md).

---

## ADR-001: Vite application at repository root

**Status:** Accepted  
**Date:** 2026-05-28

### Context

The repo was initialized with documentation and `.gitignore` only. We considered `frontend/` vs. root-level Vite because a contact **backend** might exist later.

### Options

1. **Root-level Vite** — `npm create vite@latest . -- --template react-ts`
2. **`frontend/` + future `backend/`** — monorepo-style split from day one

### Decision

**Root-level Vite** at repository root.

### Consequences

- **Positive:** Simple `npm run dev` / `build`; matches S3 deploy of single `dist/`; matches JSON-only gallery in Phases 1–5.
- **Negative:** If a long-running server app is added later, may require folder moves or a second package root.
- **Neutral:** Contact API will not live in `backend/` as FastAPI-on-EC2; see ADR-002.

---

## ADR-002: Contact API as AWS infrastructure, not `backend/` folder

**Status:** Accepted  
**Date:** 2026-05-28

### Context

User wants a contact form and control over lead workflow. “Backend” could mean a Python API in-repo or managed AWS services.

### Options

1. **`backend/` FastAPI (or similar)** on EC2/ECS/container
2. **Serverless:** API Gateway + Lambda + DynamoDB + SES
3. **Third-party form endpoint** (Formspree, etc.)

### Decision

**Serverless AWS stack** in a separate **infra** folder or repository (SAM/CDK/Terraform TBD). No `backend/` application directory beside `src/` for v1.

### Consequences

- **Positive:** Matches S3 static hosting; scales to zero; low cost; portfolio demonstrates AWS integration.
- **Negative:** Requires infra setup, SES verification, and CORS/API design before form goes live.
- **Follow-up:** Create `infra/` (or separate repo) when implementation starts; no application code in this ADR phase.

---

## ADR-003: Static site on S3 with CloudFront

**Status:** Accepted  
**Date:** 2026-05-28

### Context

User owns a custom domain and plans to host on AWS S3.

### Options

1. S3 static website endpoint only (HTTP-focused)
2. **S3 origin + CloudFront + ACM** (HTTPS, caching, SPA support)
3. Amplify Hosting / Vercel / Netlify

### Decision

**S3 + CloudFront + ACM + Route 53** for the marketing/gallery site.

### Consequences

- **Positive:** Full control, fits AWS skill story, standard SPA pattern with custom error responses.
- **Negative:** More setup than a single-click PaaS; deploy pipeline must sync `dist/` and invalidate cache.
- **Operational:** Certificate in `us-east-1` for CloudFront; bucket not public-read except via OAC/OAI.

---

## ADR-004: Contact API on `api` subdomain

**Status:** Accepted  
**Date:** 2026-05-28

### Context

Static assets and dynamic POST endpoint have different caching, security, and CORS needs.

### Options

1. Same CloudFront distribution, path-based routing to API Gateway
2. **`api.yourdomain.com`** → API Gateway HTTP API → Lambda

### Decision

**Separate subdomain** for the contact API.

### Consequences

- **Positive:** Clear CORS configuration; independent deploy lifecycle; simpler mental model.
- **Negative:** Additional DNS record and possibly SAN on certificate (or separate cert).
- **Frontend:** `VITE_CONTACT_API_URL` points to `https://api.yourdomain.com` (path TBD).

---

## ADR-005: Lambda + SES + DynamoDB for contact leads

**Status:** Accepted  
**Date:** 2026-05-28

### Context

User wants visitors to reach out (“app that needs building”) and wants to **control lead workflow** (status, notifications, future automation). Formspree was discussed and declined for long-term control.

### Options

1. Formspree / Getform / Basin
2. Lambda + SES only (email as database)
3. **Lambda + SES + DynamoDB** (email + durable lead store)

### Decision

**Lambda** validates and orchestrates; **DynamoDB** stores leads with `status`; **SES** sends internal notification and optional auto-reply.

### Consequences

- **Positive:** Owned schema; workflow states (`received` → `triaged` → `replied` → `archived`); extensible with EventBridge/SNS later.
- **Negative:** SES sandbox/production access lead time; spam controls (honeypot, rate limits, optional CAPTCHA) are our responsibility.
- **Security:** No AWS keys in Vite bundle; CORS on API Gateway; honeypot field in form JSON.

---

## ADR-006: JSON-driven gallery content

**Status:** Accepted (from project charter)  
**Date:** 2026-05-28

### Context

The product is a Software Gallery with projects, filters, and case studies.

### Options

1. Hard-coded React props
2. **JSON file** in repo (`src/data/projects.json`)
3. Headless CMS or API-backed content

### Decision

**JSON in repo** with strict TypeScript types for v1–v5 roadmap.

### Consequences

- **Positive:** No CMS cost; content changes via PR; easy local dev.
- **Negative:** Non-technical updates require editing JSON; redeploy to publish.
- **Future:** CMS or admin API only if content change frequency justifies it.

---

## ADR-007: Public documentation only in `docs/`

**Status:** Accepted  
**Date:** 2026-05-28 (updated 2026-05-28)

### Context

The repository is public and customer-facing. Maintainer-only notes must not appear in committed documentation or imply an unfinished internal workflow.

### Decision

- **Publish** architecture, decisions, and runbook under `docs/` (tracked in git).
- **Do not** reference private maintainer files in README or `docs/`.
- **Exclude** IDE-specific config and personal checklists from version control via `.gitignore` (paths not enumerated in public docs).

### Consequences

- **Positive:** GitHub readers see a coherent, professional documentation set.
- **Positive:** Maintainer IDE rules enforce the same policy when editing the repo locally (not published).
- **Neutral:** Operational detail lives in [runbook.md](../runbook.md), not ad-hoc private lists.

---

## ADR-008: Dual Git identity on developer machine

**Status:** Accepted (machine config, not repo)  
**Date:** 2026-05-28

### Context

Commits on this portfolio should attribute to personal GitHub (`qgjones9`); Contextlayer work uses a different noreply email.

### Decision

- Global `user.email`: `38169271+qgjones9@users.noreply.github.com`
- `includeIf "gitdir:~/workspace/contextlayer/"` → `~/.gitconfig-contextlayer` with `contextlayer-20` email

### Consequences

- Portfolio repo commits use qgjones9 identity automatically.
- Repos under `~/workspace/contextlayer/` use Contextlayer identity without per-repo config.

---

## ADR-009: Commit message conventions

**Status:** Accepted  
**Date:** 2026-05-28

### Context

Consistent, readable git history supports a professional public repository.

### Decision

- One line, max 120 characters, imperative mood.
- No Conventional Commits prefixes (`feat:`, `docs:`, etc.).
- No automated co-author trailers on commits.
- Prefer small, focused commits.

### Consequences

- History reads clearly on GitHub.
- Maintainer conventions are enforced via local editor configuration, not committed project docs.

---

## ADR-010: Contact form UX and fields (v1)

**Status:** Accepted  
**Date:** 2026-05-28

### Context

Product discussion on outreach: form vs. LinkedIn, field count, positioning for product engineering leads.

### Decision

- Dedicated `#contact` section; hero CTA optional.
- **Required:** name, email, message.
- **Optional:** company.
- **Honeypot:** `website` field (hidden).
- Always show LinkedIn as alternate path.
- v1: no phone, no file upload.

### Consequences

- Implementation checklist for `ContactSection` component and Lambda validation must match field names.
- Spam handling starts with honeypot; CAPTCHA deferred until needed.

---

## Change log

| Date | ADR | Change |
|------|-----|--------|
| 2026-05-28 | 001–010 | Initial record from architecture planning session |
| 2026-05-28 | 007, 009 | Revised for public-facing documentation policy |
