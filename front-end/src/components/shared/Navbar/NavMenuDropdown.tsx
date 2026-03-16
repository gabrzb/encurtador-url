import { forwardRef } from 'react'
import type { ContentData, NavMenuItem } from '@/types/content'

interface NavMenuDropdownProps {
  content: ContentData
  menuOpen: boolean
  onCloseMenu: () => void
}

interface MenuSectionProps {
  heading: string
  items: NavMenuItem[]
  onCloseMenu: () => void
}

function MenuSection({ heading, items, onCloseMenu }: MenuSectionProps) {
  return (
    <>
      <div className="px-5 pt-4 pb-1">
        <p className="text-[0.68rem] font-semibold tracking-widest uppercase" style={{ color: 'var(--text-4)' }}>
          {heading}
        </p>
      </div>

      {items.map((item, index) => (
        <a
          key={item.href}
          href={item.href}
          role="menuitem"
          className="menu-item flex items-center justify-between px-5 py-3 text-[0.88rem] font-medium transition-colors"
          style={{
            color: 'var(--text-1)',
            borderBottom: index === items.length - 1 ? '1px solid var(--border-mid)' : undefined,
          }}
          onClick={onCloseMenu}
        >
          {item.label}
          <span className="arrow text-lg">→</span>
        </a>
      ))}
    </>
  )
}

export const NavMenuDropdown = forwardRef<HTMLDivElement, NavMenuDropdownProps>(
  function NavMenuDropdown({ content, menuOpen, onCloseMenu }, ref) {
    return (
      <div
        id="dropdown-menu"
        ref={ref}
        role="menu"
        aria-hidden={!menuOpen}
        className={`${menuOpen ? 'open' : 'closed'} absolute right-0 w-52 rounded-2xl border shadow-xl overflow-hidden`}
        style={{ top: 'calc(100% + 8px)', borderColor: 'var(--border-mid)', background: 'var(--bg)' }}
      >
        <MenuSection heading={content.pageHeading} items={content.pageMenu} onCloseMenu={onCloseMenu} />
        <MenuSection heading={content.companyHeading} items={content.companyMenu} onCloseMenu={onCloseMenu} />
      </div>
    )
  }
)
