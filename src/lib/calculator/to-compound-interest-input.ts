import type { CompoundInterestInput } from '@/lib/compound-interest'
import type { CalculatorFormValues } from '@/schemas/calculator-form.schema'

function roundRate(value: number): number {
  return Math.round(value * 10000) / 10000
}

export function toMonthlyInterestRatePercent(
  ratePercent: number,
  period: CalculatorFormValues['interestRatePeriod'],
): number {
  if (period === 'monthly') {
    return ratePercent
  }

  const annualRate = ratePercent / 100
  const monthlyRate = (1 + annualRate) ** (1 / 12) - 1

  return roundRate(monthlyRate * 100)
}

export function toPeriodInMonths(
  period: number,
  unit: CalculatorFormValues['periodUnit'],
): number {
  return unit === 'years' ? period * 12 : period
}

export function toCompoundInterestInput(
  values: CalculatorFormValues,
): CompoundInterestInput {
  return {
    initialValue: values.initialValue,
    monthlyContribution: values.monthlyContribution,
    monthlyInterestRatePercent: toMonthlyInterestRatePercent(
      values.interestRatePercent,
      values.interestRatePeriod,
    ),
    periodInMonths: toPeriodInMonths(values.period, values.periodUnit),
  }
}
