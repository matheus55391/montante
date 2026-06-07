import { describe, expect, it } from 'vitest'
import { calculatorFormSchema } from './calculator-form.schema'

describe('calculatorFormSchema', () => {
  it('aceita valores válidos', () => {
    const parsed = calculatorFormSchema.parse({
      initialValue: 10_000,
      monthlyContribution: 500,
      interestRatePercent: 1,
      interestRatePeriod: 'monthly',
      period: 24,
      periodUnit: 'months',
    })

    expect(parsed).toEqual({
      initialValue: 10_000,
      monthlyContribution: 500,
      interestRatePercent: 1,
      interestRatePeriod: 'monthly',
      period: 24,
      periodUnit: 'months',
    })
  })

  it('rejeita período menor que 1', () => {
    const result = calculatorFormSchema.safeParse({
      initialValue: 1000,
      monthlyContribution: 500,
      interestRatePercent: 1,
      interestRatePeriod: 'monthly',
      period: 0,
      periodUnit: 'months',
    })

    expect(result.success).toBe(false)
  })

  it('rejeita taxa de juros negativa', () => {
    const result = calculatorFormSchema.safeParse({
      initialValue: 1000,
      monthlyContribution: 500,
      interestRatePercent: -1,
      interestRatePeriod: 'monthly',
      period: 12,
      periodUnit: 'months',
    })

    expect(result.success).toBe(false)
  })

  it('rejeita período acima do limite em anos', () => {
    const result = calculatorFormSchema.safeParse({
      initialValue: 1000,
      monthlyContribution: 500,
      interestRatePercent: 1,
      interestRatePeriod: 'monthly',
      period: 51,
      periodUnit: 'years',
    })

    expect(result.success).toBe(false)
  })
})
