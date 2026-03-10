# URL Shortener API (Back-end)

API REST para encurtamento de URLs com expiração, redirecionamento e contagem de cliques.

## Tecnologias

- Java 21
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Spring Security (HTTP Basic)
- PostgreSQL
- Flyway
- Maven Wrapper (`mvnw`)

## Funcionalidades

- Criar URL encurtada com prazo de expiração
- Redirecionar para a URL original a partir do `shortCode`
- Listar URLs ativas com estatísticas de acesso
- Limpeza agendada de URLs expiradas (diariamente)

## Estrutura principal

- `src/main/java/com/api/urlshortener/controller`: endpoints REST
- `src/main/java/com/api/urlshortener/service`: regras de negocio
- `src/main/java/com/api/urlshortener/repository`: acesso a dados
- `src/main/java/com/api/urlshortener/exception`: tratamento padrao de erros
- `src/main/java/com/api/urlshortener/scheduler`: tarefas agendadas
- `src/main/resources/application.yaml`: configuracao da aplicacao

## Configuracao

Arquivo: `src/main/resources/application.yaml`

Variaveis de ambiente suportadas:

- `SERVER_PORT` (padrao: `8082`)
- `DB_URL` (padrao: `jdbc:postgresql://localhost:5432/url_shortener`)
- `APP_BASE_URL` (padrao: `http://localhost:8082`)

Credenciais HTTP Basic (ambiente de desenvolvimento):

- usuario: `devuser`
- senha: `devpass123`

## Como executar

1. Acesse a pasta do projeto:

```powershell
Set-Location "C:\Users\gabri\Documents\TI\Projetos\encurtador-url\back-end\url-shortener"
```

2. Execute a aplicacao:

```powershell
.\mvnw.cmd spring-boot:run
```

3. Opcional: executar em outra porta:

```powershell
.\mvnw.cmd spring-boot:run -Dspring-boot.run.arguments="--server.port=8083"
```

## Endpoints

Regras de acesso:

- Publico (sem autenticacao): `GET /{shortCode}`, `GET /api/urls`
- Protegido com HTTP Basic: `POST /api/urls` e demais rotas

### 1) Criar URL encurtada

- Metodo: `POST`
- Rota: `/api/urls`

Exemplo de body:

```json
{
  "originalUrl": "https://www.exemplo.com/pagina",
  "expirationDays": 10
}
```

Resposta esperada: `201 Created`

### 2) Redirecionar URL

- Metodo: `GET`
- Rota: `/{shortCode}`

Resposta esperada: `302 Found` com header `Location` apontando para a URL original.

### 3) Listar URLs ativas

- Metodo: `GET`
- Rota: `/api/urls`

Resposta esperada: `200 OK`

## Exemplos com cURL

Criar URL:

```bash
curl -u devuser:devpass123 -X POST http://localhost:8082/api/urls \
  -H "Content-Type: application/json" \
  -d '{"originalUrl":"https://www.exemplo.com","expirationDays":7}'
```

Listar URLs ativas:

```bash
curl -u devuser:devpass123 http://localhost:8082/api/urls
```

Redirecionar:

```bash
curl -i -u devuser:devpass123 http://localhost:8082/ABC123
```

## Padrao de erros

A API retorna erros no formato:

```json
{
  "timestamp": "2026-03-10T12:00:00",
  "status": 400,
  "message": "campo: mensagem de validacao"
}
```

Codigos comuns:

- `400`: erro de validacao
- `404`: codigo encurtado nao encontrado
- `410`: URL expirada
- `500`: erro interno inesperado

## Observacoes

- O `shortCode` e gerado com caracteres alfanumericos (base62).
- A aplicacao evita colisao de codigo verificando existencia antes de persistir.
- A limpeza de expiradas roda diariamente as 03:00 (timezone do servidor).
