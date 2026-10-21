import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import snapshot from '@/data/github-stats.json'

function relativeDate(iso: string): string {
  const days = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000))
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  if (days < 365) return `${Math.round(days / 30)}mo ago`
  return `${Math.round(days / 365)}y ago`
}

function formatBytes(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(0)} KB`
  return `${bytes} B`
}

export function GithubStats() {
  const generated = new Date(snapshot.generatedAt)

  return (
    <Section
      id="activity"
      index="05"
      label="activity"
      accent="ok"
      title={
        <>
          What the <span className="text-ok">repository</span> actually looks like.
        </>
      }
      description="Pulled from the GitHub API at build time, so these numbers are the account as it stands rather than a claim."
      headerAside={
        <p className="hud text-faint">
          snapshot · {generated.toISOString().slice(0, 10)}
        </p>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <Reveal>
          <div className="rounded-sm border border-line bg-surface p-5">
            <h3 className="hud text-faint">account</h3>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5">
              {[
                { label: 'public repos', value: String(snapshot.publicRepos) },
                { label: 'followers', value: String(snapshot.followers) },
                { label: 'languages', value: String(snapshot.languages.length) },
                { label: 'code size', value: formatBytes(snapshot.totalBytes) },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="hud text-faint">{item.label}</dt>
                  <dd className="mt-1 font-mono text-2xl font-medium tabular-nums text-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <h3 className="hud mt-8 text-faint">by language</h3>
            <ul className="mt-4 space-y-2.5">
              {snapshot.languages.map((entry) => (
                <li key={entry.language}>
                  <div className="flex items-baseline justify-between gap-3 font-mono text-[12px]">
                    <span className="text-muted">{entry.language}</span>
                    <span className="tabular-nums text-faint">{entry.percent}%</span>
                  </div>
                  <div className="mt-1 h-[3px] w-full overflow-hidden rounded-full bg-[var(--c-line)]">
                    <div
                      className="h-full rounded-full bg-ok/70"
                      style={{ width: `${entry.percent}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-sm border border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <h3 className="hud text-faint">recently pushed</h3>
              <a
                href={`https://github.com/${snapshot.username}`}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-6 items-center hud text-ok transition-colors hover:text-ink"
              >
                @{snapshot.username} ↗
              </a>
            </div>

            <ul className="divide-y divide-[var(--c-line)]">
              {snapshot.topRepos.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group block px-5 py-3.5 transition-colors hover:bg-[var(--c-elevated)]"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-[13px] text-ink transition-colors group-hover:text-ok">
                        {repo.name}
                      </span>
                      <span className="shrink-0 font-mono text-[10px] tracking-wide text-faint uppercase">
                        {relativeDate(repo.pushedAt)}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted">
                      {repo.description}
                    </p>
                    <p className="mt-1.5 font-mono text-[10px] tracking-wide text-faint uppercase">
                      {repo.language ?? '—'}
                      {repo.stars > 0 ? ` · ★ ${repo.stars}` : ''}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
