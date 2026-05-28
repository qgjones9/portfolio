# Portfolio documentation

Architecture, operations, and design decisions for the Software Gallery portfolio hub.

## Architecture

| Document | Summary |
|----------|---------|
| [System overview](architecture/overview.md) | End-to-end picture: static site, API, lead workflow |
| [Repository layout](architecture/repository-layout.md) | Why the app lives at repo root; where Lambda/infra goes |
| [AWS hosting](architecture/hosting-aws.md) | S3, CloudFront, custom domain, deploy and SPA routing |
| [Contact and leads](architecture/contact-and-leads.md) | Lambda, SES, DynamoDB, workflow stages, security |
| [Frontend stack](architecture/frontend-stack.md) | Vite, React, Tailwind, JSON data, Node/npm expectations |

## Decisions

| Document | Summary |
|----------|---------|
| [Architecture decision record](decisions/architecture-decision-record.md) | Dated decisions with context, options, and outcomes |

## Runbook

| Document | Summary |
|----------|---------|
| [Runbook](runbook.md) | Copy-paste commands to scaffold, build, deploy, and wire contact API |

