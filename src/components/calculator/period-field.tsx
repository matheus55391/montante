import { Controller, type Control } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import {
  InputGroup,
  inputGroupFieldClassName,
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

type PeriodFieldProps = {
  control: Control<CalculatorFormValues>
  error?: string
}

function parseIntegerInput(value: string): number {
  const digits = value.replace(/\D/g, '')

  if (!digits) {
    return 0
  }

  return Number.parseInt(digits, 10)
}

export function PeriodField({ control, error }: PeriodFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="period">Período</Label>
      <InputGroup error={Boolean(error)}>
        <Controller
          control={control}
          name="period"
          render={({ field }) => (
            <input
              id="period"
              type="text"
              inputMode="numeric"
              value={field.value === 0 ? '' : String(field.value)}
              placeholder="24"
              aria-label="Período"
              aria-invalid={Boolean(error)}
              onChange={(event) => field.onChange(parseIntegerInput(event.target.value))}
              onBlur={field.onBlur}
              className={`${inputGroupFieldClassName} pl-3`}
            />
          )}
        />

        <Controller
          control={control}
          name="periodUnit"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="periodUnit"
                aria-label="Unidade do período"
                className={inputGroupSelectClassName}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="months">Meses</SelectItem>
                <SelectItem value="years">Anos</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </InputGroup>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
