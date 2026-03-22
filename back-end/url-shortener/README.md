# URL Shortener API (Back-end)

API REST responsável por criar links curtos, redirecionar para a URL original e expor estatísticas de uso.

Este README cobre apenas a seção de back-end.

## Stack

- Java 21
- Spring Boot 3.5
- Spring Web
- Spring Data JPA
- Spring Validation
- Spring Security (HTTP Basic para rotas protegidas)
- Spring Data Redis
- PostgreSQL
- Flyway
- Maven Wrapper (`mvnw`)

## Funcionalidades

- Criação de URL encurtada com expiração configurável
- Redirecionamento por `shortCode`
- Contagem de cliques em redirecionamentos válidos
- Listagem de URLs ativas
- Limpeza agendada de links expirados (03:00 UTC)
- Rate limit por IP no endpoint de criação

## Estrutura principal

- `src/main/java/com/api/urlshortener/controller`: endpoints REST
- `src/main/java/com/api/urlshortener/service`: regras de negócio e rate limit
- `src/main/java/com/api/urlshortener/repository`: acesso a dados
- `src/main/java/com/api/urlshortener/config`: segurança, CORS e interceptadores
- `src/main/java/com/api/urlshortener/exception`: tratamento global de erros
- `src/main/java/com/api/urlshortener/scheduler`: tarefas agendadas
- `src/main/resources/application.yaml`: configurações da aplicação
- `src/main/resources/db/migration`: migrações Flyway

## Configuração

Arquivo de referência: `src/main/resources/application.yaml`.

| Variável | Descrição | Padrão |
|---|---|---|
| `SERVER_PORT` | Porta HTTP da API | `8082` |
| `DB_URL` | URL JDBC do PostgreSQL | `jdbc:postgresql://localhost:5432/url_shortener` |
| `DB_USERNAME` | Usuário do banco | `postgres` |
| `DB_PASSWORD` | Senha do banco | `postgres` |
| `REDIS_HOST` | Host do Redis | `localhost` |
| `REDIS_PORT` | Porta do Redis | `6379` |
| `API_BASIC_USERNAME` | Usuário para rotas protegidas | sem padrão |
| `API_BASIC_PASSWORD` | Senha para rotas protegidas | sem padrão |
| `APP_BASE_URL` | Base para montar `shortUrl` na resposta | `http://localhost:8082` |
| `APP_CORS_ALLOWED_ORIGINS` | Origens permitidas no CORS | `http://localhost:5173` |
| `APP_CREATE_URL_RATE_LIMIT_MAX_REQUESTS` | Limite por IP | `20` |
| `APP_CREATE_URL_RATE_LIMIT_WINDOW_SECONDS` | Janela em segundos | `60` |
| `APP_CREATE_URL_RATE_LIMIT_FAIL_OPEN` | Em falha do Redis, permite (`true`) ou bloqueia (`false`) | `false` |

## Como executar localmente

1. Suba PostgreSQL e Redis (recomendado via Docker Compose na raiz do projeto):

```powershell
Set-Location ..\..
docker compose up -d db redis
```

2. Volte para o back-end e configure as credenciais básicas para subir a API:

```powershell
Set-Location .\back-end\url-shortener
$env:API_BASIC_USERNAME = "devuser"
$env:API_BASIC_PASSWORD = "devpass123"
```

3. Inicie a aplicação:

```powershell
.\mvnw.cmd spring-boot:run
```

4. A API estará em execução em `http://localhost:8082`.

## Comandos úteis

```powershell
.\mvnw.cmd test
.\mvnw.cmd clean package
```

## Endpoints

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| `POST` | `/api/urls` | Público + rate limit | Cria URL curta |
| `GET` | `/api/urls` | Público | Lista URLs ativas |
| `GET` | `/{shortCode}` | Público | Redireciona para URL original |

Observação: rotas adicionais em `/api/urls/**` exigem HTTP Basic.

## Exemplo de criação

Requisição:

```json
{
  "originalUrl": "https://www.exemplo.com/pagina",
  "expirationDays": 10
}
```

Resposta (`201 Created`):

```json
{
  "shortUrl": "http://localhost:8082/AbC123",
  "originalUrl": "https://www.exemplo.com/pagina",
  "expiresAt": "28/03/2026 10:30",
  "shortCode": "AbC123",
  "clickCount": 0,
  "createdAt": "18/03/2026 10:30",
  "daysUntilExpiry": 10
}
```

## Validações importantes

- `originalUrl` obrigatória, máximo de 2048 caracteres e formato `http://` ou `https://`
- `expirationDays` opcional, quando enviado deve estar entre 1 e 30
- Campos `owner_user_id` e `ownerUserId` são rejeitados na entrada

## Exemplo com cURL

```bash
curl -X POST http://localhost:8082/api/urls \
  -H "Content-Type: application/json" \
  -d '{"originalUrl":"https://www.exemplo.com","expirationDays":7}'
```

## Padrão de erro

Formato base:

```json
{
  "timestamp": "2026-03-22T14:30:00",
  "status": 400,
  "message": "Validation failed"
}
```

Em erros de validação (`400`), o payload inclui também um array `errors`, com `field` e `message`.

Status comuns:

- `400` validação
- `404` shortCode não encontrado
- `410` URL expirada
- `429` rate limit excedido
- `500` erro interno

## Rate limit (POST /api/urls)

- Chave por IP no Redis
- Limite padrão: `20` requisições por `60` segundos
- Com `APP_CREATE_URL_RATE_LIMIT_FAIL_OPEN=true`, falhas no Redis não bloqueiam a criação

## Docker

Para subir apenas o back-end dentro do compose (na raiz do projeto):

```bash
docker compose up --build backend
```

## Relação com o projeto principal

Documentação geral: [../../README.md](../../README.md).
