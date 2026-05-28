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
  description?: string; // Optional: some metrics may not need additional description beyond their label and value
}
