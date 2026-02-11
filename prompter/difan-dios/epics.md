# Epics: Work Breakdown Structure

## Document Information

|                        |                                |
|------------------------|--------------------------------|
| **Project**            | Difan-DIOS (Difan Integrated Operational System) |
| **Version**            | 1.0.0 (DRAFT - TEMPLATE)       |
| **Date**               | February 10, 2026              |
| **Status**             | 🟡 Template - Awaiting Content |
| **Author**             | TBD                            |
| **Reviewers**          | Project Manager, Tech Lead, Product Owner |
| **Dependencies**       | FSD, TDD-Lite complete         |

---

## 1. Introduction

### 1.1 Purpose
This document breaks down the Difan-DIOS MVP 1 implementation into manageable epics. Each epic represents a major functional area that can be developed, tested, and deployed independently or in coordinated releases.

### 1.2 Scope
- Covers all 25 PRD user stories organized into 10-15 epics
- Provides high-level effort estimates for sprint planning
- Defines dependencies between epics
- Maps epics to implementation stories (detailed in stories.md)

### 1.3 Reference Documents
- **PRD**: `prompter/difan-dios/prd.md` - 25 user stories
- **FSD**: `prompter/difan-dios/fsd.md` - Functional requirements
- **TDD-Lite**: `prompter/difan-dios/tdd-lite.md` - Technical patterns
- **Stories**: `prompter/difan-dios/stories.md` - Implementation tasks

---

## 2. Epic Overview

### 2.1 Epic List

| Epic ID | Epic Name | User Stories | Story Points | Priority | Status |
|---------|-----------|--------------|--------------|----------|--------|
| EPIC-01 | Authentication & Authorization | US-01, US-02, US-03, US-04 | [TBD] | P0 (Must Have) | Not Started |
| EPIC-02 | Core Infrastructure & Database | (Technical foundation) | [TBD] | P0 (Must Have) | Not Started |
| EPIC-03 | Document CRUD Operations | US-05, US-06 | [TBD] | P0 (Must Have) | Not Started |
| EPIC-04 | Document Approval Workflow | US-10, US-11, US-12, US-13, US-14 | [TBD] | P0 (Must Have) | Not Started |
| EPIC-05 | Document Versioning & History | US-07 | [TBD] | P1 (Should Have) | Not Started |
| EPIC-06 | Work Order Management | US-15, US-16, US-17 | [TBD] | P1 (Should Have) | Not Started |
| EPIC-07 | Meeting Room Booking | US-18, US-19, US-20 | [TBD] | P1 (Should Have) | Not Started |
| EPIC-08 | Search & Filtering | US-08 | [TBD] | P1 (Should Have) | Not Started |
| EPIC-09 | Dashboard & Analytics | US-21, US-22, US-23 | [TBD] | P1 (Should Have) | Not Started |
| EPIC-10 | Audit Trail & Compliance | US-24, US-25 | [TBD] | P1 (Should Have) | Not Started |
| EPIC-11 | Notifications System | US-09 | [TBD] | P2 (Could Have) | Not Started |
| EPIC-12 | File Upload & Management | (Cross-cutting) | [TBD] | P0 (Must Have) | Not Started |
| EPIC-13 | Frontend Migration (jQuery → React) | (Technical upgrade) | [TBD] | P2 (Could Have) | Not Started |
| EPIC-14 | Mobile Responsive UI | (Cross-cutting) | [TBD] | P1 (Should Have) | Not Started |
| EPIC-15 | Deployment & DevOps | (Infrastructure) | [TBD] | P2 (Could Have) | Not Started |

**Total Story Points**: [TBD after estimation]

---

### 2.2 Epic Dependency Graph

```
EPIC-02 (Infrastructure)
    │
    ├──> EPIC-01 (Auth)
    │       │
    │       ├──> EPIC-03 (Document CRUD)
    │       │       │
    │       │       ├──> EPIC-04 (Approval Workflow)
    │       │       │       │
    │       │       │       └──> EPIC-05 (Versioning)
    │       │       │
    │       │       └──> EPIC-08 (Search)
    │       │
    │       ├──> EPIC-06 (Work Orders)
    │       │
    │       ├──> EPIC-07 (Bookings)
    │       │
    │       ├──> EPIC-09 (Dashboard)
    │       │
    │       └──> EPIC-10 (Audit Trail)
    │
    ├──> EPIC-12 (File Upload)
    │       │
    │       └──> EPIC-03, EPIC-06, EPIC-07 (consume file upload)
    │
    └──> EPIC-11 (Notifications)
            │
            └──> EPIC-04, EPIC-06, EPIC-07 (consume notifications)

Parallel Efforts:
- EPIC-14 (Mobile UI) - can start anytime after UI Wireframes complete
- EPIC-13 (React Migration) - can start after EPIC-03, EPIC-04 stable
- EPIC-15 (DevOps) - can start early for dev/staging environments
```

**Critical Path**: EPIC-02 → EPIC-01 → EPIC-03 → EPIC-04 → EPIC-05

---

## 3. Epic Details

---

### EPIC-01: Authentication & Authorization

**Description**: Implement user authentication, session management, role-based access control, and password management to secure the application.

**Business Value**: Foundation for all user interactions; without secure authentication, no features can be accessed.

**User Stories**:
- **US-01**: User login
- **US-02**: Session management (30-minute timeout, logout)
- **US-03**: Password reset flow
- **US-04**: User registration (Admin creates users)

**Acceptance Criteria**:
- [ ] Users can log in with username + password
- [ ] Account lockout after 5 failed attempts (15-minute lockout)
- [ ] Rate limiting: 5 login attempts per minute (AUTH-009)
- [ ] Session expires after 30 minutes of inactivity
- [ ] Users can initiate password reset via email
- [ ] Users can complete password reset with token validation
- [ ] Admin can create new users with role assignment
- [ ] Password complexity requirements enforced (AUTH-001)
- [ ] Laravel Sanctum tokens issued on successful login
- [ ] All API routes protected with `auth:sanctum` middleware

**Technical Components**:
- Backend:
  - `AuthController` (login, logout, refresh, password reset)
  - `UserController` (index, store, update, delete)
  - `LoginRequest`, `RegisterRequest` (validation)
  - User, Role, Department models
  - Account lockout logic in User model
  - Rate limiting middleware
  - Password reset email template
- Frontend:
  - `LoginPage` (login form)
  - `PasswordResetRequestPage` (email submission)
  - `PasswordResetConfirmPage` (new password form)
  - `AuthContext` (React Context for auth state)
  - `authService` (API calls)
  - Protected route HOC

**Effort Estimate**: [TBD - X story points, Y days]

**Dependencies**:
- **Requires**: EPIC-02 (database migrations for users, roles, departments)
- **Blocks**: All other epics (no features accessible without auth)

**Risks**:
- [TBD - e.g., "Rate limiting configuration may need tuning after load testing"]

---

### EPIC-02: Core Infrastructure & Database

**Description**: Set up Laravel backend project, MySQL database, migrations, seeders, and base API structure. Establish React frontend project with Vite build system.

**Business Value**: Technical foundation enabling all feature development.

**User Stories**: (None - technical epic)

**Acceptance Criteria**:
- [ ] Laravel 10.x/11.x project initialized with all config files
- [ ] MySQL 8.x database created with connection verified
- [ ] All database migrations created and tested (20+ tables per ERD)
- [ ] Database seeders for roles, initial admin user, sample departments
- [ ] API routes structure set up in `routes/api.php`
- [ ] Error handling middleware configured (JSON error responses)
- [ ] React 18.x project initialized with Vite
- [ ] Axios configured with base URL and token interceptor
- [ ] React Router configured with master layout
- [ ] Bootstrap 5 integrated (React Bootstrap)
- [ ] Environment variables configured (.env files)

**Technical Components**:
- Backend:
  - Laravel project scaffold
  - Database migrations for all entities (from ERD)
  - DatabaseSeeder, RoleSeeder, UserSeeder
  - Base API middleware (CORS, auth, rate limiting)
  - Exception Handler for API errors
- Frontend:
  - React + Vite project scaffold
  - `src/services/api.js` (Axios instance)
  - `src/App.jsx` (router setup)
  - `src/components/layout/MasterLayout.jsx`
  - Global CSS, Bootstrap theme

**Effort Estimate**: [TBD - X story points, Y days]

**Dependencies**:
- **Requires**: None (starting point)
- **Blocks**: All other epics (foundation)

**Risks**:
- [TBD - e.g., "Migration order errors may require rollback and re-run"]

---

### EPIC-03: Document CRUD Operations

**Description**: Implement create, read, update, delete operations for all 5 document types (SOP, Policy, Work Instruction, Quality Manual, Application Guide).

**Business Value**: Core functionality allowing users to manage organizational documents.

**User Stories**:
- **US-05**: Create and edit documents
- **US-06**: View document details

**Acceptance Criteria**:
- [ ] Users can create new SOPs (and other document types) via forms
- [ ] Forms validate required fields (title, department, effective date)
- [ ] Users can upload file attachments (PDF, DOC, DOCX, max 10MB)
- [ ] Users can edit their own draft documents
- [ ] Users can view published documents (read-only)
- [ ] Documents display metadata (title, status, department, dates, creator)
- [ ] Draft auto-save every 60 seconds (SOP-011)
- [ ] Documents support soft delete (admin only)
- [ ] Document list pages show filterable tables (status, department, category)
- [ ] Pagination works (20 items per page)

**Technical Components**:
- Backend:
  - `SopController`, `PolicyController`, etc. (CRUD endpoints)
  - `Document`, `Sop`, `Policy`, etc. models (STI pattern)
  - `StoreSopRequest`, `UpdateSopRequest` (validation)
  - `SopResource` (API response transformer)
  - `SopPolicy` (authorization: view, create, update, delete)
  - `FileUploadService` (file handling, virus scanning)
  - Migrations for documents table
- Frontend:
  - `SopsPage` (list view with DataTable)
  - `CreateSopPage`, `EditSopPage` (form pages)
  - `SopDetailPage` (detail view)
  - `SopForm` (reusable form component)
  - `DocumentFilters` (filter controls)
  - `sopService` (API calls)
  - `useAutoSave` hook (auto-save logic)

**Effort Estimate**: [TBD - X story points, Y days]

**Dependencies**:
- **Requires**: EPIC-01 (auth for permissions), EPIC-02 (database), EPIC-12 (file upload)
- **Blocks**: EPIC-04 (approval workflow needs documents), EPIC-05 (versioning), EPIC-08 (search)

**Risks**:
- [TBD - e.g., "STI approach may complicate querying; consider separate tables if performance issues"]

---

### EPIC-04: Document Approval Workflow

**Description**: Implement multi-level approval workflow allowing documents to be submitted, reviewed, approved/rejected, and escalated through organizational hierarchy.

**Business Value**: Ensures quality control and compliance by requiring authorized personnel to review documents before publication.

**User Stories**:
- **US-10**: Submit document for approval
- **US-11**: Approve or reject documents
- **US-12**: View approval history
- **US-13**: Multi-level approval configuration
- **US-14**: Approval delegation

**Acceptance Criteria**:
- [ ] Users can submit draft documents for approval
- [ ] Submission creates approval chain (1-5 levels based on config)
- [ ] Approvers receive notification (email + in-app)
- [ ] Approvers can view document preview in approval modal
- [ ] Approvers can approve with optional comments
- [ ] Approvers can reject with required reason
- [ ] Rejection returns document to draft status
- [ ] Approval advances to next level or publishes if final level
- [ ] Approval history timeline displays all actions
- [ ] Admins can configure approval levels per document type
- [ ] Approvers can delegate approval to another user (optional)
- [ ] Escalation rules trigger after [TBD] days without action (NOTIFY-004)

**Technical Components**:
- Backend:
  - `ApprovalController` (index, approve, reject, delegate)
  - `Approval`, `ApprovalLevel` models
  - `ApprovalService` (workflow logic)
  - Approval Policy (authorization)
  - Events: `DocumentSubmittedForApproval`, `DocumentApproved`, `DocumentRejected`
  - Listeners: `SendApprovalNotification`, `SendRejectionNotification`
  - Migrations for approvals, approval_levels tables
- Frontend:
  - `ApprovalsPage` (pending approvals list)
  - `ApprovalModal` (review + approve/reject modal)
  - `ApprovalTimeline` (history component)
  - `approvalService` (API calls)

**Effort Estimate**: [TBD - X story points, Y days]

**Dependencies**:
- **Requires**: EPIC-03 (documents), EPIC-11 (notifications)
- **Blocks**: EPIC-05 (versioning often triggered post-approval)

**Risks**:
- [TBD - e.g., "Complex approval configurations may require admin UI for approval level management"]

---

### EPIC-05: Document Versioning & History

**Description**: Implement version control for documents, allowing users to view previous versions, compare changes, and restore old versions if needed.

**Business Value**: Maintains audit trail of document changes, enables rollback if errors introduced, supports compliance with change tracking requirements.

**User Stories**:
- **US-07**: View document version history

**Acceptance Criteria**:
- [ ] New version created when document is published or significantly edited
- [ ] Version number follows semantic versioning (1.0, 1.1, 2.0)
- [ ] Users can view list of all document versions
- [ ] Users can view content of specific version (read-only snapshot)
- [ ] Users can compare two versions (diff view)
- [ ] Version history includes: version number, date, editor, changes summary
- [ ] Major version changes require approval, minor changes may not (configurable)
- [ ] Latest version always displayed by default

**Technical Components**:
- Backend:
  - `DocumentVersionService` (version creation, comparison)
  - `DocumentVersion` model
  - Version history endpoints in `SopController`, etc.
  - Migration for document_versions table
- Frontend:
  - `VersionHistoryTab` (version list)
  - `VersionDetailModal` (version content viewer)
  - `VersionCompareModal` (diff viewer)

**Effort Estimate**: [TBD - X story points, Y days]

**Dependencies**:
- **Requires**: EPIC-03 (documents), EPIC-04 (approval triggers versioning)
- **Blocks**: None

**Risks**:
- [TBD - e.g., "Diff algorithm for rich text/HTML may be complex; consider plain text diff initially"]

---

### EPIC-06: Work Order Management

**Description**: Implement work order creation, assignment, status tracking, and completion workflow for operational task management.

**Business Value**: Enables teams to track tasks, assign responsibilities, and monitor progress on operational work.

**User Stories**:
- **US-15**: Create work orders
- **US-16**: Assign work orders
- **US-17**: Update work order status

**Acceptance Criteria**:
- [ ] Users can create work orders with title, description, priority, due date
- [ ] Department heads can assign work orders to staff
- [ ] Assigned users can update work order status (In Progress, On Hold, Review, Completed)
- [ ] Work order list shows filterable table (status, priority, assigned user)
- [ ] Kanban board view available (drag-and-drop status changes)
- [ ] Work orders support comments/notes
- [ ] Status history tracked (who changed status, when)
- [ ] Notifications sent on assignment and status changes
- [ ] Work orders can be cancelled with reason

**Technical Components**:
- Backend:
  - `WorkOrderController` (CRUD, assign, update status)
  - `WorkOrder` model
  - WorkOrder Policy (authorization)
  - Events: `WorkOrderAssigned`, `WorkOrderCompleted`
  - Migration for work_orders table
- Frontend:
  - `WorkOrdersPage` (table + Kanban toggle)
  - `CreateWorkOrderPage`, `EditWorkOrderPage`
  - `WorkOrderDetailPage` (detail + status history + comments)
  - `WorkOrderKanban` (drag-and-drop board)
  - `workOrderService` (API calls)

**Effort Estimate**: [TBD - X story points, Y days]

**Dependencies**:
- **Requires**: EPIC-01 (auth), EPIC-02 (database), EPIC-11 (notifications)
- **Blocks**: None

**Risks**:
- [TBD - e.g., "Kanban drag-and-drop may require additional frontend library (react-beautiful-dnd)"]

---

### EPIC-07: Meeting Room Booking

**Description**: Implement meeting room booking system with calendar view, conflict detection, and booking management.

**Business Value**: Prevents double-booking of meeting rooms, streamlines resource scheduling, reduces scheduling conflicts.

**User Stories**:
- **US-18**: View room availability
- **US-19**: Book meeting rooms
- **US-20**: Manage bookings (view my bookings, edit, cancel)

**Acceptance Criteria**:
- [ ] Users can view meeting room calendar (month, week, day views)
- [ ] Users can filter calendar by specific room or view all rooms
- [ ] Users can create booking by clicking time slot
- [ ] Booking form validates: room, date, start time, end time, title
- [ ] Real-time conflict detection (shows error if room already booked)
- [ ] Users can view their own bookings list
- [ ] Users can edit their bookings (if not yet started or within edit window)
- [ ] Users can cancel bookings (if within cancellation deadline)
- [ ] Bookings show on calendar with color coding (own bookings vs. others)
- [ ] Booking conflicts return 409 error

**Technical Components**:
- Backend:
  - `BookingController` (index, store, update, destroy)
  - `MeetingRoom`, `Booking` models
  - Conflict detection logic (overlapping time ranges)
  - Booking Policy (authorization)
  - Migrations for meeting_rooms, bookings tables
- Frontend:
  - `CalendarPage` (FullCalendar integration)
  - `BookingModal` (create/edit booking form)
  - `MyBookingsPage` (user's bookings list)
  - `bookingService` (API calls)
  - Real-time conflict check on form change

**Effort Estimate**: [TBD - X story points, Y days]

**Dependencies**:
- **Requires**: EPIC-01 (auth), EPIC-02 (database)
- **Blocks**: None

**Risks**:
- [TBD - e.g., "FullCalendar library license may have cost for commercial use; verify license"]

---

### EPIC-08: Search & Filtering

**Description**: Implement global search and advanced filtering across documents, work orders, users, and other entities.

**Business Value**: Enables users to quickly find information, reducing time spent navigating through lists.

**User Stories**:
- **US-08**: Search documents by keyword

**Acceptance Criteria**:
- [ ] Global search bar in header searches across all document types
- [ ] Search uses full-text index on title and description
- [ ] Search results grouped by entity type (Documents, Work Orders, Users)
- [ ] Search results show snippet with search term highlighted
- [ ] Advanced search page with filters (document type, status, date range, department)
- [ ] Search results paginated (20 per page)
- [ ] Search debounced (300ms delay) to reduce server load

**Technical Components**:
- Backend:
  - `SearchController` (global search, advanced search endpoints)
  - Full-text indexes on documents table
  - Search query builder (complex WHERE clauses)
- Frontend:
  - `GlobalSearchBar` (header component with autocomplete)
  - `SearchResultsPage` (full results with tabs)
  - `AdvancedSearchPage` (filter form)
  - `searchService` (API calls)

**Effort Estimate**: [TBD - X story points, Y days]

**Dependencies**:
- **Requires**: EPIC-03 (documents), EPIC-06 (work orders to search)
- **Blocks**: None

**Risks**:
- [TBD - e.g., "Full-text search performance may degrade with >10K documents; consider Elasticsearch in future"]

---

### EPIC-09: Dashboard & Analytics

**Description**: Implement role-specific dashboards with widgets showing KPIs, recent activity, and charts.

**Business Value**: Provides at-a-glance visibility into system status, pending tasks, and compliance metrics.

**User Stories**:
- **US-21**: View dashboard
- **US-22**: View document statistics
- **US-23**: View compliance reports

**Acceptance Criteria**:
- [ ] Dashboard shows role-specific widgets (Admin: all metrics, Staff: my tasks)
- [ ] Widgets show: Pending approvals count, Total documents, Assigned work orders, Recent documents
- [ ] Dashboard includes charts: Compliance donut chart, Work order status bar chart
- [ ] Charts use real data from database (aggregated queries)
- [ ] Dashboard loads within 2 seconds (performance requirement)
- [ ] Widgets link to relevant pages (e.g., "Pending Approvals" → Approvals page)

**Technical Components**:
- Backend:
  - `DashboardController` (dashboard data endpoint with aggregations)
  - Dashboard queries (COUNT, GROUP BY for charts)
  - Dashboard Resource (response transformer)
- Frontend:
  - `Dashboard` page (main dashboard)
  - `Widget` component (reusable widget)
  - `ComplianceChart`, `WorkOrderChart` (chart components using ApexCharts)
  - `dashboardService` (API calls)

**Effort Estimate**: [TBD - X story points, Y days]

**Dependencies**:
- **Requires**: EPIC-03 (documents), EPIC-04 (approvals), EPIC-06 (work orders)
- **Blocks**: None

**Risks**:
- [TBD - e.g., "Complex aggregation queries may be slow; consider caching or precomputed tables"]

---

### EPIC-10: Audit Trail & Compliance

**Description**: Implement audit logging for all critical actions and compliance reporting features.

**Business Value**: Ensures compliance with ISO 9001 and other standards requiring audit trails and review scheduling.

**User Stories**:
- **US-24**: Audit trail (view change history)
- **US-25**: Review scheduling (set review dates, reminders)

**Acceptance Criteria**:
- [ ] All CRUD operations on documents, work orders, users logged to audit_logs table
- [ ] Audit log captures: entity type, entity ID, action, user, timestamp, old/new values (JSON)
- [ ] Audit log immutable (no updates or deletes)
- [ ] Audit log viewer page (filterable by entity, action, user, date range)
- [ ] Documents can have review_date field set
- [ ] Review reminders sent at intervals: 7 days, 3 days, 1 day before due (SOP-010)
- [ ] Escalation reminders at 3, 5, 7 days overdue; supervisor escalation at 10 days (NOTIFY-004)
- [ ] Compliance reports show: documents due for review, overdue reviews

**Technical Components**:
- Backend:
  - `AuditController` (index endpoint for audit log viewer)
  - `AuditLog` model (immutable)
  - Audit logging service (called from event listeners)
  - Events: All document/work order events
  - Listeners: `LogDocumentChange`, `LogWorkOrderChange`
  - Scheduled job: `SendReviewReminders` (daily cron)
  - Migration for audit_logs table
- Frontend:
  - `AuditLogPage` (audit log viewer with filters)
  - `ComplianceReportPage` (overdue reports)

**Effort Estimate**: [TBD - X story points, Y days]

**Dependencies**:
- **Requires**: EPIC-03 (documents), EPIC-11 (notifications for reminders)
- **Blocks**: None

**Risks**:
- [TBD - e.g., "Audit log table may grow large; implement archival strategy (move old logs to cold storage annually)"]

---

### EPIC-11: Notifications System

**Description**: Implement in-app notifications and email notifications for critical events (approvals, assignments, reminders, escalations).

**Business Value**: Keeps users informed of tasks requiring attention, reduces delays in approvals and work completion.

**User Stories**:
- **US-09**: Receive notifications

**Acceptance Criteria**:
- [ ] Notification bell icon in header shows unread count badge
- [ ] Clicking bell opens notification dropdown (5 recent, "View All" link)
- [ ] Notifications page shows all notifications (read and unread)
- [ ] Users can mark notifications as read (individually or all)
- [ ] Notifications stored in database (notifications table)
- [ ] Email notifications sent for: approval requests, work order assignments, document rejections
- [ ] Email sending uses background jobs (queue) to avoid blocking requests
- [ ] Escalation notifications sent per schedule (NOTIFY-004)
- [ ] Users can configure notification preferences (in-app only, email only, both)

**Technical Components**:
- Backend:
  - `NotificationController` (index, mark as read)
  - `Notification` model
  - `NotificationService` (create notifications)
  - Jobs: `SendNotificationEmail`
  - Mail templates (ApprovalRequestMail, WorkOrderAssignedMail, etc.)
  - Scheduled job: `SendEscalationNotifications`
  - Migration for notifications table
- Frontend:
  - `NotificationBell` (header component)
  - `NotificationDropdown` (dropdown list)
  - `NotificationsPage` (full list)
  - `notificationService` (API calls)
  - Real-time polling or WebSocket (future enhancement)

**Effort Estimate**: [TBD - X story points, Y days]

**Dependencies**:
- **Requires**: EPIC-02 (database, queue config)
- **Blocks**: EPIC-04 (approval workflow uses notifications), EPIC-06 (work orders), EPIC-10 (review reminders)

**Risks**:
- [TBD - e.g., "Email delivery failures need retry logic and failure handling"]

---

### EPIC-12: File Upload & Management

**Description**: Implement file upload, storage, virus scanning, and download functionality for document attachments.

**Business Value**: Allows users to attach supporting files to documents and work orders, essential for complete documentation.

**User Stories**: (Cross-cutting - supports multiple features)

**Acceptance Criteria**:
- [ ] Users can upload files via drag-and-drop or file picker
- [ ] File types validated (whitelist: PDF, DOC, DOCX, XLS, XLSX)
- [ ] File size limited to 10MB
- [ ] Uploaded files scanned for viruses (block upload if virus detected)
- [ ] Files stored securely (outside web root)
- [ ] File download returns pre-signed URL or secure download endpoint
- [ ] File deletion soft-deletes from database, marks file for cleanup
- [ ] File attachments polymorphic (can attach to documents, work orders, etc.)

**Technical Components**:
- Backend:
  - `FileController` (upload, download, delete)
  - `FileUploadService` (validation, virus scan, storage)
  - `FileAttachment` model (polymorphic)
  - Laravel Storage configuration (local disk for dev, S3 for prod)
  - Virus scanning integration (ClamAV or VirusTotal API)
  - Migration for file_attachments table
- Frontend:
  - `FileUploadDropzone` (drag-and-drop component)
  - `FilePreview` (display uploaded files)
  - `fileService` (API calls)

**Effort Estimate**: [TBD - X story points, Y days]

**Dependencies**:
- **Requires**: EPIC-02 (storage config)
- **Blocks**: EPIC-03 (document attachments), EPIC-06 (work order attachments)

**Risks**:
- [TBD - e.g., "Virus scanning may slow uploads; consider async scanning and temporary quarantine"]

---

### EPIC-13: Frontend Migration (jQuery → React)

**Description**: Migrate existing jQuery-based templates in `template/` directory to React components.

**Business Value**: Modernizes frontend, improves maintainability, enables better state management and component reusability.

**User Stories**: (Technical upgrade - no direct user stories)

**Acceptance Criteria**:
- [ ] All HTML templates converted to React components
- [ ] All jQuery scripts replaced with React hooks and state management
- [ ] Bootstrap 5 classes preserved (React Bootstrap components)
- [ ] DataTables replaced with custom React table or React library
- [ ] Select2 replaced with React Select
- [ ] Quill editor integrated as React component
- [ ] FullCalendar integrated as React component
- [ ] SweetAlert2 replaced with React modal library
- [ ] No breaking changes to API contracts
- [ ] All existing features work identically in React version

**Technical Components**:
- Frontend:
  - Rewrite all existing HTML pages as React components
  - Replace jQuery event handlers with React event handlers
  - Replace jQuery AJAX calls with React hooks + Axios
  - Implement React Router for navigation
  - State management (Context or Redux)

**Effort Estimate**: [TBD - X story points, Y days - likely large effort]

**Dependencies**:
- **Requires**: EPIC-03, EPIC-04 (backend APIs stable)
- **Blocks**: None (can run in parallel as separate frontend)

**Risks**:
- [TBD - e.g., "Migration may introduce regressions; require extensive QA testing"]

---

### EPIC-14: Mobile Responsive UI

**Description**: Ensure all pages and components are fully responsive on mobile devices (phones, tablets).

**Business Value**: Enables users to access system from mobile devices, increases accessibility and convenience.

**User Stories**: (Cross-cutting - applies to all features)

**Acceptance Criteria**:
- [ ] All pages render correctly on mobile (<768px)
- [ ] Sidebar collapses to hamburger menu on mobile
- [ ] Tables switch to card view or horizontal scroll on mobile
- [ ] Forms use single-column layout on mobile
- [ ] Touch targets minimum 44px height (accessibility)
- [ ] No horizontal scrolling (content fits screen width)
- [ ] Modal dialogs fit mobile screen
- [ ] Calendar view switches to list view on mobile
- [ ] Images scale appropriately

**Technical Components**:
- Frontend:
  - Responsive CSS media queries
  - Bootstrap 5 responsive grid classes
  - Mobile-specific component variants (e.g., MobileTableCard)
  - Touch gesture support

**Effort Estimate**: [TBD - X story points, Y days]

**Dependencies**:
- **Requires**: UI Wireframes defined for mobile breakpoints
- **Blocks**: None (can work in parallel with feature development)

**Risks**:
- [TBD - e.g., "Complex tables may not translate well to mobile; may require UX redesign"]

---

### EPIC-15: Deployment & DevOps

**Description**: Set up development, staging, and production environments with CI/CD pipeline for automated testing and deployment.

**Business Value**: Enables rapid, safe deployments, reduces manual deployment errors, improves developer productivity.

**User Stories**: (Infrastructure - no direct user stories)

**Acceptance Criteria**:
- [ ] Development environment running locally (Vite + Laravel Artisan)
- [ ] Staging environment deployed (same config as production)
- [ ] Production environment deployed (secure, optimized)
- [ ] CI/CD pipeline runs tests on every commit
- [ ] CI/CD pipeline deploys to staging on merge to `develop` branch
- [ ] CI/CD pipeline deploys to production on merge to `main` branch (manual approval)
- [ ] Database migrations run automatically on deploy
- [ ] Environment variables managed securely (not in git)
- [ ] SSL/TLS certificates configured (HTTPS)
- [ ] Monitoring and logging set up (error tracking, performance monitoring)

**Technical Components**:
- Infrastructure:
  - GitHub Actions workflow (or GitLab CI, Jenkins)
  - Laravel Forge or manual server setup
  - MySQL managed database (AWS RDS, DigitalOcean)
  - Cloudflare CDN
  - AWS S3 or DigitalOcean Spaces (file storage)
  - Error tracking (Sentry, Bugsnag)
  - Monitoring (New Relic, DataDog, or Laravel Telescope)

**Effort Estimate**: [TBD - X story points, Y days]

**Dependencies**:
- **Requires**: Code ready for deployment (EPIC-01 to EPIC-12)
- **Blocks**: Production release

**Risks**:
- [TBD - e.g., "Migration rollback strategy needed in case of deployment failure"]

---

## 4. Release Plan

### 4.1 Proposed Release Phases

**Phase 1 (MVP Core)** - Target: Q2 2026
- EPIC-02: Core Infrastructure ✅
- EPIC-01: Authentication & Authorization ✅
- EPIC-12: File Upload & Management ✅
- EPIC-03: Document CRUD Operations ✅
- EPIC-04: Document Approval Workflow ✅

**Phase 2 (Operational Features)**
- EPIC-06: Work Order Management
- EPIC-07: Meeting Room Booking
- EPIC-11: Notifications System

**Phase 3 (Advanced Features)**
- EPIC-05: Document Versioning & History
- EPIC-08: Search & Filtering
- EPIC-09: Dashboard & Analytics
- EPIC-10: Audit Trail & Compliance

**Phase 4 (UX & Infrastructure)**
- EPIC-14: Mobile Responsive UI
- EPIC-13: Frontend Migration (jQuery → React)
- EPIC-15: Deployment & DevOps

**Phase Priority Adjustment**: Product Owner may adjust based on stakeholder feedback.

---

### 4.2 Sprint Planning Template

**Sprint Duration**: [TBD - 2 weeks?]

**Epics per Sprint**: [TBD - 1-2 epics depending on size]

**Sample Sprint 1**:
- EPIC-02 (Infrastructure setup)
- EPIC-01 (Authentication - partial)

**Sample Sprint 2**:
- EPIC-01 (Authentication - complete)
- EPIC-12 (File Upload)

**Sample Sprint 3**:
- EPIC-03 (Document CRUD - partial)

[TBD - Expand sprint plan once story point estimates available]

---

## 5. Acceptance Criteria (Epic Level)

- [ ] All 15 epics defined with clear scope boundaries
- [ ] Each epic maps to PRD user stories or technical requirements
- [ ] Effort estimates provided for sprint planning
- [ ] Epic dependencies identified (critical path clear)
- [ ] Release phases proposed for phased delivery
- [ ] Project Manager and Product Owner approve epic breakdown

---

## 6. Open Questions

| ID | Question | Owner | Resolution |
|----|----------|-------|------------|
| OQ-05 | Are any user stories deferred to Phase 2 (post-MVP)? | Product Owner | [TBD] |
| OQ-06 | Should infrastructure setup (EPIC-02, EPIC-15) be included in initial estimates? | Project Manager | [TBD] |
| EPIC-01 | Story point estimation method: Planning Poker, T-shirt sizing, or Fibonacci? | Scrum Master | [TBD] |
| EPIC-02 | Sprint duration: 1 week, 2 weeks, or 3 weeks? | Scrum Master | [TBD] |
| EPIC-03 | Should EPIC-13 (React migration) happen in parallel or after MVP stable? | Tech Lead | [TBD] |

---

**Document Status**: 🟡 TEMPLATE - Awaiting content population  
**Next Steps**: Estimate story points, define sprint plan, get PM approval  
**Estimated Completion**: [TBD based on FSD, TDD-Lite, stories.md completion]
