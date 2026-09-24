# Frontend

The frontend is the web client for the Job Application Tracker.

## Responsibilities

The frontend handles:

- Authentication UI
- Dashboard
- Job management
- Application management
- Notes
- Interviews
- Attachments
- Filtering and pagination
- Loading/error states
- API communication
- User-facing validation

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

Additional libraries can be introduced only when they solve a real requirement.

## Project Structure

```text
client/
├── app/
├── components/
├── features/
├── hooks/
├── lib/
├── services/
├── types/
├── public/
├── package.json
└── README.md
```

### Responsibilities

```text
app/
    Routes and pages

components/
    Reusable UI components

features/
    Feature-specific UI and logic

services/
    API communication

hooks/
    Reusable React hooks

lib/
    Shared frontend utilities

types/
    Frontend TypeScript types
```

## API Communication

The frontend communicates with the Go backend through the versioned API:

```text
Client
  ↓
/api/v1
  ↓
Go API
```

Example development configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

## Authentication

The frontend stores and sends the authentication credential according to the backend authentication design.

Authenticated requests should include:

```http
Authorization: Bearer <token>
```

Do not put secrets in `NEXT_PUBLIC_*` variables.

## Development

Install dependencies:

```bash
npm install
```

Start development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Run production build:

```bash
npm run start
```

## Frontend Design Rules

1. Keep API calls inside the service layer.
2. Keep reusable UI inside components.
3. Keep feature-specific logic inside features.
4. Keep server contracts aligned with the API specification.
5. Handle loading, error, empty, and success states.
6. Do not duplicate backend business rules unnecessarily.
7. Do not create a shared package between Go and TypeScript just to avoid writing types twice.
8. Use the API specification as the source of truth for the client/server contract.

## API Contract

The backend API specification is maintained centrally:

`../docs/04-api-specification.md`
