/**
 * Converte texto digitado (máscara percentual) em valor numérico.
 * Trata os dígitos como centésimos: "1232" → 12.32
 */
export function parsePercentInput(input: string): number {
  const digits = input.replace(/\D/g, '')

  if (!digits) {
    return 0
  }

  return Number(digits) / 100
}

/**
 * Formata valor percentual para exibição no input (sem símbolo %).
 */
export function formatPercentInput(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/**
 * Aplica máscara percentual conforme o usuário digita.
 */
export function maskPercentInput(rawValue: string): string {
  return formatPercentInput(parsePercentInput(rawValue))
}
