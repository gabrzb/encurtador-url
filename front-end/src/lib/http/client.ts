export interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  body?: BodyInit | object | null
  query?: Record<string, string | number | boolean | undefined>
}

interface ApiErrorPayload {
  message?: string
}

const DEFAULT_DEV_API_BASE_URL = 'http://localhost:8082'

export class ApiRequestError extends Error {
  status: number
  details?: unknown

  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
    this.details = details
  }
}

function resolveApiBaseUrl(): string {
  const configuredBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim()

  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, '')
  }

  if (import.meta.env.DEV) {
    return DEFAULT_DEV_API_BASE_URL
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }

  return DEFAULT_DEV_API_BASE_URL
}

function buildUrl(path: string, query?: ApiRequestOptions['query']): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = new URL(normalizedPath, `${resolveApiBaseUrl()}/`)

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    })
  }

  return url.toString()
}

async function parseResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined
  }

  const contentType = response.headers.get('content-type')?.toLowerCase() ?? ''

  if (contentType.includes('application/json')) {
    return (await response.json()) as unknown
  }

  if (contentType.includes('text/plain')) {
    return (await response.text()) as unknown
  }

  const bodyText = await response.text()
  return bodyText.length > 0 ? bodyText : undefined
}

export async function apiRequest<TResponse>(path: string, options: ApiRequestOptions = {}): Promise<TResponse> {
  const { query, headers, ...init } = options
  const url = buildUrl(path, query)
  const requestHeaders = new Headers(headers)

  const body = init.body
  const hasJsonBody =
    body !== undefined &&
    body !== null &&
    typeof body !== 'string' &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer) &&
    !(ArrayBuffer.isView(body)) &&
    !(typeof ReadableStream !== 'undefined' && body instanceof ReadableStream)

  if (hasJsonBody && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json')
  }

  const normalizedBody = hasJsonBody
    ? JSON.stringify(body)
    : (body as BodyInit | null | undefined)

  const response = await fetch(url, {
    ...init,
    body: normalizedBody,
    headers: requestHeaders,
  })

  const responseBody = await parseResponseBody(response)

  if (!response.ok) {
    const errorMessage =
      typeof responseBody === 'object' &&
      responseBody !== null &&
      typeof (responseBody as ApiErrorPayload).message === 'string'
        ? (responseBody as ApiErrorPayload).message!
        : `API request failed: ${response.status}`

    throw new ApiRequestError(errorMessage, response.status, responseBody)
  }

  return responseBody as TResponse
}
