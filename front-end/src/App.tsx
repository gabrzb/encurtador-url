import { useEffect } from 'react'
import { content } from '@/data/content'
import { NavBar } from '@/components/shared/Navbar/NavBar'
import { ThemeToggle } from '@/components/shared/ThemeToggle/ThemeToggle'
import { LanguagePicker } from '@/components/shared/LanguagePicker/LanguagePicker'
import { HeroSection } from '@/components/sections/HeroSection/HeroSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection/HowItWorksSection'
import { FaqSection } from '@/components/sections/FaqSection/FaqSection'
import { FooterSection } from '@/components/sections/FooterSection/FooterSection'
import { Reveal } from '@/components/ui/Reveal/Reveal'
import DotGrid from '@/components/ui/DotGrid/DotGrid'
import { useTheme } from '@/hooks/useTheme'
import { useNavbarState } from '@/hooks/useNavbarState'
import { useLanguagePicker } from '@/hooks/useLanguagePicker'
import { useUrlShortener } from '@/hooks/useUrlShortener'
import { useClipboard } from '@/hooks/useClipboard'
import { useFaq } from '@/hooks/useFaq'

function App() {
  const { dark, toggleTheme } = useTheme()
  const { scrolled, menuOpen, toggleMenu, closeMenu } = useNavbarState()
  const language = useLanguagePicker(content.languages[0].flag)
  const { input, result, showError, setInput, shorten } = useUrlShortener()
  const { copied, copy } = useClipboard()
  const { openIndex, toggle } = useFaq()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  const handleCopy = () => {
    if (!result?.shortUrl) {
      return
    }
    void copy(result.shortUrl)
  }

  const scrollToInput = () => {
    const inputElement = document.getElementById('url-input')
    inputElement?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => inputElement?.focus(), 600)
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <DotGrid
          className="h-full w-full"
          dotSize={3}
          gap={18}
          baseColor={dark ? '#2e2e2e' : '#c8c8c8'}
          activeColor={dark ? '#2e2e2e' : '#c8c8c8'}
          proximity={120}
          speedTrigger={220}
          shockRadius={170}
          shockStrength={2.2}
          resistance={1100}
          returnDuration={1.1}
        />
      </div>

      <LanguagePicker
        ariaLabel={content.languageAriaLabel}
        options={content.languages}
        selectedFlag={language.selectedFlag}
        open={language.open}
        onToggle={language.toggleOpen}
        onClose={language.close}
        onSelect={(flag) => {
          language.setSelectedFlag(flag)
          language.close()
        }}
      />

      <ThemeToggle ariaLabel={content.themeToggleAriaLabel} onClick={toggleTheme} />

      <NavBar
        content={content}
        menuOpen={menuOpen}
        scrolled={scrolled}
        dark={dark}
        onToggleMenu={toggleMenu}
        onCloseMenu={closeMenu}
      />

      <main className="overflow-x-clip">
        <Reveal delayMs={40}>
          <HeroSection
            content={content}
            input={input}
            result={result}
            showError={showError}
            copied={copied}
            onInputChange={setInput}
            onShorten={shorten}
            onCopy={handleCopy}
          />
        </Reveal>

        <Reveal delayMs={80}>
          <HowItWorksSection content={content} onScrollToInput={scrollToInput} />
        </Reveal>

        <Reveal delayMs={100}>
          <FaqSection content={content} openIndex={openIndex} onToggle={toggle} />
        </Reveal>
      </main>

      <FooterSection content={content} />
    </>
  )
}

export default App
