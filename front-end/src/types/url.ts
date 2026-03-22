export interface ShortenResult {
  shortCode: string
  shortUrl: string
}

export type ShortenErrorType = 'validation' | 'api' | 'rate-limit' | null

export type ShortenStatus = 'idle' | 'loading' | 'success' | 'error'
