import { useTheme } from '@/lib/theme'
import { cn } from '@/lib/hooks'

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4" />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4 8.2 8.2 0 1 0 20 14.2Z" />
    </svg>
  )
}

/**
 * Light / dark switch.
 *
 * The accessible name states the action ("Switch to light mode"), and the
 * current state is announced by the adjacent live region in the header.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-sm border border-[var(--h-line)]',
        'text-[var(--h-muted)] transition-colors duration-150',
        'hover:border-[var(--h-accent)] hover:text-[var(--h-accent)]',
        className,
      )}
    >
      <span className="relative block size-4" aria-hidden="true">
        <SunIcon
          className={cn(
            'absolute inset-0 transition-all duration-300',
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0',
          )}
        />
        <MoonIcon
          className={cn(
            'absolute inset-0 transition-all duration-300',
            isDark ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100',
          )}
        />
      </span>
    </button>
  )
}
