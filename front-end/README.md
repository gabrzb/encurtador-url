# URL Shortener Web (Front-end)

Aplicação web do encurtador de URL, focada em uma experiência rápida para criar links curtos e copiar o resultado em poucos cliques.

Este README cobre apenas a seção de front-end.

## Stack

- React 19
- Vite 7
- TypeScript
- Tailwind CSS 4
- i18next + react-i18next
- Motion e GSAP para animações
- Vitest e ESLint

## Funcionalidades

- Formulário para encurtar URL com validação no cliente
- Integração com o endpoint `POST /api/urls`
- Exibição e cópia do link gerado
- Tratamento de erro de rate limit (`429`) com mensagem amigável
- Interface responsiva para desktop e mobile
- Internacionalização (`pt-BR`, `en`, `es`)
- Troca de tema na interface

## Pré-requisitos

- Node.js 22+
- npm 10+

## Variáveis de ambiente

A aplicação utiliza variáveis `VITE_`.

| Variável | Descrição | Padrão |
|---|---|---|
| `VITE_API_BASE_URL` | URL base da API consumida pelo front-end | `http://localhost:8082` (modo desenvolvimento) |
| `VITE_DEFAULT_EXPIRATION_DAYS` | Valor padrão de expiração enviado no formulário | `30` |

Observação: o valor de `VITE_DEFAULT_EXPIRATION_DAYS` é normalizado para um inteiro entre `1` e `30`.

## Como executar localmente

1. Instale dependências:

```powershell
npm install
```

2. Inicie o servidor de desenvolvimento:

```powershell
npm run dev
```

3. Acesse: `http://localhost:5173`.

## Scripts

```bash
npm run dev          # desenvolvimento
npm run build        # build de produção
npm run preview      # preview da build
npm run test         # testes (vitest run)
npm run test:watch   # testes em watch
npm run lint         # análise de lint
```

## Integração com back-end

Requisição principal:

- `POST /api/urls`

Payload enviado:

```json
{
  "originalUrl": "https://www.exemplo.com",
  "expirationDays": 30
}
```

Comportamentos de erro mais comuns:

- `400`: erro de validação
- `429`: muitas requisições para o mesmo IP
- outros status: erro genérico de API

## Docker

### Via compose (recomendado)

Na raiz do projeto, execute:

```bash
docker compose up --build frontend
```

### Build e execução isolada

Execute na pasta `front-end`:

```bash
docker build -t encurtador-url-frontend \
  --build-arg VITE_API_BASE_URL=http://localhost:8082 \
  --build-arg VITE_DEFAULT_EXPIRATION_DAYS=30 \
  .

docker run --rm -p 8080:8080 encurtador-url-frontend
```

## Estrutura principal

```text
src/
|- components/      # componentes de UI, seções e compartilhados
|- hooks/           # hooks de estado, tema, i18n e formulário
|- services/        # acesso aos endpoints
|- lib/             # utilitários HTTP e helpers
|- content/         # textos e recursos de internacionalização
|- types/           # tipagens da aplicação
```

## Relação com o projeto principal

Documentação geral: [../README.md](../README.md).
