import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatBRL } from '@/lib/currency'
import type { MonthlyEvolutionEntry } from '@/lib/compound-interest'
import { ChartTooltip } from './chart-tooltip'

type EvolutionChartProps = {
  data: MonthlyEvolutionEntry[]
}

type ChartPoint = {
  month: number
  patrimonio: number
  aporte: number
  juros: number
}

const axisTickStyle = {
  fill: 'var(--color-muted-foreground)',
  fontSize: 12,
}

export function EvolutionChart({ data }: EvolutionChartProps) {
  const chartData: ChartPoint[] = data.map((entry) => ({
    month: entry.month,
    patrimonio: entry.accumulatedWealth,
    aporte: entry.contribution,
    juros: entry.periodInterest,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução patrimonial</CardTitle>
        <CardDescription>Patrimônio acumulado mês a mês ao longo da simulação.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="patrimonioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={{ stroke: 'var(--color-border)' }}
                tick={axisTickStyle}
                tickMargin={8}
                label={{
                  value: 'Mês',
                  position: 'insideBottom',
                  offset: -4,
                  fill: 'var(--color-muted-foreground)',
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ stroke: 'var(--color-border)' }}
                tick={axisTickStyle}
                tickMargin={8}
                tickFormatter={(value: number) => formatBRL(value)}
                width={96}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ stroke: 'var(--color-accent)', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Legend
                wrapperStyle={{ color: 'var(--color-muted-foreground)' }}
              />
              <Area
                type="monotone"
                dataKey="patrimonio"
                name="Patrimônio"
                stroke="var(--color-accent)"
                fill="url(#patrimonioGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
