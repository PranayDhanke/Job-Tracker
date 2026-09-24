# 05 — Sequence Diagrams

## 1. Registration

```mermaid
sequenceDiagram
    participant C as Client
    participant A as Go API
    participant S as Auth Service
    participant DB as PostgreSQL

    C->>A: POST /auth/register
    A->>S: Register user
    S->>S: Validate input
    S->>S: Hash password
    S->>DB: Insert user
    DB-->>S: User created
    S-->>A: User
    A-->>C: 201 Created
```

## 2. Login

```mermaid
sequenceDiagram
    participant C as Client
    participant A as Go API
    participant S as Auth Service
    participant DB as PostgreSQL

    C->>A: POST /auth/login
    A->>S: Login
    S->>DB: Find user
    DB-->>S: User + password hash
    S->>S: Verify password
    S->>S: Create JWT
    S-->>A: Token
    A-->>C: 200 + JWT
```

## 3. Authenticated Request

```mermaid
sequenceDiagram
    participant C as Client
    participant M as Auth Middleware
    participant H as Handler
    participant S as Service
    participant R as Repository
    participant DB as PostgreSQL

    C->>M: Request + JWT
    M->>M: Validate JWT
    M->>H: Request + user ID
    H->>S: Business operation
    S->>R: Query
    R->>DB: SQL
    DB-->>R: Result
    R-->>S: Data
    S-->>H: Data
    H-->>C: Response
```

## 4. Create Application

```mermaid
sequenceDiagram
    participant C as Client
    participant A as API
    participant S as Application Service
    participant DB as PostgreSQL
    participant Q as Redis Queue

    C->>A: POST /applications
    A->>S: Create application
    S->>DB: Insert application
    DB-->>S: Created
    S->>Q: Enqueue optional async task
    S-->>A: Application
    A-->>C: 201 Created
```

## 5. Background Job

```mermaid
sequenceDiagram
    participant A as API
    participant Q as Redis
    participant W as Worker
    participant DB as PostgreSQL

    A->>Q: Enqueue task
    Q-->>A: Task accepted
    W->>Q: Fetch task
    Q-->>W: Task
    W->>DB: Process task
    DB-->>W: Result
    W->>Q: Mark task complete
```

## 6. Failed Job

```mermaid
sequenceDiagram
    participant W as Worker
    participant Q as Queue

    W->>Q: Fetch task
    Q-->>W: Task
    W->>W: Process
    W-->>W: Error
    W->>Q: Retry
    Q-->>W: Retry task
    W-->>W: Error again
    W->>Q: Move to failed/dead-letter state
```

## 7. Cache Read

```mermaid
sequenceDiagram
    participant A as API
    participant R as Redis
    participant DB as PostgreSQL

    A->>R: GET cache key
    alt Cache hit
        R-->>A: Cached data
    else Cache miss
        R-->>A: Miss
        A->>DB: Query
        DB-->>A: Data
        A->>R: SET cache
    end
```

## 8. Cache Invalidation

```mermaid
sequenceDiagram
    participant A as API
    participant DB as PostgreSQL
    participant R as Redis

    A->>DB: Update resource
    DB-->>A: Success
    A->>R: Delete related cache key
    R-->>A: Deleted
    A-->>A: Return updated data
```

## 9. File Upload

```mermaid
sequenceDiagram
    participant C as Client
    participant A as API
    participant S as Object Storage
    participant DB as PostgreSQL

    C->>A: Upload request
    A->>S: Upload file
    S-->>A: storage_key
    A->>DB: Store attachment metadata
    DB-->>A: Created
    A-->>C: Attachment
```

## 10. Rate Limiting

```mermaid
sequenceDiagram
    participant C as Client
    participant A as API
    participant R as Redis

    C->>A: Request
    A->>R: Increment rate-limit key
    R-->>A: Current count
    alt Within limit
        A-->>C: Continue request
    else Limit exceeded
        A-->>C: 429 Too Many Requests
    end
```

## 11. Readiness

```mermaid
sequenceDiagram
    participant K as Kubernetes
    participant A as API
    participant DB as PostgreSQL

    K->>A: GET /health/ready
    A->>DB: Ping
    DB-->>A: Healthy
    A-->>K: 200 Ready
```

## 12. Graceful Shutdown

```mermaid
sequenceDiagram
    participant OS as OS
    participant A as API
    participant W as Worker
    participant DB as PostgreSQL
    participant R as Redis

    OS->>A: SIGTERM
    A->>A: Stop accepting new work
    A->>A: Wait for active requests
    A->>W: Stop worker
    A->>R: Close connection
    A->>DB: Close pool
    A->>OS: Exit
```
