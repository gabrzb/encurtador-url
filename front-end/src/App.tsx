import { Suspense, lazy } from 'react'
import { NavBar } from '@/components/shared/Navbar/NavBar'
import { ThemeToggle } from '@/components/shared/ThemeToggle/ThemeToggle'
import { LanguagePicker } from '@/components/shared/LanguagePicker/LanguagePicker'
import { HeroSection } from './components/sections/HeroSection/HeroSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection/HowItWorksSection'
import { FaqSection } from '@/components/sections/FaqSection/FaqSection'
import { FooterSection } from '@/components/sections/FooterSection/FooterSection'
import { Reveal } from '@/components/ui/Reveal/Reveal'
import { useAppPageState } from '@/hooks/useAppPageState'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'

const DotGrid = lazy(() => import('@/components/ui/DotGrid/DotGrid'))

function App() {
  const { content } = useLocalizedContent()
  const {
    dark,
    toggleTheme,
    scrolled,
    menuOpen,
    toggleMenu,
    closeMenu,
    language,
    input,
    result,
    showError,
    setInput,
    shorten,
    copied,
    openIndex,
    toggle,
    handleCopy,
    scrollToInput,
  } = useAppPageState()

  return (
    <>
      <Suspense fallback={null}>
        <div className="pointer-events-none fixed inset-0 -z-10">
          <DotGrid
            className="h-full w-full"
            dotSize={3}
            gap={18}
            baseColor={dark ? '#2e2e2e' : '#c8c8c8'}
            activeColor={dark ? '#763ef9' : '#8f5ee8'}
            proximity={120}
            speedTrigger={220}
            shockRadius={170}
            shockStrength={2.2}
            resistance={1100}
            returnDuration={1.1}
          />
        </div>
      </Suspense>

      <div className="floating-controls-wrap" role="group" aria-label={content.interfaceControlsAriaLabel}>
        <LanguagePicker
          ariaLabel={content.languageAriaLabel}
          options={content.languages}
          selectedLanguage={language.currentLanguage}
          open={language.open}
          onToggle={language.toggleOpen}
          onClose={language.close}
          onSelect={(languageCode) => {
            language.setLanguage(languageCode)
            language.close()
          }}
        />

        <ThemeToggle ariaLabel={content.themeToggleAriaLabel} onClick={toggleTheme} pressed={dark} />
      </div>

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

        <HowItWorksSection content={content} onScrollToInput={scrollToInput} />

        <FaqSection content={content} openIndex={openIndex} onToggle={toggle} />
      </main>

      <FooterSection content={content} />
    </>
  )
}

export default App
