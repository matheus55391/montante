import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatBRL } from '@/lib/currency'
import type { MonthlyEvolutionEntry } from '@/lib/compound-interest'

type EvolutionTableProps = {
  data: MonthlyEvolutionEntry[]
}

export function EvolutionTable({ data }: EvolutionTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução mensal</CardTitle>
        <CardDescription>Detalhamento de aportes, juros e patrimônio por mês.</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-3 py-2 font-medium">Mês</th>
              <th className="px-3 py-2 font-medium">Aporte</th>
              <th className="px-3 py-2 font-medium">Juros do período</th>
              <th className="px-3 py-2 font-medium">Patrimônio acumulado</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr
                key={entry.month}
                className="border-b border-border/60 last:border-b-0"
              >
                <td className="px-3 py-2 font-medium">{entry.month}</td>
                <td className="px-3 py-2">{formatBRL(entry.contribution)}</td>
                <td className="px-3 py-2 text-success">{formatBRL(entry.periodInterest)}</td>
                <td className="px-3 py-2 font-medium">{formatBRL(entry.accumulatedWealth)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
