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
  // Por que: endpoint provisório até o backend final estar disponível.
  async createShortUrl(payload: CreateShortUrlPayload): Promise<CreateShortUrlResponse> {
    return apiRequest<CreateShortUrlResponse>('/api/short-urls', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}
