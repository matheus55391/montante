/** Parâmetros de entrada para simulação de juros compostos com aporte mensal. */
export type CompoundInterestInput = {
  /** Valor investido no início da simulação. */
  initialValue: number
  /** Valor adicionado ao final de cada mês. */
  monthlyContribution: number
  /** Taxa de juros mensal em percentual (ex.: 1 representa 1% ao mês). */
  monthlyInterestRatePercent: number
  /** Duração da simulação em meses. */
  periodInMonths: number
}

/** Evolução patrimonial de um mês específico da simulação. */
export type MonthlyEvolutionEntry = {
  /** Mês da simulação (1 = primeiro mês). */
  month: number
  /** Aporte realizado no mês (não inclui o valor inicial). */
  contribution: number
  /** Juros gerados sobre o patrimônio no início do mês. */
  periodInterest: number
  /** Patrimônio acumulado ao final do mês. */
  accumulatedWealth: number
}

/** Resultado consolidado da simulação de juros compostos. */
export type CompoundInterestResult = {
  /** Patrimônio final ao término do período. */
  finalWealth: number
  /** Soma do valor inicial e de todos os aportes mensais. */
  totalInvested: number
  /** Diferença entre patrimônio final e total investido. */
  totalInterest: number
  /** Evolução mês a mês, pronta para tabelas e gráficos. */
  monthlyEvolution: MonthlyEvolutionEntry[]
}
