import { forwardRef, type MouseEvent } from 'react'
import { Button } from '@/components/ui/Button/Button'

interface NavMenuButtonProps {
  menuOpen: boolean
  labelOpen: string
  labelClosed: string
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export const NavMenuButton = forwardRef<HTMLButtonElement, NavMenuButtonProps>(
  function NavMenuButton({ menuOpen, labelOpen, labelClosed, onClick }, ref) {
    return (
      <Button
        ref={ref}
        id="menu-btn"
        type="button"
        data-state={menuOpen ? 'open' : 'closed'}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-[0.78rem] sm:text-[0.82rem] font-semibold rounded-full cursor-pointer h-auto"
        style={{
          backgroundColor: menuOpen ? '#7c6ffa' : 'var(--bg-btn)',
          color: menuOpen ? '#fff' : 'var(--text-1)',
        }}
        onClick={onClick}
      >
        <span id="menu-label">{menuOpen ? labelOpen : labelClosed}</span>
        <span className="icon-slot w-[10px]" aria-hidden="true">
          <span id="icon-dots" className="flex flex-col gap-[3px]" aria-hidden="true">
            <span className="block w-[3px] h-[3px] bg-current rounded-full" />
            <span className="block w-[3px] h-[3px] bg-current rounded-full" />
            <span className="block w-[3px] h-[3px] bg-current rounded-full" />
          </span>
          <span id="icon-close" className="text-[0.9rem] leading-none font-light select-none" aria-hidden="true">
            ✕
          </span>
        </span>
      </Button>
    )
  }
)
