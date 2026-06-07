import { describe, expect, it } from 'vitest'
import { calculateCompoundInterest } from './calculate-compound-interest'

describe('calculateCompoundInterest', () => {
  it('calcula patrimônio final com juros compostos e aportes mensais', () => {
    const result = calculateCompoundInterest({
      initialValue: 1000,
      monthlyContribution: 500,
      monthlyInterestRatePercent: 1,
      periodInMonths: 3,
    })

    expect(result.finalWealth).toBe(2545.35)
    expect(result.totalInvested).toBe(2500)
    expect(result.totalInterest).toBe(45.35)
    expect(result.monthlyEvolution).toHaveLength(3)
  })

  it('gera evolução mensal com mês, aporte, juros e patrimônio', () => {
    const result = calculateCompoundInterest({
      initialValue: 1000,
      monthlyContribution: 500,
      monthlyInterestRatePercent: 1,
      periodInMonths: 2,
    })

    expect(result.monthlyEvolution[0]).toEqual({
      month: 1,
      contribution: 500,
      periodInterest: 10,
      accumulatedWealth: 1510,
    })

    expect(result.monthlyEvolution[1]).toEqual({
      month: 2,
      contribution: 500,
      periodInterest: 15.1,
      accumulatedWealth: 2025.1,
    })
  })

  it('retorna apenas valor inicial quando período é zero', () => {
    const result = calculateCompoundInterest({
      initialValue: 5000,
      monthlyContribution: 200,
      monthlyInterestRatePercent: 1,
      periodInMonths: 0,
    })

    expect(result.finalWealth).toBe(5000)
    expect(result.totalInvested).toBe(5000)
    expect(result.totalInterest).toBe(0)
    expect(result.monthlyEvolution).toEqual([])
  })

  it('funciona sem valor inicial e apenas com aportes', () => {
    const result = calculateCompoundInterest({
      initialValue: 0,
      monthlyContribution: 1000,
      monthlyInterestRatePercent: 0.5,
      periodInMonths: 2,
    })

    expect(result.totalInvested).toBe(2000)
    expect(result.monthlyEvolution[0].accumulatedWealth).toBe(1000)
    expect(result.monthlyEvolution[1].periodInterest).toBe(5)
    expect(result.monthlyEvolution[1].accumulatedWealth).toBe(2005)
  })

  it('rejeita valores negativos', () => {
    expect(() =>
      calculateCompoundInterest({
        initialValue: -100,
        monthlyContribution: 500,
        monthlyInterestRatePercent: 1,
        periodInMonths: 12,
      }),
    ).toThrow('O valor inicial não pode ser negativo.')
  })

  it('rejeita período não inteiro', () => {
    expect(() =>
      calculateCompoundInterest({
        initialValue: 1000,
        monthlyContribution: 500,
        monthlyInterestRatePercent: 1,
        periodInMonths: 12.5,
      }),
    ).toThrow('O período deve ser um número inteiro de meses maior ou igual a zero.')
  })
})
