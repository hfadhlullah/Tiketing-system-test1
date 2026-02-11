# Difan-DIOS Project Context

## Purpose

**Difan-DIOS** (Difan Integrated Operational System) is a comprehensive Quality Management System (QMS) designed specifically for Indonesian organizations to digitize and streamline their ISO-compliant documentation, operational procedures, and workflow processes.

### Primary Goals
- **Digitize Quality Management**: Replace manual, paper-based quality management processes with a modern web-based system
- **ISO Compliance**: Enable organizations to meet ISO 9001 and other quality standards requirements
- **Workflow Automation**: Automate document approval workflows, review cycles, and compliance tracking
- **Operational Efficiency**: Centralize SOP management, work orders, meeting room bookings, and organizational documentation
- **Audit Trail**: Maintain comprehensive audit logs for compliance and accountability

### Target Users
- Quality managers and compliance officers in Indonesian organizations
- Department heads managing operational documentation
- Document controllers responsible for lifecycle management
- Staff members accessing and creating quality documents
- Auditors reviewing compliance and audit trails

### Core Capabilities (16 Specifications with 76 Requirements)

#### Cross-Cutting Capabilities
- **Authentication** (8 requirements): User login, registration, password management
- **Authorization** (8 requirements): Role-based access control (RBAC), permissions
- **Audit Logging** (8 requirements): Activity tracking, compliance trails
- **Notification System** (3 requirements): Email, in-app, push notifications
- **Dashboard & Analytics** (3 requirements): Metrics, visualizations, reporting

#### Document Management Capabilities
- **SOP Management** (10 requirements): Standard Operating Procedures lifecycle
- **Policy Management** (3 requirements): Organizational policies (Kebijakan)
- **Work Instruction Management** (3 requirements): Detailed task instructions (Instruksi Kerja)
- **Quality Manual Management** (2 requirements): QMS documentation (Manual Mutu)
- **Application Guide Management** (2 requirements): User guides (Panduan Aplikasi)

#### Workflow & Operational Capabilities
- **Work Order Management** (12 requirements): Task assignment, tracking, completion
- **Meeting Room Booking** (4 requirements): Resource scheduling with calendar

#### Organizational Capabilities
- **Organizational Structure** (3 requirements): Hierarchy and reporting lines
- **Jobdesk Management** (3 requirements): Job descriptions and responsibilities

#### Additional Capabilities
- **Customer Request Management** (3 requirements): External request tracking
- **Form Management** (3 requirements): Dynamic form creation and submission

## Tech Stack

### Current Implementation (Frontend Templates - Phase 0)
- **HTML5**: Semantic markup for pages
- **CSS3**: Styling with modern CSS features
- **Bootstrap 5.x**: Responsive UI framework
- **JavaScript (ES5/ES6)**: Client-side logic
- **jQuery 3.7.1**: DOM manipulation and AJAX
- **DataTables**: Advanced table management with sorting, filtering, pagination
- **Select2**: Enhanced select dropdowns
- **Quill**: Rich text editor for document content
- **Fullcalendar**: Meeting room booking calendar
- **Chart.js/ApexCharts/C3**: Dashboard analytics and visualization
- **Owl Carousel**: Content carousels
- **SweetAlert2**: Modern alerts and confirmations
- **Toastr**: Toast notifications
- **Sortable.js**: Drag-and-drop functionality

### Icon Libraries
- **FontAwesome**: Primary icon library
- **Tabler Icons**: Supplementary icons
- **Feather Icons**: UI icons
- **Line Awesome**: Additional icon set

### Planned Backend (Phase 1 - Architecture Defined)
- **Backend Framework**: Laravel 10.x/11.x (PHP framework)
  - Laravel Sanctum for SPA authentication
  - Eloquent ORM for database operations
  - Laravel Policies for authorization
  - Laravel Queues for async processing
  - Laravel Storage for file management
- **Database**: MySQL 8.x (relational database)
  - ACID transactions
  - InnoDB engine
  - Full-text search support
- **API Architecture**: RESTful JSON API
- **Authentication**: Laravel Sanctum (SPA authentication with session-based cookies)
- **Cache/Queue**: Database queue (initial), Redis (future scaling)
- **File Storage**: Laravel Storage (local filesystem → AWS S3 migration path)
- **Email Service**: Laravel Mail (SMTP, SendGrid, or AWS SES configurable)

### Planned Frontend (Phase 2 - Architecture Defined)
- **Framework**: React.js 18.x
- **UI Library**: React Bootstrap
- **Build Tool**: Vite (fast HMR, optimized builds)
- **State Management**: React Context API (initial), Redux (if needed)
- **Routing**: React Router
- **API Integration**: Axios or Fetch API
- **Form Handling**: React Hook Form or Formik

### Development Tools
- **Version Control**: Git + GitHub
- **Code Editor**: VS Code recommended
- **Package Management**: 
  - Composer (backend PHP dependencies)
  - npm/yarn (frontend JavaScript dependencies)
- **Build Tool**: Vite (frontend bundling and hot reload)
- **Local Development**: Laravel Artisan + Vite dev server
- **Code Quality**:
  - PHP: Laravel Pint (code style)
  - JavaScript: ESLint (linting)
  - Testing: PHPUnit (backend), Jest/Vitest (frontend)

## Project Conventions

### File Naming Conventions

#### HTML Files
- **Pattern**: `kebab-case.html`
- **Examples**: `add-sop.html`, `booking-meeting-room.html`, `instruksi-kerja.html`

#### CSS Files
- **Pattern**: `kebab-case.css`
- **Examples**: `style.css`, `custom.css`, `bootstrap.min.css`

#### JavaScript Files
- **Pattern**: `kebab-case.js` or `camelCase.js`
- **Examples**: `script.js`, `modal.js`, `appendscript.js`, `validation.js`

#### Images
- **Pattern**: `kebab-case.png|jpg|svg`
- **Examples**: `logo.svg`, `avatar-01.jpg`

### Code Style

#### JavaScript
- **Functions**: `camelCase` - `validateForm()`, `handleSubmit()`, `loadUserData()`
- **Constructor Functions/Classes**: `PascalCase` - `DocumentManager()`, `UserService()`
- **Variables**: `camelCase` - `userName`, `documentId`, `isActive`
- **Constants**: `UPPER_CASE` - `MAX_FILE_SIZE`, `API_ENDPOINT`
- **Descriptive Names**: Avoid single letters except loop counters (`i`, `j`)
- **Module Pattern**: Use IIFE for encapsulation
  ```javascript
  (function($) {
      'use strict';
      // Module code here
  })(jQuery);
  ```

#### CSS Classes
- **Methodology**: BEM (Block-Element-Modifier) where applicable
  - Examples: `card__title--highlighted`, `btn--primary`, `form__input--error`
- **Bootstrap Classes**: Keep Bootstrap semantic classes (`btn`, `form-control`, etc.)
- **Custom Prefixes**: Use `dios-` prefix for project-specific classes
  - Examples: `dios-header`, `dios-sidebar`, `dios-document-card`

#### HTML IDs
- **Pattern**: `camelCase` or `kebab-case`
- **Examples**: `userId`, `user-id`, `documentForm`, `document-form`
- **Rule**: Must be unique per page
- **Semantic**: Describe the element purpose

### Architecture Patterns

#### Current (Static Template Phase)
```
Browser (Client-Side)
├── HTML Templates (Static Pages)
├── Bootstrap 5 UI Framework + Custom Styles
├── jQuery + Plugins (DataTables, Select2, Calendar)
└── Client-Side Logic (script.js, modal.js, validation.js)
```

#### Planned (Full Application - Laravel + React Architecture)
```
┌────────────────────────────────────────────────────────┐
│  Frontend (React 18.x + Vite)                          │
│  ┌──────────────────────────────────────────────┐      │
│  │ Components, Pages, State Management          │      │
│  │ Axios/Fetch → REST API calls                 │      │
│  └──────────────────────────────────────────────┘      │
└────────────┬───────────────────────────────────────────┘
             │ HTTP/JSON (Laravel Sanctum Auth)
             ▼
┌────────────────────────────────────────────────────────┐
│  Backend (Laravel 10.x/11.x)                           │
│  ┌──────────────────────────────────────────────┐      │
│  │ Controllers → Services → Repositories        │      │
│  │ Middleware (Auth, RBAC)                      │      │
│  │ Eloquent ORM → MySQL 8.x                     │      │
│  │ Queue Workers (Jobs)                         │      │
│  └──────────────────────────────────────────────┘      │
└───────┬──────────────┬──────────────┬──────────────────┘
        │              │              │
        ▼              ▼              ▼
  ┌──────────┐  ┌──────────┐  ┌──────────────┐
  │ MySQL    │  │ Laravel  │  │ Email        │
  │ Database │  │ Storage  │  │ Service      │
  │          │  │ (S3)     │  │ (SMTP/SES)   │
  └──────────┘  └──────────┘  └──────────────┘
```

#### Design Patterns
- **Module Pattern**: Encapsulate functionality in self-contained modules
- **Observer Pattern**: Event-driven interactions and notifications (planned)
- **Repository Pattern**: Data access abstraction (backend, planned)
- **Service Layer**: Business logic separation from controllers (backend, planned)
- **MVC**: Model-View-Controller for backend structure (planned)

### Testing Strategy

#### Current Status
- **Unit Tests**: None (0% coverage) - to be implemented
- **Integration Tests**: None - to be implemented
- **E2E Tests**: None - to be implemented
- **Manual QA**: Current approach for template validation

#### Planned Testing Framework
- **JavaScript Testing**: Jest or Mocha + Chai
- **Backend Testing**: pytest (Python), Jest (Node.js), or PHPUnit (PHP) - TBD
- **E2E Testing**: Playwright or Cypress
- **Coverage Targets**: 
  - 80% for business logic
  - 60% for UI components

#### Critical Test Scenarios
1. **SOP Lifecycle**: Draft → Submit → Approve → Publish → Archive
2. **Work Order Flow**: Create → Assign → In Progress → Complete → Close
3. **Meeting Room Booking**: Search → Book → Modify → Cancel
4. **User Authentication**: Login → Session management → Logout
5. **Approval Workflow**: Multi-level approval process with reject/approve paths

### Git Workflow

#### Branching Strategy
- **To be determined** (Git Flow, GitHub Flow, or Trunk-based development)
- **Current**: Main branch development (early stage)

#### Commit Message Convention
```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```
feat(sop): add SOP approval workflow
fix(booking): resolve calendar date selection bug
docs(readme): update installation instructions
```

#### Code Review Requirements
- **To be determined**: Number of required approvers, review checklist

## Domain Context

### Business Domain: Quality Management System (QMS)

**Difan-DIOS** operates in the quality management and ISO compliance domain, specifically for Indonesian organizations.

#### Key Concepts

##### Document Lifecycle States
- **Draft**: Initial creation, editable by creator
- **Submitted**: Under review, locked for editing
- **In Review**: Being evaluated by approvers
- **Approved**: Passed approval, ready for publication
- **Rejected**: Sent back with feedback
- **Published**: Active, accessible to authorized users
- **Archived**: Obsolete or superseded

##### Work Order States
- **New**: Just created, awaiting assignment
- **Assigned**: Given to a responsible party
- **In Progress**: Actively being worked on
- **On Hold**: Temporarily paused
- **Review**: Ready for verification
- **Completed**: Work finished
- **Closed**: Fully processed and signed off
- **Cancelled**: No longer needed

##### User Roles & Permissions
- **Administrator**: Full system access, user management, configuration
- **Quality Manager**: Approve critical documents, compliance oversight
- **Department Head**: Manage department documents and work orders
- **Document Controller**: Document lifecycle management, versioning
- **Approver**: Review and approve/reject documents
- **Staff/Employee**: View published docs, create drafts, submit requests
- **Auditor**: Read-only access to documents and audit trails
- **Guest/Viewer**: Limited read-only access to specific documents

#### Domain Vocabulary

| Indonesian Term | English Translation | Definition |
|----------------|-------------------|------------|
| **SOP** | Standard Operating Procedure | Step-by-step instructions for routine operations |
| **Kebijakan** | Policy | High-level organizational rules and guidelines |
| **Instruksi Kerja** | Work Instruction | Detailed, task-specific instructions |
| **Manual Mutu** | Quality Manual | Comprehensive QMS documentation |
| **Panduan Aplikasi** | Application Guide | User guides for software/systems |
| **Jobdesk** | Job Description | Role responsibilities and duties |
| **Struktur Organisasi** | Organizational Structure | Company hierarchy and reporting lines |

#### Approval Workflow Pattern
```
Submit → L1 Approval → L2 Approval → Final Approval → Published
           │              │              │
           └─→ Reject     └─→ Reject     └─→ Reject
                │              │              │
                └──────────→ Return to Submitter ←─────┘
```

#### Document Versioning Rules
1. New version created on each significant edit after publication
2. Version history maintained for audit trail
3. Old versions archived but accessible to auditors
4. Version numbering: Major.Minor.Patch or sequential (TBD)

### Business Rules

#### Validation Rules
- **Required Fields**: Title, Category, Description, Department, Effective Date
- **File Uploads**: Allowed formats (PDF, DOC, DOCX, XLS, XLSX), max size TBD
- **Date Validation**: 
  - Effective date cannot be in the past (for new documents)
  - Review date must be after effective date
  - Archive date must be after effective date
- **Document Naming**: Must follow organizational convention (TBD)

#### Authorization Rules
- Users can only edit their own drafts or assigned documents
- Department heads see only their department's documents
- Approvers can only approve documents within their approval level
- Admins have full access across all departments

#### Workflow Rules
- Documents cannot skip approval levels
- Rejected documents return to draft state
- Published documents become read-only (new version required for edits)
- Archived documents cannot be edited, only viewed

## Important Constraints

### Technical Constraints
1. **No Backend Yet**: Current phase is static templates only; no data persistence
2. **Client-Side Only**: All logic currently runs in browser; sensitive operations not secure
3. **No Authentication**: Login UI exists but doesn't perform real authentication
4. **Browser Compatibility**: 
   - Minimum: Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
   - No support for IE 11
   - Requires CSS Grid and Flexbox support
   - Requires ES6 JavaScript support

### Business Constraints
1. **Indonesian Context**: Primary language is Indonesian (Bahasa Indonesia)
2. **ISO Compliance**: Must meet ISO 9001 and related standards
3. **Audit Requirements**: Complete audit trail required for compliance
4. **Department Isolation**: Default data isolation by department
5. **Approval Hierarchy**: Multi-level approval required for critical documents

### Regulatory Constraints
1. **Data Residency**: May need to keep data in Indonesia (TBD)
2. **Audit Log Retention**: 7 years for critical logs (compliance requirement)
3. **Privacy**: Handle PII (Personally Identifiable Information) securely
4. **Security**: Encryption for passwords and sensitive data

### Development Constraints
1. **No Invention Rule**: AI agents must NOT invent business rules, data fields, or workflows not specified in documentation
2. **Document Dependencies**: Must follow Prompter framework dependency chain (Product Brief → PRD → FSD → ERD → API Contract → UI Wireframes → TDD-Lite → Epics → Stories)
3. **Specification First**: Code must implement specifications, not the other way around
4. **No Scope Creep**: New features require new proposal in Prompter framework

## External Dependencies

### Current (Frontend Static Templates)
- **Bootstrap 5**: UI framework (CDN or local)
- **jQuery 3.7.1**: DOM manipulation library
- **FontAwesome**: Icon library
- **DataTables**: Table enhancement plugin
- **Select2**: Enhanced select boxes
- **Quill**: Rich text editor
- **Fullcalendar**: Calendar component
- **SweetAlert2**: Alert/modal library
- **Chart libraries**: C3, ApexCharts for visualizations

### Planned (Backend Integration)
1. **Email Service**: SMTP, SendGrid, or AWS SES for notifications
2. **File Storage**: Local initially, AWS S3 or Azure Blob for production
3. **Authentication Provider**: Optional LDAP/Active Directory/OAuth for SSO
4. **Document Virus Scanning**: ClamAV or VirusTotal API for security
5. **Audit Log Export**: Optional Splunk, ELK Stack, or CloudWatch integration
6. **Calendar Integration**: Google Calendar, Outlook (for meeting rooms)

### Future Integrations
- **E-Signature**: Digital signature provider integration
- **Mobile Apps**: iOS and Android native apps
- **Third-Party Notifications**: Slack, Microsoft Teams webhooks
- **ERP Systems**: Integration with accounting, HR, CRM (long-term)

## Prompter Framework Usage

This project uses the **Prompter** spec-driven development framework for managing changes and specifications.

### Document Hierarchy
```
Product Brief → PRD → FSD → ERD → API Contract → UI Wireframes → TDD-Lite → Epics → Stories
```

### Change Workflow
1. **Creation Stage**: Propose changes via `prompter/changes/[change-name]/`
   - `proposal.md`: Why, what, impact
   - `tasks.md`: Implementation checklist
   - `design.md`: Technical decisions (optional)
   - `specs/`: Delta specifications (ADDED/MODIFIED/REMOVED)

2. **Implementation Stage**: Execute tasks from `tasks.md`

3. **Archive Stage**: Merge approved changes to `prompter/specs/`

### Key Rules
- **No Invention**: Don't create features, fields, or rules not in specs
- **Dependency Enforcement**: Validate upstream documents exist before creation
- **Style Matching**: Match tone and format of existing documents
- **Cascade Regeneration**: Update downstream docs when upstream changes
- **Source of Truth**: Specifications override code when conflicts arise

### Current Status
- ✅ AGENTS.md created (comprehensive project knowledge base)
- ✅ Product Brief template exists (`prompter/core/product-brief.md`)
- ✅ Product Brief for Difan-DIOS exists (`prompter/difan-dios/product-brief.md`)
- ✅ **Baseline Specifications Completed** (February 2026):
  - **16 capability specifications** with **76 total requirements**
  - Located in: `prompter/changes/establish-baseline-specs/specs/`
  - Status: ✅ All tasks complete, ready for archival
- ✅ **Architectural Design Document** (design.md - 612 lines):
  - Laravel 10.x/11.x + MySQL 8.x + React 18.x stack
  - Located in: `prompter/changes/establish-baseline-specs/design.md`
- ⏳ **Next Steps**: Archive baseline specs, begin backend implementation
- ⚠️ PRD, FSD, ERD, API Contract: Not yet created (next priority after archival)
- ⚠️ Epics and Stories: To be developed in Phase 1

## Related Documentation

- **[AGENTS.md](../AGENTS.md)**: Comprehensive AI agent knowledge base (primary reference - 1000+ lines)
- **[README.md](../README.md)**: Project overview and setup instructions
- **[requirement.md](../requirment.md)**: Additional requirements documentation
- **prompter/**: Specification framework directory
  - `prompter/core/`: Document templates (proposal, apply, archive)
  - `prompter/difan-dios/`: Project-specific documents (product-brief.md)
  - `prompter/changes/`: Proposed changes
    - `prompter/changes/establish-baseline-specs/`: ✅ Completed baseline (16 specs, design.md)
  - `prompter/specs/`: Current specifications (16 capability specs - to be populated after archival)
    - `authentication/`, `authorization/`, `audit-logging/`, `notification-system/`
    - `dashboard-analytics/`, `sop-management/`, `policy-management/`
    - `work-instruction-management/`, `quality-manual-management/`
    - `application-guide-management/`, `work-order-management/`
    - `meeting-room-booking/`, `organizational-structure/`
    - `jobdesk-management/`, `customer-request-management/`, `form-management/`

## Quick Reference

### Project Directories
- **`template/`**: Frontend HTML templates (current codebase)
- **`template/assets/`**: Static resources (CSS, JS, images, fonts)
- **`template/public/uploads/`**: User-uploaded files directory
- **`prompter/`**: Specification and change management framework
- **`.github/`**: GitHub configuration and workflows (if any)

### Getting Started
1. Open any `.html` file in `template/` directory in a browser
2. Current pages are static; no backend server required yet
3. Review `AGENTS.md` for comprehensive project context
4. Follow Prompter framework for proposing and implementing changes

### Development Workflow
1. Review existing specifications in `prompter/specs/` (16 capability specs available after archival)
2. Create proposal in `prompter/changes/[change-name]/` for new features
3. Validate proposal: `prompter validate <change-id> --strict`
4. Implement changes following `tasks.md` checklist
5. Archive completed changes: `prompter archive <change-id>`

### Current Implementation Status
- **Phase 0 (Frontend Templates)**: ✅ Complete
  - 15+ HTML template pages
  - Bootstrap 5 responsive layouts
  - jQuery-based interactivity
  - Chart and calendar integrations
- **Phase 1 (Specifications)**: ✅ Complete (Ready for Archive)
  - 16 capability specifications (76 requirements)
  - Architectural design document (612 lines)
  - Technology stack defined (Laravel/MySQL/React)
- **Phase 2 (Backend Implementation)**: ⏳ Next Priority
  - Laravel backend setup
  - MySQL database schema
  - REST API endpoints
  - Authentication & authorization
- **Phase 3 (Frontend Migration)**: 🔜 Future
  - React.js migration from jQuery
  - Component library
  - State management
  - API integration

---

**Document Version**: 1.0.0  
**Last Updated**: February 10, 2026  
**Maintained By**: Project Lead (Kiswandi)  
**Next Review**: On major project changes or quarterly
