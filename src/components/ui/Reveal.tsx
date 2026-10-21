import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Scroll reveal. Collapses to a plain wrapper when the visitor prefers
 * reduced motion, so content is never trapped at opacity 0.
 *
 * `as` exists so the wrapper can be a list item when the reveal is used
 * directly inside a `<ul>` or `<ol>`.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li'
}) {
  const reduceMotion = useReducedMotion()

  if (as === 'li') {
    if (reduceMotion) return <li className={className}>{children}</li>
    return (
      <motion.li
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.li>
    )
  }

  if (reduceMotion) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
