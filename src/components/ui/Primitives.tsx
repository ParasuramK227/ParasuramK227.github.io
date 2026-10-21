import type { ReactNode } from 'react'
import { cn } from '@/lib/hooks'

/** Small mono tag used for tech stacks and metadata. */
export function Chip({
  children,
  className,
  tone = 'default',
}: {
  children: ReactNode
  className?: string
  tone?: 'default' | 'accent' | 'muted'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[11px] leading-none tracking-tight',
        tone === 'accent' && 'border-accent/40 bg-accent/10 text-accent',
        tone === 'muted' && 'border-line text-faint',
        tone === 'default' && 'border-line text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

/**
 * Status marker. Always paired with a visible text label so the state is
 * never conveyed by colour alone.
 */
export function StatusDot({
  label,
  tone,
}: {
  label: string
  tone: 'online' | 'active' | 'wip'
}) {
  const toneClass =
    tone === 'online' ? 'bg-ok' : tone === 'active' ? 'bg-info' : 'bg-signal'

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em]">
      <span
        aria-hidden="true"
        className={cn('inline-block size-1.5 rounded-full', toneClass)}
      />
      <span className={tone === 'wip' ? 'text-signal' : 'text-muted'}>{label}</span>
    </span>
  )
}

/** Bordered surface used for every panel on the page. */
export function Panel({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'li' | 'section'
}) {
  return (
    <Tag className={cn('rounded-sm border border-line bg-surface', className)}>{children}</Tag>
  )
}

/**
 * Console-window chrome. Used for the hero viewport and the command palette
 * so the terminal metaphor is a system, not a one-off decoration.
 */
export function WindowChrome({
  title,
  children,
  className,
  bodyClassName,
  actions,
}: {
  title: string
  children: ReactNode
  className?: string
  bodyClassName?: string
  actions?: ReactNode
}) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-sm border border-[var(--c-hero-line)] bg-[var(--c-hero-bg)]',
        className,
      )}
    >
      <div className="flex shrink-0 items-center gap-3 border-b border-[var(--c-hero-line)] px-3 py-2">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-1.5 rounded-full bg-[#3A424C]" />
          <span className="size-1.5 rounded-full bg-[#3A424C]" />
          <span className="size-1.5 rounded-full bg-[#3A424C]" />
        </span>
        <span className="hud truncate text-[var(--c-hero-faint)]">{title}</span>
        <span className="ml-auto shrink-0">{actions}</span>
      </div>
      <div className={cn('relative flex-1', bodyClassName)}>{children}</div>
    </div>
  )
}
