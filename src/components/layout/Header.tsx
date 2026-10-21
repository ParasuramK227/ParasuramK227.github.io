import { useEffect, useState } from 'react'
import { navItems, site } from '@/data/site'
import { useActiveSection, cn } from '@/lib/hooks'
import { usePalette } from '@/lib/palette'
import { useTheme } from '@/lib/theme'
import { ThemeToggle } from './ThemeToggle'
import { ButtonLink } from '@/components/ui/Button'

const NAV_IDS = navItems.map((item) => item.id)

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(NAV_IDS)
  const { open: openPalette } = usePalette()
  const { theme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile sheet when the viewport grows past the breakpoint.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  // While the header is transparent it floats over the always-dark hero.
  const overHero = !scrolled && !menuOpen

  return (
    <header
      data-over-hero={overHero ? 'true' : 'false'}
      className={cn(
        'header-shell fixed inset-x-0 top-0 z-40 transition-colors duration-200',
        scrolled || menuOpen
          ? 'border-b border-line bg-canvas/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="shell">
        <div className="flex h-16 items-center justify-between gap-4">
          <a
            href="#top"
            className="group inline-flex min-h-6 items-center gap-2 py-2 font-mono text-sm text-[var(--h-ink)]"
            aria-label="Parasuram K — back to top"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-[var(--h-accent)] transition-opacity duration-500 group-hover:opacity-60"
            />
            <span className="text-[var(--h-muted)] transition-colors group-hover:text-[var(--h-ink)]">
              ~/
            </span>
            <span className="font-medium tracking-tight">parasuram-k</span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'flex items-center gap-1.5 rounded-sm px-2 py-1.5 font-mono text-[13px] transition-colors duration-150',
                        isActive
                          ? 'text-[var(--h-accent)]'
                          : 'text-[var(--h-muted)] hover:text-[var(--h-ink)]',
                      )}
                    >
                      <span className="text-[10px] tabular-nums opacity-60">{item.index}</span>
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openPalette}
              className="hidden h-10 items-center gap-2 rounded-sm border border-[var(--h-line)] px-2.5 font-mono text-[13px] text-[var(--h-muted)] transition-colors duration-150 hover:border-[var(--h-accent)] hover:text-[var(--h-accent)] lg:inline-flex"
            >
              <span aria-hidden="true">⌘</span>
              <span>K</span>
            </button>

            <ThemeToggle />

            <ButtonLink
              href={site.resumePath}
              variant="secondary"
              size="sm"
              className={cn('hidden sm:inline-flex', overHero && 'on-hero')}
            >
              Résumé
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex size-10 items-center justify-center rounded-sm border border-[var(--h-line)] text-[var(--h-muted)] transition-colors duration-150 hover:border-[var(--h-accent)] hover:text-[var(--h-accent)] md:hidden"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-nav" hidden={!menuOpen} className="border-t border-line bg-canvas md:hidden">
        <nav aria-label="Primary mobile" className="shell py-4">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 border-b border-line py-3 font-mono text-sm text-muted transition-colors hover:text-accent"
                >
                  <span className="text-[10px] tabular-nums opacity-60">{item.index}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2">
            <ButtonLink href={site.resumePath} variant="secondary" size="sm">
              Résumé
            </ButtonLink>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                openPalette()
              }}
              className="h-8 rounded-sm border border-line px-3 font-mono text-xs text-muted"
            >
              ⌘K terminal
            </button>
          </div>
        </nav>
      </div>

      <p aria-live="polite" className="sr-only">
        {theme === 'dark' ? 'Dark mode active.' : 'Light mode active.'}
      </p>
    </header>
  )
}
