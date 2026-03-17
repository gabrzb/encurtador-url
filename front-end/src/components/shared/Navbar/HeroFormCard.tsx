import type { FormEvent } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Input } from '@/components/ui/Input/Input'
import type { ContentData } from '@/types/content'
import type { ShortenResult } from '@/types/url'

interface HeroFormCardProps {
  formContent: ContentData['form']
  inputValue: string
  result: ShortenResult | null
  showError: boolean
  copied: boolean
  onInputChange: (value: string) => void
  onShorten: () => void
  onCopy: () => void
}

function sanitizeHttpUrl(urlValue: string | null | undefined): string {
  if (typeof urlValue !== 'string') {
    return '#'
  }

  const normalized = urlValue.trim()
  if (!normalized) {
    return '#'
  }

  try {
    // Only allow http/https to prevent unsafe URI schemes in href.
    const parsedUrl = new URL(normalized)
    return /^https?:$/i.test(parsedUrl.protocol) ? parsedUrl.toString() : '#'
  } catch {
    return '#'
  }
}

export function HeroFormCard({
  formContent,
  inputValue,
  result,
  showError,
  copied,
  onInputChange,
  onShorten,
  onCopy,
}: HeroFormCardProps) {
  const shortUrlHref = sanitizeHttpUrl(result?.shortUrl)
  // Hide untrusted payload text whenever the URL is rejected.
  const displayShortUrl = shortUrlHref === '#' ? '' : shortUrlHref
  const submitLabel = formContent.submit.replace(/\s*→\s*$/, '')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onShorten()
  }

  return (
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
            {formContent.title}
          </p>
          <p className="text-[0.8rem] mt-0.5" style={{ color: 'var(--text-4)' }}>
            {formContent.subtitle}
          </p>
        </div>

        {/* noValidate keeps validation feedback controlled by the current UI state. */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-2 mt-5">
            <label htmlFor="url-input" className="text-[0.75rem] font-semibold tracking-wide uppercase" style={{ color: 'var(--text-3)' }}>
              {formContent.urlLabel}
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
                name="url"
                type="url"
                required
                value={inputValue}
                onChange={(event) => onInputChange(event.target.value)}
                placeholder={formContent.placeholder}
                aria-invalid={showError}
                aria-describedby={showError ? 'url-error' : undefined}
                className="flex-1 bg-transparent text-[0.85rem] sm:text-[0.88rem] outline-none border-none p-0 shadow-none"
                style={{ color: 'var(--text-1)' }}
              />
            </div>
            {showError ? (
              // Linked by aria-describedby so screen readers announce the validation reason.
              <p id="url-error" className="text-[0.74rem]" style={{ color: '#f87171' }}>
                Digite uma URL valida para continuar.
              </p>
            ) : null}
          </div>

          <Button id="shorten-btn" type="submit" className="hero-galaxy-btn no-hover-lift hover:translate-y-0! hover:shadow-none! w-full py-3 rounded-2xl h-auto mt-5">
            <span className="hero-galaxy-btn__content">
              <span className="hero-galaxy-btn__text">{submitLabel}</span>
              <svg className="hero-galaxy-btn__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} aria-hidden="true">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M13 14h-2a8.999 8.999 0 0 0-7.968 4.81A10.136 10.136 0 0 1 3 18C3 12.477 7.477 8 13 8V3l10 8-10 8v-5z" fill="currentColor" />
              </svg>
            </span>
            <span className="hero-galaxy-btn__glow" />
            <span className="hero-galaxy-btn__stars" />
          </Button>
        </form>

        <div id="result-box" className={result ? 'visible' : ''}>
          <div className="pt-4 flex flex-col gap-3" style={{ borderTop: '1px solid var(--border-mid)' }}>
            <p className="text-[0.75rem] font-semibold tracking-wide uppercase" style={{ color: 'var(--text-4)' }}>
              {formContent.resultTitle}
            </p>
            <div className="flex items-center justify-between gap-3 rounded-2xl border px-4 py-3" style={{ background: 'var(--bg-input)', borderColor: 'var(--border)' }}>
              <a
                id="short-link"
                href={shortUrlHref}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[0.88rem] font-semibold truncate hover:underline"
                style={{ color: '#7c6ffa' }}
              >
                {displayShortUrl}
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
                {copied ? formContent.copySuccess : formContent.copyDefault}
              </Button>
            </div>
            <p className="text-[0.74rem]" style={{ color: 'var(--text-4)' }}>
              {formContent.validityTextStart}{' '}
              <a href={formContent.validityLinkHref} className="underline hover:text-[#7c6ffa]" style={{ color: 'var(--text-4)' }}>
                {formContent.validityLink}
              </a>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
