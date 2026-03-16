import { useEffect, useRef, useState } from 'react'

export function useRevealOnScroll<TElement extends HTMLElement>() {
  const ref = useRef<TElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = ref.current
    if (!target || visible) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [visible])

  return {
    ref,
    visible,
  }
}
