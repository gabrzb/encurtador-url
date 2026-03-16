import { describe, expect, it } from 'vitest'
import { buildDots, hexToRgb } from './dotGrid.utils'

describe('dotGrid.utils', () => {
  it('converte hexadecimal para rgb', () => {
    expect(hexToRgb('#5227FF')).toEqual({ r: 82, g: 39, b: 255 })
  })

  it('retorna preto para hex invalido', () => {
    expect(hexToRgb('invalid')).toEqual({ r: 0, g: 0, b: 0 })
  })

  it('cria grade centralizada de dots', () => {
    const dots = buildDots({ width: 100, height: 100, dotSize: 10, gap: 10 })

    expect(dots.length).toBe(25)
    expect(dots[0]).toMatchObject({ xOffset: 0, yOffset: 0, _inertiaApplied: false })
  })
})
