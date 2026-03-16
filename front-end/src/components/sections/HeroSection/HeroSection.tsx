import type { HeroSectionProps } from '@/types/sections'
import { HeroFormCard } from '@/components/shared/Navbar/HeroFormCard'
import { HeroIntro } from '@/components/shared/Navbar/HeroIntro'
import './HeroSection.css'

export function HeroSection({
  content,
  input,
  result,
  showError,
  copied,
  onInputChange,
  onShorten,
  onCopy,
}: HeroSectionProps) {
  return (
    <section className="hero-wrap relative overflow-hidden px-4 sm:px-6">
      <div className="w-full max-w-6xl mx-auto pt-24 pb-16 sm:pt-28 sm:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <HeroIntro heroContent={content.hero} />
        <HeroFormCard
          formContent={content.form}
          inputValue={input}
          result={result}
          showError={showError}
          copied={copied}
          onInputChange={onInputChange}
          onShorten={onShorten}
          onCopy={onCopy}
        />
      </div>
    </section>
  )
}
