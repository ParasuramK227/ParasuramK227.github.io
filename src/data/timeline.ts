/**
 * Timeline — roles, milestones, awards and education, in reverse chronology.
 * Dates are taken from the resume and from repository history.
 */

export type EntryKind = 'role' | 'award' | 'ship' | 'community' | 'education'

export interface TimelineEntry {
  id: string
  kind: EntryKind
  period: string
  title: string
  org?: string
  body: string
  tags?: string[]
  link?: { label: string; href: string }
}

export const kindLabel: Record<EntryKind, string> = {
  role: 'role',
  award: 'award',
  ship: 'shipped',
  community: 'community',
  education: 'education',
}

export const timeline: TimelineEntry[] = [
  {
    id: 'luka',
    kind: 'ship',
    period: 'Oct 2026',
    title: 'Luka — Chess Engine',
    org: 'Personal project',
    body: 'Shipped an offline chess analysis workbench: React 19 + TypeScript + Tailwind 4 in the browser, Python 3 + Flask behind it, and the real Stockfish 19 engine over UCI. Move classification comes from centipawn loss against the engine’s own best move — no estimated numbers.',
    tags: ['React', 'TypeScript', 'Flask', 'Stockfish'],
    link: {
      label: 'repository',
      href: 'https://github.com/ParasuramK227/Luka---Chess-Engine',
    },
  },
  {
    id: 'medigraph-award',
    kind: 'award',
    period: 'Sep 2026',
    title: '1st Runner-Up — PEC CTS Techathon 4.0',
    org: 'MediGraph',
    body: 'MediGraph took first runner-up at the college-level hackathon for the project’s design and technical execution. The same month it placed second overall for a clinical knowledge graph and AI medical scribe built on Neo4j AuraDB with fully on-device transcription.',
    tags: ['Neo4j', 'React 19', 'Flask', 'on-device ASR'],
    link: { label: 'repository', href: 'https://github.com/ParasuramK227/Medigraph' },
  },
  {
    id: 'quickshell',
    kind: 'ship',
    period: 'Mar – Jul 2026',
    title: 'Quickshell Shell v2',
    org: 'Personal project',
    body: 'Built a complete desktop shell from scratch in QML for Arch Linux on Hyprland — replacing conventional bars and widgets with a shell whose layout, styling and behaviour I control end to end. Structured as an entry point over modular components, reusable widgets and a separate theming layer.',
    tags: ['QML', 'Quickshell', 'Hyprland', 'Wayland'],
    link: {
      label: 'repository',
      href: 'https://github.com/ParasuramK227/Quickshell_Shell_v2',
    },
  },
  {
    id: 'coders-forum',
    kind: 'community',
    period: '2nd year → present',
    title: 'Lead, Coders Forum',
    org: 'Panimalar Engineering College',
    body: 'Lead of a student-led technology community. Managing a team of six since second year, coordinating internal projects and driving our participation in more than twenty hackathons.',
    tags: ['leadership', 'community', 'team of 6'],
  },
  {
    id: 'mindcare',
    kind: 'ship',
    period: 'Sep 2025',
    title: 'MindCareAid',
    org: 'Personal project',
    body: 'Built a student mental-health monitoring and consultation platform. I designed the data model and the REST layer connecting the React frontend to the Flask backend, and built the client on top of it.',
    tags: ['React', 'Flask', 'REST API'],
    link: { label: 'repository', href: 'https://github.com/ParasuramK227/MindCareAid' },
  },
  {
    id: 'freelance',
    kind: 'role',
    period: '2024 – 2025',
    title: 'Freelance UI/UX Designer',
    org: 'Self-employed',
    body: 'Designed wireframes, prototypes and high-fidelity interfaces for independent clients, translating loose requirements into interfaces people could actually use. Applied user-centred design principles to improve usability and keep visual consistency across client projects.',
    tags: ['UI/UX', 'Figma', 'prototyping', 'client work'],
  },
  {
    id: 'education',
    kind: 'education',
    period: '2024 – 2028',
    title: 'B.E. Computer Science & Engineering',
    org: 'Panimalar Engineering College, Chennai',
    body: 'Expected graduation April 2028. Current CGPA 8.5 out of 10. Coursework spans data structures, operating systems, computer networks, databases and web systems.',
    tags: ['CGPA 8.5', 'expected 2028'],
  },
]
