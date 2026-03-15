const DEFAULT_SHORT_BASE_URL = 'https://shun.to'

function normalizeBaseUrl(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) {
    return DEFAULT_SHORT_BASE_URL
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed.replace(/\/$/, '')
  }

  return `https://${trimmed.replace(/\/$/, '')}`
}

export function buildShortUrl(shortCode: string): string {
  const configuredBaseUrl = import.meta.env.VITE_SHORT_BASE_URL as string | undefined
  const baseUrl = normalizeBaseUrl(configuredBaseUrl ?? DEFAULT_SHORT_BASE_URL)
  return `${baseUrl}/${shortCode}`
}
