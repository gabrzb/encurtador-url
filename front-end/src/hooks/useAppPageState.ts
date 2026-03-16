import { useEffect } from 'react'
import { content } from '@/data/content'
import { useTheme } from '@/hooks/useTheme'
import { useNavbarState } from '@/hooks/useNavbarState'
import { useLanguagePicker } from '@/hooks/useLanguagePicker'
import { useUrlShortener } from '@/hooks/useUrlShortener'
import { useClipboard } from '@/hooks/useClipboard'
import { useFaq } from '@/hooks/useFaq'

export function useAppPageState() {
  const { dark, toggleTheme } = useTheme()
  const { scrolled, menuOpen, toggleMenu, closeMenu } = useNavbarState()
  const language = useLanguagePicker(content.languages[0].flag)
  const { input, result, showError, setInput, shorten } = useUrlShortener()
  const { copied, copy } = useClipboard()
  const { openIndex, toggle } = useFaq()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  const handleCopy = () => {
    if (!result?.shortUrl) {
      return
    }
    void copy(result.shortUrl)
  }

  const scrollToInput = () => {
    const inputElement = document.getElementById('url-input')
    inputElement?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => inputElement?.focus(), 600)
  }

  return {
    dark,
    toggleTheme,
    scrolled,
    menuOpen,
    toggleMenu,
    closeMenu,
    language,
    input,
    result,
    showError,
    setInput,
    shorten,
    copied,
    openIndex,
    toggle,
    handleCopy,
    scrollToInput,
  }
}
