import { useCallback, useEffect, useRef, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { site, socialLinks } from '@/data/site'

type CopyState = 'idle' | 'copied' | 'failed'

export function Contact() {
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const timerRef = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    },
    [],
  )

  const copyEmail = useCallback(async () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)

    try {
      await navigator.clipboard.writeText(site.email)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }

    timerRef.current = window.setTimeout(() => setCopyState('idle'), 2600)
  }, [])

  const copyLabel =
    copyState === 'copied'
      ? 'copied'
      : copyState === 'failed'
        ? 'press ⌘C'
        : 'copy'

  return (
    <Section
      id="contact"
      index="07"
      label="contact"
      accent="signal"
      title={
        <>
          Open to an <span className="text-signal">internship</span> or a good problem.
        </>
      }
      description="Email is the surest way to reach me. I read everything and reply to anything with a real question."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
        <Reveal>
          <div className="rounded-sm border border-line bg-surface p-6 md:p-8">
            <p className="hud text-faint">direct line</p>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
              <a
                href={`mailto:${site.email}`}
                className="font-mono text-lg tracking-tight text-ink transition-colors hover:text-accent md:text-xl"
              >
                {site.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="rounded-sm border border-line px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted uppercase transition-colors hover:border-accent hover:text-accent"
              >
                {copyLabel}
              </button>
            </div>

            <p aria-live="polite" className="mt-2 min-h-5 font-mono text-[11px] text-accent">
              {copyState === 'copied'
                ? 'email copied to clipboard'
                : copyState === 'failed'
                  ? 'copy blocked — select the address above'
                  : ''}
            </p>

            <ul className="mt-6 grid gap-px overflow-hidden rounded-sm border border-line bg-[var(--c-line)] sm:grid-cols-2">
              {socialLinks.map((link) => (
                <li key={link.key} className="bg-surface">
                  <a
                    href={link.href}
                    {...(link.href.startsWith('http')
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                    className="flex items-baseline justify-between gap-3 px-4 py-3 transition-colors hover:bg-[var(--c-elevated)]"
                  >
                    <span className="font-mono text-[13px] text-ink">{link.label}</span>
                    <span className="truncate font-mono text-[11px] text-faint">{link.handle}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ButtonLink href={`mailto:${site.email}`} size="md">
                Send an email
              </ButtonLink>
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="inline-flex min-h-6 items-center font-mono text-[13px] text-muted transition-colors hover:text-accent"
              >
                or call {site.phone}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex h-full flex-col gap-4">
            <div className="rounded-sm border border-line bg-surface p-5">
              <p className="hud text-faint">availability</p>
              <p className="mt-3 flex items-center gap-2 font-mono text-[13px] text-ink">
                <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-ok" />
                open to internship
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                Looking for a software engineering internship where the work is close to the
                metal — Linux, systems and product frontend.
              </p>
            </div>

            <div className="rounded-sm border border-line bg-surface p-5">
              <p className="hud text-faint">based in</p>
              <p className="mt-3 font-mono text-[13px] text-ink">{site.location}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                Working remotely or on site across India. Available for evening calls after
                18:00 IST.
              </p>
            </div>

            <div className="rounded-sm border border-line bg-surface p-5">
              <p className="hud text-faint">typical reply</p>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">
                Within a day or two for anything about work or an internship. Longer for
                project questions.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
