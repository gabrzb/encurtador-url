import { apiRequest } from '@/lib/http/client'

export interface CreateShortUrlPayload {
  originalUrl: string
}

export interface CreateShortUrlResponse {
  id: string
  shortUrl: string
  originalUrl: string
}

export const urlShortenerApi = {
  // Temporary endpoint until the backend contract is finalized.
  async createShortUrl(payload: CreateShortUrlPayload): Promise<CreateShortUrlResponse> {
    return apiRequest<CreateShortUrlResponse>('/api/short-urls', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}
