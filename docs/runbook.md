# Runbook — get the site off the ground

Step-by-step commands from an empty app tree through local dev, production build, and (later) AWS hosting. Run from the repository root unless noted.

**Related docs:** [index](index.md) · [frontend stack](architecture/frontend-stack.md) · [AWS hosting](architecture/hosting-aws.md) · [contact/leads](architecture/contact-and-leads.md)

---

## Prerequisites

```bash
cd /home/qjones/workspace/portfolio

node -v    # target: v20.x or v22.x (18.18+ minimum)
npm -v
git status
```

If Node is too old, switch with nvm/fnm, then re-check.

Confirm Git identity for this repo (portfolio → `qgjones9` noreply):

```bash
git config user.email
# expect: 38169271+qgjones9@users.noreply.github.com
```

---

## Track A — Phase 1: Vite, Tailwind, folder layout

### A1. Scaffold React + TypeScript (if not already present)

Skip if `package.json` and `src/` already exist.

```bash
npm create vite@latest . -- --template react-ts
```

If prompted to overwrite files, keep `.gitignore` and merge manually if needed.

```bash
npm install
npm run dev
```

Open the URL shown (usually `http://localhost:5173`). Stop the server with `Ctrl+C`.

**Done when:** Default Vite + React page loads.

```bash
git add package.json package-lock.json index.html vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json src/ public/
git status
git commit -m "initialize Vite React TypeScript app"
```

---

### A2. Install Tailwind CSS 4 (Vite plugin)

```bash
npm install tailwindcss @tailwindcss/vite
```

**Edit `vite.config.ts`** — add the Tailwind plugin:

```ts
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**Edit `src/index.css`** — replace file contents with:

```css
@import "tailwindcss";
```

**Edit `src/App.tsx`** — strip default Vite demo styles; use a minimal dark smoke test, e.g.:

```tsx
export default function App() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <h1 className="text-2xl font-semibold">Portfolio</h1>
      <p className="text-zinc-400 mt-2">Tailwind is working.</p>
    </main>
  );
}
```

Verify:

```bash
npm run dev
npm run build
```

**Done when:** Dark page renders; `npm run build` exits 0.

```bash
git add vite.config.ts src/index.css src/App.tsx
git commit -m "add Tailwind CSS 4 with Vite plugin"
```

---

### A3. Install Lucide icons

```bash
npm install lucide-react
```

**Done when:** `import { … } from "lucide-react"` compiles in a component.

```bash
git commit -am "add lucide-react for icons"
```

(Or stage only `package.json` / `package-lock.json` if you have not used icons in code yet.)

---

### A4. Create source directories

```bash
mkdir -p src/components src/data src/types src/views
```

Optional placeholder keeps imports valid later:

```bash
touch src/components/.gitkeep src/data/.gitkeep src/types/.gitkeep src/views/.gitkeep
```

```bash
git add src/
git commit -m "add src folder structure for components data types views"
```

**Phase 1 complete when:** dev server runs, build passes, four folders exist.

---

## Track B — Phase 2: Types and project data

### B1. Add project types

Create `src/types/project.ts` with interfaces: `Project`, `Metric`, and `CaseStudy` (fields described in [frontend stack](architecture/frontend-stack.md) and Phase 2 below).

Verify:

```bash
npm run build
```

```bash
git add src/types/project.ts
git commit -m "add Project Metric and CaseStudy TypeScript types"
```

---

### B2. Add `projects.json`

Create `src/data/projects.json` with at least two placeholder projects:

1. 3PL Supply Chain Visibility Platform  
2. Legacy Lease & Billing Migration Engine  

Import JSON in a component or `main` temporarily to ensure `resolveJsonModule` works (enabled in Vite TS template).

```bash
npm run build
git add src/data/projects.json
git commit -m "add placeholder projects.json"
```

---

## Track C — Phase 3: Core UI (incremental)

Build one slice at a time; after each:

```bash
npm run dev
npm run build
git add <files>
git commit -m "<short imperative message>"
```

Suggested order:

| Step | Component / area | Commit message example |
|------|------------------|-------------------------|
| C1 | `Navbar` + `Footer` + `#contact` anchor | `add Navbar and Footer with nav links` |
| C2 | `HeroSection` | `add HeroSection with intro and CTA` |
| C3 | `FilterTabs` | `add FilterTabs for project categories` |
| C4 | `ProjectCard` + grid | `add ProjectCard and filtered project grid` |
| C5 | Wire `projects.json` + types | `wire project grid to projects.json` |

Compose the page in `src/views/` or `App.tsx` as you prefer (see [repository layout](architecture/repository-layout.md)).

---

## Track D — Phase 4: Case study UI

| Step | Work | Verify |
|------|------|--------|
| D1 | Modal or panel `CaseStudyView` | Click card opens detail |
| D2 | Video embed placeholder | External link or iframe stub |
| D3 | Sections: value, architecture, metrics | Renders from JSON fields |

```bash
npm run build
git commit -m "add case study modal with detail sections"
```

---

## Track E — Phase 5: Polish and production check

```bash
npm run build
```

Manually test viewports (mobile / tablet / desktop). Fix layout breaks, then:

```bash
git commit -am "fix responsive layout on project grid and hero"
```

---

## Track F — Contact form (UI only, no AWS yet)

1. Add `ContactSection` in `src/components/`.
2. Fields: `name`, `email`, `message`, optional `company`, honeypot `website` (hidden).
3. Link to LinkedIn; stub submit handler (`console.log` or “coming soon”).

```bash
git commit -m "add Contact section with form stub"
```

Full API wiring is **Track H** (after site deploy or in parallel).

---

## Track G — Deploy static site to AWS (S3 + CloudFront)

**Prerequisites:** AWS CLI configured (`aws sts get-caller-identity`), domain in Route 53, bucket name chosen.

### G1. Production build

```bash
npm run build
ls -la dist/
```

### G2. Sync to S3 (replace bucket name)

```bash
export BUCKET=your-portfolio-bucket-name
aws s3 sync dist/ "s3://${BUCKET}/" --delete
```

### G3. Invalidate CloudFront (replace distribution id)

```bash
export CF_DIST_ID=E1234567890ABC
aws cloudfront create-invalidation --distribution-id "${CF_DIST_ID}" --paths "/*"
```

### G4. Smoke test

```bash
curl -I "https://yourdomain.com"
```

Configure CloudFront custom error responses (`403`/`404` → `/index.html` with `200`) before relying on client-side routes. Details: [hosting-aws.md](architecture/hosting-aws.md).

**Done when:** `https://yourdomain.com` serves the built gallery.

---

## Track H — Contact API (Lambda + SES + DynamoDB)

Do **not** start until you have read [contact-and-leads.md](architecture/contact-and-leads.md).

### H1. SES (early — can take time)

```bash
# In AWS Console or CLI: verify domain, request production access
aws sesv2 get-account --region us-east-1
```

### H2. Infra (when SAM/CDK/Terraform repo or `infra/` exists)

Typical flow (exact commands depend on chosen IaC):

```bash
cd infra/contact-service   # path TBD
sam build && sam deploy --guided
# or: terraform init && terraform apply
```

Note the **HTTP API URL** output.

### H3. Frontend env

Create `.env.local` for local development:

```bash
VITE_CONTACT_API_URL=https://api.yourdomain.com
```

Rebuild and redeploy:

```bash
npm run build
aws s3 sync dist/ "s3://${BUCKET}/" --delete
aws cloudfront create-invalidation --distribution-id "${CF_DIST_ID}" --paths "/*"
```

### H4. Test submit

```bash
curl -sS -X POST "https://api.yourdomain.com/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"you@example.com","message":"Hello","website":""}'
```

Check DynamoDB item and inbox. Test from the live site with browser devtools Network tab.

---

## Quick reference

| Goal | Command |
|------|---------|
| Local dev | `npm run dev` |
| Production build | `npm run build` |
| Preview production build locally | `npm run preview` |
| Typecheck + build gate | `npm run build` |
| Deploy assets | `aws s3 sync dist/ s3://$BUCKET/ --delete` |
| Cache bust | `aws cloudfront create-invalidation …` |

---

## Where you are now

Use this checklist:

- [ ] `package.json` exists (Track A1)
- [ ] Tailwind build works (A2)
- [ ] `src/{components,data,types,views}/` exist (A4)
- [ ] `projects.json` + types (B)
- [ ] Gallery UI (C–D)
- [ ] `npm run build` clean (E)
- [ ] S3 + CloudFront live (G)
- [ ] Contact API + form wired (H)

Start at the **first unchecked** track.

---

## Troubleshooting

| Problem | Action |
|---------|--------|
| `npm create vite` wants to overwrite `.gitignore` | Keep yours; merge new npm entries manually |
| Tailwind classes not applied | Confirm `@import "tailwindcss"` in `src/index.css` and plugin in `vite.config.ts` |
| Wrong Git email on commit | `git config user.email` in repo; see [repository-layout.md](architecture/repository-layout.md) |
| Unwanted co-author trailers on commit | Amend with `git commit --amend -m "message"` in terminal only, or `git commit-tree` |
| SPA 404 on refresh | CloudFront error response → `index.html` |
| CORS on contact POST | API Gateway must allow site origin |
