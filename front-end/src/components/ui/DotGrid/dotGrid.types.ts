import type { CSSProperties } from 'react'

export interface Dot {
  cx: number
  cy: number
  xOffset: number
  yOffset: number
  _inertiaApplied: boolean
}

export interface PointerState {
  x: number
  y: number
  vx: number
  vy: number
  speed: number
  lastTime: number
  lastX: number
  lastY: number
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
  style?: CSSProperties
}
