import { useCallback, useState } from 'react'
import { ApiRequestError } from '@/lib/http/client'
import { isValidHttpUrl } from '@/lib/url'
import { urlShortenerApi } from '@/services/urlShortenerApi'
import type { ShortenErrorType, ShortenResult, ShortenStatus } from '@/types/url'

const DEFAULT_EXPIRATION_DAYS = 30

function resolveExpirationDays(): number {
  const configuredValue = Number(import.meta.env.VITE_DEFAULT_EXPIRATION_DAYS ?? DEFAULT_EXPIRATION_DAYS)

  if (!Number.isFinite(configuredValue)) {
    return DEFAULT_EXPIRATION_DAYS
  }

  return Math.min(30, Math.max(1, Math.trunc(configuredValue)))
}

export function useUrlShortener() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ShortenResult | null>(null)
  const [errorType, setErrorType] = useState<ShortenErrorType>(null)
  const [isLoading, setIsLoading] = useState(false)

  const expirationDays = resolveExpirationDays()

  const setInputValue = useCallback((nextInput: string) => {
    setInput(nextInput)
    setErrorType(null)
  }, [])

  const shorten = useCallback(async () => {
    if (isLoading) {
      return
    }

    const value = input.trim()

    if (!isValidHttpUrl(value)) {
      setResult(null)
      setErrorType('validation')
      return
    }

    setErrorType(null)
    setResult(null)
    setIsLoading(true)

    try {
      const response = await urlShortenerApi.createShortUrl({
        originalUrl: value,
        expirationDays,
      })

      setResult({
        shortCode: response.shortCode,
        shortUrl: response.shortUrl,
      })
    } catch (error) {
      if (error instanceof ApiRequestError && error.status === 429) {
        setErrorType('rate-limit')
      } else {
        setErrorType('api')
      }
    } finally {
      setIsLoading(false)
    }
  }, [expirationDays, input, isLoading])

  const status: ShortenStatus = isLoading ? 'loading' : errorType !== null ? 'error' : result ? 'success' : 'idle'

  return {
    input,
    result,
    showError: errorType !== null,
    errorType,
    isLoading,
    status,
    setInput: setInputValue,
    shorten,
  }
}
