# Capability: SOP Management

## ADDED Requirements

### Requirement: SOP CRUD Operations

Users with appropriate permissions MUST be able to create, read, update, and delete Standard Operating Procedure documents.

*ID: SOP-001*

#### Scenario: Document Controller creates new SOP draft
- GIVEN a user with "Document Controller" role
- WHEN the user creates a new SOP with title "Software Deployment Procedure", description, category "IT Operations", and department "IT Department"
- THEN the SOP is created with status "draft"
- AND assigned unique SOP number (e.g., "SOP-IT-2026-001")
- AND creator is recorded
- AND audit log entry "DOCUMENT_CREATED" is generated

#### Scenario: User edits draft SOP
- GIVEN a user has a draft SOP
- WHEN the user updates the title, description, or content and saves changes
- THEN the SOP is updated
- AND updated_at timestamp is refreshed
- AND audit log records the change with old/new values

### Requirement: SOP Workflow States

SOPs MUST progress through defined workflow states from creation to archival.

*ID: SOP-002*

#### Scenario: Valid state transitions
- WHEN an SOP moves through its lifecycle
- THEN only these transitions are allowed: Draft → Submitted, Submitted → In Review, In Review → Approved OR Rejected, Rejected → Draft, Approved → Published, Published → Archived
- AND invalid transitions are blocked (e.g., Draft → Published)

### Requirement: SOP Submission for Approval

Users MUST be able to submit draft SOPs for multi-level approval review.

*ID: SOP-003*

#### Scenario: User submits SOP for approval
- GIVEN a user has a complete draft SOP (all required fields filled)
- WHEN the user clicks "Submit for Approval"
- THEN the SOP status changes to "submitted"
- AND the SOP is locked for editing
- AND approval request notifications are sent to assigned approvers

### Requirement: SOP Approval Workflow

Assigned approvers MUST be able to review and approve or reject submitted SOPs.

*ID: SOP-004*

#### Scenario: Approver approves SOP
- GIVEN an SOP is submitted and assigned to an approver
- WHEN the approver reviews it and clicks "Approve" with optional comments
- THEN the SOP status changes to "approved"
- AND approval record is created with approver, timestamp, comments
- AND notification is sent to the document creator

#### Scenario: Approver rejects SOP with feedback
- GIVEN an SOP is submitted
- WHEN the approver clicks "Reject" and provides required comment
- THEN the SOP status changes to "rejected"
- AND the SOP is unlocked for editing
- AND notification is sent to creator with rejection reason

### Requirement: SOP Publication

Approved SOPs MUST be publishable to make them accessible to all authorized users.

*ID: SOP-005*

#### Scenario: Document Controller publishes approved SOP
- GIVEN an SOP with status "approved"
- WHEN a Document Controller clicks "Publish"
- THEN the SOP status changes to "published"
- AND the effective_date is set (if not already set)
- AND the SOP appears in published document lists for all users

### Requirement: SOP Version Control

The system MUST maintain version history when SOPs are updated after publication.

*ID: SOP-006*

#### Scenario: New version created on significant edit
- GIVEN a published SOP with version 1.0
- WHEN a Document Controller makes significant changes and saves
- THEN a new version 1.1 is created
- AND the previous version 1.0 is retained in version history
- AND users can view previous versions

### Requirement: SOP Archival

Published SOPs MUST be archivable when they become obsolete or are superseded.

*ID: SOP-007*

#### Scenario: Document Controller archives obsolete SOP
- GIVEN a published SOP that is no longer in use
- WHEN a Document Controller clicks "Archive" and confirms
- THEN the SOP status changes to "archived"
- AND the SOP is removed from active document lists
- BUT remains accessible in Archive view for compliance

### Requirement: SOP Search and Filtering

Users MUST be able to search and filter SOPs by multiple criteria.

*ID: SOP-008*

#### Scenario: User searches SOPs by keyword
- WHEN a user enters "deployment" in the search box
- THEN all SOPs with  "deployment" in title or description are displayed
- AND results are paginated

#### Scenario: User filters SOPs by status
- WHEN a user selects filter "Status: Published"
- THEN only published SOPs are displayed in the list

### Requirement: SOP Export

Users MUST be able to export SOPs to PDF and Word formats.

*ID: SOP-009*

#### Scenario: User exports SOP to PDF
- GIVEN a user is viewing an SOP
- WHEN the user clicks "Export to PDF"
- THEN a PDF file is generated with the SOP content, metadata, and version information
- AND the file is downloaded to the user's device

### Requirement: SOP Review Scheduling

The system MUST track review due dates and send reminders for SOPs requiring periodic review.

*ID: SOP-010*

#### Scenario: Review reminder sent
- GIVEN an SOP has review_date set to tomorrow
- WHEN the daily reminder job runs
- THEN an email notification is sent to the document owner
- AND the SOP appears in "Review Due" dashboard widget

---

**Related Capabilities**:
- `authorization` (role-based access to SOP operations)
- `audit-logging` (all SOP lifecycle events logged)
- `notification-system` (approval requests,  status changes)

---

**Version**: 1.0.0  
**Status**: ADDED (baseline specification)  
**Date**: February 10, 2026
