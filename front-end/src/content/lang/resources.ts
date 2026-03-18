import type { ContentData } from '@/types/content'
import { enContent } from '@/content/lang/en/content'
import { esContent } from '@/content/lang/es/content'
import { ptBrContent } from '@/content/lang/pt-br/content'

export const supportedLanguages = ['pt-br', 'en', 'es'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

export const fallbackLanguage: SupportedLanguage = 'pt-br'
export const languageStorageKey = 'shun.to.language'

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

  if (normalized.startsWith('pt')) {
    return 'pt-br'
  }

  if (normalized.startsWith('en')) {
    return 'en'
  }

  if (normalized.startsWith('es')) {
    return 'es'
  }

  return fallbackLanguage
}
