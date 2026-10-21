import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Theme = 'dark' | 'light'

export const THEME_STORAGE_KEY = 'pk-theme'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

/**
 * Theme provider.
 *
 * The initial value is read from the DOM attribute that the blocking script in
 * index.html already set, so there is no flash and no hydration mismatch.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme)

  const applyTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute('data-theme', next)
    document.documentElement.style.colorScheme = next
  }, [])

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next)
      applyTheme(next)
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next)
      } catch {
        /* storage unavailable (private mode) — theme still applies for this session */
      }
    },
    [applyTheme],
  )

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  // Follow the OS only while the visitor has not made an explicit choice.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (event: MediaQueryListEvent) => {
      try {
        if (window.localStorage.getItem(THEME_STORAGE_KEY)) return
      } catch {
        /* ignore */
      }
      const next: Theme = event.matches ? 'light' : 'dark'
      setThemeState(next)
      applyTheme(next)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [applyTheme])

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within <ThemeProvider>')
  return context
}
