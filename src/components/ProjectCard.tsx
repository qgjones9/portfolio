import { ExternalLink, FileText } from 'lucide-react'
import type { Project } from '../types/project'

const DESCRIPTION_EXCERPT_LENGTH = 140

interface ProjectCardProps {
  project: Project
}

function cardSummary(project: Project): string {
  const tagline = project.tagline.trim()
  if (tagline.length > 0) {
    return tagline
  }

  const description = project.description.trim()
  if (description.length <= DESCRIPTION_EXCERPT_LENGTH) {
    return description
  }

  return `${description.slice(0, DESCRIPTION_EXCERPT_LENGTH).trimEnd()}…`
}

function hasThumbnail(thumbnail: string): boolean {
  return thumbnail.trim().length > 0
}

function hasGithubUrl(githubUrl: string): boolean {
  return githubUrl.trim().length > 0
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const summary = cardSummary(project)
  const showThumbnail = hasThumbnail(project.thumbnail)
  const showGithub = hasGithubUrl(project.githubUrl)

  const handleCaseStudyClick = () => {
    console.log('View case study:', project.id)
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/50 shadow-sm ring-0 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-violet-500/35 hover:shadow-xl hover:shadow-violet-950/30 hover:ring-1 hover:ring-violet-500/20">
      {showThumbnail ? (
        <div className="relative aspect-video w-full shrink-0 overflow-hidden border-b border-zinc-800/80 bg-zinc-900">
          <img
            src={project.thumbnail}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium tracking-wide text-violet-400/90 uppercase transition-colors duration-300 group-hover:text-violet-300/90">
          {project.category}
        </p>

        <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-50 transition-colors duration-300 group-hover:text-white">
          {project.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
          {summary}
        </p>

        {project.stack.length > 0 ? (
          <ul
            className="mt-4 flex flex-wrap gap-1.5"
            aria-label={`Tech stack for ${project.title}`}
          >
            {project.stack.map((tech) => (
              <li key={tech} className="max-w-full">
                <span className="inline-flex max-w-full items-center truncate rounded-full border border-zinc-700/70 bg-zinc-950/70 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-zinc-400 transition-colors duration-300 group-hover:border-zinc-600/90 group-hover:bg-zinc-900/90 group-hover:text-zinc-300">
                  {tech}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <footer className="mt-5 border-t border-zinc-800/80 pt-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handleCaseStudyClick}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-violet-500/35 bg-violet-500/10 px-4 py-2.5 text-sm font-semibold text-zinc-50 transition-all duration-300 hover:border-violet-400/55 hover:bg-violet-500/20 group-hover:border-violet-400/50 group-hover:bg-violet-500/15 group-hover:shadow-md group-hover:shadow-violet-950/25 sm:flex-initial"
            >
              <FileText
                className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
                aria-hidden
              />
              View Case Study
            </button>

            {showGithub ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-700/90 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-800/80 hover:text-zinc-100 group-hover:border-zinc-600 group-hover:text-zinc-200 sm:flex-initial"
              >
                <ExternalLink
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
                  aria-hidden
                />
                GitHub Repo
              </a>
            ) : (
              <span
                className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-800 bg-zinc-950/40 px-4 py-2.5 text-sm font-medium text-zinc-600 sm:flex-initial"
                aria-disabled="true"
                title="Repository link not available"
              >
                <ExternalLink className="h-4 w-4 shrink-0 opacity-40" aria-hidden />
                GitHub Repo
                <span className="sr-only"> (unavailable)</span>
              </span>
            )}
          </div>
        </footer>
      </div>
    </article>
  )
}
