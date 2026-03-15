import { useState } from 'react'
import { buildShortUrl } from '@/lib/api'
import type { ShortenResult } from '@/types/url'

function createCode(): string {
  return Math.random().toString(36).slice(2, 8)
}

export function useUrlShortener() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ShortenResult | null>(null)
  const [showError, setShowError] = useState(false)

  const shorten = () => {
    const value = input.trim()

    if (!value) {
      setShowError(true)
      setTimeout(() => setShowError(false), 1200)
      return
    }

    const shortCode = createCode()
    setResult({
      shortCode,
      shortUrl: buildShortUrl(shortCode),
    })
    setShowError(false)
  }

  return {
    input,
    result,
    showError,
    setInput,
    shorten,
  }
}
