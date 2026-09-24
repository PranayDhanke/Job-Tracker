# 06 — Deployment Architecture

## 1. Local Development

The local environment can use Docker Compose.

```text
Browser
   ↓
Client
   ↓
Nginx
   ↓
Go API
   ├── PostgreSQL
   ├── Redis
   └── Object Storage


Redis
   ↓
Worker

Prometheus
   ↓
Grafana
```

## 2. Docker Compose Services

Initial services:

```text
client
api
worker
postgres
redis
nginx
prometheus
grafana
```

Do not add every service on day one. Introduce them as the project requires them.

## 3. Kubernetes Architecture

```text
                    Internet
                       │
                       ▼
                  Ingress
                       │
                       ▼
                API Service
                       │
             ┌─────────┼─────────┐
             ▼         ▼         ▼
           API Pod   API Pod   API Pod
             │         │         │
             └────┬────┴────┬────┘
                  │         │
                  ▼         ▼
             PostgreSQL    Redis
                              │
                              ▼
                           Worker
```

Object storage remains an external managed service in a production deployment.

## 4. Kubernetes Objects

The initial deployment may contain:

```text
Deployment
Service
Ingress
ConfigMap
Secret
HorizontalPodAutoscaler
```

## 5. ConfigMap vs Secret

### ConfigMap

Non-sensitive configuration:

```text
APP_ENV
PORT
LOG_LEVEL
```

### Secret

Sensitive values:

```text
DATABASE_URL
JWT_SECRET
S3_ACCESS_KEY
S3_SECRET_KEY
```

Secrets must not be committed to Git.

## 6. Health Probes

### Liveness Probe

Checks whether the process is alive.

```text
/health/live
```

### Readiness Probe

Checks whether the instance can serve traffic.

```text
/health/ready
```

## 7. Resource Requests and Limits

API and worker containers should eventually define:

```yaml
resources:
  requests:
    cpu: ...
    memory: ...
  limits:
    cpu: ...
    memory: ...
```

Start with realistic values and adjust using measurements.

## 8. Horizontal Scaling

The API is stateless.

Therefore Kubernetes can scale:

```text
1 API pod
   ↓
2 API pods
   ↓
3 API pods
```

Redis, PostgreSQL, and object storage remain shared infrastructure.

## 9. Rolling Deployment

A deployment should replace old pods gradually.

```text
Old API ──┐
          ├── traffic
New API ──┘
```

Readiness probes prevent traffic from reaching an unready pod.

## 10. CI/CD

A basic pipeline:

```text
Git Push
   ↓
GitHub Actions
   ↓
Run tests
   ↓
Lint
   ↓
Build
   ↓
Build Docker image
   ↓
Push image
   ↓
Deploy
```

## 11. Database Migrations

Migrations should run in a controlled deployment step.

Do not let every API pod independently attempt arbitrary schema changes.

## 12. Backups

Production PostgreSQL requires:

- Automated backups
- Retention policy
- Restore testing

A backup that has never been restored is not a verified recovery strategy.

## 13. Monitoring

Prometheus collects metrics.

Grafana visualizes metrics.

Useful metrics include:

```text
HTTP request count
HTTP error count
HTTP latency
Database connection usage
Redis latency
Worker queue depth
Job failure count
CPU
Memory
```

## 14. Logging

Application logs should be structured.

Example fields:

```json
{
  "level": "INFO",
  "service": "api",
  "request_id": "abc123",
  "method": "POST",
  "path": "/api/v1/applications",
  "status": 201,
  "duration_ms": 42
}
```

## 15. Tracing

OpenTelemetry can trace:

```text
HTTP request
   ↓
Handler
   ↓
Service
   ↓
PostgreSQL
```

This becomes useful when diagnosing latency across multiple components.

## 16. Production Traffic Flow

```text
User
 ↓
DNS
 ↓
Load Balancer
 ↓
Ingress / Nginx
 ↓
API Service
 ↓
API Pod
 ├── PostgreSQL
 ├── Redis
 └── Object Storage

Redis
 ↓
Worker
```

## 17. Deployment Principle

The deployment architecture should evolve with the application.

Start:

```text
Docker Compose
```

Then:

```text
Kubernetes
```

Then introduce additional production concerns only when they are needed.

Avoid building a large Kubernetes platform before the application itself works.
