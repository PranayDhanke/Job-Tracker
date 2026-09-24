# Job Application Tracker

A production-oriented full-stack job application tracking system built to practice real backend engineering, distributed systems basics, observability, containerization, CI/CD, and Kubernetes.

## Project Goals

- Build a realistic full-stack application.
- Practice production backend architecture with Go.
- Use PostgreSQL as the source of truth.
- Use Redis for caching, rate limiting, and background-job coordination.
- Use a separate worker for asynchronous processing.
- Add structured logging, metrics, and distributed tracing.
- Containerize the application and deploy it with Kubernetes.
- Keep the architecture understandable rather than prematurely complex.

## Architecture

```text
                         ┌─────────────────┐
                         │     Browser     │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │      Nginx      │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │     Go API      │
                         └───┬────┬────┬───┘
                             │    │    │
                 ┌───────────┘    │    └──────────────┐
                 ▼                ▼                   ▼
          ┌────────────┐   ┌────────────┐     ┌──────────────┐
          │ PostgreSQL │   │   Redis    │     │ Object Store │
          └────────────┘   └─────┬──────┘     └──────────────┘
                                 │
                                 ▼
                          ┌────────────┐
                          │   Worker   │
                          └────────────┘
```

The API remains stateless so multiple API instances can run behind Nginx or a Kubernetes Service.

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend
- Go
- net/http or a lightweight HTTP router
- pgx/pgxpool
- PostgreSQL
- Redis
- Asynq
- JWT
- bcrypt/Argon2
- slog

### Infrastructure
- Docker
- Docker Compose
- Nginx
- Kubernetes
- GitHub Actions

### Observability
- Prometheus
- Grafana
- OpenTelemetry

### Storage
- S3-compatible object storage

## Repository Structure

```text
job-application-tracker/
├── client/
│   └── README.md
├── server/
│   └── README.md
├── docs/
│   ├── 01-requirements.md
│   ├── 02-system-architecture.md
│   ├── 03-database-design.md
│   ├── 04-api-specification.md
│   ├── 05-sequence-diagrams.md
│   ├── 06-deployment-architecture.md
│   └── database.dbml
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Documentation

Read the documents in this order:

1. [Requirements](docs/01-requirements.md)
2. [System Architecture](docs/02-system-architecture.md)
3. [Database Design](docs/03-database-design.md)
4. [API Specification](docs/04-api-specification.md)
5. [Sequence Diagrams](docs/05-sequence-diagrams.md)
6. [Deployment Architecture](docs/06-deployment-architecture.md)

## Running Locally

The final local environment will contain:

```text
Client → Nginx → Go API → PostgreSQL
                    │
                    ├── Redis
                    │     └── Worker
                    │
                    └── Object Storage
```

Each component should be runnable independently during development.

## Engineering Principle

Build incrementally.

Start with:

```text
Go API
  ↓
PostgreSQL
  ↓
Authentication
  ↓
Jobs + Applications
```

Then introduce Redis, workers, storage, observability, Docker, CI/CD, and Kubernetes one step at a time.

The goal is to understand why each component exists, not to add infrastructure for its own sake.
