import { apiRequest } from '@/lib/http/client'

export interface CreateShortUrlPayload {
  originalUrl: string
  expirationDays: number
}

export interface CreateShortUrlResponse {
  shortUrl: string
  originalUrl: string
  expiresAt: string
  shortCode: string
  clickCount: number
  createdAt: string
  daysUntilExpiry: number
}

export const urlShortenerApi = {
  async createShortUrl(payload: CreateShortUrlPayload): Promise<CreateShortUrlResponse> {
    return apiRequest<CreateShortUrlResponse>('/api/urls', {
      method: 'POST',
      body: payload,
    })
  },
}
