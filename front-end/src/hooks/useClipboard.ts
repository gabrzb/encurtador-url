import { useEffect, useRef, useState } from 'react'

export function useClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }

      setCopied(true)
      timeoutRef.current = window.setTimeout(() => setCopied(false), resetMs)
      return true
    } catch {
      return false
    }
  }

  return {
    copied,
    copy,
  }
}
