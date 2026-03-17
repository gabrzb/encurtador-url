import { describe, expect, it, vi } from 'vitest'
import { buildDots, hexToRgb, throttle } from './dotGrid.utils'

describe('dotGrid.utils', () => {
  it('converte hexadecimal para rgb', () => {
    expect(hexToRgb('#5227FF')).toEqual({ r: 82, g: 39, b: 255 })
  })

  it('retorna preto para hex invalido', () => {
    expect(hexToRgb('invalid')).toEqual({ r: 0, g: 0, b: 0 })
  })

  it('cria grade centralizada de dots', () => {
    const dots = buildDots({ width: 100, height: 100, dotSize: 10, gap: 10 })
    const expectedStart = 10
    const expectedLast = 90

    expect(dots.length).toBe(25)
    expect(dots[0]).toMatchObject({ cx: expectedStart, cy: expectedStart, xOffset: 0, yOffset: 0, _inertiaApplied: false })
    expect(dots[dots.length - 1]).toMatchObject({ cx: expectedLast, cy: expectedLast, xOffset: 0, yOffset: 0, _inertiaApplied: false })
  })

  it('throttle executa na chamada lider e bloqueia chamadas dentro da janela', () => {
    const callback = vi.fn()
    const nowSpy = vi.spyOn(performance, 'now')
    nowSpy.mockReturnValueOnce(100).mockReturnValueOnce(120).mockReturnValueOnce(200)

    const throttled = throttle(callback, 50)

    throttled('a')
    throttled('b')
    throttled('c')

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenNthCalledWith(1, 'a')
    expect(callback).toHaveBeenNthCalledWith(2, 'c')

    nowSpy.mockRestore()
  })

  it('throttle cancel impede novas execucoes', () => {
    const callback = vi.fn()
    const nowSpy = vi.spyOn(performance, 'now')
    nowSpy.mockReturnValueOnce(100).mockReturnValueOnce(250)

    const throttled = throttle(callback, 50)

    throttled('primeira')
    throttled.cancel()
    throttled('segunda')

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('primeira')

    nowSpy.mockRestore()
  })
})
