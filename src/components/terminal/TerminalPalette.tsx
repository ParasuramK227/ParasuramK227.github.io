import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { usePalette } from '@/lib/palette'
import { useTheme } from '@/lib/theme'
import { TerminalScreen } from './TerminalScreen'
import { COMMANDS, runCommand, type Line, type LineKind } from './terminal-model'

/**
 * A terminal that happens to be a navigation palette.
 *
 * Keyboard-first: ⌘K / Ctrl+K opens it, Escape closes it from anywhere, the
 * prompt owns history (↑/↓) and completion (Tab), and the panel traps focus.
 */
export function TerminalPalette() {
  const { isOpen, close, toggle } = usePalette()
  const { theme, setTheme } = useTheme()
  const reduceMotion = useReducedMotion()

  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)

  const push = useCallback((kind: LineKind, text: string) => {
    idRef.current += 1
    const id = idRef.current
    setLines((previous) => [...previous, { id, kind, text }])
  }, [])

  // Follow the tail of the scrollback as output arrives.
  useEffect(() => {
    if (!isOpen) return
    const frame = requestAnimationFrame(() => {
      if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
    })
    return () => cancelAnimationFrame(frame)
  }, [lines, isOpen])

  // Focus the prompt on open, and lock the page behind the dialog.
  useEffect(() => {
    if (!isOpen) return
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  // Global ⌘K / Ctrl+K.
  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        toggle()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [toggle])

  // Escape closes the palette from anywhere inside it, not just the prompt.
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, close])

  const goTo = useCallback(
    (id: string) => {
      const element = document.getElementById(id)
      if (!element) return
      element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    },
    [reduceMotion],
  )

  const submit = useCallback(() => {
    const trimmed = input.trim()
    setInput('')
    if (!trimmed) return
    setHistory((previous) => [...previous, trimmed])
    setHistoryIndex(-1)
    runCommand(trimmed, {
      push,
      clear: () => setLines([]),
      goTo,
      setTheme,
      theme,
    })
  }, [goTo, input, push, setTheme, theme])

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (history.length === 0) return
      const next = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(next)
      setInput(history[next])
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex === -1) return
      const next = historyIndex + 1
      if (next >= history.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(next)
        setInput(history[next])
      }
      return
    }

    if (event.key === 'Tab') {
      event.preventDefault()
      const value = input.trim().toLowerCase()
      if (!value) return
      const match = COMMANDS.find((command) => command.startsWith(value))
      if (match) setInput(match)
    }
  }

  // Keep Tab inside the dialog while the prompt has focus.
  const onPanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    if (!focusable || focusable.length === 0) return
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

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="palette"
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[8vh] pb-[8vh] sm:pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.15 }}
        >
          <button
            type="button"
            aria-label="Close terminal"
            onClick={close}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
            tabIndex={-1}
          />

          <TerminalScreen
            panelRef={panelRef}
            outputRef={outputRef}
            inputRef={inputRef}
            lines={lines}
            input={input}
            reduceMotion={Boolean(reduceMotion)}
            onInput={setInput}
            onInputKeyDown={onInputKeyDown}
            onPanelKeyDown={onPanelKeyDown}
            onSubmit={submit}
            onClose={close}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
