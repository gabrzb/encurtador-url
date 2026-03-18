import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { contentByLanguage, fallbackLanguage, normalizeLanguage } from '@/content/lang/resources'
import type { ContentData } from '@/types/content'

export function useLocalizedContent() {
  const { t, i18n } = useTranslation()
  const activeLanguage = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language)

  const content = useMemo(() => {
    const translatedContent = t('content', { returnObjects: true })

    if (translatedContent && typeof translatedContent === 'object') {
      return translatedContent as ContentData
    }

    return contentByLanguage[fallbackLanguage]
  }, [activeLanguage, t])

  return {
    content,
    activeLanguage,
  }
}
