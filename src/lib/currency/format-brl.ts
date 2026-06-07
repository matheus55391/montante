export type FormatBrlOptions = {
  /** Número mínimo de casas decimais exibidas. Padrão: 2. */
  minimumFractionDigits?: number
  /** Número máximo de casas decimais exibidas. Padrão: 2. */
  maximumFractionDigits?: number
}

const defaultOptions: Required<FormatBrlOptions> = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

/**
 * Formata um valor numérico como moeda brasileira (BRL).
 *
 * @example
 * formatBRL(1234.5) // "R$ 1.234,50"
 */
export function formatBRL(value: number, options: FormatBrlOptions = {}): string {
  const { minimumFractionDigits, maximumFractionDigits } = {
    ...defaultOptions,
    ...options,
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits,
    maximumFractionDigits,
  })
    .format(value)
    .replace(/\u00a0/g, ' ')
}
