import { describe, expect, it } from 'vitest'
import {
  formatPercentInput,
  maskPercentInput,
  parsePercentInput,
} from './parse-percent-input'

describe('parsePercentInput', () => {
  it('converte dígitos em valor decimal', () => {
    expect(parsePercentInput('1232')).toBe(12.32)
    expect(parsePercentInput('100')).toBe(1)
    expect(parsePercentInput('')).toBe(0)
  })
})

describe('formatPercentInput', () => {
  it('formata valor para exibição pt-BR', () => {
    expect(formatPercentInput(12.32)).toBe('12,32')
  })
})

describe('maskPercentInput', () => {
  it('aplica máscara durante digitação', () => {
    expect(maskPercentInput('1232')).toBe('12,32')
    expect(maskPercentInput('100')).toBe('1,00')
  })
})
