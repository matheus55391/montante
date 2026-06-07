import { forwardRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  formatPercentInput,
  maskPercentInput,
  parsePercentInput,
} from '@/lib/format/parse-percent-input'

type PercentInputProps = {
  id?: string
  value: number
  onChange: (value: number) => void
  onBlur?: () => void
  placeholder?: string
  'aria-invalid'?: boolean
  'aria-label'?: string
  className?: string
  grouped?: boolean
}

export const PercentInput = forwardRef<HTMLInputElement, PercentInputProps>(
  (
    {
      id,
      value,
      onChange,
      onBlur,
      placeholder = '0,00',
      'aria-invalid': ariaInvalid,
      'aria-label': ariaLabel,
      className,
      grouped = false,
    },
    ref,
  ) => {
    const [displayValue, setDisplayValue] = useState(() => formatPercentInput(value))

    useEffect(() => {
      setDisplayValue(formatPercentInput(value))
    }, [value])

    function handleChange(rawValue: string) {
      const masked = maskPercentInput(rawValue)
      setDisplayValue(masked)
      onChange(parsePercentInput(masked))
    }

    if (grouped) {
      return (
        <input
          ref={ref}
          id={id}
          type="text"
          inputMode="decimal"
          value={displayValue}
          placeholder={placeholder}
          aria-invalid={ariaInvalid}
          aria-label={ariaLabel}
          onChange={(event) => handleChange(event.target.value)}
          onBlur={onBlur}
          className={cn(
            'min-w-0 flex-1 bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
        />
      )
    }

    return (
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
          %
        </span>
        <input
          ref={ref}
          id={id}
          type="text"
          inputMode="decimal"
          value={displayValue}
          placeholder={placeholder}
          aria-invalid={ariaInvalid}
          aria-label={ariaLabel}
          onChange={(event) => handleChange(event.target.value)}
          onBlur={onBlur}
          className={cn(
            'flex h-10 w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
        />
      </div>
    )
  },
)

PercentInput.displayName = 'PercentInput'
