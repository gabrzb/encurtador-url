import { useEffect, useRef } from 'react'
import type { ContentData } from '@/types/content'
import { Logo } from '@/components/shared/Logo/Logo'
import { NavAuthLinks } from './NavAuthLinks'
import { NavMenuButton } from './NavMenuButton'
import { NavMenuDropdown } from './NavMenuDropdown'
import './Navbar.css'

interface NavBarProps {
  content: ContentData
  menuOpen: boolean
  scrolled: boolean
  dark: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
}

export function NavBar({
  content,
  menuOpen,
  scrolled,
  dark,
  onToggleMenu,
  onCloseMenu,
}: NavBarProps) {
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (!menuOpen) {
        return
      }

      const target = event.target as Node
      const clickedButton = menuButtonRef.current?.contains(target)
      const clickedDropdown = dropdownRef.current?.contains(target)

      if (!clickedButton && !clickedDropdown) {
        onCloseMenu()
      }
    }

    // Keep menu dismiss behavior consistent for keyboard and pointer users.
    const onDocumentKeydown = (event: KeyboardEvent) => {
      if (menuOpen && event.key === 'Escape') {
        onCloseMenu()
      }
    }

    document.addEventListener('click', onDocumentClick)
    document.addEventListener('keydown', onDocumentKeydown)
    return () => {
      document.removeEventListener('click', onDocumentClick)
      document.removeEventListener('keydown', onDocumentKeydown)
    }
  }, [menuOpen, onCloseMenu])

  return (
    <div
      id="navbar-wrapper"
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 navbar-size animate-fade-down ${
        scrolled ? 'navbar-size-scrolled' : ''
      }`}
    >
      <nav
        id="navbar-inner"
        className={`flex items-center justify-between rounded-full border shadow-sm ${
          scrolled ? 'px-2.5 py-1.5 sm:px-3 sm:py-2' : 'px-3 py-2 sm:px-4 sm:py-2.5'
        }`}
        style={{
          borderColor: 'var(--border)',
          background: scrolled
            ? dark
              ? 'rgba(20,20,20,0.88)'
              : 'rgba(239,239,239,0.88)'
            : 'var(--bg)',
          boxShadow: scrolled ? '0 4px 28px var(--shadow)' : '',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        }}
      >
        <a href="#" className="flex items-center gap-2">
          <Logo brand={content.brand} textClassName="text-[0.98rem] sm:text-[1.05rem] font-bold tracking-tight whitespace-nowrap" />
        </a>

        <div className="flex items-center gap-2">
          <NavAuthLinks content={content} />

          <div className="relative">
            <NavMenuButton
              ref={menuButtonRef}
              menuOpen={menuOpen}
              labelOpen={content.closeLabel}
              labelClosed={content.menuLabel}
              onClick={(event) => {
                // Prevent document click handler from immediately closing the menu.
                event.stopPropagation()
                onToggleMenu()
              }}
            />

            <NavMenuDropdown
              ref={dropdownRef}
              content={content}
              menuOpen={menuOpen}
              onCloseMenu={onCloseMenu}
            />
          </div>
        </div>
      </nav>
    </div>
  )
}
