# URL Shortener API (Back-end)

REST API responsible for creating short links, redirecting to original URLs, and exposing usage statistics.

This README covers only the back-end section.

## Stack

- Java 21
- Spring Boot 3.5
- Spring Web
- Spring Data JPA
- Spring Validation
- Spring Security (HTTP Basic for protected routes)
- Spring Data Redis
- PostgreSQL
- Flyway
- Maven Wrapper (`mvnw`)

## Features

- Create short URLs with configurable expiration
- Redirect by `shortCode`
- Count clicks on valid redirects
- List active URLs
- Scheduled cleanup of expired links (03:00 UTC)
- IP-based rate limiting on the create endpoint

## Main Structure

- `src/main/java/com/api/urlshortener/controller`: REST endpoints
- `src/main/java/com/api/urlshortener/service`: business rules and rate limiting
- `src/main/java/com/api/urlshortener/repository`: data access
- `src/main/java/com/api/urlshortener/config`: security, CORS, and interceptors
- `src/main/java/com/api/urlshortener/exception`: global error handling
- `src/main/java/com/api/urlshortener/scheduler`: scheduled jobs
- `src/main/resources/application.yaml`: application configuration
- `src/main/resources/db/migration`: Flyway migrations

## Configuration

Reference file: `src/main/resources/application.yaml`.

| Variable | Description | Default value |
|---|---|---|
| `SERVER_PORT` | API HTTP port | `8082` |
| `DB_URL` | PostgreSQL JDBC URL | `jdbc:postgresql://localhost:5432/url_shortener` |
| `DB_USERNAME` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `postgres` |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `API_BASIC_USERNAME` | User for protected routes | no default |
| `API_BASIC_PASSWORD` | Password for protected routes | no default |
| `APP_BASE_URL` | Base URL used to build `shortUrl` in responses | `http://localhost:8082` |
| `APP_CORS_ALLOWED_ORIGINS` | Allowed CORS origins | `http://localhost:5173` |
| `APP_CREATE_URL_RATE_LIMIT_MAX_REQUESTS` | Limit per IP | `20` |
| `APP_CREATE_URL_RATE_LIMIT_WINDOW_SECONDS` | Time window in seconds | `60` |
| `APP_CREATE_URL_RATE_LIMIT_FAIL_OPEN` | If Redis fails, allows (`true`) or blocks (`false`) requests | `false` |

## How to Run Locally

1. Start PostgreSQL and Redis (recommended via Docker Compose at project root):

```powershell
Set-Location ..\..
docker compose up -d db redis
```

2. Go back to the back-end folder and set basic credentials:

```powershell
Set-Location .\back-end\url-shortener
$env:API_BASIC_USERNAME = "devuser"
$env:API_BASIC_PASSWORD = "devpass123"
```

3. Start the application:

```powershell
.\mvnw.cmd spring-boot:run
```

4. API available at `http://localhost:8082`.

## Useful Commands

```powershell
.\mvnw.cmd test
.\mvnw.cmd clean package
```

## Endpoints

| Method | Route | Access | Description |
|---|---|---|---|
| `POST` | `/api/urls` | Public + rate limit | Creates short URL |
| `GET` | `/api/urls` | Private (HTTP Basic) | Lists active URLs (foundation for future admin section) |
| `GET` | `/{shortCode}` | Public | Redirects to original URL |

Note: `GET /api/urls` and additional routes under `/api/urls/**` require HTTP Basic.

## Create Example

Request:

```json
{
  "originalUrl": "https://www.example.com/page",
  "expirationDays": 10
}
```

Response (`201 Created`):

```json
{
  "shortUrl": "http://localhost:8082/AbC123",
  "originalUrl": "https://www.example.com/page",
  "expiresAt": "28/03/2026 10:30",
  "shortCode": "AbC123",
  "clickCount": 0,
  "createdAt": "18/03/2026 10:30",
  "daysUntilExpiry": 10
}
```

## Important Validations

- `originalUrl` is required, with max length of 2048 characters, and must match `http://` or `https://`
- `expirationDays` is optional, but when provided it must be between 1 and 30
- `owner_user_id` and `ownerUserId` fields are rejected in input payloads

## cURL Example

```bash
curl -X POST http://localhost:8082/api/urls \
  -H "Content-Type: application/json" \
  -d '{"originalUrl":"https://www.example.com","expirationDays":7}'
```

## Error Pattern

Base format:

```json
{
  "timestamp": "2026-03-22T14:30:00",
  "status": 400,
  "message": "Validation failed"
}
```

For validation errors (`400`), the payload also includes an `errors` array with `field` and `message`.

Common statuses:

- `400` validation
- `404` shortCode not found
- `410` URL expired
- `429` rate limit exceeded
- `500` internal error

## Rate Limit (`POST /api/urls`)

- IP-based key in Redis
- Default limit: `20` requests per `60` seconds
- With `APP_CREATE_URL_RATE_LIMIT_FAIL_OPEN=true`, Redis failures do not block URL creation

## Docker

To start only the back-end service in Compose (from project root):

```bash
docker compose up --build backend
```

## Relation to the Main Project

General documentation: [../../README.en.md](../../README.en.md).
