import { useEffect, useState } from 'react'
import { site, socialLinks } from '@/data/site'

function useLocalTime(timeZone: string): string {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          timeZone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()),
      )
    }
    update()
    const id = window.setInterval(update, 30_000)
    return () => window.clearInterval(id)
  }, [timeZone])

  return time
}

export function Footer() {
  const time = useLocalTime(site.timezone)

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="shell py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a
              href="#top"
              className="inline-flex min-h-6 items-center gap-2 font-mono text-sm text-ink transition-colors hover:text-accent"
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              ~/parasuram-k
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Linux systems, frontend engineering and terminal tooling — built by Parasuram K,
              Computer Science undergraduate at Panimalar Engineering College.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="hud text-faint">elsewhere</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2">
              {socialLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith('http')
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                    className="inline-flex min-h-6 items-center font-mono text-sm text-muted transition-colors duration-150 hover:text-accent"
                  >
                    {link.label}
                    <span className="sr-only"> — {link.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="hud text-faint">© {new Date().getFullYear()} Parasuram K</p>
          <p className="hud text-faint">
            react · three.js · typescript — chennai {time} ist
          </p>
        </div>
      </div>
    </footer>
  )
}
