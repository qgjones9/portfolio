import { useMemo, useState } from 'react'
import CaseStudyModal from './components/CaseStudyModal'
import FilterTabs, { type ProjectCategoryFilter } from './components/FilterTabs'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import ProjectGrid from './components/ProjectGrid'
import projectsData from './data/projects.json'
import type { Project } from './types/project'

const projects = projectsData as Project[]

export default function App() {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategoryFilter>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects
    }

    return projects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  return (
    <div id="top" className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <HeroSection />
        <section id="projects" className="mt-20 scroll-mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            Project gallery
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Filter by category to explore product engineering work across B2B
            platforms, desktop migrations, and cloud automation.
          </p>

          <div className="mt-8">
            <FilterTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          <p className="mt-6 text-sm text-zinc-500">
            Showing {filteredProjects.length} of {projects.length} project
            {projects.length === 1 ? '' : 's'}
          </p>

          <ProjectGrid
            projects={filteredProjects}
            activeCategoryLabel={activeCategory}
            onViewCaseStudy={setSelectedProject}
          />
        </section>
        <section id="contact" className="mt-16 scroll-mt-20">
          Contact Form
        </section>
      </main>
      <Footer />
      <CaseStudyModal
        project={selectedProject}
        open={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
