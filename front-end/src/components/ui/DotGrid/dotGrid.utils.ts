import type { Dot } from './dotGrid.types'

type ThrottledFunction<Args extends unknown[]> = ((...args: Args) => void) & { cancel: () => void }

export const throttle = <Args extends unknown[]>(func: (...args: Args) => void, limit: number): ThrottledFunction<Args> => {
  let lastCall = 0
  let canceled = false

  const throttled = (...args: Args) => {
    if (canceled) {
      return
    }

    const now = performance.now()
    if (now - lastCall >= limit) {
      lastCall = now
      func(...args)
    }
  }

  throttled.cancel = () => {
    canceled = true
  }

  return throttled
}

export function hexToRgb(hex: string) {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)

  if (!match) {
    return { r: 0, g: 0, b: 0 }
  }

  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  }
}

export function buildDots({ width, height, dotSize, gap }: { width: number; height: number; dotSize: number; gap: number }): Dot[] {
  const cols = Math.floor((width + gap) / (dotSize + gap))
  const rows = Math.floor((height + gap) / (dotSize + gap))
  const cell = dotSize + gap

  const gridW = cell * cols - gap
  const gridH = cell * rows - gap

  const extraX = width - gridW
  const extraY = height - gridH

  const startX = extraX / 2 + dotSize / 2
  const startY = extraY / 2 + dotSize / 2

  const dots: Dot[] = []

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      dots.push({
        cx: startX + x * cell,
        cy: startY + y * cell,
        xOffset: 0,
        yOffset: 0,
        _inertiaApplied: false,
      })
    }
  }

  return dots
}
