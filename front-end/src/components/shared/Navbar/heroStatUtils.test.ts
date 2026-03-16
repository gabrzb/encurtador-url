import { describe, expect, it } from 'vitest'
import { getDownStartValue, parseHeroStatValue } from './heroStatUtils'

describe('heroStatUtils', () => {
  it('parseia valor numerico com prefixo e sufixo', () => {
    const parsed = parseHeroStatValue('~0.3s')

    expect(parsed.kind).toBe('numeric')
    if (parsed.kind === 'numeric') {
      expect(parsed.prefix).toBe('~')
      expect(parsed.value).toBe(0.3)
      expect(parsed.suffix).toBe('s')
    }
  })

  it('retorna texto quando nao houver numero', () => {
    const parsed = parseHeroStatValue('instantaneo')

    expect(parsed).toEqual({
      kind: 'text',
      value: 'instantaneo',
    })
  })

  it('calcula valor inicial para animacao decrescente', () => {
    expect(getDownStartValue(0.5)).toBeCloseTo(1.4)
  })
})
