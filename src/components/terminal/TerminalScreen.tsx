import { motion } from 'motion/react'
import type { KeyboardEvent, RefObject } from 'react'
import { lineClass, type Line } from './terminal-model'

interface TerminalScreenProps {
  panelRef: RefObject<HTMLDivElement | null>
  outputRef: RefObject<HTMLDivElement | null>
  inputRef: RefObject<HTMLInputElement | null>
  lines: Line[]
  input: string
  reduceMotion: boolean
  onInput: (value: string) => void
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  onPanelKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void
  onSubmit: () => void
  onClose: () => void
}

/**
 * The chrome, the scrollback and the prompt. Kept presentational: all state
 * and key handling live in `TerminalPalette`.
 */
export function TerminalScreen({
  panelRef,
  outputRef,
  inputRef,
  lines,
  input,
  reduceMotion,
  onInput,
  onInputKeyDown,
  onPanelKeyDown,
  onSubmit,
  onClose,
}: TerminalScreenProps) {
  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Terminal command palette"
      onKeyDown={onPanelKeyDown}
      initial={reduceMotion ? false : { opacity: 0, y: -10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.99 }}
      transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-sm border border-[var(--c-hero-line)] bg-[#08090C] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.85)]"
    >
      <div className="flex shrink-0 items-center gap-3 border-b border-[var(--c-hero-line)] px-3.5 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-1.5 rounded-full bg-[#3A424C]" />
          <span className="size-1.5 rounded-full bg-[#3A424C]" />
          <span className="size-1.5 rounded-full bg-[#3A424C]" />
        </span>
        <span className="hud text-[var(--c-hero-faint)]">~/parasuram-k — terminal</span>
        <button
          type="button"
          onClick={onClose}
          className="ml-auto min-h-6 font-mono text-[11px] text-[var(--c-hero-dim)] transition-colors hover:text-[var(--c-hero-muted)]"
        >
          esc
        </button>
      </div>

      <div
        ref={outputRef}
        className="min-h-[14rem] flex-1 overflow-y-auto px-3.5 py-3 font-mono text-[12.5px] leading-relaxed"
        aria-live="polite"
      >
        {lines.length === 0 ? (
          <div className="space-y-1 text-[var(--c-hero-dim)]">
            <p>Parasuram K portfolio shell — v1.0</p>
            <p>Type `help` to see what this thing can do.</p>
            <p className="text-[#8A95A1]">↑/↓ history · tab completion · esc to close</p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {lines.map((line) => (
              <p key={line.id} className={`whitespace-pre-wrap ${lineClass[line.kind]}`}>
                {line.text}
              </p>
            ))}
          </div>
        )}
      </div>

      <form
        className="flex shrink-0 items-center gap-2 border-t border-[var(--c-hero-line)] px-3.5 py-3"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <label htmlFor="terminal-prompt" className="shrink-0 font-mono text-[12.5px] text-accent">
          ~/parasuram-k $
        </label>
        <input
          id="terminal-prompt"
          ref={inputRef}
          value={input}
          onChange={(event) => onInput(event.target.value)}
          onKeyDown={onInputKeyDown}
          placeholder="type a command — `help` for the list"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Terminal command"
          className="min-w-0 flex-1 bg-transparent font-mono text-[12.5px] text-[var(--c-hero-muted)] outline-none placeholder:text-[#8A95A1]"
        />
        <button
          type="submit"
          className="shrink-0 rounded-sm border border-[var(--c-hero-line)] px-2.5 py-1 font-mono text-[11px] text-[var(--c-hero-faint)] transition-colors hover:border-accent hover:text-accent"
        >
          run
        </button>
      </form>
    </motion.div>
  )
}
