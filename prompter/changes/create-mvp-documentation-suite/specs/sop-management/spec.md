# sop-management Spec Delta

## ADDED Requirements

### Requirement: Draft Autosave

The system MUST automatically save draft documents every 60 seconds to prevent data loss during editing.

*ID: SOP-011*

**Rationale**: Per PRD US-05, users creating SOPs need protection against data loss due to browser crashes, network failures, or session timeouts. Autosave ensures users don't lose work progress when editing lengthy procedure documents.

#### Scenario: Draft autosaved while user is editing
- GIVEN a user is editing a draft SOP
- WHEN 60 seconds have elapsed since the last save
- THEN the system automatically saves the current state to the database
- AND displays a subtle "Draft saved at HH:MM:SS" indicator
- AND does not interrupt the user's editing flow

#### Scenario: Draft recovered after session timeout
- GIVEN a user's session expired while editing a draft SOP
- WHEN the user logs back in and navigates to the draft
- THEN the system displays the last autosaved version
- AND shows timestamp "Last saved at YYYY-MM-DD HH:MM:SS"

#### Scenario: Autosave handles concurrent edits
- GIVEN the same draft is open in multiple tabs
- WHEN autosave triggers in one tab
- THEN the system detects concurrent modification
- AND prompts user "This document was modified in another window. Reload to get latest version?"

## MODIFIED Requirements

### Requirement: SOP Review Scheduling

The system MUST track review due dates and send **multi-stage reminders** for SOPs requiring periodic review.

*ID: SOP-010 (Enhanced)*

**Change Summary**: Enhanced to specify the multi-stage reminder schedule per PRD US-25.

**Original**: Sent reminder when review_date is tomorrow  
**Modified**: Sends reminders at 30, 14, and 7 days before review due date

#### Scenario: Multi-stage reminders sent before review due
- GIVEN an SOP has review_date set to 30 days from now
- WHEN the daily reminder job runs
- THEN an email notification is sent to the document owner with subject "SOP Review Due in 30 Days: [SOP Title]"
- AND reminders are repeated at 14 days before due and 7 days before due
- AND each reminder email includes direct link to review the document

#### Scenario: Overdue document flagged in compliance dashboard
- GIVEN an SOP's review_date was yesterday
- WHEN the compliance dashboard loads
- THEN the SOP appears in "Overdue Reviews" section
- AND is highlighted in red with "X days overdue" indicator
- AND daily reminder emails continue until review is completed or document is archived

#### Scenario: Reminder cancelled when review completed early
- GIVEN an SOP has review_date 20 days from now
- WHEN the document owner reviews and updates the SOP before the next scheduled reminder
- THEN future reminders for the old review_date are cancelled
- AND new reminder schedule starts based on the new review_date

---

**Related PRD Stories**:
- US-05 (autosave requirement)
- US-25 (review reminder schedule)

**Migration Notes**:
- Existing SOP-010 scenarios remain valid; this adds additional scenarios for multi-stage reminders
- Autosave (SOP-011) is a new capability requiring new database field `last_autosaved_at` and background job
