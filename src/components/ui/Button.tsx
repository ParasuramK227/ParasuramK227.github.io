import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/hooks'

type Variant = 'primary' | 'secondary' | 'ghost' | 'signal'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-mono font-medium tracking-tight ' +
  'rounded-sm transition-colors duration-150 whitespace-nowrap ' +
  'disabled:opacity-45 disabled:pointer-events-none select-none ' +
  // Touch targets: WCAG 2.2 SC 2.5.8 wants 24x24 CSS px minimum.
  'min-h-6'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-fg hover:brightness-110 active:brightness-95',
  signal: 'bg-signal text-[#0A0C0F] hover:brightness-110 active:brightness-95',
  secondary:
    'border border-line-strong text-ink hover:border-accent hover:text-accent bg-transparent',
  ghost: 'text-muted hover:text-ink hover:bg-elevated',
}

/** Variant overrides for buttons rendered on the always-dark hero console. */
const heroVariantOverrides: Partial<Record<Variant, string>> = {
  primary:
    'bg-[var(--c-hero-accent)] text-[var(--c-hero-accent-fg)] ' +
    'hover:brightness-110 active:brightness-95',
  signal:
    'bg-[var(--c-hero-signal)] text-[#0A0C0F] ' +
    'hover:brightness-110 active:brightness-95',
  secondary:
    'border border-[var(--c-hero-line)] text-[var(--c-hero-ink)] ' +
    'hover:border-accent hover:text-accent bg-transparent',
  ghost:
    'text-[var(--c-hero-muted)] hover:text-[var(--c-hero-ink)] ' +
    'hover:bg-[color-mix(in_oklab,var(--c-hero-ink)_8%,transparent)]',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-sm',
}

/**
 * The hero is a permanently dark console, so buttons sitting on it cannot use
 * the theme's border and text tokens — in the light theme those resolve to
 * dark-on-dark. `.on-hero` re-derives the neutral variants from the hero scale.
 */

/**
 * Pick exactly one variant class set. Emitting both would make the winner
 * depend on Tailwind's stylesheet order rather than on intent.
 */
function pickVariant(variant: Variant, className?: string): string {
  const onHero = /(^|\s)on-hero(\s|$)/.test(className ?? '')
  return (onHero && heroVariantOverrides[variant]) || variants[variant]
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type ButtonLinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean }

/**
 * One button, two elements. Renders an `<a>` when `href` is supplied so
 * keyboard and screen-reader behaviour stays native.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  const heroClass = pickVariant(variant, className)
  return (
    <button className={cn(base, heroClass, sizes[size], className)} {...rest}>
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  external,
  ...rest
}: ButtonLinkProps) {
  const isExternal = external ?? /^https?:/i.test(href)
  const heroClass = pickVariant(variant, className)
  return (
    <a
      href={href}
      className={cn(base, heroClass, sizes[size], className)}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
