import { useMemo, useState } from 'react'
import { Calculator } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toCompoundInterestInput } from '@/lib/calculator/to-compound-interest-input'
import { calculateCompoundInterest } from '@/lib/compound-interest'
import {
  defaultCalculatorFormValues,
  type CalculatorFormValues,
} from '@/schemas/calculator-form.schema'
import { CalculatorForm } from './calculator-form'
import { SummaryCards } from './summary-cards'
import { EvolutionChart } from './evolution-chart'
import { EvolutionTable } from './evolution-table'

export function CalculatorPage() {
  const [formValues, setFormValues] = useState<CalculatorFormValues>(
    defaultCalculatorFormValues,
  )

  const result = useMemo(
    () => calculateCompoundInterest(toCompoundInterestInput(formValues)),
    [formValues],
  )

  function handleSubmit(values: CalculatorFormValues) {
    setFormValues(values)
  }

  function handleClear() {
    setFormValues(defaultCalculatorFormValues)
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6">
      <header className="space-y-2 text-center sm:text-left">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
          <div className="rounded-xl bg-accent-soft p-3">
            <Calculator className="size-6 text-accent" aria-hidden />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Calculadora de Juros Compostos
            </h1>
            <p className="text-muted-foreground">
              Simule a evolução do seu patrimônio com aportes mensais e juros compostos.
            </p>
          </div>
        </div>
      </header>

      <CalculatorForm
        onSubmit={handleSubmit}
        onClear={handleClear}
        defaultValues={formValues}
      />

      <SummaryCards result={result} />

      <Tabs defaultValue="chart">
        <TabsList className="w-full">
          <TabsTrigger value="chart" className="flex-1">
            Gráfico
          </TabsTrigger>
          <TabsTrigger value="table" className="flex-1">
            Tabela
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chart">
          <EvolutionChart data={result.monthlyEvolution} />
        </TabsContent>
        <TabsContent value="table">
          <EvolutionTable data={result.monthlyEvolution} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
