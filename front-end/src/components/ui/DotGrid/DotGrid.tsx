import React from 'react'
import { gsap } from 'gsap'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import type { DotGridProps } from './dotGrid.types'
import { useDotGridEngine } from './useDotGridEngine'
import { useDotGridInteractions } from './useDotGridInteractions'

gsap.registerPlugin(InertiaPlugin)

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
  const { wrapperRef, canvasRef, dotsRef, pointerRef } = useDotGridEngine({
    dotSize,
    gap,
    baseColor,
    activeColor,
    proximity,
  })

  useDotGridInteractions({
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
  })

  return (
    <section className={`relative h-full w-full ${className}`} style={style}>
      <div ref={wrapperRef} className="relative h-full w-full">
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      </div>
    </section>
  )
}

export default DotGrid
