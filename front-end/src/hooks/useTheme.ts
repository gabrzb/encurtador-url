import { useEffect, useState } from 'react'

export function useTheme() {
  const [dark, setDark] = useState<boolean>(() => {
    const storedTheme = window.localStorage.getItem('theme')
    if (storedTheme === 'dark') {
      return true
    }
    if (storedTheme === 'light') {
      return false
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    window.localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggleTheme = () => {
    setDark((current) => !current)
  }

  return {
    dark,
    toggleTheme,
  }
}
