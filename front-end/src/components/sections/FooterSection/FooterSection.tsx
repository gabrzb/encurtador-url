import { Logo } from '@/components/shared/Logo/Logo'
import type { FooterSectionProps } from '@/types/sections'
import './FooterSection.css'

export function FooterSection({ content }: FooterSectionProps) {
  return (
    <footer
      className="px-4 sm:px-6 py-12 sm:py-14"
      style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-mid)',
        transition: 'background 0.4s ease,border-color 0.4s ease',
      }}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
          <div className="flex flex-col gap-4 max-w-xs">
            <a href="#" className="flex items-center gap-2">
              <Logo brand={content.brand} textClassName="text-[1rem] font-bold tracking-tight" />
            </a>
            <p className="text-[0.83rem] leading-relaxed" style={{ color: 'var(--text-3)' }}>
              {content.footer.description}
            </p>
            <div className="flex items-center gap-2">
              <a href="#" aria-label="LinkedIn" className="social-btn w-9 h-9 rounded-xl flex items-center justify-center" style={{ color: 'var(--text-1)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H10v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="social-btn w-9 h-9 rounded-xl flex items-center justify-center" style={{ color: 'var(--text-1)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="social-btn w-9 h-9 rounded-xl flex items-center justify-center" style={{ color: 'var(--text-1)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 text-[0.85rem] w-full md:w-auto">
            {content.footer.columns.map((column, index) => (
              <div key={column.title} className={`flex flex-col gap-3 ${index === 2 ? 'col-span-2 md:col-span-1' : ''}`}>
                <p className="font-bold text-[0.75rem] tracking-widest uppercase" style={{ color: 'var(--text-1)' }}>
                  {column.title}
                </p>
                {column.links.map((link, linkIndex) => (
                  <a
                    key={`${column.title}-${link.label}-${link.href}-${linkIndex}`}
                    href={link.href}
                    style={{ color: 'var(--text-3)' }}
                    className="footer-link-underline hover:text-[#7c6ffa] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-px mb-6" style={{ background: 'var(--border-mid)' }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.76rem]" style={{ color: 'var(--text-4)' }}>
          <p>{content.footer.copyright}</p>
          <div className="flex items-center gap-4 sm:gap-5">
            {content.footer.legal.map((item) => (
              <a
                key={item}
                href="#"
                className="footer-link-underline hover:text-[#7c6ffa] transition-colors"
                style={{ color: 'var(--text-4)' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
