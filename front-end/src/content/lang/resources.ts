import type { ContentData } from '@/types/content'
import { enContent } from '@/content/lang/en/content'
import { esContent } from '@/content/lang/es/content'
import { ptBrContent } from '@/content/lang/pt-br/content'

export const supportedLanguages = ['pt-br', 'en', 'es'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

export const fallbackLanguage: SupportedLanguage = 'pt-br'
export const languageStorageKey = 'shun.to.language'

const languagePrefixMap: ReadonlyArray<{
  prefix: string
  language: SupportedLanguage
}> = [
  { prefix: 'pt', language: 'pt-br' },
  { prefix: 'en', language: 'en' },
  { prefix: 'es', language: 'es' },
]

export const contentByLanguage: Record<SupportedLanguage, ContentData> = {
  'pt-br': ptBrContent,
  en: enContent,
  es: esContent,
}

export function normalizeLanguage(language: string | null | undefined): SupportedLanguage {
  const normalized = language?.toLowerCase().trim()

  if (!normalized) {
    return fallbackLanguage
  }

  const matchedLanguage = languagePrefixMap.find(({ prefix }) => normalized.startsWith(prefix))
  return matchedLanguage?.language ?? fallbackLanguage
}
