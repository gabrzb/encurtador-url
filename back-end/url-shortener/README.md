# URL Shortener API (Back-end)

API REST para encurtamento de URLs com expiração, redirecionamento e contagem de cliques.

Este README documenta apenas a parte de back-end do projeto.

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
- Listar URLs ativas com estatísticas de acesso (incluindo contagem de cliques)
- Limpeza agendada de URLs expiradas (diariamente)

## Contagem de cliques e expansão do back-end

A contagem de cliques está implementada como uma funcionalidade base para a evolução do back-end.
No momento, a API cobre as funcionalidades essenciais do encurtador, e os cliques já registrados podem servir como base para possíveis próximas etapas, como:

- métricas mais detalhadas de uso;
- relatórios por período;
- ranking de links mais acessados;
- sistema de usuários para associação de links por conta, histórico individual e melhor integração com futuras implementações;
- integração com dashboards e monitoramento.

Dependendo da evolução do projeto, a autenticação também pode ser estendida para suportar perfis de usuário, com recursos como gestão de links por proprietário, permissões e personalização de funcionalidades.

## Estrutura principal

- `src/main/java/com/api/urlshortener/controller`: endpoints REST
- `src/main/java/com/api/urlshortener/service`: regras de negócio
- `src/main/java/com/api/urlshortener/repository`: acesso a dados
- `src/main/java/com/api/urlshortener/exception`: tratamento padrão de erros
- `src/main/java/com/api/urlshortener/scheduler`: tarefas agendadas
- `src/main/resources/application.yaml`: configuração da aplicação

## Configuração

Arquivo: `src/main/resources/application.yaml`

Variáveis de ambiente suportadas:

- `SERVER_PORT` (padrão: `8082`)
- `DB_URL` (padrão: `jdbc:postgresql://localhost:5432/url_shortener`)
- `APP_BASE_URL` (padrão: `http://localhost:8082`)

Credenciais HTTP Basic (ambiente de desenvolvimento):

- usuário: `devuser`
- senha: `devpass123`

## Como executar

1. Acesse a pasta do projeto:

```powershell
Set-Location "<project-path>/back-end/url-shortener"
```

2. Execute a aplicação:

```powershell
.\mvnw.cmd spring-boot:run
```

3. Opcional: execute em outra porta:

```powershell
.\mvnw.cmd spring-boot:run -Dspring-boot.run.arguments="--server.port=8083"
```

## Endpoints

Regras de acesso:

- Público (sem autenticação): `GET /{shortCode}`, `GET /api/urls`
- Protegido com HTTP Basic: `POST /api/urls` e demais rotas

### 1. Criar URL encurtada

- Método: `POST`
- Rota: `/api/urls`

Exemplo de corpo da requisição:

```json
{
  "originalUrl": "https://www.exemplo.com/pagina",
  "expirationDays": 10
}
```

Resposta esperada: `201 Created`

### 2. Redirecionar URL

- Método: `GET`
- Rota: `/{shortCode}`

Resposta esperada: `302 Found` com header `Location` apontando para a URL original.

### 3. Listar URLs ativas

- Método: `GET`
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
curl http://localhost:8082/api/urls
```

Redirecionar:

```bash
curl -i http://localhost:8082/ABC123
```

## Padrão de erros

A API retorna erros no formato:

```json
{
  "timestamp": "2026-03-10T12:00:00",
  "status": 400,
  "message": "campo: mensagem de validação"
}
```

Códigos comuns:

- `400`: erro de validação
- `404`: código encurtado não encontrado
- `410`: URL expirada
- `500`: erro interno inesperado

## Observações

- O `shortCode` é gerado com caracteres alfanuméricos (base62).
- A aplicação evita colisão de código verificando existência antes de persistir.
- A limpeza de expiradas roda diariamente às 03:00 (fuso horário do servidor).
