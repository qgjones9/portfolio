import { ExternalLink, Play, X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import type { Project } from '../types/project'

interface CaseStudyModalProps {
  project: Project | null
  open: boolean
  onClose: () => void
}

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

function hasVideoUrl(url?: string): boolean {
  return (url?.trim() ?? '').length > 0
}

export default function CaseStudyModal({
  project,
  open,
  onClose,
}: CaseStudyModalProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previousFocusRef.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null)

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previousFocusRef.current?.focus()
    }
  }, [open, onClose])

  if (!open || !project) return null

  const { caseStudy } = project
  const showVideo = hasVideoUrl(caseStudy.videoUrl)

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6"
      onClick={handleBackdropClick}
      aria-hidden={false}
    >
      <div
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
        aria-hidden
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(90vh,48rem)] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/95 shadow-2xl shadow-violet-950/20 ring-1 ring-violet-500/10"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-zinc-800/80 px-5 py-4 sm:px-6 sm:py-5">
          <div className="min-w-0 pr-2">
            <p className="text-xs font-medium tracking-wide text-violet-400/90 uppercase">
              {project.category}
            </p>
            <h2
              id={titleId}
              className="mt-1 text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl"
            >
              {project.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-zinc-700/90 bg-zinc-950/60 p-2 text-zinc-400 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-100"
            aria-label="Close case study"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </header>

        <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          <section>
            <h3 className="text-sm font-semibold tracking-wide text-zinc-300 uppercase">
              Summary
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {caseStudy.summary}
            </p>
          </section>

          <section className="mt-6">
            <h3 className="text-sm font-semibold tracking-wide text-zinc-300 uppercase">
              Business Value Proposition
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {caseStudy.businessValue}
            </p>
          </section>

          <section className="mt-6">
            <h3 className="text-sm font-semibold tracking-wide text-zinc-300 uppercase">
              System Architecture
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {caseStudy.architecture}
            </p>
            <div
              className="mt-4 flex aspect-video items-center justify-center rounded-lg border border-dashed border-zinc-700/70 bg-zinc-950/50 px-4 text-center"
              aria-hidden
            >
              <p className="text-xs text-zinc-600">
                Architecture diagram placeholder
              </p>
            </div>
          </section>

          {caseStudy.metrics.length > 0 ? (
            <section className="mt-6">
              <h3 className="text-sm font-semibold tracking-wide text-zinc-300 uppercase">
                Key Engineering Metrics
              </h3>
              <ul className="mt-3 grid list-none gap-3 sm:grid-cols-2">
                {caseStudy.metrics.map((metric) => (
                  <li
                    key={metric.label}
                    className="rounded-lg border border-zinc-800/90 bg-zinc-950/50 px-4 py-3"
                  >
                    <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                      {metric.label}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-violet-300">
                      {metric.value}
                    </p>
                    {metric.description ? (
                      <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                        {metric.description}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="mt-6">
            <h3 className="text-sm font-semibold tracking-wide text-zinc-300 uppercase">
              Video Walkthrough
            </h3>
            {showVideo ? (
              <div className="mt-3 rounded-lg border border-zinc-800/90 bg-zinc-950/50 p-4">
                <div className="flex aspect-video items-center justify-center rounded-md border border-dashed border-zinc-700/70 bg-zinc-900/60">
                  <a
                    href={caseStudy.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-violet-500/35 bg-violet-500/10 px-4 py-2.5 text-sm font-semibold text-zinc-50 transition-colors hover:border-violet-400/55 hover:bg-violet-500/20"
                  >
                    <Play className="h-4 w-4 shrink-0" aria-hidden />
                    Open video walkthrough
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                  </a>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-sm text-zinc-600 italic">
                Video walkthrough coming soon
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
