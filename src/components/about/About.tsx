import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { site } from '@/data/site'

const profile: { key: string; value: string }[] = [
  { key: 'role', value: 'frontend engineer · systems tinkerer' },
  { key: 'location', value: `${site.location}` },
  { key: 'education', value: 'B.E. CSE · Panimalar · 2028' },
  { key: 'cgpa', value: '8.5 / 10' },
  { key: 'distro', value: 'Arch Linux' },
  { key: 'compositor', value: 'Hyprland (Wayland)' },
  { key: 'shell', value: 'bash · zsh · starship' },
  { key: 'terminals', value: 'kitty · alacritty' },
  { key: 'tooling', value: 'quickshell · waybar · vs code' },
]

export function About() {
  return (
    <Section
      id="about"
      index="01"
      label="about"
      accent="info"
      title={
        <>
          I came to engineering through <span className="text-accent">design</span>, and stayed
          for the layer underneath.
        </>
      }
      description="A short version, and a slightly longer one."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <div className="rounded-sm border border-line bg-surface">
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-info/60" />
              <span className="hud text-faint">whoami</span>
            </div>
            <dl className="divide-y divide-[var(--c-line)]">
              {profile.map((row) => (
                <div key={row.key} className="flex gap-3 px-4 py-2.5">
                  <dt className="w-[5.5rem] shrink-0 font-mono text-[12px] text-faint">
                    {row.key}
                  </dt>
                  <dd className="font-mono text-[12px] leading-relaxed text-muted">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="space-y-5 text-[0.9375rem] leading-relaxed text-muted md:text-base">
          <p>
            I am a Computer Science undergraduate at Panimalar Engineering College in Chennai,
            graduating in April 2028 with a CGPA of 8.5. I came to engineering through design — a
            year of freelance UI/UX work — and stayed because the interesting problems turned out
            to live one layer below the interface.
          </p>
          <p>
            Most of my time is spent on Linux. I run Arch with Hyprland and spend far too many
            evenings building my own shell: a Quickshell/QML desktop environment, Waybar themes,
            terminal setups. It is the fastest way I know to find out how a system actually behaves
            rather than how it is supposed to.
          </p>
          <p>
            The other half is the web: React and TypeScript frontends over Flask APIs — an
            AI medical scribe grounded in a Neo4j clinical graph, a chess workbench wired to
            Stockfish for genuine move analysis. Twenty-plus hackathons, one runner-up trophy and
            eighty-plus LeetCode problems along the way.
          </p>
          <p>
            Currently looking for a software engineering internship where the work is close to
            the metal and the code has to hold up.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
