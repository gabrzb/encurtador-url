import { useInView, useMotionValue, useSpring } from 'motion/react'
import { useCallback, useEffect, useRef } from 'react'

interface CountUpProps {
  to: number
  from?: number
  direction?: 'up' | 'down'
  delay?: number
  duration?: number
  className?: string
  startWhen?: boolean
  separator?: string
  onStart?: () => void
  onEnd?: () => void
}

const MIN_DURATION = 0.05

function getDecimalPlaces(value: number): number {
  const valueAsText = value.toString()

  if (!valueAsText.includes('.')) {
    return 0
  }

  const decimalPart = valueAsText.split('.')[1]
  return Number(decimalPart) === 0 ? 0 : decimalPart.length
}

function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  // Por que: o modo 'up' anima de from -> to; o modo 'down' inverte para to -> from.
  const motionValue = useMotionValue(direction === 'down' ? to : from)
  // Por que: evita divisão por zero/valor negativo nos parâmetros do spring.
  const sanitizedDuration = Math.max(duration, MIN_DURATION)

  const damping = 20 + 40 * (1 / sanitizedDuration)
  const stiffness = 100 * (1 / sanitizedDuration)

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  })

  const isInView = useInView(ref, { once: true, margin: '0px' })

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to))

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0

      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      }

      const formattedNumber = Intl.NumberFormat('en-US', options).format(latest)

      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber
    },
    [maxDecimals, separator],
  )

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? from : to)
    }
  }, [from, to, direction, formatValue])

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === 'function') {
        onStart()
      }

      const timeoutId = setTimeout(() => {
        // Por que: o alvo é o estado oposto ao valor inicial renderizado.
        motionValue.set(direction === 'down' ? from : to)
      }, delay * 1000)

      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === 'function') {
            onEnd()
          }
        },
        delay * 1000 + sanitizedDuration * 1000,
      )

      return () => {
        clearTimeout(timeoutId)
        clearTimeout(durationTimeoutId)
      }
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, sanitizedDuration])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest: number) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest)
      }
    })

    return () => unsubscribe()
  }, [springValue, formatValue])

  return <span className={className} ref={ref} />
}

export default CountUp
