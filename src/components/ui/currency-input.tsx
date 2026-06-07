import { forwardRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  formatCurrencyInput,
  maskCurrencyInput,
  parseCurrencyInput,
} from '@/lib/currency/parse-currency-input'

type CurrencyInputProps = {
  id?: string
  value: number
  onChange: (value: number) => void
  onBlur?: () => void
  placeholder?: string
  'aria-invalid'?: boolean
  className?: string
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ id, value, onChange, onBlur, placeholder = '0,00', 'aria-invalid': ariaInvalid, className }, ref) => {
    const [displayValue, setDisplayValue] = useState(() => formatCurrencyInput(value))

    useEffect(() => {
      setDisplayValue(formatCurrencyInput(value))
    }, [value])

    function handleChange(rawValue: string) {
      const masked = maskCurrencyInput(rawValue)
      setDisplayValue(masked)
      onChange(parseCurrencyInput(masked))
    }

    return (
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
          R$
        </span>
        <input
          ref={ref}
          id={id}
          type="text"
          inputMode="numeric"
          value={displayValue}
          placeholder={placeholder}
          aria-invalid={ariaInvalid}
          onChange={(event) => handleChange(event.target.value)}
          onBlur={onBlur}
          className={cn(
            'flex h-10 w-full rounded-lg border border-border bg-background py-2 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
        />
      </div>
    )
  },
)

CurrencyInput.displayName = 'CurrencyInput'
