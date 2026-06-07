import { TrendingUp, PiggyBank, Coins } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatBRL } from '@/lib/currency'
import type { CompoundInterestResult } from '@/lib/compound-interest'

type SummaryCardsProps = {
  result: CompoundInterestResult
}

const summaryItems = [
  {
    key: 'finalWealth' as const,
    title: 'Patrimônio final',
    icon: TrendingUp,
    accent: 'text-accent',
    bg: 'bg-accent-soft',
  },
  {
    key: 'totalInvested' as const,
    title: 'Total investido',
    icon: PiggyBank,
    accent: 'text-foreground',
    bg: 'bg-accent-soft',
  },
  {
    key: 'totalInterest' as const,
    title: 'Total em juros',
    icon: Coins,
    accent: 'text-success',
    bg: 'bg-success-soft',
  },
]

export function SummaryCards({ result }: SummaryCardsProps) {
  const values = {
    finalWealth: result.finalWealth,
    totalInvested: result.totalInvested,
    totalInterest: result.totalInterest,
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {summaryItems.map(({ key, title, icon: Icon, accent, bg }) => (
        <Card key={key}>
          <CardHeader className="mb-0 flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${bg}`}>
              <Icon className={`size-4 ${accent}`} aria-hidden />
            </div>
          </CardHeader>
          <CardContent>
            <p
              className="text-2xl font-semibold tracking-tight"
              data-testid={`summary-${key}`}
            >
              {formatBRL(values[key])}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
