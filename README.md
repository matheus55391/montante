# Montante

Calculadora de juros compostos com aporte mensal. Simula patrimônio final, total investido, juros e evolução mês a mês.

## Stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4
- react-hook-form + Zod
- Recharts
- Vitest + Testing Library
- Bun (gerenciador de pacotes)

## Scripts

```bash
bun dev          # desenvolvimento
bun run build    # build de produção
bun run test     # testes (watch)
bun run test:run # testes (CI)
bun run lint     # eslint
```

## Estrutura

```
src/
├── components/calculator/   # UI da calculadora
├── components/ui/           # primitivos (input, button, select…)
├── schemas/                 # validação Zod (1 schema por arquivo + teste)
├── lib/
│   ├── compound-interest/   # lógica de cálculo (sem UI)
│   ├── calculator/          # conversão form → input da lib
│   ├── currency/            # formatBRL e máscaras monetárias
│   └── format/              # máscara percentual
└── __tests__/setup.ts       # setup global do Vitest
```

## Lógica de negócio

A simulação em `calculateCompoundInterest` aplica juros sobre o patrimônio acumulado e soma o aporte ao final de cada mês.

O formulário aceita taxa/período em unidade mensal ou anual. A conversão fica em `to-compound-interest-input.ts` (taxa anual → mensal equivalente composta).

## Formulário

Grid 2×2: valor inicial + taxa | período + investimento mensal. Campos monetários e percentuais com máscara pt-BR.

## Docker

```bash
cp .env.example .env
docker compose up --build -d   # http://localhost:8080
docker compose down
```

Publicar no Docker Hub:

```bash
docker login
export DOCKERHUB_USER=seuusuario
docker build -t $DOCKERHUB_USER/montante:latest .
docker push $DOCKERHUB_USER/montante:latest
```

Rodar a imagem publicada:

```bash
docker run --rm -p 8080:80 seuusuario/montante:latest
```
