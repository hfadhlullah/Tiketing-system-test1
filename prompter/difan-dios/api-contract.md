# API Contract

## Document Information

|                        |                                |
|------------------------|--------------------------------|
| **Project**            | Difan-DIOS (Difan Integrated Operational System) |
| **Version**            | 1.0.0 (DRAFT - TEMPLATE)       |
| **Date**               | February 10, 2026              |
| **Status**             | 🟡 Template - Awaiting Content |
| **Author**             | TBD                            |
| **Reviewers**          | Backend Lead, Frontend Lead    |
| **Dependencies**       | FSD, ERD must be complete      |
| **API Style**          | RESTful JSON API               |
| **Base URL**           | `/api/v1` or `/api` [TBD - OQ-02] |

---

## 1. Introduction

### 1.1 Purpose
<!-- Describe the purpose of this API Contract: to define all REST endpoints for Difan-DIOS MVP 1 frontend-backend communication -->

### 1.2 Scope
<!-- List which modules/features are covered by this API -->

### 1.3 API Design Principles
- **RESTful**: Resource-based URLs, HTTP methods (GET, POST, PUT, PATCH, DELETE)
- **JSON Format**: All requests and responses use JSON
- **Stateless**: Each request contains all necessary authentication (token-based)
- **Paginated**: List endpoints support pagination
- **Versioned**: [TBD - OQ-02: `/api/v1/...` or defer versioning?]

### 1.4 Reference Documents
- FSD: `prompter/difan-dios/fsd.md`
- ERD: `prompter/difan-dios/erd.md`
- PRD: `prompter/difan-dios/prd.md`

---

## 2. Authentication

### 2.1 Authentication Method
**Technology**: Laravel Sanctum (token-based authentication)

**Flow**:
1. User submits credentials to `/api/auth/login`
2. Server validates and returns token
3. Client includes token in `Authorization: Bearer {token}` header for subsequent requests
4. Token expires after [TBD - 24 hours? configurable?]
5. Client can refresh token via `/api/auth/refresh` or re-login

### 2.2 Authentication Endpoints

#### POST /api/auth/login
**Description**: User login to obtain access token.

**Authentication**: None (public endpoint)

**Request**:
```json
{
  "username": "string (required, 3-50 chars)",
  "password": "string (required, 8-255 chars)"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "token": "string (Laravel Sanctum token)",
    "token_type": "Bearer",
    "expires_in": "number (seconds, e.g., 86400 for 24 hours)",
    "user": {
      "id": "number",
      "username": "string",
      "email": "string",
      "full_name": "string",
      "role": {
        "id": "number",
        "name": "string",
        "slug": "string"
      },
      "department": {
        "id": "number",
        "name": "string"
      }
    }
  },
  "timestamp": "string (ISO 8601 datetime)"
}
```

**Response (401 Unauthorized)**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid username or password",
    "details": []
  },
  "timestamp": "string"
}
```

**Response (429 Too Many Requests)** [Per AUTH-009 spec delta]:
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many login attempts. Please try again in 1 minute.",
    "details": {
      "retry_after": "number (seconds)"
    }
  },
  "timestamp": "string"
}
```

**Business Rules**:
- Account locked after 5 failed attempts for 15 minutes (AUTH-002)
- Rate limiting: Max 5 attempts per minute per IP (AUTH-009)
- Audit log entry created (AUDIT-001)

---

#### POST /api/auth/logout
**Description**: User logout to revoke access token.

**Authentication**: Required (Bearer token)

**Request**: Empty body

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Logged out successfully",
  "timestamp": "string"
}
```

**Business Rules**:
- Revoke current user's token
- Audit log entry created
- Clear any server-side session data

---

#### POST /api/auth/refresh
**Description**: Refresh access token before expiration.

**Authentication**: Required (Bearer token)

**Request**: Empty body

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "token": "string (new token)",
    "token_type": "Bearer",
    "expires_in": "number"
  },
  "timestamp": "string"
}
```

**Business Rules**:
- Revoke old token, issue new token
- [TBD - Refresh token rotation? Sliding session?]

---

#### POST /api/auth/password/forgot
**Description**: Request password reset email.

**Authentication**: None (public endpoint)

**Request**:
```json
{
  "email": "string (required, valid email format)"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Password reset link sent to your email",
  "timestamp": "string"
}
```

**Response (429 Too Many Requests)** [Per AUTH-009 spec delta]:
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many password reset requests. Please try again in 15 minutes.",
    "details": {
      "retry_after": "number (seconds)"
    }
  },
  "timestamp": "string"
}
```

**Business Rules**:
- Rate limiting: Max 3 requests per 15 minutes per email (AUTH-009)
- Send email with reset token (expires in 60 minutes)
- [TBD - Return success even if email not found (security)?]

---

#### POST /api/auth/password/reset
**Description**: Reset password using token from email.

**Authentication**: None (public endpoint)

**Request**:
```json
{
  "token": "string (required, from email link)",
  "email": "string (required)",
  "password": "string (required, min 8 chars, complexity rules)",
  "password_confirmation": "string (required, must match password)"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Password reset successfully",
  "timestamp": "string"
}
```

**Response (400 Bad Request)**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Password does not meet requirements",
    "details": [
      {
        "field": "password",
        "message": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      }
    ]
  },
  "timestamp": "string"
}
```

**Business Rules**:
- Token must be valid and not expired
- Password must meet complexity requirements (AUTH-001)
- Invalidate token after use (one-time use)

---

## 3. User Management

### 3.1 List Users

#### GET /api/users
**Description**: Retrieve paginated list of users.

**Authentication**: Required

**Authorization**: Admin, Quality Manager (read-only), Department Head (department users only)

**Query Parameters**:
- `page` (optional, integer, default: 1): Page number
- `per_page` (optional, integer, default: 20, max: 100): Items per page
- `search` (optional, string): Search by username, email, or full_name
- `role_id` (optional, integer): Filter by role ID
- `department_id` (optional, integer): Filter by department ID
- `is_active` (optional, boolean): Filter by active status
- `sort_by` (optional, string, default: "created_at"): Sort field (username, email, created_at)
- `sort_order` (optional, string, default: "desc"): Sort order (asc, desc)

**Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "username": "string",
      "email": "string",
      "full_name": "string",
      "role": {
        "id": "number",
        "name": "string"
      },
      "department": {
        "id": "number",
        "name": "string"
      },
      "is_active": "boolean",
      "last_login": "string (ISO 8601 datetime or null)",
      "created_at": "string (ISO 8601 datetime)"
    }
    // ... more users
  ],
  "pagination": {
    "page": "number (current page)",
    "per_page": "number",
    "total": "number (total items)",
    "total_pages": "number"
  },
  "timestamp": "string"
}
```

**Business Rules**:
- Department heads see only their department's users
- [TBD - Exclude deleted users or include `deleted_at` field?]

---

### 3.2 Create User

#### POST /api/users
**Description**: Create a new user account.

**Authentication**: Required

**Authorization**: Admin only

**Request**:
```json
{
  "username": "string (required, unique, 3-50 chars)",
  "email": "string (required, unique, valid email)",
  "full_name": "string (required)",
  "password": "string (required, min 8 chars, complexity rules)",
  "role_id": "number (required)",
  "department_id": "number (optional)",
  "is_active": "boolean (optional, default: true)"
}
```

**Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "id": "number",
    "username": "string",
    "email": "string",
    "full_name": "string",
    "role": { ... },
    "department": { ... },
    "is_active": "boolean",
    "created_at": "string"
  },
  "message": "User created successfully",
  "timestamp": "string"
}
```

**Response (422 Unprocessable Entity)**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "username",
        "message": "The username has already been taken"
      },
      {
        "field": "email",
        "message": "The email must be a valid email address"
      }
    ]
  },
  "timestamp": "string"
}
```

**Business Rules**:
- Username and email must be unique
- Password must meet complexity requirements
- Audit log entry created

---

### 3.3 Get User Details

#### GET /api/users/{id}
**Description**: Retrieve details of a specific user.

**Authentication**: Required

**Authorization**: Admin, or the user themselves

**Path Parameters**:
- `id` (required, integer): User ID

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "number",
    "username": "string",
    "email": "string",
    "email_verified_at": "string or null",
    "full_name": "string",
    "role": { ... },
    "department": { ... },
    "is_active": "boolean",
    "last_login": "string or null",
    "created_at": "string",
    "updated_at": "string"
  },
  "timestamp": "string"
}
```

**Response (404 Not Found)**:
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "User not found",
    "details": []
  },
  "timestamp": "string"
}
```

---

### 3.4 Update User

#### PUT /api/users/{id}
**Description**: Update user details.

**Authentication**: Required

**Authorization**: Admin, or the user themselves (limited fields)

**Path Parameters**:
- `id` (required, integer): User ID

**Request**:
```json
{
  "email": "string (optional, unique)",
  "full_name": "string (optional)",
  "role_id": "number (optional, admin only)",
  "department_id": "number (optional, admin only)",
  "is_active": "boolean (optional, admin only)"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": { /* updated user object */ },
  "message": "User updated successfully",
  "timestamp": "string"
}
```

**Business Rules**:
- Regular users can only update their own `email` and `full_name`
- Admin can update any field
- Audit log entry created on change

---

### 3.5 Delete User

#### DELETE /api/users/{id}
**Description**: Soft delete a user account.

**Authentication**: Required

**Authorization**: Admin only

**Path Parameters**:
- `id` (required, integer): User ID

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "User deleted successfully",
  "timestamp": "string"
}
```

**Business Rules**:
- Soft delete (set `deleted_at` timestamp)
- Cannot delete user with active documents/work orders? [TBD]
- Audit log entry created

---

## 4. Document Management

### 4.1 List Documents (SOPs Example)

#### GET /api/sops
**Description**: Retrieve paginated list of SOP documents.

**Authentication**: Required

**Authorization**: All authenticated users (filtered by permissions)

**Query Parameters**:
- `page`, `per_page` (pagination)
- `search` (string): Search in title, description
- `status` (string): Filter by status (draft, submitted, published, archived)
- `department_id` (integer): Filter by department
- `category` (string): Filter by category
- `created_by` (integer): Filter by creator user ID
- `date_from`, `date_to` (date): Filter by effective_date range
- `sort_by`, `sort_order`

**Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "document_type": "sop",
      "document_number": "string",
      "sop_number": "string",
      "title": "string",
      "description": "string",
      "category": "string",
      "department": {
        "id": "number",
        "name": "string"
      },
      "created_by": {
        "id": "number",
        "full_name": "string"
      },
      "status": "string",
      "version": "string",
      "effective_date": "string (date)",
      "review_date": "string (date or null)",
      "file_path": "string (or null)",
      "created_at": "string",
      "updated_at": "string"
    }
    // ... more documents
  ],
  "pagination": { ... },
  "timestamp": "string"
}
```

**Business Rules**:
- Staff users see only "published" documents (unless they created them)
- Document controllers see all documents in their department
- [TBD - Include `can_edit`, `can_delete` flags in response based on permissions?]

---

### 4.2 Create Document (SOP Example)

#### POST /api/sops
**Description**: Create a new SOP document.

**Authentication**: Required

**Authorization**: Users with document creation permission

**Request** (multipart/form-data for file upload or JSON):
```json
{
  "title": "string (required, max 500 chars)",
  "description": "string (optional)",
  "content": "string (optional, rich text HTML)",
  "category": "string (optional)",
  "sop_number": "string (optional, auto-generated if omitted)",
  "scope": "string (optional)",
  "procedure_steps": "array of strings or JSON (optional)",
  "effective_date": "string (date, required)",
  "review_date": "string (date, optional)",
  "file": "file (optional, PDF/DOC/DOCX, max [TBD]MB)"
}
```

**Response (201 Created)**:
```json
{
  "success": true,
  "data": { /* created SOP object */ },
  "message": "SOP created successfully as draft",
  "timestamp": "string"
}
```

**Response (422 Unprocessable Entity)**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "title",
        "message": "The title field is required"
      },
      {
        "field": "file",
        "message": "The file must be a PDF, DOC, or DOCX"
      }
    ]
  },
  "timestamp": "string"
}
```

**Business Rules**:
- Document created in "draft" status by default
- `document_number` auto-generated if not provided
- File upload validated (format, size, virus scan)
- Department set to creator's department if not specified
- Audit log entry created

---

### 4.3 Get Document Details

#### GET /api/sops/{id}
**Description**: Retrieve details of a specific SOP document.

**Authentication**: Required

**Authorization**: Permission-based (can view this document)

**Path Parameters**:
- `id` (required, integer): Document ID

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "number",
    "document_type": "sop",
    "document_number": "string",
    "sop_number": "string",
    "title": "string",
    "description": "string",
    "content": "string (rich text HTML)",
    "category": "string",
    "scope": "string",
    "procedure_steps": "array or JSON",
    "department": { ... },
    "created_by": { ... },
    "status": "string",
    "version": "string",
    "effective_date": "string",
    "review_date": "string",
    "file_path": "string",
    "file_url": "string (pre-signed download URL)",
    "created_at": "string",
    "updated_at": "string",
    "versions": [
      {
        "version": "string",
        "created_by": { ... },
        "created_at": "string"
      }
      // ... version history
    ]
  },
  "timestamp": "string"
}
```

**Business Rules**:
- Include version history
- Redact sensitive fields if user lacks permission

---

### 4.4 Update Document

#### PUT /api/sops/{id}
**Description**: Update an existing SOP document.

**Authentication**: Required

**Authorization**: Document creator, document controllers, admin

**Path Parameters**:
- `id` (required, integer): Document ID

**Request** (partial update allowed):
```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "content": "string (optional)",
  "category": "string (optional)",
  // ... other updatable fields
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": { /* updated SOP object */ },
  "message": "SOP updated successfully",
  "timestamp": "string"
}
```

**Response (403 Forbidden)**:
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have permission to edit this document",
    "details": []
  },
  "timestamp": "string"
}
```

**Business Rules**:
- Can only edit documents in "draft" status [TBD - or any status for certain roles?]
- Create new version if document is "published" [TBD - versioning behavior]
- Audit log entry created

---

### 4.5 Delete Document

#### DELETE /api/sops/{id}
**Description**: Soft delete a document.

**Authentication**: Required

**Authorization**: Admin, Quality Manager, or document creator (if draft)

**Path Parameters**:
- `id` (required, integer): Document ID

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "SOP deleted successfully",
  "timestamp": "string"
}
```

**Business Rules**:
- Soft delete (set `deleted_at`)
- Cannot delete published documents? [TBD - or archive instead?]

---

### 4.6 Document Workflow Actions

#### POST /api/sops/{id}/submit
**Description**: Submit document for approval.

**Authentication**: Required

**Authorization**: Document creator, document controllers

**Path Parameters**:
- `id` (required, integer): Document ID

**Request**: Empty body

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "number",
    "status": "submitted",
    "approvals": [
      {
        "level": 1,
        "approver": { ... },
        "status": "pending"
      }
      // ... approval chain
    ]
  },
  "message": "SOP submitted for approval",
  "timestamp": "string"
}
```

**Business Rules**:
- Document must be in "draft" status
- Create approval records for configured approval levels
- Send notifications to approvers
- Update status to "submitted"

---

#### POST /api/sops/{id}/publish
**Description**: Publish an approved document.

**Authentication**: Required

**Authorization**: Admin, Quality Manager, Document Controller

**Path Parameters**:
- `id` (required, integer): Document ID

**Request**: Empty body

**Response (200 OK)**:
```json
{
  "success": true,
  "data": { /* published document */ },
  "message": "SOP published successfully",
  "timestamp": "string"
}
```

**Business Rules**:
- Document must be in "approved" status
- Update status to "published"
- Send notifications to relevant users

---

#### POST /api/sops/{id}/archive
**Description**: Archive a published document.

**Authentication**: Required

**Authorization**: Admin, Quality Manager, Document Controller

**Path Parameters**:
- `id` (required, integer): Document ID

**Request**:
```json
{
  "reason": "string (required)"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": { /* archived document */ },
  "message": "SOP archived successfully",
  "timestamp": "string"
}
```

**Business Rules**:
- Document must be in "published" status
- Update status to "archived"
- Audit log with archive reason

---

### 4.7 Document Versions

#### GET /api/sops/{id}/versions
**Description**: Get version history of a document.

**Authentication**: Required

**Authorization**: Can view document

**Path Parameters**:
- `id` (required, integer): Document ID

**Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "version": "string",
      "content": "string (summary or full content?)",
      "created_by": { ... },
      "created_at": "string"
    }
    // ... versions
  ],
  "timestamp": "string"
}
```

---

#### GET /api/sops/{id}/versions/{version}
**Description**: Get specific version content.

**Authentication**: Required

**Authorization**: Can view document

**Path Parameters**:
- `id` (required, integer): Document ID
- `version` (required, string): Version number

**Response (200 OK)**:
```json
{
  "success": true,
  "data": { /* document version snapshot */ },
  "timestamp": "string"
}
```

---

### 4.8 Other Document Types
**Similar endpoints for**: `/api/policies`, `/api/work-instructions`, `/api/quality-manuals`, `/api/application-guides`

[TBD - Document all endpoints with same patterns as SOPs]

---

## 5. Approval Workflow

### 5.1 List Pending Approvals

#### GET /api/approvals
**Description**: Get pending approvals for current user.

**Authentication**: Required

**Authorization**: Approvers

**Query Parameters**:
- `page`, `per_page`
- `document_type` (optional): Filter by document type
- `status` (optional): Filter by approval status (pending, approved, rejected)

**Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "document": {
        "id": "number",
        "document_type": "string",
        "title": "string",
        "created_by": { ... }
      },
      "approval_level": "number",
      "status": "string",
      "created_at": "string"
    }
    // ... pending approvals
  ],
  "pagination": { ... },
  "timestamp": "string"
}
```

---

### 5.2 Approve Document

#### POST /api/approvals/{id}/approve
**Description**: Approve a document at current approval level.

**Authentication**: Required

**Authorization**: Assigned approver for this approval record

**Path Parameters**:
- `id` (required, integer): Approval ID

**Request**:
```json
{
  "comments": "string (optional)"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "number",
    "status": "approved",
    "comments": "string",
    "action_date": "string",
    "document_status": "string (approved if all levels complete, or in_review if more levels)"
  },
  "message": "Document approved successfully",
  "timestamp": "string"
}
```

**Business Rules**:
- Update approval record status to "approved"
- If all approval levels complete, update document status to "approved"
- If more levels remain, advance to next level and notify next approver
- Send notification to document creator
- Audit log entry

---

### 5.3 Reject Document

#### POST /api/approvals/{id}/reject
**Description**: Reject a document with comments.

**Authentication**: Required

**Authorization**: Assigned approver

**Path Parameters**:
- `id` (required, integer): Approval ID

**Request**:
```json
{
  "comments": "string (required)"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "number",
    "status": "rejected",
    "comments": "string",
    "action_date": "string",
    "document_status": "rejected"
  },
  "message": "Document rejected",
  "timestamp": "string"
}
```

**Business Rules**:
- Update approval record status to "rejected"
- Update document status to "rejected"
- Cancel pending approvals at other levels
- Send notification to document creator with feedback
- Audit log entry

---

### 5.4 Delegate Approval

#### POST /api/approvals/{id}/delegate
**Description**: Delegate approval to another user.

**Authentication**: Required

**Authorization**: Assigned approver

**Path Parameters**:
- `id` (required, integer): Approval ID

**Request**:
```json
{
  "delegate_user_id": "number (required)"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "number",
    "status": "delegated",
    "delegated_to": { ... }
  },
  "message": "Approval delegated successfully",
  "timestamp": "string"
}
```

**Business Rules**:
- Update `delegated_to` field
- Send notification to delegatee
- Delegatee can approve/reject on behalf of original approver

---

## 6. Work Order Management

### 6.1 List Work Orders

#### GET /api/work-orders
**Description**: Retrieve paginated list of work orders.

**Authentication**: Required

**Authorization**: All users (filtered by permissions)

**Query Parameters**:
- `page`, `per_page`
- `search`
- `status` (string): Filter by status
- `priority` (string): Filter by priority
- `assigned_to` (integer): Filter by assigned user
- `created_by` (integer): Filter by creator
- `department_id` (integer): Filter by department
- `due_date_from`, `due_date_to` (date): Filter by due date range
- `sort_by`, `sort_order`

**Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "wo_number": "string",
      "title": "string",
      "description": "string",
      "priority": "string",
      "assigned_to": { "id": "number", "full_name": "string" },
      "created_by": { ... },
      "department": { ... },
      "due_date": "string (date)",
      "status": "string",
      "created_at": "string",
      "updated_at": "string"
    }
    // ... work orders
  ],
  "pagination": { ... },
  "timestamp": "string"
}
```

**Business Rules**:
- Staff see work orders they created or are assigned to
- Department heads see all work orders in their department
- [TBD - Overdue work order flagging?]

---

### 6.2 Create Work Order

#### POST /api/work-orders
**Description**: Create a new work order.

**Authentication**: Required

**Authorization**: All authenticated users

**Request**:
```json
{
  "title": "string (required, max 500 chars)",
  "description": "string (optional)",
  "priority": "string (required, enum: low, medium, high, critical)",
  "assigned_to": "number (optional, user ID)",
  "department_id": "number (optional)",
  "due_date": "string (date, optional)"
}
```

**Response (201 Created)**:
```json
{
  "success": true,
  "data": { /* created work order */ },
  "message": "Work order created successfully",
  "timestamp": "string"
}
```

**Business Rules**:
- `wo_number` auto-generated
- Status set to "new"
- Notification sent to assigned user (if assigned)

---

### 6.3 Update Work Order

#### PUT /api/work-orders/{id}
**Description**: Update work order details.

**Authentication**: Required

**Authorization**: Creator, assigned user, department head, admin

**Path Parameters**:
- `id` (required, integer): Work order ID

**Request** (partial update):
```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "priority": "string (optional)",
  "assigned_to": "number (optional)",
  "due_date": "string (optional)"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": { /* updated work order */ },
  "message": "Work order updated successfully",
  "timestamp": "string"
}
```

---

### 6.4 Work Order Actions

#### POST /api/work-orders/{id}/assign
**Description**: Assign work order to a user.

**Authentication**: Required

**Authorization**: Creator, department head, admin

**Request**:
```json
{
  "assigned_to": "number (required, user ID)"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": { /* work order with status changed to "assigned" */ },
  "message": "Work order assigned successfully",
  "timestamp": "string"
}
```

---

#### POST /api/work-orders/{id}/status
**Description**: Update work order status with comment.

**Authentication**: Required

**Authorization**: Assigned user, creator, department head, admin

**Request**:
```json
{
  "status": "string (required, enum: in_progress, on_hold, review, completed, cancelled)",
  "comment": "string (optional)"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": { /* work order with updated status */ },
  "message": "Work order status updated",
  "timestamp": "string"
}
```

**Business Rules**:
- Follow status workflow (WO-003)
- Status transitions validated (can't go from "new" to "completed" directly)
- Notification sent based on status change

---

[TBD - Continue with: /api/work-orders/{id}/complete, /api/work-orders/{id}/close, /api/work-orders/{id}/comments, /api/work-orders/{id}/attachments]

---

## 7. Meeting Room Booking

### 7.1 List Meeting Rooms

#### GET /api/meeting-rooms
**Description**: Get list of active meeting rooms.

**Authentication**: Required

**Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "name": "string",
      "location": "string",
      "capacity": "number",
      "facilities": ["projector", "whiteboard", "..."],
      "is_active": "boolean"
    }
    // ... rooms
  ],
  "timestamp": "string"
}
```

---

### 7.2 Get Room Availability

#### GET /api/meeting-rooms/{id}/availability
**Description**: Get available time slots for a room.

**Authentication**: Required

**Path Parameters**:
- `id` (required, integer): Room ID

**Query Parameters**:
- `start_date` (required, date): Start of date range
- `end_date` (required, date): End of date range

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "room_id": "number",
    "available_slots": [
      {
        "start_time": "string (ISO 8601 datetime)",
        "end_time": "string"
      }
      // ... available slots
    ],
    "booked_slots": [
      {
        "booking_id": "number",
        "start_time": "string",
        "end_time": "string",
        "title": "string (if user has permission to view)"
      }
      // ... existing bookings
    ]
  },
  "timestamp": "string"
}
```

**Business Rules**:
- Calculate availability based on existing bookings
- [TBD - Operating hours (e.g., 8 AM - 6 PM), minimum slot duration?]

---

### 7.3 Create Booking

#### POST /api/bookings
**Description**: Create a meeting room booking.

**Authentication**: Required

**Authorization**: All authenticated users

**Request**:
```json
{
  "room_id": "number (required)",
  "title": "string (required, max 500 chars)",
  "description": "string (optional)",
  "start_time": "string (required, ISO 8601 datetime)",
  "end_time": "string (required, ISO 8601 datetime)",
  "attendees_count": "number (optional)"
}
```

**Response (201 Created)**:
```json
{
  "success": true,
  "data": { /* created booking */ },
  "message": "Booking created successfully",
  "timestamp": "string"
}
```

**Response (409 Conflict)**:
```json
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "Room is already booked for this time slot",
    "details": {
      "conflicting_booking": {
        "id": "number",
        "start_time": "string",
        "end_time": "string"
      }
    }
  },
  "timestamp": "string"
}
```

**Business Rules**:
- Validate no booking conflicts (same room, overlapping time)
- `start_time` must be before `end_time`
- [TBD - Advance booking deadline? Maximum duration?]

---

### 7.4 Update Booking

#### PUT /api/bookings/{id}
**Description**: Update an existing booking.

**Authentication**: Required

**Authorization**: Booking creator, admin

**Request**:
```json
{
  "room_id": "number (optional)",
  "title": "string (optional)",
  "start_time": "string (optional)",
  "end_time": "string (optional)"
}
```

**Response (200 OK)** or **(409 Conflict)** if new time conflicts

---

### 7.5 Cancel Booking

#### DELETE /api/bookings/{id}
**Description**: Cancel a booking.

**Authentication**: Required

**Authorization**: Booking creator, admin

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "timestamp": "string"
}
```

**Business Rules**:
- Update status to "cancelled" (soft delete or hard delete?)
- [TBD - Cancellation deadline (e.g., cannot cancel within 2 hours of start)?]

---

## 8. Search & Filtering

### 8.1 Global Search

#### GET /api/search
**Description**: Search across multiple entity types.

**Authentication**: Required

**Query Parameters**:
- `q` (required, string): Search query
- `type` (optional, string): Filter by entity type (sops, policies, work_orders, users)
- `department_id` (optional, integer): Filter by department
- `status` (optional, string): Filter by status
- `page`, `per_page`

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "sops": [ /* matching SOPs */ ],
    "policies": [ /* matching policies */ ],
    "work_orders": [ /* matching work orders */ ],
    "users": [ /* matching users if admin */ ]
  },
  "pagination": { ... },
  "timestamp": "string"
}
```

**Business Rules**:
- Full-text search on title, description, content fields
- Permission-filtered results (user sees only what they have access to)

---

### 8.2 Advanced Search

#### GET /api/search/advanced
**Description**: Advanced search with multiple filters.

**Authentication**: Required

**Query Parameters**:
- `filters` (JSON string): Complex filter object [TBD - define structure]

**Response**: Similar to global search

---

## 9. Dashboard & Analytics

### 9.1 Get Dashboard Data

#### GET /api/dashboard
**Description**: Get role-specific dashboard widgets data.

**Authentication**: Required

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "widgets": [
      {
        "type": "pending_approvals",
        "title": "Pending Approvals",
        "count": "number",
        "items": [ /* latest 5 pending approvals */ ]
      },
      {
        "type": "my_work_orders",
        "title": "My Work Orders",
        "count": "number",
        "items": [ /* latest assigned work orders */ ]
      },
      {
        "type": "recent_documents",
        "title": "Recently Published Documents",
        "items": [ /* latest 5 published documents */ ]
      }
      // ... role-specific widgets
    ]
  },
  "timestamp": "string"
}
```

**Business Rules**:
- Widgets customized per user role (per FSD DASHBOARD-001)
- [TBD - Real-time vs. cached data? Refresh intervals?]

---

### 9.2 Get Analytics (Compliance)

#### GET /api/analytics/compliance
**Description**: Get compliance metrics and reports.

**Authentication**: Required

**Authorization**: Quality Manager, Admin, Auditor

**Query Parameters**:
- `date_from`, `date_to` (optional): Date range

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "total_documents": "number",
    "published_documents": "number",
    "documents_due_for_review": "number",
    "overdue_reviews": "number",
    "approval_rate": "number (percentage)",
    "average_approval_time": "number (days)"
  },
  "timestamp": "string"
}
```

---

## 10. File Management

### 10.1 Upload File

#### POST /api/files/upload
**Description**: Upload a file (document attachment, work order attachment, etc.).

**Authentication**: Required

**Request** (multipart/form-data):
- `file` (required, file): File to upload
- `entity_type` (optional, string): Document, WorkOrder, etc.
- `entity_id` (optional, integer): ID of parent entity

**Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "file_id": "number",
    "filename": "string",
    "file_url": "string (pre-signed URL for download)",
    "file_size": "number",
    "mime_type": "string"
  },
  "message": "File uploaded successfully",
  "timestamp": "string"
}
```

**Response (422 Unprocessable Entity) - Invalid File**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "File validation failed",
    "details": [
      {
        "field": "file",
        "message": "File size exceeds maximum limit of 10 MB"
      }
    ]
  },
  "timestamp": "string"
}
```

**Business Rules**:
- Allowed formats: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, JPEG
- Max file size: [TBD - 10 MB?]
- Virus scanning required before storage
- [TBD - File storage path: Laravel Storage → local disk or S3?]

---

### 10.2 Download File

#### GET /api/files/{id}/download
**Description**: Download a file.

**Authentication**: Required

**Authorization**: User has access to parent entity

**Path Parameters**:
- `id` (required, integer): File ID

**Response (200 OK)**: File stream (binary data with appropriate `Content-Type` header)

**Response (404 Not Found)**: File not found or user lacks permission

**Business Rules**:
- Generate pre-signed URL for secure download (expires in 10 minutes)
- Log download in audit trail

---

### 10.3 Delete File

#### DELETE /api/files/{id}
**Description**: Delete a file attachment.

**Authentication**: Required

**Authorization**: User who uploaded file, admin

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "File deleted successfully",
  "timestamp": "string"
}
```

---

## 11. Notifications

### 11.1 Get User Notifications

#### GET /api/notifications
**Description**: Get notifications for current user.

**Authentication**: Required

**Query Parameters**:
- `page`, `per_page`
- `is_read` (optional, boolean): Filter by read status

**Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "type": "string (approval_request, document_published, etc.)",
      "title": "string",
      "message": "string",
      "data": { /* links, references */ },
      "is_read": "boolean",
      "created_at": "string"
    }
    // ... notifications
  ],
  "pagination": { ... },
  "timestamp": "string"
}
```

---

### 11.2 Mark Notification as Read

#### POST /api/notifications/{id}/read
**Description**: Mark a notification as read.

**Authentication**: Required

**Path Parameters**:
- `id` (required, integer): Notification ID

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Notification marked as read",
  "timestamp": "string"
}
```

---

### 11.3 Mark All Notifications as Read

#### POST /api/notifications/mark-all-read
**Description**: Mark all user's notifications as read.

**Authentication**: Required

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "All notifications marked as read",
  "timestamp": "string"
}
```

---

## 12. Error Handling

### 12.1 Standard Error Response Format

All errors follow this structure:

```json
{
  "success": false,
  "error": {
    "code": "string (ERROR_CODE in UPPER_SNAKE_CASE)",
    "message": "string (user-friendly error message)",
    "details": "array or object (additional error information, e.g., validation errors)"
  },
  "timestamp": "string (ISO 8601 datetime)"
}
```

### 12.2 HTTP Status Codes

| Status Code | Meaning | Usage |
|-------------|---------|-------|
| 200 OK | Success | Successful GET, PUT, PATCH requests |
| 201 Created | Created | Successful POST requests that create new resources |
| 204 No Content | No Content | Successful DELETE requests |
| 400 Bad Request | Bad Request | Malformed request, invalid JSON |
| 401 Unauthorized | Unauthorized | Missing or invalid authentication token |
| 403 Forbidden | Forbidden | User lacks permission to perform action |
| 404 Not Found | Not Found | Resource does not exist |
| 409 Conflict | Conflict | Resource conflict (e.g., booking conflict, duplicate entry) |
| 422 Unprocessable Entity | Validation Error | Request validation failed |
| 429 Too Many Requests | Rate Limit | Rate limit exceeded |
| 500 Internal Server Error | Server Error | Unexpected server error |

### 12.3 Error Codes

| Error Code | HTTP Status | Description |
|------------|-------------|-------------|
| `INVALID_CREDENTIALS` | 401 | Invalid username or password |
| `UNAUTHENTICATED` | 401 | Missing or invalid auth token |
| `TOKEN_EXPIRED` | 401 | Auth token has expired |
| `FORBIDDEN` | 403 | User lacks permission |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource conflict (duplicate, booking overlap) |
| `VALIDATION_ERROR` | 422 | Request validation failed |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `SERVER_ERROR` | 500 | Internal server error |

---

## 13. Pagination

### 13.1 Pagination Format

All list endpoints support pagination:

**Request Query Parameters**:
- `page` (integer, optional, default: 1): Page number (1-indexed)
- `per_page` (integer, optional, default: 20, max: 100): Items per page

**Response Pagination Object**:
```json
{
  "pagination": {
    "page": "number (current page)",
    "per_page": "number (items per page)",
    "total": "number (total items across all pages)",
    "total_pages": "number (total number of pages)"
  }
}
```

---

## 14. Rate Limiting

### 14.1 Rate Limit Policy

| Endpoint Category | Limit | Window |
|-------------------|-------|--------|
| Authentication (`/api/auth/login`) | 5 requests | per minute per IP |
| Password Reset (`/api/auth/password/forgot`) | 3 requests | per 15 minutes per email |
| Registration (`/api/auth/register`) | 10 requests | per hour per IP |
| General API | 60 requests | per minute per user |

**Rate Limit Headers** (included in response):
- `X-RateLimit-Limit`: Total allowed requests
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Unix timestamp when limit resets

**Rate Limit Exceeded Response (429)**:
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "details": {
      "retry_after": "number (seconds until retry allowed)"
    }
  },
  "timestamp": "string"
}
```

---

## 15. Versioning

### 15.1 API Versioning Strategy

**Decision** (resolves OQ-02): [TBD]

**Option A**: Version in URL (`/api/v1/...`)
- Pro: Clear versioning, easy to support multiple versions
- Con: URL clutter, requires routing configuration

**Option B**: No versioning initially, add when needed
- Pro: Simpler URLs, faster initial development
- Con: Breaking changes harder to manage

**Recommendation**: Start without versioning (`/api/...`) for MVP 1, add `/api/v2/` when breaking changes needed.

---

## 16. Additional Endpoints (TBD)

The following endpoints are planned but not yet detailed:

### 16.1 Organizational Features
- `GET /api/organizational-structure`
- `POST /api/organizational-structure`
- `GET /api/jobdesks`
- `POST /api/jobdesks`

### 16.2 Customer Requests
- `GET /api/customer-requests`
- `POST /api/customer-requests`
- `PUT /api/customer-requests/{id}`

### 16.3 Form Management
- `GET /api/forms`
- `POST /api/forms`
- `GET /api/forms/{id}/submissions`

### 16.4 Reports
- `GET /api/reports/audit-log`
- `GET /api/reports/work-orders`
- `GET /api/reports/compliance`

---

## 17. Acceptance Criteria

- [ ] All FSD functional requirements have corresponding API endpoints
- [ ] All ERD entities accessible via API (CRUD operations)
- [ ] Request/response schemas documented with field types and validation rules
- [ ] Error handling consistent across all endpoints
- [ ] Authentication and authorization requirements specified
- [ ] Pagination supported on all list endpoints
- [ ] Backend lead confirms feasibility with Laravel
- [ ] Frontend lead confirms API meets React development needs

---

## 18. Open Questions

| ID | Question | Owner | Resolution |
|----|----------|-------|------------|
| OQ-02 | API versioning: `/api/v1/...` from start or defer? | Tech Lead | [TBD] |
| API-01 | Include `can_edit`, `can_delete` permission flags in entity responses? | Backend Lead | [TBD] |
| API-02 | Soft delete: include `deleted_at` in responses or hide deleted entities? | Backend Lead | [TBD] |
| API-03 | File storage: Laravel local disk initially or S3 from start? | DevOps Lead | [TBD] |
| API-04 | Token expiration: 24 hours or shorter? Refresh token rotation? | Security Lead | [TBD] |
| API-05 | Booking cancellation: hard delete or status update? | Product Owner | [TBD] |

---

**Document Status**: 🟡 TEMPLATE - Awaiting content population  
**Next Steps**: Review template structure, resolve open questions, complete remaining endpoint documentation  
**Estimated Completion**: [TBD based on FSD and ERD completion]
