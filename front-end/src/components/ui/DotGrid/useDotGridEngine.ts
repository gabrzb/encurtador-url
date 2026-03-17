import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { Dot, PointerState } from './dotGrid.types'
import { buildDots, hexToRgb } from './dotGrid.utils'

interface UseDotGridEngineOptions {
  dotSize: number
  gap: number
  baseColor: string
  activeColor: string
  proximity: number
}

export function useDotGridEngine({ dotSize, gap, baseColor, activeColor, proximity }: UseDotGridEngineOptions) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const cssWidthRef = useRef(0)
  const cssHeightRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)
  const animationActiveRef = useRef(false)
  const isIntersectingRef = useRef(true)
  const isDocumentVisibleRef = useRef(typeof document === 'undefined' ? true : !document.hidden)
  const pointerRef = useRef<PointerState>({
    // Start off-canvas to avoid accidental highlight on first paint.
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: typeof performance !== 'undefined' ? performance.now() : Date.now(),
    lastX: -9999,
    lastY: -9999,
  })

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor])
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor])

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) {
      return null
    }

    const path = new Path2D()
    path.arc(0, 0, dotSize / 2, 0, Math.PI * 2)
    return path
  }, [dotSize])

  const stopAnimation = useCallback(() => {
    animationActiveRef.current = false
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }, [])

  const draw = useCallback(function drawFrame() {
    const canvas = canvasRef.current

    if (!canvas || !circlePath) {
      stopAnimation()
      return
    }

    // Pause the loop while offscreen or on hidden tab to avoid needless GPU work.
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
    const { x: px, y: py } = pointerRef.current

    ctx.clearRect(0, 0, cssWidthRef.current, cssHeightRef.current)

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

    rafIdRef.current = requestAnimationFrame(drawFrame)
  }, [activeRgb, baseColor, baseRgb, circlePath, proximity, stopAnimation])

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
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    dotsRef.current = buildDots({ width, height, dotSize, gap })
  }, [dotSize, gap])

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

    // Visibility observers decide whether RAF should run at all.
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
    if (typeof window === 'undefined') {
      return
    }

    buildGrid()

    let observer: ResizeObserver | null = null

    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(buildGrid)
      if (wrapperRef.current) {
        observer.observe(wrapperRef.current)
      }
    } else {
      window.addEventListener('resize', buildGrid)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      } else {
        window.removeEventListener('resize', buildGrid)
      }
    }
  }, [buildGrid])

  return {
    wrapperRef,
    canvasRef,
    dotsRef,
    pointerRef,
  }
}
