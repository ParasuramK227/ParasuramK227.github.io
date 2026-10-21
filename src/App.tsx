import { ThemeProvider } from '@/lib/theme'
import { PaletteProvider } from '@/lib/palette'
import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/hero/Hero'
import { About } from '@/components/about/About'
import { Skills } from '@/components/skills/Skills'
import { Projects } from '@/components/projects/Projects'
import { Timeline } from '@/components/timeline/Timeline'
import { GithubStats } from '@/components/stats/GithubStats'
import { Transmissions } from '@/components/blog/Transmissions'
import { Contact } from '@/components/contact/Contact'
import { TerminalPalette } from '@/components/terminal/TerminalPalette'
import { Footer } from '@/components/layout/Footer'

export function App() {
  return (
    <ThemeProvider>
      <PaletteProvider>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />

        <main id="main">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <GithubStats />
          <Transmissions />
          <Contact />
        </main>

        <Footer />
        <TerminalPalette />
      </PaletteProvider>
    </ThemeProvider>
  )
}
