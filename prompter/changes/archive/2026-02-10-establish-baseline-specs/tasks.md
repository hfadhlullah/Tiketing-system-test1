# Tasks: Establish Baseline Specifications

## Overview
This document breaks down the work required to create comprehensive baseline specifications for all Difan-DIOS capabilities into ordered, verifiable tasks.

## Task Organization Principles
- ✅ **Small, Verifiable**: Each task produces a concrete deliverable that can be validated
- ✅ **Sequential**: Tasks are ordered to maintain dependencies (cross-cutting specs first, then modules)
- ✅ **Parallelizable**: Where noted, tasks can be done in parallel by multiple contributors
- ✅ **User-Visible Progress**: Each task moves toward complete, usable specifications

---

## Phase 1: Foundation & Cross-Cutting Concerns

### Task 1.1: Create Authentication Specification
**Owner**: TBD  
**Duration**: 4-6 hours  
**Dependencies**: None  

**Steps**:
1. Review HTML templates: `template/index.html` (login placeholders), JavaScript: `assets/js/script.js` (auth logic if any)
2. Review AGENTS.md Section 10 (Security & Privacy Rules) for authentication requirements
3. Create `prompter/changes/establish-baseline-specs/specs/authentication/spec.md`
4. Document requirements using `## ADDED Requirements` format
5. Include scenarios for:
   - Successful login
   - Failed login (invalid credentials)
   - Account lockout (5 failed attempts)
   - Session timeout (30 minutes inactivity)
   - Password reset
6. Cross-reference authorization capability

**Validation**:
- [x] Spec includes at least 8 requirements (login, logout, password policy, session mgmt, lockout, reset, multi-factor placeholder)
- [x] Each requirement has at least one `#### Scenario:` 
- [x] Conforms to template format from `prompter/core/`

---

### Task 1.2: Create Authorization (RBAC) Specification
**Owner**: TBD  
**Duration**: 6-8 hours  
**Dependencies**: Task 1.1 (authentication)

**Steps**:
1. Review AGENTS.md Section 8 (Target Users & Personas) for all 8 roles and permission matrices
2. Review HTML templates for role-based UI hiding (e.g., admin-only buttons)
3. Create `prompter/changes/establish-baseline-specs/specs/authorization/spec.md`
4. Document requirements for:
   - Role definitions (Administrator, Quality Manager, Department Head, Document Controller, Approver, Staff, Auditor, Guest)
   - Permission checks (document CRUD, approval, publishing, etc.)
   - Department-based isolation
5. Include scenarios for each role's key permissions

**Validation**:
- [x] All 8 roles documented with capabilities
- [x] Permission matrix from AGENTS.md reflected in requirements
- [x] Scenarios cover: granted access, denied access, department isolation
- [x] Cross-references authentication capability

---

### Task 1.3: Create Audit Logging Specification
**Owner**: TBD  
**Duration**: 4-6 hours  
**Dependencies**: Tasks 1.1, 1.2 (authentication, authorization)

**Steps**:
1. Review AGENTS.md Section 10 (Security & Privacy - Audit Logging Requirements)
2. Review AGENTS.md Section 6 (Data Models - Audit Log entity)
3. Create `prompter/changes/establish-baseline-specs/specs/audit-logging/spec.md`
4. Document requirements for:
   - Events to log (auth, authorization, data changes, workflow events, admin actions)
   - Log data structure (timestamp, user, action, entity, old/new values, IP)
   - Retention policies (7 years for critical, 1 year operational)
5. Include scenarios for: login logged, document approval logged, permission denied logged

**Validation**:
- [x] All event categories from AGENTS.md covered
- [x] Log structure includes all required fields
- [x] Retention policy requirements specified
- [x] Scenarios demonstrate different event types

---

### Task 1.4: Create Notification System Specification
**Owner**: TBD  
**Duration**: 4-6 hours  
**Dependencies**: Tasks 1.1, 1.2 (need user context for notifications)

**Steps**:
1. Review Product Brief Section "Approval & Workflow Engine" for notification triggers
2. Review HTML templates for notification UI (`template/index.html` - notification bell)
3. Create `prompter/changes/establish-baseline-specs/specs/notification-system/spec.md`
4. Document requirements for:
   - Notification channels (email, in-app)
   - Trigger events (approval request, status change, review due, work order assigned)
   - Notification preferences (future: user customization)
5. Include scenarios for: approval request sent, reminder delivered, in-app notification displayed

**Validation**:
- [x] Email and in-app channels specified
- [x] Key trigger events from Product Brief covered
- [x] Scenarios show notification lifecycle (trigger → send → receive)

---

### Task 1.5: Create Dashboard & Analytics Specification
**Owner**: TBD  
**Duration**: 5-7 hours  
**Dependencies**: None (but will reference other capabilities)

**Steps**:
1. Review `template/index.html` for dashboard widgets and metrics
2. Review Product Brief Section "Dashboard & Analytics"
3. Review AGENTS.md Section 9 (UI/UX Principles - Role-Based UI Adaptations)
4. Create `prompter/changes/establish-baseline-specs/specs/dashboard-analytics/spec.md`
5. Document requirements for:
   - Dashboard widgets (Pending Approvals, My Documents, Work Orders, Recent Activity, Compliance Status, Department Metrics)
   - Role-based widget visibility
   - Reporting capabilities (document status, approval analytics, user activity, compliance tracking)
6. Include scenarios for: Admin sees all widgets, Staff sees limited widgets, export report

**Validation**:
- [x] All 8 widgets from Product Brief documented
- [x] Role-specific dashboard variations specified
- [x] Report types with data sources identified
- [x] Scenarios show different role views

---

## Phase 2: Core Document Management Capabilities
*(These tasks can be parallelized after Phase 1 completes)*

### Task 2.1: Create SOP Management Specification
**Owner**: TBD  
**Duration**: 6-8 hours  
**Dependencies**: Tasks 1.1-1.4 (authentication, authorization, audit, notification)

**Steps**:
1. Review `template/sop.html` and `template/add-sop.html` for UI behavior
2. Review AGENTS.md Section 5 (Core Business Logic - SOP Management Workflow)
3. Review AGENTS.md Section 6 (Data Models - SOP entity)
4. Create `prompter/changes/establish-baseline-specs/specs/sop-management/spec.md`
5. Document requirements for:
   - CRUD operations (Create draft, Edit, View, Delete)
   - Workflow states (Draft → Submitted → In Review → Approved → Published → Archived)
   - Approval workflow integration
   - Version control
   - Search and filtering
   - Export (PDF, Word)
6. Include scenarios for:
   - Create SOP and save as draft
   - Submit for approval
   - Approver approves SOP
   - Approver rejects with comments
   - Publish approved SOP
   - Archive old SOP

**Validation**:
- [x] All 6 workflow states documented with transitions
- [x] CRUD operations mapped to user roles
- [x] Version control requirements specified
- [x] Scenarios cover full lifecycle (draft → archive)
- [x] Cross-references authorization, audit-logging, notification-system

---

### Task 2.2: Create Policy Management Specification
**Owner**: TBD  
**Duration**: 5-7 hours  
**Dependencies**: Task 2.1 (similar workflow to SOP)

**Steps**:
1. Review `template/kebijakan.html` for UI behavior
2. Review AGENTS.md Section 6 (Data Models - Kebijakan entity)
3. Create `prompter/changes/establish-baseline-specs/specs/policy-management/spec.md`
4. Document requirements (similar to SOP but with policy-specific fields):
   - Policy type field
   - Compliance framework references
   - Same workflow as SOP (Draft → Published → Archived)
5. Include scenarios mirroring SOP lifecycle

**Validation**:
- [x] Policy-specific fields (policy_type, compliance_framework) documented
- [x] Workflow consistent with SOP management
- [x] Cross-references sop-management for shared workflow patterns

---

### Task 2.3: Create Work Instruction Management Specification
**Owner**: TBD  
**Duration**: 5-7 hours  
**Dependencies**: Task 2.1 (similar workflow)

**Steps**:
1. Review `template/instruksi-kerja.html`
2. Create `prompter/changes/establish-baseline-specs/specs/work-instruction-management/spec.md`
3. Document requirements (similar to SOP with work-instruction-specific fields):
   - Procedure steps (JSON or structured text)
   - Responsible party
   - Related forms references
4. Include scenarios for work instruction lifecycle

**Validation**:
- [x] Work-instruction-specific fields documented
- [x] Scenario shows creating instruction with procedure steps

---

### Task 2.4: Create Quality Manual Management Specification
**Owner**: TBD  
**Duration**: 5-7 hours  
**Dependencies**: Task 2.1 (similar workflow)

**Steps**:
1. Review `template/manual-mutu.html`
2. Create `prompter/changes/establish-baseline-specs/specs/quality-manual-management/spec.md`
3. Document requirements for Quality Manual documentation
4. Include scenarios for manual lifecycle

**Validation**:
- [x] Specific to quality manual documentation
- [x] Workflow consistent with other document types

---

### Task 2.5: Create Application Guide Management Specification
**Owner**: TBD  
**Duration**: 5-7 hours  
**Dependencies**: Task 2.1 (similar workflow)

**Steps**:
1. Review `template/panduan-aplikasi.html`
2. Create `prompter/changes/establish-baseline-specs/specs/application-guide-management/spec.md`
3. Document requirements for application guide documentation
4. Include scenarios for guide lifecycle

**Validation**:
- [x] Application guide specific requirements documented
- [x] Workflow consistent with other document types

---

## Phase 3: Operational Workflow Capabilities
*(Can be parallelized with Phase 2)*

### Task 3.1: Create Work Order Management Specification
**Owner**: TBD  
**Duration**: 6-8 hours  
**Dependencies**: Tasks 1.1-1.4 (auth, authz, audit, notify)

**Steps**:
1. Review `template/work-order.html` and `template/add-work-order.html`
2. Review AGENTS.md Section 5 (Core Business Logic - Work Order Workflow)
3. Review AGENTS.md Section 6 (Data Models - Work Order entity)
4. Create `prompter/changes/establish-baseline-specs/specs/work-order-management/spec.md`
5. Document requirements for:
   - CRUD operations
   - Workflow states (Created → Assigned → In Progress → Review → Completed → Closed)
   - Priority levels (Low, Medium, High, Critical)
   - Assignment to users
   - Status updates with comments
   - Due date tracking
6. Include scenarios for:
   - Create work order
   - Assign to user
   - User updates status to "In Progress"
   - User marks as completed
   - Department head reviews and closes

**Validation**:
- [x] All 7 workflow states documented with transitions
- [x] Assignment and priority requirements specified
- [x] Scenarios cover full work order lifecycle
- [x] Cross-references authorization (role-based actions)

---

### Task 3.2: Create Meeting Room Booking Specification
**Owner**: TBD  
**Duration**: 6-8 hours  
**Dependencies**: Tasks 1.1-1.4 (auth, authz, audit, notify)

**Steps**:
1. Review `template/booking-meeting-room.html` and `template/kalender-ruang-meeting.html`
2. Review AGENTS.md Section 17 (Troubleshooting - Meeting Room Booking)
3. Review AGENTS.md Section 6 (Data Models - Meeting Room, Booking entities)
4. Create `prompter/changes/establish-baseline-specs/specs/meeting-room-booking/spec.md`
5. Document requirements for:
   - Calendar view (Fullcalendar integration)
   - Room availability checking
   - Conflict detection
   - Booking CRUD (create, edit, cancel)
   - Booking confirmation notifications
   - "My Bookings" view
6. Include scenarios for:
   - User checks room availability
   - User creates booking (success)
   - User tries to book conflicting time (error)
   - User edits existing booking
   - User cancels booking

**Validation**:
- [x] Calendar integration requirements specified
- [x] Conflict detection logic documented
- [x] Scenarios cover success and error cases
- [x] Cross-references notification-system

---

## Phase 4: Organizational Management Capabilities
*(Can be parallelized with Phases 2-3)*

### Task 4.1: Create Organizational Structure Specification
**Owner**: TBD  
**Duration**: 4-6 hours  
**Dependencies**: Tasks 1.1-1.2 (auth, authz)

**Steps**:
1. Review `template/struktur-organisasi.html`
2. Review AGENTS.md Section 6 (Data Models - Department entity)
3. Create `prompter/changes/establish-baseline-specs/specs/organizational-structure/spec.md`
4. Document requirements for:
   - Department hierarchy management
   - Department CRUD
   - Department head assignment
   - Parent-child department relationships
5. Include scenarios for:
   - Create department
   - Assign department head
   - View organizational chart/tree

**Validation**:
- [x] Hierarchical structure requirements specified
- [x] Department head assignment documented

---

### Task 4.2: Create Job Description Management Specification
**Owner**: TBD  
**Duration**: 4-6 hours  
**Dependencies**: Task 4.1 (organizational structure)

**Steps**:
1. Review `template/jobdesk.html`
2. Create `prompter/changes/establish-baseline-specs/specs/jobdesk-management/spec.md`
3. Document requirements for:
   - Job description CRUD
   - Link to roles/departments
   - Responsibilities documentation
4. Include scenarios for jobdesk creation and viewing

**Validation**:
- [x] Jobdesk entity requirements specified
- [x] Relationship to departments documented

---

## Phase 5: Additional Modules
*(Can be parallelized with Phases 2-4)*

### Task 5.1: Create Customer Request Management Specification
**Owner**: TBD  
**Duration**: 4-6 hours  
**Dependencies**: Tasks 1.1-1.4 (auth, authz, audit, notify)

**Steps**:
1. Review `template/request-customer.html`
2. Create `prompter/changes/establish-baseline-specs/specs/customer-request-management/spec.md`
3. Document requirements for:
   - Request submission
   - Request tracking
   - Status updates
   - Assignment to staff
4. Include scenarios for request lifecycle

**Validation**:
- [x] Request workflow documented
- [x] Status states and transitions specified

---

### Task 5.2: Create Form Management Specification
**Owner**: TBD  
**Duration**: 4-6 hours  
**Dependencies**: Tasks 1.1-1.2 (auth, authz)

**Steps**:
1. Review `template/form.html`
2. Create `prompter/changes/establish-baseline-specs/specs/form-management/spec.md`
3. Document requirements for:
   - Form viewing
   - Form submission
   - Response tracking (if applicable)
4. Include scenarios for form interactions

**Validation**:
- [x] Form interaction requirements specified
- [x] Submission workflow documented

---

## Phase 6: Architecture & Migration Documentation

### Task 6.1: Complete design.md for Backend Architecture
**Owner**: TBD  
**Duration**: 6-8 hours  
**Dependencies**: All spec tasks (need full picture)

**Steps**:
1. Review Product Brief Section "System Architecture / Modules"
2. Review AGENTS.md Section 3 (Architecture Overview - Planned Architecture)
3. Create/complete `prompter/changes/establish-baseline-specs/design.md`
4. Document:
   - Backend technology stack decision (Laravel + MySQL rationale)
   - REST API design principles
   - Database schema approach (referencing future ERD)
   - File storage strategy
   - Email service integration
   - Job queue for async processing
   - Authentication implementation (Laravel Sanctum/Passport)
5. Document trade-offs and alternatives considered

**Validation**:
- [ ] All major architectural decisions documented with rationale
- [ ] Trade-offs explicitly stated
- [ ] References to capabilities that drive architecture choices

---

### Task 6.2: Document Frontend Migration Strategy in design.md
**Owner**: TBD  
**Duration**: 4-6 hours  
**Dependencies**: Task 6.1

**Steps**:
1. Review Product Brief Section "Migration Phases"
2. Add to `design.md`:
   - jQuery → React migration approach
   - Module-by-module migration strategy
   - Component architecture
   - State management approach
   - API integration pattern
   - Backward compatibility considerations
3. Document risks and mitigations

**Validation**:
- [ ] Migration phases clearly defined
- [ ] Component boundaries identified
- [ ] API integration strategy specified

---

## Phase 7: Validation & Finalization

### Task 7.1: Cross-Validate All Specs for Consistency
**Owner**: TBD  
**Duration**: 4-6 hours  
**Dependencies**: All spec creation tasks (Tasks 1.1-5.2)

**Steps**:
1. Review all created specs for:
   - Consistent terminology (match AGENTS.md glossary)
   - Cross-references are valid (e.g., sop-management references authorization)
   - No contradictions between specs
   - Workflow states align across document types
2. Check against HTML templates to ensure no invented requirements
3. Update cross-references where needed

**Validation Checklist**:
- [ ] All specs use consistent role names (8 roles from AGENTS.md)
- [ ] Workflow states match AGENTS.md Section 5
- [ ] Cross-references use correct capability names
- [ ] No requirement references features not in HTML templates

---

### Task 7.2: Run Prompter Validation
**Owner**: TBD  
**Duration**: 2-4 hours  
**Dependencies**: Task 7.1

**Steps**:
1. Run: `prompter validate establish-baseline-specs --strict`
2. Fix any validation errors:
   - Missing scenarios
   - Incorrect spec delta format
   - Invalid cross-references
   - Missing files
3. Re-run validation until zero errors

**Validation**:
- [x] `prompter validate establish-baseline-specs --strict` exits with code 0
- [x] No warnings about missing scenarios
- [x] All spec deltas in correct `## ADDED Requirements` format

---

### Task 7.3: Final Review and Documentation Update
**Owner**: TBD  
**Duration**: 2-3 hours  
**Dependencies**: Task 7.2

**Steps**:
1. Review `proposal.md` for accuracy (update if scope changed during execution)
2. Review `tasks.md` (this file) and mark completed tasks
3. Ensure `design.md` is complete
4. Create summary document or README in `prompter/changes/establish-baseline-specs/` if helpful
5. Prepare for stakeholder review

**Validation**:
- [ ] All tasks marked as complete
- [ ] Proposal accurately reflects what was delivered
- [ ] Design.md is complete and reviewed

---

## Summary Metrics

| Metric | Target |
|--------|--------|
| **Capability Specs Created** | 16 |
| **Total Requirements** | ~150-200 (estimate) |
| **Total Scenarios** | ~200-300 (estimate) |
| **Design Decisions Documented** | ~10-15 |
| **Prompter Validation** | ✅ Pass with --strict |

## Parallelization Opportunities

**Can Be Done in Parallel** (after Phase 1):
- Task 2.1-2.5 (all document management specs)
- Task 3.1-3.2 (operational workflows)
- Task 4.1-4.2 (organizational management)
- Task 5.1-5.2 (additional modules)

**Must Be Sequential**:
- Phase 1 → Phases 2-5 (cross-cutting concerns must be defined first)
- Phases 2-5 → Phase 6 (need all specs before architecture design)
- Phase 6 → Phase 7 (validate after everything is complete)

## Estimated Total Effort

| Phase | Duration (if sequential) | Duration (if parallelized) |
|-------|-------------------------|---------------------------|
| **Phase 1** | 23-33 hours | 23-33 hours (sequential required) |
| **Phase 2** | 27-35 hours | 6-8 hours (5 parallel tasks) |
| **Phase 3** | 12-16 hours | 6-8 hours (2 parallel tasks) |
| **Phase 4** | 8-12 hours | 4-6 hours (2 parallel tasks) |
| **Phase 5** | 8-12 hours | 4-6 hours (2 parallel tasks) |
| **Phase 6** | 10-14 hours | 10-14 hours (sequential after Phases 2-5) |
| **Phase 7** | 8-13 hours | 8-13 hours (sequential) |
| **Total** | 96-135 hours (12-17 days @ 8hr/day) | 61-88 hours (8-11 days @ 8hr/day) |

---

**Document Version**: 1.0.0  
**Created**: February 10, 2026  
**Status**: Draft - Pending Approval  
**Next Action**: Begin Phase 1 after proposal approval
