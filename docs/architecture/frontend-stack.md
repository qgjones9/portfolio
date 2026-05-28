# Frontend stack and toolchain

The public portfolio application is a **client-rendered** single-page app. Content is **JSON-driven** until a CMS or API is explicitly introduced.

## Core stack

| Layer | Choice | Notes |
|-------|--------|--------|
| Framework | React 19 | Via Vite template `react-ts` |
| Language | TypeScript (strict) | No `any` on project models or props |
| Build tool | Vite | `npm run dev`, `npm run build` |
| Styling | Tailwind CSS 4+ | Vite plugin; slate/zinc dark aesthetic |
| Icons | Lucide React | Consistent icon set |
| Data | Local JSON | `src/data/projects.json` |

## Runtime expectations: Node and npm

**Node.js version matters more than npm patch version.**

| Tool | Recommendation |
|------|----------------|
| **Node** | 20 LTS or 22 LTS (18.18+ minimum for current Vite) |
| **npm** | Bundled with Node (9+ / 10+) is sufficient |

Check before scaffolding or upgrading:

```bash
node -v
npm -v
```

Use a version manager (nvm, fnm) if the system Node is outdated.

### Reproducibility (optional later)

- `.nvmrc` or `engines` in `package.json` documenting minimum Node.
- Commit `package-lock.json` so CI and local installs match.

## Application structure (planned)

```text
src/
├── components/     # ProjectCard, FilterTabs, HeroSection, ContactSection, ...
├── data/           # projects.json
├── types/          # project.ts — Project, Metric, CaseStudy
└── views/          # Page-level layout composition
```

Phases 1–3 in the [runbook](../runbook.md) (scaffold, data layer, core UI).

## State management

**Decision:** Local component state and lightweight React Context only.

- Category filter state.
- Active case study / modal visibility.

No Redux, Zustand, or similar unless explicitly requested later.

## Content model (Phase 2 preview)

Strict TypeScript interfaces for:

- `Project`
- `Metric`
- `CaseStudy`

Placeholder projects in JSON (examples from roadmap):

1. **3PL Supply Chain Visibility Platform** — React / FastAPI / Postgres (showcase stack for a case study, not a live API in v1).
2. **Legacy Lease & Billing Migration Engine** — PySide6 / SQLAlchemy.

The gallery **describes** full-stack work; the portfolio site does not host those backends.

## Contact form (frontend only)

- Component in `src/components/` (e.g. `ContactSection`).
- `fetch` POST to `import.meta.env.VITE_CONTACT_API_URL` + `/contact` (exact path TBD with API design).
- Environment file `.env.local` for development; production API URL set at CI build time (see [runbook](../runbook.md)).

## Build quality gate

Before calling a phase complete:

```bash
npm run build
```

Zero TypeScript errors. Warnings should be addressed or explicitly documented.

## Deployment artifact

`npm run build` → `dist/` → synced to S3 (see [AWS hosting](hosting-aws.md)).

## Dependencies policy

**Dependency policy:**

- Prefer native React hooks, Tailwind, and Lucide.
- Avoid large state libraries or new dependencies unless they clearly serve the product.

## Related decisions

- [ADR-001: Vite at repository root](../decisions/architecture-decision-record.md#adr-001-vite-application-at-repository-root)
- [ADR-006: JSON-driven content for gallery](../decisions/architecture-decision-record.md#adr-006-json-driven-gallery-content)
