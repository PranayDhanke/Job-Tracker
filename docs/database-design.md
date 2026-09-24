# 03 — Database Design

## 1. Database Choice

PostgreSQL is the primary database.

Reasons:

- Strong relational model
- Transactions
- Foreign keys
- Constraints
- Indexing
- Mature tooling
- Good Go support through pgx

## 2. Core Tables

```text
users
jobs
applications
notes
interviews
attachments
audit_logs
```

## 3. users

Stores user accounts.

Important fields:

```text
id
name
email
password_hash
role
status
created_at
updated_at
```

Constraints:

- `id` is the primary key.
- `email` is unique.
- Password hash is stored, never the plaintext password.

## 4. jobs

Stores job opportunities.

Fields:

```text
id
user_id
company
title
location
job_url
description
employment_type
salary_min
salary_max
source
created_at
updated_at
```

Indexes:

```text
user_id
company
created_at
```

## 5. applications

Connects a user to a job.

Fields:

```text
id
user_id
job_id
status
applied_at
created_at
updated_at
```

Initial constraint:

```text
UNIQUE(user_id, job_id)
```

This prevents duplicate applications for the same job by the same user.

## 6. notes

Stores notes associated with an application.

```text
id
application_id
user_id
content
created_at
updated_at
```

## 7. interviews

Stores scheduled interviews.

```text
id
application_id
user_id
interview_type
scheduled_at
duration_minutes
meeting_url
notes
status
created_at
updated_at
```

## 8. attachments

Stores file metadata.

```text
id
application_id
user_id
filename
storage_key
content_type
size_bytes
created_at
```

Actual file content is stored outside PostgreSQL.

## 9. audit_logs

Stores important security and administrative events.

```text
id
user_id
action
resource_type
resource_id
ip_address
user_agent
metadata
created_at
```

## 10. Relationships

```text
users
  │
  ├── jobs
  │
  ├── applications
  │      ├── notes
  │      ├── interviews
  │      └── attachments
  │
  └── audit_logs
```

## 11. Timestamps

Use:

```text
TIMESTAMPTZ
```

Store timestamps in UTC.

The client converts them to the user's local timezone for display.

## 12. IDs

Use UUIDs for public identifiers.

This avoids exposing simple sequential IDs through the API.

## 13. Indexing Principles

Create indexes for:

- Foreign keys frequently used in queries
- Common filters
- Sorting fields
- Unique constraints

Do not blindly index every column.

Indexes have a write and storage cost.

## 14. Transactions

Use transactions when multiple database changes must succeed or fail together.

Example:

```text
Create application
       +
Create audit log
```

If both are required to represent one operation, they may belong in the same transaction.

## 15. Migrations

Database schema changes must be managed through versioned migrations.

Example:

```text
001_create_users.sql
002_create_jobs.sql
003_create_applications.sql
...
```

Never rely on manually editing a production database.

## 16. Database Design Principle

PostgreSQL is the source of truth.

Redis is a supporting system.

Object storage contains files.

Each system should have a clear responsibility.
