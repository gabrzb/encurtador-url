import type { HowItWorksSectionProps } from '@/types/sections'
import { Button } from '@/components/ui/Button/Button'
import { Reveal } from '@/components/ui/Reveal/Reveal'
import './HowItWorksSection.css'

function StepIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (index === 1) {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <polyline points="13 17 18 12 13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="6 17 11 12 6 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function HowItWorksSection({ content, onScrollToInput }: HowItWorksSectionProps) {
  return (
    <section id="como-funciona" className="px-4 sm:px-6 py-16 sm:py-28" style={{ background: 'var(--bg)', transition: 'background 0.4s ease' }}>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col gap-3 mb-12 sm:mb-16">
          <span className="text-[0.78rem] font-semibold tracking-widest uppercase" style={{ color: '#7c6ffa' }}>
            {content.howItWorks.badge}
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-6">
            <h2 className="text-[2rem] sm:text-[2.6rem] font-extrabold tracking-tight leading-tight" style={{ color: 'var(--text-1)' }}>
              {content.howItWorks.title.split('\n')[0]}
              <br />
              {content.howItWorks.title.split('\n')[1]}
            </h2>
            <p className="text-[0.9rem] sm:text-[0.95rem] leading-relaxed lg:max-w-sm" style={{ color: 'var(--text-2)' }}>
              {content.howItWorks.description}
            </p>
          </div>
        </div>
        <div className="w-full h-px mb-10 sm:mb-16" style={{ background: 'var(--border-mid)' }} />

        <div className="grid grid-cols-1 md:grid-cols-3">
          {content.howItWorks.steps.map((step, index) => (
            <Reveal key={step.id} delayMs={120 + index * 110}>
              <div
                className={`step-col ${index < 2 ? 'step-divider-v' : ''} flex flex-col gap-4 py-6 md:py-0 ${
                  index === 0 ? 'md:pr-12' : index === 1 ? 'md:px-12' : 'md:pl-12'
                }`}
                style={{ borderRight: index < 2 ? '1px solid var(--border-mid)' : undefined }}
              >
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'var(--bg-btn)' }}>
                  <StepIcon index={index} />
                </div>
                <p className="text-[0.72rem] font-bold tracking-widest uppercase" style={{ color: 'var(--text-4)' }}>
                  {step.id}
                </p>
                <h3 className="text-[1.05rem] sm:text-[1.1rem] font-bold" style={{ color: 'var(--text-1)' }}>
                  {step.title}
                </h3>
                <p className="text-[0.85rem] sm:text-[0.88rem] leading-relaxed" style={{ color: 'var(--text-3)' }}>
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div
          className="mt-14 sm:mt-20 rounded-2xl sm:rounded-3xl px-6 sm:px-10 py-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          style={{ background: '#111' }}
        >
          <div>
            <p className="text-white text-[1.15rem] sm:text-[1.3rem] font-bold leading-snug">{content.howItWorks.calloutTitle}</p>
            <p className="text-[#777] text-[0.84rem] mt-1">{content.howItWorks.calloutDescription}</p>
          </div>
          <Button
            type="button"
            onClick={onScrollToInput}
            className="shrink-0 w-full sm:w-auto px-6 sm:px-7 py-3 rounded-full text-[0.88rem] font-semibold cursor-pointer transition-all duration-150 active:scale-95 text-white text-center h-auto cta-glow"
            style={{ background: 'linear-gradient(90deg,#7c6ffa,#3b82f6)' }}
          >
            {content.howItWorks.calloutButton}
          </Button>
        </div>
      </div>
    </section>
  )
}
