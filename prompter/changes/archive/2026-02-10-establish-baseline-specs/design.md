# Design: Establish Baseline Specifications

## Purpose

This design document captures the architectural decisions and technical patterns that will guide the implementation of Difan-DIOS as we transition from static HTML templates to a fully functional QMS platform with React frontend and Laravel backend.

---

## Architectural Overview

### System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Browser (Client)                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              React.js Application                      │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │  │
│  │  │ Components  │  │ State Mgmt  │  │ API Client  │    │  │
│  │  │ (Reusable)  │  │ (Context/   │  │ (Axios)     │    │  │
│  │  │             │  │  Redux)     │  │             │    │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘    │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                            ↕ HTTPS / REST API
┌──────────────────────────────────────────────────────────────┐
│                   Laravel Backend (API)                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                  API Layer (Routes)                    │  │
│  │  /api/auth, /api/documents, /api/work-orders, etc.    │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │               Controllers (Request Handling)           │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │          Services (Business Logic)                     │  │
│  │  DocumentService, ApprovalService, WorkOrderService   │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │           Models (ORM / Eloquent)                      │  │
│  │  Document, User, Approval, WorkOrder, etc.            │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │        Middleware (Auth, RBAC, Logging)                │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                            ↕ SQL
┌──────────────────────────────────────────────────────────────┐
│                      MySQL Database                          │
│  users, documents, approvals, work_orders, audit_logs, etc.  │
└──────────────────────────────────────────────────────────────┘
                            ↕
┌──────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ File Storage│  │ Email (SMTP)│  │ Virus Scan  │         │
│  │ (Local/S3)  │  │ SendGrid    │  │ (ClamAV)    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└──────────────────────────────────────────────────────────────┘
```

---

## Decision 1: Backend Framework - Laravel

### Context
The system requires a robust backend framework to handle:
- Complex approval workflows with multi-level authorization
- Document lifecycle management with versioning
- RBAC with 8 distinct user roles
- Comprehensive audit logging for ISO compliance
- File upload and storage management
- Email notifications and job queuing

### Decision
**Selected: Laravel (PHP Framework)**

### Rationale

#### Pros of Laravel
1. **Mature Ecosystem**: 
   - Built-in authentication (Laravel Sanctum/Passport for API tokens)
   - Eloquent ORM for database operations
   - Queue system for async jobs (emails, reports)
   - Storage abstraction (local, S3, Azure Blob)
   - Mail integration with queue support

2. **Developer Productivity**:
   - Convention over configuration reduces boilerplate
   - Expressive syntax for complex queries
   - Migration system for version-controlled database schema
   - Built-in validation and form requests

3. **Enterprise Features**:
   - Authorization gates and policies for RBAC
   - Event system for audit logging
   - Job scheduling for review reminders
   - Robust error handling and logging

4. **Documentation & Community**:
   - Extensive documentation
   - Large community and ecosystem (packages for common needs)
   - Long-term support (LTS) versions available

5. **Hosting Compatibility**:
   - Widely supported by hosting providers
   - Can run on shared hosting, VPS, or cloud platforms
   - Lower infrastructure costs compared to node.js deployments

#### Alternatives Considered

| Framework | Pros | Cons | Why Not Selected |
|-----------|------|------|------------------|
| **Node.js (Express)** | JavaScript everywhere, real-time websockets, fast I/O | Callback complexity, less opinionated, fewer built-in features | Lacks built-in auth, RBAC, queue system; more setup needed |
| **Python (Django)** | Batteries included, strong ORM, admin panel | Python less common for web hosting in Indonesia, larger learning curve | Less hosting support, team may lack Python expertise |
| **Python (Flask)** | Lightweight, flexible | Minimal built-in features, requires many plugins | Too much assembly required for complex workflows |
| **Java (Spring Boot)** | Enterprise-grade, strong typing, scalable | Complex, verbose, slower development | Overkill for current scope, longer dev cycles |

### Trade-offs Accepted
- ❌ **Not real-time by default**: Laravel is traditional request-response; requires Laravel Echo + Redis for real-time features (acceptable - not a current requirement)
- ❌ **PHP language**: Some developers prefer modern languages, but PHP 8.x is mature and performant
- ✅ **Rapid development**: Laravel's conventions accelerate development significantly
- ✅ **Rich ecosystem**: Packages available for most needs (e.g., Laravel Excel for exports, Laravel Backup)

### Implementation Approach
1. **Laravel 10.x or 11.x** (latest LTS)
2. **API-first architecture**: All endpoints RESTful, JSON responses
3. **Repository pattern**: Services layer between controllers and models for testability
4. **Policy-based authorization**: Laravel Policies for RBAC logic
5. **Event-driven audit logging**: Fire events on model changes, listeners write to audit log
6. **Queue-driven notifications**: All emails queued, not sent synchronously

---

## Decision 2: Database - MySQL

### Context
The system requires a relational database to handle:
- Structured data with foreign key relationships (users → documents → approvals)
- Transaction support for workflow state changes
- Complex queries (filtering documents by status, department, date range)
- Audit trail integrity (immutable logs)

### Decision
**Selected: MySQL 8.x**

### Rationale

#### Pros of MySQL
1. **Relational Model Fit**: QMS data is highly relational (documents → approvals → users → departments)
2. **Transaction Support**: ACID guarantees for workflow state transitions
3. **Mature & Proven**: Decades of use in enterprise applications
4. **Wide Hosting Support**: Available on nearly all hosting providers
5. **Laravel Integration**: Eloquent ORM optimized for MySQL
6. **Performance**: Adequate for expected load (<1000 concurrent users)
7. **Cost**: Free, open-source (compared to Oracle, SQL Server)

#### Alternatives Considered

| Database | Pros | Cons | Why Not Selected |
|----------|------|------|------------------|
| **PostgreSQL** | Advanced features (JSONB, full-text search), stricter compliance | Less common on shared hosting, slightly more complex setup | MySQL sufficient for current needs; can migrate if needed |
| **SQLite** | Zero-config, file-based, excellent for dev | Not suitable for multi-user production, no concurrency | Not production-ready for multi-user QMS |
| **MongoDB** | Flexible schema, JSON-native, scalable | No transactions (until v4.0), relational joins awkward | QMS data is relational, not document-based |
| **SQL Server** | Enterprise features, strong Microsoft stack integration | Expensive licensing, less common on Linux hosting | Cost prohibitive, less portable |

### Trade-offs Accepted
- ⚠️ **No advanced full-text search**: Basic LIKE queries; can add Elasticsearch later if needed
- ⚠️ **No JSONB**: Use TEXT columns with JSON_ENCODE for complex data (acceptable for current scope)
- ✅ **Wide compatibility**: Runs anywhere Laravel runs
- ✅ **Simple backup/restore**: Standard SQL dump tools

### Database Design Principles
1. **Normalized Schema**: 3NF for data integrity
2. **Foreign Keys**: Enforce referential integrity
3. **Indexes**: On foreign keys, status columns, date columns
4. **Soft Deletes**: Use `deleted_at` timestamps, not hard deletes
5. **Audit Columns**: `created_at`, `updated_at`, `created_by`, `updated_by` on all entities
6. **Version Columns**: `version` integer for documents

---

## Decision 3: Frontend Framework - React.js

### Context
Current implementation uses jQuery for UI interactions. For maintainability, scalability, and modern development practices, we need a component-based frontend framework.

### Decision
**Selected: React.js 18.x**

### Rationale

#### Pros of React
1. **Component-Based**: Reusable UI components (e.g., DocumentCard, ApprovalButton)
2. **Ecosystem**: 
   - React Router for routing
   - Axios for API calls
   - Rich component libraries (Material-UI, Ant Design, or keep Bootstrap with react-bootstrap)
3. **State Management**: Context API or Redux for complex state (e.g., user session, approval workflows)
4. **Developer Experience**: Fast refresh, debugging tools, large community
5. **Incremental Migration**: Can coexist with existing jQuery templates during migration
6. **Job Market**: Easier to hire React developers than jQuery specialists

#### Alternatives Considered

| Framework | Pros | Cons | Why Not Selected |
|-----------|------|------|------------------|
| **Vue.js** | Gentle learning curve, simpler syntax, good documentation | Smaller ecosystem than React, less enterprise adoption | React has larger talent pool, more third-party libraries |
| **Angular** | Full framework, TypeScript-first, opinionated | Steep learning curve, verbose, heavyweight | Too opinionated, slower development for current team |
| **Svelte** | Compiled (smaller bundles), simple syntax | Smaller ecosystem, less mature, fewer devs available | Too new, risky for enterprise project |
| **Stay with jQuery** | No migration cost, team already knows it | Hard to maintain, no component model, outdated | Technical debt, not scalable long-term |

### Trade-offs Accepted
- ⚠️ **Migration effort**: Full rewrite of UI components from jQuery → React
- ⚠️ **Build complexity**: Requires webpack/vite, npm scripts, build pipeline
- ✅ **Maintainability**: Component reuse, easier testing, better separation of concerns
- ✅ **Future-proof**: React is industry standard, will be maintained long-term

### Migration Strategy
1. **Module-by-Module Migration**:
   - Phase 1: Authentication & Dashboard
   - Phase 2: SOP Management
   - Phase 3: Work Orders & Booking
   - Phase 4: Remaining modules
2. **Parallel Operation**: Serve React and jQuery templates side-by-side during migration
3. **API Contract First**: Define API endpoints before building React components
4. **Component Library**: Build reusable components (Table, Form, Modal, etc.) first

---

## Decision 4: Authentication Strategy - Laravel Sanctum

### Context
The system requires:
- Secure user authentication
- Stateless API authentication (for React SPA)
- Session-based access control
- Token revocation (logout)
- CSRF protection

### Decision
**Selected: Laravel Sanctum**

### Rationale

#### Pros of Sanctum
1. **SPA-Optimized**: Designed for single-page applications (React)
2. **Cookie-Based**: Uses HTTP-only cookies for security (not vulnerable to XSS)
3. **Simple Setup**: Built into Laravel, minimal configuration
4. **CSRF Protection**: Automatic CSRF token handling
5. **API Tokens**: Can also issue API tokens for mobile apps (future)
6. **Session Handling**: Integrates with Laravel's session system

#### Alternatives Considered

| Approach | Pros | Cons | Why Not Selected |
|----------|------|------|------------------|
| **Laravel Passport (OAuth2)** | Full OAuth2 implementation, supports third-party apps | Overkill for SPA, complex setup, database overhead | Too complex for current needs |
| **JWT (tymondesigns/jwt-auth)** | Stateless, widely used, cross-domain support | Tokens can't be revoked easily, more security concerns | Sanctum is simpler and more secure for SPA |
| **Session-only (no API tokens)** | Simple, traditional Laravel auth | Doesn't work well with React SPA, CORS issues | Not suitable for SPA architecture |

### Trade-offs Accepted
- ✅ **Simplicity**: Sanctum is the recommended Laravel approach for SPAs
- ✅ **Security**: Cookie-based reduces XSS risk compared to localStorage tokens

### Implementation Details
1. **CORS Configuration**: Allow React dev server (`localhost:3000`) and production domain
2. **Cookie Domain**: Set to parent domain for subdomain support (if needed)
3. **CSRF Token**: React fetches CSRF cookie before login request
4. **Session Timeout**: 30 minutes inactivity (configurable)

---

## Decision 5: File Storage - Laravel Storage (Local → S3)

### Context
The system must handle:
- Document file uploads (PDF, DOC, DOCX, XLS, XLSX)
- User avatars
- Logo and branding images
- Potential large files (quality manuals)

### Decision
**Selected: Laravel Storage Abstraction**
- **Initial**: Local filesystem (`storage/app/uploads`)
- **Future**: Migrate to AWS S3 or Azure Blob Storage

### Rationale

#### Pros of Laravel Storage
1. **Abstraction**: Same code works with local, S3, Azure, etc. (just change `.env` config)
2. **Easy Migration**: Switch storage driver without code changes
3. **Public/Private**: Support both public URLs and private/protected files
4. **Stream Support**: Efficient handling of large files

#### Migration Path
**Phase 1 (Local Storage)**:
- Store files in `storage/app/uploads/documents`, `storage/app/uploads/avatars`
- Serve via Laravel route with authorization check (e.g., `/api/files/{id}`)

**Phase 2 (Cloud Storage)**:
- Change `.env`: `FILESYSTEM_DISK=s3`
- Add AWS credentials
- Migrate existing files with script
- No code changes needed

### Trade-offs Accepted
- ⚠️ **Local disk space**: Initial deployment needs adequate disk space
- ✅ **Easy cloud migration**: When scale requires it, switch is seamless

### Security Implementation
1. **Virus Scanning**: Use ClamAV or VirusTotal API before saving
2. **File Validation**: Whitelist MIME types and extensions
3. **Size Limits**: Configurable max file size (e.g., 10MB initially)
4. **Authorization**: Check user permissions before serving file from storage

---

## Decision 6: Async Processing - Laravel Queues

### Context
The system requires asynchronous processing for:
- Sending email notifications (approval requests, status changes)
- Generating PDF exports of documents
- Creating large reports (audit logs)
- Scheduled tasks (review reminders)

### Decision
**Selected: Laravel Queues with Database Driver**
- **Initial**: Database queue (`jobs` table)
- **Future**: Redis or Amazon SQS for high volume

### Rationale

#### Pros of Laravel Queues
1. **Built-in**: No additional infrastructure initially (uses database)
2. **Easy to Use**: `dispatch(new SendEmailJob($user))` syntax
3. **Retry Logic**: Automatic retry with exponential backoff
4. **Failed Job Handling**: Failed jobs logged and retryable
5. **Scheduled Jobs**: Integrated with Laravel Scheduler (cron)

#### Queue Driver Progression
1. **Database Queue** (Phase 1):
   - No extra setup, works immediately
   - Good for low-medium volume
   - Single queue worker process

2. **Redis Queue** (Phase 2):
   - Faster than database queue
   - Supports multiple queues (priority: high, default, low)
   - Better for high volume

3. **Cloud Queue (SQS/Azure Queue)** (Phase 3+):
   - Fully managed, auto-scaling
   - High reliability
   - Usage-based pricing

### Trade-offs Accepted
- ⚠️ **Database queue performance**: Slower than Redis, but adequate for initial load
- ✅ **Simple start**: No infrastructure complexity initially

### Job Types
1. **Email Jobs**: `SendApprovalRequestEmail`, `SendStatusChangeEmail`, `SendReviewReminderEmail`
2. **Report Jobs**: `GenerateAuditTrailReport`, `GenerateComplianceReport`
3. **Cleanup Jobs**: `ArchiveOldDocuments`, `PurgeDeletedRecords`

---

## Decision 7: API Design - RESTful JSON API

### Context
The React frontend needs to communicate with the Laravel backend via HTTP API.

### Decision
**Selected: RESTful API with JSON request/response**

### API Structure

#### Base URL
- Development: `http://localhost:8000/api/v1`
- Production: `https://dios.example.com/api/v1`

#### Resource Endpoints Pattern
```
GET    /api/v1/{resource}           # List (with pagination, filters)
POST   /api/v1/{resource}           # Create
GET    /api/v1/{resource}/{id}      # Show (single)
PUT    /api/v1/{resource}/{id}      # Update (full)
PATCH  /api/v1/{resource}/{id}      # Update (partial)
DELETE /api/v1/{resource}/{id}      # Delete
```

#### Example: SOP Management
```
GET    /api/v1/sops?status=draft&department_id=5    # List SOPs (filtered)
POST   /api/v1/sops                                 # Create SOP
GET    /api/v1/sops/123                             # Get SOP #123
PUT    /api/v1/sops/123                             # Update SOP #123
DELETE /api/v1/sops/123                             # Delete SOP #123

POST   /api/v1/sops/123/submit                      # Submit for approval
POST   /api/v1/sops/123/approve                     # Approve
POST   /api/v1/sops/123/reject                      # Reject
POST   /api/v1/sops/123/publish                     # Publish
POST   /api/v1/sops/123/archive                     # Archive

GET    /api/v1/sops/123/versions                    # Get version history
GET    /api/v1/sops/123/audit-log                   # Get audit trail
```

#### Response Format (Success)
```json
{
  "success": true,
  "data": {
    "id": 123,
    "title": "IT Security SOP",
    "status": "draft",
    ...
  },
  "message": "SOP created successfully",
  "timestamp": "2026-02-10T10:30:00Z"
}
```

#### Response Format (Error)
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {"field": "title", "message": "Title is required"},
      {"field": "effective_date", "message": "Must be future date"}
    ]
  },
  "timestamp": "2026-02-10T10:30:00Z"
}
```

#### Pagination
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total": 150,
    "total_pages": 8,
    "next_page_url": "/api/v1/sops?page=2",
    "prev_page_url": null
  }
}
```

### Trade-offs
- ✅ **Standard REST**: Easy to understand, widely supported
- ✅ **Versioned**: `/v1` allows breaking changes in future without disrupting clients
- ⚠️ **Not GraphQL**: GraphQL would allow flexible queries but adds complexity
- ⚠️ **Over-fetching**: REST may return more data than needed; optimize with `?fields=` parameter if needed

---

## Decision 8: State Management - React Context API (Initially)

### Context
React components need to share state (e.g., current user, authentication status, notifications).

### Decision
**Selected: React Context API for global state (with Redux as future option)**

### Rationale

#### Pros of Context API
1. **Built-in**: No additional library needed
2. **Simple**: Easier to learn than Redux
3. **Sufficient for initial scope**: User session, notifications, theme
4. **Provider Pattern**: Clean separation of state logic

#### When to Consider Redux
If state management becomes complex (e.g., optimistic updates, complex undo/redo, time-travel debugging), migrate to Redux Toolkit.

### Context Providers Structure
```jsx
<AuthProvider>       {/* Current user, login/logout */}
  <NotificationProvider>  {/* Toast notifications */}
    <App>
      <Routes />
    </App>
  </NotificationProvider>
</AuthProvider>
```

### Trade-offs
- ✅ **Simple start**: Context API is easier for initial development
- ⚠️ **Migration later**: If complexity grows, can migrate to Redux incrementally

---

## Decision 9: UI Component Strategy - Bootstrap 5 + React Bootstrap

### Context
Existing templates use Bootstrap 5. React migration should preserve UI consistency.

### Decision
**Selected: Keep Bootstrap 5, use React Bootstrap for components**

### Rationale

#### Pros
1. **Design Continuity**: Maintain existing look and feel
2. **No Redesign Needed**: Developers familiar with Bootstrap
3. **React Bootstrap**: Official React components for Bootstrap (dropdown, modal, etc.)
4. **Responsive**: Already mobile-responsive
5. **Customizable**: Can override with custom SCSS

#### Alternatives Considered
| Library | Pros | Cons | Why Not Selected |
|---------|------|------|------------------|
| **Material-UI** | Modern design, comprehensive components | Different look from current design, learning curve | Would require full redesign |
| **Ant Design** | Enterprise-focused, rich components | Heavy bundle size, opinionated styling | Not worth the migration cost |
| **Tailwind CSS** | Utility-first, highly customizable | Requires rewriting all styles | Too much rework |

### Trade-offs
- ✅ **Familiar**: Team already knows Bootstrap
- ✅ **Consistent**: UI looks the same before/after migration
- ⚠️ **Bundle size**: Bootstrap is heavier than utility frameworks, but acceptable

---

## Testing Strategy

### Backend Testing (Laravel)
1. **Unit Tests**: Test business logic in Services (PHPUnit)
2. **Feature Tests**: Test API endpoints with database (PHPUnit)
3. **Coverage Target**: 80% for business logic, 60% overall

### Frontend Testing (React)
1. **Component Tests**: Test React components in isolation (Jest + React Testing Library)
2. **Integration Tests**: Test user flows (Cypress or Playwright)
3. **Coverage Target**: 70% for components

### E2E Testing
- **Framework**: Playwright (cross-browser)
- **Critical Flows**: Login → Create SOP → Submit → Approve → Publish

---

## Deployment Architecture

### Development
- React: `localhost:3000` (Vite dev server)
- Laravel: `localhost:8000` (artisan serve or Docker)
- MySQL: `localhost:3306`

### Production (Future)
- **Frontend**: Static build on Nginx or Vercel
- **Backend**: Laravel on Forge, Heroku, or DigitalOcean
- **Database**: Managed MySQL (AWS RDS, DigitalOcean Managed DB)
- **CDN**: Cloudflare for assets

---

## Security Considerations

### OWASP Top 10 Mitigations
1. **SQL Injection**: Eloquent ORM uses parameterized queries
2. **XSS**: React escapes output by default; use `dangerouslySetInnerHTML` sparingly
3. **CSRF**: Laravel Sanctum provides CSRF protection
4. **Authentication**: Strong password policy, account lockout, session timeout
5. **Authorization**: Laravel Policies enforce RBAC on every request
6. **Sensitive Data**: HTTPS in production, encrypted passwords, environment variables for secrets
7. **File Upload**: Whitelist MIME types, virus scanning, size limits
8. **Logging**: Audit log all sensitive actions
9. **Dependency Management**: Regular `composer update` and `npm audit`
10. **Error Handling**: Don't expose stack traces in production

---

## Summary of Key Decisions

| Decision Area | Choice | Rationale |
|---------------|--------|-----------|
| **Backend Framework** | Laravel | Mature, batteries-included, excellent for RBAC and workflows |
| **Database** | MySQL | Relational model fits QMS, wide hosting support |
| **Frontend Framework** | React.js | Component-based, modern, large ecosystem |
| **Authentication** | Laravel Sanctum | SPA-optimized, secure, simple |
| **File Storage** | Laravel Storage (Local → S3) | Abstraction allows easy migration |
| **Async Processing** | Laravel Queues (DB → Redis) | Built-in, scalable progression |
| **API Design** | REST JSON | Standard, versioned, well-understood |
| **State Management** | React Context (→ Redux if needed) | Simple start, migrate if complexity grows |
| **UI Components** | Bootstrap 5 + React Bootstrap | Design continuity, familiar to team |

---

## Open Questions for Implementation Phase

1. **Multi-Tenancy**: Should the system support multiple organizations on one instance?
2. **E-Signature Integration**: Which provider (DocuSign, Adobe Sign, local solution)?
3. **Real-Time Notifications**: Do we need WebSockets (Laravel Echo + Redis) or is polling sufficient?
4. **Localization**: Full Indonesian + English support, or Indonesian only initially?
5. **Mobile Apps**: Native mobile apps required, or is responsive web sufficient?

---

**Document Version**: 1.0.0  
**Created**: February 10, 2026  
**Status**: Draft - Design Decisions for Review  
**Next Action**: Review with technical team, finalize stack choices
