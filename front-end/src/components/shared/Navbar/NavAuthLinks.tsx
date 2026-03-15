import type { ContentData } from '@/types/content'

interface NavAuthLinksProps {
  content: ContentData
}

export function NavAuthLinks({ content }: NavAuthLinksProps) {
  return (
    <>
      <a
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-[0.78rem] sm:text-[0.82rem] font-semibold transition-all duration-150 active:scale-95 cursor-pointer"
        style={{ background: 'var(--text-1)', color: 'var(--bg)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="hidden sm:inline">{content.githubLabel}</span>
      </a>

      <a
        href="/login"
        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-[0.78rem] sm:text-[0.82rem] font-semibold transition-all duration-150 active:scale-95 cursor-pointer border"
        style={{ color: 'var(--text-1)', borderColor: 'var(--border)', background: 'transparent' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="10 17 15 12 10 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="hidden sm:inline">{content.loginLabel}</span>
      </a>
    </>
  )
}
