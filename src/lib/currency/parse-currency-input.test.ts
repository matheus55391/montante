import { describe, expect, it } from 'vitest'
import {
  formatCurrencyInput,
  maskCurrencyInput,
  parseCurrencyInput,
} from './parse-currency-input'

describe('parseCurrencyInput', () => {
  it('converte dígitos em valor decimal', () => {
    expect(parseCurrencyInput('100000')).toBe(1000)
    expect(parseCurrencyInput('1.234,56')).toBe(1234.56)
    expect(parseCurrencyInput('')).toBe(0)
  })
})

describe('formatCurrencyInput', () => {
  it('formata valor para exibição pt-BR', () => {
    expect(formatCurrencyInput(1234.5)).toBe('1.234,50')
  })
})

describe('maskCurrencyInput', () => {
  it('aplica máscara durante digitação', () => {
    expect(maskCurrencyInput('1000')).toBe('10,00')
    expect(maskCurrencyInput('100000')).toBe('1.000,00')
  })
})
