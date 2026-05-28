# AWS hosting (S3 and custom domain)

The production site is hosted as a **static website** on Amazon S3, delivered through **CloudFront** with a **custom domain** and TLS. The contact API is **not** served from the same origin as the gallery files.

## Target architecture

```text
yourdomain.com (apex)     ──► Route 53 A/AAAA alias ──► CloudFront distribution
www.yourdomain.com        ──► (optional) redirect or second alias

CloudFront                  ──► Origin: S3 bucket (private, OAC/OAI)
                            ──► ACM certificate (us-east-1 for CloudFront)
                            ──► Default root: index.html

S3 bucket                   ──► Objects = output of `npm run build` (dist/)
```

## Why CloudFront in addition to S3

| Requirement | S3 website endpoint alone | S3 + CloudFront |
|-------------|---------------------------|-----------------|
| HTTPS on custom domain | Awkward / not ideal | Standard (ACM on distribution) |
| Cache performance | Limited | Edge caching |
| SPA client-side routing | Needs error doc rules | Custom error responses to `index.html` |
| Bucket privacy | Often public-read website config | Bucket private; CloudFront OAC/OAI |

**Decision:** Use **S3 for storage** and **CloudFront for delivery** to visitors.

## Build and deploy flow

1. **Build** locally or in CI: `npm run build` → produces `dist/`.
2. **Sync** to S3: `aws s3 sync dist/ s3://<bucket-name> --delete` (exact bucket policy and CI role TBD).
3. **Invalidate** CloudFront cache after deploy: `/*` or targeted paths for HTML/JS.

No server runs in the portfolio bucket; it only holds static assets.

## Single-page application (React) routing

Vite produces a client-side router (or single `index.html` entry). Direct navigation to paths like `/` works; deep links to client routes may request a path that does not exist as an S3 object.

**Decision:** Configure CloudFront **custom error responses**:

- HTTP **403** and/or **404** from origin → respond with `/index.html` and status **200** (standard SPA pattern).

Document the exact behavior when a router is introduced (React Router basename, etc.).

## DNS (Route 53)

Assumes the domain’s DNS is hosted in **Route 53** (or delegated to it).

| Record | Target |
|--------|--------|
| Apex `A` / `AAAA` | Alias to CloudFront distribution |
| `www` (optional) | Alias to same distribution or redirect to apex |

ACM certificate must include all hostnames served (apex + `www` if used). Request the certificate in **us-east-1** when attaching to CloudFront.

## Contact API origin (separate)

The contact form posts to a **different hostname**, recommended:

```text
api.yourdomain.com  ──► API Gateway (HTTP API) ──► Lambda
```

**Rationale:**

- Clear separation of static assets vs. dynamic API.
- Independent CORS policy on API Gateway.
- No attempt to run Lambda through the site’s CloudFront distribution (possible but unnecessarily coupled).

See [Contact and leads](contact-and-leads.md).

## Environment variables (frontend build)

Vite exposes `VITE_*` variables at **build time**. Planned usage:

| Variable | Example | Secret? |
|----------|---------|---------|
| `VITE_CONTACT_API_URL` | `https://api.yourdomain.com` | No (public URL) |

Do **not** embed AWS access keys, Lambda secrets, or SES credentials in `VITE_*` variables.

## Security headers (future)

Consider CloudFront **response headers policy** for:

- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `Content-Security-Policy` (tighten when embeds and API URLs are known)

Not required for first deploy; document as Phase 5 / hardening.

## Cost expectations

At portfolio traffic levels, typical monthly cost is **low** (S3 storage, CloudFront data transfer, Route 53 hosted zone, minimal API/Lambda). No always-on servers.

## Operational checklist (before go-live)

- [ ] S3 bucket created; block public access; CloudFront OAC/OAI configured
- [ ] ACM certificate issued and attached to distribution
- [ ] Route 53 aliases point to CloudFront
- [ ] SPA error responses configured
- [ ] Deploy pipeline syncs `dist/` and invalidates cache
- [ ] `https://yourdomain.com` loads built app; `npm run build` is clean

## Related decisions

- [ADR-003: Static hosting on S3 with CloudFront](../decisions/architecture-decision-record.md#adr-003-static-site-on-s3-with-cloudfront)
- [ADR-004: API on separate subdomain](../decisions/architecture-decision-record.md#adr-004-contact-api-on-api-subdomain)
