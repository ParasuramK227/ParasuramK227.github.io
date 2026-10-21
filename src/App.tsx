import { ThemeProvider } from '@/lib/theme'
import { PaletteProvider } from '@/lib/palette'
import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/hero/Hero'
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
        </main>
        <Footer />
      </PaletteProvider>
    </ThemeProvider>
  )
}
