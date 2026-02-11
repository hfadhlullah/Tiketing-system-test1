# Tasks: Create MVP Documentation Suite

## Change ID
`create-mvp-documentation-suite`

## Overview
This task list outlines the ordered, verifiable work items required to create the complete documentation suite (FSD, ERD, API Contract, UI Wireframes, TDD-Lite, Epics, Stories) for Difan-DIOS MVP 1. Tasks are sequenced according to document dependencies (AGENTS.md Section 20) and organized to enable incremental validation and parallel work where possible.

---

## Phase 1: Foundation Documents (Sequential - Required First)

### Task 1: Create Functional Specification Document (FSD)
**File**: `prompter/difan-dios/fsd.md`

**Dependencies**: PRD must exist ✅  
**Estimated Effort**: 2-3 days  
**Assignee**: TBD  
**Priority**: 🔴 Critical (Blocks all subsequent documents)

**Subtasks**:
- [ ] 1.1. Review PRD user stories US-01 through US-25 and baseline specs (16 capabilities)
- [ ] 1.2. Create FSD document structure using template
- [ ] 1.3. Document authentication & authorization functional requirements (US-01 to US-04, AUTH-001 to AUTH-008, AUTHZ-001 to AUTHZ-008)
  - Login/logout behavior, session management, account lockout
  - RBAC model (8 roles: Admin, Quality Manager, Dept Head, Doc Controller, Approver, Staff, Auditor, Guest)
  - Permission matrix per role and module
- [ ] 1.4. Document document management functional requirements (US-05 to US-09, SOP-001 to SOP-010, POLICY-001 to POLICY-003, etc.)
  - CRUD operations for all 5 document types
  - Document lifecycle state machine (Draft → Submitted → In Review → Approved → Published → Archived)
  - Validation rules (required fields, format constraints, date validation)
  - Version control behavior
- [ ] 1.5. Document approval workflow functional requirements (US-10 to US-14)
  - Multi-level approval flow (configurable 1-5 levels)
  - Approval delegation logic
  - Rejection and feedback workflows
  - Escalation rules (reminder emails at 3, 5, 7 days; escalation at 10 days)
- [ ] 1.6. Document work order management functional requirements (US-15 to US-17, WO-001 to WO-012)
  - Work order status workflow (New → Assigned → In Progress → On Hold → Review → Completed → Closed/Cancelled)
  - Priority levels (Low, Medium, High, Critical) and visual indicators
  - Assignment and reassignment logic
- [ ] 1.7. Document meeting room booking functional requirements (US-18 to US-20, BOOKING-001 to BOOKING-004)
  - Booking conflict detection algorithm
  - Cancellation policy (deadline enforcement)
  - Room availability calculation
- [ ] 1.8. Document dashboard & analytics functional requirements (US-21 to US-23)
  - Role-specific widget configuration
  - Real-time data refresh intervals
  - Compliance report generation logic
- [ ] 1.9. Document audit & compliance functional requirements (US-24 to US-25, AUDIT-001 to AUDIT-008)
  - Audit event types to log (authentication, data changes, workflow events)
  - Immutability enforcement
  - Retention policies (7 years critical, 1 year operational)
- [ ] 1.10. Document search & filtering functional requirements
  - Full-text search behavior (MySQL full-text initially)
  - Advanced filter combinations
  - Export functionality (PDF, Excel)
- [ ] 1.11. Document error handling and edge cases
  - Validation error formats and messages
  - Concurrent edit conflict resolution (last-save-wins with warning)
  - File upload errors (size limit, virus detection, unsupported format)
  - Network failure recovery
- [ ] 1.12. Cross-reference all PRD user stories to FSD sections (traceability matrix)
- [ ] 1.13. Review FSD with product owner and tech lead
- [ ] 1.14. Incorporate feedback and finalize FSD

**Validation Criteria**:
- ✅ All 25 PRD user stories mapped to FSD requirements
- ✅ All 76 baseline spec requirements incorporated into FSD
- ✅ Business rules documented with concrete examples
- ✅ State machines defined for all workflows
- ✅ Validation rules specified with error messages
- ✅ Product owner approves FSD

**Deliverable**: `prompter/difan-dios/fsd.md` (estimated 80-100 pages)

---

### Task 2: Create Entity Relationship Diagram (ERD)
**File**: `prompter/difan-dios/erd.md`

**Dependencies**: FSD must be complete ✅  
**Estimated Effort**: 1-2 days  
**Assignee**: TBD  
**Priority**: 🔴 Critical (Blocks API Contract, Wireframes, TDD-Lite)

**Subtasks**:
- [ ] 2.1. Review FSD data requirements and identify 20+ entities
- [ ] 2.2. Create ERD document structure with Mermaid ER diagram
- [ ] 2.3. Define core entities and fields:
  - **User** (id, username, email, password_hash, full_name, role_id FK, department_id FK, is_active, created_at, updated_at, last_login)
  - **Role** (id, name, description, permissions JSON)
  - **Department** (id, name, code, parent_id FK, head_user_id FK)
  - Resolve OQ-01: Decide soft-delete strategy
- [ ] 2.4. Define document entities and fields:
  - **Document** (base table: id, document_number, title, description, category, department_id FK, created_by FK, status, version, effective_date, review_date, file_path, created_at, updated_at, deleted_at)
  - **SOP** (extends Document: sop_number, scope, procedure_steps JSON, responsible_party, related_forms JSON)
  - **Policy** (extends Document: policy_number, policy_type, compliance_framework)
  - **WorkInstruction**, **QualityManual**, **ApplicationGuide** (similar extensions)
  - Decision: Single-table inheritance vs. polymorphic relations vs. separate tables
- [ ] 2.5. Define workflow entities and fields:
  - **Approval** (id, document_id FK, approver_id FK, approval_level INT, status ENUM, comments TEXT, action_date)
  - **ApprovalLevel** (id, document_type, level, role_id FK)
  - **WorkflowConfiguration** (id, document_type, levels JSON, mode ENUM [sequential/parallel])
- [ ] 2.6. Define operational entities and fields:
  - **WorkOrder** (id, wo_number, title, description, priority ENUM, assigned_to FK, created_by FK, department_id FK, due_date, status ENUM, created_at, updated_at, completed_at)
  - **MeetingRoom** (id, name, location, capacity, facilities JSON, is_active)
  - **Booking** (id, room_id FK, booked_by FK, title, description, start_time, end_time, attendees_count, status ENUM, created_at)
  - **CustomerRequest**, **Form**, **Jobdesk**, **OrganizationalStructure** (similar definitions)
- [ ] 2.7. Define audit and versioning entities:
  - **AuditLog** (id, entity_type, entity_id, action, user_id FK, old_value JSON, new_value JSON, timestamp, ip_address)
  - **DocumentVersion** (id, document_id FK, version, content, created_by FK, created_at)
  - **Notification** (id, user_id FK, type, title, message, is_read, read_at, created_at)
- [ ] 2.8. Define relationships with cardinality:
  - User → Department (Many-to-One)
  - User → Role (Many-to-One)
  - Document → User/creator (Many-to-One)
  - Document → Department (Many-to-One)
  - Approval → Document (Many-to-One)
  - Approval → User/approver (Many-to-One)
  - WorkOrder → User/assigned (Many-to-One)
  - Booking → MeetingRoom (Many-to-One)
  - AuditLog → User (Many-to-One)
- [ ] 2.9. Define indexes for performance:
  - Primary keys on all entities
  - Foreign keys with indexes
  - Full-text indexes on Document.title, Document.description
  - Indexes on Document.status, Document.effective_date, WorkOrder.status
- [ ] 2.10. Document constraints:
  - NOT NULL constraints on required fields
  - UNIQUE constraints (User.username, User.email, Document.document_number)
  - CHECK constraints (priority ENUM, status ENUM)
  - DEFAULT values (timestamps, status defaults)
- [ ] 2.11. Document soft-delete pattern (deleted_at column on applicable entities)
- [ ] 2.12. Create Mermaid ER diagram visualizing all entities and relationships
- [ ] 2.13. Review ERD with database administrator and tech lead
- [ ] 2.14. Validate ERD against FSD requirements (ensure all data needs covered)
- [ ] 2.15. Incorporate feedback and finalize ERD

**Validation Criteria**:
- ✅ All FSD data requirements represented in ERD
- ✅ All relationships defined with cardinality
- ✅ All fields have data types, nullability, constraints
- ✅ Indexes defined for query performance
- ✅ Database administrator approves schema (no normalization issues)
- ✅ Aligns with Laravel Eloquent ORM conventions

**Deliverable**: `prompter/difan-dios/erd.md` (estimated 40-50 pages with Mermaid diagram)

---

## Phase 2: Interface Documents (Can Parallelize After ERD Complete)

### Task 3: Create API Contract
**File**: `prompter/difan-dios/api-contract.md`

**Dependencies**: FSD ✅, ERD ✅  
**Estimated Effort**: 2-3 days  
**Assignee**: TBD  
**Priority**: 🔴 Critical (Enables parallel frontend/backend development)

**Subtasks**:
- [ ] 3.1. Review FSD functional requirements and ERD entities
- [ ] 3.2. Resolve OQ-02: Decide API versioning strategy (/api/v1/... or defer)
- [ ] 3.3. Create API Contract document structure
- [ ] 3.4. Define authentication endpoints:
  - `POST /api/auth/login` (request: {username, password}, response: {token, user})
  - `POST /api/auth/logout` (request: {token}, response: {success})
  - `POST /api/auth/refresh` (request: {token}, response: {new_token})
  - `POST /api/auth/password/forgot` (request: {email}, response: {success})
  - `POST /api/auth/password/reset` (request: {token, password}, response: {success})
- [ ] 3.5. Define user management endpoints:
  - `GET /api/users` (response: paginated user list)
  - `POST /api/users` (request: user data, response: created user)
  - `GET /api/users/{id}` (response: user details)
  - `PUT /api/users/{id}` (request: updated user data, response: updated user)
  - `DELETE /api/users/{id}` (response: {success})
  - `GET /api/users/{id}/roles` (response: user's roles)
- [ ] 3.6. Define document management endpoints (for each type: SOPs, Policies, WorkInstructions, QualityManuals, ApplicationGuides):
  - `GET /api/sops` (query params: status, department, category; response: paginated list)
  - `POST /api/sops` (request: SOP data, response: created SOP)
  - `GET /api/sops/{id}` (response: SOP details with version history)
  - `PUT /api/sops/{id}` (request: updated SOP data, response: updated SOP)
  - `DELETE /api/sops/{id}` (soft delete, response: {success})
  - `POST /api/sops/{id}/submit` (request: empty, response: updated SOP with status "submitted")
  - `POST /api/sops/{id}/publish` (request: empty, response: updated SOP with status "published")
  - `POST /api/sops/{id}/archive` (request: {reason}, response: archived SOP)
  - `GET /api/sops/{id}/versions` (response: version list)
  - `GET /api/sops/{id}/versions/{version}` (response: specific version content)
  - Similar endpoints for policies, work-instructions, quality-manuals, application-guides
- [ ] 3.7. Define approval workflow endpoints:
  - `GET /api/approvals` (query params: status, document_type; response: pending approvals for current user)
  - `POST /api/approvals` (request: {document_id, approver_id, level}, response: created approval)
  - `GET /api/approvals/{id}` (response: approval details)
  - `POST /api/approvals/{id}/approve` (request: {comments}, response: updated approval)
  - `POST /api/approvals/{id}/reject` (request: {comments}, response: updated approval)
  - `POST /api/approvals/{id}/delegate` (request: {delegate_user_id}, response: updated approval)
- [ ] 3.8. Define work order endpoints:
  - `GET /api/work-orders` (query params: status, assigned_to, priority; response: paginated list)
  - `POST /api/work-orders` (request: WO data, response: created WO)
  - `GET /api/work-orders/{id}` (response: WO details with comments)
  - `PUT /api/work-orders/{id}` (request: updated WO data, response: updated WO)
  - `POST /api/work-orders/{id}/assign` (request: {assigned_to}, response: updated WO)
  - `POST /api/work-orders/{id}/status` (request: {status, comment}, response: updated WO)
  - `POST /api/work-orders/{id}/complete` (request: {completion_notes}, response: completed WO)
  - `POST /api/work-orders/{id}/close` (request: empty, response: closed WO)
  - `POST /api/work-orders/{id}/cancel` (request: {reason}, response: cancelled WO)
  - `POST /api/work-orders/{id}/comments` (request: {comment}, response: added comment)
  - `POST /api/work-orders/{id}/attachments` (request: multipart file, response: uploaded file)
- [ ] 3.9. Define meeting room booking endpoints:
  - `GET /api/meeting-rooms` (response: list of active rooms)
  - `GET /api/meeting-rooms/{id}/availability` (query params: start_date, end_date; response: available time slots)
  - `POST /api/bookings` (request: booking data, response: created booking or conflict error)
  - `GET /api/bookings` (query params: room_id, date; response: bookings list)
  - `GET /api/bookings/{id}` (response: booking details)
  - `PUT /api/bookings/{id}` (request: updated booking data with conflict check, response: updated booking)
  - `DELETE /api/bookings/{id}` (cancellation, response: {success})
- [ ] 3.10. Define search and filtering endpoints:
  - `GET /api/search` (query params: q, type, department, status; response: mixed results)
  - `GET /api/search/advanced` (query params: filters JSON; response: filtered results)
- [ ] 3.11. Define dashboard and analytics endpoints:
  - `GET /api/dashboard` (response: role-specific widgets data)
  - `GET /api/analytics/compliance` (response: compliance metrics)
  - `GET /api/analytics/work-orders` (query params: date_range; response: WO metrics)
  - `GET /api/reports/audit-log` (query params: filters; response: audit log excerpt)
- [ ] 3.12. Define file upload endpoints:
  - `POST /api/files/upload` (request: multipart file, response: {file_id, url})
  - `GET /api/files/{id}/download` (response: file stream)
  - `DELETE /api/files/{id}` (response: {success})
- [ ] 3.13. Define notification endpoints:
  - `GET /api/notifications` (response: user's notifications)
  - `POST /api/notifications/{id}/read` (response: marked read)
  - `POST /api/notifications/mark-all-read` (response: {success})
- [ ] 3.14. Document request/response schemas for all endpoints (JSON format):
  - Field names, types, required/optional, validation rules
  - Nested objects and arrays
  - Example payloads
- [ ] 3.15. Document authentication requirements:
  - Which endpoints require authentication (all except login/password-reset)
  - Laravel Sanctum token in `Authorization: Bearer <token>` header
  - Token expiration and refresh mechanism
- [ ] 3.16. Document error response formats:
  - 400 Bad Request: {error: {code, message, details: [{field, message}]}}
  - 401 Unauthorized: {error: {code: "UNAUTHENTICATED", message}}
  - 403 Forbidden: {error: {code: "FORBIDDEN", message}}
  - 404 Not Found: {error: {code: "NOT_FOUND", message}}
  - 409 Conflict: {error: {code: "CONFLICT", message, details}}
  - 422 Unprocessable Entity: {error: {code: "VALIDATION_ERROR", message, details: [{field, message}]}}
  - 500 Internal Server Error: {error: {code: "SERVER_ERROR", message}}
- [ ] 3.17. Document pagination format:
  - Request: query params `page`, `per_page`
  - Response: {data: [...], pagination: {page, per_page, total, total_pages}}
- [ ] 3.18. Document rate limiting specifications (e.g., 60 requests/minute per user)
- [ ] 3.19. Review API Contract with backend lead (validate Laravel conventions)
- [ ] 3.20. Review API Contract with frontend lead (validate frontend needs)
- [ ] 3.21. Incorporate feedback and finalize API Contract

**Validation Criteria**:
- ✅ All FSD functional requirements have corresponding API endpoints
- ✅ All ERD entities accessible via API
- ✅ Request/response schemas documented with examples
- ✅ Error handling consistent across endpoints
- ✅ Authentication and authorization requirements clear
- ✅ Backend lead confirms feasibility with Laravel
- ✅ Frontend lead confirms sufficiency for React development

**Deliverable**: `prompter/difan-dios/api-contract.md` (estimated 60-80 pages)

---

### Task 4: Create UI Wireframes
**File**: `prompter/difan-dios/ui-wireframes.md`

**Dependencies**: FSD ✅, ERD ✅, API Contract ✅ (for data flow understanding)  
**Estimated Effort**: 2-3 days  
**Assignee**: TBD  
**Priority**: 🟡 High (Guides React component development)

**Subtasks**:
- [ ] 4.1. Review existing templates in `template/` directory (reference current UI)
- [ ] 4.2. Review FSD user flows and API Contract endpoints
- [ ] 4.3. Resolve OQ-03: Decide wireframe format (ASCII, Mermaid, Excalidraw)
- [ ] 4.4. Create UI Wireframes document structure
- [ ] 4.5. Document global layout structure:
  - Header (logo, search, notifications, profile dropdown)
  - Sidebar (collapsible navigation menu, role-based menu items)
  - Main content area (breadcrumbs, page title, content, pagination)
  - Footer (optional)
- [ ] 4.6. Document authentication screens (US-01 to US-03):
  - Login page (username, password, remember me, forgot password link)
  - Password reset request page (email input)
  - Password reset page (new password, confirm password)
  - Registration page (if applicable - not in MVP 1 scope)
- [ ] 4.7. Document dashboard screen (US-21):
  - Role-specific widget layouts
  - Widget types: pending approvals count, recent documents, work orders assigned, upcoming bookings
  - Responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)
- [ ] 4.8. Document document management screens (US-05 to US-09):
  - Document list page (DataTable with filters, search, pagination; action buttons: Add, Export)
  - Document create/edit form (rich text editor for content, file upload, metadata fields)
  - Document detail view (read-only display, version history tab, actions: Edit, Submit, Archive)
  - Version history modal (list of versions with diff view)
  - Archive confirmation modal
- [ ] 4.9. Document approval workflow screens (US-10 to US-14):
  - Pending approvals dashboard (table with document title, submitter, date, actions)
  - Approval review modal (document preview, comment textarea, Approve/Reject buttons)
  - Approval history timeline (visual representation of approval flow)
- [ ] 4.10. Document work order screens (US-15 to US-17):
  - Work order list page (filters by status, assignee, priority; Kanban board option)
  - Work order create/edit form (title, description, priority dropdown, assignee select, due date picker)
  - Work order detail page (status timeline, comments section, file attachments, status action buttons)
  - Work order reports page (KPI cards, charts, filter controls)
- [ ] 4.11. Document meeting room booking screens (US-18 to US-20):
  - Meeting room calendar (FullCalendar view with room filter, time slot selection)
  - Booking form modal (room select, date/time pickers, title, attendees, description)
  - My bookings page (upcoming bookings table with Edit/Cancel actions)
  - Room management page (admin only - add/edit/disable rooms)
- [ ] 4.12. Document search interface:
  - Global search bar in header (autocomplete suggestions)
  - Advanced search page (filters, faceted search)
  - Search results page (mixed results with type badges, relevance sorting)
- [ ] 4.13. Document settings and configuration screens:
  - User profile page (edit name, email, password change)
  - System settings page (admin only - workflow config, notification settings)
  - User management page (admin only - user list, add/edit users, role assignment)
- [ ] 4.14. Document organizational screens:
  - Organizational structure page (tree view or org chart)
  - Jobdesk management page (job description CRUD)
  - Customer request page (request list, create/edit form)
  - Form management page (dynamic form builder if MVP 1 scope)
- [ ] 4.15. Document component specifications:
  - Forms (field types, validation feedback, submit/cancel buttons)
  - Tables (sortable columns, pagination controls, row actions)
  - Modals (header, body, footer with buttons)
  - Navigation (sidebar menu items, breadcrumbs)
  - Notifications (toast messages, in-app notification panel)
- [ ] 4.16. Document responsive behavior:
  - Breakpoints (desktop ≥1024px, tablet 768-1023px, mobile <768px)
  - Sidebar collapse behavior (toggle menu on mobile)
  - Table responsive patterns (horizontal scroll, condensed columns, card view on mobile)
  - Form layout adaptations (single-column on mobile)
- [ ] 4.17. Document interaction patterns:
  - Click/tap actions (button clicks, row selection)
  - Hover states (tooltips, button highlights)
  - Drag-and-drop (file upload, sortable lists)
  - Keyboard navigation (tab order, shortcuts)
- [ ] 4.18. Document error states and loading indicators:
  - Form validation error display (red text below field, field border highlight)
  - Empty state displays ("No documents found" message)
  - Loading spinners (page load, form submit, table data load)
  - Error pages (404, 403, 500)
- [ ] 4.19. Reference existing templates:
  - Map `template/index.html` to dashboard wireframe
  - Map `template/sop.html` to document list wireframe
  - Map `template/add-sop.html` to document create wireframe
  - Map `template/work-order.html` to work order list wireframe
  - Map `template/booking-meeting-room.html` to booking wireframe
  - Note differences for React implementation
- [ ] 4.20. Create navigation flow diagrams (login → dashboard → module → detail → back)
- [ ] 4.21. Review wireframes with frontend lead (validate React component feasibility)
- [ ] 4.22. Review wireframes with UX designer (if available) or product owner
- [ ] 4.23. Incorporate feedback and finalize wireframes

**Validation Criteria**:
- ✅ All 25 PRD user stories have corresponding screen wireframes
- ✅ All API Contract endpoints have UI representation
- ✅ Responsive behavior documented for all screens
- ✅ Component patterns specified for reuse
- ✅ Wireframes align with existing templates (intentional divergences noted)
- ✅ Frontend lead approves wireframes
- ✅ Navigation flows clear and complete

**Deliverable**: `prompter/difan-dios/ui-wireframes.md` (estimated 60-80 pages with diagrams)

---

## Phase 3: Implementation Guidance Documents

### Task 5: Create Technical Design Document (TDD-Lite)
**File**: `prompter/difan-dios/tdd-lite.md`

**Dependencies**: FSD ✅, ERD ✅, API Contract ✅, UI Wireframes ✅  
**Estimated Effort**: 1-2 days  
**Assignee**: TBD  
**Priority**: 🟡 High (Guides implementation patterns)

**Subtasks**:
- [ ] 5.1. Review existing architecture design.md from archived baseline-specs change
- [ ] 5.2. Review FSD, ERD, API Contract, UI Wireframes for implementation challenges
- [ ] 5.3. Resolve OQ-04: Decide if performance benchmarks belong in TDD-Lite or separate spec
- [ ] 5.4. Create TDD-Lite document structure
- [ ] 5.5. Document multi-level approval workflow implementation:
  - State machine design (states, transitions, guards)
  - Database queries for approval chain (determine next approver)
  - Email notification triggering logic
  - Escalation timer implementation (cron job or queue)
- [ ] 5.6. Document document version control implementation:
  - Version numbering strategy (semantic versioning or sequential)
  - Copy-on-edit pattern (when to create new version)
  - Diff algorithm for version comparison (library selection)
  - Storage strategy (full copy vs. delta storage)
- [ ] 5.7. Document file upload and storage implementation:
  - Laravel Storage facade usage (local disk initially)
  - File validation (MIME type check, size limit, virus scan integration)
  - S3 migration path (configuration, driver switch)
  - Secure file download (authenticated URLs, pre-signed URLs)
- [ ] 5.8. Document search implementation:
  - MySQL full-text search setup (indexes, MATCH AGAINST queries)
  - Advanced filter query building (Eloquent scopes)
  - Migration path to Elasticsearch (when to consider, integration approach)
  - Search result ranking and highlighting
- [ ] 5.9. Document background job processing:
  - Laravel Queue setup (database driver initially)
  - Job types: email sending, report generation, reminders
  - Retry logic and failure handling
  - Redis queue migration (when volume increases)
- [ ] 5.10. Document caching strategy:
  - Query result caching (frequently accessed data)
  - Session storage (database vs. Redis)
  - Cache invalidation patterns (on data updates)
- [ ] 5.11. Document Laravel-specific patterns:
  - Middleware for authentication (Laravel Sanctum middleware)
  - Middleware for authorization (role/permission checks)
  - Eloquent relationship definitions (HasMany, BelongsTo, ManyToMany, Polymorphic)
  - Model event listeners (creating, updating, deleting hooks for audit logging)
  - Form request validation classes (custom validation rules)
  - Policy classes for authorization (per-entity permission checks)
  - Resource classes for API response formatting
- [ ] 5.12. Document React-specific patterns:
  - Component architecture (container/presentational separation)
  - State management decision (Context API for global auth, local state for forms; Redux if complexity grows)
  - Form handling (React Hook Form for validation, controlled components)
  - API integration layer (Axios instance with interceptors for auth headers, error handling)
  - Routing (React Router with route guards for authentication)
  - Code splitting (Vite lazy loading for module routes)
- [ ] 5.13. Document database query optimization:
  - Eager loading relationships (avoid N+1 queries)
  - Index strategy (covered in ERD, reinforce usage patterns)
  - Query result pagination (Eloquent paginate() method)
- [ ] 5.14. Document security implementation:
  - CSRF token inclusion in forms (Laravel Blade / React meta tag)
  - XSS prevention (input sanitization, output encoding, React's JSX escaping)
  - SQL injection prevention (Eloquent parameterized queries, never raw SQL with user input)
  - File upload virus scanning (ClamAV integration or cloud service API)
  - Rate limiting (Laravel throttle middleware)
- [ ] 5.15. Document error handling patterns:
  - Backend exception handling (try-catch, custom exception classes, HTTP response codes)
  - Frontend error boundaries (React error boundary component)
  - User-facing error messages (translate technical errors to friendly messages)
  - Error logging (Laravel log channels, integration with Sentry or similar)
- [ ] 5.16. Document testing patterns:
  - Backend unit tests (PHPUnit for models, services)
  - Backend integration tests (Laravel HTTP tests for API endpoints)
  - Frontend unit tests (Jest for React components)
  - E2E tests (Playwright for critical user journeys)
- [ ] 5.17. Reference existing design.md from baseline-specs for high-level architecture decisions
- [ ] 5.18. Review TDD-Lite with backend lead (validate Laravel patterns)
- [ ] 5.19. Review TDD-Lite with frontend lead (validate React patterns)
- [ ] 5.20. Incorporate feedback and finalize TDD-Lite

**Validation Criteria**:
- ✅ Implementation guidance provided for all key technical challenges
- ✅ Laravel and React patterns documented with examples
- ✅ Security implementation patterns specified
- ✅ Performance optimization strategies included
- ✅ Backend and frontend leads approve patterns
- ✅ Aligns with architecture decisions in baseline design.md

**Deliverable**: `prompter/difan-dios/tdd-lite.md` (estimated 40-50 pages)

---

## Phase 4: Work Breakdown Documents

### Task 6: Create Epics
**File**: `prompter/difan-dios/epics.md`

**Dependencies**: FSD ✅, TDD-Lite ✅  
**Estimated Effort**: 0.5 days  
**Assignee**: TBD  
**Priority**: 🟢 Medium (Required for sprint planning)

**Subtasks**:
- [ ] 6.1. Review FSD and TDD-Lite for feature groupings
- [ ] 6.2. Resolve OQ-05: Confirm which PRD user stories deferred to Phase 2
- [ ] 6.3. Resolve OQ-06: Decide if infrastructure setup included in Epics
- [ ] 6.4. Create Epics document structure
- [ ] 6.5. Define Epic 1: User Authentication & Authorization System
  - Features: Login, logout, password reset, session management, account lockout
  - User stories: US-01, US-02, US-03, US-04
  - Estimated effort: 2-3 sprints
- [ ] 6.6. Define Epic 2: Document Management Core (CRUD Operations)
  - Features: Create, edit, delete, view documents for all 5 types
  - User stories: US-05, US-08
  - Estimated effort: 3-4 sprints
- [ ] 6.7. Define Epic 3: Multi-Level Approval Workflow Engine
  - Features: Submit for approval, multi-level approval, rejection, delegation
  - User stories: US-10, US-11, US-12, US-13, US-14
  - Estimated effort: 4-5 sprints
- [ ] 6.8. Define Epic 4: Document Versioning & Archival
  - Features: Version control, version history, version comparison, archival
  - User stories: US-08, US-09
  - Estimated effort: 2 sprints
- [ ] 6.9. Define Epic 5: Work Order Management System
  - Features: Create, assign, track, complete, close work orders
  - User stories: US-15, US-16, US-17
  - Estimated effort: 3 sprints
- [ ] 6.10. Define Epic 6: Meeting Room Booking System
  - Features: View availability, book room, edit/cancel booking
  - User stories: US-18, US-19, US-20
  - Estimated effort: 2 sprints
- [ ] 6.11. Define Epic 7: Search & Filtering Infrastructure
  - Features: Global search, advanced search, filtering across modules
  - User stories: US-06
  - Estimated effort: 2 sprints
- [ ] 6.12. Define Epic 8: Audit Logging & Compliance Reporting
  - Features: Audit trail, compliance dashboard, reports
  - User stories: US-24, US-25
  - Estimated effort: 2 sprints
- [ ] 6.13. Define Epic 9: Notification System (Email + In-App)
  - Features: Email notifications, in-app notifications, notification preferences
  - User stories: US-12 (partial)
  - Estimated effort: 2 sprints
- [ ] 6.14. Define Epic 10: Dashboard & Analytics
  - Features: Role-specific dashboards, metrics, KPIs
  - User stories: US-21, US-22, US-23
  - Estimated effort: 2-3 sprints
- [ ] 6.15. Define Epic 11: File Upload & Storage Management
  - Features: File upload, virus scanning, secure download, storage management
  - User stories: US-07
  - Estimated effort: 1-2 sprints
- [ ] 6.16. Define Epic 12: React Frontend Migration (Core Components)
  - Features: Migrate jQuery templates to React components
  - Deliverables: Shared components library, routing setup, API integration layer
  - Estimated effort: 4-5 sprints (parallel with backend development)
- [ ] 6.17. Define Epic 13: Mobile Responsiveness Optimization
  - Features: Responsive layouts, mobile-friendly forms, touch interactions
  - Estimated effort: 2 sprints
- [ ] 6.18. (Optional) Define Epic 14: Infrastructure Setup & CI/CD
  - Features: Development environment, staging environment, CI/CD pipeline, monitoring
  - Estimated effort: 1-2 sprints
- [ ] 6.19. Document dependencies between epics:
  - Epic 1 (Auth) → Blocks all others (authentication required for all features)
  - Epic 2 (Document CRUD) → Required before Epic 3 (Approval Workflow)
  - Epic 11 (File Upload) → Required for Epic 2 (Document Management)
  - Epic 9 (Notifications) → Triggered by Epic 3 (Approval Workflow)
- [ ] 6.20. Prioritize epics for MVP 1 (Phase 1) vs. Phase 2
- [ ] 6.21. Review epics with product owner (validate priority and scope)
- [ ] 6.22. Incorporate feedback and finalize epics

**Validation Criteria**:
- ✅ All PRD user stories mapped to epics
- ✅ Epic scope clear and releasable
- ✅ Dependencies between epics documented
- ✅ Effort estimates provided (rough order of magnitude)
- ✅ Product owner approves epic breakdown

**Deliverable**: `prompter/difan-dios/epics.md` (estimated 15-20 pages)

---

### Task 7: Create Stories
**File**: `prompter/difan-dios/stories.md`

**Dependencies**: FSD ✅, ERD ✅, API Contract ✅, UI Wireframes ✅, TDD-Lite ✅, Epics ✅  
**Estimated Effort**: 1-2 days  
**Assignee**: TBD  
**Priority**: 🟢 Medium (Required for sprint planning and task assignment)

**Subtasks**:
- [ ] 7.1. Review all upstream documents (FSD, ERD, API Contract, UI Wireframes, TDD-Lite, Epics)
- [ ] 7.2. Create Stories document structure (organized by Epic)
- [ ] 7.3. Break down Epic 1 (Authentication) into stories:
  - Story 1.1: Implement User model and migration
  - Story 1.2: Implement POST /api/auth/login endpoint with Sanctum token generation
  - Story 1.3: Implement session timeout middleware (30 min inactivity)
  - Story 1.4: Implement account lockout logic (5 failed attempts)
  - Story 1.5: Create Login React component with form validation
  - Story 1.6: Implement POST /api/auth/logout endpoint
  - Story 1.7: Implement password reset request flow (email sending)
  - Story 1.8: Implement password reset confirmation flow
  - Story 1.9: Create audit log entries for login/logout events
  - Story 1.10: Write unit tests for authentication service
  - Story 1.11: Write E2E tests for login flow
  - (Estimated: 10-15 stories)
- [ ] 7.4. Break down Epic 2 (Document CRUD) into stories:
  - Story 2.1: Implement Document base model and migration
  - Story 2.2: Implement SOP model extending Document
  - Story 2.3: Implement GET /api/sops endpoint with pagination
  - Story 2.4: Implement POST /api/sops endpoint with validation
  - Story 2.5: Implement GET /api/sops/{id} endpoint
  - Story 2.6: Implement PUT /api/sops/{id} endpoint
  - Story 2.7: Implement DELETE /api/sops/{id} endpoint (soft delete)
  - Story 2.8: Create SOP List React component with DataTable
  - Story 2.9: Create SOP Create/Edit Form React component with Quill editor
  - Story 2.10: Create SOP Detail View React component
  - Story 2.11: Implement file attachment upload for SOPs
  - Story 2.12: Implement document status state machine
  - Story 2.13: Write unit tests for SOP model and API
  - Story 2.14: Repeat stories 2.2-2.13 for Policy, WorkInstruction, QualityManual, ApplicationGuide
  - (Estimated: 50-60 stories for all document types)
- [ ] 7.5. Break down Epic 3 (Approval Workflow) into stories:
  - Story 3.1: Implement Approval model and migration
  - Story 3.2: Implement ApprovalLevel configuration
  - Story 3.3: Implement POST /api/sops/{id}/submit endpoint (create approval records)
  - Story 3.4: Implement GET /api/approvals endpoint (pending approvals for user)
  - Story 3.5: Implement POST /api/approvals/{id}/approve endpoint
  - Story 3.6: Implement POST /api/approvals/{id}/reject endpoint
  - Story 3.7: Implement approval workflow state machine (level progression)
  - Story 3.8: Implement email notification on approval request
  - Story 3.9: Implement email notification on approval decision
  - Story 3.10: Create Pending Approvals Dashboard React component
  - Story 3.11: Create Approval Review Modal React component
  - Story 3.12: Implement approval delegation logic
  - Story 3.13: Implement escalation reminders (cron job)
  - Story 3.14: Write integration tests for approval workflow
  - (Estimated: 15-20 stories)
- [ ] 7.6. Continue breaking down remaining epics (Epic 4-13) into atomic stories
- [ ] 7.7. For each story, document:
  - Title (clear, action-oriented)
  - Epic parent
  - Acceptance criteria (Given/When/Then scenarios)
  - Dependencies (blocks/blocked-by other stories)
  - Estimated effort (story points: 1, 2, 3, 5, 8, 13; or hours)
  - Assignee (TBD initially)
  - Testing requirements (unit, integration, E2E)
- [ ] 7.8. Ensure every PRD user story (US-01 to US-25) traced to implementation stories
- [ ] 7.9. Create traceability matrix: PRD User Story → Epic → Stories
- [ ] 7.10. Identify parallelizable stories (e.g., backend and frontend for same feature)
- [ ] 7.11. Sequence stories within epics (critical path, dependencies)
- [ ] 7.12. Review stories with development team (estimate effort, validate feasibility)
- [ ] 7.13. Review stories with QA lead (validate testability)
- [ ] 7.14. Incorporate feedback and finalize stories

**Validation Criteria**:
- ✅ All epics broken down into atomic, implementable stories
- ✅ All PRD user stories traced to stories
- ✅ Acceptance criteria clear and testable
- ✅ Dependencies documented
- ✅ Effort estimated by development team
- ✅ Stories ready for sprint planning

**Deliverable**: `prompter/difan-dios/stories.md` (estimated 100+ stories, 60-80 pages)

---

## Phase 5: Spec Enhancement (Optional - If Needed)

### Task 8: Create Spec Deltas for Enhanced Requirements
**Location**: `prompter/changes/create-mvp-documentation-suite/specs/<capability>/spec.md`

**Dependencies**: FSD ✅ (to identify gaps in baseline specs)  
**Estimated Effort**: 0.5-1 day  
**Assignee**: TBD  
**Priority**: 🟢 Low (Only if baseline specs missing PRD requirements)  
**Status**: 🟡 **Partially Complete** - Initial spec deltas created based on PRD analysis

**Initial Spec Deltas Created** ✅:
- **sop-management**: Added SOP-011 (autosave) and enhanced SOP-010 (multi-stage review reminders)
- **authentication**: Added AUTH-009 (rate limiting on auth endpoints)
- **notification-system**: Added NOTIFY-004 (approval escalation notifications)

**Subtasks**:
- [x] 8.1. Compare PRD user stories (US-01 to US-25) with existing baseline specs (76 requirements)
- [x] 8.2. Identify gaps where PRD user stories add requirements not in baseline specs
- [x] 8.3. Create spec delta structure: `changes/create-mvp-documentation-suite/specs/`
- [x] 8.4. Create initial spec deltas for identified gaps:
  - ✅ `specs/sop-management/spec.md` with ADDED SOP-011, MODIFIED SOP-010
  - ✅ `specs/authentication/spec.md` with ADDED AUTH-009
  - ✅ `specs/notification-system/spec.md` with ADDED NOTIFY-004
- [ ] 8.5. Review spec deltas during FSD creation and add additional deltas if gaps discovered
- [ ] 8.6. Cross-reference spec deltas in FSD, ERD, API Contract documents
- [ ] 8.7. Validate spec deltas with `prompter validate create-mvp-documentation-suite --strict`
- [ ] 8.8. Review spec deltas with product owner

**Note**: Additional spec deltas may be identified while creating FSD/ERD/API Contract (Tasks 1-4) and added incrementally during the apply stage.

**Validation Criteria**:
- ✅ All PRD requirements not in baseline specs added as spec deltas
- ✅ Spec deltas use correct format (## ADDED|MODIFIED|REMOVED Requirements)
- ✅ Scenarios follow WHEN/THEN structure
- ✅ Prompter validation passes

**Deliverable**: Spec delta files in `changes/create-mvp-documentation-suite/specs/` (estimated 5-10 files if needed)

---

## Phase 6: Validation & Finalization

### Task 9: Validate Complete Documentation Suite
**Dependencies**: All tasks 1-8 complete ✅  
**Estimated Effort**: 0.5 days  
**Assignee**: TBD  
**Priority**: 🔴 Critical (Must pass before approval)

**Subtasks**:
- [ ] 9.1. Run `prompter validate create-mvp-documentation-suite --strict` and resolve all issues
- [ ] 9.2. Verify all documents cross-reference correctly:
  - FSD → ERD (data requirements match entities)
  - FSD → API Contract (functional requirements match endpoints)
  - API Contract → UI Wireframes (endpoints match screens)
  - TDD-Lite → ERD, API Contract, UI Wireframes (implementation patterns align)
  - Epics → FSD (features match requirements)
  - Stories → Epics, FSD, API Contract, UI Wireframes (tasks implement requirements)
- [ ] 9.3. Verify traceability matrix completeness:
  - PRD User Story → FSD Requirement → API Endpoint → UI Screen → Epic → Story
  - All 25 user stories fully traced
- [ ] 9.4. Check for inconsistencies:
  - ERD entity fields match API request/response schemas
  - UI Wireframe data fields match API Contract schemas
  - Validation rules consistent across FSD, API Contract, UI Wireframes
- [ ] 9.5. Verify document formatting and quality:
  - All documents use consistent Markdown style
  - Headers, lists, tables properly formatted
  - Code examples syntax-highlighted
  - Diagrams render correctly (Mermaid, ASCII)
- [ ] 9.6. Resolve any validation errors or inconsistencies
- [ ] 9.7. Generate validation report

**Validation Criteria**:
- ✅ Prompter validation passes with zero issues
- ✅ All documents internally consistent
- ✅ All PRD user stories traced end-to-end
- ✅ No ambiguities or missing details

**Deliverable**: Validation report confirming completeness and consistency

---

### Task 10: Stakeholder Review & Approval
**Dependencies**: Task 9 complete ✅  
**Estimated Effort**: 1-2 days (review cycles)  
**Assignee**: Product Owner (Kiswandi)  
**Priority**: 🔴 Critical (Required for proposal approval)

**Subtasks**:
- [ ] 10.1. Share complete documentation suite with stakeholders:
  - Product Owner (Kiswandi)
  - Tech Lead
  - Backend Lead
  - Frontend Lead
  - QA Lead
  - Database Administrator
- [ ] 10.2. Conduct documentation review meeting (walkthrough FSD, ERD, API Contract, etc.)
- [ ] 10.3. Collect feedback and change requests from each stakeholder
- [ ] 10.4. Prioritize feedback (critical vs. nice-to-have)
- [ ] 10.5. Incorporate critical feedback into documents
- [ ] 10.6. Re-run validation after changes
- [ ] 10.7. Obtain formal approval from each reviewer:
  - [ ] Product Owner approves FSD, Epics, Stories
  - [ ] Tech Lead approves overall architecture and TDD-Lite
  - [ ] Backend Lead approves ERD and API Contract
  - [ ] Frontend Lead approves UI Wireframes and API Contract
  - [ ] QA Lead approves Stories and acceptance criteria
  - [ ] Database Administrator approves ERD
- [ ] 10.8. Update proposal.md with approval signatures and date
- [ ] 10.9. Mark proposal as "Approved" and ready for implementation

**Validation Criteria**:
- ✅ All reviewers approve their respective documents
- ✅ Critical feedback incorporated
- ✅ Proposal marked as approved

**Deliverable**: Approved documentation suite ready for implementation

---

## Summary Checklist

**Phase 1: Foundation Documents**
- [ ] Task 1: FSD created and approved
- [ ] Task 2: ERD created and approved

**Phase 2: Interface Documents**
- [ ] Task 3: API Contract created and approved
- [ ] Task 4: UI Wireframes created and approved

**Phase 3: Implementation Guidance**
- [ ] Task 5: TDD-Lite created and approved

**Phase 4: Work Breakdown**
- [ ] Task 6: Epics created and approved
- [ ] Task 7: Stories created and approved

**Phase 5: Spec Enhancement**
- [ ] Task 8: Spec deltas created (if needed)

**Phase 6: Validation & Finalization**
- [ ] Task 9: Documentation suite validated
- [ ] Task 10: Stakeholder approval obtained

**Final Deliverables**:
- [ ] `prompter/difan-dios/fsd.md` (80-100 pages)
- [ ] `prompter/difan-dios/erd.md` (40-50 pages)
- [ ] `prompter/difan-dios/api-contract.md` (60-80 pages)
- [ ] `prompter/difan-dios/ui-wireframes.md` (60-80 pages)
- [ ] `prompter/difan-dios/tdd-lite.md` (40-50 pages)
- [ ] `prompter/difan-dios/epics.md` (15-20 pages)
- [ ] `prompter/difan-dios/stories.md` (60-80 pages)
- [ ] Spec deltas in `prompter/changes/create-mvp-documentation-suite/specs/` (if needed)
- [ ] Validation report
- [ ] Approved proposal

**Total Estimated Effort**: 10-17 days (2-3.5 weeks)

---

**Change ID**: `create-mvp-documentation-suite`  
**Tasks Owner**: TBD (Product Owner to assign)  
**Target Completion**: [TBD based on team availability]  
**Status**: 🟡 Awaiting Approval to Begin
