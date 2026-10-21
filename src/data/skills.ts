/**
 * Skills matrix.
 *
 * Levels mirror the resume exactly. Where the resume is silent (TypeScript,
 * Go) the level is derived from shipped work and stated conservatively —
 * Go is 'working', not 'advanced'.
 */

import type { AccentKey } from './projects'

export type SkillLevel = 'advanced' | 'proficient' | 'working' | 'learning'

export const levelWidth: Record<SkillLevel, number> = {
  advanced: 100,
  proficient: 78,
  working: 55,
  learning: 30,
}

export const levelLabel: Record<SkillLevel, string> = {
  advanced: 'advanced',
  proficient: 'proficient',
  working: 'working knowledge',
  learning: 'learning',
}

export interface SkillItem {
  name: string
  level: SkillLevel
  note?: string
}

export interface SkillGroup {
  id: string
  label: string
  caption: string
  accent: AccentKey
  items: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    caption: 'Typed, interpreted and compiled',
    accent: 'accent',
    items: [
      { name: 'JavaScript', level: 'advanced' },
      { name: 'QML', level: 'advanced', note: 'Qt declarative UI' },
      { name: 'TypeScript', level: 'proficient', note: '39.7% of GitHub bytes' },
      { name: 'Python', level: 'working', note: 'intermediate · Flask services' },
      { name: 'Java', level: 'working', note: 'intermediate' },
      { name: 'C', level: 'working', note: 'intermediate' },
      { name: 'Go', level: 'working', note: 'in progress' },
      { name: 'Rust', level: 'learning' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    caption: 'Interfaces that hold up under real use',
    accent: 'info',
    items: [
      { name: 'React', level: 'advanced', note: 'React 19, concurrent' },
      { name: 'HTML & CSS', level: 'advanced' },
      { name: 'Tailwind CSS', level: 'proficient', note: 'v4' },
      { name: 'Vite', level: 'proficient' },
      { name: 'Three.js / React Three Fiber', level: 'working', note: 'this page' },
      { name: 'Motion', level: 'working' },
      { name: 'Web performance & a11y', level: 'proficient' },
    ],
  },
  {
    id: 'systems',
    label: 'Systems & Linux',
    caption: 'The layer underneath the interface',
    accent: 'signal',
    items: [
      { name: 'Arch Linux', level: 'advanced' },
      { name: 'Hyprland / Wayland', level: 'advanced' },
      { name: 'Quickshell / Qt', level: 'advanced' },
      { name: 'Waybar', level: 'proficient' },
      { name: 'Linux shell & tooling', level: 'advanced' },
      { name: 'Git & GitHub', level: 'advanced' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & data',
    caption: 'Where the data has to survive',
    accent: 'ok',
    items: [
      { name: 'Flask', level: 'proficient' },
      { name: 'REST API design', level: 'proficient' },
      { name: 'Neo4j / Cypher', level: 'working', note: 'MediGraph' },
      { name: 'PostgreSQL', level: 'working' },
      { name: 'Stockfish / UCI', level: 'proficient', note: 'engine bridge' },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    caption: 'A year of client-facing UI/UX work',
    accent: 'info',
    items: [
      { name: 'UI/UX design', level: 'advanced', note: 'freelance, 2024–25' },
      { name: 'Figma', level: 'advanced' },
      { name: 'Wireframing & prototyping', level: 'advanced' },
      { name: 'Design systems', level: 'proficient' },
    ],
  },
]
