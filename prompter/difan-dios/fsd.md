# Functional Specification Document (FSD)

## Document Information

|                        |                                |
|------------------------|--------------------------------|
| **Project**            | Difan-DIOS (Difan Integrated Operational System) |
| **Version**            | 1.0.0 (DRAFT - TEMPLATE)       |
| **Date**               | February 10, 2026              |
| **Status**             | 🟡 Template - Awaiting Content |
| **Author**             | TBD                            |
| **Reviewers**          | Product Owner, Tech Lead       |
| **Source Documents**   | PRD (25 user stories), Baseline Specs (76 requirements) |

---

## 1. Introduction

### 1.1 Purpose
<!-- Describe the purpose of this FSD: to provide detailed functional requirements for implementing Difan-DIOS MVP 1 -->

### 1.2 Scope
<!-- Define what is covered in MVP 1 (Q2 2026) vs. what is deferred to Phase 2 (Q3 2026) -->

### 1.3 Document Structure
<!-- Explain how this document is organized (by capability, by user story, etc.) -->

### 1.4 Reference Documents
- Product Brief: `prompter/difan-dios/product-brief.md`
- PRD: `prompter/difan-dios/prd.md`
- Baseline Specifications: `prompter/specs/` (16 capabilities, 76 requirements)
- Architecture Design: Archived baseline-specs change `design.md`

### 1.5 Terminology
<!-- Reference AGENTS.md Section 7 for domain vocabulary -->

---

## 2. System Overview

### 2.1 Business Context
<!-- High-level summary of Difan-DIOS as a Quality Management System (QMS) -->

### 2.2 Target Users
<!-- Reference AGENTS.md Section 8: 8 roles (Admin, Quality Manager, Dept Head, Doc Controller, Approver, Staff, Auditor, Guest) -->

### 2.3 Core Capabilities
<!-- List of 16 capabilities from baseline specs -->

### 2.4 Key Workflows
<!-- High-level workflow overview: document lifecycle, work orders, approvals, bookings -->

---

## 3. Functional Requirements by Capability

### 3.1 Authentication & User Management (US-01 to US-04)

#### 3.1.1 User Login (US-01)
**Baseline Spec**: AUTH-001 to AUTH-008

**Functional Requirements**:
- **FR-AUTH-001**: Login Form Behavior
  - User enters username and password
  - System validates credentials against database
  - On success: Generate Laravel Sanctum token, create session, redirect to dashboard
  - On failure: Display error message, increment failed login counter
  - **Validation Rules**: [TBD - document required field validation, format checks]
  - **Error Messages**: [TBD - specific user-facing messages]

- **FR-AUTH-002**: Account Lockout (Baseline AUTH-002)
  - After 5 consecutive failed login attempts within 15 minutes
  - Lock account for 15 minutes
  - Display message: "Account locked due to multiple failed attempts. Try again in 15 minutes."
  - Send notification email to user
  - **Edge Cases**: [TBD - concurrent login attempts, admin unlock]

- **FR-AUTH-003**: Session Management (Baseline AUTH-003)
  - Session timeout: 30 minutes of inactivity
  - Concurrent session limit: [TBD - resolve with stakeholders]
  - Session renewal on activity
  - **Behavior**: [TBD - what happens on timeout? Auto-logout, warning modal?]

<!-- Continue with remaining authentication requirements -->

#### 3.1.2 User Logout (US-02)
**Baseline Spec**: AUTH-004

**Functional Requirements**:
- **FR-AUTH-004**: Logout Behavior
  - [TBD - revoke token, clear session, redirect to login]

#### 3.1.3 Password Reset (US-03)
**Baseline Spec**: AUTH-005, AUTH-006

**Functional Requirements**:
- **FR-AUTH-005**: Password Reset Request
  - [TBD - email validation, token generation, email sending]

- **FR-AUTH-006**: Password Reset Confirmation
  - [TBD - token validation, password complexity rules, confirmation]

#### 3.1.4 User Registration (US-04)
**Baseline Spec**: AUTH-007, AUTH-008

**Functional Requirements**:
- **FR-AUTH-007**: Self-Registration (if enabled)
  - [TBD - registration form, email verification, default role assignment]

### 3.2 Authorization & Role-Based Access Control (AUTHZ-001 to AUTHZ-008)

#### 3.2.1 Role Definitions
<!-- Document 8 roles with permissions per AGENTS.md Section 8 -->

**Functional Requirements**:
- **FR-AUTHZ-001**: Role Assignment
  - [TBD - how admins assign roles, role hierarchy, multiple roles per user?]

- **FR-AUTHZ-002**: Permission Checks
  - [TBD - where permissions checked (middleware, controller, view), permission denial handling]

#### 3.2.2 Permission Matrix
<!-- Create table mapping Role × Module → Permissions (Create, Read, Update, Delete, Approve, etc.) -->
<!-- Reference AGENTS.md Section 8 permission matrices -->

### 3.3 Document Management (US-05 to US-09)

#### 3.3.1 Document Types
<!-- 5 document types: SOP, Policy, Work Instruction, Quality Manual, Application Guide -->

#### 3.3.2 Document Creation (US-05)
**Baseline Spec**: SOP-001, POLICY-001, etc.

**Functional Requirements**:
- **FR-DOC-001**: Create Document Form
  - **Required Fields**: [TBD - title, description, category, department, effective_date]
  - **Optional Fields**: [TBD - tags, related_documents, responsible_party]
  - **File Upload**: [TBD - allowed formats (PDF, DOC, DOCX), max size, virus scanning]
  - **Rich Text Editor**: [TBD - Quill editor for description/content]
  - **Validation Rules**: [TBD - required field errors, date validation, file type validation]
  - **Draft Saving**: [TBD - auto-save behavior per SOP-011 spec delta]

<!-- Continue with Edit, View, Delete, Version Control, Archive... -->

#### 3.3.3 Document Editing (US-05 continued)
**Baseline Spec**: SOP-002

**Functional Requirements**:
- **FR-DOC-002**: Edit Document Behavior
  - [TBD - who can edit (creator, doc controller), when editable (draft only or published too?), version creation on edit]

#### 3.3.4 Document Viewing (US-06)
**Functional Requirements**:
- **FR-DOC-003**: Document Detail View
  - [TBD - what fields displayed, version history tab, related documents, download button]

#### 3.3.5 Document Search & Filtering (US-06)
**Baseline Spec**: SOP-006, etc.

**Functional Requirements**:
- **FR-DOC-004**: Search Functionality
  - [TBD - full-text search on title/description, filters (status, department, category, date range), sort options]

#### 3.3.6 Document Version Control (US-08)
**Functional Requirements**:
- **FR-DOC-005**: Version Creation
  - [TBD - when new version created (on publish? on edit?), version numbering (1.0, 1.1, 2.0?)]

- **FR-DOC-006**: Version History Display
  - [TBD - version list, who changed, when, diff view between versions]

#### 3.3.7 Document Archival (US-09)
**Functional Requirements**:
- **FR-DOC-007**: Archive Document
  - [TBD - who can archive, archive reason required?, what happens to archived docs (soft delete, hidden from search?)]

#### 3.3.8 Document Lifecycle State Machine
<!-- Define states: Draft, Submitted, In Review, Approved, Rejected, Published, Archived -->
<!-- Define transitions and guards: who can transition, under what conditions -->

**States**: [TBD - diagram and detailed state definitions]
**Transitions**: [TBD - transition rules, permissions per state change]

### 3.4 Approval Workflows (US-10 to US-14)

#### 3.4.1 Multi-Level Approval Configuration
**Baseline Spec**: SOP-007, SOP-008

**Functional Requirements**:
- **FR-APPROVAL-001**: Approval Level Configuration
  - [TBD - how many levels (1-5), who configures, per document type or per department?]

#### 3.4.2 Submit for Approval (US-10)
**Functional Requirements**:
- **FR-APPROVAL-002**: Submit Document
  - [TBD - who can submit, validation before submit, approval chain creation, notifications sent]

#### 3.4.3 Approve/Reject Document (US-11, US-12)
**Functional Requirements**:
- **FR-APPROVAL-003**: Approve Document
  - [TBD - approver sees pending list, approver adds comments, approval advances to next level or publishes]

- **FR-APPROVAL-004**: Reject Document
  - [TBD - rejection reason required, document returns to draft, creator notified]

#### 3.4.4 Approval Delegation (US-13)
**Functional Requirements**:
- **FR-APPROVAL-005**: Delegate Approval
  - [TBD - approver delegates to another user, delegatee permissions, notification to delegatee]

#### 3.4.5 Approval Escalation (US-14)
**Baseline Spec**: NOTIFY-004 (spec delta)

**Functional Requirements**:
- **FR-APPROVAL-006**: Escalation Rules
  - [TBD - reminders at days 3, 5, 7; escalation to supervisor at day 10; email content]

### 3.5 Work Order Management (US-15 to US-17)

#### 3.5.1 Work Order Creation (US-15)
**Baseline Spec**: WO-001 to WO-012

**Functional Requirements**:
- **FR-WO-001**: Create Work Order Form
  - [TBD - required fields, priority levels, assignee selection, due date picker]

#### 3.5.2 Work Order Assignment (US-16)
**Functional Requirements**:
- **FR-WO-002**: Assign Work Order
  - [TBD - who can assign, reassignment rules, notification to assignee]

#### 3.5.3 Work Order Status Tracking (US-17)
**Functional Requirements**:
- **FR-WO-003**: Update Work Order Status
  - [TBD - status workflow (New → Assigned → In Progress → Review → Completed → Closed), who can update, comment required on status change?]

#### 3.5.4 Work Order Workflow State Machine
<!-- Define states and transitions -->

### 3.6 Meeting Room Booking (US-18 to US-20)

#### 3.6.1 Room Availability (US-18)
**Baseline Spec**: BOOKING-001 to BOOKING-004

**Functional Requirements**:
- **FR-BOOKING-001**: View Room Availability
  - [TBD - calendar view, filter by room, time slot selection, booking conflict detection]

#### 3.6.2 Create Booking (US-19)
**Functional Requirements**:
- **FR-BOOKING-002**: Create Booking
  - [TBD - booking form fields, conflict validation, confirmation message]

#### 3.6.3 Edit/Cancel Booking (US-20)
**Functional Requirements**:
- **FR-BOOKING-003**: Edit Booking
  - [TBD - who can edit (creator only?), re-check conflicts, notification]

- **FR-BOOKING-004**: Cancel Booking
  - [TBD - cancellation policy (deadline?), cancellation reason, notification]

### 3.7 Dashboard & Analytics (US-21 to US-23)

#### 3.7.1 Role-Specific Dashboard (US-21)
**Baseline Spec**: DASHBOARD-001 to DASHBOARD-003

**Functional Requirements**:
- **FR-DASHBOARD-001**: Dashboard Widget Configuration
  - [TBD - which widgets for which roles, data refresh intervals, customization options]

#### 3.7.2 Document Analytics (US-22)
**Functional Requirements**:
- **FR-DASHBOARD-002**: Document Metrics
  - [TBD - metrics displayed (total docs, by status, by type), charts, filters]

#### 3.7.3 Compliance Reporting (US-23)
**Functional Requirements**:
- **FR-DASHBOARD-003**: Compliance Dashboard
  - [TBD - compliance metrics, overdue reviews, upcoming expirations, export to PDF/Excel]

### 3.8 Audit Logging & Compliance (US-24, US-25)

#### 3.8.1 Audit Trail (US-24)
**Baseline Spec**: AUDIT-001 to AUDIT-008

**Functional Requirements**:
- **FR-AUDIT-001**: Audit Event Logging
  - [TBD - which events logged (per AGENTS.md Section 10), data structure, immutability enforcement]

#### 3.8.2 Review Scheduling (US-25)
**Baseline Spec**: SOP-010 (enhanced with spec delta)

**Functional Requirements**:
- **FR-AUDIT-002**: Document Review Reminders
  - [TBD - reminder schedule (30, 14, 7 days before due), notification content, overdue handling]

### 3.9 Notification System
**Baseline Spec**: NOTIFY-001 to NOTIFY-004

**Functional Requirements**:
- **FR-NOTIFY-001**: Email Notifications
  - [TBD - notification types, email templates, delivery tracking]

- **FR-NOTIFY-002**: In-App Notifications
  - [TBD - notification panel, unread badges, mark as read]

### 3.10 Search & Filtering
<!-- Cross-cutting concern -->

**Functional Requirements**:
- **FR-SEARCH-001**: Global Search
  - [TBD - search scope (all modules), autocomplete, recent searches]

- **FR-SEARCH-002**: Advanced Search
  - [TBD - filter combinations, faceted search, saved searches]

### 3.11 File Management
<!-- Cross-cutting concern -->

**Functional Requirements**:
- **FR-FILE-001**: File Upload
  - [TBD - allowed formats, size limits, virus scanning, progress indicator]

- **FR-FILE-002**: File Download
  - [TBD - authenticated downloads, pre-signed URLs, download tracking]

### 3.12 Organizational Features

#### 3.12.1 Organizational Structure
**Baseline Spec**: ORG-001 to ORG-003

**Functional Requirements**:
- **FR-ORG-001**: Organizational Hierarchy
  - [TBD - tree structure, CRUD operations, permission inheritance]

#### 3.12.2 Job Descriptions (Jobdesk)
**Baseline Spec**: JOBDESK-001 to JOBDESK-003

**Functional Requirements**:
- **FR-JOBDESK-001**: Job Description Management
  - [TBD - CRUD operations, assignment to users, version control]

#### 3.12.3 Customer Requests
**Baseline Spec**: CUSTOMER-REQUEST-001 to CUSTOMER-REQUEST-003

**Functional Requirements**:
- **FR-CUSTOMER-REQUEST-001**: Request Management
  - [TBD - create request, track status, response tracking]

#### 3.12.4 Form Management
**Baseline Spec**: FORM-001 to FORM-003

**Functional Requirements**:
- **FR-FORM-001**: Dynamic Form Handling
  - [TBD - form builder (if MVP 1), form submission, data collection]

---

## 4. Cross-Cutting Concerns

### 4.1 Data Validation
<!-- Centralized validation rules applicable across modules -->

**Validation Rules**:
- [TBD - required fields, format validation (email, phone), date validation, business rule validation]

### 4.2 Error Handling
<!-- How errors are handled and displayed to users -->

**Error Types**:
- [TBD - validation errors, authorization errors, server errors, network errors]

**Error Display**:
- [TBD - inline form errors, toast notifications, error pages]

### 4.3 Concurrent Editing
<!-- How system handles simultaneous edits -->

**Conflict Resolution**:
- [TBD - last-save-wins with warning? Optimistic locking? Field-level merging?]

### 4.4 Performance Requirements
<!-- Response time, scalability targets -->

**Performance Targets**:
- [TBD - page load time < 2s, API response < 500ms, support 100+ concurrent users]

### 4.5 Security Requirements
<!-- Security constraints from AGENTS.md Section 10 -->

**Security Measures**:
- [TBD - CSRF protection, XSS prevention, SQL injection prevention, file upload validation]

---

## 5. Traceability Matrix

### 5.1 PRD User Stories to FSD Requirements

| PRD User Story | FSD Requirement(s) | Baseline Spec(s) |
|----------------|-------------------|------------------|
| US-01: User Login | FR-AUTH-001, FR-AUTH-002, FR-AUTH-003 | AUTH-001 to AUTH-008 |
| US-02: User Logout | FR-AUTH-004 | AUTH-004 |
| US-03: Password Reset | FR-AUTH-005, FR-AUTH-006 | AUTH-005, AUTH-006 |
| US-04: User Registration | FR-AUTH-007 | AUTH-007, AUTH-008 |
| US-05: Create/Edit Documents | FR-DOC-001, FR-DOC-002 | SOP-001, SOP-002, POLICY-001, etc. |
| US-06: View/Search Documents | FR-DOC-003, FR-DOC-004 | SOP-006, etc. |
| <!-- TBD - continue for all 25 user stories --> | | |

### 5.2 Baseline Specs to FSD Requirements

| Baseline Spec | FSD Requirement(s) | Notes |
|---------------|--------------------|-------|
| AUTH-001 | FR-AUTH-001 | User login validation |
| AUTH-002 | FR-AUTH-002 | Account lockout |
| <!-- TBD - continue for all 76 baseline requirements --> | | |

---

## 6. Acceptance Criteria

### 6.1 Functional Completeness
- [ ] All 25 PRD user stories mapped to FSD requirements
- [ ] All 76 baseline spec requirements incorporated
- [ ] All spec deltas (SOP-011, AUTH-009, NOTIFY-004) documented

### 6.2 Requirements Quality
- [ ] Each requirement has clear acceptance criteria (Given/When/Then or similar)
- [ ] Validation rules specified with examples
- [ ] Error messages documented
- [ ] Edge cases identified

### 6.3 Stakeholder Approval
- [ ] Product owner reviews and approves FSD
- [ ] Tech lead reviews for technical feasibility
- [ ] QA lead reviews for testability

---

## 7. Appendices

### Appendix A: State Machine Diagrams
<!-- Mermaid diagrams for document lifecycle, work order workflow, approval workflow -->

### Appendix B: Business Rules Reference
<!-- Consolidated list of all business rules with examples -->

### Appendix C: Validation Rules Reference
<!-- Consolidated list of all validation rules -->

### Appendix D: Glossary
<!-- Reference to AGENTS.md Section 7 or inline glossary -->

---

**Document Status**: 🟡 TEMPLATE - Awaiting content population  
**Next Steps**: Review template structure, obtain approval, proceed with content creation  
**Estimated Completion**: [TBD based on effort allocation]
