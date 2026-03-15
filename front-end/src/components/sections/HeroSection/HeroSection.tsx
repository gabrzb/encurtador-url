import type { CSSProperties } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Input } from '@/components/ui/Input/Input'
import GradientText from '@/components/ui/GradientText/GradientText'
import type { HeroSectionProps } from '@/types/sections'
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
      <div aria-hidden="true" />
      <div aria-hidden="true" />
      <div className="w-full max-w-6xl mx-auto pt-24 pb-16 sm:pt-28 sm:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="flex flex-col gap-5 sm:gap-6 items-center text-center lg:items-start lg:text-left">
          <div className="stat-pill w-fit animate-pop-in" style={{ '--reveal-delay': '120ms' } as CSSProperties}>
            <span className="stat-dot" />
            {content.hero.pill}
          </div>
          <h1 className="text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem] leading-[1.08] font-extrabold tracking-tight animate-fade-up" style={{ color: 'var(--text-1)', '--reveal-delay': '180ms' } as CSSProperties}>
            {content.hero.titleStart.split('\n')[0]}
            <br />
            {content.hero.titleStart.split('\n')[1]}
            <br />
            <GradientText className="inline-block" colors={['#441fff', '#763ef9', '#8f5ee8']} animationSpeed={2}>
              {content.hero.titleGradient}
            </GradientText>
          </h1>
          <p className="text-[0.95rem] sm:text-[1.05rem] leading-relaxed max-w-sm animate-fade-up" style={{ color: 'var(--text-2)', '--reveal-delay': '230ms' } as CSSProperties}>
            {content.hero.description}
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-5 sm:gap-6 mt-1 animate-fade-up" style={{ '--reveal-delay': '300ms' } as CSSProperties}>
            {content.hero.stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-5 sm:gap-6">
                <div>
                  <p className="text-[1.6rem] sm:text-[1.9rem] font-extrabold leading-none" style={{ color: 'var(--text-1)' }}>
                    {stat.value}
                  </p>
                  <p className="text-[0.75rem] mt-1" style={{ color: 'var(--text-4)' }}>
                    {stat.label}
                  </p>
                </div>
                {index < content.hero.stats.length - 1 ? <div className="w-px h-full min-h-12" style={{ background: 'var(--border)' }} /> : null}
              </div>
            ))}
          </div>
        </div>

        <Card
          className="rounded-3xl p-5 sm:p-7 border flex flex-col gap-5 animate-pop-in"
          style={{
            background: 'var(--bg-card)',
            borderColor: 'var(--border)',
            transition: 'background 0.4s ease,border-color 0.4s ease',
            animationDelay: '210ms',
          }}
        >
          <CardContent className="p-0">
            <div>
              <p className="text-[1.05rem] sm:text-[1.1rem] font-bold" style={{ color: 'var(--text-1)' }}>
                {content.form.title}
              </p>
              <p className="text-[0.8rem] mt-0.5" style={{ color: 'var(--text-4)' }}>
                {content.form.subtitle}
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <label className="text-[0.75rem] font-semibold tracking-wide uppercase" style={{ color: 'var(--text-3)' }}>
                {content.form.urlLabel}
              </label>
              <div
                id="input-wrap"
                className="flex items-center gap-2 rounded-2xl border px-4 py-3 transition-colors"
                style={{
                  background: 'var(--bg-input)',
                  borderColor: showError ? '#f87171' : 'var(--border)',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0" style={{ opacity: 0.35 }} aria-hidden="true">
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
                <Input
                  id="url-input"
                  type="url"
                  value={input}
                  onChange={(event) => onInputChange(event.target.value)}
                  placeholder={content.form.placeholder}
                  className="flex-1 bg-transparent text-[0.85rem] sm:text-[0.88rem] outline-none border-none p-0 shadow-none"
                  style={{ color: 'var(--text-1)' }}
                />
              </div>
            </div>

            <Button
              id="shorten-btn"
              type="button"
              onClick={onShorten}
              className="w-full py-3 text-[0.85rem] sm:text-[0.88rem] font-semibold rounded-2xl active:scale-[0.98] transition-all duration-150 cursor-pointer h-auto mt-5"
              style={{ background: 'var(--text-1)', color: 'var(--bg)' }}
            >
              {content.form.submit}
            </Button>

            <div id="result-box" className={result ? 'visible' : ''}>
              <div className="pt-4 flex flex-col gap-3" style={{ borderTop: '1px solid var(--border-mid)' }}>
                <p className="text-[0.75rem] font-semibold tracking-wide uppercase" style={{ color: 'var(--text-4)' }}>
                  {content.form.resultTitle}
                </p>
                <div
                  className="flex items-center justify-between gap-3 rounded-2xl border px-4 py-3"
                  style={{ background: 'var(--bg-input)', borderColor: 'var(--border)' }}
                >
                  <a id="short-link" href="#" target="_blank" rel="noreferrer" className="text-[0.88rem] font-semibold truncate hover:underline" style={{ color: '#7c6ffa' }}>
                    {result?.shortUrl}
                  </a>
                  <Button
                    id="copy-btn"
                    type="button"
                    onClick={onCopy}
                    className="shrink-0 px-3 sm:px-4 py-1.5 text-[0.74rem] font-semibold rounded-xl cursor-pointer transition-all duration-200 h-auto"
                    style={{
                      background: copied ? '#7c6ffa' : 'var(--text-1)',
                      color: copied ? '#fff' : 'var(--bg)',
                    }}
                  >
                    {copied ? content.form.copySuccess : content.form.copyDefault}
                  </Button>
                </div>
                <p className="text-[0.74rem]" style={{ color: 'var(--text-4)' }}>
                  {content.form.validityTextStart}{' '}
                  <a href="#" className="underline hover:text-[#7c6ffa]" style={{ color: 'var(--text-4)' }}>
                    {content.form.validityLink}
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
