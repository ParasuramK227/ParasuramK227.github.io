import type { AccentKey } from '@/data/projects'

/**
 * Accent utilities.
 *
 * Each section owns one accent so the eye can orient itself without reading.
 * Only `text-*` and `border-*` variants exist — accent fills are reserved for
 * primary actions, otherwise the page turns into a bag of highlighter pens.
 */
export const accentText: Record<AccentKey, string> = {
  accent: 'text-accent',
  signal: 'text-signal',
  info: 'text-info',
  ok: 'text-ok',
}

export const accentBorder: Record<AccentKey, string> = {
  accent: 'border-accent',
  signal: 'border-signal',
  info: 'border-info',
  ok: 'border-ok',
}

export const accentBgSoft: Record<AccentKey, string> = {
  accent: 'bg-accent/10',
  signal: 'bg-signal/10',
  info: 'bg-info/10',
  ok: 'bg-ok/10',
}

/** Section accent → matching colour for rules and inline markers. */
export const accentRule: Record<AccentKey, string> = {
  accent: 'bg-accent',
  signal: 'bg-signal',
  info: 'bg-info',
  ok: 'bg-ok',
}
