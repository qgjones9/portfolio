import { FolderOpen } from 'lucide-react'
import type { Project } from '../types/project'
import ProjectCard from './ProjectCard'

interface ProjectGridProps {
  projects: Project[]
  activeCategoryLabel: string
  onViewCaseStudy?: (project: Project) => void
}

export default function ProjectGrid({
  projects,
  activeCategoryLabel,
  onViewCaseStudy,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div
        className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 px-6 py-16 text-center"
        role="status"
      >
        <FolderOpen
          className="h-10 w-10 text-zinc-600"
          aria-hidden
        />
        <p className="mt-4 text-base font-medium text-zinc-300">
          No projects in this category yet
        </p>
        <p className="mt-2 max-w-md text-sm text-zinc-500">
          {activeCategoryLabel === 'All'
            ? 'Projects will appear here once added to the gallery.'
            : `Nothing is tagged "${activeCategoryLabel}" right now. Try another filter or check back as the gallery grows.`}
        </p>
      </div>
    )
  }

  return (
    <ul className="mt-8 grid list-none grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.id} className="min-h-0">
          <ProjectCard project={project} onViewCaseStudy={onViewCaseStudy} />
        </li>
      ))}
    </ul>
  )
}
