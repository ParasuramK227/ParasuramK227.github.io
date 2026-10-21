import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { levelLabel, levelWidth, skillGroups } from '@/data/skills'
import { accentText } from '@/lib/accent'

export function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      label="skills"
      accent="accent"
      title={
        <>
          The stack, and <span className="text-accent">how far in</span> I actually am.
        </>
      }
      description="Levels are taken from my resume rather than rounded up, and the ones the resume does not cover are marked honestly as learning."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.id} delay={index * 0.05}>
            <div className="flex h-full flex-col rounded-sm border border-line bg-surface p-5">
              <div className="flex items-baseline justify-between gap-3 border-b border-line pb-3">
                <h3 className={cnText(group.accent)}>{group.label}</h3>
                <span className="hud text-faint">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <p className="mt-3 text-[13px] text-faint">{group.caption}</p>

              <ul className="mt-5 flex flex-1 flex-col gap-3.5">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-[13px] text-ink">{item.name}</span>
                      <span className="shrink-0 font-mono text-[10px] tracking-wide text-faint uppercase">
                        {levelLabel[item.level]}
                      </span>
                    </div>

                    <div
                      className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-[var(--c-line)]"
                      role="img"
                      aria-label={`${item.name}: ${levelLabel[item.level]}`}
                    >
                      <div
                        className="h-full rounded-full bg-accent/70"
                        style={{ width: `${levelWidth[item.level]}%` }}
                      />
                    </div>

                    {item.note ? (
                      <p className="mt-1 font-mono text-[10px] tracking-wide text-faint">
                        {item.note}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.25}>
          <div className="flex h-full flex-col justify-between rounded-sm border border-line bg-surface p-5">
            <div>
              <h3 className={cnText('signal')}>Currently learning</h3>
              <p className="mt-3 text-[13px] text-faint">the honest list</p>
            </div>
            <ul className="mt-5 space-y-3 text-[13px] text-muted">
              <li className="flex gap-2">
                <span aria-hidden="true" className="text-signal">
                  →
                </span>
                Go beyond the tutorials — rebuilding Pokedox properly with Bubble Tea
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true" className="text-signal">
                  →
                </span>
                Rust, past the first syntax pass
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true" className="text-signal">
                  →
                </span>
                Writing about the things I build instead of only shipping them
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

function cnText(accent: keyof typeof accentText) {
  return `font-mono text-sm font-medium tracking-tight ${accentText[accent]}`
}
