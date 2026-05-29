import { Award, Code, Globe } from 'lucide-react'

const NAV_LINKS = [
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
] as const

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/qgjones9/', icon: Globe },
  { label: 'GitHub', href: 'https://github.com/qgjones9', icon: Code },
  { label: 'Credly', href: 'https://www.credly.com/users/qgjones9', icon: Award },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-semibold tracking-tight text-zinc-50">
              Quincy Jones
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              Software engineer · Product engineering
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800/80 hover:text-zinc-50"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-zinc-800/80 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-zinc-500">
            © {year} Quincy Jones. All rights reserved.
          </p>

          <div className="flex items-center gap-1">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-md p-2 text-zinc-400 transition-colors hover:bg-zinc-800/80 hover:text-zinc-50"
              >
                <Icon className="h-5 w-5" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
