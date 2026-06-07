import { describe, expect, it } from 'vitest'
import { formatBRL } from './format-brl'

describe('formatBRL', () => {
  it('formata valores positivos em reais brasileiros', () => {
    expect(formatBRL(1234.5)).toBe('R$ 1.234,50')
  })

  it('formata zero corretamente', () => {
    expect(formatBRL(0)).toBe('R$ 0,00')
  })

  it('formata valores negativos', () => {
    expect(formatBRL(-50.25)).toBe('-R$ 50,25')
  })

  it('respeita casas decimais customizadas', () => {
    expect(
      formatBRL(1234.567, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
    ).toBe('R$ 1.235')
  })
})
