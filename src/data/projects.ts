/**
 * Project catalogue.
 *
 * Copy is derived from the actual repositories — READMEs, file trees and the
 * resume — not invented. `status` is deliberately honest: nothing is marked
 * "shipped" that is not publicly reachable.
 */

export type ProjectStatus = 'online' | 'active' | 'wip'

export type ProjectScale = 'feature' | 'standard' | 'compact'

/** Grid span on large screens — the layout is priority-driven, not uniform. */
export type ProjectSpan = 2 | 3

export type AccentKey = 'accent' | 'signal' | 'info' | 'ok'

export interface Project {
  slug: string
  name: string
  /** One short line, mono type, sits above the description. */
  kicker: string
  description: string
  /** What Parasuram specifically owned. */
  role: string
  stack: string[]
  status: ProjectStatus
  statusLabel: string
  year: string
  repo?: string
  live?: string
  scale: ProjectScale
  span: ProjectSpan
  accent: AccentKey
  /** Optional proof points — all measured or verifiable. */
  facts?: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    slug: 'medigraph',
    name: 'MediGraph',
    kicker: 'clinical knowledge graph · ai scribe',
    description:
      'Turns doctor–patient consultations into structured clinical intelligence. Encounters are transcribed on-device, turned into notes, and resolved against a live Neo4j healthcare graph so the dashboard shows a patient as relationships rather than rows.',
    role:
      'Full-stack build — React 19 + TypeScript frontend, Flask + Gunicorn API, Neo4j AuraDB knowledge graph and the on-device transcription pipeline.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Flask', 'Neo4j AuraDB', 'Moonshine ASR'],
    status: 'online',
    statusLabel: 'ONLINE',
    year: '2026',
    repo: 'https://github.com/ParasuramK227/Medigraph',
    scale: 'feature',
    span: 3,
    accent: 'signal',
    facts: [
      { label: 'award', value: '1st runner-up, PEC CTS Techathon 4.0' },
      { label: 'graph', value: 'Neo4j AuraDB — enterprise tier' },
      { label: 'privacy', value: '100% on-device transcription' },
    ],
  },
  {
    slug: 'luka-chess-engine',
    name: 'Luka — Chess Engine',
    kicker: 'offline analysis workbench',
    description:
      'A local chess workbench that plays, analyses and reviews with the real Stockfish engine over UCI. No accounts, no telemetry, no fabricated numbers — accuracy figures come from centipawn loss against the engine’s own best move, analysed move by move as you play.',
    role:
      'Built the board, engine bridge, review pipeline and analysis UI — React 19 + TypeScript + Tailwind 4 on the front, Python 3 + Flask + python-chess behind it.',
    stack: ['React 19', 'TypeScript', 'Tailwind 4', 'Flask', 'python-chess', 'Stockfish 19'],
    status: 'online',
    statusLabel: 'ONLINE',
    year: '2026',
    repo: 'https://github.com/ParasuramK227/Luka---Chess-Engine',
    scale: 'feature',
    span: 3,
    accent: 'info',
    facts: [
      { label: 'engine', value: 'Stockfish 19 via UCI, depth 18 default' },
      { label: 'network', value: 'offline by default; importer disabled' },
      { label: 'storage', value: 'local JSON + PGN, no database' },
    ],
  },
  {
    slug: 'quickshell-shell-v2',
    name: 'Quickshell Shell v2',
    kicker: 'desktop shell for arch + hyprland',
    description:
      'A complete desktop shell written from scratch in QML for Arch Linux on Hyprland — replacing off-the-shelf bars and widgets with something whose layout, styling and behaviour are entirely under my control. Structured as a shell entry point over reusable modules, widgets and themes.',
    role:
      'Architecture and implementation — QML components, Hyprland IPC integration, Wayland layering and the theming layer.',
    stack: ['QML', 'Qt', 'Quickshell', 'Hyprland', 'Wayland', 'Arch Linux'],
    status: 'online',
    statusLabel: 'ONLINE',
    year: '2026',
    repo: 'https://github.com/ParasuramK227/Quickshell_Shell_v2',
    scale: 'standard',
    span: 2,
    accent: 'accent',
    facts: [
      { label: 'iterations', value: 'second full rewrite after v1' },
      { label: 'language', value: 'QML — declarative Qt UI' },
    ],
  },
  {
    slug: 'mindcareaid',
    name: 'MindCareAid',
    kicker: 'student wellbeing platform',
    description:
      'A platform where students track their mental well-being over time and reach consultation resources when they need to. The data model and the REST layer between the React client and the Flask backend were the parts I designed and owned.',
    role:
      'Designed the data model and the REST API layer, and built the React frontend that sits on top of it.',
    stack: ['React', 'Flask', 'REST API', 'PostgreSQL'],
    status: 'online',
    statusLabel: 'ONLINE',
    year: '2025',
    repo: 'https://github.com/ParasuramK227/MindCareAid',
    scale: 'standard',
    span: 2,
    accent: 'ok',
  },
  {
    slug: 'minebar',
    name: 'MineBar',
    kicker: 'waybar theme · css',
    description:
      'A Minecraft-themed custom status bar for my own Arch Linux setup, styled entirely in CSS and driven from the Waybar configuration in my dotfiles.',
    role: 'Design and implementation of the bar theme and the dotfile configuration that ships it.',
    stack: ['CSS', 'Waybar', 'Hyprland', 'Arch Linux'],
    status: 'online',
    statusLabel: 'ONLINE',
    year: '2026',
    repo: 'https://github.com/ParasuramK227/HyprlandDotFiles',
    scale: 'compact',
    span: 2,
    accent: 'accent',
  },
  {
    slug: 'go-tooling',
    name: 'Go CLI & TUI',
    kicker: 'currently building',
    description:
      'My Go work in progress: a CLI tutorial series, a hand-written REPL with command history, and the start of Pokedox, a terminal-native project I am rebuilding with Bubble Tea once the foundations are solid. Listed honestly as work in progress rather than as a finished system.',
    role: 'Author — learning Go properly, then rebuilding Pokedox as a real TUI with Bubble Tea and Lipgloss.',
    stack: ['Go', 'CLI', 'REPL', 'Bubble Tea (next)'],
    status: 'wip',
    statusLabel: 'IN PROGRESS',
    year: '2026',
    repo: 'https://github.com/ParasuramK227/Pokedox',
    scale: 'compact',
    span: 3,
    accent: 'signal',
  },
  {
    slug: 'recirculate',
    name: 'Recirculate',
    kicker: 'food waste circulation',
    description:
      'A platform for managing and circulating surplus food — connecting listings to the communities and businesses that can actually use them.',
    role: 'Contributor — web application build.',
    stack: ['JavaScript', 'Node.js', 'Web'],
    status: 'active',
    statusLabel: 'ACTIVE',
    year: '2026',
    repo: 'https://github.com/ParasuramK227/Recirculate',
    scale: 'compact',
    span: 3,
    accent: 'ok',
  },
]

export const featuredProjects = projects.filter((p) => p.scale !== 'compact')
