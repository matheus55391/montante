import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { formatBRL } from '@/lib/currency'
import { ChartTooltip } from './chart-tooltip'

describe('ChartTooltip', () => {
  it('renderiza tooltip com tema do app', () => {
    const { container } = render(
      <ChartTooltip
        active
        label={8}
        payload={[
          { name: 'Patrimônio', value: 34462.83, color: '#c084fc', dataKey: 'patrimonio' },
        ]}
      />,
    )

    expect(screen.getByText('Mês 8')).toBeInTheDocument()
    expect(screen.getByText('Patrimônio')).toBeInTheDocument()
    expect(screen.getByText(formatBRL(34462.83))).toBeInTheDocument()

    const tooltip = container.firstChild as HTMLElement
    expect(tooltip).toHaveClass('bg-card', 'border-border')
  })

  it('não renderiza quando inativo', () => {
    const { container } = render(
      <ChartTooltip
        active={false}
        label={8}
        payload={[{ name: 'Patrimônio', value: 34462.83, color: '#c084fc' }]}
      />,
    )

    expect(container).toBeEmptyDOMElement()
  })
})
