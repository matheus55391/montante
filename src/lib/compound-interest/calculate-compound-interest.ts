import type {
  CompoundInterestInput,
  CompoundInterestResult,
  MonthlyEvolutionEntry,
} from './types'

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100
}

function toMonthlyRate(monthlyInterestRatePercent: number): number {
  return monthlyInterestRatePercent / 100
}

function assertValidInput(input: CompoundInterestInput): void {
  const { initialValue, monthlyContribution, monthlyInterestRatePercent, periodInMonths } =
    input

  if (initialValue < 0) {
    throw new Error('O valor inicial não pode ser negativo.')
  }

  if (monthlyContribution < 0) {
    throw new Error('O aporte mensal não pode ser negativo.')
  }

  if (monthlyInterestRatePercent < 0) {
    throw new Error('A taxa de juros não pode ser negativa.')
  }

  if (!Number.isInteger(periodInMonths) || periodInMonths < 0) {
    throw new Error('O período deve ser um número inteiro de meses maior ou igual a zero.')
  }
}

/**
 * Simula juros compostos com aporte mensal ao final de cada período.
 *
 * Em cada mês, os juros incidem sobre o patrimônio acumulado até então;
 * em seguida, o aporte mensal é somado ao total.
 */
export function calculateCompoundInterest(
  input: CompoundInterestInput,
): CompoundInterestResult {
  assertValidInput(input)

  const { initialValue, monthlyContribution, monthlyInterestRatePercent, periodInMonths } =
    input

  const monthlyRate = toMonthlyRate(monthlyInterestRatePercent)
  const monthlyEvolution: MonthlyEvolutionEntry[] = []

  let accumulatedWealth = roundCurrency(initialValue)

  for (let month = 1; month <= periodInMonths; month += 1) {
    const periodInterest = roundCurrency(accumulatedWealth * monthlyRate)
    accumulatedWealth = roundCurrency(
      accumulatedWealth + periodInterest + monthlyContribution,
    )

    monthlyEvolution.push({
      month,
      contribution: roundCurrency(monthlyContribution),
      periodInterest,
      accumulatedWealth,
    })
  }

  const totalInvested = roundCurrency(
    initialValue + monthlyContribution * periodInMonths,
  )
  const finalWealth = accumulatedWealth
  const totalInterest = roundCurrency(finalWealth - totalInvested)

  return {
    finalWealth,
    totalInvested,
    totalInterest,
    monthlyEvolution,
  }
}
