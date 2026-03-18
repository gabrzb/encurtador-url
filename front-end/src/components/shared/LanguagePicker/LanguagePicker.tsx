import { useEffect, useRef } from 'react'
import type { LanguageOption } from '@/types/content'
import './LanguagePicker.css'

interface LanguagePickerProps {
  ariaLabel: string
  options: LanguageOption[]
  selectedFlag: string
  open: boolean
  onToggle: () => void
  onSelect: (flag: string) => void
  onClose: () => void
}

export function LanguagePicker({
  ariaLabel,
  options,
  selectedFlag,
  open,
  onToggle,
  onSelect,
  onClose,
}: LanguagePickerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const dropdownId = 'lang-dropdown'

  useEffect(() => {
    if (!open) {
      return
    }

    const onDocumentClick = (event: MouseEvent) => {
      if (!open || !wrapperRef.current) {
        return
      }

      if (!wrapperRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('click', onDocumentClick)
    return () => document.removeEventListener('click', onDocumentClick)
  }, [open, onClose])

  return (
    <div id="lang-wrapper" ref={wrapperRef} className="lang-wrapper">
      <button
        id="lang-btn"
        className="floating-control lang-btn"
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={dropdownId}
        onClick={(event) => {
          event.stopPropagation()
          onToggle()
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            onClose()
          }
        }}
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: 'var(--bg-card)',
          boxShadow: '0 4px 18px var(--shadow)',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.35s ease,transform 0.2s ease,box-shadow 0.35s ease',
        }}
      >
        <span id="lang-flag">{selectedFlag}</span>
      </button>
      <div
        id={dropdownId}
        className={`lang-dropdown ${open ? 'open' : 'closed'}`}
        role="listbox"
        style={{
          position: 'absolute',
          bottom: 'calc(100% + 10px)',
          right: '0',
          background: 'var(--bg)',
          border: '1px solid var(--border-mid)',
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 -4px 20px var(--shadow)',
          minWidth: '148px',
          transformOrigin: 'bottom right',
          transition: 'opacity 0.2s ease,transform 0.2s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {options.map((option, index) => (
          <button
            key={option.flag}
            className="lang-opt"
            data-flag={option.flag}
            type="button"
            role="option"
            aria-selected={selectedFlag === option.flag}
            style={index > 0 ? { borderTop: '1px solid var(--border-mid)' } : undefined}
            onClick={() => onSelect(option.flag)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
