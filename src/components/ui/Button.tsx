import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/hooks'

type Variant = 'primary' | 'secondary' | 'ghost' | 'signal'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-mono font-medium tracking-tight ' +
  'rounded-sm transition-colors duration-150 whitespace-nowrap ' +
  'disabled:opacity-45 disabled:pointer-events-none select-none'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-fg hover:brightness-110 active:brightness-95',
  signal: 'bg-signal text-[#0A0C0F] hover:brightness-110 active:brightness-95',
  secondary:
    'border border-line-strong text-ink hover:border-accent hover:text-accent bg-transparent',
  ghost: 'text-muted hover:text-ink hover:bg-elevated',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-sm',
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
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
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
  return (
    <a
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
