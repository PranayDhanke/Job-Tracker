# 02 — System Architecture

## 1. Architecture Style

The initial architecture is a **modular monolith with a separate worker**.

This means:

- One Go API application
- One worker process
- One PostgreSQL database
- One Redis instance
- One object-storage system
- One frontend

We are intentionally not starting with microservices.

## 2. High-Level Architecture

```text
                    ┌───────────────┐
                    │    Browser    │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │     Nginx     │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    Go API     │
                    └───┬────┬────┬─┘
                        │    │    │
              ┌─────────┘    │    └──────────┐
              ▼              ▼               ▼
       ┌────────────┐ ┌────────────┐ ┌──────────────┐
       │ PostgreSQL │ │   Redis    │ │ Object Store │
       └────────────┘ └─────┬──────┘ └──────────────┘
                            │
                            ▼
                     ┌────────────┐
                     │   Worker   │
                     └────────────┘
```

## 3. Frontend

The frontend is a separate Next.js application.

It is responsible for:

- UI
- Routing
- Form handling
- Client-side state
- API requests
- User-facing validation

It does not own backend business rules.

## 4. Backend

The Go API follows:

```text
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
Database
```

### Router

Maps HTTP routes to handlers.

### Middleware

Examples:

- Authentication
- Request ID
- Logging
- CORS
- Rate limiting
- Recovery

### Handler

Responsible for:

- Reading HTTP input
- Validation
- Calling service
- Returning HTTP response

### Service

Contains business rules.

### Repository

Contains database access.

## 5. PostgreSQL

PostgreSQL is the source of truth for application data.

Do not use Redis as the primary database.

## 6. Redis

Redis supports:

- Caching
- Rate limiting
- Background queue infrastructure

A Redis outage should not silently turn successful writes into inconsistent database state.

## 7. Worker

The worker processes asynchronous jobs.

Example:

```text
HTTP Request
     ↓
API
     ↓
Create queue task
     ↓
Redis
     ↓
Worker
     ↓
Process task
```

Long-running work should not block an HTTP request.

## 8. Object Storage

Files are stored in S3-compatible object storage.

PostgreSQL stores metadata:

```text
attachment
├── id
├── application_id
├── filename
├── content_type
├── size_bytes
└── storage_key
```

The actual file bytes live in object storage.

## 9. Authentication

```text
Register
  ↓
Hash password
  ↓
Store hash
```

Login:

```text
Email + Password
       ↓
Find user
       ↓
Compare password hash
       ↓
Create JWT
       ↓
Return token
```

Protected requests:

```text
Request
  ↓
JWT middleware
  ↓
Validate token
  ↓
Extract user ID
  ↓
Handler
```

## 10. Authorization

Authentication answers:

> Who are you?

Authorization answers:

> Are you allowed to access this resource?

Every resource owned by a user must perform an ownership check.

## 11. Health Checks

### Liveness

Answers:

> Is the process alive?

### Readiness

Answers:

> Can this instance serve traffic?

Readiness may verify required dependencies such as PostgreSQL.

## 12. Graceful Shutdown

Shutdown flow:

```text
SIGTERM
  ↓
Stop accepting new requests
  ↓
Wait for active requests
  ↓
Stop worker
  ↓
Close Redis
  ↓
Close PostgreSQL pool
  ↓
Exit
```

## 13. Scalability

The API is stateless.

Therefore:

```text
             ┌── API 1
Nginx ───────┼── API 2
             └── API 3
```

All instances share PostgreSQL, Redis, and object storage.

## 14. Failure Handling

Examples:

### PostgreSQL unavailable

- API should report readiness failure.
- Requests requiring the database should fail cleanly.
- No fake success response.

### Redis unavailable

- Cached reads may fall back to PostgreSQL where appropriate.
- Rate limiting strategy should fail safely.
- Database remains authoritative.

### Worker unavailable

- Tasks remain queued until a worker returns.
- Failed tasks should support retries.

### Object storage unavailable

- File upload should fail cleanly.
- Database should not claim a file exists if the upload failed.

## 15. Architecture Principle

Use the simplest architecture that satisfies the current requirement.

Do not introduce:

- Microservices
- Kafka
- Service mesh
- Multiple databases
- Complex event buses

unless the project develops a real requirement for them.
