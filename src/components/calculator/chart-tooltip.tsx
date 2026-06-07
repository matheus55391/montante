import { formatBRL } from '@/lib/currency'

type ChartTooltipPayload = {
  name?: string
  value?: number
  color?: string
  dataKey?: string | number
}

type ChartTooltipProps = {
  active?: boolean
  payload?: ChartTooltipPayload[]
  label?: string | number
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="mb-1.5 text-sm font-medium text-foreground">Mês {label}</p>
      <ul className="space-y-1">
        {payload.map((entry) => (
          <li key={entry.dataKey} className="flex items-center gap-2 text-sm">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
              aria-hidden
            />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="font-medium text-foreground">
              {formatBRL(entry.value ?? 0)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
