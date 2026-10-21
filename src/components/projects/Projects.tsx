import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Chip, StatusDot } from '@/components/ui/Primitives'
import { projects, type Project } from '@/data/projects'
import { accentBorder, accentText } from '@/lib/accent'
import { cn } from '@/lib/hooks'

const statusTone = {
  online: 'online',
  active: 'active',
  wip: 'wip',
} as const

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col rounded-sm border border-line bg-surface p-5 transition-colors duration-200 hover:border-line-strong md:p-6">
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${accentBorder[project.accent]}`}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-mono text-[15px] font-medium tracking-tight text-ink md:text-base">
            {project.name}
          </h3>
          <p className={`mt-1 font-mono text-[11px] tracking-wide uppercase ${accentText[project.accent]}`}>
            {project.kicker}
          </p>
        </div>
        <StatusDot label={project.statusLabel} tone={statusTone[project.status]} />
      </div>

      <p className="mt-4 text-[13.5px] leading-relaxed text-muted md:text-sm">{project.description}</p>

      {project.facts ? (
        <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 border-y border-line py-4 sm:grid-cols-3">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="hud text-faint">{fact.label}</dt>
              <dd className="mt-1 text-[12.5px] leading-snug text-muted">{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-4">
        <p className="hud text-faint">role</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{project.role}</p>
      </div>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((item) => (
          <li key={item}>
            <Chip>{item}</Chip>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-4 border-t border-line pt-4">
        <span className="font-mono text-[11px] tracking-wide text-faint uppercase">
          {project.year}
        </span>
        <span className="ml-auto flex items-center gap-4">
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-6 items-center font-mono text-[12px] text-muted transition-colors hover:text-accent"
            >
              live ↗
            </a>
          ) : null}
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-6 items-center font-mono text-[12px] text-muted transition-colors hover:text-accent"
            >
              repository ↗
            </a>
          ) : null}
        </span>
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      label="projects"
      accent="signal"
      title={
        <>
          Things I have <span className="text-signal">built and shipped</span>.
        </>
      }
      description="Laid out by weight rather than in a uniform grid — the two flagship projects get the room they deserve."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {projects.map((project, index) => (
          <Reveal
            key={project.slug}
            delay={Math.min(index, 4) * 0.05}
            className={cn(
              'h-full',
              project.span === 3 ? 'lg:col-span-3' : 'md:col-span-1 lg:col-span-2',
            )}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
