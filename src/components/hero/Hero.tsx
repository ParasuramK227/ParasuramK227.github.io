import { lazy, Suspense } from 'react'
import { hero, site, stats } from '@/data/site'
import { ButtonLink, Button } from '@/components/ui/Button'
import { usePrefersReducedMotion } from '@/lib/hooks'
import { usePalette } from '@/lib/palette'

const HeroCanvas = lazy(() =>
  import('@/components/three/HeroCanvas').then((module) => ({ default: module.HeroCanvas })),
)

/** Shown while the WebGL bundle loads, and if it never arrives. */
function HeroPoster() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[var(--c-hero-bg)]"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 60% 55% at 62% 45%, rgba(79,224,190,0.14), transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(255,180,84,0.06), transparent 70%)',
      }}
    >
      <div className="absolute inset-0 grid-paper-faint opacity-[0.18]" />
    </div>
  )
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const { open: openPalette } = usePalette()

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--c-hero-bg)]"
    >
      <Suspense fallback={<HeroPoster />}>
        <HeroCanvas reducedMotion={reducedMotion} />
      </Suspense>

      {/* Scrims keep the type legible over the scene in both themes. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,transparent_35%,rgba(8,9,12,0.75)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--c-hero-bg)] via-[var(--c-hero-bg)]/25 to-transparent md:bg-gradient-to-r md:from-[var(--c-hero-bg)] md:via-[var(--c-hero-bg)]/80 md:to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--c-hero-line)]"
      />

      <div className="pointer-events-none absolute inset-x-0 top-16 hidden border-b border-[var(--c-hero-line)] md:block">
        <div className="shell flex h-8 items-center justify-between">
          <span className="hud text-[var(--c-hero-dim)]">~/parasuram-k — signal-core — 80×24</span>
          <span className="hud text-[var(--c-hero-dim)]">{hero.statusLine}</span>
        </div>
      </div>

      <div className="shell relative flex flex-1 flex-col justify-end pt-28 pb-10 md:justify-center md:pt-24 md:pb-24">
        <div className="max-w-2xl">
          <p className="hud flex items-center gap-2 text-[var(--c-hero-faint)]">
            <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-[var(--c-hero-accent)]" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-heading"
            className="mt-6 text-[2.25rem] leading-[1.08] font-semibold tracking-[-0.03em] text-[var(--c-hero-ink)] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem]"
          >
            {hero.headline.map((line, index) => (
              <span key={line} className="block">
                {index === hero.headline.length - 1 ? (
                  <span className="text-[var(--c-hero-accent)]">{line}</span>
                ) : (
                  line
                )}
                {/* Keep the words separated for assistive tech and text selection. */}
                {' '}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-[var(--c-hero-muted)] md:text-base">
            {hero.lede}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects" size="lg" className="on-hero">
              View projects
            </ButtonLink>
            <ButtonLink href={site.resumePath} variant="secondary" size="lg" className="on-hero">
              Résumé
            </ButtonLink>
            <Button variant="ghost" size="lg" onClick={openPalette} className="on-hero">
              <span aria-hidden="true" className="text-[var(--c-hero-dim)]">
                ⌘
              </span>
              Terminal
            </Button>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-[var(--c-hero-line)] pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="hud text-[var(--c-hero-dim)]">{stat.label}</dt>
                <dd className="mt-1.5">
                  <span className="font-mono text-2xl font-medium tabular-nums text-[var(--c-hero-ink)]">
                    {stat.value}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] text-[var(--c-hero-dim)]">
                    {stat.note}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden border-t border-[var(--c-hero-line)] md:block">
        <div className="shell flex h-9 items-center justify-between">
          <span className="hud text-[var(--c-hero-dim)]">{hero.locationLine}</span>
          <span className="hud text-[var(--c-hero-dim)]">drag to rotate · scroll to enter</span>
        </div>
      </div>
    </section>
  )
}
