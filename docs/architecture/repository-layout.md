# Repository layout

This document explains how the portfolio repository is organized and why we did **not** adopt a `frontend/` + `backend/` split at the root for the initial build.

## Current layout (intended)

```text
portfolio/                      # Git repository root
├── src/                        # Vite + React application
│   ├── components/
│   ├── data/
│   ├── types/
│   └── views/
├── public/
├── dist/                       # Build output → synced to S3 on deploy
├── docs/                       # Architecture and decisions (this tree)
├── index.html
├── package.json
├── vite.config.ts
├── .gitignore
└── README.md
```

**Contact / lead infrastructure** is planned as a **separate deployable** (not a Python FastAPI app living beside `src/`):

```text
portfolio/                      # Option A: sibling folder (future)
└── infra/                      # SAM, CDK, or Terraform
    └── contact-service/        # Lambda, API Gateway, DynamoDB, SES wiring

# Option B: separate repository (future)
# portfolio-contact-infra/
```

Either option keeps the static app’s `npm run build` simple and avoids mixing Node and Python runtimes in one package root.

## Decision: Vite at repository root

### Context

We considered whether to place the React app under `frontend/` because a **contact API** might be added later.

### Decision

Scaffold Vite with `npm create vite@latest . -- --template react-ts` at the **repository root**.

### Rationale

1. **Gallery content is JSON-driven** — `src/data/projects.json` powers projects and case studies. The initial release does not require a runtime API for the gallery.
2. **Simpler developer workflow** — One `package.json`, `npm run dev`, and `npm run build` from the root.
3. **S3 deploy** — CI/CD syncs `dist/` to a bucket; no monorepo tooling required.
4. **Backend shape** — The contact pipeline is **Lambda + API Gateway**, not a co-located server process. That maps to **infrastructure code**, not a `backend/` application folder beside React.

### When we would revisit `frontend/`

Reorganize into `frontend/` only if **both** become true:

- This repo hosts **multiple** deployable apps (e.g. admin UI + public site), or
- A **long-running** backend service (container/VM) lives in the same repo and shares release tooling.

Until then, moving the app into `frontend/` is optional churn with little benefit.

## Published documentation

All product and operations documentation intended for readers of this repository lives under `docs/`:

- [index.md](../index.md) — documentation map  
- [runbook.md](../runbook.md) — build, deploy, and integration steps  
- [architecture/](.) — system design  
- [decisions/](../decisions/) — architecture decision record  

Build artifacts (`dist/`) and installed dependencies (`node_modules/`) are produced locally and are not source content.

## Related decisions

- [ADR-001: Repository root for the Vite app](../decisions/architecture-decision-record.md#adr-001-vite-application-at-repository-root)
- [ADR-002: Separate infrastructure for contact API](../decisions/architecture-decision-record.md#adr-002-contact-api-as-aws-infrastructure-not-backend-folder)
