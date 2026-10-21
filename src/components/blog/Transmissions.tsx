import { useCallback, useEffect, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { PostBody } from './PostBody'
import { formatPostDate, posts, type Post } from '@/data/posts'

function PostCard({ post, onOpen }: { post: Post; onOpen: (slug: string) => void }) {
  return (
    <article className="flex h-full flex-col rounded-sm border border-line bg-surface p-5 transition-colors duration-200 hover:border-line-strong md:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-mono text-[11px] tracking-wide text-faint tabular-nums">
          {formatPostDate(post.date)}
        </span>
        <span aria-hidden="true" className="text-faint">
          ·
        </span>
        <span className="font-mono text-[11px] tracking-wide text-faint uppercase">
          {post.readTime} read
        </span>
        {post.status === 'draft' ? (
          <span className="ml-auto inline-flex min-h-6 items-center rounded-sm border border-signal/60 bg-signal/15 px-2 font-mono text-[10px] leading-none tracking-[0.14em] text-signal uppercase">
            draft
          </span>
        ) : null}
      </div>

      <h3 className="mt-3 text-lg leading-snug font-semibold text-ink">
        <button
          type="button"
          onClick={() => onOpen(post.slug)}
          className="block w-full min-h-6 text-left transition-colors hover:text-accent"
        >
          {post.title}
        </button>
      </h3>

      <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted">{post.summary}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-sm border border-line px-1.5 py-0.5 font-mono text-[11px] leading-none text-faint"
          >
            {tag}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onOpen(post.slug)}
        className="mt-5 self-start border-t border-line pt-4 font-mono text-[12px] text-muted transition-colors hover:text-accent"
      >
        read the transmission →
      </button>
    </article>
  )
}

export function Transmissions() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  useEffect(() => {
    const readHash = () => {
      const match = window.location.hash.match(/^#\/post\/(.+)$/)
      setActiveSlug(match?.[1] ?? null)
    }
    readHash()
    window.addEventListener('hashchange', readHash)
    return () => window.removeEventListener('hashchange', readHash)
  }, [])

  const openPost = useCallback((slug: string) => {
    window.location.hash = `#/post/${slug}`
  }, [])

  const closePost = useCallback(() => {
    window.location.hash = '#transmissions'
    setActiveSlug(null)
  }, [])

  const activePost = activeSlug ? posts.find((post) => post.slug === activeSlug) : undefined

  return (
    <Section
      id="transmissions"
      index="06"
      label="transmissions"
      accent="accent"
      title={
        activePost ? (
          <span className="text-2xl md:text-3xl">{activePost.title}</span>
        ) : (
          <>
            Notes from the <span className="text-accent">workbench</span>.
          </>
        )
      }
      description={
        activePost ? undefined : 'Write-ups on the things I actually build. Drafts are marked as such.'
      }
      headerAside={
        activePost ? (
          <button
            type="button"
            onClick={closePost}
            className="hud border border-line px-2.5 py-1.5 text-muted transition-colors hover:border-accent hover:text-accent"
          >
            ← all transmissions
          </button>
        ) : (
          <p className="hud text-faint">{posts.length} entries</p>
        )
      }
    >
      {activePost ? (
        <article className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line pb-4 font-mono text-[11px] tracking-wide text-faint uppercase">
            <span className="tabular-nums">{formatPostDate(activePost.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{activePost.readTime} read</span>
            {activePost.status === 'draft' ? (
              <span className="rounded-sm border border-signal/40 bg-signal/10 px-1.5 py-0.5 text-signal">
                draft
              </span>
            ) : null}
          </div>
          <div className="mt-8">
            <PostBody source={activePost.source} />
          </div>
        </article>
      ) : posts.length === 0 ? (
        <div role="status" className="rounded-sm border border-dashed border-line px-6 py-16 text-center">
          <p className="font-mono text-sm text-muted">No transmissions published yet.</p>
          <p className="mt-2 text-[13px] text-faint">
            Write-ups are being written — the drafts land here first.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.06} className="h-full">
              <PostCard post={post} onOpen={openPost} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  )
}
