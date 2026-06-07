import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { toCompoundInterestInput } from '@/lib/calculator/to-compound-interest-input'
import { calculateCompoundInterest } from '@/lib/compound-interest'
import { formatBRL } from '@/lib/currency'
import { defaultCalculatorFormValues } from '@/schemas/calculator-form.schema'
import { CalculatorPage } from './calculator-page'

describe('CalculatorPage', () => {
  it('exibe resumo inicial com valores padrão', () => {
    render(<CalculatorPage />)

    const defaultResult = calculateCompoundInterest(
      toCompoundInterestInput(defaultCalculatorFormValues),
    )

    expect(screen.getByRole('heading', { name: /calculadora de juros compostos/i })).toBeInTheDocument()
    expect(screen.getByText('Patrimônio final')).toBeInTheDocument()
    expect(screen.getByTestId('summary-finalWealth')).toHaveTextContent(
      formatBRL(defaultResult.finalWealth),
    )
    expect(screen.getByTestId('summary-totalInvested')).toHaveTextContent(
      formatBRL(defaultResult.totalInvested),
    )
    expect(screen.getByTestId('summary-totalInterest')).toHaveTextContent(
      formatBRL(defaultResult.totalInterest),
    )
  })

  it('atualiza o resumo ao recalcular com novos parâmetros', async () => {
    const user = userEvent.setup()
    render(<CalculatorPage />)

    await user.clear(screen.getByLabelText(/valor inicial/i))
    await user.type(screen.getByLabelText(/valor inicial/i), '0')

    await user.clear(screen.getByLabelText(/investimento mensal/i))
    await user.type(screen.getByLabelText(/investimento mensal/i), '100000')

    await user.clear(screen.getByLabelText(/^taxa de juros/i))
    await user.type(screen.getByLabelText(/^taxa de juros/i), '0')

    await user.clear(screen.getByLabelText(/^período$/i))
    await user.type(screen.getByLabelText(/^período$/i), '3')

    await user.click(screen.getByRole('button', { name: /calcular/i }))

    const updatedResult = calculateCompoundInterest({
      initialValue: 0,
      monthlyContribution: 1000,
      monthlyInterestRatePercent: 0,
      periodInMonths: 3,
    })

    expect(screen.getByTestId('summary-finalWealth')).toHaveTextContent(
      formatBRL(updatedResult.finalWealth),
    )
    expect(screen.getByTestId('summary-totalInvested')).toHaveTextContent(
      formatBRL(updatedResult.totalInvested),
    )
    expect(screen.getByTestId('summary-totalInterest')).toHaveTextContent(
      formatBRL(updatedResult.totalInterest),
    )
  })

  it('restaura valores padrão ao limpar', async () => {
    const user = userEvent.setup()
    render(<CalculatorPage />)

    await user.clear(screen.getByLabelText(/valor inicial/i))
    await user.type(screen.getByLabelText(/valor inicial/i), '500000')
    await user.click(screen.getByRole('button', { name: /calcular/i }))

    await user.click(screen.getByRole('button', { name: /limpar/i }))

    const defaultResult = calculateCompoundInterest(
      toCompoundInterestInput(defaultCalculatorFormValues),
    )

    expect(screen.getByTestId('summary-finalWealth')).toHaveTextContent(
      formatBRL(defaultResult.finalWealth),
    )
    expect(screen.getByLabelText(/valor inicial/i)).toHaveValue('10.000,00')
  })

  it('alterna entre gráfico e tabela de evolução', async () => {
    const user = userEvent.setup()
    render(<CalculatorPage />)

    expect(screen.getByText(/evolução patrimonial/i)).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: /tabela/i }))

    const table = screen.getByRole('table')
    expect(within(table).getByText('Mês')).toBeInTheDocument()
    expect(within(table).getByText('Aporte')).toBeInTheDocument()
    expect(within(table).getByText('Juros do período')).toBeInTheDocument()
    expect(within(table).getByText('Patrimônio acumulado')).toBeInTheDocument()
  })
})
