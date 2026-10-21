import { site, socialLinks } from '@/data/site'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { timeline } from '@/data/timeline'
import snapshot from '@/data/github-stats.json'

export type LineKind = 'command' | 'output' | 'muted' | 'accent' | 'error'

export interface Line {
  id: number
  kind: LineKind
  text: string
}

export const lineClass: Record<LineKind, string> = {
  command: 'text-accent',
  output: 'text-[var(--c-hero-muted)]',
  muted: 'text-[var(--c-hero-dim)]',
  accent: 'text-[#FFD08A]',
  error: 'text-[#FF8A7A]',
}

export const HELP = [
  'available commands',
  '',
  '  help          show this list',
  '  whoami        profile summary',
  '  about         the long version',
  '  projects      list shipped work',
  '  skills        list the stack',
  '  experience    timeline of roles and milestones',
  '  github        repository statistics',
  '  contact       ways to reach me',
  '  resume        open the résumé (pdf)',
  '  theme         switch theme — `theme light` / `theme dark`',
  '  date          current date and time',
  '  clear         clear the output',
  '  ls            list page sections',
]

/** Used for tab completion, in display order. */
export const COMMANDS = [
  'help',
  'whoami',
  'about',
  'projects',
  'skills',
  'experience',
  'github',
  'contact',
  'resume',
  'theme',
  'date',
  'clear',
  'ls',
]

const SECTIONS = [
  'about',
  'skills',
  'projects',
  'timeline',
  'activity',
  'transmissions',
  'contact',
]

export interface CommandContext {
  push: (kind: LineKind, text: string) => void
  clear: () => void
  goTo: (id: string) => void
  setTheme: (theme: 'light' | 'dark') => void
  theme: 'light' | 'dark'
}

/**
 * Executes one line of terminal input. Pure with respect to React state —
 * every mutation goes through the supplied context, which keeps the command
 * table testable and the dialog component small.
 */
export function runCommand(raw: string, ctx: CommandContext): void {
  const command = raw.trim()
  if (!command) return

  const [name, ...args] = command.toLowerCase().split(/\s+/)
  const { push, clear, goTo, setTheme, theme } = ctx
  push('command', `~/parasuram-k $ ${command}`)

  switch (name) {
    case 'help':
      for (const line of HELP) push(line.startsWith(' ') ? 'muted' : 'accent', line)
      break

    case 'clear':
      clear()
      break

    case 'whoami':
      push('output', 'Parasuram K — Computer Science undergraduate, Panimalar Engineering College')
      push('muted', 'chennai, tamil nadu · graduating april 2028 · cgpa 8.5')
      push('muted', 'frontend engineering · linux systems · qml shells · go tooling')
      break

    case 'about':
      push(
        'output',
        'I came to engineering through design and stayed for the layer underneath the interface.',
      )
      push('muted', 'Linux, React and TypeScript, a clinical knowledge graph and a chess engine.')
      push('muted', '20+ hackathons, 1 runner-up, 80+ LeetCode problems.')
      goTo('about')
      break

    case 'projects':
      for (const project of projects) {
        push('output', `${project.name.padEnd(24, ' ')} ${project.stack.slice(0, 3).join(' · ')}`)
      }
      goTo('projects')
      break

    case 'skills':
      for (const group of skillGroups) {
        push('accent', group.label)
        push('muted', `  ${group.items.map((item) => item.name).join(', ')}`)
      }
      goTo('skills')
      break

    case 'experience':
    case 'timeline':
      for (const entry of timeline) {
        push('output', `${entry.period.padEnd(20, ' ')} ${entry.title}`)
      }
      goTo('timeline')
      break

    case 'github':
    case 'activity':
      push('output', `${snapshot.publicRepos} public repos · ${snapshot.followers} followers`)
      push('muted', snapshot.languages.map((l) => `${l.language} ${l.percent}%`).join(' · '))
      goTo('activity')
      break

    case 'contact':
      for (const link of socialLinks) push('output', `${link.label.padEnd(10, ' ')} ${link.handle}`)
      goTo('contact')
      break

    case 'resume':
    case 'cv':
      window.open(site.resumePath, '_blank', 'noopener')
      push('accent', `opening ${site.resumeLabel}…`)
      break

    case 'theme': {
      const wanted = args[0]
      const next = wanted === 'light' || wanted === 'dark' ? wanted : theme === 'dark' ? 'light' : 'dark'
      setTheme(next)
      push('accent', `theme → ${next}`)
      break
    }

    case 'date':
      push(
        'output',
        new Intl.DateTimeFormat('en-GB', {
          dateStyle: 'full',
          timeStyle: 'medium',
          timeZone: site.timezone,
        }).format(new Date()),
      )
      break

    case 'ls':
      for (const id of SECTIONS) push('output', id)
      break

    default:
      push('error', `command not found: ${name}`)
      push('muted', 'type `help` for the list of commands')
  }
}
