# 04 — API Specification

## 1. Base URL

```text
/api/v1
```

## 2. Authentication

Protected endpoints use:

```http
Authorization: Bearer <JWT>
```

## 3. Standard Response

Success responses return resource data.

Errors follow a consistent shape:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": {}
  }
}
```

## 4. Authentication

### Register

```http
POST /api/v1/auth/register
```

Request:

```json
{
  "name": "Pranay",
  "email": "user@example.com",
  "password": "password"
}
```

### Login

```http
POST /api/v1/auth/login
```

### Current User

```http
GET /api/v1/auth/me
```

Requires authentication.

## 5. Jobs

```text
POST   /api/v1/jobs
GET    /api/v1/jobs
GET    /api/v1/jobs/:id
PATCH  /api/v1/jobs/:id
DELETE /api/v1/jobs/:id
```

Possible query parameters:

```text
?page=1
&limit=20
&search=backend
&company=Example
&location=Pune
```

## 6. Applications

```text
POST   /api/v1/applications
GET    /api/v1/applications
GET    /api/v1/applications/:id
PATCH  /api/v1/applications/:id
DELETE /api/v1/applications/:id
PATCH  /api/v1/applications/:id/status
```

Status values:

```text
SAVED
APPLIED
SCREENING
INTERVIEW
OFFER
REJECTED
WITHDRAWN
```

## 7. Notes

```text
POST   /api/v1/applications/:id/notes
GET    /api/v1/applications/:id/notes
PATCH  /api/v1/notes/:id
DELETE /api/v1/notes/:id
```

## 8. Interviews

```text
POST   /api/v1/applications/:id/interviews
GET    /api/v1/interviews
GET    /api/v1/interviews/:id
PATCH  /api/v1/interviews/:id
DELETE /api/v1/interviews/:id
```

## 9. Attachments

```text
POST   /api/v1/applications/:id/attachments
GET    /api/v1/applications/:id/attachments
DELETE /api/v1/attachments/:id
```

For large files, prefer direct object-storage upload flows where appropriate.

## 10. Dashboard

```http
GET /api/v1/dashboard
```

Example response:

```json
{
  "total_jobs": 100,
  "total_applications": 45,
  "applications_by_status": {
    "APPLIED": 20,
    "SCREENING": 8,
    "INTERVIEW": 5,
    "OFFER": 1,
    "REJECTED": 11
  },
  "upcoming_interviews": 2
}
```

## 11. Health

### Liveness

```http
GET /health/live
```

### Readiness

```http
GET /health/ready
```

## 12. Admin

Example administrative endpoints:

```text
GET /api/v1/admin/users
GET /api/v1/admin/stats
```

These require the admin role.

## 13. Status Codes

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

## 14. Pagination

Start with offset pagination:

```text
?page=1&limit=20
```

Response:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

Cursor pagination can be introduced later if the query patterns require it.

## 15. API Layer Flow

```text
HTTP
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

## 16. Authorization

A valid JWT does not automatically mean access is allowed.

For example:

```text
GET /applications/123

JWT → user_id = 10

Application 123 → user_id = 25

Result → 403/404 according to API policy
```

Ownership must be checked server-side.

## 17. Rate Limiting

Sensitive endpoints such as login and registration should be rate limited.

Redis can be used for distributed rate limiting when multiple API instances exist.

## 18. API Versioning

All application endpoints begin with:

```text
/api/v1
```

Breaking changes can be introduced later through:

```text
/api/v2
```
