import { useState } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(false)

  const toggleTheme = () => {
    setDark((current) => !current)
  }

  return {
    dark,
    toggleTheme,
  }
}
