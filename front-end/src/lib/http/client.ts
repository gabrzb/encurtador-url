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

  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return (await response.json()) as TResponse
}
