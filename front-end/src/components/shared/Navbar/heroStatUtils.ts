type ParsedHeroStat =
  | {
      kind: 'numeric'
      prefix: string
      suffix: string
      value: number
    }
  | {
      kind: 'text'
      value: string
    }

const HERO_STAT_VALUE_REGEX = /^([^0-9-]*)(-?\d+(?:\.\d+)?)(.*)$/

export function getDownStartValue(value: number): number {
  return value + 0.9
}

export function parseHeroStatValue(rawValue: string): ParsedHeroStat {
  const match = rawValue.match(HERO_STAT_VALUE_REGEX)

  if (!match) {
    return {
      kind: 'text',
      value: rawValue,
    }
  }

  const [, prefix, numericChunk, suffix] = match
  const parsedNumber = Number(numericChunk)

  if (!Number.isFinite(parsedNumber)) {
    return {
      kind: 'text',
      value: rawValue,
    }
  }

  return {
    kind: 'numeric',
    prefix,
    suffix,
    value: parsedNumber,
  }
}

export type { ParsedHeroStat }
