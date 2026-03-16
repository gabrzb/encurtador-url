import type { CSSProperties } from 'react'
import CountUp from '@/components/ui/CountUp/CountUp'
import type { StatItem } from '@/types/content'
import { getDownStartValue, parseHeroStatValue } from './heroStatUtils'

interface HeroStatsProps {
  stats: StatItem[]
}

export function HeroStats({ stats }: HeroStatsProps) {
  const parsedStats = stats.map((stat, index) => ({
    ...stat,
    index,
    parsedValue: parseHeroStatValue(stat.value),
  }))

  return (
    <div className="flex flex-wrap justify-center lg:justify-start gap-5 sm:gap-6 mt-1 animate-fade-up" style={{ '--reveal-delay': '300ms' } as CSSProperties}>
      {parsedStats.map((stat) => {
        const isSubSecondStat =
          stat.parsedValue.kind === 'numeric' && stat.parsedValue.value < 1 && stat.parsedValue.suffix.trim().toLowerCase() === 's'

        return (
          <div key={stat.label} className="flex items-center gap-5 sm:gap-6">
            <div>
              <p className="text-[1.6rem] sm:text-[1.9rem] font-extrabold leading-none" style={{ color: 'var(--text-1)' }}>
                {stat.parsedValue.kind === 'numeric' ? (
                  <span className={`hero-stat-gradient${isSubSecondStat ? ' hero-stat-gradient--tight' : ''}`}>
                    {stat.parsedValue.prefix}
                    <CountUp
                      to={isSubSecondStat ? getDownStartValue(stat.parsedValue.value) : stat.parsedValue.value}
                      from={isSubSecondStat ? stat.parsedValue.value : 0}
                      direction={isSubSecondStat ? 'down' : 'up'}
                      delay={0.12 * stat.index}
                      duration={1.55}
                      className="hero-stat-countup"
                    />
                    {stat.parsedValue.suffix}
                  </span>
                ) : (
                  stat.value
                )}
              </p>
              <p className="text-[0.75rem] mt-1" style={{ color: 'var(--text-4)' }}>
                {stat.label}
              </p>
            </div>
            {stat.index < parsedStats.length - 1 ? <div className="w-px h-full min-h-12" style={{ background: 'var(--border)' }} /> : null}
          </div>
        )
      })}
    </div>
  )
}
