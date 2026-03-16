import type { ContentData } from '@/types/content'

interface NavAuthLinksProps {
  content: ContentData
}

export function NavAuthLinks({ content }: NavAuthLinksProps) {
  return (
    <>
      <a
        href="/login"
        className="nav-pill nav-pill-outline nav-sweep nav-sweep-invert flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-[0.78rem] sm:text-[0.82rem] font-semibold cursor-pointer border"
        style={{ color: '#111111', borderColor: '#d6d6d6', background: '#ffffff' }}
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
