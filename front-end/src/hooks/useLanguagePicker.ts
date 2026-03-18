import { useState } from 'react'

export function useLanguagePicker() {
  const [open, setOpen] = useState(false)

  return {
    open,
    setOpen,
    toggleOpen: () => setOpen((current) => !current),
    close: () => setOpen(false),
  }
}
