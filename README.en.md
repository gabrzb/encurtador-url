# URL Shortener

Full-stack project for URL shortening, with expiration, redirection, click analytics, and IP-based request limiting.

## Overview

- Front-end with React + Vite + TypeScript
- Back-end with Spring Boot + Java 21
- PostgreSQL persistence
- Redis rate limiting
- Docker Compose orchestration

## Structure

```text
encurtador-url/
|- back-end/
|  |- url-shortener/
|- front-end/
|- .env.example
|- docker-compose.yml
```

## Features

- Create short URLs with 1 to 30-day expiration
- Redirection via `/{shortCode}`
- List active links with click counts
- Rate limiting on the create endpoint (`POST /api/urls`)
- Responsive UI with multilingual support (pt-BR, en, es)

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

## Prerequisites

To run everything with Docker:

- Docker Desktop + Docker Compose

For local development without Docker:

- Node.js 22+
- npm 10+
- Java 21
- PostgreSQL 16+
- Redis 7+

## Quick Setup (Docker)

1. At the project root, copy the environment file:

```powershell
Copy-Item .env.example .env
```

On Linux/macOS, use:

```bash
cp .env.example .env
```

2. Start services:

```bash
docker compose up --build
```

3. Access:

- Front-end: `http://localhost:5173`
- Back-end API: `http://localhost:8082`
- Redirect endpoint: `http://localhost:8082/{shortCode}`

4. Stop services:

```bash
docker compose down
```

To also remove the database volume:

```bash
docker compose down -v
```

## Local Development

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

## Environment Variables (root)

Base file: `.env.example`.

| Variable | Description | Default value |
|---|---|---|
| `FRONTEND_PORT` | Published port of the front-end container | `5173` |
| `BACKEND_PORT` | Published port of the back-end container | `8082` |
| `SERVER_PORT` | Internal Spring Boot port | `8082` |
| `DB_NAME` | PostgreSQL database name | `url_shortener` |
| `DB_USERNAME` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `postgres` |
| `REDIS_HOST` | Redis host | `redis` |
| `REDIS_PORT` | Redis port | `6379` |
| `API_BASIC_USERNAME` | User for Basic Auth protected routes | `devuser` |
| `API_BASIC_PASSWORD` | Password for Basic Auth protected routes | `devpass123` |
| `APP_BASE_URL` | Base URL used to build API `shortUrl` responses | `http://localhost:8082` |
| `APP_CORS_ALLOWED_ORIGINS` | Allowed CORS origins | `http://localhost:5173` |
| `APP_CREATE_URL_RATE_LIMIT_MAX_REQUESTS` | Create endpoint request limit per IP window | `20` |
| `APP_CREATE_URL_RATE_LIMIT_WINDOW_SECONDS` | Rate limit window (seconds) | `60` |
| `APP_CREATE_URL_RATE_LIMIT_FAIL_OPEN` | Allows requests if Redis is down (`true`) | `false` |
| `VITE_API_BASE_URL` | API base URL consumed by the front-end | `http://localhost:8082` |
| `VITE_DEFAULT_EXPIRATION_DAYS` | Default expiration used in the form | `30` |

## Main Endpoints

- `POST /api/urls` creates a short URL (public, with IP rate limiting)
- `GET /api/urls` lists active URLs (private with HTTP Basic, intended for a future admin section)
- `GET /{shortCode}` redirects to the original URL

## Documentation by Section

- Front-end: [front-end/README.en.md](front-end/README.en.md)
- Back-end: [back-end/url-shortener/README.en.md](back-end/url-shortener/README.en.md)
