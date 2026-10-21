/**
 * Colours for the hero viewport.
 *
 * The hero is a fixed dark console in BOTH themes by design, so these values
 * are constants rather than theme tokens — they mirror `--c-hero-*` in
 * tokens.css exactly.
 */
export const HERO_COLORS = {
  bg: '#08090C',
  accent: '#4FE0BE',
  accentDim: '#1C6355',
  signal: '#FFB454',
  grid: '#1A6155',
  scan: '#3FD8B8',
} as const
