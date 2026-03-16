import React, { useRef, useEffect, useCallback, useMemo } from 'react'
import { gsap } from 'gsap'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

gsap.registerPlugin(InertiaPlugin)

type ThrottledFunction<Args extends unknown[]> = ((...args: Args) => void) & { cancel: () => void }

const throttle = <Args extends unknown[]>(func: (...args: Args) => void, limit: number): ThrottledFunction<Args> => {
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

interface Dot {
  cx: number
  cy: number
  xOffset: number
  yOffset: number
  _inertiaApplied: boolean
}

export interface DotGridProps {
  dotSize?: number
  gap?: number
  baseColor?: string
  activeColor?: string
  proximity?: number
  speedTrigger?: number
  shockRadius?: number
  shockStrength?: number
  maxSpeed?: number
  resistance?: number
  returnDuration?: number
  className?: string
  style?: React.CSSProperties
}

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!m) {
    return { r: 0, g: 0, b: 0 }
  }
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  }
}

const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 16,
  gap = 32,
  baseColor = '#5227FF',
  activeColor = '#5227FF',
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = '',
  style,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const cssWidthRef = useRef(0)
  const cssHeightRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)
  const animationActiveRef = useRef(false)
  const isIntersectingRef = useRef(true)
  const isDocumentVisibleRef = useRef(typeof document === 'undefined' ? true : !document.hidden)
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  })

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor])
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor])

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) {
      return null
    }

    const p = new Path2D()
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2)
    return p
  }, [dotSize])

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) {
      return
    }

    const { width, height } = wrap.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    cssWidthRef.current = width
    cssHeightRef.current = height

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
    }

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
        const cx = startX + x * cell
        const cy = startY + y * cell
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false })
      }
    }
    dotsRef.current = dots
  }, [dotSize, gap])

  const stopAnimation = useCallback(() => {
    animationActiveRef.current = false
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !circlePath) {
      stopAnimation()
      return
    }

    if (!isIntersectingRef.current || !isDocumentVisibleRef.current) {
      stopAnimation()
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      stopAnimation()
      return
    }

    const proxSq = proximity * proximity

    ctx.clearRect(0, 0, cssWidthRef.current, cssHeightRef.current)

    const { x: px, y: py } = pointerRef.current

    for (const dot of dotsRef.current) {
      const ox = dot.cx + dot.xOffset
      const oy = dot.cy + dot.yOffset
      const dx = dot.cx - px
      const dy = dot.cy - py
      const dsq = dx * dx + dy * dy

      let fillStyle = baseColor
      if (dsq <= proxSq) {
        const dist = Math.sqrt(dsq)
        const t = 1 - dist / proximity
        const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t)
        const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t)
        const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t)
        fillStyle = `rgb(${r},${g},${b})`
      }

      ctx.save()
      ctx.translate(ox, oy)
      ctx.fillStyle = fillStyle
      ctx.fill(circlePath)
      ctx.restore()
    }

    rafIdRef.current = requestAnimationFrame(draw)
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath, stopAnimation])

  const startAnimation = useCallback(() => {
    if (animationActiveRef.current) {
      return
    }

    if (!isIntersectingRef.current || !isDocumentVisibleRef.current) {
      return
    }

    animationActiveRef.current = true
    rafIdRef.current = requestAnimationFrame(draw)
  }, [draw])

  useEffect(() => {
    startAnimation()
    return stopAnimation
  }, [startAnimation, stopAnimation])

  useEffect(() => {
    const target = wrapperRef.current
    if (!target) {
      return
    }

    const syncAnimationState = () => {
      if (isIntersectingRef.current && isDocumentVisibleRef.current) {
        startAnimation()
      } else {
        stopAnimation()
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      isIntersectingRef.current = Boolean(entry?.isIntersecting)
      syncAnimationState()
    })

    const onVisibilityChange = () => {
      isDocumentVisibleRef.current = !document.hidden
      syncAnimationState()
    }

    observer.observe(target)
    document.addEventListener('visibilitychange', onVisibilityChange)
    syncAnimationState()

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [startAnimation, stopAnimation])

  useEffect(() => {
    buildGrid()
    let ro: ResizeObserver | null = null
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(buildGrid)
      if (wrapperRef.current) {
        ro.observe(wrapperRef.current)
      }
    } else {
      ;(window as Window).addEventListener('resize', buildGrid)
    }
    return () => {
      if (ro) {
        ro.disconnect()
      } else {
        ;(window as Window).removeEventListener('resize', buildGrid)
      }
    }
  }, [buildGrid])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const now = performance.now()
      const pr = pointerRef.current
      const dt = pr.lastTime ? now - pr.lastTime : 16
      const dx = e.clientX - pr.lastX
      const dy = e.clientY - pr.lastY
      let vx = (dx / dt) * 1000
      let vy = (dy / dt) * 1000
      let speed = Math.hypot(vx, vy)
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed
        vx *= scale
        vy *= scale
        speed = maxSpeed
      }
      pr.lastTime = now
      pr.lastX = e.clientX
      pr.lastY = e.clientY
      pr.vx = vx
      pr.vy = vy
      pr.speed = speed

      const canvas = canvasRef.current
      if (!canvas) {
        return
      }
      const rect = canvas.getBoundingClientRect()
      pr.x = e.clientX - rect.left
      pr.y = e.clientY - rect.top

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y)
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true
          gsap.killTweensOf(dot)
          const pushX = dot.cx - pr.x + vx * 0.005
          const pushY = dot.cy - pr.y + vy * 0.005
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)',
              })
              dot._inertiaApplied = false
            },
          })
        }
      }
    }

    const onClick = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) {
        return
      }
      const rect = canvas.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy)
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true
          gsap.killTweensOf(dot)
          const falloff = Math.max(0, 1 - dist / shockRadius)
          const pushX = (dot.cx - cx) * shockStrength * falloff
          const pushY = (dot.cy - cy) * shockStrength * falloff
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)',
              })
              dot._inertiaApplied = false
            },
          })
        }
      }
    }

    const throttledMove = throttle(onMove, 50)
    window.addEventListener('mousemove', throttledMove, { passive: true })
    window.addEventListener('click', onClick)

    return () => {
      throttledMove.cancel()
      window.removeEventListener('mousemove', throttledMove)
      window.removeEventListener('click', onClick)
      gsap.killTweensOf(dotsRef.current)
      for (const dot of dotsRef.current) {
        dot._inertiaApplied = false
        dot.xOffset = 0
        dot.yOffset = 0
      }
    }
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength])

  return (
    <section className={`relative h-full w-full ${className}`} style={style}>
      <div ref={wrapperRef} className="relative h-full w-full">
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      </div>
    </section>
  )
}

export default DotGrid
