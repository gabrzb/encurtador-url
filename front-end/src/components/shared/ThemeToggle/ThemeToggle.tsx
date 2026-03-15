import './ThemeToggle.css'

interface ThemeToggleProps {
  ariaLabel: string
  onClick: () => void
}

export function ThemeToggle({ ariaLabel, onClick }: ThemeToggleProps) {
  return (
    <button id="theme-toggle" className="floating-control" aria-label={ariaLabel} onClick={onClick}>
      <span className="icon-slot" style={{ display: 'grid' }}>
        <span id="icon-sun" className="theme-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" stroke="#111" strokeWidth="2" />
            <path
              d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              stroke="#111"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span id="icon-moon" className="theme-icon">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
              stroke="#efefef"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </button>
  )
}
