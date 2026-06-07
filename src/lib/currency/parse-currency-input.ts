/**
 * Converte texto digitado (máscara BRL) em valor numérico.
 * Trata os dígitos como centavos: "123456" → 1234.56
 */
export function parseCurrencyInput(input: string): number {
  const digits = input.replace(/\D/g, '')

  if (!digits) {
    return 0
  }

  return Number(digits) / 100
}

/**
 * Formata valor numérico para exibição no input (sem símbolo R$).
 */
export function formatCurrencyInput(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/**
 * Aplica máscara BRL conforme o usuário digita.
 */
export function maskCurrencyInput(rawValue: string): string {
  return formatCurrencyInput(parseCurrencyInput(rawValue))
}
