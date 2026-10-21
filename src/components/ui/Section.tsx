import type { ReactNode } from 'react'
import { cn } from '@/lib/hooks'
import { accentRule, accentText } from '@/lib/accent'
import type { AccentKey } from '@/data/projects'
import { Reveal } from './Reveal'

export function Section({
  id,
  index,
  label,
  title,
  description,
  accent = 'accent',
  children,
  className,
  headerAside,
}: {
  id: string
  index: string
  label: string
  title: ReactNode
  description?: ReactNode
  accent?: AccentKey
  children: ReactNode
  className?: string
  headerAside?: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('scroll-mt-16 border-t border-line py-20 md:py-28', className)}
    >
      <div className="shell">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className={cn('hud tabular-nums', accentText[accent])}>{index}</span>
            <span aria-hidden="true" className={cn('h-px flex-1', accentRule[accent])} />
            <span className="hud text-faint">{label}</span>
          </div>
        </Reveal>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.05} className="max-w-2xl">
            <h2
              id={`${id}-heading`}
              className="text-[1.75rem] leading-[1.12] font-semibold text-ink md:text-[2.5rem]"
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
                {description}
              </p>
            ) : null}
          </Reveal>
          {headerAside ? <Reveal delay={0.1}>{headerAside}</Reveal> : null}
        </div>

        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  )
}
