import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type InputGroupProps = {
  children: ReactNode
  error?: boolean
}

export function InputGroup({ children, error }: InputGroupProps) {
  return (
    <div
      className={cn(
        'flex h-10 overflow-hidden rounded-lg border border-border bg-background focus-within:ring-2 focus-within:ring-accent',
        error && 'border-red-500 focus-within:ring-red-500',
      )}
    >
      {children}
    </div>
  )
}

export const inputGroupSelectClassName =
  'h-full w-[112px] shrink-0 rounded-none border-0 border-l border-border bg-background px-3 shadow-none focus-visible:ring-0'

export const inputGroupPrefixClassName =
  'pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground'

export const inputGroupFieldClassName =
  'min-w-0 flex-1 bg-transparent py-2 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
