/**
 * Example project:
 *   {
    "id": "3pl-supply-chain-visibility",
    "title": "3PL Supply Chain Visibility Platform",
    "tagline": "Real-time shipment and inventory visibility for third-party logistics",
    "description": "B2B dashboard and APIs giving operators a single view of orders, warehouses, and carrier events.",
    "category": "B2B SaaS",
    "stack": ["React", "TypeScript", "FastAPI", "PostgreSQL"],
    "thumbnail": "/images/3pl-thumb.png",
    "githubUrl": "https://github.com/your-org/3pl-visibility",
    "caseStudy": {
      "summary": "Unified visibility layer across WMS, TMS, and carrier webhooks.",
      "businessValue": "Reduced exception handling time by giving ops teams one timeline per shipment instead of three portals.",
      "architecture": "React SPA talks to FastAPI services; Postgres as system of record; async workers for carrier ingestion.",
      "metrics": [
        { "label": "Active tenants", "value": "12", "description": "Pilot and production 3PLs" },
        { "label": "Events ingested / day", "value": "~2M", "description": "Webhook + batch pipeline" }
      ],
      "videoUrl": ""
    }
 * 
 */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  stack: string[];
  thumbnail: string;
  githubUrl: string;
  caseStudy: CaseStudy;
}

export interface CaseStudy {
  summary: string;
  businessValue: string;
  architecture: string;
  metrics: Metric[];
  videoUrl?: string; // optional because not every case study has demo video available
}

export interface Metric {
  label: string;
  value: string;
  // Optional: some metrics may not need additional description beyond their label and value
  description?: string;
}
