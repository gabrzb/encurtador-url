# URL Shortener Web (Front-end)

Web application for the URL shortener, focused on a fast experience to create short links and copy results in just a few clicks.

This README covers only the front-end section.

## Stack

- React 19
- Vite 7
- TypeScript
- Tailwind CSS 4
- i18next + react-i18next
- Motion and GSAP for animations
- Vitest and ESLint

## Features

- Form to shorten URLs with client-side validation
- Integration with the `POST /api/urls` endpoint
- Display and copy of generated short links
- Friendly handling of rate-limit errors (`429`)
- Responsive interface for desktop and mobile
- Internationalization (`pt-BR`, `en`, `es`)
- Theme toggle in the UI

## Prerequisites

- Node.js 22+
- npm 10+

## Environment Variables

The application uses `VITE_` variables.

| Variable | Description | Default value |
|---|---|---|
| `VITE_API_BASE_URL` | API base URL consumed by the front-end | `http://localhost:8082` (development mode) |
| `VITE_DEFAULT_EXPIRATION_DAYS` | Default expiration sent by the form | `30` |

Note: `VITE_DEFAULT_EXPIRATION_DAYS` is normalized to an integer between `1` and `30`.

## How to Run Locally

1. Install dependencies:

```powershell
npm install
```

2. Start the development server:

```powershell
npm run dev
```

3. Access: `http://localhost:5173`.

## Scripts

```bash
npm run dev          # development
npm run build        # production build
npm run preview      # production preview
npm run test         # tests (vitest run)
npm run test:watch   # tests in watch mode
npm run lint         # lint analysis
```

## Back-end Integration

Main request:

- `POST /api/urls`

Payload sent:

```json
{
  "originalUrl": "https://www.example.com",
  "expirationDays": 30
}
```

Most common error behavior:

- `400`: validation error
- `429`: too many requests from the same IP
- other statuses: generic API error

## Docker

### Via Compose (recommended)

At the project root, run:

```bash
docker compose up --build frontend
```

### Isolated Build and Run

Run inside the `front-end` folder:

```bash
docker build -t encurtador-url-frontend \
  --build-arg VITE_API_BASE_URL=http://localhost:8082 \
  --build-arg VITE_DEFAULT_EXPIRATION_DAYS=30 \
  .

docker run --rm -p 8080:8080 encurtador-url-frontend
```

## Main Structure

```text
src/
|- components/      # UI, section, and shared components
|- hooks/           # state, theme, i18n, and form hooks
|- services/        # endpoint access layer
|- lib/             # HTTP utilities and helpers
|- content/         # i18n texts and resources
|- types/           # application types
```

## Relation to the Main Project

General documentation: [../README.en.md](../README.en.md).
