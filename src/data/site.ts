/**
 * Identity, links and top-level copy.
 * Single source of truth — every section reads from here.
 */

export const site = {
  name: 'PARASURAM K',
  shortName: 'Parasuram K',
  handle: 'ParasuramK227',
  role: 'Linux systems · Frontend engineering · TUI tooling',
  location: 'Chennai, Tamil Nadu, India',
  timezone: 'Asia/Kolkata',
  email: 'parasuramk227@gmail.com',
  phone: '+91 63858 28758',
  resumePath: '/Parasuram_K_Resume.pdf',
  resumeLabel: 'Parasuram_K_Resume.pdf',
} as const

export const socialLinks = [
  {
    label: 'GitHub',
    handle: '@ParasuramK227',
    href: 'https://github.com/ParasuramK227',
    key: 'github',
  },
  {
    label: 'LinkedIn',
    handle: 'in/parasuram-k',
    href: 'https://www.linkedin.com/in/parasuram-k-08747b32b/',
    key: 'linkedin',
  },
  {
    label: 'LeetCode',
    handle: '@Parasuram_K',
    href: 'https://leetcode.com/u/Parasuram_K/',
    key: 'leetcode',
  },
  {
    label: 'Email',
    handle: 'parasuramk227@gmail.com',
    href: 'mailto:parasuramk227@gmail.com',
    key: 'email',
  },
] as const

/** Hero copy. Kept short so it stays legible over the 3D scene. */
export const hero = {
  eyebrow: 'Computer Science undergraduate · Panimalar Engineering College',
  headline: ['Systems, interfaces', 'and the terminal', 'between them.'],
  lede:
    'I build Linux desktops, React applications and QML shells — places where the interface has to survive real work, not just a demo.',
  statusLine: 'system: online',
  locationLine: 'chennai, in — IST',
} as const

export const navItems = [
  { id: 'about', label: 'about', index: '01' },
  { id: 'skills', label: 'skills', index: '02' },
  { id: 'projects', label: 'projects', index: '03' },
  { id: 'timeline', label: 'timeline', index: '04' },
  { id: 'activity', label: 'activity', index: '05' },
  { id: 'transmissions', label: 'transmissions', index: '06' },
  { id: 'contact', label: 'contact', index: '07' },
] as const

export type NavId = (typeof navItems)[number]['id']

/** Headline counters. Every figure is verifiable from the resume or GitHub. */
export const stats = [
  { label: 'public repos', value: '39', note: 'on GitHub' },
  { label: 'hackathons', value: '20+', note: '1 first runner-up' },
  { label: 'leetcode', value: '80+', note: 'problems solved' },
  { label: 'cgpa', value: '8.5', note: 'out of 10' },
] as const
