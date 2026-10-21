import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { kindLabel, timeline, type EntryKind } from '@/data/timeline'
import { accentText } from '@/lib/accent'

const kindAccent: Record<EntryKind, keyof typeof accentText> = {
  role: 'info',
  award: 'signal',
  ship: 'accent',
  community: 'ok',
  education: 'info',
}

export function Timeline() {
  return (
    <Section
      id="timeline"
      index="04"
      label="timeline"
      accent="info"
      title={
        <>
          Roles, <span className="text-info">shipped work</span> and the odd trophy.
        </>
      }
      description="Reverse chronological, with the links where they exist."
    >
      <ol className="relative">
        {/* The rail */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[7px] w-px bg-[var(--c-line)] md:left-[calc(9rem+7px)]"
        />

        {timeline.map((entry, index) => {
          const accent = kindAccent[entry.kind]
          return (
            <Reveal
              key={entry.id}
              as="li"
              delay={Math.min(index, 5) * 0.05}
              className="relative pb-10 pl-8 last:pb-0 md:pl-[calc(9rem+2rem)]"
            >
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 left-0 size-[15px] rounded-full border-2 border-canvas bg-[var(--c-canvas)] md:left-[9rem] ${
                    entry.kind === 'award' ? 'bg-signal' : 'bg-accent'
                  }`}
                />

                <div className="md:absolute md:top-1 md:left-0 md:w-32 md:text-right">
                  <p className="hud text-faint">{entry.period}</p>
                </div>

                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-mono text-[15px] font-medium tracking-tight text-ink md:text-base">
                      {entry.title}
                    </h3>
                    <span className={`hud ${accentText[accent]}`}>[{kindLabel[entry.kind]}]</span>
                  </div>

                  {entry.org ? (
                    <p className="mt-1 font-mono text-[12px] text-faint">{entry.org}</p>
                  ) : null}

                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted md:text-sm">
                    {entry.body}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {entry.tags ? (
                      <ul className="flex flex-wrap gap-1.5">
                        {entry.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-sm border border-line px-1.5 py-0.5 font-mono text-[11px] leading-none text-faint"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {entry.link ? (
                      <a
                        href={entry.link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex min-h-6 items-center font-mono text-[12px] text-muted transition-colors hover:text-accent"
                      >
                        {entry.link.label} ↗
                      </a>
                    ) : null}
                  </div>
                </div>
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}
