# Capability: Authorization (RBAC)

## ADDED Requirements

### Requirement: Role-Based Access Control

The system MUST support 8 distinct user roles with specific permissions for different capabilities.

*ID: AUTHZ-001*

#### Scenario: Administrator has full system access
- GIVEN a user with the "Administrator" role
- WHEN the user accesses any module
- THEN all features are available (create, edit, delete, approve, configure)
- AND the user can access user management and system settings

#### Scenario: Staff user has limited document access
- GIVEN a user with the "Staff/Employee" role
- WHEN the user attempts to access documents
- THEN the user can view published documents
- AND create drafts of new documents
- AND edit their own drafts
- BUT cannot approve, publish, or delete others' documents

### Requirement: Eight User Roles

The system MUST implement exactly 8 user roles as defined in the role hierarchy.

*ID: AUTHZ-002*

#### Scenario: All roles are defined and assignable
- WHEN an administrator manages users
- THEN these 8 roles are available for assignment: Administrator, Quality Manager, Department Head, Document Controller, Approver, Staff/Employee, Auditor, Guest/Viewer
- AND each role has a distinct permission set

### Requirement: Document Management Permissions

Different roles MUST have different levels of access to document management features.

*ID: AUTHZ-003*

#### Scenario: Document Controller can manage document lifecycle
- GIVEN a user with "Document Controller" role
- WHEN managing documents
- THEN the user can create drafts, edit any draft, submit for approval, publish approved documents, and archive old documents
- BUT cannot approve documents (requires Approver role)

#### Scenario: Approver can approve documents
- GIVEN a user with "Approver" role
- WHEN a document is submitted for approval
- THEN the user can approve the document
- AND reject the document with comments
- BUT cannot publish (requires Document Controller or higher)

### Requirement: Department-Based Isolation

Users MUST only access data within their own department unless they have organization-wide roles.

*ID: AUTHZ-004*

#### Scenario: User sees only their department's documents
- GIVEN a user in "HR Department" with "Staff" role
- WHEN the user views the document list
- THEN only HR Department documents are visible
- AND documents from other departments are not shown

#### Scenario: Administrator sees all departments' documents
- GIVEN a user with "Administrator" role
- WHEN the user views the document list
- THEN documents from all departments are visible

### Requirement: Permission Denial Response

The system MUST deny access and provide clear feedback when users attempt unauthorized actions.

*ID: AUTHZ-005*

#### Scenario: Staff user tries to delete someone else's document
- GIVEN a Staff user viewing another user's document
- WHEN the user attempts to click delete
- THEN the system returns 403 Forbidden
- AND displays message "You do not have permission to delete this document"
- AND logs the permission denial in audit trail

### Requirement: Work Order Permissions

Work order management MUST respect role-based permissions for creation, assignment, and status updates.

*ID: AUTHZ-006*

#### Scenario: Department Head can assign work orders
- GIVEN a user with "Department Head" role
- WHEN creating or viewing work orders
- THEN the user can assign work orders to department staff
- AND update work order status
- AND close completed work orders

### Requirement: Audit Trail Access

Audit trail access MUST be restricted to Auditor, Quality Manager, and Administrator roles only.

*ID: AUTHZ-007*

#### Scenario: Auditor has full audit trail access
- GIVEN a user with "Auditor" role
- WHEN the user accesses audit trail reports
- THEN all audit log entries are visible
- AND the user can export audit data
- BUT cannot modify or delete audit logs

#### Scenario: Staff cannot access audit trails
- GIVEN a user with "Staff" role
- WHEN the user attempts to access audit trail
- THEN access is denied with 403 Forbidden

### Requirement: Permission Matrix Enforcement

The system MUST enforce permission matrices as defined in AGENTS.md Section 8 for all user actions.

*ID: AUTHZ-008*

#### Scenario: Permission matrix validation for document approval
- GIVEN the permission matrix states only "Approver" and above can approve documents
- WHEN a "Staff" user attempts to call the approve API endpoint
- THEN the request is rejected with 403 Forbidden
- AND audit log records the unauthorized attempt

---

**Related Capabilities**:
- `authentication` (authentication required before authorization checks)
- `audit-logging` (permission denials and role changes are logged)

---

**Version**: 1.0.0  
**Status**: ADDED (baseline specification)  
**Date**: February 10, 2026
