import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

interface PaletteContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const PaletteContext = createContext<PaletteContextValue | null>(null)

/**
 * Command palette open/close state.
 *
 * Lives above the header and the 3D scene so any control — a button, a
 * keyboard shortcut, a terminal command — can trigger the same dialog.
 */
export function PaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((value) => !value), [])

  const value = useMemo(() => ({ isOpen, open, close, toggle }), [isOpen, open, close, toggle])

  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>
}

export function usePalette(): PaletteContextValue {
  const context = useContext(PaletteContext)
  if (!context) throw new Error('usePalette must be used within <PaletteProvider>')
  return context
}
