# 01 — Requirements

## 1. Overview

The Job Application Tracker is a full-stack application for managing the complete job-search lifecycle.

A user should be able to store job opportunities, create applications, track statuses, maintain notes, schedule interviews, upload related files, and view dashboard information.

The project is intentionally designed as a small production-style system rather than a large distributed platform.

## 2. Goals

- Practice production backend engineering.
- Build a real REST API with Go.
- Design a relational PostgreSQL schema.
- Use Redis for supporting infrastructure.
- Introduce asynchronous processing.
- Add observability.
- Containerize the application.
- Deploy the system using Kubernetes.
- Learn production concerns incrementally.

## 3. Users and Roles

### User

A normal user can:

- Register
- Login
- Manage jobs
- Manage applications
- Add notes
- Manage interviews
- Upload attachments
- View dashboard data

### Admin

An admin can additionally:

- View administrative statistics
- Manage users
- Inspect audit information

## 4. Functional Requirements

### Authentication

- Register
- Login
- Get current user
- Password hashing
- JWT authentication
- Role-based authorization

### Jobs

- Create job
- List jobs
- Get job
- Update job
- Delete job
- Search jobs
- Filter jobs
- Paginate results

### Applications

- Create application
- View applications
- Update application
- Change status
- Delete application

Statuses:

```text
SAVED
APPLIED
SCREENING
INTERVIEW
OFFER
REJECTED
WITHDRAWN
```

### Notes

- Create note
- List notes
- Update note
- Delete note

### Interviews

- Schedule interview
- List interviews
- Update interview
- Cancel interview

### Attachments

- Upload file
- List files
- Delete file
- Store metadata in PostgreSQL
- Store file content in object storage

### Dashboard

The dashboard should provide useful aggregates such as:

- Total jobs
- Total applications
- Applications by status
- Upcoming interviews
- Recent applications

## 5. Non-Functional Requirements

### Performance

The API should remain responsive for normal CRUD operations.

### Security

- Passwords must never be stored in plaintext.
- JWT secrets must remain outside source control.
- Authorization must be checked server-side.
- File uploads must be validated.
- Rate limiting should protect sensitive endpoints.

### Reliability

- Database failures must be handled gracefully.
- Redis failures should not corrupt primary data.
- Background jobs should support retries.
- Failed jobs should be observable.

### Observability

The system should provide:

- Structured logs
- Metrics
- Traces
- Health checks

### Scalability

The API should be stateless so multiple instances can run simultaneously.

## 6. API Requirements

Base path:

```text
/api/v1
```

Authentication:

```http
Authorization: Bearer <JWT>
```

Common response status codes:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
429 Too Many Requests
500 Internal Server Error
503 Service Unavailable
```

## 7. Database Requirements

PostgreSQL is the source of truth.

Requirements:

- UUID identifiers
- Foreign keys
- Appropriate indexes
- UTC timestamps
- Database migrations
- Transaction support where required
- Ownership relationships

## 8. Caching Requirements

Redis may be used for:

- Read caching
- Rate limiting
- Queue infrastructure

Cached data must not become the authoritative source of business data.

## 9. Background Jobs

Background jobs may handle:

- Reminder processing
- Email/notification delivery
- Cleanup
- Other tasks that do not need to block HTTP requests

## 10. Deployment Requirements

The project should support:

- Local development
- Docker Compose
- Kubernetes
- CI/CD
- Health probes
- Graceful shutdown
- Rolling deployments

## 11. Success Criteria

The project is successful when:

- The complete application can run locally.
- API and frontend communicate through documented endpoints.
- Data persists correctly in PostgreSQL.
- Redis is used for supporting concerns.
- Background jobs execute asynchronously.
- Logs, metrics, and traces are available.
- The application can be containerized.
- The application can be deployed to Kubernetes.
