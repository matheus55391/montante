import { Controller, type Control } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { PercentInput } from '@/components/ui/percent-input'
import {
  InputGroup,
  inputGroupPrefixClassName,
  inputGroupSelectClassName,
} from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { CalculatorFormValues } from '@/schemas/calculator-form.schema'

type InterestRateFieldProps = {
  control: Control<CalculatorFormValues>
  error?: string
}

export function InterestRateField({ control, error }: InterestRateFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="interestRatePercent">Taxa de juros</Label>
      <InputGroup error={Boolean(error)}>
        <div className="relative flex min-w-0 flex-1">
          <span className={inputGroupPrefixClassName}>%</span>
          <Controller
            control={control}
            name="interestRatePercent"
            render={({ field }) => (
              <PercentInput
                id="interestRatePercent"
                grouped
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-label="Taxa de juros"
                aria-invalid={Boolean(error)}
                className="pl-9"
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="interestRatePeriod"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="interestRatePeriod"
                aria-label="Período da taxa de juros"
                className={inputGroupSelectClassName}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Mensal</SelectItem>
                <SelectItem value="annual">Anual</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </InputGroup>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
