export function normalizeHttpUrl(urlValue: string | null | undefined): string | null {
  if (typeof urlValue !== 'string') {
    return null
  }

  const normalizedValue = urlValue.trim()

  if (!normalizedValue) {
    return null
  }

  try {
    const parsedUrl = new URL(normalizedValue)
    return /^https?:$/i.test(parsedUrl.protocol) ? parsedUrl.toString() : null
  } catch {
    return null
  }
}

export function isValidHttpUrl(urlValue: string): boolean {
  return normalizeHttpUrl(urlValue) !== null
}
