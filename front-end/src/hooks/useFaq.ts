import { useState } from 'react'

export function useFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return {
    openIndex,
    toggle,
  }
}
