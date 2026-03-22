# Encurtador de URL

Projeto full stack para encurtamento de links, com expiração, redirecionamento, estatísticas de cliques e limitação de requisições por IP.

## Visão geral

- Front-end em React + Vite + TypeScript
- Back-end em Spring Boot + Java 21
- Persistência em PostgreSQL
- Rate limit em Redis
- Orquestração com Docker Compose

## Estrutura

```text
encurtador-url/
|- back-end/
|  |- url-shortener/
|- front-end/
|- .env.example
|- docker-compose.yml
```

## Funcionalidades

- Criação de URL encurtada com expiração de 1 a 30 dias
- Redirecionamento via `/{shortCode}`
- Listagem de links ativos com contagem de cliques
- Rate limit no endpoint de criação (`POST /api/urls`)
- Interface responsiva com suporte a múltiplos idiomas (pt-BR, en, es)

## Stack

### Front-end

- React 19
- Vite 7
- TypeScript
- Tailwind CSS 4
- i18next + react-i18next
- Vitest + ESLint

### Back-end

- Java 21
- Spring Boot 3.5
- Spring Web / Data JPA / Validation / Security
- Flyway
- PostgreSQL
- Redis

## Pré-requisitos

Para subir tudo com Docker:

- Docker Desktop + Docker Compose

Para desenvolvimento local sem Docker:

- Node.js 22+
- npm 10+
- Java 21
- PostgreSQL 16+
- Redis 7+

## Setup rápido (Docker)

1. Na raiz do projeto, copie o arquivo de ambiente:

```powershell
Copy-Item .env.example .env
```

No Linux/macOS, use:

```bash
cp .env.example .env
```

2. Suba os serviços:

```bash
docker compose up --build
```

3. Acesse:

- Front-end: `http://localhost:5173`
- Back-end API: `http://localhost:8082`
- Redirecionador: `http://localhost:8082/{shortCode}`

4. Para encerrar:

```bash
docker compose down
```

Para remover também o volume do banco:

```bash
docker compose down -v
```

## Desenvolvimento local

### 1) Back-end

```powershell
Set-Location .\back-end\url-shortener
.\mvnw.cmd spring-boot:run
```

### 2) Front-end

```powershell
Set-Location .\front-end
npm install
npm run dev
```

## Variáveis de ambiente (raiz)

Arquivo base: `.env.example`.

| Variável | Descrição | Valor padrão |
|---|---|---|
| `FRONTEND_PORT` | Porta publicada do container do front-end | `5173` |
| `BACKEND_PORT` | Porta publicada do container do back-end | `8082` |
| `SERVER_PORT` | Porta interna do Spring Boot | `8082` |
| `DB_NAME` | Nome do banco PostgreSQL | `url_shortener` |
| `DB_USERNAME` | Usuário do banco | `postgres` |
| `DB_PASSWORD` | Senha do banco | `postgres` |
| `REDIS_HOST` | Host do Redis | `redis` |
| `REDIS_PORT` | Porta do Redis | `6379` |
| `API_BASIC_USERNAME` | Usuário para rotas protegidas por Basic Auth | `devuser` |
| `API_BASIC_PASSWORD` | Senha para rotas protegidas por Basic Auth | `devpass123` |
| `APP_BASE_URL` | Base usada para montar `shortUrl` retornada pela API | `http://localhost:8082` |
| `APP_CORS_ALLOWED_ORIGINS` | Origens permitidas no CORS | `http://localhost:5173` |
| `APP_CREATE_URL_RATE_LIMIT_MAX_REQUESTS` | Limite de criações por janela por IP | `20` |
| `APP_CREATE_URL_RATE_LIMIT_WINDOW_SECONDS` | Janela (segundos) do rate limit | `60` |
| `APP_CREATE_URL_RATE_LIMIT_FAIL_OPEN` | Permite requisição se Redis cair (`true`) | `true` |
| `VITE_API_BASE_URL` | URL base consumida pelo front-end | `http://localhost:8082` |
| `VITE_DEFAULT_EXPIRATION_DAYS` | Expiração padrão no formulário | `30` |

## Endpoints principais

- `POST /api/urls` cria URL encurtada (público, com rate limit por IP)
- `GET /api/urls` lista URLs ativas
- `GET /{shortCode}` redireciona para URL original

## Documentação por seção

- Front-end: [front-end/README.md](front-end/README.md)
- Back-end: [back-end/url-shortener/README.md](back-end/url-shortener/README.md)
