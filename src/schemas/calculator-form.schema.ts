import { z } from 'zod'

export const interestRatePeriodSchema = z.enum(['monthly', 'annual'])
export const periodUnitSchema = z.enum(['months', 'years'])

export const calculatorFormSchema = z
  .object({
    initialValue: z
      .number({ error: 'Informe o valor inicial.' })
      .min(0, 'O valor inicial não pode ser negativo.'),
    monthlyContribution: z
      .number({ error: 'Informe o aporte mensal.' })
      .min(0, 'O aporte mensal não pode ser negativo.'),
    interestRatePercent: z
      .number({ error: 'Informe a taxa de juros.' })
      .min(0, 'A taxa de juros não pode ser negativa.'),
    interestRatePeriod: interestRatePeriodSchema,
    period: z
      .number({ error: 'Informe o período.' })
      .int('O período deve ser um número inteiro.')
      .min(1, 'Informe ao menos 1.'),
    periodUnit: periodUnitSchema,
  })
  .superRefine((data, context) => {
    const maxPeriod = data.periodUnit === 'months' ? 600 : 50

    if (data.period > maxPeriod) {
      context.addIssue({
        code: 'custom',
        message:
          data.periodUnit === 'months'
            ? 'O período máximo é de 600 meses.'
            : 'O período máximo é de 50 anos.',
        path: ['period'],
      })
    }
  })

export type CalculatorFormValues = z.infer<typeof calculatorFormSchema>
export type InterestRatePeriod = z.infer<typeof interestRatePeriodSchema>
export type PeriodUnit = z.infer<typeof periodUnitSchema>

export const defaultCalculatorFormValues: CalculatorFormValues = {
  initialValue: 10_000,
  monthlyContribution: 500,
  interestRatePercent: 1,
  interestRatePeriod: 'monthly',
  period: 24,
  periodUnit: 'months',
}
