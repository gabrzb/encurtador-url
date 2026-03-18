import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import {
  contentByLanguage,
  fallbackLanguage,
  languageStorageKey,
  normalizeLanguage,
  supportedLanguages,
} from '@/content/lang/resources'

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return fallbackLanguage
  }

  const storedLanguage = window.localStorage.getItem(languageStorageKey)
  if (storedLanguage) {
    return normalizeLanguage(storedLanguage)
  }

  return normalizeLanguage(window.navigator.language)
}

const resources = {
  'pt-br': { translation: { content: contentByLanguage['pt-br'] } },
  en: { translation: { content: contentByLanguage.en } },
  es: { translation: { content: contentByLanguage.es } },
}

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: fallbackLanguage,
    supportedLngs: supportedLanguages,
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
    },
  })
}

i18n.on('languageChanged', (language) => {
  const normalizedLanguage = normalizeLanguage(language)

  if (language !== normalizedLanguage) {
    void i18n.changeLanguage(normalizedLanguage)
    return
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(languageStorageKey, normalizedLanguage)
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = normalizedLanguage
  }
})

if (typeof document !== 'undefined') {
  document.documentElement.lang = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language)
}

export default i18n
