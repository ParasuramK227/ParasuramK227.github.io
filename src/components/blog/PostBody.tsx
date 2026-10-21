import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'

/**
 * Renders a markdown body.
 *
 * `marked` is imported lazily so it never lands in the initial bundle — the
 * post bodies are only needed once a reader actually opens one.
 */
export function PostBody({ source }: { source: string }) {
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    void (async () => {
      const { marked } = await import('marked')
      const parsed = await marked.parse(source, { gfm: true, breaks: false })
      const clean = DOMPurify.sanitize(parsed)
      if (!cancelled) setHtml(clean)
    })()

    return () => {
      cancelled = true
    }
  }, [source])

  if (html === null) {
    return (
      <div className="space-y-3" aria-busy="true" aria-label="Loading article">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className="h-4 animate-pulse rounded-sm bg-[var(--c-line)]"
            style={{ width: `${92 - index * 7}%` }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className="prose"
      // The HTML is sanitised with DOMPurify immediately above.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
