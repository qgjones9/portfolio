import { ArrowRight, Mail } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute top-32 right-0 h-48 w-48 rounded-full bg-zinc-700/20 blur-3xl" />
      </div>

      <p className="text-sm font-medium tracking-wide text-violet-400 uppercase">
        Product engineering
      </p>

      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
        Software that ships with clarity, craft, and business impact.
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
        I&apos;m Quincy Jones, a software engineer who builds polished web
        applications, data-driven systems, and migration tooling—from B2B
        platforms to desktop engineering workflows. Python is my go-to; React
        and TypeScript power the experiences users touch.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="#projects"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-50 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
        >
          View projects
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
        >
          Get in touch
          <Mail className="h-4 w-4" aria-hidden />
        </a>
      </div>

      <dl className="mt-12 grid grid-cols-1 gap-6 border-t border-zinc-800/80 pt-10 sm:grid-cols-3">
        <div>
          <dt className="text-sm font-medium text-zinc-500">Focus</dt>
          <dd className="mt-1 text-sm text-zinc-300">
            Full-stack product delivery, UX-aware engineering
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-zinc-500">Strengths</dt>
          <dd className="mt-1 text-sm text-zinc-300">
            React, TypeScript, Python, APIs, data migrations
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-zinc-500">Ethos</dt>
          <dd className="mt-1 text-sm text-zinc-300">
            Ship incrementally, document decisions, optimize for maintainability
          </dd>
        </div>
      </dl>
    </section>
  )
}
