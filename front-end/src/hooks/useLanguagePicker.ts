import { useState } from 'react'

export function useLanguagePicker(initialFlag: string) {
  const [open, setOpen] = useState(false)
  const [selectedFlag, setSelectedFlag] = useState(initialFlag)

  return {
    open,
    selectedFlag,
    setOpen,
    setSelectedFlag,
    toggleOpen: () => setOpen((current) => !current),
    close: () => setOpen(false),
  }
}
