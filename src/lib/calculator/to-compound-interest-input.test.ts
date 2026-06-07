import { describe, expect, it } from 'vitest'
import {
  toCompoundInterestInput,
  toMonthlyInterestRatePercent,
  toPeriodInMonths,
} from './to-compound-interest-input'

describe('toMonthlyInterestRatePercent', () => {
  it('mantém taxa quando período é mensal', () => {
    expect(toMonthlyInterestRatePercent(1, 'monthly')).toBe(1)
  })

  it('converte taxa anual para mensal equivalente', () => {
    expect(toMonthlyInterestRatePercent(12, 'annual')).toBeCloseTo(0.9489, 3)
  })
})

describe('toPeriodInMonths', () => {
  it('mantém meses', () => {
    expect(toPeriodInMonths(24, 'months')).toBe(24)
  })

  it('converte anos em meses', () => {
    expect(toPeriodInMonths(2, 'years')).toBe(24)
  })
})

describe('toCompoundInterestInput', () => {
  it('mapeia valores do formulário para input da calculadora', () => {
    expect(
      toCompoundInterestInput({
        initialValue: 10_000,
        monthlyContribution: 500,
        interestRatePercent: 12,
        interestRatePeriod: 'annual',
        period: 2,
        periodUnit: 'years',
      }),
    ).toEqual({
      initialValue: 10_000,
      monthlyContribution: 500,
      monthlyInterestRatePercent: expect.closeTo(0.9489, 3),
      periodInMonths: 24,
    })
  })
})
