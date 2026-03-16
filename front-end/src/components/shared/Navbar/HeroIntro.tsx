import type { CSSProperties } from 'react'
import GradientText from '@/components/ui/GradientText/GradientText'
import type { ContentData } from '@/types/content'
import { HeroStats } from './HeroStats'

interface HeroIntroProps {
  heroContent: ContentData['hero']
}

export function HeroIntro({ heroContent }: HeroIntroProps) {
  const titleLines = heroContent.titleStart?.split('\n').filter(Boolean) ?? []

  return (
    <div className="flex flex-col gap-5 sm:gap-6 items-center text-center lg:items-start lg:text-left">
      <div className="stat-pill w-fit animate-pop-in" style={{ '--reveal-delay': '120ms' } as CSSProperties}>
        <span className="stat-dot" />
        {heroContent.pill}
      </div>

      <h1
        className="text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem] leading-[1.08] font-extrabold tracking-tight animate-fade-up"
        style={{ color: 'var(--text-1)', '--reveal-delay': '180ms' } as CSSProperties}
      >
        {titleLines.map((line, index) => (
          <span key={`${line}-${index}`}>
            {line}
            <br />
          </span>
        ))}
        <GradientText className="inline-block" colors={['#441fff', '#763ef9', '#8f5ee8']} animationSpeed={2}>
          {heroContent.titleGradient}
        </GradientText>
      </h1>

      <p
        className="text-[0.95rem] sm:text-[1.05rem] leading-relaxed max-w-sm animate-fade-up"
        style={{ color: 'var(--text-2)', '--reveal-delay': '230ms' } as CSSProperties}
      >
        {heroContent.description}
      </p>

      <HeroStats stats={heroContent.stats} />
    </div>
  )
}
