# Backend

The backend is a Go REST API for the Job Application Tracker.

## Responsibilities

The backend handles:

- Authentication and authorization
- Users
- Jobs
- Applications
- Notes
- Interviews
- Attachments
- Dashboard data
- Background jobs
- Rate limiting
- Caching
- Health checks
- Metrics
- Structured logging
- Distributed tracing

## Tech Stack

- Go
- PostgreSQL
- pgx/pgxpool
- Redis
- Asynq
- JWT
- bcrypt or Argon2
- slog
- Prometheus
- OpenTelemetry

## Architecture

```text
HTTP Request
     ↓
Router
     ↓
Middleware
     ↓
Handler
     ↓
Service
     ↓
Repository
     ↓
PostgreSQL
```

Infrastructure dependencies are accessed through dedicated packages:

```text
Service
 ├── PostgreSQL
 ├── Redis
 ├── Queue
 └── Object Storage
```

## Project Structure

```text
server/
├── cmd/
│   ├── api/
│   │   └── main.go
│   └── worker/
│       └── main.go
├── internal/
│   ├── auth/
│   ├── user/
│   ├── job/
│   ├── application/
│   ├── note/
│   ├── interview/
│   ├── attachment/
│   ├── dashboard/
│   ├── middleware/
│   ├── database/
│   ├── redis/
│   ├── queue/
│   ├── storage/
│   └── observability/
├── migrations/
├── config/
├── Dockerfile
├── go.mod
└── go.sum
```

## API and Worker

The API and worker are separate processes:

```text
API
 ↓
Redis Queue
 ↓
Worker
 ↓
External service / database / storage
```

The API should not perform long-running asynchronous work inside an HTTP request.

## Configuration

Typical environment variables:

```env
APP_ENV=development
PORT=8080

DATABASE_URL=postgres://...
REDIS_URL=redis://...

JWT_SECRET=...

S3_ENDPOINT=...
S3_BUCKET=...
S3_ACCESS_KEY=...
S3_SECRET_KEY=...
```

Secrets should not be committed to Git.

## Development

Run the API:

```bash
go run ./cmd/api
```

Run the worker:

```bash
go run ./cmd/worker
```

Run tests:

```bash
go test ./...
```

Format code:

```bash
gofmt -w .
```

## Backend Design Rules

1. Handlers should remain thin.
2. Business logic belongs in services.
3. Database access belongs in repositories.
4. PostgreSQL is the source of truth.
5. Redis is not the primary database.
6. Long-running work belongs in the worker.
7. Every authenticated resource must perform ownership/authorization checks.
8. Graceful shutdown must close database, Redis, and other resources.
9. Errors should be logged with useful structured context.
10. Avoid introducing abstractions until they solve a real problem.

## API Contract

The API specification is maintained centrally:

`../docs/04-api-specification.md`

The API contract is the boundary between the frontend and backend.
