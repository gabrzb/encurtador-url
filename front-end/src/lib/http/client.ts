export interface ApiRequestOptions extends RequestInit {
  query?: Record<string, string | number | boolean | undefined>
}

function buildUrl(path: string, query?: ApiRequestOptions['query']): string {
  const url = new URL(path, window.location.origin)

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    })
  }

  return url.toString()
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

  const response = await fetch(url, {
    ...init,
    body: hasJsonBody ? JSON.stringify(body) : body,
    headers: requestHeaders,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as TResponse
  }

  const contentType = response.headers.get('content-type')?.toLowerCase() ?? ''

  if (contentType.includes('application/json')) {
    return (await response.json()) as TResponse
  }

  if (contentType.includes('text/plain')) {
    return (await response.text()) as TResponse
  }

  return (await response.text()) as TResponse
}
