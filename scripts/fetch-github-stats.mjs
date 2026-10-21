/**
 * Generates the GitHub activity snapshot used by the Activity section.
 *
 * Runs at build time so the deployed page needs no runtime API calls and no
 * token in the browser. Unauthenticated requests are rate-limited to 60/hour,
 * which is enough for a single run; set GITHUB_TOKEN to raise it.
 *
 *   npm run stats
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outputPath = resolve(here, '../src/data/github-stats.json')

const USERNAME = 'ParasuramK227'
const headers = {
  'User-Agent': 'portfolio-build',
  Accept: 'application/vnd.github+json',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
}

async function get(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers })
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status} for ${path}`)
  }
  return response.json()
}

const profile = await get(`/users/${USERNAME}`)
const repos = await get(`/users/${USERNAME}/repos?per_page=100&sort=updated`)

const languageBytes = {}
for (const repo of repos) {
  const languages = await get(`/repos/${USERNAME}/${repo.name}/languages`)
  for (const [language, bytes] of Object.entries(languages)) {
    languageBytes[language] = (languageBytes[language] ?? 0) + bytes
  }
}

const totalBytes = Object.values(languageBytes).reduce((sum, bytes) => sum + bytes, 0)

const languages = Object.entries(languageBytes)
  .map(([language, bytes]) => ({
    language,
    bytes,
    percent: totalBytes === 0 ? 0 : Number(((bytes / totalBytes) * 100).toFixed(1)),
  }))
  .sort((a, b) => b.bytes - a.bytes)
  .slice(0, 7)

const topRepos = repos
  .filter((repo) => !repo.fork && repo.description)
  .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
  .slice(0, 6)
  .map((repo) => ({
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    pushedAt: repo.pushed_at,
    url: repo.html_url,
  }))

const snapshot = {
  generatedAt: new Date().toISOString(),
  username: profile.login,
  name: profile.name,
  followers: profile.followers,
  publicRepos: profile.public_repos,
  totalBytes,
  languages,
  topRepos,
}

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8')

console.log(
  `Wrote ${outputPath} — ${snapshot.publicRepos} repos, ${snapshot.followers} followers, ${languages.length} languages`,
)
