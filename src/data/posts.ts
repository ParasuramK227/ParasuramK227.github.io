/**
 * Transmissions — technical write-ups.
 *
 * The bodies live as markdown under `src/content/posts/` and are pulled in
 * with `import.meta.glob` so adding a post is a matter of dropping in a file
 * and adding an entry here.
 */

export type PostStatus = 'draft' | 'published'

export interface Post {
  slug: string
  title: string
  summary: string
  status: PostStatus
  tags: string[]
  date: string
  readTime: string
  source: string
}

const sources = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const postIndex: Omit<Post, 'source'>[] = [
  {
    slug: 'building-a-desktop-shell-in-qml',
    title: 'Building a desktop shell in QML instead of wiring one together',
    summary:
      'Why I threw away my bars, panels and widgets and rebuilt the whole desktop shell in QML on top of Quickshell and Hyprland.',
    status: 'draft',
    tags: ['QML', 'Quickshell', 'Hyprland', 'Wayland'],
    date: '2026-07-18',
    readTime: '7 min',
  },
  {
    slug: 'designing-the-boundary-between-flask-and-react',
    title: 'Designing the boundary between a Flask API and a React graph view',
    summary:
      'MediGraph renders a patient as relationships rather than rows. That meant deciding what the API is allowed to know about the graph.',
    status: 'draft',
    tags: ['Flask', 'React', 'Neo4j', 'API design'],
    date: '2026-09-12',
    readTime: '8 min',
  },
]

function sourceFor(slug: string): string {
  const key = `../content/posts/${slug}.md`
  return sources[key] ?? ''
}

export const posts: Post[] = postIndex.map((post) => ({
  ...post,
  source: sourceFor(post.slug),
}))

export function findPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00`))
}
