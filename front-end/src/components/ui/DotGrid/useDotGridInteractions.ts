import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import type { Dot, PointerState } from './dotGrid.types'
import { throttle } from './dotGrid.utils'

interface UseDotGridInteractionsOptions {
  canvasRef: RefObject<HTMLCanvasElement | null>
  dotsRef: RefObject<Dot[]>
  pointerRef: RefObject<PointerState>
  maxSpeed: number
  speedTrigger: number
  proximity: number
  resistance: number
  returnDuration: number
  shockRadius: number
  shockStrength: number
}

function animateDotBack(dot: Dot, duration: number) {
  gsap.to(dot, {
    xOffset: 0,
    yOffset: 0,
    duration,
    ease: 'elastic.out(1,0.75)',
  })
}

export function useDotGridInteractions({
  canvasRef,
  dotsRef,
  pointerRef,
  maxSpeed,
  speedTrigger,
  proximity,
  resistance,
  returnDuration,
  shockRadius,
  shockStrength,
}: UseDotGridInteractionsOptions) {
  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const now = performance.now()
      const pointer = pointerRef.current

      const isPointerSeeded = pointer.lastX !== -9999 && pointer.lastY !== -9999

      if (!pointer.lastTime || !isPointerSeeded) {
        // Por que: o primeiro evento só sincroniza histórico para evitar pico falso de velocidade.
        pointer.lastTime = now
        pointer.lastX = event.clientX
        pointer.lastY = event.clientY
        pointer.vx = 0
        pointer.vy = 0
        pointer.speed = 0
      }

      const dt = Math.max(now - pointer.lastTime, 1)
      const dx = event.clientX - pointer.lastX
      const dy = event.clientY - pointer.lastY

      let vx = (dx / dt) * 1000
      let vy = (dy / dt) * 1000
      let speed = Math.hypot(vx, vy)

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed
        vx *= scale
        vy *= scale
        speed = maxSpeed
      }

      pointer.lastTime = now
      pointer.lastX = event.clientX
      pointer.lastY = event.clientY
      pointer.vx = vx
      pointer.vy = vy
      pointer.speed = speed

      const canvas = canvasRef.current
      if (!canvas) {
        return
      }

      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pointer.x, dot.cy - pointer.y)

        if (speed <= speedTrigger || dist >= proximity || dot._inertiaApplied) {
          continue
        }

        dot._inertiaApplied = true
        gsap.killTweensOf(dot)

        const pushX = dot.cx - pointer.x + vx * 0.005
        const pushY = dot.cy - pointer.y + vy * 0.005

        gsap.to(dot, {
          inertia: { xOffset: pushX, yOffset: pushY, resistance },
          onComplete: () => {
            animateDotBack(dot, returnDuration)
            dot._inertiaApplied = false
          },
        })
      }
    }

    const onClick = (event: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) {
        return
      }

      const rect = canvas.getBoundingClientRect()
      const cx = event.clientX - rect.left
      const cy = event.clientY - rect.top

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy)

        if (dist >= shockRadius || dot._inertiaApplied) {
          continue
        }

        dot._inertiaApplied = true
        gsap.killTweensOf(dot)

        const falloff = Math.max(0, 1 - dist / shockRadius)
        const pushX = (dot.cx - cx) * shockStrength * falloff
        const pushY = (dot.cy - cy) * shockStrength * falloff

        gsap.to(dot, {
          inertia: { xOffset: pushX, yOffset: pushY, resistance },
          onComplete: () => {
            animateDotBack(dot, returnDuration)
            dot._inertiaApplied = false
          },
        })
      }
    }

    const throttledMove = throttle(onMove, 50)
    const dotsSnapshot = dotsRef.current

    window.addEventListener('mousemove', throttledMove, { passive: true })
    window.addEventListener('click', onClick)

    return () => {
      throttledMove.cancel()
      window.removeEventListener('mousemove', throttledMove)
      window.removeEventListener('click', onClick)
      gsap.killTweensOf(dotsSnapshot)

      for (const dot of dotsSnapshot) {
        dot._inertiaApplied = false
        dot.xOffset = 0
        dot.yOffset = 0
      }
    }
  }, [
    canvasRef,
    dotsRef,
    pointerRef,
    maxSpeed,
    speedTrigger,
    proximity,
    resistance,
    returnDuration,
    shockRadius,
    shockStrength,
  ])
}
