# AGENTS — Project Knowledge Base

## 1. 📍 Project Summary

**Difan-DIOS** (Difan Integrated Operational System) is a comprehensive Quality Management System (QMS) designed for Indonesian organizations to manage their ISO-compliant documentation, operational procedures, and workflow processes.

- **Business Purpose**: Digitize and streamline quality management processes including SOP management, policy documentation, work instructions, quality manuals, and operational workflows
- **Product Type**: Web-based Quality Management System (QMS) / Document Management Platform
- **Development Status**: 
  - Frontend templates: Complete (HTML/CSS/jQuery)
  - Backend: Not yet implemented
  - Specifications: **Complete** - 16 capability specifications with 76 requirements (February 2026)
  - Architecture: **Defined** - Laravel 10.x/11.x + MySQL 8.x + React 18.x (design.md)
- **Core Modules**:
  - SOP IT (Standard Operating Procedures)
  - Kebijakan (Policies)
  - Instruksi Kerja (Work Instructions)
  - Manual Mutu (Quality Manual)
  - Panduan Aplikasi (Application Guide)
  - Work Order Management
  - Meeting Room Booking
  - Organizational Structure Management
  - Job Description (Jobdesk) Management
  - Customer Request Management
  - Form Management
- **Target Users**: Quality managers, compliance officers, operational staff, administrators in Indonesian organizations requiring ISO certification or quality management compliance
- **Use Cases**: Document lifecycle management, approval workflows, compliance tracking, operational process standardization, resource booking, and organizational documentation

## 2. 🧱 Tech Stack

- **Frontend**: 
  - **Current**: HTML5, CSS3, JavaScript (ES5/ES6), jQuery 3.7.1
  - **Planned** (per design.md): React.js 18.x, React Bootstrap, React Context/Redux, Vite build tool
  - Bootstrap 5.x (responsive framework)
  - Select2 (enhanced select dropdowns)
  - DataTables (table management)
  - Quill (rich text editor for document editing)
  - Owl Carousel (content carousels)
  - Fullcalendar (meeting room booking calendar)
  - Chart libraries: C3, ApexCharts (dashboard analytics)
- **UI Components/Icons**:
  - FontAwesome (icon library)
  - Tabler Icons
  - Feather Icons
  - Line Awesome Icons
- **Frontend Utilities**:
  - Bootstrap DateTimePicker
  - Sortable.js (drag-and-drop)
  - SweetAlert2 (alerts/modals)
  - Toastr (notifications)
  - jQuery Validation
  - jQuery SlimScroll
- **Backend**: 
  - **Current**: Not yet implemented (currently static templates)
  - **Planned** (per design.md): Laravel 10.x/11.x (PHP framework)
    - Laravel Sanctum (SPA authentication)
    - Eloquent ORM (database)
    - Laravel Policies (authorization)
    - Laravel Queues (async processing)
    - Laravel Storage (file management)
- **Database**: 
  - **Current**: Not yet determined
  - **Planned** (per design.md): MySQL 8.x (relational database)
    - ACID transactions
    - InnoDB engine
    - Full-text search support
- **Cache/Queue**: 
  - **Current**: Not yet implemented
  - **Planned** (per design.md): 
    - Database queue (initial)
    - Redis (future scaling)
- **Infrastructure**: 
  - **Current**: Static web hosting
  - **Planned** (per design.md):
    - Development: localhost (Vite + Laravel Artisan)
    - Production: Laravel Forge, Heroku, or DigitalOcean
    - Managed MySQL (AWS RDS or DigitalOcean)
    - CDN: Cloudflare for static assets
- **AI/ML**: None currently

## 3. 🏗️ Architecture Overview

### Current Architecture (Template Phase)
```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Client-Side)                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │            HTML Templates (Static Pages)              │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │  Bootstrap 5 UI Framework + Custom Styles (style.css) │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │  jQuery + Plugins (DataTables, Select2, Calendar)    │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │  Client-Side Logic (script.js, modal.js, etc.)       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Planned Architecture
```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Client     │      │   Backend    │      │   Database   │
│  (Browser)   │◄────►│   API/App    │◄────►│   (Relational│
│              │      │   Server     │      │    SQLite/   │
│              │      │              │      │   PostgreSQL)│
└──────────────┘      └──────────────┘      └──────────────┘
      │                      │                      │
      │                      ▼                      │
      │             ┌──────────────┐                │
      │             │ File Storage │                │
      │             │  (Documents, │                │
      │             │   Uploads)   │                │
      │             └──────────────┘                │
      │                                             │
      ▼                                             ▼
┌──────────────┐                           ┌──────────────┐
│ Notification │                           │ Audit/Log    │
│   System     │                           │   Storage    │
└──────────────┘                           └──────────────┘
```

### Component Boundaries and Responsibilities
- **Presentation Layer**: HTML templates with Bootstrap styling, responsible for UI rendering
- **Client Logic Layer**: jQuery-based scripts handling form validation, data presentation, modal interactions
- **Data Layer**: (To be implemented) REST API endpoints for CRUD operations
- **Business Logic Layer**: (To be implemented) Workflow engines, approval processes, document lifecycle management
- **Storage Layer**: (To be implemented) Database for structured data, file system for document storage

### Data Flow Patterns
1. **Current** (Static): User → HTML Template → Client-side JS → Local State
2. **Planned**: User → UI → AJAX Request → API Endpoint → Business Logic → Database → Response → UI Update

### Async Processing Architecture
- To be determined based on requirements (planned: background job processing for document generation, notifications, scheduled tasks)

## 4. 📁 Folder Structure & Key Files

```
d:\Difan-DIOS/
├── README.md                          # Project overview
├── AGENTS.md                          # This file - AI agent knowledge base
├── .git/                              # Git repository
├── .github/                           # GitHub configuration
│   └── workflows/                     # CI/CD workflows (if any)
├── .agent/                            # Agent configuration
│   └── prompts/                       # AI agent prompts
├── prompter/                          # DOCS_ROOT_PATH - Spec-driven development framework
│   ├── AGENTS.md                      # Prompter-specific agent instructions (reference only)
│   ├── project.md                     # Project conventions template
│   ├── core/                          # Core documentation templates
│   │   ├── product-brief.md           # Product brief generator template
│   │   ├── proposal.md                # Change proposal template
│   │   ├── apply.md                   # Implementation stage template
│   │   └── archive.md                 # Archive stage template
│   ├── difan-dios/                    # Project-specific documentation
│   │   └── product-brief.md           # Product vision and business context
│   ├── specs/                         # Current specifications (what IS built)
│   │   └── [capability]/              # To be populated after archiving changes
│   │       ├── spec.md                # Requirements and scenarios
│   │       └── design.md              # Technical patterns (optional)
│   ├── changes/                       # Proposed changes (what SHOULD change)
│   │   ├── establish-baseline-specs/  # ✅ COMPLETED - Ready for archive
│   │   │   ├── proposal.md            # Change justification
│   │   │   ├── tasks.md               # Implementation checklist (all complete)
│   │   │   ├── design.md              # Laravel/MySQL/React architecture (612 lines)
│   │   │   ├── SUMMARY.md             # Implementation summary
│   │   │   └── specs/                 # 16 capability specifications (76 requirements)
│   │   │       ├── authentication/spec.md          # 8 requirements
│   │   │       ├── authorization/spec.md           # 8 requirements (RBAC)
│   │   │       ├── audit-logging/spec.md           # 8 requirements
│   │   │       ├── notification-system/spec.md     # 3 requirements
│   │   │       ├── dashboard-analytics/spec.md     # 3 requirements
│   │   │       ├── sop-management/spec.md          # 10 requirements
│   │   │       ├── policy-management/spec.md       # 3 requirements
│   │   │       ├── work-instruction-management/spec.md  # 3 requirements
│   │   │       ├── quality-manual-management/spec.md    # 2 requirements
│   │   │       ├── application-guide-management/spec.md # 2 requirements
│   │   │       ├── work-order-management/spec.md        # 12 requirements
│   │   │       ├── meeting-room-booking/spec.md         # 4 requirements
│   │   │       ├── organizational-structure/spec.md     # 3 requirements
│   │   │       ├── jobdesk-management/spec.md           # 3 requirements
│   │   │       ├── customer-request-management/spec.md  # 3 requirements
│   │   │       └── form-management/spec.md              # 3 requirements
│   │   └── archive/                   # Completed changes (empty - pending archive)
│   └── [Future: PRD, FSD, ERD, API Contract, UI Wireframes, TDD-Lite, Epics, Stories]
└── template/                          # Frontend HTML templates (current codebase)
    ├── index.html                     # Main dashboard/homepage
    ├── sop.html                       # SOP listing page
    ├── add-sop.html                   # SOP creation form
    ├── kebijakan.html                 # Policy management page
    ├── instruksi-kerja.html           # Work instructions page
    ├── manual-mutu.html               # Quality manual page
    ├── panduan-aplikasi.html          # Application guide page
    ├── work-order.html                # Work order listing
    ├── add-work-order.html            # Work order creation
    ├── booking-meeting-room.html      # Meeting room booking
    ├── kalender-ruang-meeting.html    # Meeting room calendar
    ├── jobdesk.html                   # Job description management
    ├── struktur-organisasi.html       # Organizational structure
    ├── request-customer.html          # Customer request management
    ├── form.html                      # Generic form template
    ├── assets/                        # Static resources
    │   ├── css/                       # Stylesheets
    │   │   ├── bootstrap.min.css      # Bootstrap framework
    │   │   ├── style.css              # Main custom styles
    │   │   ├── custom.css             # Additional custom styles
    │   │   ├── animate.css            # Animation library
    │   │   ├── dataTables.bootstrap5.min.css
    │   │   ├── select2.min.css
    │   │   └── [other plugin styles]
    │   ├── js/                        # JavaScript files
    │   │   ├── jquery-3.7.1.min.js    # jQuery core
    │   │   ├── bootstrap.bundle.min.js # Bootstrap JS
    │   │   ├── script.js              # Main application logic
    │   │   ├── modal.js               # Modal handling
    │   │   ├── validation.js          # Form validation
    │   │   ├── jquery.dataTables.min.js
    │   │   ├── select2.min.js
    │   │   ├── jquery.fullcalendar.js
    │   │   └── [other plugin scripts]
    │   ├── img/                       # Images and icons
    │   │   ├── logo.svg               # Application logo
    │   │   ├── avatar/                # User avatars
    │   │   ├── icons/                 # UI icons
    │   │   └── [other image categories]
    │   ├── fonts/                     # Web fonts
    │   ├── plugins/                   # Third-party plugins
    │   │   ├── fontawesome/           # FontAwesome icons
    │   │   ├── select2/               # Select2 plugin
    │   │   ├── apexchart/             # ApexCharts
    │   │   ├── quill/                 # Quill editor
    │   │   ├── sweetalert/            # SweetAlert2
    │   │   └── [other plugins]
    │   └── scss/                      # Sass source files (optional)
    └── public/
        └── uploads/                   # User-uploaded files directory
```

### Critical Configuration Files
- **None currently** (static template project)
- **Future** (per design.md):
  - `composer.json` - Laravel backend dependencies
  - `package.json` - React frontend dependencies
  - `.env` - Environment configuration (Laravel)
  - `config/` - Laravel configuration files
  - `vite.config.js` - Frontend build configuration

### Bootstrap/Entry Points
- **Current**: Any `.html` file can serve as entry point (typically `index.html`)
- **Future** (per design.md):
  - Backend: `public/index.php` (Laravel entry point)
  - Frontend: `resources/js/app.jsx` (React root component)
  - Artisan: `artisan` (CLI entry point)

## 5. 🔑 Core Business Logic & Domain Rules

### Primary Workflows

#### SOP Management Workflow
```
Draft → Submit for Review → Review → Approve/Reject → Published → Archive
  │                            │         │
  │                            │         └─→ [If Rejected] → Revise → Submit
  │                            │
  │                            └─→ Comment/Request Changes
  │
  └─→ Save as Draft (multiple times)
```

**States**:
- **Draft**: Initial creation, editable by creator
- **Submitted**: Under review, locked for editing
- **In Review**: Being evaluated by approvers
- **Approved**: Ready for publication
- **Rejected**: Sent back with comments
- **Published**: Active and accessible to users
- **Archived**: Obsolete/superseded

#### Work Order Workflow
```
Created → Assigned → In Progress → Review → Completed → Closed
   │                     │            │
   │                     │            └─→ [Issues Found] → Rework
   │                     │
   │                     └─→ On Hold (with reason)
   │
   └─→ Cancelled
```

#### Document Approval Workflow
```
Submit → Level 1 Approval → Level 2 Approval → Final Approval → Published
           │                   │                   │
           └─→ Reject          └─→ Reject          └─→ Reject
                │                   │                   │
                └─────────→ Return to Submitter ←───────┘
```

### Validation Rules and Constraints
1. **Document Naming**: Must follow organizational naming convention (TBD in specs)
2. **Required Fields**: Title, Category, Description, Department, Effective Date
3. **File Uploads**: Allowed formats (PDF, DOC, DOCX, XLS, XLSX), max size (TBD)
4. **Date Validation**: 
   - Effective date cannot be in the past (for new documents)
   - Review date must be after effective date
   - Archive date must be after effective date
5. **User Permissions**: Users can only edit their own drafts or documents they're assigned to
6. **Version Control**: New version created on each significant edit after publication

### Authorization Flows
1. **Role-Based Access**: Different views and actions based on user role
2. **Department-Based**: Users see documents relevant to their department
3. **Approval Hierarchy**: Multi-level approval based on document type and impact

### Side Effects
1. **Audit Trails**: Every action (create, edit, approve, reject, archive) is logged with timestamp and user
2. **Notifications**: 
   - Email/system notifications on status changes
   - Reminders for pending approvals
   - Alerts for document review due dates
3. **Version History**: Complete history of changes maintained
4. **Related Document Updates**: When a document is archived, related documents are flagged for review

## 6. 🗂️ Data Models / Entities

### Core Entities

#### Document (Base Entity)
- `id` (PK): Unique identifier
- `document_number`: Auto-generated or manual entry
- `title`: Document title
- `description`: Detailed description
- `category`: Document category/type
- `department_id` (FK): Owning department
- `created_by` (FK): User who created
- `created_at`: Timestamp
- `updated_at`: Timestamp
- `status`: Current status (draft, submitted, approved, published, archived)
- `version`: Version number
- `effective_date`: When document becomes active
- `review_date`: Next scheduled review
- `file_path`: Path to document file

#### SOP (Standard Operating Procedure)
Inherits from Document, plus:
- `sop_number`: Unique SOP identifier
- `scope`: Applicability scope
- `procedure_steps`: JSON or text field with steps
- `responsible_party`: Who executes
- `related_forms`: References to related forms

#### Kebijakan (Policy)
Inherits from Document, plus:
- `policy_number`: Unique policy identifier
- `policy_type`: Type of policy
- `compliance_framework`: ISO/regulatory reference

#### Work Order
- `id` (PK): Unique identifier
- `wo_number`: Work order number
- `title`: Work order title
- `description`: Detailed description
- `priority`: Low, Medium, High, Critical
- `assigned_to` (FK): User assigned
- `created_by` (FK): Requestor
- `department_id` (FK): Requesting department
- `due_date`: Expected completion date
- `status`: New, Assigned, In Progress, On Hold, Completed, Cancelled
- `created_at`: Timestamp
- `updated_at`: Timestamp
- `completed_at`: Completion timestamp

#### User
- `id` (PK): Unique identifier
- `username`: Login username
- `email`: Email address
- `full_name`: Display name
- `password_hash`: Encrypted password
- `role_id` (FK): User role
- `department_id` (FK): User's department
- `is_active`: Active status
- `created_at`: Timestamp
- `last_login`: Last login timestamp

#### Department
- `id` (PK): Unique identifier
- `name`: Department name
- `code`: Department code
- `parent_id` (FK): Parent department (for hierarchy)
- `head_user_id` (FK): Department head

#### Role
- `id` (PK): Unique identifier
- `name`: Role name
- `description`: Role description
- `permissions`: JSON field with permission flags

#### Approval
- `id` (PK): Unique identifier
- `document_id` (FK): Document being approved
- `approver_id` (FK): User who approves
- `approval_level`: Level in hierarchy (1, 2, 3, etc.)
- `status`: Pending, Approved, Rejected
- `comments`: Approval comments
- `action_date`: When action was taken

#### Meeting Room
- `id` (PK): Unique identifier
- `name`: Room name
- `location`: Physical location
- `capacity`: Maximum occupancy
- `facilities`: JSON field (projector, whiteboard, etc.)
- `is_active`: Availability status

#### Booking
- `id` (PK): Unique identifier
- `room_id` (FK): Meeting room
- `booked_by` (FK): User who booked
- `title`: Meeting title
- `description`: Meeting description
- `start_time`: Start datetime
- `end_time`: End datetime
- `attendees_count`: Number of attendees
- `status`: Confirmed, Cancelled, Completed
- `created_at`: Timestamp

#### Audit Log
- `id` (PK): Unique identifier
- `entity_type`: Type of entity (Document, WorkOrder, etc.)
- `entity_id`: ID of the entity
- `action`: Action performed (CREATE, UPDATE, DELETE, APPROVE, etc.)
- `user_id` (FK): User who performed action
- `old_value`: Previous state (JSON)
- `new_value`: New state (JSON)
- `timestamp`: When action occurred
- `ip_address`: User's IP address

### Relationship Mappings
- User → Department: Many-to-One
- User → Role: Many-to-One
- Document → Department: Many-to-One
- Document → User (creator): Many-to-One
- Approval → Document: Many-to-One
- Approval → User: Many-to-One
- WorkOrder → User (assigned): Many-to-One
- WorkOrder → Department: Many-to-One
- Booking → MeetingRoom: Many-to-One
- Booking → User: Many-to-One
- AuditLog → User: Many-to-One

### Special Tables
- **Audit Log**: Tracks all changes to critical entities
- **Document Version History**: Stores previous versions of documents
- **Notification Queue**: Pending notifications to be sent

### Data Lifecycle Rules
1. **Soft Delete**: Documents are marked as deleted, not physically removed
2. **Archive After**: Documents past review date are flagged for archival
3. **Retention Policy**: Audit logs retained for [TBD] years
4. **Version Pruning**: Old versions beyond [TBD] count may be archived to cold storage

## 7. 🧠 Domain Vocabulary / Glossary

### Business Terminology

| Indonesian Term | English Translation | Definition |
|----------------|-------------------|------------|
| **SOP** | Standard Operating Procedure | Documented step-by-step instructions for routine operations |
| **Kebijakan** | Policy | High-level organizational rules and guidelines |
| **Instruksi Kerja** | Work Instruction | Detailed, task-specific instructions |
| **Manual Mutu** | Quality Manual | Comprehensive quality management system documentation |
| **Panduan Aplikasi** | Application Guide | User guides for software/systems |
| **Jobdesk** | Job Description | Role responsibilities and duties |
| **Struktur Organisasi** | Organizational Structure | Company hierarchy and reporting lines |
| **Work Order** | Work Order | Task assignment and tracking document |

### Technical Terminology

| Term | Definition |
|------|------------|
| **Prompter** | Spec-driven development framework for managing changes and specifications |
| **Change ID** | Unique kebab-case identifier for proposed changes |
| **Spec Delta** | Incremental change to specification (ADDED/MODIFIED/REMOVED) |
| **Capability** | Functional area or feature domain in the system |
| **Scenario** | Concrete example of requirement behavior (WHEN/THEN format) |

### Status/State Enumerations

#### Document Status
- `draft`: Document being created
- `submitted`: Awaiting review
- `in_review`: Under active review
- `approved`: Passed approval
- `rejected`: Failed approval
- `published`: Active and accessible
- `archived`: No longer active

#### Work Order Status
- `new`: Just created
- `assigned`: Given to someone
- `in_progress`: Being worked on
- `on_hold`: Temporarily paused
- `review`: Ready for verification
- `completed`: Work finished
- `closed`: Fully processed
- `cancelled`: No longer needed

#### Approval Status
- `pending`: Awaiting approver action
- `approved`: Approver accepted
- `rejected`: Approver denied

#### Priority Levels
- `low`: Can be delayed
- `medium`: Normal priority
- `high`: Needs attention soon
- `critical`: Urgent, immediate attention

### Workflow Stage Naming

#### SOP Lifecycle Stages
1. **Drafting**: Initial creation
2. **Submission**: Sent for review
3. **Review**: Evaluation phase
4. **Approval**: Decision phase
5. **Publication**: Release to users
6. **Active Use**: In effect
7. **Review Due**: Scheduled re-evaluation
8. **Archival**: End of life

#### Work Order Lifecycle Stages
1. **Request**: Initial submission
2. **Assignment**: Resource allocation
3. **Execution**: Work performance
4. **Verification**: Quality check
5. **Closure**: Completion and sign-off

## 8. 👥 Target Users & Personas

### User Roles

| Role | Description | Primary Functions | Access Level |
|------|-------------|-------------------|--------------|
| **Administrator** | System admin with full access | User management, system configuration, role assignment, global settings | Full (all modules) |
| **Quality Manager** | Oversees quality management system | Approve high-level policies and SOPs, audit trail review, compliance monitoring | High (read all, approve critical) |
| **Department Head** | Manages department operations | Approve department-level documents, assign work orders, view department reports | Medium (department scope) |
| **Document Controller** | Manages document lifecycle | Create/edit documents, manage versions, track review dates, archive documents | Medium (document management) |
| **Approver** | Reviews and approves documents | Review submitted documents, approve/reject with comments | Medium (approval workflows) |
| **Staff/Employee** | Regular user | View published documents, submit requests, create drafts, book meeting rooms | Low (read published, edit own) |
| **Auditor** | Reviews compliance | View all documents, access audit trails, generate compliance reports | High (read-only) |
| **Guest/Viewer** | External or limited user | View specific published documents (no editing) | Minimal (read-only, limited scope) |

### Permission Matrices

#### Document Management

| Action | Admin | Quality Mgr | Dept Head | Doc Controller | Approver | Staff | Auditor | Guest |
|--------|-------|-------------|-----------|----------------|----------|-------|---------|-------|
| Create Draft | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Edit Own Draft | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Edit Any Draft | ✅ | ✅ | 🟡 Dept Only | ✅ | ❌ | ❌ | ❌ | ❌ |
| Submit for Approval | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Approve Document | ✅ | ✅ | 🟡 Dept Only | ❌ | ✅ | ❌ | ❌ | ❌ |
| Publish Document | ✅ | ✅ | 🟡 Dept Only | ✅ | ❌ | ❌ | ❌ | ❌ |
| Archive Document | ✅ | ✅ | 🟡 Dept Only | ✅ | ❌ | ❌ | ❌ | ❌ |
| View Published | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 Limited |
| View Audit Trail | ✅ | ✅ | 🟡 Dept Only | ✅ | ❌ | ❌ | ✅ | ❌ |
| Delete Document | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

#### Work Order Management

| Action | Admin | Quality Mgr | Dept Head | Doc Controller | Approver | Staff | Auditor |
|--------|-------|-------------|-----------|----------------|----------|-------|---------|
| Create WO | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Assign WO | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Update Status | ✅ | ✅ | ✅ | 🟡 Assigned | 🟡 Assigned | 🟡 Assigned | ❌ |
| Close WO | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| View All WO | ✅ | ✅ | 🟡 Dept Only | ✅ | 🟡 Dept Only | 🟡 Own Only | ✅ |

#### System Administration

| Action | Admin | Quality Mgr | Others |
|--------|-------|-------------|--------|
| Manage Users | ✅ | ❌ | ❌ |
| Manage Roles | ✅ | ❌ | ❌ |
| Manage Departments | ✅ | 🟡 View Only | ❌ |
| System Settings | ✅ | ❌ | ❌ |
| View Reports | ✅ | ✅ | 🟡 Limited |

Legend: ✅ Full Access | 🟡 Partial/Conditional | ❌ No Access

### Capability Mappings per Role

#### Administrator
- Full CRUD on all entities
- User and role management
- System configuration
- Global reports and analytics
- Database maintenance

#### Quality Manager
- Approve critical/organization-level documents
- Monitor compliance metrics
- Generate quality reports
- Review audit trails
- Define quality standards

#### Department Head
- Manage department documents
- Assign and track work orders
- Approve department-level changes
- View department performance
- Manage department staff tasks

#### Document Controller
- Document lifecycle management
- Version control
- Review date tracking
- Document archival
- Template management

#### Approver
- Review pending approvals
- Approve/reject with feedback
- Track approval history
- Delegate approvals (if applicable)

#### Staff/Employee
- Access published documents
- Create document drafts
- Submit requests and work orders
- Book meeting rooms
- Update own work order status

#### Auditor
- Read-only access to documents
- Full audit trail access
- Compliance report generation
- Export capabilities
- No modification rights

### Access Patterns
- **Dashboard View**: Role-specific widgets and metrics
- **Navigation**: Menu items filtered by role permissions
- **Document Lists**: Filtered by department and permissions
- **Search**: Scoped to user's accessible documents
- **Notifications**: Relevant to user's role and responsibilities

## 9. ✨ UI/UX Principles

### Layout and Navigation Patterns

#### Global Layout Structure
```
┌────────────────────────────────────────────────────────────┐
│ Header: Logo | Search | Notifications | Profile            │
├──────────┬─────────────────────────────────────────────────┤
│          │                                                  │
│ Sidebar  │  Main Content Area                              │
│ (Collap- │  - Breadcrumb                                   │
│  sible)  │  - Page Title + Actions                         │
│          │  - Content (Tables, Forms, Cards)               │
│          │  - Pagination (if applicable)                   │
│          │                                                  │
└──────────┴─────────────────────────────────────────────────┘
```

#### Navigation Hierarchy
1. **Top Navigation**: Global actions (search, notifications, profile)
2. **Sidebar Navigation**: Module/feature access (collapsible on mobile)
3. **Breadcrumbs**: Current location context
4. **Page Actions**: Contextual buttons (Add, Export, Filter)

#### Responsive Behavior
- **Desktop (≥1024px)**: Full sidebar visible, multi-column layouts
- **Tablet (768-1023px)**: Collapsible sidebar, 2-column layouts
- **Mobile (<768px)**: Hidden sidebar (toggle menu), single-column layouts, stacked forms

### Form Validation UX Rules

#### Real-time Validation
- **On Blur**: Validate field when user leaves it
- **On Submit**: Final validation before submission
- **Inline Feedback**: Show errors immediately below field
- **Success Indicators**: Green checkmark for valid fields

#### Error Display
```
[Field Label] *
┌─────────────────────────────────────┐
│ [Invalid Input]                     │ 
└─────────────────────────────────────┘
⚠️ Error message in red text
```

#### Validation Rules Display
- Required fields marked with `*` (asterisk)
- Field helper text shows format requirements
- Character count for limited fields
- Date picker for date fields (prevent manual entry errors)

#### Success Feedback
- Toast notification on successful save
- Green success banner for form submission
- Redirect to list view or detail view after creation
- Confirmation modal for critical actions

### Role-Based UI Adaptations

#### Admin View
- Full sidebar with all modules visible
- "Administration" section in menu
- Bulk action buttons (bulk approve, bulk delete)
- Advanced filters and settings

#### Staff View
- Simplified sidebar (only relevant modules)
- Limited action buttons
- Read-only mode for published documents
- Simplified forms (fewer fields)

#### Mobile View (All Roles)
- Bottom navigation bar for primary actions
- Swipe gestures for actions (delete, archive)
- Simplified tables (condensed columns)
- Large touch targets (min 44x44px)

### Accessibility Requirements

#### WCAG 2.1 Level AA Compliance
- **Keyboard Navigation**: All functions accessible via keyboard
- **Focus Indicators**: Visible focus outlines on interactive elements
- **Screen Reader Support**: Proper ARIA labels and landmarks
- **Color Contrast**: Minimum 4.5:1 for text, 3:1 for UI components
- **Text Resize**: Support up to 200% zoom without loss of functionality
- **Alt Text**: All images have descriptive alt attributes
- **Form Labels**: All inputs have associated labels

#### Assistive Technology Support
- Semantic HTML5 elements
- Skip navigation links
- ARIA live regions for dynamic content
- Focus management for modals and dialogs

### Design Patterns

#### Data Tables
- Sortable columns (click header)
- Pagination (show page size selector)
- Search/filter above table
- Row actions (view, edit, delete)
- Bulk selection checkboxes (for applicable roles)

#### Modals/Dialogs
- Close on ESC key
- Close on backdrop click
- Trap focus within modal
- Confirm destructive actions
- Scroll within modal if content overflows

#### Notifications
- Toast messages (bottom-right, auto-dismiss in 5s)
- Persistent alerts (for critical messages)
- Stacked notifications (max 3 visible)
- Action buttons in notifications (undo, view)

#### Status Indicators
- Color coding: Green (approved), Yellow (pending), Red (rejected), Gray (draft)
- Icons with text labels (don't rely on color alone)
- Progress indicators for multi-step processes
- Loading spinners for async operations

## 10. 🔒 Security & Privacy Rules

### Authentication Model
- **Method**: Session-based authentication (TBD: may use JWT for API)
- **Password Policy**:
  - Minimum 8 characters
  - Must include uppercase, lowercase, number, and special character
  - Password expiry: 90 days (configurable)
  - Password history: Cannot reuse last 5 passwords
- **Session Management**:
  - Session timeout: 30 minutes of inactivity
  - Concurrent session limit: [TBD] per user
  - Force logout on password change
- **Multi-Factor Authentication**: (Planned, not yet implemented)
- **Account Lockout**: 5 failed login attempts → lock for 15 minutes

### Authorization/RBAC Implementation
- **Role-Based Access Control**: Permissions assigned to roles, roles assigned to users
- **Department-Based Isolation**: Users by default see only their department's data
- **Resource-Level Permissions**: Check permissions at entity level (can user edit THIS document?)
- **Hierarchical Roles**: Department heads inherit staff permissions + additional capabilities
- **Permission Checks**: Server-side validation (client-side hiding is UX only, not security)

### Audit Logging Requirements

#### Events to Log
1. **Authentication Events**: Login, logout, failed login attempts, password changes
2. **Authorization Events**: Permission denied, role changes, access attempts
3. **Data Events**: Create, update, delete operations on critical entities
4. **Workflow Events**: Document submit, approve, reject, publish, archive
5. **Administrative Events**: User creation, role assignment, system configuration changes

#### Log Data Structure
```json
{
  "timestamp": "2026-02-10T10:30:00Z",
  "event_type": "DOCUMENT_APPROVED",
  "user_id": 123,
  "username": "john.doe",
  "ip_address": "192.168.1.100",
  "entity_type": "sop",
  "entity_id": 456,
  "action": "APPROVE",
  "details": {
    "document_title": "IT Security SOP",
    "previous_status": "submitted",
    "new_status": "approved",
    "comments": "Approved with minor suggestions"
  },
  "session_id": "sess_abc123"
}
```

#### Log Retention
- **Critical Logs** (auth, data changes): 7 years
- **Operational Logs**: 1 year
- **Debug Logs**: 30 days
- **Compliance**: Meet ISO 9001 and local regulations

### Sensitive Data Handling Protocols

#### Data Classification
1. **Public**: Published documents marked as public
2. **Internal**: Default classification for organizational documents
3. **Confidential**: HR documents, financial data
4. **Restricted**: Executive-level policies, strategic documents

#### Encryption
- **In Transit**: HTTPS/TLS 1.2+ for all communication
- **At Rest**: Database encryption for sensitive fields (passwords, PII)
- **Password Storage**: Bcrypt or Argon2 hashing (never plaintext)
- **File Uploads**: Virus scanning before storage

#### Data Masking
- Passwords: Never displayed, always masked
- Audit logs: PII partially masked in UI (full data in secure storage)
- Export/Reports: Redact sensitive fields based on user role

#### Privacy Compliance
- **Data Minimization**: Collect only necessary information
- **Right to Access**: Users can view their personal data
- **Right to Deletion**: Implement data purging for user accounts (retain audit trail)
- **Consent Management**: Track user consent for data processing (if applicable)

#### Secure File Handling
- **Upload Validation**: Whitelist allowed file types (PDF, DOC, DOCX, XLS, XLSX)
- **File Size Limit**: Max [TBD]MB per file
- **Virus Scanning**: All uploads scanned before storage
- **Access Control**: File downloads require authentication and authorization check
- **Secure Storage**: Files stored outside web root, accessed via controlled endpoint

#### API Security (When Implemented)
- **Rate Limiting**: Prevent brute force and DoS attacks
- **Input Validation**: Sanitize all inputs, prevent SQL injection and XSS
- **CORS Policy**: Restrict cross-origin requests
- **API Keys/Tokens**: Secure API access with revocable tokens
- **Output Encoding**: Encode all dynamic content to prevent XSS

## 11. 🤖 Coding Conventions & Standards

### Naming Conventions

#### Files
- **HTML**: `kebab-case.html` (e.g., `add-sop.html`, `booking-meeting-room.html`)
- **CSS**: `kebab-case.css` (e.g., `style.css`, `custom.css`)
- **JavaScript**: `kebab-case.js` OR `camelCase.js` (e.g., `script.js`, `modal.js`, `appendscript.js`)
- **Images**: `kebab-case.png/jpg/svg` (e.g., `logo.svg`, `avatar-01.jpg`)

#### Functions (JavaScript)
- **camelCase** for function names: `validateForm()`, `handleSubmit()`, `loadUserData()`
- **PascalCase** for constructor functions/classes: `DocumentManager()`, `UserService()`

#### Variables (JavaScript)
- **camelCase**: `userName`, `documentId`, `isActive`
- **UPPER_CASE** for constants: `MAX_FILE_SIZE`, `API_ENDPOINT`
- **Descriptive names**: Avoid single letters except loop counters (`i`, `j`)

#### CSS Classes
- **BEM Methodology** (where applicable): `block__element--modifier`
  - Example: `card__title--highlighted`, `btn--primary`, `form__input--error`
- **Bootstrap classes**: Keep Bootstrap semantic classes (e.g., `btn`, `btn-primary`, `form-control`)
- **Custom classes**: Prefix with project code if needed: `dios-header`, `dios-sidebar`

#### HTML IDs
- **camelCase** or **kebab-case**: `userId`, `user-id`, `documentForm`, `document-form`
- **Unique per page**: Never duplicate IDs
- **Semantic**: Describe the element: `submitButton`, `errorMessage`

### File Organization Patterns

#### Template Files
```
template/
├── [page-name].html              # Main page files (root level)
├── assets/
│   ├── css/
│   │   ├── bootstrap*.css        # Framework files (unchanged)
│   │   ├── style.css             # Main custom styles
│   │   ├── custom.css            # Additional customizations
│   │   └── [plugin-name].css     # Plugin styles
│   ├── js/
│   │   ├── jquery*.js            # Library files (unchanged)
│   │   ├── bootstrap*.js         # Framework files (unchanged)
│   │   ├── script.js             # Main application logic
│   │   ├── modal.js              # Modal-specific logic
│   │   ├── validation.js         # Form validation
│   │   └── [feature-name].js     # Feature-specific scripts
│   ├── img/
│   │   └── [category]/           # Organized by type (avatar, icons, etc.)
│   └── plugins/
│       └── [plugin-name]/        # Third-party plugin folders
└── public/
    └── uploads/                  # User-generated files
```

#### JavaScript Module Pattern
```javascript
// Feature module pattern
(function($) {
    'use strict';
    
    // Module-level variables
    var config = {
        apiUrl: '/api/v1',
        timeout: 5000
    };
    
    // Private functions
    function privateHelper() {
        // ...
    }
    
    // Public API
    window.MyModule = {
        init: function() {
            // Initialization
        },
        publicMethod: function() {
            // Public functionality
        }
    };
    
})(jQuery);

// Usage
$(document).ready(function() {
    MyModule.init();
});
```

### Error Handling Standards

#### JavaScript Error Handling
```javascript
// Try-catch for async operations
try {
    const result = await apiCall();
    handleSuccess(result);
} catch (error) {
    console.error('Error in apiCall:', error);
    showErrorMessage('Unable to complete the operation. Please try again.');
    // Optional: Log to error tracking service
}

// Form validation errors
function validateForm(formData) {
    const errors = [];
    
    if (!formData.title) {
        errors.push({ field: 'title', message: 'Title is required' });
    }
    
    if (errors.length > 0) {
        displayErrors(errors);
        return false;
    }
    
    return true;
}
```

#### User-Facing Error Messages
- **Generic error**: "An error occurred. Please try again."
- **Network error**: "Unable to connect. Please check your internet connection."
- **Validation error**: Specific field-level messages ("Email format is invalid")
- **Permission error**: "You don't have permission to perform this action."
- **Not found error**: "The requested document was not found."

#### HTTP Error Handling (Future API)
- **4xx errors**: Display user-friendly message, log details
- **5xx errors**: Display generic error, log full stack trace, alert administrators
- **Retry logic**: For transient failures (network timeouts)

### Logging Conventions

#### Console Logging Levels
```javascript
// Development only (remove in production)
console.log('Debug info:', data);           // General debugging

// Keep in production
console.warn('Warning:', warningMessage);   // Non-critical issues
console.error('Error:', errorObject);       // Errors and exceptions

// Using structured logging (if logger library added)
logger.info('User logged in', { userId: 123, timestamp: new Date() });
logger.error('Failed to save document', { documentId: 456, error: err });
```

#### Log Message Format
```
[TIMESTAMP] [LEVEL] [MODULE] Message - AdditionalContext
2026-02-10 10:30:00 ERROR DocumentService Failed to save - {documentId: 456, userId: 123}
```

#### What to Log
- **DO LOG**:
  - User actions (login, logout, create, update, delete)
  - System errors and exceptions
  - Performance issues (slow queries, timeouts)
  - Security events (failed auth, permission denied)
  - Integration failures (external API calls)
  
- **DON'T LOG**:
  - Passwords or sensitive credentials
  - Full credit card numbers or PII (mask if needed)
  - Excessive debug info in production

### API Response Format Specifications (Future)

#### Success Response
```json
{
  "success": true,
  "data": {
    "id": 123,
    "title": "IT Security SOP",
    "status": "published"
  },
  "message": "Document created successfully",
  "timestamp": "2026-02-10T10:30:00Z"
}
```

#### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "title",
        "message": "Title is required"
      },
      {
        "field": "effective_date",
        "message": "Effective date must be in the future"
      }
    ]
  },
  "timestamp": "2026-02-10T10:30:00Z"
}
```

#### Pagination Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 150,
    "total_pages": 8
  },
  "timestamp": "2026-02-10T10:30:00Z"
}
```

#### Status Codes
- `200 OK`: Successful GET, PUT, PATCH
- `201 Created`: Successful POST
- `204 No Content`: Successful DELETE
- `400 Bad Request`: Validation errors
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate resource
- `422 Unprocessable Entity`: Business logic error
- `500 Internal Server Error`: Server error

## 12. 🧩 AI Agent Development Rules

### Invention Prohibitions

**CRITICAL: AI agents SHALL NOT invent, assume, or create any of the following without explicit documentation:**

#### ❌ NEVER Invent:
1. **Data Fields**: Do not add database fields, entity properties, or API parameters not defined in ERD or API Contract
2. **Business Rules**: Do not create validation rules, workflow logic, or constraints not specified in FSD
3. **API Endpoints**: Do not implement endpoints not documented in API Contract
4. **User Flows**: Do not design screens or interactions not outlined in FSD or UI Wireframes
5. **Permissions**: Do not assign role-based access controls not defined in specifications
6. **Status Values**: Do not add enum values or state transitions not documented
7. **Integration Points**: Do not add external service integrations not specified
8. **Configuration Options**: Do not create settings or config parameters not approved

#### ⚠️ When Specification is Ambiguous:
1. **STOP**: Do not proceed with assumptions
2. **FLAG**: Add the ambiguity to Section 23 (Missing Information) in proposal
3. **ASK**: Request clarification via proposal comments or questions
4. **DOCUMENT**: Record the decision once clarified
5. **PROCEED**: Only after explicit confirmation

### Document Dependency Enforcement

**Mandatory Dependency Chain:**

```
Product Brief → PRD → FSD → ERD → API Contract → UI Wireframes → TDD-Lite → Epics → Stories
```

#### Before Creating Any Document:

| Creating | Must Have Existing |
|----------|-------------------|
| PRD | Product Brief |
| FSD | PRD |
| ERD | FSD |
| API Contract | FSD + ERD |
| UI Wireframes | FSD + ERD + API Contract |
| TDD-Lite | FSD + ERD + API Contract + UI Wireframes |
| Epics | FSD + TDD-Lite |
| Stories | Epics + FSD |

#### Enforcement Rules:
1. **Check Existence**: Before generating any document, verify all dependencies exist in `prompter/`
2. **Validate Content**: Ensure upstream documents are complete (not stubs)
3. **Halt if Missing**: If dependency missing, create proposal to generate it first
4. **Cross-Reference**: Link back to source documents (e.g., "As specified in FSD Section 3.2...")

### Style Matching Requirements

When editing existing documents:
1. **Preserve Tone**: Match formality level and writing style
2. **Maintain Structure**: Keep existing section hierarchy and organization
3. **Follow Format**: Use same markdown conventions (heading levels, lists, code blocks)
4. **Consistent Terminology**: Use exact terms from existing content (don't synonym-swap)
5. **Version Notation**: Add version/date metadata when updating

When creating new documents:
1. **Use Templates**: Follow Prompter templates in `prompter/core/`
2. **Match Project Style**: Review similar existing specs for style guidance
3. **Clear Headers**: Use hierarchical headings (##, ###, ####)
4. **Scannable**: Use tables, lists, and diagrams for readability

### Modification Scope Limits

#### Allowed Modifications:
- ✅ Implement changes within approved scope of `tasks.md`
- ✅ Fix bugs that restore intended behavior (no spec change)
- ✅ Update comments and documentation
- ✅ Refactor code without changing external behavior
- ✅ Add tests for existing functionality

#### Requires New Proposal:
- 🔄 Add new features or capabilities
- 🔄 Change API contracts (endpoints, request/response format)
- 🔄 Modify database schema (add/remove/rename fields)
- 🔄 Change user-facing behavior or workflows
- 🔄 Update security or permissions model
- 🔄 Integrate new external services
- 🔄 Change architectural patterns

#### Scope Creep Detection:
If during implementation you find:
- "This would be better if..."
- "While I'm here, I could also..."
- "Users might need..."

**STOP** → File new proposal → Get approval → Then implement

### Risk Acknowledgment Protocols

Before making high-risk changes, acknowledge:

#### High-Risk Change Categories:
1. **Schema Changes**: Data migration, potential data loss
2. **Authentication/Authorization**: Security implications
3. **External Integrations**: Dependency on third-party availability
4. **Performance**: Potential for degradation
5. **Breaking Changes**: Affects existing clients/users

#### Risk Documentation Template:
```markdown
## Risk Assessment

### Change Category: [Schema Change / Auth / Integration / Performance / Breaking]

### Risks:
1. **[Risk Description]**
   - Probability: [Low / Medium / High]
   - Impact: [Low / Medium / High]
   - Mitigation: [Strategy]

### Rollback Plan:
- [Steps to revert if deployment fails]

### Testing Requirements:
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual QA
- [ ] Performance benchmarks
- [ ] Security review
```

### Output Format Requirements

#### For Proposals (Creation Stage):
- **Format**: Markdown
- **Files**: 
  - `proposal.md` (why, what, impact)
  - `tasks.md` (implementation checklist)
  - `design.md` (if architectural decision needed)
  - Spec deltas in `specs/[capability]/spec.md`
- **Validation**: Must pass `prompter validate <change-id> --strict --no-interactive`

#### For Code Changes (Implementation Stage):
- **Diff Format**: Git-style diffs or explicit old/new code blocks
- **File Edits**: Use `replace_string_in_file` with sufficient context (3-5 lines before/after)
- **New Files**: Use `create_file` with full content
- **Commit Messages**: Follow convention:
  ```
  <type>(<scope>): <subject>
  
  [optional body]
  
  [optional footer]
  ```
  Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

#### For Archival (Archive Stage):
- **Command**: `prompter archive <change-id> --yes` (automated, non-interactive)
- **Spec Updates**: Merge deltas into main specs (automated by Prompter)
- **Documentation**: Update AGENTS.md if capabilities added
- **Validation**: Run `prompter validate --strict` after archive

### Cascade Regeneration Triggers

When a document changes, the following downstream documents MUST be regenerated or updated:

| Document Changed | Regenerate |
|------------------|------------|
| Product Brief | PRD, FSD, ERD, API Contract, UI Wireframes, TDD-Lite, Epics, Stories |
| PRD | FSD, ERD, API Contract, UI Wireframes, TDD-Lite, Epics, Stories |
| FSD | ERD, API Contract, UI Wireframes, TDD-Lite, Epics, Stories |
| ERD | API Contract, UI Wireframes, TDD-Lite, Epics, Stories |
| API Contract | UI Wireframes, TDD-Lite, Epics, Stories |
| UI Wireframes | TDD-Lite, Epics, Stories |
| TDD-Lite | Epics, Stories |
| Epics | Stories |

#### Trigger Protocol:
1. **Detect Change**: Monitor git commits or file modifications to `prompter/` documents
2. **Identify Dependents**: Use matrix above to determine affected documents
3. **Flag for Review**: Create tracking issue listing documents needing update
4. **Regenerate**: Create proposal to update each document
5. **Validate**: Ensure consistency across all updated documents

#### Exception Cases:
- **Minor Edits**: Typo fixes, formatting changes → no cascade
- **Additive Changes**: New optional fields → may not require full cascade
- **Deprecated Features**: Removal may only affect subset of dependents

**Rule**: When in doubt, regenerate. Inconsistent specs are worse than over-regeneration.

## 13. 🗺️ Integration Map

### External Service Integrations
**Current**: None

**Planned**:
1. **Email Service** (e.g., SMTP, SendGrid, AWS SES)
   - Purpose: Notifications, password reset, approval requests
   - Integration Type: Asynchronous via job queue
   - Fallback: Store in notification table if delivery fails

2. **File Storage** (e.g., AWS S3, Azure Blob, local filesystem)
   - Purpose: Document file storage
   - Integration Type: Synchronous API calls
   - Fallback: Local filesystem initially

3. **Authentication Provider** (Optional: LDAP, Active Directory, OAuth)
   - Purpose: Single Sign-On (SSO) integration
   - Integration Type: Authentication middleware
   - Fallback: Local authentication database

4. **Document Virus Scanning** (e.g., ClamAV, VirusTotal API)
   - Purpose: Scan uploaded files for malware
   - Integration Type: Synchronous before file save
   - Fallback: Block upload if service unavailable (security-first)

5. **Audit Log Export** (e.g., Splunk, ELK Stack, CloudWatch)
   - Purpose: Centralized log aggregation
   - Integration Type: Asynchronous log shipping
   - Fallback: Local log files

### Internal Service Communication
**Current**: Monolithic frontend (no backend services yet)

**Planned Architecture** (Microservices or Modular Monolith):
1. **Authentication Service** ↔ All other services
   - Protocol: JWT token validation
   - Communication: RESTful API or internal function calls

2. **Document Service** ↔ Workflow Service
   - Protocol: REST API or event bus
   - Communication: Document state changes trigger workflow events

3. **Notification Service** ← Triggered by multiple services
   - Protocol: Message queue (RabbitMQ, Redis, or database queue)
   - Communication: Publish-subscribe pattern

4. **Reporting Service** → Reads from all data sources
   - Protocol: Direct database reads or API calls
   - Communication: Read-only access, no writes

### Webhook Configurations
**Planned**:
1. **External Approval Systems**: Receive approval status from external tools
2. **Calendar Integration**: Sync meeting room bookings with external calendars (Google, Outlook)
3. **Third-Party Notifications**: Slack, Microsoft Teams integration for alerts

### Async Job Dependencies
**Planned Job Queue System**:

1. **Email Jobs**
   - Send notification emails
   - Priority: Medium
   - Retry: 3 attempts with exponential backoff

2. **Document Generation Jobs**
   - Generate PDF exports of documents
   - Priority: Low
   - Retry: 2 attempts

3. **Report Generation Jobs**
   - Create large reports (audit logs, compliance reports)
   - Priority: Low
   - Retry: 1 attempt

4. **Data Cleanup Jobs**
   - Archive old logs, purge deleted records
   - Priority: Low
   - Scheduled: Daily/weekly

5. **Reminder Jobs**
   - Send document review reminders
   - Priority: Medium
   - Scheduled: Daily check

## 14. 🗺️ Roadmap & Future Plans

### Completed
- [x] **Baseline Specifications** (February 2026): 16 capability specifications with 76 requirements
  - Cross-cutting: Authentication, Authorization, Audit Logging, Notifications, Dashboard
  - Document Management: SOP, Policy, Work Instructions, Quality Manual, App Guide
  - Workflows: Work Orders, Meeting Rooms
  - Organizational: Structure, Jobdesk
  - Additional: Customer Requests, Forms
- [x] **Architectural Decisions** (February 2026): Laravel + MySQL + React stack defined in design.md

### Planned Features

#### Phase 1: Core Backend Implementation (Next Priority)
- [ ] Backend framework setup (Laravel 10.x/11.x per design.md)
- [ ] Database schema implementation (MySQL 8.x)
- [ ] REST API development (JSON API per design.md)
- [ ] User authentication and authorization (Laravel Sanctum)
- [ ] Document CRUD operations
- [ ] Basic approval workflow

#### Phase 2: Advanced Workflow Features
- [ ] Multi-level approval workflows (configurable)
- [ ] Document version control and comparison
- [ ] Advanced search and filtering
- [ ] Dashboard analytics and reporting
- [ ] Email notification system
- [ ] Document review reminders and scheduling

#### Phase 3: Frontend Migration
- [ ] React.js 18.x setup with Vite
- [ ] Component library (React Bootstrap)
- [ ] Module-by-module jQuery to React migration
- [ ] State management (React Context, migrate to Redux if needed)
- [ ] API integration layer
- [ ] Responsive mobile optimization

#### Phase 4: Collaboration & Integration
- [ ] Real-time collaborative document editing
- [ ] Comments and annotations on documents
- [ ] Integration with external calendar systems
- [ ] Mobile application (iOS/Android)
- [ ] API for third-party integrations
- [ ] Webhook support

#### Phase 5: Advanced Features
- [ ] AI-powered document suggestions and templates
- [ ] Automated compliance checking
- [ ] Advanced analytics and predictive insights
- [ ] Multi-language support (Indonesian + English)
- [ ] Offline mode support
- [ ] Document e-signature integration

### Deferred Scope Items
- **Advanced AI Features**: Document auto-classification, content generation (deferred to Phase 4+)
- **Blockchain Integration**: For immutable audit trails (future consideration)
- **Advanced Biometrics**: Fingerprint/facial recognition authentication (future consideration)
- **Full ERP Integration**: Integrate with accounting, HR, CRM systems (deferred pending partnerships)
- **Custom Report Builder**: Drag-and-drop report designer (Phase 3+)

### Technical Debt Register
1. **Specification Archival**: Completed baseline specs need to be archived using `prompter archive establish-baseline-specs --yes`
2. **Frontend Framework Migration**: Consider migrating from jQuery to React (architecture decision documented in design.md)
3. **Build Process**: Implement build pipeline (vite per design.md) for asset optimization
4. **CSS Refactoring**: Consolidate custom CSS, remove unused styles, implement CSS-in-JS or CSS modules
5. **JavaScript Modularization**: Split monolithic `script.js` into feature-based modules
6. **Accessibility Improvements**: Full WCAG 2.1 AA compliance audit and fixes
7. **Performance Optimization**: Implement lazy loading, code splitting, image optimization
8. **Test Coverage**: Add unit, integration, and E2E tests (currently 0% coverage)
9. **Documentation**: Generate API documentation, component library, developer guide after backend implementation

## 15. ⚠️ Known Issues & Limitations

### Architectural Constraints
1. **No Backend**: Current implementation is static templates only; all data is mocked or client-side
2. **No Data Persistence**: Forms do not actually save data to a database
3. **No Authentication**: Login pages exist but do not perform actual authentication
4. **Client-Side Security**: Security rules are UI-only; backend will need to enforce all permissions
5. **No Real-Time**: No WebSocket or real-time update capability currently

### Performance Considerations
1. **Large Tables**: DataTables may perform poorly with >1000 rows without server-side pagination
2. **File Uploads**: Large file uploads will timeout without proper chunking implementation
3. **Image Loading**: No lazy loading; all images load on page load
4. **JavaScript Bundling**: All scripts load synchronously; blocking render
5. **CSS Size**: Large CSS files (Bootstrap + plugins) increase initial load time

### Incomplete Implementations
1. **Backend System**: No backend exists yet; specifications complete, implementation pending
2. **Search Functionality**: Search UI exists but is non-functional (placeholder)
3. **Notifications**: Notification bell UI is static; specification complete (3 requirements)
4. **User Profile**: Profile dropdown exists but profile management not implemented
5. **Export Features**: Export buttons present but do not generate files
6. **Advanced Filters**: Filter UI exists but lacks backend filtering logic
7. **Calendar Integration**: Meeting room calendar is client-side only; specification complete (4 requirements)
8. **Approval Workflow**: Workflow UI present but state machine logic not implemented; specification complete (part of document management specs)
9. **Audit Trail Viewer**: UI placeholder exists but no actual log querying; specification complete (8 requirements)

### Known Bugs/Workarounds
1. **Mobile Sidebar**: May not close properly on some iOS devices → use explicit close button
2. **Date Picker Locale**: Calendar locale hardcoded to English → needs Indonesian locale file
3. **Modal Scroll**: Long modals may not scroll properly on some mobile browsers → use modal body scroll wrapper
4. **DataTables Responsive**: Some complex tables lose functionality on mobile → simplify column set for mobile
5. **File Upload Preview**: PDF preview may not work on all browsers → fallback to filename display

### Browser Compatibility
- **Tested**: Chrome 90+, Firefox 88+, Edge 90+
- **Partially Supported**: Safari 14+ (some CSS issues)
- **Not Tested**: IE 11, older mobile browsers
- **Known Issues**: 
  - CSS Grid support required (no IE11)
  - Flexbox used extensively
  - ES6 JavaScript (may need transpilation for older browsers)

## 16. 🧪 Testing Strategy

### Unit Test Approach and Coverage Targets
**Current**: No unit tests exist

**Planned**:
- **Coverage Target**: 80% for business logic, 60% for UI components
- **Framework**: Jest (JavaScript), pytest (if Python backend), PHPUnit (if PHP backend)
- **Scope**:
  - Input validation functions
  - Business logic functions
  - Data transformation utilities
  - API endpoint handlers
- **Mocking**: Mock external services, database calls, file system operations
- **CI Integration**: Run on every commit, block merge if coverage drops

### Integration Test Patterns
**Planned**:
- **Framework**: Supertest (API testing), Cypress (E2E with integration)
- **Database**: Use test database with fixtures, rollback after each test
- **Scope**:
  - API endpoint integration (request → response)
  - Database transactions (CRUD operations)
  - Authentication and authorization flows
  - File upload and storage workflows
  - Email sending (mock SMTP server)
- **Test Data**: Use factories or fixtures for consistent test data
- **CI Integration**: Run on pull requests before merge

### E2E Test Scenarios
**Planned**:
- **Framework**: Playwright or Cypress
- **Critical User Journeys**:

#### Scenario 1: SOP Creation and Approval
1. User logs in as Document Controller
2. Navigates to SOP module
3. Clicks "Add SOP"
4. Fills out form (title, description, upload file)
5. Saves as draft
6. Submits for approval
7. Logs out
8. Logs in as Approver
9. Views pending approvals
10. Approves the SOP
11. Logs out
12. Logs in as regular staff
13. Searches for SOP
14. Views published SOP

#### Scenario 2: Work Order Assignment and Completion
1. Department head logs in
2. Creates new work order
3. Assigns to staff member
4. Logs out
5. Assigned staff logs in
6. Sees work order in dashboard
7. Updates status to "In Progress"
8. Adds progress notes
9. Marks as completed
10. Logs out
11. Department head logs in
12. Reviews completed work order
13. Closes work order

#### Scenario 3: Meeting Room Booking
1. User logs in
2. Navigates to meeting room calendar
3. Selects date and time slot
4. Fills booking form
5. Submits booking
6. Receives confirmation
7. Views "My Bookings"
8. Edits booking (change time)
9. Saves changes
10. Cancels booking

**Coverage Target**: All critical workflows, all user roles

### Data Consistency Validations
**Planned**:
1. **Referential Integrity**: Test cascade deletes, orphan prevention
2. **Transaction Rollback**: Ensure failed operations don't leave partial data
3. **Concurrency**: Test simultaneous edits to same document
4. **State Consistency**: Validate workflow state transitions (can't go from draft to published)
5. **Audit Trail**: Verify every data change creates audit log entry

### Test Data Management
- **Fixtures**: JSON files with sample users, departments, documents
- **Factories**: Generate test data programmatically
- **Seeding**: Database seeding scripts for dev/test environments
- **Isolation**: Each test uses isolated data, no cross-test dependencies
- **Cleanup**: Automated cleanup after test runs

## 17. 🧯 Troubleshooting Guide

### Common Failure Modes

#### 1. User Cannot Log In
**Symptoms**: Login form rejects credentials, "Invalid username or password" error

**Possible Causes**:
- Incorrect credentials
- Account locked (too many failed attempts)
- Account disabled
- Session/cookie issues
- Database connection failure

**Debugging Steps**:
1. Verify credentials in database (check username exists)
2. Check `failed_login_attempts` count in user record
3. Verify `is_active` flag is true
4. Clear browser cookies and cache
5. Check server logs for authentication errors
6. Test database connectivity

**Resolution**:
- Reset password via admin panel
- Unlock account (set `failed_login_attempts = 0`)
- Enable account (set `is_active = true`)
- Check session configuration

#### 2. Document Upload Fails
**Symptoms**: File upload shows error, file not saved

**Possible Causes**:
- File size exceeds limit
- Unsupported file type
- Disk space full
- Virus detected
- Permissions issue on upload folder

**Debugging Steps**:
1. Check file size vs configured max limit
2. Verify file extension is in whitelist
3. Check disk space: `df -h` (Linux) or `Get-PSDrive` (Windows)
4. Review virus scanner logs
5. Test write permissions on uploads folder

**Resolution**:
- Reduce file size or increase limit
- Convert file to supported format
- Free up disk space or expand storage
- Remove infected file, re-scan clean version
- Fix folder permissions: `chmod 755 uploads/` (Linux) or adjust Windows permissions

#### 3. Approval Workflow Stuck
**Symptoms**: Document remains in "Submitted" status, approver doesn't see it

**Possible Causes**:
- Approver assignment missing
- Email notification not sent
- Permission issue
- Workflow configuration error
- Database inconsistency

**Debugging Steps**:
1. Check `approvals` table for pending approval record
2. Verify approver has correct role
3. Check email queue/logs for notification
4. Review workflow configuration
5. Check document status field vs approval records

**Resolution**:
- Manually assign approver
- Resend notification email
- Update approver permissions
- Fix workflow configuration
- Update document status or create approval record manually

#### 4. Page Loads Slowly
**Symptoms**: Long wait time, spinning loader

**Possible Causes**:
- Large dataset (table with many rows)
- Slow database query
- Network latency
- Large images/assets
- Missing pagination

**Debugging Steps**:
1. Open browser DevTools → Network tab (check load times)
2. Check database query logs (slow query log)
3. Profile server response time
4. Inspect image sizes
5. Check for missing indexes on database

**Resolution**:
- Implement server-side pagination
- Optimize database queries (add indexes)
- Enable caching
- Compress/resize images
- Implement lazy loading

### Debugging Procedures

#### Backend Debugging (When Implemented)
1. **Enable Debug Mode**: Set environment variable `DEBUG=true`
2. **Check Logs**: Review application logs in `/var/log/` or configured log directory
3. **Database Queries**: Enable query logging to see SQL statements
4. **API Testing**: Use Postman/Insomnia to test endpoints directly
5. **Breakpoints**: Use IDE debugger or `console.log` / `print` statements

#### Frontend Debugging
1. **Browser Console**: Open DevTools (F12), check Console tab for JavaScript errors
2. **Network Tab**: Inspect AJAX requests, response codes, payloads
3. **Elements Tab**: Inspect DOM, check if elements are being rendered
4. **Application Tab**: Check localStorage, sessionStorage, cookies
5. **Lighthouse Audit**: Run performance and accessibility audits

#### Database Debugging
1. **Connection Test**: Try connecting with database client (DBeaver, pgAdmin, etc.)
2. **Query Testing**: Run queries directly in SQL client to isolate issues
3. **Transaction Logs**: Check for locks, deadlocks, uncommitted transactions
4. **Data Integrity**: Run constraint checks, verify foreign keys

### Log File Locations and Formats

**Current**: Browser console only (frontend static)

**Planned**:
```
/var/log/dios/                    # Main application logs
├── application.log               # General application events
├── error.log                     # Error and exception logs
├── access.log                    # HTTP access logs
├── audit.log                     # Security audit trail
├── email.log                     # Email sending logs
└── debug.log                     # Debug-level logs (dev only)
```

**Log Format**:
```
[2026-02-10 10:30:00.123] [ERROR] [DocumentService] Failed to save document
User ID: 123
Document ID: 456
Error: Database connection timeout
Stack trace:
  at DocumentService.save (services/document.js:45)
  at DocumentController.create (controllers/document.js:23)
  ...
```

### Recovery Procedures

#### Database Corruption
1. **Stop Application**: Prevent further writes
2. **Backup Current State**: Even if corrupted, may need forensic analysis
3. **Restore from Backup**: Use most recent known-good backup
4. **Replay Transaction Logs**: Apply changes since backup (if available)
5. **Verify Integrity**: Run database integrity checks
6. **Restart Application**: Resume normal operation
7. **Post-Mortem**: Analyze root cause

#### Lost Session State
1. **User Impact**: User logged out unexpectedly
2. **Resolution**: User re-logs in
3. **Prevention**: Implement "remember me" feature, extend session timeout

#### File Storage Failure
1. **Symptom**: Cannot upload or retrieve files
2. **Check**: Verify storage service availability
3. **Fallback**: Switch to backup storage or local filesystem temporarily
4. **Restore**: Fix primary storage issue, sync files back
5. **Notify**: Inform users of temporary degradation

#### Application Crash
1. **Immediate**: Restart application via process manager or container orchestrator
2. **Investigate**: Review crash logs, stack traces
3. **Fix**: Apply hotfix if critical bug identified
4. **Monitor**: Watch for recurrence
5. **Post-Mortem**: Document root cause and prevention measures

## 18. 📞 Ownership & Responsibility Map

### Module Ownership Assignments

| Module | Owner | Backup | Responsibilities |
|--------|-------|--------|------------------|
| **Overall System** | Kiswandi (Author) | TBD | Architecture, vision, final decisions |
| **Frontend Templates** | Kiswandi | TBD | HTML/CSS/JS templates, UI/UX design |
| **Authentication & Authorization** | TBD | TBD | User management, RBAC, security |
| **Document Management** | TBD | TBD | CRUD, versioning, workflow |
| **Approval Workflow** | TBD | TBD | Multi-level approvals, state machine |
| **Work Order System** | TBD | TBD | WO creation, assignment, tracking |
| **Meeting Room Booking** | TBD | TBD | Calendar, booking logic, conflicts |
| **Notifications** | TBD | TBD | Email, in-app notifications, reminders |
| **Reporting & Analytics** | TBD | TBD | Dashboard, reports, data export |
| **Database** | TBD | TBD | Schema, migrations, performance tuning |
| **DevOps & Infrastructure** | TBD | TBD | Hosting, CI/CD, monitoring |
| **Quality Assurance** | TBD | TBD | Testing, bug tracking, UAT |

### Documentation Maintainers

| Document | Maintainer | Update Frequency |
|----------|-----------|------------------|
| **AGENTS.md** (this file) | Kiswandi / Project Lead | On major changes, quarterly review |
| **README.md** | Project Lead | On project setup changes |
| **prompter/specs/** | Feature Owners | On spec changes (via Prompter workflow) |
| **API Documentation** | Backend Lead | On API changes |
| **User Guide** | QA/Documentation Team | On feature releases |
| **Admin Guide** | DevOps Lead | On configuration changes |

### Escalation Paths

#### Technical Issues
```
Developer → Tech Lead → Project Owner → CTO/Executive Sponsor
```

#### Requirements Ambiguity
```
Developer → Product Owner/BA → Quality Manager → Executive Sponsor
```

#### Security Incidents
```
Anyone → Security Lead/Admin → Project Owner → CISO (if applicable)
```

#### Production Outages
```
Monitoring Alert → On-Call Engineer → DevOps Lead → Project Owner → Users (notification)
```

#### User Support
```
User → Help Desk (if exists) → Module Owner → Project Lead
```

### Communication Channels
- **Code Reviews**: GitHub Pull Requests
- **Specifications**: Prompter framework (`prompter/changes/`, `prompter/specs/`)
- **Bugs**: GitHub Issues (or dedicated bug tracker)
- **Discussions**: GitHub Discussions, Slack/Teams channel
- **Documentation**: In-repo markdown files
- **Urgent Issues**: Direct message to module owner or on-call engineer

## 19. 📚 Canonical Documentation Flow

```
1. Product Brief
   - Executive summary
   - Business vision and value proposition
   - Core capabilities overview
   ↓
2. PRD (Product Requirements Document)
   - Detailed product requirements
   - User stories and use cases
   - Success metrics
   ↓
3. FSD (Functional Specification Document)
   - Detailed functional requirements
   - Business rules and workflows
   - Validation rules
   ↓
4. ERD (Entity Relationship Diagram)
   - Data model and entities
   - Relationships and constraints
   - Database schema
   ↓
5. API Contract
   - Endpoint definitions
   - Request/response formats
   - Error codes and handling
   ↓
6. UI Wireframes
   - Screen layouts and mockups
   - User flows and navigation
   - Component specifications
   ↓
7. TDD-Lite (Technical Design Document)
   - Architecture decisions
   - Technology choices
   - Implementation patterns
   ↓
8. Epics
   - High-level work breakdown
   - Feature groupings
   - Dependencies
   ↓
9. Stories
   - Detailed user stories
   - Acceptance criteria
   - Implementation tasks
```

**Current Status**: 
- ✅ Product Brief template exists (`prompter/core/product-brief.md`)
- ⚠️ PRD, FSD, ERD, API Contract, UI Wireframes: Not yet created
- ⚠️ TDD-Lite, Epics, Stories: Not yet created
- 📝 AGENTS.md: This document (just created)

## 20. 🧩 Document Dependency Rules

### Dependency Matrix

| Document | Requires (Must Exist Before Creation) |
|----------|---------------------------------------|
| Product Brief | None (starting point) |
| PRD | Product Brief |
| FSD | PRD |
| ERD | FSD |
| API Contract | FSD + ERD |
| UI Wireframes | FSD + ERD + API Contract |
| TDD-Lite | FSD + ERD + API Contract + UI Wireframes |
| Epics | FSD + TDD-Lite |
| Stories | Epics + FSD |

### Creation Rules

1. **Never Skip Dependencies**: Do not create a document without its prerequisites
2. **Validate Upstream**: Ensure upstream documents are complete, not stubs
3. **Reference Explicitly**: Link back to source documents (e.g., "Per FSD Section 3.2...")
4. **Cross-Check**: Verify new document doesn't contradict upstream sources
5. **Template Usage**: Use Prompter templates in `prompter/core/` for consistency

### Update Propagation

When updating a document, consider downstream impacts:

**Example**: If ERD changes (new field added to User entity)
1. Check API Contract: Does any endpoint need to expose this field?
2. Check UI Wireframes: Should this field appear in any screen?
3. Check TDD-Lite: Does this require database migration code?
4. Check Stories: Do existing stories need updates?

**Process**:
1. Identify change in document X
2. Review dependency matrix for documents that depend on X
3. Create proposal to update each dependent document
4. Validate consistency across all updates

## 21. 📐 Source-of-Truth Matrix

### Domain Ownership

| Domain / Concern | Authoritative Document | Alternatives (Must Defer) |
|------------------|------------------------|---------------------------|
| **Vision & Business Goals** | Product Brief | PRD (implementation of vision) |
| **Product Requirements** | PRD | FSD (detailed implementation) |
| **Functional Behavior & Business Rules** | FSD | API Contract, Code (must implement FSD) |
| **Data Model & Schema** | ERD | Database migrations (must match ERD) |
| **API Surface & Contracts** | API Contract | Backend code (must implement contract) |
| **UI/UX & Screens** | UI Wireframes | Frontend code (must match wireframes) |
| **Architecture & Tech Stack** | TDD-Lite | Codebase (must follow TDD decisions) |
| **Work Breakdown (Epics)** | Epics | Stories (implement epics) |
| **Implementation Tasks** | Stories | Code commits (complete stories) |
| **Coding Standards** | AGENTS.md (Section 11) | Code reviews enforce this |
| **Security & Permissions** | FSD + TDD-Lite | Code (implement specified security) |
| **User Roles & Capabilities** | FSD + AGENTS.md (Section 8) | Code (enforce these roles) |
| **Approval Workflows** | FSD | Code (state machine matches FSD) |

### Conflict Resolution

**Rule**: When code contradicts specification, the specification is correct (unless spec is proven wrong)

**Process**:
1. Identify conflict (e.g., API returns field not in API Contract)
2. Determine authoritative document per matrix above
3. If code is wrong: Fix code to match spec
4. If spec is wrong/incomplete: Create proposal to update spec, then update code
5. Document decision in commit message or proposal

**Example Conflicts**:
- **Code adds field not in ERD** → Remove from code OR update ERD via proposal
- **UI differs from wireframe** → Update UI OR update wireframe via proposal
- **API endpoint not in contract** → Remove endpoint OR add to contract via proposal

### Single Source of Truth Enforcement

**Pre-Implementation**:
- ✅ Review FSD, ERD, API Contract before coding
- ✅ Validate that specs are complete and consistent
- ✅ Flag gaps and ambiguities in proposal

**During Implementation**:
- ✅ Reference spec section in code comments (e.g., `// Per FSD 3.2: User approval workflow`)
- ✅ No "creative" additions beyond spec scope
- ✅ Ask questions if spec is unclear, don't assume

**Post-Implementation**:
- ✅ Code review checks compliance with specs
- ✅ QA tests against spec requirements, not just "what code does"
- ✅ Update specs if intentional deviation approved

## 22. 🔁 Regeneration Rules

### Cascade Triggers

When a document changes, downstream documents must be reviewed and potentially regenerated to maintain consistency.

| Document Changed | Must Regenerate / Review |
|------------------|--------------------------|
| **Product Brief** | PRD, FSD, ERD, API Contract, UI Wireframes, TDD-Lite, Epics, Stories |
| **PRD** | FSD, ERD, API Contract, UI Wireframes, TDD-Lite, Epics, Stories |
| **FSD** | ERD, API Contract, UI Wireframes, TDD-Lite, Epics, Stories |
| **ERD** | API Contract, UI Wireframes, TDD-Lite, Epics, Stories |
| **API Contract** | UI Wireframes, TDD-Lite, Epics, Stories |
| **UI Wireframes** | TDD-Lite, Epics, Stories |
| **TDD-Lite** | Epics, Stories |
| **Epics** | Stories |

### Regeneration Process

1. **Detect Change**:
   - Monitor git commits to `prompter/` directory
   - Track specification updates via Prompter workflow

2. **Assess Impact**:
   - Review nature of change (additive, breaking, clarification)
   - Identify affected downstream documents per matrix above

3. **Create Tracking Issues**:
   - File GitHub issue or create Prompter change proposal
   - List all documents requiring update
   - Assign owners and deadlines

4. **Regenerate Documents**:
   - For each affected document:
     - Create Prompter change with spec deltas
     - Update document to reflect upstream changes
     - Cross-reference the triggering change
     - Validate consistency

5. **Validate Cascade**:
   - Run `prompter validate --strict`
   - Ensure no contradictions introduced
   - Review by document owners
   - Archive changes once validated

6. **Update Implementation**:
   - If code already exists, update to match new specs
   - Create implementation proposals/stories as needed

### Exception Handling

#### Minor Changes (No Cascade Required)
- **Typo fixes**: Spelling, grammar corrections
- **Formatting**: Markdown formatting, section reordering (no content change)
- **Clarifications**: Adding examples or explanatory text without changing requirements
- **Process**: Note in commit message "No cascade required - clarification only"

#### Partial Cascade
- **Additive changes**: New optional features may only affect subset of documents
- **Example**: Adding new optional field to ERD → Update API Contract (add to response), UI Wireframes (add to form if needed), but may skip TDD-Lite if no architectural impact
- **Process**: Document in change proposal which documents are affected and why others are skipped

#### Breaking Changes (Full Cascade)
- **Renames**: Entity, field, or endpoint renames
- **Removals**: Deprecating features
- **Behavior changes**: Altering workflows, validation rules
- **Process**: Full regeneration required, thorough validation, version bump

### Versioning

When regenerating specs:
- **Semantic Versioning**: Major.Minor.Patch
  - **Major**: Breaking changes (e.g., remove entity, change workflow)
  - **Minor**: Additive changes (e.g., add field, new endpoint)
  - **Patch**: Clarifications, non-functional updates
- **Document Version**: Add version metadata to each spec file
- **Changelog**: Maintain change log in spec or separate file

### Automation Opportunities

**Future Tooling**:
1. **Dependency Checker**: Script to validate document dependencies before merge
2. **Cascade Detector**: Automatically flag dependent documents when a spec changes
3. **Consistency Validator**: Cross-check ERD fields match API Contract, etc.
4. **Notification System**: Alert document owners when upstream change requires their attention

## 23. ⏳ Missing Information

**Status Update**: Many items previously listed here have been addressed by the completed baseline specifications (16 capabilities, 76 requirements) and architectural design document (design.md). Items marked with ✅ are now documented.

The following information could not be inferred from the current codebase or documentation and should be specified:

### Business Requirements
1. **Target Organization Size**: Small (<50 users), Medium (50-500), Enterprise (500+)?
2. **Compliance Requirements**: Specific ISO standards (9001, 27001?) or industry regulations
3. **Multi-Tenancy**: Single organization or multi-tenant SaaS?
4. **Localization**: Full Indonesian + English support, or Indonesian only?
5. **User Capacity**: Expected concurrent users, total users, scalability targets

### Technical Specifications (Partially Addressed)
6. ✅ **Backend Technology Stack**: Laravel 10.x/11.x (documented in design.md)
7. ✅ **Database Choice**: MySQL 8.x (documented in design.md)
8. **Hosting Environment**: Cloud (AWS, Azure, GCP), on-premises, hybrid? (Options noted in design.md)
9. **Authentication Method**: Local database confirmed; OAuth, LDAP, Active Directory, SSO as future options?
10. ✅ **File Storage Strategy**: Laravel Storage (Local → S3) (documented in design.md)
11. **Email Provider**: SMTP server, SendGrid, Mailgun, AWS SES?
12. **Build/Deploy Pipeline**: CI/CD tools (GitHub Actions, Jenkins, GitLab CI)?

### Data & Business Logic (Partially Addressed)
13. ✅ **Approval Levels**: Multi-level approval documented in workflow specs
14. **Document Retention Period**: How long to keep archived documents? Purge policy?
15. ✅ **Audit Log Retention**: 7 years (critical), 1 year (operational) - documented in audit-logging spec
16. **File Upload Limits**: Maximum file size, total storage quota per user/organization?
17. **Concurrent Editing**: Allow multiple users to edit same document? Conflict resolution strategy?
18. **Document Numbering**: Auto-generated? Specific format/pattern (e.g., SOP-2026-001)?
19. **Review Cycle**: Fixed schedule (annual, biennial) or configurable per document?
20. **Notification Preferences**: Can users customize notification settings?

### Security & Compliance (Partially Addressed)
21. **Data Residency**: Must data stay in Indonesia? GDPR/privacy regulations?
22. **Encryption Requirements**: At-rest encryption mandatory? Key management?
23. ✅ **Session Management**: 30 minutes timeout, account lockout after 5 failed attempts (documented in authentication spec)
24. ✅ **Password Complexity**: Minimum 8 characters with complexity requirements (documented in authentication spec)
25. **Two-Factor Authentication**: Required for all users, or specific roles only?
26. **IP Whitelisting**: Required for admin access or specific features?
27. **Penetration Testing**: Required before production? Frequency?

### UX & Features
28. **Mobile Responsiveness**: Full mobile support required, or desktop-primary?
29. **Offline Mode**: Required functionality? Which features?
30. **Export Formats**: PDF only, or also Word, Excel, CSV?
31. **Bulk Operations**: Bulk approve, bulk archive, bulk delete - which are needed?
32. **Advanced Search**: Full-text search, metadata filtering, date ranges?
33. **Document Templates**: Pre-defined templates for common document types?
34. **E-Signature**: Digital signature support required? Integration with specific provider?
35. **Version Comparison**: Visual diff between document versions?

### Integration & Extensibility
36. **API for Third Parties**: Public API required? Rate limiting? API keys or OAuth?
37. **Webhooks**: Outbound webhooks for external integrations? Which events?
38. **Calendar Sync**: Google Calendar, Outlook, both, or others?
39. **Active Directory Integration**: Required? LDAP sync frequency?
40. **Reporting Integrations**: Export to BI tools (Tableau, PowerBI)?

### Operational
41. **Backup Strategy**: Frequency, retention, automated or manual?
42. **Monitoring & Alerting**: Application monitoring tools (APM, log aggregation)?
43. **Disaster Recovery**: RTO (Recovery Time Objective), RPO (Recovery Point Objective)?
44. **Support & Maintenance**: SLA requirements, support hours, escalation paths?
45. **Training Requirements**: User training, admin training, documentation needs?

### Performance & Scalability
46. **Response Time SLA**: Max acceptable page load time, API response time?
47. **Concurrent Users**: Peak concurrent user load?
48. **Data Volume**: Expected number of documents, growth rate?
49. **Storage Growth**: Estimated annual storage growth?
50. **Caching Strategy**: Redis, Memcached, application-level caching? (Redis noted as future option in design.md)

### Development Process
51. **Branching Strategy**: Git flow, GitHub flow, trunk-based development?
52. **Code Review Requirements**: Mandatory reviews, number of approvers?
53. **Deployment Frequency**: Continuous, weekly, monthly releases?
54. **Environment Strategy**: Dev, staging, production? QA environment?
55. **Feature Flags**: Required for gradual rollout of features?

### Documentation Status
- ✅ **Product Brief**: Exists in `prompter/difan-dios/product-brief.md`
- ✅ **Capability Specifications**: 16 specs completed in `prompter/changes/establish-baseline-specs/specs/`
- ✅ **Architectural Decisions**: Documented in `prompter/changes/establish-baseline-specs/design.md`
- ❌ **PRD**: Not yet created
- ❌ **FSD**: Not yet created (requirements distributed across capability specs)
- ❌ **ERD**: Not yet created
- ❌ **API Contract**: Not yet created
- ❌ **UI Wireframes**: Not yet created
- ❌ **TDD-Lite**: Not yet created (architectural decisions in design.md serve similar purpose)
- ❌ **Epics**: Not yet created
- ❌ **Stories**: Not yet created

---

## Document Information

|                        |                                |
|------------------------|--------------------------------|
| **Version**            | 1.1.0                          |
| **Date**               | February 10, 2026              |
| **Classification**     | Internal - AI Agent Knowledge Base |
| **Author**             | Generated from project analysis (Kiswandi's Difan-DIOS) |
| **DOCS_ROOT_PATH**     | `prompter/`                    |
| **Last Updated**       | February 10, 2026              |
| **Next Review**        | Quarterly or on major changes  |
| **Latest Changes**     | Updated to reflect completed baseline specs (16 capabilities, 76 requirements), architectural decisions (Laravel/MySQL/React), and design.md completion |

---

*This document serves as the single source of truth for AI agents working on the Difan-DIOS project. All agents must read and follow the rules, conventions, and governance framework defined herein.*
