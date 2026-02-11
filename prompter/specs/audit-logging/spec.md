# audit-logging Specification

## Purpose
TBD - created by archiving change establish-baseline-specs. Update Purpose after archive.
## Requirements
### Requirement: Comprehensive Activity Tracking

The system MUST log all critical user actions for compliance, security, and accountability.

*ID: AUDIT-001*

#### Scenario: User login is logged
- WHEN a user successfully logs in
- THEN an audit log entry is created with event type "USER_LOGIN", user ID, username, timestamp, IP address, and session ID

#### Scenario: Failed login is logged
- WHEN a user attempts to log in with invalid credentials
- THEN an audit log entry is created with event type "LOGIN_FAILED", attempted username (but NOT the password), timestamp, IP address, and reason

### Requirement: Document Lifecycle Events

All document state changes and content modifications MUST be logged with old and new values.

*ID: AUDIT-002*

#### Scenario: Document created
- WHEN a user creates a new SOP document
- THEN an audit log entry records event "DOCUMENT_CREATED", entity type "sop", entity ID, user who created it, initial field values, and timestamp

#### Scenario: Document approved
- WHEN an approver approves a document
- THEN an audit log entry records event "DOCUMENT_APPROVED", entity type and ID, approver ID, old status "submitted", new status "approved", comments, and timestamp

### Requirement: Authorization Events

Permission denials and role changes MUST be logged for security monitoring.

*ID: AUDIT-003*

#### Scenario: Permission denied event logged
- WHEN a Staff user attempts to delete a document they don't own
- AND the system denies the action (403 Forbidden)
- THEN an audit log entry records event "PERMISSION_DENIED", user ID, attempted action "DELETE", resource, reason, timestamp, and IP address

### Requirement: Workflow Transition Events

All workflow state transitions (submissions, approvals, rejections) MUST be logged.

*ID: AUDIT-004*

#### Scenario: Document submitted for approval
- WHEN a user submits a draft document for approval
- THEN an audit log entry records event "DOCUMENT_SUBMITTED", entity ID, user ID, old status "draft", new status "submitted", and timestamp

### Requirement: Administrative Actions

All administrative actions (user management, role changes, system configuration) MUST be logged.

*ID: AUDIT-005*

#### Scenario: User role changed
- WHEN an administrator changes a user's role from "Staff" to "Approver"
- THEN an audit log entry records event "USER_ROLE_CHANGED", target user ID, admin who made the change, old role "Staff", new role "Approver", and timestamp

### Requirement: Log Data Structure

Audit log entries MUST include timestamp, event type, user ID, entity type/ID, action, old/new values, IP address, and session ID.

*ID: AUDIT-006*

#### Scenario: Audit log contains all required fields
- WHEN any auditable event occurs
- THEN the log entry includes timestamp (ISO 8601), event_type, user_id, entity_type, entity_id, action, old_value (JSON), new_value (JSON), ip_address, and session_id

### Requirement: Log Retention Policies

Audit logs MUST be retained for compliance periods: 7 years for critical logs, 1 year for operational logs.

*ID: AUDIT-007*

#### Scenario: Critical logs retained for 7 years
- GIVEN audit logs older than 7 years exist
- WHEN the retention policy runs
- THEN critical logs (authentication, authorization, data changes) are retained
- AND operational logs older than 1 year are archived

### Requirement: Audit Trail Export

Authorized users MUST be able to export audit trails in standard formats for compliance reporting.

*ID: AUDIT-008*

#### Scenario: Auditor exports audit trail
- GIVEN a user with "Auditor" role
- WHEN the user requests audit trail export for date range "2026-01-01 to 2026-01-31"
- THEN the system generates a CSV file with all audit entries in that range
- AND includes all required fields

---

**Related Capabilities**:
- `authentication` (login/logout events logged)
- `authorization` (permission denials logged)
- All document management capabilities (lifecycle events logged)

---

**Version**: 1.0.0  
**Status**: ADDED (baseline specification)  
**Date**: February 10, 2026

