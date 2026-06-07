import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CurrencyInput } from '@/components/ui/currency-input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  calculatorFormSchema,
  defaultCalculatorFormValues,
  type CalculatorFormValues,
} from '@/schemas/calculator-form.schema'
import { InterestRateField } from './interest-rate-field'
import { PeriodField } from './period-field'

type CalculatorFormProps = {
  onSubmit: (values: CalculatorFormValues) => void
  onClear: () => void
  defaultValues?: CalculatorFormValues
}

export function CalculatorForm({
  onSubmit,
  onClear,
  defaultValues = defaultCalculatorFormValues,
}: CalculatorFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorFormSchema),
    defaultValues,
  })

  function handleClear() {
    reset(defaultCalculatorFormValues)
    onClear()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parâmetros da simulação</CardTitle>
        <CardDescription>
          Informe os valores para calcular a evolução do patrimônio com juros compostos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="initialValue">Valor inicial</Label>
              <Controller
                control={control}
                name="initialValue"
                render={({ field }) => (
                  <CurrencyInput
                    id="initialValue"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    aria-invalid={Boolean(errors.initialValue)}
                  />
                )}
              />
              {errors.initialValue && (
                <p className="text-sm text-red-500">{errors.initialValue.message}</p>
              )}
            </div>

            <InterestRateField
              control={control}
              error={errors.interestRatePercent?.message}
            />

            <PeriodField control={control} error={errors.period?.message} />

            <div className="space-y-2">
              <Label htmlFor="monthlyContribution">Investimento mensal</Label>
              <Controller
                control={control}
                name="monthlyContribution"
                render={({ field }) => (
                  <CurrencyInput
                    id="monthlyContribution"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    aria-invalid={Boolean(errors.monthlyContribution)}
                  />
                )}
              />
              {errors.monthlyContribution && (
                <p className="text-sm text-red-500">{errors.monthlyContribution.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button type="submit" className="sm:flex-1">
              Calcular
            </Button>
            <Button type="button" variant="outline" onClick={handleClear}>
              Limpar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
