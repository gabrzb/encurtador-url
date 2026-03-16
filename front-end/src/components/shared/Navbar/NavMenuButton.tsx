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
        className="no-hover-lift !hover:translate-y-0 !hover:shadow-none rounded-full cursor-pointer h-auto"
        onClick={onClick}
      >
        <span className="menu-btn-inner text-[0.78rem] sm:text-[0.82rem] font-semibold">
          <span className="menu-label-slot" aria-live="polite">
            <span className="menu-label menu-label--closed" aria-hidden={menuOpen}>
              {labelClosed}
            </span>
            <span className="menu-label menu-label--open" aria-hidden={!menuOpen}>
              {labelOpen}
            </span>
          </span>
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
        </span>
      </Button>
    )
  }
)
