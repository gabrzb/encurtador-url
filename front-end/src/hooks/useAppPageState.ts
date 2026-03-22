import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/hooks/useTheme'
import { useNavbarState } from '@/hooks/useNavbarState'
import { useLanguagePicker } from '@/hooks/useLanguagePicker'
import { useUrlShortener } from '@/hooks/useUrlShortener'
import { useClipboard } from '@/hooks/useClipboard'
import { useFaq } from '@/hooks/useFaq'
import { normalizeLanguage } from '@/content/lang/resources'

export function useAppPageState() {
  // Keep a single pending timer to avoid delayed focus and stale callbacks.
  const focusTimerRef = useRef<number | null>(null)
  const { i18n } = useTranslation()
  const { dark, toggleTheme } = useTheme()
  const { scrolled, menuOpen, toggleMenu, closeMenu } = useNavbarState()
  const language = useLanguagePicker()
  const currentLanguage = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language)
  const { input, result, showError, errorType, isLoading, status, setInput, shorten } = useUrlShortener()
  const { copied, copy } = useClipboard()
  const { openIndex, toggle } = useFaq()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    return () => {
      if (focusTimerRef.current !== null) {
        window.clearTimeout(focusTimerRef.current)
      }
    }
  }, [])

  const handleCopy = useCallback(() => {
    const shortUrl = result?.shortUrl

    if (!shortUrl) {
      return
    }
    void copy(shortUrl)
  }, [copy, result])

  const setLanguage = useCallback(
    (nextLanguage: string) => {
      void i18n.changeLanguage(normalizeLanguage(nextLanguage))
    },
    [i18n],
  )

  const scrollToInput = useCallback(() => {
    const inputElement = document.getElementById('url-input')
    inputElement?.scrollIntoView({ behavior: 'smooth' })

    if (focusTimerRef.current !== null) {
      window.clearTimeout(focusTimerRef.current)
    }

    focusTimerRef.current = window.setTimeout(() => {
      inputElement?.focus()
    }, 600)
  }, [])

  return {
    dark,
    toggleTheme,
    scrolled,
    menuOpen,
    toggleMenu,
    closeMenu,
    language: {
      ...language,
      currentLanguage,
      setLanguage,
    },
    input,
    result,
    showError,
    errorType,
    isLoading,
    status,
    setInput,
    shorten,
    copied,
    openIndex,
    toggle,
    handleCopy,
    scrollToInput,
  }
}
