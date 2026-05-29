// Sticky header, in-page links (#projects, #contact), external links to LinkedIn, GitHub, Credly, etc.
import { Award, Code, Globe, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
]

const SOCIAL_LINKS = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/qgjones9/", icon: Globe },
    { label: "GitHub", href: "https://github.com/qgjones9", icon: Code },
    { label: "Credly", href: "https://www.credly.com/users/qgjones9", icon: Award },
] as const

function NavLink({ href, children, onNavigate }: { href: string, children: React.ReactNode, onNavigate: () => void }) {
    return (
        <a
            href={href}
            onClick={onNavigate}
            className="rounded-md px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
        >
            {children}
        </a>
    )
}

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800">
            <nav
                className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
                // This sets an accessible label for the nav element (used by screen readers)
                aria-label="Main"
            >
                <a href="#top" className="text-lg font-semibold tracking-tight text-zinc-50" >
                    Quincy Jones
                </a>

                <div className="hidden items-center gap-1 md:flex">
                    {NAV_LINKS.map(((link) =>
                        <NavLink key={link.href} href={link.href} onNavigate={closeMenu}>
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                <div className="hidden items-center gap-1 md:flex">
                    {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                        <a
                            key={href}
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


                <button
                    type="button"
                    className="rounded-md p-2 text-zinc-400 md:hidden"
                    aria-expanded={menuOpen}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    onClick={() => setMenuOpen((o) => !o)}
                >
                    {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </nav>

            {menuOpen && (
                <div className="md:hidden border-t border-zinc-800/80 px-4 py-3">
                    <div className="flex flex-col gap-1">
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.href}
                                href={link.href}
                                onNavigate={closeMenu}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-zinc-800/80 flex gap-2">
                        {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                            <a
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                onClick={closeMenu}
                                className="rounded-md p-2 text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-50 transition-colors"
                            >
                                <Icon className="h-5 w-5" />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    )


}
